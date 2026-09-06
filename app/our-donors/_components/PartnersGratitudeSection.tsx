import { HeartDoodle } from "@/components/BrandHearts";
import Reveal from "@/components/Reveal";
import PartnersGratitudePhotoCarousel from "./PartnersGratitudePhotoCarousel";
import PartnersInner from "./PartnersInner";

export default function PartnersGratitudeSection() {
  return (
    <section className="relative overflow-hidden bg-[#f4f7f7] py-[clamp(76px,10vw,136px)] text-[#08233d]">
      <div
        className="absolute inset-x-0 top-0 h-px bg-[#d8e4e6]"
        aria-hidden="true"
      />
      <HeartDoodle
        className="absolute -right-28 top-20 z-0 max-[620px]:hidden"
        size={360}
        rotate={18}
        opacity={0.16}
        variant={1}
      />

      <PartnersInner>
        <div className="relative z-[1] grid grid-cols-[minmax(0,1.18fr)_minmax(0,0.82fr)] items-center gap-5 sm:gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(390px,0.78fr)] lg:gap-[clamp(56px,9vw,144px)]">
          <Reveal className="max-w-[720px]">
            <blockquote className="m-0 max-w-[620px] text-[clamp(30px,5.6vw,78px)] font-black leading-[0.94] tracking-[-0.05em] text-[#078fdb]">
              &quot;Thank you for believing that no child should fight
              alone.&quot;
            </blockquote>
            <div className="mt-10 flex items-center gap-4 text-[12px] font-black uppercase tracking-[0.18em] text-[#557086]">
              <span className="h-px w-14 bg-[#078fdb]" aria-hidden="true" />
              Little Ark Foundation
            </div>
          </Reveal>

          <Reveal
            delay={120}
            className="relative mx-auto w-full max-w-[520px] lg:mr-0"
          >
            <PartnersGratitudePhotoCarousel />
            <div
              className="absolute -bottom-7 -left-7 hidden h-24 w-24 border-b border-l border-[#ff8f93] sm:block"
              aria-hidden="true"
            />
            <div className="absolute -right-5 -top-5 flex h-20 w-20 items-center justify-center rounded-full bg-[#ff8f93] shadow-[0_14px_30px_rgba(231,117,121,0.22)] sm:h-24 sm:w-24">
              <HeartDoodle size={54} rotate={10} opacity={0.95} />
            </div>
          </Reveal>
        </div>

      </PartnersInner>
    </section>
  );
}
