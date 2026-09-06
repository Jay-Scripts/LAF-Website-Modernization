import assert from "node:assert/strict";
import test from "node:test";

import { normalizePayPalWebhook, normalizeXenditWebhook } from "../lib/donations/normalizers";
import type {
  DonationPaymentStatus,
  DonationPersistenceResult,
  NormalizedDonationPayment,
  NormalizedDonationSubscription,
  NormalizedDonationWebhook,
} from "../lib/donations/types";

class MemoryDonationRepository {
  events = new Map<string, "ignored" | "processed">();
  payments = new Map<string, NormalizedDonationPayment & { latestProviderEventId: string }>();
  subscriptions = new Map<string, NormalizedDonationSubscription & { latestProviderEventId: string }>();
  failNext = false;

  async process(event: NormalizedDonationWebhook): Promise<DonationPersistenceResult> {
    if (this.failNext) {
      this.failNext = false;
      throw new Error("simulated database outage");
    }
    const eventKey = `${event.provider}:${event.providerEventId}`;
    const existingEvent = this.events.get(eventKey);
    if (existingEvent && !(existingEvent === "ignored" && (event.payment || event.subscription))) return "duplicate_event";

    if (event.subscription) {
      const subscriptionKey = `${event.provider}:${event.subscription.providerSubscriptionId}`;
      const existing = this.subscriptions.get(subscriptionKey);
      const isNewer = !existing?.latestProviderEventAt
        || !event.subscription.latestProviderEventAt
        || event.subscription.latestProviderEventAt >= existing.latestProviderEventAt;
      this.subscriptions.set(subscriptionKey, {
        ...(existing || event.subscription),
        ...event.subscription,
        planId: event.subscription.planId || existing?.planId || null,
        status: isNewer ? event.subscription.status || existing?.status || null : existing?.status || null,
        latestProviderEventId: isNewer ? event.providerEventId : existing?.latestProviderEventId || event.providerEventId,
        latestProviderEventAt: isNewer ? event.subscription.latestProviderEventAt : existing?.latestProviderEventAt || null,
        cancelledAt: event.subscription.cancelledAt || existing?.cancelledAt || null,
        lastPaymentFailedAt: event.subscription.lastPaymentFailedAt || existing?.lastPaymentFailedAt || null,
      });
    }

    // Simulate the production transaction: no event is committed unless the payment write succeeds.
    if (event.payment) {
      const paymentKey = `${event.provider}:${event.payment.providerTransactionId}`;
      const existing = this.payments.get(paymentKey);
      const nextStatus = transitionStatus(existing?.status, event.payment.status);
      this.payments.set(paymentKey, {
        ...(existing || event.payment),
        ...event.payment,
        status: nextStatus,
        latestProviderEventId: event.providerEventId,
      });
    }
    this.events.set(eventKey, event.payment || event.subscription ? "processed" : "ignored");
    return event.payment || event.subscription ? "processed" : "ignored";
  }
}

function transitionStatus(current: DonationPaymentStatus | undefined, next: DonationPaymentStatus) {
  if (current === "refunded" || current === "reversed") return current;
  if (current === "completed" && next !== "refunded" && next !== "reversed") return current;
  return next;
}

function paypalEvent(overrides: Record<string, unknown> = {}) {
  return {
    id: "WH-EVENT-1",
    event_type: "PAYMENT.CAPTURE.COMPLETED",
    create_time: "2026-08-14T00:00:00.000Z",
    resource: {
      id: "CAPTURE-10",
      status: "COMPLETED",
      amount: { currency_code: "USD", value: "10.00" },
      custom_id: "laf-one-time-test",
      create_time: "2026-08-14T00:00:00.000Z",
      update_time: "2026-08-14T00:00:01.000Z",
      supplementary_data: { related_ids: { order_id: "ORDER-10" } },
    },
    ...overrides,
  };
}

