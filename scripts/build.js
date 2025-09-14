#!/usr/bin/env node

const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

// Set environment variables
process.env.NODE_ENV = 'production';
process.env.NEXT_TELEMETRY_DISABLED = '1';

console.log('🚀 بدء بناء المشروع للإنتاج...');

// Build Next.js application
const nextBuild = spawn('npx', ['next', 'build'], {
  stdio: 'inherit',
  shell: true,
  cwd: process.cwd()
});

// Handle process termination
process.on('SIGINT', () => {
  console.log('\n🛑 إيقاف عملية البناء...');
  nextBuild.kill('SIGINT');
  process.exit(0);
});

process.on('SIGTERM', () => {
  nextBuild.kill('SIGTERM');
  process.exit(0);
});

// Handle errors
nextBuild.on('error', (error) => {
  console.error('❌ خطأ في بناء المشروع:', error);
  process.exit(1);
});

nextBuild.on('close', (code) => {
  if (code !== 0) {
    console.error(`❌ فشل بناء المشروع مع الكود: ${code}`);
    process.exit(code);
  }
  
  console.log('✅ تم بناء المشروع بنجاح!');
  console.log('📦 الملفات جاهزة في مجلد .next/');
  console.log('🚀 يمكنك الآن تشغيل المشروع باستخدام: npm start');
});
