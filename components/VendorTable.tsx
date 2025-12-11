import React from 'react';
import { VendorRecord } from '../types';
import { ChevronsUpDown, ChevronsLeft, ChevronLeft, ChevronRight, ChevronsRight } from 'lucide-react';

interface Props {
  data: VendorRecord[];
}

export const VendorTable: React.FC<Props> = ({ data }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1000px] text-left border-collapse">
          <thead>
            <tr className="bg-black text-white text-xs font-semibold uppercase tracking-wider">
              <th className="p-4 w-12 border-r border-gray-800">No.</th>
              <th className="p-4 w-96 group cursor-pointer border-r border-gray-800 transition-colors">
                <div className="flex items-center justify-between">
                  Nama Vendor
                  <ChevronsUpDown size={14} className="text-gray-500 group-hover:text-white"/>
                </div>
              </th>
              <th className="p-4 w-48 group cursor-pointer border-r border-gray-800 transition-colors">
                <div className="flex items-center justify-between">
                  Kode Vendor
                  <ChevronsUpDown size={14} className="text-gray-500 group-hover:text-white"/>
                </div>
              </th>
              <th className="p-4 w-32 group cursor-pointer transition-colors">
                <div className="flex items-center justify-between">
                  Status
                  <ChevronsUpDown size={14} className="text-gray-500 group-hover:text-white"/>
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 text-sm text-gray-700">
            {data.map((item, index) => (
              <tr key={item.id} className="bg-white hover:bg-gray-50 transition-colors cursor-pointer group">
                <td className="p-4 font-medium text-gray-500">{index + 1}.</td>
                
                <td className="p-4 font-bold text-gray-900">{item.vendorName}</td>
                
                <td className="p-4 font-bold text-gray-900">{item.vendorCode}</td>
                
                <td className="p-4 font-medium">
                    {item.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Pagination Footer */}
      <div className="px-6 py-4 border-t border-gray-200 bg-white flex items-center justify-between">
            <div className="text-sm text-gray-900">
                Showing 1 - 10 of <span className="text-green-500 font-semibold">1</span> Row(s)
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