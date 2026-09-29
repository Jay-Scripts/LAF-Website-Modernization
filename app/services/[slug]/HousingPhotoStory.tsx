"use client";

import Image from "next/image";
import Reveal from "@/components/Reveal";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

type Photo = { src: string; alt: string };

const chapters = [
  {
    number: "01",
    title: "A welcome at the door",
    description: "Shared spaces give families room to arrive, settle in, and feel at ease.",
    tone: "bg-[#f0f8fc]",
    photos: ["housing-reception.jpg", "IMG_1048.webp", "IMG_1049.webp", "IMG_1051.webp", "IMG_1061.webp", "IMG_8944.webp", "IMG_8933.webp"],
    labels: ["Shared living area", "Welcome desk", "Living room", "Dining area", "Upstairs landing", "Gathering space", "Household supplies"],
  },
  {
    number: "02",
    title: "Space to rest",
    description: "Quiet bedrooms offer a place to pause between hospital visits.",
    tone: "bg-white",
    photos: ["housing-bedroom.png", "IMG_1816.webp", "IMG_1821.webp", "IMG_1826.webp", "IMG_8927.webp"],
    labels: ["Bedroom", "Ocean mural bedroom", "Garden mural bedroom", "Children’s bedroom", "Rest space"],
  },
  {
    number: "03",
    title: "Room to be a child",
    description: "Books, toys, and playful corners make everyday moments possible.",
    tone: "bg-[#f0f8fc]",
    photos: ["housing-activity-room.png", "IMG_9075.webp", "IMG_9083.webp", "IMG_1949.webp"],
    labels: ["Activity room", "Play area", "Books and toys", "Reading corner"],
  },
  {
    number: "04",
    title: "A breath of fresh air",
    description: "The little garden offers a calm place to sit and reconnect.",
    tone: "bg-white",
    photos: ["IMG_3322.webp", "IMG_1946.webp", "IMG_1947.webp", "IMG_1055.webp"],
    labels: ["Garden seating", "Garden plants", "Garden table", "Garden path"],
  },
];

function PhotoTile({ photo, label, featured = false, wide = false }: { photo: Photo; label: string; featured?: boolean; wide?: boolean }) {
  return (
    <figure className={`m-0 min-w-0 ${featured ? "col-span-2 md:row-span-2" : wide ? "md:col-span-2" : ""}`}>
      <Dialog>
        <DialogTrigger aria-label={`View ${label}`} className={`group relative block w-full cursor-zoom-in overflow-hidden bg-[#dceef7] outline-offset-4 focus-visible:outline-2 focus-visible:outline-[#0068b5] ${featured ? "aspect-[4/3] rounded-t-[clamp(90px,14vw,180px)] rounded-b-2xl md:aspect-auto md:h-full" : "aspect-[4/3] rounded-2xl"}`}>
          <Image src={photo.src} alt={photo.alt} fill unoptimized sizes={featured ? "(min-width: 768px) 55vw, 100vw" : "(min-width: 768px) 25vw, 50vw"} className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04] motion-reduce:transition-none" />
          <span className="absolute bottom-4 right-4 grid h-9 w-9 place-items-center rounded-full bg-white/90 text-xl font-light text-[#082f59] opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100" aria-hidden="true">+</span>
        </DialogTrigger>
        <DialogContent className="max-h-[90dvh] overflow-y-auto bg-white p-4 sm:max-w-[1100px] sm:p-6 [&_[data-slot=dialog-close]]:min-h-11 [&_[data-slot=dialog-close]]:min-w-11">
          <DialogTitle className="pr-10 text-xl font-black text-[#082f59]">{label}</DialogTitle>
          <div className="relative h-[min(60dvh,650px)] w-full bg-[#edf6fa]">
            <Image src={photo.src} alt={photo.alt} fill unoptimized sizes="100vw" className="object-contain" />
          </div>
          <DialogDescription className="text-sm text-[#557086]">{photo.alt}</DialogDescription>
        </DialogContent>
      </Dialog>
      <figcaption className="mt-2 text-xs font-bold tracking-[0.04em] text-[#557086]">{label}</figcaption>
    </figure>
  );
}

export default function HousingPhotoStory({ images }: { images: Photo[] }) {
  const photoByName = new Map(images.map((image) => [image.src.split("/").pop(), image]));

  return (
    <div className="-mx-[max(20px,calc((100vw-1220px)/2))]">
      {chapters.map((chapter) => (
        <section key={chapter.number} className={`${chapter.tone} px-5 py-[clamp(64px,8vw,112px)] sm:px-8`} aria-labelledby={`housing-chapter-${chapter.number}`}>
          <div className="mx-auto max-w-[1220px]">
            <Reveal style={{ filter: "none" }} className="mb-9 flex flex-col gap-5 md:mb-12 md:flex-row md:items-end md:justify-between md:gap-12">
              <div className="flex items-start gap-5 md:gap-8">
                <span className="border-t-2 border-[#21a9e8] pt-2 text-sm font-black text-[#1685bd]" aria-hidden="true">{chapter.number}</span>
                <h3 id={`housing-chapter-${chapter.number}`} className="m-0 max-w-[670px] text-[clamp(32px,4.2vw,56px)] font-black leading-[1.05] tracking-[-0.035em] text-[#082f59]">{chapter.title}</h3>
              </div>
              <p className="m-0 max-w-[320px] text-base leading-relaxed text-[#47677d] md:pb-1">{chapter.description}</p>
            </Reveal>
            <div className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-4">
              {chapter.photos.map((name, index) => {
                const photo = photoByName.get(name);
                if (!photo) return null;
                return (
                  <PhotoTile key={name} photo={photo} label={chapter.labels[index]} featured={index === 0} wide={(chapter.photos.length === 7 && index >= 5) || (chapter.photos.length === 4 && index === 3)} />
                );
              })}
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}
