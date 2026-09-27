import type { ReactNode } from "react";
import Reveal from "@/components/Reveal";

export function Inner({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`relative z-[2] mx-auto w-[min(1220px,calc(100%_-_40px))] max-[620px]:w-[min(100%_-_28px,1220px)] ${className}`}>{children}</div>;
}

export function SectionTitle({ eyebrow, title, children, light = false }: { eyebrow?: string; title: string; children: ReactNode; light?: boolean }) {
  return (
    <Reveal className="mx-auto mb-7 max-w-[920px] text-center max-[820px]:mb-9">
      {eyebrow ? <p className={`mb-3 mt-0 text-[13px] font-black uppercase tracking-[0.12em] ${light ? "text-white/80" : "text-[#1fa8f4]"}`}>{eyebrow}</p> : null}
      <h2 className={`m-0 text-[clamp(36px,4.2vw,64px)] font-black leading-[0.98] tracking-normal ${light ? "text-white" : "text-[#1fa8f4]"}`}>{title}</h2>
      <p className={`mx-auto mt-3 text-[clamp(16px,1.5vw,21px)] font-bold leading-[1.4] ${light ? "text-white" : "text-[#557086]"}`}>{children}</p>
    </Reveal>
  );
}
