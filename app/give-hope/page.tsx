import Link from "next/link";
import { permanentRedirect } from "next/navigation";
import { HeartDoodle, HeartPhotoAccent } from "@/components/BrandHearts";
import Footer from "@/components/Footer";
import ImpactStatsGrid from "@/components/ImpactStatsGrid";
import Navbar from "@/components/Navbar";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { siteContent } from "@/data/siteContent";
import { getPublicImpactMetrics } from "@/lib/google-sheets";

const impactItems = [
  "Housing",
  "Transportation",
  "Meals",
  "Activities",
];

const giftRows = [
  {
    title: "Housing Accommodation",
    body: "A safe place to stay close to treatment.",
  },
  {
    title: "Transportation Support",
    body: "Rides that help families continue care.",
  },
  {
    title: "Meals Support",
    body: "Warm meals during long treatment days.",
  },
  {
    title: "Care Cart",
    body: "Comfort and support when families need it most.",
  },
];

const faqs = [
  {
    question: "Where does my donation go?",
    answer: "Your gift supports practical care including housing, transportation, meals, activities, and comfort for families facing critical illness.",
  },
  {
    question: "Is Little Ark Foundation a registered nonprofit?",
    answer: "Little Ark Foundation operates as a charitable foundation supporting children and families through direct programs and partnerships.",
  },
  {
    question: "Can I give in honor of someone?",
    answer: "Yes. Gifts can be made in honor or memory of someone special through the foundation's donation platform.",
  },
  {
    question: "Can companies or groups donate?",
    answer: "Yes. Companies, churches, schools, and community groups can give or partner to support families together.",
  },
];

function Inner({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`relative z-[2] mx-auto w-[min(1220px,calc(100%_-_40px))] max-[620px]:w-[min(100%_-_28px,1220px)] ${className}`}>{children}</div>;
}

function DonateButtons({ centered = false }: { centered?: boolean }) {
  return (
    <div className={`mt-[34px] flex flex-wrap gap-4 ${centered ? "justify-center" : ""}`}>
      <Link
        href={siteContent.links.donations.philippinesUrl}
        className="inline-flex min-h-[52px] items-center justify-center rounded-full bg-[#ffc83d] px-7 text-[15px] font-black uppercase text-[#061d34] shadow-[0_16px_38px_rgba(255,200,61,0.36)] transition hover:-translate-y-0.5 hover:shadow-[0_22px_46px_rgba(255,200,61,0.46)] focus-visible:-translate-y-0.5 focus-visible:outline-none"
      >
        Donate from the Philippines
      </Link>
      <Link
        href={siteContent.links.donations.internationalUrl}
        className="inline-flex min-h-[52px] items-center justify-center rounded-full bg-[#c8f4ff] px-7 text-[15px] font-black uppercase text-[#008fe4] shadow-[0_16px_38px_rgba(31,168,244,0.16)] transition hover:-translate-y-0.5 hover:shadow-[0_22px_46px_rgba(31,168,244,0.22)] focus-visible:-translate-y-0.5 focus-visible:outline-none"
      >
        Donate from Other Countries
      </Link>
    </div>
  );
}

function ImpactIcon({ label }: { label: string }) {
  return (
    <div className="grid h-full min-h-40 place-items-center gap-3.5 rounded-3xl border border-[rgba(31,168,244,0.14)] bg-white p-6 text-center text-lg font-black uppercase text-[#1fa8f4] shadow-[0_18px_46px_rgba(31,168,244,0.11)] max-[620px]:min-h-[126px] max-[620px]:gap-2.5 max-[620px]:rounded-[20px] max-[620px]:p-3 max-[620px]:text-[clamp(12px,3.4vw,15px)] max-[620px]:leading-tight">
      <span className="grid h-16 w-16 place-items-center rounded-[18px] bg-[linear-gradient(135deg,#1fa8f4,#1fa8f4)] text-white">
        <svg className="h-9 w-9" viewBox="0 0 48 48" aria-hidden="true">
          <path d="M8 24 24 10l16 14M14 22v17h20V22M21 39V28h7v11" fill="none" stroke="currentColor" strokeWidth="3.5" />
        </svg>
      </span>
      {label}
    </div>
  );
}

