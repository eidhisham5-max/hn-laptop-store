'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function DellBrandPage() {
  const [activeCategory, setActiveCategory] = useState('all')

  const dellProducts = [
    {
      id: 1,
      name: "Dell XPS 13 Plus",
      price: "1,200",
      originalPrice: "1,400",
      image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&h=600&fit=crop&auto=format",
      category: "ultrabook",
      ram: "16GB",
      storage: "512GB SSD",
      processor: "Intel i7-1260P",
      gpu: "Intel Iris Xe",
      condition: "New",
      rating: 4.8,
      reviews: 124,
      discount: 14,
      features: ["13.4-inch 4K OLED", "Thunderbolt 4", "Wi-Fi 6E", "Windows 11"]
    },
    {
      id: 2,
      name: "Dell Inspiron 15 3000",
      price: "450",
      originalPrice: "550",
      image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800&h=600&fit=crop&auto=format",
      category: "everyday",
      ram: "8GB",
      storage: "256GB SSD",
      processor: "Intel i5-1135G7",
      gpu: "Intel Iris Xe",
      condition: "Refurbished",
      rating: 4.3,
      reviews: 67,
      discount: 18,
      features: ["15.6-inch FHD", "USB-C", "Wi-Fi 6", "Windows 11"]
    },
    {
      id: 3,
      name: "Dell Alienware m15 R7",
      price: "1,800",
      originalPrice: "2,100",
      image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=800&h=600&fit=crop&auto=format",
      category: "gaming",
      ram: "32GB",
      storage: "1TB SSD",
      processor: "Intel i7-12700H",
      gpu: "NVIDIA RTX 3070 Ti",
      condition: "New",
      rating: 4.9,
      reviews: 89,
      discount: 14,
      features: ["15.6-inch QHD 240Hz", "RGB Keyboard", "Liquid Cooling", "Killer Wi-Fi 6E"]
    },
    {
      id: 4,
      name: "Dell Latitude 7420",
      price: "1,100",
      originalPrice: "1,300",
      image: "https://images.unsplash.com/photo-1515378791036-0648a814c963?w=800&h=600&fit=crop&auto=format",
      category: "business",
      ram: "16GB",
      storage: "512GB SSD",
      processor: "Intel i7-1185G7",
      gpu: "Intel Iris Xe",
      condition: "Refurbished",
      rating: 4.6,
      reviews: 156,
      discount: 15,
      features: ["14-inch FHD", "vPro Technology", "Thunderbolt 4", "Military Grade"]
    },
    {
      id: 5,
      name: "Dell Precision 5570",
      price: "2,200",
      originalPrice: "2,500",
      image: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800&h=600&fit=crop&auto=format",
      category: "business",
      ram: "32GB",
      storage: "1TB SSD",
      processor: "Intel i7-12700H",
      gpu: "NVIDIA RTX A2000",
      condition: "New",
      rating: 4.8,
      reviews: 45,
      discount: 12,
      features: ["15.6-inch 4K", "ISV Certified", "Thunderbolt 4", "Professional GPU"]
    },
    {
      id: 6,
      name: "Dell G15 5520",
      price: "950",
      originalPrice: "1,150",
      image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=800&h=600&fit=crop&auto=format",
      category: "gaming",
      ram: "16GB",
      storage: "512GB SSD",
      processor: "Intel i5-12500H",
      gpu: "NVIDIA RTX 3050 Ti",
      condition: "New",
      rating: 4.4,
      reviews: 78,
      discount: 17,
      features: ["15.6-inch FHD 120Hz", "RGB Keyboard", "Game Shift", "Dual Fan Cooling"]
    }
  ]

  const categories = [
    { id: 'all', name: 'All Products', count: dellProducts.length },
    { id: 'ultrabook', name: 'Ultrabooks', count: dellProducts.filter(p => p.category === 'ultrabook').length },
    { id: 'business', name: 'Business', count: dellProducts.filter(p => p.category === 'business').length },
    { id: 'gaming', name: 'Gaming', count: dellProducts.filter(p => p.category === 'gaming').length },
    { id: 'everyday', name: 'Everyday', count: dellProducts.filter(p => p.category === 'everyday').length }
  ]

  const filteredProducts = activeCategory === 'all' 
    ? dellProducts 
    : dellProducts.filter(product => product.category === activeCategory)

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
              <Link href="/products" className="relative text-[#1D1D1F] hover:text-[#007AFF] font-medium transition-colors group">
                Products
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#007AFF] group-hover:w-full transition-all duration-300"></span>
              </Link>
              <Link href="/brands" className="relative text-[#007AFF] font-medium transition-colors group">
                Brands
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-[#007AFF]"></span>
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

      {/* Breadcrumb */}
      <section className="pt-28 pb-6">
        <div className="container mx-auto px-4">
          <nav className="flex items-center gap-2 text-sm text-[#86868B]">
            <Link href="/" className="hover:text-[#007AFF] transition-colors">Home</Link>
            <span>/</span>
            <Link href="/brands" className="hover:text-[#007AFF] transition-colors">Brands</Link>
            <span>/</span>
            <span className="text-[#1D1D1F] font-medium">Dell</span>
          </nav>
        </div>
      </section>

      {/* Brand Header */}
      <section className="pb-12 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start gap-4 mb-6">
                <div className="bg-white p-4 rounded-2xl">
                  <div className="w-16 h-12 relative">
                    <Image 
                      src="https://upload.wikimedia.org/wikipedia/commons/4/48/Dell_Logo.svg" 
                      alt="Dell logo" 
                      fill 
                      className="object-contain"
                    />
                  </div>
                </div>
                <div>
                  <h1 className="text-4xl md:text-5xl font-bold mb-2">Dell Laptops</h1>
                  <p className="text-blue-100">Premium Technology Solutions</p>
                </div>
              </div>

              <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto lg:mx-0">
                Dell has been at the forefront of innovation for decades, delivering cutting-edge laptops 
                that combine performance, reliability, and style for professionals and consumers alike.
              </p>

              <div className="flex flex-wrap justify-center lg:justify-start items-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-300 rounded-full"></span>
                  <span className="font-semibold">{dellProducts.length}</span> Products Available
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-300 rounded-full"></span>
                  <span className="font-semibold">2-Year</span> Warranty
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-300 rounded-full"></span>
                  <span className="font-semibold">Free</span> Delivery
                </div>
              </div>
            </div>

            <div className="lg:w-1/3">
              <div className="relative">
                <div className="absolute inset-0 bg-white/10 rounded-3xl blur-xl"></div>
                <Image
                  src="https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&h=400&fit=crop&auto=format"
                  alt="Dell laptop showcase"
                  width={600}
                  height={400}
                  className="relative rounded-3xl shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Tabs */}
      <section className="py-8 bg-[#F5F7FA]">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                  activeCategory === category.id
                    ? 'bg-[#007AFF] text-white shadow-lg'
                    : 'bg-white text-[#1D1D1F] hover:bg-gray-50 border border-gray-200'
                }`}
              >
                {category.name} ({category.count})
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <div key={product.id} className="group bg-white rounded-2xl shadow-subtle border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300">
                <Link href={`/products/${product.id}`} className="block">
                  <div className="relative overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={400}
                      height={300}
                      className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
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

                  {/* Key Features */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1">
                      {product.features.slice(0, 2).map((feature, index) => (
                        <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                          {feature}
                        </span>
                      ))}
                      {product.features.length > 2 && (
                        <span className="text-xs text-[#86868B]">+{product.features.length - 2} more</span>
                      )}
                    </div>
                  </div>

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
        </div>
      </section>

      {/* Dell Advantages */}
      <section className="py-16 bg-[#F5F7FA]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-[#1D1D1F]">Why Choose Dell?</h2>
            <p className="text-lg text-[#86868B] max-w-2xl mx-auto">
              Dell's commitment to innovation and quality makes them a trusted choice for millions worldwide
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: '🔧',
                title: 'Built to Last',
                description: 'Military-grade testing ensures durability and reliability in any environment'
              },
              {
                icon: '⚡',
                title: 'Cutting-Edge Performance',
                description: 'Latest processors and components deliver exceptional speed and efficiency'
              },
              {
                icon: '🛡️',
                title: 'Enterprise Security',
                description: 'Advanced security features protect your data and privacy'
              },
              {
                icon: '🎨',
                title: 'Premium Design',
                description: 'Sleek, professional aesthetics that make a statement'
              },
              {
                icon: '📞',
                title: '24/7 Support',
                description: 'Global support network ensures help is always available'
              },
              {
                icon: '🌱',
                title: 'Eco-Friendly',
                description: 'Sustainable manufacturing and packaging reduce environmental impact'
              }
            ].map((advantage, index) => (
              <div key={index} className="text-center p-6 bg-white rounded-2xl border border-gray-100">
                <div className="text-4xl mb-4">{advantage.icon}</div>
                <h3 className="text-xl font-semibold mb-3 text-[#1D1D1F]">{advantage.title}</h3>
                <p className="text-[#86868B] leading-relaxed">{advantage.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">
              Need Help Choosing the Right Dell Laptop?
            </h2>
            <p className="text-lg text-blue-100 mb-8">
              Our Dell experts can help you find the perfect laptop for your specific needs and budget
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/products?brand=dell" className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-3 rounded-xl font-semibold text-base transition-colors">
                Browse All Dell Products
              </Link>
              <button className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3 rounded-xl font-semibold text-base flex items-center justify-center gap-2 transition-colors">
                <span>Get Expert Advice</span>
                <span>💬</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}