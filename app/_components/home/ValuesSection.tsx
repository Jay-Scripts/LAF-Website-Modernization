import { HeartPulseIcon, UsersRoundIcon } from "lucide-react";

import { HeartDoodle } from "@/components/BrandHearts";
import { Card, CardContent } from "@/components/ui/card";
import Reveal from "@/components/Reveal";

const statements = [
  {
    title: "Vision",
    body: "A world where every pediatric patient with cancer, thalassemia, and other critical illnesses, along with their families, feels supported by love and faith.",
    icon: HeartPulseIcon,
  },
  {
    title: "Mission",
    body: "To provide compassionate, holistic support to pediatric patients and their families through housing, meals, transportation, activities, resources, and faith-centered care.",
    icon: UsersRoundIcon,
  },
];

export default function ValuesSection() {
  return (
    <Reveal
      as="section"
      className="relative flex w-full items-center overflow-hidden bg-[linear-gradient(180deg,#ffffff_0%,#f2fbff_100%)] py-[clamp(64px,8vw,108px)] max-[760px]:py-14"
      direction="none"
    >
      <HeartDoodle
        className="absolute -left-14 bottom-4 z-0 max-[760px]:hidden"
        size={190}
        rotate={-20}
        opacity={0.16}
        variant={2}
      />
      <HeartDoodle
        className="absolute right-[9%] top-10 z-0 max-[900px]:hidden"
        size={110}
        rotate={17}
        opacity={0.16}
        variant={0}
      />

      <div className="relative z-[1] mx-auto w-[min(1180px,calc(100%_-_48px))] max-[760px]:w-[min(100%_-_28px,1180px)]">
        <Reveal className="mx-auto max-w-[980px] text-center" direction="up">
          <h2 className="m-0 text-balance text-[clamp(29px,3.7vw,46px)] font-medium leading-[1.08] text-[#1fa8f4] max-[767px]:text-[clamp(23px,6.8vw,31px)]">
            <span className="whitespace-nowrap">
              Lead with{" "}
              <strong className="font-black text-[#0068c9]">Love.</strong>
            </span>{" "}
            <span className="whitespace-nowrap">
              Respond with{" "}
              <strong className="font-black text-[#008fe4]">Action.</strong>
            </span>{" "}
            <span className="whitespace-nowrap">
              Serve with{" "}
              <strong className="font-black text-[#d89b00]">Faith.</strong>
            </span>
          </h2>
        </Reveal>

        <div className="mt-12 grid grid-cols-2 gap-4 max-[760px]:mt-8 max-[760px]:grid-cols-1 max-[760px]:gap-3">
          {statements.map(({ title, body, icon: Icon }, index) => (
            <Reveal
              key={title}
              as="article"
              delay={index === 1 ? 220 : 100}
              direction="up"
            >
              <Card className="group h-full rounded-lg border-[rgba(0,104,201,0.12)] bg-white/95 py-0 shadow-[0_14px_34px_rgba(0,72,140,0.08)] transition duration-300 ease-out hover:-translate-y-1 hover:border-[#9fe4ff] hover:shadow-[0_20px_44px_rgba(0,72,140,0.12)]">
                <CardContent className="grid h-full grid-cols-[56px_1fr] items-start gap-5 p-6 max-[760px]:grid-cols-1 max-[760px]:gap-3 max-[760px]:p-4 max-[760px]:text-center">
                  <span className="grid size-12 place-items-center rounded-lg bg-[#e8f8ff] text-[#008fe4] transition duration-300 group-hover:bg-[#1fa8f4] group-hover:text-white max-[760px]:mx-auto max-[760px]:size-10">
                    <Icon
                      className="size-6 max-[760px]:size-5"
                      strokeWidth={2.5}
                      aria-hidden="true"
                    />
                  </span>
                  <div>
                    <h3 className="mb-2 mt-0 text-[20px] font-black leading-tight text-[#0068c9] max-[760px]:text-[16px]">
                      {title}
                    </h3>
                    <p className="m-0 text-[14px] leading-[1.52] text-[#4b5f72] max-[760px]:text-[12px]">
                      {body}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </Reveal>
  );
}
