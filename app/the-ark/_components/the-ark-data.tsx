import type { ReactNode } from "react";

export const peoplePhoto =
  "radial-gradient(circle at 23% 42%, #e9aa84 0 20px, transparent 21px), radial-gradient(circle at 39% 39%, #f5c39c 0 19px, transparent 20px), radial-gradient(circle at 56% 43%, #d88e6e 0 20px, transparent 21px), radial-gradient(circle at 73% 39%, #f2c59e 0 19px, transparent 20px), linear-gradient(180deg, transparent 0 47%, rgba(255,255,255,0.52) 48% 64%, rgba(31,168,244,0.18) 65%), linear-gradient(135deg, #dff7ff, #c8f4ff 48%, #75d2bf)";

export const lossPhoto =
  "radial-gradient(circle at 36% 36%, #e9aa84 0 30px, transparent 31px), radial-gradient(circle at 58% 40%, #f5c39c 0 23px, transparent 24px), linear-gradient(180deg, transparent 0 45%, rgba(255,255,255,0.48) 46% 66%, rgba(31,168,244,0.18) 67%), linear-gradient(135deg, #dff7ff, #f4fbff 48%, #c4edf8)";

type HeartsPillar = {
  id: string;
  aliasId?: string;
  letter: string;
  title: string;
  description: string;
  color: string;
  imageSrc: string;
  imageAlt: string;
  imageClass?: string;
  icon: ReactNode;
};

export const heartsPillars = [
  {
    id: "housing",
    letter: "H",
    title: "Housing",
    description: "Safe temporary housing close to treatment.",
    color: "#00458f",
    imageSrc: "/images/our-voyage/housing-ov.jpeg",
    imageAlt: "Little Ark Foundation housing accommodation",
    icon: <path d="M8 24 24 10l16 14M14 22v17h20V22M21 39V28h7v11" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinejoin="round" />,
  },
  {
    id: "meals",
    letter: "E",
    title: "Everyday Meals",
    description: "Nutritious meals for children and caregivers.",
    color: "#1098ad",
    imageSrc: "/images/home/meals-hp.jpeg",
    imageAlt: "Little Ark Foundation meal support",
    icon: (
      <>
        <path d="M15 9v30M11 9v11c0 4 8 4 8 0V9M31 9v30M31 9c5 4 6 12 0 17" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="24" cy="24" r="8" fill="none" stroke="currentColor" strokeWidth="3.5" />
      </>
    ),
  },
  {
    id: "activities",
    letter: "A",
    title: "Activities",
    description: "Play, learning, and emotional support.",
    color: "#16a85d",
    imageSrc: "/images/the-ark/activities-TA.jpeg",
    imageAlt: "Little Ark Foundation activity support",
    icon: (
      <>
        <circle cx="17" cy="17" r="4" fill="currentColor" />
        <circle cx="28" cy="15" r="4" fill="currentColor" />
        <circle cx="34" cy="25" r="4" fill="currentColor" />
        <circle cx="22" cy="30" r="4" fill="currentColor" />
        <path d="M14 37c10-2 18-9 24-21" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
      </>
    ),
  },
  {
    id: "care-cart",
    aliasId: "resources",
    letter: "R",
    title: "Resources & Responsibility",
    description: "Connecting families with support and stewarding every gift.",
    color: "#f5b21b",
    imageSrc: "/images/the-ark/resources-responsibility-team.jpeg",
    imageAlt: "Little Ark Foundation resources and responsibility support",
    imageClass: "scale-[1.12] object-[58%_46%]",
    icon: (
      <>
        <path d="M8 28l8-8 7 7 5-5 12 10" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M14 28l6 6c2 2 5 2 7 0l7-7" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
      </>
    ),
  },
  {
    id: "transportation",
    letter: "T",
    title: "Transportation",
    description: "Free rides through Hope in Transit.",
    color: "#ff4b3e",
    imageSrc: "/images/our-voyage/transportation-support-ov.jpeg",
    imageAlt: "Little Ark Foundation Hope in Transit transportation support",
    icon: (
      <>
        <rect x="8" y="14" width="32" height="20" rx="4" fill="none" stroke="currentColor" strokeWidth="3.5" />
        <path d="M14 24h20M14 34v5m20-5v5" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
        <circle cx="16" cy="38" r="3" fill="currentColor" />
        <circle cx="32" cy="38" r="3" fill="currentColor" />
      </>
    ),
  },
  {
    id: "spiritual-care",
    aliasId: "blood-donation",
    letter: "S",
    title: "Spiritual Care",
    description: "Faith-centered encouragement, hope, and prayer.",
    color: "#6b4bb8",
    imageSrc: "/images/the-ark/spiritual-care-fellowship.jpg",
    imageAlt: "Little Ark Foundation spiritual care support",
    icon: <path d="M24 8v32M14 19h20" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />,
  },
] satisfies HeartsPillar[];

export const coreValues = [
  {
    letter: "L",
    title: "Love",
    description: "We listen with our hearts, serve with compassion, and treat every family with dignity.",
    color: "#0057a8",
  },
  {
    letter: "A",
    title: "Action",
    description: "We respond with initiative, resourcefulness, and partnerships that help families continue treatment.",
    color: "#1fa8f4",
  },
  {
    letter: "F",
    title: "Faithful Stewardship",
    description: "We serve with hope, humility, transparency, accountability, and trust in God.",
    color: "#00458f",
  },
] as const;
