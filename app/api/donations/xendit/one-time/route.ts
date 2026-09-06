import { createXenditCheckout } from "@/lib/xendit/server";

export const runtime = "nodejs";

export async function POST(request: Request) {
  return createXenditCheckout(request, "one-time");
}
