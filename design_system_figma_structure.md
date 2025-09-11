# دليل نظام التصميم - هيكل Figma
## H.N Laptop Store Design System

---

## 📋 هيكل الملف والصفحات

### 1. صفحة التوكينز (Design Tokens)
**اسم الصفحة**: `🎨 Design Tokens`

#### الإطارات (Frames):
```
├── 🎨 Color Palette
│   ├── Primary Colors (Blue Spectrum)
│   ├── Accent Colors (Orange)
│   ├── Semantic Colors (Success, Warning, Error, Info)
│   ├── Neutral Colors (Gray Scale)
│   └── Background & Surface Colors
│
├── 📝 Typography Scale
│   ├── Arabic Typography (Tajawal, Noto Sans Arabic)
│   ├── English Typography (Inter, Poppins)
│   ├── Font Weights (300-800)
│   └── Size & Line Height Combinations
│
├── 📏 Spacing System
│   ├── Base Unit (8px)
│   ├── Spacing Scale (4px - 256px)
│   └── Component Spacing Examples
│
├── 🔲 Border Radius
│   ├── Radius Scale (0px - 24px + full)
│   └── Component Applications
│
├── 🌫️ Elevation & Shadows
│   ├── Shadow Scale (xs - 2xl)
│   ├── Custom Shadows (subtle, card, button, modal)
│   └── Elevation Examples
│
└── 🎭 Motion & Animation
    ├── Duration Scale (120ms - 500ms)
    ├── Easing Functions
    └── Animation Examples
```

### 2. صفحة المكونات الأساسية (Foundation Components)
**اسم الصفحة**: `🧩 Foundation Components`

#### الإطارات (Frames):
```
├── 🔘 Buttons
│   ├── Primary (Small, Medium, Large)
│   ├── Secondary (Small, Medium, Large)
│   ├── Ghost (Small, Medium, Large)
│   ├── Icon Buttons (24px, 32px, 40px)
│   └── States (Default, Hover, Active, Disabled, Focus)
│
├── 📝 Form Elements
│   ├── Text Inputs (Default, Error, Disabled, Focus)
│   ├── Select Dropdowns
│   ├── Checkboxes & Radio Buttons
│   ├── Toggle Switches
│   └── Form Labels & Help Text
│
├── 🏷️ Typography Components
│   ├── Headings (H1-H6)
│   ├── Body Text (XL, L, M, S, XS)
│   ├── Labels (Large, Medium, Small)
│   └── Links (Default, Hover, Visited)
│
├── 🎯 Icons
│   ├── System Icons (24px, 20px, 16px)
│   ├── Product Icons
│   ├── Social Icons
│   └── Brand Icons
│
└── 🏷️ Badges & Tags
    ├── Status Badges (Success, Warning, Error)
    ├── Category Tags
    └── Size Variations
```

### 3. صفحة مكونات المنتج (Product Components)
**اسم الصفحة**: `🛍️ Product Components`

#### الإطارات (Frames):
```
├── 🃏 Product Cards
│   ├── Standard Card (Mobile 2-col, Desktop 4-col)
│   ├── Featured Card (Hero Products)
│   ├── Compact Card (Related Products)
│   └── Card States (Default, Hover, Loading, Error)
│
├── 🖼️ Product Gallery
│   ├── Main Image Display
│   ├── Thumbnail Navigation
│   ├── Zoom Functionality
│   └── Mobile Swipe Gallery
│
├── 💰 Pricing Components
│   ├── Price Display (Regular, Sale, Range)
│   ├── Discount Badges
│   ├── Currency Formatting
│   └── Payment Options
│
├── ⭐ Rating & Reviews
│   ├── Star Rating (5-star system)
│   ├── Review Cards
│   ├── Review Summary
│   └── Rating Distribution
│
└── 📊 Product Information
    ├── Specification Tables
    ├── Feature Lists
    ├── Stock Status Indicators
    └── Brand Logos
```

### 4. صفحة مكونات التنقل (Navigation Components)
**اسم الصفحة**: `🧭 Navigation Components`

#### الإطارات (Frames):
```
├── 🏠 Header Components
│   ├── Desktop Header (Full Navigation)
│   ├── Mobile Header (Hamburger Menu)
│   ├── Search Bar (Expanded & Collapsed)
│   └── User Account Menu
│
├── 📱 Mobile Navigation
│   ├── Bottom Navigation Bar
│   ├── Slide-out Menu
│   ├── Category Drawer
│   └── Search Overlay
│
├── 🔗 Breadcrumbs
│   ├── Standard Breadcrumbs
│   ├── Mobile Breadcrumbs
│   └── Interactive States
│
├── 📑 Pagination
│   ├── Number Pagination
│   ├── Load More Button
│   ├── Infinite Scroll Indicator
│   └── Mobile Pagination
│
└── 🏷️ Filters & Sorting
    ├── Filter Sidebar (Desktop)
    ├── Filter Modal (Mobile)
    ├── Sort Dropdown
    └── Active Filter Tags
```

