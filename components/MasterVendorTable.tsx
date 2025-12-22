
import React from 'react';
import { MasterVendorRecord } from '../types';
import { ChevronsUpDown, Eye, Pencil, Trash2, ChevronsLeft, ChevronLeft, ChevronRight, ChevronsRight } from 'lucide-react';

interface Props {
  data: MasterVendorRecord[];
  onEdit?: (item: MasterVendorRecord) => void;
  onView?: (item: MasterVendorRecord) => void;
  onDelete?: (id: number) => void;
}

export const MasterVendorTable: React.FC<Props> = ({ data, onEdit, onView, onDelete }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1400px] text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200 text-[11px] font-bold text-gray-500 uppercase tracking-widest">
              <th className="p-4 group cursor-pointer hover:bg-gray-100 transition-colors">
                <div className="flex items-center justify-between">
                  Nama
                  <ChevronsUpDown size={14} className="text-gray-400 group-hover:text-gray-700"/>
                </div>
              </th>
              <th className="p-4 group cursor-pointer hover:bg-gray-100 transition-colors">
                <div className="flex items-center justify-between">
                  Merek
                  <ChevronsUpDown size={14} className="text-gray-400 group-hover:text-gray-700"/>
                </div>
              </th>
              <th className="p-4 w-96 group cursor-pointer hover:bg-gray-100 transition-colors">
                <div className="flex items-center justify-between">
                  Alamat
                  <ChevronsUpDown size={14} className="text-gray-400 group-hover:text-gray-700"/>
                </div>
              </th>
              <th className="p-4 group cursor-pointer hover:bg-gray-100 transition-colors">
                <div className="flex items-center justify-between">
                  No Telp
                  <ChevronsUpDown size={14} className="text-gray-400 group-hover:text-gray-700"/>
                </div>
              </th>
              <th className="p-4 group cursor-pointer hover:bg-gray-100 transition-colors">
                <div className="flex items-center justify-between">
                  Tipe
                  <ChevronsUpDown size={14} className="text-gray-400 group-hover:text-gray-700"/>
                </div>
              </th>
              <th className="p-4 group cursor-pointer hover:bg-gray-100 transition-colors">
                <div className="flex items-center justify-between">
                  Cabang
                  <ChevronsUpDown size={14} className="text-gray-400 group-hover:text-gray-700"/>
                </div>
              </th>
              <th className="p-4 w-32 text-center uppercase tracking-widest">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-[12px] text-gray-700">
            {data.length > 0 ? (
                data.map((item) => (
                    <tr key={item.id} className="bg-white hover:bg-gray-50/50 transition-colors group">
                        <td className="p-4">
                            <div className="flex items-center gap-2">
                                <span className="font-black text-black">{item.nama}</span>
                                <span className={`inline-flex items-center px-2 py-0.5 rounded text-[8px] font-black uppercase border ${item.aktif ? 'bg-green-500 text-white border-green-600' : 'bg-gray-400 text-white border-gray-500'}`}>
                                    {item.aktif ? 'Active' : 'Inactive'}
                                </span>
                            </div>
                        </td>
                        <td className="p-4 font-bold text-gray-600">{item.merek || '-'}</td>
                        <td className="p-4 text-gray-500 font-medium truncate max-w-[300px]">{item.alamat}</td>
                        <td className="p-4 text-gray-600 font-mono font-bold tracking-tighter">{item.noTelp}</td>
                        <td className="p-4 text-gray-600 font-bold uppercase">{item.tipe}</td>
                        <td className="p-4 text-gray-600 font-bold">{item.cabang}</td>
                        <td className="p-4 text-center">
                            <div className="flex items-center justify-center gap-1">
                                <button 
                                  onClick={() => onView?.(item)}
                                  className="p-1.5 text-gray-300 hover:text-black transition-colors"
                                  title="View Detail"
                                >
                                    <Eye size={18} />
                                </button>
                                <button 
                                  onClick={() => onEdit?.(item)}
                                  className="p-1.5 text-gray-300 hover:text-black transition-colors"
                                  title="Edit Vendor"
                                >
                                    <Pencil size={18} />
                                </button>
                                <button 
                                  onClick={() => onDelete?.(item.id)}
                                  className="p-1.5 text-gray-300 hover:text-red-500 transition-colors"
                                  title="Delete Vendor"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </td>
                    </tr>
                ))
            ) : (
                <tr>
                    <td colSpan={7} className="p-20 text-center text-gray-400 italic font-bold uppercase tracking-widest opacity-20">
                        Belum ada vendor terdaftar
                    </td>
                </tr>
            )}
          </tbody>
        </table>
      </div>
      
      <div className="px-6 py-4 border-t border-gray-100 bg-white flex items-center justify-between">
            <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                Showing 1 - {data.length} of <span className="text-black">{data.length}</span> Row(s)
            </div>
            
            <div className="flex items-center gap-1">
                 <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-100 text-gray-300 hover:text-black transition-all">
                    <ChevronLeft size={16} />
                 </button>
                 <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-black text-white font-black text-[10px]">1</button>
                 <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-100 text-gray-300 hover:text-black transition-all">
                    <ChevronRight size={16} />
                 </button>
            </div>
      </div>
    </div>
  );
};
