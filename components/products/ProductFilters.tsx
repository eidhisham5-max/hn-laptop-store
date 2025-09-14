'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { ChevronDown, ChevronUp, X } from 'lucide-react'

interface FilterOption {
  value: string
  label: string
  count?: number
}

interface FilterGroup {
  id: string
  title: string
  type: 'checkbox' | 'radio' | 'range' | 'color'
  options: FilterOption[]
  expanded?: boolean
}

interface ProductFiltersProps {
  onFiltersChange: (filters: any) => void
}

const ProductFilters: React.FC<ProductFiltersProps> = ({ onFiltersChange }) => {
  const [filters, setFilters] = useState({
    priceRange: [0, 50000],
    brands: [] as string[],
    screenSize: [] as string[],
    processor: [] as string[],
    ram: [] as string[],
    storage: [] as string[],
    graphicsCard: [] as string[],
    category: [] as string[],
    inStock: false,
    onSale: false
  })

  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    price: true,
    brand: true,
    specifications: false,
    features: false
  })

  const filterGroups: FilterGroup[] = [
    {
      id: 'price',
      title: 'السعر',
      type: 'range',
      options: [
        { value: '0-5000', label: 'أقل من 5,000 ريال' },
        { value: '5000-10000', label: '5,000 - 10,000 ريال' },
        { value: '10000-15000', label: '10,000 - 15,000 ريال' },
        { value: '15000-20000', label: '15,000 - 20,000 ريال' },
        { value: '20000+', label: 'أكثر من 20,000 ريال' }
      ]
    },
    {
      id: 'brand',
      title: 'العلامة التجارية',
      type: 'checkbox',
      options: [
        { value: 'apple', label: 'Apple', count: 15 },
        { value: 'dell', label: 'Dell', count: 23 },
        { value: 'hp', label: 'HP', count: 18 },
        { value: 'lenovo', label: 'Lenovo', count: 21 },
        { value: 'asus', label: 'ASUS', count: 19 },
        { value: 'msi', label: 'MSI', count: 12 },
        { value: 'acer', label: 'Acer', count: 16 }
      ]
    },
    {
      id: 'specifications',
      title: 'المواصفات',
      type: 'checkbox',
      options: [
        { value: '13', label: '13 بوصة', count: 8 },
        { value: '14', label: '14 بوصة', count: 12 },
        { value: '15', label: '15 بوصة', count: 25 },
        { value: '16', label: '16 بوصة', count: 18 },
        { value: '17', label: '17 بوصة', count: 10 }
      ]
    },
    {
      id: 'processor',
      title: 'المعالج',
      type: 'checkbox',
      options: [
        { value: 'intel-i5', label: 'Intel Core i5', count: 20 },
        { value: 'intel-i7', label: 'Intel Core i7', count: 25 },
        { value: 'intel-i9', label: 'Intel Core i9', count: 15 },
        { value: 'amd-ryzen5', label: 'AMD Ryzen 5', count: 18 },
        { value: 'amd-ryzen7', label: 'AMD Ryzen 7', count: 22 },
        { value: 'm1', label: 'Apple M1', count: 8 },
        { value: 'm2', label: 'Apple M2', count: 12 }
      ]
    },
    {
      id: 'ram',
      title: 'الذاكرة العشوائية',
      type: 'checkbox',
      options: [
        { value: '8gb', label: '8 GB', count: 15 },
        { value: '16gb', label: '16 GB', count: 35 },
        { value: '32gb', label: '32 GB', count: 20 },
        { value: '64gb', label: '64 GB', count: 8 }
      ]
    },
    {
      id: 'storage',
      title: 'التخزين',
      type: 'checkbox',
      options: [
        { value: '256gb', label: '256 GB', count: 12 },
        { value: '512gb', label: '512 GB', count: 25 },
        { value: '1tb', label: '1 TB', count: 30 },
        { value: '2tb', label: '2 TB', count: 15 }
      ]
    },
    {
      id: 'features',
      title: 'المميزات',
      type: 'checkbox',
      options: [
        { value: 'touchscreen', label: 'شاشة لمس', count: 18 },
        { value: 'backlit-keyboard', label: 'لوحة مفاتيح مضيئة', count: 25 },
        { value: 'fingerprint', label: 'بصمة الإصبع', count: 20 },
        { value: 'webcam', label: 'كاميرا ويب', count: 35 },
        { value: 'bluetooth', label: 'بلوتوث', count: 40 },
        { value: 'wifi6', label: 'WiFi 6', count: 22 }
      ]
    }
  ]

  const handleFilterChange = (filterType: string, value: string, checked: boolean) => {
    setFilters(prev => {
      const newFilters = { ...prev }
      
      if (filterType === 'brand' || filterType === 'screenSize' || filterType === 'processor' || 
          filterType === 'ram' || filterType === 'storage' || filterType === 'graphicsCard' || 
          filterType === 'category') {
        const currentValues = (newFilters[filterType as keyof typeof newFilters] as string[]) || []
        if (checked) {
          newFilters[filterType as keyof typeof newFilters] = [...currentValues, value] as any
        } else {
          newFilters[filterType as keyof typeof newFilters] = currentValues.filter(v => v !== value) as any
        }
      } else if (filterType === 'inStock' || filterType === 'onSale') {
        newFilters[filterType as keyof typeof newFilters] = checked as any
      }
      
      onFiltersChange(newFilters)
      return newFilters
    })
  }

  const handlePriceRangeChange = (min: number, max: number) => {
    setFilters(prev => {
      const newFilters = { ...prev, priceRange: [min, max] }
      onFiltersChange(newFilters)
      return newFilters
    })
  }

  const clearAllFilters = () => {
    const clearedFilters = {
      priceRange: [0, 50000],
      brands: [],
      screenSize: [],
      processor: [],
      ram: [],
      storage: [],
      graphicsCard: [],
      category: [],
      inStock: false,
      onSale: false
    }
    setFilters(clearedFilters)
    onFiltersChange(clearedFilters)
  }

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }))
  }

  const getActiveFiltersCount = () => {
    let count = 0
    if (filters.brands.length > 0) count += filters.brands.length
    if (filters.screenSize.length > 0) count += filters.screenSize.length
    if (filters.processor.length > 0) count += filters.processor.length
    if (filters.ram.length > 0) count += filters.ram.length
    if (filters.storage.length > 0) count += filters.storage.length
    if (filters.graphicsCard.length > 0) count += filters.graphicsCard.length
    if (filters.category.length > 0) count += filters.category.length
    if (filters.inStock) count += 1
    if (filters.onSale) count += 1
    return count
  }

  const renderFilterGroup = (group: FilterGroup) => {
    const isExpanded = expandedSections[group.id]
    
    return (
      <div key={group.id} className="border-b border-gray-100 last:border-b-0">
        <button
          onClick={() => toggleSection(group.id)}
          className="w-full flex items-center justify-between py-4 text-right"
        >
          <span className="font-semibold text-gray-800">{group.title}</span>
          {isExpanded ? (
            <ChevronUp className="w-5 h-5 text-gray-500" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-500" />
          )}
        </button>
        
        {isExpanded && (
          <div className="pb-4 space-y-3">
            {group.type === 'checkbox' && (
              <>
                {group.options.map((option) => {
                  const isChecked = Array.isArray(filters[group.id as keyof typeof filters]) && 
                    (filters[group.id as keyof typeof filters] as string[])?.includes(option.value)
                  return (
                    <label key={option.value} className="flex items-center justify-between cursor-pointer">
                      <div className="flex items-center space-x-3 space-x-reverse">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={(e) => handleFilterChange(group.id, option.value, e.target.checked)}
                          className="w-4 h-4 text-primary-500 bg-gray-100 border-gray-300 rounded focus:ring-primary-500 focus:ring-2"
                        />
                        <span className="text-gray-700">{option.label}</span>
                      </div>
                      {option.count && (
                        <span className="text-sm text-gray-500">({option.count})</span>
                      )}
                    </label>
                  )
                })}
              </>
            )}
            
            {group.type === 'range' && (
              <div className="space-y-3">
                <div className="flex items-center space-x-2 space-x-reverse">
                  <input
                    type="number"
                    placeholder="من"
                    value={filters.priceRange[0]}
                    onChange={(e) => handlePriceRangeChange(Number(e.target.value), filters.priceRange?.[1] || 0)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                  <span className="text-gray-500">-</span>
                  <input
                    type="number"
                    placeholder="إلى"
                    value={filters.priceRange[1]}
                    onChange={(e) => handlePriceRangeChange(filters.priceRange?.[0] || 0, Number(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                
                {/* Quick Price Filters */}
                <div className="grid grid-cols-2 gap-2">
                  {group.options.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => {
                        const [min, max] = option.value.split('-').map(v => v === '+' ? 50000 : Number(v))
                        handlePriceRangeChange(min || 0, max || 0)
                      }}
                      className="text-sm p-2 text-gray-600 hover:text-primary-500 hover:bg-primary-50 rounded-lg transition-colors duration-200"
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    )
  }

  return (
    <Card className="h-fit">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>الفلاتر</CardTitle>
          {getActiveFiltersCount() > 0 && (
            <div className="flex items-center space-x-2 space-x-reverse">
              <Badge variant="primary">{getActiveFiltersCount()}</Badge>
              <Button
                variant="ghost"
                size="sm"
                onClick={clearAllFilters}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Quick Filters */}
        <div className="space-y-3">
          <label className="flex items-center justify-between cursor-pointer">
            <div className="flex items-center space-x-3 space-x-reverse">
              <input
                type="checkbox"
                checked={filters.inStock}
                onChange={(e) => handleFilterChange('inStock', '', e.target.checked)}
                className="w-4 h-4 text-primary-500 bg-gray-100 border-gray-300 rounded focus:ring-primary-500 focus:ring-2"
              />
              <span className="text-gray-700">متوفر فقط</span>
            </div>
          </label>
          
          <label className="flex items-center justify-between cursor-pointer">
            <div className="flex items-center space-x-3 space-x-reverse">
              <input
                type="checkbox"
                checked={filters.onSale}
                onChange={(e) => handleFilterChange('onSale', '', e.target.checked)}
                className="w-4 h-4 text-primary-500 bg-gray-100 border-gray-300 rounded focus:ring-primary-500 focus:ring-2"
              />
              <span className="text-gray-700">عروض خاصة</span>
            </div>
          </label>
        </div>

        {/* Filter Groups */}
        {filterGroups.map(renderFilterGroup)}
        
        {/* Clear All Button */}
        {getActiveFiltersCount() > 0 && (
          <Button
            variant="outline"
            className="w-full mt-6"
            onClick={clearAllFilters}
          >
            مسح جميع الفلاتر
          </Button>
        )}
      </CardContent>
    </Card>
  )
}

export default ProductFilters