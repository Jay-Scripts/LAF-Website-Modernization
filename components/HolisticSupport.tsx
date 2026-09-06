import Image from "next/image";
import CountUp from "@/components/CountUp";
import { impactMetrics } from "@/data/impactStats";

const impactNumbers = impactMetrics;

const stories = [
  {
    id: "housing",
    eyebrow: "Housing Accommodation",
    title: "A place to rest between treatments.",
    stat: impactNumbers.bedNights.value,
    statLabel: impactNumbers.bedNights.yearLabel,
    growth: impactNumbers.bedNights.growth,
    growthLabel: "from 2024 to 2025",
    imageSrc: "/images/home/housing-hp.jpeg",
    imageAlt: "Little Ark Foundation housing accommodation support",
    imagePosition: "object-center",
  },
  {
    id: "transportation",
    eyebrow: "Transportation Support",
    title: "Care that helps families keep moving.",
    stat: impactNumbers.transportation.value,
    statLabel: impactNumbers.transportation.yearLabel,
    growth: impactNumbers.transportation.growth,
    growthLabel: "from 2024 to 2025",
    imageSrc: "/images/home/transportation-hp.jpeg",
    imageAlt: "Little Ark Foundation transportation support",
    imagePosition: "object-center",
  },
  {
    id: "meals",
    eyebrow: "Meals Support",
    title: "Warm meals shared with dignity.",
    stat: impactNumbers.hotMeals.value,
    statLabel: impactNumbers.hotMeals.yearLabel,
    growth: impactNumbers.hotMeals.growth,
    growthLabel: "from 2024 to 2025",
    imageSrc: "/images/home/meals-hp.jpeg",
    imageAlt: "Little Ark Foundation meals support",
    imagePosition: "object-center",
  },
];

function ArrowChart({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 70 60" aria-hidden="true">
      <path d="M5 47 23 30l13 12 26-31" fill="none" stroke="currentColor" strokeWidth="9" />
      <path d="M43 10h20v20" fill="none" stroke="currentColor" strokeWidth="9" />
    </svg>
  );
}

export default function HolisticSupport() {
  return (
    <section id="support" className="py-24 pb-[70px] max-[760px]:py-16">
      <div className="text-center">
        <h2 className="m-0 inline-flex items-center gap-5 text-[clamp(28px,3vw,38px)] font-black leading-[1.05] text-[#1fa8f4] before:h-px before:w-14 before:bg-[#1fa8f4] after:h-px after:w-14 after:bg-[#1fa8f4] max-[760px]:gap-2.5 max-[760px]:before:w-[30px] max-[760px]:after:w-[30px]">
          Little Ark&apos;s Holistic Support
        </h2>
        <p className="mb-[18px] mt-[9px] text-[17px] font-medium text-[#394b5d]">
          Supporting children and families through every step of their journey.
        </p>
      </div>

      <div className="grid gap-[clamp(48px,8vw,92px)] py-[38px] pb-[18px]">
        {stories.map((story, index) => (
          <article
            id={story.id}
            key={story.eyebrow}
            className="group grid min-h-[520px] scroll-mt-28 grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] items-center gap-[clamp(30px,6vw,78px)] even:grid-cols-[minmax(0,1.18fr)_minmax(0,0.82fr)] max-[760px]:min-h-0 max-[760px]:grid-cols-1 max-[760px]:even:grid-cols-1"
          >
            <div
              className={`max-w-[430px] max-[760px]:max-w-none ${
                index % 2 === 1 ? "order-2 max-[760px]:order-none" : ""
              }`}
            >
              <p className="mb-3.5 mt-0 text-[13px] font-black uppercase tracking-[0.14em] text-[#1fa8f4]">
                {story.eyebrow}
              </p>
              <h3 className="m-0 text-[clamp(34px,5vw,64px)] font-black leading-[0.95] tracking-normal text-[#1fa8f4]">
                {story.title}
              </h3>
              <div className="mt-7">
                <CountUp
                  value={story.stat}
                  className="block text-[clamp(62px,8vw,112px)] font-black leading-[0.86] tracking-normal text-[#1fa8f4]"
                />
                <span className="mt-3 block text-lg font-extrabold text-[#1fa8f4]">{story.statLabel}</span>
              </div>
              <div className="mt-[26px] flex items-center gap-[18px]">
                <ArrowChart className="h-[70px] w-[84px] text-[#1fa8f4] transition group-hover:translate-x-2 group-hover:-translate-y-2.5" />
                <div>
                  <strong className="block text-[clamp(36px,5vw,62px)] font-black leading-[0.9] text-[#1fa8f4]">
                    {story.growth}
                  </strong>
                  <span className="mt-[7px] block text-[15px] font-extrabold text-[#1fa8f4]">{story.growthLabel}</span>
                </div>
              </div>
            </div>

            <div
              className={`relative min-h-[clamp(360px,46vw,620px)] overflow-hidden rounded-[28px] shadow-[0_28px_80px_rgba(0,72,140,0.18)] after:absolute after:inset-0 after:bg-[linear-gradient(180deg,rgba(255,255,255,0.02),rgba(0,104,201,0.12)),radial-gradient(circle_at_18%_18%,rgba(255,255,255,0.32),transparent_18rem)] max-[760px]:min-h-[340px] max-[760px]:rounded-[20px] ${
                index % 2 === 1 ? "order-1" : ""
              }`}
            >
              <Image
                src={story.imageSrc}
                alt={story.imageAlt}
                fill
                sizes="(max-width: 760px) calc(100vw - 28px), 58vw"
                className={`object-cover ${story.imagePosition}`}
              />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
