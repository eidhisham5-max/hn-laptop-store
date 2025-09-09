const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials. Please check your .env.local file.')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

async function simpleSeed() {
  try {
    console.log('🌱 Starting simple database seeding...')

    // 1. إضافة brands
    console.log('📦 Adding brands...')
    const { data: brands, error: brandsError } = await supabase
      .from('brands')
      .upsert([
        { name: 'Apple', slug: 'apple' },
        { name: 'Dell', slug: 'dell' },
        { name: 'HP', slug: 'hp' },
        { name: 'Lenovo', slug: 'lenovo' },
        { name: 'ASUS', slug: 'asus' }
      ], { onConflict: 'name' })
      .select()

    if (brandsError) {
      console.error('Error adding brands:', brandsError)
      return
    }

    console.log(`✅ Added ${brands.length} brands`)

    // 2. إضافة منتج واحد للاختبار
    console.log('💻 Adding test product...')
    const { data: product, error: productError } = await supabase
      .from('products')
      .insert({
        name: 'MacBook Pro 16" M3',
        category: 'Laptop',
        price: 2499,
        original_price: 2799,
        stock: 10,
        condition: 'New',
        specs: 'Apple M3 chip, 16GB RAM, 512GB SSD',
        discount: 11,
        status: 'Active',
        description: 'The most powerful MacBook Pro with M3 chip',
        brand_id: brands[0].id
      })
      .select()

    if (productError) {
      console.error('Error adding product:', productError)
      return
    }

    console.log(`✅ Added test product: ${product[0].name}`)

    // 3. إضافة صورة للمنتج
    console.log('🖼️ Adding product image...')
    const { error: imageError } = await supabase
      .from('product_images')
      .insert({
        product_id: product[0].id,
        url: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop'
      })

    if (imageError) {
      console.error('Error adding image:', imageError)
    } else {
      console.log('✅ Added product image')
    }

    console.log('🎉 Simple seeding completed successfully!')

  } catch (error) {
    console.error('❌ Error during seeding:', error)
  }
}

simpleSeed()
