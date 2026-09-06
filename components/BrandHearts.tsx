import type { CSSProperties } from "react";

type HeartSize = "xs" | "sm" | "md" | "lg" | "xl";
type HeartTone = "coral" | "pink" | "soft";

const heartSizes: Record<HeartSize, number> = {
  xs: 28,
  sm: 42,
  md: 64,
  lg: 92,
  xl: 132,
};

const heartColors: Record<HeartTone, { fill: string; highlight: string }> = {
  coral: {
    fill: "var(--laf-heart-fill)",
    highlight: "var(--laf-heart-highlight)",
  },
  pink: {
    fill: "var(--laf-heart-fill)",
    highlight: "var(--laf-heart-highlight)",
  },
  soft: {
    fill: "var(--laf-heart-fill)",
    highlight: "var(--laf-heart-highlight)",
  },
};

type DecorativeHeartProps = {
  className?: string;
  style?: CSSProperties;
  size?: HeartSize | number;
  tone?: HeartTone;
  opacity?: number;
  rotate?: number;
  variant?: 0 | 1 | 2;
};

function resolveSize(size: HeartSize | number = "md") {
  return typeof size === "number" ? size : heartSizes[size];
}

export function HeartDoodle({
  className = "",
  style,
  size = "md",
  tone = "coral",
  opacity = 1,
  rotate = 0,
  variant = 0,
}: DecorativeHeartProps) {
  const pixelSize = resolveSize(size);
  const colors = heartColors[tone];
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 120 108"
      className={`pointer-events-none select-none ${className}`}
      style={{
        width: pixelSize,
        height: pixelSize,
        opacity,
        transform: rotate ? `rotate(${rotate}deg)` : undefined,
        ...style,
      }}
    >
      {variant === 1 ? (
        <g transform="translate(1 -2) rotate(7 60 54)">
          <path
            d="M54.5 94.5C38.1 83.9 24.8 72.8 18.8 59.4 12.9 46.3 17.7 33.9 28.4 30.8c11.7-3.4 24.8 7.8 29.9 28.9 5.3-20.8 22.3-42.5 40.2-30.7 11.7 7.7 8.1 26.5-6.6 39.1C79.4 78.8 66.1 86.7 54.5 94.5Z"
            fill={colors.fill}
          />
        </g>
      ) : variant === 2 ? (
        <g transform="translate(-2 3) rotate(-9 60 54)">
          <path
            d="M63.1 97.8C45.7 86.6 29.3 73.6 22.5 59.1 15.4 44 20.3 29.9 32 28.1c10.4-1.6 22.7 10.8 28.1 32.3 2.3-24.9 14.8-45.8 30.1-40.8 18.9 6.2 22.6 28.3 8 45.8C87.8 77.9 75.5 88.8 63.1 97.8Z"
            fill={colors.fill}
          />
        </g>
      ) : (
        <g transform="translate(0 1) rotate(-4 60 54)">
          <path
            d="M59.2 96.8C40.6 86.8 23.4 73.8 15.2 58.2 7.4 43.4 12.4 30 25.3 26.8c12.3-3.1 26.5 7.6 33.7 28.2 4.9-22.5 20.3-42.7 38.1-32.2 15.2 8.9 11.2 28.3-4.3 43.3C82.7 75.9 70.1 87.1 59.2 96.8Z"
            fill={colors.fill}
          />
        </g>
      )}
    </svg>
  );
}

export function HeartCluster({ className = "", style, opacity = 1 }: Omit<DecorativeHeartProps, "size" | "tone" | "rotate">) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none relative h-[132px] w-[180px] select-none ${className}`}
      style={{ opacity, ...style }}
    >
      <HeartDoodle className="absolute left-[82px] top-[0px]" size={92} rotate={15} />
      <HeartDoodle className="absolute left-[0px] top-[54px]" size={78} tone="pink" rotate={24} opacity={0.94} />
      <HeartDoodle className="absolute left-[74px] top-[94px]" size={62} tone="coral" rotate={28} opacity={0.96} style={{ "--laf-heart-highlight": "var(--laf-heart-blue-cutout)" } as CSSProperties} />
    </div>
  );
}

export function HeartPhotoAccent({ className = "", style, opacity = 0.92 }: Omit<DecorativeHeartProps, "size" | "tone" | "rotate">) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute -right-8 -top-8 z-[3] origin-center scale-[0.78] select-none max-[620px]:scale-[0.52] ${className}`}
      style={{ opacity, ...style }}
    >
      <HeartCluster className="laf-heart-drift" />
    </div>
  );
}

export function HeartTimelineMarker({ className = "", style, size = "md", opacity = 1 }: DecorativeHeartProps) {
  const pixelSize = resolveSize(size);

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none grid select-none place-items-center rounded-full bg-white shadow-[0_12px_28px_rgba(242,111,107,0.18)] ${className}`}
      style={{
        width: pixelSize,
        height: pixelSize,
        opacity,
        ...style,
      }}
    >
      <HeartDoodle size={Math.round(pixelSize * 0.58)} />
    </div>
  );
}

export function HeartPulse({ className = "", style, size = "lg", opacity = 1 }: DecorativeHeartProps) {
  const pixelSize = resolveSize(size);

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none relative grid select-none place-items-center ${className}`}
      style={{
        width: pixelSize,
        height: pixelSize,
        opacity,
        ...style,
      }}
    >
      <span className="laf-heart-pulse-ring absolute inset-[6%] rounded-full border-2 border-[color:var(--laf-heart-pink)] opacity-35" />
      <span className="laf-heart-pulse-ring absolute inset-[18%] rounded-full border border-[color:var(--laf-heart-coral)] opacity-30 [animation-delay:var(--laf-heart-pulse-delay)]" />
      <HeartDoodle className="laf-heart-beat relative z-[1]" size={Math.round(pixelSize * 0.58)} />
    </div>
  );
}

export function FloatingHearts({ className = "", style, opacity = 1 }: Omit<DecorativeHeartProps, "size" | "tone" | "rotate">) {
  const hearts = [
    { left: "4%", top: "18%", size: 40, tone: "pink", delay: "0s", rotate: -12 },
    { left: "74%", top: "8%", size: 62, tone: "coral", delay: "0.9s", rotate: 8 },
    { left: "16%", top: "72%", size: 54, tone: "soft", delay: "1.7s", rotate: 15 },
    { left: "84%", top: "66%", size: 44, tone: "pink", delay: "2.4s", rotate: -9 },
  ] as const;

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden select-none ${className}`}
      style={{ opacity, ...style }}
    >
      {hearts.map((heart) => (
        <HeartDoodle
          key={`${heart.left}-${heart.top}`}
          className="laf-heart-float absolute"
          size={heart.size}
          tone={heart.tone}
          rotate={heart.rotate}
          style={{
            left: heart.left,
            top: heart.top,
            animationDelay: heart.delay,
          }}
        />
      ))}
    </div>
  );
}
