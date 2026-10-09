"use client";

import { useState } from "react";
import { FileUser, Plus, Trash2, Printer } from "lucide-react";
import AdSlot from "@/components/AdSlot";

type Exp = { title: string; company: string; period: string; desc: string };
type Edu = { degree: string; school: string; year: string };

const EMPTY = {
  name: "",
  title: "",
  email: "",
  phone: "",
  city: "",
  summary: "",
  skills: "",
  languages: "",
  exp: [] as Exp[],
  edu: [] as Edu[],
};

const LABELS = {
  ar: {
    summary: "نبذة شخصية",
    skills: "المهارات",
    languages: "اللغات",
    exp: "الخبرات المهنية",
    edu: "المسار الدراسي",
    addExp: "إضافة خبرة",
    addEdu: "إضافة شهادة",
    print: "طباعة / تحميل PDF",
    company: "الشركة",
    period: "الفترة",
    degree: "الشهادة",
    school: "المؤسسة",
    year: "السنة",
  },
  fr: {
    summary: "Profil",
    skills: "Compétences",
    languages: "Langues",
    exp: "Expérience professionnelle",
    edu: "Formation",
    addExp: "Ajouter une expérience",
    addEdu: "Ajouter une formation",
    print: "Imprimer / PDF",
    company: "Entreprise",
    period: "Période",
    degree: "Diplôme",
    school: "Établissement",
    year: "Année",
  },
};

