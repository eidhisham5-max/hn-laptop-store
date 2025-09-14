# Mobile Product Listing Screen - Hi-Fi Design

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
- **Page Title**: "Products" (Arabic: "المنتجات")
- **Search Icon**: Magnifying glass (24px)
- **Filter Icon**: Filter icon (24px)
- **Sort Icon**: Sort icon (24px)

## Filter Section (Collapsible)
```css
.filter-section {
  margin-top: 80px;
  background: #F8FAFC;
  border-bottom: 1px solid #E2E8F0;
  padding: 16px;
}
```

### Filter Elements
- **Price Range**: Slider with min/max values
- **Brand**: Checkbox list (Apple, Dell, HP, Lenovo)
- **Category**: Radio buttons (Gaming, Business, Budget)
- **Rating**: Star rating filter
- **Availability**: In stock toggle

## Sort Section (60px height)
```css
.sort-section {
  background: #FFFFFF;
  border-bottom: 1px solid #E2E8F0;
  padding: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
```

### Sort Options
- **Results Count**: "24 products found"
- **Sort Dropdown**: Price, Rating, Newest, Popular
- **View Toggle**: Grid/List view

## Product Grid Section (Dynamic height)
```css
.product-grid {
  padding: 16px;
  background: #FFFFFF;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}
```

### Product Cards (2 columns)
- **Card Size**: 160px x 240px
- **Image**: Product image (120px x 120px)
- **Title**: Product name (2 lines max)
- **Price**: Current price with discount
- **Rating**: Star rating with count
- **CTA**: Add to cart button

## Product List Section (Alternative view)
```css
.product-list {
  padding: 16px;
  background: #FFFFFF;
  display: flex;
  flex-direction: column;
  gap: 16px;
}
```

### Product List Items
- **Item Height**: 120px
- **Image**: Product image (80px x 80px)
- **Content**: Title, price, rating, CTA
- **Layout**: Horizontal layout

## Pagination Section (80px height)
```css
.pagination {
  padding: 16px;
  background: #F8FAFC;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
}
```

### Pagination Elements
- **Previous**: Arrow button
- **Page Numbers**: 1, 2, 3, 4, 5
- **Next**: Arrow button
- **Load More**: Button for infinite scroll

## Mobile-Specific Interactions

### Touch Targets
- **Minimum Size**: 44px x 44px
- **Spacing**: 8px between touch targets
- **Feedback**: Visual and haptic feedback

### Gestures
- **Swipe**: Horizontal scroll for filters
- **Tap**: All interactive elements
- **Long Press**: Quick add to cart
- **Pull to Refresh**: Refresh product list

### Responsive Breakpoints
- **Small**: 320px - 375px
- **Medium**: 375px - 414px
- **Large**: 414px - 480px

## Arabic RTL Adjustments

### Layout Direction
```css
[dir="rtl"] .product-grid {
  direction: rtl;
}

[dir="rtl"] .product-list {
  direction: rtl;
}

[dir="rtl"] .filter-section {
  direction: rtl;
}
```

### Icon Positioning
```css
[dir="rtl"] .header__back {
  margin-right: 16px;
  margin-left: 0;
}

[dir="rtl"] .header__search {
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
