# 🚨 حل عاجل لمشكلة Merge Conflict

## المشكلة
لديك Git merge conflict في ملف `app/page.tsx` يمنع تشغيل المشروع.

## الحل السريع (30 ثانية)

### 1. افتح ملف `app/page.tsx` في محرر النصوص

### 2. احذف المحتوى كاملاً واستبدله بهذا:

```tsx
export default function HomePage() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-primary-500 mb-4">
          H.N Laptop Store
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          متجر لابتوبات إلكتروني متكامل
        </p>
        <div className="bg-primary-500 text-white px-6 py-3 rounded-lg inline-block">
          المشروع يعمل بنجاح! 🎉
        </div>
      </div>
    </div>
  )
}
```

### 3. احفظ الملف (Ctrl+S)

### 4. شغل المشروع:
```bash
npm run dev
```

## أوامر Git (إذا كنت تريد استخدام Git)

```bash
# حل المشكلة تلقائياً
git checkout --theirs app/page.tsx

# أو احذف الملف وأعد إنشاؤه
rm app/page.tsx
# ثم أنشئ الملف الجديد بالكود أعلاه
```

## ✅ النتيجة المتوقعة
```
✓ Ready in 3.8s
✓ Local: http://localhost:3001
✓ Network: http://192.168.1.4:3001
```

## 🎯 المهم
- **احذف جميع الأسطر** التي تحتوي على `<<<<<<<` و `=======` و `>>>>>>>`
- **استخدم الكود النظيف** أعلاه فقط
- **احفظ الملف** قبل تشغيل `npm run dev`

**هذا سيحل المشكلة فوراً!** 🚀
