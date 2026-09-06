import { Card, CardContent } from "@/components/ui/card";
import Reveal from "@/components/Reveal";
import { siteContent } from "@/data/siteContent";

const visitDetails = [
  { label: "Address", lines: ["35 Tulip Street", "Brgy. Roxas", "Quezon City"], href: undefined, icon: "location" },
  { label: "Philippines", lines: ["+63 906 404 9569"], href: `tel:${siteContent.contact.phPhone}`, icon: "phone" },
  { label: "United States", lines: ["+1 (732) 300-3902"], href: `tel:${siteContent.contact.usPhone}`, icon: "phone" },
] as const;

function ContactIcon({ type }: { type: "phone" | "location" }) {
  if (type === "phone") {
    return <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true"><path d="M6.5 3.5h3.2l1.7 4.6-2.1 1.5c1.6 3.2 3.9 5.5 7.1 7.1l1.5-2.1 4.6 1.7v3.2c0 1.1-.9 2-2 2C10.6 21.5 2.5 13.4 2.5 3.5c0-1.1.9-2 2-2h2Z" fill="currentColor" /></svg>;
  }
  return <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true"><path d="M12 22s7-6 7-13a7 7 0 0 0-14 0c0 7 7 13 7 13Z" fill="currentColor" /><circle cx="12" cy="9" r="2.4" fill="#c8f4ff" /></svg>;
}

export default function ContactVisitSection() {
  return (
    <section className="mt-[clamp(32px,5vw,56px)] rounded-[26px] border border-[#c6edfb] bg-[#f2fbff] p-[clamp(16px,3vw,30px)] shadow-[0_18px_40px_rgba(31,168,244,0.08)]">
      <Reveal className="mx-auto max-w-[760px] text-center">
        <h2 className="m-0 text-[clamp(28px,3.5vw,42px)] font-black leading-[1] tracking-normal text-[#005ba8] max-[620px]:text-2xl">Visit or Call Us</h2>
      </Reveal>
      <div className="mx-auto mt-5 grid max-w-[1080px] grid-cols-3 gap-3 max-[620px]:grid-cols-2 max-[620px]:gap-2">
        {visitDetails.map((item, index) => (
          <Reveal as="article" key={item.label} className={`h-full min-w-0 ${index === 0 ? "max-[620px]:col-span-2" : ""}`}>
            <Card className="h-full min-h-[104px] rounded-[16px] border border-[rgba(31,168,244,0.12)] bg-white p-0 shadow-[0_8px_20px_rgba(31,168,244,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_14px_28px_rgba(31,168,244,0.13)]">
              <CardContent className="flex h-full min-w-0 items-start gap-3 p-4 max-[620px]:gap-2 max-[620px]:p-3">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-[10px] bg-[#edf8ff] text-[#1fa8f4] max-[620px]:h-6 max-[620px]:w-6"><ContactIcon type={item.icon} /></span>
                <span className="min-w-0">
                  <span className="block text-xs font-black uppercase tracking-[0.1em] text-[#1fa8f4] max-[620px]:text-[clamp(8px,2.2vw,11px)] max-[620px]:tracking-[0.04em]">{item.label}</span>
                  <span className="mt-2 block break-words text-sm font-extrabold leading-[1.35] text-[#091a2f] max-[620px]:mt-1 max-[620px]:text-[clamp(9px,2.6vw,13px)]">
                    {item.lines.map((line) => <span key={line} className="block">{item.href ? <a href={item.href} className="focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1fa8f4]">{line}</a> : line}</span>)}
                  </span>
                </span>
              </CardContent>
            </Card>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
