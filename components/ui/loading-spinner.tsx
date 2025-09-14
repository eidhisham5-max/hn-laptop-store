import React from 'react'
import { cn } from '@/lib/utils'

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
  text?: string
}

const sizeClasses = {
  sm: 'w-4 h-4',
  md: 'w-6 h-6',
  lg: 'w-8 h-8',
  xl: 'w-12 h-12'
}

export function LoadingSpinner({ size = 'md', className, text }: LoadingSpinnerProps) {
  return (
    <div className="flex flex-col items-center justify-center space-y-2">
      <div
        className={cn(
          'animate-spin rounded-full border-2 border-muted border-t-primary',
          sizeClasses[size],
          className
        )}
      />
      {text && (
        <p className="text-sm text-muted-foreground">{text}</p>
      )}
    </div>
  )
}

export function PageLoading() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <LoadingSpinner size="xl" text="جاري التحميل..." />
    </div>
  )
}

export function CardLoading() {
  return (
    <div className="p-6">
      <LoadingSpinner size="lg" text="جاري التحميل..." />
    </div>
  )
}

export function ButtonLoading() {
  return (
    <div className="flex items-center space-x-2 space-x-reverse">
      <LoadingSpinner size="sm" />
      <span>جاري التحميل...</span>
    </div>
  )
}
