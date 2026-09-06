import "server-only";

import { createHash, timingSafeEqual } from "node:crypto";

import { normalizeXenditWebhook } from "@/lib/donations/normalizers";
import { persistDonationWebhook } from "@/lib/donations/repository";
import {
  areValidXenditReturnUrls,
  buildXenditOneTimeSession,
  buildXenditSubscriptionSession,
  getXenditEnvironment,
  isAllowedXenditCheckoutUrl,
  isXenditCredentialForEnvironment,
  parseXenditCheckoutPayload,
  type XenditCheckoutRequest,
} from "@/lib/xendit/session";

export type XenditDonationFrequency = "one-time" | "monthly" | "annually";

type XenditServerConfig = {
  secretKey: string | null;
  webhookVerificationToken: string | null;
  successReturnUrl: string | null;
  cancelReturnUrl: string | null;
};

type XenditWebhookPayload = Record<string, unknown>;

const XENDIT_WEBHOOK_MAX_BYTES = 1_000_000;
const XENDIT_CHECKOUT_MAX_BYTES = 16_384;
const XENDIT_API_URL = "https://api.xendit.co/sessions";

export function getXenditServerConfig(): XenditServerConfig {
  return {
    secretKey: process.env.XENDIT_SECRET_KEY?.trim() || null,
    webhookVerificationToken: process.env.XENDIT_WEBHOOK_VERIFICATION_TOKEN?.trim() || null,
    successReturnUrl: process.env.XENDIT_SUCCESS_RETURN_URL?.trim() || null,
    cancelReturnUrl: process.env.XENDIT_CANCEL_RETURN_URL?.trim() || null,
  };
}

export function getXenditReturnUrls(request: Request) {
  const config = getXenditServerConfig();
  const origin = new URL(request.url).origin;

  return {
    successUrl: config.successReturnUrl || `${origin}/donate/xendit/success`,
    cancelUrl: config.cancelReturnUrl || `${origin}/donate/xendit/cancel`,
  };
}

function tokensMatch(receivedToken: string, expectedToken: string) {
  const receivedDigest = createHash("sha256").update(receivedToken, "utf8").digest();
  const expectedDigest = createHash("sha256").update(expectedToken, "utf8").digest();

  return timingSafeEqual(receivedDigest, expectedDigest);
}

