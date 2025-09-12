#!/usr/bin/env node

/**
 * Health Check Script for H.N Laptop Store
 * This script verifies that all essential files and configurations are in place
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 H.N Laptop Store - Health Check\n');

// Essential files to check
const essentialFiles = [
  'package.json',
  'next.config.js',
  'tailwind.config.js',
  'tsconfig.json',
  'postcss.config.js',
  '.eslintrc.json',
  'prettier.config.js',
  '.editorconfig',
  '.nvmrc',
  'next-env.d.ts',
  'app/layout.tsx',
  'app/page.tsx',
  'app/globals.css',
  'lib/utils.ts',
  '.env.example',
  'README.md',
  '.gitignore'
];

// Essential directories to check
const essentialDirs = [
  'app',
  'components',
  'components/ui',
  'components/layout',
  'components/home',
  'components/products',
  'components/product',
  'components/cart',
  'components/checkout',
  'components/admin',
  'lib'
];

// Essential pages to check
const essentialPages = [
  'app/auth/login/page.tsx',
  'app/auth/register/page.tsx',
  'app/products/page.tsx',
  'app/products/[id]/page.tsx',
  'app/cart/page.tsx',
  'app/checkout/page.tsx',
  'app/admin/page.tsx'
];

// Essential components to check
const essentialComponents = [
  'components/ui/Button.tsx',
  'components/ui/Input.tsx',
  'components/ui/Card.tsx',
  'components/ui/Badge.tsx',
  'components/ui/StarRating.tsx',
  'components/ui/TrustBadge.tsx',
  'components/layout/Header.tsx',
  'components/layout/Footer.tsx',
  'components/home/HeroSection.tsx',
  'components/home/FeaturedProducts.tsx',
  'components/home/CategoriesSection.tsx',
  'components/home/TrustSection.tsx',
  'components/products/ProductFilters.tsx',
  'components/products/ProductGrid.tsx',
  'components/product/ProductGallery.tsx',
  'components/product/ProductInfo.tsx',
  'components/product/ProductTabs.tsx',
  'components/cart/CartItem.tsx',
  'components/cart/CartSummary.tsx',
  'components/checkout/CheckoutForm.tsx',
  'components/admin/AdminSidebar.tsx',
  'components/admin/StatsCards.tsx',
  'components/admin/RecentOrders.tsx',
  'components/admin/ProductTable.tsx'
];

let errors = [];
let warnings = [];

// Check files
console.log('📁 Checking essential files...');
essentialFiles.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`✅ ${file}`);
  } else {
    console.log(`❌ ${file} - MISSING`);
    errors.push(`Missing file: ${file}`);
  }
});

// Check directories
console.log('\n📂 Checking essential directories...');
essentialDirs.forEach(dir => {
  if (fs.existsSync(dir) && fs.statSync(dir).isDirectory()) {
    console.log(`✅ ${dir}/`);
  } else {
    console.log(`❌ ${dir}/ - MISSING`);
    errors.push(`Missing directory: ${dir}`);
  }
});

// Check pages
console.log('\n📄 Checking essential pages...');
essentialPages.forEach(page => {
  if (fs.existsSync(page)) {
    console.log(`✅ ${page}`);
  } else {
    console.log(`❌ ${page} - MISSING`);
    errors.push(`Missing page: ${page}`);
  }
});

// Check components
console.log('\n🧩 Checking essential components...');
essentialComponents.forEach(component => {
  if (fs.existsSync(component)) {
    console.log(`✅ ${component}`);
  } else {
    console.log(`❌ ${component} - MISSING`);
    errors.push(`Missing component: ${component}`);
  }
});

// Check package.json structure
console.log('\n📦 Checking package.json structure...');
try {
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  
  // Check required scripts
  const requiredScripts = ['dev', 'build', 'start', 'lint'];
  requiredScripts.forEach(script => {
    if (packageJson.scripts && packageJson.scripts[script]) {
      console.log(`✅ Script '${script}' exists`);
    } else {
      console.log(`❌ Script '${script}' missing`);
      errors.push(`Missing script: ${script}`);
    }
  });
  
  // Check required dependencies
  const requiredDeps = ['next', 'react', 'react-dom', 'tailwindcss'];
  requiredDeps.forEach(dep => {
    if (packageJson.dependencies && packageJson.dependencies[dep]) {
      console.log(`✅ Dependency '${dep}' exists`);
    } else {
      console.log(`❌ Dependency '${dep}' missing`);
      errors.push(`Missing dependency: ${dep}`);
    }
  });
  
} catch (error) {
  console.log(`❌ Error parsing package.json: ${error.message}`);
  errors.push(`Invalid package.json: ${error.message}`);
}

// Check for common issues
console.log('\n🔍 Checking for common issues...');

// Check for node_modules
if (fs.existsSync('node_modules')) {
  console.log('✅ node_modules exists');
} else {
  console.log('⚠️  node_modules missing - run npm install');
  warnings.push('node_modules missing - run npm install');
}

// Check for package-lock.json
if (fs.existsSync('package-lock.json')) {
  console.log('✅ package-lock.json exists');
} else {
  console.log('⚠️  package-lock.json missing - will be created on npm install');
  warnings.push('package-lock.json missing - will be created on npm install');
}

// Check for .env.local
if (fs.existsSync('.env.local')) {
  console.log('✅ .env.local exists');
} else {
  console.log('⚠️  .env.local missing - copy from .env.example');
  warnings.push('.env.local missing - copy from .env.example');
}

// Summary
console.log('\n📊 Health Check Summary');
console.log('========================');

if (errors.length === 0) {
  console.log('🎉 All essential files and configurations are in place!');
  console.log('✅ The project structure is complete and ready for development.');
} else {
  console.log(`❌ Found ${errors.length} critical issues:`);
  errors.forEach(error => console.log(`   - ${error}`));
}

if (warnings.length > 0) {
  console.log(`\n⚠️  Found ${warnings.length} warnings:`);
  warnings.forEach(warning => console.log(`   - ${warning}`));
}

console.log('\n🚀 Next Steps:');
console.log('1. Run: npm install');
console.log('2. Copy .env.example to .env.local');
console.log('3. Run: npm run dev');
console.log('4. Open http://localhost:3000 in your browser');

if (errors.length > 0) {
  process.exit(1);
} else {
  console.log('\n✨ Project is ready to go!');
  process.exit(0);
}