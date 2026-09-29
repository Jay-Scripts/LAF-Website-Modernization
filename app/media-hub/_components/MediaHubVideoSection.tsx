import { isPublicLink, mediaHubLinks, youtubeVideos } from "./media-hub-data";
import Reveal from "@/components/Reveal";
import MediaHubExternalButton from "./MediaHubExternalButton";
import MediaHubInner from "./MediaHubInner";
import YouTubeEmbed from "./YouTubeEmbed";

export default function MediaHubVideoSection() {
  return (
    <section aria-labelledby="media-videos-title" className="border-t border-[#cbdfe9] bg-white py-14 text-[#082f59] sm:py-20">
      <MediaHubInner>
        <Reveal><h2 id="media-videos-title" className="m-0 mb-9 border-b border-[#cbdfe9] pb-6 text-[clamp(32px,4vw,50px)] font-black leading-tight text-[#082f59]">Videos from YouTube</h2></Reveal>
        <div className="grid grid-cols-1 gap-x-7 gap-y-9 sm:grid-cols-2 lg:grid-cols-3">
          {youtubeVideos.map((video, index) => (
            <Reveal as="article" key={video.videoId} delay={(index % 3) * 160} className="min-w-0 border-b border-[#cbdfe9] pb-6">
                <div className="aspect-video overflow-hidden bg-[#08233d]">
                  <YouTubeEmbed videoId={video.videoId} title={`YouTube video: ${video.title}`} />
                </div>
                <h3 className="m-0 mt-4 text-xl font-black leading-snug text-[#082f59]">{video.title}</h3>
            </Reveal>
          ))}
        </div>
        {isPublicLink(mediaHubLinks.youtubeUrl) ? <div className="mt-9"><MediaHubExternalButton href={mediaHubLinks.youtubeUrl}>Visit our YouTube channel</MediaHubExternalButton></div> : null}
      </MediaHubInner>
    </section>
  );
}
