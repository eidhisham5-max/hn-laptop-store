# 🎨 Design Wireframes - HN Laptop Store

## Stage 0: Wireframes & Approval

### 📱 Header Component (Desktop)

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│ [HN Logo] H.N Laptop Store    Home | Products | Brands | Offers | Contact | [🔍] [🛒] [👤] [📱] │
│              Premium Laptops   _____|__________|________|________|________| Search Cart Login WhatsApp │
└─────────────────────────────────────────────────────────────────────────────────┘
```

**Features:**
- Sticky header with blur effect on scroll
- Logo with brand name and tagline
- Horizontal navigation with hover effects
- Search bar with autocomplete
- Cart badge with item count
- Login/Account dropdown
- WhatsApp contact button
- Responsive hamburger menu for mobile

### 📱 Header Component (Mobile)

```
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
```

---

### 🏠 Home Page Layout (Desktop)

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                                    HERO SECTION                                 │
│  ┌─────────────────────────────────────────────────────────────────────────┐    │
│  │                    Premium Laptops                                     │    │
│  │                At Unbeatable Prices                                    │    │
│  │                                                                         │    │
│  │    Discover our curated collection of new and refurbished laptops      │    │
│  │    from top brands. Quality guaranteed with 2-year warranty and        │    │
│  │    free delivery across Egypt.                                         │    │
│  │                                                                         │    │
│  │    [Browse Products →] [Get Free Quote 💬]                             │    │
│  │                                                                         │    │
│  │    4.9/5 from 1,200+ reviews | Free Delivery in 24-48h | 2-Year Warranty │    │
│  └─────────────────────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────────┐
│                              TRUSTED BRANDS SECTION                            │
│  ┌─────────────────────────────────────────────────────────────────────────┐    │
│  │                    Trusted by Leading Brands                           │    │
│  │              We partner with the world's most reputable manufacturers  │    │
│  │                                                                         │    │
│  │    [Dell] [HP] [Lenovo] [ASUS] [Acer] [MSI] [Apple]                    │    │
│  └─────────────────────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────────┐
│                              CATEGORIES SECTION                                │
│  ┌─────────────────────────────────────────────────────────────────────────┐    │
│  │                        Shop by Category                                │    │
│  │              Find the perfect laptop for your specific needs           │    │
│  │                                                                         │    │
│  │  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐      │    │
│  │  │    🎮       │ │    💼       │ │    ✨       │ │    🏠       │      │    │
│  │  │   Gaming    │ │  Business   │ │ Ultrabooks  │ │  Everyday   │      │    │
│  │  │  Laptops    │ │  Laptops    │ │             │ │  Laptops    │      │    │
│  │  │             │ │             │ │             │ │             │      │    │
│  │  │ High-perf   │ │ Professional│ │ Lightweight │ │ Affordable  │      │    │
│  │  │ for gaming  │ │ for work    │ │ portable    │ │ for daily   │      │    │
│  │  │ enthusiasts │ │ productivity│ │ premium     │ │ use         │      │    │
│  │  │             │ │             │ │ laptops     │ │             │      │    │
│  │  │ [Explore →] │ │ [Explore →] │ │ [Explore →] │ │ [Explore →] │      │    │
│  │  └─────────────┘ └─────────────┘ └─────────────┘ └─────────────┘      │    │
│  └─────────────────────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────────┐
│                            FEATURED PRODUCTS SECTION                           │
│  ┌─────────────────────────────────────────────────────────────────────────┐    │
│  │                        Hand-Picked Excellence                          │    │
│  │    Discover our curated collection of premium laptops, selected for    │    │
│  │    performance, reliability, and value.                                │    │
│  │                                                                         │    │
│  │  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐      │    │
│  │  │ [Product    │ │ [Product    │ │ [Product    │ │ [Product    │      │    │
│  │  │  Image]     │ │  Image]     │ │  Image]     │ │  Image]     │      │    │
│  │  │             │ │             │ │             │ │             │      │    │
│  │  │ Dell XPS 13 │ │ HP Pavilion │ │ Lenovo      │ │ Dell        │      │    │
│  │  │ Intel i7    │ │ 15          │ │ ThinkPad X1 │ │ Inspiron 15 │      │    │
│  │  │ 16GB RAM    │ │ AMD Ryzen 5 │ │ Intel i7    │ │ Intel i5    │      │    │
│  │  │ 512GB SSD   │ │ 8GB RAM     │ │ 32GB RAM    │ │ 8GB RAM     │      │    │
│  │  │             │ │ 256GB SSD   │ │ 1TB SSD     │ │ 256GB SSD   │      │    │
│  │  │ ★★★★☆ (124) │ │ ★★★★☆ (89)  │ │ ★★★★★ (203) │ │ ★★★★☆ (67)  │      │    │
│  │  │             │ │             │ │             │ │             │      │    │
│  │  │ $1,200      │ │ $800        │ │ $1,500      │ │ $650        │      │    │
│  │  │ $1,400      │ │ $950        │ │ $1,800      │ │ $750        │      │    │
│  │  │ Save $200   │ │ Save $150   │ │ Save $300   │ │ Save $100   │      │    │
│  │  │             │ │             │ │             │ │             │      │    │
│  │  │[Add to Cart]│ │[Add to Cart]│ │[Add to Cart]│ │[Add to Cart]│      │    │
│  │  └─────────────┘ └─────────────┘ └─────────────┘ └─────────────┘      │    │
│  │                                                                         │    │
│  │                        [View All Products]                              │    │
│  └─────────────────────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────────┐
│                              WHY CHOOSE US SECTION                             │
│  ┌─────────────────────────────────────────────────────────────────────────┐    │
│  │                      Your Trust is Our Foundation                      │    │
│  │    We have built our reputation on delivering exceptional value,       │    │
│  │    quality, and service to thousands of customers.                     │    │
│  │                                                                         │    │
│  │  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐                      │    │
│  │  │     ✅      │ │     🚚      │ │     💬      │                      │    │
│  │  │   Quality   │ │ Lightning   │ │ 24/7 Expert │                      │    │
│  │  │ Guaranteed  │ │ Fast        │ │ Support     │                      │    │
│  │  │             │ │ Delivery    │ │             │                      │    │
│  │  │ Every laptop│ │ Free delivery│ │ WhatsApp    │                      │    │
│  │  │ undergoes   │ │ across Egypt│ │ support     │                      │    │
│  │  │ rigorous    │ │ in 24-48    │ │ available   │                      │    │
│  │  │ testing and │ │ hours with  │ │ anytime     │                      │    │
│  │  │ comes with  │ │ real-time   │ │ with our    │                      │    │
│  │  │ comprehensive│ │ tracking    │ │ technical   │                      │    │
│  │  │ warranty    │ │ support     │ │ experts     │                      │    │
│  │  │ support     │ │             │ │ for all     │                      │    │
│  │  │             │ │             │ │ questions   │                      │    │
│  │  │ 99.8%       │ │ 24-48       │ │ 24/7        │                      │    │
│  │  │ Quality     │ │ Hours       │ │ Available   │                      │    │
│  │  │ Rate        │ │             │ │             │                      │    │
│  │  └─────────────┘ └─────────────┘ └─────────────┘                      │    │
│  └─────────────────────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────────────────────┘
```

