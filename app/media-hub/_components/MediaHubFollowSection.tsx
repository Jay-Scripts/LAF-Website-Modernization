import { HeartDoodle } from "@/components/BrandHearts";
import Reveal from "@/components/Reveal";
import SocialPlatformsGrid from "@/components/SocialPlatformsGrid";
import MediaHubInner from "./MediaHubInner";

export default function MediaHubFollowSection() {
  return (
    <section className="relative overflow-hidden bg-white py-[clamp(86px,11vw,145px)]">
      <HeartDoodle className="absolute -right-20 top-8 z-0 max-[620px]:hidden" size={300} rotate={18} opacity={0.24} variant={1} />
      <HeartDoodle className="absolute bottom-10 left-[8%] z-0 max-[900px]:hidden" size={100} rotate={-18} opacity={0.22} variant={0} />
      <MediaHubInner>
        <Reveal className="mx-auto mb-12 max-w-[760px] text-center">
          <h2 className="m-0 text-[clamp(38px,5vw,68px)] font-black leading-[0.96] text-[#1fa8f4]">Follow Our Journey</h2>
          <p className="mx-auto mt-4 max-w-[620px] text-[clamp(18px,2vw,24px)] font-extrabold leading-[1.36] text-[#557086]">Stay connected with Little Ark Foundation through our official channels.</p>
        </Reveal>
        <SocialPlatformsGrid />
      </MediaHubInner>
    </section>
  );
}
