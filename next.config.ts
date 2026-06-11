import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  // For GitHub Pages deployment, uncomment and set to your repo name:
  // basePath: '/solace-by-fia',
  // assetPrefix: '/solace-by-fia',
};

export default nextConfig;
