import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { HeartDoodle, HeartPhotoAccent } from "@/components/BrandHearts";
import CTAButton from "@/components/CTAButton";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import PageHero from "@/components/PageHero";
import ProgramsNavigation from "@/components/ProgramsNavigation";
import Reveal from "@/components/Reveal";
import { getServicePage, servicePages } from "@/data/servicePages";
import { siteContent } from "@/data/siteContent";
import HousingPhotoStory from "./HousingPhotoStory";

type ServiceRouteProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return servicePages.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: ServiceRouteProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServicePage(slug);

  if (!service) {
    return {
      title: "Service",
    };
  }

  return {
    title: service.title,
    description: service.description,
    alternates: { canonical: `/services/${service.slug}` },
  };
}

function Inner({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`mx-auto w-[min(1220px,calc(100%_-_40px))] max-[620px]:w-[min(100%_-_28px,1220px)] ${className}`}>{children}</div>;
}

export default async function ServicePage({ params }: ServiceRouteProps) {
  const { slug } = await params;
  const service = getServicePage(slug);

  if (!service) {
    notFound();
  }

  const heroObjectPosition = "heroObjectPosition" in service ? service.heroObjectPosition : undefined;
  const isHousing = service.slug === "housing";
  const heroObjectFit = "heroObjectFit" in service ? service.heroObjectFit : "cover";
  const heroImageClassName = "heroImageClassName" in service ? service.heroImageClassName : "";
  const heroEyebrow = "heroEyebrow" in service ? service.heroEyebrow : "Support Across the Journey";
  const storyEyebrow = "storyEyebrow" in service ? service.storyEyebrow : "Photo Story";
  const ctaTitle = "ctaTitle" in service ? service.ctaTitle : "Every act of care brings hope.";
  const ctaDescription =
    "ctaDescription" in service
      ? service.ctaDescription
      : "Your support helps Little Ark continue providing compassionate care for children and their families.";
  const ctaLabel = "ctaLabel" in service ? service.ctaLabel : "Give Hope";

  return (
    <div className="bg-white text-[#08233d]">
      <Navbar variant="solid" />

      <main>
        {isHousing ? (
          <div id="top">
            <PageHero
              imageSrc={service.heroImage}
              imageUnoptimized
              imageLayerClassName="opacity-100"
              title={service.title}
              description={service.description}
              headlineDivider={<span className="mt-5 block h-1 w-16 bg-white shadow-[0_2px_6px_rgba(0,0,0,0.9)]" aria-hidden="true" />}
              backgroundClassName="bg-[#eaf9ff]"
              overlayClassName="max-[900px]:!top-[82px] max-[767px]:!top-[76px]"
              imageClassName="object-[center_40%] max-[767px]:object-[62%_center]"
              sectionClassName="!items-end pb-10 sm:pb-14"
              contentClassName="!w-[min(560px,100%)] !py-0 !filter-none"
              headlineClassName="!text-[clamp(36px,4.5vw,58px)] !text-white [text-shadow:0_2px_4px_rgba(0,0,0,0.95),0_4px_16px_rgba(0,0,0,0.9)]"
              descriptionClassName="!mt-5 !text-[clamp(16px,1.5vw,20px)] !leading-relaxed !text-white [text-shadow:0_1px_3px_rgba(0,0,0,1),0_3px_10px_rgba(0,0,0,0.95)]"
            />
          </div>
        ) : (
        <section id="top" className="relative grid min-h-[92svh] items-end overflow-hidden bg-[#1fa8f4] pt-[82px] text-white">
          <Image
            src={service.heroImage}
            alt=""
            fill
            preload
            unoptimized={isHousing}
            sizes="100vw"
            className={`${heroObjectFit === "contain" ? "object-contain object-center" : "object-cover object-center"} ${heroImageClassName}`}
            style={{ objectPosition: heroObjectPosition ?? "center center" }}
          />
          <div aria-hidden="true" className={`absolute inset-0 ${isHousing ? "bg-[linear-gradient(180deg,transparent_20%,rgba(3,25,45,0.18)_45%,rgba(3,25,45,0.88)_100%)]" : "bg-[linear-gradient(90deg,rgba(0,68,120,0.78)_0%,rgba(0,110,170,0.46)_46%,rgba(0,0,0,0.18)_100%),radial-gradient(circle_at_72%_26%,rgba(255,255,255,0.2),transparent_20rem)]"}`} />
          <HeartPhotoAccent className="bottom-[clamp(44px,8vw,96px)] right-[clamp(18px,6vw,84px)] top-auto rotate-[8deg] max-[620px]:bottom-8 max-[620px]:right-0" opacity={0.92} />
          <Inner className="relative z-[1] pb-[clamp(70px,12vh,126px)]">
            <Reveal className="max-w-[860px]" style={isHousing ? { filter: "none" } : undefined}>
              <p className="mb-4 mt-0 text-[13px] font-black uppercase tracking-[0.14em] text-white/80">
                {heroEyebrow}
              </p>
              <h1 className="m-0 text-[clamp(58px,10vw,132px)] font-black leading-[0.88] tracking-normal">
                {service.title}
              </h1>
              <p className="mt-6 max-w-[760px] text-[clamp(23px,3vw,38px)] font-black leading-[1.18] text-white/92">
                {service.description}
              </p>
            </Reveal>
          </Inner>
        </section>
        )}

        <section className={`relative overflow-hidden py-[clamp(76px,10vw,132px)] ${isHousing ? "bg-white" : "bg-[radial-gradient(circle_at_12%_16%,rgba(200,244,255,0.48),transparent_22rem),linear-gradient(180deg,#ffffff,#eef9ff)]"}`}>
          {!isHousing && <HeartDoodle className="absolute -left-24 top-6 z-0 max-[620px]:hidden" size={340} rotate={-16} opacity={0.28} variant={1} />}
          <Inner>
            {isHousing ? (
              <>
                <h2 className="m-0 mb-9 text-[clamp(30px,4vw,46px)] font-black leading-tight text-[#082f59]">Inside the Little Ark home</h2>
                <HousingPhotoStory images={service.images} />
              </>
            ) : (
            <>
            <Reveal className="mb-[clamp(34px,5vw,58px)] max-w-[760px]">
              <p className="mb-3 mt-0 text-[13px] font-black uppercase tracking-[0.14em] text-[#1fa8f4]">
                {storyEyebrow}
              </p>
            </Reveal>

            <div className="grid auto-rows-[clamp(260px,34vw,430px)] grid-cols-1 gap-5 md:grid-cols-12">
              {service.images.map((image, index) => (
                <Reveal
                  key={image.src}
                  style={isHousing ? { filter: "none" } : undefined}
                  className={`relative overflow-visible ${
                    image.className ?? (index % 3 === 0 ? "md:col-span-7" : "md:col-span-5")
                  }`}
                >
                  <div className="absolute inset-0 overflow-hidden rounded-[28px] shadow-[0_24px_70px_rgba(31,168,244,0.16)]">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      unoptimized={isHousing}
                      sizes="(max-width: 768px) calc(100vw - 40px), 50vw"
                      className="object-cover object-center"
                      style={{ objectPosition: ("objectPosition" in image ? image.objectPosition : undefined) ?? "center center" }}
                    />
                  </div>
                  {index === 0 ? (
                    <HeartPhotoAccent className="-right-16 -top-14 rotate-[-9deg] max-[620px]:-right-14 max-[620px]:-top-12" opacity={0.96} />
                  ) : null}
                </Reveal>
              ))}
            </div>
            </>
            )}
          </Inner>
        </section>

        <section className={`relative overflow-hidden px-5 py-[clamp(70px,9vw,112px)] text-center text-white ${isHousing ? "grid min-h-[58svh] place-items-center bg-[#073f89]" : "bg-[radial-gradient(circle_at_18%_30%,rgba(200,244,255,0.3),transparent_19rem),linear-gradient(135deg,#008fe4,#1fa8f4)]"}`}>
          {isHousing ? (
            <>
              <Image src="/images/get-on-board/volunteer-child-support.png" alt="" fill unoptimized sizes="100vw" className="object-cover object-[center_35%] max-[767px]:object-[65%_center]" />
              <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(4,20,42,0.4),transparent_75%)]" />
            </>
          ) : <HeartDoodle className="absolute -bottom-24 right-[6%] z-0 max-[620px]:hidden" size={380} rotate={16} opacity={0.28} variant={2} />}
          <Reveal className="relative z-[1] mx-auto max-w-[820px]" style={isHousing ? { filter: "none" } : undefined}>
            <h2 className={`m-0 font-black tracking-normal ${isHousing ? "text-[clamp(32px,4vw,54px)] leading-[1.06] [text-shadow:0_2px_4px_rgba(0,0,0,0.95),0_4px_16px_rgba(0,0,0,0.9)]" : "text-[clamp(38px,6vw,78px)] leading-[0.94]"}`}>
              {ctaTitle}
            </h2>
            <p className={`mx-auto mt-5 max-w-[660px] ${isHousing ? "text-[clamp(16px,1.5vw,20px)] font-bold leading-relaxed text-white [text-shadow:0_1px_3px_rgba(0,0,0,1),0_3px_10px_rgba(0,0,0,0.95)]" : "text-[clamp(20px,2.5vw,30px)] font-black leading-[1.2] text-white/86"}`}>
              {ctaDescription}
            </p>
            <CTAButton href={siteContent.links.giveHopePath} className={isHousing ? "mt-7 min-h-[48px]" : undefined}>{ctaLabel}</CTAButton>
          </Reveal>
        </section>

        <ProgramsNavigation activeProgram={service.slug} layout={isHousing ? "menu" : "default"} />
      </main>

      <Footer />
    </div>
  );
}
