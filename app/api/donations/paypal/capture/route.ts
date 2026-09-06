import { capturePayPalOrder } from "@/lib/paypal/server";
export const runtime = "nodejs";
export async function GET(request: Request) { return capturePayPalOrder(request); }
