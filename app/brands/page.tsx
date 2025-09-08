import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { brands as supportedBrands, brandLogoUrlByName, brandNameToSlug } from '../data/products'

export default function BrandsIndexPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-12">
        <header className="mb-10 text-center">
          <h1 className="text-3xl font-bold text-[#1D1D1F]">Shop by Brand</h1>
          <p className="text-[#86868B] mt-1">Choose from top manufacturers</p>
        </header>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
          {supportedBrands.map((brand) => (
            <Link key={brand} href={`/brands/${brandNameToSlug(brand)}`} className="group block bg-white rounded-2xl border border-gray-100 p-6 shadow-subtle hover:shadow-md transition text-center">
              <div className="relative w-full h-10 mb-4 grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition">
                <Image src={brandLogoUrlByName[brand]} alt={`${brand} logo`} fill className="object-contain" />
              </div>
              <div className="font-semibold text-[#1D1D1F] group-hover:text-[#007AFF]">{brand}</div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

