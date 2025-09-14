'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { 
  Search, 
  Filter, 
  Star, 
  Laptop, 
  Smartphone, 
  Monitor,
  Headphones,
  Camera,
  Zap,
  Award,
  TrendingUp,
  Globe,
  AlertTriangle
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ResponsiveContainer } from '@/components/ui/responsive-container'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { ErrorBoundary } from '@/components/ui/error-boundary'

interface Brand {
  id: string
  name: string
  slug: string
  logo: string
  description: string
  productCount: number
  rating: number
  category: string
  featured: boolean
  established: number
  country: string
  website: string
  products: string[]
}

const brandsData: Brand[] = [
  {
    id: '1',
    name: 'Dell',
    slug: 'dell',
    logo: '/brands/dell-logo.png',
    description: 'American multinational computer technology company specializing in personal computers and enterprise solutions.',
    productCount: 45,
    rating: 4.5,
    category: 'Laptops',
    featured: true,
    established: 1984,
    country: 'United States',
    website: 'https://www.dell.com',
    products: ['XPS', 'Inspiron', 'Latitude', 'Precision', 'Alienware']
  },
  {
    id: '2',
    name: 'HP',
    slug: 'hp',
    logo: '/brands/hp-logo.png',
    description: 'Hewlett Packard Enterprise and HP Inc. provide technology solutions for businesses and consumers worldwide.',
    productCount: 52,
    rating: 4.3,
    category: 'Laptops',
    featured: true,
    established: 1939,
    country: 'United States',
    website: 'https://www.hp.com',
    products: ['Pavilion', 'Envy', 'EliteBook', 'ProBook', 'Spectre']
  },
  {
    id: '3',
    name: 'Lenovo',
    slug: 'lenovo',
    logo: '/brands/lenovo-logo.png',
    description: 'Chinese multinational technology company that designs, develops, manufactures and markets personal computers.',
    productCount: 38,
    rating: 4.4,
    category: 'Laptops',
    featured: true,
    established: 1984,
    country: 'China',
    website: 'https://www.lenovo.com',
    products: ['ThinkPad', 'IdeaPad', 'Yoga', 'Legion', 'ThinkBook']
  },
  {
    id: '4',
    name: 'ASUS',
    slug: 'asus',
    logo: '/brands/asus-logo.png',
    description: 'Taiwanese multinational computer and phone hardware and electronics company.',
    productCount: 41,
    rating: 4.6,
    category: 'Laptops',
    featured: true,
    established: 1989,
    country: 'Taiwan',
    website: 'https://www.asus.com',
    products: ['ROG', 'ZenBook', 'VivoBook', 'ProArt', 'ExpertBook']
  },
  {
    id: '5',
    name: 'Acer',
    slug: 'acer',
    logo: '/brands/acer-logo.png',
    description: 'Taiwanese multinational hardware and electronics corporation specializing in advanced electronics technology.',
    productCount: 29,
    rating: 4.2,
    category: 'Laptops',
    featured: false,
    established: 1976,
    country: 'Taiwan',
    website: 'https://www.acer.com',
    products: ['Aspire', 'Nitro', 'Predator', 'Swift', 'Spin']
  },
  {
    id: '6',
    name: 'MSI',
    slug: 'msi',
    logo: '/brands/msi-logo.png',
    description: 'Taiwanese multinational information technology corporation that designs, develops and provides computer hardware.',
    productCount: 23,
    rating: 4.7,
    category: 'Gaming',
    featured: true,
    established: 1986,
    country: 'Taiwan',
    website: 'https://www.msi.com',
    products: ['Gaming', 'Creator', 'Prestige', 'Modern', 'Summit']
  },
  {
    id: '7',
    name: 'Apple',
    slug: 'apple',
    logo: '/brands/apple-logo.png',
    description: 'American multinational technology company that specializes in consumer electronics, computer software, and online services.',
    productCount: 15,
    rating: 4.8,
    category: 'Laptops',
    featured: true,
    established: 1976,
    country: 'United States',
    website: 'https://www.apple.com',
    products: ['MacBook Air', 'MacBook Pro', 'iMac', 'Mac Studio', 'Mac Pro']
  },
  {
    id: '8',
    name: 'Samsung',
    slug: 'samsung',
    logo: '/brands/samsung-logo.png',
    description: 'South Korean multinational conglomerate known for electronics, smartphones, and computer hardware.',
    productCount: 18,
    rating: 4.3,
    category: 'Laptops',
    featured: false,
    established: 1938,
    country: 'South Korea',
    website: 'https://www.samsung.com',
    products: ['Galaxy Book', 'Notebook', 'Chromebook', 'Odyssey']
  }
]

const categories = [
  { value: 'all', label: 'All Categories', icon: Globe },
  { value: 'Laptops', label: 'Laptops', icon: Laptop },
  { value: 'Gaming', label: 'Gaming', icon: Zap },
  { value: 'Business', label: 'Business', icon: Award },
  { value: 'Creative', label: 'Creative', icon: Monitor }
]

const sortOptions = [
  { value: 'name', label: 'Name A-Z' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'products', label: 'Most Products' },
  { value: 'featured', label: 'Featured First' }
]

