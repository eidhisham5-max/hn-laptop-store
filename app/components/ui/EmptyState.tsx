'use client'
import React from 'react'
import { Button } from './Button'
import { cn } from '../../lib/utils'

export interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode
  title: string
  description?: string
  action?: {
    label: string
    onClick: () => void
    variant?: 'primary' | 'secondary' | 'outline'
  }
  size?: 'sm' | 'md' | 'lg'
}

const EmptyState = React.forwardRef<HTMLDivElement, EmptyStateProps>(
  ({ 
    className, 
    icon, 
    title, 
    description, 
    action,
    size = 'md',
    ...props 
  }, ref) => {
    const sizes = {
      sm: 'py-8',
      md: 'py-12',
      lg: 'py-16'
    }
    
    const iconSizes = {
      sm: 'w-12 h-12',
      md: 'w-16 h-16',
      lg: 'w-20 h-20'
    }
    
    const titleSizes = {
      sm: 'text-lg',
      md: 'text-xl',
      lg: 'text-2xl'
    }
    
    return (
      <div
        ref={ref}
        className={cn(
          'flex flex-col items-center justify-center text-center',
          sizes[size],
          className
        )}
        {...props}
      >
        {icon && (
          <div className={cn(
            'text-gray-400 mb-4',
            iconSizes[size]
          )}>
            {icon}
          </div>
        )}
        
        <h3 className={cn(
          'font-semibold text-gray-900 mb-2',
          titleSizes[size]
        )}>
          {title}
        </h3>
        
        {description && (
          <p className="text-gray-600 mb-6 max-w-md">
            {description}
          </p>
        )}
        
        {action && (
          <Button
            variant={action.variant || 'primary'}
            onClick={action.onClick}
          >
            {action.label}
          </Button>
        )}
      </div>
    )
  }
)

EmptyState.displayName = 'EmptyState'

// Predefined empty states for common use cases
export const EmptyCart = React.forwardRef<HTMLDivElement, Omit<EmptyStateProps, 'icon' | 'title' | 'description'>>(
  ({ action, ...props }, ref) => (
    <EmptyState
      ref={ref}
      icon="🛒"
      title="Your cart is empty"
      description="Looks like you haven't added any items to your cart yet. Start shopping to fill it up!"
      action={action || {
        label: 'Start Shopping',
        onClick: () => window.location.href = '/products'
      }}
      {...props}
    />
  )
)
EmptyCart.displayName = 'EmptyCart'

export const EmptyProducts = React.forwardRef<HTMLDivElement, Omit<EmptyStateProps, 'icon' | 'title' | 'description'>>(
  ({ action, ...props }, ref) => (
    <EmptyState
      ref={ref}
      icon="🔍"
      title="No products found"
      description="We couldn't find any products matching your search criteria. Try adjusting your filters or search terms."
      action={action || {
        label: 'Clear Filters',
        onClick: () => window.location.reload()
      }}
      {...props}
    />
  )
)
EmptyProducts.displayName = 'EmptyProducts'

export const EmptyOrders = React.forwardRef<HTMLDivElement, Omit<EmptyStateProps, 'icon' | 'title' | 'description'>>(
  ({ action, ...props }, ref) => (
    <EmptyState
      ref={ref}
      icon="📦"
      title="No orders yet"
      description="You haven't placed any orders yet. Start shopping to see your order history here."
      action={action || {
        label: 'Start Shopping',
        onClick: () => window.location.href = '/products'
      }}
      {...props}
    />
  )
)
EmptyOrders.displayName = 'EmptyOrders'

export { EmptyState }
