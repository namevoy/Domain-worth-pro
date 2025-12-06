import React from 'react';
import { Language, ValuationResponse } from '../types';
import { TRANSLATIONS } from '../constants';
import { DollarSign, Star, Key, Layers, Clock, TrendingUp, Info } from 'lucide-react';
import ValuationChart from './ValuationChart';

interface ValuationResultProps {
  data: ValuationResponse;
  language: Language;
  domainName: string;
}

const ValuationResult: React.FC<ValuationResultProps> = ({ data, language, domainName }) => {
  const t = TRANSLATIONS[language];
  const isRtl = language === Language.ARABIC;

  // Formatting currency
  const formattedValue = new Intl.NumberFormat(language === Language.ARABIC ? 'ar-AE' : 'en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(data.estimatedValue);

  const ScoreCard = ({ title, score, icon: Icon, colorClass, description }: any) => (
    <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-2">
        <div className={`p-2 rounded-lg ${colorClass} bg-opacity-10`}>
          <Icon className={`w-5 h-5 ${colorClass.replace('bg-', 'text-')}`} />
        </div>
        <span className={`text-2xl font-bold ${colorClass.replace('bg-', 'text-')}`}>{score}/100</span>
      </div>
      <h3 className="font-semibold text-gray-900 mb-1">{title}</h3>
      <p className="text-sm text-gray-500 leading-relaxed">{description}</p>
    </div>
  );

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Top Value Card */}
      <div className="bg-gradient-to-br from-brand-900 to-brand-700 rounded-2xl p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-8 -mt-8 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -ml-8 -mb-8 w-48 h-48 bg-brand-400 opacity-10 rounded-full blur-2xl"></div>
        
        <div className="relative z-10 text-center">
          <h2 className="text-brand-100 font-medium mb-2 text-lg">{t.estimatedValue}</h2>
          <div className="text-5xl md:text-6xl font-extrabold mb-4 tracking-tight flex items-center justify-center gap-2">
            {formattedValue}
          </div>
          <p className="text-brand-100 text-lg max-w-2xl mx-auto font-light">
            "{domainName}"
          </p>
          <div className="mt-6 bg-white/10 backdrop-blur-sm rounded-lg p-4 max-w-3xl mx-auto border border-white/10">
            <p className="text-sm md:text-base leading-relaxed">{data.summary}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Metrics Grid */}
        <div className="lg:col-span-2 space-y-6">
          <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-brand-600" />
            {t.breakdown}
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <ScoreCard 
              title={t.brandability} 
              score={data.brandabilityScore} 
              icon={Star} 
              colorClass="bg-yellow-500 text-yellow-600"
              description={data.detailedAnalysis.brandability}
            />
            <ScoreCard 
              title={t.keywords} 
              score={data.keywordScore} 
              icon={Key} 
              colorClass="bg-purple-500 text-purple-600"
              description={data.detailedAnalysis.keywords}
            />
            <ScoreCard 
              title={t.extensions} 
              score={data.extensionScore} 
              icon={Layers} 
              colorClass="bg-blue-500 text-blue-600"
              description={data.detailedAnalysis.extensions}
            />
            <ScoreCard 
              title={t.age} 
              score={data.ageScore} 
              icon={Clock} 
              colorClass="bg-emerald-500 text-emerald-600"
              description={data.detailedAnalysis.age}
            />
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="font-bold text-gray-900 mb-4">{t.marketTrends}</h3>
            <p className="text-gray-600 leading-relaxed">{data.detailedAnalysis.marketTrends}</p>
          </div>
        </div>

        {/* Right Column: Chart & Comps */}
        <div className="space-y-6">
          {/* Chart Card */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
             <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4 text-center">{t.whyThisValue}</h3>
             <ValuationChart data={data} language={language} />
          </div>

          {/* Comparable Sales */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-green-600" />
              {t.comparableSales}
            </h3>
            <div className="space-y-3">
              {data.comparableSales.map((sale, idx) => (
                <div key={idx} className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0">
                  <div>
                    <span className="block font-medium text-gray-900">{sale.domain}</span>
                    <span className="text-xs text-gray-400">{sale.year}</span>
                  </div>
                  <span className="font-semibold text-green-600">
                    ${sale.price.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-4 flex items-start gap-2 bg-gray-50 p-3 rounded-lg">
              <Info className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
              <p className="text-xs text-gray-500">{t.salesDisclaimer}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ValuationResult;