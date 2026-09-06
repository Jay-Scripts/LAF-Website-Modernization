import Image from "next/image";
import Link from "next/link";
import { MailIcon, MapPinIcon, PhoneIcon } from "lucide-react";
import { HeartDoodle } from "@/components/BrandHearts";
import Reveal from "@/components/Reveal";
import { siteContent } from "@/data/siteContent";

function SecLogo() {
  return (
    <svg viewBox="0 0 52 52" aria-hidden="true">
      <path d="m26 3 20 10v25L26 49 6 38V13L26 3Z" fill="#fff" />
      <path d="m26 8 14 8-7 5-7-4V8Z" fill="#7bc043" />
      <path d="m12 16 10-6v28l-10-6V16Z" fill="#006f45" />
      <path d="m26 22 13-6v17l-13 9V22Z" fill="#18a05e" />
    </svg>
  );
}

function BirLogo() {
  return (
    <svg viewBox="0 0 52 52" aria-hidden="true">
      <circle cx="26" cy="26" r="24" fill="#fff" />
      <path d="M12 13h28v4H12zM12 35h28v4H12z" fill="#f2b632" />
      <text x="26" y="32" textAnchor="middle" fill="#174d91" fontSize="19" fontWeight="900" fontFamily="Arial, sans-serif">
        BIR
      </text>
    </svg>
  );
}