function normalized(event: Record<string, unknown>) {
  const raw = JSON.stringify(event);
  const result = normalizePayPalWebhook(event, raw);
  assert.ok(result);
  return result;
}

test("persists the first successful PayPal webhook in minor units", async () => {
  const repository = new MemoryDonationRepository();
  const result = await repository.process(normalized(paypalEvent()));

  assert.equal(result, "processed");
  assert.equal(repository.events.size, 1);
  assert.equal(repository.payments.size, 1);
  const payment = repository.payments.get("paypal:CAPTURE-10");
  assert.equal(payment?.amountMinor, 1000);
  assert.equal(payment?.currency, "USD");
  assert.equal(payment?.status, "completed");
  assert.equal(payment?.providerOrderId, "ORDER-10");
});

test("normalizes a successful Xendit payment session into the shared PHP payment model", async () => {
  const repository = new MemoryDonationRepository();
  const event = {
    event: "payment_session.completed",
    created: "2026-08-14T00:00:00.000Z",
    data: {
      payment_session_id: "ps-10",
      payment_request_id: "pr-10",
      payment_id: "py-10",
      reference_id: "laf-donation-10",
      status: "COMPLETED",
      amount: 500,
      currency: "PHP",
      updated: "2026-08-14T00:00:01.000Z",
      metadata: { donation_frequency: "one-time", donation_tier_id: "hope", donation_tier_name: "Hope Keeper" },
    },
  };
  const raw = JSON.stringify(event);
  const result = normalizeXenditWebhook(event, raw, "xendit-event-10");
  assert.ok(result);
  assert.equal(await repository.process(result), "processed");

  const payment = repository.payments.get("xendit:py-10");
  assert.equal(payment?.amountMinor, 50000);
  assert.equal(payment?.currency, "PHP");
  assert.equal(payment?.paymentType, "one_time");
  assert.equal(payment?.providerOrderId, "ps-10");
});

function xenditPlanEvent(event: "recurring.plan.activated" | "recurring.plan.inactivated", created: string) {
  return {
    event,
    created,
    data: {
      id: "repl-xendit-monthly",
      reference_id: "laf-monthly-test",
      status: event.endsWith("activated") && !event.endsWith("inactivated") ? "ACTIVE" : "INACTIVE",
      amount: 500,
      currency: "PHP",
      created: "2026-08-17T00:00:00.000Z",
      updated: created,
      schedule: { interval: "MONTH", interval_count: 1, total_recurrence: null },
      metadata: { donation_frequency: "monthly", donation_tier_id: "hope", donation_tier_name: "Hope Keeper" },
    },
  };
}

test("tracks Xendit subscription activation and inactivation idempotently", async () => {
  const repository = new MemoryDonationRepository();
  const activatedPayload = xenditPlanEvent("recurring.plan.activated", "2026-08-17T01:00:00.000Z");
  const activated = normalizeXenditWebhook(activatedPayload, JSON.stringify(activatedPayload), "xendit-plan-active");
  assert.ok(activated);
  assert.equal(await repository.process(activated), "processed");
  assert.equal(repository.subscriptions.get("xendit:repl-xendit-monthly")?.status, "active");

  const inactivatedPayload = xenditPlanEvent("recurring.plan.inactivated", "2026-08-17T02:00:00.000Z");
  const inactivated = normalizeXenditWebhook(inactivatedPayload, JSON.stringify(inactivatedPayload), "xendit-plan-inactive");
  assert.ok(inactivated);
  assert.equal(await repository.process(inactivated), "processed");
  assert.equal(await repository.process(inactivated), "duplicate_event");
  assert.equal(repository.subscriptions.get("xendit:repl-xendit-monthly")?.status, "cancelled");
  assert.equal(repository.subscriptions.get("xendit:repl-xendit-monthly")?.cancelledAt?.toISOString(), "2026-08-17T02:00:00.000Z");
});

