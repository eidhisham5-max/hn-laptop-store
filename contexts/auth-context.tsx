'use client'

import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react'
import { User, AuthTokens } from '@/lib/types'
import { createLocalStorage } from '@/lib/utils'

// Auth action types
type AuthAction =
  | { type: 'LOGIN_START' }
  | { type: 'LOGIN_SUCCESS'; payload: { user: User; tokens: AuthTokens } }
  | { type: 'LOGIN_FAILURE'; payload: { error: string } }
  | { type: 'LOGOUT' }
  | { type: 'REFRESH_TOKEN'; payload: { tokens: AuthTokens } }
  | { type: 'UPDATE_USER'; payload: { user: Partial<User> } }
  | { type: 'SET_LOADING'; payload: { loading: boolean } }
  | { type: 'SET_ERROR'; payload: { error: string | null } }

// Auth state interface
interface AuthState {
  user: User | null
  tokens: AuthTokens | null
  isAuthenticated: boolean
  loading: boolean
  error: string | null
}

// Initial state
const initialState: AuthState = {
  user: null,
  tokens: null,
  isAuthenticated: false,
  loading: true,
  error: null,
}

// Auth reducer
function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'LOGIN_START':
      return {
        ...state,
        loading: true,
        error: null,
      }

    case 'LOGIN_SUCCESS':
      return {
        ...state,
        user: action.payload.user,
        tokens: action.payload.tokens,
        isAuthenticated: true,
        loading: false,
        error: null,
      }

    case 'LOGIN_FAILURE':
      return {
        ...state,
        user: null,
        tokens: null,
        isAuthenticated: false,
        loading: false,
        error: action.payload.error,
      }

    case 'LOGOUT':
      return {
        ...state,
        user: null,
        tokens: null,
        isAuthenticated: false,
        loading: false,
        error: null,
      }

    case 'REFRESH_TOKEN':
      return {
        ...state,
        tokens: action.payload.tokens,
        loading: false,
        error: null,
      }

    case 'UPDATE_USER':
      return {
        ...state,
        user: state.user ? { ...state.user, ...action.payload.user } : null,
        loading: false,
        error: null,
      }

    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload.loading,
      }

    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload.error,
        loading: false,
      }

    default:
      return state
  }
}

// Auth context interface
interface AuthContextType {
  state: AuthState
  login: (email: string, password: string, rememberMe?: boolean) => Promise<boolean>
  register: (userData: RegisterData) => Promise<boolean>
  logout: () => void
  refreshToken: () => Promise<boolean>
  updateUser: (userData: Partial<User>) => Promise<boolean>
  changePassword: (currentPassword: string, newPassword: string) => Promise<boolean>
  resetPassword: (email: string) => Promise<boolean>
  confirmResetPassword: (token: string, newPassword: string) => Promise<boolean>
  verifyEmail: (token: string) => Promise<boolean>
  resendVerification: () => Promise<boolean>
  clearError: () => void
}

