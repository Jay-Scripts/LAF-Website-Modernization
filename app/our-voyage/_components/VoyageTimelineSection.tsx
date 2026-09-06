import OurVoyageTimeline from "@/components/OurVoyageTimeline";
import { Inner } from "./voyage-layout";

export default function VoyageTimelineSection() {
  return <section className="relative overflow-hidden bg-[radial-gradient(circle_at_14%_18%,rgba(200,244,255,0.34),transparent_24rem),linear-gradient(180deg,#ffffff,#eef9ff)] pb-[clamp(32px,4vw,40px)] pt-[clamp(56px,6vw,72px)] max-[767px]:pb-8 max-[767px]:pt-12"><Inner><OurVoyageTimeline /></Inner></section>;
}
