'use client'
import { useEffect, useState } from 'react'
// import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '../../supabaseClient'

interface AdminGuardProps {
  children: React.ReactNode
}

export default function AdminGuard({ children }: AdminGuardProps) {
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null)
  // const router = useRouter()
  const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL

  useEffect(() => {
    let mounted = true
    async function check() {
      try {
        const { data } = await supabase.auth.getSession()
        const email = data.session?.user?.email
        const allowed = !!email && (!adminEmail || email.toLowerCase() === adminEmail.toLowerCase())
        if (mounted) setIsAdmin(allowed)
      } catch {
        if (mounted) setIsAdmin(false)
      }
    }
    check()
    return () => { mounted = false }
  }, [adminEmail])

  if (isAdmin === null) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-gray-200 border-t-[#007AFF] rounded-full animate-spin"></div>
      </div>
    )
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full text-center">
          <div className="bg-red-50 border border-red-200 rounded-2xl p-8">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-red-800 mb-2">Access Denied</h1>
            <p className="text-red-600 mb-6">Sign in with an admin account to continue.</p>
            <div className="space-y-3">
              <Link
                href="/login"
                className="inline-block px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Sign In
              </Link>
              <div>
                <Link
                  href="/"
                  className="text-red-600 hover:text-red-700 font-medium"
                >
                  ← Back to store
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
