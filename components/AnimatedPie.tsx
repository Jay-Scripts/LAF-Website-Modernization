"use client";

import { useEffect, useRef, useState } from "react";

type AnimatedPieProps = {
  segments: readonly {
    percent: number;
    color?: string;
    voyageColor?: string;
  }[];
  className?: string;
};

const emptyPie = "conic-gradient(#c8f4ff 0deg, rgba(255,255,255,.35) 0deg)";

function buildConicGradient(segments: AnimatedPieProps["segments"]) {
  let start = 0;
  const stops = segments.map((segment) => {
    const end = start + segment.percent * 3.6;
    const stop = `${segment.voyageColor ?? segment.color ?? "#c8f4ff"} ${start}deg ${end}deg`;
    start = end;
    return stop;
  });

  return `conic-gradient(${stops.join(", ")})`;
}

export default function AnimatedPie({ segments, className = "" }: AnimatedPieProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const pieBackground = buildConicGradient(segments);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(node);
        }
      },
      { threshold: 0.18 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`aspect-square w-[min(240px,64vw)] rounded-full shadow-[inset_0_0_0_18px_rgba(255,255,255,0.13),0_18px_42px_rgba(0,73,130,0.18)] transition-[background] duration-[900ms] ease-out max-[620px]:w-[min(260px,100%)] ${className}`}
      style={{ background: isVisible ? pieBackground : emptyPie }}
      aria-hidden="true"
    />
  );
}
