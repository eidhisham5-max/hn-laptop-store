# 🎭 Interactive States & Animations

## Button States

### Primary Button
```
Default State:
┌─────────────────────────────────────┐
│ [Add to Cart]                       │
└─────────────────────────────────────┘
- Background: #007AFF
- Text: White
- Shadow: 0 2px 4px rgba(0,0,0,0.1)

Hover State:
┌─────────────────────────────────────┐
│ [Add to Cart]                       │
└─────────────────────────────────────┘
- Background: #0062CC
- Transform: translateY(-1px)
- Shadow: 0 4px 6px rgba(0,0,0,0.1)
- Transition: all 0.2s ease

Active State:
┌─────────────────────────────────────┐
│ [Add to Cart]                       │
└─────────────────────────────────────┘
- Background: #004999
- Transform: translateY(0)
- Shadow: 0 1px 2px rgba(0,0,0,0.1)
- Transition: all 0.1s ease

Loading State:
┌─────────────────────────────────────┐
│ [⏳ Adding...]                      │
└─────────────────────────────────────┘
- Background: #0062CC
- Cursor: not-allowed
- Spinner: Rotating animation
- Text: "Adding..."

Disabled State:
┌─────────────────────────────────────┐
│ [Out of Stock]                      │
└─────────────────────────────────────┘
- Background: #E0E0E0
- Text: #9E9E9E
- Cursor: not-allowed
- Shadow: none
```

### Secondary Button
```
Default State:
┌─────────────────────────────────────┐
│ [Quick View]                        │
└─────────────────────────────────────┘
- Background: Transparent
- Border: 2px solid #007AFF
- Text: #007AFF

Hover State:
┌─────────────────────────────────────┐
│ [Quick View]                        │
└─────────────────────────────────────┘
- Background: #E6F2FF
- Border: 2px solid #0062CC
- Text: #0062CC
- Transition: all 0.2s ease
```

## Card States

### Product Card
```
Default State:
┌─────────────────────────────────────┐
│ [Product Image]                     │
│                                     │
│ Dell XPS 13                         │
│ Intel i7, 16GB RAM, 512GB SSD      │
│ ★★★★☆ (124)                        │
│ $1,200.00 $1,400.00                │
│ Save $200                          │
│ [Add to Cart]                      │
└─────────────────────────────────────┘
- Shadow: 0 2px 12px rgba(0,0,0,0.08)
- Border: 1px solid #EEEEEE
- Transform: translateY(0)

Hover State:
┌─────────────────────────────────────┐
│ [Product Image]                     │
│                                     │
│ Dell XPS 13                         │
│ Intel i7, 16GB RAM, 512GB SSD      │
│ ★★★★☆ (124)                        │
│ $1,200.00 $1,400.00                │
│ Save $200                          │
│ [Add to Cart]                      │
└─────────────────────────────────────┘
- Shadow: 0 10px 15px rgba(0,0,0,0.1)
- Border: 1px solid #99CCFF
- Transform: translateY(-4px)
- Transition: all 0.3s ease

Focus State:
┌─────────────────────────────────────┐
│ [Product Image]                     │
│                                     │
│ Dell XPS 13                         │
│ Intel i7, 16GB RAM, 512GB SSD      │
│ ★★★★☆ (124)                        │
│ $1,200.00 $1,400.00                │
│ Save $200                          │
│ [Add to Cart]                      │
└─────────────────────────────────────┘
- Outline: 2px solid #007AFF
- Outline-offset: 2px
```

## Form States

### Input Field
```
Default State:
┌─────────────────────────────────────┐
│ Email Address *                     │
│ ┌─────────────────────────────────┐ │
│ │ ahmed.mohamed@email.com         │ │
│ └─────────────────────────────────┘ │
└─────────────────────────────────────┘
- Border: 2px solid #E0E0E0
- Background: #FFFFFF

Focus State:
┌─────────────────────────────────────┐
│ Email Address *                     │
│ ┌─────────────────────────────────┐ │
│ │ ahmed.mohamed@email.com         │ │
│ └─────────────────────────────────┘ │
└─────────────────────────────────────┘
- Border: 2px solid #007AFF
- Box-shadow: 0 0 0 3px rgba(0,122,255,0.1)
- Transition: all 0.2s ease

Error State:
┌─────────────────────────────────────┐
│ Email Address *                     │
│ ┌─────────────────────────────────┐ │
│ │ invalid-email                   │ │
│ └─────────────────────────────────┘ │
│ Please enter a valid email address  │
└─────────────────────────────────────┘
- Border: 2px solid #FF3B30
- Box-shadow: 0 0 0 3px rgba(255,59,48,0.1)
- Error text: #FF3B30

Success State:
┌─────────────────────────────────────┐
│ Email Address *                     │
│ ┌─────────────────────────────────┐ │
│ │ ahmed.mohamed@email.com ✓       │ │
│ └─────────────────────────────────┘ │
└─────────────────────────────────────┘
- Border: 2px solid #34C759
- Checkmark: Green checkmark icon
```

## Loading States

