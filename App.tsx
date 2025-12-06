import React, { useState, useCallback } from 'react';
import { Language, ValuationResponse } from './types';
import { TRANSLATIONS } from './constants';
import { evaluateDomain } from './services/geminiService';
import Header from './components/Header';
import DomainInput from './components/DomainInput';
import ValuationResult from './components/ValuationResult';
import { AlertCircle } from 'lucide-react';

function App() {
  const [language, setLanguage] = useState<Language>(Language.ENGLISH);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<ValuationResponse | null>(null);
  const [searchedDomain, setSearchedDomain] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const t = TRANSLATIONS[language];
  const isRtl = language === Language.ARABIC;

  const handleAnalyze = useCallback(async (domain: string) => {
    setIsLoading(true);
    setError(null);
    setSearchedDomain(domain);
    setResult(null);

    try {
      const data = await evaluateDomain(domain, language);
      setResult(data);
    } catch (err) {
      console.error(err);
      setError(t.error);
    } finally {
      setIsLoading(false);
    }
  }, [language, t.error]);

  return (
    <div className={`min-h-screen bg-gray-50 flex flex-col font-sans ${isRtl ? 'rtl' : 'ltr'}`} dir={isRtl ? 'rtl' : 'ltr'}>
      <Header language={language} setLanguage={setLanguage} />

      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          
          {/* Hero Section */}
          <div className={`text-center mb-12 space-y-4 ${result ? 'hidden md:block' : ''}`}>
             {!result && (
              <>
                <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
                  {t.title}
                </h1>
                <p className="text-xl text-gray-500 max-w-2xl mx-auto">
                  {t.subtitle}
                </p>
              </>
             )}
          </div>

          <div className="mb-12">
            <DomainInput 
              language={language} 
              onAnalyze={handleAnalyze} 
              isLoading={isLoading} 
            />
          </div>

          {/* Error State */}
          {error && (
            <div className="max-w-2xl mx-auto bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3 text-red-700 animate-fade-in">
              <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
              <p>{error}</p>
            </div>
          )}

          {/* Results State */}
          {result && (
            <ValuationResult 
              data={result} 
              language={language} 
              domainName={searchedDomain} 
            />
          )}

          {/* Empty State / How it works placeholder if no result */}
          {!result && !isLoading && !error && (
             <div className="grid md:grid-cols-3 gap-8 mt-16 max-w-5xl mx-auto text-center opacity-60">
                <div className="p-6">
                   <div className="w-12 h-12 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center text-xl font-bold text-gray-500">1</div>
                   <h3 className="font-bold mb-2 text-gray-900">Enter Domain</h3>
                   <p className="text-sm">Type any domain name you want to check.</p>
                </div>
                <div className="p-6">
                   <div className="w-12 h-12 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center text-xl font-bold text-gray-500">2</div>
                   <h3 className="font-bold mb-2 text-gray-900">AI Analysis</h3>
                   <p className="text-sm">Our AI evaluates branding, SEO, and historical data.</p>
                </div>
                <div className="p-6">
                   <div className="w-12 h-12 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center text-xl font-bold text-gray-500">3</div>
                   <h3 className="font-bold mb-2 text-gray-900">Get Valuation</h3>
                   <p className="text-sm">See the estimated price and detailed breakdown.</p>
                </div>
             </div>
          )}
        </div>
      </main>

      <footer className="bg-white border-t border-gray-200 mt-auto">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 text-center text-gray-400 text-sm">
          &copy; {new Date().getFullYear()} DomainWorth Pro. AI-generated estimates for informational purposes only.
        </div>
      </footer>
    </div>
  );
}

export default App;