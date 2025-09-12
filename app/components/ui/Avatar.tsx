'use client'
import React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/utils'

const avatarVariants = cva(
  "relative inline-flex items-center justify-center rounded-full bg-gray-100 text-gray-600 font-medium overflow-hidden",
  {
    variants: {
      size: {
        xs: "h-6 w-6 text-xs",
        sm: "h-8 w-8 text-sm",
        md: "h-10 w-10 text-base",
        lg: "h-12 w-12 text-lg",
        xl: "h-16 w-16 text-xl",
        "2xl": "h-20 w-20 text-2xl"
      },
      variant: {
        default: "bg-gray-100 text-gray-600",
        primary: "bg-primary-100 text-primary-600",
        success: "bg-success-100 text-success-600",
        warning: "bg-warning-100 text-warning-600",
        error: "bg-error-100 text-error-600"
      }
    },
    defaultVariants: {
      size: "md",
      variant: "default"
    }
  }
)

export interface AvatarProps extends VariantProps<typeof avatarVariants> {
  src?: string
  alt?: string
  fallback?: string
  showOnlineStatus?: boolean
  onlineStatus?: 'online' | 'offline' | 'away' | 'busy'
  className?: string
  onClick?: () => void
}

const Avatar: React.FC<AvatarProps> = ({
  src,
  alt,
  fallback,
  size,
  variant,
  showOnlineStatus = false,
  onlineStatus = 'offline',
  className,
  onClick
}) => {
  const [imageError, setImageError] = React.useState(false)
  // const [imageLoaded, setImageLoaded] = React.useState(false)

  const handleImageError = () => {
    setImageError(true)
  }

  const handleImageLoad = () => {
        // setImageLoaded(true)
  }

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  const statusColors = {
    online: 'bg-success-500',
    offline: 'bg-gray-400',
    away: 'bg-warning-500',
    busy: 'bg-error-500'
  }

  const statusSizes = {
    xs: 'h-1.5 w-1.5',
    sm: 'h-2 w-2',
    md: 'h-2.5 w-2.5',
    lg: 'h-3 w-3',
    xl: 'h-4 w-4',
    '2xl': 'h-5 w-5'
  }

  return (
    <div
      className={cn(
        'relative inline-block',
        onClick && 'cursor-pointer',
        className
      )}
      onClick={onClick}
    >
      <div className={cn(avatarVariants({ size, variant }))}>
        {src && !imageError ? (
          <img
            src={src}
            alt={alt || 'Avatar'}
            className="h-full w-full object-cover"
            onError={handleImageError}
            onLoad={handleImageLoad}
          />
        ) : (
          <span className="select-none">
            {fallback ? getInitials(fallback) : '?'}
          </span>
        )}
      </div>
      
      {showOnlineStatus && (
        <div
          className={cn(
            'absolute bottom-0 right-0 rounded-full border-2 border-white',
            statusColors[onlineStatus],
            statusSizes[size || 'md']
          )}
        />
      )}
    </div>
  )
}

export { Avatar, avatarVariants }
