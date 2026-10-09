import Link from "next/link";
import { ArrowLeft, Zap, ShieldCheck, Smartphone, BadgeCheck } from "lucide-react";
import { tools } from "@/lib/tools";
import AdSlot from "@/components/AdSlot";

const features = [
  {
    icon: BadgeCheck,
    title: "مجاني 100%",
    text: "جميع الأدوات مجانية بالكامل، بدون اشتراكات أو ميزات مدفوعة.",
  },
  {
    icon: Zap,
    title: "سريع وخفيف",
    text: "يعمل مباشرة في المتصفح بدون تحميل برامج أو انتظار.",
  },
  {
    icon: ShieldCheck,
    title: "خصوصية تامة",
    text: "بياناتك لا تغادر جهازك، لا تسجيل ولا تتبع.",
  },
  {
    icon: Smartphone,
    title: "متجاوب مع الهاتف",
    text: "تصميم عصري يعمل بشكل مثالي على الهاتف والحاسوب.",
  },
];

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-b from-primary-600 to-primary-800 text-white">
        <div className="mx-auto max-w-7xl px-4 py-20 text-center">
          <span className="inline-block bg-white/15 rounded-full px-4 py-1.5 text-sm font-semibold mb-6">
            🇲🇦 منصة الأدوات رقم 1 في المغرب
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-5">
            أدوات مجانية لكل مغربي
          </h1>
          <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto mb-8 leading-relaxed">
            أكثر من 10 أدوات عملية في مكان واحد: أوقات الصلاة، تحويل العملات،
            حساب الباكالوريا والأجور، صناعة السيرة الذاتية، اتجاه القبلة وأكثر.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="#tools" className="bg-white text-primary font-bold rounded-xl px-8 py-3.5 hover:bg-blue-50 transition-colors">
              استكشف الأدوات
            </Link>
            <Link href="/prayer-times" className="border-2 border-white/60 text-white font-bold rounded-xl px-8 py-3.5 hover:bg-white/10 transition-colors">
              أوقات الصلاة الآن
            </Link>
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-3 text-sm">
            {["+10 أدوات", "مجاني 100%", "بدون تسجيل", "بدون تحميل"].map((chip) => (
              <span key={chip} className="bg-white/10 rounded-full px-4 py-1.5 font-medium">
                {chip}
              </span>
            ))}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4">
        <AdSlot slot="1000000001" />

        {/* Tools grid */}
        <section id="tools" className="py-12 scroll-mt-24">
          <h2 className="text-3xl font-extrabold text-center mb-3">جميع الأدوات</h2>
          <p className="text-slate-500 text-center mb-10 max-w-xl mx-auto">
            اختر الأداة التي تحتاجها وابدأ الاستخدام فوراً — كل شيء يعمل مباشرة في متصفحك.
          </p>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {tools.map((tool) => (
              <Link
                key={tool.slug}
                href={`/${tool.slug}`}
                className="card p-6 group hover:border-primary hover:shadow-lg hover:-translate-y-1 transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-primary-50 text-primary flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-colors">
                  <tool.icon size={24} />
                </div>
                <h3 className="font-bold text-lg mb-1.5">{tool.name}</h3>
                <p className="text-sm text-slate-500 leading-relaxed mb-4">{tool.short}</p>
                <span className="inline-flex items-center gap-1 text-sm font-bold text-primary">
                  استخدم الأداة <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                </span>
              </Link>
            ))}
          </div>
        </section>

        <AdSlot slot="1000000002" />

        {/* Why MoroccoTools */}
        <section className="py-12">
          <h2 className="text-3xl font-extrabold text-center mb-10">لماذا MoroccoTools؟</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((f) => (
              <div key={f.title} className="card p-6 text-center">
                <div className="w-14 h-14 rounded-2xl bg-primary text-white flex items-center justify-center mx-auto mb-4">
                  <f.icon size={26} />
                </div>
                <h3 className="font-bold text-lg mb-2">{f.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{f.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="py-12 pb-16">
          <div className="card bg-gradient-to-l from-primary-600 to-primary-800 !border-0 p-10 text-center text-white">
            <h2 className="text-2xl md:text-3xl font-extrabold mb-3">جاهز لتجربة الأدوات؟</h2>
            <p className="text-blue-100 mb-6 max-w-xl mx-auto">
              لا حاجة للتسجيل أو تحميل أي شيء — اختر أداة وابدأ الآن.
            </p>
            <Link href="#tools" className="inline-block bg-white text-primary font-bold rounded-xl px-8 py-3.5 hover:bg-blue-50 transition-colors">
              تصفح جميع الأدوات
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
