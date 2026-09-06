"use client";

import { useEffect, useRef, useState } from "react";

type CountUpProps = {
  value: number;
  className?: string;
};

export default function CountUp({ value, className = "" }: CountUpProps) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [displayValue, setDisplayValue] = useState(value);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (!("IntersectionObserver" in window)) {
      const timeoutId = setTimeout(() => setDisplayValue(value), 0);
      return () => clearTimeout(timeoutId);
    }

    let frameId = 0;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;

        const start = performance.now();
        const duration = 1150;
        setDisplayValue(0);

        function tick(now: number) {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setDisplayValue(Math.round(value * eased));

          if (progress < 1) {
            frameId = requestAnimationFrame(tick);
          } else {
            setDisplayValue(value);
          }
        }

        frameId = requestAnimationFrame(tick);
        observer.unobserve(node);
      },
      { threshold: 0.18 },
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
      if (frameId) cancelAnimationFrame(frameId);
    };
  }, [value]);

  return (
    <span ref={ref} className={className}>
      {displayValue.toLocaleString()}
    </span>
  );
}
