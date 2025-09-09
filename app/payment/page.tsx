'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Header from '../components/Header'
import { useToast } from '../components/ToastProvider'

export default function PaymentPage() {
  const router = useRouter()
  const { showToast } = useToast()
  const [paymentMethod, setPaymentMethod] = useState('cod')
  const [isProcessing, setIsProcessing] = useState(false)

  const handlePayment = async () => {
    setIsProcessing(true)
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    showToast('Payment processed successfully!', 'success')
    router.push('/cart/success')
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-10 pt-32">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
            <h1 className="text-3xl font-bold text-[#1D1D1F] mb-6 text-center">Payment Method</h1>
            
            <div className="space-y-6">
              {/* Payment Methods */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-[#1D1D1F]">Choose Payment Method</h2>
                
                {/* Cash on Delivery */}
                <label className="flex items-center p-4 border-2 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors">
                  <input
                    type="radio"
                    name="payment"
                    value="cod"
                    checked={paymentMethod === 'cod'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-5 h-5 text-[#007AFF] focus:ring-[#007AFF]"
                  />
                  <div className="ml-4 flex items-center gap-4">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <span className="text-2xl">💰</span>
                    </div>
                    <div>
                      <div className="font-semibold text-[#1D1D1F]">Cash on Delivery</div>
                      <div className="text-sm text-[#86868B]">Pay when you receive your order</div>
                    </div>
                  </div>
                </label>

                {/* Credit Card */}
                <label className="flex items-center p-4 border-2 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors">
                  <input
                    type="radio"
                    name="payment"
                    value="card"
                    checked={paymentMethod === 'card'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-5 h-5 text-[#007AFF] focus:ring-[#007AFF]"
                  />
                  <div className="ml-4 flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <span className="text-2xl">💳</span>
                    </div>
                    <div>
                      <div className="font-semibold text-[#1D1D1F]">Credit/Debit Card</div>
                      <div className="text-sm text-[#86868B]">Secure online payment</div>
                    </div>
                  </div>
                </label>

                {/* Bank Transfer */}
                <label className="flex items-center p-4 border-2 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors">
                  <input
                    type="radio"
                    name="payment"
                    value="bank"
                    checked={paymentMethod === 'bank'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-5 h-5 text-[#007AFF] focus:ring-[#007AFF]"
                  />
                  <div className="ml-4 flex items-center gap-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                      <span className="text-2xl">🏦</span>
                    </div>
                    <div>
                      <div className="font-semibold text-[#1D1D1F]">Bank Transfer</div>
                      <div className="text-sm text-[#86868B]">Direct bank transfer</div>
                    </div>
                  </div>
                </label>
              </div>

              {/* Payment Details */}
              {paymentMethod === 'card' && (
                <div className="space-y-4 p-4 bg-blue-50 rounded-xl">
                  <h3 className="font-semibold text-blue-900">Card Details</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Card Number"
                      className="px-4 py-3 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    <input
                      type="text"
                      placeholder="Expiry Date"
                      className="px-4 py-3 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    <input
                      type="text"
                      placeholder="CVV"
                      className="px-4 py-3 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    <input
                      type="text"
                      placeholder="Cardholder Name"
                      className="px-4 py-3 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
              )}

              {paymentMethod === 'bank' && (
                <div className="space-y-4 p-4 bg-purple-50 rounded-xl">
                  <h3 className="font-semibold text-purple-900">Bank Transfer Details</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-purple-700">Bank:</span>
                      <span className="font-semibold">National Bank of Egypt</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-purple-700">Account:</span>
                      <span className="font-semibold">1234567890</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-purple-700">IBAN:</span>
                      <span className="font-semibold">EG12345678901234567890</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Order Summary */}
              <div className="p-4 bg-gray-50 rounded-xl">
                <h3 className="font-semibold text-gray-900 mb-3">Order Summary</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>$1,200.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping:</span>
                    <span className="text-green-600">Free</span>
                  </div>
                  <div className="flex justify-between font-semibold text-lg border-t pt-2">
                    <span>Total:</span>
                    <span>$1,200.00</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <button
                  onClick={() => router.back()}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
                >
                  Back to Cart
                </button>
                <button
                  onClick={handlePayment}
                  disabled={isProcessing}
                  className="flex-1 px-6 py-3 bg-[#007AFF] text-white rounded-xl font-semibold hover:bg-[#0056CC] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isProcessing ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Processing...
                    </div>
                  ) : (
                    `Pay $1,200.00`
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

