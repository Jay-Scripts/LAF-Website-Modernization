import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { HeartDoodle, HeartPhotoAccent } from "@/components/BrandHearts";
import HeartsCTA from "@/components/HeartsCTA";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import PageHero from "@/components/PageHero";
import ProgramsNavigation from "@/components/ProgramsNavigation";
import Reveal from "@/components/Reveal";
import { getServicePage, servicePages } from "@/data/servicePages";
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

  const isHousing = service.slug === "housing";
  const isResources = service.slug === "resources-responsibility";
  const isCollage = service.slug === "everyday-meals" || service.slug === "activities" || isResources;
  const storyEyebrow = "storyEyebrow" in service ? service.storyEyebrow : "Photo Story";
  const ctaTitle = "ctaTitle" in service ? service.ctaTitle : "Every act of care brings hope.";
  const ctaDescription =
    "ctaDescription" in service
      ? service.ctaDescription
      : "Your support helps Little Ark continue providing compassionate care for children and their families.";
  const ctaLabel = "ctaLabel" in service ? service.ctaLabel : "Give Hope";

  return (
    <div className="hearts-page bg-white text-[#08233d]">
      <style>{`
        @keyframes hearts-photo-left { from { opacity: 0; clip-path: inset(0 100% 0 0); } to { opacity: 1; clip-path: inset(0); } }
        @keyframes hearts-photo-right { from { opacity: 0; clip-path: inset(0 0 0 100%); } to { opacity: 1; clip-path: inset(0); } }
        @keyframes hearts-copy-enter { from { opacity: 0; transform: translate3d(-24px,12px,0); } to { opacity: 1; transform: translate3d(0,0,0); } }
        @keyframes hearts-cta-enter { from { opacity: 0; transform: translateY(24px); clip-path: inset(100% 0 0 0); } to { opacity: 1; transform: translateY(0); clip-path: inset(0); } }
        .hearts-page .hearts-hero-photo { animation: hearts-photo-left 1100ms cubic-bezier(0.22,1,0.36,1) 80ms both; }
        .hearts-page .hearts-hero-copy { animation: hearts-copy-enter 850ms cubic-bezier(0.22,1,0.36,1) 140ms both; }
        .hearts-page [data-revealed="true"] .hearts-photo-left { animation: hearts-photo-left 950ms cubic-bezier(0.22,1,0.36,1) both; }
        .hearts-page [data-revealed="true"] .hearts-photo-right { animation: hearts-photo-right 950ms cubic-bezier(0.22,1,0.36,1) both; }
        .hearts-page .hearts-cta-copy[data-revealed="true"] { animation: hearts-cta-enter 850ms cubic-bezier(0.22,1,0.36,1) 180ms both; }
        .hearts-page .hearts-programs[data-revealed="true"] h2,
        .hearts-page .hearts-programs[data-revealed="true"] li { animation: hearts-copy-enter 850ms cubic-bezier(0.22,1,0.36,1) both; }
        .hearts-page .hearts-programs li:nth-child(1) { animation-delay: 100ms; }
        .hearts-page .hearts-programs li:nth-child(2) { animation-delay: 190ms; }
        .hearts-page .hearts-programs li:nth-child(3) { animation-delay: 280ms; }
        .hearts-page .hearts-programs li:nth-child(4) { animation-delay: 370ms; }
        .hearts-page .hearts-programs li:nth-child(5) { animation-delay: 460ms; }
        .hearts-page .hearts-programs li:nth-child(6) { animation-delay: 550ms; }
        @media (prefers-reduced-motion: reduce) {
          .hearts-page .hearts-hero-photo, .hearts-page .hearts-hero-copy,
          .hearts-page [data-revealed] .hearts-photo-left, .hearts-page [data-revealed] .hearts-photo-right,
          .hearts-page .hearts-cta-copy[data-revealed], .hearts-page .hearts-programs[data-revealed] h2,
          .hearts-page .hearts-programs[data-revealed] li { animation: none !important; }
        }
      `}</style>
      <Navbar variant="solid" />

      <main>
          <div id="top">
            <PageHero
              imageSrc={service.heroImage}
              imageUnoptimized
              imageLayerClassName="opacity-100"
              title={service.title}
              description={service.description}
              headlineDivider={<span className="mt-5 block h-1 w-16 bg-white shadow-[0_2px_6px_rgba(0,0,0,0.9)]" aria-hidden="true" />}
              backgroundClassName={isResources ? "bg-[#082f59]" : "bg-[#eaf9ff]"}
              overlayClassName="max-[900px]:!top-[82px] max-[767px]:!top-[76px]"
              imageClassName={isHousing ? "object-[center_40%] max-[767px]:object-[62%_center]" : isResources ? "!object-contain object-center" : "object-center"}
              imageWrapperClassName={`hearts-hero-photo ${isResources ? "mx-auto max-w-[1368px]" : ""}`}
              sectionClassName="!items-end pb-10 sm:pb-14"
              contentClassName="hearts-hero-copy !w-[min(560px,100%)] !py-0 !filter-none"
              headlineClassName="!text-[clamp(36px,4.5vw,58px)] !text-white [text-shadow:0_2px_4px_rgba(0,0,0,0.95),0_4px_16px_rgba(0,0,0,0.9)]"
              descriptionClassName="!mt-5 !text-[clamp(16px,1.5vw,20px)] !leading-relaxed !text-white [text-shadow:0_1px_3px_rgba(0,0,0,1),0_3px_10px_rgba(0,0,0,0.95)]"
            />
          </div>

        <section className={`relative overflow-hidden ${isHousing ? "bg-white pt-[clamp(76px,10vw,132px)]" : `py-[clamp(76px,10vw,132px)] ${isCollage ? "bg-white" : "bg-[radial-gradient(circle_at_12%_16%,rgba(200,244,255,0.48),transparent_22rem),linear-gradient(180deg,#ffffff,#eef9ff)]"}`}`}>
          {!isHousing && !isCollage && <HeartDoodle className="absolute -left-24 top-6 z-0 max-[620px]:hidden" size={340} rotate={-16} opacity={0.28} variant={1} />}
          <Inner>
            {isHousing ? (
              <>
                <Reveal style={{ filter: "none" }} className="mb-[clamp(52px,7vw,88px)] max-w-[800px]"><p className="mb-4 text-xs font-black uppercase tracking-[0.2em] text-[#1685bd]">Inside the Little Ark home</p><h2 className="m-0 text-[clamp(36px,5.5vw,72px)] font-black leading-[1.04] tracking-[-0.04em] text-[#082f59]">A place to rest.<br /><span className="text-[#1685bd]">Room to be a child.</span></h2></Reveal>
                <HousingPhotoStory images={service.images} />
              </>
            ) : (
            <>
            <Reveal style={{ filter: "none" }} className="mb-[clamp(34px,5vw,58px)] max-w-[760px]">
              <h2 className={isCollage ? "m-0 text-[clamp(30px,4vw,46px)] font-black leading-tight text-[#082f59]" : "mb-3 mt-0 text-[13px] font-black uppercase tracking-[0.14em] text-[#1fa8f4]"}>
                {storyEyebrow}
              </h2>
            </Reveal>

            <div className={isCollage ? "grid grid-cols-2 gap-3 sm:gap-4 md:auto-rows-[clamp(180px,18vw,250px)] md:grid-cols-12" : "grid auto-rows-[clamp(260px,34vw,430px)] grid-cols-1 gap-5 md:grid-cols-12"}>
              {service.images.map((image, index) => (
                <Reveal
                  key={image.src}
                  direction={index % 2 === 1 ? "right" : "left"}
                  delay={index * 140}
                  style={{ filter: "none" }}
                  className={`relative overflow-visible !duration-[950ms] ${isCollage ? (isResources ? (index === 2 ? "aspect-[4/5] md:aspect-auto" : "aspect-[4/3] md:aspect-auto") : index === 0 ? "aspect-[4/3] md:aspect-auto" : "aspect-square md:aspect-auto") : ""} ${
                    image.className ?? (index % 3 === 0 ? "md:col-span-7" : "md:col-span-5")
                  }`}
                >
                  <div className={isCollage ? "absolute inset-0 overflow-hidden rounded-xl bg-[#eef9ff]" : "absolute inset-0 overflow-hidden rounded-[28px] shadow-[0_24px_70px_rgba(31,168,244,0.16)]"}>
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      unoptimized
                      sizes="(max-width: 768px) calc(100vw - 40px), 50vw"
                      className={`object-cover object-center ${index % 2 === 1 ? "hearts-photo-right" : "hearts-photo-left"}`}
                      style={{ objectPosition: ("objectPosition" in image ? image.objectPosition : undefined) ?? "center center" }}
                    />
                  </div>
                  {index === 0 && !isCollage ? (
                    <HeartPhotoAccent className="-right-16 -top-14 rotate-[-9deg] max-[620px]:-right-14 max-[620px]:-top-12" opacity={0.96} />
                  ) : null}
                </Reveal>
              ))}
            </div>
            </>
            )}
          </Inner>
        </section>

        <HeartsCTA
          imageSrc={service.ctaImage}
          imageClassName={"ctaImageClassName" in service ? service.ctaImageClassName : isHousing ? "object-[center_35%] max-[767px]:object-[65%_center]" : service.slug === "everyday-meals" ? "object-[center_65%]" : isResources ? "object-[center_40%]" : "object-center"}
          title={ctaTitle}
          description={ctaDescription}
          label={ctaLabel}
        />

          <Reveal direction="none" threshold={0.08} style={{ filter: "none" }} className="hearts-programs">
            <ProgramsNavigation activeProgram={service.slug} layout="menu" />
          </Reveal>
      </main>

      <Footer />
    </div>
  );
}
