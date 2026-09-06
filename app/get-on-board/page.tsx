import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import GetOnBoardActionsSection from "./_components/GetOnBoardActionsSection";
import GetOnBoardFinalCtaSection from "./_components/GetOnBoardFinalCtaSection";
import GetOnBoardHeroSection from "./_components/GetOnBoardHeroSection";

export const metadata: Metadata = {
  title: "Get On Board",
  description: "Give, volunteer, partner, or advocate with Little Ark Foundation.",
  alternates: { canonical: "/get-on-board" },
};

export default function GetOnBoardPage() {
  return (
    <div className="bg-white text-[#08233d]">
      <Navbar variant="solid" />
      <main>
        <GetOnBoardHeroSection />
        <GetOnBoardActionsSection />
        <GetOnBoardFinalCtaSection />
      </main>
      <Footer />
    </div>
  );
}
