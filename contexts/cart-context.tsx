'use client'

import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react'
import { Product, CartItem, Cart } from '@/lib/types'
import { createLocalStorage } from '@/lib/utils'

// Cart action types
type CartAction =
  | { type: 'ADD_ITEM'; payload: { product: Product; quantity: number; selectedOptions?: Record<string, string> } }
  | { type: 'REMOVE_ITEM'; payload: { productId: string } }
  | { type: 'UPDATE_QUANTITY'; payload: { productId: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'LOAD_CART'; payload: { cart: Cart } }
  | { type: 'SET_LOADING'; payload: { loading: boolean } }
  | { type: 'SET_ERROR'; payload: { error: string | null } }

// Cart state interface
interface CartState {
  cart: Cart | null
  items: CartItem[]
  totalItems: number
  subtotal: number
  discount: number
  shipping: number
  tax: number
  total: number
  loading: boolean
  error: string | null
}

// Initial state
const initialState: CartState = {
  cart: null,
  items: [],
  totalItems: 0,
  subtotal: 0,
  discount: 0,
  shipping: 0,
  tax: 0,
  total: 0,
  loading: false,
  error: null,
}

// Cart reducer
function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const { product, quantity, selectedOptions = {} } = action.payload
      const existingItemIndex = state.items.findIndex(
        item => item.productId === product.id && 
        JSON.stringify(item.selectedOptions) === JSON.stringify(selectedOptions)
      )

      let newItems: CartItem[]
      if (existingItemIndex >= 0) {
        newItems = state.items.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      } else {
        const newItem: CartItem = {
          id: `${product.id}-${Date.now()}`,
          productId: product.id,
          product,
          quantity,
          selectedOptions,
          createdAt: new Date(),
          updatedAt: new Date(),
        }
        newItems = [...state.items, newItem]
      }

      return {
        ...state,
        items: newItems,
        totalItems: newItems.reduce((sum, item) => sum + item.quantity, 0),
        subtotal: newItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0),
        error: null,
      }
    }

    case 'REMOVE_ITEM': {
      const newItems = state.items.filter(item => item.productId !== action.payload.productId)
      return {
        ...state,
        items: newItems,
        totalItems: newItems.reduce((sum, item) => sum + item.quantity, 0),
        subtotal: newItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0),
        error: null,
      }
    }

    case 'UPDATE_QUANTITY': {
      const { productId, quantity } = action.payload
      if (quantity <= 0) {
        return cartReducer(state, { type: 'REMOVE_ITEM', payload: { productId } })
      }

      const newItems = state.items.map(item =>
        item.productId === productId
          ? { ...item, quantity, updatedAt: new Date() }
          : item
      )

      return {
        ...state,
        items: newItems,
        totalItems: newItems.reduce((sum, item) => sum + item.quantity, 0),
        subtotal: newItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0),
        error: null,
      }
    }

    case 'CLEAR_CART':
      return {
        ...state,
        items: [],
        totalItems: 0,
        subtotal: 0,
        discount: 0,
        shipping: 0,
        tax: 0,
        total: 0,
        error: null,
      }

    case 'LOAD_CART':
      return {
        ...state,
        cart: action.payload.cart,
        items: action.payload.cart.items,
        totalItems: action.payload.cart.totalItems,
        subtotal: action.payload.cart.subtotal,
        discount: action.payload.cart.discount,
        shipping: action.payload.cart.shipping,
        tax: action.payload.cart.tax,
        total: action.payload.cart.total,
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

// Cart context interface
interface CartContextType {
  state: CartState
  addItem: (product: Product, quantity?: number, selectedOptions?: Record<string, string>) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  getItemQuantity: (productId: string) => number
  isInCart: (productId: string) => boolean
  getItem: (productId: string) => CartItem | undefined
  calculateTotals: () => void
  applyDiscount: (code: string) => Promise<boolean>
  removeDiscount: () => void
  setShipping: (method: string, cost: number) => void
  setTax: (rate: number) => void
}

// Create context
const CartContext = createContext<CartContextType | undefined>(undefined)

// Cart provider component
interface CartProviderProps {
  children: ReactNode
}

export function CartProvider({ children }: CartProviderProps) {
  const [state, dispatch] = useReducer(cartReducer, initialState)
  const cartStorage = createLocalStorage<Cart>('hn_cart', {
    id: '',
    sessionId: '',
    items: [],
    totalItems: 0,
    subtotal: 0,
    discount: 0,
    shipping: 0,
    tax: 0,
    total: 0,
    currency: 'SAR',
    createdAt: new Date(),
    updatedAt: new Date(),
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
  })

  // Load cart from localStorage on mount
  useEffect(() => {
    const loadCart = () => {
      try {
        const savedCart = cartStorage.get()
        if (savedCart && savedCart.items.length > 0) {
          dispatch({ type: 'LOAD_CART', payload: { cart: savedCart } })
        }
      } catch (error) {
        console.error('Failed to load cart:', error)
        dispatch({ type: 'SET_ERROR', payload: { error: 'Failed to load cart' } })
      }
    }

    loadCart()
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (state.items.length > 0) {
      const cart: Cart = {
        id: state.cart?.id || `cart_${Date.now()}`,
        sessionId: state.cart?.sessionId || `session_${Date.now()}`,
        items: state.items,
        totalItems: state.totalItems,
        subtotal: state.subtotal,
        discount: state.discount,
        shipping: state.shipping,
        tax: state.tax,
        total: state.total,
        currency: 'SAR',
        createdAt: state.cart?.createdAt || new Date(),
        updatedAt: new Date(),
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
      }
      cartStorage.set(cart)
    } else {
      cartStorage.remove()
    }
  }, [state.items, state.totalItems, state.subtotal, state.discount, state.shipping, state.tax, state.total])

  // Calculate totals whenever items change
  useEffect(() => {
    calculateTotals()
  }, [state.items, state.discount, state.shipping, state.tax])

  // Cart actions
  const addItem = (product: Product, quantity: number = 1, selectedOptions: Record<string, string> = {}) => {
    dispatch({ type: 'ADD_ITEM', payload: { product, quantity, selectedOptions } })
  }

  const removeItem = (productId: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { productId } })
  }

  const updateQuantity = (productId: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { productId, quantity } })
  }

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' })
  }

  const getItemQuantity = (productId: string): number => {
    const item = state.items.find(item => item.productId === productId)
    return item ? item.quantity : 0
  }

  const isInCart = (productId: string): boolean => {
    return state.items.some(item => item.productId === productId)
  }

  const getItem = (productId: string): CartItem | undefined => {
    return state.items.find(item => item.productId === productId)
  }

  const calculateTotals = () => {
    const subtotal = state.items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0)
    const tax = subtotal * 0.15 // 15% VAT
    const total = subtotal - state.discount + state.shipping + tax

    // Update state if values have changed
    if (subtotal !== state.subtotal || tax !== state.tax || total !== state.total) {
      dispatch({
        type: 'LOAD_CART',
        payload: {
          cart: {
            ...state.cart!,
            subtotal,
            tax,
            total,
            updatedAt: new Date(),
          }
        }
      })
    }
  }

  const applyDiscount = async (code: string): Promise<boolean> => {
    try {
      dispatch({ type: 'SET_LOADING', payload: { loading: true } })
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Mock discount codes
      const discountCodes: Record<string, number> = {
        'WELCOME10': 0.1,
        'SAVE20': 0.2,
        'NEWUSER': 0.15,
        'FLASH50': 0.5,
      }

      const discountRate = discountCodes[code.toUpperCase()]
      if (discountRate) {
        const discount = state.subtotal * discountRate
        dispatch({
          type: 'LOAD_CART',
          payload: {
            cart: {
              ...state.cart!,
              discount,
              updatedAt: new Date(),
            }
          }
        })
        return true
      } else {
        dispatch({ type: 'SET_ERROR', payload: { error: 'Invalid discount code' } })
        return false
      }
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: { error: 'Failed to apply discount' } })
      return false
    }
  }

  const removeDiscount = () => {
    dispatch({
      type: 'LOAD_CART',
      payload: {
        cart: {
          ...state.cart!,
          discount: 0,
          updatedAt: new Date(),
        }
      }
    })
  }

  const setShipping = (method: string, cost: number) => {
    dispatch({
      type: 'LOAD_CART',
      payload: {
        cart: {
          ...state.cart!,
          shipping: cost,
          updatedAt: new Date(),
        }
      }
    })
  }

  const setTax = (rate: number) => {
    const tax = state.subtotal * rate
    dispatch({
      type: 'LOAD_CART',
      payload: {
        cart: {
          ...state.cart!,
          tax,
          updatedAt: new Date(),
        }
      }
    })
  }

  const value: CartContextType = {
    state,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    getItemQuantity,
    isInCart,
    getItem,
    calculateTotals,
    applyDiscount,
    removeDiscount,
    setShipping,
    setTax,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

// Custom hook to use cart context
export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}

// Cart hooks for specific functionality
export function useCartItems() {
  const { state } = useCart()
  return state.items
}

export function useCartTotal() {
  const { state } = useCart()
  return {
    items: state.totalItems,
    subtotal: state.subtotal,
    discount: state.discount,
    shipping: state.shipping,
    tax: state.tax,
    total: state.total,
  }
}

export function useCartActions() {
  const { addItem, removeItem, updateQuantity, clearCart } = useCart()
  return { addItem, removeItem, updateQuantity, clearCart }
}

export function useCartItem(productId: string) {
  const { getItem, getItemQuantity, isInCart } = useCart()
  return {
    item: getItem(productId),
    quantity: getItemQuantity(productId),
    isInCart: isInCart(productId),
  }
}

