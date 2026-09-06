import { Card } from "@/components/ui/card";
import { HeartDoodle } from "@/components/BrandHearts";
import Reveal from "@/components/Reveal";
import { isPublicLink, mediaHubLinks, youtubeVideos } from "./media-hub-data";
import MediaHubExternalButton from "./MediaHubExternalButton";
import MediaHubInner from "./MediaHubInner";
import MediaHubSectionTitle from "./MediaHubSectionTitle";

export default function MediaHubVideoSection() {
  return (
    <section className="relative overflow-hidden bg-[radial-gradient(circle_at_12%_8%,rgba(31,168,244,0.1),transparent_24rem),linear-gradient(180deg,#fff,#eaf9ff_54%,#fff)] py-[clamp(86px,11vw,145px)]">
      <HeartDoodle className="absolute -right-24 top-16 z-0 max-[620px]:hidden" size={380} rotate={18} opacity={0.26} variant={2} />
      <HeartDoodle className="absolute left-[8%] bottom-10 z-0 max-[900px]:hidden" size={120} rotate={-14} opacity={0.22} variant={0} />
      <MediaHubInner>
        <MediaHubSectionTitle>
          <span className="block whitespace-nowrap text-[clamp(38px,5.4vw,76px)] max-[620px]:whitespace-normal">Videos from YouTube</span>
        </MediaHubSectionTitle>
        <div className="grid grid-cols-3 gap-5 max-[980px]:grid-cols-2 max-[680px]:grid-cols-1">
          {youtubeVideos.map((video) => (
            <Reveal as="article" key={video.videoId} className="h-full">
              <Card className="h-full gap-0 overflow-hidden rounded-[26px] border border-[rgba(31,168,244,0.14)] bg-white p-0 shadow-[0_18px_46px_rgba(31,168,244,0.11)]">
                <div className="aspect-video overflow-hidden bg-[#08233d]">
                  <iframe className="h-full w-full" src={`https://www.youtube.com/embed/${video.videoId}`} title={`YouTube video: ${video.title}`} loading="lazy" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen />
                </div>
                <div className="p-[18px]"><h3 className="m-0 text-lg font-black leading-[1.16] text-[#1fa8f4]">{video.title}</h3></div>
              </Card>
            </Reveal>
          ))}
        </div>
        {isPublicLink(mediaHubLinks.youtubeUrl) ? <Reveal className="mt-10 text-center"><MediaHubExternalButton href={mediaHubLinks.youtubeUrl}>Visit our YouTube channel</MediaHubExternalButton></Reveal> : null}
      </MediaHubInner>
    </section>
  );
}
