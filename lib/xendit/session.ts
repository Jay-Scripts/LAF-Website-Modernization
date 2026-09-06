import { randomUUID } from "node:crypto";

export type RecurringXenditFrequency = "monthly" | "annually";
export type XenditEnvironment = "test" | "live";
export type XenditCheckoutRequest = {
  amount: number;
  currency: "PHP";
  tierId?: string;
  tierName?: string;
  donorGivenName?: string;
};

const XENDIT_MAX_DONATION_PHP = 10_000_000;
const XENDIT_LIVE_RETURN_ORIGIN = "https://www.littlearkfoundation.org";

const XENDIT_CHECKOUT_HOSTS: Record<XenditEnvironment, ReadonlySet<string>> = {
  test: new Set(["dev.xen.to", "checkout-staging.xendit.co"]),
  live: new Set(["xen.to", "checkout.xendit.co"]),
};

export function getXenditEnvironment(vercelEnvironment: string | undefined): XenditEnvironment {
  return vercelEnvironment?.trim().toLowerCase() === "production" ? "live" : "test";
}

export function getXenditCredentialEnvironment(secretKey: string): XenditEnvironment | null {
  if (secretKey.startsWith("xnd_production_")) return "live";
  if (secretKey.startsWith("xnd_development_")) return "test";
  return null;
}

export function isXenditCredentialForEnvironment(secretKey: string, environment: XenditEnvironment) {
  return getXenditCredentialEnvironment(secretKey) === environment;
}

export function isAllowedXenditCheckoutUrl(value: string, environment: XenditEnvironment) {
  try {
    const url = new URL(value);
    return url.protocol === "https:" && XENDIT_CHECKOUT_HOSTS[environment].has(url.hostname);
  } catch {
    return false;
  }
}

export function areValidXenditReturnUrls(
  successUrl: string,
  cancelUrl: string,
  environment: XenditEnvironment,
) {
  try {
    const success = new URL(successUrl);
    const cancel = new URL(cancelUrl);
    if (success.protocol !== "https:" || cancel.protocol !== "https:") return false;
    if (environment === "test") return true;

    return success.href === `${XENDIT_LIVE_RETURN_ORIGIN}/donate/xendit/success`
      && cancel.href === `${XENDIT_LIVE_RETURN_ORIGIN}/donate/xendit/cancel`;
  } catch {
    return false;
  }
}

export function parseXenditCheckoutPayload(body: unknown): XenditCheckoutRequest | null {
  if (!body || typeof body !== "object" || Array.isArray(body)) return null;

  const payload = body as Record<string, unknown>;
  const amount = typeof payload.amount === "number" ? payload.amount : Number(payload.amount);
  const tierId = typeof payload.tierId === "string" ? payload.tierId.trim() : "";
  const tierName = typeof payload.tierName === "string" ? payload.tierName.trim() : "";
  const donorGivenName = typeof payload.donorGivenName === "string" ? payload.donorGivenName.trim() : "";

  if (
    !Number.isSafeInteger(amount)
    || amount <= 0
    || amount > XENDIT_MAX_DONATION_PHP
    || payload.currency !== "PHP"
    || tierId.length > 40
    || tierName.length > 80
    || (donorGivenName && !isValidXenditGivenName(donorGivenName))
  ) return null;

  return {
    amount,
    currency: "PHP",
    tierId: tierId || undefined,
    tierName: tierName || undefined,
    donorGivenName: donorGivenName || undefined,
  };
}

export function buildXenditOneTimeSession({
  amount,
  tierId,
  tierName,
  successUrl,
  cancelUrl,
  id = randomUUID(),
}: {
  amount: number;
  tierId?: string;
  tierName?: string;
  successUrl: string;
  cancelUrl: string;
  id?: string;
}) {
  return {
    reference_id: `laf-donation-${id}`,
    session_type: "PAY",
    mode: "PAYMENT_LINK",
    amount,
    currency: "PHP",
    country: "PH",
    locale: "en",
    description: "Donation to Little Ark Foundation",
    success_return_url: successUrl,
    cancel_return_url: cancelUrl,
    metadata: {
      donation_frequency: "one-time",
      donation_tier_id: tierId || "other",
      donation_tier_name: tierName || "Other Amount",
    },
  } as const;
}

export function isValidXenditGivenName(value: string) {
  return value.length >= 1 && value.length <= 50 && /^[A-Za-z0-9 ]+$/.test(value);
}

export function getXenditSubscriptionAnchor(
  now = new Date(),
  frequency: RecurringXenditFrequency = "monthly",
) {
  const anchor = new Date(now);
  const originalDay = anchor.getUTCDate();
  const intervalMonths = frequency === "monthly" ? 1 : 12;

  // Xendit only accepts anchor dates through the 28th. Set a safe day before
  // moving the month so dates near month-end cannot roll into an extra month.
  anchor.setUTCDate(Math.min(originalDay, 28));
  anchor.setUTCMonth(anchor.getUTCMonth() + intervalMonths);
  return anchor.toISOString();
}

export function buildXenditSubscriptionSession({
  amount,
  frequency,
  donorGivenName,
  tierId,
  tierName,
  successUrl,
  cancelUrl,
  now,
  id = randomUUID(),
}: {
  amount: number;
  frequency: RecurringXenditFrequency;
  donorGivenName: string;
  tierId?: string;
  tierName?: string;
  successUrl: string;
  cancelUrl: string;
  now?: Date;
  id?: string;
}) {
  const compactId = id.replace(/[^A-Za-z0-9]/g, "");
  const intervalCount = frequency === "monthly" ? 1 : 12;

  return {
    reference_id: `laf-${frequency}-${id}`.slice(0, 64),
    session_type: "SUBSCRIPTION",
    mode: "PAYMENT_LINK",
    amount,
    currency: "PHP",
    country: "PH",
    locale: "en",
    description: `${frequency === "monthly" ? "Monthly" : "Annual"} donation to Little Ark Foundation`,
    allowed_payment_channels: ["CARDS"],
    customer: {
      reference_id: `lafdonor${compactId}`.slice(0, 64),
      type: "INDIVIDUAL",
      individual_detail: { given_names: donorGivenName },
    },
    subscription: {
      schedule: {
        interval: "MONTH",
        interval_count: intervalCount,
        anchor_date: getXenditSubscriptionAnchor(now, frequency),
      },
      immediate_payment: true,
      failed_cycle_action: "RESUME",
    },
    success_return_url: successUrl,
    cancel_return_url: cancelUrl,
    metadata: {
      donation_frequency: frequency,
      donation_tier_id: tierId || "other",
      donation_tier_name: tierName || "Other Amount",
    },
  } as const;
}
