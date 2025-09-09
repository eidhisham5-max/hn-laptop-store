'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function CustomerDashboard() {
  const [userEmail, setUserEmail] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const userType = localStorage.getItem('userType')
    const isLoggedIn = localStorage.getItem('isLoggedIn')
    const email = localStorage.getItem('userEmail')
    
    if (!isLoggedIn || userType !== 'customer') {
      router.push('/login')
      return
    }
    
    setUserEmail(email || '')
    setIsLoading(false)
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem('userType')
    localStorage.removeItem('isLoggedIn')
    localStorage.removeItem('userEmail')
    router.push('/login')
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-gray-200 border-t-[#007AFF] rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 py-10">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 text-center">
            <h1 className="text-4xl font-bold text-[#1D1D1F] mb-4">
              Welcome to Your Dashboard!
            </h1>
            <p className="text-[#86868B] mb-8 text-lg">
              Hello, {userEmail}
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link 
                href="/products"
                className="px-6 py-3 bg-[#007AFF] text-white rounded-xl font-semibold hover:bg-[#0056CC] transition-colors shadow-lg hover:shadow-xl"
              >
                Browse Products
              </Link>
              <button 
                onClick={handleLogout}
                className="px-6 py-3 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700 transition-colors shadow-lg hover:shadow-xl"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
