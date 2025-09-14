'use client'
import React from 'react'
import { ProductCard } from '../ui/ProductCard'
import { SkeletonCard } from '../ui/SkeletonCard'
import { EmptyProducts } from '../ui/EmptyProducts'
import { cn } from '../../lib/utils'

import { Product as ProductType } from '../../data/products'

export type Product = ProductType

export interface ProductGridProps {
  products: Product[]
  loading?: boolean
  error?: string
  viewMode?: 'grid' | 'list'
  columns?: 1 | 2 | 3 | 4
  className?: string
  language?: 'ar' | 'en'
  onProductClick?: (product: Product) => void
  onAddToCart?: (product: Product) => void
}

const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  loading = false,
  error,
  viewMode = 'grid',
  columns = 4,
  className,
  language = 'ar',
  onProductClick,
  onAddToCart
}) => {
  if (error) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="text-error-500 text-h5 font-medium mb-2">
            {language === 'ar' ? 'خطأ في تحميل المنتجات' : 'Error loading products'}
          </div>
          <div className="text-text-secondary text-body-md">{error}</div>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className={cn(
        'grid gap-6',
        viewMode === 'grid' && {
          'grid-cols-1': columns === 1,
          'grid-cols-2': columns === 2,
          'grid-cols-3': columns === 3,
          'grid-cols-4': columns === 4,
        },
        viewMode === 'list' && 'grid-cols-1',
        className
      )}>
        {Array.from({ length: 8 }).map((_, index) => (
          <SkeletonCard key={index} />
        ))}
      </div>
    )
  }

  if (!products || products.length === 0) {
    return <EmptyProducts />
  }

  const gridClasses = {
    grid: {
      1: 'grid-cols-1',
      2: 'grid-cols-1 sm:grid-cols-2',
      3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
      4: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
    },
    list: 'grid-cols-1'
  }

  return (
    <div className={cn(
      'grid gap-6',
      viewMode === 'grid' ? gridClasses.grid[columns] : gridClasses.list,
      className
    )}>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          variant={viewMode === 'list' ? 'detailed' : 'default'}
          onQuickView={() => onProductClick?.(product)}
          onAddToCart={() => onAddToCart?.(product)}
        />
      ))}
    </div>
  )
}

export { ProductGrid }
