'use client'
import React, { useState, useEffect } from 'react'
import { getProducts, Product } from './data/products'
import { ProductCard } from './components/ui/ProductCard'
import { Button } from './components/ui/Button'
import { Badge } from './components/ui/Badge'
import { Card, CardContent } from './components/ui/Card'
import { 
  Star, 
  Shield, 
  Truck, 
  Headphones, 
  Award, 
  TrendingUp,
  Laptop,
  Smartphone,
  Monitor,
  Zap
} from 'lucide-react'

export default function Home() {
  const [products, setProducts] = useState<Product[]>([])
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([])

  useEffect(() => {
    const allProducts = getProducts()
    setProducts(allProducts)
    setFeaturedProducts(allProducts.slice(0, 6))
  }, [])

  const features = [
    {
      icon: Shield,
      title: "ضمان الجودة",
      description: "جميع المنتجات مضمونة الجودة مع ضمان شامل"
    },
    {
      icon: Truck,
      title: "توصيل سريع",
      description: "توصيل مجاني لجميع أنحاء مصر خلال 24-48 ساعة"
    },
    {
      icon: Headphones,
      title: "دعم فني 24/7",
      description: "فريق دعم فني متاح على مدار الساعة لمساعدتك"
    },
    {
      icon: Award,
      title: "أفضل الأسعار",
      description: "نضمن لك أفضل الأسعار في السوق المصري"
    }
  ]

  const stats = [
    { number: "10,000+", label: "عميل راضي" },
    { number: "5,000+", label: "منتج متاح" },
    { number: "99%", label: "معدل الرضا" },
    { number: "24/7", label: "دعم فني" }
  ]

  const categories = [
    { icon: Laptop, name: "لابتوبات", count: "2,500+", color: "bg-blue-500" },
    { icon: Smartphone, name: "هواتف", count: "1,800+", color: "bg-green-500" },
    { icon: Monitor, name: "شاشات", count: "800+", color: "bg-purple-500" },
    { icon: Zap, name: "إكسسوارات", count: "1,200+", color: "bg-orange-500" }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              H.N Laptop Store
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
              أفضل أجهزة الكمبيوتر المحمولة والهواتف الذكية بأسعار لا تقبل المنافسة
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                تسوق الآن
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                عرض المنتجات
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              تصفح الفئات
            </h2>
            <p className="text-xl text-gray-600">
              اكتشف مجموعتنا الواسعة من المنتجات التقنية
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <div className={`w-16 h-16 ${category.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <category.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {category.name}
                  </h3>
                  <p className="text-gray-600">{category.count}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              المنتجات المميزة
            </h2>
            <p className="text-xl text-gray-600">
              أفضل المنتجات المختارة خصيصاً لك
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              عرض جميع المنتجات
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              لماذا تختارنا؟
            </h2>
            <p className="text-xl text-gray-600">
              نحن نقدم أفضل الخدمات لعملائنا الكرام
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            اشترك في نشرتنا الإخبارية
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            احصل على آخر العروض والمنتجات الجديدة مباشرة في بريدك الإلكتروني
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="أدخل بريدك الإلكتروني"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <Button className="bg-white text-blue-600 hover:bg-gray-100">
              اشترك
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}