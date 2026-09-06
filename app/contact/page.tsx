import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ContactFormSection from "./_components/ContactFormSection";
import ContactHeroSection from "./_components/ContactHeroSection";
import ContactVisitSection from "./_components/ContactVisitSection";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Connect with Little Ark Foundation.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <div className="bg-white text-[#08233d]">
      <Navbar variant="solid" />

      <main>
        <section className="relative overflow-hidden bg-[linear-gradient(180deg,#e8f8ff_0%,#f8fdff_48%,#fff_100%)] pb-[clamp(52px,7vw,92px)] pt-[clamp(112px,13vw,164px)]">
          <div className="relative z-[1] mx-auto w-[min(1180px,calc(100%_-_48px))] max-[620px]:w-[min(100%_-_28px,1180px)]">
            <ContactHeroSection />
            <ContactFormSection />
            <ContactVisitSection />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
