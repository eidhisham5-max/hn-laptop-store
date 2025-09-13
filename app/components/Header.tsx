'use client'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import CartBadge from './CartBadge'

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white ${
      isScrolled ? 'shadow-lg backdrop-blur-md bg-white/95' : 'border-b border-gray-200'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-[#007AFF] to-[#0056CC] rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg group-hover:scale-105 transition-transform">
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

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-8">
            <Link href="/" className="relative text-[#1D1D1F] hover:text-[#007AFF] font-medium transition-colors group">
              Home
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#007AFF] group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link href="/products" className="relative text-[#1D1D1F] hover:text-[#007AFF] font-medium transition-colors group">
              Products
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#007AFF] group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link href="/brands" className="relative text-[#1D1D1F] hover:text-[#007AFF] font-medium transition-colors group">
              Brands
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#007AFF] group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link href="/orders" className="relative text-[#1D1D1F] hover:text-[#007AFF] font-medium transition-colors group">
              Track Order
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#007AFF] group-hover:w-full transition-all duration-300"></span>
            </Link>
            <a href="#contact" className="relative text-[#1D1D1F] hover:text-[#007AFF] font-medium transition-colors group">
              Contact
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#007AFF] group-hover:w-full transition-all duration-300"></span>
            </a>
          </nav>

          {/* Right Side Actions */}
          <div className="flex gap-3 items-center">
            <CartBadge />
            <Link href="/login" className="bg-gray-100 text-gray-700 px-6 py-2.5 rounded-xl text-sm font-medium hover:bg-gray-200 transition-all duration-300 hover:shadow-md">
              Login
            </Link>
            <button className="btn-outline-accent px-6 py-2.5 rounded-xl text-sm font-medium flex items-center gap-2 hover:shadow-md transition-all">
              <span>WhatsApp</span>
              <span>📱</span>
            </button>
            
            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <nav className="flex flex-col gap-4">
              <Link href="/" className="text-[#1D1D1F] hover:text-[#007AFF] font-medium transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
                Home
              </Link>
              <Link href="/products" className="text-[#1D1D1F] hover:text-[#007AFF] font-medium transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
                Products
              </Link>
              <Link href="/brands" className="text-[#1D1D1F] hover:text-[#007AFF] font-medium transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
                Brands
              </Link>
              <Link href="/orders" className="text-[#1D1D1F] hover:text-[#007AFF] font-medium transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
                Track Order
              </Link>
              <a href="#contact" className="text-[#1D1D1F] hover:text-[#007AFF] font-medium transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
                Contact
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

