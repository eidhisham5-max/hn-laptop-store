const { createClient } = require('@supabase/supabase-js');
const https = require('https');
const http = require('http');

// Load environment variables
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials in environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkDatabase() {
  try {
    console.log('🔍 Checking database connection...');
    
    const { data, error } = await supabase
      .from('brands')
      .select('count')
      .limit(1);
    
    if (error) {
      console.error('❌ Database connection failed:', error.message);
      return false;
    }
    
    console.log('✅ Database connection successful');
    return true;
  } catch (error) {
    console.error('❌ Database check failed:', error.message);
    return false;
  }
}

async function checkApiEndpoint(url) {
  return new Promise((resolve) => {
    const client = url.startsWith('https') ? https : http;
    
    const req = client.get(url, (res) => {
      if (res.statusCode >= 200 && res.statusCode < 300) {
        console.log(`✅ ${url} - Status: ${res.statusCode}`);
        resolve(true);
      } else {
        console.error(`❌ ${url} - Status: ${res.statusCode}`);
        resolve(false);
      }
    });
    
    req.on('error', (error) => {
      console.error(`❌ ${url} - Error: ${error.message}`);
      resolve(false);
    });
    
    req.setTimeout(10000, () => {
      console.error(`❌ ${url} - Timeout`);
      req.destroy();
      resolve(false);
    });
  });
}

async function checkCriticalEndpoints() {
  console.log('🔍 Checking critical endpoints...');
  
  const endpoints = [
    `${appUrl}/`,
    `${appUrl}/products`,
    `${appUrl}/cart`,
    `${appUrl}/admin/products`,
  ];
  
  const results = await Promise.all(
    endpoints.map(endpoint => checkApiEndpoint(endpoint))
  );
  
  const successCount = results.filter(Boolean).length;
  console.log(`📊 Endpoints check: ${successCount}/${endpoints.length} successful`);
  
  return successCount === endpoints.length;
}

async function checkPaymentGateway() {
  try {
    console.log('🔍 Checking payment gateway configuration...');
    
    const requiredEnvVars = [
      'PAYMOB_API_KEY',
      'PAYMOB_HMAC_SECRET',
      'PAYMOB_INTEGRATION_ID',
      'PAYMOB_IFRAME_ID'
    ];
    
    const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);
    
    if (missingVars.length > 0) {
      console.error('❌ Missing payment gateway environment variables:', missingVars.join(', '));
      return false;
    }
    
    console.log('✅ Payment gateway configuration complete');
    return true;
  } catch (error) {
    console.error('❌ Payment gateway check failed:', error.message);
    return false;
  }
}

async function checkAdminConfiguration() {
  try {
    console.log('🔍 Checking admin configuration...');
    
    if (!process.env.NEXT_PUBLIC_ADMIN_EMAIL) {
      console.error('❌ Admin email not configured');
      return false;
    }
    
    console.log('✅ Admin configuration complete');
    return true;
  } catch (error) {
    console.error('❌ Admin configuration check failed:', error.message);
    return false;
  }
}

async function runHealthCheck() {
  console.log('🏥 Starting health check...\n');
  
  const checks = [
    { name: 'Database', fn: checkDatabase },
    { name: 'Critical Endpoints', fn: checkCriticalEndpoints },
    { name: 'Payment Gateway', fn: checkPaymentGateway },
    { name: 'Admin Configuration', fn: checkAdminConfiguration },
  ];
  
  const results = [];
  
  for (const check of checks) {
    console.log(`\n--- ${check.name} ---`);
    const result = await check.fn();
    results.push({ name: check.name, success: result });
  }
  
  console.log('\n📋 Health Check Summary:');
  console.log('========================');
  
  let allPassed = true;
  results.forEach(result => {
    const status = result.success ? '✅' : '❌';
    console.log(`${status} ${result.name}`);
    if (!result.success) allPassed = false;
  });
  
  console.log('\n' + '='.repeat(40));
  if (allPassed) {
    console.log('🎉 All health checks passed! Application is ready for production.');
    process.exit(0);
  } else {
    console.log('⚠️  Some health checks failed. Please review the issues above.');
    process.exit(1);
  }
}

// Run health check if called directly
if (require.main === module) {
  runHealthCheck();
}

module.exports = { runHealthCheck };
