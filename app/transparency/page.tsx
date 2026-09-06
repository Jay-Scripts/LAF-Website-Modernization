import type { Metadata } from "next";
import { HeartDoodle } from "@/components/BrandHearts";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Reveal from "@/components/Reveal";
import { RegistrationCards, ResourceCards } from "@/components/TransparencySections";
import { siteContent } from "@/data/siteContent";

export const metadata: Metadata = {
  title: "Transparency & Reports",
  description:
    "Review Little Ark Foundation organizational registrations, policies, governance information, impact reporting, and due-diligence resources.",
  alternates: { canonical: "/transparency" },
};

const philippinesRegistrations = [
  { label: "SEC", number: "2021070019208-08" },
  { label: "BIR", number: "601-322-056-00000" },
  { label: "DSWD License", number: "DSWD-SB-RL-2026-000131" },
  { label: "DSWD Public Solicitation", number: "DSWD-SB-PSP-S-2026-000125" },
] as const;

const resourceLinks = [
  {
    eyebrow: "Policies",
    title: "Privacy Policy",
    description: "Review how Little Ark Foundation handles personal information and privacy.",
    href: "/privacy-policy",
    action: "View policy",
  },
  {
    eyebrow: "Policies",
    title: "Terms of Use",
    description: "Review the terms that govern use of the Little Ark Foundation website.",
    href: "/terms-of-use",
    action: "View terms",
  },
  {
    eyebrow: "Governance",
    title: "Leadership",
    description: "Meet the board, officers, staff, and mission advancement leaders listed by Little Ark Foundation.",
    href: "/leadership",
    action: "View leadership",
  },
  {
    eyebrow: "Impact",
    title: "Our Voyage",
    description: "Review Little Ark Foundation program impact, reporting-period comparisons, and stories of support.",
    href: "/our-voyage",
    action: "View our impact",
  },
] as const;

export default function TransparencyPage() {
  return (
    <div className="min-h-screen overflow-x-clip bg-white text-[#16324a]">
      <Navbar />

      <main>
        <section className="relative isolate overflow-hidden bg-[#f7fcff] pb-[clamp(48px,6vw,72px)] pt-[clamp(108px,13vw,160px)]">
          <HeartDoodle className="absolute -right-12 top-24 -z-10 max-[620px]:hidden" size={220} rotate={14} opacity={0.1} variant={1} />
          <div className="mx-auto w-[min(1120px,calc(100%_-_32px))] sm:w-[min(1120px,calc(100%_-_48px))]">
            <Reveal className="mx-auto max-w-[850px] text-center">
              <p className="m-0 text-[12px] font-black uppercase tracking-[0.18em] text-[#118ee5]">Transparency &amp; Reports</p>
              <h1 className="mb-0 mt-3 text-[clamp(36px,6vw,64px)] font-black leading-[0.96] tracking-[-0.045em] text-[#005ba8] sm:mt-4">
                Accountability You Can See
              </h1>
              <p className="mx-auto mb-0 mt-5 max-w-[760px] text-[15px] font-semibold leading-[1.6] text-[#557086] sm:mt-6 sm:text-[17px] lg:text-[19px]">
                Little Ark Foundation is committed to responsible stewardship, transparency, and accountability to the children and families we serve, our donors, partners, and the communities that support our mission.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="pb-[clamp(64px,8vw,100px)] pt-[clamp(52px,6vw,76px)]" aria-labelledby="organization-heading">
          <div className="mx-auto w-[min(1120px,calc(100%_-_32px))] sm:w-[min(1120px,calc(100%_-_48px))]">
            <Reveal className="text-center">
              <p className="m-0 text-[12px] font-black uppercase tracking-[0.16em] text-[#1fa8f4]">Organization &amp; Registration</p>
              <h2 id="organization-heading" className="mb-0 mt-3 text-[clamp(28px,4.4vw,54px)] font-black leading-[1.02] tracking-[-0.035em] text-[#005ba8]">
                Organizational Details
              </h2>
            </Reveal>

            <RegistrationCards registrations={philippinesRegistrations} />
          </div>
        </section>

        <section className="border-t border-[#d9f1fb] bg-white py-[clamp(64px,8vw,100px)]" aria-labelledby="resources-heading">
          <div className="mx-auto w-[min(1120px,calc(100%_-_32px))] sm:w-[min(1120px,calc(100%_-_48px))]">
            <Reveal className="text-center">
              <p className="m-0 text-[12px] font-black uppercase tracking-[0.16em] text-[#1fa8f4]">Policies, Governance &amp; Impact</p>
              <h2 id="resources-heading" className="mb-0 mt-3 text-[clamp(28px,4.4vw,54px)] font-black leading-[1.02] tracking-[-0.035em] text-[#005ba8]">
                Review our public information
              </h2>
            </Reveal>

            <ResourceCards resources={resourceLinks} />

            <aside className="mt-[clamp(34px,5vw,52px)]" aria-labelledby="due-diligence-heading">
              <Reveal className="rounded-[24px] border border-[#ccecff] bg-[#f7fcff] px-[clamp(22px,3.5vw,38px)] py-[clamp(24px,3.5vw,34px)]">
                <div className="flex items-center justify-between gap-8 max-[720px]:flex-col max-[720px]:items-start max-[720px]:gap-5">
                  <div className="max-w-[720px]">
                    <p className="m-0 text-[11px] font-black uppercase tracking-[0.16em] text-[#1fa8f4]">Due Diligence</p>
                    <h2 id="due-diligence-heading" className="mb-0 mt-2 text-[clamp(24px,3vw,34px)] font-black leading-tight tracking-[-0.025em] text-[#005ba8]">Need additional documentation?</h2>
                    <p className="mb-0 mt-3 text-[15px] font-semibold leading-[1.6] text-[#557086]">
                      Grantmakers, institutional partners, and due-diligence reviewers may contact Little Ark Foundation to request additional organizational documentation.
                    </p>
                  </div>
                  <a href={`mailto:${siteContent.contact.email}`} className="inline-flex min-h-11 shrink-0 items-center justify-center rounded-full bg-[#ffc83d] px-6 text-[12px] font-black uppercase tracking-[0.05em] text-[#16324a] transition hover:-translate-y-0.5 hover:bg-[#ffd568] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#005ba8]">
                    {siteContent.contact.email}
                  </a>
                </div>
              </Reveal>
            </aside>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
