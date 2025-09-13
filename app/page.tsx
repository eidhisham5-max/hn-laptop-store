'use client'
import React from 'react'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">HN</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">H.N Laptop Store</h1>
                <p className="text-sm text-gray-500">Premium Laptops</p>
              </div>
            </div>
            <nav className="hidden md:flex space-x-6">
              <Link href="/" className="text-gray-700 hover:text-blue-600 font-medium">Home</Link>
              <Link href="/products" className="text-gray-700 hover:text-blue-600 font-medium">Products</Link>
              <Link href="/brands" className="text-gray-700 hover:text-blue-600 font-medium">Brands</Link>
              <Link href="/contact" className="text-gray-700 hover:text-blue-600 font-medium">Contact</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-16">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Premium Laptops
            <span className="block text-blue-600">At Unbeatable Prices</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Discover our curated collection of new and refurbished laptops from top brands. 
            Quality guaranteed with 2-year warranty and free delivery across Egypt.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/products"
              className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
            >
              Browse Products
            </Link>
            <button 
              onClick={() => window.open('https://wa.me/201000000000', '_blank')}
              className="inline-flex items-center justify-center px-8 py-4 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition-colors shadow-lg hover:shadow-xl"
            >
              Get Free Quote 💬
            </button>
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <div className="text-center p-6 bg-white rounded-xl shadow-sm">
            <div className="text-4xl mb-4">✅</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Quality Guaranteed</h3>
            <p className="text-gray-600">Every laptop undergoes rigorous testing and comes with comprehensive warranty support</p>
            <div className="text-2xl font-bold text-blue-600 mt-3">99.8% Quality Rate</div>
          </div>
          <div className="text-center p-6 bg-white rounded-xl shadow-sm">
            <div className="text-4xl mb-4">🚚</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Lightning Fast Delivery</h3>
            <p className="text-gray-600">Free delivery across Egypt in 24-48 hours with real-time tracking support</p>
            <div className="text-2xl font-bold text-blue-600 mt-3">24-48 Hours</div>
          </div>
          <div className="text-center p-6 bg-white rounded-xl shadow-sm">
            <div className="text-4xl mb-4">💬</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">24/7 Expert Support</h3>
            <p className="text-gray-600">WhatsApp support available anytime with our technical experts for all questions</p>
            <div className="text-2xl font-bold text-blue-600 mt-3">24/7 Available</div>
          </div>
        </div>

        {/* Trusted Brands */}
        <div className="mt-16 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Trusted by Leading Brands</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-6 items-center">
            {['Dell', 'HP', 'Lenovo', 'ASUS', 'Acer', 'MSI', 'Apple'].map((brand) => (
              <div key={brand} className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="text-gray-600 font-semibold">{brand}</div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-16">
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">HN</span>
                </div>
                <div>
                  <div className="font-bold">H.N Laptop Store</div>
                  <div className="text-sm text-gray-400">Premium Laptops</div>
                </div>
              </div>
              <p className="text-gray-300 text-sm">
                Your trusted partner for premium laptops. Quality guaranteed with warranty support.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><Link href="/about" className="hover:text-white">About Us</Link></li>
                <li><Link href="/story" className="hover:text-white">Our Story</Link></li>
                <li><Link href="/careers" className="hover:text-white">Careers</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><Link href="/help" className="hover:text-white">Help Center</Link></li>
                <li><Link href="/contact" className="hover:text-white">Contact Us</Link></li>
                <li><Link href="/shipping" className="hover:text-white">Shipping Info</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Contact</h3>
              <div className="space-y-2 text-sm text-gray-300">
                <div>📞 +20 100 000 0000</div>
                <div>✉️ info@hnlaptopstore.com</div>
                <div>📍 Cairo, Egypt</div>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            © 2025 H.N Laptop Store. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}