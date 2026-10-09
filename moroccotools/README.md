# MoroccoTools - أدوات مغربية 🇲🇦

منصة أدوات مجانية لكل مغربي، مبنية بـ **Next.js 14 + Tailwind CSS**، دعم كامل للعربية RTL، جاهزة للنشر على Vercel.

## الأدوات (10)

| الأداة | الرابط |
|---|---|
| أوقات الصلاة | `/prayer-times` |
| محول العملات | `/currency` |
| حاسبة الباكالوريا | `/bac-calculator` |
| حاسبة الأجور (CNSS / IR) | `/salary-calculator` |
| صانع السيرة الذاتية | `/cv-maker` |
| حاسبة العمر | `/age-calculator` |
| حاسبة الربح | `/profit-calculator` |
| اتجاه القبلة | `/qibla` |
| مولد الفواتير | `/invoice-generator` |
| حاسبة النسبة المئوية | `/percentage-calculator` |

بالإضافة إلى: `/privacy` (سياسة الخصوصية)، `/contact` (اتصل بنا)، `sitemap.xml`، `robots.txt`.

## التشغيل محلياً

```bash
npm install
npm run dev
```

ثم افتح http://localhost:3000

## النشر على Vercel

1. ارفع المشروع إلى GitHub.
2. على [vercel.com](https://vercel.com) اختر **Import Project**.
3. سيتم اكتشاف Next.js تلقائياً — اضغط Deploy.

## تفعيل Google AdSense

1. أنشئ ملف `.env.local` في الجذر:

```bash
NEXT_PUBLIC_ADSENSE_ID=ca-pub-XXXXXXXXXXXXXXXX
```

2. عدّل أرقام `data-ad-slot` في مكون `components/AdSlot.tsx` حسب وحدات الإعلانات لديك.

ملاحظة: أماكن الإعلانات موجودة جاهزة في كل صفحة (عنصر `AdSlot`)، ولا يتم تحميل سكريبت AdSense إلا عند ضبط المعرّف.

## ملاحظات تقنية

- كل الأدوات تعمل بـ JavaScript في المتصفح (بدون backend).
- أسعار العملات من `open.er-api.com` (مجاني، بدون مفتاح) مع أسعار احتياطية عند انقطاع الاتصال.
- أوقات الصلاة محسوبة فلكياً (فجر 19°، عشاء 17°) — تقديرية وقد تختلف دقائق عن التوقيت الرسمي.
- حساب الأجور مبني على شرائح IR المعروفة (2025): سقف CNSS 6000 د.م، AMO 2.26%، مصاريف مهنية 35% (حد أقصى 2500 د.م/شهر).
- تغيير النطاق: عدّل `siteUrl` في `lib/tools.ts` و `metadataBase` في `app/layout.tsx`.
