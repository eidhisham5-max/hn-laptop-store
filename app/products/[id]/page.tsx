import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { allProducts } from '../../data/products'

type ProductPageProps = {
  params: { id: string }
}

export default function ProductDetailPage({ params }: ProductPageProps) {
  const id = Number(params.id)
  const product = allProducts.find((p) => p.id === id)

  if (!product) {
    return (
      <div className="min-h-screen bg-white">
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-[#1D1D1F] mb-2">Product not found</h1>
          <p className="text-[#86868B]">The product you are looking for does not exist.</p>
          <div className="mt-6">
            <Link href="/products" className="btn-outline-accent px-6 py-2 rounded-xl font-semibold">Back to Products</Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="relative w-full h-80 md:h-[28rem] rounded-2xl overflow-hidden border border-gray-100 shadow-subtle">
            <Image src={product.image} alt={product.name} fill className="object-cover" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-[#1D1D1F]">{product.name}</h1>
            <div className="text-[#86868B] mt-1">{product.brand} • {product.category}</div>
            <div className="flex items-center gap-3 mt-4">
              <span className="text-[#007AFF] font-bold text-3xl">${product.price}</span>
              {product.originalPrice && (
                <span className="text-gray-400 line-through">${product.originalPrice}</span>
              )}
            </div>
            <p className="text-[#1D1D1F] mt-6 leading-relaxed">{product.specs}</p>
            <div className="mt-6 flex gap-3">
              <button className="btn-accent px-6 py-3 rounded-xl font-semibold">Add to Cart</button>
              <Link href="/products" className="btn-outline-accent px-6 py-3 rounded-xl font-semibold">Continue Shopping</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

