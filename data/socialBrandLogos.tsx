import { siteContent } from "@/data/siteContent";

export const socialBrandLogos = [
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
