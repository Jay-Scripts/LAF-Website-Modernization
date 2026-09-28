import Image from "next/image";
import CTAButton from "./CTAButton";
import Reveal from "./Reveal";
import { siteContent } from "@/data/siteContent";

type HeartsCTAProps = {
  imageSrc: string;
  imageClassName?: string;
  title: string;
  description: string;
  label?: string;
};

export default function HeartsCTA({ imageSrc, imageClassName = "object-center", title, description, label = "Give Hope" }: HeartsCTAProps) {
  return (
    <section className="relative grid min-h-[58svh] place-items-center overflow-hidden bg-[#073f89] px-5 py-[clamp(70px,9vw,112px)] text-center text-white">
      <Reveal direction="none" threshold={0.12} style={{ filter: "none" }} className="absolute inset-0 !duration-[1400ms]">
        <Image src={imageSrc} alt="" fill unoptimized sizes="100vw" className={`object-cover ${imageClassName}`} />
      </Reveal>
      <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(4,20,42,0.4),transparent_75%)]" />
      <Reveal className="hearts-cta-copy relative z-[1] mx-auto max-w-[820px]" style={{ filter: "none" }}>
        <h2 className="m-0 text-[clamp(32px,4vw,54px)] font-black leading-[1.06] tracking-normal [text-shadow:0_2px_4px_rgba(0,0,0,0.95),0_4px_16px_rgba(0,0,0,0.9)]">{title}</h2>
        <p className="mx-auto mt-5 max-w-[660px] text-[clamp(16px,1.5vw,20px)] font-bold leading-relaxed text-white [text-shadow:0_1px_3px_rgba(0,0,0,1),0_3px_10px_rgba(0,0,0,0.95)]">{description}</p>
        <CTAButton href={siteContent.links.giveHopePath} className="mt-7 min-h-[48px]">{label}</CTAButton>
      </Reveal>
    </section>
  );
}
