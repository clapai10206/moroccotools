import {
  Clock3,
  ArrowLeftRight,
  GraduationCap,
  Banknote,
  FileUser,
  CakeSlice,
  TrendingUp,
  Compass,
  ReceiptText,
  Percent,
  type LucideIcon,
} from "lucide-react";

export type Tool = {
  slug: string;
  name: string;
  short: string;
  description: string;
  icon: LucideIcon;
  keywords: string[];
};

export const siteUrl = "https://moroccotools.ma";

export const tools: Tool[] = [
  {
    slug: "prayer-times",
    name: "أوقات الصلاة",
    short: "مواقيت الصلاة لكل مدن المغرب",
    description:
      "تعرف على أوقات الصلاة اليوم في جميع مدن المغرب: الدار البيضاء، الرباط، مراكش، فاس، طنجة وأكثر من 25 مدينة مع عداد للصلاة القادمة.",
    icon: Clock3,
    keywords: ["أوقات الصلاة المغرب", "مواقيت الصلاة", "الدار البيضاء", "الرباط", "مراكش", "الفجر", "المغرب", "العشاء"],
  },
  {
    slug: "currency",
    name: "محول العملات",
    short: "حوّل بين الدرهم والأورو والدولار",
    description:
      "محول عملات بأسعار مباشرة بين الدرهم المغربي (MAD) والأورو (EUR) والدولار (USD) وأكثر من 10 عملات عالمية.",
    icon: ArrowLeftRight,
    keywords: ["محول العملات", "درهم مغربي", "أورو", "دولار", "سعر الصرف", "MAD EUR USD"],
  },
  {
    slug: "bac-calculator",
    name: "حاسبة الباكالوريا",
    short: "احسب معدلك حسب شعبتك",
    description:
      "حاسبة معدل الباكالوريا المغربية لجميع الشعب العلمية والأدبية مع احتساب الامتحان الجهوي والوطني تلقائياً.",
    icon: GraduationCap,
    keywords: ["حاسبة الباكالوريا", "معدل الباك", "شعبة علوم رياضية", "امتحان جهوي", "الثانية باك", "bac maroc"],
  },
  {
    slug: "salary-calculator",
    name: "حاسبة الأجور",
    short: "الأجرة الصافية بعد CNSS و IR",
    description:
      "احسب راتبك الصافي في المغرب بعد اقتطاعات CNSS و AMO وضريبة الدخل IR حسب آخر التعديلات الضريبية.",
    icon: Banknote,
    keywords: ["حاسبة الأجور المغرب", "CNSS", "AMO", "ضريبة الدخل", "الراتب الصافي", "IR", "salaire net maroc"],
  },
  {
    slug: "cv-maker",
    name: "صانع السيرة الذاتية",
    short: "CV احترافي بالعربية أو الفرنسية",
    description:
      "أنشئ سيرة ذاتية احترافية بالعربية أو الفرنسية خلال دقائق وحمّلها بصيغة PDF مجاناً وبدون تسجيل.",
    icon: FileUser,
    keywords: ["سيرة ذاتية", "CV", "قالب CV مغربي", "العمل في المغرب", "PDF", "curriculum vitae maroc"],
  },
  {
    slug: "age-calculator",
    name: "حاسبة العمر",
    short: "عمرك بالميلادي والهجري",
    description:
      "احسب عمرك بدقة بالسنوات والأشهر والأيام مع التحويل إلى التقويم الهجري ومعرفة متى عيد ميلادك القادم.",
    icon: CakeSlice,
    keywords: ["حاسبة العمر", "العمر بالهجري", "تاريخ الميلاد", "كم عمري", "العمر بالتقويم الهجري"],
  },
  {
    slug: "profit-calculator",
    name: "حاسبة الربح",
    short: "نسبة الربح والهامش للتجار",
    description:
      "احسب نسبة الربح والهامش والربح الصافي للتجار والمشاريع الصغيرة في المغرب بسهولة ودقة.",
    icon: TrendingUp,
    keywords: ["حاسبة الربح", "نسبة الربح", "هامش الربح", "تجارة", "calcul marge bénéfice"],
  },
  {
    slug: "qibla",
    name: "اتجاه القبلة",
    short: "اتجاه القبلة من مدينتك",
    description:
      "اعرف اتجاه القبلة بدقة من أي مدينة مغربية مع بوصلة تفاعلية ودرجات الاتجاه من الشمال بالساعة.",
    icon: Compass,
    keywords: ["اتجاه القبلة", "القبلة من المغرب", "بوصلة القبلة", "الكعبة", "qibla direction"],
  },
  {
    slug: "invoice-generator",
    name: "مولد الفواتير",
    short: "فواتير احترافية مع ضريبة TVA",
    description:
      "أنشئ فواتير احترافية بالعربية تشمل ضريبة القيمة المضافة TVA بأسعار 20% و 14% و 7% وحمّلها PDF مجاناً.",
    icon: ReceiptText,
    keywords: ["فاتورة", "مولد فواتير", "TVA", "فاتورة مغرب", "facture maroc", "ضريبة القيمة المضافة"],
  },
  {
    slug: "percentage-calculator",
    name: "حاسبة النسبة",
    short: "كل حسابات النسب المئوية",
    description:
      "حاسبة النسبة المئوية الشاملة: احسب النسبة من مبلغ، النسبة بين رقمين، والتغير المئوي بين قيمتين.",
    icon: Percent,
    keywords: ["حاسبة النسبة المئوية", "نسبة مئوية", "حساب النسبة", "التغير المئوي", "pourcentage"],
  },
];

export function getTool(slug: string): Tool | undefined {
  return tools.find((t) => t.slug === slug);
}
