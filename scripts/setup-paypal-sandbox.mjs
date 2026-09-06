#!/usr/bin/env node

import { randomUUID } from "node:crypto";

const API_BASE = "https://api-m.sandbox.paypal.com";
const PRODUCT_NAME = "Little Ark Foundation Recurring Donations";
const PRODUCT_DESCRIPTION = "Recurring charitable donations to Little Ark Foundation";
const MONTHLY_PLAN_NAME = "Little Ark Foundation Monthly Recurring Donations";
const ANNUAL_PLAN_NAME = "Little Ark Foundation Annual Recurring Donations";
const CONFIRM_FLAG = "--confirm-create";

function fail(message) {
  console.error(message);
  process.exit(1);
}

const clientId = process.env.PAYPAL_CLIENT_ID?.trim();
const clientSecret = process.env.PAYPAL_CLIENT_SECRET?.trim();
const environment = process.env.PAYPAL_ENVIRONMENT?.trim().toLowerCase();

if (!clientId || !clientSecret) fail("PAYPAL_CLIENT_ID and PAYPAL_CLIENT_SECRET must be set securely in the local environment.");
if (environment !== "sandbox") fail("Refusing to run: PAYPAL_ENVIRONMENT must be exactly 'sandbox'.");

async function getAccessToken() {
  let response;
  try {
    response = await fetch(`${API_BASE}/v1/oauth2/token`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`, "utf8").toString("base64")}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: "grant_type=client_credentials",
    });
  } catch {
    fail("Unable to reach PayPal Sandbox.");
  }
  const body = await readJson(response);
  if (!response.ok || typeof body?.access_token !== "string") fail(`PayPal Sandbox authentication failed (${response.status}).`);
  return body.access_token;
}

async function readJson(response) {
  try {
    return await response.json();
  } catch {
    return null;
  }
}

function safeProviderMessage(body) {
  return typeof body?.message === "string" ? `: ${body.message.slice(0, 240)}` : "";
}

const token = await getAccessToken();

async function paypal(path, init = {}) {
  let response;
  try {
    response = await fetch(`${API_BASE}${path}`, {
      ...init,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        ...(init.headers || {}),
      },
    });
  } catch {
    fail("Unable to reach PayPal Sandbox.");
  }
  const body = await readJson(response);
  if (!response.ok) fail(`PayPal Sandbox request failed (${response.status})${safeProviderMessage(body)}`);
  return body;
}

async function listAll(path, property) {
  const results = [];
  for (let page = 1; page <= 1000; page += 1) {
    const separator = path.includes("?") ? "&" : "?";
    const body = await paypal(`${path}${separator}page_size=20&page=${page}&total_required=true`, {
      headers: { Prefer: "return=representation" },
    });
    const items = Array.isArray(body?.[property]) ? body[property] : [];
    results.push(...items);
    if (items.length < 20 || page >= Number(body?.total_pages || 1)) break;
  }
  return results;
}

async function findOrCreateProduct() {
  const products = await listAll("/v1/catalogs/products", "products");
  const matches = products.filter((product) => product?.name === PRODUCT_NAME);
  if (matches.length > 1) fail(`Multiple Sandbox products named '${PRODUCT_NAME}' already exist. Resolve duplicates before rerunning.`);
  if (matches.length === 1) {
    const product = await paypal(`/v1/catalogs/products/${encodeURIComponent(matches[0].id)}`);
    if (product.type !== "SERVICE") fail(`Existing product '${PRODUCT_NAME}' is not type SERVICE.`);
    return product;
  }
  if (!process.argv.includes(CONFIRM_FLAG)) fail(`Product is missing. Rerun with ${CONFIRM_FLAG} to authorize one-time Sandbox creation.`);
  return paypal("/v1/catalogs/products", {
    method: "POST",
    headers: { Prefer: "return=representation", "PayPal-Request-Id": `laf-product-${randomUUID()}` },
    body: JSON.stringify({ name: PRODUCT_NAME, description: PRODUCT_DESCRIPTION, type: "SERVICE", category: "CHARITY" }),
  });
}

async function activatePlan(plan) {
  if (plan.status === "ACTIVE") return plan;
  await paypal(`/v1/billing/plans/${encodeURIComponent(plan.id)}/activate`, { method: "POST" });
  return paypal(`/v1/billing/plans/${encodeURIComponent(plan.id)}`);
}

function validatePlan(plan, intervalUnit) {
  const cycle = Array.isArray(plan?.billing_cycles) ? plan.billing_cycles.find((item) => item?.tenure_type === "REGULAR") : null;
  const price = cycle?.pricing_scheme?.fixed_price;
  if (cycle?.frequency?.interval_unit !== intervalUnit || cycle?.frequency?.interval_count !== 1 || cycle?.total_cycles !== 0 || price?.currency_code !== "USD") {
    fail(`Existing plan '${plan?.name}' does not match the required ${intervalUnit} cadence and USD currency.`);
  }
}

async function findOrCreatePlan(productId, name, intervalUnit) {
  const plans = await listAll(`/v1/billing/plans?product_id=${encodeURIComponent(productId)}`, "plans");
  const matches = plans.filter((plan) => plan?.name === name);
  if (matches.length > 1) fail(`Multiple Sandbox plans named '${name}' already exist. Resolve duplicates before rerunning.`);
  if (matches.length === 1) {
    const detail = await paypal(`/v1/billing/plans/${encodeURIComponent(matches[0].id)}`);
    validatePlan(detail, intervalUnit);
    return activatePlan(detail);
  }
  if (!process.argv.includes(CONFIRM_FLAG)) fail(`Plan '${name}' is missing. Rerun with ${CONFIRM_FLAG} to authorize one-time Sandbox creation.`);
  const created = await paypal("/v1/billing/plans", {
    method: "POST",
    headers: { Prefer: "return=representation", "PayPal-Request-Id": `laf-${intervalUnit.toLowerCase()}-${randomUUID()}` },
    body: JSON.stringify({
      product_id: productId,
      name,
      description: PRODUCT_DESCRIPTION,
      status: "ACTIVE",
      billing_cycles: [{
        frequency: { interval_unit: intervalUnit, interval_count: 1 },
        tenure_type: "REGULAR",
        sequence: 1,
        total_cycles: 0,
        pricing_scheme: { fixed_price: { value: "1.00", currency_code: "USD" } },
      }],
      payment_preferences: { auto_bill_outstanding: true, payment_failure_threshold: 1 },
    }),
  });
  const detail = await paypal(`/v1/billing/plans/${encodeURIComponent(created.id)}`);
  validatePlan(detail, intervalUnit);
  return activatePlan(detail);
}

const product = await findOrCreateProduct();
if (typeof product?.id !== "string") fail("PayPal did not return a product ID.");
const monthly = await findOrCreatePlan(product.id, MONTHLY_PLAN_NAME, "MONTH");
const annual = await findOrCreatePlan(product.id, ANNUAL_PLAN_NAME, "YEAR");

console.log(`PayPal product ID: ${product.id}`);
console.log(`Monthly plan ID: ${monthly.id}`);
console.log(`Annual plan ID: ${annual.id}`);
console.log(`Monthly plan ACTIVE: ${monthly.status === "ACTIVE"}`);
console.log(`Annual plan ACTIVE: ${annual.status === "ACTIVE"}`);
