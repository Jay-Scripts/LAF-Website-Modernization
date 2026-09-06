import { impactCharts, impactMetrics } from "@/data/impactStats";

export const impactReport2025 = {
  source: "2024-2025 HEARTS Profile & Impact Snapshot PDF provided by Little Ark Foundation",
  hero: {
    title: "Changing the Childhood Cancer Journey",
    subtitle: "Removing the everyday barriers that make it difficult for children to continue treatment — one family, one journey at a time.",
    cta: "View Our Impact",
    imageSrc: "/images/our-voyage/hero-ov-2026.jpeg",
  },
  growingMission: {
    eyebrow: "A Growing Mission",
    title: "HEARTS in action, helping families stay in treatment.",
    body:
      "From 2024 to 2025, Little Ark expanded support for children and families at the Little Ark Home and the National Children's Hospital through practical help, emotional care, and faith-centered support.",
  },
  heartsModel: [
    {
      letter: "H",
      title: "Housing",
      body: "Safe temporary home near treatment.",
    },
    {
      letter: "E",
      title: "Everyday Meals",
      body: "Warm meals for children and caregivers.",
    },
    {
      letter: "A",
      title: "Activities",
      body: "Play, learning, and psychosocial support.",
    },
    {
      letter: "R",
      title: "Resources & Responsibility",
      body: "Connect support and steward donor resources well.",
    },
    {
      letter: "T",
      title: "Transportation",
      body: "Free rides through Hope in Transit.",
    },
    {
      letter: "S",
      title: "Spiritual Care",
      body: "Faith-centered comfort, strength, and hope.",
    },
  ],
  journey: [
    {
      year: "2024",
      title: "A baseline for growth",
      body: "The HEARTS snapshot records 2024 service levels across housing, transportation, meals, LAF Center activities, and Care Cart meals.",
    },
    {
      year: "2025",
      title: "Support expanded",
      body: "Little Ark expanded support for children and families at the Little Ark Home and the National Children's Hospital.",
    },
    {
      year: "HEARTS",
      title: "A clearer support model",
      body: "Housing, Everyday Meals, Activities, Resources and Responsibility, Transportation, and Spiritual Care work together to help families continue treatment.",
    },
    {
      year: "2026",
      title: "Trust in action",
      body: "The snapshot reports that 88% of every peso goes directly to programs, with 12% supporting administration and operations.",
    },
  ],
  metrics: [
    {
      key: "housing",
      title: "Housing",
      previousValue: 974,
      value: impactMetrics.bedNights.value,
      label: impactMetrics.bedNights.label,
      growth: impactMetrics.bedNights.growth,
    },
    {
      key: "transportation",
      title: "Transportation",
      previousValue: 520,
      value: impactMetrics.transportation.value,
      label: impactMetrics.transportation.label,
      growth: impactMetrics.transportation.growth,
    },
    {
      key: "meals",
      title: "Meals",
      previousValue: 570,
      value: impactMetrics.hotMeals.value,
      label: impactMetrics.hotMeals.label,
      growth: impactMetrics.hotMeals.growth,
    },
    {
      key: "activity-center",
      title: "LAF Activity Center",
      previousValue: 47,
      value: impactMetrics.activityCenter.value,
      label: impactMetrics.activityCenter.label,
      growth: impactMetrics.activityCenter.growth,
    },
    {
      key: "care-cart",
      title: "Care Cart",
      previousValue: 1132,
      value: impactMetrics.careCart.value,
      label: impactMetrics.careCart.label,
      growth: impactMetrics.careCart.growth,
    },
  ],
  numberStories: [
    {
      title: "A safe place to rest.",
      body: "Safe temporary housing helps families remain near care when treatment stretches across difficult days.",
      metricKey: "housing",
      imageSrc: "/images/our-voyage/housing-ov.jpeg",
      imageAlt: "Little Ark Foundation housing support",
      photoKey: "housing",
    },
    {
      title: "A ride that makes treatment possible.",
      body: "Hope in Transit removes one more barrier between a child and the treatment they need.",
      metricKey: "transportation",
      imageSrc: "/images/our-voyage/transportation-support-ov.jpeg",
      imageAlt: "Little Ark Foundation transportation support",
      photoKey: "transportation",
    },
    {
      title: "A warm meal during a difficult day.",
      body: "Everyday meals help children and caregivers keep going with dignity and strength.",
      metricKey: "meals",
      imageSrc: "/images/home/meals-hp.jpeg",
      imageAlt: "Little Ark Foundation meal support",
      photoKey: "meals",
    },
    {
      title: "Moments of joy between treatments.",
      body: "Play, learning, and psychosocial support give children space to feel like children.",
      metricKey: "activity-center",
      images: [
        {
          src: "/images/our-voyage/moments_of_joy1.jpg",
          alt: "Children showing paper crafts during a Little Ark Foundation activity",
          objectPosition: "50% 34%",
        },
        {
          src: "/images/our-voyage/moments_of_joy3.jpeg",
          alt: "Children smiling during a Little Ark Foundation activity",
          objectPosition: "50% 36%",
        },
        {
          src: "/images/our-voyage/moments_of_joy2.jpg",
          alt: "Children sitting together during a Little Ark Foundation activity",
          objectPosition: "50% 50%",
        },
      ],
      photoKey: "activity",
    },
    {
      title: "Care delivered directly to families.",
      body: "Care Cart meals bring practical kindness closer to families during long hospital days.",
      metricKey: "care-cart",
      images: [
        {
          src: "/images/our-voyage/carecart1.jpg",
          alt: "Little Ark Foundation Care Cart with children and partners",
          objectPosition: "50% 48%",
        },
        {
          src: "/images/our-voyage/carecart2.jpeg",
          alt: "Little Ark Foundation Care Cart meal support",
          objectPosition: "50% 44%",
        },
      ],
      photoKey: "cart",
    },
  ],
  quote: {
    eyebrow: "Voices of Hope",
    text:
      "Since Little Ark Foundation collaborated with NCH, statistics will show that the survival rate and the compliance rate for chemotherapy have increased.",
    attribution: "Philip A. Morales, MD, MA, FPPS, Medical Center Chief II, National Children's Hospital",
  },
  stewardship: {
    title: "Stewardship & Transparency",
    body:
      "Donor support is directed primarily toward programs, helping resources reach children and families through practical care.",
    charts: impactCharts,
  },
  lookingAhead: {
    title: "Looking Ahead",
    body:
      "Little Ark continues growing so more families can receive support in the years ahead. Each new season is an invitation to widen the circle of care.",
  },
  finalCta: {
    title: "Help Write the Next Chapter",
    body: "Every act of generosity becomes part of another family's story of hope.",
    button: "Give Hope",
  },
} as const;

export type ImpactReport2025 = typeof impactReport2025;
