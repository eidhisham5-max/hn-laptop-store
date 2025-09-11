'use client'
import React from 'react'
import { cn } from '../../lib/utils'

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'product' | 'feature' | 'elevated' | 'outlined'
  hover?: boolean
  interactive?: boolean
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', hover = false, interactive = false, ...props }, ref) => {
    const baseClasses = 'bg-white border border-gray-200 overflow-hidden transition-all duration-300 ease-out'
    
    const variants = {
      default: 'rounded-xl shadow-card',
      product: 'rounded-xl shadow-card hover:shadow-lg hover:-translate-y-1',
      feature: 'rounded-xl shadow-subtle p-8 text-center',
      elevated: 'rounded-xl shadow-lg',
      outlined: 'rounded-xl border-2 border-gray-200 shadow-none'
    }
    
    const hoverClasses = hover ? 'hover:shadow-lg hover:-translate-y-1 hover:border-primary-200' : ''
    const interactiveClasses = interactive ? 'cursor-pointer' : ''
    
    return (
      <div
        ref={ref}
        className={cn(
          baseClasses,
          variants[variant],
          hoverClasses,
          interactiveClasses,
          className
        )}
        {...props}
      />
    )
  }
)

Card.displayName = 'Card'

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex flex-col space-y-1.5 p-6', className)}
      {...props}
    />
  )
)
CardHeader.displayName = 'CardHeader'

const CardTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn('text-h4 font-semibold leading-none tracking-tight', className)}
      {...props}
    />
  )
)
CardTitle.displayName = 'CardTitle'

const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn('text-body-sm text-gray-600', className)}
      {...props}
    />
  )
)
CardDescription.displayName = 'CardDescription'

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('p-6 pt-0', className)} {...props} />
  )
)
CardContent.displayName = 'CardContent'

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex items-center p-6 pt-0', className)}
      {...props}
    />
  )
)
CardFooter.displayName = 'CardFooter'

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
