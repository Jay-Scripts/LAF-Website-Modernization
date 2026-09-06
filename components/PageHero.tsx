import Image from "next/image";
import type { ReactNode } from "react";
import Reveal from "@/components/Reveal";

export default function PageHero({
  imageSrc,
  title,
  description,
  children,
  decoration,
  backgroundClassName,
  overlayClassName,
  imageClassName,
  imageWrapperClassName = "",
  sectionClassName = "",
  contentClassName = "",
  headlineClassName = "",
  descriptionClassName = "",
}: {
  imageSrc: string;
  title: ReactNode;
  description: ReactNode;
  children?: ReactNode;
  decoration?: ReactNode;
  backgroundClassName: string;
  overlayClassName: string;
  imageClassName: string;
  imageWrapperClassName?: string;
  sectionClassName?: string;
  contentClassName?: string;
  headlineClassName?: string;
  descriptionClassName?: string;
}) {
  return (
    <section className={`relative grid min-h-[100svh] items-center overflow-hidden pt-[82px] text-white max-[767px]:min-h-[88svh] max-[767px]:pt-[76px] ${backgroundClassName} ${sectionClassName}`}>
      <div
        className={`absolute inset-x-0 bottom-0 top-[82px] opacity-[0.86] after:absolute after:inset-0 max-[900px]:top-[48%] max-[900px]:opacity-[0.62] max-[767px]:top-[76px] max-[767px]:opacity-100 ${overlayClassName}`}
        aria-hidden="true"
      >
        <div className={`absolute inset-0 ${imageWrapperClassName}`}>
          <Image
            src={imageSrc}
            alt=""
            fill
            priority
            sizes="100vw"
            className={`object-cover ${imageClassName}`}
          />
        </div>
      </div>

      {decoration}

      <div className="relative z-[2] mx-auto w-[min(1220px,calc(100%_-_40px))] max-[767px]:w-[min(100%_-_48px,1220px)]">
        <Reveal className={`w-[min(710px,100%)] py-24 max-[767px]:py-[clamp(54px,9vh,78px)] ${contentClassName}`}>
          <h1 className={`m-0 text-[clamp(52px,7vw,90px)] font-black leading-[0.9] tracking-normal max-[767px]:text-[clamp(3rem,13vw,4rem)] max-[767px]:leading-[0.92] ${headlineClassName}`}>
            {title}
          </h1>
          <p className={`mt-7 max-w-[660px] text-[clamp(23px,3vw,38px)] font-black leading-[1.14] max-[767px]:mt-7 max-[767px]:max-w-[315px] max-[767px]:text-[clamp(17px,4.6vw,20px)] max-[767px]:font-bold max-[767px]:leading-[1.42] ${descriptionClassName}`}>
            {description}
          </p>
          {children}
        </Reveal>
      </div>
    </section>
  );
}
