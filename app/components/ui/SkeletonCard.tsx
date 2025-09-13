'use client'
import React from 'react'
import { Skeleton } from './Skeleton'

export function SkeletonCard() {
  return (
    <div className="space-y-3 p-4">
      <Skeleton className="h-48 w-full rounded-lg" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-4 w-1/3" />
      </div>
    </div>
  )
}