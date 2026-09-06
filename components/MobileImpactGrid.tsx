import CountUp from "@/components/CountUp";

export type MobileImpactCard = {
  key: string;
  title: string;
  current: number;
  label: string;
  historical2024: number;
  historical2025: number;
};

const numberFormatter = new Intl.NumberFormat("en-US");

export default function MobileImpactGrid({ cards }: { cards: MobileImpactCard[] }) {
  return (
    <div className="hidden grid-cols-2 gap-[14px] max-[767px]:grid">
      {cards.map((card) => (
        <article
          key={`mobile-${card.key}`}
          className={`flex min-w-0 flex-col rounded-[20px] border border-[rgba(31,168,244,0.16)] bg-[radial-gradient(circle_at_88%_8%,rgba(200,244,255,0.82),transparent_7rem),linear-gradient(180deg,#fff,#eefaff)] px-[clamp(14px,4vw,18px)] py-[18px] shadow-[0_12px_30px_rgba(31,168,244,0.1)] transition-shadow focus-within:shadow-[0_16px_34px_rgba(31,168,244,0.16)] ${
            card.key === "care-cart" ? "col-span-2 w-[calc((100%_-_14px)/2)] justify-self-center" : ""
          }`}
        >
          <h3 className="m-0 min-h-[2.1em] break-words text-[clamp(17px,4.8vw,21px)] font-black leading-[1.05] text-[#1fa8f4]">
            {card.title}
          </h3>
          <span className="mt-2.5 inline-flex rounded-full bg-[#c8f4ff] px-2 py-1 text-[9px] font-black uppercase tracking-[0.07em] text-[#0068c9]">
            2026 YTD
          </span>
          <CountUp value={card.current} className="mt-2.5 block text-[clamp(2.35rem,10.5vw,3rem)] font-black leading-[0.88] tracking-[-0.03em] text-[#1fa8f4]" />
          <span className="mt-2.5 block min-h-[2.5em] text-[clamp(10px,2.8vw,12px)] font-black uppercase leading-[1.22] tracking-[0.055em] text-[#557086]">
            {card.label}
          </span>

          <p className="mb-0 mt-auto border-t border-[#d9edf7] pt-3 text-[clamp(10px,2.65vw,12px)] font-semibold leading-[1.3] text-[#7890a3]">
            2024: {numberFormatter.format(card.historical2024)} <span aria-hidden="true">•</span> 2025: {numberFormatter.format(card.historical2025)}
          </p>
        </article>
      ))}
    </div>
  );
}
