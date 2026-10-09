import type { Metadata } from "next";
import AgeClient from "./AgeClient";

export const metadata: Metadata = {
  title: "حاسبة العمر بالميلادي والهجري - كم عمري بالضبط؟",
  description:
    "احسب عمرك بدقة بالسنوات والأشهر والأيام مع التحويل إلى التقويم الهجري، معرفة يوم ولادتك وعدّاد عيد ميلادك القادم.",
  keywords: [
    "حاسبة العمر",
    "العمر بالهجري",
    "كم عمري",
    "تاريخ الميلاد بالهجري",
    "حساب العمر بالميلادي",
    "calculateur âge",
  ],
};

export default function Page() {
  return <AgeClient />;
}
