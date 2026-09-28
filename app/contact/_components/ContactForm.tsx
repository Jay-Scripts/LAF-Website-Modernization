"use client";

import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type FormState = {
  fullName: string;
  email: string;
  phone: string;
  reason: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

const initialFormState: FormState = {
  fullName: "",
  email: "",
  phone: "",
  reason: "",
  message: "",
};

const fieldClass =
  "mt-2 h-auto min-h-12 w-full rounded-md border border-[#cbdfe9] bg-[#f6fafc] px-3 py-3 text-base font-normal text-[#08233d] outline-none placeholder:text-[#6b8191] focus-visible:border-[#0068c9] focus-visible:ring-2 focus-visible:ring-[#0068c9]/20 md:text-base";

const labelClass = "block text-sm font-semibold text-[#082f59]";
const errorClass = "mt-2 text-sm font-bold leading-[1.4] text-[#b42318]";

const fieldLimits: Record<keyof FormState, number> = {
  fullName: 100,
  email: 160,
  phone: 30,
  reason: 160,
  message: 3000,
};

function sanitizeField(field: keyof FormState, value: string) {
  const withoutControls = value.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "");
  const filtered =
    field === "email"
      ? withoutControls.replace(/[^a-zA-Z0-9@._%+\-]/g, "")
      : field === "phone"
        ? withoutControls.replace(/[^0-9+().\-\s]/g, "")
        : field === "message"
          ? withoutControls
          : withoutControls.replace(/[^a-zA-ZÀ-ÿ0-9\s'.,&()\-/]/g, "");

  return filtered.slice(0, fieldLimits[field]);
}

function validateForm(form: FormState) {
  const errors: FormErrors = {};

  if (!form.fullName.trim()) {
    errors.fullName = "Please enter your full name.";
  }

  if (!form.email.trim()) {
    errors.email = "Please enter your email address.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
    errors.email = "Please enter a valid email address.";
  }

  if (!form.reason.trim()) {
    errors.reason = "Please enter a reason for contacting us.";
  }

  if (!form.message.trim()) {
    errors.message = "Please enter your message.";
  }

  return errors;
}

export default function ContactForm() {
  const [form, setForm] = useState<FormState>(initialFormState);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const updateField = (field: keyof FormState, value: string) => {
    setForm((current) => ({ ...current, [field]: sanitizeField(field, value) }));
    setErrors((current) => {
      if (!current[field]) return current;
      const next = { ...current };
      delete next[field];
      return next;
    });
    if (status) setStatus(null);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validationErrors = validateForm(form);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setStatus(null);
      return;
    }

    setIsSubmitting(true);
    setStatus(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const result = (await response.json().catch(() => null)) as { message?: string } | null;

      if (!response.ok) {
        setStatus({
          type: "error",
          message: result?.message || "We could not send your message right now. Please try again soon.",
        });
        return;
      }

      setForm(initialFormState);
      setErrors({});
      setStatus({
        type: "success",
        message: "Thank you! We've received your message and will get back to you as soon as possible.",
      });
    } catch {
      setStatus({
        type: "error",
        message: "We could not send your message right now. Please try again soon.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form noValidate onSubmit={handleSubmit}>
      <div className="mb-8 flex items-baseline justify-between gap-4 max-[460px]:items-start max-[460px]:flex-col">
        <div>
          <h2 className="m-0 text-2xl font-bold tracking-tight text-[#082f59]">Send a message</h2>
        </div>
        <p className="m-0 text-sm text-[#557086]">* Required</p>
      </div>
      {status?.type === "success" ? (
        <div
          className="mb-6 flex items-start gap-3 rounded-md border border-[#bbf7d0] bg-[#f0fdf4] p-4 text-[#166534]"
          role="status"
          aria-live="polite"
        >
          <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#16a34a] text-white" aria-hidden="true">
            <svg viewBox="0 0 20 20" className="h-4 w-4">
              <path d="m8.1 13.8-3.3-3.3 1.3-1.3 2 2 5.6-5.6L15 6.9l-6.9 6.9Z" fill="currentColor" />
            </svg>
          </span>
          <p className="m-0 text-sm font-bold leading-[1.55]">{status.message}</p>
        </div>
      ) : null}

      <div className="grid grid-cols-2 gap-x-5 gap-y-6 max-[760px]:grid-cols-1">
        <div>
          <Label htmlFor="fullName" className={labelClass}>
            Full Name <span aria-hidden="true">*</span>
          </Label>
          <Input
            id="fullName"
            name="fullName"
            className={fieldClass}
            value={form.fullName}
            onChange={(event) => updateField("fullName", event.target.value)}
            autoComplete="name"
            placeholder="Your full name"
            maxLength={fieldLimits.fullName}
            aria-invalid={Boolean(errors.fullName)}
            aria-describedby={errors.fullName ? "fullName-error" : undefined}
          />
          {errors.fullName ? (
            <p id="fullName-error" className={errorClass}>
              {errors.fullName}
            </p>
          ) : null}
        </div>

        <div>
          <Label htmlFor="email" className={labelClass}>
            Email Address <span aria-hidden="true">*</span>
          </Label>
          <Input
            id="email"
            name="email"
            className={fieldClass}
            type="email"
            value={form.email}
            onChange={(event) => updateField("email", event.target.value)}
            autoComplete="email"
            placeholder="you@example.com"
            maxLength={fieldLimits.email}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
          />
          {errors.email ? (
            <p id="email-error" className={errorClass}>
              {errors.email}
            </p>
          ) : null}
        </div>

        <div>
          <Label htmlFor="phone" className={labelClass}>
            Phone Number
          </Label>
          <Input
            id="phone"
            name="phone"
            className={fieldClass}
            type="tel"
            value={form.phone}
            onChange={(event) => updateField("phone", event.target.value)}
            autoComplete="tel"
            placeholder="Optional"
            maxLength={fieldLimits.phone}
          />
        </div>

        <div>
          <Label htmlFor="reason" className={labelClass}>
            Reason for Contact <span aria-hidden="true">*</span>
          </Label>
          <Input
            id="reason"
            name="reason"
            className={fieldClass}
            value={form.reason}
            onChange={(event) => updateField("reason", event.target.value)}
            placeholder="Partnership, volunteering, donation, family support..."
            maxLength={fieldLimits.reason}
            aria-invalid={Boolean(errors.reason)}
            aria-describedby={errors.reason ? "reason-error" : undefined}
          />
          {errors.reason ? (
            <p id="reason-error" className={errorClass}>
              {errors.reason}
            </p>
          ) : null}
        </div>
      </div>

      <div className="mt-6">
        <Label htmlFor="message" className={labelClass}>
          Message <span aria-hidden="true">*</span>
        </Label>
        <Textarea
          id="message"
          name="message"
          className={`${fieldClass} min-h-[160px] resize-y leading-[1.55]`}
          value={form.message}
          onChange={(event) => updateField("message", event.target.value)}
          placeholder="Tell us how we can help you..."
          maxLength={fieldLimits.message}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-error" : undefined}
        />
        {errors.message ? (
          <p id="message-error" className={errorClass}>
            {errors.message}
          </p>
        ) : null}
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-4">
        <Button
          type="submit"
          disabled={isSubmitting}
          className="min-h-12 min-w-[170px] rounded-md bg-[#ffc83d] px-6 text-base font-bold text-[#08233d] hover:bg-[#f2b91f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0068c9] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSubmitting ? "Sending..." : "Send Message"}
        </Button>

        {status?.type === "error" ? (
          <p
            className="m-0 max-w-[620px] text-sm font-bold leading-[1.5] text-[#b42318]"
            role="status"
            aria-live="polite"
          >
            {status.message}
          </p>
        ) : null}
      </div>

    </form>
  );
}
