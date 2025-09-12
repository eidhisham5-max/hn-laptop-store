import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'H.N Laptop Store - متجر لابتوبات إلكتروني متكامل',
  description: 'اكتشف أفضل اللابتوبات والملحقات التقنية في H.N Laptop Store. منتجات أصلية، ضمان شامل، وتوصيل سريع في جميع أنحاء المملكة العربية السعودية.',
  keywords: 'لابتوبات، كمبيوتر محمول، تقنية، إلكترونيات، متجر، السعودية، ضمان، توصيل',
  authors: [{ name: 'H.N Laptop Store Team' }],
  creator: 'H.N Laptop Store',
  publisher: 'H.N Laptop Store',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://hnlaptopstore.com'),
  alternates: {
    canonical: '/',
    languages: {
      'ar-SA': '/ar',
      'en-US': '/en',
    },
  },
  openGraph: {
    title: 'H.N Laptop Store - متجر لابتوبات إلكتروني متكامل',
    description: 'اكتشف أفضل اللابتوبات والملحقات التقنية في H.N Laptop Store. منتجات أصلية، ضمان شامل، وتوصيل سريع.',
    url: 'https://hnlaptopstore.com',
    siteName: 'H.N Laptop Store',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'H.N Laptop Store - متجر لابتوبات إلكتروني',
      },
    ],
    locale: 'ar_SA',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'H.N Laptop Store - متجر لابتوبات إلكتروني متكامل',
    description: 'اكتشف أفضل اللابتوبات والملحقات التقنية في H.N Laptop Store.',
    images: ['/twitter-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#0052CC" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}