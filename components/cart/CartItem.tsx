'use client'

import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/Button'
import { StarRating } from '@/components/ui/StarRating'
import { Trash2, Minus, Plus } from 'lucide-react'
import { formatPrice } from '@/lib/utils'

interface CartItemProps {
  item: {
    id: number
    name: string
    brand: string
    price: number
    originalPrice?: number
    image: string
    quantity: number
    selectedColor?: string
    selectedStorage?: string
    inStock: boolean
    rating: number
    reviewCount: number
  }
  onUpdateQuantity: (id: number, quantity: number) => void
  onRemoveItem: (id: number) => void
}

const CartItem: React.FC<CartItemProps> = ({ item, onUpdateQuantity, onRemoveItem }) => {
  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1) {
      onUpdateQuantity(item.id, newQuantity)
    }
  }

  const handleRemove = () => {
    onRemoveItem(item.id)
  }

  return (
    <div className="flex flex-col md:flex-row gap-6 p-6 border border-gray-200 rounded-2xl bg-white">
      {/* Product Image */}
      <div className="w-full md:w-32 h-32 flex-shrink-0">
        <div className="relative w-full h-full rounded-xl overflow-hidden bg-gray-100">
          <Image
            src={item.image}
            alt={item.name}
            fill
            className="object-cover"
          />
        </div>
      </div>

      {/* Product Info */}
      <div className="flex-1 space-y-4">
        {/* Product Name and Brand */}
        <div>
          <p className="text-sm text-gray-500 mb-1">{item.brand}</p>
          <h3 className="text-lg font-semibold text-gray-800 hover:text-primary-500 transition-colors duration-200">
            {item.name}
          </h3>
        </div>

        {/* Rating */}
        <div className="flex items-center space-x-2 space-x-reverse">
          <StarRating rating={item.rating} size="sm" />
          <span className="text-sm text-gray-500">({item.reviewCount})</span>
        </div>

        {/* Selected Options */}
        <div className="space-y-2">
          {item.selectedColor && (
            <div className="flex items-center space-x-2 space-x-reverse">
              <span className="text-sm text-gray-600">اللون:</span>
              <div 
                className="w-4 h-4 rounded-full border border-gray-300"
                style={{ backgroundColor: item.selectedColor }}
              ></div>
            </div>
          )}
          {item.selectedStorage && (
            <div className="flex items-center space-x-2 space-x-reverse">
              <span className="text-sm text-gray-600">التخزين:</span>
              <span className="text-sm font-medium">{item.selectedStorage}</span>
            </div>
          )}
        </div>

        {/* Stock Status */}
        <div className="flex items-center space-x-2 space-x-reverse">
          {item.inStock ? (
            <>
              <div className="w-2 h-2 bg-success-500 rounded-full"></div>
              <span className="text-sm text-success-600">متوفر</span>
            </>
          ) : (
            <>
              <div className="w-2 h-2 bg-error-500 rounded-full"></div>
              <span className="text-sm text-error-600">غير متوفر</span>
            </>
          )}
        </div>
      </div>

      {/* Quantity and Price */}
      <div className="flex flex-col md:items-end space-y-4">
        {/* Quantity Controls */}
        <div className="flex items-center space-x-3 space-x-reverse">
          <button
            onClick={() => handleQuantityChange(item.quantity - 1)}
            disabled={item.quantity <= 1}
            className="w-8 h-8 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            <Minus className="w-4 h-4" />
          </button>
          
          <span className="w-12 text-center font-medium">{item.quantity}</span>
          
          <button
            onClick={() => handleQuantityChange(item.quantity + 1)}
            className="w-8 h-8 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors duration-200"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        {/* Price */}
        <div className="text-right">
          <div className="flex items-center space-x-2 space-x-reverse">
            <span className="text-xl font-bold text-gray-800">
              {formatPrice(item.price * item.quantity)}
            </span>
            {item.originalPrice && (
              <span className="text-sm text-gray-500 line-through">
                {formatPrice(item.originalPrice * item.quantity)}
              </span>
            )}
          </div>
          {item.originalPrice && (
            <div className="text-sm text-success-600">
              وفرت {formatPrice((item.originalPrice - item.price) * item.quantity)}
            </div>
          )}
        </div>

        {/* Remove Button */}
        <button
          onClick={handleRemove}
          className="flex items-center space-x-2 space-x-reverse text-error-500 hover:text-error-600 transition-colors duration-200"
        >
          <Trash2 className="w-4 h-4" />
          <span className="text-sm">إزالة</span>
        </button>
      </div>
    </div>
  )
}

export default CartItem