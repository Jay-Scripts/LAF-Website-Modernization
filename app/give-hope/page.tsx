import Link from "next/link";
import { permanentRedirect } from "next/navigation";
import { HeartDoodle } from "@/components/BrandHearts";
import Footer from "@/components/Footer";
import VoyageImpactSection from "@/app/our-voyage/_components/VoyageImpactSection";
import Navbar from "@/components/Navbar";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { siteContent } from "@/data/siteContent";
import { getPublicImpactMetrics } from "@/lib/google-sheets";
import ImpactPhotoCarousel from "./_components/ImpactPhotoCarousel";

const impactItems = [
  { label: "Housing", images: ["housing-reception.jpg", "housing-bedroom.png", "housing-arrival.png", "housing-activity-room.png", "housing-hero.png", "little-ark-house.png"].map((name) => `/images/hearts/housing/${name}`) },
  { label: "Transportation", images: ["transportation-shuttle-family.jpg", "transportation-partner-handoff.jpg", "transportation-hope-in-transit.jpg", "transportation-home-arrival.jpeg"].map((name) => `/images/hearts/transportation/${name}`) },
  { label: "Meals", images: ["everyday-meals-serving.jpeg", "everyday-meals-prep.jpeg", "everyday-meals-hero.png", "everyday-meals-family-table.png", "everyday-meals-child.jpeg", "everyday-meals-caregiver.jpeg"].map((name) => `/images/hearts/everyday-meals/${name}`) },
  { label: "Activities", images: ["activities-group-play.png", "activities-table-game.png", "activities-coloring.png", "activities-clay-smiles.png", "activities-board-game.png", "laf-activities.png"].map((name) => `/images/hearts/activities/${name}`) },
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
    <div className={`mt-[34px] flex gap-4 ${centered ? "flex-wrap justify-center" : "flex-col items-start"}`}>
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

export async function GiveHopeContent() {
  const impactMetrics = await getPublicImpactMetrics();

  return (
    <div className="bg-white text-[#08233d]">
      <Navbar variant="solid" />

      <main>
        <PageHero
          imageSrc="/images/give-hope/hero-gh.jpeg"
          imageLayerClassName="opacity-100"
          imageWrapperClassName="!left-auto !right-0 !w-1/2 bg-[#eef1f2] max-[767px]:!left-0 max-[767px]:!w-full"
          title="Give Hope"
          description="Your kindness helps children and families continue their journey with care, dignity, and hope."
          contentClassName="!w-[min(530px,100%)]"
          descriptionClassName="!max-w-[520px]"
          backgroundClassName="bg-[#07518a]"
          overlayClassName="max-[767px]:after:bg-[linear-gradient(180deg,transparent_20%,rgba(3,45,92,0.12)_45%,rgba(3,45,92,0.9)_100%)]"
          imageClassName="!object-contain !object-right max-[767px]:!object-cover max-[767px]:object-[62%_center]"
        >
          <DonateButtons />
        </PageHero>

        <section className="bg-[#f2f9fd] py-[clamp(72px,9vw,120px)]">
          <Inner>
            <div>
              <Reveal className="mb-14 max-w-[720px]">
                <h2 className="m-0 text-[clamp(48px,6vw,84px)] font-black leading-[0.94] text-[#082f59]">Why Give?</h2>
                <p className="mb-0 mt-7 max-w-[24ch] text-[clamp(19px,2vw,26px)] font-semibold leading-[1.38] text-[#436077]">
                  Every gift helps provide practical support for children and families facing critical illness.
                </p>
              </Reveal>
              <div className="space-y-16">
                {impactItems.map((item, index) => (
                  <Reveal key={item.label} delay={index * 120} className="border-t border-[#abcbdc] pt-6">
                    <span className="text-xs font-black tracking-[0.16em] text-[#008fe4]">0{index + 1}</span>
                    <h3 className="mb-0 mt-3 text-[clamp(28px,3vw,42px)] font-black leading-tight text-[#082f59]">{item.label}</h3>
                    <ImpactPhotoCarousel images={item.images} label={item.label} direction={index % 2 === 0 ? "left" : "right"} />
                  </Reveal>
                ))}
              </div>
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

        <VoyageImpactSection metrics={impactMetrics} title="Because of You" />

        <section className="relative grid min-h-[70svh] place-items-center overflow-hidden bg-[radial-gradient(circle_at_20%_32%,rgba(200,244,255,0.28),transparent_18rem),linear-gradient(135deg,#008fe4,#1fa8f4)] px-5 py-[100px] text-center text-white">
          <HeartDoodle className="absolute -left-24 top-8 z-0 max-[620px]:hidden" size={390} rotate={-20} opacity={0.28} variant={2} />
          <Reveal className="relative z-[1]">
            <h2 className="mx-auto m-0 max-w-[980px] text-[clamp(46px,8vw,112px)] font-black leading-[0.94]">
              Every act of kindness creates hope.
            </h2>
            <DonateButtons centered />
          </Reveal>
        </section>

        <section className="bg-[#f6fbfe] py-[clamp(76px,9vw,116px)]">
          <Inner>
            <div className="grid grid-cols-[minmax(180px,0.32fr)_minmax(0,1fr)] gap-[clamp(40px,8vw,124px)] max-[760px]:grid-cols-1 max-[760px]:gap-9">
              <Reveal>
                <h2 className="m-0 text-[clamp(48px,6vw,76px)] font-black leading-none text-[#082f59]">FAQ</h2>
              </Reveal>
              <div className="border-t border-[#9ebfd2]">
                {faqs.map((faq, index) => (
                  <Reveal as="article" key={faq.question} delay={index * 70} className="grid grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] gap-x-8 gap-y-3 border-b border-[#c4dbe7] py-7 max-[760px]:grid-cols-1 max-[760px]:py-6">
                    <h3 className="m-0 text-[clamp(19px,2vw,24px)] font-black leading-[1.2] text-[#082f59]">{faq.question}</h3>
                    <p className="m-0 max-w-[52ch] text-[16px] font-medium leading-[1.6] text-[#436077]">{faq.answer}</p>
                  </Reveal>
                ))}
              </div>
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
