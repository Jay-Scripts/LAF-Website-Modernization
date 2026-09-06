import CTAButton from "@/components/CTAButton";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col bg-white text-[#08233d]">
      <Navbar variant="solid" />

      <main className="flex flex-1 pt-[82px]">
        <section className="relative grid min-h-[clamp(520px,68svh,700px)] w-full place-items-center overflow-hidden bg-[radial-gradient(circle_at_16%_18%,rgba(31,168,244,0.16),transparent_22rem),radial-gradient(circle_at_84%_76%,rgba(255,200,61,0.18),transparent_20rem),linear-gradient(180deg,#f3fbff,#fff)] px-5 py-[clamp(64px,9vw,100px)] text-center">
          <span className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none text-[clamp(190px,34vw,460px)] font-black leading-none text-[#1fa8f4]/[0.06]" aria-hidden="true">
            404
          </span>

          <div className="relative z-[1] mx-auto w-full max-w-[860px]">
            <p className="m-0 text-sm font-black uppercase tracking-[0.16em] text-[#008fe4]">Page Not Found</p>
            <h1 className="mx-auto mb-0 mt-5 max-w-[820px] text-[clamp(42px,7vw,82px)] font-black leading-[0.96] text-[#1fa8f4]">
              Looks like this page sailed away.
            </h1>
            <p className="mx-auto mb-0 mt-6 max-w-[680px] text-[clamp(17px,2vw,22px)] font-bold leading-[1.55] text-[#557086]">
              The page you&apos;re looking for may have moved, changed, or no longer exists. Let us help you find your way back.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5 max-[430px]:flex-col">
              <CTAButton href="/" icon={false} className="m-0 min-h-[52px] px-7 max-[430px]:w-full">
                Back to Home →
              </CTAButton>
              <CTAButton href="/donate" size="mini" icon={false} className="min-h-[52px] px-7 shadow-[0_14px_32px_rgba(31,168,244,0.16)] max-[430px]:w-full">
                Give Hope
              </CTAButton>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
