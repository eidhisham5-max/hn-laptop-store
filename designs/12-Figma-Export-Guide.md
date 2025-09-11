# 🎨 Figma Export Guide

## Design System Setup

### Color Palette
```
Primary Colors:
- Primary 50: #E6F2FF
- Primary 100: #CCE5FF
- Primary 200: #99CCFF
- Primary 300: #66B2FF
- Primary 400: #3399FF
- Primary 500: #007AFF (Main Brand)
- Primary 600: #0062CC
- Primary 700: #004999
- Primary 800: #003366
- Primary 900: #001A33

Secondary Colors:
- Secondary 50: #E8F5E8
- Secondary 100: #D1EBD1
- Secondary 200: #A3D7A3
- Secondary 300: #75C375
- Secondary 400: #47AF47
- Secondary 500: #34C759 (Success)
- Secondary 600: #2A9F47
- Secondary 700: #207735
- Secondary 800: #164F23
- Secondary 900: #0C2711

Semantic Colors:
- Success: #34C759
- Warning: #FF9500
- Error: #FF3B30
- Info: #007AFF

Neutral Colors:
- Gray 50: #F9FAFB
- Gray 100: #F3F4F6
- Gray 200: #E5E7EB
- Gray 300: #D1D5DB
- Gray 400: #9CA3AF
- Gray 500: #6B7280
- Gray 600: #4B5563
- Gray 700: #374151
- Gray 800: #1F2937
- Gray 900: #111827
```

### Typography
```
Font Family: Inter
- Inter Light: 300
- Inter Regular: 400
- Inter Medium: 500
- Inter SemiBold: 600
- Inter Bold: 700
- Inter ExtraBold: 800

Font Sizes:
- Display 2XL: 72px / 90px line height
- Display XL: 60px / 72px line height
- Display LG: 48px / 60px line height
- Display MD: 36px / 44px line height
- Display SM: 30px / 38px line height
- Display XS: 24px / 32px line height
- Text XL: 20px / 28px line height
- Text LG: 18px / 28px line height
- Text MD: 16px / 24px line height
- Text SM: 14px / 20px line height
- Text XS: 12px / 16px line height
```

### Spacing Scale
```
Spacing Units (4px base):
- 0: 0px
- 1: 4px
- 2: 8px
- 3: 12px
- 4: 16px
- 5: 20px
- 6: 24px
- 8: 32px
- 10: 40px
- 12: 48px
- 16: 64px
- 20: 80px
- 24: 96px
- 32: 128px
- 40: 160px
- 48: 192px
- 56: 224px
- 64: 256px
```

### Border Radius
```
Radius Values:
- None: 0px
- SM: 4px
- MD: 8px
- LG: 12px
- XL: 16px
- 2XL: 24px
- 3XL: 32px
- Full: 9999px
```

### Shadows
```
Shadow Values:
- Subtle: 0 1px 8px rgba(0, 0, 0, 0.06)
- Card: 0 2px 12px rgba(0, 0, 0, 0.08)
- Button: 0 2px 4px rgba(0, 0, 0, 0.1)
- Modal: 0 20px 40px rgba(0, 0, 0, 0.15)
- Dropdown: 0 4px 6px rgba(0, 0, 0, 0.1)
```

## Component Library

### Buttons
```
Primary Button:
- Background: Primary 500 (#007AFF)
- Text: White
- Padding: 12px 24px
- Border Radius: 12px
- Font: Inter Medium 16px
- Shadow: Button shadow

Secondary Button:
- Background: Transparent
- Border: 2px solid Primary 500
- Text: Primary 500
- Padding: 10px 22px
- Border Radius: 12px
- Font: Inter Medium 16px

Outline Button:
- Background: Transparent
- Border: 1px solid Gray 300
- Text: Gray 700
- Padding: 12px 24px
- Border Radius: 12px
- Font: Inter Medium 16px

Ghost Button:
- Background: Transparent
- Text: Gray 700
- Padding: 12px 24px
- Border Radius: 12px
- Font: Inter Medium 16px
```

### Input Fields
```
Default Input:
- Background: White
- Border: 2px solid Gray 200
- Padding: 12px 16px
- Border Radius: 8px
- Font: Inter Regular 16px
- Placeholder: Gray 400

Focus Input:
- Border: 2px solid Primary 500
- Box Shadow: 0 0 0 3px Primary 50

Error Input:
- Border: 2px solid Error 500
- Box Shadow: 0 0 0 3px Error 50

Success Input:
- Border: 2px solid Success 500
- Box Shadow: 0 0 0 3px Success 50
```

