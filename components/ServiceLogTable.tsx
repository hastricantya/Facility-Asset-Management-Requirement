
import React from 'react';
import { ServiceRecord } from '../types';
import { Eye, Pencil, ChevronsUpDown, ChevronLeft, ChevronRight } from 'lucide-react';

interface Props {
  data: ServiceRecord[];
  onEdit?: (item: ServiceRecord) => void;
  onView?: (item: ServiceRecord) => void;
}

export const ServiceLogTable: React.FC<Props> = ({ data, onEdit, onView }) => {
  return (
    <div className="bg-white rounded border border-gray-200 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1200px] text-left border-collapse">
          <thead>
            <tr className="bg-white border-b border-gray-100 text-[10px] font-black text-gray-400 uppercase tracking-widest">
              <th className="p-4 group cursor-pointer hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  No Request
                  <ChevronsUpDown size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </th>
              <th className="p-4 group cursor-pointer hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  No Polisi
                  <ChevronsUpDown size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </th>
              <th className="p-4 group cursor-pointer hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  Tgl Request
                  <ChevronsUpDown size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </th>
              <th className="p-4 group cursor-pointer hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  Channel
                  <ChevronsUpDown size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </th>
              <th className="p-4 group cursor-pointer hover:bg-gray-50 transition-colors text-center">
                <div className="flex items-center justify-center gap-2">
                  Cabang
                  <ChevronsUpDown size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </th>
              <th className="p-4 group cursor-pointer hover:bg-gray-50 transition-colors text-center">
                <div className="flex items-center justify-center gap-2">
                  Status
                  <ChevronsUpDown size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </th>
              <th className="p-4 group cursor-pointer hover:bg-gray-50 transition-colors text-center">
                <div className="flex items-center justify-center gap-2">
                  Status Approval
                  <ChevronsUpDown size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </th>
              <th className="p-4 w-24 text-center"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-[12px] text-gray-700">
            {data.length > 0 ? (
                data.map((item) => (
                    <tr key={item.id} className="bg-white hover:bg-gray-50/50 transition-colors group">
                        <td className="p-4 font-medium text-gray-900">{item.id}</td>
                        <td className="p-4 font-bold text-gray-900">{item.noPolisi}</td>
                        <td className="p-4 text-gray-500">{item.tglRequest}</td>
                        <td className="p-4 text-gray-600 font-medium">{item.channel}</td>
                        <td className="p-4 text-center text-gray-600">{item.cabang}</td>
                        <td className="p-4 text-center">
                            <span className="px-3 py-1 bg-gray-100 text-gray-500 rounded-full text-[10px] font-bold">
                                {item.status}
                            </span>
                        </td>
                        <td className="p-4 text-center">
                            <div className="w-8 h-8 mx-auto rounded-full bg-gray-100 text-gray-300 flex items-center justify-center font-bold">
                                -
                            </div>
                        </td>
                        <td className="p-4">
                            <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button onClick={() => onView?.(item)} className="p-1.5 text-gray-300 hover:text-black transition-colors">
                                    <Eye size={18} />
                                </button>
                                <button onClick={() => onEdit?.(item)} className="p-1.5 text-gray-300 hover:text-black transition-colors">
                                    <Pencil size={18} />
                                </button>
                            </div>
                        </td>
                    </tr>
                ))
            ) : (
                <tr>
                    <td colSpan={8} className="p-20 text-center text-gray-400 italic">Belum ada data...</td>
                </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {/* Pagination Bar */}
      <div className="px-6 py-4 bg-white border-t border-gray-100 flex items-center justify-between">
            <div className="text-[11px] font-bold text-gray-400 uppercase">
                Showing 1 - {data.length} of <span className="text-gray-600">{data.length} Row(s)</span>
            </div>
            
            <div className="flex items-center gap-6">
                <div className="flex items-center gap-2 text-[11px] font-bold text-gray-400">
                    Row per page
                    <select className="border border-gray-200 rounded px-2 py-1 bg-white focus:outline-none focus:border-black text-gray-600">
                        <option>10</option>
                        <option>25</option>
                    </select>
                </div>
                
                <div className="flex items-center gap-1">
                     <button className="w-8 h-8 flex items-center justify-center rounded border border-gray-100 text-gray-300 hover:text-black transition-colors">
                        <ChevronLeft size={16} />
                     </button>
                     <div className="px-3 py-1 text-[11px] font-bold text-gray-600">1 / 1</div>
                     <button className="w-8 h-8 flex items-center justify-center rounded border border-gray-100 text-gray-300 hover:text-black transition-colors">
                        <ChevronRight size={16} />
                     </button>
                </div>
            </div>
      </div>
    </div>
  );
};
