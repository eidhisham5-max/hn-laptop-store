import React from 'react'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Header, Footer } from './components/layout'
import { ToastProvider } from './components/ToastProvider'

// Use Inter font for consistency with design system
const inter = Inter({ subsets: ['latin'], variable: '--font-body' })

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
      <body className={`${inter.variable} antialiased bg-white text-gray-900`}>
        {/* Skip to content link for keyboard users */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-primary-600 focus:text-white"
        >
          Skip to main content
        </a>
        <ToastProvider>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main id="main-content" role="main" tabIndex={-1} className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
        </ToastProvider>
      </body>
    </html>
  )
}


