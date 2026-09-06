"use client";

import { useState } from "react";

type CheckoutResponse = {
  checkoutUrl?: unknown;
  environment?: unknown;
  message?: unknown;
};

const XENDIT_HOSTS = {
  live: new Set(["xen.to", "checkout.xendit.co"]),
  test: new Set(["dev.xen.to", "checkout-staging.xendit.co"]),
} as const;

function isXenditCheckoutUrl(value: unknown, environment: unknown): value is string {
  if (typeof value !== "string" || (environment !== "live" && environment !== "test")) return false;

  try {
    const url = new URL(value);
    return url.protocol === "https:" && XENDIT_HOSTS[environment].has(url.hostname);
  } catch {
    return false;
  }
}

export default function XenditCheckoutButton() {
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState("");

  async function beginCheckout() {
    const selector = document.querySelector<HTMLElement>('[data-donation-selector="PHP"]');
    const amount = Number(selector?.dataset.donationAmount);
    const frequency = selector?.dataset.donationFrequency;
    const donorGivenName = selector?.dataset.donationDonorGivenName?.trim() || "";

    if (!selector || !Number.isSafeInteger(amount) || amount <= 0) {
      setMessage("Please choose or enter a valid whole-peso donation amount.");
      return;
    }

    if (frequency !== "one-time" && frequency !== "monthly" && frequency !== "annually") {
      setMessage("Please choose a donation frequency.");
      return;
    }

    if (frequency !== "one-time" && (!donorGivenName || donorGivenName.length > 50 || !/^[A-Za-z0-9 ]+$/.test(donorGivenName))) {
      setMessage("Please enter your first or given name using letters, numbers, and spaces only.");
      return;
    }

    setPending(true);
    setMessage("");

    try {
      const response = await fetch(`/api/donations/xendit/${frequency}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount,
          currency: "PHP",
          tierId: selector.dataset.donationTierId,
          tierName: selector.dataset.donationTierName,
          ...(frequency === "one-time" ? {} : { donorGivenName }),
        }),
      });
      const result = (await response.json()) as CheckoutResponse;

      if (!response.ok) {
        setMessage(typeof result.message === "string" ? result.message : "Unable to start Xendit checkout.");
        return;
      }

      if (!isXenditCheckoutUrl(result.checkoutUrl, result.environment)) {
        setMessage("Xendit returned an invalid checkout link. Please try again.");
        return;
      }

      window.location.assign(result.checkoutUrl);
    } catch {
      setMessage("Unable to start Xendit checkout. Please check your connection and try again.");
    } finally {
      setPending(false);
    }
  }

  return (
    <div>
      <button
        type="button"
        onClick={beginCheckout}
        disabled={pending}
        className="inline-flex min-h-[52px] items-center justify-center rounded-full bg-[#ffc83d] px-7 text-[15px] font-black uppercase text-[#061d34] shadow-[0_16px_38px_rgba(255,200,61,0.32)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_22px_46px_rgba(255,200,61,0.44)] focus-visible:-translate-y-0.5 focus-visible:outline-none disabled:cursor-wait disabled:opacity-70 disabled:hover:translate-y-0 max-[620px]:w-full"
      >
        {pending ? "Opening Xendit…" : "Donate with Xendit"}
      </button>
      {message ? (
        <p className="mb-0 mt-3 text-sm font-bold leading-[1.45] text-[#b23b3b]" role="alert">
          {message}
        </p>
      ) : null}
    </div>
  );
}
