import PageHero from "@/components/PageHero";

export default function MediaHubHeroSection() {
  return (
    <>
    <style>{`
      @keyframes stories-photo-enter {
        from { opacity: 0; clip-path: inset(0 100% 0 0); }
        to { opacity: 1; clip-path: inset(0); }
      }
      @keyframes stories-copy-enter {
        from { opacity: 0; transform: translateY(18px); }
        to { opacity: 1; transform: translateY(0); }
      }
      .stories-hero-image { animation: stories-photo-enter 1.15s cubic-bezier(0.22, 1, 0.36, 1) both; }
      .stories-hero-copy { filter: none !important; }
      .stories-hero-copy[data-revealed="true"] h1 { animation: stories-copy-enter 650ms cubic-bezier(0.22, 1, 0.36, 1) both; }
      .stories-hero-copy[data-revealed="true"] p { animation: stories-copy-enter 650ms cubic-bezier(0.22, 1, 0.36, 1) 150ms both; }
      @media (prefers-reduced-motion: reduce) {
        .stories-hero-image, .stories-hero-copy h1, .stories-hero-copy p { animation: none !important; }
      }
    `}</style>
    <PageHero
      imageSrc="/images/media-hub/media-hub-hero.png"
      imageUnoptimized
      imageLayerClassName="opacity-100"
      imageWrapperClassName="stories-hero-image"
      contentClassName="stories-hero-copy"
      title="Stories of Hope"
      description={
        <>
          Moments of courage,<br className="max-[767px]:hidden" /> acts of kindness,<br className="max-[767px]:hidden" /> and lives changed every day.
        </>
      }
      backgroundClassName="bg-[linear-gradient(135deg,#008fe4,#1fa8f4)]"
      overlayClassName="after:bg-[linear-gradient(90deg,rgba(0,112,193,0.96)_0%,rgba(0,143,228,0.84)_30%,rgba(0,143,228,0.38)_52%,transparent_70%)] max-[767px]:after:bg-[linear-gradient(90deg,rgba(0,76,161,0.96)_0%,rgba(0,112,201,0.84)_43%,rgba(31,168,244,0.25)_70%,transparent_90%)]"
      imageClassName="object-[center_24%] max-[900px]:object-[68%_20%] max-[767px]:object-[70%_center]"
    />
    </>
  );
}
