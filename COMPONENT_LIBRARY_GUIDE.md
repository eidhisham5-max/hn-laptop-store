# 🧩 Component Library Guide

## Overview
This guide provides comprehensive documentation for the HN Laptop Store component library built with React, Next.js, and Tailwind CSS.

## 🎨 Design System

### Colors
- **Primary**: #007AFF (Blue)
- **Secondary**: #34C759 (Green)
- **Success**: #34C759
- **Warning**: #FF9500
- **Error**: #FF3B30
- **Info**: #007AFF

### Typography
- **Font Family**: Inter
- **Sizes**: xs (12px), sm (14px), md (16px), lg (18px), xl (20px), 2xl (24px)

### Spacing
- **Base Unit**: 4px
- **Scale**: 1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24, 32, 40, 48, 64

## 🧩 UI Components

### Button
```tsx
import { Button } from '@/app/components/ui'

// Basic usage
<Button>Click me</Button>

// Variants
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="destructive">Delete</Button>

// Sizes
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>
<Button size="xl">Extra Large</Button>

// With icons
<Button leftIcon={<Icon />}>With Icon</Button>
<Button rightIcon={<Icon />}>With Icon</Button>

// Loading state
<Button loading>Loading...</Button>

// Full width
<Button fullWidth>Full Width</Button>
```

### Input
```tsx
import { Input } from '@/app/components/ui'

// Basic usage
<Input placeholder="Enter text..." />

// With label
<Input label="Email Address" placeholder="Enter your email" />

// With error
<Input 
  label="Email Address" 
  placeholder="Enter your email"
  error="Please enter a valid email"
/>

// With helper text
<Input 
  label="Password" 
  placeholder="Enter your password"
  helperText="Must be at least 8 characters"
/>

// With icons
<Input 
  leftIcon={<EmailIcon />}
  placeholder="Enter your email"
/>

// Sizes
<Input size="sm" placeholder="Small input" />
<Input size="md" placeholder="Medium input" />
<Input size="lg" placeholder="Large input" />
```

### Select
```tsx
import { Select } from '@/app/components/ui'

const options = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' }
]

// Basic usage
<Select 
  options={options}
  placeholder="Select an option"
/>

// With label
<Select 
  label="Category"
  options={options}
  placeholder="Select a category"
/>

// With error
<Select 
  label="Category"
  options={options}
  error="Please select a category"
/>
```

### Textarea
```tsx
import { Textarea } from '@/app/components/ui'

// Basic usage
<Textarea placeholder="Enter your message..." />

// With label
<Textarea 
  label="Message"
  placeholder="Enter your message..."
/>

// With character count
<Textarea 
  label="Description"
  placeholder="Enter description..."
  maxLength={500}
  showCharCount
/>
```

### Modal
```tsx
import { Modal } from '@/app/components/ui'

const [isOpen, setIsOpen] = useState(false)

// Basic usage
<Modal 
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Modal Title"
>
  <p>Modal content goes here...</p>
</Modal>

// Sizes
<Modal size="sm" isOpen={isOpen} onClose={() => setIsOpen(false)}>
  Small modal
</Modal>

<Modal size="lg" isOpen={isOpen} onClose={() => setIsOpen(false)}>
  Large modal
</Modal>

<Modal size="full" isOpen={isOpen} onClose={() => setIsOpen(false)}>
  Full screen modal
</Modal>
```

### Toast
```tsx
import { Toast } from '@/app/components/ui'

// Success toast
<Toast 
  variant="success"
  title="Success!"
  message="Your action was completed successfully."
/>

// Error toast
<Toast 
  variant="error"
  title="Error!"
  message="Something went wrong. Please try again."
/>

// Warning toast
<Toast 
  variant="warning"
  title="Warning!"
  message="Please check your input."
/>

// Info toast
<Toast 
  variant="info"
  title="Info"
  message="Here's some information for you."
/>
```

