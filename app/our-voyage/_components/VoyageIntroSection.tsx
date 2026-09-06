import Reveal from "@/components/Reveal";
import ViewportRevealImage from "@/components/ViewportRevealImage";
import { Inner } from "./voyage-layout";

export default function VoyageIntroSection() {
  return (
    <section className="relative overflow-hidden border-b border-[#c8edf9] bg-[linear-gradient(135deg,#f7fdff_0%,#e8f8ff_52%,#ffffff_100%)] py-[clamp(74px,9vw,126px)] max-[767px]:py-14">
      <style>{`
        @keyframes voyage-journey-rule {
          from { opacity: 0; transform: scaleX(0); transform-origin: left center; }
          to { opacity: 1; transform: scaleX(1); transform-origin: left center; }
        }
        .voyage-journey-rule {
          animation: voyage-journey-rule 700ms cubic-bezier(0.22, 1, 0.36, 1) 260ms both;
        }
        @media (prefers-reduced-motion: reduce) {
          .voyage-journey-rule {
            animation: none !important;
          }
        }
      `}</style>
      <div className="absolute -right-28 top-[-100px] h-72 w-72 rounded-full bg-[#c8f4ff]/55 blur-3xl" aria-hidden="true" />
      <div className="absolute bottom-[-140px] left-[10%] h-80 w-80 rounded-full bg-[#66d3f7]/15 blur-3xl" aria-hidden="true" />
      <Inner>
        <div className="grid grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)] items-center gap-[clamp(38px,7vw,100px)] max-[820px]:grid-cols-1 max-[820px]:gap-9">
          <Reveal direction="left" className="order-1 max-w-[590px]">
            <span className="voyage-journey-rule mb-5 block h-1 w-14 bg-[#ffc83d] max-[767px]:mb-4 max-[767px]:h-0.5 max-[767px]:w-11" aria-hidden="true" />
            <h2 className="m-0 max-w-[560px] text-[clamp(38px,4.8vw,66px)] font-black leading-[0.94] tracking-[-0.035em] text-[#005ba8] max-[767px]:text-[clamp(2.25rem,10vw,3.35rem)] max-[767px]:leading-[0.98]">
              A Journey Built on Hope
            </h2>
            <p className="mb-0 mt-6 max-w-[560px] text-[clamp(18px,1.8vw,24px)] font-bold leading-[1.48] text-[#557086] max-[767px]:mt-4 max-[767px]:text-[15px] max-[767px]:leading-[1.52]">
              Follow the milestones that shaped Little Ark Foundation&apos;s growing support for children and families throughout treatment.
            </p>
          </Reveal>

          <Reveal direction="right" className="order-2 relative mx-auto w-full max-w-[540px] pr-4 max-[820px]:max-w-[620px] max-[820px]:pr-3 max-[767px]:pr-2">
            <div className="absolute bottom-[-12px] right-0 top-[12px] w-[42%] rounded-[24px] bg-[#c8f4ff] max-[767px]:bottom-[-8px] max-[767px]:right-0 max-[767px]:top-2 max-[767px]:rounded-[18px]" aria-hidden="true" />
            <div className="relative aspect-[952/980] overflow-hidden rounded-[24px] border-4 border-white bg-white shadow-[0_24px_58px_rgba(0,72,140,0.16)] transition duration-500 ease-out hover:-translate-y-1 hover:shadow-[0_30px_68px_rgba(0,72,140,0.2)] max-[767px]:rounded-[18px] max-[767px]:border-[3px] max-[767px]:transition-none">
              <ViewportRevealImage src="/images/our-voyage/journey-built-on-hope.png" alt="A Little Ark Foundation caregiver embracing a young woman" sizes="(max-width: 820px) calc(100vw - 48px), 48vw" />
            </div>
          </Reveal>
        </div>
      </Inner>
    </section>
  );
}
