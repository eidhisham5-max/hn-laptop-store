# 📱 Responsive Design Breakpoints

## Breakpoint System

### Mobile First Approach
- **Base**: 320px (Mobile)
- **Small**: 640px (Large Mobile)
- **Medium**: 768px (Tablet)
- **Large**: 1024px (Desktop)
- **Extra Large**: 1280px (Large Desktop)
- **2X Large**: 1536px (Ultra Wide)

## Layout Adaptations

### Header Component
```
Mobile (320-767px):
┌─────────────────────────────────────┐
│ [HN] H.N Laptop Store    [🔍][🛒][☰] │
│      Premium Laptops                │
├─────────────────────────────────────┤
│ ☰ Menu:                            │
│   • Home                           │
│   • Products                       │
│   • Brands                         │
│   • Offers                         │
│   • Contact                        │
│   • Track Order                    │
│   • Login                          │
│   • WhatsApp                       │
└─────────────────────────────────────┘

Tablet (768-1023px):
┌─────────────────────────────────────────────────────────────────┐
│ [HN Logo] H.N Laptop Store    Home | Products | Brands | [🔍] [🛒] [👤] [☰] │
│              Premium Laptops   _____|__________|________| Search Cart Login Menu │
└─────────────────────────────────────────────────────────────────┘

Desktop (1024px+):
┌─────────────────────────────────────────────────────────────────────────────────┐
│ [HN Logo] H.N Laptop Store    Home | Products | Brands | Offers | Contact | [🔍] [🛒] [👤] [📱] │
│              Premium Laptops   _____|__________|________|________|________| Search Cart Login WhatsApp │
└─────────────────────────────────────────────────────────────────────────────────┘
```

### Product Grid
```
Mobile (320-767px):
┌─────────────────────────────────────┐
│  ┌─────────────────────────────────┐ │
│  │ [Product Image]                │ │
│  │ Dell XPS 13                    │ │
│  │ Intel i7, 16GB RAM, 512GB SSD  │ │
│  │ ★★★★☆ (124)                    │ │
│  │ $1,200.00 $1,400.00            │ │
│  │ Save $200                      │ │
│  │ [Add to Cart]                  │ │
│  └─────────────────────────────────┘ │
│                                     │
│  ┌─────────────────────────────────┐ │
│  │ [Product Image]                │ │
│  │ HP Pavilion 15                 │ │
│  │ AMD Ryzen 5, 8GB RAM, 256GB SSD│ │
│  │ ★★★★☆ (89)                     │ │
│  │ $800.00 $950.00                │ │
│  │ Save $150                      │ │
│  │ [Add to Cart]                  │ │
│  └─────────────────────────────────┘ │
└─────────────────────────────────────┘

Tablet (768-1023px):
┌─────────────────────────────────────────────────────────────────┐
│  ┌─────────────────────┐ ┌─────────────────────┐                │
│  │ [Product Image]    │ │ [Product Image]    │                │
│  │ Dell XPS 13        │ │ HP Pavilion 15     │                │
│  │ Intel i7, 16GB RAM │ │ AMD Ryzen 5, 8GB   │                │
│  │ 512GB SSD          │ │ 256GB SSD          │                │
│  │ ★★★★☆ (124)        │ │ ★★★★☆ (89)         │                │
│  │ $1,200.00 $1,400.00│ │ $800.00 $950.00    │                │
│  │ Save $200          │ │ Save $150          │                │
│  │ [Add to Cart]      │ │ [Add to Cart]      │                │
│  └─────────────────────┘ └─────────────────────┘                │
└─────────────────────────────────────────────────────────────────┘

Desktop (1024px+):
┌─────────────────────────────────────────────────────────────────────────────────┐
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐                │
│  │ [Product    │ │ [Product    │ │ [Product    │ │ [Product    │                │
│  │  Image]     │ │  Image]     │ │  Image]     │ │  Image]     │                │
│  │             │ │             │ │             │ │             │                │
│  │ Dell XPS 13 │ │ HP Pavilion │ │ Lenovo      │ │ MacBook Air │                │
│  │ Intel i7    │ │ 15          │ │ ThinkPad X1 │ │ M2          │                │
│  │ 16GB RAM    │ │ AMD Ryzen 5 │ │ Intel i7    │ │ Apple M2    │                │
│  │ 512GB SSD   │ │ 8GB RAM     │ │ 32GB RAM    │ │ 8GB RAM     │                │
│  │             │ │ 256GB SSD   │ │ 1TB SSD     │ │ 256GB SSD   │                │
│  │ ★★★★☆ (124) │ │ ★★★★☆ (89)  │ │ ★★★★★ (203) │ │ ★★★★★ (156) │                │
│  │             │ │             │ │             │ │             │                │
│  │ $1,200      │ │ $800        │ │ $1,500      │ │ $1,300      │                │
│  │ $1,400      │ │ $950        │ │ $1,800      │ │ $1,500      │                │
│  │ Save $200   │ │ Save $150   │ │ Save $300   │ │ Save $200   │                │
│  │             │ │             │ │             │ │             │                │
│  │[Add to Cart]│ │[Add to Cart]│ │[Add to Cart]│ │[Add to Cart]│                │
│  └─────────────┘ └─────────────┘ └─────────────┘ └─────────────┘                │
└─────────────────────────────────────────────────────────────────────────────────┘
```

