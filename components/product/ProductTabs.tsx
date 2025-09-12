'use client'

import React, { useState } from 'react'
import { Card, CardContent } from '@/components/ui/Card'
import { StarRating } from '@/components/ui/StarRating'

interface ProductTabsProps {
  product: {
    id: number
    name: string
    fullDescription: string
    specifications: Record<string, string>
    reviews: {
      id: number
      userName: string
      rating: number
      date: string
      comment: string
      verified: boolean
    }[]
    questions: {
      id: number
      question: string
      answer: string
      date: string
    }[]
  }
}

const ProductTabs: React.FC<ProductTabsProps> = ({ product }) => {
  const [activeTab, setActiveTab] = useState('description')

  const tabs = [
    { id: 'description', label: 'الوصف والمواصفات' },
    { id: 'reviews', label: 'مراجعات العملاء' },
    { id: 'questions', label: 'الأسئلة والأجوبة' }
  ]

  const renderDescription = () => (
    <div className="space-y-8">
      {/* Full Description */}
      <div>
        <h3 className="text-xl font-semibold text-gray-800 mb-4">الوصف الكامل</h3>
        <div className="prose prose-gray max-w-none">
          <p className="text-gray-600 leading-relaxed">
            {product.fullDescription}
          </p>
        </div>
      </div>

      {/* Detailed Specifications */}
      <div>
        <h3 className="text-xl font-semibold text-gray-800 mb-4">المواصفات التفصيلية</h3>
        <div className="bg-gray-50 rounded-2xl p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(product.specifications).map(([key, value]) => (
              <div key={key} className="flex justify-between py-3 border-b border-gray-200 last:border-b-0">
                <span className="text-gray-600 font-medium">{key}:</span>
                <span className="text-gray-800">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )

  const renderReviews = () => (
    <div className="space-y-6">
      {/* Reviews Summary */}
      <div className="bg-gray-50 rounded-2xl p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">تقييم العملاء</h3>
            <div className="flex items-center space-x-4 space-x-reverse mb-4">
              <div className="text-4xl font-bold text-gray-800">4.8</div>
              <div>
                <StarRating rating={4.8} size="lg" />
                <p className="text-gray-600 mt-1">بناءً على {product.reviews.length} تقييم</p>
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map((rating) => (
              <div key={rating} className="flex items-center space-x-3 space-x-reverse">
                <span className="text-sm text-gray-600 w-8">{rating}</span>
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-yellow-400 h-2 rounded-full" 
                    style={{ width: `${(rating === 5 ? 70 : rating === 4 ? 20 : rating === 3 ? 8 : rating === 2 ? 1 : 1)}%` }}
                  ></div>
                </div>
                <span className="text-sm text-gray-600 w-8">
                  {rating === 5 ? 70 : rating === 4 ? 20 : rating === 3 ? 8 : rating === 2 ? 1 : 1}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Individual Reviews */}
      <div className="space-y-6">
        <h3 className="text-xl font-semibold text-gray-800">آراء العملاء</h3>
        {product.reviews.map((review) => (
          <div key={review.id} className="border border-gray-200 rounded-2xl p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3 space-x-reverse">
                <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                  <span className="text-primary-600 font-semibold">
                    {review.userName.charAt(0)}
                  </span>
                </div>
                <div>
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <span className="font-semibold text-gray-800">{review.userName}</span>
                    {review.verified && (
                      <span className="bg-success-100 text-success-700 text-xs px-2 py-1 rounded-full">
                        مشتري موثق
                      </span>
                    )}
                  </div>
                  <div className="flex items-center space-x-2 space-x-reverse mt-1">
                    <StarRating rating={review.rating} size="sm" />
                    <span className="text-sm text-gray-500">{review.date}</span>
                  </div>
                </div>
              </div>
            </div>
            <p className="text-gray-600 leading-relaxed">{review.comment}</p>
          </div>
        ))}
      </div>

      {/* Write Review Button */}
      <div className="text-center pt-6 border-t border-gray-200">
        <button className="btn-primary">
          اكتب مراجعتك
        </button>
      </div>
    </div>
  )

  const renderQuestions = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-gray-800">الأسئلة والأجوبة</h3>
        <button className="btn-outline">
          اطرح سؤالاً
        </button>
      </div>

      <div className="space-y-4">
        {product.questions.map((qa) => (
          <div key={qa.id} className="border border-gray-200 rounded-2xl p-6">
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">س: {qa.question}</h4>
                <p className="text-gray-600 leading-relaxed">ج: {qa.answer}</p>
              </div>
              <div className="text-sm text-gray-500">
                {qa.date}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  return (
    <Card>
      <CardContent className="p-0">
        {/* Tab Navigation */}
        <div className="border-b border-gray-200">
          <div className="flex space-x-0">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-4 font-medium transition-all duration-200 border-b-2 ${
                  activeTab === tab.id
                    ? 'border-primary-500 text-primary-600 bg-primary-50'
                    : 'border-transparent text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'description' && renderDescription()}
          {activeTab === 'reviews' && renderReviews()}
          {activeTab === 'questions' && renderQuestions()}
        </div>
      </CardContent>
    </Card>
  )
}

export default ProductTabs