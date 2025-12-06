import React from 'react';
import { Globe, ShieldCheck } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../constants';

interface HeaderProps {
  language: Language;
  setLanguage: (lang: Language) => void;
}

const Header: React.FC<HeaderProps> = ({ language, setLanguage }) => {
  const t = TRANSLATIONS[language];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <div className="flex items-center gap-2">
            <div className="bg-brand-600 p-2 rounded-lg">
              <ShieldCheck className="w-6 h-6 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-gray-900 leading-none">
                DomainWorth<span className="text-brand-600">Pro</span>
              </span>
            </div>
          </div>

          {/* Language Selector */}
          <div className="flex items-center gap-3">
            <Globe className="w-4 h-4 text-gray-500" />
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as Language)}
              className="form-select block w-full pl-3 pr-8 py-1.5 text-base border-gray-300 focus:outline-none focus:ring-brand-500 focus:border-brand-500 sm:text-sm rounded-md bg-transparent cursor-pointer hover:bg-gray-50 transition-colors"
            >
              <option value={Language.ENGLISH}>English</option>
              <option value={Language.ARABIC}>العربية</option>
            </select>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;