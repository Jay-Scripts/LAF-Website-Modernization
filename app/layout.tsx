import type { Metadata } from "next";
import RouteScrollReset from "@/components/RouteScrollReset";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.littlearkfoundation.org"),
  title: {
    default: "Little Ark Foundation",
    template: "%s | Little Ark Foundation",
  },
  description:
    "Little Ark Foundation provides practical support, care, and hope for children and families facing critical illness.",
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Little Ark Foundation",
    title: "Little Ark Foundation",
    description:
      "Little Ark Foundation provides practical support, care, and hope for children and families facing critical illness.",
    images: [
      {
        url: "/images/media-hub/media-hub-hero-collage.jpg",
        width: 1920,
        height: 1080,
        alt: "Little Ark Foundation community collage",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Little Ark Foundation",
    description:
      "Little Ark Foundation provides practical support, care, and hope for children and families facing critical illness.",
    images: ["/images/media-hub/media-hub-hero-collage.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <RouteScrollReset />
        {children}
      </body>
    </html>
  );
}
