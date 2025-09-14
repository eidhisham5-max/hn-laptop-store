# Developer Handoff Guide - H.N Laptop Store

## 1. Project Overview

### Project Details
- **Project Name**: H.N Laptop Store
- **Technology Stack**: Next.js 15.5.2, TypeScript, Tailwind CSS
- **Design System**: Custom design system with tokens
- **Languages**: Arabic (RTL) + English (LTR)
- **Target Devices**: Mobile, Tablet, Desktop

### Key Features
- **Responsive Design**: Mobile-first approach
- **Internationalization**: Full Arabic/English support
- **Accessibility**: WCAG AA compliant
- **Performance**: Optimized for speed and efficiency
- **SEO**: Search engine optimized

## 2. Design System Implementation

### Design Tokens
```json
// File: tokens.json
{
  "colors": {
    "primary": {
      "500": "#0B6DF3",
      "600": "#054FB3"
    },
    "accent": {
      "500": "#FF6A00",
      "600": "#EA580C"
    }
  },
  "typography": {
    "fontFamily": {
      "english": ["Inter", "system-ui", "sans-serif"],
      "arabic": ["Tajawal", "Noto Sans Arabic", "system-ui"]
    }
  }
}
```

### CSS Custom Properties
```css
:root {
  --color-primary-500: #0B6DF3;
  --color-primary-600: #054FB3;
  --color-accent-500: #FF6A00;
  --color-accent-600: #EA580C;
  --font-family-english: 'Inter', system-ui, sans-serif;
  --font-family-arabic: 'Tajawal', 'Noto Sans Arabic', system-ui;
  --spacing-1: 0.25rem;
  --spacing-2: 0.5rem;
  --spacing-4: 1rem;
  --spacing-8: 2rem;
}
```

### Tailwind Configuration
```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#EFF6FF',
          500: '#0B6DF3',
          600: '#054FB3',
          900: '#1E3A8A'
        },
        accent: {
          50: '#FFF7ED',
          500: '#FF6A00',
          600: '#EA580C',
          900: '#7C2D12'
        }
      },
      fontFamily: {
        'english': ['Inter', 'system-ui', 'sans-serif'],
        'arabic': ['Tajawal', 'Noto Sans Arabic', 'system-ui']
      }
    }
  }
}
```

## 3. Component Implementation

### Button Component
```tsx
// components/ui/Button.tsx
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  onClick,
  disabled = false,
  loading = false
}) => {
  const baseClasses = 'inline-flex items-center justify-center rounded-md font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variantClasses = {
    primary: 'bg-primary-500 text-white hover:bg-primary-600 focus:ring-primary-500',
    secondary: 'bg-neutral-100 text-neutral-900 hover:bg-neutral-200 focus:ring-neutral-500',
    ghost: 'bg-transparent text-primary-500 hover:bg-primary-50 focus:ring-primary-500',
    outline: 'border border-primary-500 text-primary-500 hover:bg-primary-50 focus:ring-primary-500'
  };
  
  const sizeClasses = {
    sm: 'px-3 py-2 text-sm h-8',
    md: 'px-4 py-2 text-base h-10',
    lg: 'px-6 py-3 text-lg h-12'
  };
  
  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]}`}
      onClick={onClick}
      disabled={disabled || loading}
    >
      {loading ? <Spinner /> : children}
    </button>
  );
};
```

### Product Card Component
```tsx
// components/products/ProductCard.tsx
interface ProductCardProps {
  product: Product;
  variant?: 'default' | 'detailed';
  onQuickView?: (product: Product) => void;
  onAddToCart?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  variant = 'default',
  onQuickView,
  onAddToCart
}) => {
  return (
    <article className="product-card bg-white rounded-lg shadow-md overflow-hidden transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
      <div className="product-card__image relative aspect-square overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover"
        />
        <div className="product-card__badges absolute top-2 left-2 flex flex-col gap-1">
          {product.discount && (
            <span className="badge badge--discount bg-accent-500 text-white px-2 py-1 rounded text-xs font-semibold">
              -{product.discount}%
            </span>
          )}
        </div>
      </div>
      
      <div className="product-card__content p-4 space-y-3">
        <h3 className="product-card__title text-lg font-semibold text-neutral-900 line-clamp-2">
          {product.name}
        </h3>
        
        <div className="product-card__rating flex items-center gap-1">
          <span className="stars text-warning-500 text-sm">★★★★☆</span>
          <span className="rating-text text-sm text-neutral-500">({product.rating})</span>
        </div>
        
        <div className="product-card__price flex items-center gap-2">
          <span className="price-current text-xl font-bold text-primary-500">
            ${product.price}
          </span>
          {product.originalPrice && (
            <span className="price-original text-sm text-neutral-400 line-through">
              ${product.originalPrice}
            </span>
          )}
        </div>
        
        <div className="product-card__actions flex gap-2">
          <Button 
            variant="primary" 
            size="sm" 
            onClick={() => onAddToCart?.(product)}
          >
            Add to Cart
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => onQuickView?.(product)}
          >
            View Details
          </Button>
        </div>
      </div>
    </article>
  );
};
```

## 4. RTL/LTR Implementation

### CSS RTL Support
```css
/* RTL-specific styles */
[dir="rtl"] .product-card {
  text-align: right;
}

