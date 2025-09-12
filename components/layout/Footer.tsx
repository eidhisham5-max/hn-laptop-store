import React from 'react'
import Link from 'next/link'
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react'

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    shop: [
      { name: 'جميع اللابتوبات', href: '/products' },
      { name: 'لابتوبات الألعاب', href: '/products?category=gaming' },
      { name: 'لابتوبات الأعمال', href: '/products?category=business' },
      { name: 'لابتوبات الطلاب', href: '/products?category=student' },
      { name: 'الملحقات', href: '/accessories' },
    ],
    support: [
      { name: 'مركز المساعدة', href: '/help' },
      { name: 'الدعم الفني', href: '/support' },
      { name: 'الضمان', href: '/warranty' },
      { name: 'إرجاع المنتجات', href: '/returns' },
      { name: 'تتبع الطلب', href: '/track-order' },
    ],
    company: [
      { name: 'من نحن', href: '/about' },
      { name: 'وظائف', href: '/careers' },
      { name: 'الأخبار', href: '/news' },
      { name: 'الشروط والأحكام', href: '/terms' },
      { name: 'سياسة الخصوصية', href: '/privacy' },
    ],
  }

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, href: '#' },
    { name: 'Twitter', icon: Twitter, href: '#' },
    { name: 'Instagram', icon: Instagram, href: '#' },
    { name: 'YouTube', icon: Youtube, href: '#' },
  ]

  return (
    <footer className="bg-gray-800 text-white">
      <div className="container-custom">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-1">
              <Link href="/" className="flex items-center space-x-2 space-x-reverse mb-6">
                <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-lg">HN</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold">H.N Laptop Store</h3>
                  <p className="text-sm text-gray-400">بوابتك لعالم من الأداء الفائق</p>
                </div>
              </Link>
              
              <p className="text-gray-300 mb-6 leading-relaxed">
                متجر H.N للابتوبات - وجهتك الأولى للحصول على أفضل أجهزة الكمبيوتر المحمولة 
                والملحقات التقنية بأعلى جودة وأفضل الأسعار في المملكة العربية السعودية.
              </p>

              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3 space-x-reverse text-gray-300">
                  <Phone className="w-5 h-5 text-primary-400" />
                  <span>+966 50 123 4567</span>
                </div>
                <div className="flex items-center space-x-3 space-x-reverse text-gray-300">
                  <Mail className="w-5 h-5 text-primary-400" />
                  <span>info@hnlaptopstore.com</span>
                </div>
                <div className="flex items-center space-x-3 space-x-reverse text-gray-300">
                  <MapPin className="w-5 h-5 text-primary-400" />
                  <span>الرياض، المملكة العربية السعودية</span>
                </div>
              </div>
            </div>

            {/* Shop Links */}
            <div>
              <h4 className="text-lg font-semibold mb-6">التسوق</h4>
              <ul className="space-y-3">
                {footerLinks.shop.map((link) => (
                  <li key={link.name}>
                    <Link 
                      href={link.href}
                      className="text-gray-300 hover:text-primary-400 transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support Links */}
            <div>
              <h4 className="text-lg font-semibold mb-6">الدعم</h4>
              <ul className="space-y-3">
                {footerLinks.support.map((link) => (
                  <li key={link.name}>
                    <Link 
                      href={link.href}
                      className="text-gray-300 hover:text-primary-400 transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company Links */}
            <div>
              <h4 className="text-lg font-semibold mb-6">الشركة</h4>
              <ul className="space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <Link 
                      href={link.href}
                      className="text-gray-300 hover:text-primary-400 transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Newsletter Subscription */}
        <div className="py-8 border-t border-gray-700">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <div className="mb-6 lg:mb-0">
              <h4 className="text-lg font-semibold mb-2">اشترك في نشرتنا الإخبارية</h4>
              <p className="text-gray-300">احصل على آخر العروض والأخبار التقنية</p>
            </div>
            <div className="flex w-full lg:w-auto">
              <input
                type="email"
                placeholder="أدخل بريدك الإلكتروني"
                className="flex-1 lg:w-80 px-4 py-3 rounded-l-xl border border-gray-600 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              <button className="px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white font-medium rounded-r-xl transition-colors duration-200">
                اشتراك
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="py-6 border-t border-gray-700">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <div className="text-gray-400 text-sm mb-4 lg:mb-0">
              © {currentYear} H.N Laptop Store. جميع الحقوق محفوظة.
            </div>
            
            {/* Social Links */}
            <div className="flex items-center space-x-4 space-x-reverse">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <Link
                    key={social.name}
                    href={social.href}
                    className="p-2 text-gray-400 hover:text-primary-400 transition-colors duration-200"
                  >
                    <Icon className="w-5 h-5" />
                  </Link>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer