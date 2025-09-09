'use client'
import React, { useMemo, useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { fetchProducts } from '../data/db'
import { addToCart } from '../data/products'
import { useToast } from '../components/ToastProvider'
import Header from '../components/Header'

export default function ProductsListingPage() {
  const { showToast } = useToast()
  const [all, setAll] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  const [q, setQ] = useState('')
  const [brand, setBrand] = useState<string|undefined>()
  const [category, setCategory] = useState<string|undefined>()
  const [min, setMin] = useState<number|undefined>()
  const [max, setMax] = useState<number|undefined>()
  const [hasDiscount, setHasDiscount] = useState(false)

  useEffect(() => {
    async function load() {
      setIsLoading(true)
      setError('')
      try {
        const p = await fetchProducts()
        setAll(p)
      } catch (e) {
        console.error('Failed to fetch products', e)
        setError('Failed to load products.')
        setAll([])
      } finally {
        setIsLoading(false)
      }
    }
    load()
  }, [])

  const brands = useMemo(() => Array.from(new Set(all.map(p => p.brand_name || p.brand?.name).filter(Boolean))), [all])
  const categories = useMemo(() => Array.from(new Set(all.map(p => p.category).filter(Boolean))) as string[], [all])

  const filtered = useMemo(() => {
    return all.filter(p => {
      if (q && !(`${p.name} ${p.specs}`.toLowerCase().includes(q.toLowerCase()))) return false
      if (brand && (p.brand_name || p.brand?.name) !== brand) return false
      if (category && p.category !== category) return false
      if (min !== undefined && p.price < min) return false
      if (max !== undefined && p.price > max) return false
      if (hasDiscount && !(p.discount && p.discount > 0)) return false
      return true
    })
  }, [all, q, brand, category, min, max, hasDiscount])

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-10 pt-32">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-[#1D1D1F]">Find your next laptop</h1>
          <p className="text-[#86868B] mt-2">Browse premium laptops with powerful specs and great prices.</p>
        </div>

        {/* Filters */}
        <div className="sticky top-[80px] z-10 mb-6">
          <div className="bg-white/90 backdrop-blur rounded-2xl border shadow-sm p-4 grid grid-cols-1 md:grid-cols-5 gap-3">
            <div className="md:col-span-2">
              <label className="block text-xs uppercase tracking-wide text-[#86868B] mb-1">Search</label>
              <input className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#007AFF]" value={q} onChange={e=>setQ(e.target.value)} placeholder="Search name/specs" />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wide text-[#86868B] mb-1">Brand</label>
              <select className="w-full px-3 py-2 border rounded-lg" value={brand ?? ''} onChange={e=>setBrand(e.target.value||undefined)}>
                <option value="">All</option>
                {brands.map((b: any) => <option key={b} value={b}>{b}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wide text-[#86868B] mb-1">Category</label>
              <select className="w-full px-3 py-2 border rounded-lg" value={category ?? ''} onChange={e=>setCategory(e.target.value||undefined)}>
                <option value="">All</option>
                {categories.map((c: any) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs uppercase tracking-wide text-[#86868B] mb-1">Min</label>
                <input type="number" className="w-full px-3 py-2 border rounded-lg" value={min ?? ''} onChange={e=>setMin(e.target.value?Number(e.target.value):undefined)} />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wide text-[#86868B] mb-1">Max</label>
                <input type="number" className="w-full px-3 py-2 border rounded-lg" value={max ?? ''} onChange={e=>setMax(e.target.value?Number(e.target.value):undefined)} />
              </div>
            </div>
            <label className="flex items-center gap-2 text-sm text-[#86868B] md:col-span-5">
              <input type="checkbox" checked={hasDiscount} onChange={e=>setHasDiscount(e.target.checked)} />
              With discount
            </label>
          </div>
        </div>

        {/* Content */}
        {isLoading ? (
          <div className="min-h-[40vh] flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-gray-200 border-t-[#007AFF] rounded-full animate-spin"></div>
          </div>
        ) : error ? (
          <div className="mb-4 p-4 rounded-2xl bg-red-50 text-red-600 border">{error}</div>
        ) : filtered.length === 0 ? (
          <div className="bg-white rounded-2xl border p-10 text-center text-[#86868B]">No products match your filters.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filtered.map(p => {
              const img = p.images?.[0] || 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=1200&auto=format&fit=crop'
              return (
                <div key={p.id} className="group bg-white rounded-2xl shadow-sm border hover:shadow-md transition-all overflow-hidden">
                  <Link href={`/products/${p.id}`}>
                    <div className="relative w-full h-56">
                      <Image src={img} alt={p.name} fill className="object-cover group-hover:scale-[1.02] transition-transform" />
                      {p.discount ? (
                        <span className="absolute top-3 left-3 bg-green-600 text-white text-xs px-2 py-0.5 rounded-full">-{p.discount}%</span>
                      ) : null}
                    </div>
                  </Link>
                  <div className="p-5">
                    <Link href={`/products/${p.id}`} className="block">
                      <h3 className="font-semibold text-lg mb-1 text-[#1D1D1F] group-hover:text-[#007AFF] transition-colors">{p.name}</h3>
                      <p className="text-sm text-[#86868B] mb-3 line-clamp-2">{p.specs}</p>
                    </Link>
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-xl font-bold text-[#007AFF]">${p.price}</span>
                      {p.original_price && (<span className="text-sm text-gray-400 line-through">${p.original_price}</span>)}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded">{p.brand_name || p.brand?.name}</span>
                      <button 
                        className="px-4 py-2 rounded-lg bg-[#007AFF] text-white hover:bg-[#0056CC] transition-colors" 
                        onClick={() => {
                          addToCart(p.id, 1)
                          showToast(`${p.name} added to cart!`, 'success')
                        }}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}


