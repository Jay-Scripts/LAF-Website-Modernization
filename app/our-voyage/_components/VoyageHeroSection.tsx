import Image from "next/image";
import CTAButton from "@/components/CTAButton";
import Reveal from "@/components/Reveal";
import type { ImpactReport2025 } from "@/data/impactReport2025";

export default function VoyageHeroSection({
  report,
}: {
  report: ImpactReport2025;
}) {
  const titleWords = report.hero.title.split(" ");
  const finalWord = titleWords.pop();

  return (
    <section className="relative isolate min-h-[100dvh] overflow-hidden bg-[#032d5c] pt-[72px] text-white max-[767px]:pt-[64px]">
      <style>{`
        @keyframes voyage-hero-load {
          from { opacity: 0; transform: translate3d(0, 18px, 0) scale(0.985); filter: blur(5px); }
          to { opacity: 1; transform: translate3d(0, 0, 0) scale(1); filter: blur(0); }
        }
        .voyage-hero-load {
          animation: voyage-hero-load 900ms cubic-bezier(0.22, 1, 0.36, 1) 120ms both;
        }
        @media (prefers-reduced-motion: reduce) {
          .voyage-hero-load {
            animation: none !important;
          }
        }
      `}</style>
      <Image
        src={report.hero.imageSrc}
        alt="Little Ark Foundation children and caregiver together at the foundation home"
        fill
        priority
        sizes="100vw"
        className="object-cover object-[center_42%] max-[767px]:object-[center_36%]"
      />
      <div
        className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,43,101,0.96)_0%,rgba(0,61,128,0.76)_38%,rgba(0,61,128,0.1)_75%),linear-gradient(0deg,rgba(0,34,79,0.94)_0%,rgba(0,34,79,0.08)_60%)] max-[767px]:bg-[linear-gradient(180deg,rgba(0,44,101,0.04)_10%,rgba(0,44,101,0.1)_34%,rgba(0,34,79,0.96)_72%,#00224f_100%)]"
        aria-hidden="true"
      />

      <div className="relative z-[2] mx-auto flex min-h-[calc(100dvh-72px)] w-[min(1220px,calc(100%_-_40px))] items-end pb-[clamp(64px,9vw,112px)] max-[767px]:min-h-[calc(100dvh-64px)] max-[767px]:w-[min(100%_-_32px,1220px)] max-[767px]:pb-12">
        <Reveal className="max-w-[760px]">
          <div className="voyage-hero-load">
            <h1 className="m-0 max-w-[700px] text-[clamp(46px,6vw,88px)] font-black leading-[0.9] tracking-[-0.04em] text-white max-[767px]:max-w-[330px] max-[767px]:text-[clamp(2.4rem,10.5vw,3.5rem)] max-[767px]:leading-[0.94]">
              {titleWords.join(" ")}{" "}
              {finalWord ? (
                <span className="text-[#ffc83d]">{finalWord}</span>
              ) : null}
            </h1>
            <div
              className="mt-7 h-1 w-16 bg-[#ffc83d] max-[767px]:mt-5 max-[767px]:h-0.5 max-[767px]:w-12"
              aria-hidden="true"
            />
            <p className="mb-0 mt-5 max-w-[520px] text-[clamp(16px,1.55vw,21px)] font-bold leading-[1.46] text-white/88 max-[767px]:mt-4 max-[767px]:max-w-[315px] max-[767px]:text-[14px] max-[767px]:leading-[1.5]">
              {report.hero.subtitle}
            </p>
            <CTAButton
              href="#impact"
              icon={false}
              className="mt-8 min-h-[54px] bg-[#ffc83d] px-7 text-[#08233d] shadow-[0_16px_36px_rgba(0,25,70,0.3)] transition duration-300 ease-out hover:-translate-y-1 hover:bg-[#ffd568] max-[767px]:mt-6 max-[767px]:min-h-[50px] max-[767px]:px-6 max-[767px]:active:translate-y-px"
            >
              {report.hero.cta}
            </CTAButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
