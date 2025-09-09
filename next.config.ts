import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
      },
      // Supabase storage domain (exact hostname)
      {
        protocol: 'https',
        hostname: 'whulchwxpwdoxemyovgg.supabase.co',
      }
    ],
  },
};

export default nextConfig;
