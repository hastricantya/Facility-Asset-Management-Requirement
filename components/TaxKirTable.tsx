import React from 'react';
import { TaxKirRecord } from '../types';
import { ChevronsUpDown, Eye, Pencil, Trash2, Search, Filter, Plus } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface Props {
  data: TaxKirRecord[];
  onEdit?: (item: TaxKirRecord) => void;
  onView?: (item: TaxKirRecord) => void;
  onDelete?: (id: string) => void;
}

export const TaxKirTable: React.FC<Props> = ({ data, onEdit, onView, onDelete }) => {
  const { t } = useLanguage();

  const TableHeader = ({ label }: { label: string }) => (
    <th className="p-4 group cursor-pointer hover:bg-gray-300/30 transition-colors border-b border-gray-200">
      <div className="flex items-center justify-between gap-2">
        <span className="text-[11px] font-bold text-gray-500 uppercase tracking-tight">{label}</span>
        <ChevronsUpDown size={14} className="text-gray-300 group-hover:text-gray-500" />
      </div>
    </th>
  );

  if (data.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#F2F2F2]">
              <TableHeader label="No Request" />
              <TableHeader label="No Polisi" />
              <TableHeader label="Tgl Request" />
              <TableHeader label="Jenis" />
              <TableHeader label="Channel" />
              <TableHeader label="Cabang" />
              <TableHeader label="Status" />
              <TableHeader label="Status Approval" />
              <th className="p-4 border-b border-gray-200 text-[11px] font-bold text-gray-500 uppercase text-center">Action</th>
            </tr>
          </thead>
        </table>
        <div className="flex flex-col items-center justify-center py-20 bg-gray-50/30">
          <div className="relative mb-6">
            <svg width="240" height="160" viewBox="0 0 240 160" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="40" y="40" width="160" height="100" rx="12" fill="#000000" fillOpacity="0.05" />
              <path d="M60 60H180V130H60V60Z" fill="white" />
              <rect x="80" y="30" width="80" height="20" rx="10" fill="#000000" fillOpacity="0.1" />
              <path d="M110 85L130 105M130 85L110 105" stroke="#000000" strokeWidth="4" strokeLinecap="round" />
              <circle cx="120" cy="40" r="4" fill="#000000" />
              <path d="M140 50L150 40M155 60L165 55" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />
              <path d="M45 145H195" stroke="#E2E8F0" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
          <p className="text-gray-400 text-sm font-medium">Tidak ada data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1200px] text-left border-collapse">
          <thead>
            <tr className="bg-[#F2F2F2]">
              <TableHeader label="No Request" />
              <TableHeader label="No Polisi" />
              <TableHeader label="Tgl Request" />
              <TableHeader label="Jenis" />
              <TableHeader label="Channel" />
              <TableHeader label="Cabang" />
              <TableHeader label="Status" />
              <TableHeader label="Status Approval" />
              <th className="p-4 border-b border-gray-200 text-[11px] font-bold text-gray-500 uppercase text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-sm">
            {data.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                <td className="p-4 font-bold text-gray-900">{item.id}</td>
                <td className="p-4 font-black text-gray-900">{item.noPolisi}</td>
                <td className="p-4 text-gray-600 font-medium">{item.tglRequest}</td>
                <td className="p-4 text-gray-600">{item.jenis}</td>
                <td className="p-4 text-gray-600">{item.channel}</td>
                <td className="p-4 text-gray-600">{item.cabang}</td>
                <td className="p-4">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-black uppercase bg-gray-100 text-gray-600 border border-gray-200">
                    {item.status}
                  </span>
                </td>
                <td className="p-4 text-center">
                  <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-gray-400 font-bold text-xs border border-gray-200">
                    {item.statusApproval}
                  </div>
                </td>
                <td className="p-4 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <button onClick={(e) => { e.stopPropagation(); onView?.(item); }} className="p-1.5 text-black hover:text-gray-600 transition-colors">
                      <Eye size={18} />
                    </button>
                    <button onClick={(e) => { e.stopPropagation(); onEdit?.(item); }} className="p-1.5 text-black hover:text-gray-600 transition-colors">
                      <Pencil size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};