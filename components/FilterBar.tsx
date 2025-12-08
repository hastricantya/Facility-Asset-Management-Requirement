import React from 'react';
import { Search, Filter, Plus, LayoutGrid, List } from 'lucide-react';

interface Props {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onAddClick: () => void;
}

export const FilterBar: React.FC<Props> = ({ activeTab, onTabChange, onAddClick }) => {
  const tabs = ['Pengguna', 'Master ATK', 'All'];

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
                    placeholder="Search by Employee, Item..." 
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
