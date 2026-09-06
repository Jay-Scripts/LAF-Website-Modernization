import CTAButton from "./CTAButton";
import { siteContent } from "@/data/siteContent";

const fallbackImage =
  "radial-gradient(circle at 74% 21%, #f6c09b 0 4.2%, transparent 4.4%), radial-gradient(circle at 82% 26%, #e79f78 0 2.6%, transparent 2.8%), radial-gradient(circle at 66% 26%, #e79f78 0 2.6%, transparent 2.8%), radial-gradient(circle at 73% 32%, rgba(255,255,255,0.9) 0 2.4%, transparent 2.6%), linear-gradient(82deg, transparent 0 61%, #f8fbff 61.2% 77%, transparent 77.4%), radial-gradient(circle at 53% 52%, #e9b18d 0 1.4%, transparent 1.55%), radial-gradient(circle at 58% 50%, #f5c8a2 0 1.35%, transparent 1.5%), radial-gradient(circle at 63% 53%, #d7906e 0 1.45%, transparent 1.6%), radial-gradient(circle at 48% 50%, #f0bd97 0 1.25%, transparent 1.4%), linear-gradient(180deg, transparent 0 47%, rgba(255,255,255,0.42) 47.5% 62%, rgba(0,104,201,0.16) 62.5%), linear-gradient(110deg, #ffd597 0%, #8fd7d4 38%, #259ae3 72%, #0d74cc 100%)";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative min-h-[100svh] overflow-hidden bg-[linear-gradient(90deg,rgba(0,88,185,0.95)_0%,rgba(0,110,204,0.84)_39%,rgba(0,133,221,0.7)_62%,rgba(0,133,221,0.86)_100%),linear-gradient(135deg,#0059b9,#11a5ef)] text-white before:absolute before:inset-0 before:z-[2] before:bg-[linear-gradient(90deg,rgba(0,54,118,0.82)_0%,rgba(0,104,201,0.56)_42%,rgba(0,169,232,0.16)_100%),linear-gradient(180deg,rgba(0,34,78,0.24),rgba(0,34,78,0.24))]"
    >
      <div
        className="absolute -inset-[5%] z-0 origin-[65%_45%] scale-[1.02] saturate-[1.08] after:absolute after:inset-0 after:bg-[radial-gradient(circle_at_78%_33%,rgba(255,225,155,0.34),transparent_17rem),radial-gradient(circle_at_45%_52%,rgba(255,255,255,0.28),transparent_18rem),linear-gradient(180deg,rgba(255,255,255,0.16),rgba(255,255,255,0))]"
        style={{ background: fallbackImage }}
        aria-hidden="true"
      >
        <div
          className="absolute inset-0 bg-[url('/images/our-voyage/hero-ov.jpeg')] bg-cover bg-top"
          aria-hidden="true"
        />
        <video
          className="relative h-full w-full bg-transparent object-cover"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
        >
          <source src="/videos/homepage-hero-new.mp4" type="video/mp4" />
        </video>
      </div>
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
