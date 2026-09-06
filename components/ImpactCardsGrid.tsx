import CountUp from "@/components/CountUp";
import Reveal from "@/components/Reveal";
import type { ImpactMetricKey, PublicImpactMetrics } from "@/lib/google-sheets";

const impactCards: ReadonlyArray<{ key: ImpactMetricKey; label: string }> = [
  { key: "housing", label: "Bed Nights Provided" },
  { key: "transport", label: "Families Transported" },
  { key: "meals", label: "Hot Meals Served" },
  { key: "activities", label: "Children Served" },
  { key: "care-cart", label: "Meals Distributed" },
];

const numberFormatter = new Intl.NumberFormat("en-US");

function formatMetric(value: number | null) {
  return value === null ? "—" : numberFormatter.format(value);
}

export default function ImpactCardsGrid({ metrics }: { metrics: PublicImpactMetrics }) {
  return (
    <div className="grid grid-cols-5 items-stretch gap-3.5 max-[1080px]:grid-cols-6 max-[1080px]:[&>article]:col-span-2 max-[1080px]:[&>article:nth-child(4)]:col-start-2 max-[767px]:grid-cols-2 max-[767px]:gap-3 max-[767px]:[&>article]:col-span-1 max-[767px]:[&>article:nth-child(4)]:col-start-auto max-[767px]:[&>article:last-child]:col-span-2 max-[767px]:[&>article:last-child]:w-[calc((100%_-_12px)/2)] max-[767px]:[&>article:last-child]:justify-self-center max-[430px]:gap-2.5 max-[430px]:[&>article:last-child]:w-[calc((100%_-_10px)/2)]">
      {impactCards.map((card, index) => {
        const metric = metrics[card.key];

        return (
          <Reveal
            as="article"
            key={card.key}
            delay={index * 140}
            direction="up"
            className="flex min-h-[228px] min-w-0 flex-col rounded-lg border border-[rgba(0,104,201,0.12)] bg-white/95 px-5 py-5 text-center shadow-[0_14px_34px_rgba(0,72,140,0.08)] ring-1 ring-white/75 transition duration-300 ease-out hover:-translate-y-1 hover:border-[#9fe4ff] hover:shadow-[0_20px_44px_rgba(0,72,140,0.12)] max-[1080px]:min-h-[222px] max-[767px]:min-h-[174px] max-[767px]:px-3 max-[767px]:py-4 max-[430px]:min-h-[168px] max-[430px]:px-2.5 max-[430px]:py-3.5"
          >
            <h3 className="m-0 min-h-[2.1em] break-words text-[clamp(15px,1.25vw,17px)] font-black leading-[1.08] text-[#0068c9] max-[767px]:text-[clamp(12px,3.5vw,15px)] max-[430px]:text-[11px]">
              {metric.program}
            </h3>

            {metric.total === null ? (
              <span className="mt-4 block text-[clamp(36px,3.7vw,50px)] font-black leading-[0.92] text-[#1fa8f4]">—</span>
            ) : (
              <CountUp
                value={metric.total}
                className="mt-4 block text-[clamp(36px,3.7vw,50px)] font-black leading-[0.92] text-[#1fa8f4] max-[767px]:mt-3 max-[767px]:text-[clamp(1.7rem,7vw,2.2rem)] max-[430px]:text-[1.6rem]"
              />
            )}

            <span className="mt-2.5 block min-h-[2.5em] text-[10px] font-black uppercase leading-[1.25] tracking-[0.055em] text-[#557086] max-[767px]:text-[9px] max-[430px]:text-[8px]">
              {card.label}
            </span>

            <p className="mb-0 mt-auto border-t border-[#d9edf7] pt-2.5 text-[13px] font-extrabold leading-[1.3] text-[#0068c9] max-[767px]:text-[11px] max-[430px]:text-[10px]">
              2026 YTD: {numberFormatter.format(metric.current)}
            </p>

            <p className="mb-0 mt-2.5 border-t border-[#d9edf7] pt-2.5 text-[13px] font-semibold leading-[1.3] text-[#7890a3] max-[767px]:text-[9px] max-[430px]:text-[8px]">
              {numberFormatter.format(metric.historical2024)} in 2024 <span aria-hidden="true">|</span> {formatMetric(metric.historical2025)} in 2025
            </p>
          </Reveal>
        );
      })}
    </div>
  );
}