### 5. صفحة مكونات التسوق (Shopping Components)
**اسم الصفحة**: `🛒 Shopping Components`

#### الإطارات (Frames):
```
├── 🛒 Cart Components
│   ├── Cart Icon with Badge
│   ├── Cart Dropdown
│   ├── Cart Page Layout
│   └── Cart Item Cards
│
├── 💳 Checkout Components
│   ├── Checkout Steps Progress
│   ├── Payment Method Cards
│   ├── Shipping Options
│   └── Order Summary
│
├── 📦 Order Components
│   ├── Order Confirmation
│   ├── Order Tracking
│   ├── Order History Cards
│   └── Invoice Layout
│
└── 💝 Wishlist Components
    ├── Wishlist Icon
    ├── Wishlist Grid
    ├── Add to Wishlist Button
    └── Wishlist Empty State
```

### 6. صفحة حالات التطبيق (Application States)
**اسم الصفحة**: `⚡ Application States`

#### الإطارات (Frames):
```
├── 🔄 Loading States
│   ├── Page Loading Skeleton
│   ├── Product Card Skeleton
│   ├── Spinner Variations
│   └── Progress Indicators
│
├── 📭 Empty States
│   ├── Empty Cart
│   ├── No Search Results
│   ├── Empty Wishlist
│   └── No Orders Found
│
├── ❌ Error States
│   ├── Page Not Found (404)
│   ├── Server Error (500)
│   ├── Network Error
│   └── Form Validation Errors
│
└── ✅ Success States
    ├── Order Placed Successfully
    ├── Item Added to Cart
    ├── Account Created
    └── Password Reset Sent
```

### 7. صفحة التخطيطات (Layout Templates)
**اسم الصفحة**: `📐 Layout Templates`

#### الإطارات (Frames):
```
├── 🏠 Homepage Layouts
│   ├── Mobile Homepage (375px)
│   ├── Tablet Homepage (768px)
│   └── Desktop Homepage (1280px)
│
├── 📱 Product Pages
│   ├── Product Detail Mobile
│   ├── Product Detail Desktop
│   ├── Category Page Mobile
│   └── Category Page Desktop
│
├── 🛒 Shopping Pages
│   ├── Cart Page Mobile
│   ├── Cart Page Desktop
│   ├── Checkout Mobile
│   └── Checkout Desktop
│
└── 👤 Account Pages
    ├── Login/Register Mobile
    ├── Login/Register Desktop
    ├── User Dashboard Mobile
    └── User Dashboard Desktop
```

---

## 🏗️ نظام التسمية (Naming Convention)

### للمكونات (Components):
```
[Category]/[Component Name]/[Variant]
```

**أمثلة**:
- `Button/Primary/Large`
- `Card/Product/Featured`
- `Input/Text/Error State`
- `Icon/System/Search`

### للألوان (Colors):
```
[Color Family]/[Shade]/[Usage]
```

**أمثلة**:
- `Primary/Blue/500`
- `Semantic/Success/Background`
- `Neutral/Gray/Text Secondary`

### للتخطيطات (Layouts):
```
[Page Type]/[Device]/[Breakpoint]
```

**أمثلة**:
- `Homepage/Mobile/375px`
- `Product Detail/Desktop/1280px`
- `Checkout/Tablet/768px`

---

## 🎨 إعداد الألوان (Color Setup)

### نظام الألوان المتدرج:
```figma
Primary Blue Palette:
├── Blue/50: #E6F2FF
├── Blue/100: #CCE5FF
├── Blue/200: #99CCFF
├── Blue/300: #66B2FF
├── Blue/400: #3399FF
├── Blue/500: #0B6DF3 ← Main Brand Color
├── Blue/600: #054FB3
├── Blue/700: #004999
├── Blue/800: #003166
└── Blue/900: #001833
```

### إعداد الـ Styles:
1. **إنشاء Color Styles**:
   - اختر اللون → Create Style
   - اسم الـ Style: `Primary/Blue/500`
   - وصف: "Main brand color for CTAs and links"

2. **تنظيم الـ Styles**:
   - استخدم `/` للتجميع
   - رتب حسب الاستخدام (Primary, Semantic, Neutral)

---

## 📝 إعداد التايبوجرافي (Typography Setup)

