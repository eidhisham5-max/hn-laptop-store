'use client'
import React, { createContext, useContext, useState, useEffect } from 'react'
import { Language, getTranslations, getDirection, defaultLanguage } from '../lib/i18n'

interface LanguageContextType {
  language: Language
  setLanguage: (language: Language) => void
  t: ReturnType<typeof getTranslations>
  direction: 'rtl' | 'ltr'
  isRTL: boolean
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

interface LanguageProviderProps {
  children: React.ReactNode
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguageState] = useState<Language>(defaultLanguage)

  // Load language from localStorage on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'ar')) {
      setLanguageState(savedLanguage)
    }
  }, [])

  // Save language to localStorage when changed
  const setLanguage = (newLanguage: Language) => {
    setLanguageState(newLanguage)
    localStorage.setItem('language', newLanguage)
    
    // Update document direction
    const direction = getDirection(newLanguage)
    document.documentElement.dir = direction
    document.documentElement.lang = newLanguage
  }

  // Update document attributes when language changes
  useEffect(() => {
    const direction = getDirection(language)
    document.documentElement.dir = direction
    document.documentElement.lang = language
  }, [language])

  const t = getTranslations(language)
  const direction = getDirection(language)
  const isRTL = direction === 'rtl'

  return (
    <LanguageContext.Provider value={{
      language,
      setLanguage,
      t,
      direction,
      isRTL
    }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
