import { createPayPalCheckout } from "@/lib/paypal/server";
export const runtime = "nodejs";
export async function POST(request: Request) { return createPayPalCheckout(request, "monthly"); }
