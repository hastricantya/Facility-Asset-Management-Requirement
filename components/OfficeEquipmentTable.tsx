
import React, { useState } from 'react';
import { Search, Filter, FileUp, Plus, Eye, Pencil, ChevronDown, ChevronsUpDown, ChevronLeft, ChevronRight, Trash2 } from 'lucide-react';
import { OfficeAssetRecord } from '../types';

interface Props {
  data: OfficeAssetRecord[];
  onAddClick: () => void;
  onEdit: (item: OfficeAssetRecord) => void;
  onView: (item: OfficeAssetRecord) => void;
  onDelete: (id: string) => void;
}

export const OfficeEquipmentTable: React.FC<Props> = ({ data, onAddClick, onEdit, onView, onDelete }) => {
  const [activeTab, setActiveTab] = useState<'fixed' | 'low'>('fixed');

  return (
    <div className="flex flex-col gap-6">
      {/* Header with Title */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900 tracking-tight">List Assets Office</h2>
      </div>

      {/* Filter Header Section */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        {/* Left: Tabs */}
        <div className="flex bg-white rounded-lg border border-gray-200 p-1 shadow-sm h-11">
          <button
            onClick={() => setActiveTab('fixed')}
            className={`px-12 py-2 text-[11px] font-bold rounded-md transition-all whitespace-nowrap ${
              activeTab === 'fixed' ? 'bg-black text-white shadow-md' : 'text-gray-500 hover:text-black'
            }`}
          >
            Fixed Assets
          </button>
          <button
            onClick={() => setActiveTab('low')}
            className={`px-12 py-2 text-[11px] font-bold rounded-md transition-all whitespace-nowrap ${
              activeTab === 'low' ? 'bg-black text-white shadow-md' : 'text-gray-500 hover:text-black'
            }`}
          >
            Low Value Assets
          </button>
        </div>

        {/* Center: Search & Filter */}
        <div className="flex items-center gap-2 flex-1 max-w-xl">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
            <input
              type="text"
              placeholder="Search"
              className="w-full bg-white border border-gray-200 rounded-lg pl-9 pr-4 py-2.5 text-xs font-medium focus:border-black outline-none shadow-sm"
            />
          </div>
          <button className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-xs font-bold hover:bg-gray-50 shadow-sm">
            <Filter size={14} />
            Filter
          </button>
        </div>

        {/* Right: Action Buttons */}
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 bg-white border border-black rounded-lg px-6 py-2.5 text-[11px] font-bold hover:bg-gray-50 transition-all shadow-sm">
            <FileUp size={14} />
            Import Asset
          </button>
          <button 
            onClick={onAddClick}
            className="flex items-center gap-2 bg-black text-white rounded-lg px-6 py-2.5 text-[11px] font-bold hover:bg-gray-800 transition-all shadow-lg shadow-black/10"
          >
            <Plus size={14} />
            Add Data
          </button>
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full min-w-[1600px] text-left border-separate border-spacing-0">
            <thead>
              <tr className="bg-white border-b border-gray-100">
                <th className="p-4 border-b border-gray-100 text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center gap-1 cursor-pointer hover:text-black">
                    Asset Category <ChevronsUpDown size={12} className="text-gray-300" />
                  </div>
                </th>
                <th className="p-4 border-b border-gray-100 text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center gap-1 cursor-pointer hover:text-black">
                    Asset Number <ChevronsUpDown size={12} className="text-gray-300" />
                  </div>
                </th>
                <th className="p-4 border-b border-gray-100 text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center gap-1 cursor-pointer hover:text-black">
                    Brand <ChevronsUpDown size={12} className="text-gray-300" />
                  </div>
                </th>
                <th className="p-4 border-b border-gray-100 text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center gap-1 cursor-pointer hover:text-black">
                    Model <ChevronsUpDown size={12} className="text-gray-300" />
                  </div>
                </th>
                <th className="p-4 border-b border-gray-100 text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center gap-1 cursor-pointer hover:text-black">
                    Location <ChevronsUpDown size={12} className="text-gray-300" />
                  </div>
                </th>
                <th className="p-4 border-b border-gray-100 text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center gap-1 cursor-pointer hover:text-black">
                    Channel <ChevronsUpDown size={12} className="text-gray-300" />
                  </div>
                </th>
                <th className="p-4 border-b border-gray-100 text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                  Sub Location
                </th>
                <th className="p-4 border-b border-gray-100 text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center gap-1 cursor-pointer hover:text-black">
                    Purchase Date <ChevronsUpDown size={12} className="text-gray-300" />
                  </div>
                </th>
                <th className="p-4 border-b border-gray-100 text-[10px] font-bold text-gray-500 uppercase tracking-wider text-right">
                  <div className="flex items-center justify-end gap-1 cursor-pointer hover:text-black">
                    Price <ChevronsUpDown size={12} className="text-gray-300" />
                  </div>
                </th>
                <th className="p-4 border-b border-gray-100 text-[10px] font-bold text-gray-500 uppercase tracking-wider text-center">
                  <div className="flex items-center justify-center gap-1 cursor-pointer hover:text-black">
                    Status <ChevronsUpDown size={12} className="text-gray-300" />
                  </div>
                </th>
                <th className="p-4 border-b border-gray-100 text-[10px] font-bold text-gray-500 uppercase tracking-wider text-center">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="text-[11px] font-medium text-gray-700">
              {data.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="p-4 border-b border-gray-50">{item.category}</td>
                  <td className="p-4 border-b border-gray-50 font-mono text-gray-500">{item.assetNumber}</td>
                  <td className="p-4 border-b border-gray-50">{item.brand}</td>
                  <td className="p-4 border-b border-gray-50">{item.model}</td>
                  <td className="p-4 border-b border-gray-50">{item.location}</td>
                  <td className="p-4 border-b border-gray-50">{item.channel}</td>
                  <td className="p-4 border-b border-gray-50">{item.subLocation}</td>
                  <td className="p-4 border-b border-gray-50">{item.purchaseDate}</td>
                  <td className="p-4 border-b border-gray-50 text-right font-bold">{item.price}</td>
                  <td className="p-4 border-b border-gray-50 text-center">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-white text-[9px] font-black uppercase tracking-tighter ${item.status === 'Active' ? 'bg-green-500' : 'bg-gray-400'}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="p-4 border-b border-gray-50">
                    <div className="flex items-center justify-center gap-4">
                      <button onClick={() => onView(item)} className="text-gray-400 hover:text-black p-1 transition-colors">
                        <Eye size={16} />
                      </button>
                      <button onClick={() => onEdit(item)} className="text-gray-400 hover:text-black p-1 transition-colors">
                        <Pencil size={16} />
                      </button>
                      <button onClick={() => onDelete(item.id)} className="text-gray-400 hover:text-red-500 p-1 transition-colors">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="px-6 py-4 bg-white flex items-center justify-between border-t border-gray-100">
          <div className="text-[11px] font-bold text-gray-400">
            1 to {data.length} of <span className="text-gray-900">{data.length} items</span>
          </div>
          <div className="flex items-center gap-1">
            <button className="w-8 h-8 flex items-center justify-center text-gray-300 hover:text-black transition-colors disabled:opacity-30" disabled>
              <ChevronLeft size={16} />
            </button>
            <div className="flex gap-1">
              <button className="w-7 h-7 flex items-center justify-center rounded-md border border-black bg-black text-white font-bold text-[10px]">1</button>
            </div>
            <button className="w-8 h-8 flex items-center justify-center text-gray-300 hover:text-black transition-colors disabled:opacity-30" disabled>
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
