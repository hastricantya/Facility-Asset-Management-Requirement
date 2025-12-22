
import React from 'react';
import { Monitor, Cpu, Printer, AirVent, MoreHorizontal, ChevronLeft, ChevronRight, ChevronsUpDown } from 'lucide-react';

interface EquipmentRecord {
  id: string;
  name: string;
  type: 'PC' | 'Monitor' | 'Printer' | 'AC' | 'Other';
  serialNumber: string;
  building: string;
  pic: string;
  status: 'Good' | 'Maintenance' | 'Broken';
}

const MOCK_EQUIPMENT: EquipmentRecord[] = [
  { id: 'OE-001', name: 'Dell UltraSharp 27"', type: 'Monitor', serialNumber: 'SN-DELL-9921', building: 'Gedung Pusat Satrio', pic: 'Budi Santoso', status: 'Good' },
  { id: 'OE-002', name: 'MacBook Pro M2', type: 'PC', serialNumber: 'SN-AAPL-2023', building: 'Gedung Pusat Satrio', pic: 'Siti Aminah', status: 'Maintenance' },
  { id: 'OE-003', name: 'HP LaserJet Pro', type: 'Printer', serialNumber: 'SN-HPLJ-4455', building: 'Branch Office Surabaya', pic: 'Eko Prasetyo', status: 'Good' },
  { id: 'OE-004', name: 'Daikin Inverter 2PK', type: 'AC', serialNumber: 'SN-DKN-1100', building: 'Gedung Pusat Satrio', pic: 'Aan Junaidi', status: 'Good' },
];

export const OfficeEquipmentTable: React.FC = () => {
  const getIcon = (type: string) => {
    switch (type) {
      case 'Monitor': return <Monitor size={16} />;
      case 'PC': return <Cpu size={16} />;
      case 'Printer': return <Printer size={16} />;
      case 'AC': return <AirVent size={16} />;
      default: return <Monitor size={16} />;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-separate border-spacing-0">
          <thead>
            <tr className="bg-white border-b border-gray-100">
              <th className="p-5 w-20 border-b border-gray-100 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">No</th>
              <th className="p-5 border-b border-gray-100 group cursor-pointer hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Nama Barang</span>
                  <ChevronsUpDown size={12} className="text-gray-300" />
                </div>
              </th>
              <th className="p-5 border-b border-gray-100 text-[10px] font-black text-gray-400 uppercase tracking-widest">Serial Number</th>
              <th className="p-5 border-b border-gray-100 text-[10px] font-black text-gray-400 uppercase tracking-widest">Gedung</th>
              <th className="p-5 border-b border-gray-100 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Status</th>
              <th className="p-5 w-32 text-center text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 text-[12px]">
            {MOCK_EQUIPMENT.map((item, idx) => (
              <tr key={item.id} className="hover:bg-gray-50/50 transition-colors group">
                <td className="p-5 text-center font-bold text-gray-400 border-r border-gray-50/50">{idx + 1}</td>
                <td className="p-5">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-black border border-gray-100">
                      {getIcon(item.type)}
                    </div>
                    <div>
                      <div className="font-black text-black uppercase tracking-tight">{item.name}</div>
                      <div className="text-[10px] text-gray-400 font-bold uppercase">{item.type}</div>
                    </div>
                  </div>
                </td>
                <td className="p-5 font-mono font-bold text-gray-500">{item.serialNumber}</td>
                <td className="p-5">
                  <div className="font-bold text-black uppercase">{item.building}</div>
                  <div className="text-[10px] text-gray-400">PIC: {item.pic}</div>
                </td>
                <td className="p-5 text-center">
                  <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase border ${
                    item.status === 'Good' ? 'bg-black text-white border-black' : 
                    item.status === 'Maintenance' ? 'bg-gray-100 text-gray-600 border-gray-200' : 
                    'bg-red-500 text-white border-red-600'
                  }`}>
                    {item.status}
                  </span>
                </td>
                <td className="p-5 text-center">
                  <button className="p-2 text-gray-300 hover:text-black rounded-lg transition-all">
                    <MoreHorizontal size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="px-6 py-4 bg-white border-t border-gray-100 flex items-center justify-between text-[11px] font-black text-gray-400 uppercase tracking-widest">
        <span>Menampilkan {MOCK_EQUIPMENT.length} Peralatan Kantor</span>
        <div className="flex gap-2">
          <button className="p-2 hover:text-black transition-colors"><ChevronLeft size={16} /></button>
          <button className="p-2 hover:text-black transition-colors"><ChevronRight size={16} /></button>
        </div>
      </div>
    </div>
  );
};