---

### 🏠 Home Page Layout (Mobile)

```
┌─────────────────────────────────────┐
│                                    │
│           HERO SECTION             │
│  ┌─────────────────────────────┐   │
│  │      Premium Laptops        │   │
│  │    At Unbeatable Prices     │   │
│  │                             │   │
│  │  Discover our curated       │   │
│  │  collection of new and      │   │
│  │  refurbished laptops from   │   │
│  │  top brands. Quality        │   │
│  │  guaranteed with 2-year     │   │
│  │  warranty and free          │   │
│  │  delivery across Egypt.     │   │
│  │                             │   │
│  │  [Browse Products →]        │   │
│  │  [Get Free Quote 💬]        │   │
│  │                             │   │
│  │  4.9/5 from 1,200+ reviews │   │
│  │  Free Delivery 24-48h       │   │
│  │  2-Year Warranty            │   │
│  └─────────────────────────────┘   │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│        TRUSTED BRANDS SECTION       │
│  ┌─────────────────────────────┐   │
│  │   Trusted by Leading Brands │   │
│  │                             │   │
│  │  [Dell] [HP] [Lenovo]       │   │
│  │  [ASUS] [Acer] [MSI]        │   │
│  └─────────────────────────────┘   │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│        CATEGORIES SECTION           │
│  ┌─────────────────────────────┐   │
│  │      Shop by Category       │   │
│  │                             │   │
│  │  ┌─────────┐ ┌─────────┐    │   │
│  │  │   🎮    │ │   💼    │    │   │
│  │  │ Gaming  │ │Business │    │   │
│  │  │ Laptops │ │ Laptops │    │   │
│  │  └─────────┘ └─────────┘    │   │
│  │                             │   │
│  │  ┌─────────┐ ┌─────────┐    │   │
│  │  │   ✨    │ │   🏠    │    │   │
│  │  │Ultrabook│ │Everyday │    │   │
│  │  │         │ │ Laptops │    │   │
│  │  └─────────┘ └─────────┘    │   │
│  └─────────────────────────────┘   │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│      FEATURED PRODUCTS SECTION      │
│  ┌─────────────────────────────┐   │
│  │   Hand-Picked Excellence    │   │
│  │                             │   │
│  │  ┌─────────────────────┐    │   │
│  │  │ [Product Image]     │    │   │
│  │  │                     │    │   │
│  │  │ Dell XPS 13         │    │   │
│  │  │ Intel i7, 16GB RAM  │    │   │
│  │  │ 512GB SSD           │    │   │
│  │  │                     │    │   │
│  │  │ ★★★★☆ (124)         │    │   │
│  │  │                     │    │   │
│  │  │ $1,200 $1,400       │    │   │
│  │  │ Save $200           │    │   │
│  │  │                     │    │   │
│  │  │ [Add to Cart]       │    │   │
│  │  └─────────────────────┘    │   │
│  │                             │   │
│  │  ┌─────────────────────┐    │   │
│  │  │ [Product Image]     │    │   │
│  │  │                     │    │   │
│  │  │ HP Pavilion 15      │    │   │
│  │  │ AMD Ryzen 5, 8GB    │    │   │
│  │  │ 256GB SSD           │    │   │
│  │  │                     │    │   │
│  │  │ ★★★★☆ (89)          │    │   │
│  │  │                     │    │   │
│  │  │ $800 $950           │    │   │
│  │  │ Save $150           │    │   │
│  │  │                     │    │   │
│  │  │ [Add to Cart]       │    │   │
│  │  └─────────────────────┘    │   │
│  │                             │   │
│  │      [View All Products]    │   │
│  └─────────────────────────────┘   │
└─────────────────────────────────────┘
```

