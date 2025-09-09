'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      // For now, we'll use a simple check for demo purposes
      // In production, this should use Supabase Auth
      if (email === 'admin@example.com' && password === 'admin123') {
        localStorage.setItem('isAdmin', 'true')
        localStorage.setItem('userType', 'admin')
        localStorage.setItem('isLoggedIn', 'true')
        localStorage.setItem('userEmail', email)
        router.push('/admin')
      } else {
        setError('Invalid credentials. Use admin@example.com / admin123 for demo')
      }
    } catch (err) {
      setError('Login failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold text-[#1D1D1F]">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-[#86868B]">
            Access the admin panel to manage products and orders
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-[#007AFF] focus:border-[#007AFF] focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-[#007AFF] focus:border-[#007AFF] focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm">
              {error}
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#007AFF] hover:bg-[#0056CC] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#007AFF] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                'Sign in'
              )}
            </button>
          </div>

          <div className="text-center">
            <div className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded-md text-sm">
              <p className="font-semibold">Demo Credentials:</p>
              <p>Email: admin@example.com</p>
              <p>Password: admin123</p>
            </div>
          </div>

          <div className="text-center">
            <Link
              href="/"
              className="font-medium text-[#007AFF] hover:text-[#0056CC]"
            >
              ← Back to store
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}