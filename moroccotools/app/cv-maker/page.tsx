import type { Metadata } from "next";
import CvClient from "./CvClient";

export const metadata: Metadata = {
  title: "صانع السيرة الذاتية CV احترافي بالعربية والفرنسية - PDF مجاني",
  description:
    "أنشئ سيرة ذاتية احترافية بالعربية أو الفرنسية خلال دقائق. قوالب CV حديثة، تحميل PDF مجاني، بدون تسجيل — مثالي للبحث عن عمل في المغرب.",
  keywords: [
    "سيرة ذاتية",
    "صانع CV",
    "قالب CV مغربي",
    "CV بالعربية",
    "CV بالفرنسية",
    "تحميل CV PDF",
    "cv maker maroc",
    "modèle cv maroc",
  ],
};

export default function Page() {
  return <CvClient />;
}
