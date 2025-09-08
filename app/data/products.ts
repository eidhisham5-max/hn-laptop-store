export type Product = {
  id: number
  name: string
  brand: 'Dell' | 'HP' | 'Lenovo' | 'ASUS' | 'Acer'
  category: 'Gaming' | 'Business' | 'Ultrabook' | 'Everyday'
  price: number
  originalPrice?: number
  image: string
  specs: string
  condition: 'New' | 'Refurbished'
  rating: number
  reviews: number
}

export const brands: Array<Product['brand']> = ['Dell', 'HP', 'Lenovo', 'ASUS', 'Acer']

export const categories: Array<Product['category']> = ['Gaming', 'Business', 'Ultrabook', 'Everyday']

export const brandLogoUrlByName: Record<string, string> = {
  Dell: 'https://upload.wikimedia.org/wikipedia/commons/4/48/Dell_Logo.svg',
  HP: 'https://upload.wikimedia.org/wikipedia/commons/3/3a/HP_logo_2012.svg',
  Lenovo: 'https://upload.wikimedia.org/wikipedia/commons/0/0c/Lenovo_logo_2015.svg',
  ASUS: 'https://upload.wikimedia.org/wikipedia/commons/0/0c/ASUS_Logo.svg',
  Acer: 'https://upload.wikimedia.org/wikipedia/commons/5/58/Acer_2011.svg',
}

export function brandSlugToName(slug: string): Product['brand'] | null {
  const map: Record<string, Product['brand']> = {
    dell: 'Dell',
    hp: 'HP',
    lenovo: 'Lenovo',
    asus: 'ASUS',
    acer: 'Acer',
  }
  const lower = slug.toLowerCase()
  return map[lower] ?? null
}

export function brandNameToSlug(name: string): string {
  const map: Record<string, string> = {
    Dell: 'dell',
    HP: 'hp',
    Lenovo: 'lenovo',
    ASUS: 'asus',
    Acer: 'acer',
  }
  return map[name] ?? name.toLowerCase()
}

export const allProducts: Product[] = [
  {
    id: 1,
    name: 'Dell XPS 13',
    brand: 'Dell',
    category: 'Ultrabook',
    price: 1200,
    originalPrice: 1400,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&h=600&fit=crop&auto=format',
    specs: 'Intel i7, 16GB RAM, 512GB SSD',
    condition: 'New',
    rating: 4.8,
    reviews: 124,
  },
  {
    id: 2,
    name: 'HP Pavilion 15',
    brand: 'HP',
    category: 'Everyday',
    price: 800,
    originalPrice: 950,
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&h=600&fit=crop&auto=format',
    specs: 'AMD Ryzen 5, 8GB RAM, 256GB SSD',
    condition: 'Refurbished',
    rating: 4.6,
    reviews: 89,
  },
  {
    id: 3,
    name: 'Lenovo ThinkPad X1',
    brand: 'Lenovo',
    category: 'Business',
    price: 1500,
    originalPrice: 1800,
    image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800&h=600&fit=crop&auto=format',
    specs: 'Intel i7, 32GB RAM, 1TB SSD',
    condition: 'New',
    rating: 4.9,
    reviews: 203,
  },
  {
    id: 4,
    name: 'Dell Inspiron 15',
    brand: 'Dell',
    category: 'Everyday',
    price: 650,
    originalPrice: 750,
    image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800&h=600&fit=crop&auto=format',
    specs: 'Intel i5, 8GB RAM, 256GB SSD',
    condition: 'Refurbished',
    rating: 4.5,
    reviews: 67,
  },
  {
    id: 5,
    name: 'ASUS ROG Zephyrus',
    brand: 'ASUS',
    category: 'Gaming',
    price: 1700,
    originalPrice: 1950,
    image: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=800&h=600&fit=crop&auto=format',
    specs: 'AMD Ryzen 7, 16GB RAM, RTX 3060, 1TB SSD',
    condition: 'New',
    rating: 4.7,
    reviews: 156,
  },
  {
    id: 6,
    name: 'Acer Nitro 5',
    brand: 'Acer',
    category: 'Gaming',
    price: 1100,
    originalPrice: 1299,
    image: 'https://images.unsplash.com/photo-1587202372775-98927b7d5973?w=800&h=600&fit=crop&auto=format',
    specs: 'Intel i5, 16GB RAM, GTX 1650, 512GB SSD',
    condition: 'Refurbished',
    rating: 4.4,
    reviews: 142,
  },
  {
    id: 7,
    name: 'HP EliteBook 840',
    brand: 'HP',
    category: 'Business',
    price: 1300,
    originalPrice: 1450,
    image: 'https://images.unsplash.com/photo-1559163433-3f5d8d9439b5?w=800&h=600&fit=crop&auto=format',
    specs: 'Intel i7, 16GB RAM, 512GB SSD',
    condition: 'New',
    rating: 4.6,
    reviews: 98,
  },
  {
    id: 8,
    name: 'Lenovo Yoga Slim 7',
    brand: 'Lenovo',
    category: 'Ultrabook',
    price: 1150,
    originalPrice: 1290,
    image: 'https://images.unsplash.com/photo-1517512006864-7edc3b933137?w=800&h=600&fit=crop&auto=format',
    specs: 'AMD Ryzen 7, 16GB RAM, 512GB SSD',
    condition: 'New',
    rating: 4.5,
    reviews: 76,
  },
  {
    id: 9,
    name: 'ASUS ZenBook 14',
    brand: 'ASUS',
    category: 'Ultrabook',
    price: 999,
    originalPrice: 1199,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&h=600&fit=crop&auto=format',
    specs: 'Intel i5, 8GB RAM, 256GB SSD',
    condition: 'Refurbished',
    rating: 4.3,
    reviews: 54,
  },
  {
    id: 10,
    name: 'Dell G15',
    brand: 'Dell',
    category: 'Gaming',
    price: 1350,
    originalPrice: 1499,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&h=600&fit=crop&auto=format',
    specs: 'Intel i7, 16GB RAM, RTX 3050, 512GB SSD',
    condition: 'New',
    rating: 4.5,
    reviews: 121,
  },
  {
    id: 11,
    name: 'Acer Swift 3',
    brand: 'Acer',
    category: 'Everyday',
    price: 780,
    originalPrice: 899,
    image: 'https://images.unsplash.com/photo-1517512006864-7edc3b933137?w=800&h=600&fit=crop&auto=format',
    specs: 'Intel i5, 8GB RAM, 256GB SSD',
    condition: 'Refurbished',
    rating: 4.2,
    reviews: 65,
  },
  {
    id: 12,
    name: 'HP Omen 16',
    brand: 'HP',
    category: 'Gaming',
    price: 1600,
    originalPrice: 1799,
    image: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=800&h=600&fit=crop&auto=format',
    specs: 'Intel i7, 16GB RAM, RTX 3060, 1TB SSD',
    condition: 'New',
    rating: 4.7,
    reviews: 112,
  },
]

