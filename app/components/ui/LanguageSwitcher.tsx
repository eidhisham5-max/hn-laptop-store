'use client'
import React from 'react'
import { useLanguage } from '../../contexts/LanguageContext'
import { Button } from './Button'
import { cn } from '../../lib/utils'

interface LanguageSwitcherProps {
  className?: string
  variant?: 'default' | 'minimal' | 'dropdown'
}

export function LanguageSwitcher({ 
  className, 
  variant = 'default' 
}: LanguageSwitcherProps) {
  const { language, setLanguage } = useLanguage()

  const languages = [
    { code: 'en' as const, name: 'English', flag: '🇺🇸' },
    { code: 'ar' as const, name: 'العربية', flag: '🇪🇬' }
  ]

  const handleLanguageChange = (newLanguage: 'en' | 'ar') => {
    setLanguage(newLanguage)
  }

  if (variant === 'minimal') {
    return (
      <div className={cn('flex items-center gap-1', className)}>
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => handleLanguageChange(lang.code)}
            className={cn(
              'px-2 py-1 text-sm rounded-md transition-colors duration-200',
              language === lang.code
                ? 'bg-primary-500 text-white'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            )}
            aria-label={`Switch to ${lang.name}`}
          >
            {lang.flag}
          </button>
        ))}
      </div>
    )
  }

  if (variant === 'dropdown') {
    return (
      <div className={cn('relative', className)}>
        <select
          value={language}
          onChange={(e) => handleLanguageChange(e.target.value as 'en' | 'ar')}
          className="appearance-none bg-transparent border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          aria-label="Select language"
        >
          {languages.map((lang) => (
            <option key={lang.code} value={lang.code}>
              {lang.flag} {lang.name}
            </option>
          ))}
        </select>
      </div>
    )
  }

  // Default variant - buttons
  return (
    <div className={cn('flex items-center gap-1', className)}>
      {languages.map((lang) => (
        <Button
          key={lang.code}
          variant={language === lang.code ? 'primary' : 'ghost'}
          size="sm"
          onClick={() => handleLanguageChange(lang.code)}
          className={cn(
            'min-w-0 px-3 py-2 text-sm',
            language === lang.code
              ? 'bg-primary-500 text-white'
              : 'text-gray-600 hover:text-gray-900'
          )}
          aria-label={`Switch to ${lang.name}`}
        >
          <span className="mr-2">{lang.flag}</span>
          <span className="hidden sm:inline">{lang.name}</span>
        </Button>
      ))}
    </div>
  )
}