"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type ViewportRevealImageProps = {
  src: string;
  alt: string;
  className?: string;
  sizes: string;
};

export default function ViewportRevealImage({ src, alt, className = "", sizes }: ViewportRevealImageProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = rootRef.current;
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
      { threshold: 0.2, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={rootRef} className="absolute inset-0 overflow-hidden">
      <style>{`
        @keyframes viewport-reveal-image-load {
          from { opacity: 0; clip-path: inset(0 100% 0 0); transform: scale(1.06); }
          to { opacity: 1; clip-path: inset(0 0 0 0); transform: scale(1); }
        }
        .viewport-reveal-image-load { animation: viewport-reveal-image-load 1100ms cubic-bezier(0.22, 1, 0.36, 1) both; }
        @media (prefers-reduced-motion: reduce) {
          .viewport-reveal-image-load { animation: none !important; opacity: 1; }
        }
      `}</style>
      <Image
        src={src}
        alt={alt}
        fill
        onLoad={() => setIsLoaded(true)}
        sizes={sizes}
        className={`${isLoaded && isVisible ? "viewport-reveal-image-load" : "opacity-0"} object-cover object-center transition duration-500 ease-out group-hover:scale-[1.04] motion-reduce:transform-none motion-reduce:transition-none ${className}`}
      />
    </div>
  );
}
