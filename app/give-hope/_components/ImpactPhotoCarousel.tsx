"use client";

import Image from "next/image";
import { ArrowLeft, ArrowRight, Maximize2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";

export default function ImpactPhotoCarousel({ images, label, direction }: { images: string[]; label: string; direction: "left" | "right" }) {
  const galleryRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef(0);
  const pauseUntilRef = useRef(0);
  const [previewIndex, setPreviewIndex] = useState<number | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const gallery = galleryRef.current;
    if (!gallery || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    let lastTime = 0;
    let loopDistance = 0;
    let visible = false;
    const measure = () => {
      const first = gallery.children.item(0) as HTMLElement | null;
      const repeated = gallery.children.item(images.length) as HTMLElement | null;
      loopDistance = first && repeated ? repeated.offsetLeft - first.offsetLeft : 0;
      if (direction === "right" && !lastTime) {
        offsetRef.current = loopDistance;
        gallery.scrollLeft = loopDistance;
      }
    };
    measure();
    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(gallery);
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; });
    observer.observe(gallery);
    const animate = (time: number) => {
      if (pauseUntilRef.current === -1) pauseUntilRef.current = time + 1800;
      const elapsed = lastTime ? Math.min(time - lastTime, 48) : 0;
      lastTime = time;
      if (visible && time > pauseUntilRef.current && loopDistance > 0) {
        offsetRef.current += elapsed * 0.026 * (direction === "left" ? 1 : -1);
        if (offsetRef.current >= loopDistance) offsetRef.current -= loopDistance;
        if (offsetRef.current < 0) offsetRef.current += loopDistance;
        gallery.scrollLeft = offsetRef.current;
        const first = gallery.children.item(0) as HTMLElement | null;
        const next = gallery.children.item(1) as HTMLElement | null;
        const stride = first && next ? next.offsetLeft - first.offsetLeft : 1;
        setActiveIndex(Math.round(offsetRef.current / stride) % images.length);
      }
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      observer.disconnect();
    };
  }, [direction, images.length]);

  const pause = () => { pauseUntilRef.current = -1; };
  const move = (step: -1 | 1) => {
    const gallery = galleryRef.current;
    if (!gallery) return;
    pause();
    const first = gallery.children.item(0) as HTMLElement | null;
    const next = gallery.children.item(1) as HTMLElement | null;
    const stride = first && next ? next.offsetLeft - first.offsetLeft : gallery.clientWidth * 0.4;
    const loopDistance = stride * images.length;
    if (step < 0 && gallery.scrollLeft < stride * 0.5) gallery.scrollLeft += loopDistance;
    gallery.scrollBy({ left: step * stride, behavior: "smooth" });
    offsetRef.current = gallery.scrollLeft + step * stride;
    setActiveIndex((current) => (current + step + images.length) % images.length);
  };
  const goTo = (index: number) => {
    const gallery = galleryRef.current;
    const target = gallery?.children.item(index) as HTMLElement | null;
    if (!gallery || !target) return;
    pause();
    offsetRef.current = target.offsetLeft - (gallery.children.item(0) as HTMLElement).offsetLeft;
    gallery.scrollTo({ left: offsetRef.current, behavior: "smooth" });
    setActiveIndex(index);
  };

  return (
    <div className="mt-6">
      <div ref={galleryRef} className="flex h-[clamp(190px,23vw,300px)] gap-4 overflow-hidden" aria-label={`${label} photo gallery`}>
        {[...images, ...images].map((src, index) => (
          <button key={`${src}-${index}`} type="button" onClick={() => { pause(); setPreviewIndex(index % images.length); }} aria-label={`Preview ${label} photo ${(index % images.length) + 1} of ${images.length}`} className="group relative h-full w-[min(42%,470px)] flex-none cursor-zoom-in overflow-hidden rounded-[18px] bg-[#d8e9f3] text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0068c9] max-[620px]:w-[76%]">
            <Image src={src} alt={`${label} support photo ${(index % images.length) + 1}`} fill sizes="(max-width: 620px) 76vw, 470px" className="object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
            <span className="absolute bottom-3 right-3 grid h-9 w-9 place-items-center rounded-full bg-[#005ba8]/85 text-white opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100 max-[620px]:opacity-100" aria-hidden="true"><Maximize2 size={16} /></span>
          </button>
        ))}
      </div>
      <div className="mt-4 flex items-center justify-between gap-4">
        <div className="flex flex-wrap gap-1" aria-label={`Choose ${label} photo`}>
          {images.map((src, index) => (
            <button key={src} type="button" onClick={() => goTo(index)} aria-label={`Show ${label} photo ${index + 1} of ${images.length}`} aria-current={activeIndex === index ? "true" : undefined} className="grid h-7 w-7 place-items-center rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0068c9]"><span className={`h-2.5 w-2.5 rounded-full ${activeIndex === index ? "bg-[#008fe4]" : "bg-[#b8ddec]"}`} /></button>
          ))}
        </div>
        <div className="flex gap-2">
          <button type="button" onClick={() => move(-1)} aria-label={`Previous ${label} photos`} className="grid h-11 w-11 place-items-center rounded-full border border-[#cce9f5] bg-white text-[#0068c9] transition hover:bg-[#eefaff] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0068c9]"><ArrowLeft size={18} aria-hidden="true" /></button>
          <button type="button" onClick={() => move(1)} aria-label={`Next ${label} photos`} className="grid h-11 w-11 place-items-center rounded-full border border-[#cce9f5] bg-white text-[#0068c9] transition hover:bg-[#eefaff] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0068c9]"><ArrowRight size={18} aria-hidden="true" /></button>
        </div>
      </div>
      <Dialog open={previewIndex !== null} onOpenChange={(open) => { if (!open) setPreviewIndex(null); }}>
        <DialogContent className="w-[min(1120px,calc(100%-24px))] max-w-none gap-0 overflow-hidden border border-[#c8f4ff]/25 bg-[#032d5c] p-0 text-white sm:max-w-none">
          {previewIndex !== null && <>
            <div className="relative h-[min(70svh,720px)] min-h-[300px] bg-[#032d5c] max-[620px]:h-[58svh]">
              <Image key={images[previewIndex]} src={images[previewIndex]} alt={`${label} support photo ${previewIndex + 1}`} fill sizes="(max-width: 620px) calc(100vw - 24px), 1120px" className="object-contain" />
              <button type="button" onClick={() => setPreviewIndex((current) => ((current ?? 0) - 1 + images.length) % images.length)} aria-label="Previous preview image" className="absolute left-4 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-[#005ba8]/90 text-white"><ArrowLeft size={19} /></button>
              <button type="button" onClick={() => setPreviewIndex((current) => ((current ?? 0) + 1) % images.length)} aria-label="Next preview image" className="absolute right-4 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-[#005ba8]/90 text-white"><ArrowRight size={19} /></button>
            </div>
            <div className="flex items-center justify-between gap-4 border-t border-[#c8f4ff]/20 px-6 py-4">
              <div><DialogTitle className="font-black text-white">{label}</DialogTitle><DialogDescription className="text-[#c8f4ff]">Little Ark Foundation</DialogDescription></div>
              <span className="text-sm font-bold">{previewIndex + 1} / {images.length}</span>
            </div>
          </>}
        </DialogContent>
      </Dialog>
    </div>
  );
}
