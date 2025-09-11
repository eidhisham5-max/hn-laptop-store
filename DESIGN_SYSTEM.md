# 🎨 HN Laptop Store - Design System

## Overview
A comprehensive design system for HN Laptop Store, providing consistent visual language, components, and guidelines for building a professional e-commerce platform.

---

## 🎨 Color Palette

### Primary Colors
```css
/* Brand Primary */
--color-primary-50: #E6F2FF;
--color-primary-100: #CCE5FF;
--color-primary-200: #99CCFF;
--color-primary-300: #66B2FF;
--color-primary-400: #3399FF;
--color-primary-500: #007AFF; /* Main Brand Color */
--color-primary-600: #0062CC;
--color-primary-700: #004999;
--color-primary-800: #003166;
--color-primary-900: #001833;

/* Brand Secondary */
--color-secondary-50: #E8F5E8;
--color-secondary-100: #D1EBD1;
--color-secondary-200: #A3D7A3;
--color-secondary-300: #75C375;
--color-secondary-400: #47AF47;
--color-secondary-500: #34C759; /* Success/Positive */
--color-secondary-600: #2A9F47;
--color-secondary-700: #207735;
--color-secondary-800: #164F23;
--color-secondary-900: #0C2711;
```

### Neutral Colors
```css
/* Grayscale */
--color-gray-50: #FAFAFA;
--color-gray-100: #F5F5F5;
--color-gray-200: #EEEEEE;
--color-gray-300: #E0E0E0;
--color-gray-400: #BDBDBD;
--color-gray-500: #9E9E9E;
--color-gray-600: #757575;
--color-gray-700: #616161;
--color-gray-800: #424242;
--color-gray-900: #212121;

/* Text Colors */
--color-text-primary: #1D1D1F;    /* Main text */
--color-text-secondary: #86868B;  /* Secondary text */
--color-text-tertiary: #C7C7CC;   /* Disabled text */
--color-text-inverse: #FFFFFF;    /* White text */
```

### Semantic Colors
```css
/* Status Colors */
--color-success-50: #E8F5E8;
--color-success-500: #34C759;
--color-success-600: #2A9F47;

--color-warning-50: #FFF8E1;
--color-warning-500: #FF9500;
--color-warning-600: #E6850E;

--color-error-50: #FFEBEE;
--color-error-500: #FF3B30;
--color-error-600: #E5342B;

--color-info-50: #E3F2FD;
--color-info-500: #007AFF;
--color-info-600: #0062CC;
```

### Background Colors
```css
--color-bg-primary: #FFFFFF;      /* Main background */
--color-bg-secondary: #F5F7FA;    /* Secondary background */
--color-bg-tertiary: #F2F2F7;     /* Tertiary background */
--color-bg-overlay: rgba(0, 0, 0, 0.5); /* Modal overlay */
--color-bg-dark: #1D1D1F;         /* Dark sections */
```

---

## 📝 Typography

### Font Families
```css
/* Primary Font Stack */
--font-primary: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;

/* Monospace Font */
--font-mono: 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 'Courier New', monospace;
```

### Font Weights
```css
--font-weight-light: 300;
--font-weight-normal: 400;
--font-weight-medium: 500;
--font-weight-semibold: 600;
--font-weight-bold: 700;
--font-weight-extrabold: 800;
```

### Font Sizes & Line Heights
```css
/* Display */
--text-display-2xl: 72px;     /* line-height: 90px */
--text-display-xl: 60px;      /* line-height: 72px */
--text-display-lg: 48px;      /* line-height: 60px */
--text-display-md: 36px;      /* line-height: 44px */
--text-display-sm: 30px;      /* line-height: 38px */

/* Headings */
--text-h1: 32px;              /* line-height: 40px */
--text-h2: 28px;              /* line-height: 36px */
--text-h3: 24px;              /* line-height: 32px */
--text-h4: 20px;              /* line-height: 28px */
--text-h5: 18px;              /* line-height: 24px */
--text-h6: 16px;              /* line-height: 20px */

/* Body Text */
--text-body-xl: 20px;         /* line-height: 28px */
--text-body-lg: 18px;         /* line-height: 26px */
--text-body-md: 16px;         /* line-height: 24px */
--text-body-sm: 14px;         /* line-height: 20px */
--text-body-xs: 12px;         /* line-height: 16px */

/* Labels */
--text-label-lg: 14px;        /* line-height: 20px */
--text-label-md: 12px;        /* line-height: 16px */
--text-label-sm: 10px;        /* line-height: 14px */
```

