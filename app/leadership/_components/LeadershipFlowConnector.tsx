import { HeartTimelineMarker } from "@/components/BrandHearts";

export default function LeadershipFlowConnector() {
  return (
    <div className="relative mx-auto grid h-[58px] w-14 place-items-center" aria-hidden="true">
      <span className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-[#1fa8f4]" />
      <HeartTimelineMarker className="relative z-[1]" size={34} opacity={1} />
    </div>
  );
}
