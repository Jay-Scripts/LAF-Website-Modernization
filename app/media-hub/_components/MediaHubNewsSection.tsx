import Image from "next/image";
import Reveal from "@/components/Reveal";
import { featuredArticles } from "./media-hub-data";
import { ExternalLinkIcon } from "./MediaHubIcons";
import MediaHubInner from "./MediaHubInner";

export default function MediaHubNewsSection() {
  return (
    <section aria-labelledby="media-news-title" className="bg-white py-14 text-[#082f59] sm:py-20">
      <style>{`
        @keyframes media-news-image-swipe {
          from { clip-path: inset(0 100% 0 0); transform: scale(1.05); }
          to { clip-path: inset(0); transform: scale(1); }
        }
        .media-news-card[data-revealed="true"] .media-news-image {
          animation: media-news-image-swipe 1100ms cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        @media (prefers-reduced-motion: reduce) {
          .media-news-card .media-news-image { animation: none !important; }
        }
      `}</style>
      <MediaHubInner>
        <Reveal as="div"><h2 id="media-news-title" className="m-0 mb-9 border-b border-[#cbdfe9] pb-6 text-[clamp(32px,4vw,50px)] font-black leading-tight text-[#082f59]">
          Little Ark in the News
        </h2></Reveal>
        <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:gap-x-10 lg:gap-y-0">
          {featuredArticles.map((article, index) => (
            <Reveal as="article" key={article.title} delay={index * 180} className={`media-news-card ${index === 0 ? "min-w-0 lg:row-span-2 lg:border-r lg:border-[#cbdfe9] lg:pr-10" : "min-w-0 border-t border-[#cbdfe9] pt-7 lg:first-of-type:border-t-0 lg:[&:nth-child(2)]:border-t-0 lg:[&:nth-child(2)]:pb-7 lg:[&:nth-child(2)]:pt-0"}`}>
                <a href={article.url} target="_blank" rel="noopener noreferrer" aria-label={`Read ${article.title} from ${article.publication} (opens in a new tab)`} className={`group grid h-full gap-5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0068b5] ${index === 0 ? "content-start" : "sm:grid-cols-[minmax(0,0.75fr)_minmax(0,1fr)] sm:gap-6"}`}>
                  <span className={`media-news-image relative block overflow-hidden bg-[#edf6fa] ${index === 0 ? "aspect-[3/2]" : "aspect-[3/2] sm:aspect-[4/5]"}`}>
                    <Image src={article.imagePath} alt={`${article.title} article thumbnail`} fill sizes={index === 0 ? "(min-width: 1024px) 600px, 100vw" : "(min-width: 1024px) 230px, (min-width: 640px) 40vw, 100vw"} className={index > 0 ? "object-contain" : "object-cover"} />
                  </span>
                  <span className="flex min-w-0 flex-col items-start">
                    <span className="text-xs font-bold leading-relaxed text-[#557086]">{article.publication} <span aria-hidden="true">·</span> {article.publicationDate}</span>
                    <h3 className={`m-0 mt-3 font-black leading-[1.15] text-[#082f59] group-hover:underline group-hover:decoration-[#0068b5] group-hover:underline-offset-4 ${index === 0 ? "text-[clamp(25px,2.5vw,34px)]" : "text-[clamp(21px,2vw,26px)]"}`}>{article.title}</h3>
                    <span className="mt-3 text-sm leading-relaxed text-[#557086]">By {article.author}</span>
                    <span className="mt-5 inline-flex min-h-11 items-center gap-2 text-sm font-bold text-[#0068b5]">Read article <ExternalLinkIcon /></span>
                  </span>
                </a>
            </Reveal>
          ))}
        </div>
      </MediaHubInner>
    </section>
  );
}
