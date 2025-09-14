# Mobile Cart Screen - Hi-Fi Design

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
- **Back Button**: Arrow icon (24px)
- **Page Title**: "Shopping Cart" (Arabic: "سلة التسوق")
- **Clear Cart**: Trash icon (24px)
- **Search Icon**: Search icon (24px)

## Cart Items Section (Dynamic height)
```css
.cart-items {
  margin-top: 80px;
  padding: 16px;
  background: #FFFFFF;
  min-height: calc(100vh - 200px);
}
```

### Cart Item Cards
- **Item Height**: 120px
- **Image**: Product image (80px x 80px)
- **Content**: Title, price, quantity, total
- **Actions**: Remove, wishlist, quantity controls
- **Layout**: Horizontal layout

## Cart Summary Section (200px height)
```css
.cart-summary {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 200px;
  background: #FFFFFF;
  border-top: 1px solid #E2E8F0;
  padding: 16px;
  z-index: 40;
}
```

### Summary Elements
- **Subtotal**: Item prices total
- **Shipping**: Free shipping message
- **Tax**: Tax calculation
- **Total**: Final amount
- **Checkout Button**: Primary CTA button

## Empty Cart State (400px height)
```css
.empty-cart {
  margin-top: 80px;
  height: 400px;
  background: #F8FAFC;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 32px 16px;
  text-align: center;
}
```

### Empty State Elements
- **Icon**: Shopping cart icon (64px)
- **Title**: "Your cart is empty"
- **Description**: "Add some products to get started"
- **CTA Button**: "Start Shopping"

## Mobile-Specific Interactions

### Touch Targets
- **Minimum Size**: 44px x 44px
- **Spacing**: 8px between touch targets
- **Feedback**: Visual and haptic feedback

### Gestures
- **Swipe**: Remove cart items
- **Tap**: All interactive elements
- **Long Press**: Quick actions menu
- **Pull to Refresh**: Refresh cart

### Responsive Breakpoints
- **Small**: 320px - 375px
- **Medium**: 375px - 414px
- **Large**: 414px - 480px

## Arabic RTL Adjustments

### Layout Direction
```css
[dir="rtl"] .cart-items {
  direction: rtl;
}

[dir="rtl"] .cart-item {
  text-align: right;
}

[dir="rtl"] .cart-summary {
  text-align: right;
}
```

### Icon Positioning
```css
[dir="rtl"] .header__back {
  margin-right: 16px;
  margin-left: 0;
}

[dir="rtl"] .header__clear {
  margin-left: 16px;
  margin-right: 0;
}
```

## Performance Optimizations

### Image Loading
- **Lazy Loading**: Below-the-fold images
- **WebP Format**: Modern image format
- **Responsive Images**: Different sizes for different screens
- **Placeholder**: Blur placeholder while loading

### Animation
- **Smooth Scrolling**: 60fps animations
- **Touch Feedback**: Immediate visual response
- **Page Transitions**: Smooth navigation
- **Loading States**: Skeleton animation

## Accessibility Features

### Screen Reader Support
- **Semantic HTML**: Proper heading hierarchy
- **ARIA Labels**: All interactive elements
- **Alt Text**: All images and icons
- **Live Regions**: Dynamic content updates

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
- **Empty Cart**: Friendly message with CTA
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
