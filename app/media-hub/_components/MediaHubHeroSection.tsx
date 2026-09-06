import PageHero from "@/components/PageHero";

export default function MediaHubHeroSection() {
  return (
    <PageHero
      imageSrc="/images/media-hub/media-hub-hero.png"
      title="Stories of Hope"
      description={
        <>
          Moments of courage,<br className="max-[767px]:hidden" /> acts of kindness,<br className="max-[767px]:hidden" /> and lives changed every day.
        </>
      }
      backgroundClassName="bg-[linear-gradient(135deg,#008fe4,#1fa8f4)]"
      overlayClassName="after:bg-[linear-gradient(90deg,rgba(0,143,228,0.92)_0%,rgba(31,168,244,0.7)_44%,rgba(255,255,255,0.16)_100%),radial-gradient(circle_at_76%_22%,rgba(255,255,255,0.28),transparent_18rem)] max-[767px]:after:bg-[linear-gradient(90deg,rgba(0,76,161,0.96)_0%,rgba(0,112,201,0.84)_43%,rgba(31,168,244,0.28)_74%,rgba(31,168,244,0.07)_100%),linear-gradient(180deg,rgba(0,72,150,0.04)_0%,rgba(0,72,150,0.08)_58%,rgba(0,72,150,0.27)_100%)]"
      imageClassName="object-[center_24%] max-[900px]:object-[68%_20%] max-[767px]:object-[70%_center]"
    />
  );
}
