
import React from 'react';
import { LogBookRecord } from '../types';
import { ChevronsUpDown, Eye, Pencil, ChevronsLeft, ChevronLeft, ChevronRight, ChevronsRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface Props {
  data: LogBookRecord[];
  onEdit?: (item: LogBookRecord) => void;
  onView?: (item: LogBookRecord) => void;
}

export const LogBookTable: React.FC<Props> = ({ data, onEdit, onView }) => {
  const { t } = useLanguage();

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1200px] text-left border-collapse">
          <thead>
            <tr className="bg-black text-white text-xs font-semibold uppercase tracking-wider">
              <th className="p-4 w-12 border-r border-gray-800 text-center">No.</th>
              <th className="p-4 w-48 group cursor-pointer border-r border-gray-800 transition-colors">
                <div className="flex items-center justify-between">
                  {t('Lokasi MODENA')}
                  <ChevronsUpDown size={14} className="text-gray-400 group-hover:text-white"/>
                </div>
              </th>
              <th className="p-4 w-40 group cursor-pointer border-r border-gray-800 transition-colors">
                <div className="flex items-center justify-between">
                  {t('Kategori Tamu')}
                  <ChevronsUpDown size={14} className="text-gray-400 group-hover:text-white"/>
                </div>
              </th>
              <th className="p-4 w-48 group cursor-pointer border-r border-gray-800 transition-colors">
                <div className="flex items-center justify-between">
                  {t('Nama Tamu')}
                  <ChevronsUpDown size={14} className="text-gray-400 group-hover:text-white"/>
                </div>
              </th>
              <th className="p-4 w-32 group cursor-pointer border-r border-gray-800 transition-colors">
                <div className="flex items-center justify-between">
                  {t('Tanggal Kunjungan')}
                  <ChevronsUpDown size={14} className="text-gray-400 group-hover:text-white"/>
                </div>
              </th>
              <th className="p-4 w-28 group cursor-pointer border-r border-gray-800 transition-colors">
                <div className="flex items-center justify-between">
                  {t('Jam Datang')}
                  <ChevronsUpDown size={14} className="text-gray-400 group-hover:text-white"/>
                </div>
              </th>
              <th className="p-4 w-28 group cursor-pointer border-r border-gray-800 transition-colors">
                <div className="flex items-center justify-between">
                  {t('Jam Pulang')}
                  <ChevronsUpDown size={14} className="text-gray-400 group-hover:text-white"/>
                </div>
              </th>
              <th className="p-4 w-20 group cursor-pointer border-r border-gray-800 transition-colors text-center">
                  {t('Wanita')}
              </th>
              <th className="p-4 w-20 group cursor-pointer border-r border-gray-800 transition-colors text-center">
                  {t('Laki-Laki')}
              </th>
              <th className="p-4 w-20 group cursor-pointer border-r border-gray-800 transition-colors text-center">
                  {t('Anak-Anak')}
              </th>
              <th className="p-4 group cursor-pointer transition-colors border-r border-gray-800">
                <div className="flex items-center justify-between">
                  {t('Note')}
                  <ChevronsUpDown size={14} className="text-gray-400 group-hover:text-white"/>
                </div>
              </th>
              <th className="p-4 w-20 text-center">
                  {t('Action')}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 text-sm text-gray-700">
            {data.length > 0 ? (
                data.map((item, index) => (
                <tr key={item.id} className="bg-white hover:bg-gray-50 transition-colors cursor-pointer group">
                    <td className="p-4 text-center font-medium text-gray-500">{index + 1}.</td>
                    <td className="p-4 font-bold text-gray-900">{item.lokasiModena}</td>
                    <td className="p-4 font-bold text-gray-900">{item.kategoriTamu}</td>
                    <td className="p-4 font-bold text-gray-900">{item.namaTamu}</td>
                    <td className="p-4 text-gray-600">{item.tanggalKunjungan}</td>
                    <td className="p-4 text-gray-600">{item.jamDatang}</td>
                    <td className="p-4 text-gray-600">{item.jamPulang}</td>
                    <td className="p-4 text-center text-gray-600">{item.wanita}</td>
                    <td className="p-4 text-center text-gray-600">{item.lakiLaki}</td>
                    <td className="p-4 text-center text-gray-600">{item.anakAnak}</td>
                    <td className="p-4 text-gray-600">{item.note}</td>
                    <td className="p-4 text-center">
                        <button 
                            onClick={(e) => { e.stopPropagation(); onView?.(item); }}
                            className="text-gray-400 hover:text-black transition-colors"
                        >
                            <Eye size={18} />
                        </button>
                    </td>
                </tr>
                ))
            ) : (
                <tr>
                    <td colSpan={12} className="p-8 text-center text-gray-500">
                        {t('No data available')}
                    </td>
                </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {/* Pagination Footer */}
      <div className="px-6 py-4 border-t border-gray-200 bg-white flex items-center justify-between">
            <div className="text-sm text-gray-900">
                Showing 1 - {data.length} of <span className="text-green-500 font-semibold">{data.length}</span> Row(s)
            </div>
            
            <div className="flex items-center gap-8">
                <div className="flex items-center gap-2 text-sm text-gray-900">
                    Row per page
                    <select className="border border-gray-300 rounded px-2 py-1 text-sm bg-white focus:outline-none focus:border-gray-400 text-gray-900 cursor-pointer">
                        <option>10</option>
                        <option>20</option>
                        <option>50</option>
                    </select>
                </div>
                
                <div className="flex items-center gap-2">
                     <button className="w-8 h-8 flex items-center justify-center border border-gray-200 rounded hover:bg-gray-50 text-gray-600 transition-colors">
                        <ChevronsLeft size={16} />
                     </button>
                     <button className="w-8 h-8 flex items-center justify-center border border-gray-200 rounded hover:bg-gray-50 text-gray-600 transition-colors">
                        <ChevronLeft size={16} />
                     </button>
                     
                     <span className="text-sm text-gray-900 mx-3 font-medium">1 / 1</span>
                     
                     <button className="w-8 h-8 flex items-center justify-center border border-gray-200 rounded hover:bg-gray-50 text-gray-600 transition-colors">
                        <ChevronRight size={16} />
                     </button>
                     <button className="w-8 h-8 flex items-center justify-center border border-gray-200 rounded hover:bg-gray-50 text-gray-600 transition-colors">
                        <ChevronsRight size={16} />
                     </button>
                </div>
            </div>
      </div>
    </div>
  );
};
