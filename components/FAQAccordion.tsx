import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export type FAQItem = {
  question: string;
  answer: string;
  email?: string;
};

export type FAQGroup = {
  category: string;
  items: readonly FAQItem[];
};

type FAQAccordionProps = {
  groups: readonly FAQGroup[];
};

export default function FAQAccordion({ groups }: FAQAccordionProps) {
  return (
    <div className="grid gap-9 sm:gap-12">
      {groups.map((group, groupIndex) => (
        <section key={group.category} aria-labelledby={`faq-category-${groupIndex}`}>
          <h2
            id={`faq-category-${groupIndex}`}
            className="mb-4 mt-0 border-b border-[#c8eefa] pb-3 text-[clamp(19px,2.3vw,27px)] font-black leading-tight tracking-[-0.025em] text-[#005ba8] sm:mb-5"
          >
            {group.category}
          </h2>
          <Accordion className="gap-2">
            {group.items.map((item, itemIndex) => (
              <AccordionItem key={item.question} value={`${groupIndex}-${itemIndex}`} className="overflow-hidden border-b border-[#cfeaf5] transition-colors first:border-t data-open:border-[#1fa8f4]">
                <AccordionTrigger className="min-h-14 gap-4 px-1 py-4 text-[15px] font-black leading-[1.35] text-[#08233d] no-underline hover:no-underline data-panel-open:text-[#0068c9] sm:py-5 sm:text-[17px] [&>svg]:text-[#1fa8f4]">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="px-1 pb-4 sm:pb-5">
                  <p className="m-0 max-w-[900px] text-[15px] font-medium leading-[1.58] text-[#557086] sm:text-[16px]">
                    {item.answer}
                    {item.email ? <><br /><a href={`mailto:${item.email}`} className="mt-2 inline-block font-black text-[#0068c9] underline decoration-[#c8f4ff] decoration-2 underline-offset-4 transition hover:text-[#1fa8f4]">{item.email}</a></> : null}
                  </p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>
      ))}
    </div>
  );
}
