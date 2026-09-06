import CTAButton from "@/components/CTAButton";
import Reveal from "@/components/Reveal";
import OnBoardActionImage from "./OnBoardActionImage";
import { actions } from "./get-on-board-data";
import { Inner } from "./get-on-board-layout";

export default function GetOnBoardActionsSection() {
  return (
    <section
      id="ways-to-help"
      className="relative scroll-mt-24 overflow-hidden bg-[linear-gradient(180deg,#f7fdff_0%,#ffffff_48%,#eaf9ff_100%)] py-[clamp(78px,10vw,132px)] max-[767px]:py-14"
    >
      <style>{`
        @keyframes gob-action-image-left {
          from { opacity: 0; clip-path: inset(0 100% 0 0); transform: scale(1.06) translate3d(18px, 0, 0); }
          to { opacity: 1; clip-path: inset(0 0 0 0); transform: scale(1) translate3d(0, 0, 0); }
        }
        @keyframes gob-action-image-right {
          from { opacity: 0; clip-path: inset(0 0 0 100%); transform: scale(1.06) translate3d(-18px, 0, 0); }
          to { opacity: 1; clip-path: inset(0 0 0 0); transform: scale(1) translate3d(0, 0, 0); }
        }
        .gob-action-image-left { animation: gob-action-image-left 950ms cubic-bezier(0.22, 1, 0.36, 1) both; }
        .gob-action-image-right { animation: gob-action-image-right 950ms cubic-bezier(0.22, 1, 0.36, 1) both; }
        @media (prefers-reduced-motion: reduce) {
          .gob-action-image-left, .gob-action-image-right { animation: none !important; }
        }
      `}</style>

      <Inner className="max-[767px]:w-[min(100%_-_32px,1220px)]">
        <div className="flex flex-col gap-[clamp(42px,7vw,92px)]">
          {actions.map((action, index) => {
            const isReversed = index % 2 === 1;
            const panelClass =
              index === 0
                ? "bg-[#005ba8] text-white"
                : index === 1
                  ? "bg-[#eaf9ff] text-[#08233d]"
                  : "bg-[#e8f8ff] text-[#08233d]";
            const titleClass = index === 0 ? "text-white" : "text-[#005ba8]";
            const bodyClass = index === 0 ? "text-white/78" : "text-[#557086]";
            const softButtonClass =
              "bg-[#c8f4ff] text-[#005ba8] shadow-[0_14px_30px_rgba(0,104,201,0.14)] hover:bg-[#9fe4ff]";

            return (
              <Reveal
                as="article"
                key={action.title}
                delay={index * 140}
                direction={isReversed ? "right" : "left"}
                className={`grid items-stretch gap-[clamp(26px,5vw,72px)] md:grid-cols-2 ${isReversed ? "md:[&>div:first-child]:order-2 md:[&>div:last-child]:order-1" : ""}`}
              >
                <div
                  className={`flex min-h-[330px] flex-col justify-center rounded-[24px] border border-[#ccecf8] p-[clamp(26px,4vw,52px)] shadow-[0_20px_54px_rgba(0,72,140,0.1)] max-[767px]:min-h-0 max-[767px]:rounded-[18px] max-[767px]:p-6 ${panelClass}`}
                >
                  <h3
                    className={`m-0 text-[clamp(38px,5vw,68px)] font-black leading-[0.9] tracking-[-0.04em] max-[767px]:text-[clamp(2.35rem,10vw,3.4rem)] max-[767px]:leading-[0.95] ${titleClass}`}
                  >
                    {action.title}
                  </h3>
                  <p
                    className={`mb-0 mt-5 max-w-[470px] text-[clamp(17px,1.6vw,22px)] font-bold leading-[1.45] max-[767px]:mt-4 max-[767px]:text-[15px] max-[767px]:leading-[1.5] ${bodyClass}`}
                  >
                    {action.body}
                  </p>
                  <CTAButton
                    href={action.href}
                    target={action.external ? "_blank" : undefined}
                    rel={action.external ? "noopener noreferrer" : undefined}
                    size={action.soft ? "mini" : "hero"}
                    icon={!action.soft}
                    className={
                      action.soft
                        ? `mt-7 min-h-[50px] w-fit px-6 ${softButtonClass} max-[767px]:mt-5`
                        : "mt-7 min-h-[50px] w-fit px-6 shadow-[0_14px_30px_rgba(255,200,61,0.28)] max-[767px]:mt-5"
                    }
                  >
                    {action.button}
                  </CTAButton>
                </div>

                <div className="relative min-h-[330px] overflow-hidden rounded-[24px] bg-[#bfeefa] shadow-[0_24px_60px_rgba(31,168,244,0.16)] max-[767px]:min-h-0 max-[767px]:aspect-[4/3] max-[767px]:rounded-[18px]">
                  <OnBoardActionImage
                    src={action.imageSrc}
                    alt={action.imageAlt}
                    imagePosition={action.imagePosition}
                    mobilePosition={
                      index === 0
                        ? "max-[767px]:object-[52%_center]"
                        : index === 1
                          ? "max-[767px]:object-[52%_center]"
                          : "max-[767px]:object-[56%_center]"
                    }
                    animationClassName={
                      isReversed
                        ? "gob-action-image-right"
                        : "gob-action-image-left"
                    }
                    animationDelay={`${160 + index * 140}ms`}
                  />
                  <span
                    className="absolute bottom-0 left-0 h-2 w-1/3 bg-[#1fa8f4]"
                    aria-hidden="true"
                  />
                </div>
              </Reveal>
            );
          })}
        </div>
      </Inner>
    </section>
  );
}
