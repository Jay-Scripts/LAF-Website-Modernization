import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "Content-Security-Policy", value: "default-src 'self'; base-uri 'self'; frame-ancestors 'none'; form-action 'self' https://www.paypal.com https://www.paypal.com/* https://checkout.xendit.co; object-src 'none'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.youtube.com https://www.youtube-nocookie.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: https:; font-src 'self' data:; connect-src 'self' https://api-m.paypal.com https://api-m.sandbox.paypal.com https://api.xendit.co https://graph.facebook.com https://sheets.googleapis.com; frame-src https://www.youtube.com https://www.youtube-nocookie.com https://www.paypal.com https://checkout.xendit.co; media-src 'self'; upgrade-insecure-requests" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(self)" },
          { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains; preload" },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "littlearkfoundation.org",
          },
        ],
        destination: "https://www.littlearkfoundation.org/:path*",
        permanent: true,
      },
      {
        source: "/our-voyage-2",
        destination: "/our-voyage",
        permanent: true,
      },
      {
        source: "/get-on-board/partner",
        destination: "/get-on-board",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
