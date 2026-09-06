"use client";

import Image from "next/image";
import { ChevronLeftIcon, ChevronRightIcon, Maximize2Icon } from "lucide-react";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import Reveal from "@/components/Reveal";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";

type TimelinePhoto = {
  sourceName: string;
  src?: string;
  alt: string;
  aspectRatio?: number;
  objectPosition?: string;
  zoom?: number;
  offsetY?: string;
};

type TimelineMilestone = {
  date: string;
  title: string;
  description: string;
  photos: readonly TimelinePhoto[];
};

const milestones: readonly TimelineMilestone[] = [
  {
    date: "2021",
    title: "Little Ark Foundation Is Established",
    description:
      "Little Ark became a registered nonprofit in the United States and the Philippines, laying the foundation for the work ahead.",
    photos: [],
  },
  {
    date: "March 11, 2024",
    title: "Our Journey with National Children’s Hospital Begins",
    description:
      "Little Ark signed its Memorandum of Agreement with National Children’s Hospital and immediately began providing housing, meals, and transportation to help families stay close to treatment.",
    photos: [
      {
        sourceName: "IMG_0389 2.jpg",
        src: "/images/our-voyage/timeline/march-11-2024/moa-signing.jpg",
        alt: "Little Ark Foundation and National Children’s Hospital representatives signing their agreement",
        aspectRatio: 1093 / 600,
      },
      {
        sourceName: "IMG_0363.HEIC",
        src: "/images/our-voyage/timeline/march-11-2024/img-0363.jpg",
        alt: "Little Ark Foundation and National Children’s Hospital representatives gathered after the agreement signing",
        aspectRatio: 4 / 3,
      },
      {
        sourceName: "Copy of DS BCCC.png",
        src: "/images/our-voyage/timeline/march-11-2024/family-housing.png",
        alt: "Children and caregivers resting in Little Ark temporary housing",
        aspectRatio: 557 / 424,
        zoom: 1.12,
        offsetY: "5%",
      },
      {
        sourceName: "IMG_0252.HEIC",
        src: "/images/our-voyage/timeline/march-11-2024/img-0252.jpg",
        alt: "Children sharing a meal during their stay with Little Ark Foundation",
        aspectRatio: 3 / 4,
      },
      {
        sourceName: "Hope in Transit old.jpg",
        src: "/images/our-voyage/timeline/march-11-2024/hope-in-transit.jpg",
        alt: "The vehicle originally used to transport children and families to treatment",
        aspectRatio: 598 / 381,
        zoom: 1.24,
        offsetY: "5%",
      },
    ],
  },
  {
    date: "November 11, 2024",
    title: "Care Cart Launches",
    description:
      "Ruru Madrid donated the Care Cart to Little Ark Foundation, launching a program at National Children’s Hospital that brings free meals and drinks directly to patients and caregivers during long hospital days.",
    photos: [
      {
        sourceName: "JAY02778.jpeg",
        src: "/images/our-voyage/timeline/november-11-2024/jay02778.jpg",
        alt: "Ruru Madrid standing beside the donated Little Ark Care Cart",
        aspectRatio: 2 / 3,
      },
      {
        sourceName: "JAY02799.jpeg",
        src: "/images/our-voyage/timeline/november-11-2024/jay02799.jpg",
        alt: "Little Ark Foundation partners gathered with the donated Care Cart",
        aspectRatio: 3 / 2,
      },
      {
        sourceName: "Screenshot 2026-08-22 at 11.49.14 PM.png",
        src: "/images/our-voyage/timeline/november-11-2024/care-cart-team-portrait.jpg",
        alt: "Care Cart supporters gathered behind the cart with meal donations",
        aspectRatio: 1356 / 1426,
      },
      {
        sourceName: "Screenshot 2026-08-22 at 11.48.52 PM.png",
        src: "/images/our-voyage/timeline/november-11-2024/care-cart-meal-service.jpg",
        alt: "Little Ark Foundation team members gathered with Care Cart meal donations",
        aspectRatio: 1818 / 1302,
      },
    ],
  },
  {
    date: "December 1, 2024",
    title: "More Room to Care",
    description:
      "Little Ark moved into a larger condo unit, increasing its bed capacity and giving children a small space where they could play.",
    photos: [
      {
        sourceName: "IMG_8927.HEIC",
        src: "/images/our-voyage/timeline/december-1-2024/more-room-8927.jpg",
        alt: "A children’s sleeping room with several prepared beds",
        aspectRatio: 4 / 3,
      },
      {
        sourceName: "IMG_8933.HEIC",
        src: "/images/our-voyage/timeline/december-1-2024/more-room-8933.jpg",
        alt: "Food, household supplies, and storage shelves inside the larger condo unit",
        aspectRatio: 4 / 3,
      },
      {
        sourceName: "IMG_8944.HEIC",
        src: "/images/our-voyage/timeline/december-1-2024/more-room-8944.jpg",
        alt: "A small children’s play area inside the larger condo unit",
        aspectRatio: 4 / 3,
      },
    ],
  },
  {
    date: "March 31, 2025",
    title: "Hope in Transit Arrives",
    description:
      "Senator Raffy Tulfo donated Little Ark’s first dedicated patient transport vehicle, providing families with safe and reliable rides to treatment.",
    photos: [
      {
        sourceName: "Copy of 20250331_102152.jpg",
        src: "/images/our-voyage/timeline/march-31-2025/hope-in-transit-ceremony.jpg",
        alt: "Little Ark Foundation and hospital representatives gathered with the Hope in Transit vehicle",
        aspectRatio: 4 / 3,
      },
      {
        sourceName: "Copy of IMG_1039.JPG",
        src: "/images/our-voyage/timeline/march-31-2025/vehicle-unveiling.jpg",
        alt: "Hope in Transit vehicle unveiling with Little Ark Foundation and hospital representatives",
        aspectRatio: 4 / 3,
      },
      {
        sourceName: "IMG_4968.HEIC",
        src: "/images/our-voyage/timeline/march-31-2025/hope-in-transit-third.jpg",
        alt: "Children, families, and Little Ark Foundation supporters gathered beside the Hope in Transit vehicle",
        aspectRatio: 4 / 3,
      },
    ],
  },
  {
    date: "September 30, 2025",
    title: "LAF Center Opens",
    description:
      "The LAF Center opened inside National Children’s Hospital, giving children a place to play, learn, and enjoy activities while waiting for treatment.",
    photos: [
      {
        sourceName: "IMG_9075.HEIC",
        src: "/images/our-voyage/timeline/september-30-2025/laf-center-9075.jpg",
        alt: "The completed LAF Center learning and activity space",
        aspectRatio: 4 / 3,
      },
      {
        sourceName: "IMG_9083.HEIC",
        src: "/images/our-voyage/timeline/september-30-2025/laf-center-9083.jpg",
        alt: "The LAF Center activity space with books, toys, tables, and an ark mural",
        aspectRatio: 4 / 3,
      },
      {
        sourceName: "IMG_9102.HEIC",
        src: "/images/our-voyage/timeline/september-30-2025/laf-center-9102.jpg",
        alt: "Hospital and Little Ark Foundation representatives gathered inside the LAF Center",
        aspectRatio: 4 / 3,
      },
      {
        sourceName: "IMG_9203.HEIC",
        src: "/images/our-voyage/timeline/september-30-2025/laf-center-9203.jpg",
        alt: "Children and families gathered inside the LAF Center",
        aspectRatio: 4 / 3,
      },
    ],
  },
  {
    date: "November 15, 2025",
    title: "Finally, A Home",
    description:
      "Little Ark moved into a bigger home closer to NCH, allowing us to welcome more families and support them throughout treatment.",
    photos: [
      {
        sourceName: "Little Ark House (1).PNG",
        src: "/images/our-voyage/timeline/november-15-2025/little-ark-house-exterior.jpg",
        alt: "The exterior of the Little Ark Foundation home",
        aspectRatio: 4 / 3,
      },
      {
        sourceName: "DS BCCC (3).png",
        src: "/images/our-voyage/timeline/november-15-2025/little-ark-house-interior.jpg",
        alt: "The reception and common area inside the Little Ark Foundation home",
        aspectRatio: 2400 / 1749,
        zoom: 1.12,
      },
      {
        sourceName: "IMG_1821.HEIC",
        src: "/images/our-voyage/timeline/november-15-2025/little-ark-home-1821.jpg",
        alt: "A family bedroom inside the Little Ark Foundation home",
        aspectRatio: 4 / 3,
      },
      {
        sourceName: "IMG_1826 2.HEIC",
        src: "/images/our-voyage/timeline/november-15-2025/little-ark-home-1826.jpg",
        alt: "A family bedroom with an underwater mural inside the Little Ark Foundation home",
        aspectRatio: 4 / 3,
      },
      {
        sourceName: "IMG_1816.HEIC",
        src: "/images/our-voyage/timeline/november-15-2025/little-ark-home-1816.jpg",
        alt: "Beds and a colorful mural inside the Little Ark Foundation home",
        aspectRatio: 4 / 3,
      },
      {
        sourceName: "IMG_9506.JPG",
        src: "/images/our-voyage/timeline/november-15-2025/little-ark-home-9506.jpg",
        alt: "Children and caregivers gathered inside the Little Ark Foundation home",
        aspectRatio: 3 / 4,
        zoom: 1.12,
      },
    ],
  },
];

