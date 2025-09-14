'use client'

import React, { useState, useEffect, useRef } from 'react'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

interface DebouncedInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value: string
  onChange: (value: string) => void
  debounceMs?: number
  loading?: boolean
}

export function DebouncedInput({
  value,
  onChange,
  debounceMs = 300,
  loading = false,
  className,
  ...props
}: DebouncedInputProps) {
  const [localValue, setLocalValue] = useState(value)
  const timeoutRef = useRef<NodeJS.Timeout>()

  useEffect(() => {
    setLocalValue(value)
  }, [value])

  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    timeoutRef.current = setTimeout(() => {
      onChange(localValue)
    }, debounceMs)

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [localValue, onChange, debounceMs])

  return (
    <div className="relative">
      <Input
        {...props}
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        className={cn(loading && 'pr-10', className)}
      />
      {loading && (
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
          <div className="w-4 h-4 border-2 border-muted-foreground border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </div>
  )
}

interface DebouncedSearchProps {
  onSearch: (query: string) => void
  placeholder?: string
  debounceMs?: number
  loading?: boolean
  className?: string
}

export function DebouncedSearch({
  onSearch,
  placeholder = 'البحث...',
  debounceMs = 300,
  loading = false,
  className
}: DebouncedSearchProps) {
  const [query, setQuery] = useState('')

  return (
    <DebouncedInput
      value={query}
      onChange={onSearch}
      placeholder={placeholder}
      debounceMs={debounceMs}
      loading={loading}
      className={className}
    />
  )
}
