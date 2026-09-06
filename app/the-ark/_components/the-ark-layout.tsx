import Image from "next/image";
import type { ReactNode } from "react";
import { HeartPhotoAccent } from "@/components/BrandHearts";
import Reveal from "@/components/Reveal";
import ViewportRevealImage from "@/components/ViewportRevealImage";
import { lossPhoto, peoplePhoto } from "./the-ark-data";

export function Inner({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`relative z-[2] mx-auto w-[min(1220px,calc(100%_-_40px))] max-[620px]:w-[min(100%_-_28px,1220px)] ${className}`}>{children}</div>;
}

export function PhotoPanel({
  variant = "default",
  className = "",
  imageSrc,
  imageAlt = "",
  imageClassName = "object-cover object-center",
  maskRightEdge = false,
  revealImage = false,
}: {
  variant?: "default" | "loss";
  className?: string;
  imageSrc?: string;
  imageAlt?: string;
  imageClassName?: string;
  maskRightEdge?: boolean;
  revealImage?: boolean;
}) {
  return (
    <Reveal
      className={`relative min-h-[clamp(300px,38vw,520px)] overflow-visible rounded-[34px] max-[620px]:min-h-[280px] max-[620px]:rounded-3xl ${className}`}
      style={{ background: variant === "loss" ? lossPhoto : peoplePhoto }}
    >
      <div className="absolute inset-0 overflow-hidden rounded-[34px] bg-[inherit] shadow-[0_28px_80px_rgba(31,168,244,0.18)] before:absolute before:-inset-[5%] before:bg-[inherit] max-[620px]:rounded-3xl">
        {imageSrc ? (
          revealImage ? (
            <ViewportRevealImage src={imageSrc} alt={imageAlt} sizes="(max-width: 900px) calc(100vw - 40px), 54vw" className={imageClassName} />
          ) : (
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              sizes="(max-width: 900px) calc(100vw - 40px), 54vw"
              className={imageClassName}
            />
          )
        ) : null}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.02),rgba(31,168,244,0.12))]" aria-hidden="true" />
        {maskRightEdge ? <span className="absolute inset-y-0 right-0 w-0.5 bg-white" aria-hidden="true" /> : null}
      </div>
      {imageSrc ? <HeartPhotoAccent className="-right-12 -top-12 rotate-[-8deg] max-[620px]:-right-16 max-[620px]:-top-14" opacity={0.98} /> : null}
    </Reveal>
  );
}

export function StoryCopy({
  title,
  children,
  className = "",
}: {
  title: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Reveal className={`max-w-[620px] ${className}`}>
      <h2 className="m-0 text-[clamp(38px,5vw,70px)] font-black leading-[0.94] tracking-[-0.03em] text-[#005ba8] max-[767px]:!text-[clamp(2rem,8vw,2.7rem)]">
        {title}
      </h2>
      <div className="[&_p]:mb-0 [&_p]:mt-5 [&_p]:max-w-[560px] [&_p]:text-[clamp(17px,1.55vw,21px)] [&_p]:font-semibold [&_p]:leading-[1.52] [&_p]:text-[#557086] max-[767px]:[&_p]:mt-3.5 max-[767px]:[&_p]:!text-[15px] max-[767px]:[&_p]:leading-[1.5] [&_.fragment]:text-[clamp(22px,2.5vw,34px)] [&_.fragment]:font-black [&_.fragment]:leading-[1.08] [&_.fragment]:text-[#1fa8f4]">
        {children}
      </div>
    </Reveal>
  );
}
