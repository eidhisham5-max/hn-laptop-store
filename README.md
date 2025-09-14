# H.N Store - متجر لابتوبات إلكتروني متكامل

<div align="center">

![H.N Store Logo](https://via.placeholder.com/200x80/0052CC/FFFFFF?text=H.N+Store)

**متجر إلكتروني متكامل للابتوبات والتقنية في المملكة العربية السعودية**

[![Next.js](https://img.shields.io/badge/Next.js-15.0.3-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7.2-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.17-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![React](https://img.shields.io/badge/React-19.0.0-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org/)

[المميزات](#المميزات) • [التثبيت](#التثبيت) • [الاستخدام](#الاستخدام) • [المساهمة](#المساهمة) • [الترخيص](#الترخيص)

</div>

---

## 📋 نظرة عامة

H.N Store هو متجر إلكتروني متكامل ومتطور للابتوبات والتقنية، مصمم خصيصاً للسوق السعودي. يوفر تجربة تسوق سلسة ومتجاوبة مع دعم كامل للغة العربية والاتجاه من اليمين إلى اليسار (RTL).

### 🎯 الهدف

توفير منصة تسوق إلكترونية متطورة تقدم:
- تجربة مستخدم استثنائية
- واجهة مستخدم حديثة ومتجاوبة
- أداء عالي وسرعة في التحميل
- دعم كامل للغة العربية
- نظام دفع آمن ومتعدد الطرق

## ✨ المميزات

### 🛍️ تجربة التسوق
- **عرض المنتجات**: عرض ديناميكي للمنتجات مع فلاتر متقدمة
- **البحث الذكي**: نظام بحث متطور مع اقتراحات تلقائية
- **عربة التسوق**: إدارة سلسة للعربة مع تحديث فوري
- **نظام الدفع**: دفع آمن متعدد الطرق
- **تتبع الطلبات**: تتبع شامل لحالة الطلبات

### 🎨 التصميم والواجهة
- **تصميم متجاوب**: يعمل على جميع الأجهزة والشاشات
- **دعم RTL**: دعم كامل للغة العربية
- **واجهة حديثة**: تصميم عصري مع أحدث معايير UI/UX
- **ألوان مخصصة**: نظام ألوان احترافي ومتناسق
- **رسوم متحركة**: انتقالات سلسة وتفاعلية

### 🔧 التقنيات المستخدمة
- **Next.js 15**: إطار عمل React متطور
- **TypeScript**: كتابة آمنة ومنظمة للكود
- **Tailwind CSS**: تصميم سريع ومرن
- **Framer Motion**: رسوم متحركة احترافية
- **Radix UI**: مكونات واجهة مستخدم متقدمة
- **React Hook Form**: إدارة النماذج بكفاءة

## 🚀 البدء السريع

### المتطلبات

- Node.js 18.0.0 أو أحدث
- npm 8.0.0 أو أحدث
- Git

### التثبيت

1. **استنساخ المشروع**
   ```bash
   git clone https://github.com/your-username/hn-laptop-store.git
   cd hn-laptop-store
   ```

2. **تثبيت التبعيات**
   ```bash
   npm install
   ```

3. **إعداد متغيرات البيئة**
   ```bash
   cp .env.example .env.local
   ```
   
   قم بتعديل ملف `.env.local` مع القيم المناسبة:
   ```env
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   NEXT_PUBLIC_API_URL=http://localhost:3000/api
   DATABASE_URL=your_database_url
   NEXTAUTH_SECRET=your_secret_key
   NEXTAUTH_URL=http://localhost:3000
   ```

4. **تشغيل المشروع**
   ```bash
   npm run dev
   ```

5. **فتح المتصفح**
   انتقل إلى [http://localhost:3000](http://localhost:3000)

## 📁 هيكل المشروع

```
hn-laptop-store/
├── app/                    # صفحات التطبيق (App Router)
│   ├── globals.css        # الأنماط العامة
│   ├── layout.tsx         # التخطيط الرئيسي
│   ├── page.tsx           # الصفحة الرئيسية
│   ├── products/          # صفحات المنتجات
│   ├── cart/              # صفحة العربة
│   ├── checkout/          # صفحات الدفع
│   └── api/               # واجهات برمجة التطبيقات
├── components/            # المكونات القابلة لإعادة الاستخدام
│   ├── ui/               # مكونات واجهة المستخدم الأساسية
│   └── layout/           # مكونات التخطيط
├── contexts/             # إدارة الحالة العامة
├── lib/                  # المكتبات والأدوات المساعدة
│   ├── types/            # تعريفات TypeScript
│   ├── data/             # بيانات وخدمات البيانات
│   └── utils.ts          # وظائف مساعدة
├── public/               # الملفات الثابتة
└── styles/               # ملفات الأنماط الإضافية
```

## 🛠️ الأوامر المتاحة

```bash
# التطوير
npm run dev              # تشغيل خادم التطوير
npm run build            # بناء المشروع للإنتاج
npm run start            # تشغيل خادم الإنتاج
npm run lint             # فحص جودة الكود
npm run lint:fix         # إصلاح أخطاء الكود تلقائياً

# الاختبار
npm run test             # تشغيل الاختبارات
npm run test:watch       # تشغيل الاختبارات في وضع المراقبة
npm run test:coverage    # تقرير تغطية الاختبارات

# التحليل
npm run type-check       # فحص أنواع TypeScript
npm run analyze          # تحليل حجم الحزمة
npm run format           # تنسيق الكود
```

## 🎨 نظام التصميم

### الألوان
- **الأساسي**: `#0052CC` - أزرق احترافي
- **الثانوي**: `#34C759` - أخضر النجاح
- **التحذير**: `#FF9500` - برتقالي التحذير
- **الخطأ**: `#FF3B30` - أحمر الخطأ

### الخطوط
- **العنوان**: Inter (عربي/إنجليزي)
- **النص**: Inter (عربي/إنجليزي)
- **الكود**: SF Mono

### المسافات
- **صغير**: 0.25rem (4px)
- **متوسط**: 0.5rem (8px)
- **كبير**: 1rem (16px)
- **كبير جداً**: 2rem (32px)

## 📱 الاستجابة

المشروع مصمم ليعمل على جميع أحجام الشاشات:

- **الهواتف**: < 768px
- **الأجهزة اللوحية**: 768px - 1024px
- **أجهزة الكمبيوتر**: > 1024px

## 🔒 الأمان

- تشفير SSL/TLS لجميع المعاملات
- حماية من هجمات XSS و CSRF
- تشفير كلمات المرور
- التحقق من صحة البيانات
- حماية من SQL Injection

## 🚀 النشر

### Vercel (مستحسن)
```bash
npm install -g vercel
vercel
```

### Docker
```bash
docker build -t hn-store .
docker run -p 3000:3000 hn-store
```

### خادم تقليدي
```bash
npm run build
npm run start
```

## 🤝 المساهمة

نرحب بمساهماتكم! يرجى اتباع الخطوات التالية:

1. Fork المشروع
2. إنشاء فرع للميزة الجديدة (`git checkout -b feature/AmazingFeature`)
3. Commit التغييرات (`git commit -m 'Add some AmazingFeature'`)
4. Push للفرع (`git push origin feature/AmazingFeature`)
5. فتح Pull Request

### معايير الكود
- استخدم TypeScript لجميع الملفات الجديدة
- اتبع معايير ESLint و Prettier
- اكتب تعليقات واضحة باللغة العربية
- اختبر الكود قبل الإرسال

## 📄 الترخيص

هذا المشروع مرخص تحت رخصة MIT - راجع ملف [LICENSE](LICENSE) للتفاصيل.

## 👥 الفريق

- **المطور الرئيسي**: [اسمك](https://github.com/your-username)
- **مصمم UI/UX**: [اسم المصمم](https://github.com/designer)
- **مطور Frontend**: [اسم المطور](https://github.com/frontend-dev)

## 📞 التواصل

- **الموقع**: [https://hnstore.com](https://hnstore.com)
- **البريد الإلكتروني**: info@hnstore.com
- **الهاتف**: +966 50 123 4567
- **تويتر**: [@hnstore](https://twitter.com/hnstore)

## 🙏 شكر وتقدير

- [Next.js](https://nextjs.org/) - إطار عمل React
- [Tailwind CSS](https://tailwindcss.com/) - إطار عمل CSS
- [Radix UI](https://www.radix-ui.com/) - مكونات واجهة المستخدم
- [Framer Motion](https://www.framer.com/motion/) - مكتبة الرسوم المتحركة
- [Lucide React](https://lucide.dev/) - مكتبة الأيقونات

---

<div align="center">

**صُنع بـ ❤️ في المملكة العربية السعودية**

[⬆ العودة للأعلى](#hn-store---متجر-لابتوبات-إلكتروني-متكامل)

</div>