### Forms
```
Mobile (320-767px):
┌─────────────────────────────────────┐
│  Contact Form                       │
│                                     │
│  First Name *                       │
│  ┌─────────────────────────────────┐ │
│  │ Ahmed                           │ │
│  └─────────────────────────────────┘ │
│                                     │
│  Last Name *                        │
│  ┌─────────────────────────────────┐ │
│  │ Mohamed                         │ │
│  └─────────────────────────────────┘ │
│                                     │
│  Email Address *                    │
│  ┌─────────────────────────────────┐ │
│  │ ahmed.mohamed@email.com         │ │
│  └─────────────────────────────────┘ │
│                                     │
│  Phone Number *                     │
│  ┌─────────────────────────────────┐ │
│  │ +20 100 000 0000                │ │
│  └─────────────────────────────────┘ │
│                                     │
│  Message *                          │
│  ┌─────────────────────────────────┐ │
│  │ I'm interested in...            │ │
│  │                                 │ │
│  │                                 │ │
│  └─────────────────────────────────┘ │
│                                     │
│  [Send Message]                     │
└─────────────────────────────────────┘

Desktop (1024px+):
┌─────────────────────────────────────────────────────────────────────────────────┐
│  ┌─────────────────────────────────────────────────────────────────────────┐    │
│  │                              Contact Form                              │    │
│  │                                                                         │    │
│  │  ┌─────────────────────────────────────────────────────────────────┐    │    │
│  │  │ First Name *                    Last Name *                      │    │    │
│  │  │ ┌─────────────────────────────┐ ┌─────────────────────────────┐ │    │    │
│  │  │ │ Ahmed                       │ │ Mohamed                     │ │    │    │
│  │  │ └─────────────────────────────┘ └─────────────────────────────┘ │    │    │
│  │  │                                                             │    │    │
│  │  │ Email Address *                                             │    │    │
│  │  │ ┌─────────────────────────────────────────────────────────┐ │    │    │
│  │  │ │ ahmed.mohamed@email.com                                 │ │    │    │
│  │  │ └─────────────────────────────────────────────────────────┘ │    │    │
│  │  │                                                             │    │    │
│  │  │ Phone Number *                                             │    │    │
│  │  │ ┌─────────────────────────────────────────────────────────┐ │    │    │
│  │  │ │ +20 100 000 0000                                       │ │    │    │
│  │  │ └─────────────────────────────────────────────────────────┘ │    │    │
│  │  │                                                             │    │    │
│  │  │ Message *                                                  │    │    │
│  │  │ ┌─────────────────────────────────────────────────────────┐ │    │    │
│  │  │ │ I'm interested in purchasing a laptop for my business...│ │    │    │
│  │  │ │                                                         │ │    │    │
│  │  │ │                                                         │ │    │    │
│  │  │ └─────────────────────────────────────────────────────────┘ │    │    │
│  │  │                                                             │    │    │
│  │  │ [Send Message]                                             │    │    │
│  │  └─────────────────────────────────────────────────────────────┘    │    │
│  └─────────────────────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────────────────────┘
```

