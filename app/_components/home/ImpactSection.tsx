import VoyageImpactSection from "@/app/our-voyage/_components/VoyageImpactSection";
import type { PublicImpactMetrics } from "@/lib/google-sheets";

export default function ImpactSection({ metrics }: { metrics: PublicImpactMetrics }) {
  return <VoyageImpactSection metrics={metrics} title="Our Impact" />;
}
