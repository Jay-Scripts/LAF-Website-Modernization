import Image from "next/image";
import { Card } from "@/components/ui/card";
import { HeartDoodle } from "@/components/BrandHearts";
import Reveal from "@/components/Reveal";
import { featuredArticles } from "./media-hub-data";
import MediaHubExternalButton from "./MediaHubExternalButton";
import { ExternalLinkIcon } from "./MediaHubIcons";
import MediaHubInner from "./MediaHubInner";
import MediaHubSectionTitle from "./MediaHubSectionTitle";

export default function MediaHubNewsSection() {
  return (
    <section className="relative overflow-hidden bg-[radial-gradient(circle_at_12%_8%,rgba(31,168,244,0.08),transparent_24rem),linear-gradient(180deg,#fff,#eaf9ff_48%,#fff)] py-[clamp(86px,11vw,145px)] max-[767px]:py-14">
      <HeartDoodle className="absolute -left-24 top-10 z-0 max-[620px]:hidden" size={340} rotate={-18} opacity={0.28} variant={1} />
      <HeartDoodle className="absolute right-[6%] bottom-12 z-0 max-[900px]:hidden" size={130} rotate={20} opacity={0.22} variant={2} />
      <MediaHubInner>
        <MediaHubSectionTitle>
          <span className="block whitespace-nowrap text-[clamp(38px,5.4vw,76px)] max-[620px]:whitespace-normal">Little Ark in the News</span>
        </MediaHubSectionTitle>
        <div className="grid grid-cols-3 gap-5 max-[900px]:grid-cols-1">
          {featuredArticles.map((article) => (
            <Reveal as="article" key={article.title} className="h-full">
              <Card className="h-full gap-0 rounded-3xl border border-[rgba(31,168,244,0.14)] bg-white p-0 shadow-[0_18px_46px_rgba(31,168,244,0.11)] transition duration-200 ease-out hover:-translate-y-1.5 hover:shadow-[0_24px_58px_rgba(31,168,244,0.18)]">
                <a href={article.url} target="_blank" rel="noopener noreferrer" aria-label={`Read ${article.title} from ${article.publication}`} className="group flex h-full flex-col focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#c8f4ff]">
                  <span className="relative block aspect-[1.25] overflow-hidden rounded-t-3xl bg-[#eaf9ff]">
                    <Image src={article.imagePath} alt={`${article.title} article thumbnail`} fill sizes="(max-width: 900px) 100vw, 33vw" className="object-cover" />
                  </span>
                  <span className="flex grow flex-col p-[22px]">
                    <span className="text-xs font-black uppercase tracking-[0.08em] text-[#008fe4]">{article.publicationDate} / {article.publication}</span>
                    <h3 className="m-0 mt-3 text-2xl font-black leading-[1.04] text-[#1fa8f4]">{article.title}</h3>
                    <span className="mt-3 text-sm font-bold leading-[1.4] text-[#557086]">By {article.author}</span>
                    <span className="mt-auto inline-flex items-center gap-2 pt-6 text-xs font-black uppercase tracking-[0.08em] text-[#008fe4] transition group-hover:translate-x-1 group-focus-visible:translate-x-1">Read Article <ExternalLinkIcon /></span>
                  </span>
                </a>
              </Card>
            </Reveal>
          ))}
        </div>
      </MediaHubInner>
    </section>
  );
}
