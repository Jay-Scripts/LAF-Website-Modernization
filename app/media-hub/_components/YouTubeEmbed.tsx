"use client";

import { useState } from "react";

export default function YouTubeEmbed({ videoId, title }: { videoId: string; title: string }) {
  const [isLoaded, setIsLoaded] = useState(false);

  if (isLoaded) {
    return <iframe className="h-full w-full" src={`https://www.youtube.com/embed/${videoId}?autoplay=1`} title={title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen />;
  }

  return (
    <button type="button" className="group relative h-full w-full" onClick={() => setIsLoaded(true)} aria-label={`Play ${title}`}>
      <span aria-hidden="true" className="block h-full w-full bg-cover bg-center" style={{ backgroundImage: `url(https://i.ytimg.com/vi/${videoId}/hqdefault.jpg)` }} />
      <span className="absolute inset-0 grid place-items-center bg-black/20 transition group-hover:bg-black/35">
        <span className="grid h-16 w-16 place-items-center rounded-full bg-[#ff0033] text-2xl text-white shadow-lg" aria-hidden="true">▶</span>
      </span>
    </button>
  );
}
