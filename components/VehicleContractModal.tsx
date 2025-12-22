
import React, { useState, useEffect } from 'react';
import { X, Briefcase, Save, Calendar, DollarSign, Building, FileText } from 'lucide-react';
import { VehicleContractRecord, VehicleRecord } from '../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Partial<VehicleContractRecord>) => void;
  initialData?: VehicleContractRecord;
  mode?: 'create' | 'edit' | 'view';
  vehicleList?: VehicleRecord[];
}

export const VehicleContractModal: React.FC<Props> = ({ isOpen, onClose, onSave, initialData, mode = 'create', vehicleList = [] }) => {
  const [form, setForm] = useState<Partial<VehicleContractRecord>>({
    status: 'Aktif',
    biayaSewa: '0'
  });

  useEffect(() => {
    if (isOpen && initialData) {
      setForm(initialData);
    } else if (isOpen) {
      setForm({ status: 'Aktif', biayaSewa: '0' });
    }
  }, [isOpen, initialData]);

  if (!isOpen) return null;

  const isView = mode === 'view';

  const SectionHeader = ({ icon: Icon, title }: { icon: any, title: string }) => (
    <div className="flex items-center gap-2 mb-4 pb-2 border-b border-gray-100">
      <Icon size={16} className="text-gray-900" />
      <h3 className="text-xs font-black text-gray-900 uppercase tracking-widest">{title}</h3>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        <div className="px-6 py-4 bg-white border-b border-gray-100 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gray-50 rounded-lg">
              <Briefcase size={18} className="text-gray-900" />
            </div>
            <h2 className="text-base font-black tracking-tight text-gray-900 uppercase">
              {mode === 'create' ? 'Tambah Kontrak Baru' : mode === 'edit' ? 'Edit Kontrak Kendaraan' : 'Detail Kontrak Kendaraan'}
            </h2>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-red-500 p-2 rounded-full bg-gray-50 transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 md:p-8 bg-gray-50/30 custom-scrollbar">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Informasi Utama */}
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-5">
              <SectionHeader icon={FileText} title="Detail Perjanjian" />
              <div className="space-y-4">
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1.5 tracking-widest">Pilih Unit Kendaraan</label>
                  <select 
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-black font-bold bg-white disabled:bg-white transition-all"
                    value={form.aset || ''}
                    onChange={(e) => {
                        const v = vehicleList.find(x => x.nama === e.target.value);
                        setForm({...form, aset: e.target.value, noPolisi: v?.noPolisi});
                    }}
                    disabled={isView}
                  >
                    <option value="">(Pilih Unit)</option>
                    {vehicleList.map(v => <option key={v.id} value={v.nama}>{v.noPolisi} - {v.nama}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1.5 tracking-widest">Nomor Kontrak</label>
                  <input 
                    type="text" 
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-black font-bold bg-white disabled:bg-white"
                    value={form.noKontrak || ''}
                    onChange={(e) => setForm({...form, noKontrak: e.target.value})}
                    disabled={isView}
                    placeholder="Contoh: KTR/2024/001"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1.5 tracking-widest">Vendor / Lessor</label>
                  <input 
                    type="text" 
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-black font-bold bg-white disabled:bg-white"
                    value={form.vendor || ''}
                    onChange={(e) => setForm({...form, vendor: e.target.value})}
                    disabled={isView}
                    placeholder="Nama Perusahaan Rental/Leasing"
                  />
                </div>
              </div>
            </div>

            {/* Durasi & Biaya */}
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-5">
              <SectionHeader icon={DollarSign} title="Durasi & Biaya" />
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1.5 tracking-widest">Tanggal Mulai</label>
                        <input 
                            type="date" 
                            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-black font-bold bg-white disabled:bg-white"
                            value={form.tglMulai || ''}
                            onChange={(e) => setForm({...form, tglMulai: e.target.value})}
                            disabled={isView}
                        />
                    </div>
                    <div>
                        <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1.5 tracking-widest">Tanggal Selesai</label>
                        <input 
                            type="date" 
                            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-black font-bold bg-white disabled:bg-white"
                            value={form.tglBerakhir || ''}
                            onChange={(e) => setForm({...form, tglBerakhir: e.target.value})}
                            disabled={isView}
                        />
                    </div>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1.5 tracking-widest">Biaya Sewa / Bulan (Rp)</label>
                  <input 
                    type="number" 
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-black font-mono font-bold bg-white disabled:bg-white"
                    value={form.biayaSewa || ''}
                    onChange={(e) => setForm({...form, biayaSewa: e.target.value})}
                    disabled={isView}
                    placeholder="0"
                  />
                </div>
                <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1.5 tracking-widest">Status Kontrak</label>
                    <select 
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-black font-bold bg-white disabled:bg-white"
                        value={form.status || ''}
                        onChange={(e) => setForm({...form, status: e.target.value as any})}
                        disabled={isView}
                    >
                        <option value="Aktif">Aktif</option>
                        <option value="Selesai">Selesai / Putus</option>
                    </select>
                </div>
                <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1.5 tracking-widest">Keterangan Tambahan</label>
                    <textarea 
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-black font-medium bg-white disabled:bg-white min-h-[60px]"
                        value={form.keterangan || ''}
                        onChange={(e) => setForm({...form, keterangan: e.target.value})}
                        disabled={isView}
                        placeholder="Misal: Termasuk asuransi, Free maintenance.."
                    />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="px-6 py-4 bg-white border-t border-gray-100 flex gap-3">
          {!isView && (
            <>
                <button onClick={onClose} className="flex-1 py-3 text-xs font-bold text-gray-400 uppercase tracking-widest bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">Batal</button>
                <button 
                    onClick={() => onSave(form)} 
                    className="flex-[2] py-3 text-xs font-black text-white uppercase tracking-widest bg-black rounded-xl shadow-lg hover:bg-gray-800 transition-all flex items-center justify-center gap-2"
                >
                    <Save size={16} /> {mode === 'create' ? 'Daftarkan Kontrak' : 'Simpan Perubahan'}
                </button>
            </>
          )}
          {isView && <button onClick={onClose} className="w-full py-3 text-xs font-black text-gray-700 uppercase tracking-widest bg-gray-100 rounded-xl hover:bg-gray-200 transition-all">Tutup</button>}
        </div>
      </div>
    </div>
  );
};
