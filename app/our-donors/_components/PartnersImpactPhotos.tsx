"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function PartnersImpactPhotos({ photos }: { photos: { src: string; alt: string }[] }) {
  const [slide, setSlide] = useState({ active: 0, loadedCount: 2 });
  const { active, loadedCount } = slide;
  const ready = useRef(new Set<number>());
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const timer = window.setInterval(() => {
      const bounds = container.current?.getBoundingClientRect();
      if (motion.matches || document.hidden || !bounds || bounds.bottom <= 0 || bounds.top >= window.innerHeight) return;
      setSlide((current) => {
        const next = (current.active + 1) % photos.length;
        return ready.current.has(next) ? { active: next, loadedCount: Math.max(current.loadedCount, next + 2) } : current;
      });
    }, 1500);
    return () => window.clearInterval(timer);
  }, [photos.length]);

  return (
    <div ref={container} className="relative aspect-[3/2] bg-[#edf6fa]">
      {photos.map((photo, index) => index < loadedCount && (
        <Image key={photo.src} src={photo.src} alt={photo.alt} fill
          sizes="(min-width: 1024px) 580px, (min-width: 640px) 90vw, 100vw"
          loading="eager" onLoad={() => ready.current.add(index)}
          aria-hidden={index !== active}
          className={`object-contain transition-opacity duration-500 ease-in-out motion-reduce:transition-none ${index === active ? "opacity-100" : "opacity-0"}`} />
      ))}
    </div>
  );
}
