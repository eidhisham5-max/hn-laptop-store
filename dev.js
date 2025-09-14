#!/usr/bin/env node

const { spawn } = require('child_process');
const path = require('path');

// Set environment variables
process.env.NODE_ENV = 'development';
process.env.NEXT_TELEMETRY_DISABLED = '1';

console.log('🚀 بدء تشغيل H.N Store في وضع التطوير...');
console.log('🌐 المتجر متاح على: http://localhost:3000');
console.log('📱 دعم كامل للغة العربية و RTL');
console.log('🎨 تصميم متجاوب وحديث');
console.log('⚡ Hot Reload مفعل');
console.log('🔧 وضع التطوير');
console.log('');

// Start Next.js development server
const nextDev = spawn('npx', ['next', 'dev'], {
  stdio: 'inherit',
  shell: true,
  cwd: process.cwd()
});

// Handle process termination
process.on('SIGINT', () => {
  console.log('\n🛑 إيقاف خادم التطوير...');
  nextDev.kill('SIGINT');
  process.exit(0);
});

process.on('SIGTERM', () => {
  nextDev.kill('SIGTERM');
  process.exit(0);
});

// Handle errors
nextDev.on('error', (error) => {
  console.error('❌ خطأ في تشغيل خادم التطوير:', error);
  process.exit(1);
});

nextDev.on('close', (code) => {
  if (code !== 0) {
    console.error(`❌ خادم التطوير توقف مع الكود: ${code}`);
    process.exit(code);
  }
});