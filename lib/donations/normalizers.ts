import { createHash } from "node:crypto";

import type {
  DonationPaymentStatus,
  DonationPaymentType,
  NormalizedDonationPayment,
  DonationSubscriptionStatus,
  NormalizedDonationWebhook,
} from "@/lib/donations/types";

type UnknownRecord = Record<string, unknown>;

function record(value: unknown): UnknownRecord | null {
  return value !== null && typeof value === "object" && !Array.isArray(value) ? value as UnknownRecord : null;
}

function text(value: unknown, maxLength = 255) {
  return typeof value === "string" && value.trim() ? value.trim().slice(0, maxLength) : null;
}

function nested(source: UnknownRecord | null, ...path: string[]) {
  let value: unknown = source;
  for (const key of path) {
    value = Array.isArray(value) && /^\d+$/.test(key)
      ? value[Number(key)]
      : record(value)?.[key];
    if (value === undefined) return undefined;
  }
  return value;
}

function firstText(values: unknown[], maxLength = 255) {
  for (const value of values) {
    const candidate = text(value, maxLength);
    if (candidate) return candidate;
  }
  return null;
}

function date(value: unknown) {
  const candidate = text(value, 80);
  if (!candidate) return null;
  const parsed = new Date(candidate);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

export function payloadHash(rawBody: string) {
  return createHash("sha256").update(rawBody, "utf8").digest("hex");
}

export function moneyToMinor(value: unknown) {
  const candidate = typeof value === "number" ? value.toString() : text(value, 40);
  if (!candidate || !/^\d+(?:\.\d{1,2})?$/.test(candidate)) return null;
  const [whole, decimal = ""] = candidate.split(".");
  const minor = Number(whole) * 100 + Number(decimal.padEnd(2, "0"));
  return Number.isSafeInteger(minor) && minor > 0 ? minor : null;
}

function firstMoneyToMinor(values: unknown[]) {
  for (const value of values) {
    const minor = moneyToMinor(value);
    if (minor) return minor;
  }
  return null;
}

function paymentType(value: unknown): DonationPaymentType | null {
  const normalized = text(value, 80)?.toLowerCase().replaceAll("-", "_");
  if (normalized === "one_time" || normalized === "onetime") return "one_time";
  if (normalized === "monthly" || normalized === "month") return "monthly";
  if (normalized === "annually" || normalized === "annual" || normalized === "yearly" || normalized === "year") return "annual";
  return null;
}

function paymentTypeFromReference(value: unknown) {
  const reference = text(value, 255)?.toLowerCase() || "";
  if (reference.includes("-monthly-")) return "monthly" as const;
  if (reference.includes("-annually-") || reference.includes("-annual-")) return "annual" as const;
  if (reference.includes("-one-time-") || reference.includes("-one_time-")) return "one_time" as const;
  return null;
}

function email(value: unknown) {
  const candidate = text(value, 320)?.toLowerCase() || null;
  return candidate && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(candidate) ? candidate : null;
}

function safeReferences(entries: Array<[string, string | null]>) {
  return Object.fromEntries(entries.filter((entry): entry is [string, string] => Boolean(entry[1])));
}

function paypalStatus(eventType: string): DonationPaymentStatus | null {
  if (eventType === "PAYMENT.CAPTURE.COMPLETED" || eventType === "PAYMENT.SALE.COMPLETED") return "completed";
  if (eventType === "PAYMENT.CAPTURE.REFUNDED" || eventType === "PAYMENT.SALE.REFUNDED") return "refunded";
  if (eventType === "PAYMENT.CAPTURE.REVERSED" || eventType === "PAYMENT.SALE.REVERSED") return "reversed";
  if (eventType.endsWith(".DENIED") || eventType.endsWith(".FAILED")) return "failed";
  return null;
}

function paypalSubscriptionStatus(eventType: string, value: unknown): DonationSubscriptionStatus | null {
  const providerStatus = text(value, 32)?.toLowerCase();
  if (providerStatus === "approval_pending" || providerStatus === "approved" || providerStatus === "active"
    || providerStatus === "suspended" || providerStatus === "cancelled" || providerStatus === "expired") {
    return providerStatus;
  }
  if (eventType === "BILLING.SUBSCRIPTION.CREATED") return "approval_pending";
  if (eventType === "BILLING.SUBSCRIPTION.ACTIVATED" || eventType === "BILLING.SUBSCRIPTION.RE-ACTIVATED") return "active";
  if (eventType === "BILLING.SUBSCRIPTION.SUSPENDED") return "suspended";
  if (eventType === "BILLING.SUBSCRIPTION.CANCELLED") return "cancelled";
  if (eventType === "BILLING.SUBSCRIPTION.EXPIRED") return "expired";
  return null;
}

export function normalizePayPalWebhook(
  event: UnknownRecord,
  rawBody: string,
  plans: {
    monthlyPlanId?: string | null;
    annualPlanId?: string | null;
    resolvedSubscriptionPlanId?: string | null;
  } = {},
): NormalizedDonationWebhook | null {
  const providerEventId = text(event.id);
  const eventType = text(event.event_type, 160);
  if (!providerEventId || !eventType) return null;

  const resource = record(event.resource);
  const relatedIds = record(nested(resource, "supplementary_data", "related_ids"));
  const amount = record(resource?.amount);
  const customId = firstText([
    resource?.custom_id,
    nested(resource, "purchase_units", "0", "custom_id"),
    resource?.invoice_id,
  ]);
  const orderId = firstText([relatedIds?.order_id, resource?.order_id]);
  const captureId = firstText([relatedIds?.capture_id, resource?.capture_id]);
  const isSubscriptionEvent = eventType.startsWith("BILLING.SUBSCRIPTION.");
  const resourceId = text(resource?.id);
  const subscriptionId = firstText([
    resource?.billing_agreement_id,
    resource?.subscription_id,
    relatedIds?.subscription_id,
    isSubscriptionEvent ? resourceId : null,
  ]);
  const status = paypalStatus(eventType);
  const transactionId = eventType.includes("REFUND") || eventType.includes("REVERSED")
    ? captureId || resourceId
    : resourceId;
  const currency = firstText([amount?.currency_code, amount?.currency, resource?.currency_code], 3)?.toUpperCase();
  const amountMinor = firstMoneyToMinor([amount?.value, amount?.total, resource?.amount_total]);
  const planId = firstText([
    resource?.plan_id,
    resource?.billing_plan_id,
    nested(resource, "billing_info", "plan_id"),
    plans.resolvedSubscriptionPlanId,
  ]);
  const recurringType = (planId && plans.monthlyPlanId === planId ? "monthly" : null)
    || (planId && plans.annualPlanId === planId ? "annual" : null)
    || null;
  const inferredType = subscriptionId
    ? recurringType
    : paymentTypeFromReference(customId) || "one_time";
  const providerCreatedAt = date(resource?.create_time) || date(event.create_time);
  const paidAt = status === "completed" ? date(resource?.update_time) || providerCreatedAt : null;

  let payment: NormalizedDonationPayment | null = null;
  if (status && transactionId && amountMinor && currency === "USD" && inferredType) {
    payment = {
      providerTransactionId: transactionId,
      providerOrderId: orderId,
      providerSubscriptionId: subscriptionId,
      providerCustomerId: firstText([nested(resource, "payer", "payer_id"), resource?.payer_id]),
      paymentType: inferredType,
      amountMinor,
      currency: "USD",
      status,
      donorEmail: email(firstText([nested(resource, "payer", "email_address"), resource?.payer_email])),
      tierId: null,
      tierName: null,
      providerCreatedAt,
      paidAt,
      providerReferences: safeReferences([
        ["eventId", providerEventId],
        ["captureId", captureId || (eventType.includes("CAPTURE") ? resourceId : null)],
        ["resourceId", resourceId],
        ["orderId", orderId],
        ["subscriptionId", subscriptionId],
        ["customId", customId],
        ["planId", planId],
      ]),
    };
  }

  const providerEventAt = date(event.create_time);
  const subscriptionStatus = isSubscriptionEvent ? paypalSubscriptionStatus(eventType, resource?.status) : null;
  const subscription = isSubscriptionEvent && subscriptionId && (subscriptionStatus || eventType === "BILLING.SUBSCRIPTION.UPDATED" || eventType === "BILLING.SUBSCRIPTION.PAYMENT.FAILED")
    ? {
        providerSubscriptionId: subscriptionId,
        planId,
        status: subscriptionStatus,
        providerCreatedAt: date(resource?.create_time),
        providerUpdatedAt: date(resource?.update_time) || date(resource?.status_update_time),
        latestProviderEventAt: providerEventAt,
        cancelledAt: eventType === "BILLING.SUBSCRIPTION.CANCELLED"
          ? date(resource?.status_update_time) || date(resource?.update_time) || providerEventAt
          : null,
        lastPaymentFailedAt: eventType === "BILLING.SUBSCRIPTION.PAYMENT.FAILED" ? providerEventAt : null,
      }
    : null;

  return {
    provider: "paypal",
    providerEventId,
    eventType,
    payloadHash: payloadHash(rawBody),
    providerCreatedAt: providerEventAt,
    providerTransactionId: transactionId,
    providerOrderId: orderId,
    providerSubscriptionId: subscriptionId,
    payment,
    subscription,
  };
}

function xenditStatus(eventType: string, value: unknown): DonationPaymentStatus | null {
  const status = text(value, 80)?.toUpperCase() || "";
  const event = eventType.toLowerCase();
  if (event === "payment.capture" || event === "recurring.cycle.succeeded") return "completed";
  if (event === "payment.failure" || event === "recurring.cycle.failed") return "failed";
  if (["SUCCEEDED", "SUCCESS", "COMPLETED", "PAID", "CAPTURED", "SETTLED"].includes(status)) return "completed";
  if (event.includes("refund") || status === "REFUNDED") return "refunded";
  if (event.includes("revers") || status === "REVERSED") return "reversed";
  if (["FAILED", "EXPIRED", "DECLINED"].includes(status)) return "failed";
  if (["CANCELED", "CANCELLED"].includes(status)) return "canceled";
  if (["PENDING", "REQUIRES_ACTION", "AUTHORIZED"].includes(status)) return "pending";
  if (event.includes("payment") && (event.includes("succeeded") || event.includes("capture"))) return "completed";
  return null;
}

function xenditPaymentType(data: UnknownRecord, metadata: UnknownRecord | null, subscriptionId: string | null) {
  const explicit = paymentType(metadata?.donation_frequency) || paymentType(data.frequency);
  if (explicit) return explicit;

  const fromReference = paymentTypeFromReference(data.reference_id);
  if (fromReference) return fromReference;

  const interval = firstText([
    nested(data, "schedule", "interval"),
    nested(data, "subscription", "schedule", "interval"),
    nested(data, "plan", "schedule", "interval"),
  ])?.toUpperCase();
  const intervalCountValue = nested(data, "schedule", "interval_count")
    ?? nested(data, "subscription", "schedule", "interval_count")
    ?? nested(data, "plan", "schedule", "interval_count");
  const intervalCount = Number(intervalCountValue || 0);
  if (interval === "MONTH" && intervalCount === 1) return "monthly" as const;
  if (interval === "MONTH" && intervalCount === 12) return "annual" as const;
  return subscriptionId ? null : "one_time" as const;
}

function xenditSubscriptionStatus(eventType: string, value: unknown): DonationSubscriptionStatus | null {
  const event = eventType.toLowerCase();
  const status = text(value, 40)?.toUpperCase();
  if (event === "recurring.plan.activated" || status === "ACTIVE") return "active";
  if (event === "recurring.plan.inactivated" || status === "INACTIVE") return "cancelled";
  if (event === "payment_session.completed") return "approval_pending";
  if (event === "payment_session.expired") return "expired";
  if (status === "REQUIRES_ACTION" || status === "PENDING") return "approval_pending";
  return null;
}

export function normalizeXenditWebhook(
  payload: UnknownRecord,
  rawBody: string,
  webhookId: string | null,
): NormalizedDonationWebhook | null {
  const data = record(payload.data) || payload;
  const eventType = firstText([payload.event, payload.event_type, payload.type], 160) || "legacy.xendit.callback";
  const hash = payloadHash(rawBody);
  const providerEventId = firstText([webhookId, payload.event_id, payload.webhook_id]) || `payload-${hash}`;
  const metadata = record(data.metadata)
    || record(nested(data, "payment_request", "metadata"))
    || record(nested(data, "plan", "metadata"))
    || record(payload.metadata);
  const status = xenditStatus(eventType, firstText([data.status, data.payment_status, payload.status]));
  const resourceId = firstText([data.payment_id, data.action_id, data.id, payload.payment_id, payload.id]);
  const cyclePaymentId = firstText([
    nested(data, "attempt_details", "0", "payment_id"),
  ]);
  const originalPaymentId = firstText([data.original_payment_id, data.payment_id, data.capture_id]);
  const transactionId = status === "refunded" || status === "reversed"
    ? originalPaymentId || cyclePaymentId || resourceId
    : cyclePaymentId || resourceId;
  const orderId = firstText([
    data.payment_session_id,
    data.payment_request_id,
    data.reference_id,
    payload.payment_session_id,
    payload.external_id,
  ]);
  const isSubscriptionSession = firstText([data.session_type, payload.session_type])?.toUpperCase() === "SUBSCRIPTION";
  const subscriptionId = firstText([
    data.recurring_plan_id,
    data.subscription_id,
    data.plan_id,
    nested(data, "plan", "id"),
    eventType.startsWith("recurring.plan.") ? data.id : null,
    payload.recurring_plan_id,
    payload.subscription_id,
    payload.plan_id,
  ]);
  const currency = firstText([data.currency, payload.currency], 3)?.toUpperCase();
  const amountMinor = firstMoneyToMinor([
    data.amount,
    data.request_amount,
    data.capture_amount,
    data.paid_amount,
    nested(data, "captures", "0", "capture_amount"),
    payload.amount,
  ]);
  const frequency = xenditPaymentType(data, metadata, subscriptionId);
  const providerCreatedAt = date(data.created) || date(data.created_at) || date(payload.created);
  const paidAt = status === "completed"
    ? date(data.paid_at) || date(data.updated) || date(data.updated_at) || providerCreatedAt
    : null;

  let payment: NormalizedDonationPayment | null = null;
  const isPaymentEvent = eventType === "payment.capture"
    || eventType === "payment.failure"
    || eventType === "refund.succeeded"
    || eventType.includes("revers")
    || eventType === "recurring.cycle.succeeded"
    || eventType === "recurring.cycle.failed"
    || (eventType === "payment_session.completed" && !isSubscriptionSession);
  if (status && transactionId && amountMinor && currency === "PHP" && frequency && isPaymentEvent) {
    payment = {
      providerTransactionId: transactionId,
      providerOrderId: orderId,
      providerSubscriptionId: subscriptionId,
      providerCustomerId: firstText([nested(data, "customer", "id"), data.customer_id]),
      paymentType: frequency,
      amountMinor,
      currency: "PHP",
      status,
      donorEmail: email(firstText([nested(data, "customer", "email"), data.payer_email, data.email])),
      tierId: text(metadata?.donation_tier_id, 80),
      tierName: text(metadata?.donation_tier_name, 160),
      providerCreatedAt,
      paidAt,
      providerReferences: safeReferences([
        ["eventId", providerEventId],
        ["paymentId", resourceId],
        ["originalPaymentId", originalPaymentId],
        ["orderId", orderId],
        ["subscriptionId", subscriptionId],
        ["referenceId", firstText([data.reference_id, payload.external_id])],
      ]),
    };
  }

  const isPlanEvent = eventType.startsWith("recurring.plan.");
  const isCycleEvent = eventType.startsWith("recurring.cycle.");
  const isSubscriptionPaymentEvent = subscriptionId && (eventType === "payment.capture" || eventType === "payment.failure");
  const subscriptionEvent = Boolean(subscriptionId) && (isSubscriptionSession || isPlanEvent || isCycleEvent || isSubscriptionPaymentEvent);
  const subscriptionStatus = subscriptionEvent ? xenditSubscriptionStatus(eventType, data.status) : null;
  const latestProviderEventAt = date(payload.created) || date(data.updated) || date(data.created);
  const subscription = subscriptionEvent && subscriptionId
    ? {
        providerSubscriptionId: subscriptionId,
        planId: subscriptionId,
        status: subscriptionStatus,
        providerCreatedAt: date(data.created),
        providerUpdatedAt: date(data.updated),
        latestProviderEventAt,
        cancelledAt: eventType === "recurring.plan.inactivated" ? latestProviderEventAt : null,
        lastPaymentFailedAt: eventType === "recurring.cycle.retrying"
          || eventType === "recurring.cycle.failed"
          || eventType === "payment.failure"
          ? latestProviderEventAt
          : null,
      }
    : null;

  return {
    provider: "xendit",
    providerEventId,
    eventType,
    payloadHash: hash,
    providerCreatedAt: date(payload.created) || providerCreatedAt,
    providerTransactionId: transactionId,
    providerOrderId: orderId,
    providerSubscriptionId: subscriptionId,
    payment,
    subscription,
  };
}