function MilestoneGallery({
  photos,
  title,
  direction,
  className = "",
}: {
  photos: readonly TimelinePhoto[];
  title: string;
  direction: "left" | "right";
  className?: string;
}) {
  const galleryRef = useRef<HTMLDivElement>(null);
  const resumeGalleryAtRef = useRef(0);
  const galleryOffsetRef = useRef(0);
  const [previewIndex, setPreviewIndex] = useState<number | null>(null);
  const previewPhoto = previewIndex === null ? null : photos[previewIndex];
  const previewNumber = previewIndex === null ? 0 : previewIndex + 1;
  const loopingPhotos = [...photos, ...photos];

  const pauseGalleryBriefly = () => {
    resumeGalleryAtRef.current = -1;
  };

  const move = (direction: -1 | 1) => {
    const gallery = galleryRef.current;
    if (!gallery) return;
    pauseGalleryBriefly();
    gallery.scrollBy({
      left: direction * gallery.clientWidth * 0.82,
      behavior: "smooth",
    });
  };

  const goTo = (index: number) => {
    const gallery = galleryRef.current;
    const target = gallery?.children.item(index) as HTMLElement | null;
    pauseGalleryBriefly();
    target?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "start",
    });
  };

  useEffect(() => {
    const gallery = galleryRef.current;
    if (
      !gallery ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;

    let frame = 0;
    let previousTime = 0;

    const drift = (time: number) => {
      if (resumeGalleryAtRef.current === -1)
        resumeGalleryAtRef.current = time + 1500;
      const isFirstFrame = previousTime === 0;
      const elapsed = Math.min(time - previousTime, 48);
      const firstRepeatedPhoto = gallery.children.item(
        photos.length,
      ) as HTMLElement | null;
      const firstPhoto = gallery.children.item(0) as HTMLElement | null;
      const loopDistance =
        firstRepeatedPhoto && firstPhoto
          ? firstRepeatedPhoto.offsetLeft - firstPhoto.offsetLeft
          : 0;

      if (isFirstFrame && direction === "right")
        galleryOffsetRef.current = loopDistance;
      previousTime = time;

      if (time >= resumeGalleryAtRef.current && loopDistance > 0) {
        galleryOffsetRef.current +=
          elapsed * 0.026 * (direction === "left" ? 1 : -1);
        if (galleryOffsetRef.current >= loopDistance)
          galleryOffsetRef.current -= loopDistance;
        if (galleryOffsetRef.current < 0)
          galleryOffsetRef.current += loopDistance;
        gallery.scrollLeft = galleryOffsetRef.current;
      }

      frame = window.requestAnimationFrame(drift);
    };

    frame = window.requestAnimationFrame(drift);
    return () => window.cancelAnimationFrame(frame);
  }, [direction, photos.length]);

  const movePreview = (direction: -1 | 1) => {
    setPreviewIndex((current) => {
      const currentIndex = current ?? 0;
      return (currentIndex + direction + photos.length) % photos.length;
    });
  };

  useEffect(() => {
    if (previewIndex === null) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
      const direction = event.key === "ArrowLeft" ? -1 : 1;
      setPreviewIndex(
        (current) =>
          ((current ?? 0) + direction + photos.length) % photos.length,
      );
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [previewIndex, photos.length]);

  return (
    <div className={`mt-5 ${className}`}>
      <div
        ref={galleryRef}
        className="flex h-[230px] items-start gap-3 overflow-hidden pb-2 max-[620px]:h-[210px]"
        aria-label={`${title} photo gallery`}
      >
        {loopingPhotos.map((photo, index) => (
          <button
            key={`${photo.sourceName}-${index}`}
            type="button"
            onClick={() => setPreviewIndex(index % photos.length)}
            aria-label={`Preview image ${(index % photos.length) + 1} of ${photos.length}`}
            className={`relative h-[218px] flex-none snap-start overflow-hidden rounded-[22px] border border-[rgba(31,168,244,0.14)] shadow-[0_14px_34px_rgba(31,168,244,0.12)] max-[620px]:h-[198px] max-[620px]:rounded-[18px] ${
              photo.src
                ? "bg-white"
                : "bg-[radial-gradient(circle_at_78%_16%,rgba(200,244,255,0.9),transparent_8rem),linear-gradient(145deg,#f7fdff,#dff6ff)]"
            } group cursor-zoom-in text-left transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_38px_rgba(0,104,201,0.18)] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#0068c9]`}
            style={{ aspectRatio: photo.aspectRatio ?? 4 / 3 }}
          >
            {photo.src ? (
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(max-width: 620px) calc(100vw - 72px), 420px"
                className="h-full w-full object-contain object-center"
                style={{
                  objectPosition: photo.objectPosition ?? "50% 50%",
                  transform:
                    photo.zoom || photo.offsetY
                      ? `translateY(${photo.offsetY ?? "0"}) scale(${photo.zoom ?? 1})`
                      : undefined,
                }}
              />
            ) : (
              <div
                className="grid h-full place-items-center"
                aria-hidden="true"
              >
                <svg
                  className="h-12 w-12 text-[#1fa8f4]/55"
                  viewBox="0 0 48 48"
                  fill="none"
                >
                  <rect
                    x="7"
                    y="10"
                    width="34"
                    height="28"
                    rx="5"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  />
                  <circle
                    cx="18"
                    cy="20"
                    r="3"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  />
                  <path
                    d="m11 34 9-9 6 6 5-5 6 8"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            )}
            <span
              className="absolute bottom-3 right-3 grid h-9 w-9 place-items-center rounded-full bg-[#005ba8]/88 text-white opacity-0 shadow-[0_6px_18px_rgba(0,50,100,0.24)] transition duration-300 group-hover:opacity-100 group-focus-visible:opacity-100 max-[620px]:opacity-100"
              aria-hidden="true"
            >
              <Maximize2Icon className="h-4 w-4" />
            </span>
          </button>
        ))}
      </div>

      <div className="mt-3 flex items-center justify-between gap-4">
        <div className="flex gap-0.5" aria-label="Choose gallery image">
          {photos.map((photo, index) => (
            <button
              key={photo.sourceName}
              type="button"
              onClick={() => goTo(index)}
              className="grid h-8 w-8 place-items-center rounded-full after:h-2.5 after:w-2.5 after:rounded-full after:bg-[#b8ddec] after:transition hover:after:bg-[#1fa8f4] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0068c9]"
              aria-label={`Show image ${index + 1} of ${photos.length}`}
            />
          ))}
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => move(-1)}
            className="grid h-11 w-11 place-items-center rounded-full border border-[#cce9f5] bg-white text-[#0068c9] shadow-[0_8px_20px_rgba(31,168,244,0.1)] transition hover:border-[#1fa8f4] hover:bg-[#eefaff] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0068c9]"
            aria-label="Previous gallery images"
          >
            <span aria-hidden="true">←</span>
          </button>
          <button
            type="button"
            onClick={() => move(1)}
            className="grid h-11 w-11 place-items-center rounded-full border border-[#cce9f5] bg-white text-[#0068c9] shadow-[0_8px_20px_rgba(31,168,244,0.1)] transition hover:border-[#1fa8f4] hover:bg-[#eefaff] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0068c9]"
            aria-label="Next gallery images"
          >
            <span aria-hidden="true">→</span>
          </button>
        </div>
      </div>

      <Dialog
        open={previewIndex !== null}
        onOpenChange={(open) => !open && setPreviewIndex(null)}
      >
        <DialogContent className="w-[min(1120px,calc(100%-24px))] max-w-none gap-0 overflow-hidden border border-[#c8f4ff]/25 bg-[#032d5c] p-0 text-white shadow-[0_28px_100px_rgba(0,45,92,0.48)] [&_[data-slot=dialog-close]]:right-4 [&_[data-slot=dialog-close]]:top-4 [&_[data-slot=dialog-close]]:z-20 [&_[data-slot=dialog-close]]:h-10 [&_[data-slot=dialog-close]]:w-10 [&_[data-slot=dialog-close]]:rounded-full [&_[data-slot=dialog-close]]:bg-[#005ba8]/90 [&_[data-slot=dialog-close]]:text-white [&_[data-slot=dialog-close]]:opacity-100 [&_[data-slot=dialog-close]]:hover:bg-[#1fa8f4] sm:max-w-none">
          {previewPhoto ? (
            <>
              <div className="relative flex h-[min(70svh,720px)] min-h-[300px] items-center justify-center overflow-hidden bg-[linear-gradient(135deg,#032d5c,#005ba8)] max-[620px]:h-[58svh] max-[620px]:min-h-[260px]">
                {previewPhoto.src ? (
                  <div
                    key={previewPhoto.sourceName}
                    className="voyage-preview-image absolute inset-0"
                  >
                    <Image
                      src={previewPhoto.src}
                      alt={previewPhoto.alt}
                      fill
                      sizes="(max-width: 620px) calc(100vw - 24px), 1120px"
                      className="object-contain"
                      style={{
                        objectPosition:
                          previewPhoto.objectPosition ?? "50% 50%",
                        transform:
                          previewPhoto.zoom || previewPhoto.offsetY
                            ? `translateY(${previewPhoto.offsetY ?? "0"}) scale(${previewPhoto.zoom ?? 1})`
                            : undefined,
                      }}
                    />
                  </div>
                ) : null}
                <button
                  type="button"
                  onClick={() => movePreview(-1)}
                  aria-label="Previous preview image"
                  className="absolute left-4 top-1/2 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-[#c8f4ff]/45 bg-[#005ba8]/90 text-white shadow-lg transition hover:scale-105 hover:bg-[#1fa8f4] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#c8f4ff] max-[620px]:left-3"
                >
                  <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => movePreview(1)}
                  aria-label="Next preview image"
                  className="absolute right-4 top-1/2 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-[#c8f4ff]/45 bg-[#005ba8]/90 text-white shadow-lg transition hover:scale-105 hover:bg-[#1fa8f4] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#c8f4ff] max-[620px]:right-3"
                >
                  <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
              <div className="flex items-center justify-between gap-5 border-t border-[#c8f4ff]/20 bg-[#005ba8]/35 px-6 py-4 max-[620px]:px-4">
                <div className="min-w-0">
                  <DialogTitle className="truncate text-[14px] font-black tracking-[0.01em] text-white">
                    {title}
                  </DialogTitle>
                  <DialogDescription className="mt-1 truncate text-[13px] font-medium text-[#c8f4ff]/80">
                    {previewPhoto.alt}
                  </DialogDescription>
                </div>
                <span
                  className="shrink-0 text-[12px] font-black tracking-[0.1em] text-white"
                  aria-live="polite"
                >
                  {String(previewNumber).padStart(2, "0")} /{" "}
                  {String(photos.length).padStart(2, "0")}
                </span>
              </div>
            </>
          ) : null}
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default function OurVoyageTimeline() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [timelineEntered, setTimelineEntered] = useState(false);
  const timelineRef = useRef<HTMLDivElement | null>(null);
  const milestoneRefs = useRef<Array<HTMLElement | null>>([]);

  useEffect(() => {
    const node = timelineRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setTimelineEntered(true);
        observer.unobserve(node);
      },
      { threshold: 0.08, rootMargin: "0px 0px -12% 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const index = Number(
            (entry.target as HTMLElement).dataset.milestoneIndex,
          );
          if (!Number.isNaN(index)) setActiveIndex(index);
        });
      },
      { rootMargin: "-18% 0px -56% 0px", threshold: 0.05 },
    );

    milestoneRefs.current.forEach((node) => {
      if (node) observer.observe(node);
    });

    return () => observer.disconnect();
  }, []);

  const jumpToMilestone = (index: number) => {
    const node = milestoneRefs.current[index];
    if (!node) return;

    node.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
      block: "center",
    });
  };

  const shortDate = (date: string) => {
    if (date === "HEARTS") return date;
    const parts = date.split(" ");
    return parts.length > 1
      ? `${parts[0].slice(0, 3)} ${parts[parts.length - 1]}`
      : date;
  };

  return (
    <div
      ref={timelineRef}
      data-entered={timelineEntered ? "true" : "false"}
      className="voyage-timeline relative mx-auto max-w-[1120px]"
    >
      <style>{`
        @keyframes voyage-spine-draw {
          from { opacity: 0; transform: translateX(-50%) scaleY(0); }
          to { opacity: 1; transform: translateX(-50%) scaleY(1); }
        }
        @keyframes voyage-marker-arrive {
          0% { opacity: 0; transform: scale(0.35); box-shadow: 0 0 0 0 rgba(255, 200, 61, 0.46); }
          62% { opacity: 1; transform: scale(1.2); box-shadow: 0 0 0 10px rgba(255, 200, 61, 0); }
          100% { opacity: 1; transform: scale(1); box-shadow: 0 5px 14px rgba(0, 104, 201, 0.24); }
        }
        @keyframes voyage-panel-arrive-left {
          from { opacity: 0; transform: translate3d(-24px, 12px, 0); filter: blur(4px); }
          to { opacity: 1; transform: translate3d(0, 0, 0); filter: blur(0); }
        }
        @keyframes voyage-panel-arrive-right {
          from { opacity: 0; transform: translate3d(24px, 12px, 0); filter: blur(4px); }
          to { opacity: 1; transform: translate3d(0, 0, 0); filter: blur(0); }
        }
        @keyframes voyage-preview-slide {
          from { opacity: 0; transform: translate3d(26px, 0, 0) scale(0.985); }
          to { opacity: 1; transform: translate3d(0, 0, 0) scale(1); }
        }
        .voyage-preview-image { animation: voyage-preview-slide 440ms cubic-bezier(0.22, 1, 0.36, 1) both; }
        .voyage-timeline-spine { transform: translateX(-50%) scaleY(0); transform-origin: top; opacity: 0; }
        .voyage-timeline[data-entered="true"] .voyage-timeline-spine { animation: voyage-spine-draw 1250ms cubic-bezier(0.22, 1, 0.36, 1) both; }
        .voyage-history-entry[data-revealed="true"] .voyage-history-marker { animation: voyage-marker-arrive 620ms cubic-bezier(0.22, 1, 0.36, 1) var(--timeline-delay) both; }
        .voyage-history-entry[data-revealed="true"] .voyage-history-card { animation: voyage-panel-arrive-left 760ms cubic-bezier(0.22, 1, 0.36, 1) calc(var(--timeline-delay) + 100ms) both; }
        .voyage-history-entry[data-revealed="true"] .voyage-history-gallery { animation: voyage-panel-arrive-right 760ms cubic-bezier(0.22, 1, 0.36, 1) calc(var(--timeline-delay) + 160ms) both; }
        @media (max-width: 767px) {
          .voyage-timeline-spine { transform: scaleY(0); }
          .voyage-timeline[data-entered="true"] .voyage-timeline-spine { animation-name: voyage-spine-draw-mobile; }
          @keyframes voyage-spine-draw-mobile { from { opacity: 0; transform: scaleY(0); } to { opacity: 1; transform: scaleY(1); } }
          .voyage-history-entry[data-revealed="true"] .voyage-history-card,
          .voyage-history-entry[data-revealed="true"] .voyage-history-gallery { animation-name: voyage-panel-arrive-right; }
        }
        @media (prefers-reduced-motion: reduce) {
          .voyage-timeline-spine,
          .voyage-history-entry[data-revealed="true"] .voyage-history-marker,
          .voyage-history-entry[data-revealed="true"] .voyage-history-card,
          .voyage-history-entry[data-revealed="true"] .voyage-history-gallery,
          .voyage-preview-image { animation: none !important; opacity: 1; transform: none; filter: none; }
        }
      `}</style>
      <div className="mb-10 flex items-end justify-between gap-6 border-b border-[#bfe7f6] pb-5 max-[620px]:mb-7 max-[620px]:block max-[620px]:pb-4">
        <div>
          <p className="m-0 text-[11px] font-black uppercase tracking-[0.18em] text-[#0068c9] max-[620px]:text-[10px]">
            Journey chapters
          </p>
          <h3 className="m-0 mt-2 text-[clamp(24px,3vw,38px)] font-black leading-none tracking-[-0.025em] text-[#005ba8] max-[620px]:mt-1.5 max-[620px]:text-[25px]">
            {milestones[activeIndex]?.title}
          </h3>
        </div>
        <span className="shrink-0 text-[12px] font-black uppercase tracking-[0.14em] text-[#1fa8f4] max-[620px]:mt-3 max-[620px]:block max-[620px]:text-[10px]">
          {String(activeIndex + 1).padStart(2, "0")} /{" "}
          {String(milestones.length).padStart(2, "0")}
        </span>
      </div>

      <nav
        className="mb-14 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden max-[767px]:mb-10"
        aria-label="Choose a journey chapter"
      >
        <div className="flex min-w-max items-center gap-2">
          {milestones.map((milestone, index) => (
            <button
              key={`${milestone.date}-nav`}
              type="button"
              onClick={() => jumpToMilestone(index)}
              aria-current={activeIndex === index ? "step" : undefined}
              className={`group relative min-h-11 border-b-2 px-3 pb-2 pt-1 text-left text-[12px] font-black uppercase tracking-[0.08em] transition duration-300 ease-out focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0068c9] max-[620px]:px-2.5 max-[620px]:text-[10px] ${
                activeIndex === index
                  ? "border-[#ffc83d] text-[#005ba8]"
                  : "border-transparent text-[#7890a3] hover:border-[#bfe7f6] hover:text-[#0068c9]"
              }`}
            >
              <span
                className={`mr-1.5 inline-block h-2 w-2 rounded-full transition duration-300 ${activeIndex === index ? "bg-[#ffc83d]" : "bg-[#b8ddec] group-hover:bg-[#1fa8f4]"}`}
                aria-hidden="true"
              />
              {shortDate(milestone.date)}
            </button>
          ))}
        </div>
      </nav>

      <div className="relative flex flex-col gap-[clamp(54px,7vw,92px)] pl-0 max-[767px]:gap-12 max-[767px]:pl-9">
        <span
          className="voyage-timeline-spine absolute bottom-0 left-1/2 top-0 w-[2px] rounded-full bg-[linear-gradient(180deg,rgba(102,211,247,0.72),rgba(31,168,244,0.78)_48%,rgba(200,244,255,0.72))] max-[767px]:left-[14px]"
          aria-hidden="true"
        />
        {milestones.map((milestone, index) => {
          const isEven = index % 2 === 0;
          const textColumn = isEven ? "md:col-start-1" : "md:col-start-3";
          const galleryColumn = isEven ? "md:col-start-3" : "md:col-start-1";
          const isFoundingMilestone = milestone.photos.length === 0;

          return (
            <article
              key={`${milestone.date}-${milestone.title}`}
              ref={(node) => {
                milestoneRefs.current[index] = node;
              }}
              data-milestone-index={index}
              className={`relative transition-[filter,opacity,transform] duration-500 ease-out ${activeIndex === index ? "z-[1]" : ""}`}
            >
              <Reveal
                delay={index * 120}
                direction={isEven ? "left" : "right"}
                className="voyage-history-entry"
                style={
                  { "--timeline-delay": `${index * 90}ms` } as CSSProperties
                }
              >
                <div
                  className={`grid items-start gap-y-5 md:grid-cols-[minmax(0,1fr)_72px_minmax(0,1fr)] md:gap-x-[clamp(24px,4vw,68px)] ${isFoundingMilestone ? "md:grid-rows-[48px_auto]" : "md:items-center"}`}
                >
                  <span
                    className={`voyage-history-marker relative z-[2] h-5 w-5 rounded-full border-[5px] border-[#eef9ff] shadow-[0_5px_14px_rgba(0,104,201,0.24)] transition-[height,width,background-color] duration-500 max-[767px]:absolute max-[767px]:left-[-32px] max-[767px]:top-5 ${activeIndex === index ? "h-7 w-7 bg-[#ffc83d]" : "bg-[#1fa8f4]"} md:col-start-2 md:row-start-1 md:justify-self-center ${isFoundingMilestone ? "md:self-start" : "md:mt-8"}`}
                    aria-hidden="true"
                  />
                  <div
                    className={`voyage-history-card min-w-0 rounded-[22px] border border-[#ccecf8] bg-white p-[clamp(22px,3vw,34px)] shadow-[0_18px_48px_rgba(0,72,140,0.08)] max-[767px]:rounded-[18px] max-[767px]:p-5 ${isFoundingMilestone ? "md:col-span-3 md:row-start-2 md:max-w-[620px] md:justify-self-center md:text-center" : `${textColumn} md:row-start-1`}`}
                  >
                    <p className="m-0 text-[12px] font-black uppercase tracking-[0.12em] text-[#0068c9] max-[620px]:text-[10px]">
                      {milestone.date}
                    </p>
                    <h2 className="mb-0 mt-3 text-[clamp(26px,3vw,40px)] font-black leading-[1.02] tracking-[-0.02em] text-[#005ba8] max-[620px]:text-[clamp(24px,7vw,31px)]">
                      {milestone.title}
                    </h2>
                    <p className="mb-0 mt-4 text-[clamp(16px,1.35vw,18px)] font-bold leading-[1.52] text-[#557086] max-[620px]:mt-3 max-[620px]:text-[15px]">
                      {milestone.description}
                    </p>
                  </div>
                  {milestone.photos.length > 0 ? (
                    <div
                      className={`voyage-history-gallery min-w-0 ${galleryColumn} md:row-start-1`}
                    >
                      <MilestoneGallery
                        photos={milestone.photos}
                        title={milestone.title}
                        direction={index % 2 === 1 ? "left" : "right"}
                        className="md:mt-0"
                      />
                    </div>
                  ) : null}
                </div>
              </Reveal>
            </article>
          );
        })}
      </div>
    </div>
  );
}