### Skeleton Loading
```
Product Card Skeleton:
┌─────────────────────────────────────┐
│ ┌─────────────────────────────────┐ │
│ │                                 │ │
│ │                                 │ │
│ │                                 │ │
│ │                                 │ │
│ └─────────────────────────────────┘ │
│                                     │
│ ┌─────────────────────────────────┐ │
│ │                                 │ │
│ └─────────────────────────────────┘ │
│                                     │
│ ┌─────────────────────────────────┐ │
│ │                                 │ │
│ └─────────────────────────────────┘ │
│                                     │
│ ┌─────────────────────────────────┐ │
│ │                                 │ │
│ └─────────────────────────────────┘ │
│                                     │
│ ┌─────────────────────────────────┐ │
│ │                                 │ │
│ └─────────────────────────────────┘ │
└─────────────────────────────────────┘
- Background: Linear gradient animation
- Animation: Wave effect
- Duration: 1.5s infinite
```

### Spinner Loading
```
Loading Spinner:
┌─────────────────────────────────────┐
│            ⏳                        │
│        Loading products...          │
└─────────────────────────────────────┘
- Spinner: Rotating circle
- Animation: 1s linear infinite
- Text: Loading message
```

## Navigation States

### Header Navigation
```
Default State:
┌─────────────────────────────────────┐
│ Home | Products | Brands | Contact  │
└─────────────────────────────────────┘
- Text: #1D1D1F
- Underline: None

Hover State:
┌─────────────────────────────────────┐
│ Home | Products | Brands | Contact  │
└─────────────────────────────────────┘
- Text: #007AFF
- Underline: 2px solid #007AFF
- Transition: all 0.3s ease

Active State:
┌─────────────────────────────────────┐
│ Home | Products | Brands | Contact  │
└─────────────────────────────────────┘
- Text: #007AFF
- Background: #E6F2FF
- Underline: 2px solid #007AFF
```

### Mobile Menu
```
Closed State:
┌─────────────────────────────────────┐
│ [HN Logo]                    [☰]   │
└─────────────────────────────────────┘

Open State:
┌─────────────────────────────────────┐
│ [HN Logo]                    [✕]   │
├─────────────────────────────────────┤
│ ☰ Menu:                            │
│   • Home                           │
│   • Products                       │
│   • Brands                         │
│   • Contact                        │
│   • Track Order                    │
│   • Login                          │
│   • WhatsApp                       │
└─────────────────────────────────────┘
- Animation: Slide down from top
- Duration: 0.3s ease
- Backdrop: Semi-transparent overlay
```

## Modal States

### Product Quick View
```
Backdrop:
┌─────────────────────────────────────┐
│                                     │
│  ┌─────────────────────────────────┐ │
│  │ [Product Image]                │ │
│  │                                 │ │
│  │ Dell XPS 13                     │ │
│  │ Intel i7, 16GB RAM, 512GB SSD  │ │
│  │ ★★★★☆ (124)                    │ │
│  │ $1,200.00 $1,400.00            │ │
│  │ Save $200                      │ │
│  │                                 │ │
│  │ [Add to Cart] [Close]           │ │
│  └─────────────────────────────────┘ │
│                                     │
└─────────────────────────────────────┘
- Backdrop: rgba(0,0,0,0.5)
- Modal: Centered, scale animation
- Animation: Scale from 0.8 to 1.0
- Duration: 0.3s ease
```

## Toast Notifications

### Success Toast
```
┌─────────────────────────────────────┐
│ ✅ Product added to cart!           │
└─────────────────────────────────────┘
- Background: #34C759
- Text: White
- Icon: Checkmark
- Animation: Slide in from right
- Duration: 3s auto-dismiss
```

### Error Toast
```
┌─────────────────────────────────────┐
│ ❌ Failed to add product to cart    │
└─────────────────────────────────────┘
- Background: #FF3B30
- Text: White
- Icon: X mark
- Animation: Slide in from right
- Duration: 5s auto-dismiss
```

### Warning Toast
```
┌─────────────────────────────────────┐
│ ⚠️ Product is out of stock          │
└─────────────────────────────────────┘
- Background: #FF9500
- Text: White
- Icon: Warning triangle
- Animation: Slide in from right
- Duration: 4s auto-dismiss
```

## Animation Principles

### Easing Functions
- **Ease Out**: cubic-bezier(0, 0, 0.2, 1) - For entrances
- **Ease In**: cubic-bezier(0.4, 0, 1, 1) - For exits
- **Ease In Out**: cubic-bezier(0.4, 0, 0.2, 1) - For transitions
- **Bounce**: cubic-bezier(0.68, -0.55, 0.265, 1.55) - For playful elements

### Duration Guidelines
- **Micro-interactions**: 150ms
- **Standard transitions**: 200ms
- **Complex animations**: 300ms
- **Page transitions**: 500ms

### Performance Considerations
- **Transform & Opacity**: Use for smooth animations
- **Avoid**: Changing layout properties (width, height, margin)
- **Hardware Acceleration**: Use transform3d() for GPU acceleration
- **Reduced Motion**: Respect prefers-reduced-motion media query

## Accessibility

### Focus States
- **Visible Focus**: 2px solid outline
- **Focus Ring**: 3px solid with offset
- **Color Contrast**: 3:1 minimum ratio
- **Keyboard Navigation**: Tab order logical

### Motion Preferences
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Screen Reader Support
- **ARIA Labels**: Descriptive labels for interactive elements
- **Live Regions**: Announce dynamic content changes
- **Role Attributes**: Proper semantic roles
- **State Announcements**: Current state of interactive elements
