import type { Metadata } from "next";
import PrayerTimesClient from "./PrayerTimesClient";

export const metadata: Metadata = {
  title: "أوقات الصلاة في المغرب - مواقيت الصلاة لكل المدن",
  description:
    "أوقات الصلاة اليوم في جميع مدن المغرب: الدار البيضاء، الرباط، مراكش، فاس، طنجة، أكادير و أكثر من 25 مدينة مع عداد للصلاة القادمة.",
  keywords: [
    "أوقات الصلاة المغرب",
    "مواقيت الصلاة الدار البيضاء",
    "مواقيت الصلاة الرباط",
    "أوقات الصلاة مراكش",
    "وقت الفجر المغرب",
    "وقت المغرب والعشاء",
    "horaire priere maroc",
  ],
};

export default function Page() {
  return <PrayerTimesClient />;
}
