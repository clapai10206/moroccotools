"use client";

import { useMemo, useState } from "react";
import { GraduationCap } from "lucide-react";
import AdSlot from "@/components/AdSlot";

type Subject = { n: string; c: number; reg?: boolean };

const branches: Record<string, { name: string; subjects: Subject[] }> = {
  sc_math_a: {
    name: "العلوم الرياضية - أ",
    subjects: [
      { n: "الرياضيات", c: 7, reg: true },
      { n: "الفيزياء والكيمياء", c: 5 },
      { n: "علوم الحياة والأرض", c: 2 },
      { n: "اللغة العربية", c: 2, reg: true },
      { n: "اللغة الفرنسية", c: 2, reg: true },
      { n: "اللغة الإنجليزية", c: 2, reg: true },
      { n: "الفلسفة", c: 2 },
      { n: "التربية الإسلامية", c: 2 },
      { n: "المعلوميات", c: 2 },
    ],
  },
  sc_math_b: {
    name: "العلوم الرياضية - ب",
    subjects: [
      { n: "الرياضيات", c: 7, reg: true },
      { n: "الفيزياء والكيمياء", c: 5 },
      { n: "علوم الحياة والأرض", c: 2 },
      { n: "اللغة العربية", c: 2, reg: true },
      { n: "اللغة الفرنسية", c: 2, reg: true },
      { n: "اللغة الإنجليزية", c: 2, reg: true },
      { n: "الفلسفة", c: 2 },
      { n: "التربية الإسلامية", c: 2 },
      { n: "المعلوميات", c: 2 },
    ],
  },
  sc_pc: {
    name: "العلوم الفيزيائية",
    subjects: [
      { n: "الفيزياء والكيمياء", c: 7, reg: true },
      { n: "الرياضيات", c: 4, reg: true },
      { n: "علوم الحياة والأرض", c: 2 },
      { n: "اللغة العربية", c: 2, reg: true },
      { n: "اللغة الفرنسية", c: 2, reg: true },
      { n: "اللغة الإنجليزية", c: 2, reg: true },
      { n: "الفلسفة", c: 2 },
      { n: "التربية الإسلامية", c: 2 },
      { n: "المعلوميات", c: 2 },
    ],
  },
  sc_svt: {
    name: "علوم الحياة والأرض",
    subjects: [
      { n: "علوم الحياة والأرض", c: 6, reg: true },
      { n: "الفيزياء والكيمياء", c: 4, reg: true },
      { n: "الرياضيات", c: 3, reg: true },
      { n: "اللغة العربية", c: 2, reg: true },
      { n: "اللغة الفرنسية", c: 2, reg: true },
      { n: "اللغة الإنجليزية", c: 2, reg: true },
      { n: "الفلسفة", c: 2 },
      { n: "التربية الإسلامية", c: 2 },
      { n: "المعلوميات", c: 2 },
    ],
  },
  eco: {
    name: "العلوم الاقتصادية والتدبير",
    subjects: [
      { n: "الاقتصاد والتدبير", c: 6 },
      { n: "الرياضيات", c: 4, reg: true },
      { n: "الفلسفة", c: 3 },
      { n: "اللغة العربية", c: 2, reg: true },
      { n: "اللغة الفرنسية", c: 2, reg: true },
      { n: "اللغة الإنجليزية", c: 2, reg: true },
      { n: "التاريخ والجغرافيا", c: 2, reg: true },
      { n: "التربية الإسلامية", c: 2 },
      { n: "المعلوميات", c: 2 },
    ],
  },
  compta: {
    name: "العلوم التدبير المحاسباتي",
    subjects: [
      { n: "المحاسبة", c: 6 },
      { n: "الاقتصاد والتدبير", c: 3 },
      { n: "الرياضيات", c: 3, reg: true },
      { n: "اللغة العربية", c: 2, reg: true },
      { n: "اللغة الفرنسية", c: 2, reg: true },
      { n: "اللغة الإنجليزية", c: 2, reg: true },
      { n: "الفلسفة", c: 2 },
      { n: "التاريخ والجغرافيا", c: 2, reg: true },
      { n: "التربية الإسلامية", c: 2 },
    ],
  },
  gest_info: {
    name: "العلوم التدبير المعلوماتي",
    subjects: [
      { n: "المعلوميات", c: 6 },
      { n: "الرياضيات", c: 4, reg: true },
      { n: "الاقتصاد والتدبير", c: 3 },
      { n: "اللغة العربية", c: 2, reg: true },
      { n: "اللغة الفرنسية", c: 2, reg: true },
      { n: "اللغة الإنجليزية", c: 2, reg: true },
      { n: "الفلسفة", c: 2 },
      { n: "التاريخ والجغرافيا", c: 2, reg: true },
      { n: "التربية الإسلامية", c: 2 },
    ],
  },
  lettres: {
    name: "الآداب والعلوم الإنسانية",
    subjects: [
      { n: "اللغة العربية", c: 5, reg: true },
      { n: "التاريخ والجغرافيا", c: 4, reg: true },
      { n: "الفلسفة", c: 3 },
      { n: "اللغة الفرنسية", c: 2, reg: true },
      { n: "اللغة الإنجليزية", c: 2, reg: true },
      { n: "التربية الإسلامية", c: 2 },
      { n: "المعلوميات", c: 2 },
    ],
  },
  lettres_orig: {
    name: "الآداب الأصلية",
    subjects: [
      { n: "اللغة العربية", c: 6, reg: true },
      { n: "التاريخ والجغرافيا", c: 3, reg: true },
      { n: "الفلسفة", c: 3 },
      { n: "اللغة الفرنسية", c: 2, reg: true },
      { n: "اللغة الإنجليزية", c: 2, reg: true },
      { n: "التربية الإسلامية", c: 2 },
      { n: "المعلوميات", c: 2 },
    ],
  },
  charia: {
    name: "العلوم الشرعية",
    subjects: [
      { n: "التربية الإسلامية", c: 6 },
      { n: "اللغة العربية", c: 4, reg: true },
      { n: "التاريخ والجغرافيا", c: 2, reg: true },
      { n: "اللغة الفرنسية", c: 2, reg: true },
      { n: "اللغة الإنجليزية", c: 2, reg: true },
      { n: "الفلسفة", c: 2 },
      { n: "المعلوميات", c: 2 },
    ],
  },
};

