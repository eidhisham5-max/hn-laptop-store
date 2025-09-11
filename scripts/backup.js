const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Load environment variables
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials in environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function backupData() {
  try {
    console.log('Starting database backup...');
    
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupDir = path.join(__dirname, '..', 'backups');
    
    // Create backups directory if it doesn't exist
    if (!fs.existsSync(backupDir)) {
      fs.mkdirSync(backupDir, { recursive: true });
    }
    
    // Backup brands
    console.log('Backing up brands...');
    const { data: brands, error: brandsError } = await supabase
      .from('brands')
      .select('*');
    
    if (brandsError) throw brandsError;
    
    // Backup products
    console.log('Backing up products...');
    const { data: products, error: productsError } = await supabase
      .from('products')
      .select(`
        *,
        brand:brands(*)
      `);
    
    if (productsError) throw productsError;
    
    // Backup product images
    console.log('Backing up product images...');
    const { data: productImages, error: imagesError } = await supabase
      .from('product_images')
      .select('*');
    
    if (imagesError) throw imagesError;
    
    // Backup orders
    console.log('Backing up orders...');
    const { data: orders, error: ordersError } = await supabase
      .from('orders')
      .select(`
        *,
        order_items:order_items(*)
      `);
    
    if (ordersError) throw ordersError;
    
    // Create backup object
    const backup = {
      timestamp: new Date().toISOString(),
      version: '1.0',
      data: {
        brands,
        products,
        product_images: productImages,
        orders
      }
    };
    
    // Write backup file
    const backupFile = path.join(backupDir, `backup-${timestamp}.json`);
    fs.writeFileSync(backupFile, JSON.stringify(backup, null, 2));
    
    console.log(`Backup completed successfully: ${backupFile}`);
    console.log(`Backup contains:`);
    console.log(`- ${brands.length} brands`);
    console.log(`- ${products.length} products`);
    console.log(`- ${productImages.length} product images`);
    console.log(`- ${orders.length} orders`);
    
  } catch (error) {
    console.error('Backup failed:', error.message);
    process.exit(1);
  }
}

// Run backup if called directly
if (require.main === module) {
  backupData();
}

module.exports = { backupData };
