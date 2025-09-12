'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Search, ShoppingCart, User, Menu, X, Heart } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Badge } from '@/components/ui/Badge'

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [cartItemsCount] = useState(3) // Mock data

  const navigation = [
    { name: 'الرئيسية', href: '/' },
    { name: 'اللابتوبات', href: '/products' },
    { name: 'الملحقات', href: '/accessories' },
    { name: 'العروض', href: '/offers' },
    { name: 'الدعم', href: '/support' },
  ]

  return (
    <header className="bg-white shadow-soft sticky top-0 z-50">
      <div className="container-custom">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 space-x-reverse">
            <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">HN</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-gray-800">H.N Laptop Store</h1>
              <p className="text-xs text-gray-500">بوابتك لعالم من الأداء الفائق</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8 space-x-reverse">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-600 hover:text-primary-500 font-medium transition-colors duration-200"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Input
                placeholder="ابحث عن لابتوب أو ملحق..."
                className="pr-10"
                icon={<Search className="w-5 h-5" />}
                iconPosition="right"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4 space-x-reverse">
            {/* Wishlist */}
            <button className="p-2 text-gray-600 hover:text-primary-500 transition-colors duration-200">
              <Heart className="w-6 h-6" />
            </button>

            {/* Cart */}
            <Link href="/cart" className="relative p-2 text-gray-600 hover:text-primary-500 transition-colors duration-200">
              <ShoppingCart className="w-6 h-6" />
              {cartItemsCount > 0 && (
                <Badge 
                  variant="error" 
                  size="sm" 
                  className="absolute -top-1 -left-1 min-w-[20px] h-5 flex items-center justify-center"
                >
                  {cartItemsCount}
                </Badge>
              )}
            </Link>

            {/* User Account */}
            <Link href="/auth/login">
              <Button variant="ghost" size="sm" className="hidden sm:flex">
                <User className="w-5 h-5 ml-2" />
                حسابي
              </Button>
            </Link>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 text-gray-600 hover:text-primary-500 transition-colors duration-200"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden pb-4">
          <Input
            placeholder="ابحث عن لابتوب أو ملحق..."
            className="pr-10"
            icon={<Search className="w-5 h-5" />}
            iconPosition="right"
          />
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-gray-100 py-4">
            <nav className="flex flex-col space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-600 hover:text-primary-500 font-medium transition-colors duration-200 py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-4 border-t border-gray-100">
                <Link href="/auth/login">
                  <Button variant="outline" className="w-full">
                    <User className="w-5 h-5 ml-2" />
                    تسجيل الدخول
                  </Button>
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header