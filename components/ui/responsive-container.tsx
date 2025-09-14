import React from 'react'
import { cn } from '@/lib/utils'

interface ResponsiveContainerProps {
  children: React.ReactNode
  className?: string
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
}

const maxWidthClasses = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  '2xl': 'max-w-2xl',
  full: 'max-w-full'
}

const paddingClasses = {
  none: '',
  sm: 'px-4 py-2',
  md: 'px-6 py-4',
  lg: 'px-8 py-6',
  xl: 'px-12 py-8'
}

export function ResponsiveContainer({ 
  children, 
  className, 
  maxWidth = 'full',
  padding = 'md'
}: ResponsiveContainerProps) {
  return (
    <div
      className={cn(
        'w-full mx-auto',
        maxWidthClasses[maxWidth],
        paddingClasses[padding],
        className
      )}
    >
      {children}
    </div>
  )
}

export function MobileOnly({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn('block md:hidden', className)}>
      {children}
    </div>
  )
}

export function DesktopOnly({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn('hidden md:block', className)}>
      {children}
    </div>
  )
}

export function TabletOnly({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn('hidden sm:block lg:hidden', className)}>
      {children}
    </div>
  )
}

export function MobileAndTablet({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn('block lg:hidden', className)}>
      {children}
    </div>
  )
}

export function TabletAndDesktop({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn('hidden sm:block', className)}>
      {children}
    </div>
  )
}