function isWebhookPayload(value: unknown): value is XenditWebhookPayload {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function getSafeWebhookSummary(payload: XenditWebhookPayload, webhookId: string | null) {
  const data = isWebhookPayload(payload.data) ? payload.data : null;
  const event = typeof payload.event === "string" ? payload.event : "legacy.xendit.callback";
  const resourceIdCandidates = [
    data?.payment_id,
    data?.payment_request_id,
    data?.payment_session_id,
    data?.plan_id,
    data?.id,
    payload.payment_id,
    payload.id,
  ];
  const resourceId = resourceIdCandidates.find((value): value is string => typeof value === "string") ?? null;

  return { event, resourceId, webhookId };
}

export async function handleXenditWebhook(request: Request) {
  const { webhookVerificationToken } = getXenditServerConfig();

  if (!webhookVerificationToken) {
    console.error("Xendit webhook configuration is unavailable.");
    return Response.json({ message: "Webhook is temporarily unavailable." }, { status: 503 });
  }

  const receivedToken = request.headers.get("x-callback-token")?.trim();

  if (!receivedToken || !tokensMatch(receivedToken, webhookVerificationToken)) {
    console.warn("Rejected an unauthenticated Xendit webhook request.");
    return Response.json({ message: "Unauthorized." }, { status: 401 });
  }

  const contentLength = Number(request.headers.get("content-length"));
  if (Number.isFinite(contentLength) && contentLength > XENDIT_WEBHOOK_MAX_BYTES) {
    return Response.json({ message: "Webhook payload is too large." }, { status: 413 });
  }

  let rawBody: string;
  try {
    rawBody = await request.text();
  } catch {
    return Response.json({ message: "Unable to read webhook payload." }, { status: 400 });
  }

  if (new TextEncoder().encode(rawBody).byteLength > XENDIT_WEBHOOK_MAX_BYTES) {
    return Response.json({ message: "Webhook payload is too large." }, { status: 413 });
  }

  let payload: unknown;
  try {
    payload = JSON.parse(rawBody);
  } catch {
    return Response.json({ message: "Invalid webhook payload." }, { status: 400 });
  }

  if (!isWebhookPayload(payload)) {
    return Response.json({ message: "Invalid webhook payload." }, { status: 400 });
  }

  const webhookId = request.headers.get("webhook-id");
  const summary = getSafeWebhookSummary(payload, webhookId);
  const normalized = normalizeXenditWebhook(payload, rawBody, webhookId);
  if (!normalized) return Response.json({ message: "Invalid webhook event." }, { status: 400 });

  try {
    const result = await persistDonationWebhook(normalized);
    console.info("Authenticated Xendit webhook processed.", { ...summary, result });
    return Response.json(
      { received: true, duplicate: result === "duplicate_event" },
      { status: 200 },
    );
  } catch {
    console.error("Xendit webhook persistence failed.", summary);
    return Response.json(
      { message: "Webhook persistence is temporarily unavailable." },
      { status: 503 },
    );
  }
}

export async function parseXenditCheckoutRequest(request: Request): Promise<XenditCheckoutRequest | null> {
  const contentLength = Number(request.headers.get("content-length"));
  if (Number.isFinite(contentLength) && contentLength > XENDIT_CHECKOUT_MAX_BYTES) {
    return null;
  }

  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return null;
  }

  return parseXenditCheckoutPayload(body);
}

type XenditSessionResponse = {
  payment_session_id?: unknown;
  recurring_plan_id?: unknown;
  reference_id?: unknown;
  payment_link_url?: unknown;
};

function getSafeXenditError(status: number) {
  if (status === 401 || status === 403) {
    return "Xendit checkout is not configured correctly.";
  }

  if (status === 400 || status === 409) {
    return "Xendit could not create this checkout. Please verify the amount and try again.";
  }

  return "Xendit checkout is temporarily unavailable. Please try again shortly.";
}

type XenditErrorResponse = {
  error_code?: unknown;
  message?: unknown;
  errors?: unknown;
  detail?: unknown;
};

function getSanitizedXenditError(value: unknown) {
  if (!isWebhookPayload(value)) return null;

  const payload = value as XenditErrorResponse;
  const fieldPaths = Array.isArray(payload.errors)
    ? payload.errors
        .filter(isWebhookPayload)
        .map((error) => (typeof error.path === "string" ? error.path : null))
        .filter((path): path is string => Boolean(path))
        .slice(0, 10)
    : [];

  return {
    errorCode: typeof payload.error_code === "string" ? payload.error_code : null,
    message:
      typeof payload.message === "string"
        ? payload.message.slice(0, 300)
        : typeof payload.detail === "string"
          ? payload.detail.slice(0, 300)
          : null,
    fieldPaths,
  };
}

