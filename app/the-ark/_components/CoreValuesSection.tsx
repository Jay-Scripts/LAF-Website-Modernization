import Reveal from "@/components/Reveal";
import { coreValues } from "./the-ark-data";
import { Inner } from "./the-ark-layout";

export default function CoreValuesSection() {
  return (
    <section className="relative overflow-hidden border-y border-[#d9f1fb] bg-[linear-gradient(135deg,#f7fcff_0%,#fff_54%,#f7fcff_100%)] py-[clamp(78px,9vw,124px)] max-[900px]:py-16 max-[767px]:py-14">
      <Inner className="grid grid-cols-[minmax(250px,0.72fr)_minmax(0,1.28fr)] items-start gap-[clamp(42px,8vw,110px)] max-[900px]:grid-cols-1 max-[900px]:gap-10 max-[767px]:gap-8">
        <Reveal className="max-w-[360px]">
          <h2 className="m-0 text-balance text-[clamp(36px,5vw,62px)] font-black uppercase leading-[0.92] tracking-[-0.035em] text-[#0057a8] max-[767px]:text-[clamp(32px,9vw,42px)]">
            LAF Core Values
          </h2>
        </Reveal>

        <div className="relative border-l border-[#bfe9fa] pl-[clamp(22px,4vw,48px)] max-[767px]:pl-5">
          {coreValues.map((value, index) => (
            <Reveal key={value.letter} delay={index * 80}>
              <article className="group relative grid grid-cols-[58px_minmax(0,1fr)] gap-[clamp(16px,3vw,28px)] border-b border-[#d9f1fb] py-[clamp(22px,3vw,34px)] first:pt-0 last:border-b-0 last:pb-0 max-[767px]:grid-cols-[44px_minmax(0,1fr)] max-[767px]:gap-4 max-[767px]:py-6">
                <span
                  className="grid h-12 w-12 place-items-center rounded-[14px] text-[24px] font-black leading-none text-white shadow-[0_10px_22px_rgba(0,87,168,0.14)] transition duration-300 ease-out group-hover:-translate-y-1 group-hover:shadow-[0_14px_28px_rgba(0,87,168,0.2)] motion-reduce:transform-none motion-reduce:transition-none max-[767px]:h-10 max-[767px]:w-10 max-[767px]:rounded-xl max-[767px]:text-[20px]"
                  style={{ backgroundColor: value.color }}
                  aria-hidden="true"
                >
                  {value.letter}
                </span>
                <div>
                  <h3 className="m-0 text-[clamp(24px,3vw,36px)] font-black leading-[1] tracking-[-0.02em] text-[#08233d] max-[767px]:text-[clamp(21px,6vw,26px)]">
                    {value.title}
                  </h3>
                  <p className="mb-0 mt-2.5 max-w-[680px] text-[clamp(16px,1.55vw,20px)] font-semibold leading-[1.48] text-[#557086] max-[767px]:mt-2 max-[767px]:text-[15px] max-[767px]:leading-[1.48]">
                    {value.description}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Inner>
    </section>
  );
}
