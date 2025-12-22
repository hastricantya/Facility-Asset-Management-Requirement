
import React, { useState, useEffect } from 'react';
import { X, FileText, Save, Calendar, ShieldCheck, DollarSign, Building } from 'lucide-react';
import { TaxKirRecord, VehicleRecord } from '../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Partial<TaxKirRecord>) => void;
  initialData?: TaxKirRecord;
  mode?: 'create' | 'edit' | 'view';
  vehicleList?: VehicleRecord[];
}

export const TaxKirModal: React.FC<Props> = ({ isOpen, onClose, onSave, initialData, mode = 'create', vehicleList = [] }) => {
  const [form, setForm] = useState<Partial<TaxKirRecord>>({
    jenis: 'Pajak STNK',
    status: 'Proses',
    statusApproval: '0',
    tglRequest: new Date().toISOString().split('T')[0],
    jenisPembayaran: 'Kasbon'
  });

  useEffect(() => {
    if (isOpen && initialData) {
      setForm(initialData);
    } else if (isOpen) {
      setForm({
        jenis: 'Pajak STNK',
        status: 'Proses',
        statusApproval: '0',
        tglRequest: new Date().toISOString().split('T')[0],
        jenisPembayaran: 'Kasbon'
      });
    }
  }, [isOpen, initialData]);

  if (!isOpen) return null;

  const isView = mode === 'view';

  const SectionHeader = ({ icon: Icon, title }: { icon: any, title: string }) => (
    <div className="flex items-center gap-2 mb-6 pb-2 border-b border-gray-100">
      <Icon size={16} className="text-black" />
      <h3 className="text-xs font-black text-black uppercase tracking-widest">{title}</h3>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black/75 z-50 flex items-center justify-center backdrop-blur-md p-4">
      <div className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        <div className="px-8 py-5 bg-white border-b border-gray-100 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gray-50 rounded-lg">
              <ShieldCheck size={18} className="text-black" />
            </div>
            <h2 className="text-base font-black tracking-tight text-black uppercase">
              {mode === 'create' ? 'Permintaan Pajak & KIR' : mode === 'edit' ? 'Edit Request Pajak/KIR' : 'Detail Pajak & KIR'}
            </h2>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-black p-2 rounded-full bg-gray-50 transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-8 bg-white custom-scrollbar">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Identitas Unit */}
            <div className="bg-white p-8 rounded-2xl border border-gray-200 space-y-6">
              <SectionHeader icon={Building} title="Informasi Kendaraan" />
              <div className="space-y-5">
                <div>
                  <label className="block text-[10px] font-bold text-gray-500 uppercase mb-2 tracking-widest">Pilih Unit</label>
                  <select 
                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold text-black focus:border-black outline-none disabled:bg-gray-50 transition-all appearance-none"
                    value={form.aset || ''}
                    onChange={(e) => {
                        const v = vehicleList.find(x => x.nama === e.target.value);
                        setForm({...form, aset: e.target.value, noPolisi: v?.noPolisi, channel: v?.channel, cabang: v?.cabang});
                    }}
                    disabled={isView}
                  >
                    <option value="">(Pilih Unit)</option>
                    {vehicleList.map(v => <option key={v.id} value={v.nama}>{v.noPolisi} - {v.nama}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-500 uppercase mb-2 tracking-widest">Jenis Pengurusan</label>
                  <div className="flex gap-3">
                    {['Pajak STNK', 'KIR'].map(type => (
                        <button
                            key={type}
                            disabled={isView}
                            onClick={() => setForm({...form, jenis: type})}
                            className={`flex-1 py-3 text-xs font-black rounded-xl border transition-all ${
                                form.jenis === type ? 'bg-black text-white border-black' : 'bg-white text-gray-400 border-gray-200 hover:border-black hover:text-black'
                            }`}
                        >
                            {type}
                        </button>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-[10px] font-bold text-gray-500 uppercase mb-2 tracking-widest">Channel</label>
                        <input type="text" readOnly className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm font-bold text-gray-400" value={form.channel || '-'} />
                    </div>
                    <div>
                        <label className="block text-[10px] font-bold text-gray-500 uppercase mb-2 tracking-widest">Cabang</label>
                        <input type="text" readOnly className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm font-bold text-gray-400" value={form.cabang || '-'} />
                    </div>
                </div>
              </div>
            </div>

            {/* Administrasi & Biaya */}
            <div className="bg-white p-8 rounded-2xl border border-gray-200 space-y-6">
              <SectionHeader icon={DollarSign} title="Administrasi & Biaya" />
              <div className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-[10px] font-bold text-gray-500 uppercase mb-2 tracking-widest">Tgl Request</label>
                        <input 
                            type="date" 
                            className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold text-black focus:border-black outline-none disabled:bg-gray-50 transition-all"
                            value={form.tglRequest || ''}
                            onChange={(e) => setForm({...form, tglRequest: e.target.value})}
                            disabled={isView}
                        />
                    </div>
                    <div>
                        <label className="block text-[10px] font-bold text-gray-500 uppercase mb-2 tracking-widest">Target Selesai</label>
                        <input 
                            type="date" 
                            className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold text-black focus:border-black outline-none disabled:bg-gray-50 transition-all"
                            value={form.targetSelesai || ''}
                            onChange={(e) => setForm({...form, targetSelesai: e.target.value})}
                            disabled={isView}
                        />
                    </div>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-500 uppercase mb-2 tracking-widest">Estimasi Biaya (Rp)</label>
                  <input 
                    type="number" 
                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm font-black text-black focus:border-black outline-none disabled:bg-gray-50 transition-all placeholder:text-gray-300"
                    value={form.estimasiBiaya || ''}
                    onChange={(e) => setForm({...form, estimasiBiaya: e.target.value})}
                    disabled={isView}
                    placeholder="0"
                  />
                </div>
                <div>
                    <label className="block text-[10px] font-bold text-gray-500 uppercase mb-2 tracking-widest">Metode Pembayaran</label>
                    <select 
                        className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold text-black focus:border-black outline-none disabled:bg-gray-50 transition-all appearance-none"
                        value={form.jenisPembayaran || ''}
                        onChange={(e) => setForm({...form, jenisPembayaran: e.target.value})}
                        disabled={isView}
                    >
                        <option value="Kasbon">Kasbon</option>
                        <option value="Langsung">Langsung (Reimbursement)</option>
                        <option value="Corporate Card">Corporate Card</option>
                    </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="px-8 py-6 bg-white border-t border-gray-100 flex gap-4">
          {!isView && (
            <>
                <button onClick={onClose} className="flex-1 py-4 text-[11px] font-black text-gray-400 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 hover:text-black transition-all uppercase tracking-widest">Batal</button>
                <button 
                    onClick={() => onSave(form)} 
                    className="flex-[2] py-4 text-[11px] font-black text-white bg-black rounded-xl hover:bg-gray-900 transition-all flex items-center justify-center gap-2 uppercase tracking-widest active:scale-95"
                >
                    <Save size={16} /> {mode === 'create' ? 'Ajukan Permintaan' : 'Simpan Perubahan'}
                </button>
            </>
          )}
          {isView && <button onClick={onClose} className="w-full py-4 text-[11px] font-black text-black uppercase tracking-widest bg-gray-100 rounded-xl hover:bg-gray-200 transition-all">Tutup</button>}
        </div>
      </div>
    </div>
  );
};
