'use client'

import React, { memo, useMemo, useCallback } from 'react'
import { cn } from '@/lib/utils'

interface MemoizedCardProps {
  title: string
  description: string
  price: number
  image: string
  onAddToCart: (id: string) => void
  onToggleWishlist: (id: string) => void
  isInWishlist: boolean
  className?: string
}

export const MemoizedCard = memo<MemoizedCardProps>(({
  title,
  description,
  price,
  image,
  onAddToCart,
  onToggleWishlist,
  isInWishlist,
  className
}) => {
  const handleAddToCart = useCallback(() => {
    onAddToCart('product-id')
  }, [onAddToCart])

  const handleToggleWishlist = useCallback(() => {
    onToggleWishlist('product-id')
  }, [onToggleWishlist])

  const formattedPrice = useMemo(() => {
    return new Intl.NumberFormat('ar-SA', {
      style: 'currency',
      currency: 'SAR'
    }).format(price)
  }, [price])

  return (
    <div className={cn('border rounded-lg p-4', className)}>
      <img src={image} alt={title} className="w-full h-48 object-cover rounded-lg mb-4" />
      <h3 className="font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground text-sm mb-4">{description}</p>
      <div className="flex items-center justify-between">
        <span className="text-lg font-bold">{formattedPrice}</span>
        <div className="flex space-x-2 space-x-reverse">
          <button
            onClick={handleAddToCart}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
          >
            أضف للسلة
          </button>
          <button
            onClick={handleToggleWishlist}
            className={cn(
              'px-4 py-2 rounded-md border',
              isInWishlist
                ? 'bg-red-100 text-red-600 border-red-200'
                : 'bg-gray-100 text-gray-600 border-gray-200'
            )}
          >
            {isInWishlist ? '❤️' : '🤍'}
          </button>
        </div>
      </div>
    </div>
  )
})

MemoizedCard.displayName = 'MemoizedCard'

interface MemoizedListProps {
  items: Array<{
    id: string
    name: string
    description: string
    price: number
    image: string
  }>
  onItemClick: (id: string) => void
  className?: string
}

export const MemoizedList = memo<MemoizedListProps>(({
  items,
  onItemClick,
  className
}) => {
  const handleItemClick = useCallback((id: string) => {
    onItemClick(id)
  }, [onItemClick])

  return (
    <div className={cn('space-y-4', className)}>
      {items.map((item) => (
        <div
          key={item.id}
          onClick={() => handleItemClick(item.id)}
          className="flex items-center space-x-4 space-x-reverse p-4 border rounded-lg hover:bg-muted/50 cursor-pointer"
        >
          <img
            src={item.image}
            alt={item.name}
            className="w-16 h-16 object-cover rounded-lg"
          />
          <div className="flex-1">
            <h3 className="font-semibold">{item.name}</h3>
            <p className="text-sm text-muted-foreground">{item.description}</p>
          </div>
          <div className="text-lg font-bold">
            {new Intl.NumberFormat('ar-SA', {
              style: 'currency',
              currency: 'SAR'
            }).format(item.price)}
          </div>
        </div>
      ))}
    </div>
  )
})

MemoizedList.displayName = 'MemoizedList'

interface MemoizedButtonProps {
  children: React.ReactNode
  onClick: () => void
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  loading?: boolean
  className?: string
}

export const MemoizedButton = memo<MemoizedButtonProps>(({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  className
}) => {
  const handleClick = useCallback(() => {
    if (!disabled && !loading) {
      onClick()
    }
  }, [onClick, disabled, loading])

  const variantClasses = {
    primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
    secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
    outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground'
  }

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  }

  return (
    <button
      onClick={handleClick}
      disabled={disabled || loading}
      className={cn(
        'rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
    >
      {loading ? (
        <div className="flex items-center space-x-2 space-x-reverse">
          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
          <span>جاري التحميل...</span>
        </div>
      ) : (
        children
      )}
    </button>
  )
})

MemoizedButton.displayName = 'MemoizedButton'
