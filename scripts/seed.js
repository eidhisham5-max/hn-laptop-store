const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials. Please check your .env.local file.')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

const sampleBrands = [
  { name: 'Apple', slug: 'apple' },
  { name: 'Dell', slug: 'dell' },
  { name: 'HP', slug: 'hp' },
  { name: 'Lenovo', slug: 'lenovo' },
  { name: 'ASUS', slug: 'asus' },
  { name: 'Acer', slug: 'acer' },
  { name: 'MSI', slug: 'msi' },
  { name: 'Samsung', slug: 'samsung' }
]

const sampleProducts = [
  {
    name: 'MacBook Pro 16" M3',
    category: 'Laptop',
    price: 2499,
    original_price: 2799,
    stock: 10,
    condition: 'New',
    specs: 'Apple M3 chip, 16GB RAM, 512GB SSD, 16-inch Retina display, 22-hour battery life',
    discount: 11,
    status: 'Active',
    description: 'The most powerful MacBook Pro with M3 chip for professionals. Features stunning 16-inch Liquid Retina XDR display and all-day battery life.',
    brand_name: 'Apple'
  },
  {
    name: 'Dell XPS 15',
    category: 'Laptop',
    price: 1899,
    original_price: 2199,
    stock: 8,
    condition: 'New',
    specs: 'Intel i7-13700H, 16GB RAM, 512GB SSD, 15.6" 4K OLED display, NVIDIA RTX 4050',
    discount: 14,
    status: 'Active',
    description: 'Premium Windows laptop with stunning 4K OLED display and powerful performance for creative professionals.',
    brand_name: 'Dell'
  },
  {
    name: 'HP Spectre x360',
    category: 'Laptop',
    price: 1299,
    original_price: 1499,
    stock: 12,
    condition: 'New',
    specs: 'Intel i5-1335U, 8GB RAM, 256GB SSD, 13.3" touchscreen, 360° hinge',
    discount: 13,
    status: 'Active',
    description: 'Convertible laptop with 360-degree hinge, perfect for work and entertainment.',
    brand_name: 'HP'
  },
  {
    name: 'Lenovo ThinkPad X1 Carbon',
    category: 'Laptop',
    price: 1599,
    original_price: 1799,
    stock: 6,
    condition: 'New',
    specs: 'Intel i7-1365U, 16GB RAM, 1TB SSD, 14" 2.8K display, MIL-STD tested',
    discount: 11,
    status: 'Active',
    description: 'Business laptop with legendary ThinkPad durability and enterprise-grade security.',
    brand_name: 'Lenovo'
  },
  {
    name: 'ASUS ROG Strix G15',
    category: 'Gaming Laptop',
    price: 1999,
    original_price: 2299,
    stock: 5,
    condition: 'New',
    specs: 'AMD Ryzen 7 7735HS, RTX 4060, 16GB RAM, 1TB SSD, 15.6" 165Hz display',
    discount: 13,
    status: 'Active',
    description: 'High-performance gaming laptop with RTX 4060 graphics and 165Hz refresh rate.',
    brand_name: 'ASUS'
  },
  {
    name: 'MacBook Air M2',
    category: 'Laptop',
    price: 1199,
    original_price: 1299,
    stock: 15,
    condition: 'New',
    specs: 'Apple M2 chip, 8GB RAM, 256GB SSD, 13.6" Liquid Retina display, 18-hour battery',
    discount: 8,
    status: 'Active',
    description: 'Ultra-thin and light laptop with M2 chip, perfect for everyday tasks and portability.',
    brand_name: 'Apple'
  },
  {
    name: 'Dell Inspiron 15 3000',
    category: 'Laptop',
    price: 599,
    original_price: 699,
    stock: 20,
    condition: 'New',
    specs: 'Intel i3-1215U, 8GB RAM, 256GB SSD, 15.6" HD display, Windows 11',
    discount: 14,
    status: 'Active',
    description: 'Affordable everyday laptop with reliable performance for students and home users.',
    brand_name: 'Dell'
  },
  {
    name: 'HP Pavilion 15',
    category: 'Laptop',
    price: 799,
    original_price: 899,
    stock: 0,
    condition: 'New',
    specs: 'AMD Ryzen 5 5625U, 8GB RAM, 256GB SSD, 15.6" FHD display',
    discount: 11,
    status: 'Inactive',
    description: 'Versatile laptop with AMD Ryzen processor, great for productivity and entertainment.',
    brand_name: 'HP'
  },
  {
    name: 'Lenovo IdeaPad 3',
    category: 'Laptop',
    price: 449,
    original_price: 549,
    stock: 18,
    condition: 'Refurbished',
    specs: 'AMD Ryzen 3 3250U, 4GB RAM, 128GB SSD, 15.6" HD display',
    discount: 18,
    status: 'Active',
    description: 'Budget-friendly laptop with essential features for basic computing needs.',
    brand_name: 'Lenovo'
  },
  {
    name: 'ASUS VivoBook S15',
    category: 'Laptop',
    price: 899,
    original_price: 1099,
    stock: 7,
    condition: 'New',
    specs: 'Intel i5-1235U, 8GB RAM, 512GB SSD, 15.6" FHD display, fingerprint reader',
    discount: 18,
    status: 'Active',
    description: 'Sleek and stylish laptop with modern features and excellent build quality.',
    brand_name: 'ASUS'
  }
]

