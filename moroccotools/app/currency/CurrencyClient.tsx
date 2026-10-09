"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowLeftRight, RefreshCw } from "lucide-react";
import AdSlot from "@/components/AdSlot";

const CURRENCIES = [
  { code: "MAD", name: "درهم مغربي" },
  { code: "EUR", name: "أورو" },
  { code: "USD", name: "دولار أمريكي" },
  { code: "GBP", name: "جنيه إسترليني" },
  { code: "SAR", name: "ريال سعودي" },
  { code: "AED", name: "درهم إماراتي" },
  { code: "CAD", name: "دولار كندي" },
  { code: "CHF", name: "فرنك سويسري" },
  { code: "TRY", name: "ليرة تركية" },
  { code: "QAR", name: "ريال قطري" },
  { code: "KWD", name: "دينار كويتي" },
  { code: "TND", name: "دينار تونسي" },
  { code: "DZD", name: "دينار جزائري" },
];

// أسعار احتياطية إذا فشل الاتصال بالإنترنت (تقريبية)
const FALLBACK: Record<string, number> = {
  MAD: 1, EUR: 0.093, USD: 0.105, GBP: 0.08, SAR: 0.394, AED: 0.386,
  CAD: 0.145, CHF: 0.09, TRY: 3.6, QAR: 0.382, KWD: 0.032, TND: 0.32, DZD: 0.14,
};

export default function CurrencyClient() {
  const [amount, setAmount] = useState("1000");
  const [from, setFrom] = useState("MAD");
  const [to, setTo] = useState("EUR");
  const [rates, setRates] = useState<Record<string, number>>(FALLBACK);
  const [live, setLive] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchRates = async () => {
    setLoading(true);
    try {
      const res = await fetch("https://open.er-api.com/v6/latest/MAD");
      const data = await res.json();
      if (data && data.rates) {
        setRates(data.rates);
        setLive(true);
      }
    } catch {
      setLive(false);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchRates();
  }, []);

  const convert = (amt: number, f: string, t: string) => {
    const mad = amt / (rates[f] || 1);
    return mad * (rates[t] || 1);
  };

  const result = useMemo(() => {
    const amt = parseFloat(amount) || 0;
    return convert(amt, from, to);
  }, [amount, from, to, rates]);

  const rate = useMemo(() => {
    return convert(1, from, to);
  }, [from, to, rates]);

  const swap = () => {
    setFrom(to);
    setTo(from);
  };

  const popular = [
    { f: "MAD", t: "EUR" },
    { f: "EUR", t: "MAD" },
    { f: "MAD", t: "USD" },
    { f: "USD", t: "MAD" },
  ];

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-2">محول العملات</h1>
        <p className="text-slate-500">حوّل بين الدرهم المغربي والعملات العالمية بأسعار مباشرة</p>
      </div>

      <AdSlot slot="1000000005" />

      <div className="card p-6 md:p-8">
        <div className="flex items-center justify-between mb-6">
          <span className={`text-sm font-semibold ${live ? "text-green-600" : "text-amber-600"}`}>
            {live ? "● أسعار مباشرة" : "● أسعار تقريبية (لا يوجد اتصال)"}
          </span>
          <button onClick={fetchRates} className="text-sm text-primary font-semibold inline-flex items-center gap-1 hover:underline">
            <RefreshCw size={14} className={loading ? "animate-spin" : ""} /> تحديث
          </button>
        </div>

        <label className="label">المبلغ</label>
        <input
          type="number"
          min="0"
          className="input text-2xl font-bold mb-5"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          dir="ltr"
        />

        <div className="grid grid-cols-[1fr_auto_1fr] gap-3 items-end mb-6">
          <div>
            <label className="label">من</label>
            <select className="input" value={from} onChange={(e) => setFrom(e.target.value)}>
              {CURRENCIES.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.code} - {c.name}
                </option>
              ))}
            </select>
          </div>
          <button
            onClick={swap}
            className="w-12 h-12 rounded-xl bg-primary-50 text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-colors mb-0.5"
            aria-label="تبديل"
          >
            <ArrowLeftRight size={20} />
          </button>
          <div>
            <label className="label">إلى</label>
            <select className="input" value={to} onChange={(e) => setTo(e.target.value)}>
              {CURRENCIES.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.code} - {c.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="rounded-2xl bg-gradient-to-l from-primary-600 to-primary-800 text-white p-6 text-center">
          <p className="text-blue-100 text-sm mb-1">
            {amount || "0"} {from} =
          </p>
          <p className="text-4xl font-extrabold mb-2" dir="ltr">
            {result.toLocaleString("fr-MA", { maximumFractionDigits: 2 })} {to}
          </p>
          <p className="text-blue-200 text-sm" dir="ltr">
            1 {from} = {rate.toLocaleString("fr-MA", { maximumFractionDigits: 4 })} {to}
          </p>
        </div>

        <div className="mt-6">
          <h3 className="text-sm font-bold text-slate-500 mb-3">تحويلات شائعة</h3>
          <div className="grid grid-cols-2 gap-2">
            {popular.map((p) => (
              <button
                key={`${p.f}-${p.t}`}
                onClick={() => {
                  setFrom(p.f);
                  setTo(p.t);
                }}
                className="text-sm border border-slate-200 rounded-xl px-3 py-2.5 hover:border-primary hover:text-primary transition-colors font-semibold"
                dir="ltr"
              >
                {p.f} → {p.t}
              </button>
            ))}
          </div>
        </div>
      </div>

      <p className="text-xs text-slate-400 text-center mt-6">
        الأسعار لأغراض الاستعلام فقط وقد تختلف عن أسعار البنوك المغربية ومكاتب الصرافة.
      </p>
    </div>
  );
}
