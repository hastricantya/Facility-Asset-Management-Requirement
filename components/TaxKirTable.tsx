import React from 'react';
import { TaxKirRecord } from '../types';
import { ChevronsUpDown, Eye, FolderX } from 'lucide-react';

interface Props {
  data: TaxKirRecord[];
}

export const TaxKirTable: React.FC<Props> = ({ data }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden min-h-[500px]">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1200px] text-left border-collapse">
          <thead>
            <tr className="bg-gray-100 border-b border-gray-200 text-xs font-semibold text-gray-700 uppercase tracking-wider">
              <th className="p-4 group cursor-pointer hover:bg-gray-200 transition-colors">
                <div className="flex items-center justify-between">
                  No Request
                  <ChevronsUpDown size={14} className="text-gray-500 group-hover:text-gray-700"/>
                </div>
              </th>
              <th className="p-4 group cursor-pointer hover:bg-gray-200 transition-colors">
                <div className="flex items-center justify-between">
                  No Polisi
                  <ChevronsUpDown size={14} className="text-gray-500 group-hover:text-gray-700"/>
                </div>
              </th>
              <th className="p-4 group cursor-pointer hover:bg-gray-200 transition-colors">
                <div className="flex items-center justify-between">
                  Tgl Request
                  <ChevronsUpDown size={14} className="text-gray-500 group-hover:text-gray-700"/>
                </div>
              </th>
              <th className="p-4 group cursor-pointer hover:bg-gray-200 transition-colors">
                <div className="flex items-center justify-between">
                  Jenis
                  <ChevronsUpDown size={14} className="text-gray-500 group-hover:text-gray-700"/>
                </div>
              </th>
              <th className="p-4 group cursor-pointer hover:bg-gray-200 transition-colors">
                <div className="flex items-center justify-between">
                  Channel
                  <ChevronsUpDown size={14} className="text-gray-500 group-hover:text-gray-700"/>
                </div>
              </th>
              <th className="p-4 group cursor-pointer hover:bg-gray-200 transition-colors">
                <div className="flex items-center justify-between">
                  Cabang
                  <ChevronsUpDown size={14} className="text-gray-500 group-hover:text-gray-700"/>
                </div>
              </th>
              <th className="p-4 group cursor-pointer hover:bg-gray-200 transition-colors">
                <div className="flex items-center justify-between">
                  Status
                  <ChevronsUpDown size={14} className="text-gray-500 group-hover:text-gray-700"/>
                </div>
              </th>
              <th className="p-4 group cursor-pointer hover:bg-gray-200 transition-colors">
                <div className="flex items-center justify-between">
                  Status Approval
                  <ChevronsUpDown size={14} className="text-gray-500 group-hover:text-gray-700"/>
                </div>
              </th>
              <th className="p-4 w-16 text-center">
                 Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 text-sm text-gray-700">
            {data.length > 0 ? (
                data.map((item) => (
                    <tr key={item.id} className="bg-white hover:bg-gray-50 transition-colors cursor-pointer group">
                        <td className="p-4 font-medium text-gray-900">{item.id}</td>
                        <td className="p-4 font-medium text-gray-900">{item.noPolisi}</td>
                        <td className="p-4 text-gray-600">{item.tglRequest}</td>
                        <td className="p-4 text-gray-600">{item.jenis}</td>
                        <td className="p-4 text-gray-600">{item.channel}</td>
                        <td className="p-4 text-gray-600">{item.cabang}</td>
                        <td className="p-4">
                            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-600">
                                {item.status}
                            </span>
                        </td>
                        <td className="p-4">
                            <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-gray-400 font-bold text-xs">
                                {item.statusApproval}
                            </div>
                        </td>
                        <td className="p-4 text-center">
                            <button 
                            className="text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                <Eye size={18} />
                            </button>
                        </td>
                    </tr>
                ))
            ) : (
                <tr>
                    <td colSpan={9} className="p-12 text-center">
                        <div className="flex flex-col items-center justify-center">
                             <div className="bg-gradient-to-br from-gray-100 to-gray-200 p-6 rounded-2xl mb-4 relative border border-gray-200">
                                <FolderX size={48} className="text-gray-500 z-10 relative" />
                                {/* Simple decoration to mimic the illustration's feel */}
                                <div className="absolute -right-2 -bottom-2 w-8 h-8 bg-gray-300 rounded-full opacity-50"></div>
                             </div>
                             <h3 className="text-lg font-bold text-gray-900">Belum ada data</h3>
                             <p className="text-gray-500 text-sm mt-1">Belum ada permintaan Pajak & KIR yang dibuat.</p>
                        </div>
                    </td>
                </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {/* Pagination Footer (Only if data exists) */}
      {data.length > 0 && (
          <div className="px-6 py-4 border-t border-gray-200 bg-white flex items-center justify-between">
                <div className="text-sm text-gray-900">
                    Showing 1 - {data.length} of <span className="text-green-500 font-semibold">{data.length}</span> Row(s)
                </div>
          </div>
      )}
    </div>
  );
};