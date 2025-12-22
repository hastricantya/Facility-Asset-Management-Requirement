
import React from 'react';
import { VehicleRecord } from '../types';
import { ChevronsUpDown, Eye, Pencil, ChevronsLeft, ChevronLeft, ChevronRight, ChevronsRight } from 'lucide-react';

interface Props {
  data: VehicleRecord[];
  onEdit?: (item: VehicleRecord) => void;
  onView?: (item: VehicleRecord) => void;
}

export const VehicleTable: React.FC<Props> = ({ data, onEdit, onView }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1200px] text-left border-collapse">
          <thead>
            <tr className="bg-white border-b border-gray-200 text-[11px] font-bold text-gray-500 uppercase tracking-tight">
              <th className="p-4 w-36 group cursor-pointer hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-2">
                  No Registrasi
                  <ChevronsUpDown size={14} className="text-gray-300" />
                </div>
              </th>
              <th className="p-4 group cursor-pointer hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-2">
                  Nama
                  <ChevronsUpDown size={14} className="text-gray-300" />
                </div>
              </th>
              <th className="p-4 w-40 group cursor-pointer hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-2">
                  No Polisi
                  <ChevronsUpDown size={14} className="text-gray-300" />
                </div>
              </th>
              <th className="p-4 w-48 group cursor-pointer hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-2">
                  Channel
                  <ChevronsUpDown size={14} className="text-gray-300" />
                </div>
              </th>
              <th className="p-4 w-36 group cursor-pointer hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-2">
                  Cabang
                  <ChevronsUpDown size={14} className="text-gray-300" />
                </div>
              </th>
              <th className="p-4 w-32 group cursor-pointer hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-2">
                  Status
                  <ChevronsUpDown size={14} className="text-gray-300" />
                </div>
              </th>
              <th className="p-4 w-32 text-center">
                 {/* Action Column */}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-[11px] text-gray-700">
            {data.map((item) => (
              <tr key={item.id} className="bg-white hover:bg-gray-50/50 transition-colors group">
                <td className="p-4 text-gray-500">{item.noRegistrasi}</td>
                <td className="p-4 font-medium text-gray-700 uppercase">{item.nama}</td>
                <td className="p-4 font-semibold text-gray-900">{item.noPolisi}</td>
                <td className="p-4 text-gray-600 uppercase">{item.channel}</td>
                <td className="p-4 text-gray-600">{item.cabang}</td>
                <td className="p-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-[9px] font-black uppercase ${
                        item.status === 'Aktif' 
                        ? 'bg-green-500 text-white' 
                        : 'bg-red-500 text-white'
                    }`}>
                        {item.status}
                    </span>
                </td>
                <td className="p-4">
                    <div className="flex items-center justify-center gap-2">
                        <button 
                          onClick={(e) => { e.stopPropagation(); onView?.(item); }}
                          className="p-1 text-black hover:text-gray-600 hover:bg-gray-100 rounded transition-all"
                        >
                            <Eye size={18} />
                        </button>
                        <button 
                          onClick={(e) => { e.stopPropagation(); onEdit?.(item); }}
                          className="p-1 text-black hover:text-gray-600 hover:bg-gray-100 rounded transition-all"
                        >
                            <Pencil size={18} />
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
                1 to {data.length} of <span className="text-gray-600">{data.length} items</span>
            </div>
            
            <div className="flex items-center gap-1">
                 <button className="w-8 h-8 flex items-center justify-center text-gray-300 hover:text-black transition-colors">
                    <ChevronLeft size={16} />
                 </button>
                 
                 <div className="flex gap-1">
                    <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-black bg-black text-white font-bold text-[11px]">1</button>
                    <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 font-medium text-[11px] hover:border-black hover:text-black">2</button>
                    <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 font-medium text-[11px] hover:border-black hover:text-black">3</button>
                    <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 font-medium text-[11px] hover:border-black hover:text-black">4</button>
                    <span className="w-8 h-8 flex items-center justify-center text-gray-300">...</span>
                    <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 font-medium text-[11px] hover:border-black hover:text-black">21</button>
                 </div>

                 <button className="w-8 h-8 flex items-center justify-center text-gray-300 hover:text-black transition-colors">
                    <ChevronRight size={16} />
                 </button>
            </div>
      </div>
    </div>
  );
};
