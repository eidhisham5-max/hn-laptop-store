'use client'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

export default function ProductsPage() {
  const searchParams = useSearchParams()
  const [filteredProducts, setFilteredProducts] = useState([])
  const [filters, setFilters] = useState({
    category: searchParams?.get('category') || 'all',
    brand: 'all',
    priceRange: 'all',
    ram: 'all',
    storage: 'all',
    processor: 'all'
  })

  const products = [
    {
      id: 1,
      name: "Dell XPS 13 Plus",
      price: "1,200",
      originalPrice: "1,400",
      image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&h=600&fit=crop&auto=format",
      brand: "Dell",
      category: "ultrabook",
      ram: "16GB",
      storage: "512GB SSD",
      processor: "Intel i7",
      gpu: "Intel Iris Xe",
      condition: "New",
      rating: 4.8,
      reviews: 124,
      discount: 14
    },
    {
      id: 2,
      name: "HP Pavilion Gaming 15",
      price: "900",
      originalPrice: "1,100",
      image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&h=600&fit=crop&auto=format",
      brand: "HP",
      category: "gaming",
      ram: "16GB",
      storage: "512GB SSD",
      processor: "AMD Ryzen 7",
      gpu: "NVIDIA GTX 1650",
      condition: "New",
      rating: 4.6,
      reviews: 89,
      discount: 18
    },
    {
      id: 3,
      name: "Lenovo ThinkPad X1 Carbon",
      price: "1,500",
      originalPrice: "1,800",
      image: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800&h=600&fit=crop&auto=format",
      brand: "Lenovo",
      category: "business",
      ram: "32GB",
      storage: "1TB SSD",
      processor: "Intel i7",
      gpu: "Intel Iris Xe",
      condition: "New",
      rating: 4.9,
      reviews: 203,
      discount: 17
    },
    {
      id: 4,
      name: "Dell Inspiron 15 3000",
      price: "450",
      originalPrice: "550",
      image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800&h=600&fit=crop&auto=format",
      brand: "Dell",
      category: "everyday",
      ram: "8GB",
      storage: "256GB SSD",
      processor: "Intel i5",
      gpu: "Intel UHD",
      condition: "Refurbished",
      rating: 4.3,
      reviews: 67,
      discount: 18
    },
    {
      id: 5,
      name: "ASUS ROG Strix G15",
      price: "1,300",
      originalPrice: "1,500",
      image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=800&h=600&fit=crop&auto=format",
      brand: "ASUS",
      category: "gaming",
      ram: "16GB",
      storage: "1TB SSD",
      processor: "AMD Ryzen 7",
      gpu: "NVIDIA RTX 3060",
      condition: "New",
      rating: 4.7,
      reviews: 156,
      discount: 13
    },
    {
      id: 6,
      name: "HP EliteBook 840 G8",
      price: "1,100",
      originalPrice: "1,300",
      image: "https://images.unsplash.com/photo-1515378791036-0648a814c963?w=800&h=600&fit=crop&auto=format",
      brand: "HP",
      category: "business",
      ram: "16GB",
      storage: "512GB SSD",
      processor: "Intel i7",
      gpu: "Intel Iris Xe",
      condition: "Refurbished",
      rating: 4.5,
      reviews: 92,
      discount: 15
    }
  ]

  useEffect(() => {
    let filtered = products

    if (filters.category !== 'all') {
      filtered = filtered.filter(product => product.category === filters.category)
    }
    if (filters.brand !== 'all') {
      filtered = filtered.filter(product => product.brand.toLowerCase() === filters.brand)
    }
    if (filters.ram !== 'all') {
      filtered = filtered.filter(product => product.ram === filters.ram)
    }
    if (filters.storage !== 'all') {
      filtered = filtered.filter(product => product.storage.includes(filters.storage))
    }
    if (filters.processor !== 'all') {
      filtered = filtered.filter(product => product.processor.includes(filters.processor))
    }
    if (filters.priceRange !== 'all') {
      const price = parseInt(product.price.replace(',', ''))
      switch (filters.priceRange) {
        case 'under-500':
          filtered = filtered.filter(product => parseInt(product.price.replace(',', '')) < 500)
          break
        case '500-1000':
          filtered = filtered.filter(product => {
            const price = parseInt(product.price.replace(',', ''))
            return price >= 500 && price <= 1000
          })
          break
        case '1000-1500':
          filtered = filtered.filter(product => {
            const price = parseInt(product.price.replace(',', ''))
            return price >= 1000 && price <= 1500
          })
          break
        case 'over-1500':
          filtered = filtered.filter(product => parseInt(product.price.replace(',', '')) > 1500)
          break
      }
    }

    setFilteredProducts(filtered)
  }, [filters])

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }))
  }

  const clearFilters = () => {
    setFilters({
      category: 'all',
      brand: 'all',
      priceRange: 'all',
      ram: 'all',
      storage: 'all',
      processor: 'all'
    })
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group cursor-pointer">
              <div className="relative">
                <div className="w-12 h-12 bg-[#007AFF] rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-subtle group-hover:scale-105 transition-transform">
                  HN
                </div>
              </div>
              <div>
                <h1 className="text-xl font-bold text-[#1D1D1F] group-hover:text-[#007AFF] transition-colors">
                  H.N Laptop Store
                </h1>
                <p className="text-sm text-[#86868B]">Premium Laptops</p>
              </div>
            </Link>

            {/* Navigation */}
            <nav className="hidden md:flex gap-8">
              <Link href="/" className="relative text-[#1D1D1F] hover:text-[#007AFF] font-medium transition-colors group">
                Home
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#007AFF] group-hover:w-full transition-all duration-300"></span>
              </Link>
              <Link href="/products" className="relative text-[#007AFF] font-medium transition-colors group">
                Products
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-[#007AFF]"></span>
              </Link>
              <Link href="/brands" className="relative text-[#1D1D1F] hover:text-[#007AFF] font-medium transition-colors group">
                Brands
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#007AFF] group-hover:w-full transition-all duration-300"></span>
              </Link>
              <Link href="/#contact" className="relative text-[#1D1D1F] hover:text-[#007AFF] font-medium transition-colors group">
                Contact
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#007AFF] group-hover:w-full transition-all duration-300"></span>
              </Link>
            </nav>

            {/* CTA Buttons */}
            <div className="flex gap-3 items-center">
              <Link href="/login" className="bg-gray-100 text-gray-700 px-6 py-2.5 rounded-xl text-sm font-medium hover:bg-gray-200 transition-all duration-300 hover:shadow-md">
                Login
              </Link>
              <button className="btn-outline-accent px-6 py-2.5 rounded-xl text-sm font-medium flex items-center gap-2">
                <span>WhatsApp</span>
                <span>📱</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Page Header */}
      <section className="pt-28 pb-12 bg-[#F5F7FA]">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[#1D1D1F]">
              Our Products
            </h1>
            <p className="text-lg text-[#86868B] max-w-2xl mx-auto">
              Discover our complete collection of premium laptops from top brands
            </p>
          </div>
        </div>
      </section>

      {/* Filters & Products */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters Sidebar */}
            <div className="lg:w-1/4">
              <div className="bg-white rounded-2xl border border-gray-200 p-6 sticky top-32">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-[#1D1D1F]">Filters</h3>
                  <button 
                    onClick={clearFilters}
                    className="text-sm text-[#007AFF] hover:underline"
                  >
                    Clear All
                  </button>
                </div>

                {/* Category Filter */}
                <div className="mb-6">
                  <h4 className="font-semibold mb-3 text-[#1D1D1F]">Category</h4>
                  <div className="space-y-2">
                    {[
                      { value: 'all', label: 'All Categories' },
                      { value: 'gaming', label: 'Gaming' },
                      { value: 'business', label: 'Business' },
                      { value: 'ultrabook', label: 'Ultrabook' },
                      { value: 'everyday', label: 'Everyday' }
                    ].map((option) => (
                      <label key={option.value} className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="radio"
                          name="category"
                          value={option.value}
                          checked={filters.category === option.value}
                          onChange={(e) => handleFilterChange('category', e.target.value)}
                          className="w-4 h-4 text-[#007AFF] border-gray-300 focus:ring-[#007AFF]"
                        />
                        <span className="text-sm text-[#1D1D1F]">{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Brand Filter */}
                <div className="mb-6">
                  <h4 className="font-semibold mb-3 text-[#1D1D1F]">Brand</h4>
                  <div className="space-y-2">
                    {[
                      { value: 'all', label: 'All Brands' },
                      { value: 'dell', label: 'Dell' },
                      { value: 'hp', label: 'HP' },
                      { value: 'lenovo', label: 'Lenovo' },
                      { value: 'asus', label: 'ASUS' }
                    ].map((option) => (
                      <label key={option.value} className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="radio"
                          name="brand"
                          value={option.value}
                          checked={filters.brand === option.value}
                          onChange={(e) => handleFilterChange('brand', e.target.value)}
                          className="w-4 h-4 text-[#007AFF] border-gray-300 focus:ring-[#007AFF]"
                        />
                        <span className="text-sm text-[#1D1D1F]">{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price Range Filter */}
                <div className="mb-6">
                  <h4 className="font-semibold mb-3 text-[#1D1D1F]">Price Range</h4>
                  <div className="space-y-2">
                    {[
                      { value: 'all', label: 'All Prices' },
                      { value: 'under-500', label: 'Under $500' },
                      { value: '500-1000', label: '$500 - $1,000' },
                      { value: '1000-1500', label: '$1,000 - $1,500' },
                      { value: 'over-1500', label: 'Over $1,500' }
                    ].map((option) => (
                      <label key={option.value} className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="radio"
                          name="priceRange"
                          value={option.value}
                          checked={filters.priceRange === option.value}
                          onChange={(e) => handleFilterChange('priceRange', e.target.value)}
                          className="w-4 h-4 text-[#007AFF] border-gray-300 focus:ring-[#007AFF]"
                        />
                        <span className="text-sm text-[#1D1D1F]">{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* RAM Filter */}
                <div className="mb-6">
                  <h4 className="font-semibold mb-3 text-[#1D1D1F]">RAM</h4>
                  <div className="space-y-2">
                    {[
                      { value: 'all', label: 'All RAM' },
                      { value: '8GB', label: '8GB' },
                      { value: '16GB', label: '16GB' },
                      { value: '32GB', label: '32GB' }
                    ].map((option) => (
                      <label key={option.value} className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="radio"
                          name="ram"
                          value={option.value}
                          checked={filters.ram === option.value}
                          onChange={(e) => handleFilterChange('ram', e.target.value)}
                          className="w-4 h-4 text-[#007AFF] border-gray-300 focus:ring-[#007AFF]"
                        />
                        <span className="text-sm text-[#1D1D1F]">{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Storage Filter */}
                <div className="mb-6">
                  <h4 className="font-semibold mb-3 text-[#1D1D1F]">Storage</h4>
                  <div className="space-y-2">
                    {[
                      { value: 'all', label: 'All Storage' },
                      { value: '256GB', label: '256GB SSD' },
                      { value: '512GB', label: '512GB SSD' },
                      { value: '1TB', label: '1TB SSD' }
                    ].map((option) => (
                      <label key={option.value} className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="radio"
                          name="storage"
                          value={option.value}
                          checked={filters.storage === option.value}
                          onChange={(e) => handleFilterChange('storage', e.target.value)}
                          className="w-4 h-4 text-[#007AFF] border-gray-300 focus:ring-[#007AFF]"
                        />
                        <span className="text-sm text-[#1D1D1F]">{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <div className="lg:w-3/4">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-[#1D1D1F]">
                  {filteredProducts.length} Products Found
                </h2>
                <select className="border border-gray-300 rounded-lg px-4 py-2 text-sm">
                  <option>Sort by: Featured</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Rating: High to Low</option>
                  <option>Newest First</option>
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <div key={product.id} className="group bg-white rounded-2xl shadow-subtle border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300">
                    <Link href={`/products/${product.id}`} className="block">
                      <div className="relative overflow-hidden">
                        <Image
                          src={product.image}
                          alt={product.name}
                          width={400}
                          height={300}
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        {product.discount > 0 && (
                          <div className="absolute top-4 left-4 bg-red-500 text-white px-2 py-1 rounded-lg text-xs font-semibold">
                            -{product.discount}%
                          </div>
                        )}
                        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg text-xs font-medium text-[#1D1D1F]">
                          {product.condition}
                        </div>
                      </div>
                    </Link>

                    <div className="p-6">
                      <Link href={`/products/${product.id}`} className="block">
                        <h3 className="font-semibold text-lg mb-2 text-[#1D1D1F] group-hover:text-[#007AFF] transition-colors">
                          {product.name}
                        </h3>
                        <div className="text-sm text-[#86868B] mb-3 space-y-1">
                          <div>{product.processor} • {product.ram} • {product.storage}</div>
                          <div>{product.gpu}</div>
                        </div>
                      </Link>

                      <div className="flex items-center gap-2 mb-3">
                        <div className="flex text-yellow-400">
                          {[...Array(5)].map((_, i) => (
                            <span key={i} className={`text-sm ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`}>
                              ★
                            </span>
                          ))}
                        </div>
                        <span className="text-sm text-[#86868B]">({product.reviews})</span>
                      </div>

                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-2xl font-bold text-[#007AFF]">${product.price}</span>
                        {product.originalPrice && (
                          <span className="text-sm text-gray-400 line-through">${product.originalPrice}</span>
                        )}
                      </div>

                      <div className="flex gap-3">
                        <button className="flex-1 btn-accent py-2.5 px-4 rounded-xl text-sm font-semibold">
                          Add to Cart
                        </button>
                        <button className="bg-gray-100 text-gray-700 p-2.5 rounded-xl hover:bg-gray-200 transition-colors">
                          <span className="text-lg">🛒</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {filteredProducts.length === 0 && (
                <div className="text-center py-16">
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="text-2xl font-bold text-[#1D1D1F] mb-2">No Products Found</h3>
                  <p className="text-[#86868B] mb-6">Try adjusting your filters to see more results</p>
                  <button 
                    onClick={clearFilters}
                    className="btn-accent px-6 py-3 rounded-xl font-semibold"
                  >
                    Clear All Filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}