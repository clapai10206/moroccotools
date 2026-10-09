import type { Metadata } from "next";
import CurrencyClient from "./CurrencyClient";

export const metadata: Metadata = {
  title: "محول العملات - درهم مغربي / أورو / دولار بأسعار مباشرة",
  description:
    "حوّل بين الدرهم المغربي (MAD) والأورو (EUR) والدولار (USD) بأسعار الصرف المباشرة. محول عملات سريع ومجاني لكل العملات.",
  keywords: [
    "محول العملات",
    "درهم مغربي أورو",
    "سعر الدولار في المغرب",
    "convertisseur devises maroc",
    "MAD EUR USD",
    "سعر الصرف الدرهم",
  ],
};

export default function Page() {
  return <CurrencyClient />;
}
