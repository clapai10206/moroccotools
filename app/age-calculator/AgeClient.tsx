"use client";

import { useMemo, useState } from "react";
import { CakeSlice, CalendarDays, Gift } from "lucide-react";
import AdSlot from "@/components/AdSlot";

function toHijri(d: Date) {
  try {
    return new Intl.DateTimeFormat("ar-SA-u-ca-islamic", {
      day: "numeric",
      month: "long",
      year: "numeric",
      weekday: "long",
    }).format(d);
  } catch {
    return "—";
  }
}

function hijriYear(d: Date) {
  try {
    const parts = new Intl.DateTimeFormat("en-u-ca-islamic", { year: "numeric" }).formatToParts(d);
    return parseInt(parts.find((p) => p.type === "year")?.value || "0");
  } catch {
    return 0;
  }
}

export default function AgeClient() {
  const [dob, setDob] = useState("");

  const r = useMemo(() => {
    if (!dob) return null;
    const birth = new Date(dob + "T00:00:00");
    if (isNaN(birth.getTime()) || birth > new Date()) return null;
    const now = new Date();

    let years = now.getFullYear() - birth.getFullYear();
    let months = now.getMonth() - birth.getMonth();
    let days = now.getDate() - birth.getDate();
    if (days < 0) {
      months--;
      days += new Date(now.getFullYear(), now.getMonth(), 0).getDate();
    }
    if (months < 0) {
      years--;
      months += 12;
    }

    const totalDays = Math.floor((now.getTime() - birth.getTime()) / 86400000);
    const totalMonths = years * 12 + months;
    const totalWeeks = Math.floor(totalDays / 7);

    const nextBirthday = new Date(now.getFullYear(), birth.getMonth(), birth.getDate());
    if (nextBirthday <= now) nextBirthday.setFullYear(nextBirthday.getFullYear() + 1);
    const daysToBirthday = Math.ceil((nextBirthday.getTime() - now.getTime()) / 86400000);

    const ageInDaysHijri = Math.floor(totalDays * (354 / 365.25));
    const hijriYears = Math.floor(ageInDaysHijri / 354);
    const hijriMonths = Math.floor((ageInDaysHijri % 354) / 29.5);
    const hy = hijriYear(now) - hijriYear(birth);

    return {
      birth,
      years,
      months,
      days,
      totalDays,
      totalMonths,
      totalWeeks,
      weekday: birth.toLocaleDateString("ar-MA", { weekday: "long" }),
      hijriBirth: toHijri(birth),
      hijriNow: toHijri(now),
      hijriAge: { years: hijriYears, months: hijriMonths, diff: hy },
      daysToBirthday,
      nextBirthday,
    };
  }, [dob]);

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-2 flex items-center justify-center gap-3">
          <CakeSlice className="text-primary" size={36} />
          حاسبة العمر
        </h1>
        <p className="text-slate-500">عمرك بالميلادي والهجري بدقة</p>
      </div>

      <AdSlot slot="1000000009" />

      <div className="card p-6 md:p-8">
        <label className="label">تاريخ الميلاد</label>
        <input type="date" className="input text-lg mb-8" value={dob} onChange={(e) => setDob(e.target.value)} />

        {r ? (
          <>
            <div className="rounded-2xl bg-gradient-to-l from-primary-600 to-primary-800 text-white p-8 text-center mb-6">
              <p className="text-blue-100 mb-2">عمرك الآن</p>
              <p className="text-4xl md:text-5xl font-extrabold" dir="ltr">
                {r.years} <span className="text-xl">سنة</span> {r.months} <span className="text-xl">شهر</span> {r.days} <span className="text-xl">يوم</span>
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3 mb-6 text-center">
              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-xs text-slate-500 mb-1">إجمالي الأشهر</p>
                <p className="font-extrabold text-lg" dir="ltr">{r.totalMonths.toLocaleString()}</p>
              </div>
              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-xs text-slate-500 mb-1">إجمالي الأسابيع</p>
                <p className="font-extrabold text-lg" dir="ltr">{r.totalWeeks.toLocaleString()}</p>
              </div>
              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-xs text-slate-500 mb-1">إجمالي الأيام</p>
                <p className="font-extrabold text-lg" dir="ltr">{r.totalDays.toLocaleString()}</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3 bg-slate-50 rounded-xl p-4">
                <CalendarDays className="text-primary shrink-0" size={20} />
                <div className="text-sm">
                  <p className="text-slate-500">ولدت يوم <strong>{r.weekday}</strong></p>
                  <p>بالهجري: <strong>{r.hijriBirth}</strong></p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-emerald-50 rounded-xl p-4">
                <CakeSlice className="text-emerald-600 shrink-0" size={20} />
                <p className="text-sm">عمرك بالتقويم الهجري تقريباً: <strong dir="ltr">{r.hijriAge.diff} سنة</strong> (نحو {r.hijriAge.years} سنة و {r.hijriAge.months} شهر هجري)</p>
              </div>
              <div className="flex items-center gap-3 bg-amber-50 rounded-xl p-4">
                <Gift className="text-amber-600 shrink-0" size={20} />
                <p className="text-sm">عيد ميلادك القادم بعد <strong>{r.daysToBirthday} يوم</strong></p>
              </div>
            </div>
          </>
        ) : (
          <p className="text-center text-slate-400 py-10">اختر تاريخ ميلادك لعرض النتائج</p>
        )}

        <p className="text-xs text-slate-400 mt-6 text-center">
          التحويل الهجري تقريبي ويعتمد على الحساب الفلكي، وقد يختلف يوماً عن الرؤية الفعلية للهلال.
        </p>
      </div>
    </div>
  );
}
