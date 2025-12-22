
import React from 'react';
import { MasterItem } from '../types';
import { ChevronsUpDown, ChevronLeft, ChevronRight } from 'lucide-react';

interface Props {
  data: MasterItem[];
}

export const MasterAtkTable: React.FC<Props> = ({ data }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1600px] text-left border-collapse">
          <thead>
            <tr className="bg-gray-100 border-b border-gray-200 text-[11px] font-bold text-gray-500 uppercase tracking-widest">
              <th className="p-4 w-12 text-center pl-6">No</th>
              <th className="p-4 w-40 group cursor-pointer hover:bg-gray-200 transition-colors">
                <div className="flex items-center justify-between">
                  Category
                  <ChevronsUpDown size={14} className="text-gray-400 group-hover:text-gray-700"/>
                </div>
              </th>
              <th className="p-4 w-56 group cursor-pointer hover:bg-gray-200 transition-colors">
                <div className="flex items-center justify-between">
                  Item Name
                  <ChevronsUpDown size={14} className="text-gray-400 group-hover:text-gray-700"/>
                </div>
              </th>
              <th className="p-4 w-32 group cursor-pointer hover:bg-gray-200 transition-colors">
                <div className="flex items-center justify-between">
                  Item Code
                  <ChevronsUpDown size={14} className="text-gray-400 group-hover:text-gray-700"/>
                </div>
              </th>
               <th className="p-4 w-24 group cursor-pointer hover:bg-gray-200 transition-colors">
                <div className="flex items-center justify-between">
                  UoM
                  <ChevronsUpDown size={14} className="text-gray-400 group-hover:text-gray-700"/>
                </div>
              </th>
              <th className="p-4 w-32 group cursor-pointer hover:bg-gray-200 transition-colors text-center">
                <div className="flex items-center justify-between">
                  Remaining Stock
                  <ChevronsUpDown size={14} className="text-gray-400 group-hover:text-gray-700"/>
                </div>
              </th>
              <th className="p-4 w-32 group cursor-pointer hover:bg-gray-200 transition-colors text-center">
                <div className="flex items-center justify-between">
                  Min Stock
                  <ChevronsUpDown size={14} className="text-gray-400 group-hover:text-gray-700"/>
                </div>
              </th>
              <th className="p-4 w-32 group cursor-pointer hover:bg-gray-200 transition-colors text-center">
                <div className="flex items-center justify-between">
                  Max Stock
                  <ChevronsUpDown size={14} className="text-gray-400 group-hover:text-gray-700"/>
                </div>
              </th>
              <th className="p-4 w-32 group cursor-pointer hover:bg-gray-200 transition-colors text-center">
                <div className="flex items-center justify-between">
                  Requested
                  <ChevronsUpDown size={14} className="text-gray-400 group-hover:text-gray-700"/>
                </div>
              </th>
              <th className="p-4 w-32 group cursor-pointer hover:bg-gray-200 transition-colors">
                <div className="flex items-center justify-between">
                  Purchase Date
                  <ChevronsUpDown size={14} className="text-gray-400 group-hover:text-gray-700"/>
                </div>
              </th>
              <th className="p-4 w-40 group cursor-pointer hover:bg-gray-200 transition-colors text-right">
                <div className="flex items-center justify-between">
                  Last Price
                  <ChevronsUpDown size={14} className="text-gray-400 group-hover:text-gray-700"/>
                </div>
              </th>
              <th className="p-4 w-40 group cursor-pointer hover:bg-gray-200 transition-colors text-right pr-8">
                <div className="flex items-center justify-between">
                  Average Price
                  <ChevronsUpDown size={14} className="text-gray-400 group-hover:text-gray-700"/>
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-[12px] text-gray-700">
            {data.map((item, index) => (
              <tr key={item.id} className="bg-white hover:bg-gray-50/50 transition-colors cursor-pointer group">
                <td className="p-4 text-center font-bold text-gray-400 pl-6">{index + 1}</td>
                <td className="p-4 font-bold text-gray-600 uppercase tracking-tighter">{item.category}</td>
                <td className="p-4 font-black text-black uppercase">{item.itemName}</td>
                <td className="p-4 font-mono text-[10px] text-gray-400 font-bold">{item.itemCode}</td>
                <td className="p-4 font-black text-black uppercase">{item.uom}</td>
                <td className="p-4 text-center font-mono font-black text-black">{item.remainingStock}</td>
                <td className="p-4 text-center font-mono font-bold text-gray-400">{item.minimumStock}</td>
                <td className="p-4 text-center font-mono font-bold text-gray-400">{item.maximumStock}</td>
                <td className="p-4 text-center font-mono font-bold text-orange-500">{item.requestedStock}</td>
                <td className="p-4 text-gray-500 font-bold">{item.purchaseDate}</td>
                <td className="p-4 font-mono font-black text-black text-right">{item.lastPurchasePrice}</td>
                <td className="p-4 font-mono font-black text-black text-right pr-8">{item.averagePrice}</td>
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
  );
};
