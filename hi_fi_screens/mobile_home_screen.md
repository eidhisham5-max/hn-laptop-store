# Mobile Home Screen - Hi-Fi Design

## Screen Specifications
- **Device**: Mobile (375x812px)
- **Orientation**: Portrait
- **Language**: Arabic RTL / English LTR
- **Status Bar**: iOS/Android style
- **Safe Area**: 44px top, 34px bottom

## Header Section (80px height)
```css
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 80px;
  background: #FFFFFF;
  border-bottom: 1px solid #E2E8F0;
  z-index: 50;
  display: flex;
  align-items: center;
  padding: 0 16px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}
```

### Header Elements
- **Logo**: H.N Store (Arabic: متجر H.N)
- **Search Icon**: Magnifying glass (24px)
- **Cart Icon**: Shopping bag with badge (24px)
- **Menu Icon**: Hamburger menu (24px)
- **Language Switcher**: EN/AR toggle

## Hero Section (400px height)
```css
.hero {
  margin-top: 80px;
  height: 400px;
  background: linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 32px 16px;
  text-align: center;
}
```

### Hero Content
- **Main Headline**: "Premium Laptops" (Arabic: "أجهزة حاسوب محمولة متميزة")
- **Subheadline**: "At the Best Prices" (Arabic: "بأفضل الأسعار")
- **Description**: 2-3 lines about the store
- **CTA Button**: "Browse Products" (Arabic: "تصفح المنتجات")
- **Secondary CTA**: "Get Free Quote" (Arabic: "احصل على عرض مجاني")

## Trust Indicators Section (120px height)
```css
.trust-indicators {
  padding: 24px 16px;
  background: #F8FAFC;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
```

### Trust Elements
- **Rating**: 4.9/5 stars with review count
- **Delivery**: Free 24-48 hour delivery
- **Warranty**: 2-year warranty guarantee

## Categories Section (200px height)
```css
.categories {
  padding: 24px 16px;
  background: #FFFFFF;
}
```

### Category Grid (2x2)
- **Gaming**: 🎮 Gaming Laptops
- **Business**: 💼 Business Laptops
- **Budget**: 💰 Budget Laptops
- **Premium**: ⭐ Premium Laptops

## Featured Products Section (300px height)
```css
.featured-products {
  padding: 24px 16px;
  background: #F8FAFC;
}
```

### Product Cards (Horizontal Scroll)
- **Card Width**: 280px
- **Card Height**: 200px
- **Spacing**: 16px between cards
- **Content**: Image, title, price, rating, CTA button

## Why Choose Us Section (250px height)
```css
.why-choose-us {
  padding: 24px 16px;
  background: #FFFFFF;
}
```

### Features (3 items)
- **Quality Guarantee**: Premium quality assurance
- **Expert Support**: 24/7 technical support
- **Fast Delivery**: Free delivery across Egypt

## CTA Section (150px height)
```css
.cta-section {
  padding: 24px 16px;
  background: linear-gradient(135deg, #0B6DF3 0%, #1D4ED8 100%);
  color: #FFFFFF;
  text-align: center;
}
```

### CTA Content
- **Headline**: "Ready to Find Your Perfect Laptop?"
- **Button**: "Start Shopping Now"
- **Secondary**: "Contact Us for Help"

## Footer Section (200px height)
```css
.footer {
  padding: 24px 16px;
  background: #1E293B;
  color: #FFFFFF;
}
```

### Footer Content
- **Company Info**: Logo, description, contact
- **Quick Links**: Products, About, Contact
- **Social Media**: WhatsApp, Facebook, Instagram
- **Newsletter**: Email signup

## Mobile-Specific Interactions

### Touch Targets
- **Minimum Size**: 44px x 44px
- **Spacing**: 8px between touch targets
- **Feedback**: Visual and haptic feedback

### Gestures
- **Swipe**: Horizontal scroll for products
- **Tap**: All interactive elements
- **Long Press**: Context menus
- **Pull to Refresh**: Refresh content

### Responsive Breakpoints
- **Small**: 320px - 375px
- **Medium**: 375px - 414px
- **Large**: 414px - 480px

## Arabic RTL Adjustments

### Layout Direction
```css
[dir="rtl"] .hero {
  text-align: right;
}

[dir="rtl"] .categories {
  direction: rtl;
}

[dir="rtl"] .product-card {
  text-align: right;
}
```

### Icon Positioning
```css
[dir="rtl"] .header__search {
  margin-left: 16px;
  margin-right: 0;
}

[dir="rtl"] .header__cart {
  margin-left: 16px;
  margin-right: 0;
}
```

## Performance Optimizations

### Image Loading
- **Lazy Loading**: Below-the-fold images
- **WebP Format**: Modern image format
- **Responsive Images**: Different sizes for different screens

### Animation
- **Smooth Scrolling**: 60fps animations
- **Touch Feedback**: Immediate visual response
- **Page Transitions**: Smooth navigation

## Accessibility Features

### Screen Reader Support
- **Semantic HTML**: Proper heading hierarchy
- **ARIA Labels**: All interactive elements
- **Alt Text**: All images and icons

### Keyboard Navigation
- **Tab Order**: Logical navigation flow
- **Focus Indicators**: Clear focus states
- **Skip Links**: Jump to main content

## Color Scheme

### Primary Colors
- **Primary**: #0B6DF3 (Blue)
- **Secondary**: #FF6A00 (Orange)
- **Success**: #20C997 (Green)
- **Warning**: #FFC107 (Yellow)
- **Error**: #E74C3C (Red)

### Neutral Colors
- **Text Primary**: #0F1724
- **Text Secondary**: #374151
- **Background**: #FFFFFF
- **Surface**: #F8FAFC
- **Border**: #E2E8F0

## Typography

### Font Families
- **English**: Inter, system-ui, sans-serif
- **Arabic**: Tajawal, Noto Sans Arabic, system-ui

### Font Sizes
- **Display**: 32px (2rem)
- **Heading**: 24px (1.5rem)
- **Body**: 16px (1rem)
- **Caption**: 14px (0.875rem)
- **Small**: 12px (0.75rem)

## Spacing System

### Base Unit
- **8px**: Base spacing unit
- **4px**: Micro spacing
- **8px**: Small spacing
- **16px**: Medium spacing
- **24px**: Large spacing
- **32px**: XLarge spacing

## Component States

### Button States
- **Default**: Primary color background
- **Hover**: Darker shade
- **Active**: Pressed state
- **Disabled**: Grayed out
- **Loading**: Spinner animation

### Card States
- **Default**: Clean, elevated appearance
- **Hover**: Subtle shadow increase
- **Selected**: Border highlight
- **Loading**: Skeleton animation

## Error Handling

### Empty States
- **No Products**: Friendly message with CTA
- **No Internet**: Offline message with retry
- **Error**: Clear error message with action

### Loading States
- **Skeleton**: Placeholder content
- **Spinner**: Loading animation
- **Progress**: Progress indicator

## Testing Checklist

### Functionality
- [ ] All buttons work correctly
- [ ] Navigation flows properly
- [ ] Forms submit successfully
- [ ] Images load properly
- [ ] Animations are smooth

### Responsiveness
- [ ] Layout adapts to different screen sizes
- [ ] Text remains readable
- [ ] Touch targets are accessible
- [ ] Images scale properly

### Accessibility
- [ ] Screen reader compatibility
- [ ] Keyboard navigation
- [ ] Color contrast meets WCAG AA
- [ ] Focus indicators are visible

### Performance
- [ ] Page loads quickly
- [ ] Images are optimized
- [ ] Animations are smooth
- [ ] No layout shifts
