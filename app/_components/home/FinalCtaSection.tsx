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
    <section ref={sectionRef} className="relative grid min-h-[58dvh] w-full place-items-center overflow-hidden bg-[#073f89] py-[clamp(58px,6.5vw,86px)] text-white max-[767px]:min-h-[46dvh] max-[767px]:py-12">
      <style>{`
        @keyframes home-cta-image-in-view {
          from { opacity: 0; transform: scale(1.08); }
          to { opacity: 0.7; transform: scale(1); }
        }
        @keyframes home-cta-copy-in-view {
          from { opacity: 0; transform: translateY(24px); clip-path: inset(100% 0 0 0); }
          to { opacity: 1; transform: translateY(0); clip-path: inset(0 0 0 0); }
        }
        .home-cta-image-in-view { animation: home-cta-image-in-view 1400ms cubic-bezier(0.22, 1, 0.36, 1) both; }
        .home-cta-copy-in-view { animation: home-cta-copy-in-view 850ms cubic-bezier(0.22, 1, 0.36, 1) 180ms both; }
        @media (prefers-reduced-motion: reduce) {
          .home-cta-image-in-view { animation: none !important; opacity: 0.7; }
          .home-cta-copy-in-view { animation: none !important; }
        }
      `}</style>
      <Image src="/images/get-on-board/give-hope-children.png" alt="" fill sizes="100vw" className={`absolute inset-0 z-0 object-cover object-[58%_center] max-[767px]:object-[54%_center] ${isVisible ? "home-cta-image-in-view" : "opacity-0"}`} />
      <div className="absolute inset-0 z-0 bg-[linear-gradient(90deg,rgba(4,20,42,0.82)_0%,rgba(7,63,137,0.70)_44%,rgba(0,143,228,0.24)_100%)] max-[767px]:bg-[linear-gradient(180deg,rgba(4,20,42,0.48)_0%,rgba(7,63,137,0.70)_54%,rgba(4,20,42,0.82)_100%)]" />
      <HeartDoodle className="absolute -bottom-24 right-[8%] z-[1] max-[620px]:hidden" size={360} rotate={18} opacity={0.22} variant={2} />
      <HeartDoodle className="absolute left-[10%] top-6 z-[1] max-[620px]:hidden" size={120} rotate={-20} opacity={0.18} variant={1} />
      <div className={`relative z-[2] mx-auto w-[min(1120px,calc(100%_-_48px))] text-center max-[767px]:w-[min(100%_-_28px,920px)] ${isVisible ? "home-cta-copy-in-view" : "translate-y-5 opacity-0"}`}>
        <div className="mx-auto max-w-[760px]">
          <h2 className="mx-auto m-0 text-balance text-[clamp(30px,3.8vw,46px)] font-black leading-[1.06] max-[767px]:max-w-[330px] max-[767px]:text-[clamp(1.8rem,7.4vw,2.3rem)]">Help Us Build Brighter Futures</h2>
          <CTAButton href={siteContent.links.giveHopePath} className="mt-7 max-[767px]:mt-7 max-[767px]:min-h-[48px] max-[767px]:px-8 max-[767px]:text-[13px]">Give Hope</CTAButton>
        </div>
      </div>
    </section>
  );
}
