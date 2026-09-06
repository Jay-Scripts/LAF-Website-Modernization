import { Card } from "@/components/ui/card";
import { HeartDoodle } from "@/components/BrandHearts";
import Reveal from "@/components/Reveal";
import type { SiteContent } from "@/data/siteContent";
import { isPublicLink } from "./media-hub-data";
import MediaHubExternalButton from "./MediaHubExternalButton";
import MediaHubInner from "./MediaHubInner";
import MediaHubSectionTitle from "./MediaHubSectionTitle";

type MediaHubReportsSectionProps = {
  reports: SiteContent["links"]["impactReports"];
};

export default function MediaHubReportsSection({ reports }: MediaHubReportsSectionProps) {
  const officialReports = reports.filter((report) => isPublicLink(report.url));
  if (officialReports.length === 0) return null;

  return (
    <section className="relative overflow-hidden bg-[radial-gradient(circle_at_20%_28%,rgba(255,255,255,0.24),transparent_19rem),radial-gradient(circle_at_80%_68%,rgba(200,244,255,0.22),transparent_20rem),linear-gradient(135deg,#008fe4,#1fa8f4)] py-[clamp(86px,11vw,145px)] text-white">
      <HeartDoodle className="absolute -bottom-24 right-[8%] z-0 max-[620px]:hidden" size={390} rotate={18} opacity={0.28} variant={1} />
      <HeartDoodle className="absolute left-[7%] top-10 z-0 max-[900px]:hidden" size={110} rotate={-20} opacity={0.22} variant={0} />
      <MediaHubInner>
        <MediaHubSectionTitle light>Annual Impact Reports</MediaHubSectionTitle>
        <div className="grid grid-cols-2 gap-[22px] max-[900px]:grid-cols-1">
          {officialReports.map((report) => (
            <Reveal as="article" key={report.title} className="h-full">
              <Card className="min-h-[260px] h-full gap-0 rounded-[28px] border border-white/20 bg-white/15 p-[clamp(26px,4vw,44px)] text-white shadow-none backdrop-blur">
                <h3 className="m-0 text-[clamp(34px,5vw,64px)] font-black leading-[0.94]">{report.title}</h3>
                <MediaHubExternalButton href={report.url}>View Report</MediaHubExternalButton>
              </Card>
            </Reveal>
          ))}
        </div>
      </MediaHubInner>
    </section>
  );
}