### Typography Classes
```css
/* Display */
.text-display-2xl { font-size: var(--text-display-2xl); line-height: 90px; font-weight: var(--font-weight-bold); }
.text-display-xl { font-size: var(--text-display-xl); line-height: 72px; font-weight: var(--font-weight-bold); }
.text-display-lg { font-size: var(--text-display-lg); line-height: 60px; font-weight: var(--font-weight-bold); }

/* Headings */
.text-h1 { font-size: var(--text-h1); line-height: 40px; font-weight: var(--font-weight-bold); }
.text-h2 { font-size: var(--text-h2); line-height: 36px; font-weight: var(--font-weight-bold); }
.text-h3 { font-size: var(--text-h3); line-height: 32px; font-weight: var(--font-weight-semibold); }
.text-h4 { font-size: var(--text-h4); line-height: 28px; font-weight: var(--font-weight-semibold); }
.text-h5 { font-size: var(--text-h5); line-height: 24px; font-weight: var(--font-weight-medium); }
.text-h6 { font-size: var(--text-h6); line-height: 20px; font-weight: var(--font-weight-medium); }

/* Body */
.text-body-xl { font-size: var(--text-body-xl); line-height: 28px; font-weight: var(--font-weight-normal); }
.text-body-lg { font-size: var(--text-body-lg); line-height: 26px; font-weight: var(--font-weight-normal); }
.text-body-md { font-size: var(--text-body-md); line-height: 24px; font-weight: var(--font-weight-normal); }
.text-body-sm { font-size: var(--text-body-sm); line-height: 20px; font-weight: var(--font-weight-normal); }
.text-body-xs { font-size: var(--text-body-xs); line-height: 16px; font-weight: var(--font-weight-normal); }
```

---

## 📏 Spacing Scale

### Base Spacing Unit
```css
--spacing-unit: 4px; /* Base unit for all spacing */
```

### Spacing Scale
```css
--spacing-0: 0px;
--spacing-1: 4px;    /* 0.25rem */
--spacing-2: 8px;    /* 0.5rem */
--spacing-3: 12px;   /* 0.75rem */
--spacing-4: 16px;   /* 1rem */
--spacing-5: 20px;   /* 1.25rem */
--spacing-6: 24px;   /* 1.5rem */
--spacing-8: 32px;   /* 2rem */
--spacing-10: 40px;  /* 2.5rem */
--spacing-12: 48px;  /* 3rem */
--spacing-16: 64px;  /* 4rem */
--spacing-20: 80px;  /* 5rem */
--spacing-24: 96px;  /* 6rem */
--spacing-32: 128px; /* 8rem */
--spacing-40: 160px; /* 10rem */
--spacing-48: 192px; /* 12rem */
--spacing-56: 224px; /* 14rem */
--spacing-64: 256px; /* 16rem */
```

### Spacing Utilities
```css
/* Padding */
.p-0 { padding: var(--spacing-0); }
.p-1 { padding: var(--spacing-1); }
.p-2 { padding: var(--spacing-2); }
.p-3 { padding: var(--spacing-3); }
.p-4 { padding: var(--spacing-4); }
.p-6 { padding: var(--spacing-6); }
.p-8 { padding: var(--spacing-8); }
.p-12 { padding: var(--spacing-12); }
.p-16 { padding: var(--spacing-16); }
.p-20 { padding: var(--spacing-20); }
.p-24 { padding: var(--spacing-24); }

/* Margin */
.m-0 { margin: var(--spacing-0); }
.m-1 { margin: var(--spacing-1); }
.m-2 { margin: var(--spacing-2); }
.m-3 { margin: var(--spacing-3); }
.m-4 { margin: var(--spacing-4); }
.m-6 { margin: var(--spacing-6); }
.m-8 { margin: var(--spacing-8); }
.m-12 { margin: var(--spacing-12); }
.m-16 { margin: var(--spacing-16); }
.m-20 { margin: var(--spacing-20); }
.m-24 { margin: var(--spacing-24); }
```

---

## 🔲 Border Radius

```css
--radius-none: 0px;
--radius-sm: 4px;
--radius-md: 8px;
--radius-lg: 12px;
--radius-xl: 16px;
--radius-2xl: 20px;
--radius-3xl: 24px;
--radius-full: 9999px;
```

---

## 🌫️ Shadows

```css
/* Elevation Shadows */
--shadow-xs: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
--shadow-sm: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
--shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
--shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
--shadow-2xl: 0 25px 50px -12px rgba(0, 0, 0, 0.25);

/* Custom Shadows */
--shadow-subtle: 0 1px 8px rgba(0, 0, 0, 0.06);
--shadow-card: 0 2px 12px rgba(0, 0, 0, 0.08);
--shadow-button: 0 2px 4px rgba(0, 0, 0, 0.1);
--shadow-modal: 0 20px 40px rgba(0, 0, 0, 0.15);
```