const sampleImages = [
  'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=800&auto=format&fit=crop'
]

async function seedDatabase() {
  try {
    console.log('🌱 Starting database seeding...')

    // 1. Insert brands
    console.log('📦 Inserting brands...')
    const { data: brands, error: brandsError } = await supabase
      .from('brands')
      .upsert(sampleBrands, { onConflict: 'name' })
      .select()

    if (brandsError) {
      console.error('Error inserting brands:', brandsError)
      return
    }

    console.log(`✅ Inserted ${brands.length} brands`)

    // 2. Get brand IDs for products
    const brandMap = {}
    brands.forEach(brand => {
      brandMap[brand.name] = brand.id
    })

    // 3. Upsert/update products by (name + brand)
    console.log('💻 Upserting products...')
    const insertedProducts = []
    for (const p of sampleProducts) {
      const brand_id = brandMap[p.brand_name]
      const { data: existing, error: findErr } = await supabase
        .from('products')
        .select('id')
        .eq('name', p.name)
        .eq('brand_id', brand_id)
        .maybeSingle()
      if (findErr) { console.error('Find product error:', findErr); continue }

      const productRow = {
        name: p.name,
        category: p.category,
        price: p.price,
        original_price: p.original_price,
        stock: p.stock,
        condition: p.condition,
        specs: p.specs,
        discount: p.discount,
        status: p.status,
        description: p.description,
        brand_id,
      }

      if (existing) {
        const { error: updErr } = await supabase
          .from('products')
          .update(productRow)
          .eq('id', existing.id)
        if (updErr) { console.error('Update product error:', updErr); continue }
        insertedProducts.push({ id: existing.id, name: p.name })
      } else {
        const { data: ins, error: insErr } = await supabase
          .from('products')
          .insert(productRow)
          .select('id')
          .single()
        if (insErr) { console.error('Insert product error:', insErr); continue }
        insertedProducts.push({ id: ins.id, name: p.name })
      }
    }

    console.log(`✅ Upserted ${insertedProducts.length} products`)

    // 4. Insert product images
    console.log('🖼️ Inserting product images...')
    let imagesInserted = 0
    for (let i = 0; i < insertedProducts.length; i++) {
      const product = insertedProducts[i]
      const { data: existingImgs, error: imgFindErr } = await supabase
        .from('product_images')
        .select('id')
        .eq('product_id', product.id)
        .limit(1)
      if (imgFindErr) { console.error('Find images error:', imgFindErr); continue }
      if (!existingImgs || existingImgs.length === 0) {
        const url = sampleImages[i % sampleImages.length]
        const { error: insImgErr } = await supabase
          .from('product_images')
          .insert({ product_id: product.id, url })
        if (insImgErr) { console.error('Insert image error:', insImgErr); continue }
        imagesInserted += 1
      }
    }

    console.log(`✅ Ensured images; inserted ${imagesInserted} new product images`)

    // 5. Create sample orders
    console.log('📋 Creating sample orders...')
    const sampleOrders = [
      {
        customer_name: 'Ahmed Ali',
        phone: '+201234567890',
        address: '123 Tahrir Square, Cairo, Egypt',
        total: 1899,
        status: 'Completed'
      },
      {
        customer_name: 'Sara Mohamed',
        phone: '+201987654321',
        address: '456 Zamalek, Cairo, Egypt',
        total: 1299,
        status: 'Processing'
      },
      {
        customer_name: 'Omar Hassan',
        phone: '+201112233445',
        address: '789 Maadi, Cairo, Egypt',
        total: 2499,
        status: 'Pending'
      }
    ]

    const { data: orders, error: ordersError } = await supabase
      .from('orders')
      .insert(sampleOrders)
      .select()

    if (ordersError) {
      console.error('Error inserting orders:', ordersError)
      return
    }

    console.log(`✅ Created ${orders.length} sample orders`)

    // 6. Create sample order items
    console.log('🛒 Creating sample order items...')
    const orderItems = [
      { order_id: orders[0].id, product_id: insertedProducts[1].id, qty: 1, price: 1899 },
      { order_id: orders[1].id, product_id: insertedProducts[2].id, qty: 1, price: 1299 },
      { order_id: orders[2].id, product_id: insertedProducts[0].id, qty: 1, price: 2499 }
    ]

    const { error: orderItemsError } = await supabase
      .from('order_items')
      .insert(orderItems)

    if (orderItemsError) {
      console.error('Error inserting order items:', orderItemsError)
      return
    }

    console.log(`✅ Created ${orderItems.length} order items`)

    console.log('🎉 Database seeding completed successfully!')
    console.log('\n📊 Summary:')
    console.log(`- ${brands.length} brands`)
    console.log(`- ${insertedProducts.length} products`)
    console.log(`- ${imageInserts.length} product images`)
    console.log(`- ${orders.length} orders`)
    console.log(`- ${orderItems.length} order items`)

  } catch (error) {
    console.error('❌ Error during seeding:', error)
  }
}

seedDatabase()
