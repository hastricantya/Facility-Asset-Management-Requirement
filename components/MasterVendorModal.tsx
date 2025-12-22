
import React, { useState, useEffect } from 'react';
import { X, Save, Users, Building, Phone, MapPin, Tag } from 'lucide-react';
import { MasterVendorRecord } from '../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Partial<MasterVendorRecord>) => void;
  initialData?: MasterVendorRecord | null;
  mode?: 'create' | 'edit' | 'view';
}

export const MasterVendorModal: React.FC<Props> = ({ isOpen, onClose, onSave, initialData, mode = 'create' }) => {
  const [form, setForm] = useState<Partial<MasterVendorRecord>>({
    aktif: true,
    tipe: 'Authorized Dealer',
    cabang: 'Pusat'
  });

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setForm(initialData);
      } else {
        setForm({ aktif: true, tipe: 'Authorized Dealer', cabang: 'Pusat' });
      }
    }
  }, [isOpen, initialData]);

  if (!isOpen) return null;

  const isView = mode === 'view';

  const InputLabel = ({ children }: { children?: React.ReactNode }) => (
    <label className="block text-[10px] font-bold text-gray-500 uppercase mb-2 tracking-widest">{children}</label>
  );

  const handleSave = () => {
    if (form.nama) {
      onSave(form);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center backdrop-blur-md p-4">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden flex flex-col animate-in fade-in zoom-in duration-200">
        <div className="px-8 py-5 border-b border-gray-100 flex items-center justify-between bg-white">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gray-50 rounded-lg text-black">
              <Users size={18} />
            </div>
            <h2 className="text-[13px] font-black tracking-widest text-black uppercase">
              {mode === 'create' ? 'Tambah Master Vendor' : mode === 'edit' ? 'Edit Master Vendor' : 'Detail Master Vendor'}
            </h2>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-black p-2 transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="p-8 space-y-6 overflow-y-auto max-h-[70vh] custom-scrollbar bg-white">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <InputLabel>Nama Vendor <span className="text-red-500">*</span></InputLabel>
              <div className="relative">
                <Building className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={16} />
                <input 
                  type="text" 
                  disabled={isView}
                  className="w-full bg-white border border-gray-200 rounded-xl pl-12 pr-4 py-3.5 text-sm font-bold text-black focus:border-black outline-none transition-all placeholder:text-gray-300 disabled:bg-gray-50"
                  placeholder="Nama Perusahaan..."
                  value={form.nama || ''}
                  onChange={(e) => setForm({...form, nama: e.target.value})}
                />
              </div>
            </div>

            <div>
              <InputLabel>Merek</InputLabel>
              <div className="relative">
                <Tag className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={16} />
                <input 
                  type="text" 
                  disabled={isView}
                  className="w-full bg-white border border-gray-200 rounded-xl pl-12 pr-4 py-3.5 text-sm font-bold text-black focus:border-black outline-none transition-all placeholder:text-gray-300 disabled:bg-gray-50"
                  placeholder="Merek Kendaraan..."
                  value={form.merek || ''}
                  onChange={(e) => setForm({...form, merek: e.target.value})}
                />
              </div>
            </div>

            <div>
              <InputLabel>No. Telepon</InputLabel>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={16} />
                <input 
                  type="text" 
                  disabled={isView}
                  className="w-full bg-white border border-gray-200 rounded-xl pl-12 pr-4 py-3.5 text-sm font-bold text-black focus:border-black outline-none transition-all placeholder:text-gray-300 disabled:bg-gray-50"
                  placeholder="021-XXXXXXX"
                  value={form.noTelp || ''}
                  onChange={(e) => setForm({...form, noTelp: e.target.value})}
                />
              </div>
            </div>

            <div>
              <InputLabel>Tipe Vendor</InputLabel>
              <select 
                disabled={isView}
                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3.5 text-sm font-bold text-black focus:border-black outline-none appearance-none disabled:bg-gray-50"
                value={form.tipe || ''}
                onChange={(e) => setForm({...form, tipe: e.target.value})}
              >
                <option value="Authorized Dealer">Authorized Dealer</option>
                <option value="Rental / Leasing">Rental / Leasing</option>
                <option value="Bengkel Rekanan">Bengkel Rekanan</option>
                <option value="Asuransi">Asuransi</option>
              </select>
            </div>

            <div>
              <InputLabel>Status</InputLabel>
              <div className="flex gap-3">
                <button 
                  disabled={isView}
                  onClick={() => setForm({...form, aktif: true})}
                  className={`flex-1 py-3 text-[11px] font-black rounded-xl border transition-all ${form.aktif ? 'bg-black text-white border-black' : 'bg-white text-gray-400 border-gray-200'}`}
                >
                  AKTIF
                </button>
                <button 
                  disabled={isView}
                  onClick={() => setForm({...form, aktif: false})}
                  className={`flex-1 py-3 text-[11px] font-black rounded-xl border transition-all ${!form.aktif ? 'bg-black text-white border-black' : 'bg-white text-gray-400 border-gray-200'}`}
                >
                  TIDAK AKTIF
                </button>
              </div>
            </div>

            <div className="md:col-span-2">
              <InputLabel>Alamat Lengkap</InputLabel>
              <div className="relative">
                <MapPin className="absolute left-4 top-4 text-gray-300" size={16} />
                <textarea 
                  disabled={isView}
                  className="w-full bg-white border border-gray-200 rounded-xl pl-12 pr-4 py-3.5 text-sm font-bold text-black focus:border-black outline-none transition-all placeholder:text-gray-300 disabled:bg-gray-50 min-h-[100px]"
                  placeholder="Masukkan alamat lengkap..."
                  value={form.alamat || ''}
                  onChange={(e) => setForm({...form, alamat: e.target.value})}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="px-8 py-5 bg-white border-t border-gray-100 flex gap-4">
          <button 
            onClick={onClose}
            className="flex-1 py-3.5 text-[11px] font-black text-gray-400 bg-white border border-gray-200 rounded-xl hover:bg-gray-100 hover:text-black transition-all uppercase tracking-widest"
          >
            Batal
          </button>
          {!isView && (
            <button 
              onClick={handleSave}
              disabled={!form.nama}
              className="flex-[2] py-3.5 text-[11px] font-black text-white bg-black rounded-xl hover:bg-gray-900 transition-all flex items-center justify-center gap-2 uppercase tracking-widest active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save size={16} /> Simpan Vendor
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
