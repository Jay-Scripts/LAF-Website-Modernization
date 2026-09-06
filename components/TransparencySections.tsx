import Link from "next/link";
import Reveal from "@/components/Reveal";

type Registration = { label: string; number: string };
type Resource = { eyebrow: string; title: string; description: string; href: string; action: string };

function ArrowIcon() {
  return <span aria-hidden="true" className="text-base leading-none">→</span>;
}

export function RegistrationCards({ registrations }: { registrations: readonly Registration[] }) {
  return (
    <div className="mt-7 grid gap-4 md:grid-cols-2 md:gap-5">
      <Reveal as="article" className="h-full rounded-2xl border border-[#ccecff] bg-[#f5fbff] p-5 shadow-[0_16px_42px_rgba(0,91,168,0.08)] sm:p-7 lg:p-9">
        <p className="m-0 text-[11px] font-black uppercase tracking-[0.16em] text-[#118ee5]">Philippines</p>
        <h3 className="mb-0 mt-2 text-[clamp(22px,3vw,34px)] font-black leading-tight tracking-[-0.025em] text-[#005ba8]">Little Ark Foundation Philippines</h3>
        <address className="mb-0 mt-4 not-italic text-[14px] font-semibold leading-[1.6] text-[#557086] sm:mt-5 sm:text-[15px]">
          35 Tulip Street, Brgy. Roxas<br />Quezon City 1103
        </address>
        <dl className="mt-5 grid gap-3 sm:mt-6">
          {registrations.map((registration) => (
            <div key={registration.number} className="grid gap-1 border-t border-[#d6edf9] pt-3 min-[431px]:grid-cols-[minmax(110px,0.72fr)_minmax(0,1.28fr)] min-[431px]:gap-4">
              <dt className="text-[11px] font-black uppercase tracking-[0.08em] text-[#557086]">{registration.label}</dt>
              <dd className="m-0 min-w-0 break-words text-[13px] font-bold text-[#16324a] sm:text-[14px]">{registration.number}</dd>
            </div>
          ))}
        </dl>
      </Reveal>

      <Reveal as="article" className="h-full rounded-2xl border border-[#ccecff] bg-[#f5fbff] p-5 shadow-[0_16px_42px_rgba(0,91,168,0.08)] sm:p-7 lg:p-9">
        <p className="m-0 text-[11px] font-black uppercase tracking-[0.16em] text-[#118ee5]">United States</p>
        <h3 className="mb-0 mt-2 text-[clamp(22px,3vw,34px)] font-black leading-tight tracking-[-0.025em] text-[#005ba8]">Little Ark Foundation United States</h3>
        <address className="mb-0 mt-4 not-italic text-[14px] font-semibold leading-[1.6] text-[#557086] sm:mt-5 sm:text-[15px]">
          1600-B SW Dash Point Road<br />#1129 Federal Way, WA 98023
        </address>
        <div className="mt-5 border-t border-[#d6edf9] pt-4 sm:mt-6 sm:pt-5">
          <p className="m-0 text-[14px] font-semibold leading-[1.6] text-[#557086] sm:text-[15px]">
            Little Ark Foundation is a nonprofit corporation exempt from federal income tax under Section 501(c)(3) of the Internal Revenue Code.
          </p>
          <p className="mb-0 mt-4 text-[13px] font-black uppercase tracking-[0.08em] text-[#16324a]">EIN 87-1007914</p>
        </div>
      </Reveal>
    </div>
  );
}

export function ResourceCards({ resources }: { resources: readonly Resource[] }) {
  return (
    <div className="mt-7 grid gap-4 md:grid-cols-2 md:gap-5">
      {resources.map((resource) => (
        <Reveal key={resource.href} as="article" className="flex h-full min-w-0 flex-col rounded-2xl border border-[#ccecff] bg-white p-5 shadow-[0_14px_36px_rgba(0,91,168,0.07)] sm:p-7">
          <p className="m-0 text-[11px] font-black uppercase tracking-[0.15em] text-[#1fa8f4]">{resource.eyebrow}</p>
          <h3 className="mb-0 mt-2 text-[clamp(21px,2.7vw,31px)] font-black leading-tight tracking-[-0.02em] text-[#005ba8]">{resource.title}</h3>
          <p className="mb-0 mt-3 flex-1 text-[14px] font-semibold leading-[1.55] text-[#557086] sm:text-[15px]">{resource.description}</p>
          <Link href={resource.href} className="mt-5 inline-flex min-h-11 w-fit items-center gap-2 rounded-full bg-[#ffc83d] px-5 text-[11px] font-black uppercase tracking-[0.05em] text-[#16324a] transition hover:-translate-y-0.5 hover:bg-[#ffd568] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#005ba8]">
            {resource.action}<ArrowIcon />
          </Link>
        </Reveal>
      ))}
    </div>
  );
}
