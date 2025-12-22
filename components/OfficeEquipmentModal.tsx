
import React, { useState, useEffect } from 'react';
import { X, Save, Monitor, Calendar, DollarSign, MapPin, Tag, Box } from 'lucide-react';
import { OfficeAssetRecord } from '../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Partial<OfficeAssetRecord>) => void;
  initialData?: OfficeAssetRecord | null;
  mode?: 'create' | 'edit' | 'view';
}

export const OfficeEquipmentModal: React.FC<Props> = ({ isOpen, onClose, onSave, initialData, mode = 'create' }) => {
  const [form, setForm] = useState<Partial<OfficeAssetRecord>>({
    category: 'Office Equipment',
    status: 'Active',
    location: 'Pusat',
    purchaseDate: new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setForm(initialData);
      } else {
        setForm({
          category: 'Office Equipment',
          status: 'Active',
          location: 'Pusat',
          purchaseDate: new Date().toISOString().split('T')[0]
        });
      }
    }
  }, [isOpen, initialData]);

  if (!isOpen) return null;

  const isView = mode === 'view';

  const SectionHeader = ({ icon: Icon, title }: { icon: any, title: string }) => (
    <div className="flex items-center gap-2 mb-4 pb-2 border-b border-gray-100">
      <Icon size={16} className="text-black" />
      <h3 className="text-[10px] font-black text-black uppercase tracking-widest">{title}</h3>
    </div>
  );

  const InputField = ({ label, value, field, type = "text", placeholder = "" }: any) => (
    <div>
      <label className="block text-[10px] font-bold text-gray-500 uppercase mb-2 tracking-widest">{label}</label>
      <input 
        type={type} 
        disabled={isView}
        className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold text-black focus:border-black focus:ring-2 focus:ring-gray-100 outline-none disabled:bg-gray-50 transition-all placeholder:text-gray-300 shadow-sm"
        value={value || ''}
        placeholder={placeholder}
        onChange={(e) => setForm({...form, [field]: e.target.value})}
      />
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="px-8 py-5 bg-white border-b border-gray-100 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gray-50 rounded-lg text-black">
              <Monitor size={18} />
            </div>
            <h2 className="text-base font-black tracking-tight text-black uppercase">
              {mode === 'create' ? 'Tambah Peralatan Kantor' : mode === 'edit' ? 'Edit Peralatan Kantor' : 'Detail Peralatan Kantor'}
            </h2>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-black p-2 rounded-full transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-8 bg-gray-50/20 custom-scrollbar">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Basic Info */}
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-6">
              <SectionHeader icon={Box} title="Informasi Dasar" />
              <div className="space-y-4">
                <InputField label="Asset Category" value={form.category} field="category" />
                <InputField label="Asset Number" value={form.assetNumber} field="assetNumber" placeholder="501-XXXXX" />
                <InputField label="Brand" value={form.brand} field="brand" placeholder="e.g. Modena" />
                <InputField label="Model" value={form.model} field="model" placeholder="e.g. RF 2930 W" />
              </div>
            </div>

            {/* Location & Commercial */}
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-6">
              <SectionHeader icon={MapPin} title="Lokasi & Komersial" />
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <InputField label="Location" value={form.location} field="location" />
                  <InputField label="Channel" value={form.channel} field="channel" />
                </div>
                <InputField label="Sub Location" value={form.subLocation} field="subLocation" />
                <div className="grid grid-cols-2 gap-4">
                  <InputField label="Purchase Date" type="date" value={form.purchaseDate} field="purchaseDate" />
                  <InputField label="Price" value={form.price} field="price" placeholder="Rp 0" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-500 uppercase mb-2 tracking-widest">Status</label>
                  <select 
                    disabled={isView}
                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold text-black focus:border-black outline-none appearance-none transition-all"
                    value={form.status}
                    onChange={(e) => setForm({...form, status: e.target.value as 'Active' | 'Inactive'})}
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-8 py-5 bg-white border-t border-gray-100 flex justify-end gap-3 shrink-0">
          <button onClick={onClose} className="px-8 py-3 text-[11px] font-black text-gray-400 bg-white border border-gray-200 rounded-xl hover:bg-gray-100 transition-all uppercase tracking-widest">
            Batal
          </button>
          {!isView && (
            <button 
              onClick={() => onSave(form)} 
              className="px-12 py-3 text-[11px] font-black text-white bg-black rounded-xl shadow-lg hover:bg-gray-900 transition-all flex items-center gap-2 uppercase tracking-widest"
            >
              <Save size={16} /> Simpan
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
