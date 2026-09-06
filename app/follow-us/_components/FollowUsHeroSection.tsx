import { HeartDoodle } from "@/components/BrandHearts";
import Reveal from "@/components/Reveal";

export default function FollowUsHeroSection() {
  return (
    <>
      <HeartDoodle className="absolute -right-24 top-24 z-0 max-[760px]:hidden" size={340} rotate={16} opacity={0.24} variant={1} />
      <HeartDoodle className="absolute -left-20 bottom-20 z-0 max-[900px]:hidden" size={250} rotate={-18} opacity={0.2} variant={2} />
      <div className="relative z-[1] mx-auto w-[min(1220px,calc(100%_-_40px))] max-[620px]:w-[min(100%_-_28px,1220px)]">
        <Reveal className="mx-auto max-w-[820px] text-center">
          <p className="m-0 text-sm font-black uppercase tracking-[0.14em] text-[#1fa8f4]">Little Ark Online</p>
          <h1 className="mt-4 text-[clamp(56px,9vw,116px)] font-black leading-[0.92] tracking-normal text-[#005ba8]">Follow Us</h1>
          <p className="mx-auto mt-6 max-w-[760px] text-[clamp(18px,2vw,24px)] font-semibold leading-[1.55] text-[#557086]">
            Stay connected with Little Ark and follow the stories, programs, and moments of hope shared by our community.
          </p>
        </Reveal>
      </div>
    </>
  );
}
