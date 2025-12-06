export enum Language {
  ENGLISH = 'en',
  ARABIC = 'ar'
}

export interface ComparableSale {
  domain: string;
  price: number;
  year: string;
}

export interface DetailedAnalysis {
  brandability: string;
  keywords: string;
  extensions: string;
  age: string;
  marketTrends: string;
}

export interface ValuationResponse {
  currency: string;
  estimatedValue: number;
  brandabilityScore: number; // 0-100
  keywordScore: number; // 0-100
  extensionScore: number; // 0-100
  ageScore: number; // 0-100
  comparableSales: ComparableSale[];
  summary: string;
  detailedAnalysis: DetailedAnalysis;
}

export interface TranslationDictionary {
  title: string;
  subtitle: string;
  placeholder: string;
  analyzeBtn: string;
  analyzing: string;
  estimatedValue: string;
  breakdown: string;
  brandability: string;
  keywords: string;
  extensions: string;
  age: string;
  comparableSales: string;
  whyThisValue: string;
  error: string;
  tryAgain: string;
  salesDisclaimer: string;
  score: string;
  marketTrends: string;
}