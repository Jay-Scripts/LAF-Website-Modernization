import type { MetadataRoute } from "next";
import { servicePages } from "@/data/servicePages";

const productionOrigin = "https://www.littlearkfoundation.org";

const publicPaths = [
  "",
  "/the-ark",
  "/our-voyage",
  "/get-on-board",
  "/get-on-board/volunteer",
  "/leadership",
  "/our-donors",
  "/media-hub",
  "/contact",
  "/faq",
  "/follow-us",
  "/privacy-policy",
  "/terms-of-use",
  "/transparency",
  "/donate",
  "/donate/philippines",
  "/donate/other-countries",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...publicPaths.map((path) => ({ url: `${productionOrigin}${path}` })),
    ...servicePages.map((service) => ({
      url: `${productionOrigin}/services/${service.slug}`,
    })),
  ];
}
