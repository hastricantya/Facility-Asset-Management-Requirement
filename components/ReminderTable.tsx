import React from 'react';
import { ReminderRecord } from '../types';
import { ChevronsUpDown, Eye, Bell, Clock, Building } from 'lucide-react';

interface Props {
  data: ReminderRecord[];
  onView?: (item: ReminderRecord) => void;
}

export const ReminderTable: React.FC<Props> = ({ data, onView }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1000px] text-left border-separate border-spacing-0">
          <thead>
            <tr className="bg-[#F2F2F2] border-b border-gray-200">
              <th className="p-4 border-b border-gray-200 text-[10px] font-bold text-gray-500 uppercase tracking-widest group cursor-pointer hover:bg-gray-200 transition-colors">
                <div className="flex items-center justify-between">
                  Document Name
                  <ChevronsUpDown size={14} className="text-gray-300" />
                </div>
              </th>
              <th className="p-4 border-b border-gray-200 text-[10px] font-bold text-gray-500 uppercase tracking-widest group cursor-pointer hover:bg-gray-200 transition-colors">
                <div className="flex items-center justify-between">
                  Building / Asset No
                  <ChevronsUpDown size={14} className="text-gray-300" />
                </div>
              </th>
              <th className="p-4 border-b border-gray-200 text-[10px] font-bold text-gray-500 uppercase tracking-widest group cursor-pointer hover:bg-gray-200 transition-colors">
                <div className="flex items-center justify-between">
                  Expiry Date
                  <ChevronsUpDown size={14} className="text-gray-300" />
                </div>
              </th>
              <th className="p-4 border-b border-gray-200 text-[10px] font-bold text-gray-500 uppercase tracking-widest group cursor-pointer hover:bg-gray-200 transition-colors text-center">
                <div className="flex items-center justify-center gap-2">
                  Remaining Days
                  <ChevronsUpDown size={14} className="text-gray-300" />
                </div>
              </th>
              <th className="p-4 border-b border-gray-200 text-[10px] font-bold text-gray-500 uppercase tracking-widest text-center">Status</th>
              <th className="p-4 border-b border-gray-200 text-[10px] font-bold text-gray-500 uppercase tracking-widest text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-[11px]">
            {data.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50/50 transition-colors group">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-[#fff1f2] rounded-lg flex items-center justify-center text-[#e11d48]">
                        <Bell size={18} />
                    </div>
                    <div>
                        <div className="font-bold text-black text-[12px]">{item.documentName}</div>
                        <div className="text-[10px] text-gray-400 font-mono tracking-tighter uppercase">{item.id}</div>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                    <div className="flex items-center gap-2 text-gray-600 font-medium">
                        <Building size={14} className="text-gray-400" />
                        <div>
                            <div className="text-black font-bold">{item.buildingName}</div>
                            <div className="text-[10px] text-gray-400 font-mono">{item.assetNo}</div>
                        </div>
                    </div>
                </td>
                <td className="p-4 text-gray-600 font-bold">{item.expiryDate}</td>
                <td className="p-4 text-center">
                    <span className="inline-flex items-center gap-1.5 font-black text-gray-900">
                        <Clock size={14} className="text-gray-400" />
                        {item.daysRemaining} Days
                    </span>
                </td>
                <td className="p-4 text-center">
                    <span className={`inline-flex px-3 py-1 rounded-full text-[9px] font-black uppercase border ${
                        item.status === 'Urgent' 
                        ? 'bg-red-500 text-white border-red-600 shadow-sm shadow-red-200' 
                        : item.status === 'Warning'
                        ? 'bg-orange-500 text-white border-orange-600 shadow-sm shadow-orange-200'
                        : 'bg-green-500 text-white border-green-600 shadow-sm shadow-green-200'
                    }`}>
                        {item.status}
                    </span>
                </td>
                <td className="p-4">
                  <div className="flex items-center justify-center">
                    <button onClick={() => onView?.(item)} className="text-gray-300 hover:text-black transition-colors">
                        <Eye size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="px-6 py-4 bg-white border-t border-gray-100 flex items-center text-[11px] font-bold text-gray-400">
          Showing 1 - {data.length} of {data.length} Row(s)
      </div>
    </div>
  );
};