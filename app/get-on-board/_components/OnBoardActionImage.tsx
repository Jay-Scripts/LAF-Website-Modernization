"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type OnBoardActionImageProps = {
  src: string;
  alt: string;
  imagePosition: string;
  mobilePosition: string;
  animationClassName: string;
  animationDelay: string;
};

export default function OnBoardActionImage({
  src,
  alt,
  imagePosition,
  mobilePosition,
  animationClassName,
  animationDelay,
}: OnBoardActionImageProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = rootRef.current;
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
    <div ref={rootRef} className={`absolute inset-0 ${isVisible ? animationClassName : "opacity-0"}`} style={isVisible ? { animationDelay } : undefined}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 767px) calc(100vw - 32px), 50vw"
        className={`object-cover ${imagePosition} ${mobilePosition}`}
      />
    </div>
  );
}