[dir="rtl"] .product-card__badges {
  left: auto;
  right: 8px;
}

[dir="rtl"] .header__search {
  margin-left: 24px;
  margin-right: 0;
}

[dir="rtl"] .header__cart {
  margin-left: 24px;
  margin-right: 0;
}
```

### JavaScript RTL Detection
```tsx
// hooks/useRTL.ts
import { useLanguage } from '../contexts/LanguageContext';

export const useRTL = () => {
  const { lang } = useLanguage();
  return lang === 'ar';
};

// Usage in components
const MyComponent = () => {
  const isRTL = useRTL();
  
  return (
    <div dir={isRTL ? 'rtl' : 'ltr'}>
      <span className={isRTL ? 'ml-2' : 'mr-2'}>
        Icon
      </span>
      Text
    </div>
  );
};
```

## 5. Responsive Design Implementation

### Breakpoint System
```css
/* Mobile First Approach */
.container {
  width: 100%;
  padding: 0 16px;
  margin: 0 auto;
}

@media (min-width: 768px) {
  .container { 
    max-width: 768px; 
    padding: 0 32px;
  }
}

@media (min-width: 1024px) {
  .container { 
    max-width: 1024px; 
    padding: 0 64px;
  }
}

@media (min-width: 1440px) {
  .container { 
    max-width: 1440px; 
  }
}
```

### Grid System
```css
/* Product Grid */
.product-grid {
  display: grid;
  gap: 16px;
  grid-template-columns: 1fr;
}

@media (min-width: 768px) {
  .product-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 24px;
  }
}

@media (min-width: 1024px) {
  .product-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 32px;
  }
}

@media (min-width: 1440px) {
  .product-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}
```

## 6. Accessibility Implementation

### ARIA Labels and Roles
```tsx
// Accessible button
<button
  className="btn btn--primary"
  aria-label="Add product to cart"
  aria-describedby="product-description"
  role="button"
>
  Add to Cart
</button>

// Accessible form
<form role="form" aria-labelledby="contact-form-title">
  <h2 id="contact-form-title">Contact Us</h2>
  
  <label htmlFor="email" className="input-label">
    Email Address
  </label>
  <input
    type="email"
    id="email"
    className="input"
    aria-describedby="email-error"
    aria-required="true"
  />
  <div id="email-error" className="input-error" role="alert">
    Please enter a valid email address
  </div>
</form>
```

### Focus Management
```tsx
// Focus trap for modals
import { useEffect, useRef } from 'react';

const Modal = ({ isOpen, onClose, children }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (isOpen && modalRef.current) {
      const focusableElements = modalRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0] as HTMLElement;
      firstElement?.focus();
    }
  }, [isOpen]);
  
  return (
    <div
      ref={modalRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {children}
    </div>
  );
};
```

## 7. Performance Optimization

### Image Optimization
```tsx
// Next.js Image component
import Image from 'next/image';

const ProductImage = ({ src, alt, width, height }) => (
  <Image
    src={src}
    alt={alt}
    width={width}
    height={height}
    placeholder="blur"
    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
    loading="lazy"
    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  />
);
```

### Code Splitting
```tsx
// Dynamic imports for heavy components
import dynamic from 'next/dynamic';