### Tabs
```tsx
import { Tabs } from '@/app/components/ui'

const tabItems = [
  {
    id: 'tab1',
    label: 'Tab 1',
    content: <div>Content for tab 1</div>
  },
  {
    id: 'tab2',
    label: 'Tab 2',
    content: <div>Content for tab 2</div>
  }
]

// Basic usage
<Tabs items={tabItems} />

// Variants
<Tabs variant="pills" items={tabItems} />
<Tabs variant="underline" items={tabItems} />

// Sizes
<Tabs size="sm" items={tabItems} />
<Tabs size="lg" items={tabItems} />
```

### Accordion
```tsx
import { Accordion } from '@/app/components/ui'

const accordionItems = [
  {
    id: 'item1',
    title: 'Item 1',
    content: <div>Content for item 1</div>
  },
  {
    id: 'item2',
    title: 'Item 2',
    content: <div>Content for item 2</div>
  }
]

// Basic usage
<Accordion items={accordionItems} />

// Allow multiple open
<Accordion allowMultiple items={accordionItems} />

// Variants
<Accordion variant="bordered" items={accordionItems} />
<Accordion variant="flush" items={accordionItems} />
```

### Progress
```tsx
import { Progress } from '@/app/components/ui'

// Basic usage
<Progress value={75} max={100} />

// With label
<Progress 
  value={75} 
  max={100}
  label="Progress"
  showPercentage
/>

// Variants
<Progress variant="success" value={100} />
<Progress variant="warning" value={60} />
<Progress variant="error" value={30} />
```

### Tooltip
```tsx
import { Tooltip } from '@/app/components/ui'

// Basic usage
<Tooltip content="This is a tooltip">
  <button>Hover me</button>
</Tooltip>

// Positions
<Tooltip position="top" content="Top tooltip">
  <button>Top</button>
</Tooltip>

<Tooltip position="bottom" content="Bottom tooltip">
  <button>Bottom</button>
</Tooltip>

<Tooltip position="left" content="Left tooltip">
  <button>Left</button>
</Tooltip>

<Tooltip position="right" content="Right tooltip">
  <button>Right</button>
</Tooltip>
```

### Avatar
```tsx
import { Avatar } from '@/app/components/ui'

// Basic usage
<Avatar src="/path/to/image.jpg" alt="User" />

// With fallback
<Avatar fallback="John Doe" />

// Sizes
<Avatar size="xs" src="/path/to/image.jpg" />
<Avatar size="sm" src="/path/to/image.jpg" />
<Avatar size="md" src="/path/to/image.jpg" />
<Avatar size="lg" src="/path/to/image.jpg" />
<Avatar size="xl" src="/path/to/image.jpg" />
<Avatar size="2xl" src="/path/to/image.jpg" />

// With online status
<Avatar 
  src="/path/to/image.jpg"
  showOnlineStatus
  onlineStatus="online"
/>
```

## 🏗️ Layout Components

### Header
```tsx
import { Header } from '@/app/components/layout'

// Basic usage
<Header />

// With custom className
<Header className="custom-header" />
```

### Footer
```tsx
import { Footer } from '@/app/components/layout'

// Basic usage
<Footer />

// With custom className
<Footer className="custom-footer" />
```

## 🛍️ Product Components

### ProductGrid
```tsx
import { ProductGrid } from '@/app/components/products'

const products = [
  {
    id: '1',
    name: 'Dell XPS 13',
    price: 1200,
    originalPrice: 1400,
    image: '/path/to/image.jpg',
    brand: 'Dell',
    condition: 'new',
    rating: 4.5,
    reviewCount: 124,
    inStock: true
  }
]

// Basic usage
<ProductGrid products={products} />

// With loading state
<ProductGrid products={[]} loading />

// With error
<ProductGrid products={[]} error="Failed to load products" />

// View modes
<ProductGrid products={products} viewMode="grid" />
<ProductGrid products={products} viewMode="list" />

// Columns
<ProductGrid products={products} columns={2} />
<ProductGrid products={products} columns={3} />
<ProductGrid products={products} columns={4} />
```