---

## 🎯 Breakpoints

```css
/* Mobile First Approach */
--breakpoint-sm: 640px;   /* Small devices */
--breakpoint-md: 768px;   /* Medium devices */
--breakpoint-lg: 1024px;  /* Large devices */
--breakpoint-xl: 1280px;  /* Extra large devices */
--breakpoint-2xl: 1536px; /* 2X large devices */

/* Container Max Widths */
--container-sm: 640px;
--container-md: 768px;
--container-lg: 1024px;
--container-xl: 1280px;
--container-2xl: 1400px;
```

---

## 🧩 Component Specifications

### Buttons

#### Primary Button
```css
.btn-primary {
  background-color: var(--color-primary-500);
  color: var(--color-text-inverse);
  border: none;
  border-radius: var(--radius-lg);
  padding: var(--spacing-3) var(--spacing-6);
  font-size: var(--text-body-md);
  font-weight: var(--font-weight-medium);
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: var(--shadow-button);
}

.btn-primary:hover {
  background-color: var(--color-primary-600);
  transform: translateY(-1px);
  box-shadow: var(--shadow-md);
}

.btn-primary:active {
  transform: translateY(0);
  box-shadow: var(--shadow-sm);
}

.btn-primary:disabled {
  background-color: var(--color-gray-300);
  color: var(--color-text-tertiary);
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}
```

#### Secondary Button
```css
.btn-secondary {
  background-color: transparent;
  color: var(--color-primary-500);
  border: 2px solid var(--color-primary-500);
  border-radius: var(--radius-lg);
  padding: var(--spacing-3) var(--spacing-6);
  font-size: var(--text-body-md);
  font-weight: var(--font-weight-medium);
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-secondary:hover {
  background-color: var(--color-primary-50);
  border-color: var(--color-primary-600);
  color: var(--color-primary-600);
}
```

#### Button Sizes
```css
.btn-sm {
  padding: var(--spacing-2) var(--spacing-4);
  font-size: var(--text-body-sm);
}

.btn-md {
  padding: var(--spacing-3) var(--spacing-6);
  font-size: var(--text-body-md);
}

.btn-lg {
  padding: var(--spacing-4) var(--spacing-8);
  font-size: var(--text-body-lg);
}

.btn-xl {
  padding: var(--spacing-5) var(--spacing-10);
  font-size: var(--text-body-xl);
}
```

### Cards

#### Product Card
```css
.card-product {
  background-color: var(--color-bg-primary);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-card);
  border: 1px solid var(--color-gray-200);
  overflow: hidden;
  transition: all 0.3s ease;
}

.card-product:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
  border-color: var(--color-primary-200);
}
```

#### Feature Card
```css
.card-feature {
  background-color: var(--color-bg-primary);
  border-radius: var(--radius-xl);
  padding: var(--spacing-8);
  text-align: center;
  box-shadow: var(--shadow-subtle);
  border: 1px solid var(--color-gray-100);
  transition: all 0.3s ease;
}

.card-feature:hover {
  box-shadow: var(--shadow-md);
  border-color: var(--color-primary-200);
}
```

### Forms

#### Input Fields
```css
.input-field {
  width: 100%;
  padding: var(--spacing-3) var(--spacing-4);
  border: 2px solid var(--color-gray-300);
  border-radius: var(--radius-lg);
  font-size: var(--text-body-md);
  background-color: var(--color-bg-primary);
  transition: all 0.2s ease;
}

.input-field:focus {
  outline: none;
  border-color: var(--color-primary-500);
  box-shadow: 0 0 0 3px var(--color-primary-100);
}

.input-field:disabled {
  background-color: var(--color-gray-100);
  color: var(--color-text-tertiary);
  cursor: not-allowed;
}

.input-field.error {
  border-color: var(--color-error-500);
}

.input-field.error:focus {
  box-shadow: 0 0 0 3px var(--color-error-100);
}
```

#### Labels
```css
.label {
  display: block;
  font-size: var(--text-body-sm);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-primary);
  margin-bottom: var(--spacing-2);
}

.label.required::after {
  content: " *";
  color: var(--color-error-500);
}
```

### Navigation

#### Header
```css
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 50;
  background-color: var(--color-bg-primary);
  border-bottom: 1px solid var(--color-gray-200);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
}

.header.scrolled {
  box-shadow: var(--shadow-lg);
  background-color: rgba(255, 255, 255, 0.95);
}
```

