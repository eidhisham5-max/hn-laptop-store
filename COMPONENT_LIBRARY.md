# 🧩 Component Library - HN Laptop Store

## Overview
A comprehensive React component library built with TypeScript, Tailwind CSS, and modern design principles for the HN Laptop Store e-commerce platform.

---

## 🎨 Design System Integration

All components are built using our design system tokens:
- **Colors**: Primary, secondary, semantic colors
- **Typography**: Inter font family with consistent sizing
- **Spacing**: 4px base unit scale
- **Shadows**: Subtle, card, button, modal variants
- **Border Radius**: Consistent rounded corners
- **Animations**: Smooth transitions and micro-interactions

---

## 📦 Available Components

### 1. Button
A versatile button component with multiple variants and sizes.

```tsx
import { Button } from '@/components/ui'

// Basic usage
<Button>Click me</Button>

// With variants
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="destructive">Delete</Button>

// With sizes
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>
<Button size="xl">Extra Large</Button>

// With loading state
<Button loading>Loading...</Button>

// With icons
<Button leftIcon={<Icon />}>With Left Icon</Button>
<Button rightIcon={<Icon />}>With Right Icon</Button>

// Full width
<Button fullWidth>Full Width Button</Button>
```

**Props:**
- `variant`: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive'
- `size`: 'sm' | 'md' | 'lg' | 'xl'
- `loading`: boolean
- `leftIcon`: React.ReactNode
- `rightIcon`: React.ReactNode
- `fullWidth`: boolean

---

### 2. Card
Flexible card component for content containers.

```tsx
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui'

<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card description goes here</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Card content goes here</p>
  </CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>

// With variants
<Card variant="product">Product Card</Card>
<Card variant="feature">Feature Card</Card>
<Card variant="elevated">Elevated Card</Card>
<Card variant="outlined">Outlined Card</Card>

// With hover effects
<Card hover>Hoverable Card</Card>
<Card interactive>Interactive Card</Card>
```

**Props:**
- `variant`: 'default' | 'product' | 'feature' | 'elevated' | 'outlined'
- `hover`: boolean
- `interactive`: boolean

---

### 3. Input
Form input component with validation states.

```tsx
import { Input } from '@/components/ui'

// Basic input
<Input placeholder="Enter text..." />

// With label
<Input label="Email" type="email" placeholder="Enter your email" />

// With error state
<Input 
  label="Password" 
  type="password" 
  error="Password is required"
  required 
/>

// With helper text
<Input 
  label="Username" 
  helperText="Choose a unique username"
/>

// With icons
<Input 
  leftIcon={<SearchIcon />}
  placeholder="Search..."
/>
<Input 
  rightIcon={<EyeIcon />}
  type="password"
/>
```

**Props:**
- `label`: string
- `error`: string
- `helperText`: string
- `leftIcon`: React.ReactNode
- `rightIcon`: React.ReactNode
- `required`: boolean
- `fullWidth`: boolean

---

### 4. Badge
Small status and label component.

```tsx
import { Badge } from '@/components/ui'

// Basic badges
<Badge>Default</Badge>
<Badge variant="primary">Primary</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="success">Success</Badge>
<Badge variant="warning">Warning</Badge>
<Badge variant="error">Error</Badge>
<Badge variant="info">Info</Badge>

// With sizes
<Badge size="sm">Small</Badge>
<Badge size="md">Medium</Badge>
<Badge size="lg">Large</Badge>

// Not rounded
<Badge rounded={false}>Not Rounded</Badge>
```

**Props:**
- `variant`: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info'
- `size`: 'sm' | 'md' | 'lg'
- `rounded`: boolean

---

### 5. ProductCard
Specialized card component for product display.

```tsx
import { ProductCard } from '@/components/ui'

const product = {
  id: 1,
  name: 'Dell XPS 13',
  price: 1200,
  originalPrice: 1400,
  image: '/product-image.jpg',
  specs: 'Intel i7, 16GB RAM, 512GB SSD',
  condition: 'New',
  rating: 4.8,
  reviews: 124,
  discount: 14,
  inStock: true,
  brand: 'Dell'
}

// Default variant
<ProductCard 
  product={product}
  onAddToCart={(id, quantity) => console.log('Add to cart', id, quantity)}
  onQuickView={(id) => console.log('Quick view', id)}
/>

// Compact variant
<ProductCard 
  product={product}
  variant="compact"
  onAddToCart={(id) => console.log('Add to cart', id)}
/>

// Detailed variant
<ProductCard 
  product={product}
  variant="detailed"
  onAddToCart={(id) => console.log('Add to cart', id)}
  onQuickView={(id) => console.log('Quick view', id)}
/>

// Without quick actions
<ProductCard 
  product={product}
  showQuickActions={false}
/>
```

**Props:**
- `product`: Product object
- `onAddToCart`: (productId: number, quantity?: number) => void
- `onQuickView`: (productId: number) => void
- `showQuickActions`: boolean
- `variant`: 'default' | 'compact' | 'detailed'

---

### 6. LoadingSpinner
Loading indicator component.

```tsx
import { LoadingSpinner } from '@/components/ui'

// Basic spinner
<LoadingSpinner />

// With size
<LoadingSpinner size="sm" />
<LoadingSpinner size="md" />
<LoadingSpinner size="lg" />
<LoadingSpinner size="xl" />

// With variant
<LoadingSpinner variant="primary" />
<LoadingSpinner variant="secondary" />
<LoadingSpinner variant="white" />

// With text
<LoadingSpinner text="Loading products..." />
```