test("persists an annual Xendit recurring cycle payment and links it to the plan", async () => {
  const repository = new MemoryDonationRepository();
  const payload = {
    event: "recurring.cycle.succeeded",
    created: "2026-08-17T03:00:00.000Z",
    data: {
      id: "recy-annual-1",
      action_id: "py-annual-1",
      plan_id: "repl-xendit-annual",
      amount: 6000,
      currency: "PHP",
      status: "SUCCEEDED",
      updated: "2026-08-17T03:00:00.000Z",
      schedule: { interval: "MONTH", interval_count: 12 },
      metadata: { donation_frequency: "annually", donation_tier_id: "hope", donation_tier_name: "Hope Keeper" },
    },
  };
  const normalized = normalizeXenditWebhook(payload, JSON.stringify(payload), "xendit-cycle-annual");
  assert.ok(normalized);
  assert.equal(await repository.process(normalized), "processed");
  assert.equal(await repository.process(normalized), "duplicate_event");

  const payment = repository.payments.get("xendit:py-annual-1");
  assert.equal(payment?.paymentType, "annual");
  assert.equal(payment?.amountMinor, 600000);
  assert.equal(payment?.providerSubscriptionId, "repl-xendit-annual");
  assert.equal(payment?.status, "completed");
  assert.ok(repository.subscriptions.has("xendit:repl-xendit-annual"));
});

test("deduplicates immediate Xendit capture and cycle webhooks into one linked monthly payment", async () => {
  const repository = new MemoryDonationRepository();
  const paymentId = "py-immediate-monthly-1";
  const planId = "repl-xendit-immediate-monthly";
  const referenceId = "laf-monthly-immediate-test";
  const capturePayload = {
    event: "payment.capture",
    created: "2026-08-17T10:00:01.000Z",
    data: {
      payment_id: paymentId,
      payment_request_id: "pr-immediate-monthly-1",
      reference_id: referenceId,
      customer_id: "cust-immediate-monthly-1",
      status: "SUCCEEDED",
      request_amount: 500,
      currency: "PHP",
      created: "2026-08-17T10:00:00.000Z",
      updated: "2026-08-17T10:00:01.000Z",
    },
  };
  const cyclePayload = {
    event: "recurring.cycle.succeeded",
    created: "2026-08-17T10:00:02.000Z",
    data: {
      id: "recy-immediate-monthly-1",
      type: "IMMEDIATE",
      reference_id: referenceId,
      plan_id: planId,
      customer_id: "cust-immediate-monthly-1",
      cycle_number: 1,
      status: "SUCCEEDED",
      amount: 500,
      currency: "PHP",
      attempt_details: [{
        attempt_number: 1,
        action_number: 1,
        type: "INITIAL",
        payment_id: paymentId,
        status: "SUCCEEDED",
      }],
      schedule: { interval: "MONTH", interval_count: 1 },
      created: "2026-08-17T10:00:00.000Z",
      updated: "2026-08-17T10:00:02.000Z",
    },
  };

  const capture = normalizeXenditWebhook(capturePayload, JSON.stringify(capturePayload), "xendit-capture-immediate");
  const cycle = normalizeXenditWebhook(cyclePayload, JSON.stringify(cyclePayload), "xendit-cycle-immediate");
  assert.ok(capture);
  assert.ok(cycle);
  assert.equal(await repository.process(capture), "processed");
  assert.equal(await repository.process(cycle), "processed");
  assert.equal(await repository.process(cycle), "duplicate_event");
  assert.equal(repository.payments.size, 1);

  const payment = repository.payments.get(`xendit:${paymentId}`);
  assert.equal(payment?.amountMinor, 50000);
  assert.equal(payment?.paymentType, "monthly");
  assert.equal(payment?.providerSubscriptionId, planId);
  assert.equal(payment?.status, "completed");
  assert.ok(repository.subscriptions.has(`xendit:${planId}`));
});

