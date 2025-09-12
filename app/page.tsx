import React from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import HeroSection from '@/components/home/HeroSection'
import FeaturedProducts from '@/components/home/FeaturedProducts'
import CategoriesSection from '@/components/home/CategoriesSection'
import TrustSection from '@/components/home/TrustSection'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main>
        <HeroSection />
        <FeaturedProducts />
        <CategoriesSection />
        <TrustSection />
      </main>
      
      <Footer />
    </div>
  )
}