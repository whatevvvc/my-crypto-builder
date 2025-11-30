import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "utfs.io", // Allow UploadThing images
      },
      {
        protocol: "https",
        hostname: "img.clerk.com", // Allow Clerk User Avatars
      }
    ]
  }
};

export default nextConfig;