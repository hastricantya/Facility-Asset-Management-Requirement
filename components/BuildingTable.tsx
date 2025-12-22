
import React from 'react';
import { BuildingRecord } from '../types';
import { ChevronsUpDown, Eye, Pencil, Building } from 'lucide-react';

interface Props {
  data: BuildingRecord[];
  onEdit?: (item: BuildingRecord) => void;
  onView?: (item: BuildingRecord) => void;
}

export const BuildingTable: React.FC<Props> = ({ data, onEdit, onView }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1200px] text-left border-separate border-spacing-0">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="p-4 border-b border-gray-200 text-[10px] font-bold text-gray-500 uppercase tracking-widest group cursor-pointer hover:bg-gray-100 transition-colors">
                <div className="flex items-center justify-between">
                  Name / Asset No
                  <ChevronsUpDown size={14} className="text-gray-300" />
                </div>
              </th>
              <th className="p-4 border-b border-gray-200 text-[10px] font-bold text-gray-500 uppercase tracking-widest group cursor-pointer hover:bg-gray-100 transition-colors">
                <div className="flex items-center justify-between">
                  Type
                  <ChevronsUpDown size={14} className="text-gray-300" />
                </div>
              </th>
              <th className="p-4 border-b border-gray-200 text-[10px] font-bold text-gray-500 uppercase tracking-widest group cursor-pointer hover:bg-gray-100 transition-colors">
                <div className="flex items-center justify-between">
                  Ownership
                  <ChevronsUpDown size={14} className="text-gray-300" />
                </div>
              </th>
              <th className="p-4 border-b border-gray-200 text-[10px] font-bold text-gray-500 uppercase tracking-widest group cursor-pointer hover:bg-gray-100 transition-colors">
                <div className="flex items-center justify-between">
                  Location (Branch)
                  <ChevronsUpDown size={14} className="text-gray-300" />
                </div>
              </th>
              <th className="p-4 border-b border-gray-200 text-[10px] font-bold text-gray-500 uppercase tracking-widest group cursor-pointer hover:bg-gray-100 transition-colors">
                <div className="flex items-center justify-between">
                  Address
                  <ChevronsUpDown size={14} className="text-gray-300" />
                </div>
              </th>
              <th className="p-4 border-b border-gray-200 text-[10px] font-bold text-gray-500 uppercase tracking-widest group cursor-pointer hover:bg-gray-100 transition-colors text-center">
                <div className="flex items-center justify-center gap-2">
                  Status
                  <ChevronsUpDown size={14} className="text-gray-300" />
                </div>
              </th>
              <th className="p-4 border-b border-gray-200 text-[10px] font-bold text-gray-500 uppercase tracking-widest text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-[11px]">
            {data.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50/50 transition-colors group">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-[#eef4ff] rounded-lg flex items-center justify-center text-[#4481eb]">
                        <Building size={18} />
                    </div>
                    <div>
                        <div className="font-bold text-black text-[12px]">{item.name}</div>
                        <div className="text-[10px] text-gray-400 font-mono tracking-tighter uppercase">{item.assetNo}</div>
                    </div>
                  </div>
                </td>
                <td className="p-4 text-gray-600 font-medium">{item.type}</td>
                <td className="p-4">
                    <span className={`inline-flex px-3 py-1 rounded-md text-[9px] font-bold border ${
                        item.ownership === 'Own' 
                        ? 'bg-[#f5f0ff] text-[#9333ea] border-[#e9d5ff]' 
                        : 'bg-[#fff7ed] text-[#ea580c] border-[#ffedd5]'
                    }`}>
                        {item.ownership}
                    </span>
                </td>
                <td className="p-4 text-gray-600 font-medium">{item.location}</td>
                <td className="p-4 text-gray-600 max-w-[250px] truncate">{item.address}</td>
                <td className="p-4 text-center">
                    <span className="bg-[#f3f4f6] text-[#6b7280] px-4 py-1 rounded-full text-[10px] font-bold">
                        {item.status}
                    </span>
                </td>
                <td className="p-4">
                  <div className="flex items-center justify-center gap-3">
                    <button onClick={() => onView?.(item)} className="text-gray-300 hover:text-black transition-colors">
                        <Eye size={18} />
                    </button>
                    <button onClick={() => onEdit?.(item)} className="text-gray-300 hover:text-black transition-colors">
                        <Pencil size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="px-6 py-4 bg-white border-t border-gray-100 flex items-center text-[11px] font-bold text-gray-400">
          Showing 1 - {data.length} of {data.length} Row(s)
      </div>
    </div>
  );
};
