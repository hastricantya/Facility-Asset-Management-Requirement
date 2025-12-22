
import React from 'react';
import { Search, Filter, Plus, Download } from 'lucide-react';
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
  const isGedung = moduleName === 'Gedung';

  return (
    <div className="mb-6 space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-4">
        {/* Tabs - Pill style as in Image 1 */}
        <div className="flex bg-white rounded border border-gray-200 p-0.5 shadow-sm overflow-hidden">
          {tabs.map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => onTabChange(tab)}
                className={`px-8 py-2 text-[11px] font-bold transition-all rounded 
                ${isActive 
                  ? 'bg-black text-white shadow-sm' 
                  : 'text-black hover:bg-gray-50'
                }`}
              >
                {tab}
              </button>
            )
          })}
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
            <div className="relative w-72">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" size={16} />
                <input 
                    type="text" 
                    placeholder={searchPlaceholder || "Cari berdasarkan Karyawan, Barang..."} 
                    className="w-full bg-white pl-10 pr-4 py-2 text-[12px] border border-gray-200 rounded focus:border-black outline-none transition-all placeholder:text-gray-400"
                />
            </div>
            
            <button className="flex items-center gap-2 px-4 py-2 text-[12px] font-bold text-black bg-white border border-gray-200 rounded hover:bg-gray-50 transition-colors">
                Unduh <Download size={14} className="text-gray-600" />
            </button>
            
            <button className="flex items-center gap-2 px-4 py-2 text-[12px] font-bold text-black bg-white border border-gray-200 rounded hover:bg-gray-50 transition-colors">
                <Filter size={14} className="text-gray-600" />
                Saring
            </button>

            {!hideAdd && (
                <button 
                    onClick={onAddClick}
                    className="bg-black text-white px-5 py-2 rounded font-bold text-[12px] flex items-center gap-2 hover:bg-gray-800 transition-all active:scale-95 shadow-md shadow-black/10"
                >
                    <Plus size={18} /> {isGedung ? 'Tambah Aset' : 'Add Data'}
                </button>
            )}
        </div>
      </div>
    </div>
  );
};
