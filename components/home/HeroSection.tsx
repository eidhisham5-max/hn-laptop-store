'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/Button'
import { ChevronLeft, ChevronRight, Play } from 'lucide-react'

interface HeroSlide {
  id: number
  title: string
  subtitle: string
  description: string
  image: string
  ctaText: string
  ctaLink: string
  badge?: string
}

const HeroSection: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides: HeroSlide[] = [
    {
      id: 1,
      title: 'لابتوبات الألعاب الجديدة',
      subtitle: 'أداء فائق للاعبين المحترفين',
      description: 'اكتشف أحدث لابتوبات الألعاب بأقوى المعالجات وكروت الشاشة المتطورة',
      image: 'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2042&q=80',
      ctaText: 'تسوق الآن',
      ctaLink: '/products?category=gaming',
      badge: 'جديد'
    },
    {
      id: 2,
      title: 'لابتوبات الأعمال المتميزة',
      subtitle: 'إنتاجية عالية للمحترفين',
      description: 'لابتوبات مصممة خصيصاً لرواد الأعمال والمحترفين مع أداء استثنائي',
      image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80',
      ctaText: 'اكتشف المجموعة',
      ctaLink: '/products?category=business',
      badge: 'الأكثر مبيعاً'
    },
    {
      id: 3,
      title: 'لابتوبات الطلاب الذكية',
      subtitle: 'تعلم بذكاء مع أفضل التقنيات',
      description: 'لابتوبات مثالية للطلاب مع توازن مثالي بين الأداء والسعر',
      image: 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1964&q=80',
      ctaText: 'ابدأ رحلتك',
      ctaLink: '/products?category=student',
      badge: 'عرض خاص'
    }
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [slides.length])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  return (
    <section className="relative h-[600px] lg:h-[700px] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={slides[currentSlide]?.image || ''}
          alt={slides[currentSlide]?.title || ''}
          fill
          className="object-cover transition-all duration-1000"
          priority
        />
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container-custom">
          <div className="max-w-2xl">
            {/* Badge */}
            {slides[currentSlide]?.badge && (
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary-500 text-white text-sm font-medium mb-6 animate-slide-up">
                {slides[currentSlide]?.badge}
              </div>
            )}

            {/* Title */}
            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-4 animate-fade-in">
              {slides[currentSlide]?.title}
            </h1>

            {/* Subtitle */}
            <h2 className="text-xl lg:text-2xl text-blue-100 mb-6 animate-fade-in">
              {slides[currentSlide]?.subtitle}
            </h2>

            {/* Description */}
            <p className="text-lg text-gray-200 mb-8 leading-relaxed animate-fade-in">
              {slides[currentSlide]?.description}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 animate-slide-up">
              <Button
                size="lg"
                className="bg-primary-500 hover:bg-primary-600 text-white shadow-glow"
                onClick={() => window.location.href = slides[currentSlide]?.ctaLink || '#'}
              >
                {slides[currentSlide]?.ctaText}
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-gray-800"
                onClick={() => window.location.href = '/products'}
              >
                <Play className="w-5 h-5 ml-2" />
                عرض جميع المنتجات
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 p-3 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full text-white transition-all duration-200 backdrop-blur-sm"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 p-3 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full text-white transition-all duration-200 backdrop-blur-sm"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex space-x-2 space-x-reverse">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                index === currentSlide
                  ? 'bg-white scale-125'
                  : 'bg-white bg-opacity-50 hover:bg-opacity-75'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Trust Badges */}
      <div className="absolute bottom-8 right-8 z-20 hidden lg:block">
        <div className="bg-white bg-opacity-90 backdrop-blur-sm rounded-2xl p-4 shadow-soft">
          <div className="flex items-center space-x-4 space-x-reverse text-sm text-gray-700">
            <div className="flex items-center space-x-2 space-x-reverse">
              <div className="w-2 h-2 bg-success-500 rounded-full"></div>
              <span>شحن مجاني</span>
            </div>
            <div className="flex items-center space-x-2 space-x-reverse">
              <div className="w-2 h-2 bg-success-500 rounded-full"></div>
              <span>ضمان سنتين</span>
            </div>
            <div className="flex items-center space-x-2 space-x-reverse">
              <div className="w-2 h-2 bg-success-500 rounded-full"></div>
              <span>دعم 24/7</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection