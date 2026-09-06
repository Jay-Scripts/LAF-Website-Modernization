import type { ReactNode } from "react";
import Reveal from "@/components/Reveal";

export function Inner({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`relative z-[2] mx-auto w-[min(1220px,calc(100%_-_40px))] max-[620px]:w-[min(100%_-_28px,1220px)] ${className}`}>{children}</div>;
}

export function SectionTitle({ eyebrow, title, children, light = false }: { eyebrow?: string; title: string; children: ReactNode; light?: boolean }) {
  return (
    <Reveal className="mx-auto mb-14 max-w-[920px] text-center">
      {eyebrow ? <p className={`mb-3 mt-0 text-[13px] font-black uppercase tracking-[0.12em] ${light ? "text-white/80" : "text-[#1fa8f4]"}`}>{eyebrow}</p> : null}
      <h2 className={`m-0 text-[clamp(44px,7vw,102px)] font-black leading-[0.94] tracking-normal ${light ? "text-white" : "text-[#1fa8f4]"}`}>{title}</h2>
      <p className={`mx-auto mt-5 text-[clamp(20px,2.3vw,30px)] font-extrabold leading-[1.34] ${light ? "text-white" : "text-[#557086]"}`}>{children}</p>
    </Reveal>
  );
}
