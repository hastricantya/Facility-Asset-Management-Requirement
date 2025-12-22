
import React from 'react';
import { ServiceRecord } from '../types';
import { Eye, Pencil, Calendar, Wrench, Package, Info, History, Landmark, CreditCard } from 'lucide-react';

interface Props {
  data: ServiceRecord[];
  onEdit?: (item: ServiceRecord) => void;
  onView?: (item: ServiceRecord) => void;
}

export const ServiceLogTable: React.FC<Props> = ({ data, onEdit, onView }) => {
  if (data.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-20 text-center border-2 border-dashed border-gray-100">
        <div className="bg-gray-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
          <History className="text-gray-300" size={40} />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">Belum ada riwayat servis</h3>
        <p className="text-gray-400 text-sm max-w-xs mx-auto leading-relaxed">
          Seluruh log pemeliharaan yang Anda buat untuk kendaraan ini akan tercatat secara permanen di sini.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1500px] text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200 text-[11px] font-bold text-gray-500 uppercase tracking-widest">
              <th className="p-5 w-32">Log ID</th>
              <th className="p-5 w-48">Unit & Nopol</th>
              <th className="p-5 w-36 text-center">Tgl STNK</th>
              <th className="p-5 w-48">Vendor</th>
              <th className="p-5 w-36 text-center">Target Selesai</th>
              <th className="p-5 w-32">Odometer</th>
              <th className="p-5 w-40 text-right">Biaya</th>
              <th className="p-5 w-64">Pembayaran & Bank</th>
              <th className="p-5 w-24 text-center">Opsi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
            {data.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50/50 transition-colors group">
                <td className="p-5 align-top">
                  <div className="font-mono text-[11px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded inline-block">
                    {item.id}
                  </div>
                  <div className="text-[10px] text-gray-400 mt-2 font-bold uppercase tracking-tighter">
                    {item.jenisServis || 'Servis Rutin'}
                  </div>
                </td>
                
                <td className="p-5 align-top">
                  <div className="font-black text-gray-900 text-base">{item.noPolisi}</div>
                  <div className="text-xs text-gray-500 font-medium">{item.aset}</div>
                </td>

                <td className="p-5 align-top text-center">
                  <div className="inline-flex items-center gap-2 text-gray-700 font-bold bg-gray-50 border border-gray-100 px-3 py-1 rounded-lg">
                    {item.tglStnk || '-'}
                  </div>
                </td>

                <td className="p-5 align-top">
                  <div className="font-bold text-gray-900">{item.vendor}</div>
                  <div className="text-[10px] text-gray-400 mt-1 uppercase">Penyedia Jasa</div>
                </td>

                <td className="p-5 align-top text-center">
                  <div className="text-gray-900 font-bold">{item.targetSelesai || '-'}</div>
                </td>

                <td className="p-5 align-top">
                  <div className="font-mono font-bold text-gray-900 bg-orange-50/50 text-orange-700 px-2 py-1 rounded border border-orange-100 inline-block">
                    {parseInt(item.kmKendaraan || '0').toLocaleString('id-ID')} <span className="text-[10px] opacity-70">KM</span>
                  </div>
                </td>

                <td className="p-5 align-top text-right">
                  <div className="font-black text-gray-900 text-base">
                    Rp {parseInt(item.estimasiBiaya || '0').toLocaleString('id-ID')}
                  </div>
                </td>

                <td className="p-5 align-top">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                        <span className="text-[10px] font-black bg-gray-100 text-gray-700 px-2 py-0.5 rounded uppercase">
                            {item.jenisPembayaran}
                        </span>
                    </div>
                    {item.namaBank && (
                        <div className="flex items-center gap-1.5 text-xs text-gray-600 mt-1">
                            <Landmark size={12} className="text-gray-400" />
                            <span className="font-bold">{item.namaBank}</span>
                            <span className="text-gray-400 text-[10px] font-mono">({item.nomorRekening})</span>
                        </div>
                    )}
                  </div>
                </td>

                <td className="p-5 align-top text-center">
                    <div className="flex items-center justify-center gap-1">
                        <button 
                          onClick={() => onView?.(item)}
                          className="p-2 text-gray-400 hover:text-black hover:bg-gray-100 rounded-lg transition-all"
                          title="View Full Report"
                        >
                            <Eye size={18} />
                        </button>
                        <button 
                          onClick={() => onEdit?.(item)}
                          className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                          title="Edit Log"
                        >
                            <Pencil size={18} />
                        </button>
                    </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="px-6 py-5 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-2 text-[11px] font-bold text-gray-400 uppercase tracking-widest">
            <Info size={14} className="text-blue-500" />
            <span>Total {data.length} Transaksi Servis</span>
          </div>
          <div className="flex items-center gap-4">
             <div className="text-right">
                <p className="text-[9px] font-black text-gray-400 uppercase">Grand Total Biaya</p>
                <p className="text-xl font-black text-blue-700">
                    Rp {data.reduce((acc, curr) => acc + parseInt(curr.estimasiBiaya || '0'), 0).toLocaleString('id-ID')}
                </p>
             </div>
          </div>
      </div>
    </div>
  );
};
