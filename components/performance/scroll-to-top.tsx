'use client'

import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { ArrowUp } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ScrollToTopProps {
  threshold?: number
  className?: string
  showOnScroll?: boolean
  smooth?: boolean
}

export function ScrollToTop({
  threshold = 300,
  className,
  showOnScroll = true,
  smooth = true
}: ScrollToTopProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > threshold) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', toggleVisibility)
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [threshold])

  const scrollToTop = () => {
    if (smooth) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    } else {
      window.scrollTo(0, 0)
    }
  }

  if (!showOnScroll || !isVisible) {
    return null
  }

  return (
    <Button
      onClick={scrollToTop}
      size="icon"
      className={cn(
        'fixed bottom-6 left-6 z-50 rounded-full shadow-lg hover:shadow-xl transition-all duration-300',
        'bg-primary text-primary-foreground hover:bg-primary/90',
        'w-12 h-12',
        className
      )}
      aria-label="العودة للأعلى"
    >
      <ArrowUp className="w-5 h-5" />
    </Button>
  )
}

interface ScrollProgressProps {
  className?: string
  height?: number
  color?: string
  backgroundColor?: string
}

export function ScrollProgress({
  className,
  height = 3,
  color = '#0052CC',
  backgroundColor = 'transparent'
}: ScrollProgressProps) {
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollTop = window.pageYOffset
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = (scrollTop / docHeight) * 100
      setScrollProgress(progress)
    }

    window.addEventListener('scroll', updateScrollProgress)
    return () => window.removeEventListener('scroll', updateScrollProgress)
  }, [])

  return (
    <div
      className={cn(
        'fixed top-0 left-0 right-0 z-50',
        className
      )}
      style={{
        height: `${height}px`,
        backgroundColor
      }}
    >
      <div
        className="h-full transition-all duration-150 ease-out"
        style={{
          width: `${scrollProgress}%`,
          backgroundColor: color
        }}
      />
    </div>
  )
}

interface ScrollToSectionProps {
  targetId: string
  children: React.ReactNode
  className?: string
  smooth?: boolean
  offset?: number
}

export function ScrollToSection({
  targetId,
  children,
  className,
  smooth = true,
  offset = 0
}: ScrollToSectionProps) {
  const scrollToSection = () => {
    const element = document.getElementById(targetId)
    if (element) {
      const elementPosition = element.offsetTop - offset
      
      if (smooth) {
        window.scrollTo({
          top: elementPosition,
          behavior: 'smooth'
        })
      } else {
        window.scrollTo(0, elementPosition)
      }
    }
  }

  return (
    <button
      onClick={scrollToSection}
      className={cn(
        'transition-all duration-200 hover:scale-105',
        className
      )}
    >
      {children}
    </button>
  )
}

interface ScrollSpyProps {
  sections: Array<{
    id: string
    label: string
  }>
  className?: string
  activeClassName?: string
  offset?: number
}

export function ScrollSpy({
  sections,
  className,
  activeClassName = 'text-primary font-semibold',
  offset = 100
}: ScrollSpyProps) {
  const [activeSection, setActiveSection] = useState(sections[0]?.id)

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.pageYOffset + offset

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i].id)
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i].id)
          break
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [sections, offset])

  return (
    <nav className={className}>
      {sections.map((section) => (
        <ScrollToSection
          key={section.id}
          targetId={section.id}
          className={cn(
            'block py-2 px-4 rounded-md transition-colors duration-200 hover:bg-muted',
            activeSection === section.id ? activeClassName : 'text-muted-foreground'
          )}
        >
          {section.label}
        </ScrollToSection>
      ))}
    </nav>
  )
}
