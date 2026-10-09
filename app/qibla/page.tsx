import type { Metadata } from "next";
import QiblaClient from "./QiblaClient";

export const metadata: Metadata = {
  title: "اتجاه القبلة من المغرب - بوصلة القبلة الدقيقة",
  description:
    "اعرف اتجاه القبلة بدقة من أي مدينة في المغرب مع بوصلة تفاعلية ودرجات الاتجاه من الشمال. يعمل مباشرة بدون تحميل.",
  keywords: [
    "اتجاه القبلة",
    "القبلة من المغرب",
    "بوصلة القبلة",
    "زاوية القبلة الدار البيضاء",
    "اتجاه الكعبة",
    "qibla direction maroc",
  ],
};

export default function Page() {
  return <QiblaClient />;
}
