'use client'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { getCart, updateCartItem, clearCart } from '../data/products'
import { fetchProductsByIds, createOrder } from '../data/db'
import { useToast } from '../components/ToastProvider'
import Header from '../components/Header'

export default function CartPage() {
  const router = useRouter()
  const { showToast } = useToast()
  const [items, setItems] = React.useState(getCart())
  const [loading, setLoading] = React.useState(true)
  const [detailed, setDetailed] = React.useState<any[]>([])
  const [name, setName] = React.useState('')
  const [phone, setPhone] = React.useState('')
  const [address, setAddress] = React.useState('')
  const [isPlacing, setIsPlacing] = React.useState(false)

  React.useEffect(() => {
    async function load() {
      setLoading(true)
      try {
        const ids = items.map(i => i.productId)
        const products = await fetchProductsByIds(ids)
        const joined = items.map(i => ({ ...i, product: products.find(p => p.id === i.productId) })).filter(i => i.product)
        setDetailed(joined as any)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [items])

  const subtotal = detailed.reduce((sum, i) => sum + i.product.price * i.qty, 0)

  const updateQty = (productId: number, qty: number) => {
    updateCartItem(productId, qty)
    setItems(getCart())
    showToast('Cart updated successfully', 'success')
  }

  const removeItem = (productId: number) => {
    updateCartItem(productId, 0)
    setItems(getCart())
    showToast('Item removed from cart', 'info')
  }

  const checkout = async () => {
    if (!name || !phone || !address) { 
      showToast('Please fill in all required fields', 'warning')
      return 
    }
    setIsPlacing(true)
    try {
      const order = await createOrder({
        customer_name: name,
        phone,
        address,
        items: detailed.map(i => ({ product_id: i.product.id, qty: i.qty, price: i.product.price }))
      })
      clearCart()
      setItems([])
      setDetailed([])
      showToast('Order placed successfully!', 'success')
      router.push(`/cart/success?orderId=${order.id}`)
    } catch (e) {
      showToast('Failed to place order. Please try again.', 'error')
    } finally {
      setIsPlacing(false)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="container mx-auto px-4 py-10 pt-32">
        <h1 className="text-3xl font-bold mb-6 text-[#1D1D1F]">Your Cart</h1>

        {loading ? (
          <div className="text-[#86868B]">Loading cart...</div>
        ) : detailed.length === 0 ? (
          <div className="text-[#86868B]">
            Cart is empty. <Link className="text-[#007AFF]" href="/products">Browse products</Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {detailed.map(({ product, qty }) => {
                const img = product.images?.[0] || 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=1200&auto=format&fit=crop'
                return (
                  <div key={product.id} className="flex gap-4 p-4 border rounded-xl items-center">
                    <div className="relative w-24 h-24 rounded-lg overflow-hidden">
                      <Image src={img} alt={product.name} fill className="object-cover" />
                    </div>
                    <div className="flex-1">
                      <Link href={`/products/${product.id}`} className="font-semibold text-[#1D1D1F] hover:text-[#007AFF]">{product.name}</Link>
                      <p className="text-sm text-[#86868B]">{product.specs}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="px-3 py-1 border rounded-lg" onClick={()=>updateQty(product.id, Math.max(0, qty-1))}>-</button>
                      <span className="w-8 text-center">{qty}</span>
                      <button className="px-3 py-1 border rounded-lg" onClick={()=>updateQty(product.id, qty+1)}>+</button>
                    </div>
                    <div className="w-24 text-right font-semibold">${(product.price*qty).toFixed(2)}</div>
                  </div>
                )
              })}
            </div>
            <div className="p-6 border rounded-xl h-fit">
              <h2 className="font-semibold mb-4">Order Summary</h2>
              <div className="flex justify-between mb-2 text-sm">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-2 text-sm">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between font-semibold text-lg border-t pt-3 mt-3">
                <span>Total</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>

              <div className="mt-6 space-y-3">
                <input className="w-full px-3 py-2 border rounded-lg" placeholder="Full name" value={name} onChange={e=>setName(e.target.value)} />
                <input className="w-full px-3 py-2 border rounded-lg" placeholder="Phone number" value={phone} onChange={e=>setPhone(e.target.value)} />
                <textarea className="w-full px-3 py-2 border rounded-lg" placeholder="Delivery address" value={address} onChange={e=>setAddress(e.target.value)} rows={3} />
                <button className="btn-accent w-full mt-2 py-3 rounded-xl font-semibold disabled:opacity-60" onClick={checkout} disabled={isPlacing}>
                  {isPlacing ? 'Placing order...' : 'Checkout (Cash on Delivery)'}
                </button>
                <Link href="/payment" className="block w-full text-center px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 transition-all">
                  Choose Payment Method
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}


