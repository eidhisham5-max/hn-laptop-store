'use client'
import React from 'react'
import Link from 'next/link'

export default function CartBadge() {
  const [count, setCount] = React.useState(0)
  React.useEffect(() => {
    const key = 'hn_cart'
    const update = () => {
      try {
        const raw = localStorage.getItem(key)
        const items = raw ? JSON.parse(raw) : []
        const total = Array.isArray(items) ? items.reduce((s: number, i: any) => s + (i.qty || 0), 0) : 0
        setCount(total)
      } catch {
        setCount(0)
      }
    }
    update()
    const onStorage = (e: StorageEvent) => { if (e.key === key) update() }
    const onCustom = () => update()
    window.addEventListener('storage', onStorage)
    window.addEventListener('cart-changed', onCustom as any)
    const interval = setInterval(update, 1500)
    return () => { window.removeEventListener('storage', onStorage); window.removeEventListener('cart-changed', onCustom as any); clearInterval(interval) }
  }, [])

  return (
    <Link href="/cart" className="relative inline-flex items-center">
      <span className="text-2xl">🛒</span>
      {count > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs px-2 py-0.5 rounded-full">{count}</span>
      )}
    </Link>
  )
}
