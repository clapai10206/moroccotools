"use client";

import { useEffect, useMemo, useState } from "react";
import { Clock3, Sun, Sunrise, Sunset, MoonStar } from "lucide-react";
import AdSlot from "@/components/AdSlot";

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
  { name: "المحمدية", lat: 33.6866, lng: -7.383 },
  { name: "العيون", lat: 27.1253, lng: -13.1625 },
  { name: "الداخلة", lat: 23.6848, lng: -15.958 },
  { name: "خريبكة", lat: 32.8811, lng: -6.9063 },
  { name: "سطات", lat: 33.0013, lng: -7.6166 },
  { name: "الجديدة", lat: 33.2316, lng: -8.5007 },
  { name: "آسفي", lat: 32.2994, lng: -9.2372 },
  { name: "بني ملال", lat: 32.3373, lng: -6.3498 },
  { name: "برشيد", lat: 33.1785, lng: -7.5726 },
  { name: "الناظور", lat: 35.1681, lng: -2.9287 },
  { name: "الحسيمة", lat: 35.2517, lng: -3.9372 },
  { name: "خنيفرة", lat: 32.9402, lng: -5.6633 },
  { name: "ورزازات", lat: 30.9335, lng: -6.937 },
  { name: "الرشيدية", lat: 31.9314, lng: -4.4247 },
  { name: "كلميم", lat: 28.987, lng: -10.0574 },
  { name: "العرائش", lat: 35.1741, lng: -6.2965 },
  { name: "المضيق", lat: 35.5643, lng: -5.3626 },
  { name: "صفرو", lat: 33.8305, lng: -4.8353 },
];

const RAD = Math.PI / 180;

function julianDay(y: number, m: number, d: number) {
  if (m <= 2) {
    y -= 1;
    m += 12;
  }
  const A = Math.floor(y / 100);
  const B = 2 - A + Math.floor(A / 4);
  return Math.floor(365.25 * (y + 4716)) + Math.floor(30.6001 * (m + 1)) + d + B - 1524.5;
}

function sunEquations(jd: number) {
  const D = jd - 2451545.0;
  const g = (((357.529 + 0.98560028 * D) % 360) + 360) % 360;
  const q = (((280.459 + 0.98564736 * D) % 360) + 360) % 360;
  const L = (((q + 1.915 * Math.sin(g * RAD) + 0.02 * Math.sin(2 * g * RAD)) % 360) + 360) % 360;
  const e = 23.439 - 0.00000036 * D;
  let RA = Math.atan2(Math.cos(e * RAD) * Math.sin(L * RAD), Math.cos(L * RAD)) / RAD / 15;
  RA = ((RA % 24) + 24) % 24;
  const eqt = q / 15 - RA;
  const decl = Math.asin(Math.sin(e * RAD) * Math.sin(L * RAD)) / RAD;
  return { eqt, decl };
}

function hourAngle(decl: number, lat: number, angle: number) {
  const c = (Math.sin(-angle * RAD) - Math.sin(decl * RAD) * Math.sin(lat * RAD)) / (Math.cos(decl * RAD) * Math.cos(lat * RAD));
  if (c < -1 || c > 1) return null;
  return Math.acos(c) / RAD / 15;
}

