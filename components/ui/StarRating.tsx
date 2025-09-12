import React from 'react'
import { Star } from 'lucide-react'
import { cn } from '@/lib/utils'

interface StarRatingProps {
  rating: number
  maxRating?: number
  size?: 'sm' | 'md' | 'lg'
  showNumber?: boolean
  className?: string
}

const StarRating: React.FC<StarRatingProps> = ({
  rating,
  maxRating = 5,
  size = 'md',
  showNumber = true,
  className
}) => {
  const sizeClasses = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5'
  }
  
  const stars = Array.from({ length: maxRating }, (_, index) => {
    const starValue = index + 1
    const isFilled = starValue <= rating
    // const isHalfFilled = starValue - 0.5 <= rating && starValue > rating
    
    return (
      <Star
        key={index}
        className={cn(
          sizeClasses[size],
          isFilled ? 'text-yellow-400 fill-current' : 'text-gray-300',
          className
        )}
      />
    )
  })
  
  return (
    <div className="flex items-center space-x-1 space-x-reverse">
      <div className="flex">
        {stars}
      </div>
      {showNumber && (
        <span className="text-sm text-gray-600 mr-1">
          ({rating.toFixed(1)})
        </span>
      )}
    </div>
  )
}

export { StarRating }