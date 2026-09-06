import { HeartDoodle } from "@/components/BrandHearts";
import ImpactCardsGrid from "@/components/ImpactCardsGrid";
import Reveal from "@/components/Reveal";
import type { PublicImpactMetrics } from "@/lib/google-sheets";

export default function ImpactSection({ metrics }: { metrics: PublicImpactMetrics }) {
  return <Reveal as="section" className="relative flex w-full items-center overflow-hidden bg-[linear-gradient(180deg,#ffffff_0%,#f4fbff_100%)] py-[clamp(58px,6.5vw,88px)] max-[767px]:py-14" direction="none">
    <HeartDoodle className="absolute -right-16 top-6 z-0 max-[900px]:hidden" size={160} rotate={16} opacity={0.12} variant={1} />
    <div className="relative z-[2] mx-auto w-[min(1160px,calc(100%_-_48px))] max-[760px]:w-[min(100%_-_32px,1160px)]">
      <Reveal className="mx-auto mb-7 max-w-[860px] text-center max-[767px]:mb-5" direction="up"><h2 className="m-0 text-[clamp(29px,3.5vw,43px)] font-black leading-[1.06] text-[#1fa8f4] max-[767px]:text-[clamp(1.55rem,6.4vw,1.95rem)]">Our Impact</h2><p className="mx-auto mt-3 max-w-[720px] text-[clamp(15px,1.35vw,18px)] font-bold leading-[1.45] text-[#557086] max-[767px]:mt-2 max-[767px]:text-[14px]">Our cumulative impact from 2024 through 2026 YTD.</p></Reveal>
      <ImpactCardsGrid metrics={metrics} />
    </div>
  </Reveal>;
}
