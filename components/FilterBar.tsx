
import React from 'react';
import { Search, Filter, Plus, Download, Calendar, MapPin, Tag, ChevronDown } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface Props {
  tabs: string[];
  activeTab: string;
  onTabChange: (tab: string) => void;
  onAddClick: () => void;
  searchPlaceholder?: string;
  moduleName?: string;
  hideAdd?: boolean;
  
  // Log Book specific filters
  logBookFilters?: {
    location: string;
    category: string;
    date: string;
  };
  onLogBookFilterChange?: (field: string, value: string) => void;
}

export const FilterBar: React.FC<Props> = ({ 
  tabs, 
  activeTab, 
  onTabChange, 
  onAddClick, 
  searchPlaceholder, 
  moduleName,
  hideAdd = false,
  logBookFilters,
  onLogBookFilterChange
}) => {
  const { t } = useLanguage();
  const isLogBook = moduleName === 'Log Book';

  return (
    <div className="mb-8 space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-4">
        {/* Left Side: Tabs or Specific Filters */}
        <div className="flex items-center gap-4 flex-wrap">
          {tabs.length > 0 && (
            <div className="flex bg-white rounded-xl border border-gray-200 p-1 shadow-sm overflow-hidden">
              {tabs.map((tab) => {
                const isActive = activeTab === tab;
                return (
                  <button
                    key={tab}
                    onClick={() => onTabChange(tab)}
                    className={`px-6 py-2 text-[10px] font-black uppercase tracking-widest transition-all rounded-lg 
                    ${isActive 
                      ? 'bg-black text-white shadow-lg shadow-black/10' 
                      : 'text-gray-400 hover:text-black hover:bg-gray-50'
                    }`}
                  >
                    {tab}
                  </button>
                )
              })}
            </div>
          )}

          {isLogBook && logBookFilters && (
            <div className="flex items-center gap-3">
              {/* Location Filter */}
              <div className="relative group">
                <MapPin size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-black transition-colors" />
                <select 
                  className="pl-9 pr-8 py-2.5 bg-white border border-gray-200 rounded-xl text-[10px] font-black uppercase tracking-widest outline-none focus:border-black transition-all appearance-none cursor-pointer"
                  value={logBookFilters.location}
                  onChange={(e) => onLogBookFilterChange?.('location', e.target.value)}
                >
                  <option value="">{t('Semua Lokasi')}</option>
                  <option value="MODENA Head Office">MODENA Head Office</option>
                  <option value="MODENA Kemang">MODENA Kemang</option>
                  <option value="MODENA Suryo">MODENA Suryo</option>
                  <option value="Warehouse Cakung">Warehouse Cakung</option>
                </select>
                <ChevronDown size={12} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>

              {/* Category Filter */}
              <div className="relative group">
                <Tag size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-black transition-colors" />
                <select 
                  className="pl-9 pr-8 py-2.5 bg-white border border-gray-200 rounded-xl text-[10px] font-black uppercase tracking-widest outline-none focus:border-black transition-all appearance-none cursor-pointer"
                  value={logBookFilters.category}
                  onChange={(e) => onLogBookFilterChange?.('category', e.target.value)}
                >
                  <option value="">{t('Semua Kategori')}</option>
                  <option value="Customer">Customer</option>
                  <option value="Supplier">Supplier</option>
                  <option value="Partner">Partner</option>
                  <option value="Other">Other</option>
                </select>
                <ChevronDown size={12} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>

              {/* Date Filter */}
              <div className="relative group">
                <Calendar size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-black transition-colors" />
                <input 
                  type="date"
                  className="pl-9 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-[10px] font-black uppercase tracking-widest outline-none focus:border-black transition-all cursor-pointer"
                  value={logBookFilters.date}
                  onChange={(e) => onLogBookFilterChange?.('date', e.target.value)}
                />
              </div>
            </div>
          )}
        </div>

        {/* Right Side: Search & Actions */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" size={16} />
            <input 
              type="text" 
              placeholder={searchPlaceholder || "Search records..."} 
              className="w-64 bg-white pl-10 pr-4 py-2.5 text-[11px] font-bold border border-gray-200 rounded-xl focus:border-black outline-none transition-all placeholder:text-gray-300 shadow-sm"
            />
          </div>
          
          <div className="flex items-center bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
            <button className="p-2.5 hover:bg-gray-50 border-r border-gray-100 text-gray-400 hover:text-black transition-all" title="Unduh Data">
              <Download size={18} />
            </button>
            <button className="p-2.5 hover:bg-gray-50 text-gray-400 hover:text-black transition-all" title="Saring Lanjutan">
              <Filter size={18} />
            </button>
          </div>

          {!hideAdd && (
            <button 
              onClick={onAddClick}
              className="bg-black text-white px-6 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-[0.15em] flex items-center gap-2 hover:bg-gray-800 transition-all active:scale-95 shadow-xl shadow-black/10"
            >
              <Plus size={18} /> {t('Add Data')}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
