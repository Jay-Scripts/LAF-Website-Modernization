import type { Metadata } from "next";
import Link from "next/link";
import { DonationInner, DonationPageShell } from "@/components/DonationPage";

export const metadata: Metadata = {
  title: "Donation Received",
  robots: { index: false, follow: true },
};

export default function XenditDonationSuccessPage() {
  return (
    <DonationPageShell title="Thank You" description="You have returned from Xendit's secure checkout.">
      <section className="py-[clamp(64px,8vw,96px)] text-center">
        <DonationInner>
          <p className="mx-auto m-0 max-w-[680px] text-lg font-bold leading-[1.6] text-[#557086]">
            Xendit is processing your donation confirmation. Little Ark uses Xendit&apos;s authenticated payment notification as the final payment record.
          </p>
          <Link href="/donate" className="mt-7 inline-flex min-h-12 items-center justify-center rounded-full bg-[#ffc83d] px-7 text-sm font-black uppercase text-[#061d34]">
            Back to Donate
          </Link>
        </DonationInner>
      </section>
    </DonationPageShell>
  );
}
