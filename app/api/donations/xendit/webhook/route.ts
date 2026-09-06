import { handleXenditWebhook } from "@/lib/xendit/server";

export const runtime = "nodejs";

export async function POST(request: Request) {
  return handleXenditWebhook(request);
}
