import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export', // Required for GitHub Pages
  basePath: '/keshav-web', // Matches your repo name
  assetPrefix: '/keshav-web/', // Ensures files load correctly
  images: {
    unoptimized: true, // Necessary for static exports
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
};

export default nextConfig;
