"use client";

import Image from "next/image";
import Reveal from "@/components/Reveal";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const captions = ["Bedrooms", "Activity room", "Reception"];

export default function HousingPhotoStory({ images }: { images: { src: string; alt: string }[] }) {
  return (
    <div className="grid gap-x-7 gap-y-9 md:grid-cols-12">
      {images.map((image, index) => (
        <Reveal key={image.src} direction={index === 1 ? "right" : "left"} delay={index * 140} style={{ filter: "none" }} className={`min-w-0 !duration-[950ms] ${index === 0 ? "md:col-span-7" : index === 1 ? "md:col-span-5" : "w-full max-w-[900px] justify-self-center md:col-span-12"}`}>
        <figure className="m-0">
          <Dialog>
            <DialogTrigger aria-label={`View ${captions[index] ?? "Inside the Little Ark home"} photo`} className={`group relative block w-full cursor-zoom-in overflow-hidden rounded-lg bg-[#edf6fa] outline-offset-4 hover:outline hover:outline-1 hover:outline-[#cbdfe9] focus-visible:outline-2 focus-visible:outline-[#0068b5] ${index === 2 ? "aspect-[1178/838]" : "aspect-[4/3]"}`}>
              <Image src={image.src} alt={image.alt} fill unoptimized sizes="(min-width: 768px) 70vw, 100vw" className={`object-cover ${index === 1 ? "hearts-photo-right" : "hearts-photo-left"}`} />
            </DialogTrigger>
            <DialogContent className="max-h-[90dvh] overflow-y-auto bg-white p-4 sm:max-w-[1100px] sm:p-6 [&_[data-slot=dialog-close]]:min-h-11 [&_[data-slot=dialog-close]]:min-w-11">
              <DialogTitle className="pr-10 text-xl font-black leading-snug text-[#082f59]">{captions[index] ?? "Inside the Little Ark home"}</DialogTitle>
              <div className="relative h-[min(60dvh,650px)] w-full bg-[#edf6fa]">
                <Image src={image.src} alt={image.alt} fill unoptimized sizes="100vw" className="object-contain" />
              </div>
              <DialogDescription className="text-sm leading-relaxed text-[#557086]">{image.alt}</DialogDescription>
            </DialogContent>
          </Dialog>
          <figcaption className="mt-3 text-sm font-bold leading-relaxed text-[#557086]">
            {captions[index] ?? "Inside the Little Ark home"}
          </figcaption>
        </figure>
        </Reveal>
      ))}
    </div>
  );
}
