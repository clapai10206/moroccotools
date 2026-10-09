"use client";

import { useMemo, useState } from "react";
import { Percent } from "lucide-react";
import AdSlot from "@/components/AdSlot";

const num = (s: string) => parseFloat(s);

export default function PercentageClient() {
  const [mode, setMode] = useState<"of" | "what" | "change">("of");
  const [a, setA] = useState("25");
  const [b, setB] = useState("200");
  const [c, setC] = useState("150");
  const [d, setD] = useState("200");

  const r = useMemo(() => {
    if (mode === "of") {
      const x = num(a), y = num(b);
      if (isNaN(x) || isNaN(y)) return null;
      return { main: (x / 100) * y, label: `${x}% من ${y}` };
    }
    if (mode === "what") {
      const x = num(a), y = num(b);
      if (isNaN(x) || isNaN(y) || y === 0) return null;
      return { main: (x / y) * 100, label: `${x} من ${y}` };
    }
    const x = num(c), y = num(d);
    if (isNaN(x) || isNaN(y) || y === 0) return null;
    const change = ((x - y) / y) * 100;
    return { main: change, label: `التغير من ${y} إلى ${x}`, isChange: true };
  }, [mode, a, b, c, d]);

  const modes = [
    { key: "of", label: "نسبة من مبلغ" },
    { key: "what", label: "نسبة رقم من آخر" },
    { key: "change", label: "نسبة الزيادة / النقصان" },
  ] as const;

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-2 flex items-center justify-center gap-3">
          <Percent className="text-primary" size={36} />
          حاسبة النسبة المئوية
        </h1>
        <p className="text-slate-500">كل حسابات النسب في مكان واحد</p>
      </div>

      <AdSlot slot="1000000013" />

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
          {mode === "of" && (
            <>
              <div className="grid grid-cols-[1fr_auto_1fr] gap-3 items-end">
                <div>
                  <label className="label">النسبة (%)</label>
                  <input type="number" className="input text-lg text-center" value={a} onChange={(e) => setA(e.target.value)} dir="ltr" />
                </div>
                <span className="text-slate-400 font-bold pb-3">من</span>
                <div>
                  <label className="label">القيمة</label>
                  <input type="number" className="input text-lg text-center" value={b} onChange={(e) => setB(e.target.value)} dir="ltr" />
                </div>
              </div>
              <p className="text-sm text-slate-500 text-center">كم يساوي {a}% من {b}؟</p>
            </>
          )}

          {mode === "what" && (
            <>
              <div className="grid grid-cols-[1fr_auto_1fr] gap-3 items-end">
                <div>
                  <label className="label">الرقم</label>
                  <input type="number" className="input text-lg text-center" value={a} onChange={(e) => setA(e.target.value)} dir="ltr" />
                </div>
                <span className="text-slate-400 font-bold pb-3">من</span>
                <div>
                  <label className="label">الإجمالي</label>
                  <input type="number" className="input text-lg text-center" value={b} onChange={(e) => setB(e.target.value)} dir="ltr" />
                </div>
              </div>
              <p className="text-sm text-slate-500 text-center">ما هي نسبة {a} من {b}؟</p>
            </>
          )}

          {mode === "change" && (
            <>
              <div className="grid grid-cols-[1fr_auto_1fr] gap-3 items-end">
                <div>
                  <label className="label">القيمة القديمة</label>
                  <input type="number" className="input text-lg text-center" value={c} onChange={(e) => setC(e.target.value)} dir="ltr" />
                </div>
                <span className="text-slate-400 font-bold pb-3">إلى</span>
                <div>
                  <label className="label">القيمة الجديدة</label>
                  <input type="number" className="input text-lg text-center" value={d} onChange={(e) => setD(e.target.value)} dir="ltr" />
                </div>
              </div>
              <p className="text-sm text-slate-500 text-center">ما هي نسبة التغير بين القيمتين؟</p>
            </>
          )}
        </div>

        {r && (
          <div className="mt-8 rounded-2xl bg-gradient-to-l from-primary-600 to-primary-800 text-white p-8 text-center">
            <p className="text-blue-100 text-sm mb-1">{r.label}</p>
            <p className="text-5xl font-extrabold" dir="ltr">
              {r.main.toLocaleString("fr-MA", { maximumFractionDigits: 2 })}
              {"isChange" in r && r.isChange && (
                <span className={r.main >= 0 ? "text-green-300" : "text-red-300"}>
                  {" "}{r.main >= 0 ? "▲ زيادة" : "▼ نقصان"}
                </span>
              )}
            </p>
            {"isChange" in r && r.isChange && (
              <p className="text-blue-200 text-sm mt-2">
                الفرق: <strong dir="ltr">{(num(c) - num(d)).toLocaleString()}</strong>
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
