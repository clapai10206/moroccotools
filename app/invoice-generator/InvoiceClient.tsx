"use client";

import { useState } from "react";
import { ReceiptText, Plus, Trash2, Printer } from "lucide-react";
import AdSlot from "@/components/AdSlot";

type Item = { desc: string; qty: string; price: string };

export default function InvoiceClient() {
  const [info, setInfo] = useState({
    business: "",
    bPhone: "",
    bIce: "",
    client: "",
    cPhone: "",
    number: "FA-2026-001",
    date: new Date().toISOString().slice(0, 10),
    tva: "20",
  });
  const [items, setItems] = useState<Item[]>([{ desc: "", qty: "1", price: "" }]);

  const set = (k: keyof typeof info, v: string) => setInfo({ ...info, [k]: v });
  const setItem = (i: number, k: keyof Item, v: string) => {
    const next = [...items];
    next[i] = { ...next[i], [k]: v };
    setItems(next);
  };

  const totals = (() => {
    let ht = 0;
    for (const it of items) {
      ht += (parseFloat(it.qty) || 0) * (parseFloat(it.price) || 0);
    }
    const tvaRate = parseFloat(info.tva) || 0;
    const tva = ht * (tvaRate / 100);
    return { ht, tva, ttc: ht + tva };
  })();

  const fmt = (n: number) => n.toLocaleString("fr-MA", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="text-center mb-8 no-print">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-2 flex items-center justify-center gap-3">
          <ReceiptText className="text-primary" size={36} />
          مولد الفواتير
        </h1>
        <p className="text-slate-500">أنشئ فاتورة احترافية وحمّلها PDF مجاناً</p>
      </div>

      <AdSlot slot="1000000012" />

      <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
        {/* Form */}
        <div className="card p-6 space-y-4 no-print">
          <h3 className="font-bold text-lg">معلومات الفاتورة</h3>
          <div>
            <label className="label">اسم النشاط التجاري / الشركة</label>
            <input className="input" value={info.business} onChange={(e) => set("business", e.target.value)} placeholder="شركة الأمل للتجارة" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="label">الهاتف</label>
              <input className="input" dir="ltr" value={info.bPhone} onChange={(e) => set("bPhone", e.target.value)} placeholder="+212 6 00 00 00 00" />
            </div>
            <div>
              <label className="label">ICE (اختياري)</label>
              <input className="input" dir="ltr" value={info.bIce} onChange={(e) => set("bIce", e.target.value)} placeholder="00XXXXXXXXXXXX" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="label">رقم الفاتورة</label>
              <input className="input" dir="ltr" value={info.number} onChange={(e) => set("number", e.target.value)} />
            </div>
            <div>
              <label className="label">التاريخ</label>
              <input type="date" className="input" value={info.date} onChange={(e) => set("date", e.target.value)} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="label">الزبون / العميل</label>
              <input className="input" value={info.client} onChange={(e) => set("client", e.target.value)} placeholder="اسم الزبون" />
            </div>
            <div>
              <label className="label">هاتف الزبون</label>
              <input className="input" dir="ltr" value={info.cPhone} onChange={(e) => set("cPhone", e.target.value)} />
            </div>
          </div>
          <div>
            <label className="label">نسبة TVA</label>
            <select className="input" value={info.tva} onChange={(e) => set("tva", e.target.value)}>
              <option value="20">20% (النسبة العادية)</option>
              <option value="14">14% (النسبة الثانية)</option>
              <option value="10">10%</option>
              <option value="7">7% (النسبة المخفضة)</option>
              <option value="0">بدون TVA (0%)</option>
            </select>
          </div>

          <h3 className="font-bold text-lg pt-2">المنتجات / الخدمات</h3>
          {items.map((it, i) => (
            <div key={i} className="bg-slate-50 rounded-xl p-3 space-y-2">
              <input className="input" placeholder="وصف المنتج أو الخدمة" value={it.desc} onChange={(e) => setItem(i, "desc", e.target.value)} />
              <div className="flex gap-2">
                <input className="input w-20 text-center" type="number" min="0" placeholder="الكمية" value={it.qty} onChange={(e) => setItem(i, "qty", e.target.value)} />
                <input className="input text-center" type="number" min="0" placeholder="الثمن الوحدوي (د.م.)" value={it.price} onChange={(e) => setItem(i, "price", e.target.value)} />
                <button onClick={() => setItems(items.filter((_, j) => j !== i))} className="text-red-400 hover:text-red-600 shrink-0" disabled={items.length === 1}>
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
          <button onClick={() => setItems([...items, { desc: "", qty: "1", price: "" }])} className="text-primary text-sm font-bold inline-flex items-center gap-1">
            <Plus size={14} /> إضافة منتج
          </button>

          <button onClick={() => window.print()} className="btn-primary w-full">
            <Printer size={18} /> طباعة / تحميل PDF
          </button>
        </div>

        {/* Preview */}
        <div className="card overflow-hidden print-area">
          <div className="bg-primary text-white p-8 flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-extrabold">{info.business || "اسم النشاط التجاري"}</h2>
              {info.bPhone && <p className="text-blue-100 text-sm mt-1" dir="ltr">{info.bPhone}</p>}
              {info.bIce && <p className="text-blue-100 text-sm" dir="ltr">ICE: {info.bIce}</p>}
            </div>
            <div className="text-left">
              <h3 className="text-xl font-extrabold">فاتورة</h3>
              <p className="text-blue-100 text-sm" dir="ltr">N° {info.number}</p>
              <p className="text-blue-100 text-sm">{new Date(info.date + "T00:00:00").toLocaleDateString("ar-MA")}</p>
            </div>
          </div>

          <div className="p-8 bg-white">
            <div className="bg-slate-50 rounded-xl p-4 mb-6">
              <p className="text-xs text-slate-400 font-bold mb-1">فاتورة إلى</p>
              <p className="font-bold">{info.client || "اسم الزبون"}</p>
              {info.cPhone && <p className="text-sm text-slate-500" dir="ltr">{info.cPhone}</p>}
            </div>

            <table className="w-full text-sm mb-6">
              <thead>
                <tr className="border-b-2 border-primary/20 text-slate-400 text-xs">
                  <th className="text-right py-2 font-bold">الوصف</th>
                  <th className="text-center py-2 font-bold w-16">الكمية</th>
                  <th className="text-center py-2 font-bold w-24">الثمن</th>
                  <th className="text-left py-2 font-bold w-24">المجموع</th>
                </tr>
              </thead>
              <tbody>
                {items.map((it, i) => (
                  <tr key={i} className="border-b border-slate-100">
                    <td className="py-3">{it.desc || "—"}</td>
                    <td className="text-center py-3">{it.qty}</td>
                    <td className="text-center py-3" dir="ltr">{fmt(parseFloat(it.price) || 0)}</td>
                    <td className="text-left py-3 font-semibold" dir="ltr">
                      {fmt((parseFloat(it.qty) || 0) * (parseFloat(it.price) || 0))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="flex justify-end">
              <div className="w-64 space-y-2 text-sm">
                <div className="flex justify-between text-slate-500">
                  <span>المجموع بدون ضريبة (HT)</span>
                  <span dir="ltr">{fmt(totals.ht)} د.م.</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>ض.ق.م TVA ({info.tva}%)</span>
                  <span dir="ltr">{fmt(totals.tva)} د.م.</span>
                </div>
                <div className="flex justify-between text-lg font-extrabold bg-primary text-white rounded-xl px-4 py-2.5">
                  <span>المجموع مع الضريبة (TTC)</span>
                  <span dir="ltr">{fmt(totals.ttc)} د.م.</span>
                </div>
              </div>
            </div>

            <p className="text-xs text-slate-400 mt-8 text-center">
              شكراً لتعاملكم معنا — فاتورة صادرة عبر MoroccoTools
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
