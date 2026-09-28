"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties, type PointerEvent } from "react";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { partnerProfiles, type PartnerProfile } from "@/data/partnerProfiles";

const partnerLogos = partnerProfiles.map((partner) => ({
  ...partner,
  src: `/images/partners/${partner.id}.png`,
  alt: `${partner.name} logo`,
}));

const partnerLogoRows = [
  partnerLogos.filter((_, index) => index % 3 === 0),
  partnerLogos.filter((_, index) => index % 3 === 1),
  partnerLogos.filter((_, index) => index % 3 === 2),
] as const;

function PartnerLogoCard({ partner, isDuplicate, onSelect }: {
  partner: (typeof partnerLogos)[number];
  isDuplicate: boolean;
  onSelect: (partner: PartnerProfile) => void;
}) {
  const cardRef = useRef<HTMLButtonElement | null>(null);

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
    <DialogTrigger ref={cardRef} id={`partner-preview-${partner.id}${isDuplicate ? "-copy" : ""}`} onClick={() => onSelect(partner)} onFocus={() => {
      if (cardRef.current?.matches(":focus-visible")) {
        cardRef.current.scrollIntoView({ block: "nearest", inline: "nearest" });
      }
    }} aria-label={`About ${partner.name}`} aria-hidden={isDuplicate || undefined} tabIndex={isDuplicate ? -1 : 0} onPointerMove={handlePointerMove} onPointerLeave={resetTilt} className="partner-logo-card grid h-[150px] w-[276px] shrink-0 cursor-pointer place-items-center rounded-[22px] border border-[rgba(31,168,244,0.12)] bg-white p-5 shadow-[0_14px_34px_rgba(31,168,244,0.10)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-[#0068c9] max-[1024px]:h-[128px] max-[1024px]:w-[230px] max-[1024px]:p-[18px] max-[620px]:h-[92px] max-[620px]:w-[156px] max-[620px]:rounded-[17px] max-[620px]:p-3.5">
      <div className="partner-logo-mark relative h-full w-full">
        <Image
          src={partner.src}
          alt={partner.alt}
          fill
          sizes="(max-width: 620px) 156px, (max-width: 1024px) 230px, 276px"
          className="object-contain"
        />
      </div>
    </DialogTrigger>
  );
}

export default function PartnersCarousel() {
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedPartner, setSelectedPartner] = useState<PartnerProfile | null>(null);

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
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
    <div ref={carouselRef} data-paused={isDialogOpen} className="partner-carousel grid gap-[var(--logo-gap)] [--logo-gap:18px] max-[1024px]:[--logo-gap:14px] max-[620px]:[--logo-gap:12px]">
      <style>{`
        @keyframes logo-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(calc(-50% - (var(--logo-gap) / 2))); }
        }
        @keyframes partner-row-arrive {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .partner-logo-row-stage { opacity: 0; }
        .partner-logo-row-stage[data-visible="true"] { animation: partner-row-arrive 450ms ease-out var(--partner-row-delay) both; }
        .partner-logo-row-stage[data-visible="false"] .partner-logo-row { animation-play-state: paused !important; }
        .partner-logo-row-stage[data-visible="true"] .partner-logo-row { animation-delay: calc(450ms + var(--partner-row-delay)) !important; }
        .partner-logo-row { perspective: 960px; }
        .partner-carousel[data-paused="true"] .partner-logo-row,
        .partner-carousel:hover .partner-logo-row,
        .partner-carousel:focus-within .partner-logo-row { animation-play-state: paused !important; }
        .partner-logo-row-stage:has(.partner-logo-card:focus-visible) { overflow-x: auto; }
        .partner-logo-row-stage:has(.partner-logo-card:focus-visible) .partner-logo-row { animation: none !important; }
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
            style={{ "--partner-row-delay": `${rowIndex * 70}ms` } as CSSProperties}
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
                <PartnerLogoCard key={`${partner.src}-${index}`} partner={partner} isDuplicate={index >= row.length} onSelect={setSelectedPartner} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
    {selectedPartner && (
      <DialogContent finalFocus={() => document.getElementById(`partner-preview-${selectedPartner.id}`)} className="max-h-[85dvh] overflow-y-auto bg-white p-6 text-[#082f59] motion-reduce:animate-none sm:max-w-[540px] sm:p-8 [&_[data-slot=dialog-close]]:min-h-11 [&_[data-slot=dialog-close]]:min-w-11">
        <div className="relative mx-auto h-[140px] w-full max-w-[260px]">
          <Image src={`/images/partners/${selectedPartner.id}.png`} alt={`${selectedPartner.name} logo`} fill sizes="260px" className="object-contain" />
        </div>
        <DialogTitle className="break-words pr-5 text-2xl font-black leading-tight text-[#082f59]">{selectedPartner.name}</DialogTitle>
        <DialogDescription className="text-base leading-relaxed text-[#557086]">
          {selectedPartner.summary ?? "This organization is one of Little Ark's partners in hope. Its history is awaiting confirmation so we can share an accurate introduction."}
        </DialogDescription>
      </DialogContent>
    )}
    </Dialog>
  );
}