### Cards
```
Product Card:
- Background: White
- Border: 1px solid Gray 200
- Border Radius: 12px
- Padding: 16px
- Shadow: Card shadow
- Hover: Shadow increases, transform translateY(-4px)

Info Card:
- Background: White
- Border: 1px solid Gray 200
- Border Radius: 8px
- Padding: 20px
- Shadow: Subtle shadow

Feature Card:
- Background: White
- Border: 1px solid Gray 200
- Border Radius: 16px
- Padding: 24px
- Shadow: Card shadow
```

### Navigation
```
Header:
- Background: White
- Border Bottom: 1px solid Gray 200
- Padding: 16px 0
- Height: 80px

Navigation Link:
- Font: Inter Medium 16px
- Color: Gray 700
- Padding: 8px 16px
- Border Radius: 8px
- Hover: Background Gray 100, Color Primary 500

Active Link:
- Background: Primary 50
- Color: Primary 500
- Border Bottom: 2px solid Primary 500
```

## Page Layouts

### Desktop (1024px+)
```
Container:
- Max Width: 1200px
- Margin: 0 auto
- Padding: 0 32px

Grid System:
- Columns: 12
- Gutter: 32px
- Margin: 0 32px

Breakpoints:
- Desktop: 1024px+
- Large Desktop: 1280px+
- Extra Large: 1536px+
```

### Tablet (768px - 1023px)
```
Container:
- Max Width: 100%
- Padding: 0 24px

Grid System:
- Columns: 8
- Gutter: 24px
- Margin: 0 24px

Breakpoints:
- Tablet: 768px - 1023px
```

### Mobile (320px - 767px)
```
Container:
- Max Width: 100%
- Padding: 0 16px

Grid System:
- Columns: 4
- Gutter: 16px
- Margin: 0 16px

Breakpoints:
- Mobile: 320px - 767px
- Large Mobile: 640px - 767px
```

## Export Settings

### Image Assets
```
Product Images:
- Format: PNG
- Resolution: 2x (Retina)
- Quality: 100%
- Background: Transparent

Icons:
- Format: SVG
- Size: 24x24px
- Stroke: 2px
- Color: Current color

Logos:
- Format: SVG
- Size: Variable
- Background: Transparent
```

### Color Export
```
CSS Variables:
- Format: CSS
- Naming: kebab-case
- Prefix: --color-

Tailwind Classes:
- Format: CSS
- Naming: Tailwind convention
- Prefix: bg-, text-, border-
```

### Typography Export
```
Font Files:
- Format: WOFF2, WOFF, TTF
- Subset: Latin, Arabic
- Weight: 300, 400, 500, 600, 700, 800

CSS Classes:
- Format: CSS
- Naming: text-{size}
- Line Height: Included
```

## Prototype Settings

### Interactions
```
Page Transitions:
- Type: Smart Animate
- Duration: 300ms
- Easing: Ease Out

Button Hover:
- Type: Change to
- Duration: 200ms
- Easing: Ease Out

Modal Open:
- Type: Smart Animate
- Duration: 300ms
- Easing: Ease Out
- Backdrop: Fade in
```

### Device Frames
```
Desktop:
- Width: 1440px
- Height: 1024px
- Device: MacBook Pro

Tablet:
- Width: 768px
- Height: 1024px
- Device: iPad

Mobile:
- Width: 375px
- Height: 812px
- Device: iPhone X
```

## Handoff Specifications

### Developer Handoff
```
Spacing:
- Format: 8px grid system
- Values: 4px, 8px, 12px, 16px, 24px, 32px, 48px, 64px

Colors:
- Format: Hex values
- Variables: CSS custom properties
- Naming: Semantic names

Typography:
- Format: CSS classes
- Font: Inter (Google Fonts)
- Sizes: rem units

Components:
- Format: React components
- Props: TypeScript interfaces
- Styling: Tailwind CSS classes
```

### Asset Organization
```
Folder Structure:
├── 01-Design-System/
│   ├── Colors/
│   ├── Typography/
│   ├── Spacing/
│   └── Components/
├── 02-Pages/
│   ├── Desktop/
│   ├── Tablet/
│   └── Mobile/
├── 03-Prototypes/
│   ├── User-Flow/
│   └── Interactions/
└── 04-Assets/
    ├── Images/
    ├── Icons/
    └── Logos/
```

## Quality Checklist

### Design Review
- [ ] All breakpoints designed
- [ ] Interactive states defined
- [ ] Accessibility considerations
- [ ] Performance optimizations
- [ ] Brand consistency
- [ ] User experience flow
- [ ] Error states handled
- [ ] Loading states defined

### Developer Handoff
- [ ] All assets exported
- [ ] Spacing system documented
- [ ] Color palette complete
- [ ] Typography system ready
- [ ] Component specifications
- [ ] Interaction guidelines
- [ ] Responsive breakpoints
- [ ] Accessibility requirements