function DswdLogo() {
  return (
    <svg viewBox="0 0 52 52" aria-hidden="true">
      <circle cx="26" cy="26" r="24" fill="#fff" />
      <path d="M26 10c3 0 5 2 5 5s-2 5-5 5-5-2-5-5 2-5 5-5Z" fill="#f6cb38" />
      <path d="M11 23c7 0 12 4 15 11 3-7 8-11 15-11-1 10-6 16-15 19-9-3-14-9-15-19Z" fill="#16458f" />
      <path d="M17 25c1 6 4 10 9 13M35 25c-1 6-4 10-9 13" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

const registrations = [
  { label: "SEC", number: "2021070019208-08", logo: <SecLogo /> },
  { label: "BIR", number: "601-322-056-00000", logo: <BirLogo /> },
  { label: "DSWD License", number: "DSWD-SB-RL-2026-000131", logo: <DswdLogo /> },
  { label: "DSWD Public Solicitation", number: "DSWD-SB-PSP-S-2026-000125", logo: <DswdLogo /> },
];

const socials = [
  {
    label: "Facebook",
    href: siteContent.links.social.facebookUrl,
    className: "bg-[#1877f2]",
    icon: <path fill="currentColor" d="M14 8h3V4h-3c-3 0-5 2-5 5v2H6v4h3v7h4v-7h3l1-4h-4V9c0-.6.4-1 1-1Z" />,
  },
  {
    label: "Instagram",
    href: siteContent.links.social.instagramUrl,
    className: "bg-[linear-gradient(145deg,#7c3aed,#ec4899_52%,#f59e0b)]",
    icon: (
      <>
        <rect x="4" y="4" width="16" height="16" rx="5" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="17" cy="7" r="1.3" fill="currentColor" />
      </>
    ),
  },
  {
    label: "YouTube",
    href: siteContent.links.social.youtubeUrl,
    className: "bg-[#ff3030]",
    icon: <path fill="currentColor" d="M21 8c-.2-1.5-.8-2.2-2.2-2.5C17 5.2 12 5.2 12 5.2s-5 0-6.8.3C3.8 5.8 3.2 6.5 3 8c-.2 1.2-.2 4-.2 4s0 2.8.2 4c.2 1.5.8 2.2 2.2 2.5 1.8.3 6.8.3 6.8.3s5 0 6.8-.3c1.4-.3 2-1 2.2-2.5.2-1.2.2-4 .2-4s0-2.8-.2-4Zm-11 7V9l5 3-5 3Z" />,
  },
  {
    label: "LinkedIn",
    href: siteContent.links.social.linkedinUrl,
    className: "bg-[#0a66c2]",
    icon: <path fill="currentColor" d="M6 8.5H3V21h3V8.5ZM4.5 3A2 2 0 1 0 4.5 7a2 2 0 0 0 0-4ZM21 14c0-3.8-2-5.7-4.8-5.7-2.2 0-3.2 1.2-3.8 2V8.5H9.5V21h3v-6.2c0-1.6.3-3.2 2.4-3.2 2 0 2 1.9 2 3.3V21h3L21 14Z" />,
  },
  {
    label: "TikTok",
    href: siteContent.links.social.tiktokUrl,
    className: "bg-[#111827]",
    icon: <path d="M14.5 4v10.2a4.7 4.7 0 1 1-4-4.6v3.2a1.7 1.7 0 1 0 1 1.5V4h3Zm0 0c.5 2.6 2.1 4 4.5 4.4v3.1c-2-.1-3.4-.8-4.5-1.8" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />,
  },
];

function CountryHeading({ flag, children }: { flag: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2.5 max-[560px]:justify-center">
      <span className="text-[25px] leading-none max-[767px]:text-[20px]" aria-hidden="true">{flag}</span>
      <h2 className="text-[clamp(17px,1.25vw,20px)] font-black tracking-[0.02em] max-[767px]:text-[15px]">{children}</h2>
    </div>
  );
}

export default function Footer() {
  return (
    <Reveal
      as="footer"
      id="footer"
      threshold={0.05}
      delay={40}
      className="relative isolate scroll-mt-24 overflow-hidden bg-[linear-gradient(135deg,#005ba8_0%,#087fc8_52%,#045595_100%)] text-white"
    >
      <HeartDoodle className="absolute -left-10 bottom-12 -z-10 max-[740px]:hidden" size={140} rotate={-14} opacity={0.06} variant={2} />
      <HeartDoodle className="absolute -right-7 top-5 -z-10 max-[740px]:hidden" size={154} rotate={12} opacity={0.06} variant={1} />
      <HeartDoodle className="absolute bottom-5 right-[8%] -z-10 max-[900px]:hidden" size={76} rotate={-8} opacity={0.05} />

      <div className="mx-auto w-[min(1240px,calc(100%_-_48px))] py-[clamp(16px,1.8vw,24px)] max-[767px]:w-[min(100%_-_24px,1240px)] max-[767px]:py-4">
        <div className="grid grid-cols-[minmax(170px,210px)_minmax(0,1fr)] items-start gap-[clamp(18px,2.4vw,32px)] max-[900px]:grid-cols-1 max-[767px]:gap-3">
          <div className="flex justify-center max-[900px]:justify-center">
            <Image
              src="/images/logo/little-ark-foundation-logo-stacked.png"
              alt="Little Ark Foundation"
              width={4500}
              height={4501}
              className="h-auto w-full max-w-[190px] brightness-0 invert max-[767px]:max-w-[112px]"
            />
          </div>

          <div className="grid grid-cols-[minmax(0,0.75fr)_1px_minmax(0,1.25fr)] max-[767px]:grid-cols-1">
            <section className="pr-[clamp(20px,2.4vw,32px)] max-[767px]:pr-0">
              <CountryHeading flag="🇵🇭">PHILIPPINES</CountryHeading>
              <div className="mt-2 space-y-1.5 text-[clamp(12px,0.95vw,14px)] font-medium leading-[1.45] text-white/95 max-[767px]:mt-1.5 max-[767px]:space-y-1 max-[767px]:text-center max-[767px]:text-[11px]">
                <div className="flex gap-2 max-[767px]:justify-center">
                  <MapPinIcon className="mt-0.5 h-5 w-5 shrink-0 max-[767px]:h-4 max-[767px]:w-4" aria-hidden="true" />
                  <address className="not-italic">35 Tulip Street, Brgy. Roxas<br />Quezon City 1103</address>
                </div>
                <a className="flex w-fit items-center gap-2 transition hover:text-[#c8f4ff] max-[767px]:mx-auto" href="tel:+639064049569">
                  <PhoneIcon className="h-5 w-5 shrink-0 max-[767px]:h-4 max-[767px]:w-4" aria-hidden="true" />
                  +63 906 404 9569
                </a>
              </div>

              <h3 className="mt-2.5 text-[10px] font-black tracking-[0.08em] text-white/80 max-[767px]:mt-2 max-[767px]:text-center max-[767px]:text-[9px]">PHILIPPINE REGISTRATIONS</h3>
              <div className="mt-1.5 grid grid-cols-2 gap-x-2.5 gap-y-1.5">
                {registrations.map((item) => (
                  <div key={item.number} className="flex min-w-0 items-start gap-1.5">
                    <span className="h-5 w-5 shrink-0 max-[767px]:h-4 max-[767px]:w-4 [&_svg]:h-full [&_svg]:w-full">{item.logo}</span>
                    <span className="min-w-0 break-words leading-tight">
                      <strong className="block text-[10px] font-bold leading-[1.2] text-white/90 max-[767px]:text-[9px]">{item.label}</strong>
                      <span className="mt-0.5 block break-all text-[9px] font-normal leading-[1.2] text-white/70 max-[767px]:text-[8px]">{item.number}</span>
                    </span>
                  </div>
                ))}
              </div>
            </section>

            <span className="w-px self-stretch bg-white/35 max-[767px]:my-3 max-[767px]:h-px max-[767px]:w-full max-[767px]:self-auto" aria-hidden="true" />

            <section className="pl-[clamp(20px,2.4vw,32px)] max-[767px]:pl-0">
              <CountryHeading flag="🇺🇸">UNITED STATES</CountryHeading>
              <div className="mt-2 space-y-1.5 text-[clamp(12px,0.95vw,14px)] font-medium leading-[1.45] text-white/95 max-[767px]:mt-1.5 max-[767px]:space-y-1 max-[767px]:text-center max-[767px]:text-[11px]">
                <div className="flex gap-2 max-[767px]:justify-center">
                  <MapPinIcon className="mt-0.5 h-5 w-5 shrink-0 max-[767px]:h-4 max-[767px]:w-4" aria-hidden="true" />
                  <address className="not-italic">1600-B SW Dash Point Road<br />#1129 Federal Way, WA 98023</address>
                </div>
                <a className="flex w-fit items-center gap-2 transition hover:text-[#c8f4ff] max-[767px]:mx-auto" href="tel:+17323003902">
                  <PhoneIcon className="h-5 w-5 shrink-0 max-[767px]:h-4 max-[767px]:w-4" aria-hidden="true" />
                  +1 (732) 300-3902
                </a>
              </div>
              <div className="mt-2 border-t border-white/35 pt-2 text-[11px] font-medium leading-[1.45] text-white/85 max-[767px]:mt-1.5 max-[767px]:border-t-0 max-[767px]:pt-0 max-[767px]:text-center max-[767px]:text-[10px]">
                <p className="m-0">Little Ark Foundation is a nonprofit corporation exempt from federal income tax under Section 501(c)(3) of the Internal Revenue Code.</p>
                <p className="mb-0 mt-1 font-bold text-white">EIN 87-1007914</p>
              </div>
            </section>
          </div>
        </div>

        <div className="mt-[clamp(10px,1vw,14px)] border-t border-white/30 pt-2 max-[767px]:mt-3 max-[767px]:pt-2">
          <div className="grid grid-cols-[minmax(170px,210px)_clamp(18px,2.4vw,32px)_minmax(0,0.75fr)_1px_minmax(0,1.25fr)] items-center max-[900px]:grid-cols-2 max-[620px]:grid-cols-1 max-[620px]:gap-y-2.5">
            <section className="col-[1/4] flex items-center justify-center gap-2.5 text-center max-[900px]:col-auto max-[620px]:flex-col max-[620px]:gap-1">
              <h2 className="whitespace-nowrap text-[12px] font-black tracking-[0.04em] max-[767px]:text-[11px]">GET IN TOUCH</h2>
              <a href={`mailto:${siteContent.contact.email}`} className="inline-flex min-h-8 max-w-full items-center gap-1.5 break-all text-[12px] font-semibold transition hover:text-[#c8f4ff] max-[767px]:text-[10px]">
                <MailIcon className="h-5 w-5 max-[767px]:h-4 max-[767px]:w-4" aria-hidden="true" />
                {siteContent.contact.email}
              </a>
            </section>
            <span className="col-start-4 h-8 w-px bg-white/35 max-[900px]:hidden" aria-hidden="true" />
            <section className="col-start-5 flex items-center justify-center gap-2.5 text-center max-[900px]:col-auto max-[620px]:flex-col max-[620px]:gap-1">
              <h2 className="whitespace-nowrap text-[12px] font-black tracking-[0.04em] max-[767px]:text-[11px]">FOLLOW US</h2>
              <div className="flex flex-wrap justify-center gap-2" aria-label="Social links">
                {socials.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${item.label}, opens in a new tab`}
                    className={`grid h-8 w-8 place-items-center rounded-full border border-white/65 text-white shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-white hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-white max-[767px]:h-7 max-[767px]:w-7 ${item.className}`}
                  >
                    <svg viewBox="0 0 24 24" className="h-4 w-4 max-[767px]:h-3.5 max-[767px]:w-3.5" aria-hidden="true">{item.icon}</svg>
                  </a>
                ))}
              </div>
            </section>
          </div>
        </div>

        <div className="mt-2 text-center text-[11px] font-medium text-white/85 max-[767px]:mt-2 max-[767px]:text-[10px]">
          <p>© 2026 Little Ark Foundation. All Rights Reserved.</p>
          <nav className="mt-0.5 flex flex-wrap justify-center gap-x-3 gap-y-1 max-[460px]:gap-x-2" aria-label="Legal and organizational information">
            <Link className="underline decoration-white/55 underline-offset-4 transition hover:text-white" href="/faq">FAQ</Link>
            <span aria-hidden="true">|</span>
            <Link className="underline decoration-white/55 underline-offset-4 transition hover:text-white" href="/transparency">Transparency &amp; Reports</Link>
            <span aria-hidden="true">|</span>
            <Link className="underline decoration-white/55 underline-offset-4 transition hover:text-white" href="/privacy-policy">Privacy Policy</Link>
            <span aria-hidden="true">|</span>
            <Link className="underline decoration-white/55 underline-offset-4 transition hover:text-white" href="/terms-of-use">Terms of Use</Link>
          </nav>
        </div>
      </div>
    </Reveal>
  );
}
