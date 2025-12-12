import React, { useState } from 'react';
import { Bell, ChevronDown } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface Props {
  breadcrumbs?: string[];
}

export const TopBar: React.FC<Props> = ({ breadcrumbs = ['Home', 'Asset Monitoring'] }) => {
  const { language, setLanguage } = useLanguage();
  const [isLangOpen, setIsLangOpen] = useState(false);

  const toggleLanguage = (lang: 'id' | 'en') => {
    setLanguage(lang);
    setIsLangOpen(false);
  };

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 sticky top-0 z-10 shadow-sm">
      <div className="flex items-center gap-2 text-sm text-gray-500">
         {breadcrumbs.map((item, index) => (
             <React.Fragment key={index}>
                 <span className="font-medium text-gray-900">{item}</span>
                 {index < breadcrumbs.length - 1 && <span>/</span>}
             </React.Fragment>
         ))}
      </div>

      <div className="flex items-center gap-6">
        {/* Language Switcher */}
        <div className="relative">
          <button 
            onClick={() => setIsLangOpen(!isLangOpen)}
            className="flex items-center gap-2 px-2 py-1 rounded hover:bg-gray-100 transition-colors border border-gray-200 min-w-[80px]"
          >
            {language === 'id' ? (
                <img src="https://flagcdn.com/w40/id.png" alt="Indonesia" className="w-6 h-auto rounded-sm object-cover" />
            ) : (
                <img src="https://flagcdn.com/w40/us.png" alt="English" className="w-6 h-auto rounded-sm object-cover" />
            )}
            <span className="text-xs font-semibold text-gray-600 uppercase">{language}</span>
            <ChevronDown size={14} className="text-gray-400" />
          </button>

          {isLangOpen && (
            <div className="absolute top-full right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-50">
                <button 
                  onClick={() => toggleLanguage('id')}
                  className={`w-full flex items-center gap-3 px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${language === 'id' ? 'bg-gray-50' : ''}`}
                >
                    <img src="https://flagcdn.com/w40/id.png" alt="Indonesia" className="w-6 h-auto rounded-sm object-cover" />
                    <span className="text-gray-700">Indonesia</span>
                </button>
                <button 
                  onClick={() => toggleLanguage('en')}
                  className={`w-full flex items-center gap-3 px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${language === 'en' ? 'bg-gray-50' : ''}`}
                >
                    <img src="https://flagcdn.com/w40/us.png" alt="English" className="w-6 h-auto rounded-sm object-cover" />
                    <span className="text-gray-700">English</span>
                </button>
            </div>
          )}
        </div>

        <div className="relative cursor-pointer">
          <Bell size={20} className="text-gray-400 hover:text-gray-600" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold px-1 rounded-full">99+</span>
        </div>
        
        <div className="h-8 w-[1px] bg-gray-200"></div>

        <div className="flex items-center gap-3 cursor-pointer">
          <div className="text-right hidden md:block">
            <p className="text-sm font-semibold text-gray-800">Muhammad Resa</p>
            <p className="text-xs text-gray-500">PT. Modena Indonesia</p>
          </div>
          <img 
            src="https://picsum.photos/id/1005/100/100" 
            alt="Profile" 
            className="w-10 h-10 rounded-full border border-gray-200 object-cover"
          />
          <ChevronDown size={16} className="text-gray-400" />
        </div>
      </div>
    </header>
  );
};