export const siteContent = {
  links: {
    giveHopePath: "/donate",
    websiteUrl: "https://www.littlearkfoundation.org",
    social: {
      instagramUrl: "https://www.instagram.com/little_ark_foundation/?hl=en",
      facebookUrl: "https://www.facebook.com/littlearkfoundation",
      youtubeUrl: "https://www.youtube.com/channel/UCj3h5DY1ks01etncVemb3BQ",
      linkedinUrl: "https://www.linkedin.com/in/little-ark-foundation-78491a225",
      tiktokUrl: "https://www.tiktok.com/@littlearkfoundation?_r=1&_t=ZT-98QsYIrrrgc",
    },
    donations: {
      philippinesUrl: "/donate/philippines",
      internationalUrl: "/donate/other-countries",
    },
    mediaHub: {
      instagramUrl: "https://www.instagram.com/little_ark_foundation/?hl=en",
      facebookUrl: "https://www.facebook.com/littlearkfoundation",
      youtubeUrl: "https://www.youtube.com/channel/UCj3h5DY1ks01etncVemb3BQ",
      linkedinUrl: "https://www.linkedin.com/in/little-ark-foundation-78491a225",
      tiktokUrl: "https://www.tiktok.com/@littlearkfoundation?_r=1&_t=ZT-98QsYIrrrgc",
      newsUpdatesUrl: "TODO_ADD_NEWS_UPDATES_URL",
      storiesUrl: "TODO_ADD_STORIES_URL",
      featuredStoryUrl: "TODO_ADD_FEATURED_STORY_URL",
    },
    impactReports: [
      {
        title: "2025 Impact Report",
        url: "TODO_ADD_2025_IMPACT_REPORT_PDF_URL",
      },
      {
        title: "2024 Impact Report",
        url: "TODO_ADD_2024_IMPACT_REPORT_PDF_URL",
      },
    ],
    partners: {
      corporateSponsors: [
        { label: "Sponsor", url: "TODO_ADD_CORPORATE_SPONSOR_URL" },
        { label: "Sponsor", url: "TODO_ADD_CORPORATE_SPONSOR_URL" },
        { label: "Sponsor", url: "TODO_ADD_CORPORATE_SPONSOR_URL" },
      ],
      hospitalPartners: [
        { label: "Hospital", url: "TODO_ADD_HOSPITAL_PARTNER_URL" },
        { label: "Hospital", url: "TODO_ADD_HOSPITAL_PARTNER_URL" },
        { label: "Hospital", url: "TODO_ADD_HOSPITAL_PARTNER_URL" },
      ],
      churchPartners: [
        { label: "Church", url: "TODO_ADD_CHURCH_PARTNER_URL" },
        { label: "Church", url: "TODO_ADD_CHURCH_PARTNER_URL" },
        { label: "Church", url: "TODO_ADD_CHURCH_PARTNER_URL" },
      ],
      communityPartners: [
        { label: "Community", url: "TODO_ADD_COMMUNITY_PARTNER_URL" },
        { label: "Community", url: "TODO_ADD_COMMUNITY_PARTNER_URL" },
        { label: "Community", url: "TODO_ADD_COMMUNITY_PARTNER_URL" },
      ],
      wallRows: [
        ["Hope Partner", "Care Partner", "Faith Partner", "Hospital", "Community", "Sponsor"],
        ["Church", "Clinic", "Donor Group", "Volunteer Team", "Foundation", "Sponsor"],
      ],
    },
  },
  contact: {
    name: "Little Ark Foundation",
    websiteLabel: "littlearkfoundation.org",
    websiteUrl: "https://www.littlearkfoundation.org",
    email: "info@littlearkfoundation.org",
    phoneLabel: "US +1 732 300 3902 | PH +63 906 404 9569",
    usPhone: "+17323003902",
    phPhone: "+639064049569",
    address: "35 Tulip Street, Brgy. Roxas, Quezon City",
  },
} as const;

export type SiteContent = typeof siteContent;
