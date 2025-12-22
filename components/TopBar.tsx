
import React, { useState } from 'react';
import { Bell, ChevronDown, Menu } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface Props {
  breadcrumbs?: string[];
  onMenuClick?: () => void;
}

export const TopBar: React.FC<Props> = ({ breadcrumbs = ['Home', 'Asset Monitoring'], onMenuClick }) => {
  const { language, setLanguage } = useLanguage();
  const [isLangOpen, setIsLangOpen] = useState(false);

  const toggleLanguage = (lang: 'id' | 'en') => {
    setLanguage(lang);
    setIsLangOpen(false);
  };

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 md:px-8 sticky top-0 z-20 shadow-sm">
      <div className="flex items-center gap-3">
        {/* Hamburger Menu for Mobile */}
        <button 
          onClick={onMenuClick} 
          className="lg:hidden p-2 hover:bg-gray-100 rounded-lg text-gray-600"
        >
          <Menu size={20} />
        </button>

        <div className="hidden sm:flex items-center gap-2 text-xs md:text-sm text-gray-500 truncate max-w-[200px] md:max-w-none">
           {breadcrumbs.map((item, index) => (
               <React.Fragment key={index}>
                   <span className="font-medium text-gray-900 whitespace-nowrap">{item}</span>
                   {index < breadcrumbs.length - 1 && <span>/</span>}
               </React.Fragment>
           ))}
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-6">
        {/* Language Switcher - Simplified for Mobile */}
        <div className="relative">
          <button 
            onClick={() => setIsLangOpen(!isLangOpen)}
            className="flex items-center gap-1 md:gap-2 px-1.5 md:px-2 py-1 rounded hover:bg-gray-100 transition-colors border border-gray-200"
          >
            {language === 'id' ? (
                <img src="https://flagcdn.com/w40/id.png" alt="Indonesia" className="w-5 md:w-6 h-auto rounded-sm object-cover" />
            ) : (
                <img src="https://flagcdn.com/w40/us.png" alt="English" className="w-5 md:w-6 h-auto rounded-sm object-cover" />
            )}
            <span className="text-[10px] md:text-xs font-semibold text-gray-600 uppercase">{language}</span>
          </button>

          {isLangOpen && (
            <div className="absolute top-full right-0 mt-2 w-36 md:w-40 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-50">
                <button 
                  onClick={() => toggleLanguage('id')}
                  className="w-full flex items-center gap-3 px-4 py-2 text-sm hover:bg-gray-50"
                >
                    <img src="https://flagcdn.com/w40/id.png" alt="Indonesia" className="w-6 h-auto" />
                    <span>Indonesia</span>
                </button>
                <button 
                  onClick={() => toggleLanguage('en')}
                  className="w-full flex items-center gap-3 px-4 py-2 text-sm hover:bg-gray-50"
                >
                    <img src="https://flagcdn.com/w40/us.png" alt="English" className="w-6 h-auto" />
                    <span>English</span>
                </button>
            </div>
          )}
        </div>

        <div className="relative cursor-pointer p-1">
          <Bell size={18} className="text-gray-400" />
          <span className="absolute top-0 right-0 bg-red-500 text-white text-[8px] font-bold px-1 rounded-full">3</span>
        </div>
        
        <div className="h-6 w-[1px] bg-gray-200 mx-1 md:mx-0"></div>

        <div className="flex items-center gap-2 cursor-pointer">
          <img 
            src="https://picsum.photos/id/1005/100/100" 
            alt="Profile" 
            className="w-8 h-8 rounded-full border border-gray-200 object-cover"
          />
          <ChevronDown size={14} className="text-gray-400 hidden sm:block" />
        </div>
      </div>
    </header>
  );
};
