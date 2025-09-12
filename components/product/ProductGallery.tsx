'use client'

import React, { useState } from 'react'
import Image from 'next/image'
// import { Button } from '@/components/ui/Button'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface ProductGalleryProps {
  images: string[]
  productName: string
}

const ProductGallery: React.FC<ProductGalleryProps> = ({ images, productName }) => {
  const [selectedImage, setSelectedImage] = useState(0)
  const [isZoomed, setIsZoomed] = useState(false)

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + images.length) % images.length)
  }

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative aspect-square overflow-hidden rounded-2xl bg-gray-100 group">
        <Image
          src={images[selectedImage] || images[0] || ''}
          alt={`${productName} - صورة ${selectedImage + 1}`}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          priority
        />
        
        {/* Zoom Button */}
        <button
          onClick={() => setIsZoomed(true)}
          className="absolute top-4 left-4 p-2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-lg shadow-soft transition-all duration-200 opacity-0 group-hover:opacity-100"
        >
          <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>

        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full shadow-soft transition-all duration-200 opacity-0 group-hover:opacity-100"
            >
              <ChevronRight className="w-5 h-5 text-gray-700" />
            </button>
            
            <button
              onClick={nextImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full shadow-soft transition-all duration-200 opacity-0 group-hover:opacity-100"
            >
              <ChevronLeft className="w-5 h-5 text-gray-700" />
            </button>
          </>
        )}

        {/* Image Counter */}
        {images.length > 1 && (
          <div className="absolute bottom-4 right-4 bg-black bg-opacity-60 text-white px-3 py-1 rounded-lg text-sm">
            {selectedImage + 1} / {images.length}
          </div>
        )}
      </div>

      {/* Thumbnail Images */}
      {images.length > 1 && (
        <div className="flex space-x-2 space-x-reverse overflow-x-auto pb-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                index === selectedImage
                  ? 'border-primary-500 ring-2 ring-primary-200'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <Image
                src={image}
                alt={`${productName} - مصغر ${index + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* Zoom Modal */}
      {isZoomed && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center p-4">
          <div className="relative max-w-4xl max-h-full">
            <Image
              src={images[selectedImage] || images[0] || ''}
              alt={`${productName} - مكبر`}
              width={800}
              height={600}
              className="object-contain max-w-full max-h-full"
            />
            
            {/* Close Button */}
            <button
              onClick={() => setIsZoomed(false)}
              className="absolute top-4 right-4 p-2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full text-white transition-all duration-200"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Navigation in Zoom */}
            {images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full text-white transition-all duration-200"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
                
                <button
                  onClick={nextImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full text-white transition-all duration-200"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default ProductGallery