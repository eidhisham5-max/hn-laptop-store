# Design System Documentation

## 1. Design Tokens Usage

### Color System
- **Primary (#0B6DF3)**: Main brand color for CTAs, links, and interactive elements
- **Accent (#FF6A00)**: Secondary actions, highlights, and promotional elements
- **Success (#20C997)**: Success states, confirmations, and positive feedback
- **Warning (#FFC107)**: Warnings, alerts, and attention-grabbing elements
- **Error (#E74C3C)**: Error states, destructive actions, and critical alerts

### Typography Scale
- **Display (3xl-6xl)**: Hero headings and major page titles
- **Heading (xl-2xl)**: Section headers and card titles
- **Body (sm-lg)**: Main content and descriptions
- **Caption (xs)**: Supporting text and metadata

### Spacing System (8px base)
- **Micro (1-2)**: Tight spacing for related elements
- **Small (3-4)**: Standard spacing for form elements
- **Medium (6-8)**: Section spacing and card padding
- **Large (12-16)**: Major layout spacing
- **XLarge (24-32)**: Page-level spacing

## 2. Component Anatomy

### Button Component
```css
.button {
  /* Base styles */
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  font-weight: 500;
  transition: all 200ms ease-in-out;
  
  /* Sizes */
  &.sm { padding: 8px 12px; font-size: 0.875rem; }
  &.md { padding: 12px 16px; font-size: 1rem; }
  &.lg { padding: 16px 24px; font-size: 1.125rem; }
  
  /* Variants */
  &.primary {
    background: #0B6DF3;
    color: white;
    border: none;
  }
}
```

### Product Card Component
```css
.product-card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  overflow: hidden;
  transition: transform 200ms ease-in-out;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  }
}
```

## 3. Accessibility Guidelines

### WCAG AA Compliance
- **Color Contrast**: Minimum 4.5:1 ratio for normal text, 3:1 for large text
- **Focus States**: Visible focus indicators with 2px outline
- **Touch Targets**: Minimum 44px for interactive elements
- **Keyboard Navigation**: All interactive elements accessible via keyboard

### Screen Reader Support
- Semantic HTML structure with proper heading hierarchy
- ARIA labels for interactive elements
- Alt text for all images and icons
- Form labels associated with inputs

## 4. RTL (Right-to-Left) Rules

### Layout Adjustments
- **Text Alignment**: Right-aligned for Arabic, left-aligned for English
- **Icon Positioning**: Mirrored for RTL languages
- **Navigation**: Menu items flow right-to-left
- **Form Layout**: Labels and inputs adjust for RTL

### CSS Implementation
```css
[dir="rtl"] .product-card {
  text-align: right;
}

[dir="rtl"] .icon-arrow {
  transform: scaleX(-1);
}
```

## 5. Iconography System

### Icon Categories
- **Navigation**: Home, menu, search, cart, user
- **Actions**: Add, remove, edit, delete, share
- **Status**: Success, warning, error, info
- **Social**: Facebook, Twitter, Instagram, WhatsApp

### Icon Specifications
- **Size**: 16px, 20px, 24px, 32px variants
- **Style**: Outline style for consistency
- **Format**: SVG for scalability
- **Color**: Inherit from parent or use semantic colors

## 6. Grid System

### Mobile First Approach
```css
.container {
  width: 100%;
  padding: 0 16px;
  margin: 0 auto;
}

@media (min-width: 768px) {
  .container { max-width: 768px; }
}

@media (min-width: 1024px) {
  .container { max-width: 1024px; }
}
```

### Component Grid
- **Product Grid**: 1 column mobile, 2 tablet, 3-4 desktop
- **Feature Grid**: 1 column mobile, 2 tablet, 3 desktop
- **Footer Grid**: 1 column mobile, 2-3 tablet, 4 desktop

## 7. Component Specifications Table

| Component | Variants | Sizes | States | RTL Support |
|-----------|----------|-------|--------|-------------|
| Button | primary, secondary, ghost, outline | sm, md, lg | default, hover, active, disabled | ✅ |
| Input | text, email, password, search | sm, md, lg | default, focus, error, disabled | ✅ |
| Card | default, product, feature | sm, md, lg | default, hover, selected | ✅ |
| Modal | default, fullscreen | sm, md, lg | default, open, closing | ✅ |
| Toast | success, warning, error, info | sm, md | default, visible, hidden | ✅ |

## 8. WCAG Checklist

### Level A
- [x] All images have alt text
- [x] Form inputs have labels
- [x] Color is not the only means of conveying information
- [x] Content is readable without stylesheets

### Level AA
- [x] Color contrast meets 4.5:1 ratio
- [x] Text can be resized to 200% without horizontal scrolling
- [x] All functionality available via keyboard
- [x] Focus indicators are visible
- [x] Consistent navigation structure

### Level AAA (Aspirational)
- [ ] Color contrast meets 7:1 ratio
- [ ] Text can be resized to 300% without horizontal scrolling
- [ ] No timing-based content
- [ ] Context-sensitive help available