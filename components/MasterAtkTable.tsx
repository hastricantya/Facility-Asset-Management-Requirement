import React from 'react';
import { MasterItem } from '../types';
import { ChevronsUpDown } from 'lucide-react';

interface Props {
  data: MasterItem[];
}

export const MasterAtkTable: React.FC<Props> = ({ data }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1000px] text-left border-collapse">
          <thead>
            <tr className="bg-gray-100 border-b border-gray-200 text-xs font-semibold text-gray-700 uppercase tracking-wider">
              <th className="p-4 w-12 text-center">No</th>
              <th className="p-4 w-48 group cursor-pointer hover:bg-gray-200 transition-colors">
                <div className="flex items-center justify-between">
                  Kategori
                  <ChevronsUpDown size={14} className="text-gray-500 group-hover:text-gray-700"/>
                </div>
              </th>
              <th className="p-4 w-64 group cursor-pointer hover:bg-gray-200 transition-colors">
                <div className="flex items-center justify-between">
                  Jenis
                  <ChevronsUpDown size={14} className="text-gray-500 group-hover:text-gray-700"/>
                </div>
              </th>
              <th className="p-4 w-32 group cursor-pointer hover:bg-gray-200 transition-colors">
                <div className="flex items-center justify-between">
                  Kode Barang
                  <ChevronsUpDown size={14} className="text-gray-500 group-hover:text-gray-700"/>
                </div>
              </th>
              <th className="p-4 w-24 group cursor-pointer hover:bg-gray-200 transition-colors">
                <div className="flex items-center justify-between">
                  Sisa Stock
                  <ChevronsUpDown size={14} className="text-gray-500 group-hover:text-gray-700"/>
                </div>
              </th>
              <th className="p-4 w-32 group cursor-pointer hover:bg-gray-200 transition-colors">
                <div className="flex items-center justify-between">
                  Tanggal Pembelian
                  <ChevronsUpDown size={14} className="text-gray-500 group-hover:text-gray-700"/>
                </div>
              </th>
              <th className="p-4 w-40 group cursor-pointer hover:bg-gray-200 transition-colors">
                <div className="flex items-center justify-between">
                  Harga Pembelian Terakhir
                  <ChevronsUpDown size={14} className="text-gray-500 group-hover:text-gray-700"/>
                </div>
              </th>
              <th className="p-4 w-40 group cursor-pointer hover:bg-gray-200 transition-colors">
                <div className="flex items-center justify-between">
                  Harga Rata-Rata
                  <ChevronsUpDown size={14} className="text-gray-500 group-hover:text-gray-700"/>
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 text-sm text-gray-700">
            {data.map((item, index) => (
              <tr key={item.id} className="bg-white hover:bg-gray-50 transition-colors cursor-pointer group">
                <td className="p-4 text-center font-medium text-gray-500">{index + 1}</td>
                
                <td className="p-4 font-medium">{item.category}</td>
                
                <td className="p-4 font-semibold text-gray-900">{item.itemName}</td>
                
                <td className="p-4 font-mono text-xs text-gray-600">{item.itemCode}</td>
                
                <td className="p-4 font-mono font-medium text-gray-900 pl-8">{item.remainingStock}</td>
                
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
            <div className="text-xs text-gray-500">
                Showing <span className="font-medium text-gray-900">1</span> to <span className="font-medium text-gray-900">5</span> of <span className="font-medium text-gray-900">24</span> results
            </div>
            <div className="flex gap-1">
                <button className="px-3 py-1 text-xs border border-gray-300 rounded hover:bg-gray-200 disabled:opacity-50 text-gray-600">Previous</button>
                <button className="px-3 py-1 text-xs bg-black text-white rounded shadow-sm hover:bg-gray-800">1</button>
                <button className="px-3 py-1 text-xs border border-gray-300 rounded hover:bg-gray-200 text-gray-600">2</button>
                <button className="px-3 py-1 text-xs border border-gray-300 rounded hover:bg-gray-200 text-gray-600">3</button>
                <button className="px-3 py-1 text-xs border border-gray-300 rounded hover:bg-gray-200 disabled:opacity-50 text-gray-600">Next</button>
            </div>
      </div>
    </div>
  );
};