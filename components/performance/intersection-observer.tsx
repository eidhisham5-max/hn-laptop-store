'use client'

import React, { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

interface IntersectionObserverProps {
  children: React.ReactNode
  onIntersect?: () => void
  threshold?: number
  rootMargin?: string
  className?: string
  triggerOnce?: boolean
}

export function IntersectionObserver({
  children,
  onIntersect,
  threshold = 0.1,
  rootMargin = '0px',
  className,
  triggerOnce = true
}: IntersectionObserverProps) {
  const [isIntersecting, setIsIntersecting] = useState(false)
  const [hasIntersected, setHasIntersected] = useState(false)
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isElementIntersecting = entry.isIntersecting
        setIsIntersecting(isElementIntersecting)

        if (isElementIntersecting && !hasIntersected) {
          setHasIntersected(true)
          onIntersect?.()
        }

        if (isElementIntersecting && !triggerOnce) {
          onIntersect?.()
        }
      },
      {
        threshold,
        rootMargin
      }
    )

    observer.observe(element)

    return () => {
      observer.unobserve(element)
    }
  }, [onIntersect, threshold, rootMargin, triggerOnce, hasIntersected])

  return (
    <div
      ref={elementRef}
      className={cn(className)}
    >
      {children}
    </div>
  )
}

interface LazyLoadProps {
  children: React.ReactNode
  fallback?: React.ReactNode
  className?: string
  threshold?: number
  rootMargin?: string
}

export function LazyLoad({
  children,
  fallback,
  className,
  threshold = 0.1,
  rootMargin = '0px'
}: LazyLoadProps) {
  const [isLoaded, setIsLoaded] = useState(false)

  const handleIntersect = () => {
    setIsLoaded(true)
  }

  return (
    <IntersectionObserver
      onIntersect={handleIntersect}
      threshold={threshold}
      rootMargin={rootMargin}
      className={className}
    >
      {isLoaded ? children : fallback}
    </IntersectionObserver>
  )
}

interface FadeInProps {
  children: React.ReactNode
  className?: string
  delay?: number
  duration?: number
  threshold?: number
  rootMargin?: string
}

export function FadeIn({
  children,
  className,
  delay = 0,
  duration = 0.5,
  threshold = 0.1,
  rootMargin = '0px'
}: FadeInProps) {
  const [isVisible, setIsVisible] = useState(false)

  const handleIntersect = () => {
    setIsVisible(true)
  }

  return (
    <IntersectionObserver
      onIntersect={handleIntersect}
      threshold={threshold}
      rootMargin={rootMargin}
      className={cn(
        'transition-opacity duration-500',
        isVisible ? 'opacity-100' : 'opacity-0',
        className
      )}
      style={{
        transitionDelay: `${delay}ms`,
        transitionDuration: `${duration}s`
      }}
    >
      {children}
    </IntersectionObserver>
  )
}

interface SlideInProps {
  children: React.ReactNode
  direction?: 'up' | 'down' | 'left' | 'right'
  className?: string
  delay?: number
  duration?: number
  threshold?: number
  rootMargin?: string
}

export function SlideIn({
  children,
  direction = 'up',
  className,
  delay = 0,
  duration = 0.5,
  threshold = 0.1,
  rootMargin = '0px'
}: SlideInProps) {
  const [isVisible, setIsVisible] = useState(false)

  const handleIntersect = () => {
    setIsVisible(true)
  }

  const getTransform = () => {
    switch (direction) {
      case 'up':
        return isVisible ? 'translateY(0)' : 'translateY(20px)'
      case 'down':
        return isVisible ? 'translateY(0)' : 'translateY(-20px)'
      case 'left':
        return isVisible ? 'translateX(0)' : 'translateX(20px)'
      case 'right':
        return isVisible ? 'translateX(0)' : 'translateX(-20px)'
      default:
        return isVisible ? 'translateY(0)' : 'translateY(20px)'
    }
  }

  return (
    <IntersectionObserver
      onIntersect={handleIntersect}
      threshold={threshold}
      rootMargin={rootMargin}
      className={cn(
        'transition-all duration-500 ease-out',
        className
      )}
      style={{
        transform: getTransform(),
        opacity: isVisible ? 1 : 0,
        transitionDelay: `${delay}ms`,
        transitionDuration: `${duration}s`
      }}
    >
      {children}
    </IntersectionObserver>
  )
}

interface StickyHeaderProps {
  children: React.ReactNode
  className?: string
  threshold?: number
  rootMargin?: string
}

export function StickyHeader({
  children,
  className,
  threshold = 0.1,
  rootMargin = '0px'
}: StickyHeaderProps) {
  const [isSticky, setIsSticky] = useState(false)

  const handleIntersect = () => {
    setIsSticky(true)
  }

  return (
    <IntersectionObserver
      onIntersect={handleIntersect}
      threshold={threshold}
      rootMargin={rootMargin}
      className={cn(
        'transition-all duration-300',
        isSticky ? 'sticky top-0 z-50 bg-background/95 backdrop-blur-sm shadow-sm' : '',
        className
      )}
    >
      {children}
    </IntersectionObserver>
  )
}
