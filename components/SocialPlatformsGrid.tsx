import Reveal from "./Reveal";
import { Card } from "@/components/ui/card";
import { siteContent } from "@/data/siteContent";

const socialPlatforms = [
  {
    name: "Facebook",
    href: siteContent.links.social.facebookUrl,
    label: "Follow us on Facebook",
    account: "@littlearkfoundation",
    panelClass: "bg-[linear-gradient(135deg,#005ba8,#1fa8f4)]",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M14 8h3V4h-3c-3 0-5 2-5 5v2H6v4h3v7h4v-7h3l1-4h-4V9c0-.6.4-1 1-1Z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    href: siteContent.links.social.instagramUrl,
    label: "Follow us on Instagram",
    account: "@little_ark_foundation",
    panelClass: "bg-[linear-gradient(135deg,#ffc83d,#ff9aa2)]",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="4" y="4" width="16" height="16" rx="5" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="17" cy="7" r="1.5" fill="currentColor" />
      </svg>
    ),
  },
  {
    name: "YouTube",
    href: siteContent.links.social.youtubeUrl,
    label: "Follow us on YouTube",
    account: "Little Ark Foundation",
    panelClass: "bg-[linear-gradient(135deg,#ff8f98,#ff6f7a)]",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M22 12s0-4-1-5c-.7-.9-1.5-1-2.3-1.1C15.9 5.6 12 5.6 12 5.6s-3.9 0-6.7.3C4.5 6 3.7 6.1 3 7c-1 1-1 5-1 5s0 4 1 5c.7.9 1.5 1 2.3 1.1 2.8.3 6.7.3 6.7.3s3.9 0 6.7-.3c.8-.1 1.6-.2 2.3-1.1 1-1 1-5 1-5Z" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        <path d="m10 9 5 3-5 3V9Z" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    href: siteContent.links.social.linkedinUrl,
    label: "Follow us on LinkedIn",
    account: "Little Ark Foundation",
    panelClass: "bg-[linear-gradient(135deg,#13b7b3,#66d3f7)]",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" d="M6.5 8.8H3V21h3.5V8.8ZM4.8 3a2 2 0 1 0 0 4.1 2 2 0 0 0 0-4.1ZM21 14.3c0-3.6-1.9-5.3-4.5-5.3-2.1 0-3 1.2-3.5 2V8.8H9.5V21H13v-6c0-1.6.3-3.1 2.2-3.1 1.9 0 1.9 1.8 1.9 3.2V21h3.5l.4-6.7Z" />
      </svg>
    ),
  },
  {
    name: "TikTok",
    href: siteContent.links.social.tiktokUrl,
    label: "Follow us on TikTok",
    account: "@littlearkfoundation",
    panelClass: "bg-[linear-gradient(135deg,#091a2f,#005ba8)]",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M14.5 4v10.2a4.7 4.7 0 1 1-4-4.6v3.2a1.7 1.7 0 1 0 1 1.5V4h3Zm0 0c.5 2.6 2.1 4 4.5 4.4v3.1c-2-.1-3.4-.8-4.5-1.8" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
].filter((platform) => platform.href && !platform.href.startsWith("TODO_"));

function ExternalIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
      <path d="m9 5 7 7-7 7" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function SocialPlatformsGrid() {
  return (
    <div className="grid grid-cols-5 items-stretch gap-4 max-[1180px]:grid-cols-2 max-[620px]:grid-cols-1">
      {socialPlatforms.map((platform, index) => (
        <Reveal
          as="article"
          key={platform.name}
          className="group h-full"
          delay={index * 200}
          direction={index % 2 === 0 ? "up" : "down"}
        >
          <Card className="h-full min-h-[250px] rounded-[18px] border border-[rgba(31,168,244,0.18)] bg-[#f8fcff] p-0 text-[#08233d] shadow-[0_18px_42px_rgba(31,168,244,0.1)] transition duration-300 ease-out hover:-translate-y-1.5 hover:border-[#1fa8f4] hover:shadow-[0_26px_60px_rgba(31,168,244,0.18)] max-[620px]:min-h-[218px] max-[620px]:rounded-[16px]">
            <a
              href={platform.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${platform.label}, opens in a new tab`}
              className="relative flex h-full flex-col overflow-hidden p-5 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#c8f4ff] max-[620px]:p-4"
            >
            <span className="absolute inset-x-0 top-0 h-1 bg-[#66d3f7]" aria-hidden="true" />
            <span className={`relative grid h-[92px] w-full shrink-0 place-items-center overflow-hidden rounded-[12px] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.26)] ${platform.panelClass} max-[620px]:h-[78px]`}>
              <span className="absolute -right-5 -top-8 h-24 w-24 rounded-full border border-white/20 transition duration-500 group-hover:scale-125" aria-hidden="true" />
              <span className="absolute -bottom-10 -left-4 h-20 w-20 rounded-full border border-white/15 transition duration-500 group-hover:scale-125" aria-hidden="true" />
              <span className="relative z-[1] h-12 w-12 drop-shadow-[0_10px_18px_rgba(0,72,140,0.18)] transition duration-300 group-hover:scale-110">
                {platform.icon}
              </span>
            </span>
            <span className="flex flex-1 flex-col px-1 pb-1 pt-5 max-[620px]:pt-4">
              <span className="block text-[clamp(24px,2.2vw,34px)] font-black leading-[1.05] tracking-[-0.025em] text-[#005ba8] transition-colors duration-300 group-hover:text-[#008fe4]">
                {platform.name}
              </span>
              <span className="mt-2 block whitespace-nowrap text-[clamp(12px,1.05vw,15px)] font-semibold leading-[1.35] tracking-[-0.01em] text-[#557086]">
                {platform.account}
              </span>
              <span className="mt-auto flex w-full items-center justify-between gap-2 pt-6 text-[clamp(12px,1.05vw,15px)] font-black uppercase leading-[1.15] tracking-[0.06em] text-[#005ba8] transition-colors duration-300 group-hover:text-[#008fe4]">
                {platform.label}
                <span className="shrink-0 transition-transform duration-300 group-hover:translate-x-1.5">
                  <ExternalIcon />
                </span>
              </span>
            </span>
            </a>
          </Card>
        </Reveal>
      ))}
    </div>
  );
}
