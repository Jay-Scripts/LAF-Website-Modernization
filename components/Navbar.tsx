"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import CTAButton from "./CTAButton";
import { siteContent } from "@/data/siteContent";

const navItems = [
  { label: "The Ark", href: "/the-ark" },
  { label: "Our Voyage", href: "/our-voyage" },
  { label: "Get On Board", href: "/get-on-board" },
  { label: "Our Partners", href: "/our-donors" },
  { label: "Media Hub", href: "/media-hub" },
];

const utilityItems = [
  { label: "Contact Us", href: "/contact" },
  { label: "Leadership", href: "/leadership" },
  { label: "Follow Us", href: "/follow-us" },
];

const logoSrc = "/images/logo/little-ark-foundation-logo.png";

type NavbarProps = {
  variant?: "transparent" | "solid";
};

function isRouteActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function Navbar({ variant = "transparent" }: NavbarProps) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const updateHeaderState = () => setIsScrolled(window.scrollY > 24);
    updateHeaderState();
    window.addEventListener("scroll", updateHeaderState, { passive: true });
    return () => window.removeEventListener("scroll", updateHeaderState);
  }, []);

  const headerActive = variant === "solid" || isScrolled || menuOpen;
  const isSolidVariant = variant === "solid";
  const utilityLinkClass =
    "relative rounded-full px-3 py-2 text-[12px] font-extrabold uppercase tracking-[0.04em] text-[#557086] transition-colors duration-200 after:absolute after:bottom-0.5 after:left-3 after:right-3 after:h-[3px] after:origin-center after:scale-x-0 after:rounded-full after:bg-[#008fe4] after:transition-transform after:duration-200 hover:text-[#0068c9] hover:after:scale-x-100 focus-visible:text-[#0068c9] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1fa8f4] focus-visible:after:scale-x-100";

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-20 transition duration-200 ease-out ${
          headerActive
            ? "bg-white/90 text-[#1fa8f4] shadow-[0_12px_34px_rgba(0,72,140,0.12)] backdrop-blur-2xl"
            : "bg-transparent text-white"
        }`}
      >
        <div className="border-b border-[rgba(0,104,201,0.09)] bg-white text-[#557086] max-[900px]:hidden">
          <nav
            className="mx-auto flex h-11 w-[min(1220px,calc(100%_-_40px))] items-center justify-center gap-4"
            aria-label="Utility navigation"
          >
            {utilityItems.map((item) => {
              const isActive = isRouteActive(pathname, item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`${utilityLinkClass} ${isActive ? "text-[#0068c9] after:scale-x-100" : ""}`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <div
          className={`mx-auto flex items-center justify-between max-[760px]:mx-0 max-[760px]:min-h-[76px] max-[760px]:w-full max-[760px]:max-w-none max-[760px]:gap-3.5 max-[760px]:px-5 ${
            isSolidVariant
              ? "min-h-[82px] w-[min(1220px,calc(100%_-_40px))] gap-[22px]"
              : "min-h-[86px] w-[min(1300px,calc(100%_-_48px))] gap-6"
          }`}
        >
          <Link href="/" className="flex shrink-0 items-center max-[760px]:relative max-[760px]:h-[43px] max-[760px]:w-[160px] max-[760px]:overflow-hidden" aria-label="Little Ark Foundation home">
            <Image
              src={logoSrc}
              alt="Little Ark Foundation"
              width={1748}
              height={431}
              priority
              unoptimized
              sizes="(max-width: 760px) 190px, 276px"
              className={`h-auto w-[220px] object-contain transition duration-200 max-[760px]:absolute max-[760px]:left-[-48px] max-[760px]:top-[-10px] max-[760px]:w-[257px] max-[760px]:max-w-none min-[761px]:w-[276px] ${
                headerActive ? "" : "brightness-0 invert"
              }`}
            />
          </Link>

          <nav
            className={`ml-auto flex items-center text-[13px] font-black uppercase max-[1100px]:gap-3.5 max-[1100px]:text-xs ${
              isSolidVariant ? "gap-[clamp(16px,2vw,30px)] max-[900px]:hidden" : "gap-[clamp(16px,2.1vw,34px)] max-[900px]:hidden"
            }`}
            aria-label="Main navigation"
          >
            {navItems.map((item) => {
              const isActive = isRouteActive(pathname, item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`relative py-2.5 transition-colors duration-200 after:absolute after:bottom-1 after:left-0 after:right-0 after:h-[3px] after:origin-center after:scale-x-0 after:rounded-full after:transition-transform after:duration-200 hover:after:scale-x-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1fa8f4] focus-visible:after:scale-x-100 ${
                    headerActive
                      ? "after:bg-[#008fe4] hover:text-[#0068c9] focus-visible:text-[#0068c9]"
                      : "after:bg-[#c8f4ff] hover:text-[#c8f4ff] focus-visible:text-[#c8f4ff]"
                  } ${isActive ? (headerActive ? "text-[#0068c9] after:scale-x-100" : "text-white after:scale-x-100") : ""}`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <CTAButton
            href={siteContent.links.giveHopePath}
            size="nav"
            icon={false}
            aria-current={isRouteActive(pathname, "/donate") ? "page" : undefined}
            className={`${
              isSolidVariant
                ? "min-h-[52px] px-7 shadow-[0_16px_38px_rgba(255,200,61,0.36)] max-[900px]:hidden"
                : "ml-1 max-[900px]:hidden"
            } hover:brightness-[0.97] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#0057a8] ${
              isRouteActive(pathname, "/donate") ? "ring-2 ring-[#0057a8] ring-offset-2" : ""
            }`}
          >
            Give Hope
          </CTAButton>

          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
            className="hidden h-12 w-12 place-items-center rounded-full bg-[#1fa8f4] text-white shadow-[0_10px_22px_rgba(0,104,201,0.26)] max-[900px]:grid max-[760px]:h-[42px] max-[760px]:w-[42px]"
          >
            <span className="sr-only">Menu</span>
            <span className="relative block h-5 w-5">
              <span
                className={`absolute left-0 top-[2px] h-[3px] w-5 rounded-full bg-current transition ${
                  menuOpen ? "translate-y-[7px] rotate-45" : ""
                }`}
              />
              <span
                className={`absolute left-0 top-[9px] h-[3px] w-5 rounded-full bg-current transition ${
                  menuOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`absolute left-0 top-4 h-[3px] w-5 rounded-full bg-current transition ${
                  menuOpen ? "-translate-y-[7px] -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </div>
      </header>

      {menuOpen ? (
        <nav
          className="fixed inset-x-3.5 top-[86px] z-30 rounded-xl bg-white p-3.5 shadow-[0_12px_28px_rgba(31,168,244,0.18)] max-[760px]:top-[76px] min-[901px]:hidden"
          aria-label="Mobile navigation"
        >
          {navItems.map((item) => {
            const isActive = isRouteActive(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                onClick={() => setMenuOpen(false)}
                className={`relative block rounded-[9px] p-3.5 font-black uppercase text-[#091a2f] transition-colors duration-200 after:absolute after:bottom-2 after:left-3.5 after:right-3.5 after:h-[3px] after:origin-left after:scale-x-0 after:rounded-full after:bg-[#008fe4] after:transition-transform after:duration-200 hover:bg-[#edf8ff] hover:text-[#0068c9] hover:after:scale-x-100 focus-visible:text-[#0068c9] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#1fa8f4] focus-visible:after:scale-x-100 ${
                  isActive ? "bg-[#edf8ff] text-[#0068c9] after:scale-x-100" : ""
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          <Link
            href={siteContent.links.giveHopePath}
            aria-current={isRouteActive(pathname, "/donate") ? "page" : undefined}
            onClick={() => setMenuOpen(false)}
            className={`mt-1 block rounded-[9px] bg-[#ffc83d] p-3.5 font-black uppercase text-[#031427] shadow-[0_8px_18px_rgba(255,200,61,0.28)] transition duration-200 hover:-translate-y-0.5 hover:brightness-[0.97] hover:shadow-[0_12px_24px_rgba(255,200,61,0.38)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0057a8] ${
              isRouteActive(pathname, "/donate") ? "ring-2 ring-[#0057a8] ring-offset-2" : ""
            }`}
          >
            Give Hope
          </Link>
          <div className="my-2 h-px bg-[rgba(31,168,244,0.14)]" aria-hidden="true" />
          {utilityItems.map((item) => {
            const isActive = isRouteActive(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                onClick={() => setMenuOpen(false)}
                className={`relative block rounded-[9px] p-3.5 font-black uppercase text-[#557086] transition-colors duration-200 after:absolute after:bottom-2 after:left-3.5 after:right-3.5 after:h-[3px] after:origin-left after:scale-x-0 after:rounded-full after:bg-[#008fe4] after:transition-transform after:duration-200 hover:bg-[#edf8ff] hover:text-[#0068c9] hover:after:scale-x-100 focus-visible:text-[#0068c9] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#1fa8f4] focus-visible:after:scale-x-100 ${
                  isActive ? "bg-[#edf8ff] text-[#0068c9] after:scale-x-100" : ""
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      ) : null}
    </>
  );
}