// Register data interface
interface RegisterData {
  firstName: string
  lastName: string
  email: string
  phone: string
  password: string
  confirmPassword: string
  acceptTerms: boolean
}

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Auth provider component
interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [state, dispatch] = useReducer(authReducer, initialState)
  const userStorage = createLocalStorage<User | null>('hn_user', null)
  const tokensStorage = createLocalStorage<AuthTokens | null>('hn_tokens', null)

  // Load user and tokens from localStorage on mount
  useEffect(() => {
    const loadAuthData = () => {
      try {
        const user = userStorage.get()
        const tokens = tokensStorage.get()
        
        if (user && tokens) {
          // Check if tokens are expired
          if (tokens.expiresIn && Date.now() < tokens.expiresIn) {
            dispatch({ type: 'LOGIN_SUCCESS', payload: { user, tokens } })
          } else {
            // Try to refresh token
            refreshToken()
          }
        } else {
          dispatch({ type: 'SET_LOADING', payload: { loading: false } })
        }
      } catch (error) {
        console.error('Failed to load auth data:', error)
        dispatch({ type: 'SET_ERROR', payload: { error: 'Failed to load authentication data' } })
      }
    }

    loadAuthData()
  }, [])

  // Save user and tokens to localStorage whenever they change
  useEffect(() => {
    if (state.user && state.tokens) {
      userStorage.set(state.user)
      tokensStorage.set(state.tokens)
    } else {
      userStorage.remove()
      tokensStorage.remove()
    }
  }, [state.user, state.tokens])

  // Auto-refresh token before expiration
  useEffect(() => {
    if (state.tokens?.expiresIn) {
      const timeUntilExpiry = state.tokens.expiresIn - Date.now()
      const refreshTime = timeUntilExpiry - 5 * 60 * 1000 // Refresh 5 minutes before expiry

      if (refreshTime > 0) {
        const timeout = setTimeout(() => {
          refreshToken()
        }, refreshTime)

        return () => clearTimeout(timeout)
      }
    }
  }, [state.tokens])

  // Auth actions
  const login = async (email: string, password: string, rememberMe: boolean = false): Promise<boolean> => {
    try {
      dispatch({ type: 'LOGIN_START' })

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))

      // Mock authentication
      if (email === 'admin@hnstore.com' && password === 'admin123') {
        const user: User = {
          id: '1',
          email: 'admin@hnstore.com',
          firstName: 'Admin',
          lastName: 'User',
          phone: '+966501234567',
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
          isEmailVerified: true,
          isPhoneVerified: true,
          role: 'admin',
          preferences: {
            language: 'ar',
            currency: 'SAR',
            timezone: 'Asia/Riyadh',
            notifications: {
              email: true,
              sms: true,
              push: true,
              marketing: true,
            },
            privacy: {
              profileVisibility: 'public',
              showEmail: false,
              showPhone: false,
            },
          },
          addresses: [],
          paymentMethods: [],
          orders: [],
          wishlist: [],
          recentlyViewed: [],
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        }

        const tokens: AuthTokens = {
          accessToken: 'mock_access_token',
          refreshToken: 'mock_refresh_token',
          expiresIn: Date.now() + (rememberMe ? 30 * 24 * 60 * 60 * 1000 : 24 * 60 * 60 * 1000), // 30 days or 1 day
          tokenType: 'Bearer',
        }

        dispatch({ type: 'LOGIN_SUCCESS', payload: { user, tokens } })
        return true
      } else {
        dispatch({ type: 'LOGIN_FAILURE', payload: { error: 'Invalid email or password' } })
        return false
      }
    } catch (error) {
      dispatch({ type: 'LOGIN_FAILURE', payload: { error: 'Login failed. Please try again.' } })
      return false
    }
  }

  const register = async (userData: RegisterData): Promise<boolean> => {
    try {
      dispatch({ type: 'LOGIN_START' })

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))

      // Mock registration
      const user: User = {
        id: Date.now().toString(),
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        phone: userData.phone,
        isEmailVerified: false,
        isPhoneVerified: false,
        role: 'customer',
        preferences: {
          language: 'ar',
          currency: 'SAR',
          timezone: 'Asia/Riyadh',
          notifications: {
            email: true,
            sms: true,
            push: true,
            marketing: true,
          },
          privacy: {
            profileVisibility: 'public',
            showEmail: false,
            showPhone: false,
          },
        },
        addresses: [],
        paymentMethods: [],
        orders: [],
        wishlist: [],
        recentlyViewed: [],
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      }

      const tokens: AuthTokens = {
        accessToken: 'mock_access_token',
        refreshToken: 'mock_refresh_token',
        expiresIn: Date.now() + 24 * 60 * 60 * 1000, // 1 day
        tokenType: 'Bearer',
      }

      dispatch({ type: 'LOGIN_SUCCESS', payload: { user, tokens } })
      return true
    } catch (error) {
      dispatch({ type: 'LOGIN_FAILURE', payload: { error: 'Registration failed. Please try again.' } })
      return false
    }
  }

  const logout = () => {
    dispatch({ type: 'LOGOUT' })
  }

  const refreshToken = async (): Promise<boolean> => {
    try {
      if (!state.tokens?.refreshToken) {
        dispatch({ type: 'LOGOUT' })
        return false
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500))

      const newTokens: AuthTokens = {
        accessToken: 'new_mock_access_token',
        refreshToken: 'new_mock_refresh_token',
        expiresIn: Date.now() + 24 * 60 * 60 * 1000, // 1 day
        tokenType: 'Bearer',
      }

      dispatch({ type: 'REFRESH_TOKEN', payload: { tokens: newTokens } })
      return true
    } catch (error) {
      dispatch({ type: 'LOGOUT' })
      return false
    }
  }

  const updateUser = async (userData: Partial<User>): Promise<boolean> => {
    try {
      dispatch({ type: 'SET_LOADING', payload: { loading: true } })

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))

      dispatch({ type: 'UPDATE_USER', payload: { user: userData } })
      return true
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: { error: 'Failed to update profile' } })
      return false
    }
  }

  const changePassword = async (currentPassword: string, newPassword: string): Promise<boolean> => {
    try {
      dispatch({ type: 'SET_LOADING', payload: { loading: true } })

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))

      dispatch({ type: 'SET_LOADING', payload: { loading: false } })
      return true
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: { error: 'Failed to change password' } })
      return false
    }
  }

  const resetPassword = async (email: string): Promise<boolean> => {
    try {
      dispatch({ type: 'SET_LOADING', payload: { loading: true } })

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))

      dispatch({ type: 'SET_LOADING', payload: { loading: false } })
      return true
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: { error: 'Failed to send reset email' } })
      return false
    }
  }

  const confirmResetPassword = async (token: string, newPassword: string): Promise<boolean> => {
    try {
      dispatch({ type: 'SET_LOADING', payload: { loading: true } })

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))

      dispatch({ type: 'SET_LOADING', payload: { loading: false } })
      return true
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: { error: 'Failed to reset password' } })
      return false
    }
  }

  const verifyEmail = async (token: string): Promise<boolean> => {
    try {
      dispatch({ type: 'SET_LOADING', payload: { loading: true } })

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))

      if (state.user) {
        dispatch({ type: 'UPDATE_USER', payload: { user: { isEmailVerified: true } } })
      }
      return true
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: { error: 'Failed to verify email' } })
      return false
    }
  }

  const resendVerification = async (): Promise<boolean> => {
    try {
      dispatch({ type: 'SET_LOADING', payload: { loading: true } })

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))

      dispatch({ type: 'SET_LOADING', payload: { loading: false } })
      return true
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: { error: 'Failed to resend verification email' } })
      return false
    }
  }

  const clearError = () => {
    dispatch({ type: 'SET_ERROR', payload: { error: null } })
  }

  const value: AuthContextType = {
    state,
    login,
    register,
    logout,
    refreshToken,
    updateUser,
    changePassword,
    resetPassword,
    confirmResetPassword,
    verifyEmail,
    resendVerification,
    clearError,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// Custom hook to use auth context
export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

// Auth hooks for specific functionality
export function useUser() {
  const { state } = useAuth()
  return state.user
}

export function useIsAuthenticated() {
  const { state } = useAuth()
  return state.isAuthenticated
}

export function useAuthLoading() {
  const { state } = useAuth()
  return state.loading
}

export function useAuthError() {
  const { state } = useAuth()
  return state.error
}

export function useAuthActions() {
  const { login, register, logout, updateUser, changePassword, resetPassword, confirmResetPassword, verifyEmail, resendVerification, clearError } = useAuth()
  return { login, register, logout, updateUser, changePassword, resetPassword, confirmResetPassword, verifyEmail, resendVerification, clearError }
}

