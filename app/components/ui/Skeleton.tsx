'use client'
import React from 'react'
import { cn } from '../../lib/utils'

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'text' | 'circular' | 'rectangular'
  width?: string | number
  height?: string | number
  animation?: 'pulse' | 'wave' | 'none'
}

const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({ 
    className, 
    variant = 'rectangular', 
    width, 
    height, 
    animation = 'pulse',
    style,
    ...props 
  }, ref) => {
    const baseClasses = 'bg-gray-200'
    
    const variants = {
      text: 'h-4 w-full rounded',
      circular: 'rounded-full',
      rectangular: 'rounded-lg'
    }
    
    const animations = {
      pulse: 'animate-pulse',
      wave: 'animate-wave',
      none: ''
    }
    
    const skeletonStyle = {
      width: typeof width === 'number' ? `${width}px` : width,
      height: typeof height === 'number' ? `${height}px` : height,
      ...style
    }
    
    return (
      <div
        ref={ref}
        className={cn(
          baseClasses,
          variants[variant],
          animations[animation],
          className
        )}
        style={skeletonStyle}
        {...props}
      />
    )
  }
)

Skeleton.displayName = 'Skeleton'

// Predefined skeleton components for common use cases
export const SkeletonText = React.forwardRef<HTMLDivElement, Omit<SkeletonProps, 'variant'>>(
  ({ className, ...props }, ref) => (
    <Skeleton ref={ref} variant="text" className={className} {...props} />
  )
)
SkeletonText.displayName = 'SkeletonText'

export const SkeletonAvatar = React.forwardRef<HTMLDivElement, Omit<SkeletonProps, 'variant' | 'width' | 'height'>>(
  ({ className, ...props }, ref) => (
    <Skeleton 
      ref={ref} 
      variant="circular" 
      width={40} 
      height={40} 
      className={className} 
      {...props} 
    />
  )
)
SkeletonAvatar.displayName = 'SkeletonAvatar'

export const SkeletonCard = React.forwardRef<HTMLDivElement, Omit<SkeletonProps, 'variant' | 'width' | 'height'>>(
  ({ className, ...props }, ref) => (
    <div className={cn('space-y-3 p-4', className)} {...props}>
      <Skeleton ref={ref} variant="rectangular" height={200} />
      <div className="space-y-2">
        <SkeletonText width="80%" />
        <SkeletonText width="60%" />
        <SkeletonText width="40%" />
      </div>
    </div>
  )
)
SkeletonCard.displayName = 'SkeletonCard'

export { Skeleton }
