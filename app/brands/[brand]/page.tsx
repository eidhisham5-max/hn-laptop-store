'use client'
import React, { useMemo, useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { fetchProducts } from '../../data/db'
import { addToCart } from '../../data/products'
import { useToast } from '../../components/ToastProvider'

export default function BrandPage() {
  const params = useParams<{ brand: string }>()
  const { showToast } = useToast()
  const brand = (params?.brand || '').toString()
  const [priceMax, setPriceMax] = useState<number | undefined>(undefined)
  const [onlyDiscount, setOnlyDiscount] = useState(false)
  const [allProducts, setAllProducts] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function load() {
      setIsLoading(true)
      setError('')
      try {
        const products = await fetchProducts()
        setAllProducts(products)
      } catch (e) {
        console.error('Failed to fetch products', e)
        setError('Failed to load products.')
        setAllProducts([])
      } finally {
        setIsLoading(false)
      }
    }
    load()
  }, [])

  const products = useMemo(() => {
    let list = allProducts.filter(p => (p.brand_name || p.brand?.name)?.toLowerCase() === brand.toLowerCase())
    if (onlyDiscount) list = list.filter(p => p.discount && p.discount > 0)
    if (priceMax) list = list.filter(p => p.price <= priceMax)
    return list
  }, [allProducts, brand, priceMax, onlyDiscount])

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 py-10 pt-32">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-[#1D1D1F] capitalize">{brand} Laptops</h1>
          <p className="text-[#86868B] mt-2">Browse all {brand} products with advanced filtering</p>
        </div>

        {/* Filters */}
        <div className="bg-white/90 backdrop-blur rounded-2xl border shadow-sm p-4 mb-6">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <label className="text-sm text-[#86868B]">Max Price</label>
              <input 
                type="number" 
                min={0} 
                className="w-28 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#007AFF]" 
                value={priceMax ?? ''} 
                onChange={e=>setPriceMax(e.target.value?Number(e.target.value):undefined)} 
                placeholder="$0"
              />
            </div>
            <label className="flex items-center gap-2 text-sm text-[#86868B]">
              <input 
                type="checkbox" 
                checked={onlyDiscount} 
                onChange={e=>setOnlyDiscount(e.target.checked)}
                className="rounded"
              />
              With discount only
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
        ) : products.length === 0 ? (
          <div className="bg-white rounded-2xl border p-10 text-center text-[#86868B]">
            <p className="text-lg mb-2">No {brand} products found</p>
            <p className="text-sm">Try adjusting your filters or check back later</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map(product => {
              const img = product.images?.[0] || 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=1200&auto=format&fit=crop'
              return (
                <div key={product.id} className="group bg-white rounded-2xl shadow-sm border hover:shadow-md transition-all overflow-hidden">
                  <Link href={`/products/${product.id}`}>
                    <div className="relative w-full h-56">
                      <Image src={img} alt={product.name} fill className="object-cover group-hover:scale-[1.02] transition-transform" />
                      {product.discount ? (
                        <span className="absolute top-3 left-3 bg-green-600 text-white text-xs px-2 py-0.5 rounded-full">-{product.discount}%</span>
                      ) : null}
                    </div>
                  </Link>
                  <div className="p-5">
                    <Link href={`/products/${product.id}`} className="block">
                      <h3 className="font-semibold text-lg mb-1 text-[#1D1D1F] group-hover:text-[#007AFF] transition-colors">{product.name}</h3>
                      <p className="text-sm text-[#86868B] mb-3 line-clamp-2">{product.specs}</p>
                    </Link>
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-xl font-bold text-[#007AFF]">${product.price}</span>
                      {product.original_price && (<span className="text-sm text-gray-400 line-through">${product.original_price}</span>)}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded">{product.brand_name || product.brand?.name}</span>
                      <button 
                        className="px-4 py-2 rounded-lg bg-[#007AFF] text-white hover:bg-[#0056CC] transition-colors" 
                        onClick={() => {
                          addToCart(product.id, 1)
                          showToast(`${product.name} added to cart!`, 'success')
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


