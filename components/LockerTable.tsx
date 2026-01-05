import React from 'react';
import { LockerRecord } from '../types';
import { ChevronsUpDown, Eye, Pencil, MapPin, Calendar, Lock, User, MoreHorizontal, ChevronLeft, ChevronRight, Briefcase, Building2, Key, Info } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface Props {
  data: LockerRecord[];
  onEdit?: (item: LockerRecord) => void;
  onView?: (item: LockerRecord) => void;
}

export const LockerTable: React.FC<Props> = ({ data, onEdit, onView }) => {
  const { t } = useLanguage();

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'Terisi': return 'bg-green-50 text-green-600 border-green-200';
      case 'Kosong': return 'bg-pink-50 text-pink-600 border-pink-200';
      case 'Kunci Hilang': return 'bg-orange-50 text-orange-600 border-orange-200';
      default: return 'bg-gray-100 text-gray-500 border-gray-200';
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 overflow-hidden">
      <div className="overflow-x-auto custom-scrollbar">
        <table className="w-full min-w-[1700px] text-left border-collapse">
          <thead>
            <tr className="bg-[#F2F2F2] border-b border-gray-200">
              <th className="p-5 w-14 text-center pl-8 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">No.</th>
              <th className="p-5 w-56 group cursor-pointer hover:bg-gray-100/50 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black text-black uppercase tracking-[0.15em]">Lokasi</span>
                  <ChevronsUpDown size={12} className="text-gray-300 group-hover:text-black transition-colors"/>
                </div>
              </th>
              <th className="p-5 w-44 group cursor-pointer hover:bg-gray-100/50 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black text-black uppercase tracking-[0.15em]">Nomor Loker</span>
                  <ChevronsUpDown size={12} className="text-gray-300 group-hover:text-black transition-colors"/>
                </div>
              </th>
              <th className="p-5 w-40 text-center text-[10px] font-black text-black uppercase tracking-[0.15em]">Status</th>
              <th className="p-5 w-64 group cursor-pointer hover:bg-gray-100/50 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black text-black uppercase tracking-[0.15em]">Nama Karyawan</span>
                  <ChevronsUpDown size={12} className="text-gray-300 group-hover:text-black transition-colors"/>
                </div>
              </th>
              <th className="p-5 w-64 group cursor-pointer hover:bg-gray-100/50 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black text-black uppercase tracking-[0.15em]">Position</span>
                  <ChevronsUpDown size={12} className="text-gray-300 group-hover:text-black transition-colors"/>
                </div>
              </th>
              <th className="p-5 w-64 group cursor-pointer hover:bg-gray-100/50 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black text-black uppercase tracking-[0.15em]">Departement</span>
                  <ChevronsUpDown size={12} className="text-gray-300 group-hover:text-black transition-colors"/>
                </div>
              </th>
              <th className="p-5 w-44 text-center group cursor-pointer hover:bg-gray-100/50 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black text-black uppercase tracking-[0.15em]">Tanggal Update</span>
                  <ChevronsUpDown size={12} className="text-gray-300 group-hover:text-black transition-colors"/>
                </div>
              </th>
              <th className="p-5 text-[10px] font-black text-black uppercase tracking-[0.15em]">Remarks</th>
              <th className="p-5 w-44 text-center group cursor-pointer hover:bg-gray-100/50 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black text-black uppercase tracking-[0.15em]">Kunci Cadangan</span>
                  <ChevronsUpDown size={12} className="text-gray-300 group-hover:text-black transition-colors"/>
                </div>
              </th>
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
                    <td className="p-5">
                       <div className="flex items-center gap-2">
                           <MapPin size={12} className="text-gray-400" />
                           <span className="font-black text-black uppercase tracking-tight">{item.location}</span>
                       </div>
                    </td>
                    <td className="p-5">
                       <div className="flex items-center gap-2">
                           <div className={`p-1.5 rounded-lg ${item.status === 'Terisi' ? 'bg-black text-white' : item.status === 'Kosong' ? 'bg-pink-100 text-pink-600' : 'bg-orange-100 text-orange-600'}`}>
                             <Lock size={14} />
                           </div>
                           <span className="font-mono font-black text-black text-[14px]">{item.lockerNumber}</span>
                       </div>
                    </td>
                    <td className="p-5 text-center">
                        <span className={`inline-flex items-center px-4 py-1.5 rounded text-[10px] font-black uppercase tracking-widest border border-dashed ${getStatusStyle(item.status)}`}>
                            {item.status}
                        </span>
                    </td>
                    <td className="p-5">
                        {item.employee ? (
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-400">
                                    <User size={14} />
                                </div>
                                <span className="font-black text-black text-[12px] uppercase tracking-tight italic">{item.employee.name}</span>
                            </div>
                        ) : (
                            <span className="text-gray-200 italic">-</span>
                        )}
                    </td>
                    <td className="p-5">
                        <span className="text-black font-bold uppercase leading-tight">{item.employee?.position || '-'}</span>
                    </td>
                    <td className="p-5">
                        <span className="text-gray-400 font-black uppercase tracking-tighter">{item.employee?.department || '-'}</span>
                    </td>
                    <td className="p-5 text-center">
                        <div className="flex items-center justify-center gap-2 text-gray-400 font-bold">
                            <Calendar size={12} />
                            {item.lastUpdate === '-' ? '-' : item.lastUpdate}
                        </div>
                    </td>
                    <td className="p-5">
                        <p className="text-gray-400 italic truncate max-w-[150px]">{item.remarks || '-'}</p>
                    </td>
                    <td className="p-5 text-center">
                        <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-tighter border shadow-sm
                            ${item.spareKey === 'Ada' ? 'bg-green-50 text-green-600 border-green-100' : 'bg-orange-50 text-orange-600 border-orange-100'}`}>
                            {item.spareKey === 'Ada' ? <Key size={10} /> : <Info size={10} />}
                            {item.spareKey}
                        </div>
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
                Inventory Summary: <span className="text-black ml-1">{data.length} Locker Units</span> defined
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