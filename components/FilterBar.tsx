import React, { useState, useRef, useEffect } from 'react';
import { Search, Filter, Plus, Download, Calendar, MapPin, Tag, ChevronDown, X, Hash, User, Layers, FileSpreadsheet, Upload } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface Props {
  tabs: string[];
  activeTab: string;
  onTabChange: (tab: string) => void;
  onAddClick: () => void;
  onImportExcelClick?: () => void;
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

  // Stationery Request specific filters
  stationeryFilters?: {
    transactionId: string;
    requester: string;
    date: string;
  };
  onStationeryFilterChange?: (field: string, value: string) => void;

  // Master ATK/ARK specific filters
  masterFilters?: {
    category: string;
    partCode: string;
  };
  onMasterFilterChange?: (field: string, value: string) => void;
}

export const FilterBar: React.FC<Props> = ({ 
  tabs, 
  activeTab, 
  onTabChange, 
  onAddClick, 
  onImportExcelClick,
  searchPlaceholder, 
  moduleName,
  hideAdd = false,
  logBookFilters,
  onLogBookFilterChange,
  stationeryFilters,
  onStationeryFilterChange,
  masterFilters,
  onMasterFilterChange
}) => {
  const { t } = useLanguage();
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const isLogBook = moduleName === 'Log Book';
  const isMaster = moduleName?.includes('Master');
  const isStationeryModule = moduleName?.includes('ATK') || moduleName?.includes('ARK') || moduleName?.includes('Request') || moduleName?.includes('Approval');
  const isMasterATKARK = moduleName === 'Master ATK' || moduleName === 'Master ARK';

  const hasActiveStatFilters = stationeryFilters && (stationeryFilters.transactionId || stationeryFilters.requester || stationeryFilters.date);
  const hasActiveMasterFilters = masterFilters && (masterFilters.category || masterFilters.partCode);
  const hasAnyActiveFilters = hasActiveStatFilters || hasActiveMasterFilters;

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsFilterDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const resetFilters = () => {
    if (isMaster) {
      onMasterFilterChange?.('category', '');
      onMasterFilterChange?.('partCode', '');
    } else {
      onStationeryFilterChange?.('transactionId', '');
      onStationeryFilterChange?.('requester', '');
      onStationeryFilterChange?.('date', '');
    }
  };

  return (
    <div className="mb-8 space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-6">
        {/* Left Side: Tabs */}
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

          {/* Log Book inline filters preserved */}
          {isLogBook && logBookFilters && (
            <div className="flex items-center gap-3 bg-gray-100/50 p-1.5 rounded-2xl border border-gray-200 shadow-inner">
              <div className="relative group">
                <MapPin size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                <select 
                  className={`pl-9 pr-8 py-2.5 bg-white border border-gray-200 rounded-xl text-[10px] font-black uppercase tracking-widest outline-none focus:border-black transition-all appearance-none cursor-pointer shadow-sm ${logBookFilters.location ? 'text-black border-black' : 'text-gray-400'}`}
                  value={logBookFilters.location}
                  onChange={(e) => onLogBookFilterChange?.('location', e.target.value)}
                >
                  <option value="">{t('Semua Lokasi')}</option>
                  <option value="MODENA Head Office">MODENA Head Office</option>
                  <option value="MODENA Kemang">MODENA Kemang</option>
                  <option value="Warehouse Cakung">Warehouse Cakung</option>
                </select>
                <ChevronDown size={12} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300" />
              </div>
            </div>
          )}
        </div>

        {/* Right Side: Search & Actions */}
        <div className="flex items-center gap-3">
          {/* Excel Actions for Master ATK/ARK */}
          {isMasterATKARK && (
            <div className="flex items-center gap-2">
              <button 
                onClick={onImportExcelClick}
                className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-[10px] font-black text-black uppercase tracking-widest hover:bg-gray-50 transition-all shadow-sm active:scale-95"
                title="Import data from Excel"
              >
                <Upload size={16} />
                <span className="hidden sm:inline">IMPORT EXCEL</span>
              </button>
              <button 
                className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-[10px] font-black text-black uppercase tracking-widest hover:bg-gray-50 transition-all shadow-sm active:scale-95"
                title="Export data to Excel"
              >
                <FileSpreadsheet size={16} />
                <span className="hidden sm:inline">EXPORT EXCEL</span>
              </button>
            </div>
          )}

          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" size={16} />
            <input 
              type="text" 
              placeholder={searchPlaceholder || "Search records..."} 
              className="w-48 sm:w-64 bg-white pl-10 pr-4 py-2.5 text-[11px] font-bold border border-gray-200 rounded-xl focus:border-black outline-none transition-all placeholder:text-gray-300 shadow-sm"
            />
          </div>
          
          <div className="flex items-center bg-white border border-gray-200 rounded-xl shadow-sm relative">
            <button className="p-2.5 hover:bg-gray-50 border-r border-gray-100 text-gray-400 hover:text-black transition-all" title="Unduh Data">
              <Download size={18} />
            </button>
            <button 
              onClick={() => setIsFilterDropdownOpen(!isFilterDropdownOpen)}
              className={`p-2.5 hover:bg-gray-50 text-gray-400 hover:text-black transition-all ${isFilterDropdownOpen ? 'bg-gray-50 text-black' : ''} ${hasAnyActiveFilters ? 'text-blue-600' : ''}`} 
              title="Saring Lanjutan"
            >
              <Filter size={18} />
              {hasAnyActiveFilters && <div className="absolute top-1 right-1 w-2 h-2 bg-blue-600 rounded-full border-2 border-white"></div>}
            </button>

            {/* Filter Dropdown */}
            {isFilterDropdownOpen && (
              <div 
                ref={dropdownRef}
                className="absolute top-full right-0 mt-2 w-[320px] sm:w-[450px] bg-white rounded-lg shadow-[0_10px_40px_rgba(0,0,0,0.12)] border border-gray-200 z-[100] animate-in fade-in zoom-in-95 duration-150 origin-top-right overflow-hidden"
              >
                <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between bg-white">
                  <div className="flex items-center gap-2">
                    <Filter size={14} className="text-gray-400" />
                    <span className="text-[13px] font-semibold text-gray-700">Filter - {isMaster ? 'Master Data' : 'Request'}</span>
                  </div>
                  <button onClick={() => setIsFilterDropdownOpen(false)} className="text-gray-400 hover:text-gray-600">
                    <X size={16} />
                  </button>
                </div>

                <div className="p-4 space-y-4">
                  <div className="space-y-3">
                    {isMaster ? (
                      /* --- MASTER ATK/ARK FILTERS --- */
                      <>
                        {/* Kategori Filter */}
                        <div className="flex items-center gap-2">
                          <div className="flex-1 flex items-center gap-2 bg-gray-50 border border-gray-200 rounded px-3 py-2">
                            <Layers size={14} className="text-gray-400" />
                            <span className="text-[12px] font-bold text-gray-600 uppercase">Kategori</span>
                          </div>
                          <input 
                            type="text"
                            placeholder="Cari kategori..."
                            className="flex-[1.5] border border-gray-200 rounded px-3 py-2 text-[12px] focus:border-blue-400 outline-none"
                            value={masterFilters?.category}
                            onChange={(e) => onMasterFilterChange?.('category', e.target.value)}
                          />
                          <button className="p-2 text-yellow-500 border border-yellow-400 rounded hover:bg-yellow-50">
                            <Plus size={16} />
                          </button>
                        </div>

                        {/* Kode Part Filter */}
                        <div className="flex items-center gap-2">
                          <div className="flex-1 flex items-center gap-2 bg-gray-50 border border-gray-200 rounded px-3 py-2">
                            <Hash size={14} className="text-gray-400" />
                            <span className="text-[12px] font-bold text-gray-600 uppercase">Kode Part</span>
                          </div>
                          <input 
                            type="text"
                            placeholder="Filter value"
                            className="flex-[1.5] border border-gray-200 rounded px-3 py-2 text-[12px] focus:border-blue-400 outline-none"
                            value={masterFilters?.partCode}
                            onChange={(e) => onMasterFilterChange?.('partCode', e.target.value)}
                          />
                          <button className="p-2 text-yellow-500 border border-yellow-400 rounded hover:bg-yellow-50">
                            <Plus size={16} />
                          </button>
                        </div>
                      </>
                    ) : (
                      /* --- REQUEST FILTERS (Original) --- */
                      <>
                        <div className="flex items-center gap-2">
                          <select className="flex-1 bg-white border border-gray-200 rounded px-3 py-2 text-[12px] text-gray-600 outline-none appearance-none" value="transactionId" disabled>
                            <option value="transactionId">Nomor Transaksi</option>
                          </select>
                          <input 
                            type="text"
                            placeholder="Filter value"
                            className="flex-[1.5] border border-gray-200 rounded px-3 py-2 text-[12px] focus:border-blue-400 outline-none"
                            value={stationeryFilters?.transactionId}
                            onChange={(e) => onStationeryFilterChange?.('transactionId', e.target.value)}
                          />
                          <button className="p-2 text-yellow-500 border border-yellow-400 rounded hover:bg-yellow-50"><Plus size={16} /></button>
                        </div>

                        <div className="flex items-center gap-2">
                          <select className="flex-1 bg-white border border-gray-200 rounded px-3 py-2 text-[12px] text-gray-600 outline-none appearance-none" value="requester" disabled>
                            <option value="requester">Requester</option>
                          </select>
                          <input 
                            type="text"
                            placeholder="Filter value"
                            className="flex-[1.5] border border-gray-200 rounded px-3 py-2 text-[12px] focus:border-blue-400 outline-none"
                            value={stationeryFilters?.requester}
                            onChange={(e) => onStationeryFilterChange?.('requester', e.target.value)}
                          />
                          <button className="p-2 text-yellow-500 border border-yellow-400 rounded hover:bg-yellow-50"><Plus size={16} /></button>
                        </div>

                        <div className="flex items-center gap-2">
                          <select className="flex-1 bg-white border border-gray-200 rounded px-3 py-2 text-[12px] text-gray-600 outline-none appearance-none" value="date" disabled>
                            <option value="date">Tanggal</option>
                          </select>
                          <input 
                            type="date"
                            className="flex-[1.5] border border-gray-200 rounded px-3 py-2 text-[12px] focus:border-blue-400 outline-none"
                            value={stationeryFilters?.date}
                            onChange={(e) => onStationeryFilterChange?.('date', e.target.value)}
                          />
                          <button className="p-2 text-yellow-500 border border-yellow-400 rounded hover:bg-yellow-50"><Plus size={16} /></button>
                        </div>
                      </>
                    )}
                  </div>

                  <div className="pt-2 border-t border-gray-100 flex justify-start">
                    <button 
                      onClick={resetFilters}
                      className="flex items-center gap-1.5 px-3 py-1.5 text-red-500 border border-red-200 rounded text-[11px] font-semibold hover:bg-red-50 transition-colors"
                    >
                      <X size={14} className="stroke-[3]" /> Reset
                    </button>
                  </div>
                </div>
              </div>
            )}
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