export async function GiveHopeContent() {
  const impactMetrics = await getPublicImpactMetrics();

  return (
    <div className="bg-white text-[#08233d]">
      <Navbar variant="solid" />

      <main>
        <PageHero
          imageSrc="/images/give-hope/hero-gh.jpeg"
          title="Give Hope"
          description="Your kindness helps children and families continue their journey with care, dignity, and hope."
          backgroundClassName="bg-[linear-gradient(90deg,rgba(0,143,228,0.94)_0%,rgba(31,168,244,0.74)_48%,rgba(102,211,247,0.18)_100%),linear-gradient(135deg,#008fe4,#1fa8f4)]"
          overlayClassName="after:bg-[linear-gradient(90deg,rgba(0,143,228,0.9)_0%,rgba(31,168,244,0.68)_50%,rgba(255,255,255,0.12)_100%),radial-gradient(circle_at_76%_22%,rgba(255,255,255,0.32),transparent_18rem)] max-[767px]:after:bg-[linear-gradient(90deg,rgba(0,76,161,0.96)_0%,rgba(0,112,201,0.84)_44%,rgba(31,168,244,0.28)_76%,rgba(31,168,244,0.08)_100%)]"
          imageClassName="object-[center_30%] max-[900px]:object-[62%_24%] max-[767px]:object-[62%_center]"
          decoration={<HeartPhotoAccent className="bottom-[clamp(42px,8vw,96px)] right-[clamp(12px,6vw,82px)] top-auto rotate-[10deg] max-[620px]:bottom-8 max-[620px]:right-0" opacity={0.94} />}
        >
          <DonateButtons />
        </PageHero>

        <section className="relative overflow-hidden bg-[radial-gradient(circle_at_12%_8%,rgba(31,168,244,0.1),transparent_24rem),linear-gradient(180deg,#fff,#eaf9ff)] py-[clamp(86px,11vw,145px)]">
          <HeartDoodle className="absolute -right-24 top-8 z-0 max-[620px]:hidden" size={360} rotate={16} opacity={0.28} variant={1} />
          <Inner>
            <Reveal className="mx-auto mb-14 max-w-[880px] text-center">
              <h2 className="m-0 text-[clamp(44px,7vw,98px)] font-black leading-[0.94] text-[#1fa8f4]">Why Give?</h2>
              <p className="mx-auto mt-5 text-[clamp(20px,2.3vw,30px)] font-extrabold leading-[1.34] text-[#557086]">
                Every gift helps provide practical support for children and families facing critical illness.
              </p>
            </Reveal>
            <div className="grid auto-rows-fr grid-cols-4 gap-5 max-[900px]:grid-cols-2 max-[620px]:gap-3">
              {impactItems.map((item) => (
                <Reveal key={item} className="h-full">
                  <ImpactIcon label={item} />
                </Reveal>
              ))}
            </div>
          </Inner>
        </section>

        <section className="py-[clamp(86px,11vw,145px)]">
          <Inner>
            <Reveal className="mx-auto mb-14 max-w-[920px] text-center">
              <h2 className="m-0 text-[clamp(44px,7vw,98px)] font-black leading-[0.94] text-[#1fa8f4]">Your Gift Helps Provide</h2>
            </Reveal>
            <div className="grid gap-5">
              {giftRows.map((row) => (
                <Reveal
                  as="article"
                  key={row.title}
                  className="grid grid-cols-[0.78fr_1fr] items-center gap-8 rounded-[28px] border border-[rgba(31,168,244,0.14)] bg-[linear-gradient(135deg,#effaff,#fff)] p-[clamp(24px,4vw,44px)] shadow-[0_18px_46px_rgba(31,168,244,0.11)] max-[760px]:grid-cols-1"
                >
                  <h3 className="m-0 text-[clamp(30px,5vw,62px)] font-black leading-[0.94] text-[#1fa8f4]">{row.title}</h3>
                  <p className="m-0 text-[clamp(20px,2.3vw,31px)] font-extrabold leading-[1.3] text-[#557086]">{row.body}</p>
                </Reveal>
              ))}
            </div>
          </Inner>
        </section>

        <section className="scroll-mt-24 bg-[radial-gradient(circle_at_20%_28%,rgba(255,255,255,0.24),transparent_19rem),radial-gradient(circle_at_80%_68%,rgba(200,244,255,0.22),transparent_20rem),linear-gradient(135deg,#008fe4,#1fa8f4)] py-[clamp(68px,8vw,104px)] text-white max-[767px]:py-14">
          <Inner>
            <Reveal className="mx-auto mb-10 max-w-[920px] text-center max-[767px]:mb-7">
              <h2 className="m-0 scroll-mt-24 text-[clamp(44px,7vw,98px)] font-black leading-[0.94] max-[767px]:text-[clamp(36px,10vw,46px)] max-[767px]:leading-none">Because of You</h2>
            </Reveal>
            <ImpactStatsGrid metrics={impactMetrics} centerMobileRemainder />
          </Inner>
        </section>

        <section className="relative grid min-h-[70svh] place-items-center overflow-hidden bg-[radial-gradient(circle_at_20%_32%,rgba(200,244,255,0.28),transparent_18rem),linear-gradient(135deg,#008fe4,#1fa8f4)] px-5 py-[100px] text-center text-white">
          <HeartDoodle className="absolute -left-24 top-8 z-0 max-[620px]:hidden" size={390} rotate={-20} opacity={0.28} variant={2} />
          <Reveal className="relative z-[1]">
            <h2 className="mx-auto m-0 max-w-[980px] text-[clamp(46px,8vw,112px)] font-black leading-[0.94]">
              Every act of kindness creates hope.
            </h2>
            <DonateButtons centered />
          </Reveal>
        </section>

        <section className="bg-[radial-gradient(circle_at_84%_28%,rgba(31,168,244,0.12),transparent_24rem),linear-gradient(180deg,#fff,#eaf9ff)] py-[clamp(86px,11vw,145px)]">
          <Inner>
            <Reveal className="mx-auto mb-14 max-w-[920px] text-center">
              <h2 className="m-0 text-[clamp(44px,7vw,98px)] font-black leading-[0.94] text-[#1fa8f4]">FAQ</h2>
            </Reveal>
            <div className="grid gap-4">
              {faqs.map((faq) => (
                <Reveal
                  as="article"
                  key={faq.question}
                  className="rounded-[24px] border border-[rgba(31,168,244,0.14)] bg-white p-[clamp(22px,3vw,34px)] shadow-[0_14px_34px_rgba(31,168,244,0.10)]"
                >
                  <h3 className="m-0 text-[clamp(22px,3vw,34px)] font-black text-[#1fa8f4]">{faq.question}</h3>
                  <p className="mt-3 max-w-[880px] text-lg font-bold leading-[1.45] text-[#557086]">{faq.answer}</p>
                </Reveal>
              ))}
            </div>
          </Inner>
        </section>

        <section className="relative grid min-h-[78svh] place-items-center overflow-hidden bg-[radial-gradient(circle_at_20%_32%,rgba(200,244,255,0.28),transparent_18rem),linear-gradient(135deg,#008fe4,#1fa8f4)] px-5 py-[100px] text-center text-white">
          <HeartDoodle className="absolute -bottom-28 right-[8%] z-0 max-[620px]:hidden" size={420} rotate={18} opacity={0.28} variant={0} />
          <Reveal className="relative z-[1]">
            <h2 className="mx-auto m-0 max-w-[1000px] text-[clamp(46px,8vw,112px)] font-black leading-[0.94]">
              Help us build brighter futures.
            </h2>
            <DonateButtons centered />
          </Reveal>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default function GiveHopeRedirectPage() {
  permanentRedirect("/donate");
}
