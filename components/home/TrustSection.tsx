'use client'

import React from 'react'
import { TrustBadge } from '@/components/ui/TrustBadge'
import { Shield, Truck, Headphones, Award, Clock, CreditCard } from 'lucide-react'

const TrustSection: React.FC = () => {
  const trustFeatures = [
    {
      icon: Truck,
      title: 'شحن مجاني',
      description: 'شحن مجاني لجميع الطلبات فوق 500 ريال'
    },
    {
      icon: Shield,
      title: 'ضمان شامل',
      description: 'ضمان شامل لمدة سنتين على جميع المنتجات'
    },
    {
      icon: Headphones,
      title: 'دعم فني 24/7',
      description: 'فريق دعم فني متاح على مدار الساعة'
    },
    {
      icon: Award,
      title: 'منتجات أصلية',
      description: 'جميع منتجاتنا أصلية 100% مع شهادات الضمان'
    },
    {
      icon: Clock,
      title: 'توصيل سريع',
      description: 'توصيل خلال 24-48 ساعة في جميع أنحاء المملكة'
    },
    {
      icon: CreditCard,
      title: 'دفع آمن',
      description: 'أنظمة دفع آمنة ومحمية بأعلى معايير الأمان'
    }
  ]

  const stats = [
    { number: '50K+', label: 'عميل راضي' },
    { number: '100K+', label: 'منتج مباع' },
    { number: '99%', label: 'معدل الرضا' },
    { number: '24/7', label: 'دعم فني' }
  ]

  return (
    <section className="section-padding bg-gray-50">
      <div className="container-custom">
        {/* Trust Features */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="heading-2 mb-4">لماذا تثق في H.N Laptop Store؟</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              نحن ملتزمون بتقديم أفضل تجربة تسوق وأعلى مستويات الجودة والخدمة
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {trustFeatures.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div
                  key={index}
                  className="text-center p-6 bg-white rounded-2xl shadow-soft hover:shadow-medium transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-primary-500" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-white rounded-3xl shadow-soft p-8 lg:p-12">
          <div className="text-center mb-8">
            <h3 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-4">
              أرقام تتحدث عن نفسها
            </h3>
            <p className="text-gray-600">
              انضم إلى آلاف العملاء الراضين الذين يثقون في خدماتنا
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-primary-500 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Customer Testimonials Preview */}
        <div className="mt-16">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              ماذا يقول عملاؤنا؟
            </h3>
            <p className="text-gray-600">
              آراء حقيقية من عملائنا الكرام
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'أحمد محمد',
                role: 'مطور برمجيات',
                content: 'خدمة ممتازة ومنتجات أصلية. توصيل سريع ودعم فني متميز.',
                rating: 5
              },
              {
                name: 'فاطمة علي',
                role: 'طالبة جامعية',
                content: 'لابتوب مثالي للدراسة. سعر مناسب وجودة عالية.',
                rating: 5
              },
              {
                name: 'خالد السعد',
                role: 'رائد أعمال',
                content: 'أفضل متجر لابتوبات في السعودية. أنصح الجميع بالتعامل معهم.',
                rating: 5
              }
            ].map((testimonial, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-2xl shadow-soft hover:shadow-medium transition-all duration-300"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 text-yellow-400 fill-current"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-600 mb-4 italic">
                  "{testimonial.content}"
                </p>
                <div>
                  <div className="font-semibold text-gray-800">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-gray-500">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default TrustSection