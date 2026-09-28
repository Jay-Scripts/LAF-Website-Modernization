import type { ImpactMetricKey, PublicImpactMetrics } from "@/lib/google-sheets";

const impactMetrics: ReadonlyArray<{ key: ImpactMetricKey; label: string }> = [
  { key: "housing", label: "Bed nights provided" },
  { key: "transport", label: "Families transported" },
  { key: "meals", label: "Hot meals served" },
  { key: "activities", label: "Children served" },
  { key: "care-cart", label: "Meals distributed" },
];

const numberFormatter = new Intl.NumberFormat("en-US");

export default function ImpactCardsGrid({ metrics }: { metrics: PublicImpactMetrics }) {
  return (
    <div className="border-t border-[#b9d0df]">
      {impactMetrics.map(({ key, label }) => {
        const metric = metrics[key];

        return (
          <article key={key} className="grid grid-cols-[minmax(0,1fr)_minmax(250px,0.9fr)] items-center gap-8 border-b border-[#d3e2eb] py-6 max-[620px]:grid-cols-1 max-[620px]:gap-4 max-[620px]:py-5">
            <div>
              <h3 className="m-0 text-[clamp(1.35rem,2.1vw,1.9rem)] font-black leading-tight tracking-[-0.025em] text-[#082f59]">{metric.program}</h3>
              <p className="mb-0 mt-1 text-sm text-[#50687b]">{label}</p>
            </div>
            <div className="flex items-end justify-between gap-6 max-[620px]:items-start">
              <div>
                <p className="m-0 text-[11px] font-bold uppercase tracking-[0.13em] text-[#50687b]">2026 YTD</p>
                <p className="mb-0 mt-1 text-[clamp(2rem,3.4vw,3.25rem)] font-black leading-none tracking-[-0.04em] tabular-nums text-[#0068c9]">{numberFormatter.format(metric.current)}</p>
              </div>
              <div className="min-w-[125px] text-right text-xs leading-[1.6] text-[#50687b]">
                <p className="m-0"><span className="tabular-nums text-[#082f59]">{numberFormatter.format(metric.historical2024)}</span> in 2024</p>
                <p className="m-0"><span className="tabular-nums text-[#082f59]">{metric.historical2025 === null ? "—" : numberFormatter.format(metric.historical2025)}</span> in 2025</p>
                {metric.total !== null && <p className="mb-0 mt-1 font-semibold text-[#082f59]">{numberFormatter.format(metric.total)} total</p>}
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
