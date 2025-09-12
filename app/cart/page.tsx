'use client'

import React, { useState, useEffect } from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import CartItem from '@/components/cart/CartItem'
import CartSummary from '@/components/cart/CartSummary'
import { Button } from '@/components/ui/Button'
import { ShoppingBag, ArrowLeft } from 'lucide-react'

interface CartItem {
  id: number
  name: string
  brand: string
  price: number
  originalPrice?: number
  image: string
  quantity: number
  selectedColor?: string
  selectedStorage?: string
  inStock: boolean
  rating: number
  reviewCount: number
}

const CartPage: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Mock data - في التطبيق الحقيقي سيتم جلبها من API أو localStorage
  const mockCartItems: CartItem[] = [
    {
      id: 1,
      name: 'MacBook Pro 16" M3 Max',
      brand: 'Apple',
      price: 12999,
      originalPrice: 14999,
      image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2026&q=80',
      quantity: 1,
      selectedColor: '#C0C0C0',
      selectedStorage: '1 TB',
      inStock: true,
      rating: 4.8,
      reviewCount: 124
    },
    {
      id: 2,
      name: 'Dell XPS 15 OLED',
      brand: 'Dell',
      price: 8999,
      image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80',
      quantity: 2,
      selectedColor: '#696969',
      inStock: true,
      rating: 4.6,
      reviewCount: 89
    },
    {
      id: 3,
      name: 'ASUS ROG Strix G15',
      brand: 'ASUS',
      price: 6999,
      originalPrice: 7999,
      image: 'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2042&q=80',
      quantity: 1,
      inStock: false,
      rating: 4.7,
      reviewCount: 156
    }
  ]

  useEffect(() => {
    const loadCartItems = async () => {
      setIsLoading(true)
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      setCartItems(mockCartItems)
      setIsLoading(false)
    }
    
    loadCartItems()
  }, [])

  const handleUpdateQuantity = (id: number, quantity: number) => {
    setCartItems(prev => 
      prev.map(item => 
        item.id === id ? { ...item, quantity } : item
      )
    )
  }

  const handleRemoveItem = (id: number) => {
    setCartItems(prev => prev.filter(item => item.id !== id))
  }

  const handleProceedToCheckout = () => {
    // Navigate to checkout page
    window.location.href = '/checkout'
  }

  const handleClearCart = () => {
    if (confirm('هل أنت متأكد من إفراغ عربة التسوق؟')) {
      setCartItems([])
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="container-custom py-16">
          <div className="flex items-center justify-center">
            <div className="spinner"></div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        
        <main className="container-custom py-16">
          <div className="text-center">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="w-12 h-12 text-gray-400" />
            </div>
            
            <h1 className="text-2xl font-bold text-gray-800 mb-4">عربة التسوق فارغة</h1>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              لم تقم بإضافة أي منتجات إلى عربة التسوق بعد. ابدأ التسوق الآن واكتشف أفضل اللابتوبات والملحقات
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                onClick={() => window.location.href = '/products'}
              >
                ابدأ التسوق
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                onClick={() => window.location.href = '/'}
              >
                العودة للرئيسية
              </Button>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container-custom py-8">
        {/* Page Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">عربة التسوق</h1>
            <p className="text-gray-600">
              {cartItems.length} منتج في عربة التسوق
            </p>
          </div>
          
          <div className="flex items-center space-x-4 space-x-reverse">
            <Button
              variant="outline"
              onClick={() => window.location.href = '/products'}
            >
              <ArrowLeft className="w-5 h-5 ml-2" />
              متابعة التسوق
            </Button>
            
            {cartItems.length > 0 && (
              <Button
                variant="ghost"
                onClick={handleClearCart}
                className="text-error-500 hover:text-error-600"
              >
                إفراغ العربة
              </Button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {cartItems.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onUpdateQuantity={handleUpdateQuantity}
                onRemoveItem={handleRemoveItem}
              />
            ))}
          </div>

          {/* Cart Summary */}
          <div className="lg:col-span-1">
            <CartSummary
              items={cartItems}
              onProceedToCheckout={handleProceedToCheckout}
            />
          </div>
        </div>

        {/* Recommended Products */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-800 mb-8">قد يعجبك أيضاً</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Recommended products would be loaded here */}
            <div className="bg-white rounded-2xl p-6 shadow-soft">
              <div className="aspect-square bg-gray-100 rounded-xl mb-4"></div>
              <h3 className="font-semibold text-gray-800 mb-2">منتج مقترح</h3>
              <p className="text-gray-600 mb-4">وصف المنتج المقترح</p>
              <Button className="w-full">أضف للسلة</Button>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}

export default CartPage