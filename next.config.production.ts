import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Enable experimental features for better performance
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['@supabase/supabase-js'],
  },

  // Image optimization
  images: {
    formats: ['image/webp', 'image/avif'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
        port: '',
        pathname: '/**',
      },
    ],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
  },

  // Compression
  compress: true,

  // Security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains',
          },
        ],
      },
      {
        source: '/api/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store, max-age=0',
          },
        ],
      },
    ]
  },

  // Redirects for SEO
  async redirects() {
    return [
      {
        source: '/admin',
        destination: '/admin/products',
        permanent: false,
      },
    ]
  },

  // Bundle analyzer (only in production builds)
  ...(process.env.ANALYZE === 'true' && {
    webpack: (config: any) => {
      config.plugins.push(
        new (require('webpack-bundle-analyzer').BundleAnalyzerPlugin)({
          analyzerMode: 'static',
          openAnalyzer: false,
        })
      )
      return config
    },
  }),

  // Environment-specific configurations
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },

  // Output configuration for static export (if needed)
  // output: 'export',
  // trailingSlash: true,
  // images: {
  //   unoptimized: true
  // },

  // Performance optimizations
  swcMinify: true,
  
  // Enable React strict mode
  reactStrictMode: true,

  // Power by header removal
  poweredByHeader: false,
}

export default nextConfig