const ProductDetailModal = dynamic(
  () => import('./ProductDetailModal'),
  { 
    loading: () => <div>Loading...</div>,
    ssr: false 
  }
);

const LazyComponent = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <ProductDetailModal />
  </Suspense>
);
```

## 8. State Management

### Context for Language
```tsx
// contexts/LanguageContext.tsx
interface LanguageContextType {
  lang: 'en' | 'ar';
  setLang: (language: 'en' | 'ar') => void;
  t: typeof translations.en;
  isRTL: boolean;
}

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Language>('en');
  
  useEffect(() => {
    localStorage.setItem('language', lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }, [lang]);
  
  const t = translations[lang];
  const isRTL = lang === 'ar';
  
  return (
    <LanguageContext.Provider value={{ lang, setLang: setLangState, t, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
};
```

### Cart State Management
```tsx
// contexts/CartContext.tsx
interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  total: number;
  itemCount: number;
}

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  
  const addItem = (item: CartItem) => {
    setItems(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => 
          i.id === item.id 
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };
  
  const removeItem = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };
  
  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }
    setItems(prev => 
      prev.map(item => 
        item.id === id ? { ...item, quantity } : item
      )
    );
  };
  
  const clearCart = () => setItems([]);
  
  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  
  return (
    <CartContext.Provider value={{
      items,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      total,
      itemCount
    }}>
      {children}
    </CartContext.Provider>
  );
};
```

## 9. API Integration

### Product API
```tsx
// lib/api/products.ts
interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  category: string;
  brand: string;
  inStock: boolean;
}

export const fetchProducts = async (params?: {
  category?: string;
  brand?: string;
  search?: string;
  page?: number;
  limit?: number;
}): Promise<{ products: Product[]; total: number }> => {
  const searchParams = new URLSearchParams();
  if (params?.category) searchParams.set('category', params.category);
  if (params?.brand) searchParams.set('brand', params.brand);
  if (params?.search) searchParams.set('search', params.search);
  if (params?.page) searchParams.set('page', params.page.toString());
  if (params?.limit) searchParams.set('limit', params.limit.toString());
  
  const response = await fetch(`/api/products?${searchParams}`);
  if (!response.ok) throw new Error('Failed to fetch products');
  
  return response.json();
};

export const fetchProduct = async (id: string): Promise<Product> => {
  const response = await fetch(`/api/products/${id}`);
  if (!response.ok) throw new Error('Failed to fetch product');
  
  return response.json();
};
```

### Cart API
```tsx
// lib/api/cart.ts
export const addToCart = async (productId: string, quantity: number = 1) => {
  const response = await fetch('/api/cart', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ productId, quantity })
  });
  
  if (!response.ok) throw new Error('Failed to add to cart');
  return response.json();
};

