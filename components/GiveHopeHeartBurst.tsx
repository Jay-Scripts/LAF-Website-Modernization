"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import { HeartDoodle } from "./BrandHearts";

const particles = [
  { size: 20, x: -50, y: -42, midX: -18, midY: -18, rotate: -22, delay: -220, duration: 1160, opacity: 0.94, variant: 0 },
  { size: 24, x: -28, y: -64, midX: -8, midY: -24, rotate: 16, delay: -860, duration: 1420, opacity: 0.98, variant: 1 },
  { size: 31, x: 8, y: -52, midX: 2, midY: -20, rotate: -10, delay: -420, duration: 1280, opacity: 1, variant: 2 },
  { size: 35, x: 46, y: -40, midX: 18, midY: -15, rotate: 24, delay: -1040, duration: 1540, opacity: 0.96, variant: 0 },
  { size: 27, x: -64, y: -16, midX: -24, midY: -5, rotate: 8, delay: -120, duration: 1360, opacity: 0.94, variant: 2 },
  { size: 42, x: 62, y: -12, midX: 26, midY: -3, rotate: -18, delay: -680, duration: 1660, opacity: 1, variant: 1 },
  { size: 21, x: -12, y: -74, midX: -3, midY: -31, rotate: 21, delay: -1320, duration: 1760, opacity: 0.95, variant: 0 },
  { size: 45, x: 18, y: -82, midX: 10, midY: -36, rotate: -25, delay: -260, duration: 1880, opacity: 0.94, variant: 2 },
  { size: 26, x: 36, y: -68, midX: 14, midY: -26, rotate: 12, delay: -1560, duration: 2040, opacity: 0.97, variant: 1 },
  { size: 19, x: -42, y: -72, midX: -13, midY: -29, rotate: -14, delay: -940, duration: 1700, opacity: 0.93, variant: 2 },
  { size: 33, x: 70, y: -34, midX: 30, midY: -12, rotate: 20, delay: -1460, duration: 1960, opacity: 0.95, variant: 0 },
  { size: 29, x: -72, y: -32, midX: -29, midY: -11, rotate: -24, delay: -560, duration: 1820, opacity: 0.96, variant: 1 },
] as const;

export function useGiveHopeHeartBurst() {
  const [isShowering, setIsShowering] = useState(false);
  const tapTimeoutRef = useRef<number | null>(null);

  const clearTapTimeout = useCallback(() => {
    if (tapTimeoutRef.current === null) return;
    window.clearTimeout(tapTimeoutRef.current);
    tapTimeoutRef.current = null;
  }, []);

  const startBurstLoop = useCallback(() => {
    clearTapTimeout();
    setIsShowering(true);
  }, [clearTapTimeout]);

  const stopBurstLoop = useCallback(() => {
    clearTapTimeout();
    setIsShowering(false);
  }, [clearTapTimeout]);

  const triggerOnce = useCallback(() => {
    clearTapTimeout();
    setIsShowering(true);
    tapTimeoutRef.current = window.setTimeout(() => {
      setIsShowering(false);
      tapTimeoutRef.current = null;
    }, 1100);
  }, [clearTapTimeout]);

  useEffect(() => clearTapTimeout, [clearTapTimeout]);

  return { isShowering, startBurstLoop, stopBurstLoop, triggerOnce };
}

export function GiveHopeHeartBurst({ isShowering }: { isShowering: boolean }) {
  if (!isShowering) return null;

  return (
    <span aria-hidden="true" className="laf-give-hope-burst">
      {particles.map((particle, index) => (
        <span
          key={`${particle.size}-${index}`}
          className="laf-give-hope-particle"
          style={
            {
              "--laf-particle-x": `${particle.x}px`,
              "--laf-particle-y": `${particle.y}px`,
              "--laf-particle-mid-x": `${particle.midX}px`,
              "--laf-particle-mid-y": `${particle.midY}px`,
              "--laf-particle-rotate": `${particle.rotate}deg`,
              "--laf-particle-delay": `${particle.delay}ms`,
              "--laf-particle-duration": `${particle.duration}ms`,
              "--laf-particle-opacity": particle.opacity,
            } as CSSProperties
          }
        >
          <HeartDoodle size={particle.size} tone="coral" variant={particle.variant} />
        </span>
      ))}
    </span>
  );
}
