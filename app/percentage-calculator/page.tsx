import type { Metadata } from "next";
import PercentageClient from "./PercentageClient";

export const metadata: Metadata = {
  title: "حاسبة النسبة المئوية - كل حسابات النسب",
  description:
    "حاسبة النسبة المئوية الشاملة: احسب نسبة من مبلغ، نسبة رقم من آخر، نسبة الزيادة والنقصان، والتغير المئوي بين قيمتين.",
  keywords: [
    "حاسبة النسبة المئوية",
    "نسبة مئوية",
    "حساب النسبة من مبلغ",
    "نسبة الزيادة",
    "pourcentage calculatrice",
  ],
};

export default function Page() {
  return <PercentageClient />;
}
