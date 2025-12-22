
import React, { useState, useEffect, useMemo } from 'react';
import { X, ChevronDown, Wrench, Plus, Image as ImageIcon, Trash2, Clock, List, AlertCircle } from 'lucide-react';
import { VehicleRecord, ServiceRecord, AssetRecord, SparePart } from '../types';
import { useLanguage } from '../contexts/LanguageContext';
import { MOCK_SERVICE_DATA } from '../constants';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  moduleName?: string;
  onSaveService?: (service: Partial<ServiceRecord>) => void;
  initialServiceData?: ServiceRecord;
  initialAssetData?: AssetRecord;
  mode?: 'create' | 'edit' | 'view';
  vehicleList?: VehicleRecord[];
}

export const AddStockModal: React.FC<Props> = ({ 
    isOpen, 
    onClose, 
    moduleName = 'ATK', 
    onSaveService,
    initialServiceData,
    mode = 'create',
    vehicleList = []
}) => {
  const { t } = useLanguage();
  const [serviceForm, setServiceForm] = useState<Partial<ServiceRecord>>({
      jenisServis: 'Servis Rutin',
      jenisPembayaran: 'Kasbon',
      tglRequest: new Date().toISOString().split('T')[0],
      spareParts: []
  });

  const [spareParts, setSpareParts] = useState<SparePart[]>([]);

  useEffect(() => {
    if (isOpen) {
        if (mode === 'edit' || mode === 'view') {
           if (initialServiceData) {
               setServiceForm(initialServiceData);
               setSpareParts(initialServiceData.spareParts || []);
           }
        } else {
            setServiceForm({ 
                jenisServis: 'Servis Rutin', 
                jenisPembayaran: 'Kasbon',
                tglRequest: new Date().toISOString().split('T')[0],
                spareParts: []
            });
            setSpareParts([]);
        }
    }
  }, [isOpen, initialServiceData, mode]);

  const historyData = useMemo(() => {
    if (!serviceForm.aset && !serviceForm.noPolisi) return [];
    return MOCK_SERVICE_DATA.filter(s => s.aset === serviceForm.aset || s.noPolisi === serviceForm.noPolisi);
  }, [serviceForm.aset, serviceForm.noPolisi]);

  const totalBiaya = useMemo(() => {
    return spareParts.reduce((acc, curr) => {
        const price = typeof curr.price === 'string' 
            ? parseInt(curr.price.replace(/[^0-9]/g, '')) || 0 
            : curr.price;
        return acc + (price * curr.qty);
    }, 0);
  }, [spareParts]);

  if (!isOpen) return null;

  const handleServiceChange = (field: keyof ServiceRecord, value: any) => setServiceForm(prev => ({ ...prev, [field]: value }));

  const addSparePart = () => {
      setSpareParts([...spareParts, { name: '', qty: 1, price: '0' }]);
  };

  const removeSparePart = (index: number) => {
      setSpareParts(spareParts.filter((_, i) => i !== index));
  };

  const updateSparePart = (index: number, field: keyof SparePart, value: any) => {
      const newParts = [...spareParts];
      newParts[index] = { ...newParts[index], [field]: value };
      setSpareParts(newParts);
  };

  const isService = moduleName === 'Servis';
  const isViewMode = mode === 'view';

  const FormLabel = ({ children, required }: { children?: React.ReactNode, required?: boolean }) => (
      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 block">
          {children} {required && <span className="text-red-500">*</span>}
      </label>
  );

  return (
    <div className="fixed inset-0 bg-black/75 z-50 flex items-center justify-center backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className={`bg-white w-full ${isService ? 'max-w-6xl' : 'max-w-md'} rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[95vh]`}>
        
        {/* Modal Header */}
        <div className="px-6 py-4 flex items-center justify-between border-b border-gray-100 bg-white">
           <div className="flex items-center gap-3">
              <div className="text-gray-900">
                <Wrench size={20} />
              </div>
              <h2 className="text-[13px] font-black tracking-tight text-gray-900 uppercase">
                 INPUT CATATAN PEMELIHARAAN
              </h2>
           </div>
           <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-50 text-gray-300 hover:text-red-500 transition-all">
              <X size={20} />
           </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-6 bg-[#f8f9fa] custom-scrollbar flex flex-col lg:flex-row gap-6">
          
          {/* Main Content Area (Left) */}
          <div className="flex-[2] space-y-6">
            {/* DATA UNIT KENDARAAN */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                    <List size={18} className="text-gray-900" />
                    <h3 className="text-[11px] font-black uppercase tracking-widest text-gray-900">DATA UNIT KENDARAAN</h3>
                </div>

                <div className="space-y-5">
                    <div>
                        <FormLabel>PILIH UNIT</FormLabel>
                        <div className="relative">
                            <select 
                                className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm font-bold text-gray-900 focus:outline-none focus:border-blue-500 appearance-none bg-white shadow-sm"
                                value={serviceForm.aset || ''}
                                onChange={(e) => {
                                    const v = vehicleList.find(x => x.nama === e.target.value);
                                    setServiceForm(prev => ({...prev, aset: e.target.value, noPolisi: v?.noPolisi}));
                                }}
                                disabled={isViewMode}
                            >
                                <option value="">(Pilih Kendaraan)</option>
                                {vehicleList.map(v => <option key={v.id} value={v.nama}>{v.noPolisi} - {v.nama}</option>)}
                            </select>
                            <ChevronDown size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none" />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <FormLabel>ODOMETER (KM)</FormLabel>
                            <input 
                                type="text" 
                                placeholder="Contoh: 45000"
                                className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm font-bold text-gray-900 focus:outline-none focus:border-blue-500 shadow-sm"
                                value={serviceForm.kmKendaraan || ''}
                                onChange={(e) => handleServiceChange('kmKendaraan', e.target.value)}
                                disabled={isViewMode}
                            />
                        </div>

                        <div>
                            <FormLabel>BENGKEL / REKANAN</FormLabel>
                            <input 
                                type="text" 
                                placeholder="Nama Bengkel"
                                className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm font-bold text-gray-900 focus:outline-none focus:border-blue-500 shadow-sm"
                                value={serviceForm.vendor || ''}
                                onChange={(e) => handleServiceChange('vendor', e.target.value)}
                                disabled={isViewMode}
                            />
                        </div>
                    </div>

                    <div>
                        <FormLabel>BUKTI KWITANSI / FOTO (IMG)</FormLabel>
                        <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 flex flex-col items-center justify-center hover:border-blue-400 hover:bg-blue-50/10 transition-all cursor-pointer group bg-white">
                            <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                                <ImageIcon size={24} className="text-gray-300 group-hover:text-blue-500 transition-colors" />
                            </div>
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest group-hover:text-blue-500 transition-colors">KLIK UNTUK UNGGAH LAMPIRAN</p>
                        </div>
                    </div>

                    <div>
                        <FormLabel>DESKRIPSI MASALAH</FormLabel>
                        <textarea 
                            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium text-gray-900 focus:outline-none focus:border-blue-500 resize-none h-24 shadow-sm placeholder:text-gray-300"
                            placeholder="Jelaskan keluhan unit..."
                            value={serviceForm.masalah || ''}
                            onChange={(e) => handleServiceChange('masalah', e.target.value)}
                            disabled={isViewMode}
                        />
                    </div>
                </div>
            </div>

            {/* RINCIAN SUKU CADANG */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <Wrench size={18} className="text-gray-900" />
                        <h3 className="text-[11px] font-black uppercase tracking-widest text-gray-900">RINCIAN SUKU CADANG</h3>
                    </div>
                    <button 
                        onClick={addSparePart}
                        className="bg-black text-white px-4 py-2 rounded-lg font-black text-[10px] flex items-center gap-2 hover:bg-gray-800 transition-all uppercase tracking-widest shadow-md active:scale-95"
                    >
                        <Plus size={14} /> TAMBAH ITEM
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100">
                                <th className="pb-4 pt-2">NAMA BARANG / DESKRIPSI</th>
                                <th className="pb-4 pt-2 px-4 text-center">QTY</th>
                                <th className="pb-4 pt-2 px-4">HARGA (RP)</th>
                                <th className="pb-4 pt-2 px-4 text-right">SUBTOTAL</th>
                                <th className="pb-4 pt-2 w-10"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {spareParts.length > 0 ? (
                                spareParts.map((item, idx) => {
                                    const rawPrice = typeof item.price === 'string' ? parseInt(item.price.replace(/[^0-9]/g, '')) || 0 : item.price;
                                    const subtotal = rawPrice * item.qty;
                                    return (
                                        <tr key={idx} className="group hover:bg-gray-50 transition-colors">
                                            <td className="py-4">
                                                <input 
                                                    type="text"
                                                    className="w-full bg-transparent border-none text-[12px] font-bold text-gray-900 focus:ring-0 placeholder:text-gray-300"
                                                    placeholder="Contoh: Oli Mesin 10-40W"
                                                    value={item.name}
                                                    onChange={(e) => updateSparePart(idx, 'name', e.target.value)}
                                                />
                                            </td>
                                            <td className="py-4 px-4">
                                                <input 
                                                    type="number"
                                                    className="w-16 mx-auto bg-white border border-gray-200 rounded px-2 py-1 text-center text-[12px] font-black focus:border-blue-500 focus:outline-none"
                                                    value={item.qty}
                                                    onChange={(e) => updateSparePart(idx, 'qty', parseInt(e.target.value) || 0)}
                                                />
                                            </td>
                                            <td className="py-4 px-4">
                                                <input 
                                                    type="text"
                                                    className="w-32 bg-white border border-gray-200 rounded px-2 py-1 text-[12px] font-bold focus:border-blue-500 focus:outline-none"
                                                    value={item.price}
                                                    onChange={(e) => updateSparePart(idx, 'price', e.target.value)}
                                                />
                                            </td>
                                            <td className="py-4 px-4 text-right font-black text-[12px] text-gray-900">
                                                Rp {subtotal.toLocaleString('id-ID')}
                                            </td>
                                            <td className="py-4 text-center">
                                                <button onClick={() => removeSparePart(idx)} className="text-gray-300 hover:text-red-500 transition-colors">
                                                    <Trash2 size={16} />
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })
                            ) : (
                                <tr>
                                    <td colSpan={5} className="py-16 text-center text-gray-400 text-[11px] font-bold italic">
                                        Belum ada rincian penggantian suku cadang.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                
                {/* Total Section */}
                <div className="mt-4 p-4 bg-[#fcfdfe] border border-gray-100 rounded-xl flex items-center justify-between">
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">TOTAL BIAYA PERBAIKAN</span>
                    <span className="text-base font-black text-[#0066ff]">Rp {totalBiaya.toLocaleString('id-ID')}</span>
                </div>
            </div>
          </div>

          {/* Sidebar (Right) - Riwayat */}
          <div className="flex-1 min-w-[320px] lg:max-w-[380px]">
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm h-full flex flex-col">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2 text-gray-900">
                        <Clock size={18} />
                        <h3 className="text-[11px] font-black uppercase tracking-widest">RIWAYAT SEBELUMNYA</h3>
                    </div>
                    <span className="bg-[#3b82f6] text-white text-[9px] font-black px-2 py-1 rounded uppercase">{historyData.length} LOG</span>
                </div>

                <div className="p-4 bg-[#eef6ff] border border-blue-100 rounded-lg mb-6">
                    <p className="text-[10px] font-bold text-[#0066ff] leading-relaxed">
                        Klik log di bawah untuk melihat rincian riwayat servis secara langsung.
                    </p>
                </div>

                <div className="space-y-6 overflow-y-auto max-h-[600px] pr-2 custom-scrollbar">
                    {historyData.length > 0 ? (
                        historyData.map((log, i) => (
                            <div key={i} className="relative pl-7 group">
                                {/* Vertical Timeline Line */}
                                <div className="absolute left-[3px] top-0 bottom-0 w-[2px] bg-blue-100 group-last:bottom-auto group-last:h-6"></div>
                                <div className="absolute left-[-2px] top-3 w-[12px] h-[12px] rounded-full border-[3px] border-white bg-blue-600 shadow-sm"></div>
                                
                                <div className="bg-[#f0f7ff]/50 border border-blue-50 p-4 rounded-xl shadow-sm hover:border-blue-400 hover:shadow-md transition-all cursor-pointer">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="bg-blue-600 text-white text-[9px] font-black px-2 py-0.5 rounded shadow-sm">{log.id}</span>
                                        <span className="text-[9px] font-bold text-gray-400 flex items-center gap-1 uppercase">
                                            <Calendar size={10} className="text-gray-300" /> {log.tglRequest}
                                        </span>
                                    </div>
                                    <h4 className="text-[11px] font-black text-gray-900 mb-1 uppercase">{log.jenisServis || 'Pengecekan Rutin'}</h4>
                                    <p className="text-[10px] text-gray-400 line-clamp-1 mb-3">..</p>
                                    
                                    <div className="flex items-center justify-between pt-3 border-t border-blue-50">
                                        <span className="text-[10px] font-black text-orange-500 uppercase">{log.kmKendaraan || 0} KM</span>
                                        <span className="text-[11px] font-black text-blue-600">Rp {log.estimasiBiaya || 0}</span>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="flex flex-col items-center justify-center py-24 opacity-20">
                            <Clock size={48} className="text-gray-400 mb-3" />
                            <p className="text-[10px] font-black uppercase tracking-widest text-center">Belum ada riwayat<br/>untuk unit ini</p>
                        </div>
                    )}
                </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-white border-t border-gray-100 flex gap-4">
          <button 
            onClick={onClose}
            className="flex-1 py-4 text-[11px] font-black text-gray-400 bg-gray-50/50 rounded-xl hover:bg-gray-100 hover:text-black transition-all uppercase tracking-widest border border-gray-100"
          >
            BATAL
          </button>
          {!isViewMode && (
            <button 
                onClick={() => onSaveService?.({...serviceForm, spareParts})} 
                className="flex-[3] py-4 text-[11px] font-black text-white bg-black rounded-xl shadow-xl shadow-black/20 hover:bg-gray-900 transition-all flex items-center justify-center gap-2 uppercase tracking-widest active:scale-[0.98]"
            >
                SIMPAN LAPORAN SERVIS
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const Calendar = ({ size, className }: { size?: number, className?: string }) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width={size || 24} 
        height={size || 24} 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        className={className}
    >
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
        <line x1="16" y1="2" x2="16" y2="6"></line>
        <line x1="8" y1="2" x2="8" y2="6"></line>
        <line x1="3" y1="10" x2="21" y2="10"></line>
    </svg>
);
