import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

import {
  areValidXenditReturnUrls,
  buildXenditOneTimeSession,
  buildXenditSubscriptionSession,
  getXenditCredentialEnvironment,
  getXenditEnvironment,
  getXenditSubscriptionAnchor,
  isAllowedXenditCheckoutUrl,
  isXenditCredentialForEnvironment,
  isValidXenditGivenName,
  parseXenditCheckoutPayload,
} from "../lib/xendit/session";

const fixedDate = new Date("2026-08-17T10:00:00.000Z");

test("matches Xendit credentials to Vercel deployment environments", () => {
  assert.equal(getXenditEnvironment("production"), "live");
  assert.equal(getXenditEnvironment("preview"), "test");
  assert.equal(getXenditEnvironment("development"), "test");
  assert.equal(getXenditEnvironment(undefined), "test");
  assert.equal(getXenditCredentialEnvironment("xnd_production_redacted"), "live");
  assert.equal(getXenditCredentialEnvironment("xnd_development_redacted"), "test");
  assert.equal(getXenditCredentialEnvironment("unexpected_key"), null);
  assert.equal(isXenditCredentialForEnvironment("xnd_production_redacted", "live"), true);
  assert.equal(isXenditCredentialForEnvironment("xnd_development_redacted", "live"), false);
  assert.equal(isXenditCredentialForEnvironment("xnd_development_redacted", "test"), true);
});

test("allows only environment-appropriate hosted Xendit checkout URLs", () => {
  assert.equal(isAllowedXenditCheckoutUrl("https://xen.to/live", "live"), true);
  assert.equal(isAllowedXenditCheckoutUrl("https://checkout.xendit.co/live", "live"), true);
  assert.equal(isAllowedXenditCheckoutUrl("https://dev.xen.to/test", "live"), false);
  assert.equal(isAllowedXenditCheckoutUrl("https://checkout-staging.xendit.co/test", "live"), false);
  assert.equal(isAllowedXenditCheckoutUrl("https://dev.xen.to/test", "test"), true);
  assert.equal(isAllowedXenditCheckoutUrl("https://xen.to/live", "test"), false);
});

test("requires canonical Little Ark return URLs for Live checkout", () => {
  const liveSuccess = "https://www.littlearkfoundation.org/donate/xendit/success";
  const liveCancel = "https://www.littlearkfoundation.org/donate/xendit/cancel";
  assert.equal(areValidXenditReturnUrls(liveSuccess, liveCancel, "live"), true);
  assert.equal(areValidXenditReturnUrls("https://preview.vercel.app/donate/xendit/success", liveCancel, "live"), false);
  assert.equal(areValidXenditReturnUrls(liveSuccess, "https://dev.xen.to/cancel", "live"), false);
  assert.equal(areValidXenditReturnUrls("https://preview.vercel.app/success", "https://preview.vercel.app/cancel", "test"), true);
});

test("preserves the existing one-time Xendit PAY session payload", () => {
  const payload = buildXenditOneTimeSession({
    amount: 500,
    tierId: "hope",
    tierName: "Hope Keeper",
    successUrl: "https://example.com/success",
    cancelUrl: "https://example.com/cancel",
    id: "one-time-test-id",
  });

  assert.equal(payload.session_type, "PAY");
  assert.equal(payload.mode, "PAYMENT_LINK");
  assert.equal(payload.amount, 500);
  assert.equal(payload.currency, "PHP");
  assert.equal(payload.metadata.donation_frequency, "one-time");
  assert.equal("subscription" in payload, false);
  assert.equal("customer" in payload, false);
});

