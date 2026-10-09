import type { Metadata } from "next";
import BacClient from "./BacClient";

export const metadata: Metadata = {
  title: "حاسبة معدل الباكالوريا المغربية - جميع الشعب",
  description:
    "احسب معدل الباكالوريا المغربية لجميع الشعب: علوم رياضية، علوم فيزيائية، علوم الحياة والأرض، آداب، علوم اقتصادية وغيرها مع احتساب الامتحان الجهوي.",
  keywords: [
    "حاسبة الباكالوريا",
    "معدل الباك المغرب",
    "شعبة علوم رياضية",
    "شعبة علوم فيزيائية",
    "الامتحان الجهوي الثانية باك",
    "mention bac maroc",
    "moyenne bac maroc",
  ],
};

export default function Page() {
  return <BacClient />;
}
