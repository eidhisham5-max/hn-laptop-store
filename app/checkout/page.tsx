'use client'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

interface CartItem {
  id: number
  name: string
  price: number
  image: string
  quantity: number
}

interface FormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  city: string
  governorate: string
  paymentMethod: 'cash' | 'card'
  cardNumber: string
  expiryDate: string
  cvv: string
  notes: string
}

export default function CheckoutPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    governorate: '',
    paymentMethod: 'cash',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    notes: ''
  })

  const [errors, setErrors] = useState<Partial<FormData>>({})

  useEffect(() => {
    const savedCart = localStorage.getItem('cart')
    if (savedCart) {
      const cart = JSON.parse(savedCart)
      setCartItems(cart)
      
      if (cart.length === 0) {
        router.push('/cart')
      }
    } else {
      router.push('/cart')
    }
    setIsLoading(false)
  }, [router])

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const shipping = subtotal > 1000 ? 0 : 50
  const total = subtotal + shipping

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    // مسح الخطأ عند الكتابة
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }))
    }
  }

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {}

    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required'
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required'
    if (!formData.email.trim()) newErrors.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid'
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required'
    else if (!/^01[0-2,5][0-9]{8}$/.test(formData.phone)) newErrors.phone = 'Please enter a valid Egyptian phone number'
    if (!formData.address.trim()) newErrors.address = 'Address is required'
    if (!formData.city.trim()) newErrors.city = 'City is required'
    if (!formData.governorate.trim()) newErrors.governorate = 'Governorate is required'

    if (formData.paymentMethod === 'card') {
      if (!formData.cardNumber.trim()) newErrors.cardNumber = 'Card number is required'
      else if (!/^[0-9]{16}$/.test(formData.cardNumber.replace(/\s/g, ''))) newErrors.cardNumber = 'Card number must be 16 digits'
      if (!formData.expiryDate.trim()) newErrors.expiryDate = 'Expiry date is required'
      if (!formData.cvv.trim()) newErrors.cvv = 'CVV is required'
      else if (!/^[0-9]{3}$/.test(formData.cvv)) newErrors.cvv = 'CVV must be 3 digits'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setIsSubmitting(true)
    
    try {
      // محاكاة إرسال الطلب
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // حفظ بيانات الطلب
      const orderData = {
        id: Date.now(),
        items: cartItems,
        customer: formData,
        total: total,
        status: 'pending',
        createdAt: new Date().toISOString()
      }
      
      // حفظ في localStorage (في التطبيق الحقيقي سيكون API call)
      const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]')
      existingOrders.push(orderData)
      localStorage.setItem('orders', JSON.stringify(existingOrders))
      
      // مسح السلة
      localStorage.removeItem('cart')
      
      // توجيه لصفحة النجاح
      router.push('/success?orderId=' + orderData.id)
    } catch {
      alert('حدث خطأ أثناء إرسال الطلب. يرجى المحاولة مرة أخرى.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const egyptianGovernorates = [
    'Cairo', 'Alexandria', 'Giza', 'Qalyubia', 'Port Said', 'Suez',
    'Luxor', 'Aswan', 'Asyut', 'Beheira', 'Beni Suef', 'Dakahlia',
    'Damietta', 'Faiyum', 'Gharbia', 'Ismailia', 'Kafr el-Sheikh',
    'Matrouh', 'Minya', 'Monufia', 'New Valley', 'North Sinai',
    'Qena', 'Red Sea', 'Sharqia', 'Sohag', 'South Sinai'
  ]

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading checkout...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-12 h-12 bg-[#007AFF] rounded-xl flex items-center justify-center text-white font-bold text-lg">
                HN
              </div>
              <div>
                <h1 className="text-xl font-bold text-[#1D1D1F]">H.N Laptop Store</h1>
                <p className="text-sm text-[#86868B]">Premium Laptops</p>
              </div>
            </Link>
            
            <nav className="flex gap-6 items-center">
              <Link href="/cart" className="text-gray-700 hover:text-[#007AFF] transition-colors">← Back to Cart</Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-8">
          <Link href="/" className="hover:text-[#007AFF]">Home</Link>
          <span>/</span>
          <Link href="/cart" className="hover:text-[#007AFF]">Cart</Link>
          <span>/</span>
          <span className="text-gray-900">Checkout</span>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Personal Information */}
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Personal Information</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.firstName ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.lastName ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.email ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="01xxxxxxxxx"
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.phone ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Shipping Address</h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Address *
                    </label>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      rows={3}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.address ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Street address, building number, apartment number..."
                    />
                    {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        City *
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          errors.city ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Governorate *
                      </label>
                      <select
                        name="governorate"
                        value={formData.governorate}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          errors.governorate ? 'border-red-500' : 'border-gray-300'
                        }`}
                      >
                        <option value="">Select Governorate</option>
                        {egyptianGovernorates.map(gov => (
                          <option key={gov} value={gov}>{gov}</option>
                        ))}
                      </select>
                      {errors.governorate && <p className="text-red-500 text-sm mt-1">{errors.governorate}</p>}
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Payment Method</h2>
                
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <label className="flex items-center gap-3 p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="cash"
                        checked={formData.paymentMethod === 'cash'}
                        onChange={handleInputChange}
                        className="text-blue-600"
                      />
                      <div>
                        <p className="font-medium">Cash on Delivery</p>
                        <p className="text-sm text-gray-600">Pay when you receive your order</p>
                      </div>
                    </label>
                    
                    <label className="flex items-center gap-3 p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="card"
                        checked={formData.paymentMethod === 'card'}
                        onChange={handleInputChange}
                        className="text-blue-600"
                      />
                      <div>
                        <p className="font-medium">Credit/Debit Card</p>
                        <p className="text-sm text-gray-600">Secure online payment</p>
                      </div>
                    </label>
                  </div>

                  {formData.paymentMethod === 'card' && (
                    <div className="mt-6 p-4 bg-gray-50 rounded-lg space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Card Number *
                        </label>
                        <input
                          type="text"
                          name="cardNumber"
                          value={formData.cardNumber}
                          onChange={handleInputChange}
                          placeholder="1234 5678 9012 3456"
                          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                            errors.cardNumber ? 'border-red-500' : 'border-gray-300'
                          }`}
                        />
                        {errors.cardNumber && <p className="text-red-500 text-sm mt-1">{errors.cardNumber}</p>}
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Expiry Date *
                          </label>
                          <input
                            type="text"
                            name="expiryDate"
                            value={formData.expiryDate}
                            onChange={handleInputChange}
                            placeholder="MM/YY"
                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                              errors.expiryDate ? 'border-red-500' : 'border-gray-300'
                            }`}
                          />
                          {errors.expiryDate && <p className="text-red-500 text-sm mt-1">{errors.expiryDate}</p>}
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            CVV *
                          </label>
                          <input
                            type="text"
                            name="cvv"
                            value={formData.cvv}
                            onChange={handleInputChange}
                            placeholder="123"
                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                              errors.cvv ? 'border-red-500' : 'border-gray-300'
                            }`}
                          />
                          {errors.cvv && <p className="text-red-500 text-sm mt-1">{errors.cvv}</p>}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Order Notes */}
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Order Notes (Optional)</h2>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Any special instructions for your order..."
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#007AFF] text-white py-4 rounded-xl font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Processing Order...
                  </>
                ) : (
                  `Place Order - $${total.toFixed(2)}`
                )}
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center gap-3">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={50}
                      height={50}
                      className="rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <p className="font-medium text-sm">{item.name}</p>
                      <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>
              
              <div className="space-y-3 mb-6 pt-4 border-t border-gray-200">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">
                    {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between text-lg font-bold pt-3 border-t border-gray-200">
                  <span>Total</span>
                  <span className="text-[#007AFF]">${total.toFixed(2)}</span>
                </div>
              </div>

              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Free delivery on orders $1000+</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  <span>2-year warranty included</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  <span>24/7 WhatsApp support</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}