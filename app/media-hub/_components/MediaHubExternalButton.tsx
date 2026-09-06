import type { ReactNode } from "react";

type MediaHubExternalButtonProps = {
  href: string;
  children: ReactNode;
};

export default function MediaHubExternalButton({ href, children }: MediaHubExternalButtonProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="mt-[34px] inline-flex min-h-[52px] items-center justify-center rounded-full bg-[#ffc83d] px-7 text-[15px] font-black uppercase text-[#031427] shadow-[0_16px_38px_rgba(255,200,61,0.36)] transition duration-200 ease-out hover:-translate-y-0.5 hover:shadow-[0_22px_46px_rgba(255,200,61,0.46)] focus-visible:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#c8f4ff]"
    >
      {children}
    </a>
  );
}
