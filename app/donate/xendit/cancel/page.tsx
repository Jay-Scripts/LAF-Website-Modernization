import type { Metadata } from "next";
import Link from "next/link";
import { DonationInner, DonationPageShell } from "@/components/DonationPage";

export const metadata: Metadata = {
  title: "Donation Not Completed",
  robots: { index: false, follow: true },
};

export default function XenditDonationCancelPage() {
  return (
    <DonationPageShell title="Donation Not Completed" description="No donation was completed during this visit.">
      <section className="py-[clamp(64px,8vw,96px)] text-center">
        <DonationInner>
          <p className="mx-auto m-0 max-w-[680px] text-lg font-bold leading-[1.6] text-[#557086]">
            You can return to the donation page whenever you are ready.
          </p>
          <Link href="/donate/philippines" className="mt-7 inline-flex min-h-12 items-center justify-center rounded-full bg-[#ffc83d] px-7 text-sm font-black uppercase text-[#061d34]">
            Return to Donation Options
          </Link>
        </DonationInner>
      </section>
    </DonationPageShell>
  );
}
