-- إصلاح قاعدة البيانات - تشغيل هذا في Supabase SQL Editor

-- 1. إنشاء جدول brands إذا لم يكن موجود
CREATE TABLE IF NOT EXISTS public.brands (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. إنشاء جدول products مع جميع الأعمدة المطلوبة
CREATE TABLE IF NOT EXISTS public.products (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT,
  price NUMERIC NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. إضافة الأعمدة الناقصة
DO $$
BEGIN
  -- إضافة brand_id
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='products' AND column_name='brand_id') THEN
    ALTER TABLE public.products ADD COLUMN brand_id BIGINT;
  END IF;
  
  -- إضافة original_price
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='products' AND column_name='original_price') THEN
    ALTER TABLE public.products ADD COLUMN original_price NUMERIC;
  END IF;
  
  -- إضافة stock
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='products' AND column_name='stock') THEN
    ALTER TABLE public.products ADD COLUMN stock INT NOT NULL DEFAULT 0;
  END IF;
  
  -- إضافة condition
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='products' AND column_name='condition') THEN
    ALTER TABLE public.products ADD COLUMN condition TEXT NOT NULL DEFAULT 'New';
  END IF;
  
  -- إضافة specs
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='products' AND column_name='specs') THEN
    ALTER TABLE public.products ADD COLUMN specs TEXT;
  END IF;
  
  -- إضافة discount
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='products' AND column_name='discount') THEN
    ALTER TABLE public.products ADD COLUMN discount INT;
  END IF;
  
  -- إضافة status
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='products' AND column_name='status') THEN
    ALTER TABLE public.products ADD COLUMN status TEXT NOT NULL DEFAULT 'Active';
  END IF;
END $$;

-- 4. إضافة foreign key constraint
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'products_brand_id_fkey') THEN
    ALTER TABLE public.products ADD CONSTRAINT products_brand_id_fkey FOREIGN KEY (brand_id) REFERENCES public.brands(id) ON DELETE RESTRICT;
  END IF;
END $$;

-- 5. إنشاء جدول product_images
CREATE TABLE IF NOT EXISTS public.product_images (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  product_id BIGINT NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. إنشاء جدول orders
CREATE TABLE IF NOT EXISTS public.orders (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  customer_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  address TEXT NOT NULL,
  total NUMERIC NOT NULL,
  status TEXT NOT NULL DEFAULT 'Pending' CHECK (status IN ('Pending','Processing','Completed')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. إنشاء جدول order_items
CREATE TABLE IF NOT EXISTS public.order_items (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  order_id BIGINT NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  product_id BIGINT NOT NULL REFERENCES public.products(id) ON DELETE RESTRICT,
  qty INT NOT NULL,
  price NUMERIC NOT NULL
);

-- 8. تعطيل RLS مؤقتاً للتطوير
ALTER TABLE public.brands DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.products DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_images DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items DISABLE ROW LEVEL SECURITY;

-- 9. إضافة بيانات تجريبية
INSERT INTO public.brands (name, slug) VALUES
('Apple', 'apple'),
('Dell', 'dell'),
('HP', 'hp'),
('Lenovo', 'lenovo'),
('ASUS', 'asus'),
('Acer', 'acer'),
('MSI', 'msi'),
('Samsung', 'samsung')
ON CONFLICT (name) DO NOTHING;
