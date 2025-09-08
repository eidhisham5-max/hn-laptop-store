'use client'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const featuredProducts = [
    {
      id: 1,
      name: "Dell XPS 13",
      price: "1,200",
      originalPrice: "1,400",
      image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&h=600&fit=crop&auto=format",
      specs: "Intel i7, 16GB RAM, 512GB SSD",
      condition: "New",
      rating: 4.8,
      reviews: 124,
      discount: 14
    },
    {
      id: 2,
      name: "HP Pavilion 15",
      price: "800",
      originalPrice: "950",
      image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&h=600&fit=crop&auto=format",
      specs: "AMD Ryzen 5, 8GB RAM, 256GB SSD",
      condition: "Refurbished",
      rating: 4.6,
      reviews: 89,
      discount: 16
    },
    {
      id: 3,
      name: "Lenovo ThinkPad X1",
      price: "1,500",
      originalPrice: "1,800",
      image: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800&h=600&fit=crop&auto=format",
      specs: "Intel i7, 32GB RAM, 1TB SSD",
      condition: "New",
      rating: 4.9,
      reviews: 203,
      discount: 17
    },
    {
      id: 4,
      name: "Dell Inspiron 15",
      price: "650",
      originalPrice: "750",
      image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800&h=600&fit=crop&auto=format",
      specs: "Intel i5, 8GB RAM, 256GB SSD",
      condition: "Refurbished",
      rating: 4.5,
      reviews: 67,
      discount: 13
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white ${
        isScrolled ? 'shadow-sm' : 'border-b border-gray-200'
      }`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            {/* Logo */}
            <div className="flex items-center gap-3 group cursor-pointer">
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
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex gap-8">
              <a href="#" className="relative text-[#1D1D1F] hover:text-[#007AFF] font-medium transition-colors group">
                Home
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#007AFF] group-hover:w-full transition-all duration-300"></span>
              </a>
              <a href="#products" className="relative text-[#1D1D1F] hover:text-[#007AFF] font-medium transition-colors group">
                Products
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#007AFF] group-hover:w-full transition-all duration-300"></span>
              </a>
              <a href="#brands" className="relative text-[#1D1D1F] hover:text-[#007AFF] font-medium transition-colors group">
                Brands
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#007AFF] group-hover:w-full transition-all duration-300"></span>
              </a>
              <a href="#contact" className="relative text-[#1D1D1F] hover:text-[#007AFF] font-medium transition-colors group">
                Contact
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#007AFF] group-hover:w-full transition-all duration-300"></span>
              </a>
            </nav>

            {/* CTA Buttons */}
            <div className="flex gap-3 items-center">
              <a href="/login" className="bg-gray-100 text-gray-700 px-6 py-2.5 rounded-xl text-sm font-medium hover:bg-gray-200 transition-all duration-300 hover:shadow-md">
                Login
              </a>
              <button className="btn-outline-accent px-6 py-2.5 rounded-xl text-sm font-medium flex items-center gap-2">
                <span>WhatsApp</span>
                <span>📱</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-28 pb-20 overflow-hidden">
        {/* Background Photo */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1600&auto=format&fit=crop"
            alt="Modern workspace"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-white/65"></div>
        </div>

        <div className="relative container mx-auto px-4 text-center">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight text-[#1D1D1F]">
              Premium Laptops
              <span className="block text-3xl md:text-4xl text-[#86868B] mt-3 font-normal">
                At Unbeatable Prices
              </span>
            </h1>

            <p className="text-lg md:text-xl mb-10 text-[#1D1D1F] max-w-4xl mx-auto leading-relaxed">
              Discover our curated collection of new and refurbished laptops from top brands. Quality guaranteed with 2-year warranty and free delivery across Egypt.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
              <Link href="#products" className="btn-accent px-8 py-3 rounded-xl font-semibold text-base flex items-center gap-2">
                <span>Browse Products</span>
                <span>→</span>
              </Link>
              <button className="btn-outline-accent px-8 py-3 rounded-xl font-semibold text-base flex items-center gap-2">
                <span>Get Free Quote</span>
                <span>💬</span>
              </button>
            </div>

            <div className="flex flex-wrap justify-center items-center gap-6 text-[#86868B]">
              <div className="text-sm"><span className="font-semibold text-[#1D1D1F]">4.9/5</span> from 1,200+ reviews</div>
              <div className="hidden md:block w-px h-4 bg-gray-300"></div>
              <div className="text-sm"><span className="font-semibold text-[#1D1D1F]">Free Delivery</span> in 24-48 hours</div>
              <div className="hidden md:block w-px h-4 bg-gray-300"></div>
              <div className="text-sm"><span className="font-semibold text-[#1D1D1F]">2-Year Warranty</span> on all products</div>
            </div>
          </div>
        </div>
      </section>

      {/* Brands Section */}
      <section id="brands" className="py-16 bg-[#F5F7FA]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h3 className="text-3xl font-bold mb-2 text-[#1D1D1F]">Trusted by Leading Brands</h3>
            <p className="text-base text-[#86868B]">We partner with the world's most reputable laptop manufacturers</p>
          </div>

          <div className="flex items-center justify-center gap-10 md:gap-16">
            {[
              { name: 'Dell', href: '/brands/dell', src: 'https://upload.wikimedia.org/wikipedia/commons/4/48/Dell_Logo.svg' },
              { name: 'HP', href: '/brands/hp', src: 'https://upload.wikimedia.org/wikipedia/commons/3/3a/HP_logo_2012.svg' },
              { name: 'Lenovo', href: '/brands/lenovo', src: 'https://upload.wikimedia.org/wikipedia/commons/0/0c/Lenovo_logo_2015.svg' },
              { name: 'ASUS', href: '/brands/asus', src: 'https://upload.wikimedia.org/wikipedia/commons/0/0c/ASUS_Logo.svg' },
              { name: 'Acer', href: '/brands/acer', src: 'https://upload.wikimedia.org/wikipedia/commons/5/58/Acer_2011.svg' }
            ].map((brand) => (
              <Link key={brand.name} href={brand.href} className="group block">
                <div className="relative w-28 h-10 md:w-32 md:h-12 grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition">
                  <Image src={brand.src} alt={`${brand.name} logo`} fill className="object-contain" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section id="products" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold mb-2 text-[#1D1D1F]">
              Hand-Picked Excellence
            </h3>
            <p className="text-base text-[#86868B] max-w-2xl mx-auto">
              Discover our curated collection of premium laptops, selected for performance, reliability, and value.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <div 
                key={product.id} 
                className="group bg-white rounded-2xl shadow-subtle border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer"
                onMouseEnter={() => setHoveredProduct(product.id)}
                onMouseLeave={() => setHoveredProduct(null)}
              >
                {/* Product Image */}
                <Link href={`/products/${product.id}`} className="block">
                  <div className="relative overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={800}
                      height={600}
                      className="w-full h-56 object-cover"
                    />
                  </div>
                </Link>
                
                {/* Product Info */}
                <div className="p-5">
                  <Link href={`/products/${product.id}`} className="block">
                    <h4 className="font-semibold text-lg mb-1 text-[#1D1D1F] group-hover:text-[#007AFF] transition-colors">
                      {product.name}
                    </h4>
                    <p className="text-sm text-[#86868B] mb-4 line-clamp-2">{product.specs}</p>
                  </Link>

                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={`text-sm ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`}>
                          ★
                        </span>
                      ))}
                    </div>
                    <span className="text-sm text-[#86868B]">({product.reviews})</span>
                  </div>
                  
                  {/* Price */}
                  <div className="flex items-center gap-3 mb-5">
                    <span className="text-2xl font-bold text-[#007AFF]">${product.price}</span>
                    <span className="text-sm text-gray-400 line-through">${product.originalPrice}</span>
                    <span className="text-xs text-green-700 font-medium bg-green-100 px-2 py-1 rounded">
                      Save ${parseInt(product.originalPrice) - parseInt(product.price)}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3">
                    <button className="flex-1 btn-accent py-3 px-4 rounded-xl text-sm font-semibold">
                      Add to Cart
                    </button>
                    <button className="bg-gray-100 text-gray-700 p-3 rounded-xl hover:bg-gray-200 transition-colors">
                      <span className="text-lg">🛒</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <button className="btn-outline-accent px-8 py-3 rounded-xl font-semibold text-base">
              View All Products
            </button>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-[#F5F7FA]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold mb-2 text-[#1D1D1F]">
              Your Trust is Our Foundation
            </h3>
            <p className="text-base text-[#86868B] max-w-2xl mx-auto">
              We have built our reputation on delivering exceptional value, quality, and service to thousands of customers.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: '✅',
                title: 'Quality Guaranteed',
                description: 'Every laptop undergoes rigorous testing and comes with comprehensive warranty support',
                stats: '99.8% Quality Rate'
              },
              {
                icon: '🚚',
                title: 'Lightning Fast Delivery',
                description: 'Free delivery across Egypt in 24-48 hours with real-time tracking support',
                stats: '24-48 Hours'
              },
              {
                icon: '💬',
                title: '24/7 Expert Support',
                description: 'WhatsApp support available anytime with our technical experts for all your questions',
                stats: '24/7 Available'
              }
            ].map((feature, index) => (
              <div key={index} className="group text-center p-8 rounded-2xl bg-white shadow-subtle border border-gray-100">
                <div className="w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-5 text-3xl" style={{color: '#007AFF'}}>
                  {feature.icon}
                </div>
                <h4 className="text-xl font-semibold mb-3 text-[#1D1D1F] group-hover:text-[#007AFF] transition-colors">
                  {feature.title}
                </h4>
                <p className="text-[#86868B] mb-4 leading-relaxed">
                  {feature.description}
                </p>
                <div className="inline-flex items-center gap-2 bg-gray-100 text-gray-700 px-3 py-1.5 rounded-full text-sm font-medium">
                  <span className="w-2 h-2 rounded-full" style={{backgroundColor: '#007AFF'}}></span>
                  {feature.stats}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-[#1D1D1F] text-white">
        <div className="container mx-auto px-4 py-14">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            {/* Company Info */}
            <div className="md:col-span-1">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-[#007AFF] rounded-xl flex items-center justify-center text-white font-bold text-lg">
                  HN
                </div>
                <div>
                  <span className="font-bold text-xl">H.N Laptop Store</span>
                  <p className="text-sm text-gray-300">Premium Laptops</p>
                </div>
              </div>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Your trusted partner for premium laptops in Egypt. Quality guaranteed with comprehensive warranty support and exceptional customer service.
              </p>
              <div className="flex gap-4">
                {[
                  { name: 'Facebook', icon: '📘', color: 'hover:text-blue-400' },
                  { name: 'Instagram', icon: '📷', color: 'hover:text-pink-400' },
                  { name: 'WhatsApp', icon: '💬', color: 'hover:text-green-400' },
                  { name: 'LinkedIn', icon: '💼', color: 'hover:text-blue-300' }
                ].map((social) => (
                  <button key={social.name} className={`text-gray-400 ${social.color} transition-colors p-2 rounded-lg hover:bg-white/10`}>
                    <span className="text-xl">{social.icon}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h5 className="font-bold text-lg mb-6 text-white">Quick Links</h5>
              <ul className="space-y-3">
                {['Home', 'Products', 'Brands', 'About Us', 'Contact'].map((link) => (
                  <li key={link}>
                    <a href="#" className="text-gray-300 hover:text-white transition-colors flex items-center gap-2 group">
                      <span className="w-1 h-1 rounded-full transition-transform" style={{backgroundColor: '#007AFF'}}></span>
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Categories */}
            <div>
              <h5 className="font-bold text-lg mb-6 text-white">Categories</h5>
              <ul className="space-y-3">
                {[
                  'Dell Laptops', 'HP Laptops', 'Lenovo Laptops', 
                  'Refurbished', 'Gaming Laptops', 'Business Laptops'
                ].map((category) => (
                  <li key={category}>
                    <a href="#" className="text-gray-300 hover:text-white transition-colors flex items-center gap-2 group">
                      <span className="w-1 h-1 rounded-full transition-transform" style={{backgroundColor: '#007AFF'}}></span>
                      {category}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h5 className="font-bold text-lg mb-6 text-white">Contact Info</h5>
              <div className="space-y-4">
                {[
                  { icon: '📍', text: 'Cairo, Egypt', subtext: 'Main Office' },
                  { icon: '📱', text: '+20 100 000 0000', subtext: 'WhatsApp Available' },
                  { icon: '✉️', text: 'info@hnlaptop.com', subtext: '24/7 Support' },
                  { icon: '🕒', text: '9 AM - 10 PM', subtext: 'Daily Support' }
                ].map((contact, index) => (
                  <div key={index} className="flex items-start gap-3 group">
                    <span className="text-xl group-hover:scale-110 transition-transform">{contact.icon}</span>
                    <div>
                      <p className="text-white font-medium">{contact.text}</p>
                      <p className="text-gray-400 text-sm">{contact.subtext}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-gray-400 text-center md:text-left">
                &copy; 2024 H.N Laptop Store. All rights reserved. | Made with ❤️ in Egypt
              </p>
              <div className="flex gap-6 text-sm">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Refund Policy</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
