"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { BusIcon, CrossIcon, HandHeartIcon, HouseIcon, PaletteIcon, SoupIcon } from "lucide-react";
import { HeartDoodle } from "./BrandHearts";
import Reveal from "./Reveal";

export type ProgramSlug =
  | "housing"
  | "everyday-meals"
  | "activities"
  | "resources-responsibility"
  | "transportation"
  | "spiritual-care";

const programs = [
  {
    slug: "housing",
    label: "Housing",
    href: "/services/housing",
    icon: HouseIcon,
  },
  {
    slug: "everyday-meals",
    label: "Everyday Meals",
    href: "/services/everyday-meals",
    icon: SoupIcon,
  },
  {
    slug: "activities",
    label: "Activities",
    href: "/services/activities",
    icon: PaletteIcon,
  },
  {
    slug: "resources-responsibility",
    label: "Resources & Responsibility",
    href: "/services/resources-responsibility",
    icon: HandHeartIcon,
  },
  {
    slug: "transportation",
    label: "Transportation",
    href: "/services/transportation",
    icon: BusIcon,
  },
  {
    slug: "spiritual-care",
    label: "Spiritual Care",
    href: "/services/spiritual-care",
    icon: CrossIcon,
  },
] as const satisfies readonly {
  slug: ProgramSlug;
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number; "aria-hidden"?: boolean }>;
}[];

type ProgramsNavigationProps = {
  activeProgram?: ProgramSlug;
  fullViewport?: boolean;
};

const programCardBaseClass =
  "group relative flex min-h-[156px] flex-col items-center overflow-hidden rounded-lg border border-[rgba(0,104,201,0.12)] bg-white/92 p-5 text-center text-[12px] font-black uppercase text-[#0068c9] shadow-[0_14px_34px_rgba(0,72,140,0.08)] ring-1 ring-white/75 transition duration-300 ease-out hover:-translate-y-1 hover:border-[#9fe4ff] hover:shadow-[0_20px_44px_rgba(0,72,140,0.13)] focus-visible:-translate-y-1 focus-visible:border-[#1fa8f4] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#c8f4ff]";

const servicePageMobileCardClass =
  "max-[767px]:min-h-[150px] max-[767px]:w-[78vw] max-[767px]:shrink-0 max-[767px]:snap-center max-[767px]:p-3.5 max-[430px]:w-[82vw]";

const homeMobileCardClass =
  "max-[767px]:min-h-[130px] max-[767px]:p-3 max-[430px]:min-h-[122px] max-[430px]:px-2.5 max-[430px]:py-3";

