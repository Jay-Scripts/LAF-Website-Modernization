import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { impactReport2025 } from "@/data/impactReport2025";
import { getPublicImpactMetrics } from "@/lib/google-sheets";
import VoyageHeroSection from "./_components/VoyageHeroSection";
import VoyageImpactSection from "./_components/VoyageImpactSection";
import VoyageIntroSection from "./_components/VoyageIntroSection";
import VoyageTimelineSection from "./_components/VoyageTimelineSection";

export const metadata: Metadata = {
  title: "Our Voyage",
  description: "Little Ark Foundation's 2025 impact, growth, and future vision.",
  alternates: { canonical: "/our-voyage" },
};

export default async function OurVoyagePage() {
  const impactMetrics = await getPublicImpactMetrics();

  return (
    <div className="bg-white text-[#08233d]">
      <Navbar variant="solid" />

      <main>
        <VoyageHeroSection report={impactReport2025} />
        <VoyageIntroSection />
        <VoyageTimelineSection />
        <VoyageImpactSection metrics={impactMetrics} />

      </main>

      <Footer />
    </div>
  );
}
