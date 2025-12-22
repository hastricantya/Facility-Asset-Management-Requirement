import React from 'react';
import { GeneralMasterItem } from '../types';
import { Pencil, Trash2, ChevronsLeft, ChevronLeft, ChevronRight, ChevronsRight, MoreHorizontal } from 'lucide-react';

interface Props {
  data: GeneralMasterItem[];
  onEdit: (item: GeneralMasterItem) => void;
  onDelete: (id: number) => void;
}

export const GeneralMasterTable: React.FC<Props> = ({ data, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-separate border-spacing-0">
          <thead>
            <tr className="bg-[#F2F2F2] border-b border-gray-200">
              <th className="p-5 w-20 text-center text-[10px] font-bold text-gray-500 uppercase tracking-widest border-b border-gray-200">No</th>
              <th className="p-5 text-[10px] font-bold text-gray-500 uppercase tracking-widest border-b border-gray-200">Nama Item</th>
              <th className="p-5 w-32 text-center text-[10px] font-bold text-gray-500 uppercase tracking-widest border-b border-gray-200">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-[12px] text-gray-700">
            {data.length > 0 ? (
                data.map((item, index) => (
                    <tr key={item.id} className="bg-white hover:bg-gray-50/50 transition-colors group">
                        <td className="p-5 text-center font-bold text-gray-400 border-r border-gray-50/50">{index + 1}</td>
                        <td className="p-5 font-bold text-black group-hover:pl-7 transition-all duration-300 uppercase tracking-tight">{item.name}</td>
                        <td className="p-5 text-center">
                            <div className="flex items-center justify-center gap-2">
                                <button 
                                    onClick={() => onEdit(item)}
                                    className="p-2 text-gray-300 hover:text-black hover:bg-gray-100 rounded-lg transition-all"
                                    title="Edit Item"
                                >
                                    <Pencil size={18} />
                                </button>
                                <button 
                                    onClick={() => onDelete(item.id)}
                                    className="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                                    title="Hapus Item"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </td>
                    </tr>
                ))
            ) : (
                <tr>
                    <td colSpan={3} className="p-20 text-center">
                        <div className="flex flex-col items-center justify-center opacity-30">
                            <MoreHorizontal size={48} className="text-gray-400 mb-4" />
                            <p className="text-[11px] font-black uppercase tracking-widest">Tidak ada data tersedia</p>
                        </div>
                    </td>
                </tr>
            )}
          </tbody>
        </table>
      </div>
       {/* Pagination Footer */}
       <div className="px-6 py-5 border-t border-gray-100 bg-white flex items-center justify-between">
            <div className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                Showing {data.length > 0 ? 1 : 0} - {data.length} of <span className="text-black">{data.length}</span> items
            </div>
            
            <div className="flex items-center gap-1">
                 <button className="w-8 h-8 flex items-center justify-center text-gray-300 hover:text-black transition-colors">
                    <ChevronLeft size={16} />
                 </button>
                 <div className="flex gap-1">
                    <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-black text-white font-bold text-[11px]">1</button>
                 </div>
                 <button className="w-8 h-8 flex items-center justify-center text-gray-300 hover:text-black transition-colors">
                    <ChevronRight size={16} />
                 </button>
            </div>
      </div>
    </div>
  );
};