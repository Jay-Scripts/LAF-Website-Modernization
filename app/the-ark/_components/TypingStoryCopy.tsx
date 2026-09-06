import Reveal from "@/components/Reveal";
import TypingSequence from "./TypingSequence";

export default function TypingStoryCopy() {
  return (
    <div className="max-w-[720px]">
      <Reveal>
        <TypingSequence
          segments={[
            {
              as: "h2",
              text: "WHEN KINDNESS MULTIPLIES",
              className: "m-0 text-[clamp(38px,5vw,70px)] font-black leading-[0.94] tracking-[-0.03em] text-[#005ba8] max-[767px]:!text-[clamp(2rem,8vw,2.7rem)]",
            },
            {
              as: "p",
              text: "Years ago, Noah was the child fighting for his life. Today, he sits beside children walking a similar journey.",
              className: "mt-5 max-w-[600px] text-[clamp(17px,1.55vw,21px)] font-semibold leading-[1.52] text-[#557086] max-[767px]:mt-3.5 max-[767px]:!text-[15px] max-[767px]:leading-[1.5]",
            },
            {
              as: "p",
              text: "His story reminds us why Little Ark exists: to give children and families care, hope, and the comfort of knowing they are not alone.",
              className: "mt-5 max-w-[600px] text-[clamp(17px,1.55vw,21px)] font-semibold leading-[1.52] text-[#557086] max-[767px]:mt-3.5 max-[767px]:!text-[15px] max-[767px]:leading-[1.5]",
            },
          ]}
        />
      </Reveal>
    </div>
  );
}
