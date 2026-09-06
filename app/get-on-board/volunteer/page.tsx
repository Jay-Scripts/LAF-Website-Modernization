import type { Metadata } from "next";
import { HeartDoodle } from "@/components/BrandHearts";
import CTAButton from "@/components/CTAButton";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Volunteer",
  description: "Volunteer with Little Ark Foundation and support children and families through practical care.",
  alternates: { canonical: "/get-on-board/volunteer" },
};

const opportunities = [
  "Family support and hospitality",
  "Meal preparation and distribution",
  "Transportation coordination",
  "Care Cart support",
  "Activity center assistance",
  "Events, drives, and community outreach",
];

const expectations = [
  "Serve with compassion, respect, and reliability.",
  "Follow Little Ark Foundation safety and privacy guidelines.",
  "Attend orientation before joining family-facing activities.",
  "Communicate availability clearly with the volunteer team.",
];

const faqs = [
  {
    question: "Do I need previous volunteer experience?",
    answer: "No. A willing heart, consistency, and care for families are the most important starting points.",
  },
  {
    question: "Can groups volunteer together?",
    answer: "Yes. Families, schools, churches, companies, and community groups can help with coordinated activities and drives.",
  },
  {
    question: "Is there an orientation?",
    answer: "Yes. Volunteers will receive orientation before serving in programs that interact directly with families.",
  },
];

function Inner({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`relative z-[2] mx-auto w-[min(1220px,calc(100%_-_40px))] max-[620px]:w-[min(100%_-_28px,1220px)] ${className}`}>{children}</div>;
}

function SectionTitle({ kicker, title, children }: { kicker: string; title: string; children?: React.ReactNode }) {
  return (
    <Reveal className="mx-auto mb-12 max-w-[860px] text-center">
      <p className="mb-3 mt-0 text-[13px] font-black uppercase tracking-[0.12em] text-[#1fa8f4]">{kicker}</p>
      <h2 className="m-0 text-[clamp(40px,6vw,78px)] font-black leading-[0.96] tracking-normal text-[#1fa8f4]">{title}</h2>
      {children ? <p className="mx-auto mt-5 max-w-[720px] text-[clamp(19px,2vw,27px)] font-extrabold leading-[1.36] text-[#557086]">{children}</p> : null}
    </Reveal>
  );
}

function PlaceholderForm({ buttonLabel }: { buttonLabel: string }) {
  return (
    <Reveal className="rounded-[30px] border border-[rgba(31,168,244,0.16)] bg-white p-[clamp(24px,4vw,42px)] shadow-[0_20px_60px_rgba(31,168,244,0.16)]">
      <p className="mb-3 mt-0 text-[13px] font-black uppercase tracking-[0.12em] text-[#0068c9]">Application placeholder</p>
      <h2 className="m-0 text-[clamp(34px,5vw,62px)] font-black leading-[0.98] text-[#1fa8f4]">Ready to volunteer?</h2>
      <p className="mb-0 mt-5 max-w-[720px] text-[clamp(18px,2vw,25px)] font-bold leading-[1.44] text-[#557086]">
        This space is reserved for the future Google Form or custom volunteer application. For now, the button below is a placeholder.
      </p>
      <CTAButton disabled className="mt-8 min-h-[52px] px-7 opacity-80 shadow-[0_16px_38px_rgba(255,200,61,0.36)]">
        {buttonLabel}
      </CTAButton>
    </Reveal>
  );
}

