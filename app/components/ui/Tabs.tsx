'use client'
import React, { useState } from 'react'
import { cn } from '../../lib/utils'

export interface TabItem {
  id: string
  label: string
  content: React.ReactNode
  disabled?: boolean
}

export interface TabsProps {
  items: TabItem[]
  defaultActiveTab?: string
  onTabChange?: (tabId: string) => void
  variant?: 'default' | 'pills' | 'underline'
  size?: 'sm' | 'md' | 'lg'
  fullWidth?: boolean
  className?: string
}

const Tabs: React.FC<TabsProps> = ({
  items,
  defaultActiveTab,
  onTabChange,
  variant = 'default',
  size = 'md',
  fullWidth = false,
  className
}) => {
  const [activeTab, setActiveTab] = useState(defaultActiveTab || items[0]?.id)

  const handleTabClick = (tabId: string) => {
    const tab = items.find(item => item.id === tabId)
    if (tab && !tab.disabled) {
      setActiveTab(tabId)
      onTabChange?.(tabId)
    }
  }

  const activeTabContent = items.find(item => item.id === activeTab)?.content

  const tabVariants = {
    default: {
      container: 'border-b border-gray-200',
      tab: 'border-b-2 border-transparent hover:text-gray-700 hover:border-gray-300',
      active: 'border-primary-500 text-primary-600'
    },
    pills: {
      container: 'bg-gray-100 p-1 rounded-lg',
      tab: 'rounded-md hover:bg-white hover:text-gray-700',
      active: 'bg-white text-primary-600 shadow-sm'
    },
    underline: {
      container: 'border-b border-gray-200',
      tab: 'border-b-2 border-transparent hover:text-gray-700 hover:border-gray-300',
      active: 'border-primary-500 text-primary-600'
    }
  }

  const sizeVariants = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  }

  const currentVariant = tabVariants[variant]

  return (
    <div className={cn('w-full', className)}>
      {/* Tab Navigation */}
      <div className={cn(
        'flex',
        fullWidth ? 'w-full' : 'w-fit',
        currentVariant.container
      )}>
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => handleTabClick(item.id)}
            disabled={item.disabled}
            className={cn(
              'flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed',
              sizeVariants[size],
              currentVariant.tab,
              activeTab === item.id && currentVariant.active,
              fullWidth && 'flex-1'
            )}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="mt-4">
        {activeTabContent}
      </div>
    </div>
  )
}

export { Tabs }
