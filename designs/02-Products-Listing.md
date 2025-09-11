# 🛍️ Products Listing Page Design

## Desktop (1024px+)

### Header + Filters Layout
```
┌─────────────────────────────────────────────────────────────────────────────────┐
│ [HN Logo] H.N Laptop Store    Home | Products | Brands | Offers | Contact | [🔍] [🛒] [👤] [📱] │
│              Premium Laptops   _____|__________|________|________|________| Search Cart Login WhatsApp │
└─────────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────────┐
│  Breadcrumb: Home > Products > All Laptops                                     │
└─────────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────────┐
│  ┌─────────────────┐  ┌─────────────────────────────────────────────────────┐  │
│  │   FILTERS       │  │                PRODUCTS GRID                        │  │
│  │   SIDEBAR       │  │                                                     │  │
│  │                 │  │  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐    │  │
│  │  Categories     │  │  │ [Product    │ │ [Product    │ │ [Product    │    │  │
│  │  ┌─────────────┐│  │  │  Image]     │ │  Image]     │ │  Image]     │    │  │
│  │  │ ☐ Gaming    ││  │  │             │ │             │ │             │    │  │
│  │  │ ☑ Business  ││  │  │ Dell XPS 13 │ │ HP Pavilion │ │ Lenovo      │    │  │
│  │  │ ☐ Ultrabook ││  │  │ Intel i7    │ │ 15          │ │ ThinkPad X1 │    │  │
│  │  │ ☐ Everyday  ││  │  │ 16GB RAM    │ │ AMD Ryzen 5 │ │ Intel i7    │    │  │
│  │  └─────────────┘│  │  │ 512GB SSD   │ │ 8GB RAM     │ │ 32GB RAM    │    │  │
│  │                 │  │  │             │ │ 256GB SSD   │ │ 1TB SSD     │    │  │
│  │  Brands         │  │  │ ★★★★☆ (124) │ │ ★★★★☆ (89)  │ │ ★★★★★ (203) │    │  │
│  │  ┌─────────────┐│  │  │             │ │             │ │             │    │  │
│  │  │ ☐ Dell      ││  │  │ $1,200      │ │ $800        │ │ $1,500      │    │  │
│  │  │ ☑ HP        ││  │  │ $1,400      │ │ $950        │ │ $1,800      │    │  │
│  │  │ ☐ Lenovo    ││  │  │ Save $200   │ │ Save $150   │ │ Save $300   │    │  │
│  │  │ ☐ ASUS      ││  │  │             │ │             │ │             │    │  │
│  │  │ ☐ Acer      ││  │  │[Add to Cart]│ │[Add to Cart]│ │[Add to Cart]│    │  │
│  │  └─────────────┘│  │  └─────────────┘ └─────────────┘ └─────────────┘    │  │
│  │                 │  │                                                     │  │
│  │  Price Range    │  │  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐    │  │
│  │  ┌─────────────┐│  │  │ [Product    │ │ [Product    │ │ [Product    │    │  │
│  │  │ $0 ──────── ││  │  │  Image]     │ │  Image]     │ │  Image]     │    │  │
│  │  │     ●────── ││  │  │             │ │             │ │             │    │  │
│  │  │ $5000       ││  │  │ MacBook Air │ │ ASUS ROG    │ │ Acer Swift  │    │  │
│  │  └─────────────┘│  │  │ M2          │ │ Strix       │ │ 3           │    │  │
│  │                 │  │  │ Apple M2    │ │ Intel i7    │ │ Intel i5    │    │  │
│  │  Condition      │  │  │ 8GB RAM     │ │ 16GB RAM    │ │ 8GB RAM     │    │  │
│  │  ┌─────────────┐│  │  │ 256GB SSD   │ │ 1TB SSD     │ │ 512GB SSD   │    │  │
│  │  │ ☑ New       ││  │  │             │ │             │ │             │    │  │
│  │  │ ☐ Refurb    ││  │  │ ★★★★★ (156) │ │ ★★★★☆ (78)  │ │ ★★★★☆ (92)  │    │  │
│  │  │ ☐ Used      ││  │  │             │ │             │ │             │    │  │
│  │  └─────────────┘│  │  │ $1,300      │ │ $1,800      │ │ $900        │    │  │
│  │                 │  │  │ $1,500      │ │ $2,000      │ │ $1,100      │    │  │
│  │  [Clear Filters]│  │  │ Save $200   │ │ Save $200   │ │ Save $200   │    │  │
│  │                 │  │  │             │ │             │ │             │    │  │
│  │                 │  │  │[Add to Cart]│ │[Add to Cart]│ │[Add to Cart]│    │  │
│  │                 │  │  └─────────────┘ └─────────────┘ └─────────────┘    │  │
│  └─────────────────┘  └─────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────────────────┘
```

### Top Controls
```
┌─────────────────────────────────────────────────────────────────────────────────┐
│  Results: 1,247 laptops found                    Sort by: [Price: Low to High ▼] │
│  View: [Grid] [List] [Compare]                    [1] 2 3 4 5 ... 42 [Next →]   │
└─────────────────────────────────────────────────────────────────────────────────┘
```

## Tablet (768px - 1023px)

### Layout Adjustments
- Filters: Collapsible sidebar or drawer
- Products: 2-column grid
- Top controls: Stacked layout
- Pagination: Simplified

## Mobile (320px - 767px)

### Layout Adjustments
- Filters: Full-width drawer from bottom
- Products: Single column
- Top controls: Stacked, simplified
- Pagination: Previous/Next only

### Mobile Filters Drawer
```
┌─────────────────────────────────────┐
│  Filters                    [✕]     │
├─────────────────────────────────────┤
│  Categories                         │
│  ┌─────────────────────────────────┐ │
│  │ ☐ Gaming Laptops               │ │
│  │ ☑ Business Laptops             │ │
│  │ ☐ Ultrabooks                   │ │
│  │ ☐ Everyday Laptops             │ │
│  └─────────────────────────────────┘ │
│                                     │
│  Brands                             │
│  ┌─────────────────────────────────┐ │
│  │ ☐ Dell                         │ │
│  │ ☑ HP                           │ │
│  │ ☐ Lenovo                       │ │
│  │ ☐ ASUS                         │ │
│  │ ☐ Acer                         │ │
│  └─────────────────────────────────┘ │
│                                     │
│  Price Range                        │
│  ┌─────────────────────────────────┐ │
│  │ $0 ──────────●──── $5000       │ │
│  └─────────────────────────────────┘ │
│                                     │
│  Condition                          │
│  ┌─────────────────────────────────┐ │
│  │ ☑ New                          │ │
│  │ ☐ Refurbished                  │ │
│  │ ☐ Used                         │ │
│  └─────────────────────────────────┘ │
│                                     │
│  [Clear All] [Apply Filters]        │
└─────────────────────────────────────┘
```

## Interactive States
- **Filter Changes**: Real-time product updates
- **Sort Options**: Dropdown with multiple criteria
- **View Toggle**: Grid/List view switching
- **Pagination**: Smooth page transitions
- **Loading**: Skeleton cards during filtering
- **Empty State**: No results found message
