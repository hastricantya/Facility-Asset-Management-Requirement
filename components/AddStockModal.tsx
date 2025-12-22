
import React, { useState, useEffect, useMemo } from 'react';
import { X, Clock, Calendar, ArrowRight, ExternalLink, Info, Save } from 'lucide-react';
import { VehicleRecord, ServiceRecord } from '../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  moduleName?: string;
  onSaveService?: (service: Partial<ServiceRecord>) => void;
  initialServiceData?: ServiceRecord;
  allServiceData?: ServiceRecord[];
  mode?: 'create' | 'edit' | 'view';
  vehicleList?: VehicleRecord[];
}

export const AddStockModal: React.FC<Props> = ({ 
    isOpen, 
    onClose, 
    onSaveService,
    initialServiceData,
    allServiceData = [],
    mode = 'create',
    vehicleList = [],
}) => {
  const [serviceForm, setServiceForm] = useState<Partial<ServiceRecord>>({
      jenisServis: 'Servis Rutin',
      jenisPembayaran: 'Kasbon',
      spareParts: []
  });

  const [currentMode, setCurrentMode] = useState<'create' | 'edit' | 'view'>(mode);

  useEffect(() => {
    if (isOpen) {
        setCurrentMode(mode);
        if ((mode === 'edit' || mode === 'view') && initialServiceData) {
            setServiceForm(initialServiceData);
        } else {
            setServiceForm({
                jenisServis: 'Servis Rutin',
                jenisPembayaran: 'Kasbon',
                tglRequest: new Date().toISOString().split('T')[0],
                spareParts: []
            });
        }
    }
  }, [isOpen, initialServiceData, mode]);

  const historyData = useMemo(() => {
    if (!serviceForm.noPolisi) return [];
    return allServiceData
      .filter(s => s.noPolisi === serviceForm.noPolisi)
      .sort((a, b) => new Date(b.tglRequest).getTime() - new Date(a.tglRequest).getTime());
  }, [serviceForm.noPolisi, allServiceData]);

  const handleServiceChange = (field: keyof ServiceRecord, value: any) => {
      setServiceForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
      if (onSaveService) {
          onSaveService(serviceForm);
      }
      onClose();
  };

  const handleSelectHistoryRecord = (record: ServiceRecord) => {
      setServiceForm(record);
      setCurrentMode('view');
  };

  const isViewMode = currentMode === 'view';

  if (!isOpen) return null;

  // Fix: Made children optional to prevent TypeScript errors regarding missing children prop during JSX rendering.
  const InputLabel = ({ children }: { children?: React.ReactNode }) => (
    <label className="block text-[10px] font-bold text-gray-500 uppercase mb-2 tracking-widest">{children}</label>
  );

  return (
    <div className="fixed inset-0 bg-black/75 z-50 flex items-center justify-center backdrop-blur-md p-0 sm:p-4">
      <div className="bg-white w-full max-w-[1400px] rounded-none md:rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[95vh]">
        {/* Header */}
        <div className="px-8 py-5 bg-white border-b border-gray-100 flex items-center justify-between shrink-0">
          <h2 className="text-lg font-black tracking-tighter text-black uppercase">
             {currentMode === 'view' ? 'Laporan Detail Servis' : 'Tambah Request Servis Kendaraan'}
          </h2>
          <button className="text-gray-400 hover:text-black p-2 rounded-full bg-gray-50 transition-all hover:rotate-90" onClick={onClose}>
            <X size={20} />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 md:p-10 bg-gray-50/50 custom-scrollbar">
             <div className="flex flex-col lg:flex-row gap-8">
                 {/* Main Form Area */}
                 <div className="flex-1 bg-white p-8 md:p-10 rounded-2xl border border-gray-200 shadow-sm relative">
                     <div className="mb-10">
                        <span className="text-[11px] font-black text-black uppercase tracking-[0.2em]">Data Request</span>
                        <div className="h-[1px] w-full bg-gray-100 mt-3"></div>
                     </div>

                     <div className="space-y-6">
                         {/* Aset */}
                         <div>
                             <InputLabel>Aset Kendaraan *</InputLabel>
                             <select 
                                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3.5 text-sm font-bold text-black focus:border-black focus:ring-2 focus:ring-gray-100 outline-none disabled:bg-gray-50 transition-all appearance-none shadow-sm"
                                value={serviceForm.aset || ''}
                                onChange={(e) => {
                                    const vehicle = vehicleList.find(v => v.nama === e.target.value);
                                    setServiceForm(prev => ({ 
                                        ...prev, 
                                        aset: e.target.value,
                                        noPolisi: vehicle?.noPolisi 
                                    }));
                                }}
                                disabled={isViewMode}
                             >
                                 <option value="">(Pilih Kendaraan)</option>
                                 {vehicleList.map(v => <option key={v.id} value={v.nama}>{v.noPolisi} - {v.nama}</option>)}
                             </select>
                         </div>

                         {/* Tanggal STNK & Jenis Servis */}
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                             <div>
                                 <InputLabel>Tanggal STNK *</InputLabel>
                                 <input 
                                    type="date" 
                                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3.5 text-sm font-bold text-black focus:border-black outline-none disabled:bg-gray-50 shadow-sm"
                                    value={serviceForm.tglStnk || ''}
                                    onChange={(e) => handleServiceChange('tglStnk', e.target.value)}
                                    disabled={isViewMode}
                                 />
                             </div>
                             <div>
                                 <InputLabel>Jenis Servis *</InputLabel>
                                 <select 
                                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3.5 text-sm font-bold text-black focus:border-black outline-none appearance-none shadow-sm"
                                    value={serviceForm.jenisServis || ''}
                                    onChange={(e) => handleServiceChange('jenisServis', e.target.value)}
                                    disabled={isViewMode}
                                 >
                                     <option value="Servis Rutin">Servis Rutin</option>
                                     <option value="Perbaikan">Perbaikan</option>
                                     <option value="Emergency">Emergency</option>
                                 </select>
                             </div>
                         </div>

                         {/* Vendor */}
                         <div>
                             <InputLabel>Vendor Bengkel *</InputLabel>
                             <select 
                                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3.5 text-sm font-bold text-black focus:border-black outline-none appearance-none shadow-sm"
                                value={serviceForm.vendor || ''}
                                onChange={(e) => handleServiceChange('vendor', e.target.value)}
                                disabled={isViewMode}
                             >
                                 <option value="">(Pilih Vendor)</option>
                                 <option value="Daihatsu Service Center">Daihatsu Service Center</option>
                                 <option value="Auto 2000">Auto 2000</option>
                                 <option value="Bengkel Rekanan">Bengkel Rekanan</option>
                             </select>
                         </div>

                         {/* Target Selesai & KM Kendaraan */}
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                             <div>
                                 <InputLabel>Target Selesai *</InputLabel>
                                 <input 
                                    type="date" 
                                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3.5 text-sm font-bold text-black focus:border-black shadow-sm"
                                    value={serviceForm.targetSelesai || ''}
                                    onChange={(e) => handleServiceChange('targetSelesai', e.target.value)}
                                    disabled={isViewMode}
                                 />
                             </div>
                             <div>
                                 <InputLabel>KM Kendaraan (Odometer) *</InputLabel>
                                 <input 
                                    type="number" 
                                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3.5 text-sm font-bold text-black focus:border-black placeholder:text-gray-300 shadow-sm"
                                    value={serviceForm.kmKendaraan || ''}
                                    placeholder="0"
                                    onChange={(e) => handleServiceChange('kmKendaraan', e.target.value)}
                                    disabled={isViewMode}
                                 />
                             </div>
                         </div>

                         {/* Masalah & Penyebab */}
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                             <div>
                                 <InputLabel>Keluhan / Masalah</InputLabel>
                                 <textarea 
                                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3.5 text-sm font-bold text-black focus:border-black min-h-[100px] shadow-sm transition-all"
                                    value={serviceForm.masalah || ''}
                                    onChange={(e) => handleServiceChange('masalah', e.target.value)}
                                    disabled={isViewMode}
                                    placeholder="Tuliskan keluhan..."
                                 />
                             </div>
                             <div>
                                 <InputLabel>Penyebab (Diagnosa Bengkel)</InputLabel>
                                 <textarea 
                                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3.5 text-sm font-bold text-black focus:border-black min-h-[100px] shadow-sm transition-all"
                                    value={serviceForm.penyebab || ''}
                                    onChange={(e) => handleServiceChange('penyebab', e.target.value)}
                                    disabled={isViewMode}
                                    placeholder="Diagnosa..."
                                 />
                             </div>
                         </div>

                         {/* Estimasi Biaya & Pembayaran */}
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                             <div>
                                 <InputLabel>Estimasi Biaya (Rp) *</InputLabel>
                                 <input 
                                    type="number" 
                                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3.5 text-sm font-black text-black focus:border-black shadow-sm"
                                    value={serviceForm.estimasiBiaya || ''}
                                    onChange={(e) => handleServiceChange('estimasiBiaya', e.target.value)}
                                    disabled={isViewMode}
                                    placeholder="0"
                                 />
                             </div>
                             <div>
                                 <InputLabel>Jenis Pembayaran *</InputLabel>
                                 <select 
                                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3.5 text-sm font-bold text-black focus:border-black appearance-none shadow-sm"
                                    value={serviceForm.jenisPembayaran || ''}
                                    onChange={(e) => handleServiceChange('jenisPembayaran', e.target.value)}
                                    disabled={isViewMode}
                                 >
                                     <option value="Kasbon">Kasbon</option>
                                     <option value="Reimburse">Reimburse</option>
                                     <option value="Direct Pay">Direct Pay</option>
                                 </select>
                             </div>
                         </div>
                     </div>

                     <div className="mt-12 flex justify-end gap-3">
                         {!isViewMode && (
                             <button 
                                onClick={handleSave}
                                className="bg-black text-white px-16 py-3.5 rounded-xl text-[11px] font-black uppercase tracking-[0.2em] shadow-xl shadow-black/10 hover:bg-gray-900 active:scale-95 transition-all flex items-center gap-2"
                             >
                                 <Save size={16} /> Simpan Data
                             </button>
                         )}
                         {isViewMode && (
                            <button 
                                onClick={onClose}
                                className="bg-gray-100 text-black px-12 py-3.5 rounded-xl text-[11px] font-black uppercase tracking-[0.2em] hover:bg-gray-200 transition-all"
                            >
                                Tutup Laporan
                            </button>
                         )}
                     </div>
                 </div>

                 {/* Sidebar History Area */}
                 <div className="lg:w-[400px] shrink-0">
                    <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col h-full min-h-[600px]">
                        <div className="flex items-center justify-between mb-6 pb-3 border-b border-gray-100">
                            <div className="flex items-center gap-2">
                                <Clock size={16} className="text-black" />
                                <h3 className="text-[11px] font-black text-black uppercase tracking-widest">RIWAYAT LOG</h3>
                            </div>
                            <span className="text-[10px] font-black bg-black text-white px-3 py-1 rounded-full uppercase">
                                {historyData.length} Data
                            </span>
                        </div>
                        
                        <div className="mb-6 bg-gray-50 p-4 rounded-xl border border-gray-100">
                             <p className="text-[10px] font-bold text-gray-500 leading-relaxed italic">
                                <Info className="inline-block mr-2 text-black" size={14} />
                                Klik log riwayat untuk memuat rincian data ke dalam panel utama secara otomatis.
                             </p>
                        </div>

                        {historyData.length > 0 ? (
                            <div className="flex-1 overflow-y-auto space-y-5 pr-2 custom-scrollbar">
                                {historyData.map((log) => {
                                    const isCurrent = log.id === serviceForm.id;
                                    return (
                                        <button 
                                            key={log.id}
                                            onClick={() => handleSelectHistoryRecord(log)}
                                            className={`w-full text-left p-5 rounded-2xl border transition-all flex flex-col gap-3 group/item ${
                                                isCurrent 
                                                ? 'bg-black text-white border-black shadow-lg scale-[1.02]' 
                                                : 'bg-white border-gray-100 hover:border-black hover:shadow-md'
                                            }`}
                                        >
                                            <div className="flex justify-between items-start">
                                                <span className={`text-[10px] font-black px-2 py-0.5 rounded uppercase ${
                                                    isCurrent ? 'bg-white text-black' : 'bg-gray-100 text-black'
                                                }`}>
                                                    {log.id}
                                                </span>
                                                <div className={`flex items-center gap-1.5 text-[10px] font-bold ${isCurrent ? 'text-gray-400' : 'text-gray-400'}`}>
                                                    <Calendar size={12} />
                                                    {log.tglRequest}
                                                </div>
                                            </div>
                                            
                                            <h4 className={`text-xs font-black uppercase tracking-tight ${isCurrent ? 'text-white' : 'text-black'}`}>
                                                {log.jenisServis}
                                            </h4>
                                            
                                            <div className={`text-[11px] font-bold italic line-clamp-2 ${isCurrent ? 'text-gray-300' : 'text-gray-500'}`}>
                                                "{log.masalah}"
                                            </div>
                                            
                                            <div className={`flex items-center justify-between border-t pt-3 mt-1 ${isCurrent ? 'border-gray-800' : 'border-gray-50'}`}>
                                                <div className={`text-[11px] font-black ${isCurrent ? 'text-white' : 'text-black'}`}>
                                                    {parseInt(log.kmKendaraan || '0').toLocaleString('id-ID')} KM
                                                </div>
                                                <div className={`text-[11px] font-black ${isCurrent ? 'text-white' : 'text-black'}`}>
                                                    Rp {parseInt(log.estimasiBiaya || '0').toLocaleString('id-ID')}
                                                </div>
                                            </div>
                                            {isCurrent && (
                                                <div className="flex items-center gap-2 text-[9px] font-black text-white/50 uppercase mt-1">
                                                    <ArrowRight size={10} /> Menampilkan Detail
                                                </div>
                                            )}
                                        </button>
                                    );
                                })}
                            </div>
                        ) : (
                            <div className="flex-1 flex flex-col items-center justify-center text-center p-8 opacity-20">
                                <Clock size={48} className="text-gray-400 mb-4" />
                                <p className="text-[11px] font-bold text-gray-500 uppercase tracking-widest leading-relaxed">Belum ada riwayat servis<br/>untuk unit ini.</p>
                            </div>
                        )}
                    </div>
                 </div>
             </div>
        </div>
      </div>
    </div>
  );
};