export default function BrandsPage() {
  const [brands, setBrands] = useState<Brand[]>(brandsData)
  const [filteredBrands, setFilteredBrands] = useState<Brand[]>(brandsData)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortBy, setSortBy] = useState('featured')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Filter and sort brands
  useEffect(() => {
    setLoading(true)
    
    let filtered = brands.filter(brand => {
      const matchesSearch = brand.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          brand.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          brand.products.some(product => product.toLowerCase().includes(searchTerm.toLowerCase()))
      
      const matchesCategory = selectedCategory === 'all' || brand.category === selectedCategory
      
      return matchesSearch && matchesCategory
    })

    // Sort brands
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name)
        case 'rating':
          return b.rating - a.rating
        case 'products':
          return b.productCount - a.productCount
        case 'featured':
          return b.featured ? 1 : -1
        default:
          return 0
      }
    })

    setFilteredBrands(filtered)
    setLoading(false)
  }, [searchTerm, selectedCategory, sortBy, brands])

  const handleSearch = (value: string) => {
    setSearchTerm(value)
  }

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value)
  }

  const handleSortChange = (value: string) => {
    setSortBy(value)
  }

  if (error) {
    return (
      <ErrorBoundary>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Error Loading Brands</h2>
            <p className="text-gray-600 mb-4">{error}</p>
            <Button onClick={() => window.location.reload()}>
              Try Again
            </Button>
          </div>
        </div>
      </ErrorBoundary>
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
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Explore Top Brands
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Discover premium laptop brands and find the perfect device for your needs
            </p>
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
                      placeholder="Search brands, products, or descriptions..."
                      value={searchTerm}
                      onChange={(e) => handleSearch(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* Category Filter */}
                <Select value={selectedCategory} onValueChange={handleCategoryChange}>
                  <SelectTrigger className="w-full lg:w-48">
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.value} value={category.value}>
                        <div className="flex items-center gap-2">
                          <category.icon className="h-4 w-4" />
                          {category.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* Sort Options */}
                <Select value={sortBy} onValueChange={handleSortChange}>
                  <SelectTrigger className="w-full lg:w-48">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    {sortOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
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
            Showing {filteredBrands.length} of {brands.length} brands
          </p>
        </motion.div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center py-12">
            <LoadingSpinner size="lg" />
          </div>
        )}

        {/* Brands Grid */}
        {!loading && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {filteredBrands.map((brand, index) => (
              <motion.div
                key={brand.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <CardHeader className="text-center pb-4">
                    <div className="relative">
                      <div className="w-20 h-20 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <Image
                          src={brand.logo}
                          alt={`${brand.name} logo`}
                          width={60}
                          height={60}
                          className="object-contain"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement
                            target.style.display = 'none'
                          }}
                        />
                      </div>
                      {brand.featured && (
                        <Badge className="absolute -top-2 -right-2 bg-yellow-500 text-white">
                          <Star className="h-3 w-3 mr-1" />
                          Featured
                        </Badge>
                      )}
                    </div>
                    <CardTitle className="text-xl font-bold">{brand.name}</CardTitle>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {brand.description}
                    </p>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    {/* Brand Stats */}
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="text-center">
                        <div className="font-semibold text-gray-900">{brand.productCount}</div>
                        <div className="text-gray-600">Products</div>
                      </div>
                      <div className="text-center">
                        <div className="font-semibold text-gray-900 flex items-center justify-center gap-1">
                          <Star className="h-4 w-4 text-yellow-500 fill-current" />
                          {brand.rating}
                        </div>
                        <div className="text-gray-600">Rating</div>
                      </div>
                    </div>

                    {/* Category Badge */}
                    <div className="flex justify-center">
                      <Badge variant="secondary" className="text-xs">
                        {brand.category}
                      </Badge>
                    </div>

                    {/* Popular Products */}
                    <div className="space-y-2">
                      <h4 className="text-sm font-semibold text-gray-700">Popular Products:</h4>
                      <div className="flex flex-wrap gap-1">
                        {brand.products.slice(0, 3).map((product) => (
                          <Badge key={product} variant="outline" className="text-xs">
                            {product}
                          </Badge>
                        ))}
                        {brand.products.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{brand.products.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* Brand Info */}
                    <div className="text-xs text-gray-500 space-y-1">
                      <div>Established: {brand.established}</div>
                      <div>Country: {brand.country}</div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2 pt-2">
                      <Button asChild className="flex-1">
                        <Link href={`/brands/${brand.slug}`}>
                          View Products
                        </Link>
                      </Button>
                      <Button variant="outline" size="sm" asChild>
                        <a href={brand.website} target="_blank" rel="noopener noreferrer">
                          <Globe className="h-4 w-4" />
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* No Results */}
        {!loading && filteredBrands.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center py-12"
          >
            <Search className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No brands found</h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your search terms or filters
            </p>
            <Button onClick={() => {
              setSearchTerm('')
              setSelectedCategory('all')
              setSortBy('featured')
            }}>
              Clear Filters
            </Button>
          </motion.div>
        )}
      </ResponsiveContainer>
    </div>
  )
}


