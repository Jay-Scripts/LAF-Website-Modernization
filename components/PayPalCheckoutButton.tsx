"use client";

import { useState } from "react";

export default function PayPalCheckoutButton() {
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState("");
  async function checkout() {
    const selector = document.querySelector<HTMLElement>('[data-donation-selector="USD"]');
    const amount = Number(selector?.dataset.donationAmount);
    const frequency = selector?.dataset.donationFrequency;
    if (!selector || !Number.isSafeInteger(amount) || amount <= 0 || !["one-time", "monthly", "annually"].includes(frequency || "")) {
      setMessage("Please choose a valid donation amount and frequency."); return;
    }
    setPending(true); setMessage("");
    try {
      const response = await fetch(`/api/donations/paypal/${frequency}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ amount, currency: "USD", tierId: selector.dataset.donationTierId, tierName: selector.dataset.donationTierName }) });
      const result = await response.json() as { checkoutUrl?: unknown; message?: unknown };
      if (!response.ok || typeof result.checkoutUrl !== "string") { setMessage(typeof result.message === "string" ? result.message : "Unable to start PayPal checkout."); return; }
      const url = new URL(result.checkoutUrl);
      if (url.protocol !== "https:" || !(url.hostname === "paypal.com" || url.hostname.endsWith(".paypal.com"))) { setMessage("PayPal returned an invalid checkout link."); return; }
      window.location.assign(url.href);
    } catch { setMessage("Unable to start PayPal checkout. Please try again."); }
    finally { setPending(false); }
  }
  return <div><button type="button" onClick={checkout} disabled={pending} className="inline-flex min-h-[52px] items-center justify-center rounded-full bg-[#ffc83d] px-7 text-[15px] font-black uppercase text-[#061d34] shadow-[0_16px_38px_rgba(255,200,61,0.32)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_22px_46px_rgba(255,200,61,0.44)] focus-visible:-translate-y-0.5 focus-visible:outline-none disabled:cursor-wait disabled:opacity-70 max-[620px]:w-full">{pending ? "Opening PayPal…" : "Donate with PayPal"}</button>{message ? <p role="alert" className="mb-0 mt-3 text-sm font-bold text-[#b23b3b]">{message}</p> : null}</div>;
}
