import Image from "next/image";
import Link from "next/link";
import { HeartDoodle } from "@/components/BrandHearts";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Reveal from "@/components/Reveal";

export function DonationInner({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`relative z-[2] mx-auto min-w-0 w-[min(1120px,calc(100%_-_40px))] max-[620px]:w-[min(100%_-_28px,1120px)] ${className}`}>
      {children}
    </div>
  );
}

export function DonationPageShell({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white text-[#08233d]">
      <Navbar variant="solid" />
      <main>
        <section className="relative overflow-hidden bg-[radial-gradient(circle_at_12%_10%,rgba(31,168,244,0.12),transparent_24rem),linear-gradient(180deg,#fff,#eaf9ff)] pb-[clamp(64px,8vw,98px)] pt-[clamp(150px,16vw,210px)] text-center">
          <HeartDoodle className="absolute -left-24 top-24 z-0 max-[620px]:hidden" size={340} rotate={-18} opacity={0.22} variant={1} />
          <HeartDoodle className="absolute -right-20 bottom-8 z-0 max-[760px]:hidden" size={260} rotate={18} opacity={0.18} variant={2} />
          <DonationInner>
            <Reveal className="mx-auto max-w-[900px]">
              <p className="mb-4 mt-0 text-[13px] font-black uppercase tracking-[0.14em] text-[#008fe4]">Give Hope</p>
              <h1 className="m-0 break-words text-[clamp(48px,8vw,104px)] font-black leading-[0.92] tracking-normal text-[#1fa8f4] max-[430px]:text-[38px] max-[430px]:leading-[0.98]">{title}</h1>
              <p className="mx-auto mt-6 max-w-[760px] text-[clamp(20px,2.5vw,30px)] font-extrabold leading-[1.35] text-[#557086] max-[430px]:mt-4 max-[430px]:text-[17px]">{description}</p>
            </Reveal>
          </DonationInner>
        </section>
        {children}
      </main>
      <Footer />
    </div>
  );
}

export function DonationAsset({
  src,
  alt,
  missingLabel,
  kind = "qr",
}: {
  src: string | null;
  alt: string;
  missingLabel: string;
  kind?: "qr" | "logo";
}) {
  if (!src) {
    return (
      <div
        className={`grid place-items-center rounded-[20px] border-2 border-dashed border-[#b7dff4] bg-[#f5fbff] p-6 text-center font-bold leading-[1.4] text-[#557086] ${
          kind === "qr" ? "mx-auto aspect-square w-full max-w-[320px]" : "h-[clamp(96px,11vw,132px)] w-full max-w-[360px]"
        }`}
        role="img"
        aria-label={missingLabel}
      >
        {missingLabel}
      </div>
    );
  }

  return (
    <div className={`relative grid min-w-0 place-items-center overflow-hidden rounded-[20px] bg-white ${kind === "qr" ? "mx-auto aspect-square w-full max-w-[340px] p-6 max-[430px]:max-w-[270px] max-[430px]:p-3" : "h-[clamp(96px,11vw,132px)] w-full max-w-[360px] p-2 max-[430px]:h-[86px] max-[430px]:max-w-[280px]"}`}>
      <Image src={src} alt={alt} fill unoptimized sizes={kind === "qr" ? "340px" : "360px"} className={kind === "qr" ? "object-contain p-5" : "object-contain p-2"} />
    </div>
  );
}

export function PaymentCard({
  title,
  accessibleTitle,
  description,
  children,
  featured = false,
  className = "",
}: {
  title?: string;
  accessibleTitle?: string;
  description?: string;
  children: React.ReactNode;
  featured?: boolean;
  className?: string;
}) {
  return (
    <Reveal
      as="article"
      className={`min-w-0 overflow-hidden rounded-[28px] border p-[clamp(24px,4vw,44px)] max-[430px]:rounded-[22px] max-[430px]:p-5 ${
        featured
          ? "border-[#bde9ff] bg-[linear-gradient(135deg,#eefaff,#fff)] shadow-[0_22px_58px_rgba(31,168,244,0.14)]"
          : "border-[rgba(31,168,244,0.14)] bg-white shadow-[0_16px_42px_rgba(31,168,244,0.1)]"
      } ${className}`}
    >
      {title ? (
        <h2 className="m-0 text-[clamp(30px,4vw,52px)] font-black leading-[0.98] text-[#1fa8f4]">{title}</h2>
      ) : (
        <h2 className="sr-only">{accessibleTitle}</h2>
      )}
      {description ? <p className="mb-0 mt-4 text-[clamp(17px,2vw,22px)] font-bold leading-[1.45] text-[#557086]">{description}</p> : null}
      <div className="mt-7">{children}</div>
    </Reveal>
  );
}

export function PaymentMethodsIntro() {
  return (
    <Reveal className="pt-[clamp(34px,5vw,58px)] text-center max-[430px]:pt-7">
      <h2 className="m-0 text-[clamp(34px,5vw,58px)] font-black leading-none text-[#1fa8f4] max-[430px]:text-[29px]">Complete Your Gift</h2>
      <p className="mx-auto mb-0 mt-4 max-w-[680px] text-[clamp(17px,2vw,21px)] font-bold leading-[1.5] text-[#557086] max-[430px]:mt-3 max-[430px]:text-[15px]">
        Choose a payment method below to complete your gift.
      </p>
    </Reveal>
  );
}

export function ExternalPaymentButton({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex min-h-[52px] items-center justify-center rounded-full bg-[#ffc83d] px-7 text-[15px] font-black uppercase text-[#061d34] shadow-[0_16px_38px_rgba(255,200,61,0.32)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_22px_46px_rgba(255,200,61,0.44)] focus-visible:-translate-y-0.5 focus-visible:outline-none max-[620px]:w-full"
    >
      {children}
    </a>
  );
}

export function MissingPaymentUrl({ label }: { label: string }) {
  return (
    <div className="rounded-[18px] border border-dashed border-[#b7dff4] bg-[#f5fbff] px-5 py-4 text-sm font-bold leading-[1.45] text-[#557086]">
      {label}
    </div>
  );
}

export function BackToDonate() {
  return (
    <Link href="/donate" className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-[0.08em] text-[#008fe4] hover:underline focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#c8f4ff]">
      <span aria-hidden="true">←</span>
      Back to Donate
    </Link>
  );
}
