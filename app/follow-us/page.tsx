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
        <section className="mx-auto w-[min(1180px,calc(100%_-_48px))] pb-[clamp(64px,8vw,104px)] pt-[clamp(150px,16vw,190px)] max-[620px]:w-[calc(100%_-_32px)]">
          <FollowUsHeroSection />
          <FollowUsSocialSection />
        </section>
      </main>

      <Footer />
    </div>
  );
}
