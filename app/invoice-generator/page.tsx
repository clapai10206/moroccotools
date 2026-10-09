import type { Metadata } from "next";
import InvoiceClient from "./InvoiceClient";

export const metadata: Metadata = {
  title: "مولد الفواتير الاحترافي - فاتورة PDF بالعربية مع TVA",
  description:
    "أنشئ فواتير احترافية بالعربية تشمل ضريبة القيمة المضافة TVA بأسعار 20%، 14%، 10%، 7%. حمّل الفاتورة PDF مجاناً وبدون تسجيل.",
  keywords: [
    "مولد فواتير",
    "فاتورة PDF",
    "ضريبة القيمة المضافة TVA المغرب",
    "facture maroc",
    "نموذج فاتورة مغربية",
    "فاتورة إلكترونية",
  ],
};

export default function Page() {
  return <InvoiceClient />;
}
