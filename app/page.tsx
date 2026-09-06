import type { Metadata } from "next";

import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ProgramsNavigation from "@/components/ProgramsNavigation";
import { getPublicImpactMetrics } from "@/lib/google-sheets";
import FinalCtaSection from "./_components/home/FinalCtaSection";
import ImpactSection from "./_components/home/ImpactSection";
import TrustSection from "./_components/home/TrustSection";
import ValuesSection from "./_components/home/ValuesSection";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default async function Home() {
  const impactMetrics = await getPublicImpactMetrics();

  return (
    <div className="min-h-screen overflow-x-clip bg-[radial-gradient(circle_at_8%_42%,rgba(0,143,228,0.06),transparent_24rem),linear-gradient(180deg,#ffffff_0%,#f5fbff_72%,#ffffff_100%)] text-[#091a2f]">
      <Navbar />
      <Hero />
      <main>
        <ValuesSection />
        <ProgramsNavigation fullViewport />
        <ImpactSection metrics={impactMetrics} />
        <TrustSection />
      </main>
      <FinalCtaSection />
      <Footer />
    </div>
  );
}
