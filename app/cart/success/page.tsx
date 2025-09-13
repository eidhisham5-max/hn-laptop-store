'use client'
import React, { useState, useEffect, Suspense } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Button } from '../../components/ui/Button'
import { Badge } from '../../components/ui/Badge'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card'

function OrderSuccessContent() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get('orderId')
  const [orderDetails, setOrderDetails] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // In a real app, you would fetch order details using the orderId
    // For now, we'll simulate the order data
    const simulateOrderDetails = () => {
      setLoading(true)
      setTimeout(() => {
        setOrderDetails({
          id: orderId || 'HN-2024-001234',
          date: new Date().toLocaleDateString(),
          status: 'confirmed',
          items: [
            {
              name: 'Dell XPS 13',
              quantity: 1,
              price: 1200,
              image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=200&h=150&fit=crop&auto=format'
            }
          ],
          customer: {
            name: 'Ahmed Mohamed',
            phone: '+20 100 000 0000',
            address: '123 Main Street, Nasr City, Cairo, Egypt'
          },
          totals: {
            subtotal: 1200,
            shipping: 0,
            tax: 168,
            total: 1368
          },
          estimatedDelivery: 'December 17-18, 2024'
        })
        setLoading(false)
      }, 1000)
    }

    simulateOrderDetails()
  }, [orderId])

  const timeline = [
    {
      step: 1,
      title: 'Order Placed',
      description: 'Your order has been successfully placed',
      status: 'completed',
      time: 'Just now'
    },
    {
      step: 2,
      title: 'Order Processing',
      description: 'We are preparing your order for shipment',
      status: 'current',
      time: 'Next 2-4 hours'
    },
    {
      step: 3,
      title: 'Shipped',
      description: 'Your order is on its way to you',
      status: 'pending',
      time: 'Within 24 hours'
    },
    {
      step: 4,
      title: 'Delivered',
      description: 'Your order has been delivered',
      status: 'pending',
      time: '24-48 hours'
    }
  ]

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-gray-200 border-t-primary-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading order details...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Success Header */}
          <div className="text-center mb-8 sm:mb-12">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
              <svg className="w-8 h-8 sm:w-10 sm:h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">Order Confirmed!</h1>
            <p className="text-lg sm:text-xl text-gray-600 mb-2">
              Thank you for your order! Your order has been successfully placed.
            </p>
            <p className="text-base sm:text-lg text-gray-700 font-medium">
              Order #: {orderDetails?.id}
            </p>
            <p className="text-sm sm:text-base text-gray-600">
              Order Date: {orderDetails?.date}
            </p>
            <p className="text-sm sm:text-base text-gray-600">
              Estimated Delivery: {orderDetails?.estimatedDelivery}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Order Details */}
            <div className="lg:col-span-2 space-y-6 order-2 lg:order-1">
              {/* Order Items */}
              <Card>
                <CardHeader>
                  <CardTitle>Order Items</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {orderDetails?.items.map((item: any, index: number) => (
                      <div key={index} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">{item.name}</h3>
                          <p className="text-gray-600">Quantity: {item.quantity}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">${item.price.toLocaleString()}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Order Timeline */}
              <Card>
                <CardHeader>
                  <CardTitle>Order Timeline</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {timeline.map((item, index) => (
                      <div key={index} className="flex items-start space-x-4">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                          item.status === 'completed' 
                            ? 'bg-green-500 text-white' 
                            : item.status === 'current'
                            ? 'bg-primary-500 text-white'
                            : 'bg-gray-200 text-gray-600'
                        }`}>
                          {item.status === 'completed' ? '✓' : item.step}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">{item.title}</h3>
                          <p className="text-gray-600 text-sm">{item.description}</p>
                          <p className="text-gray-500 text-xs mt-1">{item.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Order Summary */}
            <div className="space-y-6 order-1 lg:order-2">
              {/* Customer Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Customer Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-600">Name</p>
                      <p className="font-medium text-gray-900">{orderDetails?.customer.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Phone</p>
                      <p className="font-medium text-gray-900">{orderDetails?.customer.phone}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Address</p>
                      <p className="font-medium text-gray-900">{orderDetails?.customer.address}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Order Summary */}
              <Card>
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between text-gray-600">
                      <span>Subtotal</span>
                      <span>${orderDetails?.totals.subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Shipping</span>
                      <span>{orderDetails?.totals.shipping === 0 ? 'Free' : `$${orderDetails?.totals.shipping}`}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Tax (14%)</span>
                      <span>${orderDetails?.totals.tax.toLocaleString()}</span>
                    </div>
                    <div className="border-t border-gray-200 pt-3">
                      <div className="flex justify-between text-lg font-semibold text-gray-900">
                        <span>Total</span>
                        <span>${orderDetails?.totals.total.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Payment Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Payment Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Badge variant="success">Cash on Delivery</Badge>
                    </div>
                    <p className="text-sm text-gray-600">
                      You will pay ${orderDetails?.totals.total.toLocaleString()} when your order is delivered.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <div className="space-y-3">
                <Link href="/orders" className="block">
                  <Button fullWidth>
                    Track Your Order
                  </Button>
                </Link>
                
                <Link href="/products" className="block">
                  <Button variant="outline" fullWidth>
                    Continue Shopping
                  </Button>
                </Link>
                
                <Button
                  variant="outline"
                  fullWidth
                  onClick={() => window.print()}
                >
                  Print Receipt
                </Button>
              </div>
            </div>
          </div>

          {/* What's Next Section */}
          <div className="mt-16">
            <Card>
              <CardHeader>
                <CardTitle className="text-center">What's Next?</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                  <div className="space-y-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                      <span className="text-blue-600 text-xl">📦</span>
                    </div>
                    <h3 className="font-semibold text-gray-900">Order Processing</h3>
                    <p className="text-gray-600 text-sm">
                      We'll prepare your order for shipment. Estimated time: 2-4 hours.
                    </p>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                      <span className="text-green-600 text-xl">🚚</span>
                    </div>
                    <h3 className="font-semibold text-gray-900">Shipping</h3>
                    <p className="text-gray-600 text-sm">
                      Your order will be shipped within 24 hours. You'll receive a tracking number via SMS.
                    </p>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
                      <span className="text-purple-600 text-xl">🏠</span>
                    </div>
                    <h3 className="font-semibold text-gray-900">Delivery</h3>
                    <p className="text-gray-600 text-sm">
                      Free delivery within 24-48 hours. Our delivery team will contact you before arrival.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OrderSuccessContent />
    </Suspense>
  )
}