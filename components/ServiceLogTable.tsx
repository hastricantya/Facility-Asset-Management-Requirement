import React from 'react';
import { ServiceRecord } from '../types';
import { Eye, Pencil, ChevronsUpDown, ChevronLeft, ChevronRight, Wrench, Clock, MapPin, FolderOpen } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface Props {
  data: ServiceRecord[];
  onEdit?: (item: ServiceRecord) => void;
  onView?: (item: ServiceRecord) => void;
}

export const ServiceLogTable: React.FC<Props> = ({ data, onEdit, onView }) => {
  const { t } = useLanguage();

  const TableHeader = ({ label, className = "" }: { label: string, className?: string }) => (
    <th className={`p-4 group cursor-pointer hover:bg-gray-50 transition-colors border-b border-gray-100 ${className}`}>
      <div className={`flex items-center gap-2 ${className.includes('right') ? 'justify-end' : className.includes('center') ? 'justify-center' : 'justify-between'}`}>
        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{label}</span>
        <ChevronsUpDown size={12} className="text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
    </th>
  );

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden min-h-[500px] flex flex-col">
      <div className="overflow-x-auto flex-1">
        <table className="w-full min-w-[1200px] text-left border-collapse">
          <thead>
            <tr className="bg-white">
              <TableHeader label="No Request" />
              <TableHeader label="Unit & No Polisi" />
              <TableHeader label="Odometer" />
              <TableHeader label="Bengkel / Vendor" />
              <TableHeader label="Total Biaya" className="text-right" />
              <TableHeader label="Status" className="text-center" />
              <th className="p-4 border-b border-gray-100 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 text-[11px] text-gray-700">
            {data.length > 0 ? (
                data.map((item) => (
                    <tr key={item.id} className="bg-white hover:bg-gray-50/50 transition-colors group">
                        <td className="p-4">
                            <div className="font-bold text-gray-900">{item.id}</div>
                            <div className="text-[10px] text-gray-400 font-medium">{item.tglRequest}</div>
                        </td>
                        <td className="p-4">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-gray-50 rounded-lg text-black border border-gray-100">
                                    <Wrench size={16} />
                                </div>
                                <div>
                                    <div className="font-black text-gray-900 uppercase">{item.noPolisi}</div>
                                    <div className="text-[10px] text-gray-400 font-bold uppercase">{item.aset || '-'}</div>
                                </div>
                            </div>
                        </td>
                        <td className="p-4 font-black text-black/60">
                            {item.kmKendaraan ? `${item.kmKendaraan} KM` : '-'}
                        </td>
                        <td className="p-4">
                            <div className="flex items-center gap-2 text-gray-500 font-bold">
                                <MapPin size={12} className="text-gray-300" />
                                {item.vendor || '-'}
                            </div>
                        </td>
                        <td className="p-4 text-right font-black text-black">
                            Rp {item.estimasiBiaya ? parseInt(item.estimasiBiaya).toLocaleString('id-ID') : '0'}
                        </td>
                        <td className="p-4 text-center">
                            <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase border ${
                                item.status === 'Draf' || item.status === 'Draft' || item.status === 'Proses'
                                ? 'bg-gray-100 text-gray-500 border-gray-200'
                                : 'bg-black text-white border-black shadow-sm'
                            }`}>
                                {item.status}
                            </span>
                        </td>
                        <td className="p-4">
                            <div className="flex items-center justify-center gap-1">
                                <button onClick={() => onView?.(item)} className="p-2 text-gray-300 hover:text-black transition-all rounded-lg hover:bg-gray-100">
                                    <Eye size={18} />
                                </button>
                                <button onClick={() => onEdit?.(item)} className="p-2 text-gray-300 hover:text-black transition-all rounded-lg hover:bg-gray-100">
                                    <Pencil size={18} />
                                </button>
                            </div>
                        </td>
                    </tr>
                ))
            ) : null}
          </tbody>
        </table>

        {data.length === 0 && (
          <div className="flex-1 flex flex-col items-center justify-center py-32 bg-white">
            <div className="w-24 h-24 bg-gray-50 rounded-2xl flex items-center justify-center mb-6 border border-gray-100 relative">
               <div className="absolute inset-0 bg-gray-100/50 rounded-2xl scale-110 -z-10 blur-sm"></div>
               <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                  <FolderOpen size={40} className="text-gray-300" />
               </div>
            </div>
            <h3 className="text-sm font-black text-gray-900 mb-2 uppercase tracking-tight">{t('Belum ada data')}</h3>
            <p className="text-gray-400 text-[11px] font-medium text-center px-4">
              Belum ada catatan servis kendaraan yang dibuat.
            </p>
          </div>
        )}
      </div>
      
      {/* Pagination Bar */}
      {data.length > 0 && (
        <div className="px-6 py-4 bg-white border-t border-gray-100 flex items-center justify-between">
              <div className="text-[11px] font-bold text-gray-400 uppercase">
                  Showing 1 - {data.length} of <span className="text-gray-600">{data.length} Row(s)</span>
              </div>
              
              <div className="flex items-center gap-1">
                   <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-100 text-gray-300 hover:text-black transition-colors">
                      <ChevronLeft size={16} />
                   </button>
                   <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-black text-white font-black text-[10px]">1</button>
                   <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-100 text-gray-300 hover:text-black transition-colors">
                      <ChevronRight size={16} />
                   </button>
              </div>
        </div>
      )}
    </div>
  );
};