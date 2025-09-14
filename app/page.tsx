'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { 
  ArrowLeft, 
  Star, 
  Shield, 
  Truck, 
  Headphones, 
  Award,
  Laptop,
  Smartphone,
  Monitor,
  Zap,
  ChevronLeft,
  ChevronRight,
  Play,
  CheckCircle,
  Heart,
  Search
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { ProductService } from '@/lib/data/products'
import { Product } from '@/lib/types'
import { useCart } from '@/contexts/cart-context'
import { cn } from '@/lib/utils'

export default function HomePage() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([])
  const [newProducts, setNewProducts] = useState<Product[]>([])
  const [onSaleProducts, setOnSaleProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [currentSlide, setCurrentSlide] = useState(0)
  const { addItem } = useCart()

  // Load products
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const [featured, newProductsData, onSale] = await Promise.all([
          ProductService.getFeaturedProducts(),
          ProductService.getNewProducts(),
          ProductService.getProductsOnSale(),
        ])
        
        setFeaturedProducts(featured?.slice(0, 6) || [])
        setNewProducts(newProductsData?.slice(0, 4) || [])
        setOnSaleProducts(onSale?.slice(0, 4) || [])
      } catch (error) {
        console.error('Failed to load products:', error)
      } finally {
        setLoading(false)
      }
    }

    loadProducts()
  }, [])

  // Hero slides
  const heroSlides = [
    {
      id: 1,
      title: 'MacBook Pro 16" M3 Max',
      subtitle: 'أقوى معالج في تاريخ MacBook',
      description: 'اكتشف القوة الحقيقية للإبداع مع MacBook Pro 16 بمعالج M3 Max الجديد',
      image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=1200&h=600&fit=crop',
      price: 12999,
      originalPrice: 14999,
      cta: 'اكتشف الآن',
      ctaLink: '/products/1',
    },
    {
      id: 2,
      title: 'Dell XPS 15 OLED',
      subtitle: 'شاشة مذهلة وأداء قوي',
      description: 'تجربة بصرية استثنائية مع أداء قوي للمحترفين',
      image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=1200&h=600&fit=crop',
      price: 8999,
      originalPrice: 10999,
      cta: 'تسوق الآن',
      ctaLink: '/products/2',
    },
    {
      id: 3,
      title: 'ASUS ROG Strix G15',
      subtitle: 'لابتوب جيمنج قوي',
      description: 'أداء عالي للاعبين مع كارت RTX 4060',
      image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=1200&h=600&fit=crop',
      price: 6500,
      originalPrice: 7500,
      cta: 'اكتشف الألعاب',
      ctaLink: '/products/5',
    },
  ]

  // Features
  const features = [
    {
      icon: Shield,
      title: 'ضمان الجودة',
      description: 'جميع المنتجات مضمونة الجودة مع ضمان شامل من الشركة المصنعة',
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      icon: Truck,
      title: 'توصيل سريع',
      description: 'توصيل مجاني لجميع أنحاء المملكة خلال 24-48 ساعة',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      icon: Headphones,
      title: 'دعم فني 24/7',
      description: 'فريق دعم فني متاح على مدار الساعة لمساعدتك',
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
    {
      icon: Award,
      title: 'أفضل الأسعار',
      description: 'نضمن لك أفضل الأسعار في السوق السعودي',
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
    },
  ]

  // Stats
  const stats = [
    { number: '10,000+', label: 'عميل راضي', icon: '👥' },
    { number: '5,000+', label: 'منتج متاح', icon: '📦' },
    { number: '99%', label: 'معدل الرضا', icon: '⭐' },
    { number: '24/7', label: 'دعم فني', icon: '🛠️' },
  ]

  // Categories
  const categories = [
    { 
      icon: Laptop, 
      name: 'اللابتوبات', 
      count: '2,500+', 
      color: 'bg-blue-500',
      href: '/products?category=laptops',
      description: 'أفضل اللابتوبات للمحترفين والطلاب'
    },
    { 
      icon: Smartphone, 
      name: 'الهواتف', 
      count: '1,800+', 
      color: 'bg-green-500',
      href: '/products?category=phones',
      description: 'أحدث الهواتف الذكية'
    },
    { 
      icon: Monitor, 
      name: 'الشاشات', 
      count: '800+', 
      color: 'bg-purple-500',
      href: '/products?category=monitors',
      description: 'شاشات عالية الجودة'
    },
    { 
      icon: Zap, 
      name: 'الإكسسوارات', 
      count: '1,200+', 
      color: 'bg-orange-500',
      href: '/products?category=accessories',
      description: 'إكسسوارات تقنية متنوعة'
    },
  ]

  // Testimonials
  const testimonials = [
    {
      id: 1,
      name: 'أحمد محمد',
      role: 'مطور ويب',
      content: 'خدمة ممتازة ومنتجات عالية الجودة. أنصح الجميع بالتعامل مع H.N Store',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    },
    {
      id: 2,
      name: 'فاطمة أحمد',
      role: 'مصممة جرافيك',
      content: 'MacBook Pro الذي اشتريته من هنا رائع جداً. شكراً لكم على الخدمة المتميزة',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
    },
    {
      id: 3,
      name: 'محمد العلي',
      role: 'طالب جامعي',
      content: 'سعر مناسب وجودة ممتازة. التوصيل كان سريع جداً',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    },
  ]

  // Auto-rotate hero slides
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % (heroSlides?.length || 1))
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + (heroSlides?.length || 1)) % (heroSlides?.length || 1))
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[80vh] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={heroSlides[currentSlide]?.image || '/placeholder.jpg'}
            alt={heroSlides[currentSlide]?.title || 'Hero Slide'}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        
        <div className="relative z-10 h-full flex items-center">
          <div className="container-custom">
            <div className="max-w-2xl">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <Badge variant="secondary" className="mb-4">
                  {heroSlides[currentSlide]?.subtitle}
                </Badge>
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                  {heroSlides[currentSlide]?.title}
                </h1>
                <p className="text-xl text-white/90 mb-8 max-w-xl">
                  {heroSlides[currentSlide]?.description}
                </p>
                <div className="flex items-center space-x-4 space-x-reverse mb-8">
                  <span className="text-3xl font-bold text-white">
                    {heroSlides[currentSlide]?.price?.toLocaleString()} ريال
                  </span>
                  {heroSlides[currentSlide]?.originalPrice && (
                    <span className="text-xl text-white/70 line-through">
                      {heroSlides[currentSlide]?.originalPrice?.toLocaleString()} ريال
                    </span>
                  )}
                </div>
                <div className="flex space-x-4 space-x-reverse">
                  <Button size="lg" asChild>
                    <Link href={heroSlides[currentSlide]?.ctaLink || '#'}>
                      {heroSlides[currentSlide]?.cta}
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-black">
                    <Play className="w-4 h-4 ml-2" />
                    شاهد الفيديو
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Slide controls */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 space-x-reverse">
          {heroSlides?.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={cn(
                'w-3 h-3 rounded-full transition-all duration-300',
                index === currentSlide ? 'bg-white' : 'bg-white/50'
              )}
            />
          ))}
        </div>

        {/* Navigation arrows */}
        <button
          onClick={prevSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl mb-2">{stat.icon}</div>
                <div className="text-3xl md:text-4xl font-bold mb-2">
                  {stat.number}
                </div>
                <div className="text-primary-foreground/80">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-background">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              تصفح الفئات
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              اكتشف مجموعتنا الواسعة من المنتجات التقنية المختارة بعناية
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer h-full">
                  <Link href={category.href}>
                    <CardContent className="p-8 text-center">
                      <div className={`w-16 h-16 ${category.color} rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                        <category.icon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-xl font-semibold mb-2">
                        {category.name}
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        {category.description}
                      </p>
                      <div className="text-sm text-primary font-medium">
                        {category.count} منتج
                      </div>
                    </CardContent>
                  </Link>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-muted/50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              المنتجات المميزة
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              أفضل المنتجات المختارة خصيصاً لك من أحدث التقنيات
            </p>
          </div>
          
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, index) => (
                <Card key={index} className="animate-pulse">
                  <div className="aspect-square bg-muted rounded-t-lg" />
                  <CardContent className="p-6">
                    <div className="h-4 bg-muted rounded mb-2" />
                    <div className="h-4 bg-muted rounded mb-4 w-2/3" />
                    <div className="h-6 bg-muted rounded w-1/2" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
                    <Link href={`/products/${product.slug}`}>
                      <div className="relative aspect-square overflow-hidden">
                        <Image
                          src={product.images[0]?.url || '/placeholder.jpg'}
                          alt={product.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        {product.isOnSale && (
                          <Badge variant="destructive" className="absolute top-4 right-4">
                            -{product.discount}%
                          </Badge>
                        )}
                        {product.isNew && (
                          <Badge variant="secondary" className="absolute top-4 left-4">
                            جديد
                          </Badge>
                        )}
                      </div>
                    </Link>
                    
                    <CardContent className="p-6">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <Badge variant="outline" className="text-xs">
                            {product.brand}
                          </Badge>
                          <div className="flex items-center space-x-1 space-x-reverse">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm text-muted-foreground">
                              {product.rating} ({product.reviewCount})
                            </span>
                          </div>
                        </div>
                        
                        <Link href={`/products/${product.slug}`}>
                          <h3 className="font-semibold text-lg line-clamp-2 group-hover:text-primary transition-colors">
                            {product.name}
                          </h3>
                        </Link>
                        
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {product.shortDescription}
                        </p>
                        
                        <div className="flex items-center space-x-2 space-x-reverse">
                          <span className="text-xl font-bold text-primary">
                            {product.price.toLocaleString()} ريال
                          </span>
                          {product.originalPrice && (
                            <span className="text-sm text-muted-foreground line-through">
                              {product.originalPrice.toLocaleString()} ريال
                            </span>
                          )}
                        </div>
                        
                        <div className="flex items-center space-x-2 space-x-reverse">
                          <div className={`w-2 h-2 rounded-full ${product.stock > 0 ? 'bg-green-500' : 'bg-red-500'}`} />
                          <span className={`text-sm ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {product.stock > 0 ? 'متوفر' : 'نفد المخزون'}
                          </span>
                        </div>
                      </div>
                      
                      <div className="mt-6 flex space-x-2 space-x-reverse">
                        <Button
                          className="flex-1"
                          onClick={() => addItem(product, 1)}
                          disabled={product.stock === 0}
                        >
                          {product.stock > 0 ? 'أضف للسلة' : 'نفد المخزون'}
                        </Button>
                        <Button variant="outline" size="icon">
                          <Heart className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
          
          <div className="text-center mt-12">
            <Button size="lg" asChild>
              <Link href="/products">
                عرض جميع المنتجات
                <ArrowLeft className="w-4 h-4 mr-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              لماذا تختارنا؟
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              نحن نقدم أفضل الخدمات لعملائنا الكرام مع ضمان الجودة والرضا
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="text-center hover:shadow-lg transition-all duration-300 h-full">
                  <CardContent className="p-8">
                    <div className={`w-16 h-16 ${feature.bgColor} rounded-full flex items-center justify-center mx-auto mb-6`}>
                      <feature.icon className={`w-8 h-8 ${feature.color}`} />
                    </div>
                    <h3 className="text-xl font-semibold mb-4">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-muted/50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              آراء عملائنا
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              اكتشف ما يقوله عملاؤنا عن تجربتهم معنا
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-1 space-x-reverse mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-muted-foreground mb-6 italic">
                      "{testimonial.content}"
                    </p>
                    <div className="flex items-center space-x-3 space-x-reverse">
                      <Image
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        width={48}
                        height={48}
                        className="rounded-full"
                      />
                      <div>
                        <h4 className="font-semibold">{testimonial.name}</h4>
                        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              اشترك في نشرتنا الإخبارية
            </h2>
            <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              احصل على آخر العروض والمنتجات الجديدة مباشرة في بريدك الإلكتروني
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <Input
                type="email"
                placeholder="أدخل بريدك الإلكتروني"
                className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-white/70 focus:bg-white/20"
              />
              <Button className="bg-white text-primary hover:bg-white/90">
                اشترك الآن
              </Button>
            </div>
            <p className="text-sm text-primary-foreground/70 mt-4">
              يمكنك إلغاء الاشتراك في أي وقت. نحترم خصوصيتك.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}