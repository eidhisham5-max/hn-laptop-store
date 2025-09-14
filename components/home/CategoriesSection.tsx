'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { ArrowLeft } from 'lucide-react'

interface Category {
  id: number
  name: string
  description: string
  image: string
  productCount: number
  href: string
  icon: string
}

const CategoriesSection: React.FC = () => {
  const categories: Category[] = [
    {
      id: 1,
      name: 'لابتوبات الألعاب',
      description: 'أقوى لابتوبات للألعاب مع كروت الشاشة المتطورة',
      image: 'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2042&q=80',
      productCount: 45,
      href: '/products?category=gaming',
      icon: '🎮'
    },
    {
      id: 2,
      name: 'لابتوبات الأعمال',
      description: 'لابتوبات احترافية للمحترفين ورواد الأعمال',
      image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80',
      productCount: 32,
      href: '/products?category=business',
      icon: '💼'
    },
    {
      id: 3,
      name: 'لابتوبات الطلاب',
      description: 'لابتوبات مثالية للطلاب مع توازن مثالي بين الأداء والسعر',
      image: 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1964&q=80',
      productCount: 28,
      href: '/products?category=student',
      icon: '🎓'
    },
    {
      id: 4,
      name: 'الملحقات',
      description: 'جميع الملحقات التي تحتاجها مع لابتوبك',
      image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2006&q=80',
      productCount: 67,
      href: '/accessories',
      icon: '🔌'
    }
  ]

  return (
    <section className="section-padding">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="heading-2 mb-4">تسوق حسب الفئة</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            اكتشف مجموعتنا المتنوعة من اللابتوبات والملحقات المناسبة لجميع احتياجاتك
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category) => (
            <Link key={category.id} href={category.href}>
              <Card className="card-hover group cursor-pointer overflow-hidden">
                {/* Category Image */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-30 transition-all duration-300"></div>
                  
                  {/* Icon */}
                  <div className="absolute top-4 right-4 text-3xl">
                    {category.icon}
                  </div>
                  
                  {/* Product Count */}
                  <div className="absolute bottom-4 right-4 bg-white bg-opacity-90 backdrop-blur-sm rounded-lg px-3 py-1">
                    <span className="text-sm font-medium text-gray-700">
                      {category.productCount} منتج
                    </span>
                  </div>
                </div>

                {/* Category Info */}
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2 group-hover:text-primary-500 transition-colors duration-200">
                    {category.name}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {category.description}
                  </p>
                  
                  <div className="flex items-center text-primary-500 font-medium group-hover:text-primary-600 transition-colors duration-200">
                    <span>تسوق الآن</span>
                    <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform duration-200" />
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>

        {/* Special Offer Banner */}
        <div className="mt-16">
          <Card className="gradient-primary text-white overflow-hidden">
            <div className="p-8 lg:p-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-3xl lg:text-4xl font-bold mb-4">
                    عرض خاص على جميع اللابتوبات
                  </h3>
                  <p className="text-blue-100 text-lg mb-6">
                    احصل على خصم يصل إلى 30% على جميع اللابتوبات مع ضمان شامل لمدة سنتين
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button
                      size="lg"
                      className="bg-white text-primary-500 hover:bg-gray-100"
                      onClick={() => window.location.href = '/products?sale=true'}
                    >
                      تسوق العروض
                    </Button>
                    <Button
                      variant="outline"
                      size="lg"
                      className="border-white text-white hover:bg-white hover:text-primary-500"
                      onClick={() => window.location.href = '/offers'}
                    >
                      عرض جميع العروض
                    </Button>
                  </div>
                </div>
                
                <div className="relative">
                  <div className="aspect-square relative">
                    <Image
                      src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2026&q=80"
                      alt="Special Offer"
                      fill
                      className="object-cover rounded-2xl"
                    />
                  </div>
                  
                  {/* Floating Badge */}
                  <div className="absolute -top-4 -right-4 bg-error-500 text-white px-4 py-2 rounded-xl font-bold text-lg shadow-strong">
                    -30%
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}

export default CategoriesSection