export async function createXenditCheckout(request: Request, frequency: XenditDonationFrequency) {
  const requestUrl = new URL(request.url);
  const requestOrigin = request.headers.get("origin");
  if (
    request.headers.get("sec-fetch-site") === "cross-site" ||
    (requestOrigin && requestOrigin !== requestUrl.origin)
  ) {
    return Response.json({ message: "Cross-site checkout requests are not allowed." }, { status: 403 });
  }

  const payload = await parseXenditCheckoutRequest(request);

  if (!payload) {
    return Response.json({ message: "Please provide a valid PHP donation amount." }, { status: 400 });
  }

  if (frequency !== "one-time" && !payload.donorGivenName) {
    return Response.json(
      { message: "Please provide your first or given name to set up a recurring donation." },
      { status: 400 },
    );
  }

  const config = getXenditServerConfig();
  const { secretKey } = config;
  if (!secretKey) {
    console.error("Xendit checkout configuration is unavailable.");
    return Response.json({ message: "Xendit checkout is temporarily unavailable." }, { status: 503 });
  }
  const xenditEnvironment = getXenditEnvironment(process.env.VERCEL_ENV);
  if (!isXenditCredentialForEnvironment(secretKey, xenditEnvironment)) {
    console.error("Xendit credential does not match the current deployment environment.");
    return Response.json({ message: "Xendit checkout is not configured correctly." }, { status: 503 });
  }
  if (xenditEnvironment === "live" && (!config.successReturnUrl || !config.cancelReturnUrl)) {
    console.error("Xendit Live checkout requires explicit canonical return URLs.");
    return Response.json({ message: "Xendit checkout is not configured correctly." }, { status: 503 });
  }

  const { successUrl, cancelUrl } = getXenditReturnUrls(request);
  if (!areValidXenditReturnUrls(successUrl, cancelUrl, xenditEnvironment)) {
    console.error("Xendit checkout requires HTTPS return URLs.");
    return Response.json(
      {
        message:
          "Xendit checkout requires secure return URLs. Configure XENDIT_SUCCESS_RETURN_URL and XENDIT_CANCEL_RETURN_URL with HTTPS URLs.",
      },
      { status: 503 },
    );
  }
  const requestBody = frequency === "one-time"
    ? buildXenditOneTimeSession({
        amount: payload.amount,
        tierId: payload.tierId,
        tierName: payload.tierName,
        successUrl,
        cancelUrl,
      })
    : buildXenditSubscriptionSession({
        amount: payload.amount,
        frequency,
        donorGivenName: payload.donorGivenName!,
        tierId: payload.tierId,
        tierName: payload.tierName,
        successUrl,
        cancelUrl,
      });

  let xenditResponse: Response;
  try {
    xenditResponse = await fetch(XENDIT_API_URL, {
      method: "POST",
      cache: "no-store",
      headers: {
        Accept: "application/json",
        Authorization: `Basic ${Buffer.from(`${secretKey}:`, "utf8").toString("base64")}`,
        "Content-Type": "application/json",
        "api-version": "2026-01-01",
      },
      body: JSON.stringify(requestBody),
    });
  } catch {
    console.error("Unable to reach Xendit while creating a donation checkout.");
    return Response.json({ message: "Xendit checkout is temporarily unavailable." }, { status: 502 });
  }

  if (!xenditResponse.ok) {
    let providerError: unknown = null;
    try {
      providerError = await xenditResponse.json();
    } catch {
      // Keep the diagnostic empty when Xendit does not return JSON.
    }
    console.error("Xendit rejected a donation checkout request.", {
      status: xenditResponse.status,
      provider: getSanitizedXenditError(providerError),
    });
    return Response.json({ message: getSafeXenditError(xenditResponse.status) }, { status: 502 });
  }

  let session: XenditSessionResponse;
  try {
    session = (await xenditResponse.json()) as XenditSessionResponse;
  } catch {
    console.error("Xendit returned an invalid checkout response.");
    return Response.json({ message: "Xendit checkout is temporarily unavailable." }, { status: 502 });
  }

  const checkoutUrl = typeof session.payment_link_url === "string" ? session.payment_link_url : "";
  if (!isAllowedXenditCheckoutUrl(checkoutUrl, xenditEnvironment)) {
    console.error("Xendit returned an invalid hosted checkout URL.");
    return Response.json({ message: "Xendit checkout is temporarily unavailable." }, { status: 502 });
  }

  return Response.json({
    checkoutUrl,
    referenceId:
      typeof session.reference_id === "string" ? session.reference_id : requestBody.reference_id,
    sessionId:
      typeof session.payment_session_id === "string" ? session.payment_session_id : null,
    recurringPlanId:
      typeof session.recurring_plan_id === "string" ? session.recurring_plan_id : null,
    environment: xenditEnvironment,
  });
}