### Arabic Text Styles:
```figma
Display Styles:
├── Display/Arabic/2XL (Tajawal Bold, 72px, -0.025em)
├── Display/Arabic/XL (Tajawal Bold, 60px, -0.025em)
├── Display/Arabic/LG (Tajawal Bold, 48px, -0.02em)
├── Display/Arabic/MD (Tajawal Bold, 36px, -0.02em)
└── Display/Arabic/SM (Tajawal Bold, 30px, -0.01em)

Heading Styles:
├── Heading/Arabic/H1 (Tajawal Bold, 32px, -0.01em)
├── Heading/Arabic/H2 (Tajawal Bold, 28px, -0.005em)
├── Heading/Arabic/H3 (Tajawal SemiBold, 24px, 0em)
├── Heading/Arabic/H4 (Tajawal SemiBold, 20px, 0em)
├── Heading/Arabic/H5 (Tajawal Medium, 18px, 0em)
└── Heading/Arabic/H6 (Tajawal Medium, 16px, 0em)

Body Styles:
├── Body/Arabic/XL (Tajawal Regular, 20px, 0em)
├── Body/Arabic/LG (Tajawal Regular, 18px, 0em)
├── Body/Arabic/MD (Tajawal Regular, 16px, 0em)
├── Body/Arabic/SM (Tajawal Regular, 14px, 0em)
└── Body/Arabic/XS (Tajawal Regular, 12px, 0em)
```

### English Text Styles:
```figma
Display Styles:
├── Display/English/2XL (Inter Bold, 72px, -0.025em)
├── Display/English/XL (Inter Bold, 60px, -0.025em)
├── Display/English/LG (Inter Bold, 48px, -0.02em)
├── Display/English/MD (Inter Bold, 36px, -0.02em)
└── Display/English/SM (Inter Bold, 30px, -0.01em)

Heading Styles:
├── Heading/English/H1 (Inter Bold, 32px, -0.01em)
├── Heading/English/H2 (Inter Bold, 28px, -0.005em)
├── Heading/English/H3 (Inter SemiBold, 24px, 0em)
├── Heading/English/H4 (Inter SemiBold, 20px, 0em)
├── Heading/English/H5 (Inter Medium, 18px, 0em)
└── Heading/English/H6 (Inter Medium, 16px, 0em)

Body Styles:
├── Body/English/XL (Inter Regular, 20px, 0em)
├── Body/English/LG (Inter Regular, 18px, 0em)
├── Body/English/MD (Inter Regular, 16px, 0em)
├── Body/English/SM (Inter Regular, 14px, 0em)
└── Body/English/XS (Inter Regular, 12px, 0em)
```

---

## 🧩 إنشاء المكونات (Component Creation)

### خطوات إنشاء مكون Button:

1. **إنشاء الإطار الأساسي**:
   ```
   Frame: 120px × 48px
   Name: "Button/Primary/Large"
   Background: Primary/Blue/500
   Border Radius: 6px
   ```

2. **إضافة النص**:
   ```
   Text: "Button Label"
   Style: Body/Arabic/MD (أو English/MD)
   Color: White
   Auto Layout: Center
   ```

3. **إعداد Auto Layout**:
   ```
   Direction: Horizontal
   Spacing: 8px
   Padding: 12px 24px
   Alignment: Center
   ```

4. **إنشاء الحالات (Variants)**:
   ```
   Properties:
   ├── Size: Small, Medium, Large
   ├── Type: Primary, Secondary, Ghost
   ├── State: Default, Hover, Active, Disabled
   └── Language: Arabic, English
   ```

5. **إعداد الـ States**:
   ```
   Default: Primary/Blue/500
   Hover: Primary/Blue/600 + Shadow
   Active: Primary/Blue/700
   Disabled: Neutral/Gray/300
   Focus: Primary/Blue/500 + Focus Ring
   ```

---

## 📤 تصدير التوكينز (Token Export)

### تصدير CSS Variables:

#### الطريقة الأولى - Figma Tokens Plugin:
1. تثبيت **Figma Tokens** plugin
2. إعداد Token Sets:
   ```json
   {
     "global": {
       "color": { ... },
       "typography": { ... },
       "spacing": { ... }
     },
     "semantic": {
       "button": { ... },
       "input": { ... },
       "card": { ... }
     }
   }
   ```

3. تصدير كـ CSS:
   ```css
   :root {
     /* Colors */
     --color-primary-500: #0B6DF3;
     --color-primary-600: #054FB3;
     
     /* Typography */
     --font-family-arabic: 'Tajawal', sans-serif;
     --font-size-h1: 32px;
     --line-height-h1: 40px;
     
     /* Spacing */
     --spacing-4: 16px;
     --spacing-6: 24px;
     
     /* Semantic */
     --button-primary-bg: var(--color-primary-500);
     --button-primary-text: #FFFFFF;
   }
   ```

#### الطريقة الثانية - Design Tokens Plugin:
1. تثبيت **Design Tokens** plugin
2. تحديد الـ Styles المراد تصديرها
3. اختيار صيغة التصدير (CSS, JSON, SCSS)

