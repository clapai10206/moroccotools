import { Analytics } from "@vercel/analytics/next"
import type { Metadata, Viewport } from "next";
import { Tajawal } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const tajawal = Tajawal({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "700", "800"],
  variable: "--font-tajawal",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://moroccotools.ma"),
  title: {
    default: "MoroccoTools - أدوات مغربية مجانية لكل مغربي",
    template: "%s | MoroccoTools",
  },
  description:
    "منصة MoroccoTools توفر أدوات مجانية لكل مغربي: أوقات الصلاة، محول العملات، حاسبة الباكالوريا، حاسبة الأجور CNSS و IR، صانع السيرة الذاتية، اتجاه القبلة والمزيد.",
  keywords: [
    "أدوات مغربية",
    "موقع أدوات المغرب",
    "MoroccoTools",
    "أوقات الصلاة المغرب",
    "محول العملات درهم",
    "حاسبة الباكالوريا",
    "حاسبة الأجور CNSS",
  ],
  openGraph: {
    type: "website",
    locale: "ar_MA",
    siteName: "MoroccoTools",
    title: "MoroccoTools - أدوات مجانية لكل مغربي",
    description: "أدوات مجانية لكل مغربي: الصلاة، العملات، الباكالوريا، الأجور، السيرة الذاتية وأكثر.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#2563eb",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const adsenseId = process.env.NEXT_PUBLIC_ADSENSE_ID;

  return (
    <html lang="ar" dir="rtl">
      <body className={`${tajawal.className} min-h-screen flex flex-col`}>
        {adsenseId && (
          <Script
            id="adsense-script"
            async
            strategy="afterInteractive"
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseId}`}
            crossOrigin="anonymous"
          />
        )}
        <Analytics />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