test("builds an indefinite monthly Xendit Subscription session", () => {
  const payload = buildXenditSubscriptionSession({
    amount: 500,
    frequency: "monthly",
    donorGivenName: "Test Donor",
    tierId: "hope",
    tierName: "Hope Keeper",
    successUrl: "https://example.com/success",
    cancelUrl: "https://example.com/cancel",
    now: fixedDate,
    id: "monthly-test-id",
  });

  assert.equal(payload.session_type, "SUBSCRIPTION");
  assert.equal(payload.mode, "PAYMENT_LINK");
  assert.equal(payload.amount, 500);
  assert.deepEqual(payload.allowed_payment_channels, ["CARDS"]);
  assert.equal(payload.subscription.schedule.interval, "MONTH");
  assert.equal(payload.subscription.schedule.interval_count, 1);
  assert.equal(payload.subscription.schedule.anchor_date, "2026-09-17T10:00:00.000Z");
  assert.equal(payload.subscription.immediate_payment, true);
  assert.equal("total_recurrence" in payload.subscription.schedule, false);
  assert.equal(payload.metadata.donation_frequency, "monthly");
});

test("builds an indefinite yearly Xendit schedule as one cycle every 12 months", () => {
  const payload = buildXenditSubscriptionSession({
    amount: 6000,
    frequency: "annually",
    donorGivenName: "Test Donor",
    successUrl: "https://example.com/success",
    cancelUrl: "https://example.com/cancel",
    now: fixedDate,
    id: "annual-test-id",
  });

  assert.equal(payload.amount, 6000);
  assert.equal(payload.subscription.schedule.interval, "MONTH");
  assert.equal(payload.subscription.schedule.interval_count, 12);
  assert.equal(payload.subscription.schedule.anchor_date, "2027-08-17T10:00:00.000Z");
  assert.equal(payload.subscription.immediate_payment, true);
  assert.equal("total_recurrence" in payload.subscription.schedule, false);
  assert.equal(payload.metadata.donation_frequency, "annually");
});

test("anchors scheduled billing one full interval after the immediate payment", () => {
  assert.equal(getXenditSubscriptionAnchor(fixedDate, "monthly"), "2026-09-17T10:00:00.000Z");
  assert.equal(getXenditSubscriptionAnchor(fixedDate, "annually"), "2027-08-17T10:00:00.000Z");
  assert.equal(
    getXenditSubscriptionAnchor(new Date("2026-08-31T10:00:00.000Z"), "monthly"),
    "2026-09-28T10:00:00.000Z",
  );
});

test("validates only the minimum supported Xendit given-name format", () => {
  assert.equal(isValidXenditGivenName("Jean"), true);
  assert.equal(isValidXenditGivenName("Jean Paul2"), true);
  assert.equal(isValidXenditGivenName(""), false);
  assert.equal(isValidXenditGivenName("Jean-Paul"), false);
  assert.equal(isValidXenditGivenName("a".repeat(51)), false);
});

test("validates Xendit checkout amount, currency, metadata, and donor name", () => {
  assert.deepEqual(parseXenditCheckoutPayload({
    amount: 1000,
    currency: "PHP",
    tierId: "care",
    tierName: "Care Keeper",
    donorGivenName: "Test Donor",
  }), {
    amount: 1000,
    currency: "PHP",
    tierId: "care",
    tierName: "Care Keeper",
    donorGivenName: "Test Donor",
  });
  assert.equal(parseXenditCheckoutPayload({ amount: 10.5, currency: "PHP" }), null);
  assert.equal(parseXenditCheckoutPayload({ amount: 1000, currency: "USD" }), null);
  assert.equal(parseXenditCheckoutPayload({ amount: 1000, currency: "PHP", donorGivenName: "Test-Donor" }), null);
});

test("keeps the Xendit secret out of client code", async () => {
  const clientSource = await readFile(new URL("../components/XenditCheckoutButton.tsx", import.meta.url), "utf8");
  const serverSource = await readFile(new URL("../lib/xendit/server.ts", import.meta.url), "utf8");

  assert.doesNotMatch(clientSource, /XENDIT_SECRET_KEY|process\.env/);
  assert.match(serverSource, /^import "server-only";/);
  assert.match(serverSource, /process\.env\.XENDIT_SECRET_KEY/);
  assert.match(serverSource, /"api-version": "2026-01-01"/);
});