function tzOffsetHours(date: Date) {
  const dtf = new Intl.DateTimeFormat("en-US", {
    timeZone: "Africa/Casablanca",
    hour12: false,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  const parts: Record<string, string> = {};
  dtf.formatToParts(date).forEach((x) => (parts[x.type] = x.value));
  const wall = new Date(+parts.year, +parts.month - 1, +parts.day, +parts.hour % 24, +parts.minute, +parts.second);
  return (wall.getTime() - date.getTime()) / 3600000;
}

function computeTimes(lat: number, lng: number, date: Date) {
  const tz = tzOffsetHours(date);
  const jd = julianDay(date.getFullYear(), date.getMonth() + 1, date.getDate());
  const { eqt, decl } = sunEquations(jd - lng / 360);
  const dhuhr = 12 + tz - lng / 15 - eqt;
  const haFajr = hourAngle(decl, lat, 19);
  const haIsha = hourAngle(decl, lat, 17);
  const haSun = hourAngle(decl, lat, 0.833);
  const asrAlt = Math.atan(1 / (1 + Math.tan(Math.abs(lat - decl) * RAD))) / RAD;
  const haAsr = hourAngle(decl, lat, -asrAlt);
  return {
    الفجر: dhuhr - (haFajr ?? 0),
    الشروق: dhuhr - (haSun ?? 0),
    الظهر: dhuhr,
    العصر: dhuhr + (haAsr ?? 0),
    المغرب: dhuhr + (haSun ?? 0),
    العشاء: dhuhr + (haIsha ?? 0),
  };
}

const fmt = (t: number) => {
  const x = ((t % 24) + 24) % 24;
  let h = Math.floor(x);
  let m = Math.round((x - h) * 60);
  if (m === 60) {
    h = (h + 1) % 24;
    m = 0;
  }
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
};

const icons: Record<string, React.ReactNode> = {
  الفجر: <MoonStar size={20} />,
  الشروق: <Sunrise size={20} />,
  الظهر: <Sun size={20} />,
  العصر: <Sun size={20} />,
  المغرب: <Sunset size={20} />,
  العشاء: <MoonStar size={20} />,
};

export default function PrayerTimesClient() {
  const [cityIdx, setCityIdx] = useState(0);
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 30000);
    return () => clearInterval(t);
  }, []);

  const city = cities[cityIdx];
  const times = useMemo(() => computeTimes(city.lat, city.lng, now), [city, now]);

  const nextPrayer = useMemo(() => {
    const entries = Object.entries(times);
    const nowDec = now.getHours() + now.getMinutes() / 60;
    for (const [name, t] of entries) {
      const x = ((t % 24) + 24) % 24;
      if (x > nowDec) return { name, t: x };
    }
    return { name: entries[0][0], t: ((entries[0][1] % 24) + 24) % 24 + 24 };
  }, [times, now]);

  const countdown = useMemo(() => {
    let diff = (nextPrayer.t - (now.getHours() + now.getMinutes() / 60)) * 3600;
    if (diff < 0) diff += 86400;
    const h = Math.floor(diff / 3600);
    const m = Math.floor((diff % 3600) / 60);
    return `${h} ساعة و ${m} دقيقة`;
  }, [nextPrayer, now]);

  const todayStr = now.toLocaleDateString("ar-MA", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-2">أوقات الصلاة في المغرب</h1>
        <p className="text-slate-500">{todayStr}</p>
      </div>

      <AdSlot slot="1000000004" />

      <div className="card p-6 mb-8 max-w-md mx-auto">
        <label className="label">اختر المدينة</label>
        <select className="input" value={cityIdx} onChange={(e) => setCityIdx(+e.target.value)}>
          {cities.map((c, i) => (
            <option key={c.name} value={i}>
              {c.name}
            </option>
          ))}
        </select>
        <div className="mt-4 rounded-xl bg-primary-50 p-4 text-center">
          <p className="text-sm text-slate-500 mb-1">الصلاة القادمة: <strong className="text-primary">{nextPrayer.name}</strong></p>
          <p className="text-2xl font-extrabold text-slate-900">{countdown}</p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Object.entries(times).map(([name, t]) => {
          const isNext = name === nextPrayer.name;
          return (
            <div
              key={name}
              className={`card p-6 flex items-center justify-between ${isNext ? "border-primary ring-2 ring-primary/20" : ""}`}
            >
              <div className="flex items-center gap-3">
                <span className={`w-11 h-11 rounded-xl flex items-center justify-center ${isNext ? "bg-primary text-white" : "bg-primary-50 text-primary"}`}>
                  {icons[name]}
                </span>
                <div>
                  <h3 className="font-bold">{name}</h3>
                  {isNext && <span className="text-xs text-primary font-semibold">الصلاة القادمة</span>}
                </div>
              </div>
              <span className="text-2xl font-extrabold tracking-wide" dir="ltr">
                {fmt(t)}
              </span>
            </div>
          );
        })}
      </div>

      <p className="text-xs text-slate-400 text-center mt-8">
        الأوقات محسوبة فلكياً (زاوية الفجر 19° والعشاء 17°) وقد تختلف دقائق عن التوقيت
        الرسمي لوزارة الأوقاف والشؤون الإسلامية.
      </p>
    </div>
  );
}
