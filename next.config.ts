import { withPayload } from "@payloadcms/next/withPayload";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        // Allow Payload CMS media served from same host
        protocol: "http",
        hostname: "localhost",
        port: "3000",
        pathname: "/media/**",
      },
      {
        // Production: allow media from any HTTPS host
        protocol: "https",
        hostname: "**",
        pathname: "/media/**",
      },
    ],
  },
};

export default withPayload(nextConfig);
