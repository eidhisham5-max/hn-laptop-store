'use client'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface Product {
  id: number
  name: string
  brand: string
  price: number
  originalPrice: number
  image: string
  specs: string
  condition: string
  rating: number
  reviews: number
  stock: number
  discount: number
}

export default function BrandPage({ params }: { params: { brand: string } }) {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [sortBy, setSortBy] = useState('name')
  const [filterCondition, setFilterCondition] = useState('all')

  const brandName = decodeURIComponent(params.brand).toLowerCase()

  // بيانات المنتجات التجريبية
  const allProducts: Product[] = [
    {
      id: 1,
      name: "Dell XPS 13",
      brand: "dell",
      price: 1200,
      originalPrice: 1400,
      image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&h=600&fit=crop&auto=format",
      specs: "Intel i7-12th Gen, 16GB RAM, 512GB SSD",
      condition: "New",
      rating: 4.8,
      reviews: 124,
      stock: 15,
      discount: 14
    },
    {
      id: 4,
      name: "Dell Inspiron 15",
      brand: "dell",
      price: 650,
      originalPrice: 750,
      image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800&h=600&fit=crop&auto=format",
      specs: "Intel i5, 8GB RAM, 256GB SSD",
      condition: "Refurbished",
      rating: 4.5,
      reviews: 67,
      stock: 5,
      discount: 13
    },
    {
      id: 5,
      name: "Dell Latitude 7420",
      brand: "dell",
      price: 1100,
      originalPrice: 1300,
      image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&h=600&fit=crop&auto=format",
      specs: "Intel i7, 16GB RAM, 512GB SSD",
      condition: "New",
      rating: 4.7,
      reviews: 89,
      stock: 8,
      discount: 15
    },
    {
      id: 2,
      name: "HP Pavilion 15",
      brand: "hp",
      price: 800,
      originalPrice: 950,
      image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&h=600&fit=crop&auto=format",
      specs: "AMD Ryzen 5, 8GB RAM, 256GB SSD",
      condition: "Refurbished",
      rating: 4.6,
      reviews: 89,
      stock: 8,
      discount: 16
    },
    {
      id: 6,
      name: "HP EliteBook 840",
      brand: "hp",
      price: 1100,
      originalPrice: 1300,
      image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&h=600&fit=crop&auto=format",
      specs: "Intel i7, 16GB RAM, 512GB SSD",
      condition: "New",
      rating: 4.8,
      reviews: 156,
      stock: 12,
      discount: 15
    },
    {
      id: 7,
      name: "HP Spectre x360",
      brand: "hp",
      price: 1350,
      originalPrice: 1600,
      image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&h=600&fit=crop&auto=format",
      specs: "Intel i7, 16GB RAM, 1TB SSD, Touchscreen",
      condition: "New",
      rating: 4.9,
      reviews: 203,
      stock: 6,
      discount: 16
    },
    {
      id: 3,
      name: "Lenovo ThinkPad X1",
      brand: "lenovo",
      price: 1500,
      originalPrice: 1800,
      image: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800&h=600&fit=crop&auto=format",
      specs: "Intel i7, 32GB RAM, 1TB SSD",
      condition: "New",
      rating: 4.9,
      reviews: 203,
      stock: 12,
      discount: 17
    },
    {
      id: 8,
      name: "Lenovo IdeaPad 5",
      brand: "lenovo",
      price: 750,
      originalPrice: 900,
      image: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800&h=600&fit=crop&auto=format",
      specs: "AMD Ryzen 5, 8GB RAM, 512GB SSD",
      condition: "Refurbished",
      rating: 4.4,
      reviews: 78,
      stock: 10,
      discount: 17
    },
    {
      id: 9,
      name: "Lenovo Legion 5",
      brand: "lenovo",
      price: 1250,
      originalPrice: 1450,
      image: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800&h=600&fit=crop&auto=format",
      specs: "AMD Ryzen 7, 16GB RAM, 512GB SSD, RTX 3060",
      condition: "New",
      rating: 4.7,
      reviews: 145,
      stock: 7,
      discount: 14
    }
  ]

  useEffect(() => {
    const brandProducts = allProducts.filter(product => product.brand === brandName)
    setProducts(brandProducts)
    setIsLoading(false)
  }, [brandName])

  // فلترة وترتيب المنتجات
  const filteredAndSortedProducts = products
    .filter(product => filterCondition === 'all' || product.condition.toLowerCase() === filterCondition)
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price
        case 'price-high':
          return b.price - a.price
        case 'rating':
          return b.rating - a.rating
        case 'discount':
          return b.discount - a.discount
        default:
          return a.name.localeCompare(b.name)
      }
    })

  const getBrandInfo = (brand: string) => {
    const brandData = {
      dell: {
        name: 'Dell',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/4/48/Dell_Logo.svg',
        description: 'Dell is a leading technology company that develops, sells, repairs and supports computers and related products and services.',
        founded: '1984',
        headquarters: 'Round Rock, Texas, USA'
      },
      hp: {
        name: 'HP',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/3/3a/HP_logo_2012.svg',
        description: 'HP Inc. is an American multinational information technology company that develops personal computers, printers and related supplies.',
        founded: '1939',
        headquarters: 'Palo Alto, California, USA'
      },
      lenovo: {
        name: 'Lenovo',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/0/0c/Lenovo_logo_2015.svg',
        description: 'Lenovo is a Chinese multinational technology company that designs, develops, manufactures and sells personal computers, tablet computers, smartphones, workstations, servers, electronic storage devices.',
        founded: '1984',
        headquarters: 'Beijing, China'
      }
    }
    return brandData[brand as keyof typeof brandData] || { name: brand, logo: '', description: '', founded: '', headquarters: '' }
  }

  const brandInfo = getBrandInfo(brandName)

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading {brandName} products...</p>
        </div>
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link href="/" className="flex items-center gap-3 group">
                <div className="w-12 h-12 bg-[#007AFF] rounded-xl flex items-center justify-center text-white font-bold text-lg">
                  HN
                </div>
                <div>
                  <h1 className="text-xl font-bold text-[#1D1D1F]">H.N Laptop Store</h1>
                  <p className="text-sm text-[#86868B]">Premium Laptops</p>
                </div>
              </Link>
              
              <nav className="flex gap-6 items-center">
                <Link href="/" className="text-gray-700 hover:text-[#007AFF] transition-colors">Home</Link>
                <Link href="/cart" className="bg-[#007AFF] text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  Cart
                </Link>
              </nav>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            No {brandInfo.name} Products Found
          </h1>
          <p className="text-gray-600 mb-8">
            We don't currently have any {brandInfo.name} products in stock.
          </p>
          <Link href="/" className="bg-[#007AFF] text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
            Browse All Products
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-12 h-12 bg-[#007AFF] rounded-xl flex items-center justify-center text-white font-bold text-lg">
                HN
              </div>
              <div>
                <h1 className="text-xl font-bold text-[#1D1D1F]">H.N Laptop Store</h1>
                <p className="text-sm text-[#86868B]">Premium Laptops</p>
              </div>
            </Link>
            
            <nav className="flex gap-6 items-center">
              <Link href="/" className="text-gray-700 hover:text-[#007AFF] transition-colors">Home</Link>
              <Link href="/cart" className="bg-[#007AFF] text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Cart
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-8">
          <Link href="/" className="hover:text-[#007AFF]">Home</Link>
          <span>/</span>
          <Link href="/#brands" className="hover:text-[#007AFF]">Brands</Link>
          <span>/</span>
          <span className="text-gray-900">{brandInfo.name}</span>
        </div>

        {/* Brand Header */}
        <div className="bg-white rounded-2xl shadow-sm p-8 mb-8">
          <div className="flex items-center gap-6 mb-6">
            {brandInfo.logo && (
              <div className="w-20 h-20 relative">
                <Image
                  src={brandInfo.logo}
                  alt={`${brandInfo.name} logo`}
                  fill
                  className="object-contain"
                />
              </div>
            )}
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">{brandInfo.name} Laptops</h1>
              <p className="text-lg text-gray-600">
                Discover our collection of {brandInfo.name} laptops - {products.length} products available
              </p>
            </div>
          </div>
          
          {brandInfo.description && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-gray-200">
              <div className="md:col-span-2">
                <p className="text-gray-700 leading-relaxed">{brandInfo.description}</p>
              </div>
              <div className="space-y-2 text-sm">
                {brandInfo.founded && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Founded:</span>
                    <span className="font-medium">{brandInfo.founded}</span>
                  </div>
                )}
                {brandInfo.headquarters && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Headquarters:</span>
                    <span className="font-medium">{brandInfo.headquarters}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-gray-600">Products:</span>
                  <span className="font-medium">{products.length} Available</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Filters and Sorting */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex gap-4 items-center">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Condition</label>
                <select
                  value={filterCondition}
                  onChange={(e) => setFilterCondition(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Conditions</option>
                  <option value="new">New</option>
                  <option value="refurbished">Refurbished</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Sort by</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="name">Name (A-Z)</option>
                  <option value="price-low">Price (Low to High)</option>
                  <option value="price-high">Price (High to Low)</option>
                  <option value="rating">Highest Rated</option>
                  <option value="discount">Best Discount</option>
                </select>
              </div>
            </div>
            
            <div className="text-sm text-gray-600">
              Showing {filteredAndSortedProducts.length} of {products.length} products
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredAndSortedProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300">
              <Link href={`/products/${product.id}`}>
                <div className="relative overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={400}
                    height={300}
                    className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                  />
                  {product.discount > 0 && (
                    <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                      -{product.discount}%
                    </div>
                  )}
                  <div className="absolute top-3 right-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      product.condition === 'New' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-orange-100 text-orange-800'
                    }`}>
                      {product.condition}
                    </span>
                  </div>
                </div>
              </Link>
              
              <div className="p-5">
                <Link href={`/products/${product.id}`}>
                  <h3 className="font-semibold text-lg mb-2 text-gray-900 hover:text-[#007AFF] transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.specs}</p>
                </Link>

                <div className="flex items-center gap-2 mb-3">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={`text-sm ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`}>
                        ★
                      </span>
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">({product.reviews})</span>
                </div>
                
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xl font-bold text-[#007AFF]">${product.price}</span>
                  {product.originalPrice > product.price && (
                    <span className="text-sm text-gray-400 line-through">${product.originalPrice}</span>
                  )}
                </div>

                <div className="flex items-center justify-between mb-4">
                  <span className={`text-sm font-medium ${
                    product.stock > 10 ? 'text-green-600' : 
                    product.stock > 5 ? 'text-orange-600' : 'text-red-600'
                  }`}>
                    {product.stock} in stock
                  </span>
                </div>

                <div className="flex gap-2">
                  <Link
                    href={`/products/${product.id}`}
                    className="flex-1 bg-[#007AFF] text-white py-2 px-4 rounded-lg text-center font-medium hover:bg-blue-700 transition-colors"
                  >
                    View Details
                  </Link>
                  <button className="bg-gray-100 text-gray-700 p-2 rounded-lg hover:bg-gray-200 transition-colors">
                    <span className="text-lg">🛒</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredAndSortedProducts.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">No products found</h2>
            <p className="text-gray-600 mb-8">Try adjusting your filters to see more products.</p>
            <button
              onClick={() => {
                setFilterCondition('all')
                setSortBy('name')
              }}
              className="bg-[#007AFF] text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  )
}