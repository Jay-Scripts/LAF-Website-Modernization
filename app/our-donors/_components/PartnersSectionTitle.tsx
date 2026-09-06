import type { ReactNode } from "react";
import Reveal from "@/components/Reveal";

type PartnersSectionTitleProps = {
  children: ReactNode;
  light?: boolean;
};

export default function PartnersSectionTitle({ children, light = false }: PartnersSectionTitleProps) {
  return (
    <Reveal className="mx-auto mb-[62px] max-w-[920px] text-center">
      <h2 className={`m-0 whitespace-nowrap text-[clamp(44px,7vw,98px)] font-black leading-[0.94] tracking-normal max-[767px]:whitespace-normal ${light ? "text-white" : "text-[#1fa8f4]"}`}>
        {children}
      </h2>
    </Reveal>
  );
}
