'use client'
import React from 'react'
import Link from 'next/link'

export default function BrandsIndexPage() {
  const brands = ['Dell','HP','Lenovo','ASUS','Acer','MSI','Apple']
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">Brands</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {brands.map(b => (
          <Link key={b} href={`/brands/${b.toLowerCase()}`} className="border rounded-lg p-6 text-center hover:border-primary-300">
            {b}
          </Link>
        ))}
      </div>
    </div>
  )
}


