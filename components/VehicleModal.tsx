
import React, { useState, useEffect, useRef } from 'react';
import { X, Save, Image as ImageIcon, Trash2, UploadCloud } from 'lucide-react';
import { VehicleRecord } from '../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Partial<VehicleRecord>) => void;
  initialData?: VehicleRecord;
  mode?: 'create' | 'edit' | 'view';
}

export const VehicleModal: React.FC<Props> = ({ isOpen, onClose, onSave, initialData, mode = 'create' }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  
  const [form, setForm] = useState<Partial<VehicleRecord>>({
    status: 'Aktif',
    channel: 'Human Capital Operation',
    cabang: 'Pusat'
  });

  useEffect(() => {
    if (isOpen && initialData) {
      setForm(initialData);
      // If there's an existing image in initialData (assuming we'd store the URL/Base64)
      // For demo, we just reset it. In real app, you'd set preview here.
    } else if (isOpen) {
      setForm({ status: 'Aktif', channel: 'Human Capital Operation', cabang: 'Pusat' });
      setImagePreview(null);
    }
  }, [isOpen, initialData]);

  if (!isOpen) return null;

  const isView = mode === 'view';

  const handleFile = (file: File) => {
    if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
            setImagePreview(e.target?.result as string);
        };
        reader.readAsDataURL(file);
    }
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
        handleFile(e.target.files[0]);
    }
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (!isView) setIsDragging(true);
  };

  const onDragLeave = () => {
    setIsDragging(false);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (!isView && e.dataTransfer.files && e.dataTransfer.files[0]) {
        handleFile(e.dataTransfer.files[0]);
    }
  };

  const removeImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const FormSection = ({ title, children }: { title: string, children?: React.ReactNode }) => (
    <div className="mb-10 last:mb-0">
      <div className="flex items-center gap-2 mb-6">
        <h3 className="text-[11px] font-black text-black uppercase tracking-[0.2em]">{title}</h3>
        <div className="h-[1px] flex-1 bg-gray-100"></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-y-5 gap-x-6">
        {children}
      </div>
    </div>
  );

  const InputField = ({ label, value, field, type = "text", disabled = false, placeholder = "", className = "" }: any) => (
    <div className={className}>
      <label className="block text-[10px] font-bold text-gray-500 uppercase mb-2 tracking-widest">
        {label} <span className="text-red-500 font-bold">*</span>
      </label>
      <input 
        type={type} 
        disabled={isView || disabled}
        className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-xs font-bold text-black focus:border-black focus:ring-2 focus:ring-gray-100 outline-none disabled:bg-gray-50 disabled:text-gray-400 transition-all placeholder:text-gray-300 shadow-sm"
        value={value || ''}
        placeholder={placeholder}
        onChange={(e) => setForm({...form, [field]: e.target.value})}
      />
    </div>
  );

  const SelectField = ({ label, value, field, options, className = "" }: any) => (
    <div className={className}>
      <label className="block text-[10px] font-bold text-gray-500 uppercase mb-2 tracking-widest">
        {label} <span className="text-red-500 font-bold">*</span>
      </label>
      <div className="relative">
        <select 
            disabled={isView}
            className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-xs font-bold text-black focus:border-black focus:ring-2 focus:ring-gray-100 outline-none disabled:bg-gray-50 appearance-none shadow-sm transition-all"
            value={value || ''}
            onChange={(e) => setForm({...form, [field]: e.target.value})}
        >
            {options.map((opt: string) => <option key={opt} value={opt}>{opt}</option>)}
        </select>
        {!isView && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black/75 z-50 flex items-center justify-center backdrop-blur-md p-0 md:p-6 overflow-hidden">
      <div className="bg-white w-full max-w-[1400px] h-full md:h-auto md:max-h-[95vh] rounded-none md:rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="px-8 py-6 bg-white border-b border-gray-100 flex items-center justify-between shrink-0">
          <h2 className="text-xl font-black tracking-tighter text-black uppercase">
             {mode === 'edit' ? 'Edit Database Aset Kendaraan' : mode === 'view' ? 'Detail Database Aset Kendaraan' : 'Tambah Database Aset Kendaraan'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-black p-2 rounded-full bg-gray-50 transition-all hover:rotate-90">
            <X size={20} />
          </button>
        </div>

        {/* Form Body */}
        <div className="flex-1 overflow-y-auto p-8 md:p-10 custom-scrollbar bg-white">
          <div className="flex flex-col lg:flex-row gap-12">
            
            {/* Left Column */}
            <div className="flex-1 space-y-12">
              <FormSection title="Detil Informasi">
                <InputField label="No. Registrasi" value={form.noRegistrasi} field="noRegistrasi" disabled={true} placeholder="301-00208" />
                <InputField label="Deskripsi Lengkap" value={form.nama} field="nama" placeholder="Contoh: Toyota Avanza 1.3 CVT E Warna Putih..." />
                <InputField label="No. Polisi" value={form.noPolisi} field="noPolisi" placeholder="B 1708 CZY" />
                
                <InputField label="Merek" value={form.merek} field="merek" placeholder="TOYOTA" />
                <InputField label="Tipe Kendaraan" value={form.tipeKendaraan} field="tipeKendaraan" placeholder="AVANZA" />
                <InputField label="Jenis" value={form.jenis} field="jenis" placeholder="1.3 G" />
                
                <InputField label="Model" value={form.model} field="model" placeholder="A/T" />
                <InputField label="Tahun Pembuatan" value={form.tahunPembuatan} field="tahunPembuatan" placeholder="2022" />
                <InputField label="Warna" value={form.warna} field="warna" placeholder="Putih" />
                
                <InputField label="Isi Silinder" value={form.isiSilinder} field="isiSilinder" placeholder="1329 CC" />
                <InputField label="No. Rangka" value={form.noRangka} field="noRangka" placeholder="MHKAA1BY9NK008688" />
                <InputField label="No. Mesin" value={form.noMesin} field="noMesin" placeholder="1NRG188335" />
              </FormSection>

              <FormSection title="Pengguna">
                <SelectField label="Channel" value={form.channel} field="channel" options={['Human Capital Operation', 'Management', 'Traditional', 'HR', 'HCO']} />
                <SelectField label="Dept / Cabang" value={form.cabang} field="cabang" options={['Pusat', 'Purwokerto', 'Pekanbaru', 'Palembang', 'Medan', 'Manado', 'Malang', 'Kediri']} />
                <InputField label="Pengguna" value={form.pengguna} field="pengguna" placeholder="Pak Supriaji" />
              </FormSection>
              
              <FormSection title="Lampiran">
                <div className="md:col-span-3">
                   <label className="block text-[10px] font-bold text-gray-500 uppercase mb-3 tracking-wider">Gambar <span className="text-red-500 font-bold">*</span></label>
                   
                   <input 
                      type="file" 
                      ref={fileInputRef} 
                      className="hidden" 
                      accept="image/*" 
                      onChange={onFileChange} 
                      disabled={isView}
                   />

                   <div 
                      onClick={() => !isView && fileInputRef.current?.click()}
                      onDragOver={onDragOver}
                      onDragLeave={onDragLeave}
                      onDrop={onDrop}
                      className={`relative border-2 border-dashed rounded-2xl h-64 flex flex-col items-center justify-center transition-all overflow-hidden bg-white
                        ${imagePreview ? 'border-gray-200' : 'border-gray-100 hover:border-black hover:bg-gray-50/50'}
                        ${isDragging ? 'border-black bg-gray-100 scale-[0.99]' : ''}
                        ${!isView ? 'cursor-pointer' : 'cursor-default'}
                      `}
                   >
                      {imagePreview ? (
                        <div className="relative w-full h-full group">
                            <img src={imagePreview} alt="Preview" className="w-full h-full object-contain p-2" />
                            {!isView && (
                                <button 
                                    onClick={removeImage}
                                    className="absolute top-4 right-4 bg-black text-white p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                                >
                                    <Trash2 size={16} />
                                </button>
                            )}
                        </div>
                      ) : (
                        <div className="flex flex-col items-center">
                            <div className={`w-16 h-16 rounded-full flex items-center justify-center shadow-sm border border-gray-100 transition-all mb-4 bg-white ${isDragging ? 'scale-110' : ''}`}>
                                <UploadCloud size={28} className={isDragging ? 'text-black' : 'text-gray-300'} />
                            </div>
                            <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest text-center px-6">
                                {isDragging ? 'Lepaskan Gambar' : 'Klik atau seret gambar ke sini'}
                            </p>
                            <p className="text-[9px] font-bold text-gray-300 mt-2 uppercase">PNG, JPG atau WEBP (Maks. 5MB)</p>
                        </div>
                      )}
                   </div>
                </div>
              </FormSection>
            </div>

            {/* Right Column */}
            <div className="flex-1 space-y-12">
              <FormSection title="Surat">
                <InputField label="No. BPKB" value={form.noBpkb} field="noBpkb" placeholder="S-03714594" />
                <InputField label="Keterangan BPKB" value={form.keteranganBpkb} field="keteranganBpkb" className="md:col-span-2" />
                
                <InputField label="Masa Berlaku 1 Tahun" value={form.masaBerlaku1} field="masaBerlaku1" type="date" />
                <InputField label="Masa Berlaku 5 Tahun" value={form.masaBerlaku5} field="masaBerlaku5" type="date" />
                <InputField label="Masa Berlaku KIR" value={form.masaBerlakuKir} field="masaBerlakuKir" type="date" />
              </FormSection>

              <FormSection title="Pembelian">
                <InputField label="Tgl Beli" value={form.tglBeli} field="tglBeli" type="date" />
                <div className="md:col-span-2 relative">
                  <label className="block text-[10px] font-bold text-gray-500 uppercase mb-2 tracking-widest">Harga Beli <span className="text-red-500 font-bold">*</span></label>
                  <div className="relative">
                     <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[11px] font-black text-black">
                        {form.hargaBeli ? `Rp${parseInt(form.hargaBeli).toLocaleString('id-ID')}` : 'Rp0'}
                     </span>
                     <input 
                       type="number" 
                       className="w-full bg-white border border-gray-200 rounded-lg pl-4 pr-32 py-3 text-xs font-bold text-black focus:border-black focus:ring-2 focus:ring-gray-100 outline-none shadow-sm transition-all"
                       value={form.hargaBeli || ''}
                       onChange={(e) => setForm({...form, hargaBeli: e.target.value})}
                       disabled={isView}
                       placeholder="0"
                     />
                  </div>
                </div>
              </FormSection>

              <FormSection title="Asuransi">
                <InputField label="No Polis" value={form.noPolisAsuransi} field="noPolisAsuransi" className="md:col-span-2" />
                <InputField label="Jangka Pertanggungan" value={form.jangkaPertanggungan} field="jangkaPertanggungan" type="date" />
              </FormSection>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-8 py-6 bg-gray-50 border-t border-gray-100 flex justify-end gap-3 shrink-0">
          <button 
            onClick={onClose} 
            className="px-12 py-3 text-[11px] font-black text-gray-400 bg-white border border-gray-200 rounded-xl hover:bg-gray-100 hover:text-black transition-all uppercase tracking-[0.2em]"
          >
            Batal
          </button>
          {!isView && (
            <button 
                onClick={() => onSave(form)} 
                className="px-16 py-3 text-[11px] font-black text-white bg-black rounded-xl shadow-xl shadow-black/20 hover:bg-gray-900 transition-all flex items-center gap-3 uppercase tracking-[0.2em] active:scale-95"
            >
                <Save size={16} /> Simpan Data
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
