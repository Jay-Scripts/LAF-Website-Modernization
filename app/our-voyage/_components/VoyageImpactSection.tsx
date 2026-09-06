import type { PublicImpactMetrics } from "@/lib/google-sheets";
import VoyageImpactMetrics from "./VoyageImpactMetrics";
import { Inner, SectionTitle } from "./voyage-layout";

export default function VoyageImpactSection({ metrics }: { metrics: PublicImpactMetrics }) {
  return (
    <section id="impact" className="overflow-hidden bg-[#052d5d] pb-[clamp(86px,11vw,145px)] pt-[clamp(72px,8vw,112px)] text-white">
      <Inner>
        <SectionTitle title="Growing Impact" light>
          See how Little Ark&apos;s programs are reaching more children and families as our mission continues to grow.
        </SectionTitle>
        <VoyageImpactMetrics metrics={metrics} />
      </Inner>
    </section>
  );
}
