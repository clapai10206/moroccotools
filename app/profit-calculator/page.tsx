import type { Metadata } from "next";
import ProfitClient from "./ProfitClient";

export const metadata: Metadata = {
  title: "حاسبة نسبة الربح والهامش للتجار",
  description:
    "احسب نسبة الربح والهامش والربح الصافي للتجار والمشاريع الصغيرة في المغرب. أدخل سعر الشراء وسعر البيع واحصل على النتائج فوراً.",
  keywords: [
    "حاسبة الربح",
    "نسبة الربح",
    "هامش الربح",
    "حاسبة الهامش",
    "تجارة المغرب",
    "calcul marge bénéfice",
  ],
};

export default function Page() {
  return <ProfitClient />;
}
