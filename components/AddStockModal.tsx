
import React, { useState, useEffect, useMemo } from 'react';
import { X, ChevronDown, Wrench, Plus, Image as ImageIcon, Trash2, Clock, List, AlertCircle, Calendar as CalendarIcon } from 'lucide-react';
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
    moduleName = 'Servis', 
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

  useEffect(() => {
    if (isOpen) {
        if (mode === 'edit' || mode === 'view') {
           if (initialServiceData) {
               setServiceForm(initialServiceData);
           }
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
    if (!serviceForm.aset && !serviceForm.noPolisi) return [];
    return MOCK_SERVICE_DATA.filter(s => s.aset === serviceForm.aset || s.noPolisi === serviceForm.noPolisi);
  }, [serviceForm.aset, serviceForm.noPolisi]);

  if (!isOpen) return null;

  const handleServiceChange = (field: keyof ServiceRecord, value: any) => setServiceForm(prev => ({ ...prev, [field]: value }));

  const isService = moduleName === 'Servis';
  const isViewMode = mode === 'view';

  const FormLabel = ({ children, required }: { children?: React.ReactNode, required?: boolean }) => (
      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 block">
          {children} {required && <span className="text-red-500">*</span>}
      </label>
  );

  const InputField = ({ label, value, field, type = "text", placeholder = "", required = false }: any) => (
      <div>
          <FormLabel required={required}>{label}</FormLabel>
          <input 
              type={type} 
              placeholder={placeholder}
              className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm font-bold text-gray-900 focus:outline-none focus:border-black bg-white shadow-sm transition-all"
              value={value || ''}
              onChange={(e) => handleServiceChange(field, e.target.value)}
              disabled={isViewMode}
          />
      </div>
  );

  return (
    <div className="fixed inset-0 bg-black/75 z-50 flex items-center justify-center backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className={`bg-white w-full max-w-6xl rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[95vh]`}>
        
        {/* Modal Header */}
        <div className="px-6 py-4 flex items-center justify-between border-b border-gray-100 bg-white">
           <div className="flex items-center gap-3">
              <div className="text-gray-900">
                <Wrench size={20} />
              </div>
              <h2 className="text-[13px] font-black tracking-tight text-gray-900 uppercase">
                 {isViewMode ? 'DETAIL CATATAN SERVIS' : 'INPUT CATATAN PEMELIHARAAN'}
              </h2>
           </div>
           <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-50 text-gray-300 hover:text-red-500 transition-all">
              <X size={20} />
           </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-6 bg-white custom-scrollbar flex flex-col lg:flex-row gap-6">
          
          {/* Main Content Area (Left) - Fields Adjusted to Screenshot */}
          <div className="flex-[2] space-y-6">
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Baris 1: Aset - Full Width */}
                    <div className="md:col-span-2">
                        <FormLabel required>Aset</FormLabel>
                        <div className="relative">
                            <select 
                                className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm font-bold text-gray-900 focus:outline-none focus:border-black appearance-none bg-white shadow-sm"
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

                    {/* Baris 2: Tanggal STNK & Jenis Servis */}
                    <InputField label="Tanggal STNK" type="date" value={serviceForm.tglStnk} field="tglStnk" required />
                    <div>
                        <FormLabel required>Jenis Servis</FormLabel>
                        <div className="relative">
                            <select 
                                className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm font-bold text-gray-900 focus:outline-none focus:border-black appearance-none bg-white shadow-sm"
                                value={serviceForm.jenisServis || ''}
                                onChange={(e) => handleServiceChange('jenisServis', e.target.value)}
                                disabled={isViewMode}
                            >
                                <option value="Servis Rutin">Servis Rutin</option>
                                <option value="Perbaikan Besar">Perbaikan Besar</option>
                                <option value="Body Repair">Body Repair</option>
                            </select>
                            <ChevronDown size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none" />
                        </div>
                    </div>

                    {/* Baris 3: Vendor - Full Width */}
                    <div className="md:col-span-2">
                        <FormLabel required>Vendor (Pilih 1 atau lebih)</FormLabel>
                        <div className="relative">
                            <input 
                                type="text" 
                                placeholder="(Pilih Vendor)"
                                className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm font-bold text-gray-900 focus:outline-none focus:border-black bg-white shadow-sm"
                                value={serviceForm.vendor || ''}
                                onChange={(e) => handleServiceChange('vendor', e.target.value)}
                                disabled={isViewMode}
                            />
                            <ChevronDown size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none" />
                        </div>
                    </div>

                    {/* Baris 4: Target Selesai & KM Kendaraan */}
                    <InputField label="Target Selesai" type="date" value={serviceForm.targetSelesai} field="targetSelesai" required />
                    <InputField label="KM Kendaraan" placeholder="Masukkan KM..." value={serviceForm.kmKendaraan} field="kmKendaraan" required />

                    {/* Baris 5: Masalah & Penyebab (Textarea) */}
                    <div>
                        <FormLabel>Masalah (maks. 1000 karakter)</FormLabel>
                        <textarea 
                            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium text-gray-900 focus:outline-none focus:border-black resize-none h-24 bg-white shadow-sm placeholder:text-gray-300"
                            placeholder="Deskripsikan masalah..."
                            value={serviceForm.masalah || ''}
                            onChange={(e) => handleServiceChange('masalah', e.target.value)}
                            disabled={isViewMode}
                        />
                    </div>
                    <div>
                        <FormLabel>Penyebab (maks. 1000 karakter)</FormLabel>
                        <textarea 
                            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium text-gray-900 focus:outline-none focus:border-black resize-none h-24 bg-white shadow-sm placeholder:text-gray-300"
                            placeholder="Deskripsikan penyebab..."
                            value={serviceForm.penyebab || ''}
                            onChange={(e) => handleServiceChange('penyebab', e.target.value)}
                            disabled={isViewMode}
                        />
                    </div>

                    {/* Baris 6: Estimasi Biaya & Jenis Pembayaran */}
                    <InputField label="Estimasi Biaya" type="number" value={serviceForm.estimasiBiaya} field="estimasiBiaya" required placeholder="0" />
                    <div>
                        <FormLabel required>Jenis Pembayaran</FormLabel>
                        <div className="relative">
                            <select 
                                className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm font-bold text-gray-900 focus:outline-none focus:border-black appearance-none bg-white shadow-sm"
                                value={serviceForm.jenisPembayaran || ''}
                                onChange={(e) => handleServiceChange('jenisPembayaran', e.target.value)}
                                disabled={isViewMode}
                            >
                                <option value="Kasbon">Kasbon</option>
                                <option value="Transfer">Transfer</option>
                                <option value="Corporate Card">Corporate Card</option>
                            </select>
                            <ChevronDown size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none" />
                        </div>
                    </div>

                    {/* Baris 7: Nama Bank & Nomor Rekening */}
                    <InputField label="Nama Bank" value={serviceForm.namaBank} field="namaBank" required placeholder="Masukkan Nama Bank..." />
                    <InputField label="Nomor Rekening" value={serviceForm.nomorRekening} field="nomorRekening" required placeholder="Masukkan No. Rek..." />
                </div>
            </div>

            {/* Lampiran Section - Mempertahankan UI Monokrom */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <FormLabel>BUKTI KWITANSI / FOTO (IMG)</FormLabel>
                <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 flex flex-col items-center justify-center hover:border-black transition-all cursor-pointer group bg-white shadow-sm">
                    <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center mb-3 transition-transform group-hover:scale-110">
                        <ImageIcon size={24} className="text-gray-300 group-hover:text-black transition-colors" />
                    </div>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest group-hover:text-black transition-colors">KLIK UNTUK UNGGAH LAMPIRAN</p>
                </div>
            </div>
          </div>

          {/* Sidebar (Right) - Riwayat (Tidak berubah sesuai instruksi) */}
          <div className="flex-1 min-w-[320px] lg:max-w-[380px]">
            <div className="bg-white p-6 rounded-xl border border-gray-200 h-full flex flex-col shadow-sm">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2 text-gray-900">
                        <Clock size={18} />
                        <h3 className="text-[11px] font-black uppercase tracking-widest">RIWAYAT SEBELUMNYA</h3>
                    </div>
                    <span className="bg-black text-white text-[9px] font-black px-2 py-1 rounded uppercase tracking-tighter">{historyData.length} LOG</span>
                </div>

                <div className="p-4 bg-gray-50 border border-gray-100 rounded-lg mb-6">
                    <p className="text-[10px] font-bold text-gray-900 leading-relaxed">
                        Klik log di bawah untuk melihat rincian riwayat servis secara langsung.
                    </p>
                </div>

                <div className="space-y-6 overflow-y-auto max-h-[600px] pr-2 custom-scrollbar">
                    {historyData.length > 0 ? (
                        historyData.map((log, i) => (
                            <div key={i} className="relative pl-7 group">
                                <div className="absolute left-[3px] top-0 bottom-0 w-[2px] bg-gray-100 group-last:bottom-auto group-last:h-6"></div>
                                <div className="absolute left-[-2px] top-3 w-[12px] h-[12px] rounded-full border-[3px] border-white bg-black"></div>
                                
                                <div className="bg-white border border-gray-100 p-4 rounded-xl hover:border-black transition-all cursor-pointer shadow-sm">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="bg-black text-white text-[9px] font-black px-2 py-0.5 rounded uppercase tracking-tighter">{log.id}</span>
                                        <span className="text-[9px] font-bold text-gray-400 flex items-center gap-1 uppercase">
                                            <CalendarIcon size={10} className="text-gray-300" /> {log.tglRequest}
                                        </span>
                                    </div>
                                    <h4 className="text-[11px] font-black text-gray-900 mb-1 uppercase">{log.jenisServis || 'Pengecekan Rutin'}</h4>
                                    
                                    <div className="flex items-center justify-between pt-3 border-t border-gray-50 mt-2">
                                        <span className="text-[10px] font-black text-gray-900 uppercase">{log.kmKendaraan || 0} KM</span>
                                        <span className="text-[11px] font-black text-black">Rp {log.estimasiBiaya ? parseInt(log.estimasiBiaya).toLocaleString('id-ID') : '0'}</span>
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
            className="flex-1 py-4 text-[11px] font-black text-gray-400 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 hover:text-black transition-all uppercase tracking-widest"
          >
            BATAL
          </button>
          {!isViewMode && (
            <button 
                onClick={() => onSaveService?.(serviceForm)} 
                className="flex-[3] py-4 text-[11px] font-black text-white bg-black rounded-xl hover:bg-gray-900 transition-all flex items-center justify-center gap-2 uppercase tracking-widest active:scale-[0.98] shadow-lg shadow-black/10"
            >
                SIMPAN
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