export default function ProgramsNavigation({ activeProgram, fullViewport = false }: ProgramsNavigationProps) {
  const isServicePage = Boolean(activeProgram);
  const carouselRef = useRef<HTMLDivElement>(null);
  const scrollFrameRef = useRef<number | null>(null);
  const initialProgramIndex = Math.max(0, programs.findIndex((program) => program.slug === activeProgram));
  const [activeIndex, setActiveIndex] = useState(initialProgramIndex);

  useEffect(() => {
    if (!activeProgram) return;

    const frame = window.requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });

    return () => window.cancelAnimationFrame(frame);
  }, [activeProgram]);

  useEffect(() => {
    if (!activeProgram || window.matchMedia("(min-width: 768px)").matches) return;

    const frame = window.requestAnimationFrame(() => {
      const carousel = carouselRef.current;
      const card = carousel?.querySelector<HTMLElement>(`[data-program-index="${initialProgramIndex}"]`);
      if (!carousel || !card) return;

      carousel.scrollTo({ left: card.offsetLeft - (carousel.clientWidth - card.offsetWidth) / 2 });
      setActiveIndex(initialProgramIndex);
    });

    return () => window.cancelAnimationFrame(frame);
  }, [activeProgram, initialProgramIndex]);

  function updateActiveDot() {
    if (scrollFrameRef.current !== null) window.cancelAnimationFrame(scrollFrameRef.current);

    scrollFrameRef.current = window.requestAnimationFrame(() => {
      const carousel = carouselRef.current;
      if (!carousel) return;

      const center = carousel.scrollLeft + carousel.clientWidth / 2;
      const cards = Array.from(carousel.querySelectorAll<HTMLElement>("[data-program-index]"));
      let nearestIndex = 0;
      let nearestDistance = Number.POSITIVE_INFINITY;

      cards.forEach((card, index) => {
        const distance = Math.abs(card.offsetLeft + card.offsetWidth / 2 - center);
        if (distance < nearestDistance) {
          nearestDistance = distance;
          nearestIndex = index;
        }
      });

      setActiveIndex(nearestIndex);
      scrollFrameRef.current = null;
    });
  }

  function scrollToProgram(index: number) {
    const carousel = carouselRef.current;
    const card = carousel?.querySelector<HTMLElement>(`[data-program-index="${index}"]`);
    if (!carousel || !card) return;

    carousel.scrollTo({
      left: card.offsetLeft - (carousel.clientWidth - card.offsetWidth) / 2,
      behavior: "smooth",
    });
  }

  return (
    <Reveal
      as="section"
      className={`relative w-full overflow-hidden bg-[linear-gradient(180deg,#f2fbff_0%,#ffffff_52%,#edf8ff_100%)] ${
        fullViewport
          ? "flex items-center py-[clamp(58px,6.5vw,88px)] max-[767px]:py-14"
          : "py-16 max-[760px]:py-12"
      }`}
      direction="none"
    >
      <HeartDoodle className="absolute -right-16 top-8 z-0 max-[760px]:hidden" size={220} rotate={18} opacity={0.14} variant={1} />
      <HeartDoodle className="absolute bottom-8 left-[8%] z-0 max-[900px]:hidden" size={110} rotate={-12} opacity={0.14} variant={0} />
      <div
        className={
          isServicePage
            ? "relative z-[1] mx-auto w-[min(1220px,calc(100%_-_40px))] max-[620px]:w-[min(100%_-_28px,1220px)]"
            : "relative z-[1] mx-auto w-[min(1120px,calc(100%_-_48px))] max-[760px]:w-[min(100%_-_24px,1120px)]"
        }
      >
        <Reveal className="relative mx-auto max-w-[820px] text-center" direction="up">
          <h2 className={`${isServicePage ? "mb-0" : "mb-[34px]"} mt-0 text-center text-[clamp(29px,3.5vw,43px)] font-black leading-[1.05] tracking-normal text-[#1fa8f4] max-[767px]:px-6 max-[767px]:text-[26px]`}>
            {isServicePage ? "Explore Our HEARTS Programs" : "Program and Services"}
          </h2>
          {isServicePage ? (
            <p className="mx-auto mb-[34px] mt-4 max-w-[720px] text-center text-[clamp(15px,1.35vw,18px)] font-medium leading-[1.5] text-[#557086] max-[767px]:px-6">
              Learn how Little Ark supports children and families through every stage of their journey.
            </p>
          ) : null}
        </Reveal>
        <div
          ref={carouselRef}
          onScroll={updateActiveDot}
          className={
            isServicePage
              ? "grid grid-cols-6 gap-4 max-[1100px]:grid-cols-3 max-[767px]:flex max-[767px]:w-full max-[767px]:snap-x max-[767px]:snap-mandatory max-[767px]:gap-3.5 max-[767px]:overflow-x-auto max-[767px]:overscroll-x-contain max-[767px]:px-6 max-[767px]:pb-3 max-[767px]:scroll-px-6 max-[767px]:[scrollbar-width:none] max-[767px]:[-webkit-overflow-scrolling:touch] max-[767px]:[&::-webkit-scrollbar]:hidden"
              : "grid grid-cols-3 gap-4 max-[900px]:grid-cols-2 max-[767px]:gap-3 max-[430px]:gap-2.5"
          }
          aria-label="Programs and services"
        >
          {programs.map((program, index) => {
            const isActive = program.slug === activeProgram;
            const Icon = program.icon;
            const icon = (
              <span
                className={`grid h-14 w-14 shrink-0 place-items-center rounded-lg transition duration-300 ease-out max-[767px]:h-11 max-[767px]:w-11 max-[430px]:h-10 max-[430px]:w-10 ${
                  isActive ? "bg-white/18 text-white" : "bg-[#e8f8ff] text-[#008fe4] group-hover:bg-[#1fa8f4] group-hover:text-white"
                }`}
              >
                <Icon className="h-7 w-7 max-[767px]:h-6 max-[767px]:w-6 max-[430px]:h-5 max-[430px]:w-5" strokeWidth={2.7} aria-hidden="true" />
              </span>
            );

            if (isActive) {
              return (
                <Reveal
                  key={program.slug}
                  as="div"
                  delay={(index + 1) * 120}
                  direction="up"
                  aria-current="page"
                  tabIndex={0}
                  data-program-index={index}
                  className="relative flex min-h-[156px] cursor-default flex-col items-center overflow-hidden rounded-lg border border-[#1fa8f4] bg-[#1fa8f4] p-5 text-center text-[12px] font-black uppercase text-white shadow-[0_18px_38px_rgba(0,72,140,0.20)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#c8f4ff] max-[767px]:min-h-[150px] max-[767px]:w-[78vw] max-[767px]:shrink-0 max-[767px]:snap-center max-[767px]:p-3.5 max-[430px]:w-[82vw]"
                >
                  {icon}
                  <span className="mt-2.5 flex min-h-[2.4em] max-w-full items-start justify-center text-center leading-[1.2]">{program.label}</span>
                  <span className="mt-auto whitespace-nowrap pt-1 text-[11px] font-black uppercase tracking-[0.1em] text-white/78">
                    Current Program
                  </span>
                </Reveal>
              );
            }

            return (
              <Reveal
                key={program.slug}
                delay={(index + 1) * 120}
                direction="up"
                data-program-index={index}
                className={isServicePage ? servicePageMobileCardClass : ""}
              >
              <Link
                key={program.slug}
                href={`${program.href}#top`}
                scroll
                className={`${programCardBaseClass} ${isServicePage ? servicePageMobileCardClass : homeMobileCardClass}`}
              >
                {icon}
                <span className="mt-2.5 flex min-h-[2.4em] max-w-full items-start justify-center text-center leading-[1.2] max-[767px]:mt-2 max-[767px]:text-[12px] max-[430px]:text-[11px]">{program.label}</span>
                <span className="mt-auto translate-y-1 whitespace-nowrap pt-1 text-[11px] font-black uppercase tracking-[0.1em] text-[#0068c9] opacity-0 transition duration-200 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 max-[767px]:translate-y-0 max-[767px]:opacity-100">
                  Learn More -&gt;
                </span>
              </Link>
              </Reveal>
            );
          })}
        </div>
        {isServicePage ? (
        <div className="mt-2 hidden items-center justify-center gap-2 max-[767px]:flex" role="group" aria-label="Choose a program slide">
          {programs.map((program, index) => (
            <button
              key={program.slug}
              type="button"
              onClick={() => scrollToProgram(index)}
              aria-label={`Show ${program.label}`}
              aria-current={activeIndex === index ? "true" : undefined}
              className={`h-2.5 rounded-full transition-[width,background-color] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1fa8f4] focus-visible:ring-offset-2 ${
                activeIndex === index ? "w-6 bg-[#1fa8f4]" : "w-2.5 bg-[#b8dff3]"
              }`}
            />
          ))}
        </div>
        ) : null}
      </div>
    </Reveal>
  );
}
