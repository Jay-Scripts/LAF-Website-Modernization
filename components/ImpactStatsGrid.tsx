import CountUp from "@/components/CountUp";
import type { ImpactMetricKey, PublicImpactMetrics } from "@/lib/google-sheets";

const impactStats: ReadonlyArray<{ key: ImpactMetricKey; label: string }> = [
  { key: "housing", label: "Bed Nights Provided" },
  { key: "transport", label: "Families Transported" },
  { key: "meals", label: "Hot Meals Served" },
  { key: "activities", label: "Children Served" },
  { key: "care-cart", label: "Meals Distributed" },
];

export default function ImpactStatsGrid({
  metrics,
  centerMobileRemainder = false,
}: {
  metrics: PublicImpactMetrics;
  centerMobileRemainder?: boolean;
}) {
  return (
    <div className={`grid grid-cols-5 gap-4 max-[1080px]:grid-cols-6 max-[1080px]:[&>article]:col-span-2 max-[1080px]:[&>article:nth-child(4)]:col-start-2 max-[620px]:grid-cols-2 max-[620px]:gap-3.5 max-[620px]:[&>article]:col-span-1 max-[620px]:[&>article:nth-child(4)]:col-start-auto max-[430px]:grid-cols-1 ${centerMobileRemainder ? "max-[620px]:[&>article:last-child]:col-span-2 max-[620px]:[&>article:last-child]:w-[calc(50%_-_7px)] max-[620px]:[&>article:last-child]:justify-self-center max-[430px]:[&>article:last-child]:col-span-1 max-[430px]:[&>article:last-child]:w-full" : ""}`}>
      {impactStats.map((stat) => {
        const metric = metrics[stat.key];

        return (
          <article
            key={stat.key}
            className="flex min-h-[220px] min-w-0 flex-col items-center justify-center rounded-[22px] border border-[rgba(31,168,244,0.14)] bg-[radial-gradient(circle_at_88%_10%,rgba(200,244,255,0.9),transparent_9rem),linear-gradient(180deg,#fff,#eaf9ff)] px-5 py-6 text-center shadow-[0_18px_46px_rgba(31,168,244,0.11)] max-[620px]:min-h-[200px] max-[620px]:rounded-[20px] max-[620px]:px-4 max-[620px]:py-5"
          >
            <h3 className="m-0 min-h-[2.1em] max-w-full text-[clamp(18px,1.7vw,21px)] font-black leading-[1.05] text-[#1fa8f4] max-[620px]:text-[clamp(17px,4.8vw,21px)]">
              {metric.program}
            </h3>
            {metric.total === null ? (
              <span className="mt-3 block text-[clamp(46px,5vw,70px)] font-black leading-[0.88] tracking-[-0.03em] text-[#1fa8f4]">—</span>
            ) : (
              <CountUp
                value={metric.total}
                className="mt-3 block text-[clamp(46px,5vw,70px)] font-black leading-[0.88] tracking-[-0.03em] text-[#1fa8f4] max-[620px]:text-[clamp(2.35rem,10.5vw,3rem)]"
              />
            )}
            <span className="mt-3 block min-h-[2.5em] max-w-full text-[12px] font-black uppercase leading-[1.25] tracking-[0.055em] text-[#557086] max-[620px]:text-[clamp(10px,2.8vw,12px)]">
              {stat.label}
            </span>
          </article>
        );
      })}
    </div>
  );
}
