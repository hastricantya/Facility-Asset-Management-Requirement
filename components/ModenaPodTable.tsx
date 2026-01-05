
import React from 'react';
import { ModenaPodRecord } from '../types';
import { ChevronsUpDown, Eye, Pencil, User, Calendar, Home, ChevronLeft, ChevronRight, Briefcase, Building2 } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface Props {
  data: ModenaPodRecord[];
  onEdit?: (item: ModenaPodRecord) => void;
  onView?: (item: ModenaPodRecord) => void;
}

export const ModenaPodTable: React.FC<Props> = ({ data, onEdit, onView }) => {
  const { t } = useLanguage();

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'Terpakai': return 'bg-green-500 text-white border-green-600 shadow-sm shadow-green-100';
      case 'Tidak Terpakai': return 'bg-red-500 text-white border-red-600 shadow-sm shadow-red-100';
      case 'Belum Dapat': return 'bg-orange-500 text-white border-orange-600 shadow-sm shadow-orange-100';
      case 'Extra Loker Terpakai': return 'bg-blue-500 text-white border-blue-600 shadow-sm shadow-blue-100';
      default: return 'bg-gray-100 text-gray-500 border-gray-200';
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 overflow-hidden transition-all duration-500">
      <div className="overflow-x-auto custom-scrollbar">
        <table className="w-full min-w-[1700px] text-left border-collapse">
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
                  <span className="text-[10px] font-black text-black uppercase tracking-[0.15em]">Jenis Kamar</span>
                  <ChevronsUpDown size={12} className="text-gray-300 group-hover:text-black transition-colors"/>
                </div>
              </th>
              <th className="p-5 w-32 group cursor-pointer hover:bg-gray-200/50 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black text-black uppercase tracking-[0.15em]">No. Kamar</span>
                  <ChevronsUpDown size={12} className="text-gray-300 group-hover:text-black transition-colors"/>
                </div>
              </th>
              <th className="p-5 w-64 group cursor-pointer hover:bg-gray-200/50 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black text-black uppercase tracking-[0.15em]">Penghuni</span>
                  <ChevronsUpDown size={12} className="text-gray-300 group-hover:text-black transition-colors"/>
                </div>
              </th>
              <th className="p-5 w-64 group cursor-pointer hover:bg-gray-200/50 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black text-black uppercase tracking-[0.15em]">Posisi / Departemen</span>
                  <ChevronsUpDown size={12} className="text-gray-300 group-hover:text-black transition-colors"/>
                </div>
              </th>
              <th className="p-5 w-40 text-center text-[10px] font-black text-black uppercase tracking-[0.15em]">Loker Barang</th>
              <th className="p-5 w-40 text-center text-[10px] font-black text-black uppercase tracking-[0.15em]">Loker Pantry</th>
              <th className="p-5 w-48 text-[10px] font-black text-black uppercase tracking-[0.15em]">Jadwal Laundry</th>
              <th className="p-5 text-[10px] font-black text-black uppercase tracking-[0.15em]">Keterangan</th>
              <th className="p-5 w-24 text-center text-[10px] font-black text-black uppercase tracking-[0.15em]">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 text-[11px]">
            {data.length > 0 ? (
                data.map((item, index) => (
                <tr 
                    key={item.id} 
                    onClick={() => onView?.(item)}
                    className="bg-white hover:bg-[#F8F9FA] transition-all group cursor-pointer"
                >
                    <td className="p-5 text-center font-bold text-gray-300 text-[11px] pl-8">{index + 1}</td>
                    <td className="p-5 font-black text-black uppercase">{item.lantai}</td>
                    <td className="p-5 text-gray-500 font-bold uppercase">{item.jenisKamar}</td>
                    <td className="p-5">
                       <div className="flex items-center gap-2">
                           <div className="p-1.5 rounded-lg bg-gray-100 text-gray-500">
                             <Home size={14} />
                           </div>
                           <span className="font-mono font-black text-black text-[14px]">{item.nomorKamar}</span>
                       </div>
                    </td>
                    <td className="p-5">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-400">
                                <User size={14} />
                            </div>
                            <div className="flex flex-col">
                                <span className="font-black text-black text-[13px] uppercase tracking-tight italic">{item.namaPenghuni}</span>
                                {item.isExpat && <span className="text-[8px] font-black text-blue-500 uppercase tracking-[0.1em] mt-0.5">(Expat)</span>}
                            </div>
                        </div>
                    </td>
                    <td className="p-5">
                        <div className="flex flex-col">
                            <span className="font-black text-black uppercase tracking-tight leading-tight">{item.posisi || '-'}</span>
                            <span className="text-[9px] text-gray-400 font-black uppercase tracking-widest mt-0.5">{item.departemen || '-'}</span>
                        </div>
                    </td>
                    <td className="p-5 text-center">
                        <span className={`inline-flex items-center px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-tighter border ${getStatusStyle(item.statusLokerBarang)}`}>
                            {item.statusLokerBarang}
                        </span>
                    </td>
                    <td className="p-5 text-center">
                        <span className={`inline-flex items-center px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-tighter border ${getStatusStyle(item.statusLokerPantry)}`}>
                            {item.statusLokerPantry}
                        </span>
                    </td>
                    <td className="p-5">
                        <div className="flex items-center gap-2 text-gray-400 font-bold">
                            <Calendar size={12} />
                            <span className="uppercase">{item.jadwalLaundry}</span>
                        </div>
                    </td>
                    <td className="p-5">
                        <p className="text-gray-400 italic truncate max-w-[150px]">{item.keterangan || '-'}</p>
                    </td>
                    <td className="p-5 text-center">
                        <div className="flex items-center justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button 
                                onClick={(e) => { e.stopPropagation(); onView?.(item); }}
                                className="text-gray-400 hover:text-black transition-all p-2 rounded-xl hover:bg-gray-100 active:scale-90"
                            >
                                <Eye size={18} />
                            </button>
                            <button 
                                onClick={(e) => { e.stopPropagation(); onEdit?.(item); }}
                                className="text-gray-400 hover:text-black transition-all p-2 rounded-xl hover:bg-gray-100 active:scale-90"
                            >
                                <Pencil size={18} />
                            </button>
                        </div>
                    </td>
                </tr>
                ))
            ) : (
                <tr>
                    <td colSpan={11} className="p-20 text-center text-gray-300 uppercase font-black text-[11px] tracking-widest italic">Belum ada data tersedia</td>
                </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {/* Pagination Footer */}
      <div className="px-8 py-6 bg-[#FAFAFA] border-t border-gray-100 flex items-center justify-between">
            <div className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
                Pod Census: <span className="text-black ml-1">{data.length} Units tracked</span>
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
