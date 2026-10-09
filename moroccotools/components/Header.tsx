"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Wrench } from "lucide-react";
import { tools } from "@/lib/tools";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-slate-200 no-print">
      <div className="mx-auto max-w-7xl px-4 h-16 flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2 font-extrabold text-xl text-primary shrink-0">
          <span className="bg-primary text-white rounded-lg p-1.5">
            <Wrench size={20} />
          </span>
          <span>
            Morocco<span className="text-slate-900">Tools</span>
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-0.5 text-sm font-medium overflow-x-auto">
          <Link href="/" className="px-3 py-2 rounded-lg hover:bg-slate-100 whitespace-nowrap">
            الرئيسية
          </Link>
          {tools.slice(0, 5).map((t) => (
            <Link key={t.slug} href={`/${t.slug}`} className="px-3 py-2 rounded-lg hover:bg-slate-100 whitespace-nowrap">
              {t.name}
            </Link>
          ))}
          <Link href="/#tools" className="px-3 py-2 rounded-lg text-primary font-bold whitespace-nowrap">
            كل الأدوات
          </Link>
        </nav>

        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden p-2 rounded-lg hover:bg-slate-100"
          aria-label="القائمة"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden border-t border-slate-200 bg-white max-h-[75vh] overflow-y-auto no-print">
          <nav className="px-4 py-3 grid gap-1 text-sm font-medium">
            <Link href="/" onClick={() => setOpen(false)} className="px-3 py-2.5 rounded-lg hover:bg-slate-100">
              الرئيسية
            </Link>
            {tools.map((t) => (
              <Link
                key={t.slug}
                href={`/${t.slug}`}
                onClick={() => setOpen(false)}
                className="px-3 py-2.5 rounded-lg hover:bg-slate-100 flex items-center gap-2"
              >
                <t.icon size={16} className="text-primary" />
                {t.name}
              </Link>
            ))}
            <div className="border-t border-slate-200 my-2" />
            <Link href="/privacy" onClick={() => setOpen(false)} className="px-3 py-2.5 rounded-lg hover:bg-slate-100">
              سياسة الخصوصية
            </Link>
            <Link href="/contact" onClick={() => setOpen(false)} className="px-3 py-2.5 rounded-lg hover:bg-slate-100">
              اتصل بنا
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
