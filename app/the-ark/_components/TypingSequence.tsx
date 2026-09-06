"use client";

import { createElement, useEffect, useRef, useState } from "react";

export type TypingSegment = {
  as: "h2" | "p";
  text: string;
  className: string;
};

function visibleText(text: string, progress: number) {
  return text.slice(0, Math.max(0, Math.min(text.length, progress)));
}

export default function TypingSequence({ segments }: { segments: TypingSegment[] }) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const totalCharacters = segments.reduce((total, segment) => total + segment.text.length, 0);
  const [progress, setProgress] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const node = rootRef.current;
    if (!node) return;

    const showEverything = () => {
      setProgress(totalCharacters);
      setStarted(true);
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
      showEverything();
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setStarted(true);
        observer.unobserve(node);
      },
      { threshold: 0.28 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [totalCharacters]);

  useEffect(() => {
    if (!started || progress >= totalCharacters) return;

    const timer = globalThis.setInterval(() => {
      setProgress((current) => Math.min(totalCharacters, current + 1));
    }, 12);

    return () => globalThis.clearInterval(timer);
  }, [progress, started, totalCharacters]);

  let charactersBefore = 0;

  return (
    <div ref={rootRef}>
      <span className="sr-only">{segments.map((segment) => segment.text).join(" ")}</span>
      {segments.map((segment) => {
        const start = charactersBefore;
        const currentProgress = progress - start;
        const typed = visibleText(segment.text, currentProgress);
        const isTyping = started && progress < totalCharacters && currentProgress >= 0 && currentProgress < segment.text.length;
        charactersBefore += segment.text.length;

        return createElement(
          segment.as,
          { key: `${segment.as}-${segment.text}`, className: `relative ${segment.className}`, "aria-hidden": true },
          <>
            <span className="invisible block" aria-hidden="true">{segment.text}</span>
            <span className="absolute inset-0" aria-hidden="true">
              {typed}
              {isTyping ? <span className="ml-0.5 inline-block h-[0.9em] translate-y-[0.08em] border-r-2 border-[#1fa8f4]" /> : null}
            </span>
          </>,
        );
      })}
    </div>
  );
}
