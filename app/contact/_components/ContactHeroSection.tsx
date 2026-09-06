import { HeartDoodle } from "@/components/BrandHearts";
import Reveal from "@/components/Reveal";
import { siteContent } from "@/data/siteContent";

export default function ContactHeroSection() {
  return (
    <>
      <HeartDoodle className="absolute -right-20 top-8 z-0 max-[760px]:hidden" size={300} rotate={17} opacity={0.2} variant={1} />
      <div className="relative grid items-end gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(260px,0.36fr)] lg:gap-12">
        <Reveal className="max-w-[780px]">
          <p className="mb-4 inline-flex items-center gap-3 text-sm font-black uppercase tracking-[0.14em] text-[#1fa8f4]">
            <span className="h-2 w-2 rounded-full bg-[#ffc83d]" aria-hidden="true" /> Contact Us
          </p>
          <h1 className="m-0 max-w-[850px] text-[clamp(40px,6.5vw,82px)] font-black leading-[0.92] tracking-[-0.035em] text-[#005ba8]">
            We would love to hear from you.
          </h1>
          <p className="mt-5 max-w-[650px] text-[clamp(16px,1.6vw,19px)] font-semibold leading-[1.5] text-[#557086]">
            Have a question about volunteering, partnerships, donations, or family support? Send us a message and our team will get back to you soon.
          </p>
        </Reveal>

        <Reveal direction="left" delay={120} className="contact-signal-panel relative z-[1] overflow-hidden rounded-[20px] border border-[#bceaff] bg-[#005ba8] p-5 text-white shadow-[0_18px_44px_rgba(0,91,168,0.18)]">
          <span className="contact-signal-sweep pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 skew-x-[-18deg] bg-[linear-gradient(90deg,transparent,rgba(157,232,255,0.28),transparent)]" aria-hidden="true" />
          <span className="contact-signal-beacon pointer-events-none absolute right-5 top-5 h-2.5 w-2.5 rounded-full bg-[#ffc83d] shadow-[0_0_0_5px_rgba(255,200,61,0.12)]" aria-hidden="true" />
          <p className="m-0 text-xs font-black uppercase tracking-[0.14em] text-[#9de8ff]">A direct line</p>
          <p className="mt-4 text-xl font-black leading-[1.15]">Prefer email?</p>
          <p className="mt-5 m-0 text-sm font-semibold leading-[1.55] text-[#dff8ff]">
            Reach us directly at{" "}
            <a href={`mailto:${siteContent.contact.email}`} className="whitespace-nowrap text-xs font-black tracking-[-0.02em] text-[#ffc83d] underline decoration-[#ffc83d]/40 underline-offset-4 transition hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ffc83d] sm:text-sm">
              {siteContent.contact.email}
            </a>.
          </p>
        </Reveal>
      </div>
    </>
  );
}