### تصدير JSON:
```json
{
  "color": {
    "primary": {
      "500": {
        "value": "#0B6DF3",
        "type": "color"
      }
    }
  },
  "typography": {
    "heading": {
      "h1": {
        "value": {
          "fontFamily": "Tajawal",
          "fontWeight": 700,
          "fontSize": "32px",
          "lineHeight": "40px"
        },
        "type": "typography"
      }
    }
  }
}
```

---

## 🔄 سير العمل والتحديثات (Workflow)

### سير العمل للمصممين:
1. **إنشاء المكونات**: في صفحة Foundation Components
2. **إنشاء التخطيطات**: استخدام المكونات الجاهزة
3. **اختبار الاستجابة**: تطبيق على breakpoints مختلفة
4. **مراجعة الوصولية**: فحص contrast والتنقل بالكيبورد
5. **تصدير Assets**: إعداد ملفات للتطوير

### سير العمل للمطورين:
1. **استيراد التوكينز**: تحديث CSS variables
2. **مراجعة المكونات**: مطابقة التطبيق مع التصميم
3. **اختبار التفاعلات**: تطبيق الحالات المختلفة
4. **فحص الأداء**: قياس تأثير التغييرات
5. **تقديم Feedback**: تحديثات مطلوبة للتصميم

### نظام التحديثات:
```
Version 1.0.0 - Initial Design System
├── Version 1.1.0 - Added Dark Mode
├── Version 1.2.0 - New Product Components  
├── Version 1.3.0 - Mobile Optimization
└── Version 2.0.0 - Major Redesign
```

---

## 📱 اعتبارات الاستجابة (Responsive Considerations)

### Breakpoints في Figma:
```
Mobile: 375px width frame
Tablet: 768px width frame  
Desktop: 1280px width frame
Large Desktop: 1536px width frame
```

### إعداد Auto Layout للاستجابة:
1. **Container Components**:
   ```
   Max Width: 1280px
   Padding: 16px (mobile), 24px (tablet), 32px (desktop)
   Auto Layout: Fill container
   ```

2. **Grid Systems**:
   ```
   Mobile: 2 columns, 16px gap
   Tablet: 3 columns, 20px gap
   Desktop: 4 columns, 24px gap
   ```

3. **Typography Scaling**:
   ```
   Mobile: Base sizes
   Tablet: +2px for headings
   Desktop: +4px for headings
   ```

---

## ♿ إرشادات الوصولية (Accessibility Guidelines)

### فحص التباين (Contrast Checking):
1. **استخدام Stark Plugin**:
   - فحص جميع تركيبات النص/الخلفية
   - ضمان WCAG AA compliance (4.5:1)
   - تسجيل النتائج في ملاحظات المكون

2. **Color Blind Simulation**:
   - اختبار التصميم مع Protanopia
   - اختبار مع Deuteranopia  
   - اختبار مع Tritanopia

### Focus States:
```figma
Focus Ring:
├── Border: 2px solid Primary/Blue/500
├── Offset: 2px
├── Border Radius: Inherit from component + 2px
└── Animation: 200ms ease-out
```

### Touch Targets:
```figma
Minimum Size: 44px × 44px
├── Buttons: 48px height minimum
├── Icons: 24px icon in 44px touch area
├── Links: 44px height minimum
└── Form Controls: 48px height minimum
```

---

## 🚀 نشر نظام التصميم (Design System Deployment)

### إعداد Figma للفريق:
1. **مشاركة المكتبة**:
   ```
   File → Publish styles and components
   Add description for each update
   Notify team members of changes
   ```

2. **إعداد الصلاحيات**:
   ```
   Editors: Lead Designer, UX Team
   Viewers: Developers, Product Managers
   Commenters: Stakeholders, QA Team
   ```

3. **Documentation**:
   ```
   Component descriptions
   Usage guidelines  
   Do's and Don'ts
   Code snippets
   ```

### تكامل مع أدوات التطوير:
1. **Figma to Code**:
   - استخدام plugins مثل Figma to React
   - تصدير CSS properties
   - توليد component boilerplate

2. **Design Tokens Sync**:
   - إعداد automated sync مع repository
   - CI/CD pipeline لتحديث tokens
   - Version control للتغييرات

---

**Owner**: Lead UX/UI Designer  
**Est. Effort**: 8 person-days  
**Acceptance Criteria**:
- هيكل Figma منظم ومُوثق بالكامل
- جميع المكونات تتبع naming convention موحد
- تصدير Design tokens يعمل بشكل صحيح
- إرشادات الاستخدام واضحة ومفصلة
- نظام التحديثات والـ versioning مُعرّف
- دعم كامل للغتين العربية والإنجليزية
