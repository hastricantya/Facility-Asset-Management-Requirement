import React from 'react';
import { StockOpnameRecord } from '../types';
import { ChevronsUpDown, ChevronLeft, ChevronRight, Eye, MoreHorizontal, AlertTriangle, CheckCircle2 } from 'lucide-react';

interface Props {
  data: StockOpnameRecord[];
  onView?: (item: StockOpnameRecord) => void;
  showItemCode?: boolean;
}

export const StockOpnameTable: React.FC<Props> = ({ data, onView, showItemCode = true }) => {
  return (
    <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 overflow-hidden transition-all duration-500">
      <div className="overflow-x-auto custom-scrollbar">
        <table className="w-full min-w-[1400px] text-left border-collapse">
          <thead>
            <tr className="bg-[#F2F2F2] border-b border-gray-200">
              <th className="p-5 w-14 text-center pl-8 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">#</th>
              <th className="p-5 w-48 group cursor-pointer hover:bg-gray-200/50 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black text-black uppercase tracking-[0.15em]">Opname ID</span>
                  <ChevronsUpDown size={12} className="text-gray-300 group-hover:text-black transition-colors"/>
                </div>
              </th>
              {showItemCode && (
                <th className="p-5 w-48 group cursor-pointer hover:bg-gray-200/50 transition-colors">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black text-black uppercase tracking-[0.15em]">Item Code</span>
                    <ChevronsUpDown size={12} className="text-gray-300 group-hover:text-black transition-colors"/>
                  </div>
                </th>
              )}
              <th className="p-5 w-64 group cursor-pointer hover:bg-gray-200/50 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black text-black uppercase tracking-[0.15em]">Item Category</span>
                  <ChevronsUpDown size={12} className="text-gray-300 group-hover:text-black transition-colors"/>
                </div>
              </th>
              <th className="p-5 w-32 text-center text-[10px] font-black text-black uppercase tracking-[0.15em]">System Qty</th>
              <th className="p-5 w-32 text-center text-[10px] font-black text-black uppercase tracking-[0.15em]">Physical Qty</th>
              <th className="p-5 w-32 text-center text-[10px] font-black text-black uppercase tracking-[0.15em]">Diff</th>
              <th className="p-5 w-40 text-[10px] font-black text-black uppercase tracking-[0.15em]">Performed By</th>
              <th className="p-5 w-36 text-[10px] font-black text-black uppercase tracking-[0.15em]">Date</th>
              <th className="p-5 w-36 text-[10px] font-black text-black uppercase tracking-[0.15em]">Status</th>
              <th className="p-5 w-24 text-center text-[10px] font-black text-black uppercase tracking-[0.15em]">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {data.map((item, index) => (
              <tr key={item.id} className="bg-white hover:bg-[#FDFDFD] transition-all group cursor-pointer" onClick={() => onView?.(item)}>
                <td className="p-5 text-center font-bold text-gray-300 text-[11px] pl-8">{index + 1}</td>
                <td className="p-5">
                   <div className="font-mono font-black text-black text-[12px] bg-gray-50 px-2 py-1 rounded inline-block">
                    {item.opnameNumber}
                   </div>
                </td>
                {showItemCode && (
                  <td className="p-5 font-mono text-[11px] text-gray-500 font-bold uppercase">{item.itemCode}</td>
                )}
                <td className="p-5 font-black text-black text-[13px] uppercase tracking-tight">{item.category}</td>
                <td className="p-5 text-center font-black text-gray-400 text-[14px]">{item.systemQty}</td>
                <td className="p-5 text-center font-black text-black text-[14px]">{item.physicalQty}</td>
                <td className="p-5 text-center">
                    <span className={`text-[14px] font-black ${item.difference !== 0 ? 'text-red-500' : 'text-green-500'}`}>
                        {item.difference > 0 ? `+${item.difference}` : item.difference}
                    </span>
                </td>
                <td className="p-5">
                    <p className="font-black text-black text-[12px] uppercase">{item.performedBy}</p>
                </td>
                <td className="p-5">
                    <span className="text-[11px] font-black text-gray-400 uppercase tracking-tight">{item.date}</span>
                </td>
                <td className="p-5">
                    <div className="flex items-center">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-[0.1em] border
                            ${item.status === 'Matched' ? 'bg-green-50 text-green-600 border-green-100' : 
                              item.status === 'Discrepancy' ? 'bg-red-50 text-red-600 border-red-100' : 
                              'bg-gray-50 text-gray-400 border-gray-100' // Draft
                            }`}>
                            {item.status === 'Matched' ? <CheckCircle2 size={10} /> : item.status === 'Discrepancy' ? <AlertTriangle size={10} /> : null}
                            {item.status}
                        </span>
                    </div>
                </td>
                <td className="p-5 text-center">
                    <div className="flex items-center justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                            onClick={(e) => { e.stopPropagation(); onView?.(item); }}
                            className="text-gray-400 hover:text-black transition-all p-2 rounded-xl hover:bg-gray-100 active:scale-90"
                            title="View Details"
                        >
                            <Eye size={18} />
                        </button>
                        <button className="text-gray-400 hover:text-black transition-all p-2 rounded-xl hover:bg-gray-100" title="More">
                            <MoreHorizontal size={18} />
                        </button>
                    </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Pagination Footer */}
      <div className="px-8 py-6 bg-[#FAFAFA] border-t border-gray-100 flex items-center justify-between">
            <div className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
                Total <span className="text-black ml-1">{data.length} Opname Records</span> tracked
            </div>
            
            <div className="flex items-center gap-2">
                 <button className="w-10 h-10 flex items-center justify-center rounded-xl border border-gray-200 hover:border-black text-gray-300 hover:text-black transition-all bg-white">
                    <ChevronLeft size={16} />
                 </button>
                 <div className="bg-black text-white w-10 h-10 flex items-center justify-center rounded-xl font-black text-[11px] shadow-xl shadow-black/20">1</div>
                 <button className="w-10 h-10 flex items-center justify-center rounded-xl border border-gray-200 hover:border-black text-gray-300 hover:text-black transition-all bg-white">
                    <ChevronRight size={16} />
                 </button>
            </div>
      </div>
    </div>
  );
};