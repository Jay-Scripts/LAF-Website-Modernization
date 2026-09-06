import TypingStoryCopy from "./TypingStoryCopy";
import { Inner, PhotoPanel } from "./the-ark-layout";

export default function StorySection() {
  return (
    <section id="story" className="relative scroll-mt-24 overflow-hidden border-y border-[#d9f1fb] bg-[linear-gradient(180deg,#f7fcff_0%,#fff_42%,#fff_100%)] py-[clamp(78px,9vw,124px)] max-[900px]:py-16 max-[620px]:py-14">
      <Inner className="grid grid-cols-[minmax(0,1.02fr)_minmax(360px,0.98fr)] items-center gap-[clamp(42px,7vw,96px)] max-[900px]:grid-cols-1 max-[900px]:gap-10 max-[620px]:gap-8">
        <TypingStoryCopy />
        <PhotoPanel
          className="aspect-[1760/1258] w-full max-w-[560px] translate-y-5 justify-self-end !min-h-0 !rounded-[28px] !bg-transparent max-[900px]:max-w-[620px] max-[900px]:translate-y-0 max-[900px]:justify-self-center max-[620px]:!rounded-[22px]"
          imageSrc="/images/the-ark/when-kindness-multiplies-family.png"
          imageAlt="Noah with his father during his medical journey"
          imageClassName="scale-[1.01] object-contain object-center"
          revealImage
        />
      </Inner>
    </section>
  );
}
