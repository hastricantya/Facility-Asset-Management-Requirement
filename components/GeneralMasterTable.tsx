import React from 'react';
import { GeneralMasterItem } from '../types';
import { Pencil, Trash2, ChevronsLeft, ChevronLeft, ChevronRight, ChevronsRight } from 'lucide-react';

interface Props {
  data: GeneralMasterItem[];
  onEdit: (item: GeneralMasterItem) => void;
  onDelete: (id: number) => void;
}

export const GeneralMasterTable: React.FC<Props> = ({ data, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100 border-b border-gray-200 text-xs font-semibold text-gray-700 uppercase tracking-wider">
              <th className="p-4 w-16 text-center">No</th>
              <th className="p-4">Name</th>
              <th className="p-4 w-32 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 text-sm text-gray-700">
            {data.length > 0 ? (
                data.map((item, index) => (
                    <tr key={item.id} className="bg-white hover:bg-gray-50 transition-colors">
                        <td className="p-4 text-center font-medium text-gray-500">{index + 1}</td>
                        <td className="p-4 font-medium text-gray-900">{item.name}</td>
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
                    <td colSpan={3} className="p-8 text-center text-gray-500">
                        No data available
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