---

### 🛍️ Product Detail Page Layout (Desktop)

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│  Breadcrumb: Home > Products > Dell Laptops > Dell XPS 13                      │
└─────────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────────┐
│  ┌─────────────────────┐  ┌─────────────────────────────────────────────────┐  │
│  │                     │  │ Dell XPS 13                                     │  │
│  │  [Main Image]       │  │                                                 │  │
│  │                     │  │ Intel Core i7-1165G7, 16GB RAM, 512GB SSD      │  │
│  │  ┌─┬─┬─┬─┬─┐        │  │                                                 │  │
│  │  │1│2│3│4│5│        │  │ ★★★★☆ 4.8 (124 reviews)                        │  │
│  │  └─┴─┴─┴─┴─┘        │  │                                                 │  │
│  │                     │  │ ┌─────────────────────────────────────────────┐ │  │
│  │  [Zoom on hover]    │  │ │ $1,200.00                                  │ │  │
│  │                     │  │ │ $1,400.00                                  │ │  │
│  │                     │  │ │ Save $200 (14% off)                        │ │  │
│  │                     │  │ └─────────────────────────────────────────────┘ │  │
│  │                     │  │                                                 │  │
│  │                     │  │ ✅ In Stock (5 available)                      │  │
│  │                     │  │ 🚚 Free delivery in 24-48 hours               │  │
│  │                     │  │ 🔒 2-year warranty included                   │  │
│  │                     │  │                                                 │  │
│  │                     │  │ Quantity: [1] [▼]                              │  │
│  │                     │  │                                                 │  │
│  │                     │  │ [Add to Cart] [Buy Now] [💬 WhatsApp]          │  │
│  │                     │  │                                                 │  │
│  │                     │  │ 🔒 Secure checkout                             │  │
│  │                     │  │ 💳 Multiple payment options                    │  │
│  │                     │  │ 🔄 30-day return policy                        │  │
│  └─────────────────────┘  └─────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────────┐
│  ┌─────────────────────────────────────────────────────────────────────────┐    │
│  │                              Specifications                             │    │
│  │  ┌─────────────────────────────────────────────────────────────────┐    │    │
│  │  │ Processor    │ Intel Core i7-1165G7 (4 cores, 8 threads)       │    │    │
│  │  │ Memory       │ 16GB LPDDR4X RAM (soldered)                     │    │    │
│  │  │ Storage      │ 512GB PCIe NVMe SSD                             │    │    │
│  │  │ Display      │ 13.4" FHD+ (1920x1200) InfinityEdge             │    │    │
│  │  │ Graphics     │ Intel Iris Xe Graphics                          │    │    │
│  │  │ Ports        │ 2x Thunderbolt 4, 1x microSD card reader        │    │    │
│  │  │ Battery      │ 52Whr, up to 12 hours                           │    │    │
│  │  │ Weight       │ 1.27 kg (2.8 lbs)                               │    │    │
│  │  │ OS           │ Windows 11 Home                                 │    │    │
│  │  └─────────────────────────────────────────────────────────────────┘    │    │
│  └─────────────────────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────────┐
│  ┌─────────────────────────────────────────────────────────────────────────┐    │
│  │                              Customer Reviews                           │    │
│  │  ┌─────────────────────────────────────────────────────────────────┐    │    │
│  │  │ Overall Rating: ★★★★☆ 4.8/5 (124 reviews)                      │    │    │
│  │  │                                                                 │    │    │
│  │  │ ★★★★★ 85%  ★★★★☆ 12%  ★★★☆☆ 2%  ★★☆☆☆ 1%  ★☆☆☆☆ 0%            │    │    │
│  │  │                                                                 │    │    │
│  │  │ ┌─────────────────────────────────────────────────────────────┐ │    │    │
│  │  │ │ Ahmed M.                    ★★★★★                           │ │    │    │
│  │  │ │ "Excellent laptop! Fast performance and great build quality"│ │    │    │
│  │  │ │ 2 days ago                                                  │ │    │    │
│  │  │ └─────────────────────────────────────────────────────────────┘ │    │    │
│  │  │                                                                 │    │    │
│  │  │ ┌─────────────────────────────────────────────────────────────┐ │    │    │
│  │  │ │ Sara K.                     ★★★★☆                           │ │    │    │
│  │  │ │ "Good laptop but battery could be better. Overall satisfied"│ │    │    │
│  │  │ │ 1 week ago                                                  │ │    │    │
│  │  │ └─────────────────────────────────────────────────────────────┘ │    │    │
│  │  └─────────────────────────────────────────────────────────────────┘    │    │
│  └─────────────────────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────────┐
│  ┌─────────────────────────────────────────────────────────────────────────┐    │
│  │                           Related Products                              │    │
│  │  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐      │    │
│  │  │ [Related    │ │ [Related    │ │ [Related    │ │ [Related    │      │    │
│  │  │  Product]   │ │  Product]   │ │  Product]   │ │  Product]   │      │    │
│  │  │             │ │             │ │             │ │             │      │    │
│  │  │ Dell XPS 15 │ │ HP Spectre  │ │ Lenovo      │ │ MacBook Air │      │    │
│  │  │ $1,800      │ │ x360        │ │ ThinkPad    │ │ M2          │      │    │
│  │  │ $2,000      │ │ $1,100      │ │ X1 Carbon   │ │ $1,300      │      │    │
│  │  │             │ │ $1,300      │ │ $1,600      │ │ $1,500      │      │    │
│  │  │ [View]      │ │             │ │ $1,800      │ │             │      │    │
│  │  │             │ │ [View]      │ │             │ │ [View]      │      │    │
│  │  └─────────────┘ └─────────────┘ └─────────────┘ └─────────────┘      │    │
│  └─────────────────────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────────────────────┘
```

---

## 🎨 Design System Overview

### Color Palette
- **Primary**: #007AFF (Blue)
- **Secondary**: #34C759 (Green)
- **Accent**: #FF3B30 (Red)
- **Neutral**: #1D1D1F (Dark), #86868B (Medium), #F2F2F7 (Light)
- **Background**: #FFFFFF (White), #F5F7FA (Light Gray)

### Typography
- **Headings**: Inter, system-ui, sans-serif
- **Body**: Inter, system-ui, sans-serif
- **Sizes**: 12px, 14px, 16px, 18px, 24px, 32px, 48px, 64px

### Spacing Scale
- **Base**: 4px
- **Scale**: 4px, 8px, 12px, 16px, 24px, 32px, 48px, 64px, 96px

### Components
- **Buttons**: Primary, Secondary, Outline, Ghost
- **Cards**: Product cards, Feature cards, Info cards
- **Forms**: Inputs, Selects, Checkboxes, Radio buttons
- **Navigation**: Header, Footer, Breadcrumbs, Pagination
- **Feedback**: Toasts, Modals, Loading states, Error states

---

## 📋 Next Steps

1. **Review & Approval**: Please review these wireframes and provide feedback
2. **Design System**: Once approved, I'll create the complete design system
3. **High-Fidelity Designs**: Create detailed Figma designs for all pages
4. **Component Library**: Build React components with Tailwind CSS
5. **Implementation**: Integrate components into existing pages
6. **Testing & Polish**: Final testing and optimization

**Estimated Timeline**: 5-9 weeks for complete implementation
**Quality Level**: Production-ready, professional e-commerce standard

---

*Please review these wireframes and let me know if you'd like any modifications before proceeding to the next stage.*
