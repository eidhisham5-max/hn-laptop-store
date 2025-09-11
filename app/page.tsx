'use client'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from './components/ui/Button'
import { ProductGrid } from './components/products/ProductGrid'
import { Badge } from './components/ui/Badge'
import { useToast } from './components/ToastProvider'
import { addToCart } from './data/products'

export default function Home() {
  const { showToast } = useToast()
  const [featuredProducts, setFeaturedProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading featured products
    const loadProducts = async () => {
      setLoading(true)
      // In a real app, this would fetch from an API
      await new Promise(resolve => setTimeout(resolve, 1000))
      setFeaturedProducts([
        {
          id: '1',
          name: 'Dell XPS 13',
          price: 1200,
          originalPrice: 1400,
          image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&h=600&fit=crop&auto=format',
          brand: 'Dell',
          condition: 'new',
          rating: 4.8,
          reviewCount: 124,
          inStock: true,
          stockCount: 12,
          discount: 14,
          specs: {
            processor: 'Intel Core i7-1165G7',
            memory: '16GB LPDDR4X RAM',
            storage: '512GB PCIe NVMe SSD',
            display: '13.4" FHD+ (1920x1200)'
          }
        },
        {
          id: '2',
          name: 'HP Pavilion 15',
          price: 800,
          originalPrice: 950,
          image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&h=600&fit=crop&auto=format',
          brand: 'HP',
          condition: 'refurbished',
          rating: 4.6,
          reviewCount: 89,
          inStock: true,
          stockCount: 8,
          discount: 16,
          specs: {
            processor: 'AMD Ryzen 5 5500U',
            memory: '8GB DDR4 RAM',
            storage: '256GB PCIe NVMe SSD',
            display: '15.6" FHD (1920x1080)'
          }
        },
        {
          id: '3',
          name: 'Lenovo ThinkPad X1',
          price: 1500,
          originalPrice: 1800,
          image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800&h=600&fit=crop&auto=format',
          brand: 'Lenovo',
          condition: 'new',
          rating: 4.9,
          reviewCount: 203,
          inStock: true,
          stockCount: 5,
          discount: 17,
          specs: {
            processor: 'Intel Core i7-1185G7',
            memory: '32GB LPDDR4X RAM',
            storage: '1TB PCIe NVMe SSD',
            display: '14" WQHD (2560x1440)'
          }
        },
        {
          id: '4',
          name: 'MacBook Air M2',
          price: 1300,
          originalPrice: 1500,
          image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&h=600&fit=crop&auto=format',
          brand: 'Apple',
          condition: 'new',
          rating: 4.9,
          reviewCount: 156,
          inStock: true,
          stockCount: 20,
          discount: 13,
          specs: {
            processor: 'Apple M2',
            memory: '8GB Unified Memory',
            storage: '256GB SSD',
            display: '13.6" Liquid Retina (2560x1664)'
          }
        }
      ])
      setLoading(false)
    }

    loadProducts()
  }, [])

  const handleAddToCart = async (product: any) => {
    try {
      await addToCart(product)
      showToast('Product added to cart!', 'success')
    } catch (error) {
      showToast('Failed to add product to cart', 'error')
    }
  }

  const categories = [
    {
      name: 'Gaming Laptops',
      icon: '🎮',
      description: 'High-performance laptops for gaming enthusiasts',
      href: '/products?category=gaming',
      image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400&h=300&fit=crop&auto=format'
    },
    {
      name: 'Business Laptops',
      icon: '💼',
      description: 'Professional laptops for work productivity',
      href: '/products?category=business',
      image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=300&fit=crop&auto=format'
    },
    {
      name: 'Ultrabooks',
      icon: '✨',
      description: 'Lightweight and portable premium laptops',
      href: '/products?category=ultrabook',
      image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400&h=300&fit=crop&auto=format'
    },
    {
      name: 'Everyday Laptops',
      icon: '🏠',
      description: 'Affordable laptops for daily use',
      href: '/products?category=everyday',
      image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=300&fit=crop&auto=format'
    }
  ]

  const brands = [
    { name: 'Dell', logo: 'https://logos-world.net/wp-content/uploads/2020/09/Dell-Logo.png' },
    { name: 'HP', logo: 'https://logos-world.net/wp-content/uploads/2020/09/HP-Logo.png' },
    { name: 'Lenovo', logo: 'https://logos-world.net/wp-content/uploads/2020/09/Lenovo-Logo.png' },
    { name: 'ASUS', logo: 'https://logos-world.net/wp-content/uploads/2020/09/ASUS-Logo.png' },
    { name: 'Acer', logo: 'https://logos-world.net/wp-content/uploads/2020/09/Acer-Logo.png' },
    { name: 'MSI', logo: 'https://logos-world.net/wp-content/uploads/2020/09/MSI-Logo.png' },
    { name: 'Apple', logo: 'https://logos-world.net/wp-content/uploads/2020/09/Apple-Logo.png' }
  ]

  const features = [
    {
      icon: '✅',
      title: 'Quality Guaranteed',
      description: 'Every laptop undergoes rigorous testing and comes with comprehensive warranty support',
      stat: '99.8% Quality Rate'
    },
    {
      icon: '🚚',
      title: 'Lightning Fast Delivery',
      description: 'Free delivery across Egypt in 24-48 hours with real-time tracking support',
      stat: '24-48 Hours'
    },
    {
      icon: '💬',
      title: '24/7 Expert Support',
      description: 'WhatsApp support available anytime with our technical experts for all questions',
      stat: '24/7 Available'
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-50 to-primary-100 py-12 sm:py-16 lg:py-20 xl:py-32">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-center">
            <div className="space-y-6 lg:space-y-8 text-center lg:text-left">
              <div className="space-y-3 lg:space-y-4">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight">
              Premium Laptops
                  <span className="block text-primary-600">At Unbeatable Prices</span>
            </h1>
                <p className="text-lg sm:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                  Discover our curated collection of new and refurbished laptops from top brands. 
                  Quality guaranteed with 2-year warranty and free delivery across Egypt.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
                <Link href="/products">
                  <Button size="lg" className="w-full sm:w-auto">
                    Browse Products
                  </Button>
              </Link>
                <Button 
                  variant="secondary" 
                  size="lg" 
                  className="w-full sm:w-auto"
                  onClick={() => window.open('https://wa.me/201000000000', '_blank')}
                >
                  Get Free Quote 💬
                </Button>
              </div>

              <div className="flex flex-col sm:flex-row sm:flex-wrap items-center gap-4 sm:gap-6 text-sm text-gray-600 justify-center lg:justify-start">
                <div className="flex items-center gap-2">
                  <span className="text-yellow-500">★★★★★</span>
                  <span className="whitespace-nowrap">4.9/5 from 1,200+ reviews</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-500">🚚</span>
                  <span className="whitespace-nowrap">Free Delivery 24-48h</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-blue-500">🔒</span>
                  <span className="whitespace-nowrap">2-Year Warranty</span>
                </div>
              </div>
            </div>

            <div className="relative order-first lg:order-last">
              <div className="relative z-10">
                <Image
                  src="https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&h=600&fit=crop&auto=format"
                  alt="Premium Laptop"
                  width={600}
                  height={400}
                  className="rounded-2xl shadow-2xl w-full h-auto"
                  priority
                />
              </div>
              <div className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4 w-16 h-16 sm:w-24 sm:h-24 bg-primary-500 rounded-full opacity-20"></div>
              <div className="absolute -bottom-2 -left-2 sm:-bottom-4 sm:-left-4 w-20 h-20 sm:w-32 sm:h-32 bg-secondary-500 rounded-full opacity-20"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted Brands Section */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-3 sm:space-y-4 mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
              Trusted by Leading Brands
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
              We partner with the world's most reputable manufacturers to bring you the best laptops
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4 sm:gap-6 lg:gap-8 items-center">
            {brands.map((brand, index) => (
              <div key={index} className="flex items-center justify-center p-2 sm:p-4 grayscale hover:grayscale-0 transition-all duration-300">
                <Image
                  src={brand.logo}
                  alt={brand.name}
                  width={120}
                  height={60}
                  className="max-h-8 sm:max-h-12 w-auto object-contain"
                />
                </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-3 sm:space-y-4 mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
              Shop by Category
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
              Find the perfect laptop for your specific needs
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {categories.map((category, index) => (
              <Link key={index} href={category.href}>
                <div className="group bg-white rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-2">
                  <div className="text-center space-y-3 sm:space-y-4">
                    <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">{category.icon}</div>
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {category.description}
                    </p>
                    <Button variant="outline" size="sm" className="mt-3 sm:mt-4">
                      Explore →
                    </Button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-3 sm:space-y-4 mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
              Hand-Picked Excellence
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
              Discover our curated collection of premium laptops, selected for performance, reliability, and value
            </p>
          </div>

          <ProductGrid
            products={featuredProducts}
            loading={loading}
            columns={4}
            onAddToCart={handleAddToCart}
            onProductClick={(product) => window.location.href = `/products/${product.id}`}
          />
          
          <div className="text-center mt-8 sm:mt-12">
            <Link href="/products">
              <Button size="lg" variant="secondary">
              View All Products
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-3 sm:space-y-4 mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
              Your Trust is Our Foundation
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
              We have built our reputation on delivering exceptional value, quality, and service to thousands of customers
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center space-y-3 sm:space-y-4">
                <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">{feature.icon}</div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                  {feature.description}
                </p>
                <div className="text-xl sm:text-2xl font-bold text-primary-600">
                  {feature.stat}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-primary-600">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-6 sm:space-y-8">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
              Ready to Find Your Perfect Laptop?
            </h2>
            <p className="text-lg sm:text-xl text-primary-100">
              Browse our extensive collection or get personalized recommendations from our experts
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Link href="/products">
                <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                  Browse All Products
                </Button>
              </Link>
              <Button 
                size="lg" 
                variant="outline" 
                className="w-full sm:w-auto bg-transparent border-white text-white hover:bg-white hover:text-primary-600"
                onClick={() => window.open('https://wa.me/201000000000', '_blank')}
              >
                Get Expert Advice
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}