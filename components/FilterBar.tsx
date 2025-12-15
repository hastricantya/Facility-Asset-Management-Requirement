
import React, { useState, useRef, useEffect } from 'react';
import { Search, Filter, Plus, LayoutGrid, List, ChevronsRight, Filter as FilterIcon, Calendar, Upload, Download, FileText, X, Trash2 } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export interface FilterItem {
  field: string;
  value: string;
}

interface Props {
  tabs: string[];
  activeTab: string;
  onTabChange: (tab: string) => void;
  onAddClick: () => void;
  searchPlaceholder?: string;
  moduleName?: string;
  // New props for dynamic filtering
  activeFilters?: FilterItem[];
  onFilterChange?: (filters: FilterItem[]) => void;
}

export const FilterBar: React.FC<Props> = ({ 
  tabs, 
  activeTab, 
  onTabChange, 
  onAddClick, 
  searchPlaceholder, 
  moduleName,
  activeFilters = [],
  onFilterChange
}) => {
  const { t } = useLanguage();
  const defaultSearch = `${t('Search')}...`;
  const actualSearchPlaceholder = searchPlaceholder || defaultSearch;

  // State for Filter Popover
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [tempField, setTempField] = useState('Category'); // Default to Category which is common
  const [tempValue, setTempValue] = useState('');
  const filterRef = useRef<HTMLDivElement>(null);

  // Close filter popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setIsFilterOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Update default tempField when module changes to avoid invalid fields
  useEffect(() => {
    if (moduleName === 'Daftar ATK' || moduleName === 'Stationery Request Approval' || moduleName === 'Daftar ARK' || moduleName === 'Household Request Approval') {
        setTempField('Employee Name');
    } else {
        setTempField('Category');
    }
  }, [moduleName]);

  const handleAddFilter = () => {
    if (tempValue.trim() === '' || !onFilterChange) return;
    const newFilter = { field: tempField, value: tempValue };
    onFilterChange([...activeFilters, newFilter]);
    setTempValue(''); // Clear input after adding
  };

  const handleRemoveFilter = (index: number) => {
    if (!onFilterChange) return;
    const newFilters = activeFilters.filter((_, i) => i !== index);
    onFilterChange(newFilters);
  };

  const handleResetFilter = () => {
    if (!onFilterChange) return;
    onFilterChange([]);
    setTempValue('');
  };

  // Handler for Date Input specific to ATK/ARK
  const handleDateFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!onFilterChange) return;
      const val = e.target.value;
      const others = activeFilters.filter(f => f.field !== 'Date');
      
      if (val) {
          onFilterChange([...others, { field: 'Date', value: val }]);
      } else {
          onFilterChange(others);
      }
  };
  
  // Specific layout for Daftar Aset (Vehicle), Servis, Pajak & KIR, Mutasi, Penjualan AND Contract (List Building)
  if (moduleName === 'Daftar Aset' || moduleName === 'Servis' || moduleName === 'Pajak & KIR' || moduleName === 'Mutasi' || moduleName === 'Penjualan' || moduleName === 'Contract' || moduleName === 'Master Vendor') {
    return (
        <div className="mb-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                {/* Tabs as Buttons - Only show if there are actual tabs (length > 1 or specific modules) */}
                {tabs.length > 0 && (
                    <div className="flex items-center border border-gray-300 rounded-md overflow-hidden bg-white">
                        {tabs.map((tab) => {
                            const isActive = activeTab === tab;
                            const isApproval = tab.includes('Persetujuan');
                            return (
                                <button
                                    key={tab}
                                    onClick={() => onTabChange(tab)}
                                    className={`px-8 py-2 text-sm font-semibold transition-colors flex items-center gap-2 ${
                                        isActive 
                                        ? 'bg-black text-white' 
                                        : 'bg-white text-gray-700 hover:bg-gray-50'
                                    }`}
                                >
                                    {t(tab)}
                                    {isApproval && (
                                        <span className={`text-xs font-bold px-1.5 rounded-full ${isActive ? 'bg-white text-black' : 'bg-gray-200 text-gray-600'}`}>0</span>
                                    )}
                                </button>
                            )
                        })}
                    </div>
                )}
                
                {/* Right Side: Search & Filter */}
                <div className={`flex items-center gap-3 w-full md:w-auto ${tabs.length === 0 ? 'flex-1' : ''}`}>
                    <div className={`relative ${tabs.length === 0 ? 'w-64' : 'flex-1 md:w-80'}`}>
                        <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
                        <input 
                            type="text" 
                            placeholder={actualSearchPlaceholder} 
                            className="w-full bg-white pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-200 focus:border-gray-400 outline-none transition-all"
                        />
                    </div>

                    {/* Show Import/Export for Vehicle modules */}
                    {(moduleName === 'Daftar Aset' || moduleName === 'Servis' || moduleName === 'Pajak & KIR' || moduleName === 'Mutasi' || moduleName === 'Penjualan') && (
                        <>
                            <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors whitespace-nowrap">
                                <Upload size={16} />
                                {t('Import')}
                            </button>
                            <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors whitespace-nowrap">
                                <Download size={16} />
                                {t('Export')}
                            </button>
                        </>
                    )}

                     {moduleName === 'Contract' && (
                        <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors whitespace-nowrap">
                             {t('Download')}
                             <Download size={16} /> 
                        </button>
                     )}
                     
                     {moduleName === 'Master Vendor' && (
                        <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors whitespace-nowrap">
                             <FileText size={16} />
                             {t('Import Data Vendor')}
                        </button>
                     )}

                    <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors whitespace-nowrap">
                        <Filter size={16} />
                        {t('Filter')}
                    </button>
                    <button 
                        onClick={onAddClick}
                        className={`flex items-center gap-2 px-4 py-2 text-sm font-medium text-white rounded-md transition-colors shadow-sm whitespace-nowrap bg-black hover:bg-gray-800`}
                    >
                        <Plus size={16} />
                        {(moduleName === 'Servis' || moduleName === 'Pajak & KIR' || moduleName === 'Mutasi' || moduleName === 'Penjualan') ? t('Create Request') : 
                         moduleName === 'Contract' ? t('Add Asset') : 
                         moduleName === 'Master Vendor' ? t('Add Vendor') : t('Add')}
                    </button>
                </div>
            </div>
        </div>
    );
  }

  // Specific layout for Timesheet module
  if (moduleName === 'Timesheet') {
    return (
        <div className="mb-6">
            <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
                <div className="flex flex-col md:flex-row gap-4 items-end">
                    {/* ... (Existing Timesheet Logic) ... */}
                    <div className="flex-1 min-w-[300px]">
                        <div className="flex items-center gap-2 mb-2">
                             <div className="bg-black rounded-full p-1"><ChevronsRight size={12} className="text-white"/></div>
                             <span className="text-xs font-medium text-gray-500">{t('Employment Status')}</span>
                        </div>
                        <div className="flex border border-gray-300 rounded-lg overflow-hidden h-[38px]">
                            {tabs.map((tab) => {
                                const isActive = activeTab === tab;
                                return (
                                    <button
                                        key={tab}
                                        onClick={() => onTabChange(tab)}
                                        className={`flex-1 text-sm font-medium transition-colors ${
                                            isActive ? 'bg-white text-black font-bold' : 'bg-white text-gray-400 hover:bg-gray-50'
                                        } ${isActive ? '' : 'border-r last:border-r-0 border-gray-200'}`}
                                    >
                                        {t(tab)}
                                    </button>
                                )
                            })}
                        </div>
                    </div>

                    <div className="flex-1">
                        <label className="block text-xs font-medium text-gray-500 mb-1">{t('Select Employee')}</label>
                        <div className="relative">
                            <input 
                                type="text" 
                                placeholder={t('Select Employee')} 
                                defaultValue="Alam Anugrah Akbar x + 13 ..."
                                className="w-full bg-white pl-4 pr-10 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-400 focus:border-gray-400 outline-none text-gray-700 h-[38px]"
                            />
                            <div className="absolute right-3 top-2 text-gray-400">
                                <FilterIcon size={16} />
                            </div>
                        </div>
                    </div>

                    <div className="flex-1">
                        <label className="block text-xs font-medium text-gray-500 mb-1">{t('Select Date')}</label>
                        <div className="relative">
                            <input 
                                type="text" 
                                defaultValue="14/03/2024     →     15/03/2024"
                                className="w-full bg-white pl-4 pr-10 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-400 focus:border-gray-400 outline-none text-gray-700 h-[38px]"
                            />
                            <Calendar className="absolute right-3 top-2.5 text-gray-400" size={16} />
                        </div>
                    </div>

                    <div className="flex-1">
                        <label className="block text-xs font-medium text-gray-500 mb-1">{t('Attendance Status')}</label>
                         <div className="relative">
                            <input 
                                type="text" 
                                defaultValue="Present x"
                                className="w-full bg-white pl-4 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-400 focus:border-gray-400 outline-none text-gray-700 h-[38px]"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
  }

  // Standard layout for ATK, ARK, Contract, etc.
  return (
    <div className="mb-6 relative">
      {/* Tabs */}
      <div className="flex items-center gap-1 px-1">
        {tabs.map((tab) => {
            const isActive = activeTab === tab;
            return (
                <button
                    key={tab}
                    onClick={() => onTabChange(tab)}
                    className={`px-6 py-2 text-sm font-medium rounded-t-lg transition-colors relative 
                    ${isActive 
                        ? 'text-gray-900 bg-white shadow-sm z-10 border-t border-l border-r border-gray-200' 
                        : 'text-gray-500 hover:text-gray-700 hover:bg-white/50 border-t border-l border-r border-transparent'
                    }`}
                >
                    {t(tab)}
                </button>
            )
        })}
      </div>

      {/* Filter Row Container - White Background */}
      <div className="bg-white p-5 rounded-b-lg rounded-tr-lg shadow-sm border border-gray-200 -mt-[1px] relative z-0">
        
        {/* Dynamic Filter UI for Daftar ATK & Master ATK & ARK */}
        {moduleName === 'Daftar ATK' || moduleName === 'Stationery Request Approval' || moduleName === 'Master ATK' || moduleName === 'Daftar ARK' || moduleName === 'Household Request Approval' || moduleName === 'Master ARK' ? (
           <div className="flex justify-between items-start">
              {/* Left Side: Search & Date */}
              <div className="flex items-center gap-3 w-1/2">
                  <div className="flex-1 relative">
                     <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
                     <input 
                        type="text" 
                        placeholder={actualSearchPlaceholder} 
                        className="w-full bg-white pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-200 focus:border-gray-400 outline-none transition-all"
                     />
                  </div>
                  {/* Date Input for ATK/ARK Requests */}
                  {(moduleName === 'Daftar ATK' || moduleName === 'Stationery Request Approval' || moduleName === 'Daftar ARK' || moduleName === 'Household Request Approval') && (
                      <div className="w-40">
                          <input 
                            type="date"
                            className="w-full bg-white px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-200 focus:border-gray-400 outline-none transition-all text-gray-500"
                            onChange={handleDateFilterChange}
                            value={activeFilters.find(f => f.field === 'Date')?.value || ''}
                          />
                      </div>
                  )}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-2 relative">
                
                {/* Filter Popover Container */}
                <div className="relative" ref={filterRef}>
                    <button 
                        onClick={() => setIsFilterOpen(!isFilterOpen)}
                        className={`flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors ${isFilterOpen ? 'bg-gray-50 border-gray-400' : ''}`}
                    >
                        <Filter size={16} />
                        {t('Filter')}
                        {activeFilters.length > 0 && (
                            <span className="bg-black text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full">
                                {activeFilters.length}
                            </span>
                        )}
                    </button>

                    {/* Filter Popup */}
                    {isFilterOpen && (
                        <div className="absolute right-0 top-12 w-[350px] bg-white rounded-lg shadow-xl border border-gray-200 z-50 animate-in fade-in zoom-in-95 duration-100">
                            {/* Header */}
                            <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
                                <div className="flex items-center gap-2 text-gray-700 font-semibold">
                                    <Filter size={16} />
                                    <span>Filter</span>
                                </div>
                                <button onClick={() => setIsFilterOpen(false)} className="text-gray-400 hover:text-gray-600">
                                    <X size={16} />
                                </button>
                            </div>

                            {/* Body */}
                            <div className="p-4 space-y-4">
                                <div className="flex gap-2">
                                    <div className="w-1/3">
                                        <select 
                                            className="w-full border border-gray-300 rounded px-2 py-2 text-sm focus:outline-none focus:border-black bg-white"
                                            value={tempField}
                                            onChange={(e) => setTempField(e.target.value)}
                                        >
                                            {/* Transaction Filters */}
                                            {(moduleName === 'Daftar ATK' || moduleName === 'Stationery Request Approval' || moduleName === 'Daftar ARK' || moduleName === 'Household Request Approval') && (
                                                <option value="Employee Name">Employee</option>
                                            )}
                                            
                                            {/* Common Filters */}
                                            <option value="Category">Kategori</option>
                                            <option value="Item Name">Jenis Barang</option>
                                            <option value="Item Code">Kode Barang</option>

                                            {/* Master Only Filters */}
                                            {(moduleName === 'Master ATK' || moduleName === 'Master ARK') && (
                                                <option value="UOM">UoM</option>
                                            )}
                                        </select>
                                    </div>
                                    <div className="flex-1">
                                        <input 
                                            type="text" 
                                            placeholder="Filter value" 
                                            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-black"
                                            value={tempValue}
                                            onChange={(e) => setTempValue(e.target.value)}
                                            onKeyDown={(e) => e.key === 'Enter' && handleAddFilter()}
                                        />
                                    </div>
                                    <button 
                                        onClick={handleAddFilter}
                                        className="w-9 h-9 flex items-center justify-center bg-yellow-400 hover:bg-yellow-500 text-white rounded transition-colors shadow-sm"
                                    >
                                        <Plus size={18} />
                                    </button>
                                </div>

                                {/* Active Filters */}
                                {activeFilters.length > 0 && (
                                    <div className="flex flex-wrap gap-2 pt-2 border-t border-gray-100">
                                        {activeFilters.map((filter, idx) => (
                                            <div key={idx} className="flex items-center gap-1 bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs border border-gray-200">
                                                <span className="font-semibold">{filter.field}:</span>
                                                <span>{filter.value}</span>
                                                <button onClick={() => handleRemoveFilter(idx)} className="hover:text-red-500 ml-1">
                                                    <X size={12} />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Footer */}
                            <div className="px-4 py-3 border-t border-gray-100 flex justify-center">
                                <button 
                                    onClick={handleResetFilter}
                                    className="flex items-center gap-2 text-red-500 hover:text-red-600 text-sm font-medium transition-colors border border-red-200 hover:bg-red-50 px-4 py-1.5 rounded"
                                >
                                    <X size={14} />
                                    Reset Filter
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                <button 
                  onClick={onAddClick}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-black rounded-lg hover:bg-gray-800 transition-colors shadow-sm"
                >
                    <Plus size={16} />
                    {t('Add')}
                </button>
              </div>
           </div>
        ) : (
        // DEFAULT STATIC LAYOUT FOR OTHER MODULES
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
            <div className="md:col-span-3">
                <label className="block text-xs font-medium text-gray-500 mb-1">{t('Search')}</label>
                <div className="relative">
                    <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
                    <input 
                    type="text" 
                    placeholder={actualSearchPlaceholder} 
                    className="w-full bg-white pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-400 focus:border-gray-400 outline-none transition-all"
                    />
                </div>
            </div>

            <div className="md:col-span-3">
                <label className="block text-xs font-medium text-gray-500 mb-1">{t('Date Range')}</label>
                <input 
                    type="date" 
                    className="w-full bg-white px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-400 text-gray-600 outline-none"
                />
            </div>

            <div className="md:col-span-3">
                <label className="block text-xs font-medium text-gray-500 mb-1">{t('Category')}</label>
                <select className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-400 text-gray-600 outline-none bg-white">
                    <option>{t('Select Category...')}</option>
                    <option>Tinta Printer</option>
                    <option>Kertas</option>
                    <option>Amplop</option>
                    <option>Mobil</option>
                </select>
            </div>

            <div className="md:col-span-3 flex items-center justify-end gap-2">
                <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    <Filter size={16} />
                    {t('Filter')}
                </button>
                <button 
                  onClick={onAddClick}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-black rounded-lg hover:bg-gray-800 transition-colors shadow-sm"
                >
                    <Plus size={16} />
                    {t('Add')}
                </button>
                <div className="flex border border-gray-300 rounded-lg overflow-hidden ml-2 bg-white">
                    <button className="p-2 bg-gray-100 text-gray-600 hover:bg-gray-200"><LayoutGrid size={16}/></button>
                    <button className="p-2 bg-white text-black border-l border-gray-200"><List size={16}/></button>
                </div>
            </div>
        </div>
        )}
      </div>
    </div>
  );
};
