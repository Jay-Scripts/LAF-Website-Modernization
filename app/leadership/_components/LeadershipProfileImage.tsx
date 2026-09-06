"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type Props = {
  src: string;
  alt: string;
  objectPosition?: string;
  imageClassName?: string;
  animationDelay: string;
  direction: "left" | "right";
};

export default function LeadershipProfileImage({ src, alt, objectPosition = "center 30%", imageClassName = "", animationDelay, direction }: Props) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = rootRef.current;
    if (!node) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
      const timeoutId = globalThis.setTimeout(() => setIsVisible(true), 0);
      return () => globalThis.clearTimeout(timeoutId);
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

  const animationClass = direction === "left" ? "leadership-profile-image-left" : "leadership-profile-image-right";

  return (
    <div ref={rootRef} className={`absolute inset-0 ${isVisible ? animationClass : "opacity-0"}`} style={isVisible ? { animationDelay } : undefined}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 767px) 25vw, 220px"
        className={`object-cover ${imageClassName}`}
        style={{ objectPosition }}
      />
      <style jsx>{`
        @keyframes leadership-profile-image-left {
          from { opacity: 0; clip-path: inset(0 100% 0 0); transform: scale(1.08) translate3d(14px, 0, 0); }
          to { opacity: 1; clip-path: inset(0 0 0 0); transform: scale(1) translate3d(0, 0, 0); }
        }
        @keyframes leadership-profile-image-right {
          from { opacity: 0; clip-path: inset(0 0 0 100%); transform: scale(1.08) translate3d(-14px, 0, 0); }
          to { opacity: 1; clip-path: inset(0 0 0 0); transform: scale(1) translate3d(0, 0, 0); }
        }
        .leadership-profile-image-left,
        .leadership-profile-image-right {
          animation-duration: 950ms;
          animation-timing-function: cubic-bezier(0.22, 1, 0.36, 1);
          animation-fill-mode: both;
        }
        @media (prefers-reduced-motion: reduce) {
          .leadership-profile-image-left,
          .leadership-profile-image-right { animation: none !important; opacity: 1; }
        }
      `}</style>
    </div>
  );
}
