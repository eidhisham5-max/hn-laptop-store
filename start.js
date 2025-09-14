#!/usr/bin/env node

const { spawn } = require('child_process');
const path = require('path');

// Set environment variables
process.env.NODE_ENV = 'production';
process.env.NEXT_TELEMETRY_DISABLED = '1';

console.log('🚀 بدء تشغيل H.N Store...');
console.log('🌐 المتجر متاح على: http://localhost:3000');
console.log('📱 دعم كامل للغة العربية و RTL');
console.log('🎨 تصميم متجاوب وحديث');
console.log('⚡ أداء عالي وسريع');
console.log('');

// Start Next.js production server
const nextStart = spawn('npx', ['next', 'start'], {
  stdio: 'inherit',
  shell: true,
  cwd: process.cwd()
});

// Handle process termination
process.on('SIGINT', () => {
  console.log('\n🛑 إيقاف خادم الإنتاج...');
  nextStart.kill('SIGINT');
  process.exit(0);
});

process.on('SIGTERM', () => {
  nextStart.kill('SIGTERM');
  process.exit(0);
});

// Handle errors
nextStart.on('error', (error) => {
  console.error('❌ خطأ في تشغيل خادم الإنتاج:', error);
  process.exit(1);
});

nextStart.on('close', (code) => {
  if (code !== 0) {
    console.error(`❌ خادم الإنتاج توقف مع الكود: ${code}`);
    process.exit(code);
  }
});
