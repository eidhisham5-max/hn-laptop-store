'use client'
import React from 'react'
import { EmptyState } from './EmptyState'

export function EmptyProducts() {
  return (
    <EmptyState
      icon="🔍"
      title="No products found"
      description="We couldn't find any products matching your criteria. Try adjusting your filters or browse our full collection."
      action={{
        label: "Browse All Products",
        onClick: () => window.location.href = '/products',
        variant: 'primary'
      }}
    />
  )
}