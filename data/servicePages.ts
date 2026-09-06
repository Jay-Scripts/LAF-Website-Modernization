export type ServicePage = {
  slug: string;
  title: string;
  description: string;
  heroImage: string;
  heroAlt: string;
  heroImageClassName?: string;
  heroObjectFit?: "cover" | "contain";
  heroObjectPosition?: string;
  heroEyebrow?: string;
  storyEyebrow?: string;
  ctaTitle?: string;
  ctaDescription?: string;
  ctaLabel?: string;
  images: {
    src: string;
    alt: string;
    className?: string;
    objectPosition?: string;
  }[];
};

export const servicePages = [
  {
    slug: "housing",
    title: "Housing",
    description:
      "Providing a safe and temporary home where pediatric patients and their caregivers can rest, recover, and stay close to treatment.",
    heroImage: "/images/hearts/housing/little-ark-house.png",
    heroAlt: "The Little Ark Foundation home exterior",
    heroImageClassName: "scale-[1.08] translate-y-[8%]",
    heroObjectFit: "contain",
    heroObjectPosition: "center center",
    images: [
      {
        src: "/images/hearts/housing/housing-bedroom.png",
        alt: "Beds prepared inside the Little Ark home for children and caregivers",
        className: "md:col-span-8",
        objectPosition: "center center",
      },
      {
        src: "/images/hearts/housing/housing-activity-room.png",
        alt: "A child-friendly activity room with books and toys inside the Little Ark home",
        className: "md:col-span-4",
        objectPosition: "center center",
      },
      {
        src: "/images/hearts/housing/housing-reception.jpg",
        alt: "The reception and shared living area inside the Little Ark home",
        className: "md:col-span-12",
        objectPosition: "center center",
      },
    ],
  },
  {
    slug: "transportation",
    title: "Transportation",
    description:
      "Providing free transportation to and from the hospital through the Hope in Transit shuttle service so families can reach treatment safely and on time.",
    heroImage: "/images/hearts/transportation/transportation-home-arrival.jpeg",
    heroAlt: "Hope in Transit shuttle waiting outside the Little Ark home",
    heroObjectPosition: "center center",
    storyEyebrow: "Transportation in Action",
    images: [
      {
        src: "/images/hearts/transportation/transportation-shuttle-family.jpg",
        alt: "Children, caregivers, and Little Ark team members riding in the Hope in Transit shuttle",
        className: "md:col-span-7",
        objectPosition: "center center",
      },
      {
        src: "/images/hearts/transportation/transportation-partner-handoff.jpg",
        alt: "Little Ark transportation partners gathered beside the Hope in Transit shuttle",
        className: "md:col-span-5",
        objectPosition: "center center",
      },
      {
        src: "/images/hearts/transportation/transportation-hope-in-transit.jpg",
        alt: "The Little Ark Hope in Transit shuttle vehicle",
        className: "md:col-span-12",
        objectPosition: "center center",
      },
    ],
  },
  {
    slug: "everyday-meals",
    title: "Everyday Meals",
    description:
      "Serving warm and nutritious meals so children and caregivers are nourished during treatment days.",
    heroImage: "/images/hearts/everyday-meals/everyday-meals-hero.png",
    heroAlt: "Little Ark volunteers gathered around a table prepared for everyday meals",
    heroObjectPosition: "center center",
    heroEyebrow: "HEARTS Support Model",
    storyEyebrow: "Meals in Action",
    ctaTitle: "Help keep families nourished.",
    ctaDescription: "Your support helps Little Ark serve nutritious meals for children and caregivers during treatment days.",
    ctaLabel: "Give Hope",
    images: [
      {
        src: "/images/hearts/everyday-meals/everyday-meals-serving.jpeg",
        alt: "A Little Ark volunteer serving a warm meal to children and caregivers",
        className: "md:col-span-7",
        objectPosition: "center center",
      },
      {
        src: "/images/hearts/everyday-meals/everyday-meals-child.jpeg",
        alt: "A child eating a meal at Little Ark",
        className: "md:col-span-5",
        objectPosition: "center center",
      },
      {
        src: "/images/hearts/everyday-meals/everyday-meals-family-table.png",
        alt: "Children and caregivers seated together for an everyday meal",
        className: "md:col-span-12",
        objectPosition: "center center",
      },
      {
        src: "/images/hearts/everyday-meals/everyday-meals-prep.jpeg",
        alt: "Everyday meal support prepared for Little Ark families",
        className: "md:col-span-6",
        objectPosition: "center center",
      },
      {
        src: "/images/hearts/everyday-meals/everyday-meals-caregiver.jpeg",
        alt: "A caregiver and child during Little Ark everyday meal support",
        className: "md:col-span-6",
        objectPosition: "center center",
      },
    ],
  },
  {
    slug: "activities",
    title: "Activities",
    description:
      "Creating meaningful play, learning, and psychosocial activities that bring comfort, joy, and emotional support to children.",
    heroImage: "/images/hearts/activities/laf-activities.png",
    heroAlt: "Children listening during a Little Ark story activity",
    heroObjectPosition: "center center",
    storyEyebrow: "Activities in Action",
    images: [
      {
        src: "/images/hearts/activities/activities-coloring.png",
        alt: "Children coloring together during a Little Ark activity",
        className: "md:col-span-6",
        objectPosition: "center center",
      },
      {
        src: "/images/hearts/activities/activities-clay-smiles.png",
        alt: "Children smiling and showing clay hearts during a Little Ark activity",
        className: "md:col-span-6",
        objectPosition: "center center",
      },
      {
        src: "/images/hearts/activities/activities-group-play.png",
        alt: "Children and a Little Ark team member gathered for a group play activity",
        className: "md:col-span-12",
        objectPosition: "center center",
      },
      {
        src: "/images/hearts/activities/activities-board-game.png",
        alt: "Children playing a board game with a Little Ark team member",
        className: "md:col-span-6",
        objectPosition: "center center",
      },
      {
        src: "/images/hearts/activities/activities-table-game.png",
        alt: "Children smiling while playing a tabletop game at Little Ark",
        className: "md:col-span-6",
        objectPosition: "center center",
      },
    ],
  },
  {
    slug: "resources-responsibility",
    title: "Resources & Responsibility",
    description:
      "Connecting families to the support they need while responsibly managing donor resources with transparency and accountability.",
    heroImage: "/images/hearts/resources/resources-hero.png",
    heroAlt: "Little Ark families and partners gathered with donated supplies",
    heroObjectPosition: "center 0%",
    storyEyebrow: "Resources in Action",
    images: [
      {
        src: "/images/hearts/resources/resources-workers-of-christ.png",
        alt: "Workers of Christ partners gathered with donated supplies for Little Ark families",
        className: "md:col-span-7",
        objectPosition: "center center",
      },
      {
        src: "/images/hearts/resources/resources-toys-table.png",
        alt: "Toys and supplies prepared for children through Little Ark resource support",
        className: "md:col-span-5",
        objectPosition: "center center",
      },
      {
        src: "/images/hearts/resources/resources-toy-donation.png",
        alt: "Children, caregivers, and Little Ark team members with donated toys and supplies",
        className: "md:col-span-12",
        objectPosition: "center 10%",
      },
      {
        src: "/images/hearts/resources/resources-jollibee-partner.png",
        alt: "Little Ark partners gathered with Jollibee during a resource support visit",
        className: "md:col-span-6",
        objectPosition: "center center",
      },
      {
        src: "/images/hearts/resources/resources-care-packages.png",
        alt: "Care packages and meals prepared for families through Little Ark support",
        className: "md:col-span-6",
        objectPosition: "center center",
      },
      {
        src: "/images/hearts/resources/resources-pfizer-partner.png",
        alt: "Pfizer partners with donated supplies for Little Ark children and families",
        className: "md:col-span-12",
        objectPosition: "center center",
      },
    ],
  },
  {
    slug: "spiritual-care",
    title: "Spiritual Care",
    description:
      "Offering compassionate, faith-centered support that gives families strength, comfort, and hope.",
    heroImage: "/images/hearts/spiritual-care/spiritual-care-hero.png",
    heroAlt: "Little Ark families gathered for prayer and faith-centered encouragement",
    heroObjectPosition: "center center",
    storyEyebrow: "Spiritual Care in Action",
    images: [
      {
        src: "/images/hearts/spiritual-care/spiritual-care-group-fellowship.png",
        alt: "Little Ark families and team members gathered for fellowship",
        className: "md:col-span-7",
        objectPosition: "center center",
      },
      {
        src: "/images/hearts/spiritual-care/spiritual-care-prayer-family.jpeg",
        alt: "Little Ark families gathered in a prayer circle",
        className: "md:col-span-5",
        objectPosition: "center 10%",
      },
      {
        src: "/images/hearts/spiritual-care/spiritual-care-family-fellowship.jpeg",
        alt: "Little Ark families and team members gathered for fellowship and encouragement",
        className: "md:col-span-12",
        objectPosition: "center center",
      },
      {
        src: "/images/hearts/spiritual-care/spiritual-care-family-teaching.png",
        alt: "Children and caregivers listening during a Spiritual Care teaching moment",
        className: "md:col-span-6",
        objectPosition: "center center",
      },
      {
        src: "/images/hearts/spiritual-care/spiritual-care-team-study.png",
        alt: "Little Ark team members gathered for faith-centered study and conversation",
        className: "md:col-span-6",
        objectPosition: "center center",
      },
    ],
  },
] as const satisfies readonly ServicePage[];

export function getServicePage(slug: string) {
  return servicePages.find((service) => service.slug === slug);
}
