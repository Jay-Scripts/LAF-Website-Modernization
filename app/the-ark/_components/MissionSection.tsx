import Reveal from "@/components/Reveal";
import ViewportRevealImage from "@/components/ViewportRevealImage";
import { Inner } from "./the-ark-layout";
import TypingSequence from "./TypingSequence";

export default function MissionSection() {
  return (
    <section className="border-y border-[#c8f4ff]/80 bg-[radial-gradient(circle_at_14%_20%,rgba(31,168,244,0.12),transparent_24rem),linear-gradient(180deg,#f7fcff,#eef9ff)] py-[clamp(72px,8vw,104px)] shadow-[inset_0_1px_0_rgba(255,255,255,0.95)] max-[620px]:py-14">
      <Inner className="grid grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] items-center gap-[clamp(26px,5vw,58px)] max-[900px]:grid-cols-1">
        <Reveal className="relative aspect-square w-full max-w-[520px] justify-self-center overflow-visible max-[900px]:max-w-[560px]">
          <div className="absolute inset-0 overflow-hidden rounded-[30px] border border-white/70 shadow-[0_22px_58px_rgba(31,168,244,0.16)] max-[620px]:rounded-3xl">
            <ViewportRevealImage
              src="/images/the-ark/when-kindness-multiplies-family-group.png"
              alt="Children and a caregiver supported by Little Ark Foundation"
              sizes="(max-width: 900px) calc(100vw - 40px), 45vw"
              className="object-cover object-bottom"
            />
          </div>
        </Reveal>
        <Reveal className="max-w-[700px]">
          <TypingSequence
            segments={[
              {
                as: "p",
                text: "No child should have to stop treatment because their family lacks the resources to continue.",
                className: "m-0 text-[clamp(24px,2.8vw,34px)] font-black leading-[1.18] text-[#1fa8f4] max-[767px]:text-[clamp(1.65rem,7vw,2.15rem)]",
              },
              {
                as: "p",
                text: "Little Ark walks alongside children and their caregivers by providing practical support throughout treatment—including transportation, meals, temporary housing, emotional support, and compassionate care.",
                className: "mt-8 text-[clamp(17px,1.7vw,21px)] font-bold leading-[1.42] text-[#557086] max-[767px]:mt-5 max-[767px]:text-[15px] max-[767px]:leading-[1.5]",
              },
              {
                as: "p",
                text: "Every child deserves the opportunity to heal with dignity, and every family deserves to know they are not alone.",
                className: "mt-4 text-[clamp(17px,1.7vw,21px)] font-bold leading-[1.42] text-[#557086] max-[767px]:mt-3.5 max-[767px]:text-[15px] max-[767px]:leading-[1.5]",
              },
            ]}
          />
        </Reveal>
      </Inner>
    </section>
  );
}
