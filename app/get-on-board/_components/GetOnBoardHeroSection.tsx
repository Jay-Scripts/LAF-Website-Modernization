import Image from "next/image";
import CTAButton from "@/components/CTAButton";
import Reveal from "@/components/Reveal";

export default function GetOnBoardHeroSection() {
  return (
    <section className="relative isolate min-h-[100dvh] overflow-hidden bg-[#eaf9ff] pt-[68px]">
      <style>{`
        @keyframes gob-copy-load {
          from { opacity: 0; transform: translate3d(-24px, 12px, 0); filter: blur(4px); }
          to { opacity: 1; transform: translate3d(0, 0, 0); filter: blur(0); }
        }
        @keyframes gob-image-load {
          from { opacity: 0; clip-path: inset(0 100% 0 0); transform: scale(1.06); }
          to { opacity: 1; clip-path: inset(0 0 0 0); transform: scale(1); }
        }
        .gob-copy-load { animation: gob-copy-load 850ms cubic-bezier(0.22, 1, 0.36, 1) 140ms both; }
        .gob-image-load { animation: gob-image-load 1100ms cubic-bezier(0.22, 1, 0.36, 1) 80ms both; }
        @media (prefers-reduced-motion: reduce) {
          .gob-copy-load, .gob-image-load { animation: none !important; }
        }
      `}</style>
      <div className="grid min-h-[calc(100dvh-68px)] grid-cols-[minmax(0,0.84fr)_minmax(0,1.16fr)] max-[900px]:min-h-[calc(100dvh-68px)] max-[900px]:grid-cols-1">
        <Reveal className="relative z-[2] flex items-center bg-[linear-gradient(145deg,#005ba8_0%,#007bc4_58%,#008fe4_100%)] px-[clamp(28px,6vw,92px)] py-[clamp(60px,9vw,112px)] text-white max-[900px]:order-2 max-[900px]:items-start max-[900px]:py-[clamp(54px,9vw,82px)] max-[767px]:px-[clamp(22px,7vw,36px)] max-[767px]:py-12">
          <div className="gob-copy-load max-w-[580px]">
            <h1 className="m-0 max-w-[580px] text-[clamp(48px,6.2vw,88px)] font-black leading-[0.88] tracking-[-0.045em] text-white max-[900px]:max-w-[700px] max-[767px]:max-w-[330px] max-[767px]:text-[clamp(2.65rem,11vw,3.8rem)] max-[767px]:leading-[0.94]">
              Be Part of the Journey
            </h1>
            <div
              className="mt-7 h-1 w-16 bg-[#c8f4ff] max-[767px]:mt-5 max-[767px]:h-0.5 max-[767px]:w-12"
              aria-hidden="true"
            />
            <p className="mb-0 mt-6 max-w-[500px] text-[clamp(17px,1.7vw,23px)] font-bold leading-[1.48] text-white/90 max-[767px]:mt-4 max-[767px]:max-w-[315px] max-[767px]:text-[15px] max-[767px]:leading-[1.5]">
              Whether you give, volunteer, partner, or advocate, you help
              children and families keep moving forward.
            </p>
          </div>
        </Reveal>

        <Reveal
          direction="right"
          className="relative min-h-[calc(100dvh-68px)] overflow-hidden bg-[#c8f4ff] max-[900px]:order-1 max-[900px]:min-h-[42svh] max-[767px]:min-h-[290px]"
        >
          <div className="gob-image-load absolute inset-0 overflow-hidden bg-white">
            <Image
              src="/images/get-on-board/hero-gob.jpeg"
              alt="Little Ark Foundation volunteers, children, and team members together"
              fill
              priority
              sizes="(max-width: 900px) 100vw, 60vw"
              className="object-cover object-[center_38%] transition duration-700 ease-out hover:scale-[1.025] max-[900px]:object-[center_30%] max-[767px]:object-[center_22%] max-[767px]:transition-none"
            />
            <div className="pointer-events-none absolute inset-y-0 left-0 w-[24%] bg-gradient-to-r from-[#005ba8]/60 via-[#007bc4]/24 to-transparent" aria-hidden="true" />
          </div>
          <div
            className="absolute bottom-8 right-8 z-[2] bg-[#005ba8] px-4 py-3 text-[10px] font-black uppercase tracking-[0.14em] text-white max-[767px]:bottom-4 max-[767px]:right-4 max-[767px]:px-3 max-[767px]:py-2 max-[767px]:text-[8px] max-[767px]:tracking-[0.1em]"
            aria-hidden="true"
          >
            Many hands. One mission.
          </div>
        </Reveal>
      </div>
    </section>
  );
}
