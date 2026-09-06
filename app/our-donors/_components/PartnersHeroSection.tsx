import Image from "next/image";
import { HeartDoodle } from "@/components/BrandHearts";
import PageHero from "@/components/PageHero";

const title = (
  <>
    <span className="block">Together,</span>
    <span className="block">We Create Hope</span>
  </>
);

const description = (
  <>
    <span className="block">Every child we support.</span>
    <span className="mt-1 block">Every family we uplift.</span>
    <span className="mt-1 block">Every moment we make brighter.</span>
    <strong className="mt-5 block text-[clamp(28px,3.4vw,44px)] font-black leading-[1.05] text-white [font-weight:900]">
      Made possible because of you.
    </strong>
  </>
);

export default function PartnersHeroSection() {
  return (
    <>
    <PageHero
      imageSrc="/images/partners/our-partners-hero-collage-2026-v2.jpg"
      title={title}
      description={description}
      sectionClassName="lg:hidden"
      backgroundClassName="bg-[linear-gradient(90deg,rgba(0,143,228,0.94)_0%,rgba(31,168,244,0.72)_48%,rgba(102,211,247,0.18)_100%),linear-gradient(135deg,#008fe4,#1fa8f4)]"
      overlayClassName="after:bg-[linear-gradient(90deg,rgba(0,143,228,0.9)_0%,rgba(31,168,244,0.68)_50%,rgba(255,255,255,0.12)_100%),radial-gradient(circle_at_76%_22%,rgba(255,255,255,0.32),transparent_18rem)] max-[767px]:after:bg-[linear-gradient(90deg,rgba(0,76,161,0.96)_0%,rgba(0,112,201,0.84)_44%,rgba(31,168,244,0.28)_76%,rgba(31,168,244,0.08)_100%)]"
      imageClassName="object-[center_15%] max-[900px]:object-[center_10%] max-[767px]:object-center"
    />

    <section className="relative hidden min-h-[100svh] overflow-hidden bg-[#078fdb] pt-[82px] text-white lg:grid lg:grid-cols-[minmax(430px,0.8fr)_minmax(0,1.2fr)]">
      <style>{`
        @keyframes partners-copy-load {
          from { opacity: 0; transform: translate3d(-24px, 12px, 0); filter: blur(4px); }
          to { opacity: 1; transform: translate3d(0, 0, 0); filter: blur(0); }
        }
        @keyframes partners-image-load {
          from { opacity: 0; clip-path: inset(0 100% 0 0); transform: scale(1.06); }
          to { opacity: 1; clip-path: inset(0 0 0 0); transform: scale(1); }
        }
        @keyframes partners-rule-load {
          from { opacity: 0; transform: scaleX(0); transform-origin: left; }
          to { opacity: 1; transform: scaleX(1); transform-origin: left; }
        }
        .partners-copy-load { animation: partners-copy-load 850ms cubic-bezier(0.22, 1, 0.36, 1) 140ms both; }
        .partners-image-load { animation: partners-image-load 1100ms cubic-bezier(0.22, 1, 0.36, 1) 80ms both; }
        .partners-rule-load { animation: partners-rule-load 700ms cubic-bezier(0.22, 1, 0.36, 1) 520ms both; }
        @media (prefers-reduced-motion: reduce) {
          .partners-copy-load, .partners-image-load, .partners-rule-load { animation: none !important; }
        }
      `}</style>

      <div className="relative z-[2] flex flex-col justify-center overflow-hidden px-[clamp(48px,6vw,112px)] py-24">
        <div className="absolute -left-24 bottom-[-70px] h-[260px] w-[260px] rounded-full border border-white/20" aria-hidden="true" />
        <div className="absolute bottom-[-30px] left-[-10px] h-[180px] w-[180px] rounded-full border border-white/15" aria-hidden="true" />
        <HeartDoodle className="absolute right-8 top-24" size={132} rotate={18} opacity={0.2} variant={1} />

        <div className="partners-copy-load relative max-w-[620px]">
          <h1 className="m-0 text-[clamp(64px,6.1vw,108px)] font-black leading-[0.88] tracking-[-0.065em] text-white">
            {title}
          </h1>
          <div className="partners-rule-load mt-10 h-1 w-20 bg-[#ffc83d]" aria-hidden="true" />
          <p className="m-0 mt-8 max-w-[560px] text-[clamp(21px,2vw,31px)] font-black leading-[1.12] text-white">
            {description}
          </p>
        </div>
      </div>

      <div className="relative min-h-full overflow-hidden bg-[#d7eef5]">
        <div className="partners-image-load absolute inset-0 overflow-hidden">
        <Image
          src="/images/partners/our-partners-hero-collage-2026-v2.jpg"
          alt=""
          fill
          priority
          sizes="(min-width: 1024px) 60vw, 100vw"
          className="object-cover object-[center_15%]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,143,219,0.38),transparent_28%),linear-gradient(0deg,rgba(8,35,61,0.28),transparent_32%)]" aria-hidden="true" />
        </div>
        <div className="absolute bottom-0 left-0 top-0 w-px bg-white/60" aria-hidden="true" />
        <div className="absolute bottom-8 right-8 h-28 w-28 border-b border-r border-white/75" aria-hidden="true" />
      </div>
    </section>
    </>
  );
}
