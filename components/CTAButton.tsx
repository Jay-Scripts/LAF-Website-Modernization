"use client";

import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, FocusEvent, MouseEvent, ReactNode } from "react";
import { HeartDoodle } from "./BrandHearts";
import { GiveHopeHeartBurst, useGiveHopeHeartBurst } from "./GiveHopeHeartBurst";

type CTAButtonProps = {
  children?: ReactNode;
  href?: string;
  className?: string;
  size?: "nav" | "hero" | "mini";
  icon?: boolean;
  target?: AnchorHTMLAttributes<HTMLAnchorElement>["target"];
  rel?: AnchorHTMLAttributes<HTMLAnchorElement>["rel"];
} & ButtonHTMLAttributes<HTMLButtonElement>;

const baseClasses =
  "group/cta relative inline-flex items-center justify-center overflow-visible rounded-full border-0 font-black uppercase transition duration-200 ease-out hover:-translate-y-0.5 focus-visible:-translate-y-0.5 focus-visible:outline-none";

const giveHopeClasses =
  "hover:scale-[1.03] hover:-translate-y-1 hover:shadow-[0_18px_34px_rgba(255,200,61,0.50)] focus-visible:scale-[1.03] focus-visible:-translate-y-1 focus-visible:shadow-[0_18px_34px_rgba(255,200,61,0.50)]";

const sizeClasses = {
  nav: "min-h-[46px] min-w-[110px] px-[23px] text-[13px] text-[#031427] shadow-[0_8px_18px_rgba(255,200,61,0.30)] hover:shadow-[0_14px_28px_rgba(255,200,61,0.45)] focus-visible:shadow-[0_14px_28px_rgba(255,200,61,0.45)]",
  hero: "mt-[22px] min-h-[48px] min-w-[170px] gap-2.5 px-7 text-[15px] text-[#031427] shadow-[0_8px_18px_rgba(255,200,61,0.30)] hover:shadow-[0_14px_28px_rgba(255,200,61,0.45)] focus-visible:shadow-[0_14px_28px_rgba(255,200,61,0.45)]",
  mini: "min-h-10 px-[18px] text-sm text-[#008fe4]",
};

const colorClasses = {
  nav: "bg-[#ffc83d]",
  hero: "bg-[#ffc83d]",
  mini: "bg-[#c8f4ff]",
};

function CTAHeart() {
  return (
    <span className="grid h-5 w-5 place-items-center" aria-hidden="true">
      <HeartDoodle size={20} rotate={-8} />
    </span>
  );
}

function isGiveHopeLabel(children: ReactNode) {
  return typeof children === "string" ? children.trim().toLowerCase() === "give hope" : false;
}

export default function CTAButton({
  children = "Give Hope",
  href,
  className = "",
  size = "hero",
  icon = size === "hero",
  target,
  rel,
  type = "button",
  ...buttonProps
}: CTAButtonProps) {
  const hasGiveHopeHeart = size !== "mini" && isGiveHopeLabel(children);
  const classes = `${baseClasses} ${hasGiveHopeHeart ? giveHopeClasses : ""} ${sizeClasses[size]} ${colorClasses[size]} ${className}`;
  const { isShowering, startBurstLoop, stopBurstLoop, triggerOnce } = useGiveHopeHeartBurst();
  const {
    onMouseEnter,
    onMouseLeave,
    onFocus,
    onBlur,
    onClick,
    ...restButtonProps
  } = buttonProps;
  const content = (
    <>
      {hasGiveHopeHeart ? <GiveHopeHeartBurst isShowering={isShowering} /> : null}
      {icon && !hasGiveHopeHeart ? <CTAHeart /> : null}
      <span className="relative z-[1]">{children}</span>
    </>
  );
  const handleMouseEnter = (event: MouseEvent<HTMLElement>) => {
    if (hasGiveHopeHeart) startBurstLoop();
    onMouseEnter?.(event as MouseEvent<HTMLButtonElement>);
  };
  const handleMouseLeave = (event: MouseEvent<HTMLElement>) => {
    if (hasGiveHopeHeart) stopBurstLoop();
    onMouseLeave?.(event as MouseEvent<HTMLButtonElement>);
  };
  const handleFocus = (event: FocusEvent<HTMLElement>) => {
    if (hasGiveHopeHeart) startBurstLoop();
    onFocus?.(event as FocusEvent<HTMLButtonElement>);
  };
  const handleBlur = (event: FocusEvent<HTMLElement>) => {
    if (hasGiveHopeHeart) stopBurstLoop();
    onBlur?.(event as FocusEvent<HTMLButtonElement>);
  };
  const handleClick = (event: MouseEvent<HTMLElement>) => {
    if (hasGiveHopeHeart) triggerOnce();
    onClick?.(event as MouseEvent<HTMLButtonElement>);
  };

  if (href) {
    return (
      <Link
        href={href}
        target={target}
        rel={rel}
        className={classes}
        onBlur={handleBlur}
        onClick={handleClick}
        onFocus={handleFocus}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={classes}
      onBlur={handleBlur}
      onClick={handleClick}
      onFocus={handleFocus}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...restButtonProps}
    >
      {content}
    </button>
  );
}
