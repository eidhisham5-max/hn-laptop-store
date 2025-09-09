import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // تحسين الصور
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
      {
        protocol: 'https',
        hostname: 'whulchwxpwdoxemyovgg.supabase.co',
      }
    ],
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  
  // تحسين الأداء
  experimental: {
    optimizePackageImports: ['@supabase/supabase-js'],
  },
  
  // ضغط
  compress: true,
  
  // Headers للأمان والأداء
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          }
        ]
      },
      {
        source: '/api/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store, no-cache, must-revalidate'
          }
        ]
      }
    ]
  },
  
  // إعادة توجيه
  async redirects() {
    return [
      {
        source: '/products',
        destination: '/#products',
        permanent: true
      },
      {
        source: '/brands',
        destination: '/#brands',
        permanent: true
      }
    ]
  }
};

export default nextConfig;
