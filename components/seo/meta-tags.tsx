import Head from 'next/head'

interface MetaTagsProps {
  title?: string
  description?: string
  keywords?: string
  image?: string
  url?: string
  type?: 'website' | 'article' | 'product'
  siteName?: string
  locale?: string
  canonical?: string
  noindex?: boolean
  nofollow?: boolean
  author?: string
  publishedTime?: string
  modifiedTime?: string
  section?: string
  tags?: string[]
  price?: string
  currency?: string
  availability?: 'in stock' | 'out of stock' | 'preorder'
  brand?: string
  category?: string
}

export function MetaTags({
  title = 'H.N Store - متجر لابتوبات إلكتروني متكامل',
  description = 'اكتشف أفضل اللابتوبات والتقنية في H.N Store. منتجات أصلية بأسعار منافسة مع ضمان الجودة والتوصيل المجاني.',
  keywords = 'لابتوبات, تقنية, أجهزة كمبيوتر, MacBook, Dell, ASUS, HP, Lenovo, جيمنج, أعمال, طلاب',
  image = '/og-image.jpg',
  url = 'https://hnstore.com',
  type = 'website',
  siteName = 'H.N Store',
  locale = 'ar_SA',
  canonical,
  noindex = false,
  nofollow = false,
  author,
  publishedTime,
  modifiedTime,
  section,
  tags,
  price,
  currency = 'SAR',
  availability,
  brand,
  category
}: MetaTagsProps) {
  const fullTitle = title.includes('H.N Store') ? title : `${title} - H.N Store`
  const fullUrl = canonical || url

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author || 'H.N Store'} />
      <meta name="robots" content={`${noindex ? 'noindex' : 'index'}, ${nofollow ? 'nofollow' : 'follow'}`} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#0052CC" />
      
      {/* Canonical URL */}
      {canonical && <link rel="canonical" href={canonical} />}
      
      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content={locale} />
      
      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      
      {/* Article Meta Tags */}
      {type === 'article' && (
        <>
          {publishedTime && <meta property="article:published_time" content={publishedTime} />}
          {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
          {author && <meta property="article:author" content={author} />}
          {section && <meta property="article:section" content={section} />}
          {tags && tags.map((tag, index) => (
            <meta key={index} property="article:tag" content={tag} />
          ))}
        </>
      )}
      
      {/* Product Meta Tags */}
      {type === 'product' && (
        <>
          {price && <meta property="product:price:amount" content={price} />}
          {currency && <meta property="product:price:currency" content={currency} />}
          {availability && <meta property="product:availability" content={availability} />}
          {brand && <meta property="product:brand" content={brand} />}
          {category && <meta property="product:category" content={category} />}
        </>
      )}
      
      {/* Additional Meta Tags */}
      <meta name="format-detection" content="telephone=no" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="H.N Store" />
      
      {/* Favicon */}
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      <link rel="manifest" href="/manifest.json" />
      
      {/* Preconnect to external domains */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://images.unsplash.com" />
      
      {/* DNS Prefetch */}
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      <link rel="dns-prefetch" href="//fonts.gstatic.com" />
      <link rel="dns-prefetch" href="//images.unsplash.com" />
    </Head>
  )
}

export function StructuredData({ data }: { data: any }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

export function ProductStructuredData({
  name,
  description,
  image,
  price,
  currency = 'SAR',
  availability = 'in stock',
  brand,
  category,
  rating,
  reviewCount
}: {
  name: string
  description: string
  image: string
  price: number
  currency?: string
  availability?: string
  brand: string
  category: string
  rating?: number
  reviewCount?: number
}) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    description,
    image,
    brand: {
      '@type': 'Brand',
      name: brand
    },
    category,
    offers: {
      '@type': 'Offer',
      price,
      priceCurrency: currency,
      availability: `https://schema.org/${availability === 'in stock' ? 'InStock' : 'OutOfStock'}`,
      seller: {
        '@type': 'Organization',
        name: 'H.N Store'
      }
    },
    ...(rating && reviewCount && {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: rating,
        reviewCount
      }
    })
  }

  return <StructuredData data={structuredData} />
}

export function OrganizationStructuredData() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'H.N Store',
    description: 'متجر لابتوبات إلكتروني متكامل في المملكة العربية السعودية',
    url: 'https://hnstore.com',
    logo: 'https://hnstore.com/logo.png',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+966-50-123-4567',
      contactType: 'customer service',
      availableLanguage: ['Arabic', 'English']
    },
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'SA',
      addressLocality: 'الرياض',
      addressRegion: 'منطقة الرياض'
    },
    sameAs: [
      'https://twitter.com/hnstore',
      'https://instagram.com/hnstore',
      'https://facebook.com/hnstore'
    ]
  }

  return <StructuredData data={structuredData} />
}