## Navigation Patterns

### Mobile Navigation
- **Hamburger Menu**: Slide-out navigation drawer
- **Bottom Navigation**: Fixed bottom bar for main actions
- **Tab Navigation**: Horizontal scrollable tabs
- **Floating Action Button**: Quick access to primary actions

### Tablet Navigation
- **Sidebar Navigation**: Collapsible sidebar menu
- **Top Navigation**: Horizontal navigation bar
- **Breadcrumb Navigation**: Clear page hierarchy
- **Quick Actions**: Floating action buttons

### Desktop Navigation
- **Top Navigation**: Full horizontal navigation
- **Sidebar Navigation**: Persistent sidebar
- **Breadcrumb Navigation**: Full breadcrumb trail
- **Contextual Actions**: Right-click menus

## Touch Targets

### Mobile (320-767px)
- **Minimum Size**: 44px × 44px
- **Recommended Size**: 48px × 48px
- **Spacing**: 8px minimum between targets
- **Button Height**: 48px minimum

### Tablet (768-1023px)
- **Minimum Size**: 40px × 40px
- **Recommended Size**: 44px × 44px
- **Spacing**: 6px minimum between targets
- **Button Height**: 44px minimum

### Desktop (1024px+)
- **Minimum Size**: 32px × 32px
- **Recommended Size**: 36px × 36px
- **Spacing**: 4px minimum between targets
- **Button Height**: 36px minimum

## Typography Scaling

### Mobile (320-767px)
- **H1**: 24px (1.5rem)
- **H2**: 20px (1.25rem)
- **H3**: 18px (1.125rem)
- **Body**: 16px (1rem)
- **Small**: 14px (0.875rem)

### Tablet (768-1023px)
- **H1**: 28px (1.75rem)
- **H2**: 24px (1.5rem)
- **H3**: 20px (1.25rem)
- **Body**: 16px (1rem)
- **Small**: 14px (0.875rem)

### Desktop (1024px+)
- **H1**: 32px (2rem)
- **H2**: 28px (1.75rem)
- **H3**: 24px (1.5rem)
- **Body**: 16px (1rem)
- **Small**: 14px (0.875rem)

## Spacing System

### Mobile (320-767px)
- **Container Padding**: 16px
- **Section Spacing**: 32px
- **Element Spacing**: 16px
- **Grid Gap**: 16px

### Tablet (768-1023px)
- **Container Padding**: 24px
- **Section Spacing**: 48px
- **Element Spacing**: 24px
- **Grid Gap**: 24px

### Desktop (1024px+)
- **Container Padding**: 32px
- **Section Spacing**: 64px
- **Element Spacing**: 32px
- **Grid Gap**: 32px

## Performance Considerations

### Mobile (320-767px)
- **Image Optimization**: WebP format, lazy loading
- **Bundle Size**: Code splitting, tree shaking
- **Network**: Offline support, service workers
- **Memory**: Efficient state management

### Tablet (768-1023px)
- **Image Optimization**: Responsive images, srcset
- **Bundle Size**: Route-based code splitting
- **Network**: Caching strategies
- **Memory**: Optimized re-renders

### Desktop (1024px+)
- **Image Optimization**: High-resolution images
- **Bundle Size**: Full feature set
- **Network**: CDN optimization
- **Memory**: Advanced caching
