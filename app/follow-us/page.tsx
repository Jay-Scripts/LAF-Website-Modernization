import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import FollowUsHeroSection from "./_components/FollowUsHeroSection";
import FollowUsSocialSection from "./_components/FollowUsSocialSection";

export const metadata: Metadata = {
  title: "Follow Us",
  description: "Follow Little Ark Foundation on social media.",
  alternates: { canonical: "/follow-us" },
};

export default function FollowUsPage() {
  return (
    <div className="bg-white text-[#08233d]">
      <Navbar variant="solid" />

      <main>
        <section className="relative overflow-hidden bg-[radial-gradient(circle_at_14%_12%,rgba(31,168,244,0.14),transparent_24rem),radial-gradient(circle_at_88%_18%,rgba(255,200,61,0.18),transparent_22rem),linear-gradient(180deg,#effaff,#fff_58%,#edf8ff)] pb-[clamp(72px,9vw,120px)] pt-[clamp(150px,16vw,190px)]">
          <FollowUsHeroSection />
          <FollowUsSocialSection />
        </section>
      </main>

      <Footer />
    </div>
  );
}
