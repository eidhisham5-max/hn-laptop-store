'use client'

import React, { useState, useEffect, useRef, useMemo } from 'react'
import { cn } from '@/lib/utils'

interface VirtualScrollProps {
  items: any[]
  itemHeight: number
  containerHeight: number
  renderItem: (item: any, index: number) => React.ReactNode
  className?: string
  overscan?: number
}

export function VirtualScroll({
  items,
  itemHeight,
  containerHeight,
  renderItem,
  className,
  overscan = 5
}: VirtualScrollProps) {
  const [scrollTop, setScrollTop] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const visibleRange = useMemo(() => {
    const start = Math.floor(scrollTop / itemHeight)
    const end = Math.min(
      start + Math.ceil(containerHeight / itemHeight) + overscan,
      items.length
    )
    return { start: Math.max(0, start - overscan), end }
  }, [scrollTop, itemHeight, containerHeight, items.length, overscan])

  const visibleItems = useMemo(() => {
    return items.slice(visibleRange.start, visibleRange.end).map((item, index) => ({
      item,
      index: visibleRange.start + index
    }))
  }, [items, visibleRange])

  const totalHeight = items.length * itemHeight
  const offsetY = visibleRange.start * itemHeight

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleScroll = () => {
      setScrollTop(container.scrollTop)
    }

    container.addEventListener('scroll', handleScroll)
    return () => container.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div
      ref={containerRef}
      className={cn('overflow-auto', className)}
      style={{ height: containerHeight }}
    >
      <div style={{ height: totalHeight, position: 'relative' }}>
        <div
          style={{
            transform: `translateY(${offsetY}px)`,
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0
          }}
        >
          {visibleItems.map(({ item, index }) => (
            <div
              key={index}
              style={{ height: itemHeight }}
            >
              {renderItem(item, index)}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

interface InfiniteScrollProps {
  items: any[]
  hasMore: boolean
  loadMore: () => void
  renderItem: (item: any, index: number) => React.ReactNode
  className?: string
  loadingComponent?: React.ReactNode
  endComponent?: React.ReactNode
}

export function InfiniteScroll({
  items,
  hasMore,
  loadMore,
  renderItem,
  className,
  loadingComponent,
  endComponent
}: InfiniteScrollProps) {
  const [isLoading, setIsLoading] = useState(false)
  const observerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && hasMore && !isLoading) {
          setIsLoading(true)
          loadMore()
        }
      },
      { threshold: 0.1 }
    )

    if (observerRef.current) {
      observer.observe(observerRef.current)
    }

    return () => observer.disconnect()
  }, [hasMore, isLoading, loadMore])

  useEffect(() => {
    setIsLoading(false)
  }, [items])

  return (
    <div className={className}>
      {items.map((item, index) => renderItem(item, index))}
      
      {hasMore && (
        <div ref={observerRef} className="flex justify-center py-4">
          {loadingComponent || (
            <div className="text-muted-foreground">جاري التحميل...</div>
          )}
        </div>
      )}
      
      {!hasMore && endComponent && (
        <div className="flex justify-center py-4">
          {endComponent}
        </div>
      )}
    </div>
  )
}
