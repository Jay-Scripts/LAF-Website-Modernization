import { Card, CardContent } from "@/components/ui/card";
import LeadershipProfileImage from "./LeadershipProfileImage";

export type LeadershipProfile = {
  name: string;
  role: string;
  bio?: string;
  image: string;
  imageAlt?: string;
  imageClassName?: string;
  objectPosition?: string;
  animationDelay?: string;
  animationDirection?: "left" | "right";
};

export default function LeadershipProfileCard({ leader }: { leader: LeadershipProfile }) {
  return (
    <Card className="flex h-full min-h-[318px] w-full flex-col rounded-[22px] border border-[rgba(31,168,244,0.14)] bg-white p-3 text-center shadow-[0_14px_34px_rgba(31,168,244,0.10)] max-[767px]:min-h-0 max-[767px]:rounded-[12px] max-[767px]:p-1.5">
      <div className="relative aspect-[5/4] w-full overflow-hidden rounded-[20px] bg-[#effaff] shadow-[0_10px_22px_rgba(0,72,140,0.10)] max-[767px]:rounded-[10px]">
        <LeadershipProfileImage
          src={leader.image}
          alt={leader.imageAlt ?? `${leader.name} portrait`}
          imageClassName={leader.imageClassName}
          objectPosition={leader.objectPosition}
          animationDelay={leader.animationDelay ?? "0ms"}
          direction={leader.animationDirection ?? "left"}
        />
      </div>
      <CardContent className="flex min-w-0 flex-1 flex-col overflow-hidden px-1 pb-1 pt-4 max-[767px]:px-0.5 max-[767px]:pb-1 max-[767px]:pt-2">
        <h3 className="mb-0 min-w-0 break-words hyphens-auto text-[20px] font-black leading-[1.1] tracking-normal text-[#005ba8] max-[767px]:text-[clamp(9px,2.5vw,13px)] max-[767px]:leading-[1.12]">{leader.name}</h3>
        <p className="mb-0 mt-2 min-w-0 break-words hyphens-auto text-[13px] font-black leading-[1.3] text-[#1fa8f4] max-[767px]:mt-1.5 max-[767px]:text-[clamp(8px,2vw,11px)] max-[767px]:leading-[1.16]">{leader.role}</p>
        {leader.bio ? <p className="mb-0 mt-2 min-w-0 break-words hyphens-auto text-xs font-semibold leading-[1.38] text-[#557086] max-[767px]:mt-1.5 max-[767px]:text-[clamp(7px,1.7vw,9px)] max-[767px]:leading-[1.16]">{leader.bio}</p> : null}
      </CardContent>
    </Card>
  );
}
