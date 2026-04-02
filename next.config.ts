import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Add the new domain here, separated by a comma
    domains: ["images.unsplash.com", "i.pravatar.cc", "i.ibb.co"],
  },
};

export default nextConfig;
