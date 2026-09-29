import type { PublicImpactMetrics } from "@/lib/google-sheets";
import VoyageImpactMetrics from "./VoyageImpactMetrics";
import { Inner, SectionTitle } from "./voyage-layout";

export default function VoyageImpactSection({ metrics, title = "Growing Impact" }: { metrics: PublicImpactMetrics; title?: string }) {
  return (
    <section id="impact" style={{ fontFamily: "Arial, Helvetica, sans-serif" }} className="scroll-mt-[72px] overflow-hidden bg-[#052d5d] py-[clamp(48px,5vw,72px)] text-white max-[820px]:py-14">
      <Inner>
        <SectionTitle title={title} light>
          See how Little Ark&apos;s programs are reaching more children and families as our mission continues to grow.
        </SectionTitle>
        <VoyageImpactMetrics metrics={metrics} />
      </Inner>
    </section>
  );
}
