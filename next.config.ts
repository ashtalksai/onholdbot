import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable standalone output for Docker deployment
  output: "standalone",
  
  // Disable image optimization in favor of external CDN
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
