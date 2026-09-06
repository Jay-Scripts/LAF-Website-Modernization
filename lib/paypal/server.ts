import "server-only";

import { randomUUID } from "node:crypto";

import { normalizePayPalWebhook } from "@/lib/donations/normalizers";
import { persistDonationWebhook } from "@/lib/donations/repository";

export type PayPalDonationFrequency = "one-time" | "monthly" | "annually";

type PayPalConfig = {
  clientId: string | null;
  clientSecret: string | null;
  environment: "sandbox" | "live";
  monthlyPlanId: string | null;
  annualPlanId: string | null;
  webhookId: string | null;
  successReturnUrl: string | null;
  cancelReturnUrl: string | null;
};

type PayPalLink = { href?: unknown; rel?: unknown };
type PayPalResponse = { id?: unknown; status?: unknown; links?: unknown; details?: unknown; message?: unknown };
type PayPalErrorCategory = "access_token_unavailable" | "paypal_api_unreachable" | "paypal_api_rejected";

const MAX_BODY_BYTES = 16_384;
const MAX_WEBHOOK_BYTES = 1_000_000;
const MAX_USD = 1_000_000;

function getConfig(): PayPalConfig {
  return {
    clientId: process.env.PAYPAL_CLIENT_ID?.trim() || null,
    clientSecret: process.env.PAYPAL_CLIENT_SECRET?.trim() || null,
    environment: process.env.PAYPAL_ENVIRONMENT?.trim().toLowerCase() === "live" ? "live" : "sandbox",
    monthlyPlanId: process.env.PAYPAL_MONTHLY_PLAN_ID?.trim() || null,
    annualPlanId: process.env.PAYPAL_ANNUAL_PLAN_ID?.trim() || null,
    webhookId: process.env.PAYPAL_WEBHOOK_ID?.trim() || null,
    successReturnUrl: process.env.PAYPAL_SUCCESS_RETURN_URL?.trim() || null,
    cancelReturnUrl: process.env.PAYPAL_CANCEL_RETURN_URL?.trim() || null,
  };
}

function checkoutConfigurationIssue() {
  const config = getConfig();
  const missingVariables = [
    !config.clientId ? "PAYPAL_CLIENT_ID" : null,
    !config.clientSecret ? "PAYPAL_CLIENT_SECRET" : null,
    !process.env.PAYPAL_ENVIRONMENT?.trim() ? "PAYPAL_ENVIRONMENT" : null,
  ].filter((name): name is string => Boolean(name));
  const configuredEnvironment = process.env.PAYPAL_ENVIRONMENT?.trim().toLowerCase();
  const environmentIsValid = configuredEnvironment === "sandbox" || configuredEnvironment === "live";

  if (missingVariables.length === 0 && environmentIsValid) return null;

  return { missingVariables, environmentIsValid };
}

function safeConfigurationStatus() {
  const config = getConfig();
  const configuredEnvironment = process.env.PAYPAL_ENVIRONMENT?.trim().toLowerCase();
  return {
    missingEnvironmentVariables: [
      !config.clientId ? "PAYPAL_CLIENT_ID" : null,
      !config.clientSecret ? "PAYPAL_CLIENT_SECRET" : null,
      !configuredEnvironment ? "PAYPAL_ENVIRONMENT" : null,
    ].filter((name): name is string => Boolean(name)),
    environmentValid: configuredEnvironment === "sandbox" || configuredEnvironment === "live",
    clientIdConfigured: Boolean(config.clientId),
    clientSecretConfigured: Boolean(config.clientSecret),
  };
}

function checkoutErrorResponse(message: string, status: number, category: string, details?: Record<string, unknown>) {
  const config = getConfig();
  return Response.json(
    config.environment === "sandbox"
      ? { message, diagnostic: { category, ...safeConfigurationStatus(), ...details } }
      : { message },
    { status },
  );
}

function apiBase(environment: PayPalConfig["environment"]) {
  return environment === "live" ? "https://api-m.paypal.com" : "https://api-m.sandbox.paypal.com";
}

