import React from 'react';
import { TimesheetRecord } from '../types';
import { ChevronsLeft, ChevronLeft, ChevronRight, ChevronsRight, Pencil, Smartphone } from 'lucide-react';

interface Props {
  data: TimesheetRecord[];
}

export const TimesheetTable: React.FC<Props> = ({ data }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1000px] text-left border-collapse">
          <thead>
            {/* Header Row 1 */}
            <tr className="bg-black text-white text-xs font-semibold uppercase tracking-wider">
              <th rowSpan={2} className="p-4 w-12 text-center border-r border-gray-800">
                <Pencil size={14} />
              </th>
              <th rowSpan={2} className="p-4 w-64 border-r border-gray-800">
                Employee
              </th>
              <th rowSpan={2} className="p-4 w-48 border-r border-gray-800">
                Date
              </th>
              <th rowSpan={2} className="p-4 w-32 border-r border-gray-800">
                Task
              </th>
              {/* Grouped Header */}
              <th colSpan={2} className="p-2 text-center border-b border-gray-800 w-64 border-r">
                Actual Time
              </th>
              <th rowSpan={2} className="p-4 w-40 border-r border-gray-800">
                Status
              </th>
               <th rowSpan={2} className="p-4 w-48">
                
              </th>
            </tr>
            {/* Header Row 2 */}
            <tr className="bg-black text-white text-xs font-semibold uppercase tracking-wider">
                <th className="p-4 border-r border-gray-800">In</th>
                <th className="p-4 border-r border-gray-800">Out</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 text-sm text-gray-700">
            {data.map((item) => (
              <tr key={item.id} className="bg-white hover:bg-gray-50 transition-colors cursor-pointer group">
                <td className="p-4 text-center">
                    <button className="text-gray-400 hover:text-black transition-colors">
                        <Pencil size={16} />
                    </button>
                </td>
                
                {/* Employee Cell */}
                <td className="p-4">
                  <div className="flex items-start gap-3">
                    <img 
                      src={item.employee.avatar} 
                      alt={item.employee.name} 
                      className="w-10 h-10 rounded-full object-cover border border-gray-300 shadow-sm"
                    />
                    <div>
                      <p className="font-bold text-gray-900 leading-tight">{item.employee.name}</p>
                      <p className="text-xs text-gray-500 mt-0.5 mb-0.5 font-mono">{item.employee.phone}</p>
                      <p className="text-xs text-gray-500 font-medium">{item.employee.role}</p>
                    </div>
                  </div>
                </td>

                <td className="p-4">
                    <p className="font-bold text-gray-900">{item.date}</p>
                    <p className="text-xs text-gray-400 mt-1">{item.dayType}</p>
                </td>
                
                <td className="p-4">
                    {item.task}
                </td>
                
                <td className="p-4">
                    <div className="flex items-center gap-2">
                        <Smartphone size={14} className="text-gray-400"/>
                        <span className="font-mono font-medium text-gray-900">{item.clockIn}</span>
                    </div>
                </td>

                <td className="p-4">
                    <div className="flex items-center gap-2">
                        <Smartphone size={14} className="text-gray-400"/>
                        <span className="font-mono font-medium text-gray-900">{item.clockOut}</span>
                    </div>
                </td>
                
                <td className="p-4">
                    {item.status === 'Tepat Waktu' ? (
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-green-50 text-green-700 text-xs font-medium border border-transparent">
                            <div className="w-2 h-2 rounded-full bg-green-500"></div>
                            {item.status}
                        </div>
                    ) : (
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-cyan-50 text-cyan-700 text-xs font-medium border border-transparent">
                            <div className="w-2 h-2 rounded-full bg-cyan-500"></div>
                            {item.status}
                        </div>
                    )}
                </td>

                 <td className="p-4">
                    <div className="flex items-center gap-2">
                        {item.photos.map((photo, idx) => (
                            <img key={idx} src={photo} className="w-10 h-10 rounded border border-gray-200 object-cover" alt="Check in" />
                        ))}
                    </div>
                </td>
                
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Pagination Footer */}
      <div className="px-6 py-4 border-t border-gray-200 bg-white flex items-center justify-between">
            <div className="text-sm text-gray-900">
                Showing 1 - 10 of <span className="text-green-500 font-semibold">1,203</span> Row(s)
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
                     
                     <span className="text-sm text-gray-900 mx-3 font-medium">1 / 121</span>
                     
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