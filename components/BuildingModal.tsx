
import React, { useState, useEffect } from 'react';
import { X, Building, DollarSign, Calendar, Home, ChevronsUpDown, FileText } from 'lucide-react';
import { BuildingRecord } from '../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Partial<BuildingRecord>) => void;
  initialData?: BuildingRecord;
  mode?: 'create' | 'edit' | 'view';
}

export const BuildingModal: React.FC<Props> = ({ isOpen, onClose, onSave, initialData, mode = 'create' }) => {
  const [activeTab, setActiveTab] = useState('General');
  const [form, setForm] = useState<Partial<BuildingRecord>>({
    ownership: 'Rent',
    status: 'Draft',
    type: 'Office'
  });

  // Define tabs based on ownership as requested
  const tabs = form.ownership === 'Own' 
    ? ['General', 'Documents'] 
    : ['General', 'Proposal & Comparison', 'Workflow', 'Documents'];

  useEffect(() => {
    if (isOpen && initialData) {
      setForm(initialData);
    } else if (isOpen) {
      setForm({ ownership: 'Rent', status: 'Draft', type: 'Office' });
      setActiveTab('General');
    }
  }, [isOpen, initialData]);

  // Ensure active tab is valid if ownership changes
  useEffect(() => {
    if (!tabs.includes(activeTab)) {
      setActiveTab('General');
    }
  }, [form.ownership]);

  if (!isOpen) return null;

  const isView = mode === 'view';

  const FormLabel = ({ children, required }: { children?: React.ReactNode, required?: boolean }) => (
    <label className="block text-[11px] font-bold text-gray-500 mb-2">
      {children} {required && <span className="text-red-500">*</span>}
    </label>
  );

  const SectionHeader = ({ icon: Icon, title }: { icon: any, title: string }) => (
    <div className="flex items-center gap-3 mb-6 pb-2 border-b border-gray-100">
      <div className="p-1.5 bg-gray-50 rounded border border-gray-100">
        <Icon size={14} className="text-black" />
      </div>
      <h3 className="text-[10px] font-bold text-black uppercase tracking-[0.1em]">{title}</h3>
    </div>
  );

  const Input = (props: any) => (
    <input 
      {...props}
      disabled={isView || props.disabled}
      className="w-full bg-white border border-gray-200 rounded px-4 py-2.5 text-[12px] font-medium text-black focus:border-black outline-none transition-all placeholder:text-gray-300 disabled:bg-gray-50 shadow-sm"
    />
  );

  const Select = (props: any) => (
    <select 
      {...props}
      disabled={isView || props.disabled}
      className="w-full bg-white border border-gray-200 rounded px-4 py-2.5 text-[12px] font-medium text-black focus:border-black outline-none transition-all appearance-none disabled:bg-gray-50 shadow-sm"
    >
      {props.children}
    </select>
  );

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center backdrop-blur-sm">
      <div className="bg-white w-full max-w-[1400px] h-full flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="px-8 py-5 border-b border-gray-100 flex items-center justify-between shrink-0">
          <div>
            <h2 className="text-[14px] font-bold text-black mb-1">New Branch Improvement</h2>
            <div className="flex items-center gap-2">
                <span className="bg-white border border-gray-200 text-gray-500 text-[9px] font-bold px-2 py-0.5 rounded shadow-sm uppercase">DRAFT</span>
                <span className="text-[9px] text-gray-400 font-medium">| Asset No: {form.assetNo || '[Auto Generate]'}</span>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-black p-2 transition-all">
            <X size={24} />
          </button>
        </div>

        {/* Tabs Navigation */}
        <div className="px-8 flex border-b border-gray-100 bg-white">
          {tabs.map(tab => (
            <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-3 px-4 text-[11px] font-bold transition-all border-b-2 whitespace-nowrap
                ${activeTab === tab ? 'border-black text-black' : 'border-transparent text-gray-400'}`}
            >
                {tab}
            </button>
          ))}
        </div>

        {/* Form Body */}
        <div className="flex-1 overflow-y-auto p-10 bg-[#fbfbfb] custom-scrollbar">
          {activeTab === 'General' && (
            <div className="space-y-8 max-w-5xl mx-auto">
              {/* DETAIL INFORMASI */}
              <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
                <SectionHeader icon={Home} title="DETAIL INFORMASI" />
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                  <div className="md:col-span-9">
                    <FormLabel required>Nama Gedung</FormLabel>
                    <Input 
                      value={form.name || ''}
                      placeholder="Input nama gedung..."
                      onChange={(e: any) => setForm({...form, name: e.target.value})}
                    />
                  </div>
                  <div className="md:col-span-3">
                    <FormLabel>Type</FormLabel>
                    <div className="relative">
                      <Select 
                          value={form.type || ''}
                          onChange={(e: any) => setForm({...form, type: e.target.value})}
                      >
                          <option value="Office">Office</option>
                          <option value="Warehouse">Warehouse</option>
                          <option value="Store">Store</option>
                      </Select>
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                          <ChevronsUpDown size={14} className="text-gray-400" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="md:col-span-4">
                    <FormLabel>Ownership</FormLabel>
                    <div className="relative">
                      <Select 
                          value={form.ownership || ''}
                          onChange={(e: any) => setForm({...form, ownership: e.target.value as any})}
                      >
                          <option value="Rent">Rent (Sewa)</option>
                          <option value="Own">Own (Milik Sendiri)</option>
                      </Select>
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                          <ChevronsUpDown size={14} className="text-gray-400" />
                      </div>
                    </div>
                  </div>
                  <div className="md:col-span-8">
                    <FormLabel>Location</FormLabel>
                    <Input 
                      value={form.location || ''}
                      placeholder="Input lokasi..."
                      onChange={(e: any) => setForm({...form, location: e.target.value})}
                    />
                  </div>

                  <div className="md:col-span-12">
                    <FormLabel>Address</FormLabel>
                    <textarea 
                      className="w-full bg-white border border-gray-200 rounded px-4 py-2.5 text-[12px] font-medium text-black focus:border-black outline-none min-h-[80px] shadow-sm transition-all placeholder:text-gray-300"
                      value={form.address || ''}
                      placeholder="Input alamat lengkap..."
                      onChange={(e) => setForm({...form, address: e.target.value})}
                      disabled={isView}
                    />
                  </div>
                </div>
              </div>

              {/* RENTAL OR OWNERSHIP DETAILS SECTION */}
              <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
                {form.ownership === 'Rent' ? (
                  <>
                    <SectionHeader icon={DollarSign} title="RENTAL DETAILS" />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="md:col-span-1">
                        <FormLabel>Landlord Name</FormLabel>
                        <Input 
                          value={form.landlordName || ''}
                          placeholder="Input nama pemilik..."
                          onChange={(e: any) => setForm({...form, landlordName: e.target.value})}
                        />
                      </div>
                      <div className="md:col-span-1">
                        <FormLabel>Rental Cost</FormLabel>
                        <Input 
                          type="number"
                          value={form.rentalCost || ''}
                          placeholder="0"
                          onChange={(e: any) => setForm({...form, rentalCost: e.target.value})}
                        />
                      </div>
                      <div className="md:col-span-1">
                        <FormLabel>Bank Account</FormLabel>
                        <Input 
                          value={form.bankAccount || ''}
                          placeholder="000-000-000"
                          onChange={(e: any) => setForm({...form, bankAccount: e.target.value})}
                        />
                      </div>
                      <div className="md:col-span-1">
                        <FormLabel>Start Date</FormLabel>
                        <Input 
                          type="date"
                          value={form.startDate || ''}
                          onChange={(e: any) => setForm({...form, startDate: e.target.value})}
                        />
                      </div>
                      <div className="md:col-span-1">
                        <FormLabel>End Date</FormLabel>
                        <Input 
                          type="date"
                          value={form.endDate || ''}
                          onChange={(e: any) => setForm({...form, endDate: e.target.value})}
                        />
                      </div>
                      <div className="md:col-span-1 flex items-end">
                          <div className="w-full bg-[#fff7ed] border border-[#ffedd5] rounded p-2.5 flex items-center gap-2">
                              <Calendar size={14} className="text-[#ea580c]" />
                              <span className="text-[10px] font-bold text-[#ea580c]">Auto-reminder active (H-6 Months)</span>
                          </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <SectionHeader icon={DollarSign} title="OWNERSHIP DETAILS" />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <FormLabel>Certificate No (SHM/HGB)</FormLabel>
                        <Input 
                          value={form.certificateNo || ''}
                          placeholder="Input nomor sertifikat..."
                          onChange={(e: any) => setForm({...form, certificateNo: e.target.value})}
                        />
                      </div>
                      <div>
                        <FormLabel>Acquisition Value</FormLabel>
                        <Input 
                          type="number"
                          value={form.acquisitionValue || ''}
                          placeholder="0"
                          onChange={(e: any) => setForm({...form, acquisitionValue: e.target.value})}
                        />
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}

          {activeTab === 'Documents' && (
            <div className="max-w-5xl mx-auto bg-white p-8 rounded-xl border border-gray-200 shadow-sm min-h-[400px]">
               <SectionHeader icon={FileText} title="DOCUMENTS & ATTACHMENTS" />
               <div className="flex flex-col items-center justify-center p-20 border-2 border-dashed border-gray-100 rounded-xl">
                  <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                     <FileText size={32} className="text-gray-300" />
                  </div>
                  <p className="text-sm font-bold text-gray-400">Belum ada dokumen yang diunggah</p>
                  <button className="mt-4 px-6 py-2 bg-black text-white rounded text-[11px] font-bold uppercase tracking-widest">Unggah Dokumen</button>
               </div>
            </div>
          )}

          {(activeTab === 'Proposal & Comparison' || activeTab === 'Workflow') && (
            <div className="max-w-5xl mx-auto bg-white p-8 rounded-xl border border-gray-200 shadow-sm min-h-[400px]">
               <SectionHeader icon={Building} title={activeTab.toUpperCase()} />
               <p className="text-gray-400 text-sm font-medium italic">Bagian ini hanya tersedia untuk aset sewa untuk proses persetujuan proposal.</p>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="px-8 py-4 bg-white border-t border-gray-100 flex justify-end gap-3 shrink-0">
          <button 
            onClick={onClose}
            className="px-8 py-2 text-[12px] font-bold text-gray-500 bg-white border border-gray-200 rounded hover:bg-gray-50 transition-all"
          >
            Draf
          </button>
          {!isView && (
            <button 
                onClick={() => onSave(form)}
                className="px-8 py-2 text-[12px] font-bold text-white bg-black rounded hover:bg-gray-900 transition-all active:scale-95 shadow-lg shadow-black/10"
            >
                Simpan
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
