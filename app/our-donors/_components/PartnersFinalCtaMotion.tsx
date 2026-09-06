"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import CTAButton from "@/components/CTAButton";
import { siteContent } from "@/data/siteContent";

export default function PartnersFinalCtaMotion() {
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
    <section ref={sectionRef} className="relative grid min-h-[70svh] place-items-center overflow-hidden bg-[#073f89] px-5 py-[clamp(76px,9vw,112px)] text-center text-white max-[767px]:min-h-[64svh] max-[767px]:py-14">
      <style>{`
        @keyframes partners-cta-image-in-view {
          from { opacity: 0; transform: scale(1.08); }
          to { opacity: 0.82; transform: scale(1); }
        }
        @keyframes partners-cta-copy-in-view {
          from { opacity: 0; transform: translateY(24px); clip-path: inset(100% 0 0 0); }
          to { opacity: 1; transform: translateY(0); clip-path: inset(0 0 0 0); }
        }
        @keyframes partners-cta-rule-in-view {
          from { opacity: 0; transform: scaleX(0); transform-origin: center; }
          to { opacity: 1; transform: scaleX(1); transform-origin: center; }
        }
        .partners-cta-image-in-view { animation: partners-cta-image-in-view 1400ms cubic-bezier(0.22, 1, 0.36, 1) both; }
        .partners-cta-copy-in-view { animation: partners-cta-copy-in-view 850ms cubic-bezier(0.22, 1, 0.36, 1) 180ms both; }
        .partners-cta-rule-in-view { animation: partners-cta-rule-in-view 700ms cubic-bezier(0.22, 1, 0.36, 1) 520ms both; }
        @media (prefers-reduced-motion: reduce) {
          .partners-cta-image-in-view { animation: none !important; opacity: 0.82; }
          .partners-cta-copy-in-view, .partners-cta-rule-in-view { animation: none !important; }
        }
      `}</style>

      <Image
        src="/images/our-voyage/trust-in-action-community-support.jpg"
        alt=""
        fill
        sizes="100vw"
        className={`absolute inset-0 object-cover object-center max-[767px]:object-[center_38%] ${isVisible ? "partners-cta-image-in-view" : "opacity-0"}`}
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(3,31,73,0.9),rgba(0,91,168,0.68)_52%,rgba(0,143,228,0.34)),linear-gradient(0deg,rgba(3,31,73,0.74),transparent_62%)] max-[767px]:bg-[linear-gradient(180deg,rgba(3,31,73,0.3),rgba(0,61,128,0.68)_48%,rgba(3,31,73,0.92))]" aria-hidden="true" />
      <div className="absolute left-[8%] top-[18%] h-24 w-1 bg-[#1fa8f4] max-[767px]:left-6 max-[767px]:top-8 max-[767px]:h-14" aria-hidden="true" />

      <div className={`relative z-[1] mx-auto w-[min(1000px,calc(100%_-_32px))] ${isVisible ? "partners-cta-copy-in-view" : "translate-y-5 opacity-0"}`}>
        <p className="m-0 text-[11px] font-black uppercase tracking-[0.2em] text-[#c8f4ff] max-[767px]:text-[9px]">Stand with families</p>
        <h2 className="mx-auto mt-5 max-w-[1000px] text-balance text-[clamp(40px,6vw,78px)] font-black leading-[0.94] tracking-[-0.04em] drop-shadow-[0_10px_28px_rgba(0,34,78,0.32)] max-[767px]:mt-3 max-[767px]:max-w-[340px] max-[767px]:text-[clamp(2rem,8.5vw,2.9rem)] max-[767px]:leading-[1.02]">
          Together, we are building brighter futures.
        </h2>
        <div className={`mx-auto mt-7 h-1 w-16 bg-[#1fa8f4] max-[767px]:mt-5 max-[767px]:h-0.5 max-[767px]:w-12 ${isVisible ? "partners-cta-rule-in-view" : "opacity-0"}`} aria-hidden="true" />
        <CTAButton href={siteContent.links.giveHopePath} className="mt-7 min-h-[52px] px-7 shadow-[0_16px_38px_rgba(255,200,61,0.38)] max-[767px]:mt-6 max-[767px]:min-h-[50px] max-[767px]:px-6">
          Give Hope
        </CTAButton>
      </div>
    </section>
  );
}
