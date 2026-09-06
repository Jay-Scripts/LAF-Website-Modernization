import { HeartDoodle } from "@/components/BrandHearts";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export type LegalBlock =
  | { type: "paragraph"; text: string }
  | { type: "subheading"; text: string }
  | { type: "list"; items: readonly string[] }
  | { type: "address"; lines: readonly string[] };

export type LegalSection = {
  title: string;
  blocks: readonly LegalBlock[];
};

type LegalPageProps = {
  title: string;
  effectiveDate: string;
  lastUpdated: string;
  introduction: readonly string[];
  sections: readonly LegalSection[];
};

function LegalBlockContent({ block }: { block: LegalBlock }) {
  if (block.type === "subheading") {
    return <h3 className="mb-0 mt-6 text-[16px] font-black leading-snug text-[#08233d] first:mt-0 sm:text-[18px]">{block.text}</h3>;
  }

  if (block.type === "list") {
    return (
      <ul className="my-4 space-y-1.5 pl-5 marker:text-[#1fa8f4] sm:space-y-2 sm:pl-6">
        {block.items.map((item) => <li key={item} className="pl-1">{item}</li>)}
      </ul>
    );
  }

  if (block.type === "address") {
    return (
      <address className="my-4 not-italic">
        {block.lines.map((line, index) => <span key={`${line}-${index}`} className="block break-words">{line}</span>)}
      </address>
    );
  }

  return <p className="my-4 first:mt-0 last:mb-0">{block.text}</p>;
}

export default function LegalPage({ title, effectiveDate, lastUpdated, introduction, sections }: LegalPageProps) {
  return (
    <div className="bg-white text-[#08233d]">
      <Navbar variant="solid" />

      <main>
        <section className="relative overflow-hidden bg-[#f7fcff] pb-[clamp(56px,7vw,100px)] pt-[clamp(108px,13vw,160px)]">
          <HeartDoodle className="absolute -right-16 top-28 z-0 max-[760px]:hidden" size={260} rotate={15} opacity={0.1} variant={1} />

          <div className="relative z-[1] mx-auto min-w-0 w-[min(920px,calc(100%_-_32px))] sm:w-[min(920px,calc(100%_-_48px))]">
            <header className="text-center">
              <p className="m-0 text-[11px] font-black uppercase tracking-[0.18em] text-[#1fa8f4]">Little Ark Foundation</p>
              <h1 className="mt-3 text-[clamp(38px,6vw,68px)] font-black leading-[0.96] tracking-[-0.045em] text-[#005ba8] sm:mt-4">{title}</h1>
              <dl className="mx-auto mt-5 flex w-full max-w-[520px] flex-wrap justify-center gap-x-6 gap-y-2 border-y border-[#c8eefa] py-3 text-[12px] font-bold leading-[1.4] text-[#557086] sm:mt-6 sm:text-sm">
                <div className="flex gap-2 max-[430px]:justify-center"><dt className="font-black text-[#008fe4]">Effective Date:</dt><dd>{effectiveDate}</dd></div>
                <div className="flex gap-2 max-[430px]:justify-center"><dt className="font-black text-[#008fe4]">Last Updated:</dt><dd>{lastUpdated}</dd></div>
              </dl>
            </header>

            <article className="mt-10 min-w-0 bg-white px-5 py-7 shadow-[0_16px_44px_rgba(0,72,140,0.06)] sm:mt-14 sm:px-10 sm:py-12 lg:px-[52px]">
              <div className="break-words text-[15px] font-medium leading-[1.62] text-[#4b5f72] [overflow-wrap:anywhere] sm:text-[16px] sm:leading-[1.72]">
                {introduction.map((paragraph) => <p key={paragraph} className="my-4 first:mt-0">{paragraph}</p>)}
              </div>

              <div className="mt-10 divide-y divide-[rgba(0,104,201,0.14)] sm:mt-12">
                {sections.map((section, index) => (
                  <section key={section.title} aria-labelledby={`legal-section-${index}`} className="min-w-0 py-[clamp(26px,4vw,38px)] first:pt-0 last:pb-0">
                    <h2 id={`legal-section-${index}`} className="m-0 break-words text-[20px] font-black leading-tight tracking-[-0.02em] text-[#005ba8] sm:text-[27px]">{section.title}</h2>
                    <div className="mt-3 min-w-0 break-words text-[15px] font-medium leading-[1.62] text-[#4b5f72] [overflow-wrap:anywhere] sm:mt-4 sm:text-[16px] sm:leading-[1.72]">
                      {section.blocks.map((block, blockIndex) => <LegalBlockContent key={`${section.title}-${blockIndex}`} block={block} />)}
                    </div>
                  </section>
                ))}
              </div>
            </article>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
