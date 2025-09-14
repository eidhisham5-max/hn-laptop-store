#!/usr/bin/env node

const { spawn } = require('child_process');
const path = require('path');

// Set environment variables
process.env.NODE_ENV = 'test';
process.env.NEXT_TELEMETRY_DISABLED = '1';

console.log('🧪 بدء تشغيل اختبارات H.N Store...');
console.log('🔍 فحص جودة الكود');
console.log('✅ اختبار الوظائف');
console.log('📊 قياس التغطية');
console.log('');

// Run all tests
const testProcess = spawn('npx', ['jest', '--passWithNoTests', '--coverage'], {
  stdio: 'inherit',
  shell: true,
  cwd: process.cwd()
});

// Handle process termination
process.on('SIGINT', () => {
  console.log('\n🛑 إيقاف الاختبارات...');
  testProcess.kill('SIGINT');
  process.exit(0);
});

process.on('SIGTERM', () => {
  testProcess.kill('SIGTERM');
  process.exit(0);
});

// Handle errors
testProcess.on('error', (error) => {
  console.error('❌ خطأ في تشغيل الاختبارات:', error);
  process.exit(1);
});

testProcess.on('close', (code) => {
  if (code !== 0) {
    console.error(`❌ فشلت بعض الاختبارات مع الكود: ${code}`);
    process.exit(code);
  }
  
  console.log('');
  console.log('✅ تمت جميع الاختبارات بنجاح!');
  console.log('📊 تم إنشاء تقرير التغطية في مجلد coverage/');
  console.log('🎉 المشروع جاهز للنشر!');
});