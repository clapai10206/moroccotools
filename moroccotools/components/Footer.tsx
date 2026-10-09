import Link from "next/link";
import { Wrench, Mail } from "lucide-react";
import { tools } from "@/lib/tools";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 mt-16 no-print">
      <div className="mx-auto max-w-7xl px-4 py-12 grid gap-10 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 font-extrabold text-xl text-white mb-4">
            <span className="bg-primary text-white rounded-lg p-1.5">
              <Wrench size={20} />
            </span>
            MoroccoTools
          </div>
          <p className="text-sm leading-relaxed max-w-md">
            منصة أدوات مجانية 100% لكل مغربي: حسابات، تحويلات، مواقيت وأدوات يومية
            تعمل مباشرة في متصفحك بدون تسجيل وبدون تحميل أي برنامج.
          </p>
          <a
            href="mailto:contact@moroccotools.ma"
            className="mt-4 inline-flex items-center gap-2 text-sm text-primary-300 hover:text-white"
          >
            <Mail size={16} /> contact@moroccotools.ma
          </a>
        </div>

        <div>
          <h3 className="text-white font-bold mb-4">الأدوات</h3>
          <ul className="space-y-2 text-sm">
            {tools.slice(0, 5).map((t) => (
              <li key={t.slug}>
                <Link href={`/${t.slug}`} className="hover:text-white">
                  {t.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-white font-bold mb-4">روابط</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/#tools" className="hover:text-white">كل الأدوات</Link></li>
            {tools.slice(5).map((t) => (
              <li key={t.slug}>
                <Link href={`/${t.slug}`} className="hover:text-white">
                  {t.name}
                </Link>
              </li>
            ))}
            <li><Link href="/privacy" className="hover:text-white">سياسة الخصوصية</Link></li>
            <li><Link href="/contact" className="hover:text-white">اتصل بنا</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-slate-800">
        <div className="mx-auto max-w-7xl px-4 py-5 text-center text-xs text-slate-500">
          © {new Date().getFullYear()} MoroccoTools - جميع الحقوق محفوظة. صنع بـ ❤️ في المغرب 🇲🇦
        </div>
      </div>
    </footer>
  );
}
