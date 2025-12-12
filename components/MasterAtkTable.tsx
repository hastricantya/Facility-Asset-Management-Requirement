import React from 'react';
import { MasterItem } from '../types';
import { ChevronsUpDown, ChevronsLeft, ChevronLeft, ChevronRight, ChevronsRight } from 'lucide-react';

interface Props {
  data: MasterItem[];
}

export const MasterAtkTable: React.FC<Props> = ({ data }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto custom-scrollbar pb-2">
        <table className="w-full min-w-[1600px] text-left border-collapse">
          <thead>
            <tr className="bg-gray-100 border-b border-gray-200 text-xs font-semibold text-gray-700 uppercase tracking-wider">
              {/* Sticky Header Columns */}
              <th className="p-4 w-12 text-center sticky left-0 z-20 bg-gray-100 border-r border-gray-200/50">No</th>
              
              <th className="p-4 w-40 group cursor-pointer hover:bg-gray-200 transition-colors sticky left-[48px] z-20 bg-gray-100 border-r border-gray-200/50">
                <div className="flex items-center justify-between">
                  Category
                  <ChevronsUpDown size={14} className="text-gray-500 group-hover:text-gray-700"/>
                </div>
              </th>
              
              <th className="p-4 w-56 group cursor-pointer hover:bg-gray-200 transition-colors sticky left-[208px] z-20 bg-gray-100 border-r border-gray-200/50">
                <div className="flex items-center justify-between">
                  Item Name
                  <ChevronsUpDown size={14} className="text-gray-500 group-hover:text-gray-700"/>
                </div>
              </th>
              
              <th className="p-4 w-32 group cursor-pointer hover:bg-gray-200 transition-colors sticky left-[432px] z-20 bg-gray-100 border-r border-gray-200 shadow-[4px_0_8px_-4px_rgba(0,0,0,0.1)]">
                <div className="flex items-center justify-between">
                  Item Code
                  <ChevronsUpDown size={14} className="text-gray-500 group-hover:text-gray-700"/>
                </div>
              </th>
              
               {/* Scrollable Header Columns */}
               <th className="p-4 w-24 group cursor-pointer hover:bg-gray-200 transition-colors">
                <div className="flex items-center justify-between">
                  UoM
                  <ChevronsUpDown size={14} className="text-gray-500 group-hover:text-gray-700"/>
                </div>
              </th>

              <th className="p-4 w-32 group cursor-pointer hover:bg-gray-200 transition-colors">
                <div className="flex items-center justify-between">
                  Remaining Stock
                  <ChevronsUpDown size={14} className="text-gray-500 group-hover:text-gray-700"/>
                </div>
              </th>
              <th className="p-4 w-32 group cursor-pointer hover:bg-gray-200 transition-colors">
                <div className="flex items-center justify-between">
                  Minimum Stock
                  <ChevronsUpDown size={14} className="text-gray-500 group-hover:text-gray-700"/>
                </div>
              </th>
              <th className="p-4 w-32 group cursor-pointer hover:bg-gray-200 transition-colors">
                <div className="flex items-center justify-between">
                  Maximum Stock
                  <ChevronsUpDown size={14} className="text-gray-500 group-hover:text-gray-700"/>
                </div>
              </th>
              <th className="p-4 w-32 group cursor-pointer hover:bg-gray-200 transition-colors">
                <div className="flex items-center justify-between">
                  Requested Stock
                  <ChevronsUpDown size={14} className="text-gray-500 group-hover:text-gray-700"/>
                </div>
              </th>
              <th className="p-4 w-32 group cursor-pointer hover:bg-gray-200 transition-colors">
                <div className="flex items-center justify-between">
                  Purchase Date
                  <ChevronsUpDown size={14} className="text-gray-500 group-hover:text-gray-700"/>
                </div>
              </th>
              <th className="p-4 w-40 group cursor-pointer hover:bg-gray-200 transition-colors">
                <div className="flex items-center justify-between">
                  Last Purchase Price
                  <ChevronsUpDown size={14} className="text-gray-500 group-hover:text-gray-700"/>
                </div>
              </th>
              <th className="p-4 w-40 group cursor-pointer hover:bg-gray-200 transition-colors">
                <div className="flex items-center justify-between">
                  Average Price
                  <ChevronsUpDown size={14} className="text-gray-500 group-hover:text-gray-700"/>
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 text-sm text-gray-700">
            {data.map((item, index) => (
              <tr key={item.id} className="bg-white hover:bg-gray-50 transition-colors cursor-pointer group">
                <td className="p-4 text-center font-medium text-gray-500 sticky left-0 z-10 bg-white group-hover:bg-gray-50 border-r border-gray-100">{index + 1}</td>
                
                <td className="p-4 font-medium sticky left-[48px] z-10 bg-white group-hover:bg-gray-50 border-r border-gray-100">{item.category}</td>
                
                <td className="p-4 font-semibold text-gray-900 sticky left-[208px] z-10 bg-white group-hover:bg-gray-50 border-r border-gray-100">{item.itemName}</td>
                
                <td className="p-4 font-mono text-xs text-gray-600 sticky left-[432px] z-10 bg-white group-hover:bg-gray-50 border-r border-gray-200 shadow-[4px_0_8px_-4px_rgba(0,0,0,0.1)]">{item.itemCode}</td>
                
                <td className="p-4 text-gray-600">{item.uom}</td>

                <td className="p-4 font-mono font-medium text-gray-900 pl-8">{item.remainingStock}</td>
                
                <td className="p-4 font-mono font-medium text-gray-600 pl-8">{item.minimumStock}</td>
                
                <td className="p-4 font-mono font-medium text-gray-600 pl-8">{item.maximumStock}</td>
                
                <td className="p-4 font-mono font-medium text-gray-600 pl-8">{item.requestedStock}</td>
                
                <td className="p-4 text-gray-500">{item.purchaseDate}</td>
                
                <td className="p-4 font-mono text-gray-600">{item.lastPurchasePrice}</td>
                
                <td className="p-4 font-mono text-gray-600">{item.averagePrice}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Pagination Footer */}
      <div className="px-6 py-4 border-t border-gray-200 bg-white flex items-center justify-between">
            <div className="text-sm text-gray-900">
                Showing 1 - 10 of <span className="text-green-500 font-semibold">58</span> Row(s)
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
                     
                     <span className="text-sm text-gray-900 mx-3 font-medium">1 / 6</span>
                     
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