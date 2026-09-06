import type { Metadata } from "next";
import Link from "next/link";
import { DonationInner, DonationPageShell } from "@/components/DonationPage";
export const metadata: Metadata = {
  title: "Thank You",
  robots: { index: false, follow: true },
};
export default function PayPalSuccessPage() {
  return <DonationPageShell title="Thank You" description="You have returned from PayPal's secure checkout."><section className="py-[clamp(64px,8vw,96px)] text-center"><DonationInner><p className="mx-auto m-0 max-w-[680px] text-lg font-bold leading-[1.6] text-[#557086]">PayPal is processing the payment confirmation. Little Ark uses PayPal&apos;s verified server notification as the final payment record.</p><Link href="/donate" className="mt-7 inline-flex min-h-12 items-center justify-center rounded-full bg-[#ffc83d] px-7 text-sm font-black uppercase text-[#061d34]">Back to Donate</Link></DonationInner></section></DonationPageShell>;
}
