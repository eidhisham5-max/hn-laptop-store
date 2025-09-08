'use client'
import React, { useMemo, useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useSearchParams, useRouter } from 'next/navigation'
import { allProducts, brands as supportedBrands, categories as supportedCategories, type Product, brandNameToSlug } from '../data/products'

export default function ProductsIndexPage() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const initialCategory = searchParams.get('category') || ''
  const initialBrand = searchParams.get('brand') || ''
  const initialQuery = searchParams.get('q') || ''

  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory)
  const [selectedBrand, setSelectedBrand] = useState<string>(initialBrand)
  const [query, setQuery] = useState<string>(initialQuery)

  useEffect(() => {
    const params = new URLSearchParams()
    if (selectedCategory) params.set('category', selectedCategory)
    if (selectedBrand) params.set('brand', selectedBrand)
    if (query) params.set('q', query)
    const path = params.toString() ? `/products?${params.toString()}` : '/products'
    router.replace(path)
  }, [selectedCategory, selectedBrand, query, router])

  const filteredProducts: Product[] = useMemo(() => {
    return allProducts.filter((product) => {
      if (selectedCategory && product.category !== selectedCategory) return false
      if (selectedBrand && product.brand !== selectedBrand) return false
      if (query) {
        const hay = `${product.name} ${product.specs} ${product.brand} ${product.category}`.toLowerCase()
        if (!hay.includes(query.toLowerCase())) return false
      }
      return true
    })
  }, [selectedCategory, selectedBrand, query])

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 pt-8 pb-12">
        <header className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#1D1D1F]">All Products</h1>
            <p className="text-[#86868B] mt-1">Discover our full collection</p>
          </div>
          <div className="text-sm text-[#86868B]">{filteredProducts.length} items</div>
        </header>

        {/* Filters */}
        <div className="bg-white border border-gray-200 rounded-2xl p-4 md:p-5 shadow-subtle mb-8">
          <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
            {/* Category chips */}
            <div className="flex items-center gap-2 flex-wrap">
              {['', ...supportedCategories].map((category) => (
                <button
                  key={category || 'all'}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3 py-1.5 rounded-full text-sm border transition-colors ${
                    selectedCategory === category
                      ? 'bg-[#007AFF] text-white border-[#007AFF]'
                      : 'text-[#1D1D1F] border-gray-300 hover:bg-gray-100'
                  }`}
                >
                  {category || 'All Categories'}
                </button>
              ))}
            </div>

            {/* Brand select */}
            <div className="flex items-center gap-2">
              <label className="text-sm text-[#86868B]">Brand</label>
              <select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="px-3 py-2 rounded-xl border border-gray-300 text-sm bg-white"
              >
                <option value="">All</option>
                {supportedBrands.map((brand) => (
                  <option key={brand} value={brand}>{brand}</option>
                ))}
              </select>
            </div>

            {/* Search */}
            <div className="flex-1">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by name, specs..."
                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm bg-white"
              />
            </div>
          </div>
        </div>

        {/* Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center text-[#86868B] py-16">No products found. Try changing the filters.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div key={product.id} className="group bg-white rounded-2xl shadow-subtle border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300">
                <Link href={`/products/${product.id}`} className="block">
                  <div className="relative">
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={800}
                      height={600}
                      className="w-full h-48 object-cover"
                    />
                  </div>
                </Link>
                <div className="p-4">
                  <Link href={`/products/${product.id}`} className="block">
                    <h3 className="font-semibold text-lg text-[#1D1D1F] group-hover:text-[#007AFF]">{product.name}</h3>
                    <p className="text-sm text-[#86868B] mt-1">{product.brand} • {product.category}</p>
                  </Link>
                  <div className="flex items-center gap-3 mt-3">
                    <span className="text-[#007AFF] font-bold text-xl">${product.price}</span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-400 line-through">${product.originalPrice}</span>
                    )}
                  </div>
                  <div className="mt-4 flex items-center gap-2">
                    <div className="text-yellow-400">
                      {'★★★★★'.slice(0, Math.round(product.rating))}
                    </div>
                    <span className="text-xs text-[#86868B]">({product.reviews})</span>
                  </div>
                  <div className="mt-4 flex gap-2">
                    <Link href={`/brands/${brandNameToSlug(product.brand)}`} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                      {product.brand}
                    </Link>
                    <Link href={`/products?category=${encodeURIComponent(product.category)}`} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                      {product.category}
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

