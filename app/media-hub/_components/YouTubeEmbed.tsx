"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

export default function YouTubeEmbed({ videoId, title }: { videoId: string; title: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
    <DialogTrigger className="group relative h-full w-full cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-white" aria-label={`Play ${title}`}>
      <span aria-hidden="true" className="block h-full w-full bg-cover bg-center" style={{ backgroundImage: `url(https://i.ytimg.com/vi/${videoId}/hqdefault.jpg)` }} />
      <span className="absolute inset-0 grid place-items-center bg-black/10 transition-colors duration-200 group-hover:bg-black/25 group-focus-visible:bg-black/25 motion-reduce:transition-none">
        <span className="grid h-14 w-14 place-items-center rounded-full bg-[#082f59]/85 text-xl text-white" aria-hidden="true">▶</span>
        <span aria-hidden="true" className="absolute bottom-3 left-3 bg-[#082f59]/90 px-3 py-2 text-sm font-bold text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100 motion-reduce:transition-none">Watch video</span>
      </span>
    </DialogTrigger>
    <DialogContent className="max-h-[90dvh] overflow-y-auto bg-white p-4 text-[#082f59] motion-reduce:animate-none sm:max-w-[960px] sm:p-6 [&_[data-slot=dialog-close]]:min-h-11 [&_[data-slot=dialog-close]]:min-w-11">
      <DialogTitle className="pr-10 text-lg font-black leading-snug sm:text-xl">{title}</DialogTitle>
      <div className="aspect-video w-full overflow-hidden bg-black">
        {isOpen && <iframe key={videoId} className="h-full w-full border-0" src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&playsinline=1`} title={title} allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen />}
      </div>
      <DialogDescription className="text-sm leading-relaxed text-[#557086]">
        Trouble playing? <a href={`https://www.youtube.com/watch?v=${videoId}`} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center font-bold text-[#0068b5] underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0068b5]">Watch on YouTube<span className="sr-only"> (opens in a new tab)</span></a>
      </DialogDescription>
    </DialogContent>
    </Dialog>
  );
}
