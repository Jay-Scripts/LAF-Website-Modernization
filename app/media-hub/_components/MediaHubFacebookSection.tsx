import Image from "next/image";
import { Card } from "@/components/ui/card";
import { HeartDoodle } from "@/components/BrandHearts";
import Reveal from "@/components/Reveal";
import { facebookPageUrl, facebookProfileImage, type FacebookPost, isPublicLink } from "./media-hub-data";
import { CommentIcon, ExternalLinkIcon, FacebookIcon, LikeIcon, PlayIcon, ShareIcon } from "./MediaHubIcons";
import MediaHubExternalButton from "./MediaHubExternalButton";
import MediaHubInner from "./MediaHubInner";

function FacebookEngagement({ post }: { post: FacebookPost }) {
  if ([post.likes, post.comments, post.shares].every((count) => typeof count !== "number")) return null;

  return (
    <span className="mt-5 flex items-center justify-center gap-5 border-t border-[#e5edf3] pt-4 text-sm font-bold text-[#667788]">
      <span className="inline-flex items-center gap-1.5" aria-label={`${post.likes ?? 0} likes`}><LikeIcon />{post.likes ?? 0}</span>
      <span className="inline-flex items-center gap-1.5" aria-label={`${post.comments ?? 0} comments`}><CommentIcon />{post.comments ?? 0}</span>
      <span className="inline-flex items-center gap-1.5" aria-label={`${post.shares ?? 0} shares`}><ShareIcon />{post.shares ?? 0}</span>
    </span>
  );
}

function FacebookPostCard({ post }: { post: FacebookPost }) {
  const isVideo = post.mediaType?.includes("video");

  return (
    <Reveal as="article" className="h-full">
      <Card className="h-full gap-0 overflow-hidden rounded-[24px] border-0 bg-white p-0 shadow-[0_16px_42px_rgba(31,168,244,0.1)] transition duration-200 ease-out hover:-translate-y-1 hover:shadow-[0_22px_54px_rgba(31,168,244,0.16)]">
        <a href={post.href} target="_blank" rel="noopener noreferrer" aria-label="Open this Little Ark Foundation Facebook post" className="group flex h-full flex-col focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#c8f4ff]">
          <span className="flex items-center gap-3 px-5 pb-4 pt-5">
            <span className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full bg-[#eaf9ff] ring-2 ring-[#c8f4ff]"><Image src={facebookProfileImage} alt="" fill sizes="44px" className="object-contain p-1" /></span>
            <span className="min-w-0"><span className="block truncate text-[17px] font-black leading-tight text-[#008fe4]">Little Ark Foundation</span><span className="block text-sm font-semibold leading-tight text-[#8a99a8]">{post.createdAt}</span></span>
          </span>
          {post.imageUrl ? (
            <span className="relative mx-5 block aspect-[1.02] overflow-hidden rounded-[8px] bg-[#eaf9ff] max-[680px]:aspect-[1.18]">
              <img src={post.imageUrl} alt="Little Ark Foundation Facebook post" loading="lazy" className="h-full w-full object-cover" />
              {isVideo ? <span className="absolute inset-0 grid place-items-center bg-black/10"><span className="grid h-16 w-16 place-items-center rounded-[18px] bg-black/55 text-white"><PlayIcon /></span></span> : null}
            </span>
          ) : (
            <span className="mx-5 grid aspect-[1.02] place-items-center rounded-[8px] bg-[linear-gradient(135deg,#008fe4,#1fa8f4)] text-white max-[680px]:aspect-[1.18]"><FacebookIcon className="h-16 w-16" /></span>
          )}
          <span className="flex grow flex-col px-6 pb-6 pt-5 text-center">
            <p className="mx-auto line-clamp-6 max-w-[34ch] text-[clamp(18px,2vw,24px)] font-semibold leading-[1.32] text-[#1f2d3a]">{post.caption}</p>
            <FacebookEngagement post={post} />
            <span className="mx-auto mt-auto inline-flex items-center gap-2 pt-6 text-xs font-black uppercase tracking-[0.08em] text-[#008fe4] transition group-hover:translate-x-1 group-focus-visible:translate-x-1">View on Facebook <ExternalLinkIcon /></span>
          </span>
        </a>
      </Card>
    </Reveal>
  );
}

function FacebookFeedUnavailable() {
  return (
    <Reveal className="mx-auto flex w-[min(720px,100%)] items-center gap-5 rounded-[22px] border border-[#d8effb] bg-[#f5fbff] p-[clamp(22px,4vw,34px)] shadow-[0_14px_34px_rgba(31,168,244,0.08)] max-[620px]:flex-col max-[620px]:text-center">
      <span className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full bg-white ring-2 ring-[#c8f4ff]"><Image src={facebookProfileImage} alt="" fill sizes="64px" className="object-contain p-1.5" /></span>
      <div><h3 className="m-0 text-xl font-black text-[#008fe4]">Little Ark Foundation on Facebook</h3><p className="mb-0 mt-2 text-base font-semibold leading-[1.5] text-[#557086]">Our latest updates are available on our official Facebook page.</p></div>
    </Reveal>
  );
}

export default function MediaHubFacebookSection({ posts }: { posts: FacebookPost[] | null }) {
  const hasDynamicPosts = posts && posts.length > 0;

  return (
    <section className="relative overflow-hidden bg-white py-[clamp(78px,9vw,120px)]">
      <HeartDoodle className="absolute -left-28 top-16 z-0 max-[620px]:hidden" size={320} rotate={-16} opacity={0.12} variant={0} />
      <HeartDoodle className="absolute bottom-10 right-[8%] z-0 max-[900px]:hidden" size={110} rotate={20} opacity={0.14} variant={2} />
      <MediaHubInner className="w-[min(1540px,calc(100%_-_40px))]">
        <Reveal className="mx-auto mb-[clamp(48px,6vw,82px)] max-w-[820px] text-center"><h2 className="m-0 text-[clamp(32px,3vw,44px)] font-black leading-none text-[#1f2d3a]">Latest Feed in Facebook</h2><p className="sr-only">Follow the newest stories, program updates, and moments of hope from Little Ark Foundation.</p></Reveal>
        {hasDynamicPosts ? <div className="grid grid-cols-3 gap-[clamp(24px,4vw,56px)] max-[1080px]:grid-cols-2 max-[720px]:grid-cols-1">{posts.map((post) => <FacebookPostCard key={post.id} post={post} />)}</div> : <FacebookFeedUnavailable />}
        {isPublicLink(facebookPageUrl) ? <Reveal className="mt-10 text-center"><MediaHubExternalButton href={facebookPageUrl}>View all on Facebook</MediaHubExternalButton></Reveal> : null}
      </MediaHubInner>
    </section>
  );
}
