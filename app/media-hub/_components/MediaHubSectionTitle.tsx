import type { ReactNode } from "react";
import Reveal from "@/components/Reveal";

type MediaHubSectionTitleProps = {
  children: ReactNode;
  light?: boolean;
};

export default function MediaHubSectionTitle({ children, light = false }: MediaHubSectionTitleProps) {
  return (
    <Reveal className="mx-auto mb-14 max-w-[920px] text-center">
      <h2 className={`m-0 text-[clamp(44px,7vw,98px)] font-black leading-[0.94] tracking-normal ${light ? "text-white" : "text-[#1fa8f4]"}`}>
        {children}
      </h2>
    </Reveal>
  );
}
