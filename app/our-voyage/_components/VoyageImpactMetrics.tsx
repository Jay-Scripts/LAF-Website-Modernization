import CountUp from "@/components/CountUp";
import Reveal from "@/components/Reveal";
import type { ImpactMetricKey, PublicImpactMetrics } from "@/lib/google-sheets";

const impactCards: ReadonlyArray<{ key: ImpactMetricKey; label: string }> = [
  { key: "housing", label: "Bed nights provided" },
  { key: "transport", label: "Families transported" },
  { key: "meals", label: "Hot meals served" },
  { key: "activities", label: "Children served" },
  { key: "care-cart", label: "Meals distributed" },
];

const numberFormatter = new Intl.NumberFormat("en-US");

function formatMetric(value: number | null) {
  return value === null ? "Not reported" : numberFormatter.format(value);
}

export default function VoyageImpactMetrics({ metrics }: { metrics: PublicImpactMetrics }) {
  const currentTotal = impactCards.reduce((total, card) => total + metrics[card.key].current, 0);

  return (
    <div className="grid grid-cols-[minmax(260px,0.86fr)_minmax(0,1.14fr)] gap-[clamp(32px,6vw,88px)] max-[820px]:grid-cols-1 max-[820px]:gap-10">
      <Reveal direction="left" className="relative overflow-hidden rounded-[24px] border border-white/15 bg-[linear-gradient(145deg,#0a4b8e,#063366)] p-[clamp(26px,4vw,48px)] shadow-[0_24px_60px_rgba(0,31,76,0.24)] max-[767px]:rounded-[18px] max-[767px]:p-6">
        <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full border-[24px] border-[#1fa8f4]/20" aria-hidden="true" />
        <div className="relative">
          <p className="m-0 text-[11px] font-black uppercase tracking-[0.18em] text-[#ffc83d]">2026 YTD</p>
          <p className="mb-0 mt-8 text-[clamp(58px,7vw,106px)] font-black leading-[0.82] tracking-[-0.055em] text-white max-[767px]:mt-6 max-[767px]:text-[clamp(54px,16vw,78px)]">
            <CountUp value={currentTotal} />
          </p>
          <p className="mb-0 mt-5 max-w-[240px] text-[clamp(16px,1.5vw,20px)] font-bold leading-[1.35] text-white/78 max-[767px]:mt-4 max-[767px]:text-[15px]">
            recorded support actions across five programs.
          </p>
          <div className="mt-10 h-px w-full bg-white/20 max-[767px]:mt-7" aria-hidden="true" />
          <p className="mb-0 mt-4 text-[12px] font-extrabold leading-[1.45] text-white/60 max-[767px]:text-[11px]">
            Every number represents a practical way a child or caregiver was supported.
          </p>
        </div>
      </Reveal>

      <div className="border-t border-white/25">
        {impactCards.map((card, index) => {
          const metric = metrics[card.key];
          const initial = metric.program.charAt(0);

          return (
            <Reveal as="article" key={card.key} delay={index * 120} direction="right" className="grid grid-cols-[42px_minmax(0,1fr)_auto] items-center gap-4 border-b border-white/15 py-5 max-[767px]:grid-cols-[34px_minmax(0,1fr)_auto] max-[767px]:gap-3 max-[767px]:py-4">
              <span className="grid h-9 w-9 place-items-center rounded-full border border-[#ffc83d]/65 text-[13px] font-black text-[#ffc83d] max-[767px]:h-8 max-[767px]:w-8 max-[767px]:text-[11px]" aria-hidden="true">{initial}</span>
              <div className="min-w-0">
                <h3 className="m-0 text-[clamp(17px,1.8vw,23px)] font-black leading-tight text-white max-[767px]:text-[15px]">{metric.program}</h3>
                <p className="mb-0 mt-1 text-[10px] font-black uppercase tracking-[0.08em] text-white/55 max-[767px]:text-[8px]">{card.label}</p>
              </div>
              <div className="text-right">
                <p className="m-0 text-[clamp(24px,3vw,38px)] font-black leading-none tracking-[-0.03em] text-[#66d3f7] max-[767px]:text-[22px]">{numberFormatter.format(metric.current)}</p>
                <p className="mb-0 mt-1 text-[10px] font-bold text-white/55 max-[767px]:text-[8px]">2026 YTD</p>
              </div>
              <p className="col-[2/-1] m-0 text-[11px] font-semibold text-white/55 max-[767px]:text-[9px]">2024: {numberFormatter.format(metric.historical2024)} <span aria-hidden="true">·</span> 2025: {formatMetric(metric.historical2025)}</p>
            </Reveal>
          );
        })}
      </div>
    </div>
  );
}
