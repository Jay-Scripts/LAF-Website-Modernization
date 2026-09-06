import PageHero from "@/components/PageHero";

export default function ArkHeroSection() {
  return (
    <PageHero
      imageSrc="/images/the-ark/hero-TA.png"
      title="Built From Hope"
      description="One family's journey through illness became a mission to support children and families facing the same fight."
      backgroundClassName="bg-[linear-gradient(90deg,rgba(0,143,228,0.92)_0%,rgba(31,168,244,0.78)_42%,rgba(102,211,247,0.2)_100%),linear-gradient(135deg,#1fa8f4,#1fa8f4)]"
      overlayClassName="after:bg-[linear-gradient(90deg,rgba(255,255,255,0.8)_0%,rgba(255,255,255,0.56)_38%,rgba(255,255,255,0.08)_72%,transparent_100%)] max-[767px]:after:bg-[linear-gradient(180deg,transparent_24%,rgba(0,53,115,0.08)_42%,rgba(0,53,115,0.82)_100%)]"
      imageClassName="object-[center_14%] max-[900px]:object-[68%_16%] max-[767px]:object-[70%_14%]"
      sectionClassName="max-[767px]:h-[100vh] max-[767px]:min-h-[100vh] max-[767px]:items-end"
      contentClassName="ark-hero-load max-[767px]:pb-12 max-[767px]:pt-40"
      headlineClassName="text-[clamp(44px,5.5vw,72px)] text-[#005ba8] max-[767px]:!text-white max-[767px]:!text-[clamp(1.8rem,7vw,2.25rem)]"
      descriptionClassName="text-[clamp(18px,2.2vw,26px)] text-[#2e5875] max-[767px]:mt-3 max-[767px]:max-w-[250px] max-[767px]:!text-[clamp(13px,3.4vw,15px)] max-[767px]:leading-[1.34] max-[767px]:!text-white/90"
    >
      <a
        href="#story"
        className="mt-[34px] inline-flex items-center gap-2.5 text-sm font-black uppercase tracking-[0.12em] text-[#005ba8] transition-transform duration-200 hover:translate-x-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#005ba8] max-[767px]:mt-6 max-[767px]:text-[10px] max-[767px]:tracking-[0.14em] max-[767px]:text-white"
      >
        Read the story
        <svg className="ark-scroll-cue h-4 w-4 [animation:cue-bounce_1.4s_ease-in-out_infinite]" viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <path d="m4 7 6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </a>
    </PageHero>
  );
}
