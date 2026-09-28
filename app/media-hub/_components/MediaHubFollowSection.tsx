import SocialPlatformsGrid from "@/components/SocialPlatformsGrid";
import MediaHubInner from "./MediaHubInner";

export default function MediaHubFollowSection() {
  return (
    <section aria-labelledby="media-follow-title" className="border-t border-[#cbdfe9] bg-white py-14 sm:py-20">
      <MediaHubInner>
        <div className="mx-auto mb-8 max-w-[660px] text-center">
          <h2 id="media-follow-title" className="m-0 text-[clamp(32px,4vw,46px)] font-black leading-tight text-[#082f59]">Follow Our Journey</h2>
          <p className="mb-0 mt-4 text-base leading-relaxed text-[#557086]">Stay connected with Little Ark Foundation through our official channels.</p>
        </div>
        <SocialPlatformsGrid layout="icons" />
      </MediaHubInner>
    </section>
  );
}
