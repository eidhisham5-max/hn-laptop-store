const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

console.log('Testing database connection...')
console.log('URL:', supabaseUrl)
console.log('Key:', supabaseKey ? 'Present' : 'Missing')

const supabase = createClient(supabaseUrl, supabaseKey)

async function testConnection() {
  try {
    console.log('\n🔍 Testing database connection...')
    
    // Test brands table
    const { data: brands, error: brandsError } = await supabase
      .from('brands')
      .select('*')
      .limit(5)
    
    if (brandsError) {
      console.error('❌ Brands error:', brandsError)
    } else {
      console.log('✅ Brands table working:', brands.length, 'brands found')
    }
    
    // Test products table
    const { data: products, error: productsError } = await supabase
      .from('products')
      .select('*')
      .limit(5)
    
    if (productsError) {
      console.error('❌ Products error:', productsError)
    } else {
      console.log('✅ Products table working:', products.length, 'products found')
    }
    
    // Test orders table
    const { data: orders, error: ordersError } = await supabase
      .from('orders')
      .select('*')
      .limit(5)
    
    if (ordersError) {
      console.error('❌ Orders error:', ordersError)
    } else {
      console.log('✅ Orders table working:', orders.length, 'orders found')
    }
    
    console.log('\n🎉 Database connection test completed!')
    
  } catch (error) {
    console.error('❌ Connection test failed:', error)
  }
}

testConnection()
