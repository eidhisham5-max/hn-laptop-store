import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { allProducts, brandSlugToName, brandLogoUrlByName, brandNameToSlug, type Product } from '../../data/products'

type BrandPageProps = {
  params: { brand: string }
}

export default function BrandPage({ params }: BrandPageProps) {
  const brandName = brandSlugToName(params.brand)

  if (!brandName) {
    return (
      <div className="min-h-screen bg-white">
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-[#1D1D1F] mb-3">Brand not found</h1>
          <p className="text-[#86868B]">Please check the URL or choose a brand from the list.</p>
          <div className="mt-6">
            <Link href="/brands" className="btn-outline-accent px-6 py-2 rounded-xl font-semibold">Back to Brands</Link>
          </div>
        </div>
      </div>
    )
  }

  const brandProducts: Product[] = allProducts.filter((p) => p.brand === brandName)

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-10">
        <header className="flex items-center gap-4 mb-8">
          <div className="relative w-28 h-10 grayscale opacity-80">
            <Image src={brandLogoUrlByName[brandName]} alt={`${brandName} logo`} fill className="object-contain" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-[#1D1D1F]">{brandName} Laptops</h1>
            <p className="text-[#86868B]">{brandProducts.length} items</p>
          </div>
        </header>

        {brandProducts.length === 0 ? (
          <div className="text-center text-[#86868B] py-16">No products available for this brand yet.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {brandProducts.map((product) => (
              <div key={product.id} className="group bg-white rounded-2xl shadow-subtle border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300">
                <Link href={`/products/${product.id}`} className="block">
                  <div className="relative">
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={800}
                      height={600}
                      className="w-full h-48 object-cover"
                    />
                  </div>
                </Link>
                <div className="p-4">
                  <Link href={`/products/${product.id}`} className="block">
                    <h3 className="font-semibold text-lg text-[#1D1D1F] group-hover:text-[#007AFF]">{product.name}</h3>
                    <p className="text-sm text-[#86868B] mt-1">{product.category}</p>
                  </Link>
                  <div className="flex items-center gap-3 mt-3">
                    <span className="text-[#007AFF] font-bold text-xl">${product.price}</span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-400 line-through">${product.originalPrice}</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-10 text-center">
          <Link href="/brands" className="btn-outline-accent px-8 py-3 rounded-xl font-semibold inline-block">All Brands</Link>
        </div>
      </div>
    </div>
  )
}

