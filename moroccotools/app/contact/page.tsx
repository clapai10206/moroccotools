"use client";

import { useState } from "react";
import { Mail, Send } from "lucide-react";
import AdSlot from "@/components/AdSlot";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const body = encodeURIComponent(`الاسم: ${form.name}\nالبريد: ${form.email}\n\n${form.message}`);
    window.location.href = `mailto:contact@moroccotools.ma?subject=${encodeURIComponent(form.subject)}&body=${body}`;
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <h1 className="text-3xl font-extrabold mb-2">اتصل بنا</h1>
      <p className="text-slate-500 mb-8">
        عندك اقتراح لأداة جديدة؟ لاحظت خطأ؟ راسلنا وسنرد عليك في أقرب وقت.
      </p>

      <AdSlot slot="1000000003" />

      <form onSubmit={handleSubmit} className="card p-8 space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className="label">الاسم الكامل</label>
            <input
              required
              className="input"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="مثال: يوسف العلوي"
            />
          </div>
          <div>
            <label className="label">البريد الإلكتروني</label>
            <input
              required
              type="email"
              className="input"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="you@example.com"
              dir="ltr"
            />
          </div>
        </div>
        <div>
          <label className="label">الموضوع</label>
          <input
            required
            className="input"
            value={form.subject}
            onChange={(e) => setForm({ ...form, subject: e.target.value })}
            placeholder="مثال: اقتراح أداة جديدة"
          />
        </div>
        <div>
          <label className="label">الرسالة</label>
          <textarea
            required
            rows={5}
            className="input resize-none"
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            placeholder="اكتب رسالتك هنا..."
          />
        </div>
        <button type="submit" className="btn-primary w-full">
          <Send size={18} /> إرسال الرسالة
        </button>
      </form>

      <div className="card p-6 mt-6 flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-primary-50 text-primary flex items-center justify-center shrink-0">
          <Mail size={22} />
        </div>
        <div>
          <h3 className="font-bold">البريد المباشر</h3>
          <a href="mailto:contact@moroccotools.ma" className="text-primary text-sm hover:underline" dir="ltr">
            contact@moroccotools.ma
          </a>
        </div>
      </div>
    </div>
  );
}
