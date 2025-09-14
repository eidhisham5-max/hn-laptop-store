'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { StarRating } from '@/components/ui/StarRating'
import { Badge } from '@/components/ui/Badge'
import { Heart, ShoppingCart, Eye, Grid, List } from 'lucide-react'
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
  inStock: boolean
  specifications: {
    screenSize: string
    processor: string
    ram: string
    storage: string
  }
}

interface ProductGridProps {
  products: Product[]
  viewMode?: 'grid' | 'list'
  onViewModeChange?: (mode: 'grid' | 'list') => void
  sortBy?: string
  onSortChange?: (sort: string) => void
}

const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  viewMode = 'grid',
  onViewModeChange,
  sortBy = 'featured',
  onSortChange
}) => {
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null)

  const sortOptions = [
    { value: 'featured', label: 'المميز' },
    { value: 'price-low', label: 'السعر: من الأقل للأعلى' },
    { value: 'price-high', label: 'السعر: من الأعلى للأقل' },
    { value: 'rating', label: 'الأعلى تقييماً' },
    { value: 'newest', label: 'الأحدث' },
    { value: 'popular', label: 'الأكثر شعبية' }
  ]

  const getBadgeVariant = (badge: string) => {
    if (badge.includes('جديد') || badge.includes('محدود')) return 'success'
    if (badge.includes('عرض') || badge.includes('خاص')) return 'error'
    if (badge.includes('الأكثر') || badge.includes('الأفضل')) return 'primary'
    return 'gray'
  }

  const renderGridView = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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

            {/* Stock Status */}
            {!product.inStock && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <span className="bg-gray-800 text-white px-4 py-2 rounded-lg font-medium">
                  غير متوفر
                </span>
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
              disabled={!product.inStock}
              onClick={() => {/* Handle add to cart */}}
            >
              <ShoppingCart className="w-4 h-4 ml-2" />
              {product.inStock ? 'أضف للسلة' : 'غير متوفر'}
            </Button>
          </div>
        </Card>
      ))}
    </div>
  )

  const renderListView = () => (
    <div className="space-y-6">
      {products.map((product) => (
        <Card
          key={product.id}
          className="card-hover group"
          onMouseEnter={() => setHoveredProduct(product.id)}
          onMouseLeave={() => setHoveredProduct(null)}
        >
          <div className="flex flex-col md:flex-row">
            {/* Product Image */}
            <div className="relative w-full md:w-64 h-64 md:h-48 overflow-hidden rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              
              {/* Badge */}
              {product.badge && (
                <div className="absolute top-4 right-4">
                  <Badge variant={getBadgeVariant(product.badge)}>
                    {product.badge}
                  </Badge>
                </div>
              )}

              {/* Stock Status */}
              {!product.inStock && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                  <span className="bg-gray-800 text-white px-4 py-2 rounded-lg font-medium">
                    غير متوفر
                  </span>
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="flex-1 p-6">
              <div className="flex flex-col h-full">
                <div className="flex-1">
                  {/* Brand */}
                  <p className="text-sm text-gray-500 mb-2">{product.brand}</p>
                  
                  {/* Product Name */}
                  <h3 className="text-xl font-semibold text-gray-800 mb-3 hover:text-primary-500 transition-colors duration-200">
                    <Link href={`/products/${product.id}`}>
                      {product.name}
                    </Link>
                  </h3>

                  {/* Specifications */}
                  <div className="grid grid-cols-2 gap-4 mb-4 text-sm text-gray-600">
                    <div>الشاشة: {product.specifications.screenSize}</div>
                    <div>المعالج: {product.specifications.processor}</div>
                    <div>الذاكرة: {product.specifications.ram}</div>
                    <div>التخزين: {product.specifications.storage}</div>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center space-x-4 space-x-reverse mb-4">
                    <StarRating rating={product.rating} size="sm" />
                    <span className="text-sm text-gray-500">({product.reviewCount} تقييم)</span>
                  </div>
                </div>

                {/* Price and Actions */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <span className="text-2xl font-bold text-gray-800">
                      {formatPrice(product.price)}
                    </span>
                    {product.originalPrice && (
                      <span className="text-lg text-gray-500 line-through">
                        {formatPrice(product.originalPrice)}
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <Button
                      variant="outline"
                      size="sm"
                      className="hidden md:flex"
                    >
                      <Heart className="w-4 h-4 ml-2" />
                      المفضلة
                    </Button>
                    <Button
                      size="sm"
                      disabled={!product.inStock}
                      onClick={() => {/* Handle add to cart */}}
                    >
                      <ShoppingCart className="w-4 h-4 ml-2" />
                      {product.inStock ? 'أضف للسلة' : 'غير متوفر'}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )

  return (
    <div className="space-y-6">
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-4 space-x-reverse">
          <span className="text-gray-600">
            عرض {products.length} منتج
          </span>
        </div>
        
        <div className="flex items-center space-x-4 space-x-reverse">
          {/* Sort Dropdown */}
          <select
            value={sortBy}
            onChange={(e) => onSortChange?.(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          
          {/* View Mode Toggle */}
          <div className="flex border border-gray-300 rounded-lg overflow-hidden">
            <button
              onClick={() => onViewModeChange?.('grid')}
              className={`p-2 ${viewMode === 'grid' ? 'bg-primary-500 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
            >
              <Grid className="w-5 h-5" />
            </button>
            <button
              onClick={() => onViewModeChange?.('list')}
              className={`p-2 ${viewMode === 'list' ? 'bg-primary-500 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
            >
              <List className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Products */}
      {products.length > 0 ? (
        viewMode === 'grid' ? renderGridView() : renderListView()
      ) : (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">لا توجد منتجات</h3>
          <p className="text-gray-600 mb-6">جرب تغيير الفلاتر للعثور على ما تبحث عنه</p>
          <Button onClick={() => window.location.reload()}>
            إعادة تعيين الفلاتر
          </Button>
        </div>
      )}
    </div>
  )
}

export default ProductGrid