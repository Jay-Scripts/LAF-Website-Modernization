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
        <section className="bg-white pb-[clamp(52px,7vw,92px)] pt-[clamp(112px,13vw,164px)]">
          <div className="relative z-[1] mx-auto w-[min(1180px,calc(100%_-_48px))] max-[620px]:w-[min(100%_-_28px,1180px)]">
            <ContactHeroSection />
            <div className="mt-12 grid items-start gap-12 border-t border-[#cbdfe9] pt-10 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] lg:gap-20">
              <ContactVisitSection />
              <ContactFormSection />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
