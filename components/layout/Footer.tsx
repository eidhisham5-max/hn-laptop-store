'use client'

import React from 'react'
import Link from 'next/link'
import { Facebook, Twitter, Instagram, Youtube, Linkedin, Mail, Phone, MapPin, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

interface FooterProps {
  className?: string
}

export function Footer({ className }: FooterProps) {
  const currentYear = new Date().getFullYear()

  // Footer sections
  const footerSections = [
    {
      title: 'المتجر',
      links: [
        { name: 'الرئيسية', href: '/' },
        { name: 'المنتجات', href: '/products' },
        { name: 'العروض', href: '/offers' },
        { name: 'العلامات التجارية', href: '/brands' },
        { name: 'من نحن', href: '/about' },
        { name: 'اتصل بنا', href: '/contact' },
      ],
    },
    {
      title: 'المنتجات',
      links: [
        { name: 'اللابتوبات', href: '/products?category=laptops' },
        { name: 'التابلت', href: '/products?category=tablets' },
        { name: 'الهواتف', href: '/products?category=phones' },
        { name: 'أجهزة الجيمنج', href: '/products?category=gaming' },
        { name: 'الإكسسوارات', href: '/products?category=accessories' },
        { name: 'الأعمال', href: '/products?category=business' },
      ],
    },
    {
      title: 'خدمة العملاء',
      links: [
        { name: 'مركز المساعدة', href: '/help' },
        { name: 'شروط الاستخدام', href: '/terms' },
        { name: 'سياسة الخصوصية', href: '/privacy' },
        { name: 'سياسة الإرجاع', href: '/returns' },
        { name: 'الأسئلة الشائعة', href: '/faq' },
        { name: 'دليل الاستخدام', href: '/guide' },
      ],
    },
    {
      title: 'حسابي',
      links: [
        { name: 'تسجيل الدخول', href: '/auth/login' },
        { name: 'إنشاء حساب', href: '/auth/register' },
        { name: 'طلباتي', href: '/orders' },
        { name: 'المفضلة', href: '/wishlist' },
        { name: 'العربة', href: '/cart' },
        { name: 'الإعدادات', href: '/settings' },
      ],
    },
  ]

  // Social media links
  const socialLinks = [
    { name: 'Facebook', href: '#', icon: Facebook },
    { name: 'Twitter', href: '#', icon: Twitter },
    { name: 'Instagram', href: '#', icon: Instagram },
    { name: 'YouTube', href: '#', icon: Youtube },
    { name: 'LinkedIn', href: '#', icon: Linkedin },
  ]

  // Payment methods
  const paymentMethods = [
    { name: 'Visa', logo: '💳' },
    { name: 'Mastercard', logo: '💳' },
    { name: 'American Express', logo: '💳' },
    { name: 'PayPal', logo: '💳' },
    { name: 'Apple Pay', logo: '🍎' },
    { name: 'Google Pay', logo: '📱' },
  ]

  return (
    <footer className={cn('bg-muted/50 border-t', className)}>
      {/* Main footer content */}
      <div className="container-custom">
        <div className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
            {/* Company info */}
            <div className="lg:col-span-2">
              <Link href="/" className="flex items-center space-x-2 space-x-reverse mb-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold">
                  HN
                </div>
                <span className="text-xl font-bold text-primary">H.N Store</span>
              </Link>
              <p className="text-muted-foreground mb-6 max-w-md">
                متجر H.N للابتوبات والتقنية - وجهتك الأولى للحصول على أفضل الأجهزة التقنية 
                بأسعار تنافسية وخدمة عملاء متميزة في المملكة العربية السعودية.
              </p>
              
              {/* Contact info */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3 space-x-reverse text-sm text-muted-foreground">
                  <Phone className="h-4 w-4" />
                  <span>+966 50 123 4567</span>
                </div>
                <div className="flex items-center space-x-3 space-x-reverse text-sm text-muted-foreground">
                  <Mail className="h-4 w-4" />
                  <span>info@hnstore.com</span>
                </div>
                <div className="flex items-center space-x-3 space-x-reverse text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>الرياض، المملكة العربية السعودية</span>
                </div>
              </div>

              {/* Social media */}
              <div className="mt-6">
                <h4 className="text-sm font-semibold mb-3">تابعنا</h4>
                <div className="flex space-x-2 space-x-reverse">
                  {socialLinks.map((social) => (
                    <Button
                      key={social.name}
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      asChild
                    >
                      <Link href={social.href} aria-label={social.name}>
                        <social.icon className="h-4 w-4" />
                      </Link>
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer sections */}
            {footerSections.map((section) => (
              <div key={section.title}>
                <h4 className="text-sm font-semibold mb-4">{section.title}</h4>
                <ul className="space-y-2">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Newsletter section */}
        <div className="border-t py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-lg font-semibold mb-2">اشترك في نشرتنا الإخبارية</h3>
              <p className="text-muted-foreground">
                احصل على آخر العروض والمنتجات الجديدة مباشرة في بريدك الإلكتروني
              </p>
            </div>
            <div className="flex space-x-2 space-x-reverse">
              <Input
                type="email"
                placeholder="أدخل بريدك الإلكتروني"
                className="flex-1"
              />
              <Button>اشترك</Button>
            </div>
          </div>
        </div>

        {/* Payment methods */}
        <div className="border-t py-6">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="text-sm font-semibold mb-3">طرق الدفع المقبولة</h4>
              <div className="flex flex-wrap gap-2">
                {paymentMethods.map((method) => (
                  <div
                    key={method.name}
                    className="flex items-center space-x-1 space-x-reverse px-3 py-1 bg-background rounded-md border text-xs"
                  >
                    <span>{method.logo}</span>
                    <span>{method.name}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Trust badges */}
            <div className="flex items-center space-x-4 space-x-reverse text-xs text-muted-foreground">
              <div className="flex items-center space-x-1 space-x-reverse">
                <span>🔒</span>
                <span>دفع آمن</span>
              </div>
              <div className="flex items-center space-x-1 space-x-reverse">
                <span>🚚</span>
                <span>شحن سريع</span>
              </div>
              <div className="flex items-center space-x-1 space-x-reverse">
                <span>🔄</span>
                <span>إرجاع مجاني</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t py-6">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
            <div className="text-sm text-muted-foreground">
              © {currentYear} H.N Store. جميع الحقوق محفوظة.
            </div>
            
            <div className="flex items-center space-x-4 space-x-reverse text-sm text-muted-foreground">
              <Link href="/terms" className="hover:text-primary transition-colors">
                شروط الاستخدام
              </Link>
              <Link href="/privacy" className="hover:text-primary transition-colors">
                سياسة الخصوصية
              </Link>
              <Link href="/cookies" className="hover:text-primary transition-colors">
                سياسة ملفات تعريف الارتباط
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Back to top button */}
      <Button
        variant="outline"
        size="icon"
        className="fixed bottom-6 left-6 z-40 h-10 w-10 rounded-full shadow-lg"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <ArrowLeft className="h-4 w-4 rotate-90" />
      </Button>
    </footer>
  )
}

export default Footer