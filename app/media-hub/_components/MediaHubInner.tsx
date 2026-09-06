import type { ReactNode } from "react";

type MediaHubInnerProps = {
  children: ReactNode;
  className?: string;
};

export default function MediaHubInner({ children, className = "" }: MediaHubInnerProps) {
  return (
    <div className={`relative z-[2] mx-auto w-[min(1220px,calc(100%_-_40px))] max-[620px]:w-[min(100%_-_28px,1220px)] ${className}`}>
      {children}
    </div>
  );
}
