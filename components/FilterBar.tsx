
import React from 'react';
import { Search, Filter, Plus, Download, Upload } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface Props {
  tabs: string[];
  activeTab: string;
  onTabChange: (tab: string) => void;
  onAddClick: () => void;
  searchPlaceholder?: string;
  moduleName?: string;
  hideAdd?: boolean;
}

export const FilterBar: React.FC<Props> = ({ 
  tabs, 
  activeTab, 
  onTabChange, 
  onAddClick, 
  searchPlaceholder, 
  moduleName,
  hideAdd = false
}) => {
  const { t } = useLanguage();
  const isPajakKir = moduleName === 'Pajak & KIR';

  return (
    <div className="mb-6 space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-4">
        {/* Tabs - Pill style as in Image */}
        <div className="flex bg-white rounded-lg border border-gray-200 p-1 shadow-sm overflow-hidden">
          {tabs.map((tab) => {
            const isActive = activeTab === tab;
            const label = tab === 'Persetujuan' ? `${t('Persetujuan')} 0` : t(tab);
            return (
              <button
                key={tab}
                onClick={() => onTabChange(tab)}
                className={`px-6 py-2 text-[11px] font-bold transition-all rounded-md 
                ${isActive 
                  ? 'bg-black text-white' 
                  : 'text-gray-400 hover:text-black hover:bg-gray-50'
                }`}
              >
                {label}
              </button>
            )
          })}
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
            <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" size={14} />
                <input 
                    type="text" 
                    placeholder={t(searchPlaceholder || "Cari berdasarkan Karyawan, Barang...")} 
                    className="w-full bg-white pl-9 pr-4 py-2 text-[11px] border border-gray-200 rounded-md focus:border-black outline-none transition-all placeholder:text-gray-400"
                />
            </div>

            <button className="flex items-center gap-2 px-4 py-2 text-[11px] font-bold text-black bg-white border border-gray-200 rounded-md hover:bg-gray-50 transition-colors">
                <Upload size={14} /> {t('Impor')}
            </button>
            
            <button className="flex items-center gap-2 px-4 py-2 text-[11px] font-bold text-black bg-white border border-gray-200 rounded-md hover:bg-gray-50 transition-colors">
                <Download size={14} /> {t('Ekspor')}
            </button>
            
            <button className="flex items-center gap-2 px-4 py-2 text-[11px] font-bold text-black bg-white border border-gray-200 rounded-md hover:bg-gray-50 transition-colors">
                <Filter size={14} /> {t('Saring')}
            </button>

            {!hideAdd && (
                <button 
                    onClick={onAddClick}
                    className="bg-black text-white px-5 py-2 rounded-md font-bold text-[11px] flex items-center gap-2 hover:bg-gray-800 transition-all active:scale-95"
                >
                    <Plus size={16} /> {isPajakKir ? `+ ${t('Buat Permintaan')}` : t('Add Data')}
                </button>
            )}
        </div>
      </div>
    </div>
  );
};
