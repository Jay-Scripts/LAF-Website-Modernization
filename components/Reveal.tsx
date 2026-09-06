"use client";

import { useEffect, useRef, useState, type CSSProperties, type HTMLAttributes, type ReactNode } from "react";

type RevealProps = Omit<HTMLAttributes<HTMLElement>, "children" | "className" | "style"> & {
  as?: "div" | "article" | "blockquote" | "section" | "footer";
  children?: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  style?: CSSProperties;
  threshold?: number;
};

const hiddenDirectionClasses = {
  up: "translate-y-8 max-[767px]:translate-y-5",
  down: "-translate-y-8 max-[767px]:-translate-y-5",
  left: "-translate-x-8 max-[767px]:-translate-x-5",
  right: "translate-x-8 max-[767px]:translate-x-5",
  none: "",
};

export default function Reveal({
  as = "div",
  children,
  className = "",
  delay = 0,
  direction = "up",
  style,
  threshold = 0.18,
  ...props
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const Component = as;

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (!("IntersectionObserver" in window)) {
      const timeoutId = globalThis.setTimeout(() => setIsVisible(true), 0);
      return () => globalThis.clearTimeout(timeoutId);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(node);
        }
      },
      { threshold },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);

  return (
    <Component
      {...props}
      ref={ref as never}
      data-revealed={isVisible ? "true" : "false"}
      style={{ transitionDelay: isVisible ? `${delay}ms` : "0ms", ...style }}
      className={`${className} transition-[opacity,transform,filter] duration-[620ms] ease-[cubic-bezier(0.22,1,0.36,1)] will-change-[opacity,transform,filter] motion-reduce:transform-none motion-reduce:opacity-100 motion-reduce:blur-0 motion-reduce:transition-none ${
        isVisible ? "translate-x-0 translate-y-0 opacity-100 blur-0" : `${hiddenDirectionClasses[direction]} opacity-0 blur-[2px]`
      }`}
    >
      {children}
    </Component>
  );
}
