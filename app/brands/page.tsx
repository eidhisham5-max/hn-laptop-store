'use client'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function BrandsPage() {
  const brands = [
    {
      name: 'Dell',
      slug: 'dell',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/4/48/Dell_Logo.svg',
      description: 'Leading manufacturer of premium laptops and workstations',
      productsCount: 24,
      categories: ['Business', 'Gaming', 'Ultrabook', 'Everyday'],
      featured: [
        { name: 'XPS 13', price: '$1,200', image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=300&fit=crop' },
        { name: 'Inspiron 15', price: '$650', image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=400&h=300&fit=crop' },
        { name: 'Alienware m15', price: '$1,800', image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=400&h=300&fit=crop' }
      ],
      color: 'from-blue-600 to-blue-800'
    },
    {
      name: 'HP',
      slug: 'hp',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/3/3a/HP_logo_2012.svg',
      description: 'Innovative technology solutions for business and personal use',
      productsCount: 18,
      categories: ['Business', 'Gaming', 'Everyday'],
      featured: [
        { name: 'EliteBook 840', price: '$1,100', image: 'https://images.unsplash.com/photo-1515378791036-0648a814c963?w=400&h=300&fit=crop' },
        { name: 'Pavilion 15', price: '$800', image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=300&fit=crop' },
        { name: 'Omen 16', price: '$1,400', image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=400&h=300&fit=crop' }
      ],
      color: 'from-blue-500 to-cyan-600'
    },
    {
      name: 'Lenovo',
      slug: 'lenovo',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/0/0c/Lenovo_logo_2015.svg',
      description: 'Think different with powerful business and consumer laptops',
      productsCount: 21,
      categories: ['Business', 'Ultrabook', 'Gaming', 'Everyday'],
      featured: [
        { name: 'ThinkPad X1', price: '$1,500', image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400&h=300&fit=crop' },
        { name: 'IdeaPad 3', price: '$550', image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=400&h=300&fit=crop' },
        { name: 'Legion 5', price: '$1,200', image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=400&h=300&fit=crop' }
      ],
      color: 'from-red-600 to-red-800'
    },
    {
      name: 'ASUS',
      slug: 'asus',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/0/0c/ASUS_Logo.svg',
      description: 'In search of incredible gaming and professional laptops',
      productsCount: 15,
      categories: ['Gaming', 'Business', 'Ultrabook'],
      featured: [
        { name: 'ROG Strix G15', price: '$1,300', image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=400&h=300&fit=crop' },
        { name: 'ZenBook 14', price: '$900', image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=300&fit=crop' },
        { name: 'VivoBook 15', price: '$600', image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=400&h=300&fit=crop' }
      ],
      color: 'from-gray-700 to-gray-900'
    },
    {
      name: 'Acer',
      slug: 'acer',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/5/58/Acer_2011.svg',
      description: 'Explore beyond limits with innovative laptop technology',
      productsCount: 12,
      categories: ['Gaming', 'Business', 'Everyday'],
      featured: [
        { name: 'Predator Helios', price: '$1,100', image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=400&h=300&fit=crop' },
        { name: 'Aspire 5', price: '$500', image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=400&h=300&fit=crop' },
        { name: 'Swift 3', price: '$700', image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=300&fit=crop' }
      ],
      color: 'from-green-600 to-green-800'
    }
  ]

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

      {/* Page Header */}
      <section className="pt-28 pb-16 bg-gradient-to-br from-[#007AFF]/5 to-purple-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-[#1D1D1F]">
              Trusted Brands
            </h1>
            <p className="text-lg text-[#86868B] mb-8">
              We partner with the world's leading laptop manufacturers to bring you the best quality and value
            </p>
            <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-[#86868B]">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-[#007AFF] rounded-full"></span>
                <span className="font-semibold text-[#1D1D1F]">90+</span> Products Available
              </div>
              <div className="hidden md:block w-px h-4 bg-gray-300"></div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-[#007AFF] rounded-full"></span>
                <span className="font-semibold text-[#1D1D1F]">5</span> Premium Brands
              </div>
              <div className="hidden md:block w-px h-4 bg-gray-300"></div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-[#007AFF] rounded-full"></span>
                <span className="font-semibold text-[#1D1D1F]">2-Year</span> Warranty
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Brands Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {brands.map((brand) => (
              <div key={brand.slug} className="group bg-white rounded-3xl border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-500">
                {/* Brand Header */}
                <div className={`relative p-8 bg-gradient-to-br ${brand.color} text-white overflow-hidden`}>
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full -ml-12 -mb-12"></div>
                  
                  <div className="relative flex items-start justify-between mb-6">
                    <div>
                      <h2 className="text-3xl font-bold mb-2">{brand.name}</h2>
                      <p className="text-white/90 text-base leading-relaxed max-w-sm">
                        {brand.description}
                      </p>
                    </div>
                    <div className="bg-white/20 backdrop-blur-sm p-4 rounded-2xl">
                      <div className="w-16 h-12 relative">
                        <Image 
                          src={brand.logo} 
                          alt={`${brand.name} logo`} 
                          fill 
                          className="object-contain filter brightness-0 invert"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="relative flex items-center gap-6 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-white/60 rounded-full"></span>
                      <span className="font-semibold">{brand.productsCount}</span> Products
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-white/60 rounded-full"></span>
                      <span className="font-semibold">{brand.categories.length}</span> Categories
                    </div>
                  </div>
                </div>

                {/* Categories */}
                <div className="px-8 py-6 border-b border-gray-100">
                  <h3 className="text-sm font-semibold text-[#86868B] mb-3 uppercase tracking-wide">Categories</h3>
                  <div className="flex flex-wrap gap-2">
                    {brand.categories.map((category) => (
                      <Link
                        key={category}
                        href={`/products?brand=${brand.slug.toLowerCase()}&category=${category.toLowerCase()}`}
                        className="bg-gray-100 hover:bg-[#007AFF] hover:text-white text-gray-700 px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-300"
                      >
                        {category}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Featured Products */}
                <div className="p-8">
                  <h3 className="text-sm font-semibold text-[#86868B] mb-4 uppercase tracking-wide">Featured Products</h3>
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    {brand.featured.map((product, index) => (
                      <div key={index} className="group/product">
                        <div className="relative overflow-hidden rounded-xl mb-2">
                          <Image
                            src={product.image}
                            alt={product.name}
                            width={120}
                            height={90}
                            className="w-full h-20 object-cover group-hover/product:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <h4 className="text-xs font-medium text-[#1D1D1F] mb-1 truncate">{product.name}</h4>
                        <p className="text-xs text-[#007AFF] font-semibold">{product.price}</p>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-3">
                    <Link 
                      href={`/brands/${brand.slug}`}
                      className="flex-1 btn-accent py-3 px-4 rounded-xl text-sm font-semibold text-center"
                    >
                      View All {brand.name} Products
                    </Link>
                    <Link
                      href={`/products?brand=${brand.slug.toLowerCase()}`}
                      className="bg-gray-100 hover:bg-gray-200 text-gray-700 p-3 rounded-xl transition-colors"
                    >
                      <span className="text-lg">🔍</span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-[#F5F7FA]">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-4 text-[#1D1D1F]">
              Can't Find What You're Looking For?
            </h2>
            <p className="text-lg text-[#86868B] mb-8">
              Our experts can help you find the perfect laptop for your specific needs and budget
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/products" className="btn-accent px-8 py-3 rounded-xl font-semibold text-base">
                Browse All Products
              </Link>
              <button className="btn-outline-accent px-8 py-3 rounded-xl font-semibold text-base flex items-center justify-center gap-2">
                <span>Get Expert Help</span>
                <span>💬</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}