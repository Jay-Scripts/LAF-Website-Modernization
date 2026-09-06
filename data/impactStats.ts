// Public impact numbers copied from foundation-provided spreadsheet. Do not connect live spreadsheet until approved.
export const impactStats = {
  source:
    "Google Sheet static snapshot: https://docs.google.com/spreadsheets/d/1Ah4uIi6-RLgpR7KnZ3zdsSojgrC2ajuyo0HLp5oKLf4/edit?gid=1846262400#gid=1846262400",
  lastUpdated: "2026-07-03",
  metrics: {
    bedNights: {
      title: "Housing Accommodation",
      value: 2920,
      label: "Bed Nights Provided",
      shortLabel: "Bed Nights",
      yearLabel: "Bed Nights in 2025",
      growth: "200%",
    },
    transportation: {
      title: "Transportation Support",
      value: 1766,
      label: "Families Transported",
      shortLabel: "Transportation",
      yearLabel: "Transported in 2025",
      growth: "240%",
    },
    hotMeals: {
      title: "Meals Support",
      value: 2916,
      label: "Hot Meals Served",
      shortLabel: "Hot Meals",
      yearLabel: "Hot Meals Served in 2025",
      growth: "412%",
    },
    activityCenter: {
      title: "LAF Activity Center",
      value: 726,
      label: "Activities Held",
      shortLabel: "Activity Center",
      yearLabel: "Activities Held in 2025",
      growth: "1,445%",
    },
    careCart: {
      title: "Care Cart",
      value: 6741,
      label: "Care Cart Meals",
      shortLabel: "Care Cart",
      yearLabel: "Care Cart Meals in 2025",
      growth: "472%",
    },
  },
  growth: {
    bedNights: "200%",
    transportation: "240%",
    meals: "412%",
    activities: "1,445%",
    careCart: "472%",
  },
  allocation: {
    programs: "88%",
    administration: "12%",
    housing: "65%",
    meals: "24%",
    lafCenterActivities: "5%",
    careCart: "4%",
    transportation: "2%",
  },
  charts: {
    annualOperatingExpenses: {
      title: "Annual Operating Expenses",
      titleLines: ["Annual Operating", "Expenses"],
      segments: [
        {
          label: "Programs",
          percent: 88,
          color: "#1fa8f4",
          voyageColor: "#c8f4ff",
          swatchClass: "bg-[#c8f4ff]",
        },
        {
          label: "Administration",
          percent: 12,
          color: "#94dcf6",
          voyageColor: "rgba(255,255,255,.42)",
          swatchClass: "bg-white/40",
        },
      ],
    },
    totalProgramServices: {
      title: "Total Program Services",
      titleLines: ["Total Program", "Services"],
      segments: [
        {
          label: "Housing",
          percent: 65,
          color: "#1fa8f4",
          voyageColor: "#c8f4ff",
          swatchClass: "bg-[#c8f4ff]",
        },
        {
          label: "Meals",
          percent: 24,
          color: "#94dcf6",
          voyageColor: "#94dcf6",
          swatchClass: "bg-[#94dcf6]",
        },
        {
          label: "LAF Center Activities",
          shortLabel: "LAF Center Activities",
          percent: 5,
          color: "#c8f4ff",
          voyageColor: "#66d3f7",
          swatchClass: "bg-[#66d3f7]",
        },
        {
          label: "Care Cart",
          percent: 4,
          color: "#008fe4",
          voyageColor: "rgba(255,255,255,.68)",
          swatchClass: "bg-white/70",
        },
        {
          label: "Transportation",
          percent: 2,
          color: "#66d3f7",
          voyageColor: "rgba(255,255,255,.3)",
          swatchClass: "bg-white/30",
        },
      ],
    },
  },
} as const;

export const impactMetrics = impactStats.metrics;
export const impactCharts = impactStats.charts;

export type ImpactStats = typeof impactStats;
