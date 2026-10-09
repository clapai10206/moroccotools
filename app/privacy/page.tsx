import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "سياسة الخصوصية",
  description: "سياسة الخصوصية لموقع MoroccoTools: كيف نتعامل مع بياناتك والإعلانات وملفات الارتباط.",
  keywords: ["سياسة الخصوصية", "MoroccoTools", "الخصوصية"],
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-extrabold mb-2">سياسة الخصوصية</h1>
      <p className="text-slate-500 text-sm mb-8">آخر تحديث: أكتوبر 2026</p>

      <div className="card p-8 space-y-6 text-slate-700 leading-relaxed text-[15px]">
        <section>
          <h2 className="text-xl font-bold mb-2">1. المعلومات التي نجمعها</h2>
          <p>
            جميع الأدوات في MoroccoTools تعمل محلياً داخل متصفحك. لا نجمع ولا نخزن أي بيانات
            شخصية (الاسم، البريد الإلكتروني، أرقام الهاتف، البيانات المالية...) على خوادمنا.
            المعلومات التي تدخلها في الحاسبات ومولدات الملفات لا تغادر جهازك أبداً.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-2">2. ملفات الارتباط (Cookies)</h2>
          <p>
            قد نستخدم ملفات ارتباط ضيقة النطاق لتحسين تجربة الاستخدام. كما قد تستخدم
            Google AdSense ملفات ارتباط لعرض إعلانات مخصصة بناءً على زياراتك لهذا
            الموقع أو مواقع أخرى. يمكنك إلغاء تفعيل الإعلانات المخصصة من إعدادات
            إعلانات Google.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-2">3. الإعلانات</h2>
          <p>
            نستخدم Google AdSense لعرض الإعلانات. قد تجمع Google معلومات حول زياراتك
            لأغراض الإعلانات، ويخضع ذلك لسياسة خصوصية Google. لا نتحكم في المحتوى
            الإعلاني المعروض ولا نتحمل مسؤوليته.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-2">4. روابط خارجية</h2>
          <p>
            قد يحتوي الموقع على روابط لمواقع خارجية (مثل مصادر أسعار العملات).
            نحن غير مسؤولين عن ممارسات الخصوصية لتلك المواقع.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-2">5. التعديلات على هذه السياسة</h2>
          <p>
            قد نقوم بتحديث سياسة الخصوصية من وقت لآخر. أي تغيير سيتم نشره على هذه
            الصفحة مع تاريخ التحديث.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-2">6. تواصل معنا</h2>
          <p>
            لأي استفسار حول الخصوصية، تواصل معنا عبر صفحة{" "}
            <Link href="/contact" className="text-primary font-semibold hover:underline">
              اتصل بنا
            </Link>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
