import CTAButton from "./CTAButton";
import { siteContent } from "@/data/siteContent";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative min-h-[100svh] overflow-hidden bg-[#073f89] text-white"
    >
      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        preload="none"
        poster="/images/our-voyage/hero-ov.jpeg"
      >
        <source src="/videos/homepage-hero-new.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,28,66,0.4)_0%,transparent_45%,rgba(0,28,66,0.52)_100%)]" aria-hidden="true" />
      <div className="relative z-[3] mx-auto grid min-h-[100svh] w-[min(1300px,calc(100%_-_48px))] grid-cols-1 items-end pb-[clamp(86px,13vh,150px)] pt-[86px] max-[760px]:w-[min(100%_-_28px,1300px)] max-[760px]:pb-[72px] max-[760px]:pt-[76px]">
        <div className="w-[min(1040px,100%)] pl-[clamp(10px,2vw,42px)] max-[760px]:pl-0">
          <h1
            className="m-0 whitespace-nowrap text-[clamp(46px,6.1vw,84px)] font-black leading-[0.91] tracking-normal max-[760px]:whitespace-normal max-[760px]:text-[clamp(46px,14.5vw,74px)]"
            style={{ textShadow: "0 8px 20px rgba(0, 61, 122, 0.28)" }}
          >
            Our Children. Our Future.
          </h1>
          <CTAButton href={siteContent.links.giveHopePath}>Give Hope</CTAButton>
        </div>
      </div>
    </section>
  );
}
