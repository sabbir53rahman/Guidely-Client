import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Add the new domain here, separated by a comma
    domains: ["images.unsplash.com", "i.pravatar.cc", "i.ibb.co"],
  },
  async headers() {
    return [
      {
        // Apply to all video files in the public folder
        source: "/images/:path*.mp4",
        headers: [
          {
            key: "Accept-Ranges",
            value: "bytes",
          },
          {
            key: "Content-Type",
            value: "video/mp4",
          },
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
