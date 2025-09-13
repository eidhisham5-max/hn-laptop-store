'use client'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { fetchOrdersByPhone } from '../data/db'

export default function AccountPage() {
  const [phone, setPhone] = useState('')
  const [orders, setOrders] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Check if user is logged in (for demo purposes)
    const isAdmin = localStorage.getItem('isAdmin')
    const userEmail = localStorage.getItem('userEmail')
    if (isAdmin && userEmail) {
      setIsLoggedIn(true)
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('isAdmin')
    localStorage.removeItem('userEmail')
    setIsLoggedIn(false)
    router.push('/')
  }

  const handleSearchOrders = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!phone.trim()) return

    setIsLoading(true)
    setError('')
    try {
      const userOrders = await fetchOrdersByPhone(phone)
      setOrders(userOrders)
    } catch {
      console.error('Failed to fetch orders')
      setError('Failed to load orders. Please try again.')
      setOrders([])
    } finally {
      setIsLoading(false)
    }
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full text-center">
          <h1 className="text-2xl font-bold text-[#1D1D1F] mb-4">Access Required</h1>
          <p className="text-[#86868B] mb-6">Please log in to access your account</p>
          <Link
            href="/login"
            className="inline-block px-6 py-3 bg-[#007AFF] text-white rounded-lg hover:bg-[#0056CC] transition-colors"
          >
            Sign In
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 py-10">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-[#1D1D1F]">My Account</h1>
            <p className="text-[#86868B] mt-2">Manage your orders and account settings</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Account Info */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl border shadow-sm p-6">
                <h2 className="text-xl font-semibold text-[#1D1D1F] mb-4">Account Information</h2>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm text-[#86868B]">Email</label>
                    <p className="text-[#1D1D1F]">{localStorage.getItem('userEmail')}</p>
                  </div>
                  <div>
                    <label className="text-sm text-[#86868B]">Role</label>
                    <p className="text-[#1D1D1F]">Administrator</p>
                  </div>
                </div>
                <div className="mt-6 space-y-3">
                  <Link
                    href="/admin"
                    className="block w-full text-center px-4 py-2 bg-[#007AFF] text-white rounded-lg hover:bg-[#0056CC] transition-colors"
                  >
                    Admin Panel
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            </div>

            {/* Order Search */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl border shadow-sm p-6">
                <h2 className="text-xl font-semibold text-[#1D1D1F] mb-4">Order Lookup</h2>
                <p className="text-[#86868B] mb-6">Search for orders by phone number</p>

                <form onSubmit={handleSearchOrders} className="mb-6">
                  <div className="flex gap-4">
                    <input
                      type="tel"
                      placeholder="Enter phone number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#007AFF] focus:border-[#007AFF]"
                      required
                    />
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="px-6 py-2 bg-[#007AFF] text-white rounded-lg hover:bg-[#0056CC] disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoading ? 'Searching...' : 'Search'}
                    </button>
                  </div>
                </form>

                {error && (
                  <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg">
                    {error}
                  </div>
                )}

                {orders.length > 0 && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-[#1D1D1F]">Found {orders.length} order(s)</h3>
                    {orders.map((order) => (
                      <div key={order.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="font-semibold text-[#1D1D1F]">Order #{order.id}</h4>
                            <p className="text-sm text-[#86868B]">
                              {new Date(order.created_at).toLocaleDateString()}
                            </p>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            order.status === 'Completed' ? 'bg-green-100 text-green-800' :
                            order.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {order.status}
                          </span>
                        </div>
                        <div className="text-sm text-[#86868B] mb-2">
                          <p><strong>Customer:</strong> {order.customer_name}</p>
                          <p><strong>Phone:</strong> {order.phone}</p>
                          <p><strong>Total:</strong> ${order.total}</p>
                        </div>
                        <div className="text-sm">
                          <p><strong>Items:</strong></p>
                          <ul className="list-disc list-inside ml-2">
                            {order.order_items?.map((item: any, index: number) => (
                              <li key={index}>
                                {item.product_name} x{item.qty} - ${item.price}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {orders.length === 0 && phone && !isLoading && (
                  <div className="text-center py-8 text-[#86868B]">
                    <p>No orders found for this phone number</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
