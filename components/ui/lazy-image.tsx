'use client'

import React, { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { LoadingSpinner } from './loading-spinner'

interface LazyImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  priority?: boolean
  placeholder?: 'blur' | 'empty'
  blurDataURL?: string
  quality?: number
  fill?: boolean
  sizes?: string
  onLoad?: () => void
  onError?: () => void
}

export function LazyImage({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
  placeholder = 'empty',
  blurDataURL,
  quality = 75,
  fill = false,
  sizes,
  onLoad,
  onError
}: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isInView, setIsInView] = useState(priority)
  const [hasError, setHasError] = useState(false)
  const imgRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (priority) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )

    if (imgRef.current) {
      observer.observe(imgRef.current)
    }

    return () => observer.disconnect()
  }, [priority])

  const handleLoad = () => {
    setIsLoaded(true)
    onLoad?.()
  }

  const handleError = () => {
    setHasError(true)
    onError?.()
  }

  if (hasError) {
    return (
      <div
        ref={imgRef}
        className={cn(
          'bg-muted flex items-center justify-center',
          className
        )}
        style={fill ? undefined : { width, height }}
      >
        <div className="text-center text-muted-foreground">
          <div className="text-4xl mb-2">🖼️</div>
          <div className="text-sm">فشل في تحميل الصورة</div>
        </div>
      </div>
    )
  }

  return (
    <div
      ref={imgRef}
      className={cn('relative overflow-hidden', className)}
      style={fill ? undefined : { width, height }}
    >
      {!isInView && (
        <div className="absolute inset-0 bg-muted flex items-center justify-center">
          <LoadingSpinner size="md" />
        </div>
      )}
      
      {isInView && (
        <>
          {!isLoaded && (
            <div className="absolute inset-0 bg-muted flex items-center justify-center">
              <LoadingSpinner size="md" />
            </div>
          )}
          
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            fill={fill}
            className={cn(
              'transition-opacity duration-300',
              isLoaded ? 'opacity-100' : 'opacity-0'
            )}
            priority={priority}
            placeholder={placeholder}
            blurDataURL={blurDataURL}
            quality={quality}
            sizes={sizes}
            onLoad={handleLoad}
            onError={handleError}
          />
        </>
      )}
    </div>
  )
}

export function LazyImageGrid({ images, className }: { images: Array<{ src: string; alt: string }>; className?: string }) {
  return (
    <div className={cn('grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4', className)}>
      {images.map((image, index) => (
        <LazyImage
          key={index}
          src={image.src}
          alt={image.alt}
          width={300}
          height={200}
          className="aspect-video rounded-lg"
        />
      ))}
    </div>
  )
}
