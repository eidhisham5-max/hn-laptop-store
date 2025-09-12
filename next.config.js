/** @type {import('next').NextConfig} */
const nextConfig = {
  // experimental: {
  //   appDir: true, // No longer needed in Next.js 15
  // },
  images: {
    domains: ['images.unsplash.com', 'via.placeholder.com', 'picsum.photos'],
    formats: ['image/webp', 'image/avif'],
  },
  // i18n: {
  //   locales: ['ar', 'en'],
  //   defaultLocale: 'ar',
  //   localeDetection: false,
  // }, // Not supported in App Router - use middleware instead
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
        ],
      },
    ]
  },
  async redirects() {
    return [
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig