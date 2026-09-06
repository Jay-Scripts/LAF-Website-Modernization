import { HeartDoodle } from "@/components/BrandHearts";
import Reveal from "@/components/Reveal";
import ArkPillarImage from "./ArkPillarImage";
import { heartsPillars } from "./the-ark-data";
import { Inner } from "./the-ark-layout";

export default function HeartsSupportModel() {
  return (
    <section className="relative overflow-hidden bg-[radial-gradient(circle_at_14%_18%,rgba(200,244,255,0.38),transparent_24rem),radial-gradient(circle_at_86%_10%,rgba(255,236,174,0.32),transparent_20rem),linear-gradient(180deg,#ffffff,#eef9ff)] py-[clamp(58px,7vw,92px)] max-[767px]:py-12">
      <HeartDoodle className="absolute -right-24 top-10 z-0 max-[620px]:hidden" size={390} rotate={16} opacity={0.28} variant={1} />
      <HeartDoodle className="absolute bottom-14 left-2 z-0 max-[900px]:hidden" size={230} rotate={-20} opacity={0.24} variant={2} />
      <Inner className="max-[767px]:w-[min(100%_-_48px,1220px)]">
        <Reveal className="mb-[clamp(42px,6vw,76px)] max-w-[780px] text-left max-[767px]:mb-7">
          <p className="mb-2 mt-0 text-[clamp(18px,2vw,26px)] font-black uppercase leading-none tracking-normal text-[#1fa8f4] max-[767px]:mb-1 max-[767px]:text-[16px]">
            WHAT WE DO
          </p>
          <h2 className="m-0 text-[clamp(60px,9vw,112px)] font-black leading-[0.84] tracking-normal text-[#0057a8] max-[767px]:text-[clamp(52px,15vw,68px)] max-[767px]:leading-[0.88]">
            HEARTS
          </h2>
          <p className="mb-0 mt-3 max-w-[760px] text-[clamp(17px,1.8vw,21px)] font-semibold leading-[1.34] text-[#394f61] max-[767px]:mt-3 max-[767px]:text-[16px] max-[767px]:leading-[1.42]">
            A practical and compassionate support model for pediatric patients and caregivers during treatment days.
          </p>
          <p className="mb-0 mt-5 max-w-[720px] text-[clamp(16px,1.6vw,19px)] font-semibold leading-[1.45] text-[#6d7f8f] max-[767px]:mt-3 max-[767px]:text-[15px] max-[767px]:leading-[1.45]">
            Each letter represents a way Little Ark walks alongside every child and caregiver.
          </p>
        </Reveal>

        <div className="relative grid gap-[14px] before:absolute before:bottom-[48px] before:left-[42px] before:top-[48px] before:w-1 before:rounded-full before:bg-[#c8f4ff] max-[820px]:before:hidden max-[767px]:gap-[18px]">
          {heartsPillars.map((pillar) => (
            <article id={pillar.id} key={pillar.letter} className="relative grid scroll-mt-28 grid-cols-[86px_minmax(0,1fr)] gap-[clamp(14px,3vw,28px)] max-[820px]:grid-cols-1 max-[767px]:scroll-mt-24 max-[767px]:gap-0">
              {pillar.aliasId ? <span id={pillar.aliasId} className="absolute -top-28" aria-hidden="true" /> : null}
              <div className="relative z-[2] grid justify-items-center gap-2 self-start max-[820px]:flex max-[820px]:items-center max-[820px]:justify-start max-[767px]:hidden">
                <div className="grid h-[62px] w-[62px] place-items-center rounded-full text-[34px] font-black leading-none text-white shadow-[0_14px_28px_rgba(31,168,244,0.18)]" style={{ backgroundColor: pillar.color }}>{pillar.letter}</div>
                <div className="grid h-[42px] w-[42px] place-items-center rounded-[14px] bg-white shadow-[0_8px_20px_rgba(31,168,244,0.12)]" style={{ color: pillar.color }}>
                  <svg className="h-7 w-7" viewBox="0 0 48 48" aria-hidden="true">{pillar.icon}</svg>
                </div>
              </div>

              <Reveal className="grid grid-cols-[minmax(0,1fr)_minmax(240px,0.62fr)] items-center gap-[clamp(16px,3vw,28px)] rounded-[22px] border border-[rgba(31,168,244,0.14)] bg-white p-[clamp(18px,2.4vw,24px)] shadow-[0_14px_36px_rgba(31,168,244,0.12)] max-[820px]:grid-cols-1 max-[767px]:gap-0 max-[767px]:rounded-[20px] max-[767px]:p-5">
                <div>
                  <div className="mb-3 hidden grid-cols-[56px_42px_minmax(0,1fr)] items-center gap-2.5 max-[767px]:grid">
                    <div className="grid h-14 w-14 place-items-center rounded-full text-[29px] font-black leading-none text-white shadow-[0_10px_22px_rgba(31,168,244,0.16)]" style={{ backgroundColor: pillar.color }}>{pillar.letter}</div>
                    <div className="grid h-[42px] w-[42px] place-items-center rounded-[13px] bg-white shadow-[0_6px_16px_rgba(31,168,244,0.12)]" style={{ color: pillar.color }}><svg className="h-6 w-6" viewBox="0 0 48 48" aria-hidden="true">{pillar.icon}</svg></div>
                    <h3 className="m-0 min-w-0 text-[clamp(19px,5.4vw,23px)] font-black uppercase leading-[1.02] tracking-normal" style={{ color: pillar.color }}>{pillar.title}</h3>
                  </div>
                  <h3 className="m-0 text-[clamp(28px,3.2vw,42px)] font-black uppercase leading-[0.98] tracking-normal max-[767px]:hidden" style={{ color: pillar.color }}>{pillar.title}</h3>
                  <p className="mb-0 mt-3 max-w-[640px] text-[clamp(16px,1.7vw,20px)] font-extrabold leading-[1.34] text-[#557086] max-[767px]:mt-0 max-[767px]:text-[15px] max-[767px]:font-semibold max-[767px]:leading-[1.42]">{pillar.description}</p>
                </div>
                <div className="relative min-h-[clamp(170px,18vw,235px)] overflow-hidden rounded-[18px] border border-white/80 shadow-[0_12px_28px_rgba(0,72,140,0.12)] max-[820px]:min-h-[210px] max-[767px]:mt-[18px] max-[767px]:aspect-[16/10] max-[767px]:min-h-0 max-[767px]:rounded-[16px]">
                  <ArkPillarImage src={pillar.imageSrc} alt={pillar.imageAlt} className={"imageClass" in pillar ? pillar.imageClass : ""} />
                </div>
              </Reveal>
            </article>
          ))}
        </div>
      </Inner>
    </section>
  );
}
