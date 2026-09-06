import Reveal from "@/components/Reveal";
import LeadershipProfileCard, { type LeadershipProfile } from "./LeadershipProfileCard";

export type LeadershipGroup =
  | "Board of Trustees"
  | "Administration"
  | "Resident Social Workers"
  | "Household Support"
  | "Managing Partners for Mission Advancement";

type Props = {
  group: LeadershipGroup;
  leaders: LeadershipProfile[];
  compact?: boolean;
};

export default function LeadershipGroupSection({ group, leaders, compact = false }: Props) {
  const keepOneLine = group === "Resident Social Workers";
  const isManagingPartners = group === "Managing Partners for Mission Advancement";
  const gridClass = isManagingPartners
    ? "mx-auto mt-8 grid max-w-[1120px] grid-cols-4 justify-center gap-4 max-[767px]:mt-5 max-[767px]:max-w-full max-[767px]:gap-2 min-[768px]:grid-cols-[repeat(auto-fit,minmax(190px,220px))]"
    : compact
      ? "mx-auto mt-7 grid max-w-[470px] grid-cols-4 justify-center gap-4 max-[767px]:mt-5 max-[767px]:max-w-full max-[767px]:gap-2 min-[768px]:grid-cols-[repeat(auto-fit,minmax(190px,220px))]"
      : "mx-auto mt-8 grid max-w-[960px] grid-cols-4 justify-center gap-4 max-[767px]:mt-5 max-[767px]:max-w-full max-[767px]:gap-2 min-[768px]:grid-cols-[repeat(auto-fit,minmax(190px,220px))]";

  return (
    <section className="relative">
      <Reveal className="mx-auto max-w-[900px] text-center">
        <h2 className={`m-0 font-black leading-[1] tracking-normal text-[#005ba8] ${keepOneLine ? "whitespace-nowrap text-[clamp(25px,2.55vw,36px)] max-[420px]:whitespace-normal" : compact ? "text-[clamp(28px,3vw,40px)]" : "text-[clamp(32px,4.4vw,52px)]"}`}>
          {group}
        </h2>
      </Reveal>

      <div className={gridClass}>
        {leaders.map((leader, index) => (
          <Reveal key={`${group}-${leader.name}`} className="flex h-full w-full">
            <LeadershipProfileCard leader={{ ...leader, animationDelay: `${index * 140}ms`, animationDirection: index % 2 === 0 ? "left" : "right" }} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
