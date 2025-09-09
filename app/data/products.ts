"use client";

export type DetailedSpecs = {
  cpu?: string;
  gpu?: string;
  ram?: string;
  storage?: string;
  display?: string;
  battery?: string;
  ports?: string;
  os?: string;
};

export type Product = {
  id: number;
  name: string;
  brand: string;
  category?: 'Gaming' | 'Business' | 'Ultrabook' | 'Everyday';
  price: number;
  originalPrice?: number;
  stock: number;
  condition: "New" | "Refurbished" | "Used";
  specs: string;
  description?: string;
  images: string[];
  rating?: number;
  reviews?: number;
  discount?: number;
  detailedSpecs?: DetailedSpecs;
};

const STORAGE_KEY = "hn_products";

const seed: Product[] = [
  {
    id: 1,
    name: "Dell XPS 13",
    brand: "Dell",
    category: 'Ultrabook',
    price: 1200,
    originalPrice: 1400,
    stock: 8,
    condition: "New",
    specs: "Intel i7, 16GB RAM, 512GB SSD",
    description: "Ultrabook premium with excellent battery life.",
    images: [
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&auto=format&fit=crop"
    ],
    rating: 4.8,
    reviews: 124,
    discount: 14,
    detailedSpecs: {
      cpu: 'Intel Core i7-1260P',
      gpu: 'Intel Iris Xe',
      ram: '16GB LPDDR5',
      storage: '512GB NVMe SSD',
      display: '13.4" 1920x1200 IPS',
      battery: '52Wh',
      ports: '2x Thunderbolt 4, Audio',
      os: 'Windows 11'
    }
  },
  {
    id: 2,
    name: "HP Pavilion 15",
    brand: "HP",
    category: 'Everyday',
    price: 800,
    originalPrice: 950,
    stock: 15,
    condition: "Refurbished",
    specs: "AMD Ryzen 5, 8GB RAM, 256GB SSD",
    images: [
      "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=1200&auto=format&fit=crop"
    ],
    rating: 4.6,
    reviews: 89,
    discount: 16,
    detailedSpecs: {
      cpu: 'AMD Ryzen 5 5500U',
      gpu: 'Integrated Radeon',
      ram: '8GB DDR4',
      storage: '256GB SSD',
      display: '15.6" FHD',
      battery: '41Wh',
      ports: 'HDMI, USB-A, USB-C',
      os: 'Windows 11'
    }
  },
  {
    id: 3,
    name: "Lenovo ThinkPad X1",
    brand: "Lenovo",
    category: 'Business',
    price: 1500,
    originalPrice: 1800,
    stock: 6,
    condition: "New",
    specs: "Intel i7, 32GB RAM, 1TB SSD",
    images: [
      "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&auto=format&fit=crop"
    ],
    rating: 4.9,
    reviews: 203,
    discount: 17,
    detailedSpecs: {
      cpu: 'Intel Core i7-1355U',
      gpu: 'Intel Iris Xe',
      ram: '32GB LPDDR5',
      storage: '1TB NVMe SSD',
      display: '14" 1920x1200 IPS',
      battery: '57Wh',
      ports: '2x Thunderbolt 4, HDMI, USB-A',
      os: 'Windows 11 Pro'
    }
  }
];

function load(): Product[] {
  if (typeof window === "undefined") return seed;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(seed));
      return seed;
    }
    return JSON.parse(raw) as Product[];
  } catch {
    return seed;
  }
}

function save(products: Product[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
}

export function getProducts(): Product[] {
  return load();
}

export function getProductById(id: number): Product | undefined {
  return load().find(p => p.id === id);
}

export function getProductsByBrand(brand: string): Product[] {
  return load().filter(p => p.brand.toLowerCase() === brand.toLowerCase());
}

export function addProduct(input: Omit<Product, "id">): Product {
  const products = load();
  const nextId = products.length ? Math.max(...products.map(p => p.id)) + 1 : 1;
  const created: Product = { id: nextId, ...input };
  products.push(created);
  save(products);
  return created;
}

// Simple cart utilities (localStorage-based)
const CART_KEY = "hn_cart";
export type CartItem = { productId: number; qty: number };

export function getCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(CART_KEY);
    return raw ? (JSON.parse(raw) as CartItem[]) : [];
  } catch {
    return [];
  }
}

export function setCart(items: CartItem[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(CART_KEY, JSON.stringify(items));
}

export function addToCart(productId: number, qty = 1) {
  const items = getCart();
  const existing = items.find(i => i.productId === productId);
  if (existing) existing.qty += qty; else items.push({ productId, qty });
  setCart(items);
}

export function updateCartItem(productId: number, qty: number) {
  let items = getCart();
  items = items.map(i => (i.productId === productId ? { ...i, qty } : i)).filter(i => i.qty > 0);
  setCart(items);
}

export function clearCart() { setCart([]); }


