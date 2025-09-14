import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { CartProvider } from '@/contexts/cart-context'
import { AuthProvider } from '@/contexts/auth-context'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ 
  subsets: ['latin', 'arabic'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'H.N Store - متجر لابتوبات إلكتروني متكامل',
    template: '%s | H.N Store'
  },
  description: 'اكتشف أفضل اللابتوبات والملحقات التقنية في H.N Store. منتجات أصلية، ضمان شامل، وتوصيل سريع في جميع أنحاء المملكة العربية السعودية.',
  keywords: [
    'لابتوبات',
    'كمبيوتر محمول',
    'تقنية',
    'إلكترونيات',
    'متجر',
    'السعودية',
    'ضمان',
    'توصيل',
    'H.N Store',
    'laptops',
    'computers',
    'technology',
    'electronics',
    'Saudi Arabia'
  ],
  authors: [{ name: 'H.N Store Team' }],
  creator: 'H.N Store',
  publisher: 'H.N Store',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://hnstore.com'),
  alternates: {
    canonical: '/',
    languages: {
      'ar-SA': '/ar',
      'en-US': '/en',
    },
  },
  openGraph: {
    title: 'H.N Store - متجر لابتوبات إلكتروني متكامل',
    description: 'اكتشف أفضل اللابتوبات والملحقات التقنية في H.N Store. منتجات أصلية، ضمان شامل، وتوصيل سريع.',
    url: 'https://hnstore.com',
    siteName: 'H.N Store',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'H.N Store - متجر لابتوبات إلكتروني',
      },
    ],
    locale: 'ar_SA',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'H.N Store - متجر لابتوبات إلكتروني متكامل',
    description: 'اكتشف أفضل اللابتوبات والملحقات التقنية في H.N Store.',
    images: ['/twitter-image.jpg'],
    creator: '@hnstore',
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
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
  category: 'technology',
  classification: 'Electronics Store',
  other: {
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
    'apple-mobile-web-app-title': 'H.N Store',
    'application-name': 'H.N Store',
    'msapplication-TileColor': '#0052CC',
    'theme-color': '#0052CC',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ar" dir="rtl" className={inter.variable}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#0052CC" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://images.unsplash.com" />
        
        {/* DNS prefetch for performance */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//images.unsplash.com" />
        
        {/* Structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Store',
              name: 'H.N Store',
              description: 'متجر لابتوبات إلكتروني متكامل في المملكة العربية السعودية',
              url: 'https://hnstore.com',
              logo: 'https://hnstore.com/logo.png',
              image: 'https://hnstore.com/og-image.jpg',
              telephone: '+966501234567',
              email: 'info@hnstore.com',
              address: {
                '@type': 'PostalAddress',
                streetAddress: 'الرياض',
                addressLocality: 'الرياض',
                addressRegion: 'منطقة الرياض',
                addressCountry: 'SA',
              },
              openingHours: 'Mo-Su 09:00-22:00',
              priceRange: '$$',
              paymentAccepted: ['Cash', 'Credit Card', 'PayPal'],
              currenciesAccepted: 'SAR',
              sameAs: [
                'https://facebook.com/hnstore',
                'https://twitter.com/hnstore',
                'https://instagram.com/hnstore',
              ],
            }),
          }}
        />
      </head>
      <body className={`${inter.className} antialiased`}>
        <AuthProvider>
          <CartProvider>
            <div className="min-h-screen flex flex-col">
              <Header />
              <main className="flex-1">
                {children}
              </main>
              <Footer />
            </div>
            <Toaster
              position="top-center"
              toastOptions={{
                duration: 4000,
                style: {
                  background: 'hsl(var(--background))',
                  color: 'hsl(var(--foreground))',
                  border: '1px solid hsl(var(--border))',
                },
                success: {
                  iconTheme: {
                    primary: 'hsl(var(--success))',
                    secondary: 'hsl(var(--success-foreground))',
                  },
                },
                error: {
                  iconTheme: {
                    primary: 'hsl(var(--destructive))',
                    secondary: 'hsl(var(--destructive-foreground))',
                  },
                },
              }}
            />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  )
}