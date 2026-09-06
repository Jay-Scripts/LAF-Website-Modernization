import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { getPublicImpactMetrics } from "@/lib/google-sheets";
import PartnersFinalCtaMotion from "./_components/PartnersFinalCtaMotion";
import PartnersGratitudeSection from "./_components/PartnersGratitudeSection";
import PartnersHeroSection from "./_components/PartnersHeroSection";
import PartnersImpactSection from "./_components/PartnersImpactSection";
import PartnersShowcaseSection from "./_components/PartnersShowcaseSection";

export const metadata: Metadata = {
  title: "Our Partners",
  description: "Little Ark Foundation's community of partners and supporters.",
  alternates: { canonical: "/our-donors" },
};

export default async function OurDonorsPage() {
  const impactMetrics = await getPublicImpactMetrics();

  return (
    <div className="bg-white text-[#08233d]">
      <Navbar variant="solid" />

      <main>
        <PartnersHeroSection />
        <PartnersShowcaseSection />
        <PartnersImpactSection metrics={impactMetrics} />
        <PartnersGratitudeSection />
        <PartnersFinalCtaMotion />
      </main>

      <Footer />
    </div>
  );
}
