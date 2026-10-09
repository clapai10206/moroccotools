import type { Metadata } from "next";
import SalaryClient from "./SalaryClient";

export const metadata: Metadata = {
  title: "حاسبة الأجور المغرب - الراتب الصافي بعد CNSS و IR",
  description:
    "احسب راتبك الصافي في المغرب بعد اقتطاعات الصندوق الوطني للضمان الاجتماعي CNSS والتأمين الإجباري AMO وضريبة الدخل IR حسب آخر التعديلات.",
  keywords: [
    "حاسبة الأجور المغرب",
    "CNSS المغرب",
    "AMO",
    "ضريبة الدخل IR",
    "الراتب الصافي",
    "salaire net maroc",
    "برنامج تسير الأجور",
  ],
};

export default function Page() {
  return <SalaryClient />;
}
