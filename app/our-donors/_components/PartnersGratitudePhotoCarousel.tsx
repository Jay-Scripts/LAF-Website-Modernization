"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const photos = [
  {
    src: "/images/our-voyage/journey-built-on-hope.png",
    alt: "A Little Ark caregiver embracing a young person",
  },
  {
    src: "/images/our-voyage/trust-in-action-community-support.jpg",
    alt: "Little Ark families and supporters gathered together",
  },
  {
    src: "/images/our-voyage/clearer-support-family-meal.jpg",
    alt: "A family sharing a meal through Little Ark support",
  },
  {
    src: "/images/our-voyage/trust-in-action-activity.jpg",
    alt: "A Little Ark activity bringing children together",
  },
  {
    src: "/images/our-voyage/trust-in-action-donations.jpg",
    alt: "Supplies prepared for Little Ark families",
  },
  {
    src: "/images/our-voyage/looking-ahead-family.png",
    alt: "A Little Ark family looking ahead together",
  },
] as const;

export default function PartnersGratitudePhotoCarousel() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const node = rootRef.current;
    if (!node) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
      const frameId = window.requestAnimationFrame(() => setIsVisible(true));
      return () => window.cancelAnimationFrame(frameId);
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

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((index) => (index + 1) % photos.length);
    }, 2000);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <div ref={rootRef} className={`relative aspect-[0.84] overflow-hidden bg-[#d8edf4] ${isVisible ? "partners-gratitude-image-in-view" : "opacity-0"}`} aria-live="polite">
      <style>{`
        @keyframes partners-gratitude-image-in-view {
          from { opacity: 0; transform: scale(1.08); }
          to { opacity: 1; transform: scale(1); }
        }
        .partners-gratitude-image-in-view {
          animation: partners-gratitude-image-in-view 1100ms cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        @media (prefers-reduced-motion: reduce) {
          .partners-gratitude-image-in-view { animation: none !important; opacity: 1; transform: none; }
        }
      `}</style>
      {photos.map((photo, index) => (
        <Image
          key={photo.src}
          src={photo.src}
          alt={index === activeIndex ? photo.alt : ""}
          fill
          sizes="(max-width: 1024px) 100vw, 42vw"
          className={`object-cover object-center transition-opacity duration-700 ease-in-out ${index === activeIndex ? "opacity-100" : "opacity-0"}`}
          priority={index === 0}
        />
      ))}
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#08233d]/45 to-transparent" aria-hidden="true" />
      <p className="absolute bottom-5 left-5 m-0 max-w-[220px] text-[11px] font-black uppercase leading-[1.35] tracking-[0.16em] text-white">
        Care that stays close through treatment
      </p>
    </div>
  );
}
