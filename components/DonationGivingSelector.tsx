"use client";

import { useMemo, useState } from "react";

type Frequency = "one-time" | "monthly" | "annually";

type GivingTier = {
  id: string;
  name: string;
  monthly: number;
  annual: number;
};

type DonationSelection = {
  frequency: Frequency;
  tierId: string;
  amount: string;
};

const frequencies: { id: Frequency; label: string }[] = [
  { id: "one-time", label: "One-time" },
  { id: "monthly", label: "Monthly" },
  { id: "annually", label: "Annually" },
];

export default function DonationGivingSelector({
  currency,
  locale,
  tiers,
}: {
  currency: "PHP" | "USD";
  locale: "en-PH" | "en-US";
  tiers: GivingTier[];
}) {
  const [selection, setSelection] = useState<DonationSelection>(() => ({
    frequency: "monthly",
    tierId: tiers[0]?.id ?? "other",
    amount: String(tiers[0]?.monthly ?? ""),
  }));
  const [donorGivenName, setDonorGivenName] = useState("");
  const { frequency, tierId: selectedTier, amount: selectedAmount } = selection;
  const selected = tiers.find((tier) => tier.id === selectedTier);
  const suggestedAmount = selected ? (frequency === "annually" ? selected.annual : selected.monthly) : undefined;

  const formatter = useMemo(
    () =>
      new Intl.NumberFormat(locale, {
        style: "currency",
        currency,
        maximumFractionDigits: 0,
      }),
    [currency, locale],
  );

  function chooseFrequency(nextFrequency: Frequency) {
    setSelection((current) => {
      const currentTier = tiers.find((tier) => tier.id === current.tierId);
      const nextAmount = currentTier
        ? String(nextFrequency === "annually" ? currentTier.annual : currentTier.monthly)
        : "";

      return {
        ...current,
        frequency: nextFrequency,
        amount: nextAmount,
      };
    });
  }

  function chooseTier(tierId: string) {
    const tier = tiers.find((item) => item.id === tierId);
    setSelection((current) => ({
      ...current,
      tierId,
      amount: tier ? String(current.frequency === "annually" ? tier.annual : tier.monthly) : "",
    }));
  }

  const showEditableAmount = frequency === "one-time" || selectedTier === "other";
  const amountLabel = frequency === "one-time" ? "Edit your one-time amount" : `Enter your ${frequency === "annually" ? "annual" : "monthly"} amount`;
  const numericSelectedAmount = Number(selectedAmount);
  const summaryAmount = selectedAmount && Number.isFinite(numericSelectedAmount) && numericSelectedAmount > 0 ? formatter.format(numericSelectedAmount) : "Enter amount";
  const summaryFrequency = frequency === "one-time" ? "one-time" : frequency === "monthly" ? "/ MONTH" : "/ YEAR";
  const summaryTier = selected?.name ?? "Other Amount";

  return (
    <section
      className={`min-w-0 rounded-[28px] border border-[rgba(31,168,244,0.16)] bg-[linear-gradient(135deg,#f2fbff,#fff)] px-[clamp(22px,3.5vw,38px)] py-[clamp(22px,3vw,34px)] shadow-[0_18px_48px_rgba(31,168,244,0.11)] max-[430px]:rounded-[22px] max-[430px]:p-[18px] ${currency === "PHP" && frequency !== "one-time" ? "!pb-[clamp(18px,2.2vw,26px)]" : ""}`}
      aria-labelledby="giving-selector-title"
      data-donation-selector={currency}
      data-donation-frequency={frequency}
      data-donation-tier-id={selectedTier}
      data-donation-tier-name={summaryTier}
      data-donation-amount={selectedAmount}
      data-donation-donor-given-name={donorGivenName}
    >
      <div className="mx-auto max-w-[850px] text-center">
        <p className="m-0 text-xs font-black uppercase tracking-[0.14em] text-[#008fe4]">Choose Your Gift</p>
        <h2 id="giving-selector-title" className="mb-0 mt-3 text-[clamp(28px,4.2vw,46px)] font-black leading-none text-[#1fa8f4] max-[430px]:text-[25px]">
          Make Hope Last
        </h2>
        <p className="mx-auto mb-0 mt-4 max-w-[850px] text-[clamp(16px,2vw,20px)] font-bold leading-[1.5] text-[#557086] min-[800px]:whitespace-nowrap max-[430px]:mt-3 max-[430px]:text-sm">
          Select a giving frequency and the level of support that feels right for you.
        </p>
      </div>

      <div className="mx-auto mt-5 grid w-full max-w-[520px] grid-cols-3 rounded-full border border-[#bde9ff] bg-white p-1.5 max-[430px]:mt-4 max-[430px]:p-1" role="group" aria-label="Donation frequency">
        {frequencies.map((item) => {
          const active = frequency === item.id;
          return (
            <button
              key={item.id}
              type="button"
              aria-pressed={active}
              onClick={() => chooseFrequency(item.id)}
              className={`min-h-11 min-w-0 rounded-full px-3 text-sm font-black transition-colors focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#c8f4ff] max-[430px]:min-h-10 max-[430px]:px-1 max-[430px]:text-[12px] ${
                active ? "bg-[#1fa8f4] text-white shadow-[0_8px_20px_rgba(31,168,244,0.24)]" : "text-[#557086] hover:bg-[#eaf9ff] hover:text-[#008fe4]"
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </div>

      <div className="mt-4 grid auto-rows-fr grid-cols-4 gap-3 max-[1020px]:grid-cols-2 max-[560px]:grid-cols-1 max-[430px]:mt-3.5 max-[430px]:gap-2.5" role="group" aria-label="Giving tier">
        {tiers.map((tier) => {
          const active = selectedTier === tier.id;
          const amount = frequency === "annually" ? tier.annual : tier.monthly;
          const suffix = frequency === "one-time" ? "suggested" : frequency === "monthly" ? "/ MONTH" : "/ YEAR";
          return (
            <button
              key={tier.id}
              type="button"
              aria-pressed={active}
              onClick={() => chooseTier(tier.id)}
              className={`h-full min-h-[96px] min-w-0 rounded-[22px] border p-3.5 text-left transition duration-200 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#c8f4ff] max-[430px]:min-h-[90px] max-[430px]:rounded-[18px] max-[430px]:p-3.5 ${
                active
                  ? "border-[#1fa8f4] bg-[#1fa8f4] text-white shadow-[0_16px_34px_rgba(31,168,244,0.25)]"
                  : "border-[#d5effb] bg-white text-[#08233d] hover:-translate-y-0.5 hover:border-[#8fd8fa] hover:shadow-[0_12px_28px_rgba(31,168,244,0.12)]"
              }`}
            >
              <span className="block text-lg font-black leading-tight max-[430px]:text-base">{tier.name}</span>
              <span className={`mt-2 block text-xl font-black max-[430px]:text-lg ${active ? "text-white" : "text-[#008fe4]"}`}>{formatter.format(amount)}</span>
              <span className={`mt-0.5 block text-xs font-extrabold uppercase tracking-[0.08em] ${active ? "text-[#dcf6ff]" : "text-[#7890a3]"}`}>{suffix}</span>
            </button>
          );
        })}

        <button
          type="button"
          aria-pressed={selectedTier === "other"}
          onClick={() => chooseTier("other")}
          className={`h-full min-h-[96px] min-w-0 rounded-[22px] border p-3.5 text-left transition duration-200 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#c8f4ff] max-[430px]:min-h-[90px] max-[430px]:rounded-[18px] max-[430px]:p-3.5 ${
            selectedTier === "other"
              ? "border-[#1fa8f4] bg-[#1fa8f4] text-white shadow-[0_16px_34px_rgba(31,168,244,0.25)]"
              : "border-[#d5effb] bg-white text-[#08233d] hover:-translate-y-0.5 hover:border-[#8fd8fa] hover:shadow-[0_12px_28px_rgba(31,168,244,0.12)]"
          }`}
        >
          <span className="block text-lg font-black leading-tight max-[430px]:text-base">Other Amount</span>
          <span className={`mt-2 block text-sm font-bold leading-[1.35] ${selectedTier === "other" ? "text-[#dcf6ff]" : "text-[#7890a3]"}`}>Choose an amount that works for you.</span>
        </button>
      </div>

      {showEditableAmount ? (
        <div className="mx-auto mt-4 w-full max-w-[360px] min-w-0">
          <label htmlFor={`donation-amount-${currency}`} className="mb-2 block text-sm font-black text-[#08233d]">
            {amountLabel}
          </label>
          <div className="flex min-w-0 items-center rounded-[18px] border-2 border-[#9edffc] bg-white px-5 focus-within:border-[#1fa8f4] focus-within:ring-4 focus-within:ring-[#dff5ff] max-[430px]:px-3">
            <span className="text-xl font-black text-[#008fe4]" aria-hidden="true">{currency === "PHP" ? "₱" : "$"}</span>
            <input
              id={`donation-amount-${currency}`}
              type="number"
              inputMode="decimal"
              min="1"
              step="1"
              value={selectedAmount}
              onChange={(event) => setSelection((current) => ({ ...current, amount: event.target.value }))}
              placeholder={suggestedAmount ? String(suggestedAmount) : "Enter amount"}
              className="min-h-14 min-w-0 w-full bg-transparent px-3 text-xl font-black text-[#08233d] outline-none max-[430px]:px-2 max-[430px]:text-lg"
            />
          </div>
        </div>
      ) : null}

      <p className="mb-0 mt-3 break-words text-center text-xs font-bold leading-[1.5] text-[#7890a3]" aria-live="polite">
        <span className="font-black text-[#008fe4]">Your selection:</span>{" "}
        <span className="max-[430px]:mt-1 max-[430px]:block">{summaryTier} · {summaryAmount} {summaryFrequency}</span>
      </p>

      {currency === "PHP" && frequency !== "one-time" ? (
        <div className="mx-auto mt-4 w-full max-w-[360px] min-w-0 text-left">
          <label htmlFor="xendit-donor-given-name" className="mb-2 block text-sm font-black text-[#08233d]">
            First or given name
          </label>
          <input
            id="xendit-donor-given-name"
            type="text"
            autoComplete="given-name"
            maxLength={50}
            required
            value={donorGivenName}
            onChange={(event) => setDonorGivenName(event.target.value)}
            className="min-h-12 w-full min-w-0 rounded-[16px] border-2 border-[#9edffc] bg-white px-4 text-base font-bold text-[#08233d] outline-none focus:border-[#1fa8f4] focus:ring-4 focus:ring-[#dff5ff]"
          />
          <p className="mb-0 mt-1.5 text-xs font-bold leading-[1.4] text-[#7890a3]">
            Needed for recurring donations.
          </p>
        </div>
      ) : null}
    </section>
  );
}
