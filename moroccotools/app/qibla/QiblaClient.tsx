"use client";

import { useMemo, useState } from "react";
import { Compass, LocateFixed } from "lucide-react";
import AdSlot from "@/components/AdSlot";

const KAABA = { lat: 21.4225, lng: 39.8262 };

const cities = [
  { name: "الدار البيضاء", lat: 33.5731, lng: -7.5898 },
  { name: "الرباط", lat: 34.0209, lng: -6.8416 },
  { name: "مراكش", lat: 31.6295, lng: -7.9811 },
  { name: "فاس", lat: 34.0181, lng: -5.0078 },
  { name: "طنجة", lat: 35.7595, lng: -5.834 },
  { name: "أكادير", lat: 30.4278, lng: -9.5981 },
  { name: "مكناس", lat: 33.8935, lng: -5.5473 },
  { name: "وجدة", lat: 34.6814, lng: -1.9086 },
  { name: "القنيطرة", lat: 34.261, lng: -6.5802 },
  { name: "تطوان", lat: 35.5889, lng: -5.3626 },
  { name: "سلا", lat: 34.0531, lng: -6.7985 },
  { name: "العيون", lat: 27.1253, lng: -13.1625 },
  { name: "الداخلة", lat: 23.6848, lng: -15.958 },
  { name: "بني ملال", lat: 32.3373, lng: -6.3498 },
  { name: "الناظور", lat: 35.1681, lng: -2.9287 },
  { name: "كلميم", lat: 28.987, lng: -10.0574 },
];

function qiblaBearing(lat: number, lng: number) {
  const rad = Math.PI / 180;
  const dLng = (KAABA.lng - lng) * rad;
  const y = Math.sin(dLng);
  const x = Math.cos(lat * rad) * Math.tan(KAABA.lat * rad) - Math.sin(lat * rad) * Math.cos(dLng);
  return ((Math.atan2(y, x) / rad + 360) % 360);
}

export default function QiblaClient() {
  const [cityIdx, setCityIdx] = useState(0);
  const [custom, setCustom] = useState<{ lat: number; lng: number } | null>(null);
  const [geoMsg, setGeoMsg] = useState("");

  const pos = custom || cities[cityIdx];
  const bearing = useMemo(() => qiblaBearing(pos.lat, pos.lng), [pos]);

  const useGeolocation = () => {
    if (!navigator.geolocation) {
      setGeoMsg("المتصفح لا يدعم تحديد الموقع");
      return;
    }
    setGeoMsg("جاري تحديد موقعك...");
    navigator.geolocation.getCurrentPosition(
      (p) => {
        setCustom({ lat: p.coords.latitude, lng: p.coords.longitude });
        setGeoMsg("");
      },
      () => setGeoMsg("تعذر تحديد الموقع، اختر مدينة من القائمة")
    );
  };

  const directionName = bearing >= 337.5 || bearing < 22.5 ? "الشمال"
    : bearing < 67.5 ? "الشمال الشرقي"
    : bearing < 112.5 ? "الشرق"
    : bearing < 157.5 ? "الجنوب الشرقي"
    : bearing < 202.5 ? "الجنوب"
    : bearing < 247.5 ? "الجنوب الغربي"
    : bearing < 292.5 ? "الغرب"
    : "الشمال الغربي";

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-2 flex items-center justify-center gap-3">
          <Compass className="text-primary" size={36} />
          اتجاه القبلة
        </h1>
        <p className="text-slate-500">اعرف اتجاه الكعبة المشرفة من موقعك</p>
      </div>

      <AdSlot slot="1000000011" />

      <div className="card p-6 md:p-8">
        {!custom && (
          <>
            <label className="label">اختر المدينة</label>
            <select className="input mb-3" value={cityIdx} onChange={(e) => { setCityIdx(+e.target.value); setCustom(null); }}>
              {cities.map((c, i) => (
                <option key={c.name} value={i}>{c.name}</option>
              ))}
            </select>
          </>
        )}
        {custom && (
          <div className="flex items-center justify-between bg-primary-50 rounded-xl p-3 mb-3">
            <span className="text-sm font-semibold">موقعك الحالي</span>
            <button onClick={() => setCustom(null)} className="text-primary text-sm font-bold">اختيار مدينة بدلًا</button>
          </div>
        )}

        <button onClick={useGeolocation} className="btn-outline w-full mb-6">
          <LocateFixed size={18} /> استخدم موقعي الحالي
        </button>
        {geoMsg && <p className="text-sm text-amber-600 mb-4 text-center">{geoMsg}</p>}

        <div className="flex flex-col items-center">
          <div className="relative w-64 h-64">
            <svg viewBox="0 0 200 200" className="w-full h-full">
              <circle cx="100" cy="100" r="90" fill="none" stroke="#e2e8f0" strokeWidth="2" />
              <circle cx="100" cy="100" r="70" fill="none" stroke="#e2e8f0" strokeWidth="1" strokeDasharray="4 4" />
              {Array.from({ length: 36 }).map((_, i) => {
                const a = (i * 10 - 90) * (Math.PI / 180);
                const x1 = 100 + 80 * Math.cos(a), y1 = 100 + 80 * Math.sin(a);
                const x2 = 100 + 90 * Math.cos(a), y2 = 100 + 90 * Math.sin(a);
                return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#94a3b8" strokeWidth={i % 9 === 0 ? 2.5 : 1} />;
              })}
              <text x="100" y="18" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#2563eb">شمال</text>
              <text x="186" y="105" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#94a3b8">شرق</text>
              <text x="100" y="195" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#94a3b8">جنوب</text>
              <text x="14" y="105" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#94a3b8">غرب</text>
              <g transform={`rotate(${bearing} 100 100)`}>
                <path d="M 100 25 L 92 100 L 100 90 L 108 100 Z" fill="#2563eb" />
                <path d="M 100 175 L 92 100 L 100 110 L 108 100 Z" fill="#cbd5e1" />
              </g>
              <circle cx="100" cy="100" r="7" fill="#2563eb" />
              <circle cx="100" cy="100" r="3" fill="white" />
            </svg>
          </div>

          <div className="text-center mt-6">
            <p className="text-5xl font-extrabold text-primary" dir="ltr">{bearing.toFixed(1)}°</p>
            <p className="text-slate-600 mt-2">اتجاه القبلة: <strong>{directionName}</strong> من الشمال باتجاه عقارب الساعة</p>
            <p className="text-xs text-slate-400 mt-1">
              {custom ? `إحداثياتك: ${pos.lat.toFixed(4)}, ${pos.lng.toFixed(4)}` : `خط العرض ${pos.lat.toFixed(4)} · خط الطول ${pos.lng.toFixed(4)}`}
            </p>
          </div>
        </div>

        <div className="mt-8 bg-slate-50 rounded-xl p-4 text-sm text-slate-600 leading-relaxed">
          <strong className="text-slate-800">كيف أستخدمها؟</strong> وجّه بوصلة هاتفك نحو الشمال،
          ثم أدر نفسك باتجاه عقارب الساعة بزاوية <strong dir="ltr">{bearing.toFixed(0)}°</strong>.
          في المغرب تقريباً، القبلة نحو <strong>الشرق / الجنوب الشرقي</strong>.
        </div>
      </div>
    </div>
  );
}
