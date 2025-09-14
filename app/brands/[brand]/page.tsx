'use client'

import React, { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { 
  Search, 
  Filter, 
  SortAsc, 
  Star, 
  ShoppingCart, 
  Heart,
  ArrowLeft,
  Grid,
  List,
  SlidersHorizontal,
  X,
  Check,
  ChevronDown,
  Zap,
  Award,
  Shield,
  Clock,
  Truck,
  RefreshCw,
  AlertCircle,
  Loader2
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { ResponsiveContainer } from '@/components/ui/responsive-container'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { ErrorBoundary } from '@/components/ui/error-boundary'
import { fetchProducts } from '../../data/db'
import { addToCart } from '../../data/products'

interface Product {
  id: number
  name: string
  price: number
  original_price?: number
  discount?: number
  brand_name?: string
  brand?: { name: string }
  specs?: string
  images?: string[]
  rating?: number
  reviews?: number
  in_stock?: boolean
  category?: string
  features?: string[]
}

interface BrandInfo {
  name: string
  logo: string
  description: string
  productCount: number
  rating: number
  established: number
  country: string
  website: string
  features: string[]
}

const brandInfo: Record<string, BrandInfo> = {
  'dell': {
    name: 'Dell',
    logo: '/brands/dell-logo.png',
    description: 'American multinational computer technology company specializing in personal computers and enterprise solutions.',
    productCount: 45,
    rating: 4.5,
    established: 1984,
    country: 'United States',
    website: 'https://www.dell.com',
    features: ['XPS Series', 'Inspiron Series', 'Latitude Series', 'Precision Series', 'Alienware Gaming']
  },
  'hp': {
    name: 'HP',
    logo: '/brands/hp-logo.png',
    description: 'Hewlett Packard Enterprise and HP Inc. provide technology solutions for businesses and consumers worldwide.',
    productCount: 52,
    rating: 4.3,
    established: 1939,
    country: 'United States',
    website: 'https://www.hp.com',
    features: ['Pavilion Series', 'Envy Series', 'EliteBook Series', 'ProBook Series', 'Spectre Series']
  },
  'lenovo': {
    name: 'Lenovo',
    logo: '/brands/lenovo-logo.png',
    description: 'Chinese multinational technology company that designs, develops, manufactures and markets personal computers.',
    productCount: 38,
    rating: 4.4,
    established: 1984,
    country: 'China',
    website: 'https://www.lenovo.com',
    features: ['ThinkPad Series', 'IdeaPad Series', 'Yoga Series', 'Legion Gaming', 'ThinkBook Series']
  },
  'asus': {
    name: 'ASUS',
    logo: '/brands/asus-logo.png',
    description: 'Taiwanese multinational computer and phone hardware and electronics company.',
    productCount: 41,
    rating: 4.6,
    established: 1989,
    country: 'Taiwan',
    website: 'https://www.asus.com',
    features: ['ROG Gaming', 'ZenBook Series', 'VivoBook Series', 'ProArt Series', 'ExpertBook Series']
  },
  'acer': {
    name: 'Acer',
    logo: '/brands/acer-logo.png',
    description: 'Taiwanese multinational hardware and electronics corporation specializing in advanced electronics technology.',
    productCount: 29,
    rating: 4.2,
    established: 1976,
    country: 'Taiwan',
    website: 'https://www.acer.com',
    features: ['Aspire Series', 'Nitro Gaming', 'Predator Gaming', 'Swift Series', 'Spin Series']
  },
  'msi': {
    name: 'MSI',
    logo: '/brands/msi-logo.png',
    description: 'Taiwanese multinational information technology corporation that designs, develops and provides computer hardware.',
    productCount: 23,
    rating: 4.7,
    established: 1986,
    country: 'Taiwan',
    website: 'https://www.msi.com',
    features: ['Gaming Series', 'Creator Series', 'Prestige Series', 'Modern Series', 'Summit Series']
  },
  'apple': {
    name: 'Apple',
    logo: '/brands/apple-logo.png',
    description: 'American multinational technology company that specializes in consumer electronics, computer software, and online services.',
    productCount: 15,
    rating: 4.8,
    established: 1976,
    country: 'United States',
    website: 'https://www.apple.com',
    features: ['MacBook Air', 'MacBook Pro', 'iMac', 'Mac Studio', 'Mac Pro']
  },
  'samsung': {
    name: 'Samsung',
    logo: '/brands/samsung-logo.png',
    description: 'South Korean multinational conglomerate known for electronics, smartphones, and computer hardware.',
    productCount: 18,
    rating: 4.3,
    established: 1938,
    country: 'South Korea',
    website: 'https://www.samsung.com',
    features: ['Galaxy Book', 'Notebook Series', 'Chromebook Series', 'Odyssey Gaming']
  }
}

export default function BrandPage() {
  const params = useParams<{ brand: string }>()
  const brand = (params?.brand || '').toString().toLowerCase()
  const brandData = brandInfo[brand]
  
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('name')
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000])
  const [showDiscountOnly, setShowDiscountOnly] = useState(false)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    loadProducts()
  }, [brand])

  useEffect(() => {
    filterProducts()
  }, [products, searchTerm, sortBy, priceRange, showDiscountOnly])

  const loadProducts = async () => {
    setLoading(true)
    setError(null)
    
    try {
      const allProducts = await fetchProducts()
      const brandProducts = allProducts.filter(p => 
        (p.brand_name || p.brand?.name)?.toLowerCase() === brand
      )
      setProducts(brandProducts.map(product => ({
        ...product,
        original_price: product.original_price || product.price,
        discount: product.discount || 0
      })))
    } catch (err) {
      console.error('Failed to fetch products:', err)
      setError('Failed to load products. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const filterProducts = () => {
    let filtered = [...products]

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.specs?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Price range filter
    filtered = filtered.filter(product =>
      product.price >= priceRange[0] && product.price <= priceRange[1]
    )

    // Discount filter
    if (showDiscountOnly) {
      filtered = filtered.filter(product => product.discount && product.discount > 0)
    }

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name)
        case 'price-low':
          return a.price - b.price
        case 'price-high':
          return b.price - a.price
        case 'rating':
          return (b.rating || 0) - (a.rating || 0)
        case 'newest':
          return b.id - a.id
        default:
          return 0
      }
    })

    setFilteredProducts(filtered)
  }

  const handleAddToCart = (product: Product) => {
    addToCart(product.id, 1)
    // You can add toast notification here
  }

  if (!brandData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Brand Not Found</h2>
          <p className="text-gray-600 mb-4">The brand you're looking for doesn't exist.</p>
          <Button asChild>
            <Link href="/brands">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Brands
            </Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <ResponsiveContainer>
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16 mb-8"
        >
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center">
              <Image
                src={brandData.logo}
                alt={`${brandData.name} logo`}
                width={60}
                height={60}
                className="object-contain"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.style.display = 'none'
                }}
              />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-2">
                {brandData.name} Laptops
              </h1>
              <p className="text-xl text-blue-100 mb-4">
                {brandData.description}
              </p>
              <div className="flex items-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span>{brandData.rating}/5</span>
                </div>
                <div>{brandData.productCount} Products</div>
                <div>Est. {brandData.established}</div>
                <div>{brandData.country}</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Search and Filter Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row gap-4">
                {/* Search Input */}
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Search products..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* Sort Options */}
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-full lg:w-48">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="name">Name A-Z</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                    <SelectItem value="newest">Newest First</SelectItem>
                  </SelectContent>
                </Select>

                {/* View Mode Toggle */}
                <div className="flex border rounded-lg">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>

                {/* Filter Toggle */}
                <Button
                  variant="outline"
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden"
                >
                  <SlidersHorizontal className="h-4 w-4 mr-2" />
                  Filters
                </Button>
              </div>

              {/* Advanced Filters */}
              {showFilters && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  transition={{ duration: 0.3 }}
                  className="mt-6 pt-6 border-t"
                >
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-2 block">
                        Price Range
                      </label>
                      <div className="flex gap-2">
                        <Input
                          type="number"
                          placeholder="Min"
                          value={priceRange[0]}
                          onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                        />
                        <Input
                          type="number"
                          placeholder="Max"
                          value={priceRange[1]}
                          onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                        />
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="discount"
                        checked={showDiscountOnly}
                        onCheckedChange={(checked: boolean) => setShowDiscountOnly(checked)}
                      />
                      <label htmlFor="discount" className="text-sm font-medium text-gray-700">
                        Show only discounted items
                      </label>
                    </div>
                  </div>
                </motion.div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Results Count */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-6"
        >
          <p className="text-gray-600">
            Showing {filteredProducts.length} of {products.length} products
          </p>
        </motion.div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center py-12">
            <LoadingSpinner size="lg" />
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-12">
            <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Error Loading Products</h3>
            <p className="text-gray-600 mb-4">{error}</p>
            <Button onClick={loadProducts}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Try Again
            </Button>
          </div>
        )}

        {/* Products Grid/List */}
        {!loading && !error && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className={
              viewMode === 'grid' 
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                : "space-y-4"
            }
          >
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <CardHeader className="p-0">
                    <div className="relative w-full h-48 overflow-hidden rounded-t-lg">
                      <Image
                        src={product.images?.[0] || '/placeholder-laptop.jpg'}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {product.discount && (
                        <Badge className="absolute top-3 left-3 bg-red-500 text-white">
                          -{product.discount}%
                        </Badge>
                      )}
                      <Button
                        size="sm"
                        variant="secondary"
                        className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Heart className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div>
                        <h3 className="font-semibold text-lg line-clamp-2 group-hover:text-blue-600 transition-colors">
                          {product.name}
                        </h3>
                        <p className="text-sm text-gray-600 line-clamp-2 mt-1">
                          {product.specs}
                        </p>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="text-sm text-gray-600">
                          {product.rating || 4.5} ({product.reviews || 0} reviews)
                        </span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-xl font-bold text-blue-600">
                            ${product.price}
                          </span>
                          {product.original_price && (
                            <span className="text-sm text-gray-400 line-through">
                              ${product.original_price}
                            </span>
                          )}
                        </div>
                        <Badge variant="secondary" className="text-xs">
                          {product.brand_name || product.brand?.name}
                        </Badge>
                      </div>
                      
                      <Button 
                        className="w-full"
                        onClick={() => handleAddToCart(product)}
                      >
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Add to Cart
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* No Results */}
        {!loading && !error && filteredProducts.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center py-12"
          >
            <Search className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your search terms or filters
            </p>
            <Button onClick={() => {
              setSearchTerm('')
              setPriceRange([0, 10000])
              setShowDiscountOnly(false)
            }}>
              Clear Filters
            </Button>
          </motion.div>
        )}
      </ResponsiveContainer>
    </div>
  )
}


