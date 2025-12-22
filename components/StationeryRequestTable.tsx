
import React from 'react';
import { AssetRecord } from '../types';
import { ChevronsUpDown, ChevronLeft, ChevronRight, Eye } from 'lucide-react';

interface Props {
  data: AssetRecord[];
  onView?: (item: AssetRecord) => void;
}

export const StationeryRequestTable: React.FC<Props> = ({ data, onView }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1300px] text-left border-collapse">
          <thead>
            <tr className="bg-gray-100 border-b border-gray-200 text-[11px] font-bold text-gray-500 uppercase tracking-widest">
              <th className="p-4 w-12 text-left pl-6">No</th>
              <th className="p-4 w-44 group cursor-pointer hover:bg-gray-200 transition-colors">
                <div className="flex items-center justify-between">
                  No Transaksi
                  <ChevronsUpDown size={14} className="text-gray-400 group-hover:text-gray-700"/>
                </div>
              </th>
              <th className="p-4 w-64 group cursor-pointer hover:bg-gray-200 transition-colors">
                <div className="flex items-center justify-between">
                  Employee Name
                  <ChevronsUpDown size={14} className="text-gray-400 group-hover:text-gray-700"/>
                </div>
              </th>
              <th className="p-4 w-40 group cursor-pointer hover:bg-gray-200 transition-colors">
                <div className="flex items-center justify-between">
                    Kategori
                    <ChevronsUpDown size={14} className="text-gray-400 group-hover:text-gray-700"/>
                </div>
              </th>
              <th className="p-4 w-56 group cursor-pointer hover:bg-gray-200 transition-colors">
                <div className="flex items-center justify-between">
                    Item Name
                    <ChevronsUpDown size={14} className="text-gray-400 group-hover:text-gray-700"/>
                </div>
              </th>
              <th className="p-4 w-24 text-center">Jumlah</th>
              <th className="p-4 w-32 text-center">Sisa Stok</th>
              <th className="p-4 w-32 text-left">Tanggal</th>
              <th className="p-4 w-32 text-left">Status</th>
              <th className="p-4 w-20 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-[12px] text-gray-700">
            {data.map((item, index) => (
              <tr key={item.id} className="bg-white hover:bg-gray-50/50 transition-colors group">
                <td className="p-4 text-left font-bold text-gray-400 pl-6">{index + 1}</td>
                <td className="p-4 font-mono font-black text-black">{item.transactionNumber}</td>
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <img 
                      src={item.employee.avatar} 
                      alt={item.employee.name} 
                      className="w-9 h-9 rounded-full object-cover border border-gray-100 shadow-sm"
                    />
                    <div>
                      <p className="font-bold text-black leading-tight">{item.employee.name}</p>
                      <p className="text-[10px] text-gray-400 mt-0.5 font-bold uppercase">{item.employee.role}</p>
                    </div>
                  </div>
                </td>
                <td className="p-4 font-bold text-gray-600 uppercase tracking-tight">{item.category}</td>
                <td className="p-4">
                    <p className="font-black text-black">{item.itemName}</p>
                    <p className="text-[10px] font-mono text-gray-400 mt-0.5">{item.itemCode}</p>
                </td>
                <td className="p-4 text-center font-black text-black">{item.qty}</td>
                <td className="p-4 text-center font-mono font-bold text-gray-400">{item.remainingStock}</td>
                <td className="p-4 text-left text-gray-500 font-bold">{item.date}</td>
                <td className="p-4 text-left">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border
                        ${item.status === 'Approved' ? 'bg-green-500 text-white border-green-600' : 
                          item.status === 'Pending' ? 'bg-orange-500 text-white border-orange-600' : 
                          item.status === 'Rejected' ? 'bg-red-500 text-white border-red-600' : 
                          item.status === 'Closed' ? 'bg-gray-500 text-white border-gray-600' : 
                          'bg-white text-gray-400 border-gray-200' // Draft
                        }`}>
                        {item.status}
                    </span>
                </td>
                <td className="p-4 text-center">
                    <button 
                        onClick={(e) => { e.stopPropagation(); onView?.(item); }}
                        className="text-gray-300 hover:text-black transition-all p-1.5 rounded-lg hover:bg-gray-100 active:scale-90"
                    >
                        <Eye size={18} />
                    </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Pagination Footer */}
      <div className="px-6 py-4 border-t border-gray-100 bg-white flex items-center justify-between">
            <div className="text-[11px] font-black text-gray-400 uppercase tracking-widest">
                Showing 1 - {data.length} of <span className="text-black">{data.length}</span> Row(s)
            </div>
            
            <div className="flex items-center gap-6">
                <div className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                    Row per page
                    <select className="border border-gray-200 rounded-lg px-2 py-1 text-[11px] font-bold bg-white focus:outline-none focus:border-black text-black cursor-pointer shadow-sm">
                        <option>10</option>
                        <option>20</option>
                        <option>50</option>
                    </select>
                </div>
                
                <div className="flex items-center gap-1">
                     <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-100 hover:bg-gray-50 text-gray-300 hover:text-black transition-all">
                        <ChevronLeft size={16} />
                     </button>
                     <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-black text-white font-black text-[10px] shadow-lg shadow-black/10">1</button>
                     <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-100 hover:bg-gray-50 text-gray-300 hover:text-black transition-all">
                        <ChevronRight size={16} />
                     </button>
                </div>
            </div>
      </div>
    </div>
  );
};
