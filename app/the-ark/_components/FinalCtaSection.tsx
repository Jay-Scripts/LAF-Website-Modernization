"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { HeartDoodle } from "@/components/BrandHearts";
import CTAButton from "@/components/CTAButton";
import { siteContent } from "@/data/siteContent";

export default function FinalCtaSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setIsVisible(true);
        observer.unobserve(node);
      },
      { threshold: 0.2, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative grid min-h-[58dvh] place-items-center overflow-hidden border-t border-[#c8f4ff]/80 bg-[#073f89] py-[clamp(72px,8vw,104px)] text-center text-white max-[767px]:min-h-[62dvh] max-[767px]:py-14">
      <style>{`
        @keyframes ark-cta-image-in-view {
          from { opacity: 0; transform: scale(1.08); }
          to { opacity: 0.7; transform: scale(1); }
        }
        @keyframes ark-cta-copy-in-view {
          from { opacity: 0; transform: translateY(24px); clip-path: inset(100% 0 0 0); }
          to { opacity: 1; transform: translateY(0); clip-path: inset(0 0 0 0); }
        }
        .ark-cta-image-in-view { animation: ark-cta-image-in-view 1400ms cubic-bezier(0.22, 1, 0.36, 1) both; }
        .ark-cta-copy-in-view { animation: ark-cta-copy-in-view 850ms cubic-bezier(0.22, 1, 0.36, 1) 180ms both; }
        @media (prefers-reduced-motion: reduce) {
          .ark-cta-image-in-view { animation: none !important; opacity: 0.7; }
          .ark-cta-copy-in-view { animation: none !important; }
        }
      `}</style>
      <Image
        src="/images/our-voyage/hero-ov-2026.jpeg"
        alt=""
        fill
        sizes="100vw"
        className={`absolute inset-0 z-0 object-cover object-[center_58%] max-[767px]:object-[54%_58%] ${isVisible ? "ark-cta-image-in-view" : "opacity-0"}`}
      />
      <div
        className="absolute inset-0 z-0 bg-[linear-gradient(90deg,rgba(4,20,42,0.84)_0%,rgba(7,63,137,0.7)_44%,rgba(0,143,228,0.24)_100%)] max-[767px]:bg-[linear-gradient(180deg,rgba(4,20,42,0.48)_0%,rgba(7,63,137,0.72)_54%,rgba(4,20,42,0.86)_100%)]"
        aria-hidden="true"
      />
      <div
        className="absolute inset-x-0 bottom-0 z-0 h-28 bg-[linear-gradient(180deg,transparent,rgba(4,20,42,0.6))]"
        aria-hidden="true"
      />
      <HeartDoodle
        className="absolute left-[10%] top-6 z-[1] max-[620px]:hidden"
        size={120}
        rotate={-20}
        opacity={0.18}
        variant={1}
      />
      <HeartDoodle
        className="absolute -bottom-24 right-[8%] z-[1] max-[620px]:hidden"
        size={360}
        rotate={18}
        opacity={0.22}
        variant={2}
      />
      <div className={`relative z-[2] mx-auto w-[min(900px,calc(100%_-_32px))] ${isVisible ? "ark-cta-copy-in-view" : "translate-y-5 opacity-0"}`}>
        <h2 className="mx-auto m-0 max-w-[820px] text-balance text-[clamp(36px,5.2vw,68px)] font-black leading-[0.98] tracking-[-0.035em] drop-shadow-[0_10px_28px_rgba(0,34,78,0.3)] max-[767px]:max-w-[340px] max-[767px]:text-[clamp(2rem,8vw,2.8rem)] max-[767px]:leading-[1.02]">
          When families find hope, healing becomes possible.
        </h2>
        <p className="mx-auto mt-5 max-w-[720px] text-[clamp(16px,1.7vw,21px)] font-semibold leading-[1.45] text-white/88 max-[767px]:mt-4 max-[767px]:max-w-[320px] max-[767px]:text-[15px] max-[767px]:leading-[1.48]">
          Together, we provide more than services&mdash;we provide the support
          that reminds every family they are not alone.
        </p>
        <CTAButton
          href={siteContent.links.giveHopePath}
          className="mt-7 shadow-[0_12px_30px_rgba(9,26,47,0.24)] hover:!scale-100 hover:!-translate-y-[3px] hover:!shadow-[0_18px_38px_rgba(9,26,47,0.3)] focus-visible:!scale-100 focus-visible:!-translate-y-[3px] max-[767px]:mt-6 max-[767px]:min-h-[48px] max-[767px]:px-8 max-[767px]:text-[13px]"
        >
          Give Hope
        </CTAButton>
      </div>
    </section>
  );
}
