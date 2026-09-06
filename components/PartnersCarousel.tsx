"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties, type PointerEvent } from "react";

const partnerLogos = [
  { src: "/images/partners/national-childrens-hospital.png", alt: "National Children's Hospital logo" },
  { src: "/images/partners/blood-and-cancer-care-center.png", alt: "Blood and Cancer Care Center logo" },
  { src: "/images/partners/gma.png", alt: "GMA logo" },
  { src: "/images/partners/breadcom-quezon-city.png", alt: "Breadcom Quezon City logo" },
  { src: "/images/partners/union-church-of-manila.png", alt: "Union Church of Manila logo" },
  { src: "/images/partners/pfizer.png", alt: "Pfizer logo" },
  { src: "/images/partners/roche.png", alt: "Roche logo" },
  { src: "/images/partners/art-for-love.png", alt: "Art for Love logo" },
  { src: "/images/partners/alternatives-food-corp.png", alt: "Alternatives Food Corp. logo" },
  { src: "/images/partners/gerrys-grill.png", alt: "Gerry's Grill logo" },
  { src: "/images/partners/celebrate-every-breath.png", alt: "Celebrate Every Breath logo" },
  { src: "/images/partners/ilustrador-ng-kabataan-ink.png", alt: "Ilustrador ng Kabataan Ink logo" },
  { src: "/images/partners/chummy-chum-charity-of-love.png", alt: "Chummy Chum Charity of Love logo" },
  { src: "/images/partners/abenson.png", alt: "Abenson logo" },
  { src: "/images/partners/revelation-community-church.png", alt: "Revelation Community Church logo" },
  { src: "/images/partners/mundo-design-build.png", alt: "Mundo Design + Build logo" },
  { src: "/images/partners/prolife-uk.png", alt: "Pru Life U.K. logo" },
  { src: "/images/partners/f1-hotel-manila.png", alt: "F1 Hotel Manila logo" },
  { src: "/images/partners/lamoyan-corporation.png", alt: "Lamoyan Corporation logo" },
  { src: "/images/partners/speed.png", alt: "SPEED logo" },
  { src: "/images/partners/city-of-mandaluyong.png", alt: "City of Mandaluyong logo" },
  { src: "/images/partners/thalassemia-kids-club.png", alt: "Thalassemia Kids Club logo" },
  { src: "/images/partners/the-pickle-yard.png", alt: "The Pickle Yard PH logo" },
  { src: "/images/partners/mamou-human-resources.png", alt: "Mamou Human Resources Department logo" },
] as const;

const partnerLogoRows = [
  partnerLogos.filter((_, index) => index % 3 === 0),
  partnerLogos.filter((_, index) => index % 3 === 1),
  partnerLogos.filter((_, index) => index % 3 === 2),
] as const;

function PartnerLogoCard({ partner }: { partner: (typeof partnerLogos)[number] }) {
  const cardRef = useRef<HTMLElement | null>(null);

  const handlePointerMove = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType === "touch") return;
    const card = cardRef.current;
    if (!card) return;

    const bounds = card.getBoundingClientRect();
    const offsetX = (event.clientX - bounds.left) / bounds.width - 0.5;
    const offsetY = (event.clientY - bounds.top) / bounds.height - 0.5;
    card.style.setProperty("--partner-tilt-x", `${offsetY * -5}deg`);
    card.style.setProperty("--partner-tilt-y", `${offsetX * 6}deg`);
    card.style.setProperty("--partner-light-x", `${(offsetX + 0.5) * 100}%`);
    card.style.setProperty("--partner-light-y", `${(offsetY + 0.5) * 100}%`);
  };

  const resetTilt = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.setProperty("--partner-tilt-x", "0deg");
    card.style.setProperty("--partner-tilt-y", "0deg");
    card.style.setProperty("--partner-light-x", "50%");
    card.style.setProperty("--partner-light-y", "50%");
  };

  return (
    <article ref={cardRef} onPointerMove={handlePointerMove} onPointerLeave={resetTilt} className="partner-logo-card grid h-[150px] w-[276px] shrink-0 place-items-center rounded-[22px] border border-[rgba(31,168,244,0.12)] bg-white p-5 shadow-[0_14px_34px_rgba(31,168,244,0.10)] max-[1024px]:h-[128px] max-[1024px]:w-[230px] max-[1024px]:p-[18px] max-[620px]:h-[92px] max-[620px]:w-[156px] max-[620px]:rounded-[17px] max-[620px]:p-3.5">
      <div className="partner-logo-mark relative h-full w-full">
        <Image
          src={partner.src}
          alt={partner.alt}
          fill
          sizes="(max-width: 620px) 156px, (max-width: 1024px) 230px, 276px"
          className="object-contain"
        />
      </div>
    </article>
  );
}

