'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { 
  Percent, 
  Clock, 
  Star, 
  ShoppingCart, 
  Heart,
  ArrowLeft,
  Filter,
  SortAsc,
  Tag,
  Calendar,
  Zap
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ProductService } from '@/lib/data/products'
import { Product } from '@/lib/types'
import { useCart } from '@/contexts/cart-context'
import { formatPrice, cn } from '@/lib/utils'

export default function OffersPage() {
  const { addItem } = useCart()
  const [offers, setOffers] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [sortBy, setSortBy] = useState('discount')
  const [filterBy, setFilterBy] = useState('all')

  // Load offers
  useEffect(() => {
    const loadOffers = async () => {
      try {
        setLoading(true)
        const allProducts = await ProductService.getAllProducts()
        const onSaleProducts = allProducts.filter(product => product.isOnSale)
        setOffers(onSaleProducts)
      } catch (error) {
        console.error('Failed to load offers:', error)
      } finally {
        setLoading(false)
      }
    }

    loadOffers()
  }, [])

  // Sort offers
  const sortedOffers = [...offers].sort((a, b) => {
    switch (sortBy) {
      case 'discount':
        return (b.discount || 0) - (a.discount || 0)
      case 'price-low':
        return a.price - b.price
      case 'price-high':
        return b.price - a.price
      case 'rating':
        return b.rating - a.rating
      case 'newest':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      default:
        return 0
    }
  })

  // Filter offers
  const filteredOffers = sortedOffers.filter(offer => {
    if (filterBy === 'all') return true
    if (filterBy === 'high-discount') return (offer.discount || 0) >= 30
    if (filterBy === 'laptops') return offer.category === 'laptops'
    if (filterBy === 'gaming') return offer.category === 'gaming'
    if (filterBy === 'accessories') return offer.category === 'accessories'
    return true
  })

  // Featured offers
  const featuredOffers = [
    {
      id: 1,
      title: 'خصم 50% على جميع اللابتوبات',
      description: 'عرض محدود لمدة 7 أيام فقط',
      discount: 50,
      image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&h=400&fit=crop',
      validUntil: '2024-02-15',
      category: 'laptops'
    },
    {
      id: 2,
      title: 'خصم 30% على أجهزة الجيمنج',
      description: 'أقوى أجهزة الجيمنج بأسعار لا تقاوم',
      discount: 30,
      image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=800&h=400&fit=crop',
      validUntil: '2024-02-20',
      category: 'gaming'
    },
    {
      id: 3,
      title: 'خصم 25% على الإكسسوارات',
      description: 'إكسسوارات تقنية عالية الجودة',
      discount: 25,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=400&fit=crop',
      validUntil: '2024-02-25',
      category: 'accessories'
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      <div className="container-custom py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-6">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/">
                <ArrowLeft className="w-4 h-4" />
              </Link>
            </Button>
            <div>
              <h1 className="text-3xl font-bold mb-2">العروض والخصومات</h1>
              <p className="text-muted-foreground">
                اكتشف أفضل العروض والخصومات على منتجاتنا
              </p>
            </div>
          </div>

          {/* Featured Offers */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {featuredOffers.map((offer, index) => (
              <motion.div
                key={offer.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
                  <div className="relative h-48">
                    <Image
                      src={offer.image}
                      alt={offer.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/40" />
                    <div className="absolute top-4 right-4">
                      <Badge variant="destructive" className="text-lg px-3 py-1">
                        -{offer.discount}%
                      </Badge>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <h3 className="text-xl font-bold mb-2">{offer.title}</h3>
                      <p className="text-sm opacity-90 mb-2">{offer.description}</p>
                      <div className="flex items-center space-x-2 space-x-reverse text-sm">
                        <Clock className="w-4 h-4" />
                        <span>صالح حتى {offer.validUntil}</span>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Filters and Sort */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex-1">
            <Input
              placeholder="البحث في العروض..."
              className="max-w-md"
            />
          </div>
          <div className="flex gap-4">
            <Select value={filterBy} onValueChange={setFilterBy}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="فلترة العروض" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع العروض</SelectItem>
                <SelectItem value="high-discount">خصومات عالية (30%+)</SelectItem>
                <SelectItem value="laptops">اللابتوبات</SelectItem>
                <SelectItem value="gaming">الجيمنج</SelectItem>
                <SelectItem value="accessories">الإكسسوارات</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="ترتيب حسب" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="discount">أعلى خصم</SelectItem>
                <SelectItem value="price-low">أقل سعر</SelectItem>
                <SelectItem value="price-high">أعلى سعر</SelectItem>
                <SelectItem value="rating">أعلى تقييم</SelectItem>
                <SelectItem value="newest">الأحدث</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Offers Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
        ) : filteredOffers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredOffers.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
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
                      <div className="absolute top-4 right-4 space-y-2">
                        <Badge variant="destructive" className="text-lg px-3 py-1">
                          -{product.discount}%
                        </Badge>
                        {product.isNew && (
                          <Badge variant="secondary">جديد</Badge>
                        )}
                      </div>
                      <div className="absolute top-4 left-4">
                        <Button variant="outline" size="icon" className="h-8 w-8">
                          <Heart className="w-4 h-4" />
                        </Button>
                      </div>
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
                      
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2 space-x-reverse">
                          <span className="text-xl font-bold text-primary">
                            {formatPrice(product.price)}
                          </span>
                          {product.originalPrice && (
                            <span className="text-sm text-muted-foreground line-through">
                              {formatPrice(product.originalPrice)}
                            </span>
                          )}
                        </div>
                        
                        {product.originalPrice && (
                          <div className="text-sm text-green-600 font-medium">
                            وفرت {formatPrice(product.originalPrice - product.price)} ({product.discount}%)
                          </div>
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
                        <ShoppingCart className="w-4 h-4 ml-2" />
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
        ) : (
          <Card className="p-12 text-center">
            <div className="text-6xl mb-4">🎯</div>
            <h3 className="text-xl font-semibold mb-2">لا توجد عروض متاحة</h3>
            <p className="text-muted-foreground mb-6">
              لا توجد عروض تطابق معايير البحث المحددة
            </p>
            <Button onClick={() => {
              setFilterBy('all')
              setSortBy('discount')
            }}>
              عرض جميع العروض
            </Button>
          </Card>
        )}

        {/* Newsletter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-16"
        >
          <Card className="bg-primary text-primary-foreground">
            <CardContent className="p-8 text-center">
              <div className="max-w-2xl mx-auto">
                <div className="w-16 h-16 bg-primary-foreground/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Zap className="w-8 h-8" />
                </div>
                <h2 className="text-3xl font-bold mb-4">احصل على إشعارات العروض</h2>
                <p className="text-primary-foreground/80 mb-6">
                  اشترك في نشرتنا الإخبارية واحصل على إشعارات فورية بأحدث العروض والخصومات
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
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}


