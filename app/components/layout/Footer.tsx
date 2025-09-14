'use client'
import React from 'react'
import Link from 'next/link'
import { Button } from '../ui/Button'
import { useLanguage } from '../../contexts/LanguageContext'
import { cn } from '../../lib/utils'

interface FooterProps {
  className?: string
}

const Footer: React.FC<FooterProps> = ({ className }) => {
  const currentYear = new Date().getFullYear()
  const { t, isRTL } = useLanguage()

  const footerLinks = {
    company: [
      { name: t.footer.company.about, href: '/about' },
      { name: t.footer.company.story, href: '/story' },
      { name: t.footer.company.careers, href: '/careers' },
      { name: t.footer.company.press, href: '/press' },
    ],
    support: [
      { name: t.footer.support.helpCenter, href: '/help' },
      { name: t.footer.support.contact, href: '/contact' },
      { name: t.footer.support.shipping, href: '/shipping' },
      { name: t.footer.support.returns, href: '/returns' },
    ],
    legal: [
      { name: t.footer.legal.privacy, href: '/privacy' },
      { name: t.footer.legal.terms, href: '/terms' },
      { name: t.footer.legal.cookies, href: '/cookies' },
      { name: t.footer.legal.gdpr, href: '/gdpr' },
    ],
    categories: [
      { name: t.footer.categories.gaming, href: '/products?category=gaming' },
      { name: t.footer.categories.business, href: '/products?category=business' },
      { name: t.footer.categories.ultrabook, href: '/products?category=ultrabook' },
      { name: t.footer.categories.everyday, href: '/products?category=everyday' },
    ]
  }

  const socialLinks = [
    {
      name: 'Facebook',
      href: '#',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      )
    },
    {
      name: 'Twitter',
      href: '#',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
        </svg>
      )
    },
    {
      name: 'Instagram',
      href: '#',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.297-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.807.875 1.297 2.026 1.297 3.323s-.49 2.448-1.297 3.323c-.875.807-2.026 1.297-3.323 1.297zm7.718-1.297c-.875.807-2.026 1.297-3.323 1.297s-2.448-.49-3.323-1.297c-.807-.875-1.297-2.026-1.297-3.323s.49-2.448 1.297-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.807.875 1.297 2.026 1.297 3.323s-.49 2.448-1.297 3.323z"/>
        </svg>
      )
    },
    {
      name: 'LinkedIn',
      href: '#',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      )
    }
  ]

  const handleWhatsAppClick = () => {
    window.open('https://wa.me/201000000000', '_blank')
  }

  return (
    <footer role="contentinfo" className={cn('bg-gray-900 text-white border-t border-gray-800', className)} dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-500 text-text-inverse font-bold text-h6">
                HN
              </div>
              <div>
                <div className="text-h5 font-bold text-text-inverse">
                  {isRTL ? 'متجر H.N للحاسوب المحمول' : 'H.N Laptop Store'}
                </div>
                <div className="text-body-sm text-text-tertiary">
                  {isRTL ? 'أجهزة حاسوب محمولة متميزة' : 'Premium Laptops'}
                </div>
              </div>
            </Link>
            
            <p className="text-text-tertiary mb-8 max-w-md text-body-md leading-relaxed">
              {isRTL 
                ? 'شريكك الموثوق للحصول على أجهزة حاسوب محمولة متميزة. نقدم أفضل تشكيلة من الأجهزة الجديدة والمُجددة من أفضل العلامات التجارية مع ضمان الجودة والتوصيل المجاني في جميع أنحاء مصر.'
                : 'Your trusted partner for premium laptops. We offer the best selection of new and refurbished laptops from top brands with quality guarantee and free delivery across Egypt.'
              }
            </p>

            {/* Contact Info */}
            <div className="space-y-3 mb-8">
              <div className="flex items-center gap-3 text-text-tertiary">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span dir="ltr">+20 100 000 0000</span>
              </div>
              <div className="flex items-center gap-3 text-text-tertiary">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span dir="ltr">info@hnlaptopstore.com</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="flex items-center justify-center w-12 h-12 bg-neutral-800 hover:bg-neutral-700 rounded-md transition-colors duration-normal"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-h5 font-semibold mb-6 text-text-inverse">{t.footer.company.title}</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-text-tertiary hover:text-text-inverse transition-colors duration-normal text-body-md"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-h5 font-semibold mb-6 text-text-inverse">{t.footer.support.title}</h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-text-tertiary hover:text-text-inverse transition-colors duration-normal text-body-md"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-h5 font-semibold mb-6 text-text-inverse">{t.footer.categories.title}</h3>
            <ul className="space-y-3">
              {footerLinks.categories.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-text-tertiary hover:text-text-inverse transition-colors duration-normal text-body-md"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="border-t border-neutral-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8">
            <div className={`text-center ${isRTL ? 'md:text-right' : 'md:text-left'}`}>
              <h3 className="text-h5 font-semibold mb-3 text-text-inverse">{t.footer.newsletter.title}</h3>
              <p className="text-text-tertiary text-body-md">{t.footer.newsletter.description}</p>
            </div>
            <div className="flex w-full md:w-auto gap-3">
              <input
                type="email"
                placeholder={t.footer.newsletter.placeholder}
                className="flex-1 md:w-64 px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-md text-text-inverse placeholder-text-disabled focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-body-md"
                dir="auto"
              />
              <Button className="bg-primary-500 hover:bg-primary-600 text-text-inverse" size="md">
                {t.footer.newsletter.subscribe}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-neutral-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className={`text-text-disabled text-body-sm text-center ${isRTL ? 'md:text-right' : 'md:text-left'}`}>
              © {currentYear} {isRTL ? 'متجر H.N للحاسوب المحمول' : 'H.N Laptop Store'}. {t.footer.copyright}
            </div>
            
            <div className="flex flex-wrap items-center gap-6 text-body-sm" aria-label={isRTL ? "الروابط القانونية" : "Legal Links"}>
              {footerLinks.legal.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-text-disabled hover:text-text-inverse transition-colors duration-normal"
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <Button
              onClick={handleWhatsAppClick}
              size="sm"
              className="bg-success-500 hover:bg-success-600 text-text-inverse"
            >
              <svg className={`w-4 h-4 ${isRTL ? 'mr-2' : 'ml-2'}`} fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
              </svg>
              {t.footer.whatsapp}
            </Button>
          </div>
        </div>
      </div>
    </footer>
  )
}

export { Footer }
