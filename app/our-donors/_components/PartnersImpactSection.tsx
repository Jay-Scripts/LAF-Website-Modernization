import { HeartDoodle } from "@/components/BrandHearts";
import ImpactStatsGrid from "@/components/ImpactStatsGrid";
import Reveal from "@/components/Reveal";
import type { PublicImpactMetrics } from "@/lib/google-sheets";
import PartnersInner from "./PartnersInner";

type PartnersImpactSectionProps = {
  metrics: PublicImpactMetrics;
};

export default function PartnersImpactSection({ metrics }: PartnersImpactSectionProps) {
  return (
    <section className="relative scroll-mt-24 overflow-hidden bg-[radial-gradient(circle_at_20%_28%,rgba(255,255,255,0.24),transparent_19rem),radial-gradient(circle_at_80%_68%,rgba(200,244,255,0.22),transparent_20rem),linear-gradient(135deg,#008fe4,#1fa8f4)] py-[clamp(68px,8vw,104px)] text-white max-[767px]:py-14">
      <HeartDoodle className="absolute -bottom-24 right-[8%] z-0 max-[620px]:hidden" size={380} rotate={16} opacity={0.28} variant={0} />
      <HeartDoodle className="absolute left-[6%] top-12 z-0 max-[900px]:hidden" size={130} rotate={-22} opacity={0.22} variant={2} />
      <PartnersInner>
        <Reveal className="mx-auto mb-10 max-w-[920px] text-center max-[767px]:mb-7">
          <h2 className="m-0 scroll-mt-24 text-[clamp(44px,7vw,98px)] font-black leading-[0.94] tracking-normal text-white max-[767px]:text-[clamp(36px,10vw,46px)] max-[767px]:leading-none">
            Because of You
          </h2>
        </Reveal>
        <ImpactStatsGrid metrics={metrics} centerMobileRemainder />
      </PartnersInner>
    </section>
  );
}
