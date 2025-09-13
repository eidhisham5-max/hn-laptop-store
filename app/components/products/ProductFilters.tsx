'use client'
import React, { useState } from 'react'
import { Button } from '../ui/Button'
import { cn } from '../../lib/utils'

export interface FilterOption {
  value: string
  label: string
  count?: number
}

export interface PriceRange {
  min: number
  max: number
}

export interface ProductFiltersProps {
  categories: FilterOption[]
  brands: FilterOption[]
  conditions: FilterOption[]
  priceRange: PriceRange
  selectedCategory?: string
  selectedBrand?: string
  selectedCondition?: string
  selectedPriceRange?: PriceRange
  onCategoryChange?: (category: string) => void
  onBrandChange?: (brand: string) => void
  onConditionChange?: (condition: string) => void
  onPriceRangeChange?: (range: PriceRange) => void
  onClearFilters?: () => void
  className?: string
  isMobile?: boolean
  isOpen?: boolean
  onClose?: () => void
}

const ProductFilters: React.FC<ProductFiltersProps> = ({
  categories,
  brands,
  conditions,
  priceRange,
  selectedCategory,
  selectedBrand,
  selectedCondition,
  selectedPriceRange,
  onCategoryChange,
  onBrandChange,
  onConditionChange,
  onPriceRangeChange,
  onClearFilters,
  className,
  isMobile = false,
  isOpen = false,
  onClose
}) => {
  const [localPriceRange, setLocalPriceRange] = useState<PriceRange>(
    selectedPriceRange || priceRange
  )

  const handlePriceChange = (field: 'min' | 'max', value: number) => {
    const newRange = { ...localPriceRange, [field]: value }
    setLocalPriceRange(newRange)
    onPriceRangeChange?.(newRange)
  }

  const handleClearFilters = () => {
    setLocalPriceRange(priceRange)
    onClearFilters?.()
  }

  const hasActiveFilters = selectedCategory || selectedBrand || selectedCondition || 
    (selectedPriceRange && (selectedPriceRange.min !== priceRange.min || selectedPriceRange.max !== priceRange.max))

  const content = (
    <div className="space-y-6">
      {/* Categories */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Categories</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <label key={category.value} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="category"
                value={category.value}
                checked={selectedCategory === category.value}
                onChange={(e) => onCategoryChange?.(e.target.value)}
                className="w-4 h-4 text-primary-500 border-gray-300 focus:ring-primary-500"
              />
              <span className="text-sm text-gray-700">
                {category.label}
                {category.count && (
                  <span className="ml-1 text-gray-500">({category.count})</span>
                )}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Brands */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Brands</h3>
        <div className="space-y-2">
          {brands.map((brand) => (
            <label key={brand.value} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedBrand === brand.value}
                onChange={(e) => onBrandChange?.(e.target.checked ? brand.value : '')}
                className="w-4 h-4 text-primary-500 border-gray-300 rounded focus:ring-primary-500"
              />
              <span className="text-sm text-gray-700">
                {brand.label}
                {brand.count && (
                  <span className="ml-1 text-gray-500">({brand.count})</span>
                )}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Condition */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Condition</h3>
        <div className="space-y-2">
          {conditions.map((condition) => (
            <label key={condition.value} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedCondition === condition.value}
                onChange={(e) => onConditionChange?.(e.target.checked ? condition.value : '')}
                className="w-4 h-4 text-primary-500 border-gray-300 rounded focus:ring-primary-500"
              />
              <span className="text-sm text-gray-700">
                {condition.label}
                {condition.count && (
                  <span className="ml-1 text-gray-500">({condition.count})</span>
                )}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Price Range</h3>
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <input
              type="number"
              placeholder="Min"
              value={localPriceRange.min}
              onChange={(e) => handlePriceChange('min', parseInt(e.target.value) || 0)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            <span className="text-gray-500">to</span>
            <input
              type="number"
              placeholder="Max"
              value={localPriceRange.max}
              onChange={(e) => handlePriceChange('max', parseInt(e.target.value) || 0)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          
          {/* Price Range Slider */}
          <div className="space-y-2">
            <input
              type="range"
              min={priceRange.min}
              max={priceRange.max}
              value={localPriceRange.min}
              onChange={(e) => handlePriceChange('min', parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            />
            <input
              type="range"
              min={priceRange.min}
              max={priceRange.max}
              value={localPriceRange.max}
              onChange={(e) => handlePriceChange('max', parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            />
          </div>
        </div>
      </div>

      {/* Clear Filters */}
      {hasActiveFilters && (
        <Button
          onClick={handleClearFilters}
          variant="outline"
          fullWidth
          className="mt-6"
        >
          Clear All Filters
        </Button>
      )}
    </div>
  )

  if (isMobile) {
    return (
      <div className={cn(
        'fixed inset-0 z-50 bg-black/50 backdrop-blur-sm',
        isOpen ? 'block' : 'hidden'
      )}>
        <div className="fixed bottom-0 left-0 right-0 bg-white rounded-t-xl p-6 max-h-[80vh] overflow-y-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Filters</h2>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          {content}
        </div>
      </div>
    )
  }

  return (
    <div className={cn('bg-white p-6 rounded-lg shadow-sm border border-gray-200', className)}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Filters</h2>
        {hasActiveFilters && (
          <Button
            onClick={handleClearFilters}
            variant="ghost"
            size="sm"
          >
            Clear All
          </Button>
        )}
      </div>
      {content}
    </div>
  )
}

export { ProductFilters }
