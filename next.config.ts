import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