function mention(m: number) {
  if (m >= 16) return { text: "ممتاز 🏆", color: "text-green-600" };
  if (m >= 14) return { text: "جيد جداً 🎉", color: "text-blue-600" };
  if (m >= 12) return { text: "جيد 👍", color: "text-primary" };
  if (m >= 10) return { text: "مقبول ✅", color: "text-amber-600" };
  return { text: "دورة ثانية 📚", color: "text-red-500" };
}

export default function BacClient() {
  const [branchKey, setBranchKey] = useState("sc_math_a");
  const branch = branches[branchKey];

  const [marks, setMarks] = useState<Record<string, { nat: string; reg: string }>>({});

  const update = (name: string, field: "nat" | "reg", value: string) => {
    setMarks((prev) => ({
      ...prev,
      [name]: { ...(prev[name] || { nat: "", reg: "" }), [field]: value },
    }));
  };

  const result = useMemo(() => {
    let sum = 0;
    let coefSum = 0;
    const details = branch.subjects.map((s) => {
      const m = marks[s.n];
      const nat = parseFloat(m?.nat || "");
      const reg = parseFloat(m?.reg || "");
      let final: number | null = null;
      if (!isNaN(nat)) {
        if (s.reg && !isNaN(reg)) final = (2 * nat + reg) / 3;
        else if (s.reg) final = null;
        else final = nat;
      }
      if (final !== null) {
        sum += final * s.c;
        coefSum += s.c;
      }
      return { ...s, final };
    });
    const average = coefSum > 0 ? sum / coefSum : null;
    return { details, average, complete: coefSum > 0 };
  }, [branch, marks]);

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-2 flex items-center justify-center gap-3">
          <GraduationCap className="text-primary" size={36} />
          حاسبة معدل الباكالوريا
        </h1>
        <p className="text-slate-500">احسب معدلك النهائي حسب شعبتك وملاحظاتك</p>
      </div>

      <AdSlot slot="1000000006" />

      <div className="card p-6 md:p-8">
        <label className="label">اختر الشعبة</label>
        <select
          className="input mb-6"
          value={branchKey}
          onChange={(e) => {
            setBranchKey(e.target.value);
            setMarks({});
          }}
        >
          {Object.entries(branches).map(([key, b]) => (
            <option key={key} value={key}>
              {b.name}
            </option>
          ))}
        </select>

        <div className="grid gap-4">
          <div className="hidden sm:grid grid-cols-[1fr_120px_120px_80px] gap-3 text-xs font-bold text-slate-400 px-2">
            <span>المادة</span>
            <span className="text-center">ملاحظة وطني /20</span>
            <span className="text-center">ملاحظة جهوي /20</span>
            <span className="text-center">المعدل</span>
          </div>
          {result.details.map((s) => (
            <div
              key={s.n}
              className="grid sm:grid-cols-[1fr_120px_120px_80px] gap-3 items-center bg-slate-50 rounded-xl p-3"
            >
              <span className="font-semibold text-sm">
                {s.n} <span className="text-slate-400 font-normal">(معامل {s.c})</span>
              </span>
              <input
                type="number"
                min="0"
                max="20"
                step="0.25"
                className="input text-center"
                placeholder="وطني"
                value={marks[s.n]?.nat || ""}
                onChange={(e) => update(s.n, "nat", e.target.value)}
              />
              {s.reg ? (
                <input
                  type="number"
                  min="0"
                  max="20"
                  step="0.25"
                  className="input text-center"
                  placeholder="جهوي"
                  value={marks[s.n]?.reg || ""}
                  onChange={(e) => update(s.n, "reg", e.target.value)}
                />
              ) : (
                <span className="text-center text-xs text-slate-400">—</span>
              )}
              <span className="text-center font-bold text-sm" dir="ltr">
                {s.final !== null ? s.final.toFixed(2) : "-"}
              </span>
            </div>
          ))}
        </div>

        {result.complete && result.average !== null && (
          <div className="mt-8 rounded-2xl bg-gradient-to-l from-primary-600 to-primary-800 text-white p-8 text-center">
            <p className="text-blue-100 mb-1">المعدل العام للباكالوريا</p>
            <p className="text-5xl font-extrabold mb-2" dir="ltr">
              {result.average.toFixed(2)} <span className="text-2xl">/ 20</span>
            </p>
            <p className={`text-xl font-bold ${result.average >= 10 ? "text-green-300" : "text-red-300"}`}>
              {mention(result.average).text}
            </p>
          </div>
        )}

        <p className="text-xs text-slate-400 mt-6">
          للمواد ذات الامتحان الجهوي، النقطة النهائية = (2 × ملاحظة الوطني + ملاحظة الجهوي) / 3.
          المعاملات تقريبية وقد تختلف حسب الدورة والمستجدات الرسمية للوزارة.
        </p>
      </div>
    </div>
  );
}
