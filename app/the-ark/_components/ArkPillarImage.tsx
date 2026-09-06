import ViewportRevealImage from "@/components/ViewportRevealImage";

type ArkPillarImageProps = {
  src: string;
  alt: string;
  className?: string;
};

export default function ArkPillarImage({ src, alt, className = "" }: ArkPillarImageProps) {
  return <ViewportRevealImage src={src} alt={alt} className={className} sizes="(max-width: 639px) calc(100vw - 64px), (max-width: 1023px) 45vw, 34vw" />;
}
