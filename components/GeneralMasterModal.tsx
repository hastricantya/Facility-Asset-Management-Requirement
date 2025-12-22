
import React, { useState, useEffect } from 'react';
import { X, Save, Database } from 'lucide-react';
import { GeneralMasterItem } from '../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (name: string) => void;
  initialData?: GeneralMasterItem | null;
  title: string;
}

export const GeneralMasterModal: React.FC<Props> = ({ isOpen, onClose, onSave, initialData, title }) => {
  const [name, setName] = useState('');

  useEffect(() => {
    if (isOpen) {
      setName(initialData ? initialData.name : '');
    }
  }, [isOpen, initialData]);

  if (!isOpen) return null;

  const handleSave = () => {
    if (name.trim()) {
      onSave(name);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden flex flex-col animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-white">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gray-50 rounded-lg text-black">
              <Database size={18} />
            </div>
            <h2 className="text-[13px] font-black tracking-widest text-black uppercase">
              {initialData ? `Edit ${title}` : `Tambah ${title}`}
            </h2>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-black p-2 transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="p-8 space-y-6">
          <div>
            <label className="block text-[10px] font-bold text-gray-500 uppercase mb-2 tracking-widest">
              Nama {title} <span className="text-red-500">*</span>
            </label>
            <input 
              type="text" 
              autoFocus
              className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3.5 text-sm font-bold text-black focus:border-black focus:ring-2 focus:ring-gray-100 outline-none transition-all placeholder:text-gray-300"
              placeholder={`Masukkan nama ${title.toLowerCase()}...`}
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSave()}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex gap-3">
          <button 
            onClick={onClose}
            className="flex-1 py-3 text-[11px] font-black text-gray-400 bg-white border border-gray-200 rounded-xl hover:bg-gray-100 hover:text-black transition-all uppercase tracking-widest"
          >
            Batal
          </button>
          <button 
            onClick={handleSave}
            disabled={!name.trim()}
            className="flex-[2] py-3 text-[11px] font-black text-white bg-black rounded-xl shadow-lg shadow-black/10 hover:bg-gray-900 transition-all flex items-center justify-center gap-2 uppercase tracking-widest active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Save size={16} /> Simpan Data
          </button>
        </div>
      </div>
    </div>
  );
};