test("records a Xendit recurring cycle failure without overwriting lifecycle status", async () => {
  const repository = new MemoryDonationRepository();
  const activatedPayload = xenditPlanEvent("recurring.plan.activated", "2026-08-17T01:00:00.000Z");
  const activated = normalizeXenditWebhook(activatedPayload, JSON.stringify(activatedPayload), "xendit-active-before-failure");
  assert.ok(activated);
  await repository.process(activated);

  const failedPayload = {
    event: "recurring.cycle.failed",
    created: "2026-08-17T04:00:00.000Z",
    data: {
      id: "recy-failed-1",
      action_id: "py-failed-1",
      plan_id: "repl-xendit-monthly",
      amount: 500,
      currency: "PHP",
      status: "FAILED",
      schedule: { interval: "MONTH", interval_count: 1 },
      metadata: { donation_frequency: "monthly" },
    },
  };
  const failed = normalizeXenditWebhook(failedPayload, JSON.stringify(failedPayload), "xendit-cycle-failed");
  assert.ok(failed);
  assert.equal(await repository.process(failed), "processed");
  assert.equal(repository.subscriptions.get("xendit:repl-xendit-monthly")?.status, "active");
  assert.equal(repository.subscriptions.get("xendit:repl-xendit-monthly")?.lastPaymentFailedAt?.toISOString(), "2026-08-17T04:00:00.000Z");
  assert.equal(repository.payments.get("xendit:py-failed-1")?.status, "failed");
});

function paypalSaleEvent(overrides: Record<string, unknown> = {}) {
  return {
    id: "WH-SALE-1",
    event_type: "PAYMENT.SALE.COMPLETED",
    create_time: "2026-08-14T00:00:00.000Z",
    resource: {
      id: "SALE-25",
      billing_agreement_id: "I-SUBSCRIPTION",
      amount: { total: "25.00", currency: "USD" },
      create_time: "2026-08-14T00:00:00.000Z",
      update_time: "2026-08-14T00:00:01.000Z",
    },
    ...overrides,
  };
}

function paypalSubscriptionEvent(eventType: string, status: string, createTime: string) {
  return {
    id: `WH-${eventType}-${createTime}`,
    event_type: eventType,
    create_time: createTime,
    resource: {
      id: "I-SUBSCRIPTION",
      plan_id: "P-MONTHLY",
      status,
      create_time: "2026-08-14T00:00:00.000Z",
      update_time: createTime,
      status_update_time: createTime,
    },
  };
}

test("tracks active to cancelled subscription state without changing completed payment history", async () => {
  const repository = new MemoryDonationRepository();
  const payment = normalizePayPalWebhook(paypalSaleEvent(), JSON.stringify(paypalSaleEvent()), {
    monthlyPlanId: "P-MONTHLY",
    resolvedSubscriptionPlanId: "P-MONTHLY",
  });
  assert.ok(payment);
  assert.equal(await repository.process(payment), "processed");

  const activatedPayload = paypalSubscriptionEvent("BILLING.SUBSCRIPTION.ACTIVATED", "ACTIVE", "2026-08-14T01:00:00.000Z");
  const activated = normalizePayPalWebhook(activatedPayload, JSON.stringify(activatedPayload));
  assert.ok(activated);
  assert.equal(activated.providerSubscriptionId, "I-SUBSCRIPTION");
  assert.equal(await repository.process(activated), "processed");

  const cancelledPayload = paypalSubscriptionEvent("BILLING.SUBSCRIPTION.CANCELLED", "CANCELLED", "2026-08-14T02:00:00.000Z");
  const cancelled = normalizePayPalWebhook(cancelledPayload, JSON.stringify(cancelledPayload));
  assert.ok(cancelled);
  assert.equal(await repository.process(cancelled), "processed");
  assert.equal(await repository.process(cancelled), "duplicate_event");

  const subscription = repository.subscriptions.get("paypal:I-SUBSCRIPTION");
  assert.equal(subscription?.status, "cancelled");
  assert.equal(subscription?.planId, "P-MONTHLY");
  assert.equal(subscription?.cancelledAt?.toISOString(), "2026-08-14T02:00:00.000Z");
  assert.equal(repository.payments.get("paypal:SALE-25")?.status, "completed");
});

