import type { Metadata } from "next";
import { HeartDoodle } from "@/components/BrandHearts";
import DonationGivingSelector from "@/components/DonationGivingSelector";
import {
  BackToDonate,
  DonationAsset,
  DonationInner,
  DonationPageShell,
  PaymentCard,
} from "@/components/DonationPage";
import { getDonationAsset } from "@/lib/donation-assets";
import XenditCheckoutButton from "@/components/XenditCheckoutButton";

export const metadata: Metadata = {
  title: "Donate from the Philippines",
  description: "Support Little Ark Foundation in the Philippines through approved local donation methods.",
  alternates: { canonical: "/donate/philippines" },
};

const philippinesGivingTiers = [
  { id: "hope", name: "Hope Keeper", monthly: 500, annual: 6000 },
  { id: "care", name: "Care Keeper", monthly: 1000, annual: 12000 },
  { id: "journey", name: "Journey Keeper", monthly: 2500, annual: 30000 },
];

export default function PhilippinesDonationPage() {
  const gcashQr = getDonationAsset("gcash-qr-approved.jpeg");
  const bdoLogo = getDonationAsset("bdo-logo.webp");
  const gcashLogo = getDonationAsset("gcash-logo.webp");

  return (
    <DonationPageShell
      title="Donate from the Philippines"
      description="Choose an approved local donation method to help Little Ark continue serving children and families."
    >
      <section className="relative overflow-hidden py-[clamp(72px,9vw,118px)] max-[430px]:py-14">
        <HeartDoodle className="absolute -right-24 top-[40%] z-0 max-[760px]:hidden" size={330} rotate={18} opacity={0.16} variant={0} />
        <DonationInner>
          <BackToDonate />
          <div className="mt-10">
            <DonationGivingSelector currency="PHP" locale="en-PH" tiers={philippinesGivingTiers} />
            <div className="mx-auto mt-5 w-full max-w-[560px] text-center">
              <XenditCheckoutButton />
            </div>
            <div className="mt-6 grid grid-cols-2 gap-5 max-[760px]:grid-cols-1 max-[430px]:gap-4">
              <PaymentCard title="Donate via Bank Transfer" className="!p-[clamp(18px,2.5vw,26px)] [&>h2]:!text-center [&>h2]:!whitespace-nowrap [&>h2]:!text-[clamp(20px,3vw,34px)] [&>h2]:!leading-[1.02] [&>h2]:!tracking-[-0.02em]">
                <div className="mx-auto w-full max-w-[220px] [&>div]:!h-[72px]">
                  <DonationAsset src={bdoLogo} alt="BDO" missingLabel="Official BDO logo unavailable" kind="logo" />
                </div>
                <dl className="mt-5 grid gap-3 text-[16px]">
                  <div>
                    <dt className="text-sm font-black uppercase tracking-[0.08em] text-[#008fe4]">Bank</dt>
                    <dd className="m-0 mt-1 font-extrabold text-[#08233d]">BDO</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-black uppercase tracking-[0.08em] text-[#008fe4]">Account Number</dt>
                    <dd className="m-0 mt-1 break-all font-extrabold text-[#08233d]">008838006247</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-black uppercase tracking-[0.08em] text-[#008fe4]">Account Name</dt>
                    <dd className="m-0 mt-1 font-extrabold text-[#08233d]">Little Ark Foundation, Inc.</dd>
                  </div>
                </dl>
              </PaymentCard>

              <PaymentCard accessibleTitle="Donate via GCash" className="!p-[clamp(18px,2.5vw,26px)] [&>div]:!mt-0">
                <div className="mx-auto w-full max-w-[220px] [&>div]:!h-[72px]">
                  <DonationAsset src={gcashLogo} alt="GCash" missingLabel="Official GCash logo unavailable" kind="logo" />
                </div>
                <div className="group relative mx-auto mt-3 w-full max-w-[220px] max-[430px]:max-w-[210px]">
                  <div>
                    <DonationAsset
                      src={gcashQr}
                      alt="Approved Little Ark Foundation GCash donation QR code"
                      missingLabel="Approved GCash QR asset needed: gcash-qr-approved.jpeg"
                    />
                  </div>
                  <span className="pointer-events-none absolute bottom-[calc(100%+10px)] left-1/2 z-10 hidden -translate-x-1/2 whitespace-nowrap rounded-full bg-[#08233d] px-4 py-2 text-sm font-bold text-white opacity-0 shadow-[0_10px_24px_rgba(8,35,61,0.2)] transition-opacity duration-200 min-[761px]:block min-[761px]:group-hover:opacity-100">
                    Scan with GCash to donate
                  </span>
                </div>
                <p className="mb-0 mt-3 text-center text-sm font-semibold leading-[1.5] text-[#6b8193]">
                  Open GCash and scan this QR code to make your donation.
                </p>
                <p className="mb-0 mt-5 text-center text-base font-bold leading-[1.5] text-[#557086]">
                  Scan the QR code using GCash to make your donation.
                </p>
              </PaymentCard>
            </div>
          </div>
        </DonationInner>
      </section>
    </DonationPageShell>
  );
}
