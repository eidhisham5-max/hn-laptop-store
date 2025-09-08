'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [userType, setUserType] = useState('customer')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleLogin = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    setTimeout(() => {
      if (userType === 'admin' && email === 'admin@hnstore.com' && password === 'admin123') {
        if (typeof window !== 'undefined') {
          localStorage.setItem('userType', 'admin')
          localStorage.setItem('isLoggedIn', 'true')
          localStorage.setItem('userEmail', email)
        }
        router.push('/admin')
      } else if (userType === 'customer' && email === 'customer@test.com' && password === 'customer123') {
        if (typeof window !== 'undefined') {
          localStorage.setItem('userType', 'customer')
          localStorage.setItem('isLoggedIn', 'true')
          localStorage.setItem('userEmail', email)
        }
        router.push('/dashboard')
      } else {
        setError('Invalid email or password')
      }
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem'
    }}>
      <div style={{
        background: 'white',
        borderRadius: '1rem',
        padding: '2rem',
        width: '100%',
        maxWidth: '400px',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{
            width: '4rem',
            height: '4rem',
            background: '#2563eb',
            borderRadius: '1rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1rem',
            fontSize: '1.5rem',
            color: 'white',
            fontWeight: 'bold'
          }}>
            HN
          </div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#111827', margin: 0 }}>
            H.N Laptop Store
          </h1>
          <p style={{ color: '#6b7280', fontSize: '0.875rem', margin: '0.5rem 0 0' }}>
            Sign in to your account
          </p>
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{
            display: 'flex',
            background: '#f3f4f6',
            borderRadius: '0.5rem',
            padding: '0.25rem'
          }}>
            <button
              type="button"
              onClick={() => {
                setUserType('customer')
                setEmail('')
                setPassword('')
              }}
              style={{
                flex: 1,
                padding: '0.75rem',
                borderRadius: '0.375rem',
                border: 'none',
                background: userType === 'customer' ? '#2563eb' : 'transparent',
                color: userType === 'customer' ? 'white' : '#6b7280',
                fontWeight: '500',
                cursor: 'pointer'
              }}
            >
              Customer
            </button>
            <button
              type="button"
              onClick={() => {
                setUserType('admin')
                setEmail('')
                setPassword('')
              }}
              style={{
                flex: 1,
                padding: '0.75rem',
                borderRadius: '0.375rem',
                border: 'none',
                background: userType === 'admin' ? '#dc2626' : 'transparent',
                color: userType === 'admin' ? 'white' : '#6b7280',
                fontWeight: '500',
                cursor: 'pointer'
              }}
            >
              Admin
            </button>
          </div>
        </div>

        <div style={{ 
          background: '#f8fafc', 
          padding: '1rem', 
          borderRadius: '0.5rem', 
          marginBottom: '1.5rem',
          fontSize: '0.75rem',
          color: '#6b7280'
        }}>
          <p style={{ margin: '0 0 0.5rem', fontWeight: '600', color: '#374151' }}>Demo Credentials:</p>
          {userType === 'admin' ? (
            <>
              <p style={{ margin: 0 }}>Email: admin@hnstore.com</p>
              <p style={{ margin: 0 }}>Password: admin123</p>
            </>
          ) : (
            <>
              <p style={{ margin: 0 }}>Email: customer@test.com</p>
              <p style={{ margin: 0 }}>Password: customer123</p>
            </>
          )}
        </div>

        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ 
              display: 'block', 
              fontSize: '0.875rem', 
              fontWeight: '500', 
              color: '#374151', 
              marginBottom: '0.5rem' 
            }}>
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #d1d5db',
                borderRadius: '0.5rem',
                fontSize: '0.875rem',
                boxSizing: 'border-box'
              }}
              placeholder={userType === 'admin' ? 'admin@hnstore.com' : 'customer@test.com'}
            />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ 
              display: 'block', 
              fontSize: '0.875rem', 
              fontWeight: '500', 
              color: '#374151', 
              marginBottom: '0.5rem' 
            }}>
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #d1d5db',
                borderRadius: '0.5rem',
                fontSize: '0.875rem',
                boxSizing: 'border-box'
              }}
              placeholder={userType === 'admin' ? 'admin123' : 'customer123'}
            />
          </div>

          {error && (
            <div style={{ 
              background: '#fee2e2', 
              color: '#dc2626', 
              padding: '0.75rem', 
              borderRadius: '0.5rem', 
              marginBottom: '1rem',
              fontSize: '0.875rem'
            }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            style={{
              width: '100%',
              padding: '0.75rem',
              background: userType === 'admin' ? '#dc2626' : '#2563eb',
              color: 'white',
              border: 'none',
              borderRadius: '0.5rem',
              fontSize: '0.875rem',
              fontWeight: '500',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              opacity: isLoading ? 0.6 : 1
            }}
          >
            {isLoading ? 'Signing in...' : `Sign in as ${userType === 'admin' ? 'Admin' : 'Customer'}`}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
          <a href="/" style={{
            color: '#6b7280',
            fontSize: '0.875rem',
            textDecoration: 'none'
          }}>
            ← Back to Store
          </a>
        </div>
      </div>
    </div>
  )
}
