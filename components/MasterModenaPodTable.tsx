
import React from 'react';
import { MasterPodRecord } from '../types';
import { ChevronsUpDown, ChevronLeft, ChevronRight, Edit3, Home, Users, Info, Settings } from 'lucide-react';

interface Props {
  data: MasterPodRecord[];
  onEdit?: (item: MasterPodRecord) => void;
}

export const MasterModenaPodTable: React.FC<Props> = ({ data, onEdit }) => {
  return (
    <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 overflow-hidden transition-all duration-500">
      <div className="overflow-x-auto custom-scrollbar">
        <table className="w-full min-w-[1200px] text-left border-collapse">
          <thead>
            <tr className="bg-[#F2F2F2] border-b border-gray-200">
              <th className="p-5 w-14 text-center pl-8 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">#</th>
              <th className="p-5 w-40 group cursor-pointer hover:bg-gray-200/50 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black text-black uppercase tracking-[0.15em]">Lantai</span>
                  <ChevronsUpDown size={12} className="text-gray-300 group-hover:text-black transition-colors"/>
                </div>
              </th>
              <th className="p-5 w-40 group cursor-pointer hover:bg-gray-200/50 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black text-black uppercase tracking-[0.15em]">No. Kamar</span>
                  <ChevronsUpDown size={12} className="text-gray-300 group-hover:text-black transition-colors"/>
                </div>
              </th>
              <th className="p-5 w-40 group cursor-pointer hover:bg-gray-200/50 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black text-black uppercase tracking-[0.15em]">Jenis Kamar</span>
                  <ChevronsUpDown size={12} className="text-gray-300 group-hover:text-black transition-colors"/>
                </div>
              </th>
              <th className="p-5 w-32 text-center text-[10px] font-black text-black uppercase tracking-[0.15em]">Kapasitas</th>
              <th className="p-5 text-[10px] font-black text-black uppercase tracking-[0.15em]">Fasilitas</th>
              <th className="p-5 w-36 text-center text-[10px] font-black text-black uppercase tracking-[0.15em]">Status</th>
              <th className="p-5 w-24 text-center text-[10px] font-black text-black uppercase tracking-[0.15em]">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 text-[11px]">
            {data.length > 0 ? (
                data.map((item, index) => (
                <tr 
                    key={item.id} 
                    className="bg-white hover:bg-[#F8F9FA] transition-all group cursor-pointer"
                    onClick={() => onEdit?.(item)}
                >
                    <td className="p-5 text-center font-bold text-gray-300 text-[11px] pl-8">{index + 1}</td>
                    <td className="p-5 font-black text-black uppercase">{item.lantai}</td>
                    <td className="p-5">
                       <div className="flex items-center gap-2">
                           <div className="p-1.5 rounded-lg bg-gray-100 text-gray-500">
                             <Home size={14} />
                           </div>
                           <span className="font-mono font-black text-black text-[14px]">{item.nomorKamar}</span>
                       </div>
                    </td>
                    <td className="p-5 text-gray-500 font-bold uppercase">{item.jenisKamar}</td>
                    <td className="p-5 text-center">
                        <div className="flex flex-col items-center">
                            <span className="font-black text-black text-[14px]">{item.kapasitas}</span>
                            <span className="text-[8px] font-black text-gray-400 uppercase tracking-widest">Beds</span>
                        </div>
                    </td>
                    <td className="p-5">
                        <div className="flex flex-wrap gap-1.5">
                            {item.fasilitas.map((f, i) => (
                                <span key={i} className="px-2 py-0.5 bg-gray-50 text-gray-500 text-[9px] font-black uppercase tracking-tighter rounded border border-gray-100">
                                    {f}
                                </span>
                            ))}
                        </div>
                    </td>
                    <td className="p-5 text-center">
                        <span className={`inline-flex items-center px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-tighter border ${
                            item.status === 'Active' ? 'bg-green-50 text-green-600 border-green-100' :
                            item.status === 'Maintenance' ? 'bg-orange-50 text-orange-600 border-orange-100' :
                            'bg-red-50 text-red-600 border-red-100'
                        }`}>
                            {item.status}
                        </span>
                    </td>
                    <td className="p-5 text-center">
                        <div className="flex items-center justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button 
                                onClick={(e) => { e.stopPropagation(); onEdit?.(item); }}
                                className="text-gray-400 hover:text-black transition-all p-2 rounded-xl hover:bg-gray-100 active:scale-90"
                            >
                                <Edit3 size={18} />
                            </button>
                        </div>
                    </td>
                </tr>
                ))
            ) : (
                <tr>
                    <td colSpan={8} className="p-20 text-center text-gray-300 uppercase font-black text-[11px] tracking-widest italic">Belum ada data tersedia</td>
                </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {/* Pagination Footer */}
      <div className="px-8 py-6 bg-[#FAFAFA] border-t border-gray-100 flex items-center justify-between">
            <div className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
                Master Records: <span className="text-black ml-1">{data.length} Room configurations</span> defined
            </div>
            
            <div className="flex items-center gap-2">
                 <button className="w-10 h-10 flex items-center justify-center rounded-xl border border-gray-200 hover:border-black text-gray-300 hover:text-black transition-all bg-white shadow-sm active:scale-95">
                    <ChevronLeft size={16} />
                 </button>
                 <div className="bg-black text-white w-10 h-10 flex items-center justify-center rounded-xl font-black text-[11px] shadow-xl shadow-black/20">1</div>
                 <button className="w-10 h-10 flex items-center justify-center rounded-xl border border-gray-200 hover:border-black text-gray-300 hover:text-black transition-all bg-white shadow-sm active:scale-95">
                    <ChevronRight size={16} />
                 </button>
            </div>
      </div>
    </div>
  );
};