test("tracks active to suspended to reactivated subscription state", async () => {
  const repository = new MemoryDonationRepository();
  const events = [
    paypalSubscriptionEvent("BILLING.SUBSCRIPTION.ACTIVATED", "ACTIVE", "2026-08-14T01:00:00.000Z"),
    paypalSubscriptionEvent("BILLING.SUBSCRIPTION.SUSPENDED", "SUSPENDED", "2026-08-14T02:00:00.000Z"),
    paypalSubscriptionEvent("BILLING.SUBSCRIPTION.RE-ACTIVATED", "ACTIVE", "2026-08-14T03:00:00.000Z"),
  ];
  for (const payload of events) {
    const event = normalizePayPalWebhook(payload, JSON.stringify(payload));
    assert.ok(event);
    assert.equal(await repository.process(event), "processed");
  }
  assert.equal(repository.subscriptions.get("paypal:I-SUBSCRIPTION")?.status, "active");
  assert.equal(repository.events.size, 3);
});

test("records subscription payment failure without replacing active lifecycle status", async () => {
  const repository = new MemoryDonationRepository();
  const activatedPayload = paypalSubscriptionEvent("BILLING.SUBSCRIPTION.ACTIVATED", "ACTIVE", "2026-08-14T01:00:00.000Z");
  const failedPayload = paypalSubscriptionEvent("BILLING.SUBSCRIPTION.PAYMENT.FAILED", "ACTIVE", "2026-08-14T02:00:00.000Z");
  for (const payload of [activatedPayload, failedPayload]) {
    const event = normalizePayPalWebhook(payload, JSON.stringify(payload));
    assert.ok(event);
    assert.equal(await repository.process(event), "processed");
  }
  const subscription = repository.subscriptions.get("paypal:I-SUBSCRIPTION");
  assert.equal(subscription?.status, "active");
  assert.equal(subscription?.lastPaymentFailedAt?.toISOString(), "2026-08-14T02:00:00.000Z");
});

test("normalizes a monthly PAYMENT.SALE.COMPLETED using the trusted resolved plan", () => {
  const event = paypalSaleEvent();
  const result = normalizePayPalWebhook(event, JSON.stringify(event), {
    monthlyPlanId: "P-MONTHLY",
    annualPlanId: "P-ANNUAL",
    resolvedSubscriptionPlanId: "P-MONTHLY",
  });
  assert.equal(result?.payment?.paymentType, "monthly");
  assert.equal(result?.payment?.providerSubscriptionId, "I-SUBSCRIPTION");
  assert.equal(result?.payment?.providerTransactionId, "SALE-25");
  assert.equal(result?.payment?.amountMinor, 2500);
  assert.equal(result?.payment?.status, "completed");
});

test("normalizes an annual PAYMENT.SALE.COMPLETED using the trusted resolved plan", () => {
  const event = {
    ...paypalSaleEvent(),
    id: "WH-SALE-ANNUAL",
  };
  const result = normalizePayPalWebhook(event, JSON.stringify(event), {
    monthlyPlanId: "P-MONTHLY",
    annualPlanId: "P-ANNUAL",
    resolvedSubscriptionPlanId: "P-ANNUAL",
  });
  assert.equal(result?.payment?.paymentType, "annual");
  assert.equal(result?.payment?.providerSubscriptionId, "I-SUBSCRIPTION");
  assert.equal(result?.payment?.amountMinor, 2500);
});

