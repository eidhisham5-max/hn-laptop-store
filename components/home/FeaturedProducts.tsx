'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { StarRating } from '@/components/ui/StarRating'
import { Badge } from '@/components/ui/Badge'
import { Heart, ShoppingCart, Eye } from 'lucide-react'
import { formatPrice } from '@/lib/utils'

interface Product {
  id: number
  name: string
  brand: string
  price: number
  originalPrice?: number
  rating: number
  reviewCount: number
  image: string
  badge?: string
  isNew?: boolean
  isOnSale?: boolean
}

const FeaturedProducts: React.FC = () => {
  const [hoveredProduct, setHoveredProduct] = React.useState<number | null>(null)

  const products: Product[] = [
    {
      id: 1,
      name: 'MacBook Pro 16" M3 Max',
      brand: 'Apple',
      price: 12999,
      originalPrice: 14999,
      rating: 4.8,
      reviewCount: 124,
      image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2026&q=80',
      badge: 'الأكثر مبيعاً',
      isOnSale: true
    },
    {
      id: 2,
      name: 'Dell XPS 15 OLED',
      brand: 'Dell',
      price: 8999,
      rating: 4.6,
      reviewCount: 89,
      image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80',
      badge: 'جديد',
      isNew: true
    },
    {
      id: 3,
      name: 'ASUS ROG Strix G15',
      brand: 'ASUS',
      price: 6999,
      originalPrice: 7999,
      rating: 4.7,
      reviewCount: 156,
      image: 'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2042&q=80',
      badge: 'عرض خاص',
      isOnSale: true
    },
    {
      id: 4,
      name: 'HP Spectre x360 14',
      brand: 'HP',
      price: 7999,
      rating: 4.5,
      reviewCount: 67,
      image: 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1964&q=80',
      badge: 'محدود',
      isNew: true
    },
    {
      id: 5,
      name: 'Lenovo ThinkPad X1 Carbon',
      brand: 'Lenovo',
      price: 9999,
      rating: 4.9,
      reviewCount: 203,
      image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80',
      badge: 'الأفضل تقييماً'
    },
    {
      id: 6,
      name: 'MSI Creator 17',
      brand: 'MSI',
      price: 11999,
      originalPrice: 13999,
      rating: 4.6,
      reviewCount: 78,
      image: 'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2042&q=80',
      badge: 'عرض خاص',
      isOnSale: true
    }
  ]

  const getBadgeVariant = (badge: string) => {
    if (badge.includes('جديد') || badge.includes('محدود')) return 'success'
    if (badge.includes('عرض') || badge.includes('خاص')) return 'error'
    if (badge.includes('الأكثر') || badge.includes('الأفضل')) return 'primary'
    return 'gray'
  }

  return (
    <section className="section-padding bg-gray-50">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="heading-2 mb-4">المنتجات المميزة</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            اكتشف أحدث وأفضل لابتوبات من أشهر العلامات التجارية العالمية
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <Card
              key={product.id}
              className="card-product group"
              onMouseEnter={() => setHoveredProduct(product.id)}
              onMouseLeave={() => setHoveredProduct(null)}
            >
              {/* Product Image */}
              <div className="relative overflow-hidden rounded-t-2xl">
                <div className="aspect-square relative">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                
                {/* Badge */}
                {product.badge && (
                  <div className="absolute top-4 right-4">
                    <Badge variant={getBadgeVariant(product.badge)}>
                      {product.badge}
                    </Badge>
                  </div>
                )}

                {/* Quick Actions */}
                <div className={`absolute top-4 left-4 flex flex-col space-y-2 transition-all duration-300 ${
                  hoveredProduct === product.id ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
                }`}>
                  <button className="p-2 bg-white rounded-full shadow-soft hover:shadow-medium transition-all duration-200 hover:bg-primary-50 hover:text-primary-500">
                    <Heart className="w-4 h-4" />
                  </button>
                  <button className="p-2 bg-white rounded-full shadow-soft hover:shadow-medium transition-all duration-200 hover:bg-primary-50 hover:text-primary-500">
                    <Eye className="w-4 h-4" />
                  </button>
                </div>

                {/* Discount Badge */}
                {product.isOnSale && product.originalPrice && (
                  <div className="absolute bottom-4 right-4 bg-error-500 text-white px-2 py-1 rounded-lg text-sm font-medium">
                    -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="p-6">
                {/* Brand */}
                <p className="text-sm text-gray-500 mb-2">{product.brand}</p>
                
                {/* Product Name */}
                <h3 className="font-semibold text-gray-800 mb-3 line-clamp-2 hover:text-primary-500 transition-colors duration-200">
                  <Link href={`/products/${product.id}`}>
                    {product.name}
                  </Link>
                </h3>

                {/* Rating */}
                <div className="flex items-center justify-between mb-4">
                  <StarRating rating={product.rating} size="sm" />
                  <span className="text-sm text-gray-500">({product.reviewCount})</span>
                </div>

                {/* Price */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <span className="text-xl font-bold text-gray-800">
                      {formatPrice(product.price)}
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-500 line-through">
                        {formatPrice(product.originalPrice)}
                      </span>
                    )}
                  </div>
                </div>

                {/* Add to Cart Button */}
                <Button
                  className="w-full"
                  onClick={() => {/* Handle add to cart */}}
                >
                  <ShoppingCart className="w-4 h-4 ml-2" />
                  أضف للسلة
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Button
            variant="outline"
            size="lg"
            onClick={() => window.location.href = '/products'}
          >
            عرض جميع المنتجات
          </Button>
        </div>
      </div>
    </section>
  )
}

export default FeaturedProducts