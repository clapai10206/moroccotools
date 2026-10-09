"use client";

import { useMemo, useState } from "react";
import { Banknote, Info } from "lucide-react";
import AdSlot from "@/components/AdSlot";

// شرائح ضريبة الدخل الشهرية (قانون المالية 2025)
const IR_BRACKETS: { min: number; max: number; rate: number }[] = [
  { min: 0, max: 3333.33, rate: 0 },
  { min: 3333.33, max: 5000, rate: 0.1 },
  { min: 5000, max: 6666.67, rate: 0.2 },
  { min: 6666.67, max: 8333.33, rate: 0.3 },
  { min: 8333.33, max: 12500, rate: 0.34 },
  { min: 12500, max: Infinity, rate: 0.38 },
];

const CNSS_RATE = 0.0448;
const CNSS_CAP = 6000;
const AMO_RATE = 0.0226;
const FRAIS_PRO_RATE = 0.35;
const FRAIS_PRO_CAP = 2500;

function calcIr(netImposable: number) {
  let tax = 0;
  for (const b of IR_BRACKETS) {
    if (netImposable > b.min) {
      tax += (Math.min(netImposable, b.max) - b.min) * b.rate;
    }
  }
  // الخصم الشهري على الأجور
  let deduction = 500;
  if (netImposable > 6666.67) deduction = 375;
  if (netImposable > 8333.33) deduction = 250;
  return Math.max(0, tax - deduction);
}

function calc(gross: number) {
  const cnss = Math.min(gross, CNSS_CAP) * CNSS_RATE;
  const amo = gross * AMO_RATE;
  const netSocial = gross - cnss - amo;
  const fraisPro = Math.min(netSocial * FRAIS_PRO_RATE, FRAIS_PRO_CAP);
  const netImposable = Math.max(0, netSocial - fraisPro);
  const ir = calcIr(netImposable);
  const net = netSocial - ir;
  return { cnss, amo, netSocial, fraisPro, netImposable, ir, net };
}

const fmtMAD = (n: number) =>
  n.toLocaleString("fr-MA", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " د.م.";

export default function SalaryClient() {
  const [gross, setGross] = useState("8000");

  const r = useMemo(() => calc(Math.max(0, parseFloat(gross) || 0)), [gross]);

  const rows: { label: string; value: number; color?: string }[] = [
    { label: "الأجر الخام (Brut)", value: parseFloat(gross) || 0 },
    { label: `اقتطاع CNSS (4.48%)`, value: -r.cnss },
    { label: `اقتطاع AMO (2.26%)`, value: -r.amo },
    { label: "الأجر الصافي الاجتماعي", value: r.netSocial },
    { label: "الأجر الخاضع للضريبة (بعد مصاريف مهنية 35%)", value: r.netImposable },
    { label: "ضريبة الدخل IR", value: -r.ir, color: "text-red-500" },
    { label: "الأجر الصافي المستلم (Net à payer)", value: r.net, color: "text-green-600 font-extrabold" },
  ];

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-2 flex items-center justify-center gap-3">
          <Banknote className="text-primary" size={36} />
          حاسبة الأجرة الصافية
        </h1>
        <p className="text-slate-500">احسب راتبك بعد اقتطاعات CNSS و AMO وضريبة الدخل IR</p>
      </div>

      <AdSlot slot="1000000007" />

      <div className="card p-6 md:p-8">
        <label className="label">الأجر الخام الشهري (بالدرهم)</label>
        <input
          type="number"
          min="0"
          className="input text-2xl font-bold mb-6"
          value={gross}
          onChange={(e) => setGross(e.target.value)}
          dir="ltr"
        />

        <div className="rounded-2xl overflow-hidden border border-slate-200 mb-6">
          {rows.map((row, i) => (
            <div
              key={row.label}
              className={`flex items-center justify-between px-5 py-3.5 text-sm ${
                i % 2 === 0 ? "bg-white" : "bg-slate-50"
              } ${row.label.includes("الصافي المستلم") ? "bg-primary text-white !important" : ""}`}
              style={row.label.includes("الصافي المستلم") ? { background: "#2563eb", color: "white" } : {}}
            >
              <span className={row.color ? row.color : row.label.includes("الصافي المستلم") ? "font-bold" : "text-slate-600"}>
                {row.label}
              </span>
              <span className="font-bold" dir="ltr">
                {row.value < 0 ? "- " : ""}
                {fmtMAD(Math.abs(row.value))}
              </span>
            </div>
          ))}
        </div>

        <div className="grid gap-4 sm:grid-cols-3 text-center">
          <div className="rounded-xl bg-slate-50 p-4">
            <p className="text-xs text-slate-500 mb-1">إجمالي الاقتطاعات</p>
            <p className="font-extrabold text-red-500" dir="ltr">{fmtMAD(r.cnss + r.amo + r.ir)}</p>
          </div>
          <div className="rounded-xl bg-slate-50 p-4">
            <p className="text-xs text-slate-500 mb-1">نسبة الاقتطاع</p>
            <p className="font-extrabold" dir="ltr">
              {parseFloat(gross) > 0 ? (((r.cnss + r.amo + r.ir) / (parseFloat(gross) || 1)) * 100).toFixed(1) : 0}%
            </p>
          </div>
          <div className="rounded-xl bg-green-50 p-4">
            <p className="text-xs text-green-700 mb-1">الصافي السنوي التقريبي</p>
            <p className="font-extrabold text-green-700" dir="ltr">{fmtMAD(r.net * 12)}</p>
          </div>
        </div>

        <div className="flex items-start gap-2 mt-6 text-xs text-slate-400 bg-amber-50 rounded-xl p-4">
          <Info size={14} className="shrink-0 mt-0.5" />
          <p>
            هذه الحاسبة مبنية على آخر التعديلات الضريبية المعروفة (شرائح IR 2025، سقف CNSS
            6000 درهم، مصاريف مهنية 35% بحد أقصى 2500 درهم/شهر). النتيجة تقديرية ولا تشمل
            التعويضات الخاضعة للضريبة، CIMR، أو التخفيضات الخاصة (الأجراء الشباب...).
          </p>
        </div>
      </div>
    </div>
  );
}
