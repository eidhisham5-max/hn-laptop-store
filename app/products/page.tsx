'use client'

import React, { useState, useEffect } from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import ProductFilters from '@/components/products/ProductFilters'
import ProductGrid from '@/components/products/ProductGrid'
import { Button } from '@/components/ui/Button'
import { Filter, X } from 'lucide-react'

interface Product {
  id: number
  name: string
  brand: string
  price: number
  originalPrice?: number
  rating: number
  reviewCount: number
  image: string
  badge?: string
  isNew?: boolean
  isOnSale?: boolean
  inStock: boolean
  specifications: {
    screenSize: string
    processor: string
    ram: string
    storage: string
  }
}

const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [sortBy, setSortBy] = useState('featured')
  const [showMobileFilters, setShowMobileFilters] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Mock data - في التطبيق الحقيقي سيتم جلبها من API
  const mockProducts: Product[] = [
    {
      id: 1,
      name: 'MacBook Pro 16" M3 Max',
      brand: 'Apple',
      price: 12999,
      originalPrice: 14999,
      rating: 4.8,
      reviewCount: 124,
      image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2026&q=80',
      badge: 'الأكثر مبيعاً',
      isOnSale: true,
      inStock: true,
      specifications: {
        screenSize: '16 بوصة',
        processor: 'Apple M3 Max',
        ram: '32 GB',
        storage: '1 TB'
      }
    },
    {
      id: 2,
      name: 'Dell XPS 15 OLED',
      brand: 'Dell',
      price: 8999,
      rating: 4.6,
      reviewCount: 89,
      image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80',
      badge: 'جديد',
      isNew: true,
      inStock: true,
      specifications: {
        screenSize: '15 بوصة',
        processor: 'Intel Core i7',
        ram: '16 GB',
        storage: '512 GB'
      }
    },
    {
      id: 3,
      name: 'ASUS ROG Strix G15',
      brand: 'ASUS',
      price: 6999,
      originalPrice: 7999,
      rating: 4.7,
      reviewCount: 156,
      image: 'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2042&q=80',
      badge: 'عرض خاص',
      isOnSale: true,
      inStock: true,
      specifications: {
        screenSize: '15 بوصة',
        processor: 'AMD Ryzen 7',
        ram: '16 GB',
        storage: '1 TB'
      }
    },
    {
      id: 4,
      name: 'HP Spectre x360 14',
      brand: 'HP',
      price: 7999,
      rating: 4.5,
      reviewCount: 67,
      image: 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1964&q=80',
      badge: 'محدود',
      isNew: true,
      inStock: false,
      specifications: {
        screenSize: '14 بوصة',
        processor: 'Intel Core i5',
        ram: '8 GB',
        storage: '256 GB'
      }
    },
    {
      id: 5,
      name: 'Lenovo ThinkPad X1 Carbon',
      brand: 'Lenovo',
      price: 9999,
      rating: 4.9,
      reviewCount: 203,
      image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80',
      badge: 'الأفضل تقييماً',
      inStock: true,
      specifications: {
        screenSize: '14 بوصة',
        processor: 'Intel Core i7',
        ram: '16 GB',
        storage: '512 GB'
      }
    },
    {
      id: 6,
      name: 'MSI Creator 17',
      brand: 'MSI',
      price: 11999,
      originalPrice: 13999,
      rating: 4.6,
      reviewCount: 78,
      image: 'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2042&q=80',
      badge: 'عرض خاص',
      isOnSale: true,
      inStock: true,
      specifications: {
        screenSize: '17 بوصة',
        processor: 'Intel Core i9',
        ram: '32 GB',
        storage: '2 TB'
      }
    }
  ]

  useEffect(() => {
    // Simulate API call
    const loadProducts = async () => {
      setIsLoading(true)
      await new Promise(resolve => setTimeout(resolve, 1000))
      setProducts(mockProducts)
      setFilteredProducts(mockProducts)
      setIsLoading(false)
    }
    
    loadProducts()
  }, [])

  const handleFiltersChange = (filters: any) => {
    let filtered = [...products]

    // Apply price filter
    if (filters.priceRange) {
      filtered = filtered.filter(product => 
        product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1]
      )
    }

    // Apply brand filter
    if (filters.brands && filters.brands.length > 0) {
      filtered = filtered.filter(product => 
        filters.brands.includes(product.brand.toLowerCase())
      )
    }

    // Apply screen size filter
    if (filters.screenSize && filters.screenSize.length > 0) {
      filtered = filtered.filter(product => 
        filters.screenSize.some((size: string) => 
          product.specifications.screenSize.includes(size)
        )
      )
    }

    // Apply processor filter
    if (filters.processor && filters.processor.length > 0) {
      filtered = filtered.filter(product => 
        filters.processor.some((proc: string) => 
          product.specifications.processor.toLowerCase().includes(proc.toLowerCase())
        )
      )
    }

    // Apply RAM filter
    if (filters.ram && filters.ram.length > 0) {
      filtered = filtered.filter(product => 
        filters.ram.some((ram: string) => 
          product.specifications.ram.toLowerCase().includes(ram.toLowerCase())
        )
      )
    }

    // Apply storage filter
    if (filters.storage && filters.storage.length > 0) {
      filtered = filtered.filter(product => 
        filters.storage.some((storage: string) => 
          product.specifications.storage.toLowerCase().includes(storage.toLowerCase())
        )
      )
    }

    // Apply in stock filter
    if (filters.inStock) {
      filtered = filtered.filter(product => product.inStock)
    }

    // Apply on sale filter
    if (filters.onSale) {
      filtered = filtered.filter(product => product.isOnSale)
    }

    setFilteredProducts(filtered)
  }

  const handleSortChange = (sort: string) => {
    setSortBy(sort)
    let sorted = [...filteredProducts]

    switch (sort) {
      case 'price-low':
        sorted.sort((a, b) => a.price - b.price)
        break
      case 'price-high':
        sorted.sort((a, b) => b.price - a.price)
        break
      case 'rating':
        sorted.sort((a, b) => b.rating - a.rating)
        break
      case 'newest':
        sorted.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0))
        break
      case 'popular':
        sorted.sort((a, b) => b.reviewCount - a.reviewCount)
        break
      default:
        // Keep original order for 'featured'
        break
    }

    setFilteredProducts(sorted)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="container-custom py-16">
          <div className="flex items-center justify-center">
            <div className="spinner"></div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="container-custom py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="heading-1 mb-4">جميع اللابتوبات</h1>
          <p className="text-lg text-gray-600">
            اكتشف مجموعتنا الكاملة من اللابتوبات والملحقات التقنية
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Desktop Filters */}
          <div className="hidden lg:block lg:w-80 flex-shrink-0">
            <div className="sticky top-24">
              <ProductFilters onFiltersChange={handleFiltersChange} />
            </div>
          </div>

          {/* Mobile Filter Button */}
          <div className="lg:hidden mb-4">
            <Button
              variant="outline"
              onClick={() => setShowMobileFilters(true)}
              className="w-full"
            >
              <Filter className="w-5 h-5 ml-2" />
              الفلاتر
            </Button>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            <ProductGrid
              products={filteredProducts}
              viewMode={viewMode}
              onViewModeChange={setViewMode}
              sortBy={sortBy}
              onSortChange={handleSortChange}
            />
          </div>
        </div>
      </main>

      {/* Mobile Filters Modal */}
      {showMobileFilters && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setShowMobileFilters(false)} />
          <div className="absolute right-0 top-0 h-full w-80 bg-white shadow-strong overflow-y-auto">
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-lg font-semibold">الفلاتر</h3>
              <button
                onClick={() => setShowMobileFilters(false)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4">
              <ProductFilters onFiltersChange={handleFiltersChange} />
            </div>
          </div>
        </div>
      )}
      
      <Footer />
    </div>
  )
}

export default ProductsPage