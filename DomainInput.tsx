import React, { useState } from 'react';
import { Search, Loader2, ArrowRight } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../constants';

interface DomainInputProps {
  language: Language;
  onAnalyze: (domain: string) => void;
  isLoading: boolean;
}

const DomainInput: React.FC<DomainInputProps> = ({ language, onAnalyze, isLoading }) => {
  const [input, setInput] = useState('');
  const t = TRANSLATIONS[language];
  const isRtl = language === Language.ARABIC;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onAnalyze(input.trim());
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="relative group">
        <div className={`absolute inset-y-0 ${isRtl ? 'right-0 pr-4' : 'left-0 pl-4'} flex items-center pointer-events-none`}>
          <Search className="h-5 w-5 text-gray-400 group-focus-within:text-brand-500 transition-colors" />
        </div>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={isLoading}
          className={`
            block w-full bg-white border-2 border-gray-100 rounded-full py-4 
            ${isRtl ? 'pr-12 pl-36' : 'pl-12 pr-36'} 
            text-gray-900 placeholder-gray-400 focus:outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 
            transition-all shadow-lg shadow-gray-200/50 text-lg
          `}
          placeholder={t.placeholder}
          dir="ltr" // Domains are always LTR
        />
        <div className={`absolute inset-y-2 ${isRtl ? 'left-2' : 'right-2'}`}>
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className={`
              h-full px-6 rounded-full font-medium text-white shadow-md
              flex items-center gap-2 transition-all
              ${isLoading || !input.trim() 
                ? 'bg-gray-300 cursor-not-allowed' 
                : 'bg-brand-600 hover:bg-brand-700 hover:scale-105 active:scale-95'}
            `}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span className="hidden sm:inline">{t.analyzing}</span>
              </>
            ) : (
              <>
                <span>{t.analyzeBtn}</span>
                {isRtl ? <ArrowRight className="w-4 h-4 rotate-180" /> : <ArrowRight className="w-4 h-4" />}
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default DomainInput;