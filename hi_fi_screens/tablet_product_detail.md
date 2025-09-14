# Tablet Product Detail Screen - Hi-Fi Design

## Screen Specifications
- **Device**: Tablet (768x1024px)
- **Orientation**: Portrait
- **Language**: Arabic RTL / English LTR
- **Status Bar**: iOS/Android style
- **Safe Area**: 44px top, 34px bottom

## Header Section (100px height)
```css
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 100px;
  background: #FFFFFF;
  border-bottom: 1px solid #E2E8F0;
  z-index: 50;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 32px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}
```

### Header Elements
- **Back Button**: Arrow icon with text
- **Page Title**: Product name (truncated)
- **Search Icon**: Search icon (24px)
- **Share Icon**: Share icon (24px)
- **Wishlist Icon**: Heart icon (24px)
- **Cart Icon**: Shopping bag with badge (24px)

## Product Image Section (400px height)
```css
.product-image {
  margin-top: 100px;
  height: 400px;
  background: #F8FAFC;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}
```

### Image Elements
- **Main Image**: Product image (320px x 320px)
- **Image Gallery**: Thumbnail strip (bottom)
- **Zoom Button**: Zoom icon (top right)
- **Badge**: Discount/New badge (top left)
- **Navigation**: Previous/Next arrows

## Product Info Section (Dynamic height)
```css
.product-info {
  padding: 32px;
  background: #FFFFFF;
}
```

### Product Details
- **Title**: Product name (2 lines max)
- **Price**: Current price with discount
- **Rating**: Star rating with count
- **Availability**: In stock/Out of stock
- **Description**: Product description (4-5 lines)

## Specifications Section (Collapsible)
```css
.specifications {
  padding: 24px 32px;
  background: #F8FAFC;
  border-top: 1px solid #E2E8F0;
}
```

### Spec Elements
- **Processor**: Intel Core i7-12700H
- **Memory**: 16GB DDR4 RAM
- **Storage**: 512GB SSD
- **Display**: 15.6" 144Hz
- **Operating System**: Windows 11 Pro
- **Graphics**: NVIDIA RTX 3070
- **Battery**: 90Wh battery

## Reviews Section (Collapsible)
```css
.reviews {
  padding: 24px 32px;
  background: #FFFFFF;
  border-top: 1px solid #E2E8F0;
}
```

### Review Elements
- **Overall Rating**: 4.2/5 stars
- **Rating Breakdown**: 5-star distribution
- **Recent Reviews**: 3-4 review cards
- **Write Review**: Button to write review

## Related Products Section (250px height)
```css
.related-products {
  padding: 24px 32px;
  background: #F8FAFC;
  border-top: 1px solid #E2E8F0;
}
```

### Related Items
- **Title**: "You might also like"
- **Product Grid**: 3 columns of related products
- **Horizontal Scroll**: Swipe to see more

## Action Buttons Section (120px height)
```css
.action-buttons {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 120px;
  background: #FFFFFF;
  border-top: 1px solid #E2E8F0;
  padding: 24px 32px;
  display: flex;
  gap: 16px;
  z-index: 40;
}
```

### Button Elements
- **Add to Cart**: Primary button (50% width)
- **Buy Now**: Secondary button (30% width)
- **Wishlist**: Heart icon button (20% width)

## Tablet-Specific Interactions

### Touch Targets
- **Minimum Size**: 48px x 48px
- **Spacing**: 12px between touch targets
- **Feedback**: Visual and haptic feedback

### Gestures
- **Swipe**: Image gallery navigation
- **Tap**: All interactive elements
- **Long Press**: Context menus
- **Pinch**: Zoom product images
- **Pull to Refresh**: Refresh content

### Responsive Breakpoints
- **Small Tablet**: 768px - 834px
- **Medium Tablet**: 834px - 1024px
- **Large Tablet**: 1024px - 1366px

## Arabic RTL Adjustments

### Layout Direction
```css
[dir="rtl"] .product-info {
  text-align: right;
}

[dir="rtl"] .specifications {
  text-align: right;
}

[dir="rtl"] .reviews {
  text-align: right;
}
```

### Icon Positioning
```css
[dir="rtl"] .header__back {
  margin-right: 24px;
  margin-left: 0;
}

[dir="rtl"] .header__share {
  margin-left: 24px;
  margin-right: 0;
}
```

## Performance Optimizations

### Image Loading
- **Lazy Loading**: Below-the-fold images
- **WebP Format**: Modern image format
- **Responsive Images**: Different sizes for different screens
- **Progressive Loading**: Blur-to-sharp loading

### Animation
- **Smooth Scrolling**: 60fps animations
- **Touch Feedback**: Immediate visual response
- **Page Transitions**: Smooth navigation
- **Micro-interactions**: Subtle hover effects

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
- **Keyboard Shortcuts**: Common actions

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
- **Display**: 48px (3rem)
- **Heading**: 32px (2rem)
- **Subheading**: 24px (1.5rem)
- **Body**: 18px (1.125rem)
- **Caption**: 16px (1rem)
- **Small**: 14px (0.875rem)

## Spacing System

### Base Unit
- **8px**: Base spacing unit
- **4px**: Micro spacing
- **8px**: Small spacing
- **16px**: Medium spacing
- **24px**: Large spacing
- **32px**: XLarge spacing
- **48px**: XXLarge spacing

## Component States

### Button States
- **Default**: Primary color background
- **Hover**: Darker shade with shadow
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
- **No Reviews**: Friendly message with CTA
- **No Related Products**: Alternative suggestions
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