export default function PartnersCarousel() {
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = carouselRef.current;
    if (!node) return;

    if (!("IntersectionObserver" in window)) {
      const timeoutId = globalThis.setTimeout(() => setIsVisible(true), 0);
      return () => globalThis.clearTimeout(timeoutId);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setIsVisible(true);
        observer.unobserve(node);
      },
      { threshold: 0.16, rootMargin: "0px 0px -10% 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={carouselRef} className="grid gap-[var(--logo-gap)] [--logo-gap:18px] max-[1024px]:[--logo-gap:14px] max-[620px]:[--logo-gap:12px]">
      <style>{`
        @keyframes logo-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(calc(-50% - (var(--logo-gap) / 2))); }
        }
        @keyframes partner-row-arrive {
          from { opacity: 0; transform: perspective(960px) translate3d(0, 28px, -72px) rotateX(9deg); }
          to { opacity: 1; transform: perspective(960px) translate3d(0, 0, 0) rotateX(0); }
        }
        .partner-logo-row-stage { opacity: 0; transform: perspective(960px) translate3d(0, 28px, -72px) rotateX(9deg); }
        .partner-logo-row-stage[data-visible="true"] { animation: partner-row-arrive 900ms cubic-bezier(0.22, 1, 0.36, 1) var(--partner-row-delay) both; }
        .partner-logo-row { perspective: 960px; }
        .partner-logo-card {
          --partner-tilt-x: 0deg;
          --partner-tilt-y: 0deg;
          --partner-light-x: 50%;
          --partner-light-y: 50%;
          position: relative;
          isolation: isolate;
          transform: rotateX(var(--partner-tilt-x)) rotateY(var(--partner-tilt-y)) translateZ(0);
          transform-style: preserve-3d;
          transition: transform 260ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 260ms ease, border-color 260ms ease;
        }
        .partner-logo-card::after {
          content: "";
          position: absolute;
          inset: 0;
          z-index: -1;
          border-radius: inherit;
          pointer-events: none;
          background: radial-gradient(circle at var(--partner-light-x) var(--partner-light-y), rgba(200, 244, 255, 0.72), transparent 42%);
          opacity: 0;
          transform: translateZ(1px);
          transition: opacity 240ms ease;
        }
        .partner-logo-mark { transform: translateZ(18px); }
        @media (hover: hover) and (pointer: fine) {
          .partner-logo-card:hover { border-color: rgba(31, 168, 244, 0.4); box-shadow: 0 24px 44px rgba(0, 91, 168, 0.18); }
          .partner-logo-card:hover::after { opacity: 1; }
        }
        @media (prefers-reduced-motion: reduce) {
          .partner-logo-row { animation: none !important; }
          .partner-logo-row-stage { animation: none !important; opacity: 1; transform: none; }
          .partner-logo-card, .partner-logo-mark { transform: none !important; transition: none !important; }
        }
      `}</style>
      {partnerLogoRows.map((row, rowIndex) => {
        const repeated = [...row, ...row];
        return (
          <div
            key={`partner-row-${rowIndex}`}
            data-visible={isVisible ? "true" : "false"}
            className="partner-logo-row-stage"
            style={{ "--partner-row-delay": `${rowIndex * 140}ms` } as CSSProperties}
          >
            <div
              className="partner-logo-row flex w-max gap-[var(--logo-gap)]"
              style={{
                animation:
                  rowIndex === 0
                    ? "logo-scroll 34s linear infinite"
                    : rowIndex === 1
                      ? "logo-scroll 40s linear infinite reverse"
                      : "logo-scroll 37s linear infinite",
              }}
              aria-label={row.map((partner) => partner.alt).join(", ")}
            >
              {repeated.map((partner, index) => (
                <PartnerLogoCard key={`${partner.src}-${index}`} partner={partner} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
