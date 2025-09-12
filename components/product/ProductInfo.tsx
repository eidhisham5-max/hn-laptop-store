'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { StarRating } from '@/components/ui/StarRating'
import { Badge } from '@/components/ui/Badge'
import { TrustBadge } from '@/components/ui/TrustBadge'
import { Heart, ShoppingCart, Share2, Truck, Shield, Headphones, Award } from 'lucide-react'
import { formatPrice } from '@/lib/utils'

interface ProductInfoProps {
  product: {
    id: number
    name: string
    brand: string
    price: number
    originalPrice?: number
    rating: number
    reviewCount: number
    badge?: string
    isNew?: boolean
    isOnSale?: boolean
    inStock: boolean
    stockCount?: number
    description: string
    specifications: {
      screenSize: string
      processor: string
      ram: string
      storage: string
      graphicsCard?: string
      operatingSystem: string
      weight: string
      battery: string
    }
    colors?: { name: string; value: string; available: boolean }[]
    storageOptions?: { size: string; price: number; available: boolean }[]
  }
}

const ProductInfo: React.FC<ProductInfoProps> = ({ product }) => {
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0]?.value || '')
  const [selectedStorage, setSelectedStorage] = useState(product.storageOptions?.[0]?.size || '')
  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)

  const getBadgeVariant = (badge: string) => {
    if (badge.includes('جديد') || badge.includes('محدود')) return 'success'
    if (badge.includes('عرض') || badge.includes('خاص')) return 'error'
    if (badge.includes('الأكثر') || badge.includes('الأفضل')) return 'primary'
    return 'gray'
  }

  const handleAddToCart = () => {
    // Handle add to cart logic
    console.log('Adding to cart:', {
      productId: product.id,
      color: selectedColor,
      storage: selectedStorage,
      quantity
    })
  }

  const handleBuyNow = () => {
    // Handle buy now logic
    console.log('Buy now:', {
      productId: product.id,
      color: selectedColor,
      storage: selectedStorage,
      quantity
    })
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.description,
        url: window.location.href
      })
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(window.location.href)
      // Show toast notification
    }
  }

  const finalPrice = selectedStorage 
    ? product.storageOptions?.find(option => option.size === selectedStorage)?.price || product.price
    : product.price

  return (
    <div className="space-y-6">
      {/* Brand and Badge */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3 space-x-reverse">
          <span className="text-sm text-gray-500">{product.brand}</span>
          {product.badge && (
            <Badge variant={getBadgeVariant(product.badge)}>
              {product.badge}
            </Badge>
          )}
        </div>
        
        <div className="flex items-center space-x-2 space-x-reverse">
          <button
            onClick={() => setIsWishlisted(!isWishlisted)}
            className={`p-2 rounded-lg transition-all duration-200 ${
              isWishlisted 
                ? 'bg-red-50 text-red-500' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
          </button>
          
          <button
            onClick={handleShare}
            className="p-2 bg-gray-100 text-gray-600 hover:bg-gray-200 rounded-lg transition-all duration-200"
          >
            <Share2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Product Name */}
      <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 leading-tight">
        {product.name}
      </h1>

      {/* Rating */}
      <div className="flex items-center space-x-4 space-x-reverse">
        <StarRating rating={product.rating} size="md" />
        <span className="text-gray-600">
          ({product.reviewCount} تقييم)
        </span>
        <button className="text-primary-500 hover:text-primary-600 font-medium">
          اقرأ المراجعات
        </button>
      </div>

      {/* Price */}
      <div className="space-y-2">
        <div className="flex items-center space-x-3 space-x-reverse">
          <span className="text-3xl font-bold text-gray-800">
            {formatPrice(finalPrice)}
          </span>
          {product.originalPrice && (
            <span className="text-xl text-gray-500 line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>
        
        {product.isOnSale && product.originalPrice && (
          <div className="text-success-600 font-medium">
            وفرت {formatPrice(product.originalPrice - finalPrice)} ({Math.round(((product.originalPrice - finalPrice) / product.originalPrice) * 100)}%)
          </div>
        )}
      </div>

      {/* Stock Status */}
      <div className="flex items-center space-x-2 space-x-reverse">
        {product.inStock ? (
          <>
            <div className="w-3 h-3 bg-success-500 rounded-full"></div>
            <span className="text-success-600 font-medium">
              متوفر في المخزن
              {product.stockCount && ` (${product.stockCount} قطع متبقية)`}
            </span>
          </>
        ) : (
          <>
            <div className="w-3 h-3 bg-error-500 rounded-full"></div>
            <span className="text-error-600 font-medium">غير متوفر حالياً</span>
          </>
        )}
      </div>

      {/* Description */}
      <div className="prose prose-gray max-w-none">
        <p className="text-gray-600 leading-relaxed">
          {product.description}
        </p>
      </div>

      {/* Color Selection */}
      {product.colors && product.colors.length > 0 && (
        <div className="space-y-3">
          <h3 className="font-semibold text-gray-800">اللون:</h3>
          <div className="flex space-x-3 space-x-reverse">
            {product.colors.map((color) => (
              <button
                key={color.value}
                onClick={() => setSelectedColor(color.value)}
                disabled={!color.available}
                className={`w-12 h-12 rounded-full border-2 transition-all duration-200 ${
                  selectedColor === color.value
                    ? 'border-primary-500 ring-2 ring-primary-200'
                    : 'border-gray-300 hover:border-gray-400'
                } ${!color.available ? 'opacity-50 cursor-not-allowed' : ''}`}
                style={{ backgroundColor: color.value }}
                title={color.name}
              />
            ))}
          </div>
        </div>
      )}

      {/* Storage Selection */}
      {product.storageOptions && product.storageOptions.length > 0 && (
        <div className="space-y-3">
          <h3 className="font-semibold text-gray-800">سعة التخزين:</h3>
          <div className="grid grid-cols-2 gap-3">
            {product.storageOptions.map((option) => (
              <button
                key={option.size}
                onClick={() => setSelectedStorage(option.size)}
                disabled={!option.available}
                className={`p-3 rounded-lg border-2 transition-all duration-200 text-right ${
                  selectedStorage === option.size
                    ? 'border-primary-500 bg-primary-50 text-primary-700'
                    : 'border-gray-300 hover:border-gray-400 text-gray-700'
                } ${!option.available ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <div className="font-medium">{option.size}</div>
                <div className="text-sm text-gray-500">
                  {formatPrice(option.price)}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Quantity */}
      <div className="space-y-3">
        <h3 className="font-semibold text-gray-800">الكمية:</h3>
        <div className="flex items-center space-x-3 space-x-reverse">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors duration-200"
          >
            -
          </button>
          <span className="w-16 text-center font-medium">{quantity}</span>
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors duration-200"
          >
            +
          </button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Button
            size="lg"
            className="w-full"
            disabled={!product.inStock}
            onClick={handleAddToCart}
          >
            <ShoppingCart className="w-5 h-5 ml-2" />
            {product.inStock ? 'أضف للسلة' : 'غير متوفر'}
          </Button>
          
          <Button
            variant="outline"
            size="lg"
            className="w-full"
            disabled={!product.inStock}
            onClick={handleBuyNow}
          >
            اشتر الآن
          </Button>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="grid grid-cols-2 gap-4 pt-6 border-t border-gray-200">
        <TrustBadge type="shipping" text="شحن مجاني" />
        <TrustBadge type="security" text="ضمان سنتين" />
        <TrustBadge type="support" text="دعم فني 24/7" />
        <TrustBadge type="warranty" text="منتجات أصلية" />
      </div>

      {/* Key Specifications */}
      <div className="space-y-4 pt-6 border-t border-gray-200">
        <h3 className="font-semibold text-gray-800">المواصفات الرئيسية:</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex justify-between">
            <span className="text-gray-600">حجم الشاشة:</span>
            <span className="font-medium">{product.specifications.screenSize}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">المعالج:</span>
            <span className="font-medium">{product.specifications.processor}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">الذاكرة العشوائية:</span>
            <span className="font-medium">{product.specifications.ram}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">التخزين:</span>
            <span className="font-medium">{product.specifications.storage}</span>
          </div>
          {product.specifications.graphicsCard && (
            <div className="flex justify-between">
              <span className="text-gray-600">كارت الشاشة:</span>
              <span className="font-medium">{product.specifications.graphicsCard}</span>
            </div>
          )}
          <div className="flex justify-between">
            <span className="text-gray-600">نظام التشغيل:</span>
            <span className="font-medium">{product.specifications.operatingSystem}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductInfo