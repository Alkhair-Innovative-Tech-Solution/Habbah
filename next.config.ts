import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/application-process",
        destination: "/qarz-e-hasna",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
