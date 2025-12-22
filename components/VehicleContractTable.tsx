
import React from 'react';
import { VehicleContractRecord } from '../types';
import { ChevronsUpDown, Eye, Pencil, Trash2 } from 'lucide-react';

interface Props {
  data: VehicleContractRecord[];
  onEdit?: (item: VehicleContractRecord) => void;
  onView?: (item: VehicleContractRecord) => void;
  onDelete?: (id: string) => void;
}

export const VehicleContractTable: React.FC<Props> = ({ data, onEdit, onView, onDelete }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1200px] text-left border-collapse">
          <thead>
            <tr className="bg-gray-100 border-b border-gray-200 text-xs font-semibold text-gray-700 uppercase tracking-wider">
              <th className="p-4 group cursor-pointer hover:bg-gray-200 transition-colors">
                <div className="flex items-center justify-between">
                  No Kontrak
                  <ChevronsUpDown size={14} className="text-gray-500 group-hover:text-gray-700"/>
                </div>
              </th>
              <th className="p-4 group cursor-pointer hover:bg-gray-200 transition-colors">
                <div className="flex items-center justify-between">
                  No Polisi / Unit
                  <ChevronsUpDown size={14} className="text-gray-500 group-hover:text-gray-700"/>
                </div>
              </th>
              <th className="p-4 group cursor-pointer hover:bg-gray-200 transition-colors">
                <div className="flex items-center justify-between">
                  Vendor / Lessor
                  <ChevronsUpDown size={14} className="text-gray-500 group-hover:text-gray-700"/>
                </div>
              </th>
              <th className="p-4 group cursor-pointer hover:bg-gray-200 transition-colors">
                <div className="flex items-center justify-between">
                  Masa Berlaku
                  <ChevronsUpDown size={14} className="text-gray-500 group-hover:text-gray-700"/>
                </div>
              </th>
              <th className="p-4 group cursor-pointer hover:bg-gray-200 transition-colors">
                <div className="flex items-center justify-between">
                  Biaya
                  <ChevronsUpDown size={14} className="text-gray-500 group-hover:text-gray-700"/>
                </div>
              </th>
              <th className="p-4 w-32 group cursor-pointer hover:bg-gray-200 transition-colors">
                <div className="flex items-center justify-between">
                  Status
                  <ChevronsUpDown size={14} className="text-gray-500 group-hover:text-gray-700"/>
                </div>
              </th>
              <th className="p-4 w-24 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 text-sm text-gray-700">
            {data.length > 0 ? (
                data.map((item) => (
                    <tr key={item.id} className="bg-white hover:bg-gray-50 transition-colors cursor-pointer group">
                        <td className="p-4 font-bold text-gray-900">{item.noKontrak}</td>
                        <td className="p-4">
                            <div className="font-bold text-gray-900">{item.noPolisi}</div>
                            <div className="text-xs text-gray-500 font-medium">{item.aset}</div>
                        </td>
                        <td className="p-4 text-gray-600 font-medium">{item.vendor}</td>
                        <td className="p-4">
                            <div className="text-xs font-bold text-gray-800">{item.tglMulai} s/d</div>
                            <div className="text-xs font-bold text-blue-600">{item.tglBerakhir}</div>
                        </td>
                        <td className="p-4 font-black text-gray-900">
                            Rp {parseInt(item.biayaSewa || '0').toLocaleString('id-ID')}
                        </td>
                        <td className="p-4">
                            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-black uppercase ${
                                item.status === 'Aktif' ? 'bg-green-100 text-green-700 border border-green-200' : 'bg-gray-100 text-gray-500 border border-gray-200'
                            }`}>
                                {item.status}
                            </span>
                        </td>
                        <td className="p-4">
                            <div className="flex items-center justify-center gap-2">
                                <button onClick={(e) => { e.stopPropagation(); onView?.(item); }} className="text-gray-400 hover:text-black transition-colors">
                                    <Eye size={18} />
                                </button>
                                <button onClick={(e) => { e.stopPropagation(); onEdit?.(item); }} className="text-gray-400 hover:text-blue-600 transition-colors">
                                    <Pencil size={18} />
                                </button>
                                <button onClick={(e) => { e.stopPropagation(); onDelete?.(item.id); }} className="text-gray-400 hover:text-red-500 transition-colors">
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </td>
                    </tr>
                ))
            ) : (
                <tr>
                    <td colSpan={7} className="p-12 text-center text-gray-400 italic">Belum ada kontrak terdaftar</td>
                </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