#### Navigation Links
```css
.nav-link {
  color: var(--color-text-primary);
  text-decoration: none;
  font-weight: var(--font-weight-medium);
  padding: var(--spacing-2) var(--spacing-4);
  border-radius: var(--radius-md);
  transition: all 0.2s ease;
  position: relative;
}

.nav-link:hover {
  color: var(--color-primary-500);
  background-color: var(--color-primary-50);
}

.nav-link.active {
  color: var(--color-primary-500);
  background-color: var(--color-primary-100);
}
```

### Badges

```css
.badge {
  display: inline-flex;
  align-items: center;
  padding: var(--spacing-1) var(--spacing-2);
  border-radius: var(--radius-full);
  font-size: var(--text-label-sm);
  font-weight: var(--font-weight-medium);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.badge-primary {
  background-color: var(--color-primary-100);
  color: var(--color-primary-700);
}

.badge-success {
  background-color: var(--color-success-100);
  color: var(--color-success-700);
}

.badge-warning {
  background-color: var(--color-warning-100);
  color: var(--color-warning-700);
}

.badge-error {
  background-color: var(--color-error-100);
  color: var(--color-error-700);
}
```

### Loading States

```css
.loading-spinner {
  width: 20px;
  height: 20px;
  border: 2px solid var(--color-gray-300);
  border-top: 2px solid var(--color-primary-500);
  border-radius: var(--radius-full);
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.skeleton {
  background: linear-gradient(90deg, var(--color-gray-200) 25%, var(--color-gray-100) 50%, var(--color-gray-200) 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
}

@keyframes loading {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
```

---

## 🎭 Animation & Transitions

### Easing Functions
```css
--ease-linear: linear;
--ease-in: cubic-bezier(0.4, 0, 1, 1);
--ease-out: cubic-bezier(0, 0, 0.2, 1);
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
--ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);
```

### Duration
```css
--duration-fast: 150ms;
--duration-normal: 200ms;
--duration-slow: 300ms;
--duration-slower: 500ms;
```

### Common Transitions
```css
.transition-fast {
  transition: all var(--duration-fast) var(--ease-out);
}

.transition-normal {
  transition: all var(--duration-normal) var(--ease-out);
}

.transition-slow {
  transition: all var(--duration-slow) var(--ease-out);
}
```

---

## ♿ Accessibility Guidelines

### Focus States
```css
.focus-visible {
  outline: 2px solid var(--color-primary-500);
  outline-offset: 2px;
}

.focus-visible:focus {
  outline: 2px solid var(--color-primary-500);
  outline-offset: 2px;
}
```

### Color Contrast
- **Normal text**: Minimum 4.5:1 contrast ratio
- **Large text**: Minimum 3:1 contrast ratio
- **UI components**: Minimum 3:1 contrast ratio

### Interactive Elements
- **Minimum touch target**: 44px × 44px
- **Keyboard navigation**: All interactive elements accessible via keyboard
- **Screen reader support**: Proper ARIA labels and roles

---

## 📱 Responsive Design

### Mobile First Approach
1. **Mobile (320px - 767px)**: Single column layout, stacked components
2. **Tablet (768px - 1023px)**: Two column layout, adjusted spacing
3. **Desktop (1024px+)**: Multi-column layout, full feature set

### Container Queries
```css
.container {
  width: 100%;
  max-width: var(--container-xl);
  margin: 0 auto;
  padding: 0 var(--spacing-4);
}

@media (min-width: 640px) {
  .container { padding: 0 var(--spacing-6); }
}

@media (min-width: 1024px) {
  .container { padding: 0 var(--spacing-8); }
}
```

---

## 🎨 Usage Guidelines

### Do's
- ✅ Use consistent spacing from the spacing scale
- ✅ Apply proper color contrast ratios
- ✅ Use semantic color names for status indicators
- ✅ Maintain consistent border radius across components
- ✅ Apply appropriate shadows for elevation
- ✅ Use the typography scale for consistent text sizing

### Don'ts
- ❌ Don't use arbitrary spacing values
- ❌ Don't mix different border radius values unnecessarily
- ❌ Don't use colors outside the defined palette
- ❌ Don't skip accessibility considerations
- ❌ Don't ignore responsive breakpoints
- ❌ Don't use too many different font sizes

---

## 🔧 Implementation Notes

### CSS Custom Properties
All design tokens are defined as CSS custom properties for easy theming and maintenance.

### Tailwind CSS Integration
The design system is built to work seamlessly with Tailwind CSS utility classes.

### Component Library
Each component specification includes:
- Base styles
- Variants (sizes, colors, states)
- Hover and focus states
- Disabled states
- Accessibility considerations

---

*This design system serves as the foundation for all UI components and ensures consistency across the entire HN Laptop Store platform.*