**Props:**
- `size`: 'sm' | 'md' | 'lg' | 'xl'
- `variant`: 'primary' | 'secondary' | 'white'
- `text`: string

---

### 7. Skeleton
Loading placeholder components.

```tsx
import { Skeleton, SkeletonText, SkeletonAvatar, SkeletonCard } from '@/components/ui'

// Basic skeleton
<Skeleton width={200} height={20} />

// Text skeleton
<SkeletonText />
<SkeletonText width="80%" />
<SkeletonText width={150} />

// Avatar skeleton
<SkeletonAvatar />

// Card skeleton
<SkeletonCard />

// With variants
<Skeleton variant="text" />
<Skeleton variant="circular" />
<Skeleton variant="rectangular" />

// With animations
<Skeleton animation="pulse" />
<Skeleton animation="wave" />
<Skeleton animation="none" />
```

**Props:**
- `variant`: 'text' | 'circular' | 'rectangular'
- `width`: string | number
- `height`: string | number
- `animation`: 'pulse' | 'wave' | 'none'

---

### 8. EmptyState
Empty state component for when there's no content.

```tsx
import { EmptyState, EmptyCart, EmptyProducts, EmptyOrders } from '@/components/ui'

// Basic empty state
<EmptyState
  icon="📦"
  title="No items found"
  description="There are no items to display at the moment."
  action={{
    label: 'Add Item',
    onClick: () => console.log('Add item')
  }}
/>

// Predefined empty states
<EmptyCart />
<EmptyProducts />
<EmptyOrders />

// With custom action
<EmptyCart 
  action={{
    label: 'Browse Products',
    onClick: () => window.location.href = '/products',
    variant: 'primary'
  }}
/>
```

**Props:**
- `icon`: React.ReactNode
- `title`: string
- `description`: string
- `action`: { label: string, onClick: () => void, variant?: 'primary' | 'secondary' | 'outline' }
- `size`: 'sm' | 'md' | 'lg'

---

## 🛠️ Utility Functions

### cn (className utility)
Utility function for merging Tailwind classes.

```tsx
import { cn } from '@/lib/utils'

// Basic usage
<div className={cn('base-class', condition && 'conditional-class')} />

// With multiple conditions
<div className={cn(
  'base-class',
  isActive && 'active-class',
  isDisabled && 'disabled-class',
  className
)} />
```

### Other Utilities
```tsx
import { 
  formatPrice, 
  formatDate, 
  truncateText, 
  debounce, 
  throttle,
  isValidEmail,
  copyToClipboard 
} from '@/lib/utils'

// Format price
const price = formatPrice(1200, 'EGP') // "EGP 1,200"

// Format date
const date = formatDate(new Date()) // "December 15, 2024"

// Truncate text
const shortText = truncateText('Long text here', 20) // "Long text here..."

// Debounce function
const debouncedSearch = debounce((query) => {
  console.log('Searching for:', query)
}, 300)

// Validate email
const isValid = isValidEmail('user@example.com') // true

// Copy to clipboard
await copyToClipboard('Text to copy')
```

---

## 🎯 Usage Guidelines

### 1. Import Components
```tsx
// Import individual components
import { Button, Card, Input } from '@/components/ui'

// Or import from specific files
import { Button } from '@/components/ui/Button'
```

### 2. Consistent Styling
- Always use the design system tokens
- Prefer semantic color variants (success, warning, error)
- Use consistent spacing from the spacing scale
- Apply proper focus states for accessibility

### 3. Accessibility
- All interactive components support keyboard navigation
- Proper ARIA labels and roles are included
- Focus states are clearly visible
- Color contrast meets WCAG AA standards

### 4. Performance
- Components are optimized for re-renders
- Use React.memo for expensive components
- Lazy load heavy components when possible
- Optimize images with Next.js Image component

---

## 🔧 Customization

### Extending Components
```tsx
// Extend existing components
const CustomButton = ({ children, ...props }) => (
  <Button 
    className="custom-button-class"
    {...props}
  >
    {children}
  </Button>
)
```

### Adding New Variants
```tsx
// Add new variants to existing components
const Button = ({ variant, ...props }) => {
  const variants = {
    // ... existing variants
    custom: 'bg-custom-color text-white hover:bg-custom-hover'
  }
  
  return (
    <button 
      className={cn('base-classes', variants[variant])}
      {...props}
    />
  )
}
```

---

## 📱 Responsive Design

All components are built with mobile-first responsive design:

```tsx
// Components automatically adapt to screen sizes
<Button className="w-full md:w-auto">Responsive Button</Button>

<Card className="p-4 md:p-6 lg:p-8">Responsive Card</Card>

<ProductCard 
  product={product}
  className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4"
/>
```

---

## 🧪 Testing

Components are designed to be easily testable:

```tsx
import { render, screen } from '@testing-library/react'
import { Button } from '@/components/ui'

test('renders button with correct text', () => {
  render(<Button>Click me</Button>)
  expect(screen.getByRole('button')).toHaveTextContent('Click me')
})

test('button is disabled when loading', () => {
  render(<Button loading>Loading</Button>)
  expect(screen.getByRole('button')).toBeDisabled()
})
```

---

## 📚 Storybook Integration

Components can be documented and tested in Storybook:

```tsx
// Button.stories.tsx
import type { Meta, StoryObj } from '@storybook/react'
import { Button } from './Button'

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Button',
  },
}
```

---

*This component library provides a solid foundation for building consistent, accessible, and beautiful user interfaces for the HN Laptop Store platform.*
