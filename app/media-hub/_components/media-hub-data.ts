import "server-only";

import { siteContent } from "@/data/siteContent";

export const featuredArticles = [
  {
    title: "Personal struggle moves one father to help those in same boat",
    publication: "Philippine Daily Inquirer",
    author: "Raoul Chee Kee",
    publicationDate: "2024",
    imagePath: "/images/the-ark/family-kindness-TA.png",
    url: "https://plus.inquirer.net/lifestyle/personal-struggle-moves-one-father-to-help-those-in-same-boat/",
  },
  {
    title: "GMA Network's Art Gap is 'creativity from the heart'",
    publication: "The Philippine Star",
    author: "Angel Javier Cruz",
    publicationDate: "February 19, 2025",
    imagePath: "/images/our-voyage/moments_of_joy1.jpg",
    url: "https://www.philstar.com/entertainment/2025/02/19/2422467/gma-networks-art-gap-creativity-heart",
  },
  {
    title: "Art and music come together to support children in care",
    publication: "Manila Standard",
    author: "Jasper Valdez",
    publicationDate: "2025",
    imagePath: "/images/the-ark/activities-TA.jpeg",
    url: "https://manilastandard.net/lifestyle/314616214/art-and-music-come-together-to-support-children-in-care.html",
  },
] as const;

export const youtubeVideos = [
  { title: "A Place to Heal: The Next Chapter of Little Ark Foundation", videoId: "NMytlsxzv70" },
  { title: "GMA's Art Gap together with Little Ark Foundation", videoId: "A5wt7SUD7tA" },
  { title: "Hope in Transit: Vehicle Donated by Sen. Tulfo for Kids' Brighter Future", videoId: "Nf8WZu6ugRg" },
  { title: "GMA's Art Gap in partnership with Little Ark and National Children's Hospital", videoId: "vjRYtR3E8eA" },
  { title: "Celebrating 1 Year of Partnership with National Children's Hospital Featuring Dr. Philip Morales", videoId: "WvE5lSLDBeE" },
  { title: "GMA News Featuring Raizen and Jo Berry", videoId: "Tp9AJKCmUsM" },
] as const;

export const mediaHubLinks = siteContent.links.mediaHub;
export const impactReports = siteContent.links.impactReports;
export const facebookPageUrl = siteContent.links.social.facebookUrl;
export const facebookProfileImage = "/images/logo/little-ark-foundation-logo.png";

export function isPublicLink(url: string) {
  return url.startsWith("https://");
}

type FacebookAttachment = {
  media_type?: string;
  media?: { image?: { src?: string } };
  subattachments?: { data?: FacebookAttachment[] };
};

type FacebookGraphPost = {
  id: string;
  message?: string;
  created_time?: string;
  permalink_url?: string;
  full_picture?: string;
  reactions?: { summary?: { total_count?: number } };
  comments?: { summary?: { total_count?: number } };
  shares?: { count?: number };
  attachments?: { data?: FacebookAttachment[] };
};

export type FacebookPost = {
  id: string;
  caption: string;
  createdAt: string;
  href: string;
  imageUrl?: string;
  mediaType?: string;
  likes?: number;
  comments?: number;
  shares?: number;
};

function getFacebookCredentials() {
  const pageId = process.env.META_FACEBOOK_PAGE_ID ?? process.env.FACEBOOK_PAGE_ID;
  const accessToken = process.env.META_FACEBOOK_PAGE_ACCESS_TOKEN ?? process.env.FACEBOOK_PAGE_ACCESS_TOKEN ?? process.env.META_ACCESS_TOKEN;
  return pageId && accessToken ? { accessToken, pageId } : null;
}

function getAttachmentPreview(attachments?: FacebookGraphPost["attachments"]) {
  const attachment = attachments?.data?.[0];
  const nested = attachment?.subattachments?.data?.find((item) => item.media?.image?.src);
  return {
    imageUrl: attachment?.media?.image?.src ?? nested?.media?.image?.src,
    mediaType: attachment?.media_type,
  };
}

function formatFacebookDate(value: string) {
  const elapsedSeconds = Math.max(0, Math.floor((Date.now() - new Date(value).getTime()) / 1000));
  if (elapsedSeconds < 60) return "Just now";
  const minutes = Math.floor(elapsedSeconds / 60);
  if (minutes < 60) return `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days} ${days === 1 ? "day" : "days"} ago`;
  const weeks = Math.floor(days / 7);
  if (weeks < 5) return `${weeks} ${weeks === 1 ? "week" : "weeks"} ago`;
  return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" }).format(new Date(value));
}

async function fetchFacebookGraphPosts(pageId: string, accessToken: string, fields: string): Promise<FacebookGraphPost[] | null> {
  const graphApiVersion = process.env.META_GRAPH_API_VERSION ?? "v23.0";
  const endpoint = new URL(`https://graph.facebook.com/${graphApiVersion}/${pageId}/posts`);
  endpoint.searchParams.set("fields", fields);
  endpoint.searchParams.set("limit", "6");

  const response = await fetch(endpoint, {
    headers: { Authorization: `Bearer ${accessToken}` },
    next: { revalidate: 900 },
  });
  if (!response.ok) return null;
  const payload = (await response.json()) as { data?: FacebookGraphPost[] };
  return payload.data ?? [];
}

export async function getLatestFacebookPosts(): Promise<FacebookPost[] | null> {
  const credentials = getFacebookCredentials();
  if (!credentials) return null;

  const baseFields = "message,created_time,permalink_url,full_picture,attachments{media_type,media,subattachments}";
  const engagementFields = `${baseFields},reactions.limit(0).summary(true),comments.limit(0).summary(true),shares`;

  try {
    const postsWithEngagement = await fetchFacebookGraphPosts(credentials.pageId, credentials.accessToken, engagementFields);
    const graphPosts = postsWithEngagement ?? (await fetchFacebookGraphPosts(credentials.pageId, credentials.accessToken, baseFields));
    if (!graphPosts) return null;

    return graphPosts.slice(0, 6).map((post) => {
      const attachment = getAttachmentPreview(post.attachments);
      return {
        id: post.id,
        caption: post.message?.trim() || "View this Little Ark Foundation update on Facebook.",
        createdAt: post.created_time ? formatFacebookDate(post.created_time) : "Recent update",
        href: post.permalink_url || facebookPageUrl,
        imageUrl: post.full_picture ?? attachment.imageUrl,
        mediaType: attachment.mediaType,
        likes: post.reactions?.summary?.total_count,
        comments: post.comments?.summary?.total_count,
        shares: post.shares?.count,
      };
    });
  } catch {
    console.error("[Media Hub] Unable to load the public Facebook feed.");
    return null;
  }
}
