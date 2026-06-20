import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
    // Permit Sanity-hosted image URLs (static export + unoptimized → just allow the host).
    remotePatterns: [
      { protocol: "https", hostname: "cdn.sanity.io" },
    ],
  },
  // For GitHub Pages deployment, uncomment and set to your repo name:
  // basePath: '/solace-by-fia',
  // assetPrefix: '/solace-by-fia',
};

export default nextConfig;
