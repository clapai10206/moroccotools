"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

/**
 * مكان مخصص لإعلانات Google AdSense.
 * أضف NEXT_PUBLIC_ADSENSE_ID=ca-pub-XXXXXXXXXXXXXXXX في ملف .env.local
 * لعرض الإعلانات الحقيقية. بدون المعرّف يظهر مكان فارغ للاختبار.
 */
export default function AdSlot({
  slot = "1234567890",
  format = "auto",
}: {
  slot?: string;
  format?: string;
}) {
  const clientId = process.env.NEXT_PUBLIC_ADSENSE_ID;

  useEffect(() => {
    if (clientId) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch {
        /* تجاهل أخطاء تحميل الإعلان */
      }
    }
  }, [clientId]);

  if (!clientId) {
    return (
      <div className="my-6 flex h-24 items-center justify-center rounded-xl border-2 border-dashed border-slate-300 text-xs text-slate-400 no-print">
        مساحة إعلانية (Google AdSense)
      </div>
    );
  }

  return (
    <div className="my-6 no-print">
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={clientId}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
}
