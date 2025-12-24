
import React from 'react';
import { LockerRecord } from '../types';
import { ChevronsUpDown, Eye, Pencil, MapPin, Calendar, Clock, Lock, User, MoreHorizontal, ChevronLeft, ChevronRight, Briefcase, Building2, Key } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface Props {
  data: LockerRecord[];
  onEdit?: (item: LockerRecord) => void;
  onView?: (item: LockerRecord) => void;
}

export const LockerTable: React.FC<Props> = ({ data, onEdit, onView }) => {
  const { t } = useLanguage();

  return (
    <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 overflow-hidden">
      <div className="overflow-x-auto custom-scrollbar">
        <table className="w-full min-w-[1500px] text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="p-5 w-14 text-center pl-8 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">#</th>
              <th className="p-5 w-44 group cursor-pointer hover:bg-gray-100/50 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black text-black uppercase tracking-[0.15em]">Locker No</span>
                  <ChevronsUpDown size={12} className="text-gray-300 group-hover:text-black transition-colors"/>
                </div>
              </th>
              <th className="p-5 w-56 group cursor-pointer hover:bg-gray-100/50 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black text-black uppercase tracking-[0.15em]">Floor / Location</span>
                  <ChevronsUpDown size={12} className="text-gray-300 group-hover:text-black transition-colors"/>
                </div>
              </th>
              <th className="p-5 w-72 group cursor-pointer hover:bg-gray-100/50 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black text-black uppercase tracking-[0.15em]">Occupant Details</span>
                  <ChevronsUpDown size={12} className="text-gray-300 group-hover:text-black transition-colors"/>
                </div>
              </th>
              <th className="p-5 w-64 group cursor-pointer hover:bg-gray-100/50 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black text-black uppercase tracking-[0.15em]">Position / Dept</span>
                  <ChevronsUpDown size={12} className="text-gray-300 group-hover:text-black transition-colors"/>
                </div>
              </th>
              <th className="p-5 w-32 text-center text-[10px] font-black text-black uppercase tracking-[0.15em]">Spare Key</th>
              <th className="p-5 w-36 text-center text-[10px] font-black text-black uppercase tracking-[0.15em]">Last Update</th>
              <th className="p-5 w-36 text-center text-[10px] font-black text-black uppercase tracking-[0.15em]">Status</th>
              <th className="p-5 w-24 text-center text-[10px] font-black text-black uppercase tracking-[0.15em]">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
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
                           <div className={`p-1.5 rounded-lg ${item.status === 'Terisi' ? 'bg-black text-white' : item.status === 'Kosong' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                             <Lock size={14} />
                           </div>
                           <span className="font-mono font-black text-black text-[14px]">{item.lockerNumber}</span>
                       </div>
                    </td>
                    <td className="p-5">
                        <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-2 text-gray-900">
                                <MapPin size={12} className="text-gray-400" />
                                <span className="font-black text-[12px] uppercase tracking-tight">{item.location}</span>
                            </div>
                            {item.subLocation !== '-' && (
                                <span className="text-[9px] font-bold text-blue-500 uppercase ml-5 px-1.5 py-0.5 bg-blue-50 border border-blue-100 rounded inline-block w-fit">
                                    {item.subLocation}
                                </span>
                            )}
                        </div>
                    </td>
                    <td className="p-5">
                        {item.employee ? (
                            <div className="flex items-center gap-3">
                                <img src={item.employee.avatar} className="w-10 h-10 rounded-full border border-gray-100 shadow-sm" />
                                <div>
                                    <div className="text-[13px] font-black text-black uppercase tracking-tight italic leading-tight">{item.employee.name}</div>
                                    <div className="text-[9px] text-gray-400 uppercase font-black tracking-widest mt-0.5">{item.employee.role}</div>
                                </div>
                            </div>
                        ) : (
                            <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest italic">BELUM TERISI</span>
                        )}
                    </td>
                    <td className="p-5">
                        {item.employee ? (
                            <div className="space-y-1">
                                <div className="flex items-center gap-2 text-[11px] font-bold text-gray-700">
                                    <Briefcase size={12} className="text-gray-400" />
                                    {item.employee.position || '-'}
                                </div>
                                <div className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-tighter">
                                    <Building2 size={12} className="text-gray-300" />
                                    {item.employee.department || '-'}
                                </div>
                            </div>
                        ) : (
                            <span className="text-gray-200">-</span>
                        )}
                    </td>
                    <td className="p-5 text-center">
                        <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-tighter border
                            ${item.spareKey === 'Ada' ? 'bg-gray-50 text-gray-600 border-gray-200' : 'bg-red-50 text-red-500 border-red-100'}`}>
                            <Key size={10} />
                            {item.spareKey}
                        </div>
                    </td>
                    <td className="p-5 text-center">
                        <div className="flex items-center justify-center gap-2 text-gray-400 font-bold text-[11px]">
                            <Calendar size={12} />
                            {item.lastUpdate}
                        </div>
                    </td>
                    <td className="p-5">
                        <div className="flex items-center justify-center">
                            <span className={`inline-flex items-center px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.1em] border shadow-sm
                                ${item.status === 'Kosong' ? 'bg-green-500 text-white border-green-600' : 
                                  item.status === 'Terisi' ? 'bg-black text-white border-black' : 
                                  'bg-red-500 text-white border-red-600'
                                }`}>
                                {item.status}
                            </span>
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
                    <td colSpan={9} className="p-20 text-center">
                        <div className="flex flex-col items-center justify-center opacity-30">
                            <Lock size={48} className="text-gray-400 mb-4" />
                            <p className="text-[11px] font-black uppercase tracking-widest">{t('No data available')}</p>
                        </div>
                    </td>
                </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {/* Pagination Footer */}
      <div className="px-8 py-6 bg-[#FAFAFA] border-t border-gray-100 flex items-center justify-between">
            <div className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
                Inventory Summary: <span className="text-black ml-1">{data.length} Units Tracked</span>
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