export default function VolunteerPage() {
  return (
    <div className="bg-white text-[#08233d]">
      <Navbar variant="solid" />

      <main>
        <section className="relative grid min-h-[82svh] items-center overflow-hidden bg-[linear-gradient(90deg,rgba(0,143,228,0.94)_0%,rgba(31,168,244,0.76)_52%,rgba(102,211,247,0.2)_100%),linear-gradient(135deg,#008fe4,#1fa8f4)] pt-[82px] text-white">
          <div className="absolute bottom-[8%] right-[6%] top-[20%] w-[min(44vw,560px)] rounded-[34px] bg-[radial-gradient(circle_at_24%_38%,#e9aa84_0_22px,transparent_23px),radial-gradient(circle_at_45%_36%,#f5c39c_0_20px,transparent_21px),radial-gradient(circle_at_66%_39%,#d88e6e_0_22px,transparent_23px),linear-gradient(180deg,transparent_0_48%,rgba(255,255,255,0.55)_49%_66%,rgba(31,168,244,0.18)_67%),linear-gradient(135deg,#dff7ff,#c8f4ff,#75d2bf)] opacity-80 shadow-[0_28px_80px_rgba(0,72,140,0.22)] max-[900px]:hidden" aria-hidden="true" />
          <Inner>
            <Reveal className="w-[min(780px,100%)] py-24">
              <p className="mb-4 mt-0 text-[14px] font-black uppercase tracking-[0.14em] text-white/85">Get On Board</p>
              <h1 className="m-0 text-[clamp(58px,10vw,126px)] font-black leading-[0.88] tracking-normal">Volunteer With Us</h1>
              <p className="mt-7 max-w-[680px] text-[clamp(22px,3vw,36px)] font-black leading-[1.16]">
                Share your time and compassion to help children and families feel supported throughout treatment.
              </p>
              <CTAButton href="#apply" className="mt-[34px] min-h-[52px] px-7 shadow-[0_16px_38px_rgba(255,200,61,0.36)]">
                Apply Now
              </CTAButton>
            </Reveal>
          </Inner>
        </section>

        <section className="relative overflow-hidden bg-[radial-gradient(circle_at_14%_18%,rgba(31,168,244,0.1),transparent_24rem),linear-gradient(180deg,#fff,#eef9ff)] py-[clamp(82px,10vw,130px)]">
          <HeartDoodle className="absolute -right-24 top-8 z-0 max-[620px]:hidden" size={340} rotate={18} opacity={0.28} variant={1} />
          <HeartDoodle className="absolute bottom-8 left-[9%] z-0 max-[900px]:hidden" size={110} rotate={-18} opacity={0.22} variant={0} />
          <Inner className="grid grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] items-center gap-[clamp(34px,6vw,82px)] max-[900px]:grid-cols-1">
            <Reveal className="min-h-[clamp(320px,42vw,540px)] rounded-[34px] border border-white/70 bg-[radial-gradient(circle_at_26%_32%,rgba(255,255,255,0.88)_0_18%,transparent_19%),radial-gradient(circle_at_72%_72%,rgba(255,236,174,0.82)_0_16%,transparent_17%),linear-gradient(135deg,#c8f4ff,#75d2bf)] shadow-[0_28px_80px_rgba(31,168,244,0.16)]" />
            <Reveal>
              <h2 className="m-0 text-[clamp(40px,6vw,78px)] font-black leading-[0.98] text-[#1fa8f4]">Volunteer care, made practical.</h2>
              <p className="mt-6 text-[clamp(19px,2vw,27px)] font-bold leading-[1.46] text-[#557086]">
                Volunteers help Little Ark extend warm, practical care to families through meals, rides, activities, outreach, and moments of steady presence.
              </p>
            </Reveal>
          </Inner>
        </section>

        <section className="relative overflow-hidden bg-white py-[clamp(76px,10vw,120px)]">
          <HeartDoodle className="absolute -left-20 top-12 z-0 max-[620px]:hidden" size={300} rotate={-16} opacity={0.24} variant={2} />
          <HeartDoodle className="absolute right-[8%] bottom-6 z-0 max-[900px]:hidden" size={100} rotate={18} opacity={0.22} variant={0} />
          <Inner>
            <SectionTitle kicker="Volunteer Opportunities" title="Many hands, one mission.">
              Choose a way to serve that fits your time, skills, and heart for families.
            </SectionTitle>
            <div className="grid grid-cols-3 gap-4 max-[980px]:grid-cols-2 max-[640px]:grid-cols-1">
              {opportunities.map((item) => (
                <Reveal as="article" key={item} className="rounded-[22px] border border-[rgba(0,104,201,0.10)] bg-[linear-gradient(135deg,#effaff,#fff)] p-6 shadow-[0_12px_32px_rgba(31,168,244,0.12)]">
                  <h3 className="m-0 text-[22px] font-black text-[#1fa8f4]">{item}</h3>
                </Reveal>
              ))}
            </div>
          </Inner>
        </section>

        <section className="relative overflow-hidden bg-[linear-gradient(180deg,#eef9ff,#ffffff)] py-[clamp(76px,10vw,120px)]">
          <HeartDoodle className="absolute -right-20 top-8 z-0 max-[620px]:hidden" size={280} rotate={18} opacity={0.24} variant={1} />
          <HeartDoodle className="absolute bottom-8 left-[10%] z-0 max-[900px]:hidden" size={120} rotate={-20} opacity={0.22} variant={0} />
          <Inner className="grid grid-cols-2 gap-[22px] max-[900px]:grid-cols-1">
            <Reveal className="rounded-[30px] border border-[rgba(31,168,244,0.16)] bg-white p-[clamp(24px,4vw,40px)] shadow-[0_18px_52px_rgba(31,168,244,0.14)]">
              <h2 className="m-0 text-[clamp(34px,5vw,60px)] font-black leading-[0.98] text-[#1fa8f4]">Expectations</h2>
              <div className="mt-7 grid gap-4">
                {expectations.map((item) => (
                  <p key={item} className="m-0 rounded-2xl bg-[#effaff] p-4 text-[17px] font-bold leading-[1.4] text-[#557086]">{item}</p>
                ))}
              </div>
            </Reveal>
            <Reveal className="rounded-[30px] border border-[rgba(31,168,244,0.16)] bg-white p-[clamp(24px,4vw,40px)] shadow-[0_18px_52px_rgba(31,168,244,0.14)]">
              <h2 className="m-0 text-[clamp(34px,5vw,60px)] font-black leading-[0.98] text-[#1fa8f4]">FAQs</h2>
              <div className="mt-7 grid gap-5">
                {faqs.map((item) => (
                  <div key={item.question}>
                    <h3 className="m-0 text-[20px] font-black text-[#08233d]">{item.question}</h3>
                    <p className="mb-0 mt-2 text-[17px] font-bold leading-[1.42] text-[#557086]">{item.answer}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </Inner>
        </section>

        <section id="apply" className="relative scroll-mt-24 overflow-hidden bg-[radial-gradient(circle_at_18%_26%,rgba(200,244,255,0.34),transparent_18rem),linear-gradient(135deg,#008fe4,#1fa8f4)] px-5 py-[clamp(76px,10vw,120px)]">
          <HeartDoodle className="absolute -bottom-24 left-[8%] z-0 max-[620px]:hidden" size={360} rotate={-14} opacity={0.28} variant={2} />
          <HeartDoodle className="absolute right-[12%] top-8 z-0 max-[900px]:hidden" size={120} rotate={18} opacity={0.22} variant={0} />
          <div className="relative z-[1] mx-auto w-[min(980px,100%)]">
            <PlaceholderForm buttonLabel="Apply Now" />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