export default function CvClient() {
  const [cv, setCv] = useState(EMPTY);
  const [lang, setLang] = useState<"ar" | "fr">("ar");
  const t = LABELS[lang];

  const set = (k: keyof typeof EMPTY, v: string) => setCv({ ...cv, [k]: v });
  const addExp = () => setCv({ ...cv, exp: [...cv.exp, { title: "", company: "", period: "", desc: "" }] });
  const addEdu = () => setCv({ ...cv, edu: [...cv.edu, { degree: "", school: "", year: "" }] });
  const setExp = (i: number, k: keyof Exp, v: string) => {
    const exp = [...cv.exp];
    exp[i] = { ...exp[i], [k]: v };
    setCv({ ...cv, exp });
  };
  const setEdu = (i: number, k: keyof Edu, v: string) => {
    const edu = [...cv.edu];
    edu[i] = { ...edu[i], [k]: v };
    setCv({ ...cv, edu });
  };

  const skillsList = cv.skills.split(",").map((s) => s.trim()).filter(Boolean);
  const langList = cv.languages.split(",").map((s) => s.trim()).filter(Boolean);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="text-center mb-8 no-print">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-2 flex items-center justify-center gap-3">
          <FileUser className="text-primary" size={36} />
          صانع السيرة الذاتية
        </h1>
        <p className="text-slate-500">عبّئ معلوماتك وحمّل CV احترافي بصيغة PDF</p>
      </div>

      <AdSlot slot="1000000008" />

      <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
        {/* Form */}
        <div className="card p-6 space-y-5 no-print">
          <div className="flex gap-2">
            <button
              onClick={() => setLang("ar")}
              className={`flex-1 rounded-xl py-2 font-bold text-sm ${lang === "ar" ? "bg-primary text-white" : "bg-slate-100"}`}
            >
              عربية
            </button>
            <button
              onClick={() => setLang("fr")}
              className={`flex-1 rounded-xl py-2 font-bold text-sm ${lang === "fr" ? "bg-primary text-white" : "bg-slate-100"}`}
            >
              Français
            </button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="label">{lang === "ar" ? "الاسم الكامل" : "Nom complet"}</label>
              <input className="input" value={cv.name} onChange={(e) => set("name", e.target.value)} placeholder="Youssef Alami" />
            </div>
            <div>
              <label className="label">{lang === "ar" ? "المسمى الوظيفي" : "Titre du poste"}</label>
              <input className="input" value={cv.title} onChange={(e) => set("title", e.target.value)} placeholder="Développeur Web" />
            </div>
            <div>
              <label className="label">Email</label>
              <input className="input" dir="ltr" value={cv.email} onChange={(e) => set("email", e.target.value)} placeholder="you@email.com" />
            </div>
            <div>
              <label className="label">{lang === "ar" ? "الهاتف" : "Téléphone"}</label>
              <input className="input" dir="ltr" value={cv.phone} onChange={(e) => set("phone", e.target.value)} placeholder="+212 6 00 00 00 00" />
            </div>
            <div className="sm:col-span-2">
              <label className="label">{lang === "ar" ? "المدينة" : "Ville"}</label>
              <input className="input" value={cv.city} onChange={(e) => set("city", e.target.value)} placeholder="Casablanca" />
            </div>
          </div>

          <div>
            <label className="label">{t.summary}</label>
            <textarea className="input resize-none" rows={3} value={cv.summary} onChange={(e) => set("summary", e.target.value)} />
          </div>

          <div>
            <label className="label">{t.skills} ({lang === "ar" ? "افصل بفاصلة" : "séparées par des virgules"})</label>
            <input className="input" value={cv.skills} onChange={(e) => set("skills", e.target.value)} placeholder="Excel, Word, JavaScript..." />
          </div>

          <div>
            <label className="label">{t.languages}</label>
            <input className="input" value={cv.languages} onChange={(e) => set("languages", e.target.value)} placeholder="العربية، الفرنسية، الإنجليزية" />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="label !mb-0">{t.exp}</label>
              <button onClick={addExp} className="text-primary text-sm font-bold inline-flex items-center gap-1">
                <Plus size={14} /> {t.addExp}
              </button>
            </div>
            {cv.exp.map((e, i) => (
              <div key={i} className="bg-slate-50 rounded-xl p-3 mb-2 space-y-2">
                <input className="input" placeholder={lang === "ar" ? "المسمى الوظيفي" : "Poste"} value={e.title} onChange={(ev) => setExp(i, "title", ev.target.value)} />
                <div className="grid grid-cols-2 gap-2">
                  <input className="input" placeholder={t.company} value={e.company} onChange={(ev) => setExp(i, "company", ev.target.value)} />
                  <input className="input" placeholder={t.period} value={e.period} onChange={(ev) => setExp(i, "period", ev.target.value)} />
                </div>
                <div className="flex gap-2">
                  <input className="input" placeholder={lang === "ar" ? "الوصف" : "Description"} value={e.desc} onChange={(ev) => setExp(i, "desc", ev.target.value)} />
                  <button onClick={() => setCv({ ...cv, exp: cv.exp.filter((_, j) => j !== i) })} className="text-red-400 hover:text-red-600 shrink-0">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="label !mb-0">{t.edu}</label>
              <button onClick={addEdu} className="text-primary text-sm font-bold inline-flex items-center gap-1">
                <Plus size={14} /> {t.addEdu}
              </button>
            </div>
            {cv.edu.map((e, i) => (
              <div key={i} className="bg-slate-50 rounded-xl p-3 mb-2 flex gap-2">
                <input className="input" placeholder={t.degree} value={e.degree} onChange={(ev) => setEdu(i, "degree", ev.target.value)} />
                <input className="input" placeholder={t.school} value={e.school} onChange={(ev) => setEdu(i, "school", ev.target.value)} />
                <input className="input w-24" placeholder={t.year} value={e.year} onChange={(ev) => setEdu(i, "year", ev.target.value)} />
                <button onClick={() => setCv({ ...cv, edu: cv.edu.filter((_, j) => j !== i) })} className="text-red-400 hover:text-red-600 shrink-0">
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>

          <button onClick={() => window.print()} className="btn-primary w-full">
            <Printer size={18} /> {t.print}
          </button>
        </div>

        {/* Preview */}
        <div className="card overflow-hidden print-area" dir={lang === "ar" ? "rtl" : "ltr"}>
          <div className="bg-primary text-white p-8">
            <h2 className="text-3xl font-extrabold">{cv.name || (lang === "ar" ? "اسمك الكامل" : "Votre nom")}</h2>
            <p className="text-blue-100 font-semibold mt-1">{cv.title || (lang === "ar" ? "المسمى الوظيفي" : "Titre du poste")}</p>
            <div className="flex flex-wrap gap-4 mt-3 text-sm text-blue-100" dir="ltr">
              {cv.email && <span>{cv.email}</span>}
              {cv.phone && <span>{cv.phone}</span>}
              {cv.city && <span>{cv.city}</span>}
            </div>
          </div>
          <div className="p-8 space-y-6 bg-white">
            {cv.summary && (
              <section>
                <h3 className="font-extrabold text-primary text-lg border-b-2 border-primary/20 pb-1 mb-2">{t.summary}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{cv.summary}</p>
              </section>
            )}
            {cv.exp.length > 0 && (
              <section>
                <h3 className="font-extrabold text-primary text-lg border-b-2 border-primary/20 pb-1 mb-3">{t.exp}</h3>
                {cv.exp.map((e, i) => (
                  <div key={i} className="mb-3">
                    <div className="flex justify-between items-baseline">
                      <strong className="text-sm">{e.title} {e.company && `— ${e.company}`}</strong>
                      <span className="text-xs text-slate-400" dir="ltr">{e.period}</span>
                    </div>
                    {e.desc && <p className="text-sm text-slate-600">{e.desc}</p>}
                  </div>
                ))}
              </section>
            )}
            {cv.edu.length > 0 && (
              <section>
                <h3 className="font-extrabold text-primary text-lg border-b-2 border-primary/20 pb-1 mb-3">{t.edu}</h3>
                {cv.edu.map((e, i) => (
                  <div key={i} className="flex justify-between mb-2">
                    <div>
                      <strong className="text-sm">{e.degree}</strong>
                      {e.school && <span className="text-sm text-slate-600"> — {e.school}</span>}
                    </div>
                    <span className="text-xs text-slate-400" dir="ltr">{e.year}</span>
                  </div>
                ))}
              </section>
            )}
            {skillsList.length > 0 && (
              <section>
                <h3 className="font-extrabold text-primary text-lg border-b-2 border-primary/20 pb-1 mb-2">{t.skills}</h3>
                <div className="flex flex-wrap gap-2">
                  {skillsList.map((s) => (
                    <span key={s} className="bg-primary-50 text-primary text-sm font-semibold rounded-lg px-3 py-1">{s}</span>
                  ))}
                </div>
              </section>
            )}
            {langList.length > 0 && (
              <section>
                <h3 className="font-extrabold text-primary text-lg border-b-2 border-primary/20 pb-1 mb-2">{t.languages}</h3>
                <p className="text-sm text-slate-600">{langList.join(" · ")}</p>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
