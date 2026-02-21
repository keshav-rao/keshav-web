import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export', // Mandatory for GitHub Pages
  basePath: '/keshav-web', // Matches your repository name
  images: {
    unoptimized: true, // GitHub Pages doesn't support the default Next.js image optimizer
  },
};

export default nextConfig;
