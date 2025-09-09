# Supabase Database Setup Guide

This guide will help you set up the Supabase database for the HN Laptop Store application.

## Prerequisites

1. A Supabase account and project
2. Access to the Supabase SQL Editor

## Database Schema Setup

### Step 1: Create Tables

Run the following SQL script in your Supabase SQL Editor:

```sql
-- =============== 1) brands ===============
CREATE TABLE IF NOT EXISTS public.brands (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============== 2) products ===============
CREATE TABLE IF NOT EXISTS public.products (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT,
  price NUMERIC NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add missing columns if they don't exist
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='products' AND column_name='original_price') THEN
    ALTER TABLE public.products ADD COLUMN original_price NUMERIC;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='products' AND column_name='stock') THEN
    ALTER TABLE public.products ADD COLUMN stock INT NOT NULL DEFAULT 0;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='products' AND column_name='condition') THEN
    ALTER TABLE public.products ADD COLUMN condition TEXT NOT NULL CHECK (condition IN ('New','Refurbished','Used'));
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='products' AND column_name='specs') THEN
    ALTER TABLE public.products ADD COLUMN specs TEXT;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='products' AND column_name='discount') THEN
    ALTER TABLE public.products ADD COLUMN discount INT;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='products' AND column_name='status') THEN
    ALTER TABLE public.products ADD COLUMN status TEXT NOT NULL DEFAULT 'Active';
    ALTER TABLE public.products ADD CONSTRAINT products_status_check CHECK (status IN ('Active','Inactive'));
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='products' AND column_name='brand_id') THEN
    ALTER TABLE public.products ADD COLUMN brand_id BIGINT;
  END IF;
END $$;

-- =============== FK brand_id → brands ===============
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'products_brand_id_fkey'
  ) THEN
    ALTER TABLE public.products DROP CONSTRAINT products_brand_id_fkey;
  END IF;
  ALTER TABLE public.products
    ADD CONSTRAINT products_brand_id_fkey
    FOREIGN KEY (brand_id) REFERENCES public.brands(id) ON DELETE RESTRICT;
END $$;

-- =============== 3) product_images ===============
CREATE TABLE IF NOT EXISTS public.product_images (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  product_id BIGINT NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============== 4) orders ===============
CREATE TABLE IF NOT EXISTS public.orders (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  customer_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  address TEXT NOT NULL,
  total NUMERIC NOT NULL,
  status TEXT NOT NULL DEFAULT 'Pending' CHECK (status IN ('Pending','Processing','Completed')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============== 5) order_items ===============
CREATE TABLE IF NOT EXISTS public.order_items (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  order_id BIGINT NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  product_id BIGINT NOT NULL REFERENCES public.products(id) ON DELETE RESTRICT,
  qty INT NOT NULL,
  price NUMERIC NOT NULL
);
```

### Step 2: Disable RLS (for development)

```sql
-- Disable RLS temporarily for development
ALTER TABLE public.brands DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.products DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_images DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items DISABLE ROW LEVEL SECURITY;
```

### Step 3: Insert Sample Data

```sql
-- Insert sample brands
INSERT INTO public.brands (name, slug) VALUES
('Apple', 'apple'),
('Dell', 'dell'),
('HP', 'hp'),
('Lenovo', 'lenovo'),
('ASUS', 'asus')
ON CONFLICT (name) DO NOTHING;

-- Insert sample products
INSERT INTO public.products (name, category, price, original_price, stock, condition, specs, discount, status, brand_id, description) VALUES
('MacBook Pro 16" M3', 'Laptop', 2499, 2799, 10, 'New', 'Apple M3 chip, 16GB RAM, 512GB SSD, 16-inch Retina display', 11, 'Active', 1, 'The most powerful MacBook Pro with M3 chip for professionals'),
('Dell XPS 15', 'Laptop', 1899, 2199, 8, 'New', 'Intel i7, 16GB RAM, 512GB SSD, 15.6" 4K display', 14, 'Active', 2, 'Premium Windows laptop with stunning 4K display'),
('HP Spectre x360', 'Laptop', 1299, 1499, 12, 'New', 'Intel i5, 8GB RAM, 256GB SSD, 13.3" touchscreen', 13, 'Active', 3, 'Convertible laptop with 360-degree hinge'),
('Lenovo ThinkPad X1', 'Laptop', 1599, 1799, 6, 'New', 'Intel i7, 16GB RAM, 1TB SSD, 14" display', 11, 'Active', 4, 'Business laptop with legendary ThinkPad durability'),
('ASUS ROG Strix', 'Gaming Laptop', 1999, 2299, 5, 'New', 'RTX 4060, AMD Ryzen 7, 16GB RAM, 1TB SSD', 13, 'Active', 5, 'High-performance gaming laptop for enthusiasts')
ON CONFLICT DO NOTHING;

-- Insert sample product images
INSERT INTO public.product_images (product_id, url) VALUES
(1, 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop'),
(2, 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&auto=format&fit=crop'),
(3, 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800&auto=format&fit=crop'),
(4, 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800&auto=format&fit=crop'),
(5, 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=800&auto=format&fit=crop');
```

## Environment Variables

1. Copy `env.example` to `.env.local`
2. Fill in your Supabase project details:
   - `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anon key
   - `SUPABASE_SERVICE_ROLE_KEY`: Your Supabase service role key (for admin operations)

## Storage Setup (Optional)

If you want to upload images to Supabase Storage:

1. Go to Storage in your Supabase dashboard
2. Create a new bucket called `product-images`
3. Set the bucket to public
4. Update the `NEXT_PUBLIC_STORAGE_BUCKET` environment variable

## Verification

After running the setup:

1. Check that all tables exist in the Table Editor
2. Verify that sample data is inserted
3. Test the application by running `npm run dev`
4. Visit `/admin/products` to see the products
5. Visit `/products` to see the public product listing

## Troubleshooting

- If you get "table not found" errors, make sure you ran the SQL script in the correct order
- If you get permission errors, ensure RLS is disabled for development
- If images don't load, check that the URLs in `product_images` are valid
- If the app doesn't connect, verify your environment variables are correct
