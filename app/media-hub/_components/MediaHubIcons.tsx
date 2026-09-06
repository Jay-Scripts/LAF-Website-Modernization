import { ExternalLink, MessageCircle, Play, Share2, ThumbsUp } from "lucide-react";

export function FacebookIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path fill="currentColor" d="M14 8h3V4h-3c-3 0-5 2-5 5v2H6v4h3v7h4v-7h3l1-4h-4V9c0-.6.4-1 1-1Z" />
    </svg>
  );
}

export function ExternalLinkIcon({ className = "h-4 w-4" }: { className?: string }) {
  return <ExternalLink className={className} aria-hidden="true" />;
}

export function LikeIcon() {
  return <ThumbsUp className="h-[18px] w-[18px]" aria-hidden="true" />;
}

export function CommentIcon() {
  return <MessageCircle className="h-[18px] w-[18px]" aria-hidden="true" />;
}

export function ShareIcon() {
  return <Share2 className="h-[18px] w-[18px]" aria-hidden="true" />;
}

export function PlayIcon() {
  return <Play className="h-8 w-8 translate-x-0.5" fill="currentColor" aria-hidden="true" />;
}