test("duplicate recurring sale delivery does not create another payment", async () => {
  const repository = new MemoryDonationRepository();
  const event = paypalSaleEvent();
  const recurring = normalizePayPalWebhook(event, JSON.stringify(event), {
    monthlyPlanId: "P-MONTHLY",
    resolvedSubscriptionPlanId: "P-MONTHLY",
  });
  assert.ok(recurring);

  assert.equal(await repository.process(recurring), "processed");
  assert.equal(await repository.process(recurring), "duplicate_event");
  assert.equal(repository.events.size, 1);
  assert.equal(repository.payments.size, 1);
});

test("a previously ignored recurring sale can be recovered on redelivery", async () => {
  const repository = new MemoryDonationRepository();
  const event = paypalSaleEvent();
  const unresolved = normalizePayPalWebhook(event, JSON.stringify(event), {
    monthlyPlanId: "P-MONTHLY",
  });
  assert.ok(unresolved);
  assert.equal(unresolved.payment, null);
  assert.equal(await repository.process(unresolved), "ignored");

  const resolved = normalizePayPalWebhook(event, JSON.stringify(event), {
    monthlyPlanId: "P-MONTHLY",
    resolvedSubscriptionPlanId: "P-MONTHLY",
  });
  assert.ok(resolved);
  assert.equal(await repository.process(resolved), "processed");
  assert.equal(repository.events.size, 1);
  assert.equal(repository.payments.size, 1);
});

test("acknowledges a duplicate provider event without a second payment", async () => {
  const repository = new MemoryDonationRepository();
  const event = normalized(paypalEvent());
  assert.equal(await repository.process(event), "processed");
  assert.equal(await repository.process(event), "duplicate_event");
  assert.equal(repository.events.size, 1);
  assert.equal(repository.payments.size, 1);
});

test("a new event for the same transaction updates rather than duplicates the payment", async () => {
  const repository = new MemoryDonationRepository();
  await repository.process(normalized(paypalEvent()));
  await repository.process(normalized(paypalEvent({ id: "WH-EVENT-2" })));

  assert.equal(repository.events.size, 2);
  assert.equal(repository.payments.size, 1);
  assert.equal(repository.payments.get("paypal:CAPTURE-10")?.latestProviderEventId, "WH-EVENT-2");
});

test("refund and reversal events update the original capture without creating another donation", async () => {
  const repository = new MemoryDonationRepository();
  await repository.process(normalized(paypalEvent()));

  const refund = paypalEvent({
    id: "WH-REFUND-1",
    event_type: "PAYMENT.CAPTURE.REFUNDED",
    resource: {
      id: "REFUND-10",
      amount: { currency_code: "USD", value: "10.00" },
      supplementary_data: { related_ids: { capture_id: "CAPTURE-10", order_id: "ORDER-10" } },
      update_time: "2026-08-14T01:00:00.000Z",
    },
  });
  await repository.process(normalized(refund));
  assert.equal(repository.payments.size, 1);
  assert.equal(repository.payments.get("paypal:CAPTURE-10")?.status, "refunded");

  const reversal = paypalEvent({
    id: "WH-REVERSAL-1",
    event_type: "PAYMENT.CAPTURE.REVERSED",
    resource: {
      id: "REVERSAL-10",
      amount: { currency_code: "USD", value: "10.00" },
      supplementary_data: { related_ids: { capture_id: "CAPTURE-10", order_id: "ORDER-10" } },
      update_time: "2026-08-14T02:00:00.000Z",
    },
  });
  await repository.process(normalized(reversal));
  assert.equal(repository.payments.size, 1);
  assert.equal(repository.payments.get("paypal:CAPTURE-10")?.status, "refunded");
});

test("a database failure commits nothing and a provider retry can succeed", async () => {
  const repository = new MemoryDonationRepository();
  const event = normalized(paypalEvent());
  repository.failNext = true;

  await assert.rejects(repository.process(event), /simulated database outage/);
  assert.equal(repository.events.size, 0);
  assert.equal(repository.payments.size, 0);

  assert.equal(await repository.process(event), "processed");
  assert.equal(repository.events.size, 1);
  assert.equal(repository.payments.size, 1);
});
