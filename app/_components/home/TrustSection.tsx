import { ClipboardCheckIcon, HandHeartIcon, ShieldCheckIcon } from "lucide-react";
import { HeartDoodle } from "@/components/BrandHearts";
import { Card, CardContent } from "@/components/ui/card";
import Reveal from "@/components/Reveal";

const allocation = [
  { label: "Housing", percent: "68.4%", color: "#3478ed" },
  { label: "Meals", percent: "25.3%", color: "#073f89" },
  { label: "Care Cart", percent: "4.2%", color: "#f7bf3f" },
  { label: "Transport", percent: "2%", color: "#76bdf2" },
] as const;

const commitments = [
  { label: "Transparent", icon: ShieldCheckIcon },
  { label: "Accountable", icon: ClipboardCheckIcon },
  { label: "Purpose Driven", icon: HandHeartIcon },
] as const;

export default function TrustSection() {
  return (
    <Reveal as="section" className="relative flex w-full scroll-mt-24 items-center overflow-hidden bg-[linear-gradient(180deg,#ffffff_0%,#f4fbff_100%)] py-[clamp(58px,6.5vw,88px)] max-[767px]:py-12" direction="none">
      <HeartDoodle className="absolute -right-20 top-12 z-0 max-[760px]:hidden" size={250} rotate={18} opacity={0.18} variant={1} />
      <HeartDoodle className="absolute -left-12 bottom-6 z-0 max-[900px]:hidden" size={150} rotate={-18} opacity={0.16} variant={2} />
      <div className="relative z-[1] mx-auto w-[min(1300px,calc(100%_-_48px))] max-[760px]:w-[min(100%_-_24px,1300px)]">
        <Reveal className="mx-auto mb-[clamp(32px,4vw,48px)] max-w-[900px] text-center max-[767px]:mb-5" direction="up">
          <h2 className="m-0 text-balance text-[clamp(29px,3.5vw,43px)] font-black leading-[1.06] text-[#1fa8f4] max-[767px]:text-[clamp(1.55rem,6.4vw,1.95rem)]">Your Trust. Our Commitment</h2>
          <p className="mx-auto mb-0 mt-4 max-w-[720px] text-[clamp(15px,1.35vw,18px)] font-medium leading-[1.55] text-[#557086] max-[767px]:mt-2 max-[767px]:px-1 max-[767px]:text-[14px] max-[767px]:leading-[1.38]">Little Ark aims to manage every peso with transparency and responsibility, while keeping programs focused on the needs of children and families.</p>
        </Reveal>
        <div className="grid grid-cols-[minmax(0,3fr)_minmax(340px,2fr)] items-start gap-[clamp(28px,4vw,52px)] max-[980px]:grid-cols-1 max-[767px]:gap-5">
          <Reveal delay={160} direction="up">
            <div className="grid grid-cols-[minmax(250px,0.92fr)_minmax(230px,1.08fr)] items-center gap-[clamp(26px,4vw,48px)] max-[767px]:grid-cols-[minmax(112px,0.62fr)_minmax(0,1fr)] max-[767px]:gap-4 max-[380px]:grid-cols-1">
              <figure className="m-0">
                <div className="mx-auto grid aspect-square w-[min(100%,270px)] place-items-center rounded-full max-[767px]:w-[min(34vw,140px)] max-[380px]:w-[min(48vw,150px)]" style={{ background: "conic-gradient(#3478ed 0deg 246.24deg, #073f89 246.24deg 337.32deg, #f7bf3f 337.32deg 352.44deg, #76bdf2 352.44deg 360deg)" }} role="img" aria-label="Program allocation: Housing 68.4 percent, Meals 25.3 percent, Care Cart 4.2 percent, and Transport 2 percent">
                  <div className="grid h-[48%] w-[48%] place-items-center rounded-full bg-white text-[clamp(32px,3vw,42px)] font-black leading-none text-[#1fa8f4] shadow-[inset_0_0_0_1px_rgba(31,168,244,0.08)] max-[767px]:text-[24px]">88%</div>
                </div>
                <figcaption className="mx-auto mt-6 grid max-w-[360px] grid-cols-2 gap-x-6 gap-y-3 text-[clamp(13px,1vw,15px)] font-bold leading-tight text-[#4b5f72] max-[767px]:mt-3 max-[767px]:grid-cols-1 max-[767px]:gap-y-1.5 max-[767px]:text-[11px]">
                  {allocation.map((item) => <span key={item.label} className="flex min-w-0 items-center gap-2"><span className="h-3 w-3 shrink-0 rounded-full" style={{ backgroundColor: item.color }} /><span>{item.label} <strong className="text-[#0068c9]">{item.percent}</strong></span></span>)}
                </figcaption>
              </figure>
              <div className="max-[380px]:text-center"><p className="m-0 text-[clamp(20px,1.9vw,26px)] font-black uppercase leading-[1.14] text-[#0068c9] max-[767px]:text-[clamp(16px,4.4vw,20px)]">88% of every peso goes directly to programs</p><p className="mb-0 mt-3 text-[clamp(14px,1.25vw,17px)] font-medium leading-[1.5] text-[#557086] max-[767px]:mt-2 max-[767px]:text-[12px]">Only 12% supports administration and operations.</p></div>
            </div>
            <div className="mt-8 grid grid-cols-3 gap-3 max-[767px]:mt-4 max-[767px]:gap-2">
              {commitments.map(({ label, icon: Icon }) => <div key={label} className="flex items-center gap-3 rounded-lg border border-[rgba(0,104,201,0.12)] bg-white/95 p-3 shadow-[0_12px_30px_rgba(0,72,140,0.07)] transition duration-300 ease-out hover:-translate-y-1 max-[767px]:min-h-[74px] max-[767px]:flex-col max-[767px]:justify-center max-[767px]:gap-1.5 max-[767px]:p-2 max-[520px]:text-center"><span className="grid h-12 w-12 shrink-0 place-items-center rounded-lg bg-[#e8f8ff] text-[#008fe4] max-[767px]:h-8 max-[767px]:w-8"><Icon className="h-7 w-7 max-[767px]:h-5 max-[767px]:w-5" aria-hidden="true" /></span><span className="text-sm font-black text-[#1fa8f4] max-[767px]:text-[10px]">{label}</span></div>)}
            </div>
          </Reveal>
          <Reveal delay={320} direction="up">
            <blockquote className="m-0 rounded-lg border border-[rgba(0,104,201,0.12)] bg-white/95 p-[clamp(22px,2.8vw,34px)] shadow-[0_14px_34px_rgba(0,72,140,0.08)] max-[767px]:p-4"><p className="m-0 text-[clamp(17px,1.55vw,21px)] font-medium italic leading-[1.5] text-[#0068c9] max-[767px]:text-[14px]">&ldquo;Since Little Ark Foundation collaborated with NCH, statistics will show that the survival rate and the compliance rate for chemotherapy have increased.&rdquo;</p><footer className="mt-7 border-t border-[#c8f4ff] pt-6 max-[767px]:mt-3 max-[767px]:pt-3"><cite className="not-italic"><strong className="block text-[clamp(16px,1.35vw,19px)] font-black text-[#1fa8f4] max-[767px]:text-[13px]">Philip A. Morales, MD, MA, FPPS</strong><span className="mt-3 block text-[clamp(14px,1.15vw,16px)] text-[#557086] max-[767px]:mt-1.5 max-[767px]:text-[12px]">Medical Center Chief II,<br />National Children&apos;s Hospital</span></cite></footer></blockquote>
          </Reveal>
        </div>
      </div>
    </Reveal>
  );
}
