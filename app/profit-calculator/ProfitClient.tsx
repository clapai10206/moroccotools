"use client";

import { useMemo, useState } from "react";
import { TrendingUp } from "lucide-react";
import AdSlot from "@/components/AdSlot";

export default function ProfitClient() {
  const [mode, setMode] = useState<"margin" | "price" | "cost">("margin");
  const [cost, setCost] = useState("100");
  const [sell, setSell] = useState("150");
  const [target, setTarget] = useState("30");

  const r = useMemo(() => {
    const c = parseFloat(cost) || 0;
    const s = parseFloat(sell) || 0;
    const t = parseFloat(target) || 0;
    if (mode === "margin") {
      if (c <= 0 || s <= 0) return null;
      const profit = s - c;
      return {
        profit,
        margin: (profit / s) * 100,
        markup: (profit / c) * 100,
      };
    }
    if (mode === "price") {
      if (c <= 0) return null;
      const price = c / (1 - t / 100);
      return { price, profit: price - c, margin: t };
    }
    if (s <= 0) return null;
    const maxCost = s * (1 - t / 100);
    return { maxCost, profit: s - maxCost, margin: t };
  }, [mode, cost, sell, target]);

  const modes = [
    { key: "margin", label: "حساب الربح من سعرين" },
    { key: "price", label: "سعر البيع من هامش مستهدف" },
    { key: "cost", label: "أقصى تكلفة من هامش مستهدف" },
  ] as const;

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-2 flex items-center justify-center gap-3">
          <TrendingUp className="text-primary" size={36} />
          حاسبة الربح والهامش
        </h1>
        <p className="text-slate-500">للتجار وأصحاب المشاريع الصغيرة</p>
      </div>

      <AdSlot slot="1000000010" />

      <div className="card p-6 md:p-8">
        <div className="grid gap-2 sm:grid-cols-3 mb-6">
          {modes.map((m) => (
            <button
              key={m.key}
              onClick={() => setMode(m.key)}
              className={`rounded-xl py-2.5 px-3 text-sm font-bold transition-colors ${
                mode === m.key ? "bg-primary text-white" : "bg-slate-100 hover:bg-slate-200"
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          <div>
            <label className="label">سعر الشراء / التكلفة (د.م.)</label>
            <input type="number" min="0" className="input text-lg" value={cost} onChange={(e) => setCost(e.target.value)} dir="ltr" />
          </div>

          {mode === "margin" && (
            <div>
              <label className="label">سعر البيع (د.م.)</label>
              <input type="number" min="0" className="input text-lg" value={sell} onChange={(e) => setSell(e.target.value)} dir="ltr" />
            </div>
          )}

          {mode !== "margin" && (
            <div>
              <label className="label">{mode === "price" ? "الهامش المستهدف (%)" : "الهامش المطلوب (%)"}</label>
              <input type="number" min="0" max="99" className="input text-lg" value={target} onChange={(e) => setTarget(e.target.value)} dir="ltr" />
            </div>
          )}

          {mode === "cost" && (
            <div>
              <label className="label">سعر البيع (د.م.)</label>
              <input type="number" min="0" className="input text-lg" value={sell} onChange={(e) => setSell(e.target.value)} dir="ltr" />
            </div>
          )}
        </div>

        {r && (
          <div className="mt-8 rounded-2xl bg-gradient-to-l from-primary-600 to-primary-800 text-white p-8">
            {mode === "margin" && (
              <>
                <p className="text-blue-100 text-sm mb-1">الربح الصافي لكل قطعة</p>
                <p className="text-4xl font-extrabold mb-4" dir="ltr">{r.profit?.toFixed(2)} د.م.</p>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="bg-white/10 rounded-xl p-3">
                    <p className="text-xs text-blue-200 mb-1">هامش الربح</p>
                    <p className="text-xl font-bold" dir="ltr">{r.margin?.toFixed(1)}%</p>
                  </div>
                  <div className="bg-white/10 rounded-xl p-3">
                    <p className="text-xs text-blue-200 mb-1">نسبة الزيادة على التكلفة</p>
                    <p className="text-xl font-bold" dir="ltr">{r.markup?.toFixed(1)}%</p>
                  </div>
                </div>
              </>
            )}
            {mode === "price" && (
              <>
                <p className="text-blue-100 text-sm mb-1">سعر البيع المقترح لهامش {r.margin}%</p>
                <p className="text-4xl font-extrabold mb-2" dir="ltr">{r.price?.toFixed(2)} د.م.</p>
                <p className="text-blue-200 text-sm">الربح لكل قطعة: <strong dir="ltr">{r.profit?.toFixed(2)} د.م.</strong></p>
              </>
            )}
            {mode === "cost" && (
              <>
                <p className="text-blue-100 text-sm mb-1">أقصى سعر شراء مسموح به</p>
                <p className="text-4xl font-extrabold mb-2" dir="ltr">{r.maxCost?.toFixed(2)} د.م.</p>
                <p className="text-blue-200 text-sm">الربح لكل قطعة: <strong dir="ltr">{r.profit?.toFixed(2)} د.م.</strong></p>
              </>
            )}
          </div>
        )}

        <p className="text-xs text-slate-400 mt-6">
          هامش الربح = (سعر البيع - التكلفة) ÷ سعر البيع × 100. لا تشمل النتائج مصاريف
          النقل والتسويق وضريبة القيمة المضافة.
        </p>
      </div>
    </div>
  );
}
