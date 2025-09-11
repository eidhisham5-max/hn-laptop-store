'use client'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'
import { Badge } from '../components/ui/Badge'
import { EmptyCart } from '../components/ui/EmptyState'
import { useToast } from '../components/ToastProvider'
import { getCart, updateCartItem, clearCart } from '../data/products'
import { fetchProductsByIds, createOrder } from '../data/db'

export default function CartPage() {
  const router = useRouter()
  const { showToast } = useToast()
  
  const [cartItems, setCartItems] = useState(getCart())
  const [detailedItems, setDetailedItems] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [isPlacingOrder, setIsPlacingOrder] = useState(false)
  
  // Customer details for COD
  const [customerDetails, setCustomerDetails] = useState({
    name: '',
    phone: '',
    address: '',
    city: '',
    postalCode: ''
  })

  useEffect(() => {
    const loadCartDetails = async () => {
      setLoading(true)
      try {
        const productIds = cartItems.map(item => item.productId)
        const products = await fetchProductsByIds(productIds)
        
        const detailed = cartItems.map(cartItem => {
          const product = products.find(p => p.id === cartItem.productId)
          return product ? { ...cartItem, product } : null
        }).filter(Boolean)
        
        setDetailedItems(detailed)
      } catch (error) {
        console.error('Failed to load cart details', error)
        showToast('Failed to load cart items', 'error')
      } finally {
        setLoading(false)
      }
    }

    loadCartDetails()
  }, [cartItems])

  const updateQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(productId)
      return
    }
    
    updateCartItem(productId, newQuantity)
    setCartItems(getCart())
      showToast('Cart updated successfully', 'success')
  }

  const removeItem = (productId: number) => {
    updateCartItem(productId, 0)
    setCartItems(getCart())
    showToast('Item removed from cart', 'info')
  }

  const clearAllItems = () => {
    clearCart()
    setCartItems([])
    showToast('Cart cleared', 'info')
  }

  const subtotal = detailedItems.reduce((sum, item) => sum + (item.product.price * item.qty), 0)
  const shipping = subtotal > 1000 ? 0 : 50 // Free shipping over $1000
  const tax = Math.round(subtotal * 0.14) // 14% tax
  const total = subtotal + shipping + tax

  const handlePlaceOrder = async () => {
    if (detailedItems.length === 0) {
      showToast('Your cart is empty', 'error')
      return
    }

    if (!customerDetails.name || !customerDetails.phone || !customerDetails.address) {
      showToast('Please fill in all required fields', 'error')
      return
    }

    setIsPlacingOrder(true)
    try {
      const orderData = {
        customer_name: customerDetails.name,
        phone: customerDetails.phone,
        address: `${customerDetails.address}, ${customerDetails.city} ${customerDetails.postalCode}`,
        items: detailedItems.map(item => ({
          product_id: item.productId,
          qty: item.qty,
          price: item.product.price
        }))
      }

      const order = await createOrder(orderData)
      clearCart()
      setCartItems([])
      
      showToast('Order placed successfully!', 'success')
      router.push(`/cart/success?orderId=${order.id}`)
    } catch (error) {
      console.error('Failed to place order', error)
      showToast('Failed to place order. Please try again.', 'error')
    } finally {
      setIsPlacingOrder(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-gray-200 border-t-primary-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading cart...</p>
        </div>
      </div>
    )
  }

  if (detailedItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-16">
          <EmptyCart />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
          <p className="text-gray-600 mt-2">{detailedItems.length} item(s) in your cart</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4 order-2 lg:order-1">
            {detailedItems.map((item) => (
              <div key={item.productId} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-start space-x-4">
                  <div className="relative w-20 h-20 flex-shrink-0">
                    <Image
                      src={item.product.image || '/placeholder-laptop.jpg'}
                      alt={item.product.name}
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {item.product.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-2">
                      {item.product.specs}
                    </p>
                    <div className="flex items-center space-x-2 mb-3">
                      <Badge variant={item.product.condition === 'new' ? 'success' : 'warning'}>
                        {item.product.condition}
                      </Badge>
                      <span className="text-sm text-gray-500">
                        {item.product.brand_name || item.product.brand?.name}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateQuantity(item.productId, item.qty - 1)}
                        >
                          -
                        </Button>
                        <span className="w-12 text-center font-medium">{item.qty}</span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateQuantity(item.productId, item.qty + 1)}
                        >
                          +
                        </Button>
                      </div>
                      
                      <div className="text-right">
                        <div className="text-lg font-semibold text-gray-900">
                          ${(item.product.price * item.qty).toLocaleString()}
                        </div>
                        <div className="text-sm text-gray-500">
                          ${item.product.price.toLocaleString()} each
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeItem(item.productId)}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </Button>
                </div>
              </div>
            ))}
            
            <div className="flex justify-between items-center pt-4">
              <Button
                variant="outline"
                onClick={clearAllItems}
                className="text-red-600 border-red-300 hover:bg-red-50"
              >
                Clear Cart
              </Button>
              <Link href="/products">
                <Button variant="outline">
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1 order-1 lg:order-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6 sticky top-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Order Summary</h2>
              
              {/* Customer Details Form */}
              <div className="space-y-4 mb-6">
                <h3 className="text-lg font-medium text-gray-900">Customer Details</h3>
                
                <Input
                  label="Full Name"
                  placeholder="Enter your full name"
                  value={customerDetails.name}
                  onChange={(e) => setCustomerDetails(prev => ({ ...prev, name: e.target.value }))}
                  required
                />
                
                <Input
                  label="Phone Number"
                  placeholder="Enter your phone number"
                  value={customerDetails.phone}
                  onChange={(e) => setCustomerDetails(prev => ({ ...prev, phone: e.target.value }))}
                  required
                />
                
                <Input
                  label="Address"
                  placeholder="Enter your address"
                  value={customerDetails.address}
                  onChange={(e) => setCustomerDetails(prev => ({ ...prev, address: e.target.value }))}
                  required
                />
                
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="City"
                    placeholder="Cairo"
                    value={customerDetails.city}
                    onChange={(e) => setCustomerDetails(prev => ({ ...prev, city: e.target.value }))}
                  />
                  
                  <Input
                    label="Postal Code"
                    placeholder="11511"
                    value={customerDetails.postalCode}
                    onChange={(e) => setCustomerDetails(prev => ({ ...prev, postalCode: e.target.value }))}
                  />
                </div>
              </div>
              
              {/* Price Breakdown */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({detailedItems.length} items)</span>
                  <span>${subtotal.toLocaleString()}</span>
                </div>
                
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? 'Free' : `$${shipping}`}</span>
                </div>
                
                <div className="flex justify-between text-gray-600">
                  <span>Tax (14%)</span>
                  <span>${tax.toLocaleString()}</span>
                </div>
                
                <div className="border-t border-gray-200 pt-3">
                  <div className="flex justify-between text-lg font-semibold text-gray-900">
                    <span>Total</span>
                    <span>${total.toLocaleString()}</span>
                  </div>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="space-y-3">
                <Button
                  size="lg"
                  fullWidth
                  onClick={handlePlaceOrder}
                  loading={isPlacingOrder}
                >
                  Place Order (COD)
                </Button>
                
                <Button
                  variant="outline"
                  size="lg"
                  fullWidth
                  onClick={() => router.push('/payment')}
                >
                  Pay with Card
                </Button>
              </div>
              
              {/* Security Badges */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex items-center justify-center space-x-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <span className="text-green-500">🔒</span>
                    <span>Secure checkout</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span className="text-blue-500">💳</span>
                    <span>Multiple payment options</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}