### ProductFilters
```tsx
import { ProductFilters } from '@/app/components/products'

const categories = [
  { value: 'gaming', label: 'Gaming Laptops', count: 25 },
  { value: 'business', label: 'Business Laptops', count: 30 }
]

const brands = [
  { value: 'dell', label: 'Dell', count: 15 },
  { value: 'hp', label: 'HP', count: 20 }
]

// Desktop usage
<ProductFilters 
  categories={categories}
  brands={brands}
  priceRange={{ min: 0, max: 5000 }}
  onCategoryChange={(category) => console.log(category)}
/>

// Mobile usage
<ProductFilters 
  categories={categories}
  brands={brands}
  priceRange={{ min: 0, max: 5000 }}
  isMobile
  isOpen={isFiltersOpen}
  onClose={() => setIsFiltersOpen(false)}
/>
```

### ProductGallery
```tsx
import { ProductGallery } from '@/app/components/products'

const images = [
  '/path/to/image1.jpg',
  '/path/to/image2.jpg',
  '/path/to/image3.jpg'
]

// Basic usage
<ProductGallery 
  images={images}
  productName="Dell XPS 13"
/>

// With options
<ProductGallery 
  images={images}
  productName="Dell XPS 13"
  showThumbnails
  showZoom
  showFullscreen
/>
```

## 🎯 Best Practices

### 1. Consistent Spacing
```tsx
// Use the spacing scale
<div className="space-y-4"> {/* 16px */}
<div className="space-y-6"> {/* 24px */}
<div className="space-y-8"> {/* 32px */}
```

### 2. Responsive Design
```tsx
// Use responsive classes
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
<div className="text-sm md:text-base lg:text-lg">
```

### 3. Accessibility
```tsx
// Always provide alt text for images
<Image src="/path/to/image.jpg" alt="Descriptive alt text" />

// Use semantic HTML
<button aria-label="Close modal">
<nav aria-label="Main navigation">
```

### 4. Performance
```tsx
// Use Next.js Image component
import Image from 'next/image'

// Lazy load components
const LazyComponent = dynamic(() => import('./Component'), {
  loading: () => <Skeleton />
})
```

### 5. Type Safety
```tsx
// Use TypeScript interfaces
interface ProductProps {
  product: Product
  onAddToCart: (product: Product) => void
}

// Use proper typing for props
const ProductCard: React.FC<ProductProps> = ({ product, onAddToCart }) => {
  // Component implementation
}
```

## 🚀 Getting Started

1. **Install Dependencies**
```bash
npm install @radix-ui/react-slot class-variance-authority lucide-react
```

2. **Import Components**
```tsx
import { Button, Input, Modal } from '@/app/components/ui'
import { Header, Footer } from '@/app/components/layout'
import { ProductGrid, ProductFilters } from '@/app/components/products'
```

3. **Use in Your App**
```tsx
export default function HomePage() {
  return (
    <div>
      <Header />
      <main>
        <Button>Click me</Button>
        <Input placeholder="Enter text..." />
      </main>
      <Footer />
    </div>
  )
}
```

## 📱 Responsive Breakpoints

- **Mobile**: 320px - 767px
- **Tablet**: 768px - 1023px
- **Desktop**: 1024px+

## 🎨 Customization

### Custom Colors
```tsx
// Add to tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#E6F2FF',
          500: '#007AFF',
          600: '#0062CC'
        }
      }
    }
  }
}
```

### Custom Components
```tsx
// Create custom variants
const customButtonVariants = cva(
  "base-classes",
  {
    variants: {
      variant: {
        custom: "custom-styles"
      }
    }
  }
)
```

## 🔧 Development

### Adding New Components
1. Create component file in `app/components/ui/`
2. Add to `app/components/ui/index.ts`
3. Update this documentation
4. Add tests if needed

### Testing Components
```tsx
// Example test
import { render, screen } from '@testing-library/react'
import { Button } from '@/app/components/ui'

test('renders button with text', () => {
  render(<Button>Click me</Button>)
  expect(screen.getByText('Click me')).toBeInTheDocument()
})
```

## 📚 Resources

- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Radix UI Documentation](https://www.radix-ui.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
