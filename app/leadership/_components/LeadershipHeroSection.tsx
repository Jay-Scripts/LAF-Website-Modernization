import Reveal from "@/components/Reveal";

export default function LeadershipHeroSection() {
  return (
    <Reveal className="mx-auto max-w-[840px] text-center">
      <p className="m-0 text-sm font-black uppercase tracking-[0.14em] text-[#1fa8f4]">Little Ark Foundation</p>
      <h1 className="mt-4 text-[clamp(58px,10vw,118px)] font-black leading-[0.92] tracking-normal text-[#005ba8]">Leadership</h1>
      <p className="mx-auto mt-6 max-w-[920px] whitespace-nowrap text-[clamp(18px,1.75vw,22px)] font-semibold leading-[1.55] text-[#557086] max-[900px]:whitespace-normal">
        Meet the people leading Little Ark with compassion, integrity, and faith.
      </p>
    </Reveal>
  );
}