export const updateCartItem = async (itemId: string, quantity: number) => {
  const response = await fetch(`/api/cart/${itemId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ quantity })
  });
  
  if (!response.ok) throw new Error('Failed to update cart item');
  return response.json();
};

export const removeFromCart = async (itemId: string) => {
  const response = await fetch(`/api/cart/${itemId}`, {
    method: 'DELETE'
  });
  
  if (!response.ok) throw new Error('Failed to remove from cart');
  return response.json();
};
```

## 10. Testing Implementation

### Component Testing
```tsx
// __tests__/Button.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '../components/ui/Button';

describe('Button Component', () => {
  it('renders with correct text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });
  
  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
  
  it('is disabled when disabled prop is true', () => {
    render(<Button disabled>Click me</Button>);
    expect(screen.getByText('Click me')).toBeDisabled();
  });
});
```

### Accessibility Testing
```tsx
// __tests__/accessibility.test.tsx
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Button } from '../components/ui/Button';

expect.extend(toHaveNoViolations);

describe('Accessibility Tests', () => {
  it('Button should not have accessibility violations', async () => {
    const { container } = render(<Button>Click me</Button>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
```

## 11. Deployment Configuration

### Environment Variables
```bash
# .env.local
NEXT_PUBLIC_API_URL=https://api.hnlaptopstore.com
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
DATABASE_URL=postgresql://...
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=https://hnlaptopstore.com
```

### Next.js Configuration
```javascript
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['images.unsplash.com', 'cdn.hnlaptopstore.com'],
    formats: ['image/webp', 'image/avif'],
  },
  i18n: {
    locales: ['en', 'ar'],
    defaultLocale: 'en',
    localeDetection: true,
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://api.hnlaptopstore.com/:path*',
      },
    ];
  },
};

module.exports = nextConfig;
```

### Docker Configuration
```dockerfile
# Dockerfile
FROM node:18-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

FROM node:18-alpine AS builder
WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
ENV PORT 3000

CMD ["node", "server.js"]
```

## 12. Performance Monitoring

### Web Vitals
```tsx
// lib/analytics.ts
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

export function sendToAnalytics(metric: any) {
  // Send to your analytics service
  console.log(metric);
}

export function reportWebVitals() {
  getCLS(sendToAnalytics);
  getFID(sendToAnalytics);
  getFCP(sendToAnalytics);
  getLCP(sendToAnalytics);
  getTTFB(sendToAnalytics);
}
```

### Error Tracking
```tsx
// lib/error-tracking.ts
export function trackError(error: Error, context?: any) {
  // Send error to your error tracking service
  console.error('Error:', error, 'Context:', context);
}

// Error boundary component
export class ErrorBoundary extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    trackError(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <div>Something went wrong.</div>;
    }

    return this.props.children;
  }
}
```

## 13. Documentation

### Component Documentation
```tsx
/**
 * Button component for user interactions
 * 
 * @param variant - Visual style variant
 * @param size - Button size
 * @param children - Button content
 * @param onClick - Click handler
 * @param disabled - Disabled state
 * @param loading - Loading state
 * 
 * @example
 * <Button variant="primary" size="md" onClick={handleClick}>
 *   Click me
 * </Button>
 */
export const Button: React.FC<ButtonProps> = ({ ... }) => {
  // Component implementation
};
```

### API Documentation
```typescript
/**
 * Product API endpoints
 * 
 * GET /api/products - Get all products
 * GET /api/products/:id - Get product by ID
 * POST /api/products - Create new product
 * PUT /api/products/:id - Update product
 * DELETE /api/products/:id - Delete product
 */

interface ProductAPI {
  getProducts(params?: ProductQueryParams): Promise<Product[]>;
  getProduct(id: string): Promise<Product>;
  createProduct(product: CreateProductRequest): Promise<Product>;
  updateProduct(id: string, product: UpdateProductRequest): Promise<Product>;
  deleteProduct(id: string): Promise<void>;
}
```

## 14. Maintenance Guidelines

### Code Quality
- **ESLint**: Configured for TypeScript and React
- **Prettier**: Code formatting
- **Husky**: Pre-commit hooks
- **TypeScript**: Strict mode enabled

### Performance
- **Bundle Analysis**: Regular bundle size monitoring
- **Image Optimization**: WebP format, lazy loading
- **Code Splitting**: Dynamic imports for heavy components
- **Caching**: Proper cache headers and strategies

### Security
- **Input Validation**: All user inputs validated
- **XSS Protection**: Content Security Policy
- **CSRF Protection**: CSRF tokens for forms
- **HTTPS**: SSL/TLS encryption

### Monitoring
- **Error Tracking**: Real-time error monitoring
- **Performance Monitoring**: Web Vitals tracking
- **User Analytics**: User behavior tracking
- **Uptime Monitoring**: Service availability monitoring

## 15. Support and Resources

### Design System
- **Figma File**: [Link to Figma file]
- **Design Tokens**: `tokens.json`
- **Component Library**: Storybook documentation
- **Style Guide**: `design_system.md`

### Development Resources
- **GitHub Repository**: [Repository URL]
- **Documentation**: [Documentation URL]
- **API Documentation**: [API Docs URL]
- **Deployment Guide**: [Deployment URL]

### Contact Information
- **Design Team**: design@hnlaptopstore.com
- **Development Team**: dev@hnlaptopstore.com
- **Project Manager**: pm@hnlaptopstore.com
- **Support**: support@hnlaptopstore.com
