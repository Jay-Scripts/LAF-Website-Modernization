import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ArkHeroSection from "./_components/ArkHeroSection";
import CoreValuesSection from "./_components/CoreValuesSection";
import FinalCtaSection from "./_components/FinalCtaSection";
import HeartsSupportModel from "./_components/HeartsSupportModel";
import MissionSection from "./_components/MissionSection";
import PromiseSection from "./_components/PromiseSection";
import StorySection from "./_components/StorySection";

export const metadata: Metadata = {
  title: "The Ark",
  description: "The story behind Little Ark Foundation and the promise that began its mission.",
  alternates: { canonical: "/the-ark" },
};

export default function TheArkPage() {
  return (
    <div className="bg-white text-[#08233d]">
      <style>{`
        @keyframes cue-bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(6px); }
        }
        @keyframes ark-hero-load {
          from { opacity: 0; transform: translate3d(0, 18px, 0) scale(0.985); filter: blur(5px); }
          to { opacity: 1; transform: translate3d(0, 0, 0) scale(1); filter: blur(0); }
        }
        .ark-hero-load {
          animation: ark-hero-load 900ms cubic-bezier(0.22, 1, 0.36, 1) 120ms both;
        }
        @media (prefers-reduced-motion: reduce) {
          .ark-scroll-cue {
            animation: none !important;
          }
          .ark-hero-load {
            animation: none !important;
          }
        }
      `}</style>

      <Navbar variant="solid" />

      <main>
        <ArkHeroSection />
        <StorySection />
        <MissionSection />
        <CoreValuesSection />
        <HeartsSupportModel />
        <PromiseSection />
        <FinalCtaSection />
      </main>

      <Footer />
    </div>
  );
}
