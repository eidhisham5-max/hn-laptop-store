# Tablet Product Listing Screen - Hi-Fi Design

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
- **Page Title**: "Products" (Arabic: "المنتجات")
- **Search Bar**: Full-width search input
- **Filter Button**: Filter icon with count
- **Sort Dropdown**: Sort options
- **View Toggle**: Grid/List view

## Filter Sidebar (Collapsible)
```css
.filter-sidebar {
  position: fixed;
  left: 0;
  top: 100px;
  width: 300px;
  height: calc(100vh - 100px);
  background: #F8FAFC;
  border-right: 1px solid #E2E8F0;
  padding: 24px;
  overflow-y: auto;
  z-index: 40;
}
```

### Filter Elements
- **Price Range**: Slider with min/max values
- **Brand**: Checkbox list (Apple, Dell, HP, Lenovo)
- **Category**: Radio buttons (Gaming, Business, Budget)
- **Rating**: Star rating filter
- **Availability**: In stock toggle
- **Features**: Checkbox list (SSD, RAM, etc.)

## Main Content Area
```css
.main-content {
  margin-top: 100px;
  margin-left: 300px;
  padding: 24px 32px;
  background: #FFFFFF;
  min-height: calc(100vh - 100px);
}
```

### Content Header
- **Results Count**: "24 products found"
- **Active Filters**: Chips showing active filters
- **Clear Filters**: Button to clear all filters

## Product Grid Section (3 columns)
```css
.product-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  margin-bottom: 32px;
}
```

### Product Cards
- **Card Size**: 220px x 320px
- **Image**: Product image (180px x 180px)
- **Title**: Product name (2 lines max)
- **Price**: Current price with discount
- **Rating**: Star rating with count
- **CTA**: Add to cart button

## Product List Section (Alternative view)
```css
.product-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 32px;
}
```

### Product List Items
- **Item Height**: 140px
- **Image**: Product image (100px x 100px)
- **Content**: Title, price, rating, CTA
- **Layout**: Horizontal layout with details

## Pagination Section (80px height)
```css
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  padding: 24px 0;
}
```

### Pagination Elements
- **Previous**: Arrow button
- **Page Numbers**: 1, 2, 3, 4, 5
- **Next**: Arrow button
- **Load More**: Button for infinite scroll

## Tablet-Specific Interactions

### Touch Targets
- **Minimum Size**: 48px x 48px
- **Spacing**: 12px between touch targets
- **Feedback**: Visual and haptic feedback

### Gestures
- **Swipe**: Horizontal scroll for filters
- **Tap**: All interactive elements
- **Long Press**: Context menus
- **Pinch**: Zoom functionality
- **Pull to Refresh**: Refresh product list

### Responsive Breakpoints
- **Small Tablet**: 768px - 834px
- **Medium Tablet**: 834px - 1024px
- **Large Tablet**: 1024px - 1366px

## Arabic RTL Adjustments

### Layout Direction
```css
[dir="rtl"] .filter-sidebar {
  right: 0;
  left: auto;
  border-right: none;
  border-left: 1px solid #E2E8F0;
}

[dir="rtl"] .main-content {
  margin-left: 0;
  margin-right: 300px;
}

[dir="rtl"] .product-grid {
  direction: rtl;
}
```

### Icon Positioning
```css
[dir="rtl"] .header__back {
  margin-right: 24px;
  margin-left: 0;
}

[dir="rtl"] .header__search {
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
