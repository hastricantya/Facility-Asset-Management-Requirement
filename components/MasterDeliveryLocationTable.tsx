
import React from 'react';
import { DeliveryLocationRecord } from '../types';
import { ChevronsUpDown, Pencil, Trash2, ChevronsLeft, ChevronLeft, ChevronRight, ChevronsRight } from 'lucide-react';

interface Props {
  data: DeliveryLocationRecord[];
  onEdit: (item: DeliveryLocationRecord) => void;
  onDelete: (id: number) => void;
}

export const MasterDeliveryLocationTable: React.FC<Props> = ({ data, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1000px] text-left border-collapse">
          <thead>
            <tr className="bg-gray-100 border-b border-gray-200 text-xs font-semibold text-gray-700 uppercase tracking-wider">
              <th className="p-4 w-16 text-center">No</th>
              <th className="p-4 w-1/4 group cursor-pointer hover:bg-gray-200 transition-colors">
                <div className="flex items-center justify-between">
                  Name
                  <ChevronsUpDown size={14} className="text-gray-500 group-hover:text-gray-700"/>
                </div>
              </th>
              <th className="p-4 w-1/3 group cursor-pointer hover:bg-gray-200 transition-colors">
                <div className="flex items-center justify-between">
                  Address
                  <ChevronsUpDown size={14} className="text-gray-500 group-hover:text-gray-700"/>
                </div>
              </th>
              <th className="p-4 w-1/4 group cursor-pointer hover:bg-gray-200 transition-colors">
                <div className="flex items-center justify-between">
                  Type
                  <ChevronsUpDown size={14} className="text-gray-500 group-hover:text-gray-700"/>
                </div>
              </th>
              <th className="p-4 w-32 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 text-sm text-gray-700">
            {data.length > 0 ? (
                data.map((item, index) => (
                    <tr key={item.id} className="bg-white hover:bg-gray-50 transition-colors">
                        <td className="p-4 text-center font-medium text-gray-500">{index + 1}</td>
                        <td className="p-4 font-semibold text-gray-900">{item.name}</td>
                        <td className="p-4 text-gray-600 truncate max-w-xs">{item.address}</td>
                        <td className="p-4 text-gray-600">{item.type}</td>
                        <td className="p-4 text-center">
                            <div className="flex items-center justify-center gap-3">
                                <button 
                                    onClick={() => onEdit(item)}
                                    className="text-gray-400 hover:text-black transition-colors"
                                >
                                    <Pencil size={18} />
                                </button>
                                <button 
                                    onClick={() => onDelete(item.id)}
                                    className="text-gray-400 hover:text-red-500 transition-colors"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </td>
                    </tr>
                ))
            ) : (
                <tr>
                    <td colSpan={5} className="p-8 text-center text-gray-500">
                        No delivery locations available
                    </td>
                </tr>
            )}
          </tbody>
        </table>
      </div>
       {/* Pagination Footer */}
       <div className="px-6 py-4 border-t border-gray-200 bg-white flex items-center justify-between">
            <div className="text-sm text-gray-900">
                Showing {data.length > 0 ? 1 : 0} - {data.length} of <span className="text-green-500 font-semibold">{data.length}</span> items
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
  );
};
