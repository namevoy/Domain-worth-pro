import { Language, TranslationDictionary } from './types';

export const TRANSLATIONS: Record<Language, TranslationDictionary> = {
  [Language.ENGLISH]: {
    title: "DomainWorth Pro",
    subtitle: "Professional AI-Powered Domain Valuation",
    placeholder: "Enter a domain (e.g., example.com)",
    analyzeBtn: "Analyze Domain",
    analyzing: "Analyzing market data...",
    estimatedValue: "Estimated Market Value",
    breakdown: "Valuation Breakdown",
    brandability: "Brandability",
    keywords: "Keyword Analysis",
    extensions: "Extension Potential",
    age: "Domain Age & Trust",
    comparableSales: "Comparable Sales",
    whyThisValue: "Valuation Logic",
    error: "Could not value this domain. Please ensure it is a valid format.",
    tryAgain: "Try Another Domain",
    salesDisclaimer: "Based on historical market trends for similar domains.",
    score: "Score",
    marketTrends: "Market Trends"
  },
  [Language.ARABIC]: {
    title: "دومين وورث برو",
    subtitle: "تقييم احترافي للنطاقات مدعوم بالذكاء الاصطناعي",
    placeholder: "أدخل اسم النطاق (مثال: example.com)",
    analyzeBtn: "تحليل النطاق",
    analyzing: "جاري تحليل بيانات السوق...",
    estimatedValue: "القيمة السوقية المقدرة",
    breakdown: "تفاصيل التقييم",
    brandability: "قوة العلامة التجارية",
    keywords: "تحليل الكلمات المفتاحية",
    extensions: "إمكانات الامتدادات",
    age: "عمر النطاق والموثوقية",
    comparableSales: "مبيعات مماثلة",
    whyThisValue: "منطق التقييم",
    error: "تعذر تقييم هذا النطاق. يرجى التأكد من الصيغة.",
    tryAgain: "جرب نطاق آخر",
    salesDisclaimer: "بناءً على اتجاهات السوق التاريخية لنطاقات مماثلة.",
    score: "الدرجة",
    marketTrends: "اتجاهات السوق"
  }
};