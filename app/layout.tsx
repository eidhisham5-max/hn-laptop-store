import React from 'react'
import type { Metadata } from 'next'
import { Inter, Poppins } from 'next/font/google'
import './globals.css'
import Link from 'next/link'
import CartBadge from './components/CartBadge'
import { ToastProvider } from './components/ToastProvider'

// Body font: Inter; Heading font: Poppins
const inter = Inter({ subsets: ['latin'], variable: '--font-body' })
const poppins = Poppins({ subsets: ['latin'], weight: ['400','600','700'], variable: '--font-heading' })

export const metadata: Metadata = {
  title: 'H.N Laptop Store - Premium Laptops at Best Prices',
  description: 'New & Refurbished laptops from Dell, HP, and Lenovo. Quality guaranteed with warranty support in Egypt.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${poppins.variable} antialiased bg-white text-[#1D1D1F]`}>
        <ToastProvider>
          <header className="sticky top-0 bg-white/90 backdrop-blur border-b z-40">
            <div className="container mx-auto px-4 py-3 flex items-center justify-between">
              <Link href="/" className="font-bold">H.N Laptop Store</Link>
              <nav className="flex items-center gap-5 text-sm">
                <Link href="/products">Products</Link>
                <Link href="/orders">Track Order</Link>
                <CartBadge />
              </nav>
            </div>
          </header>
          {children}
        </ToastProvider>
      </body>
    </html>
  )
}


