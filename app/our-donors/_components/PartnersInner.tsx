import type { ReactNode } from "react";

type PartnersInnerProps = {
  children: ReactNode;
  className?: string;
};

export default function PartnersInner({ children, className = "" }: PartnersInnerProps) {
  return (
    <div className={`relative z-[2] mx-auto w-[min(1220px,calc(100%_-_40px))] max-[620px]:w-[min(100%_-_28px,1220px)] ${className}`}>
      {children}
    </div>
  );
}
