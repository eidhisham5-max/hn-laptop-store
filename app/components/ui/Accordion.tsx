'use client'
import React, { useState } from 'react'
import { cn } from '../../lib/utils'

export interface AccordionItem {
  id: string
  title: string
  content: React.ReactNode
  disabled?: boolean
}

export interface AccordionProps {
  items: AccordionItem[]
  allowMultiple?: boolean
  defaultOpenItems?: string[]
  onToggle?: (itemId: string, isOpen: boolean) => void
  variant?: 'default' | 'bordered' | 'flush'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const Accordion: React.FC<AccordionProps> = ({
  items,
  allowMultiple = false,
  defaultOpenItems = [],
  onToggle,
  variant = 'default',
  size = 'md',
  className
}) => {
  const [openItems, setOpenItems] = useState<string[]>(defaultOpenItems)

  const handleToggle = (itemId: string) => {
    const isCurrentlyOpen = openItems.includes(itemId)
    let newOpenItems: string[]

    if (allowMultiple) {
      newOpenItems = isCurrentlyOpen
        ? openItems.filter(id => id !== itemId)
        : [...openItems, itemId]
    } else {
      newOpenItems = isCurrentlyOpen ? [] : [itemId]
    }

    setOpenItems(newOpenItems)
    onToggle?.(itemId, !isCurrentlyOpen)
  }

  const variants = {
    default: {
      container: 'space-y-2',
      item: 'bg-white rounded-lg shadow-sm border border-gray-200',
      header: 'px-4 py-3',
      content: 'px-4 pb-3'
    },
    bordered: {
      container: 'border border-gray-200 rounded-lg overflow-hidden',
      item: 'border-b border-gray-200 last:border-b-0',
      header: 'px-4 py-3',
      content: 'px-4 pb-3'
    },
    flush: {
      container: 'space-y-1',
      item: 'bg-white',
      header: 'px-0 py-3',
      content: 'px-0 pb-3'
    }
  }

  const sizeVariants = {
    sm: {
      header: 'text-sm',
      content: 'text-sm'
    },
    md: {
      header: 'text-base',
      content: 'text-base'
    },
    lg: {
      header: 'text-lg',
      content: 'text-lg'
    }
  }

  const currentVariant = variants[variant]
  const currentSize = sizeVariants[size]

  return (
    <div className={cn(currentVariant.container, className)}>
      {items.map((item) => {
        const isOpen = openItems.includes(item.id)
        
        return (
          <div key={item.id} className={currentVariant.item}>
            <button
              onClick={() => handleToggle(item.id)}
              disabled={item.disabled}
              className={cn(
                'w-full flex items-center justify-between text-left font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed',
                currentVariant.header,
                currentSize.header,
                isOpen ? 'text-primary-600' : 'text-gray-900 hover:text-gray-700'
              )}
            >
              <span>{item.title}</span>
              <svg
                className={cn(
                  'w-5 h-5 transition-transform duration-200',
                  isOpen ? 'rotate-180' : 'rotate-0'
                )}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            
            {isOpen && (
              <div className={cn(
                'overflow-hidden transition-all duration-200',
                currentVariant.content,
                currentSize.content
              )}>
                {item.content}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

export { Accordion }