function isObject(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function sameOriginRequest(request: Request) {
  const origin = request.headers.get("origin");
  return request.headers.get("sec-fetch-site") !== "cross-site" && (!origin || origin === new URL(request.url).origin);
}

function validHttpsUrl(value: string) {
  try {
    return new URL(value).protocol === "https:";
  } catch {
    return false;
  }
}

function returnUrls(request: Request) {
  const config = getConfig();
  const origin = new URL(request.url).origin;
  return {
    success: config.successReturnUrl || `${origin}/donate/paypal/success`,
    cancel: config.cancelReturnUrl || `${origin}/donate/paypal/cancel`,
  };
}

async function accessToken() {
  const config = getConfig();
  if (!config.clientId || !config.clientSecret) {
    console.error("PayPal access token request skipped because server credentials are unavailable.", {
      clientIdConfigured: Boolean(config.clientId),
      clientSecretConfigured: Boolean(config.clientSecret),
    });
    return null;
  }

  let response: Response;
  try {
    response = await fetch(`${apiBase(config.environment)}/v1/oauth2/token`, {
      method: "POST",
      cache: "no-store",
      headers: {
        Accept: "application/json",
        Authorization: `Basic ${Buffer.from(`${config.clientId}:${config.clientSecret}`, "utf8").toString("base64")}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: "grant_type=client_credentials",
    });
  } catch {
    console.error("Unable to reach PayPal for an access token.");
    return null;
  }
  if (!response.ok) {
    console.error("PayPal access token request failed.", { status: response.status });
    return null;
  }
  const body = (await response.json()) as Record<string, unknown>;
  if (typeof body.access_token !== "string") {
    console.error("PayPal access token response did not include an access token.");
    return null;
  }
  return body.access_token;
}

async function parseDonation(request: Request) {
  const length = Number(request.headers.get("content-length"));
  if (Number.isFinite(length) && length > MAX_BODY_BYTES) return null;
  let value: unknown;
  try {
    value = await request.json();
  } catch {
    return null;
  }
  if (!isObject(value)) return null;
  const amount = typeof value.amount === "number" ? value.amount : Number(value.amount);
  const tierId = typeof value.tierId === "string" ? value.tierId.trim() : "";
  const tierName = typeof value.tierName === "string" ? value.tierName.trim() : "";
  if (!Number.isSafeInteger(amount) || amount <= 0 || amount > MAX_USD || value.currency !== "USD" || tierId.length > 40 || tierName.length > 80) return null;
  return { amount, tierId: tierId || "other", tierName: tierName || "Other Amount" };
}

function approvalUrl(body: PayPalResponse) {
  if (!Array.isArray(body.links)) return null;
  const link = (body.links as PayPalLink[]).find((item) => item?.rel === "payer-action" || item?.rel === "approve");
  if (typeof link?.href !== "string") return null;
  try {
    const url = new URL(link.href);
    return url.protocol === "https:" && (url.hostname.endsWith(".paypal.com") || url.hostname === "paypal.com") ? url.href : null;
  } catch {
    return null;
  }
}

async function paypalRequest(path: string, init: RequestInit) {
  const config = getConfig();
  const token = await accessToken();
  if (!token) return { response: null, body: null, errorCategory: "access_token_unavailable" as PayPalErrorCategory };
  let response: Response;
  try {
    response = await fetch(`${apiBase(config.environment)}${path}`, {
      ...init,
      cache: "no-store",
      headers: { Accept: "application/json", Authorization: `Bearer ${token}`, "Content-Type": "application/json", ...(init.headers || {}) },
    });
  } catch {
    console.error("Unable to reach PayPal API.");
    return { response: null, body: null, errorCategory: "paypal_api_unreachable" as PayPalErrorCategory };
  }
  let body: PayPalResponse | null = null;
  try { body = (await response.json()) as PayPalResponse; } catch { /* no provider body */ }
  if (!response.ok) {
    console.error("PayPal API request failed.", { status: response.status, message: typeof body?.message === "string" ? body.message.slice(0, 240) : null });
  }
  return { response, body, errorCategory: response.ok ? null : "paypal_api_rejected" as PayPalErrorCategory };
}

async function resolveSubscriptionPlanId(event: Record<string, unknown>) {
  const eventType = typeof event.event_type === "string" ? event.event_type : "";
  if (!eventType.startsWith("PAYMENT.SALE.")) return { planId: null, failed: false };

  const resource = isObject(event.resource) ? event.resource : null;
  const embeddedPlanId = typeof resource?.billing_plan_id === "string"
    ? resource.billing_plan_id
    : typeof resource?.plan_id === "string"
      ? resource.plan_id
      : null;
  if (embeddedPlanId) return { planId: embeddedPlanId, failed: false };

  const subscriptionId = typeof resource?.billing_agreement_id === "string"
    ? resource.billing_agreement_id
    : typeof resource?.subscription_id === "string"
      ? resource.subscription_id
      : null;
  if (!subscriptionId || !/^I-[A-Z0-9]+$/.test(subscriptionId)) {
    return { planId: null, failed: false };
  }

  const { response, body } = await paypalRequest(
    `/v1/billing/subscriptions/${encodeURIComponent(subscriptionId)}`,
    { method: "GET" },
  );
  if (!response?.ok || !body) return { planId: null, failed: true };

  const details = body as Record<string, unknown>;
  return {
    planId: typeof details.plan_id === "string" ? details.plan_id : null,
    failed: false,
  };
}

export async function createPayPalCheckout(request: Request, frequency: PayPalDonationFrequency) {
  if (!sameOriginRequest(request)) return Response.json({ message: "Cross-site checkout requests are not allowed." }, { status: 403 });
  const donation = await parseDonation(request);
  if (!donation) return Response.json({ message: "Please provide a valid whole-dollar USD donation amount." }, { status: 400 });

  const configurationIssue = checkoutConfigurationIssue();
  if (configurationIssue) {
    console.error("PayPal checkout configuration validation failed.", configurationIssue);
    return checkoutErrorResponse("PayPal checkout is temporarily unavailable.", 503, "configuration_invalid");
  }

  const urls = returnUrls(request);
  if (!validHttpsUrl(urls.success) || !validHttpsUrl(urls.cancel)) {
    console.error("PayPal checkout return URL validation failed.", {
      successReturnUrlIsHttps: validHttpsUrl(urls.success),
      cancelReturnUrlIsHttps: validHttpsUrl(urls.cancel),
    });
    return Response.json({ message: "PayPal checkout requires configured HTTPS return URLs." }, { status: 503 });
  }
  const customId = `laf-${frequency}-${randomUUID()}`;

  if (frequency === "one-time") {
    const captureReturn = new URL("/api/donations/paypal/capture", new URL(request.url).origin);
    const { response, body, errorCategory } = await paypalRequest("/v2/checkout/orders", {
      method: "POST",
      headers: { "PayPal-Request-Id": customId },
      body: JSON.stringify({
        intent: "CAPTURE",
        purchase_units: [{ reference_id: "DONATION", custom_id: customId, description: "Donation to Little Ark Foundation", amount: { currency_code: "USD", value: donation.amount.toFixed(2) } }],
        payment_source: { paypal: { experience_context: { brand_name: "Little Ark Foundation", shipping_preference: "NO_SHIPPING", user_action: "PAY_NOW", return_url: captureReturn.href, cancel_url: urls.cancel } } },
      }),
    });
    const approve = body ? approvalUrl(body) : null;
    if (!response?.ok) {
      return checkoutErrorResponse("PayPal checkout is temporarily unavailable.", 502, errorCategory || "paypal_order_failed", {
        providerStatus: response?.status || null,
      });
    }
    if (!approve) {
      console.error("PayPal order response did not include a supported payer approval link.", {
        providerStatus: response.status,
        orderStatus: typeof body?.status === "string" ? body.status : null,
        linkRelations: Array.isArray(body?.links)
          ? (body.links as PayPalLink[]).map((link) => typeof link?.rel === "string" ? link.rel : "unknown").slice(0, 10)
          : [],
      });
      return checkoutErrorResponse("PayPal checkout is temporarily unavailable.", 502, "approval_link_missing", {
        providerStatus: response.status,
        orderStatus: typeof body?.status === "string" ? body.status : null,
      });
    }
    return Response.json({ checkoutUrl: approve, orderId: typeof body?.id === "string" ? body.id : null });
  }

  const config = getConfig();
  const planId = frequency === "monthly" ? config.monthlyPlanId : config.annualPlanId;
  if (!planId || !/^P-[A-Z0-9]+$/.test(planId)) return Response.json({ message: `PayPal ${frequency === "monthly" ? "monthly" : "annual"} donations are not configured yet.` }, { status: 503 });
  const { response, body } = await paypalRequest("/v1/billing/subscriptions", {
    method: "POST",
    headers: { "PayPal-Request-Id": customId },
    body: JSON.stringify({
      plan_id: planId,
      custom_id: customId,
      application_context: { brand_name: "Little Ark Foundation", shipping_preference: "NO_SHIPPING", user_action: "SUBSCRIBE_NOW", return_url: urls.success, cancel_url: urls.cancel },
      plan: { billing_cycles: [{ sequence: 1, pricing_scheme: { fixed_price: { currency_code: "USD", value: donation.amount.toFixed(2) } } }] },
    }),
  });
  const approve = body ? approvalUrl(body) : null;
  if (!response?.ok || !approve) return Response.json({ message: "PayPal subscription checkout is temporarily unavailable." }, { status: 502 });
  return Response.json({ checkoutUrl: approve, subscriptionId: typeof body?.id === "string" ? body.id : null });
}

export async function capturePayPalOrder(request: Request) {
  const url = new URL(request.url);
  const orderId = url.searchParams.get("token") || "";
  const success = returnUrls(request).success;
  if (!/^[A-Z0-9]+$/.test(orderId) || !validHttpsUrl(success)) return Response.redirect(returnUrls(request).cancel, 303);
  const { response, body } = await paypalRequest(`/v2/checkout/orders/${encodeURIComponent(orderId)}/capture`, { method: "POST", headers: { "PayPal-Request-Id": `capture-${orderId}` } });
  if (!response?.ok || body?.status !== "COMPLETED") return Response.redirect(returnUrls(request).cancel, 303);
  return Response.redirect(success, 303);
}

export async function handlePayPalWebhook(request: Request) {
  const config = getConfig();
  if (!config.webhookId) return Response.json({ message: "Webhook unavailable." }, { status: 503 });
  const headers = {
    auth_algo: request.headers.get("paypal-auth-algo"), cert_url: request.headers.get("paypal-cert-url"),
    transmission_id: request.headers.get("paypal-transmission-id"), transmission_sig: request.headers.get("paypal-transmission-sig"),
    transmission_time: request.headers.get("paypal-transmission-time"),
  };
  if (Object.values(headers).some((value) => !value)) return Response.json({ message: "Unauthorized." }, { status: 401 });
  const length = Number(request.headers.get("content-length"));
  if (Number.isFinite(length) && length > MAX_WEBHOOK_BYTES) return Response.json({ message: "Payload too large." }, { status: 413 });
  let rawBody: string;
  try { rawBody = await request.text(); } catch { return Response.json({ message: "Invalid payload." }, { status: 400 }); }
  if (new TextEncoder().encode(rawBody).byteLength > MAX_WEBHOOK_BYTES) return Response.json({ message: "Payload too large." }, { status: 413 });
  let event: unknown;
  try { event = JSON.parse(rawBody); } catch { return Response.json({ message: "Invalid payload." }, { status: 400 }); }
  if (!isObject(event)) return Response.json({ message: "Invalid payload." }, { status: 400 });
  const { response, body } = await paypalRequest("/v1/notifications/verify-webhook-signature", { method: "POST", body: JSON.stringify({ ...headers, webhook_id: config.webhookId, webhook_event: event }) });
  if (!response?.ok || !body || (body as Record<string, unknown>).verification_status !== "SUCCESS") return Response.json({ message: "Unauthorized." }, { status: 401 });
  const subscriptionPlan = await resolveSubscriptionPlanId(event);
  if (subscriptionPlan.failed) {
    console.error("Authenticated PayPal sale could not resolve its subscription plan.", {
      eventId: typeof event.id === "string" ? event.id : null,
    });
    return Response.json({ message: "Webhook processing is temporarily unavailable." }, { status: 503 });
  }
  const normalized = normalizePayPalWebhook(event, rawBody, {
    monthlyPlanId: config.monthlyPlanId,
    annualPlanId: config.annualPlanId,
    resolvedSubscriptionPlanId: subscriptionPlan.planId,
  });
  if (!normalized) return Response.json({ message: "Invalid webhook event." }, { status: 400 });
  try {
    const result = await persistDonationWebhook(normalized);
    console.info("Authenticated PayPal webhook processed.", {
      eventType: normalized.eventType,
      eventId: normalized.providerEventId,
      result,
    });
    return Response.json({ received: true, duplicate: result === "duplicate_event" });
  } catch {
    console.error("PayPal webhook persistence failed.", {
      eventType: normalized.eventType,
      eventId: normalized.providerEventId,
    });
    return Response.json({ message: "Webhook persistence is temporarily unavailable." }, { status: 503 });
  }
}
