'use client'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent } from './Card'
import { Button } from './Button'
import { Badge } from './Badge'
import { cn } from '../../lib/utils'

export interface Product {
  id: number
  name: string
  price: number
  originalPrice?: number
  image: string
  specs?: string
  condition?: 'New' | 'Refurbished' | 'Used'
  rating?: number
  reviews?: number
  discount?: number
  inStock?: boolean
  brand?: string
}

export interface ProductCardProps extends React.HTMLAttributes<HTMLDivElement> {
  product: Product
  onAddToCart?: (productId: number, quantity?: number) => void
  onQuickView?: (productId: number) => void
  showQuickActions?: boolean
  variant?: 'default' | 'compact' | 'detailed'
}

const ProductCard = React.forwardRef<HTMLDivElement, ProductCardProps>(
  ({ 
    className, 
    product, 
    onAddToCart, 
    onQuickView,
    showQuickActions = true,
    variant = 'default',
    ...props 
  }, ref) => {
    const {
      id,
      name,
      price,
      originalPrice,
      image,
      specs,
      condition,
      rating,
      reviews,
      discount,
      inStock = true,
      brand
    } = product

    const savings = originalPrice ? originalPrice - price : 0
    const discountPercentage = originalPrice ? Math.round((savings / originalPrice) * 100) : 0

    const renderStars = (rating: number) => {
      return Array.from({ length: 5 }, (_, i) => (
        <span
          key={i}
          className={cn(
            'text-sm',
            i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'
          )}
        >
          ★
        </span>
      ))
    }

    const getConditionBadge = (condition: string) => {
      switch (condition) {
        case 'New':
          return <Badge variant="success" size="sm">New</Badge>
        case 'Refurbished':
          return <Badge variant="warning" size="sm">Refurbished</Badge>
        case 'Used':
          return <Badge variant="secondary" size="sm">Used</Badge>
        default:
          return null
      }
    }

    if (variant === 'compact') {
      return (
        <Card
          ref={ref}
          variant="product"
          className={cn('group', className)}
          {...props}
        >
          <Link href={`/products/${id}`} className="block">
            <div className="relative aspect-square overflow-hidden">
              <Image
                src={image}
                alt={name}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              {discount && discount > 0 && (
                <Badge variant="error" size="sm" className="absolute top-2 left-2">
                  -{discount}%
                </Badge>
              )}
              {condition && (
                <div className="absolute top-2 right-2">
                  {getConditionBadge(condition)}
                </div>
              )}
            </div>
          </Link>
          
          <CardContent className="p-4">
            <div className="space-y-2">
              {brand && (
                <p className="text-xs text-gray-500 uppercase tracking-wide">{brand}</p>
              )}
              
              <Link href={`/products/${id}`}>
                <h3 className="font-semibold text-sm line-clamp-2 group-hover:text-primary-600 transition-colors">
                  {name}
                </h3>
              </Link>
              
              {specs && (
                <p className="text-xs text-gray-600 line-clamp-1">{specs}</p>
              )}
              
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-primary-600">
                  ${price.toLocaleString()}
                </span>
                {originalPrice && (
                  <span className="text-sm text-gray-400 line-through">
                    ${originalPrice.toLocaleString()}
                  </span>
                )}
              </div>
              
              {rating && reviews && (
                <div className="flex items-center gap-1">
                  <div className="flex">{renderStars(rating)}</div>
                  <span className="text-xs text-gray-500">({reviews})</span>
                </div>
              )}
            </div>
            
            {showQuickActions && (
              <div className="mt-3 flex gap-2">
                <Button
                  size="sm"
                  className="flex-1"
                  onClick={() => onAddToCart?.(id, 1)}
                  disabled={!inStock}
                >
                  {inStock ? 'Add to Cart' : 'Out of Stock'}
                </Button>
                {onQuickView && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onQuickView(id)}
                  >
                    Quick View
                  </Button>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      )
    }

    if (variant === 'detailed') {
      return (
        <Card
          ref={ref}
          variant="product"
          className={cn('group', className)}
          {...props}
        >
          <Link href={`/products/${id}`} className="block">
            <div className="relative aspect-square overflow-hidden">
              <Image
                src={image}
                alt={name}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              {discount && discount > 0 && (
                <Badge variant="error" size="sm" className="absolute top-3 left-3">
                  -{discount}%
                </Badge>
              )}
              {condition && (
                <div className="absolute top-3 right-3">
                  {getConditionBadge(condition)}
                </div>
              )}
            </div>
          </Link>
          
          <CardContent className="p-6">
            <div className="space-y-3">
              {brand && (
                <p className="text-sm text-gray-500 uppercase tracking-wide font-medium">{brand}</p>
              )}
              
              <Link href={`/products/${id}`}>
                <h3 className="text-h5 font-semibold line-clamp-2 group-hover:text-primary-600 transition-colors">
                  {name}
                </h3>
              </Link>
              
              {specs && (
                <p className="text-sm text-gray-600 line-clamp-2">{specs}</p>
              )}
              
              {rating && reviews && (
                <div className="flex items-center gap-2">
                  <div className="flex">{renderStars(rating)}</div>
                  <span className="text-sm text-gray-500">{rating.toFixed(1)} ({reviews} reviews)</span>
                </div>
              )}
              
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <span className="text-2xl font-bold text-primary-600">
                    ${price.toLocaleString()}
                  </span>
                  {originalPrice && (
                    <span className="text-lg text-gray-400 line-through">
                      ${originalPrice.toLocaleString()}
                    </span>
                  )}
                </div>
                
                {savings > 0 && (
                  <p className="text-sm text-success-600 font-medium">
                    Save ${savings.toLocaleString()} ({discountPercentage}% off)
                  </p>
                )}
              </div>
              
              <div className="flex items-center gap-2 text-sm">
                <div className={cn(
                  'w-2 h-2 rounded-full',
                  inStock ? 'bg-success-500' : 'bg-error-500'
                )} />
                <span className={cn(
                  inStock ? 'text-success-600' : 'text-error-600'
                )}>
                  {inStock ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>
            </div>
            
            {showQuickActions && (
              <div className="mt-4 flex gap-3">
                <Button
                  className="flex-1"
                  onClick={() => onAddToCart?.(id, 1)}
                  disabled={!inStock}
                >
                  {inStock ? 'Add to Cart' : 'Out of Stock'}
                </Button>
                {onQuickView && (
                  <Button
                    variant="outline"
                    onClick={() => onQuickView(id)}
                  >
                    Quick View
                  </Button>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      )
    }

    // Default variant
    return (
      <Card
        ref={ref}
        variant="product"
        className={cn('group', className)}
        {...props}
      >
        <Link href={`/products/${id}`} className="block">
          <div className="relative aspect-square overflow-hidden">
            <Image
              src={image}
              alt={name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            {discount && discount > 0 && (
              <Badge variant="error" size="sm" className="absolute top-2 left-2">
                -{discount}%
              </Badge>
            )}
            {condition && (
              <div className="absolute top-2 right-2">
                {getConditionBadge(condition)}
              </div>
            )}
          </div>
        </Link>
        
        <CardContent className="p-5">
          <div className="space-y-3">
            {brand && (
              <p className="text-xs text-gray-500 uppercase tracking-wide">{brand}</p>
            )}
            
            <Link href={`/products/${id}`}>
              <h3 className="font-semibold text-lg line-clamp-2 group-hover:text-primary-600 transition-colors">
                {name}
              </h3>
            </Link>
            
            {specs && (
              <p className="text-sm text-gray-600 line-clamp-2">{specs}</p>
            )}
            
            {rating && reviews && (
              <div className="flex items-center gap-2">
                <div className="flex">{renderStars(rating)}</div>
                <span className="text-sm text-gray-500">({reviews})</span>
              </div>
            )}
            
            <div className="flex items-center gap-3">
              <span className="text-xl font-bold text-primary-600">
                ${price.toLocaleString()}
              </span>
              {originalPrice && (
                <span className="text-sm text-gray-400 line-through">
                  ${originalPrice.toLocaleString()}
                </span>
              )}
            </div>
            
            {savings > 0 && (
              <p className="text-sm text-success-600 font-medium">
                Save ${savings.toLocaleString()}
              </p>
            )}
          </div>
          
          {showQuickActions && (
            <div className="mt-4 flex gap-3">
              <Button
                className="flex-1"
                onClick={() => onAddToCart?.(id, 1)}
                disabled={!inStock}
              >
                {inStock ? 'Add to Cart' : 'Out of Stock'}
              </Button>
              {onQuickView && (
                <Button
                  variant="outline"
                  onClick={() => onQuickView(id)}
                >
                  Quick View
                </Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    )
  }
)

ProductCard.displayName = 'ProductCard'

export { ProductCard }
