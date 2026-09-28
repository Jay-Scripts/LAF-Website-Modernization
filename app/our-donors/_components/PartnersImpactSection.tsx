import PartnersImpactPhotos from "./PartnersImpactPhotos";
import { readdirSync } from "node:fs";
import path from "node:path";
import type { ImpactMetricKey, PublicImpactMetrics } from "@/lib/google-sheets";
import PartnersInner from "./PartnersInner";

type PartnersImpactSectionProps = {
  metrics: PublicImpactMetrics;
};

// Temporary display samples, not verified cumulative totals. API totals take precedence.
const sampleTotals: Record<ImpactMetricKey, number> = {
  housing: 2953,
  transport: 803,
  meals: 8654,
  activities: 241,
  "care-cart": 2846,
};

const impactItems: { key: ImpactMetricKey; label: string }[] = [
  { key: "housing", label: "Bed nights provided" },
  { key: "transport", label: "Families transported" },
  { key: "meals", label: "Hot meals served" },
  { key: "activities", label: "Children served" },
  { key: "care-cart", label: "Meals distributed" },
];

export default function PartnersImpactSection({ metrics }: PartnersImpactSectionProps) {
  const photos = readdirSync(path.join(process.cwd(), "public/images/hearts"), { recursive: true, encoding: "utf8" })
    .filter((file) => /\.(png|jpe?g|webp|avif|gif)$/i.test(file))
    .sort()
    .map((file) => {
      const relativePath = file.replaceAll("\\", "/");
      const name = path.basename(file, path.extname(file)).replaceAll("-", " ");
      return { src: `/images/hearts/${relativePath}`, alt: `Little Ark: ${name}` };
    });
  const displayMetrics = Object.fromEntries(
    Object.entries(metrics).map(([key, metric]) => [key, {
      ...metric,
      total: metric.total ?? sampleTotals[key as ImpactMetricKey],
    }]),
  ) as PublicImpactMetrics;

  return (
    <section aria-labelledby="partners-impact-title" className="scroll-mt-24 bg-white py-14 text-[#082f59] sm:py-20">
      <PartnersInner className="grid items-center gap-9 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
        <div className="min-w-0">
          <h2 id="partners-impact-title" className="m-0 mb-7 text-[clamp(34px,4vw,54px)] font-black leading-[1.05] text-[#082f59]">
            Because of You
          </h2>
          <figure className="m-0">
            <PartnersImpactPhotos photos={photos} />
            <figcaption className="mt-5 border-l-[3px] border-[#ffc83d] pl-4 text-base leading-relaxed text-[#557086]">
              A place to stay. A meal to share. Support for the journey ahead.
            </figcaption>
          </figure>
        </div>
        <dl className="m-0 min-w-0 border-t border-[#cbdfe9]">
          {impactItems.map(({ key, label }) => (
            <div key={key} className="grid grid-cols-[minmax(0,0.9fr)_minmax(0,1fr)] items-center gap-5 border-b border-[#cbdfe9] py-5 sm:gap-8 sm:py-6">
              <dt className="col-start-2 row-start-1 min-w-0">
                <span className="block text-base font-black leading-tight text-[#082f59]">{displayMetrics[key].program}</span>
                <span className="mt-1.5 block text-sm leading-relaxed text-[#557086]">{label}</span>
              </dt>
              <dd className="col-start-1 row-start-1 m-0 text-[clamp(32px,3.5vw,48px)] font-black leading-none text-[#0068b5] tabular-nums">
                {displayMetrics[key].total?.toLocaleString("en-US")}
              </dd>
            </div>
          ))}
        </dl>
      </PartnersInner>
    </section>
  );
}
