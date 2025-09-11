'use client'
import React, { useState, useEffect, useMemo, useCallback } from 'react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'
import { Select } from '../components/ui/Select'
import { Badge } from '../components/ui/Badge'
import { useToast } from '../components/ToastProvider'
import { addToCart } from '../data/products'
import { fetchProducts } from '../data/db'

// Code-split heavy components
const ProductGrid = dynamic(
  () => import('../components/products/ProductGrid').then(m => m.ProductGrid),
  { ssr: false }
)
const ProductFilters = dynamic(
  () => import('../components/products/ProductFilters').then(m => m.ProductFilters),
  { ssr: false }
)

// Small debounced value hook
function useDebouncedValue<T>(value: T, delayMs: number): T {
  const [debounced, setDebounced] = useState(value)
  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delayMs)
    return () => clearTimeout(id)
  }, [value, delayMs])
  return debounced
}

export default function ProductsPage() {
  const { showToast } = useToast()
  const router = useRouter()
  
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  
  // Filter states
  const [searchInput, setSearchInput] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedBrand, setSelectedBrand] = useState('')
  const [selectedCondition, setSelectedCondition] = useState('')
  const [priceRange, setPriceRange] = useState({ min: 0, max: 10000 })
  const [sortBy, setSortBy] = useState('name')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [showFilters, setShowFilters] = useState(false)

  const debouncedQuery = useDebouncedValue(searchInput, 250)

  // Load products
  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true)
      setError('')
      try {
        const fetchedProducts = await fetchProducts()
        setProducts(fetchedProducts)
      } catch (err) {
        console.error('Failed to fetch products', err)
        setError('Failed to load products')
      } finally {
        setLoading(false)
      }
    }

    loadProducts()
  }, [])

  // Get unique values for filters
  const brands = useMemo(() => {
    const uniqueBrands = Array.from(new Set(products.map(p => p.brand_name || p.brand?.name).filter(Boolean)))
    return uniqueBrands.map(brand => ({ value: brand, label: brand, count: products.filter(p => (p.brand_name || p.brand?.name) === brand).length }))
  }, [products])

  const categories = useMemo(() => {
    const uniqueCategories = Array.from(new Set(products.map(p => p.category).filter(Boolean)))
    return uniqueCategories.map(category => ({ value: category, label: category, count: products.filter(p => p.category === category).length }))
  }, [products])

  const conditions = useMemo(() => {
    const uniqueConditions = Array.from(new Set(products.map(p => p.condition).filter(Boolean)))
    return uniqueConditions.map(condition => ({ value: condition, label: condition, count: products.filter(p => p.condition === condition).length }))
  }, [products])

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = products.filter(product => {
      // Search query
      if (debouncedQuery && !product.name.toLowerCase().includes(debouncedQuery.toLowerCase()) && 
          !product.specs?.toLowerCase().includes(debouncedQuery.toLowerCase())) {
        return false
      }
      
      // Category filter
      if (selectedCategory && product.category !== selectedCategory) {
        return false
      }
      
      // Brand filter
      if (selectedBrand && (product.brand_name || product.brand?.name) !== selectedBrand) {
        return false
      }
      
      // Condition filter
      if (selectedCondition && product.condition !== selectedCondition) {
        return false
      }
      
      // Price range filter
      if (product.price < priceRange.min || product.price > priceRange.max) {
        return false
      }
      
      return true
    })

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price
        case 'price-high':
          return b.price - a.price
        case 'name':
          return a.name.localeCompare(b.name)
        case 'rating':
          return (b.rating || 0) - (a.rating || 0)
        case 'newest':
          return new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime()
        default:
          return 0
      }
    })

    return filtered
  }, [products, debouncedQuery, selectedCategory, selectedBrand, selectedCondition, priceRange, sortBy])

  const handleAddToCart = async (product: any) => {
    try {
      await addToCart(product)
      showToast('Product added to cart!', 'success')
    } catch (error) {
      showToast('Failed to add product to cart', 'error')
    }
  }

  const handleProductClick = useCallback((product: any) => {
    router.push(`/products/${product.id}`)
  }, [router])

  const handleClearFilters = () => {
    setSearchInput('')
    setSelectedCategory('')
    setSelectedBrand('')
    setSelectedCondition('')
    setPriceRange({ min: 0, max: 10000 })
    setSortBy('name')
  }

  const sortOptions = [
    { value: 'name', label: 'Name A-Z' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'rating', label: 'Rating' },
    { value: 'newest', label: 'Newest First' }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">All Laptops</h1>
              <p className="text-gray-600 mt-2">
                {loading ? 'Loading...' : `${filteredProducts.length} products found`}
              </p>
            </div>
            
            {/* Mobile Filter Button */}
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden"
            >
              Filters
            </Button>
          </div>

          {/* Search and Controls */}
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex-1 max-w-md">
              <Input
                placeholder="Search products..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                leftIcon={
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                }
              />
            </div>
            
            <div className="flex items-center gap-4">
              <Select
                options={sortOptions}
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-48"
              />
              
              <div className="flex items-center gap-2">
                <Button
                  variant={viewMode === 'grid' ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                  </svg>
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Desktop Filters */}
          <div className="hidden lg:block w-80 flex-shrink-0">
            <ProductFilters
              categories={categories}
              brands={brands}
              conditions={conditions}
              priceRange={priceRange}
              selectedCategory={selectedCategory}
              selectedBrand={selectedBrand}
              selectedCondition={selectedCondition}
              selectedPriceRange={priceRange}
              onCategoryChange={setSelectedCategory}
              onBrandChange={setSelectedBrand}
              onConditionChange={setSelectedCondition}
              onPriceRangeChange={setPriceRange}
              onClearFilters={handleClearFilters}
            />
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            <ProductGrid
              products={filteredProducts}
              loading={loading}
              error={error}
              viewMode={viewMode}
              columns={viewMode === 'grid' ? 3 : 1}
              onAddToCart={handleAddToCart}
              onProductClick={handleProductClick}
            />
          </div>
        </div>

        {/* Mobile Filters: mount only when open to reduce work */}
        {showFilters && (
          <ProductFilters
            categories={categories}
            brands={brands}
            conditions={conditions}
            priceRange={priceRange}
            selectedCategory={selectedCategory}
            selectedBrand={selectedBrand}
            selectedCondition={selectedCondition}
            selectedPriceRange={priceRange}
            onCategoryChange={setSelectedCategory}
            onBrandChange={setSelectedBrand}
            onConditionChange={setSelectedCondition}
            onPriceRangeChange={setPriceRange}
            onClearFilters={handleClearFilters}
            isMobile
            isOpen={showFilters}
            onClose={() => setShowFilters(false)}
          />
        )}
      </div>
    </div>
  )
}