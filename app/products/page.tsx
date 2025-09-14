'use client'

import React, { useState, useEffect, useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { 
  Search, 
  Filter, 
  Grid, 
  List, 
  Star, 
  Heart, 
  ShoppingCart,
  ChevronDown,
  X,
  SlidersHorizontal
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { ProductService } from '@/lib/data/products'
import { Product, ProductCategory, ProductCondition } from '@/lib/types'
import { useCart } from '@/contexts/cart-context'
import { cn, formatPrice } from '@/lib/utils'

export default function ProductsPage() {
  const searchParams = useSearchParams()
  const { addItem } = useCart()
  
  // State
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [showFilters, setShowFilters] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('name')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')
  
  // Filters
  const [filters, setFilters] = useState({
    category: '',
    brand: '',
    minPrice: '',
    maxPrice: '',
    condition: [] as ProductCondition[],
    inStock: false,
    isOnSale: false,
    isNew: false,
    isFeatured: false,
    rating: 0,
  })

  // Brands and categories
  const [brands, setBrands] = useState<string[]>([])
  const [categories, setCategories] = useState<ProductCategory[]>([])

  // Load products and metadata
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true)
        const [productsData, brandsData, categoriesData] = await Promise.all([
          ProductService.getAllProducts(),
          ProductService.getBrands(),
          ProductService.getCategories(),
        ])
        
        setProducts(productsData)
        setBrands(brandsData)
        setCategories(categoriesData)
        
        // Apply URL search params
        const search = searchParams.get('search')
        const category = searchParams.get('category')
        const brand = searchParams.get('brand')
        
        if (search) setSearchQuery(search)
        if (category) setFilters(prev => ({ ...prev, category }))
        if (brand) setFilters(prev => ({ ...prev, brand }))
        
      } catch (error) {
        console.error('Failed to load products:', error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [searchParams])

  // Filter and sort products
  useEffect(() => {
    let filtered = [...products]

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.brand.toLowerCase().includes(query) ||
        product.tags.some(tag => tag.toLowerCase().includes(query))
      )
    }

    // Category filter
    if (filters.category) {
      filtered = filtered.filter(product => product.category === filters.category)
    }

    // Brand filter
    if (filters.brand) {
      filtered = filtered.filter(product => 
        product.brand.toLowerCase() === filters.brand.toLowerCase()
      )
    }

    // Price range filter
    if (filters.minPrice) {
      filtered = filtered.filter(product => product.price >= Number(filters.minPrice))
    }
    if (filters.maxPrice) {
      filtered = filtered.filter(product => product.price <= Number(filters.maxPrice))
    }

    // Condition filter
    if (filters.condition.length > 0) {
      filtered = filtered.filter(product => filters.condition.includes(product.condition))
    }

    // Stock filter
    if (filters.inStock) {
      filtered = filtered.filter(product => product.stock > 0)
    }

    // Sale filter
    if (filters.isOnSale) {
      filtered = filtered.filter(product => product.isOnSale)
    }

    // New filter
    if (filters.isNew) {
      filtered = filtered.filter(product => product.isNew)
    }

    // Featured filter
    if (filters.isFeatured) {
      filtered = filtered.filter(product => product.isFeatured)
    }

    // Rating filter
    if (filters.rating > 0) {
      filtered = filtered.filter(product => product.rating >= filters.rating)
    }

    // Sort products
    filtered.sort((a, b) => {
      let aValue: any, bValue: any

      switch (sortBy) {
        case 'name':
          aValue = a.name
          bValue = b.name
          break
        case 'price':
          aValue = a.price
          bValue = b.price
          break
        case 'rating':
          aValue = a.rating
          bValue = b.rating
          break
        case 'newest':
          aValue = new Date(a.createdAt).getTime()
          bValue = new Date(b.createdAt).getTime()
          break
        default:
          aValue = a.name
          bValue = b.name
      }

      if (sortBy === 'newest') {
        return sortOrder === 'asc' ? aValue - bValue : bValue - aValue
      }

      if (typeof aValue === 'string') {
        return sortOrder === 'asc' 
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue)
      }

      return sortOrder === 'asc' ? aValue - bValue : bValue - aValue
    })

    setFilteredProducts(filtered)
  }, [products, searchQuery, filters, sortBy, sortOrder])

  // Handle filter change
  const handleFilterChange = (key: string, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  // Handle condition filter
  const handleConditionChange = (condition: ProductCondition, checked: boolean) => {
    setFilters(prev => ({
      ...prev,
      condition: checked
        ? [...prev.condition, condition]
        : prev.condition.filter(c => c !== condition)
    }))
  }

  // Clear all filters
  const clearFilters = () => {
    setFilters({
      category: '',
      brand: '',
      minPrice: '',
      maxPrice: '',
      condition: [],
      inStock: false,
      isOnSale: false,
      isNew: false,
      isFeatured: false,
      rating: 0,
    })
    setSearchQuery('')
  }

  // Get active filters count
  const activeFiltersCount = useMemo(() => {
    let count = 0
    if (filters.category) count++
    if (filters.brand) count++
    if (filters.minPrice || filters.maxPrice) count++
    if (filters.condition.length > 0) count++
    if (filters.inStock) count++
    if (filters.isOnSale) count++
    if (filters.isNew) count++
    if (filters.isFeatured) count++
    if (filters.rating > 0) count++
    return count
  }, [filters])

  return (
    <div className="min-h-screen bg-background">
      <div className="container-custom py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className={cn(
            'lg:w-80 space-y-6',
            showFilters ? 'block' : 'hidden lg:block'
          )}>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold flex items-center">
                    <SlidersHorizontal className="w-5 h-5 ml-2" />
                    الفلاتر
                  </h3>
                  {activeFiltersCount > 0 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={clearFilters}
                      className="text-primary"
                    >
                      مسح الكل
                    </Button>
                  )}
                </div>

                {/* Search */}
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">البحث</label>
                    <div className="relative">
                      <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        placeholder="ابحث عن منتج..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pr-10"
                      />
                    </div>
                  </div>

                  {/* Category */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">الفئة</label>
                    <Select
                      value={filters.category}
                      onValueChange={(value: string) => handleFilterChange('category', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="اختر الفئة" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">جميع الفئات</SelectItem>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category === 'laptops' && 'اللابتوبات'}
                            {category === 'tablets' && 'التابلت'}
                            {category === 'phones' && 'الهواتف'}
                            {category === 'gaming' && 'الجيمنج'}
                            {category === 'accessories' && 'الإكسسوارات'}
                            {category === 'business' && 'الأعمال'}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Brand */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">العلامة التجارية</label>
                    <Select
                      value={filters.brand}
                      onValueChange={(value: string) => handleFilterChange('brand', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="اختر العلامة التجارية" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">جميع العلامات</SelectItem>
                        {brands.map((brand) => (
                          <SelectItem key={brand} value={brand}>
                            {brand}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Price Range */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">نطاق السعر</label>
                    <div className="grid grid-cols-2 gap-2">
                      <Input
                        placeholder="من"
                        type="number"
                        value={filters.minPrice}
                        onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                      />
                      <Input
                        placeholder="إلى"
                        type="number"
                        value={filters.maxPrice}
                        onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Condition */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">الحالة</label>
                    <div className="space-y-2">
                      {(['new', 'refurbished', 'used'] as ProductCondition[]).map((condition) => (
                        <div key={condition} className="flex items-center space-x-2 space-x-reverse">
                          <Checkbox
                            id={condition}
                            checked={filters.condition.includes(condition)}
                            onCheckedChange={(checked: boolean) => 
                              handleConditionChange(condition, checked)
                            }
                          />
                          <label htmlFor={condition} className="text-sm">
                            {condition === 'new' && 'جديد'}
                            {condition === 'refurbished' && 'مجدّد'}
                            {condition === 'used' && 'مستعمل'}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Features */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">المميزات</label>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <Checkbox
                          id="inStock"
                          checked={filters.inStock}
                          onCheckedChange={(checked: boolean) => handleFilterChange('inStock', checked)}
                        />
                        <label htmlFor="inStock" className="text-sm">متوفر فقط</label>
                      </div>
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <Checkbox
                          id="isOnSale"
                          checked={filters.isOnSale}
                          onCheckedChange={(checked: boolean) => handleFilterChange('isOnSale', checked)}
                        />
                        <label htmlFor="isOnSale" className="text-sm">عروض خاصة</label>
                      </div>
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <Checkbox
                          id="isNew"
                          checked={filters.isNew}
                          onCheckedChange={(checked: boolean) => handleFilterChange('isNew', checked)}
                        />
                        <label htmlFor="isNew" className="text-sm">منتجات جديدة</label>
                      </div>
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <Checkbox
                          id="isFeatured"
                          checked={filters.isFeatured}
                          onCheckedChange={(checked: boolean) => handleFilterChange('isFeatured', checked)}
                        />
                        <label htmlFor="isFeatured" className="text-sm">منتجات مميزة</label>
                      </div>
                    </div>
                  </div>

                  {/* Rating */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">التقييم</label>
                    <Select
                      value={filters.rating.toString()}
                      onValueChange={(value: string) => handleFilterChange('rating', Number(value))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="اختر التقييم" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0">جميع التقييمات</SelectItem>
                        <SelectItem value="4">4+ نجوم</SelectItem>
                        <SelectItem value="3">3+ نجوم</SelectItem>
                        <SelectItem value="2">2+ نجوم</SelectItem>
                        <SelectItem value="1">1+ نجوم</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <div>
                <h1 className="text-2xl font-bold">المنتجات</h1>
                <p className="text-muted-foreground">
                  {filteredProducts.length} منتج
                  {activeFiltersCount > 0 && ` (${activeFiltersCount} فلتر نشط)`}
                </p>
              </div>

              <div className="flex items-center gap-4">
                {/* Mobile filter button */}
                <Button
                  variant="outline"
                  size="sm"
                  className="lg:hidden"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <Filter className="w-4 h-4 ml-2" />
                  الفلاتر
                  {activeFiltersCount > 0 && (
                    <Badge variant="destructive" className="mr-2 h-5 w-5 p-0 flex items-center justify-center">
                      {activeFiltersCount}
                    </Badge>
                  )}
                </Button>

                {/* Sort */}
                <div className="flex items-center gap-2">
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="name">الاسم</SelectItem>
                      <SelectItem value="price">السعر</SelectItem>
                      <SelectItem value="rating">التقييم</SelectItem>
                      <SelectItem value="newest">الأحدث</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')}
                  >
                    <ChevronDown className={cn(
                      'w-4 h-4 transition-transform',
                      sortOrder === 'desc' && 'rotate-180'
                    )} />
                  </Button>
                </div>

                {/* View mode */}
                <div className="flex border rounded-md">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                    className="rounded-r-none"
                  >
                    <Grid className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                    className="rounded-l-none"
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Products Grid/List */}
            {loading ? (
              <div className={cn(
                'grid gap-6',
                viewMode === 'grid' 
                  ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
                  : 'grid-cols-1'
              )}>
                {[...Array(6)].map((_, index) => (
                  <Card key={index} className="animate-pulse">
                    <div className="aspect-square bg-muted rounded-t-lg" />
                    <CardContent className="p-6">
                      <div className="h-4 bg-muted rounded mb-2" />
                      <div className="h-4 bg-muted rounded mb-4 w-2/3" />
                      <div className="h-6 bg-muted rounded w-1/2" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : filteredProducts.length > 0 ? (
              <div className={cn(
                'grid gap-6',
                viewMode === 'grid' 
                  ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
                  : 'grid-cols-1'
              )}>
                {filteredProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <Card className={cn(
                      'group hover:shadow-lg transition-all duration-300 overflow-hidden',
                      viewMode === 'list' && 'flex'
                    )}>
                      <Link href={`/products/${product.slug}`}>
                        <div className={cn(
                          'relative overflow-hidden',
                          viewMode === 'grid' ? 'aspect-square' : 'w-48 h-48 flex-shrink-0'
                        )}>
                          <Image
                            src={product.images[0]?.url || '/placeholder.jpg'}
                            alt={product.name}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          {product.isOnSale && (
                            <Badge variant="destructive" className="absolute top-4 right-4">
                              -{product.discount}%
                            </Badge>
                          )}
                          {product.isNew && (
                            <Badge variant="secondary" className="absolute top-4 left-4">
                              جديد
                            </Badge>
                          )}
                        </div>
                      </Link>
                      
                      <CardContent className={cn(
                        'p-6',
                        viewMode === 'list' && 'flex-1'
                      )}>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <Badge variant="outline" className="text-xs">
                              {product.brand}
                            </Badge>
                            <div className="flex items-center space-x-1 space-x-reverse">
                              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              <span className="text-sm text-muted-foreground">
                                {product.rating} ({product.reviewCount})
                              </span>
                            </div>
                          </div>
                          
                          <Link href={`/products/${product.slug}`}>
                            <h3 className="font-semibold text-lg line-clamp-2 group-hover:text-primary transition-colors">
                              {product.name}
                            </h3>
                          </Link>
                          
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {product.shortDescription}
                          </p>
                          
                          <div className="flex items-center space-x-2 space-x-reverse">
                            <span className="text-xl font-bold text-primary">
                              {formatPrice(product.price)}
                            </span>
                            {product.originalPrice && (
                              <span className="text-sm text-muted-foreground line-through">
                                {formatPrice(product.originalPrice)}
                              </span>
                            )}
                          </div>
                          
                          <div className="flex items-center space-x-2 space-x-reverse">
                            <div className={`w-2 h-2 rounded-full ${product.stock > 0 ? 'bg-green-500' : 'bg-red-500'}`} />
                            <span className={`text-sm ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                              {product.stock > 0 ? 'متوفر' : 'نفد المخزون'}
                            </span>
                          </div>
                        </div>
                        
                        <div className="mt-6 flex space-x-2 space-x-reverse">
                          <Button
                            className="flex-1"
                            onClick={() => addItem(product, 1)}
                            disabled={product.stock === 0}
                          >
                            <ShoppingCart className="w-4 h-4 ml-2" />
                            {product.stock > 0 ? 'أضف للسلة' : 'نفد المخزون'}
                          </Button>
                          <Button variant="outline" size="icon">
                            <Heart className="w-4 h-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            ) : (
              <Card className="p-12 text-center">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold mb-2">لم نجد منتجات</h3>
                <p className="text-muted-foreground mb-6">
                  جرب تعديل الفلاتر أو البحث بكلمات مختلفة
                </p>
                <Button onClick={clearFilters}>
                  مسح جميع الفلاتر
                </Button>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}