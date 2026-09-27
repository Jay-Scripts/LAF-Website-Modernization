import ImpactCardsGrid from "@/components/ImpactCardsGrid";
import type { PublicImpactMetrics } from "@/lib/google-sheets";

export default function ImpactSection({ metrics }: { metrics: PublicImpactMetrics }) {
  return (
    <section aria-labelledby="impact-heading" className="bg-white py-[clamp(72px,8vw,112px)]">
      <div className="mx-auto w-[min(1180px,calc(100%_-_48px))] max-[760px]:w-[min(100%_-_32px,1180px)]">
        <div className="mb-10 flex items-end justify-between gap-8 max-[760px]:mb-7 max-[760px]:block">
          <h2 id="impact-heading" className="m-0 text-[clamp(2.7rem,4.8vw,4.75rem)] font-black leading-[1.02] tracking-[-0.045em] text-[#082f59]">
            Our impact<span className="text-[#008fe4]">.</span>
          </h2>
          <p className="mb-1 mt-0 max-w-[25ch] text-sm leading-relaxed text-[#50687b] max-[760px]:mt-4">
            Results from 2024 through 2026 year to date.
          </p>
        </div>
        <ImpactCardsGrid metrics={metrics} />
      </div>
    </section>
  );
}
