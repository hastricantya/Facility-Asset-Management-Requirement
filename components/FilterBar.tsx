import React from 'react';
import { Search, Filter, Plus, LayoutGrid, List, ChevronsRight, Filter as FilterIcon, Calendar, Upload, Download, FileText } from 'lucide-react';

interface Props {
  tabs: string[];
  activeTab: string;
  onTabChange: (tab: string) => void;
  onAddClick: () => void;
  searchPlaceholder?: string;
  moduleName?: string;
}

export const FilterBar: React.FC<Props> = ({ tabs, activeTab, onTabChange, onAddClick, searchPlaceholder = "Search by Employee, Item...", moduleName }) => {
  
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
                                    {tab}
                                    {isApproval && (
                                        <span className={`text-xs font-bold px-1.5 rounded-full ${isActive ? 'bg-white text-black' : 'bg-gray-200 text-gray-600'}`}>0</span>
                                    )}
                                </button>
                            )
                        })}
                    </div>
                )}
                
                {/* If no tabs and not Master Vendor, show empty div to push search right? No, standard flex justify-between works. */}

                {/* Right Side: Search & Filter */}
                <div className={`flex items-center gap-3 w-full md:w-auto ${tabs.length === 0 ? 'flex-1' : ''}`}>
                    <div className={`relative ${tabs.length === 0 ? 'w-64' : 'flex-1 md:w-80'}`}>
                        <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
                        <input 
                            type="text" 
                            placeholder={searchPlaceholder} 
                            className="w-full bg-white pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-200 focus:border-gray-400 outline-none transition-all"
                        />
                    </div>

                    {/* Show Import/Export for Vehicle modules */}
                    {(moduleName === 'Daftar Aset' || moduleName === 'Servis' || moduleName === 'Pajak & KIR' || moduleName === 'Mutasi' || moduleName === 'Penjualan') && (
                        <>
                            <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors whitespace-nowrap">
                                <Upload size={16} />
                                Import
                            </button>
                            <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors whitespace-nowrap">
                                <Download size={16} />
                                Export
                            </button>
                        </>
                    )}

                     {moduleName === 'Contract' && (
                        <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors whitespace-nowrap">
                             Download
                             <Download size={16} /> 
                        </button>
                     )}
                     
                     {moduleName === 'Master Vendor' && (
                        <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors whitespace-nowrap">
                             <FileText size={16} />
                             Import Data Vendor
                        </button>
                     )}

                    <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors whitespace-nowrap">
                        <Filter size={16} />
                        Filter
                    </button>
                    <button 
                        onClick={onAddClick}
                        className={`flex items-center gap-2 px-4 py-2 text-sm font-medium text-white rounded-md transition-colors shadow-sm whitespace-nowrap bg-black hover:bg-gray-800`}
                    >
                        <Plus size={16} />
                        {(moduleName === 'Servis' || moduleName === 'Pajak & KIR' || moduleName === 'Mutasi' || moduleName === 'Penjualan') ? 'Buat Permintaan' : 
                         moduleName === 'Contract' ? 'Add Asset' : 
                         moduleName === 'Master Vendor' ? 'Tambah Vendor' : 'Tambah'}
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
                    
                    {/* Employment Status Group */}
                    <div className="flex-1 min-w-[300px]">
                        <div className="flex items-center gap-2 mb-2">
                             <div className="bg-black rounded-full p-1"><ChevronsRight size={12} className="text-white"/></div>
                             <span className="text-xs font-medium text-gray-500">Employment Status</span>
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
                                        {tab}
                                    </button>
                                )
                            })}
                        </div>
                    </div>

                    {/* Select Employee */}
                    <div className="flex-1">
                        <label className="block text-xs font-medium text-gray-500 mb-1">Select Employee</label>
                        <div className="relative">
                            <input 
                                type="text" 
                                placeholder="Select Employee" 
                                defaultValue="Alam Anugrah Akbar x + 13 ..."
                                className="w-full bg-white pl-4 pr-10 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-400 focus:border-gray-400 outline-none text-gray-700 h-[38px]"
                            />
                            <div className="absolute right-3 top-2 text-gray-400">
                                <FilterIcon size={16} />
                            </div>
                        </div>
                    </div>

                    {/* Select Date */}
                    <div className="flex-1">
                        <label className="block text-xs font-medium text-gray-500 mb-1">Select Date</label>
                        <div className="relative">
                            <input 
                                type="text" 
                                defaultValue="14/03/2024     →     15/03/2024"
                                className="w-full bg-white pl-4 pr-10 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-400 focus:border-gray-400 outline-none text-gray-700 h-[38px]"
                            />
                            <Calendar className="absolute right-3 top-2.5 text-gray-400" size={16} />
                        </div>
                    </div>

                    {/* Attendance Status */}
                    <div className="flex-1">
                        <label className="block text-xs font-medium text-gray-500 mb-1">Attendance Status</label>
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
    <div className="mb-6">
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
                    {tab}
                </button>
            )
        })}
      </div>

      {/* Filter Row Container - White Background */}
      <div className="bg-white p-5 rounded-b-lg rounded-tr-lg shadow-sm border border-gray-200 -mt-[1px] relative z-0">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
            <div className="md:col-span-3">
                <label className="block text-xs font-medium text-gray-500 mb-1">Search</label>
                <div className="relative">
                    <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
                    <input 
                    type="text" 
                    placeholder={searchPlaceholder} 
                    className="w-full bg-white pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-400 focus:border-gray-400 outline-none transition-all"
                    />
                </div>
            </div>

            <div className="md:col-span-3">
                <label className="block text-xs font-medium text-gray-500 mb-1">Date Range</label>
                <input 
                    type="date" 
                    className="w-full bg-white px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-400 text-gray-600 outline-none"
                />
            </div>

            <div className="md:col-span-3">
                <label className="block text-xs font-medium text-gray-500 mb-1">Category</label>
                <select className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-400 text-gray-600 outline-none bg-white">
                    <option>Select Category...</option>
                    <option>Tinta Printer</option>
                    <option>Kertas</option>
                    <option>Amplop</option>
                    <option>Mobil</option>
                </select>
            </div>

            <div className="md:col-span-3 flex items-center justify-end gap-2">
                <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    <Filter size={16} />
                    Filter
                </button>
                <button 
                  onClick={onAddClick}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-black rounded-lg hover:bg-gray-800 transition-colors shadow-sm"
                >
                    <Plus size={16} />
                    Tambah
                </button>
                <div className="flex border border-gray-300 rounded-lg overflow-hidden ml-2 bg-white">
                    <button className="p-2 bg-gray-100 text-gray-600 hover:bg-gray-200"><LayoutGrid size={16}/></button>
                    <button className="p-2 bg-white text-black border-l border-gray-200"><List size={16}/></button>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};