import { Resend } from "resend";

type ContactPayload = {
  fullName?: unknown;
  email?: unknown;
  phone?: unknown;
  reason?: unknown;
  message?: unknown;
};

const fieldLimits = {
  fullName: 100,
  email: 160,
  phone: 30,
  reason: 160,
  message: 3000,
} as const;

function clean(value: unknown, limit: number) {
  return typeof value === "string"
    ? value.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "").trim().slice(0, limit)
    : "";
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function emailRow(label: string, value: string) {
  return `
    <tr>
      <td style="padding: 12px 16px; font-weight: 700; color: #005ba8; border-bottom: 1px solid #dff4ff; width: 180px;">${label}</td>
      <td style="padding: 12px 16px; color: #08233d; border-bottom: 1px solid #dff4ff;">${value || "Not provided"}</td>
    </tr>
  `;
}

export async function POST(request: Request) {
  let payload: ContactPayload;

  try {
    payload = await request.json();
  } catch {
    return Response.json({ message: "Please check the form and try again." }, { status: 400 });
  }

  const fullName = clean(payload.fullName, fieldLimits.fullName);
  const email = clean(payload.email, fieldLimits.email).toLowerCase();
  const phone = clean(payload.phone, fieldLimits.phone);
  const reason = clean(payload.reason, fieldLimits.reason);
  const message = clean(payload.message, fieldLimits.message);

  if (!fullName || !email || !reason || !message) {
    return Response.json({ message: "Please complete all required fields." }, { status: 400 });
  }

  if (!isValidEmail(email)) {
    return Response.json({ message: "Please enter a valid email address." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.LITTLE_ARK_CONTACT_EMAIL;
  const fromEmail = process.env.RESEND_FROM_EMAIL;

  if (!apiKey || !toEmail || !fromEmail) {
    return Response.json({ message: "We could not send your message right now. Please try again soon." }, { status: 500 });
  }

  const submittedAt = new Intl.DateTimeFormat("en-US", {
    dateStyle: "long",
    timeStyle: "long",
    timeZone: "Asia/Manila",
  }).format(new Date());

  const html = `
    <div style="font-family: Arial, sans-serif; background: #effaff; padding: 28px;">
      <div style="max-width: 680px; margin: 0 auto; background: #ffffff; border: 1px solid #c8f4ff; border-radius: 20px; overflow: hidden;">
        <div style="background: #005ba8; padding: 22px 26px;">
          <h1 style="margin: 0; color: #ffffff; font-size: 24px;">New Contact Form Submission</h1>
        </div>
        <table style="width: 100%; border-collapse: collapse;">
          ${emailRow("Name", escapeHtml(fullName))}
          ${emailRow("Email", escapeHtml(email))}
          ${emailRow("Phone", escapeHtml(phone))}
          ${emailRow("Reason", escapeHtml(reason))}
          ${emailRow("Date & Time Submitted", escapeHtml(submittedAt))}
        </table>
        <div style="padding: 20px 26px 28px;">
          <p style="margin: 0 0 10px; font-weight: 700; color: #005ba8;">Message</p>
          <div style="white-space: pre-wrap; color: #08233d; line-height: 1.6;">${escapeHtml(message)}</div>
        </div>
      </div>
    </div>
  `;

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from: fromEmail,
    to: toEmail,
    replyTo: email,
    subject: `New Contact Form Submission — ${reason}`,
    html,
  });

  if (error) {
    return Response.json({ message: "We could not send your message right now. Please try again soon." }, { status: 502 });
  }

  return Response.json({ message: "Message sent." });
}
