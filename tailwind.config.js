/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Primary Colors
        primary: {
          50: '#E6F2FF',
          100: '#CCE5FF',
          200: '#99CCFF',
          300: '#66B2FF',
          400: '#3399FF',
          500: '#007AFF',
          600: '#0062CC',
          700: '#004999',
          800: '#003166',
          900: '#001833',
        },
        
        // Secondary Colors
        secondary: {
          50: '#E8F5E8',
          100: '#D1EBD1',
          200: '#A3D7A3',
          300: '#75C375',
          400: '#47AF47',
          500: '#34C759',
          600: '#2A9F47',
          700: '#207735',
          800: '#164F23',
          900: '#0C2711',
        },
        
        // Semantic Colors
        success: {
          50: '#E8F5E8',
          500: '#34C759',
          600: '#2A9F47',
        },
        
        warning: {
          50: '#FFF8E1',
          500: '#FF9500',
          600: '#E6850E',
        },
        
        error: {
          50: '#FFEBEE',
          500: '#FF3B30',
          600: '#E5342B',
        },
        
        info: {
          50: '#E3F2FD',
          500: '#007AFF',
          600: '#0062CC',
        },
        
        // Text Colors
        text: {
          primary: '#1D1D1F',
          secondary: '#86868B',
          tertiary: '#C7C7CC',
          inverse: '#FFFFFF',
        },
        
        // Background Colors
        bg: {
          primary: '#FFFFFF',
          secondary: '#F5F7FA',
          tertiary: '#F2F2F7',
          dark: '#1D1D1F',
        },
      },
      
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
        mono: ['SF Mono', 'Monaco', 'Cascadia Code', 'Roboto Mono', 'Consolas', 'Courier New', 'monospace'],
      },
      
      fontSize: {
        'display-2xl': ['72px', { lineHeight: '90px' }],
        'display-xl': ['60px', { lineHeight: '72px' }],
        'display-lg': ['48px', { lineHeight: '60px' }],
        'display-md': ['36px', { lineHeight: '44px' }],
        'display-sm': ['30px', { lineHeight: '38px' }],
        'h1': ['32px', { lineHeight: '40px' }],
        'h2': ['28px', { lineHeight: '36px' }],
        'h3': ['24px', { lineHeight: '32px' }],
        'h4': ['20px', { lineHeight: '28px' }],
        'h5': ['18px', { lineHeight: '24px' }],
        'h6': ['16px', { lineHeight: '20px' }],
        'body-xl': ['20px', { lineHeight: '28px' }],
        'body-lg': ['18px', { lineHeight: '26px' }],
        'body-md': ['16px', { lineHeight: '24px' }],
        'body-sm': ['14px', { lineHeight: '20px' }],
        'body-xs': ['12px', { lineHeight: '16px' }],
        'label-lg': ['14px', { lineHeight: '20px' }],
        'label-md': ['12px', { lineHeight: '16px' }],
        'label-sm': ['10px', { lineHeight: '14px' }],
      },
      
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      
      borderRadius: {
        '4xl': '2rem',
      },
      
      boxShadow: {
        'subtle': '0 1px 8px rgba(0, 0, 0, 0.06)',
        'card': '0 2px 12px rgba(0, 0, 0, 0.08)',
        'button': '0 2px 4px rgba(0, 0, 0, 0.1)',
        'modal': '0 20px 40px rgba(0, 0, 0, 0.15)',
      },
      
      animation: {
        'wave': 'wave 1.5s ease-in-out infinite',
      },
      
      keyframes: {
        wave: {
          '0%, 100%': { transform: 'translateX(-100%)' },
          '50%': { transform: 'translateX(100%)' },
        },
      },
      
      transitionTimingFunction: {
        'bounce': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      },
    },
  },
  plugins: [],
}
