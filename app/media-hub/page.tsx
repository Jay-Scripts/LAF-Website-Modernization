import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { siteContent } from "@/data/siteContent";
import MediaHubFacebookSection from "./_components/MediaHubFacebookSection";
import MediaHubFollowSection from "./_components/MediaHubFollowSection";
import MediaHubHeroSection from "./_components/MediaHubHeroSection";
import MediaHubNewsSection from "./_components/MediaHubNewsSection";
import MediaHubReportsSection from "./_components/MediaHubReportsSection";
import MediaHubVideoSection from "./_components/MediaHubVideoSection";
import { getLatestFacebookPosts } from "./_components/media-hub-data";

export const metadata: Metadata = {
  title: "Media Hub",
  description: "Stories, moments, and impact reports from Little Ark Foundation.",
  alternates: { canonical: "/media-hub" },
};

export default async function MediaHubPage() {
  const facebookPosts = await getLatestFacebookPosts();

  return (
    <div className="bg-white text-[#08233d]">
      <Navbar variant="solid" />
      <main>
        <MediaHubHeroSection />
        <MediaHubNewsSection />
        <MediaHubVideoSection />
        <MediaHubFacebookSection posts={facebookPosts} />
        <MediaHubReportsSection reports={siteContent.links.impactReports} />
        <MediaHubFollowSection />
      </main>
      <Footer />
    </div>
  );
}
