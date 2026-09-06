import { HeartDoodle } from "@/components/BrandHearts";
import PartnersCarousel from "@/components/PartnersCarousel";
import Reveal from "@/components/Reveal";
import PartnersSectionTitle from "./PartnersSectionTitle";

export default function PartnersShowcaseSection() {
  return (
    <section className="relative overflow-hidden bg-[radial-gradient(circle_at_12%_8%,rgba(31,168,244,0.1),transparent_24rem),linear-gradient(180deg,#fff,#eaf9ff)] py-[clamp(64px,9vw,145px)] max-[620px]:py-12">
      <HeartDoodle className="absolute -left-24 top-10 z-0 max-[620px]:hidden" size={360} rotate={-18} opacity={0.28} variant={1} />
      <HeartDoodle className="absolute -right-20 bottom-16 z-0 max-[900px]:hidden" size={260} rotate={20} opacity={0.24} variant={2} />
      <div className="relative z-[1]">
        <PartnersSectionTitle>Our Partners in Hope</PartnersSectionTitle>
        <Reveal>
          <PartnersCarousel />
        </Reveal>
      </div>
    </section>
  );
}
