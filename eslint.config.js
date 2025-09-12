import { FlatCompat } from '@eslint/eslintrc'
import js from '@eslint/js'
import nextConfig from 'eslint-config-next'

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
  recommendedConfig: js.configs.recommended,
})

const eslintConfig = [
  ...compat.extends('next/core-web-vitals'),
  {
    rules: {
      '@next/next/no-img-element': 'off',
      'react/no-unescaped-entities': 'off',
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
    },
    ignores: [
      '.next/**',
      'node_modules/**',
      'out/**',
      'build/**',
      'dist/**',
    ],
  },
]

export default eslintConfig