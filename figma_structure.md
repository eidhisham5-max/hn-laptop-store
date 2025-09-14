# Figma File Structure & Organization

## 1. File Organization

### Main Pages
- **00_Design System**: Master design tokens and component library
- **01_Research & Discovery**: User research, personas, journey maps
- **02_Wireframes**: Low-fidelity wireframes for all screens
- **03_Hi-Fi Mobile**: High-fidelity mobile designs (375px)
- **04_Hi-Fi Tablet**: High-fidelity tablet designs (768px)
- **05_Hi-Fi Desktop**: High-fidelity desktop designs (1024px+)
- **06_Prototypes**: Interactive prototypes and user flows
- **07_Handoff**: Developer-ready assets and specifications

## 2. Component Library Structure

### Atoms (Basic Elements)
- **Buttons**: Primary, Secondary, Ghost, Outline variants
- **Inputs**: Text, Email, Password, Search, Textarea
- **Typography**: Headings, Body text, Captions, Labels
- **Icons**: Navigation, Actions, Status, Social
- **Badges**: Status, Count, Category, Promotional

### Molecules (Simple Combinations)
- **Product Card**: Image, title, price, rating, CTA
- **Search Bar**: Input + search icon + filters
- **Language Switcher**: Flag icons + language names
- **Breadcrumb**: Navigation path with separators
- **Pagination**: Page numbers + navigation arrows

### Organisms (Complex Components)
- **Header**: Logo, navigation, search, cart, user menu
- **Footer**: Links, newsletter, social, legal
- **Product Grid**: Multiple product cards in responsive layout
- **Hero Section**: Large image, headline, CTA, trust indicators
- **Checkout Flow**: Multi-step form with progress indicator

## 3. Design Token Integration

### Color Tokens
- Import from `00_Design System` → `Colors` page
- Use semantic naming: `primary-500`, `success-500`, etc.
- Apply to fills, strokes, and text colors
- Document usage in component specifications

### Typography Tokens
- Import from `00_Design System` → `Typography` page
- Use consistent font families and sizes
- Apply proper line heights and letter spacing
- Test readability across different languages

### Spacing Tokens
- Use 8px grid system for all spacing
- Apply consistent margins and padding
- Document spacing relationships in specs

## 4. Naming Conventions

### Component Naming
- **Format**: `[Category]/[Component]/[Variant]/[State]`
- **Example**: `Atoms/Button/Primary/Hover`
- **States**: Default, Hover, Active, Focus, Disabled

### Layer Naming
- **Format**: `[Component] - [Element] - [State]`
- **Example**: `Button - Background - Hover`
- **Groups**: Use descriptive group names

### Page Naming
- **Format**: `[Number]_[Page Name]_[Breakpoint]`
- **Example**: `01_Home_Mobile`, `02_Product_Desktop`
- **Organization**: Sort by user flow priority

## 5. Export Settings

### Icon Exports
- **Format**: SVG
- **Size**: 24x24px (1x), 48x48px (2x)
- **Optimization**: Remove unnecessary paths
- **Naming**: `icon-[name]-[size].svg`

### Image Exports
- **Format**: PNG (1x), WebP (2x)
- **Quality**: 90% for photos, 100% for graphics
- **Sizes**: Mobile (375px), Tablet (768px), Desktop (1024px+)
- **Naming**: `[page]-[section]-[breakpoint].[format]`

### Component Exports
- **Format**: PNG + CSS specifications
- **Include**: All states and variants
- **Documentation**: Usage guidelines and code snippets
- **Naming**: `component-[name]-[variant].png`

## 6. Collaboration Guidelines

### Design Reviews
- **Weekly**: Review progress and gather feedback
- **Stakeholder**: Present key screens and flows
- **Developer**: Technical feasibility and implementation
- **User Testing**: Validate design decisions

### Version Control
- **Naming**: `v1.0`, `v1.1`, `v2.0` for major versions
- **Comments**: Document changes and rationale
- **Backup**: Keep previous versions for reference
- **Sync**: Regular updates to team members

## 7. Handoff Preparation

### Developer Assets
- **Specifications**: Detailed measurements and spacing
- **Assets**: Exported icons, images, and graphics
- **Code**: CSS variables and component snippets
- **Documentation**: Usage guidelines and examples

### Quality Assurance
- **Consistency**: Verify design token usage
- **Accessibility**: Check color contrast and focus states
- **Responsive**: Test across all breakpoints
- **RTL**: Verify right-to-left language support
