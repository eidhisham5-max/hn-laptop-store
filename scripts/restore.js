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

async function restoreData(backupFile) {
  try {
    if (!backupFile) {
      console.error('Please provide a backup file path');
      console.log('Usage: node scripts/restore.js <backup-file>');
      process.exit(1);
    }
    
    const backupPath = path.resolve(backupFile);
    
    if (!fs.existsSync(backupPath)) {
      console.error(`Backup file not found: ${backupPath}`);
      process.exit(1);
    }
    
    console.log(`Loading backup from: ${backupPath}`);
    const backupData = JSON.parse(fs.readFileSync(backupPath, 'utf8'));
    
    console.log(`Backup timestamp: ${backupData.timestamp}`);
    console.log(`Backup version: ${backupData.version}`);
    
    // Restore brands first (due to foreign key constraints)
    console.log('Restoring brands...');
    if (backupData.data.brands && backupData.data.brands.length > 0) {
      const { error: brandsError } = await supabase
        .from('brands')
        .upsert(backupData.data.brands, { onConflict: 'id' });
      
      if (brandsError) throw brandsError;
      console.log(`Restored ${backupData.data.brands.length} brands`);
    }
    
    // Restore products
    console.log('Restoring products...');
    if (backupData.data.products && backupData.data.products.length > 0) {
      // Remove brand relationship data before inserting
      const productsToInsert = backupData.data.products.map(product => {
        const { brand, ...productData } = product;
        return productData;
      });
      
      const { error: productsError } = await supabase
        .from('products')
        .upsert(productsToInsert, { onConflict: 'id' });
      
      if (productsError) throw productsError;
      console.log(`Restored ${productsToInsert.length} products`);
    }
    
    // Restore product images
    console.log('Restoring product images...');
    if (backupData.data.product_images && backupData.data.product_images.length > 0) {
      const { error: imagesError } = await supabase
        .from('product_images')
        .upsert(backupData.data.product_images, { onConflict: 'id' });
      
      if (imagesError) throw imagesError;
      console.log(`Restored ${backupData.data.product_images.length} product images`);
    }
    
    // Restore orders
    console.log('Restoring orders...');
    if (backupData.data.orders && backupData.data.orders.length > 0) {
      // Remove order_items relationship data before inserting
      const ordersToInsert = backupData.data.orders.map(order => {
        const { order_items, ...orderData } = order;
        return orderData;
      });
      
      const { error: ordersError } = await supabase
        .from('orders')
        .upsert(ordersToInsert, { onConflict: 'id' });
      
      if (ordersError) throw ordersError;
      console.log(`Restored ${ordersToInsert.length} orders`);
    }
    
    // Restore order items
    console.log('Restoring order items...');
    if (backupData.data.orders) {
      const allOrderItems = [];
      backupData.data.orders.forEach(order => {
        if (order.order_items) {
          allOrderItems.push(...order.order_items);
        }
      });
      
      if (allOrderItems.length > 0) {
        const { error: orderItemsError } = await supabase
          .from('order_items')
          .upsert(allOrderItems, { onConflict: 'id' });
        
        if (orderItemsError) throw orderItemsError;
        console.log(`Restored ${allOrderItems.length} order items`);
      }
    }
    
    console.log('Restore completed successfully!');
    
  } catch (error) {
    console.error('Restore failed:', error.message);
    process.exit(1);
  }
}

// Run restore if called directly
if (require.main === module) {
  const backupFile = process.argv[2];
  restoreData(backupFile);
}

module.exports = { restoreData };
