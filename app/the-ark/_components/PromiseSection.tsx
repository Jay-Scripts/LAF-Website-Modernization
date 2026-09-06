import Image from "next/image";
import Reveal from "@/components/Reveal";
import { Inner } from "./the-ark-layout";

export default function PromiseSection() {
  return (
    <section className="relative overflow-hidden bg-[#005ba8] py-[clamp(76px,8vw,112px)] max-[900px]:py-16 max-[767px]:py-14">
      <Inner className="grid grid-cols-[minmax(0,1.15fr)_minmax(340px,0.85fr)] items-center gap-0 max-[900px]:grid-cols-1">
        <Reveal className="relative z-[2] flex min-h-[clamp(360px,36vw,500px)] min-w-0 items-center py-8 pr-6 max-[900px]:min-h-0 max-[900px]:py-0 max-[767px]:pr-0">
          <h2 className="m-0 grid max-w-[760px] gap-3 text-left text-[clamp(32px,3.8vw,52px)] font-black leading-[0.94] tracking-[-0.045em] text-white max-[900px]:max-w-[760px] max-[767px]:gap-2.5 max-[767px]:text-[clamp(1.7rem,7vw,2.35rem)] max-[767px]:leading-[0.98]">
            <span className="whitespace-nowrap">Lead with <span className="text-[#c8f4ff]">Love.</span></span>
            <span className="whitespace-nowrap">Respond with <span className="text-[#c8f4ff]">Action.</span></span>
            <span className="whitespace-nowrap">Serve with <span className="text-[#c8f4ff]">Faith.</span></span>
          </h2>
        </Reveal>
        <Reveal className="relative aspect-[3/2] w-full overflow-hidden rounded-[20px] border-[10px] border-[#005ba8] bg-[#dff5fc] shadow-[0_24px_56px_rgba(0,40,100,0.22)] max-[900px]:max-w-[680px] max-[900px]:justify-self-center max-[767px]:mt-8 max-[767px]:rounded-[16px] max-[767px]:border-[6px]">
          <Image
            src="/images/the-ark/the_promise_TA.jpeg"
            alt=""
            fill
            sizes="(max-width: 900px) calc(100vw - 40px), 42vw"
            className="object-cover object-center transition duration-500 ease-out hover:scale-[1.02] motion-reduce:transform-none motion-reduce:transition-none"
          />
        </Reveal>
      </Inner>
    </section>
  );
}
