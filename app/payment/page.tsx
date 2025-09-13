'use client'
import React, { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useToast } from '../components/ToastProvider'
import { getCart, clearCart } from '../data/products'
import { fetchProductsByIds, createOrder } from '../data/db'

export default function PaymentPage() {
  const router = useRouter()
  const { showToast } = useToast()
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'card' | 'bank'>('cod')
  const [isProcessing, setIsProcessing] = useState(false)
  const [detailed, setDetailed] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')

  useEffect(() => {
    async function load() {
      setLoading(true)
      const cart = getCart()
      try {
        const ids = cart.map(i => i.productId)
        const prods = await fetchProductsByIds(ids)
        const joined = cart.map(i => ({ ...i, product: prods.find(p => p.id === i.productId) })).filter(i => i.product)
        setDetailed(joined as any)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const subtotal = useMemo(() => detailed.reduce((sum, i) => sum + i.product.price * i.qty, 0), [detailed])

  const handlePayment = async () => {
    if (detailed.length === 0) {
      showToast('Cart is empty', 'warning')
      router.push('/cart')
      return
    }
    if (!name || !phone || !address) {
      showToast('Please fill in all required fields', 'warning')
      return
    }
    setIsProcessing(true)
    try {
      if (paymentMethod === 'card') {
        const res = await fetch('/api/paymob/init', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            customer_name: name,
            phone,
            address,
            items: detailed.map(i => ({ product_id: i.product.id, qty: i.qty, price: i.product.price }))
          })
        })
        if (!res.ok) throw new Error('Failed to initialize payment')
        const data = await res.json()
        // Do NOT clear cart yet; wait for webhook/confirmation
        window.location.href = data.iframeUrl
        return
      } else {
        const order = await createOrder({
          customer_name: name,
          phone,
          address,
          items: detailed.map(i => ({ product_id: i.product.id, qty: i.qty, price: i.product.price }))
        })
        clearCart()
        showToast('Order placed successfully!', 'success')
        router.push(`/cart/success?orderId=${order.id}`)
      }
    } catch (e) {
      showToast('Failed to process payment. Please try again.', 'error')
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
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
                    onChange={(e) => setPaymentMethod(e.target.value as any)}
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
                    onChange={(e) => setPaymentMethod(e.target.value as any)}
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
                    onChange={(e) => setPaymentMethod(e.target.value as any)}
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

              {/* Customer Info */}
              <div className="grid grid-cols-1 gap-3">
                <input className="w-full px-4 py-3 border rounded-lg" placeholder="Full name" value={name} onChange={e=>setName(e.target.value)} />
                <input className="w-full px-4 py-3 border rounded-lg" placeholder="Phone number" value={phone} onChange={e=>setPhone(e.target.value)} />
                <textarea className="w-full px-4 py-3 border rounded-lg" placeholder="Delivery address" value={address} onChange={e=>setAddress(e.target.value)} rows={3} />
              </div>

              {/* Order Summary */}
              <div className="p-4 bg-gray-50 rounded-xl">
                <h3 className="font-semibold text-gray-900 mb-3">Order Summary</h3>
                {loading ? (
                  <div className="text-sm text-gray-600">Loading...</div>
                ) : detailed.length === 0 ? (
                  <div className="text-sm text-gray-600">Your cart is empty.</div>
                ) : (
                  <div className="space-y-2 text-sm">
                    <div className="max-h-40 overflow-auto divide-y">
                      {detailed.map(({ product, qty }) => (
                        <div key={product.id} className="flex items-center justify-between py-1">
                          <span className="text-gray-700">{product.name}</span>
                          <span className="text-gray-500">x{qty}</span>
                          <span className="font-medium">${(product.price * qty).toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-between pt-2">
                      <span>Subtotal:</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping:</span>
                      <span className="text-green-600">Free</span>
                    </div>
                    <div className="flex justify-between font-semibold text-lg border-t pt-2">
                      <span>Total:</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                  </div>
                )}
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
                    paymentMethod === 'cod' ? 'Place Order (COD)' : `Pay ${subtotal.toFixed(2)}`
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

