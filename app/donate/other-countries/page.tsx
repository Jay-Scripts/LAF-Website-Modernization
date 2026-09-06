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
import Reveal from "@/components/Reveal";
import { getDonationAsset } from "@/lib/donation-assets";
import PayPalCheckoutButton from "@/components/PayPalCheckoutButton";

export const metadata: Metadata = {
  title: "Donate from Other Countries",
  description: "Support Little Ark Foundation internationally through approved donation methods.",
  alternates: { canonical: "/donate/other-countries" },
};

const internationalGivingTiers = [
  { id: "hope", name: "Hope Keeper", monthly: 10, annual: 120 },
  { id: "care", name: "Care Keeper", monthly: 25, annual: 300 },
  { id: "journey", name: "Journey Keeper", monthly: 50, annual: 600 },
];

export default function OtherCountriesDonationPage() {
  const venmoQr = getDonationAsset("venmo-qr-v2.jpeg");
  const zelleQr = getDonationAsset("zelle-qr-v2.jpeg");
  const venmoLogo = getDonationAsset("venmo-logo.webp");
  const zelleLogo = getDonationAsset("zelle-logo.png");

  return (
    <DonationPageShell
      title="Donate from Other Countries"
      description="Choose an approved international donation method to support children and families served by Little Ark."
    >
      <section className="relative overflow-hidden py-[clamp(72px,9vw,118px)] max-[430px]:py-14">
        <HeartDoodle className="absolute -left-24 top-[45%] z-0 max-[760px]:hidden" size={330} rotate={-18} opacity={0.16} variant={2} />
        <DonationInner>
          <BackToDonate />
          <div className="mt-10">
            <DonationGivingSelector currency="USD" locale="en-US" tiers={internationalGivingTiers} />
            <div className="mx-auto mt-5 w-full max-w-[560px] text-center">
              <PayPalCheckoutButton />
              <p className="mb-0 mt-3 text-sm font-bold text-[#7890a3]">Secure payment processed by PayPal.</p>
            </div>

            <Reveal className="mb-5 mt-6 text-center">
              <h2 className="m-0 text-[clamp(30px,4vw,48px)] font-black leading-none text-[#1fa8f4] max-[430px]:text-[27px]">Other Ways to Donate</h2>
            </Reveal>

            <div className="grid grid-cols-2 gap-5 max-[760px]:grid-cols-1 max-[430px]:gap-4">
              <PaymentCard accessibleTitle="Venmo" className="!p-[clamp(18px,2.5vw,26px)] [&>div]:!mt-0">
                <div className="mx-auto w-full max-w-[220px] [&>div]:!h-[72px]">
                  <DonationAsset src={venmoLogo} alt="Venmo" missingLabel="Official Venmo logo unavailable" kind="logo" />
                </div>
                <div className="group relative mx-auto mt-3 w-full max-w-[220px] max-[430px]:max-w-[210px]">
                  <div>
                    <DonationAsset
                      src={venmoQr}
                      alt="Approved Little Ark Foundation Venmo donation QR code"
                      missingLabel="Approved Venmo QR asset needed: venmo-qr-v2.jpeg"
                    />
                  </div>
                  <span className="pointer-events-none absolute bottom-[calc(100%+10px)] left-1/2 z-10 hidden -translate-x-1/2 whitespace-nowrap rounded-full bg-[#08233d] px-4 py-2 text-sm font-bold text-white opacity-0 shadow-[0_10px_24px_rgba(8,35,61,0.2)] transition-opacity duration-200 min-[761px]:block min-[761px]:group-hover:opacity-100">
                    Scan with Venmo to donate
                  </span>
                </div>
                <p className="mb-0 mt-3 text-center text-sm font-semibold leading-[1.5] text-[#6b8193]">
                  Open Venmo and scan this QR code to make your donation.
                </p>
                <p className="mb-0 mt-3 text-center text-sm font-bold leading-[1.4] text-[#557086]">
                  Scan to donate with Venmo
                </p>
              </PaymentCard>

              <PaymentCard accessibleTitle="Zelle" className="!p-[clamp(18px,2.5vw,26px)] [&>div]:!mt-0">
                <div className="mx-auto w-full max-w-[220px] [&>div]:!h-[72px]">
                  <DonationAsset src={zelleLogo} alt="Zelle" missingLabel="Official Zelle logo unavailable" kind="logo" />
                </div>
                <div className="group relative mx-auto mt-3 w-full max-w-[220px] max-[430px]:max-w-[210px]">
                  <div>
                    <DonationAsset
                      src={zelleQr}
                      alt="Approved Little Ark Foundation Zelle donation QR code"
                      missingLabel="Approved Zelle QR asset needed: zelle-qr-v2.jpeg"
                    />
                  </div>
                  <span className="pointer-events-none absolute bottom-[calc(100%+10px)] left-1/2 z-10 hidden -translate-x-1/2 whitespace-nowrap rounded-full bg-[#08233d] px-4 py-2 text-sm font-bold text-white opacity-0 shadow-[0_10px_24px_rgba(8,35,61,0.2)] transition-opacity duration-200 min-[761px]:block min-[761px]:group-hover:opacity-100">
                    Scan with Zelle to donate
                  </span>
                </div>
                <p className="mb-0 mt-3 text-center text-sm font-semibold leading-[1.5] text-[#6b8193]">
                  Open Zelle and scan this QR code to make your donation.
                </p>
                <p className="mb-0 mt-3 text-center text-sm font-bold leading-[1.4] text-[#557086]">
                  Scan to donate with Zelle
                </p>
              </PaymentCard>
            </div>
          </div>
        </DonationInner>
      </section>
    </DonationPageShell>
  );
}
