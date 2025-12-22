
import React, { useState, useEffect } from 'react';
// Added Plus to the import list from lucide-react to fix the "Cannot find name 'Plus'" error on line 493.
import { X, Building, DollarSign, Calendar, Home, ChevronsUpDown, FileText, CheckCircle2, Clock, Download, Eye, ExternalLink, ArrowRight, Plus } from 'lucide-react';
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

  useEffect(() => {
    if (!tabs.includes(activeTab)) {
      setActiveTab('General');
    }
  }, [form.ownership]);

  if (!isOpen) return null;

  const isView = mode === 'view';

  const FormLabel = ({ children, required }: { children?: React.ReactNode, required?: boolean }) => (
    <label className="block text-[11px] font-bold text-gray-500 mb-2 uppercase tracking-widest">
      {children} {required && <span className="text-red-500">*</span>}
    </label>
  );

  const SectionHeader = ({ icon: Icon, title }: { icon: any, title: string }) => (
    <div className="flex items-center gap-3 mb-6 pb-2 border-b border-gray-100">
      <div className="p-1.5 bg-gray-50 rounded border border-gray-100">
        <Icon size={14} className="text-black" />
      </div>
      <h3 className="text-[10px] font-black text-black uppercase tracking-[0.2em]">{title}</h3>
    </div>
  );

  const Input = (props: any) => (
    <input 
      {...props}
      disabled={isView || props.disabled}
      className="w-full bg-white border border-gray-200 rounded px-4 py-3 text-[12px] font-bold text-black focus:border-black outline-none transition-all placeholder:text-gray-300 disabled:bg-gray-50 shadow-sm"
    />
  );

  const Select = (props: any) => (
    <select 
      {...props}
      disabled={isView || props.disabled}
      className="w-full bg-white border border-gray-200 rounded px-4 py-3 text-[12px] font-bold text-black focus:border-black outline-none transition-all appearance-none disabled:bg-gray-50 shadow-sm"
    >
      {props.children}
    </select>
  );

  return (
    <div className="fixed inset-0 bg-black/75 z-50 flex items-center justify-center backdrop-blur-md p-0 md:p-6 overflow-hidden">
      <div className="bg-white w-full max-w-[1200px] h-full md:h-[90vh] rounded-none md:rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="px-8 py-6 border-b border-gray-100 flex items-center justify-between shrink-0 bg-white">
          <div>
            <h2 className="text-[16px] font-black text-black mb-1 uppercase tracking-tight">{mode === 'view' ? 'Detail Building Asset' : 'Manage Building Asset'}</h2>
            <div className="flex items-center gap-3">
                <span className={`text-[9px] font-black px-2 py-0.5 rounded uppercase border ${form.status === 'Open' ? 'bg-green-500 text-white border-green-600' : 'bg-gray-100 text-gray-500 border-gray-200'}`}>
                  {form.status || 'DRAFT'}
                </span>
                <span className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">Asset No: {form.assetNo || '[Auto Generate]'}</span>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-black p-2 transition-all hover:rotate-90">
            <X size={28} />
          </button>
        </div>

        {/* Tabs Navigation */}
        <div className="px-8 flex border-b border-gray-100 bg-white shrink-0 overflow-x-auto custom-scrollbar">
          {tabs.map(tab => (
            <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-6 text-[11px] font-black transition-all border-b-2 whitespace-nowrap uppercase tracking-widest
                ${activeTab === tab ? 'border-black text-black' : 'border-transparent text-gray-400 hover:text-gray-600'}`}
            >
                {tab}
            </button>
          ))}
        </div>

        {/* Form Body */}
        <div className="flex-1 overflow-y-auto p-10 bg-[#fbfbfb] custom-scrollbar">
          {activeTab === 'General' && (
            <div className="space-y-8 max-w-5xl mx-auto animate-in fade-in duration-300">
              <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
                <SectionHeader icon={Home} title="GENERAL INFORMATION" />
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                  <div className="md:col-span-9">
                    <FormLabel required>Gedung Name</FormLabel>
                    <Input 
                      value={form.name || ''}
                      placeholder="Input nama gedung..."
                      onChange={(e: any) => setForm({...form, name: e.target.value})}
                    />
                  </div>
                  <div className="md:col-span-3">
                    <FormLabel>Building Type</FormLabel>
                    <div className="relative">
                      <Select 
                          value={form.type || ''}
                          onChange={(e: any) => setForm({...form, type: e.target.value})}
                      >
                          <option value="Office">Office</option>
                          <option value="Warehouse">Warehouse</option>
                          <option value="Store">Store</option>
                          <option value="Showroom">Showroom</option>
                      </Select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                          <ChevronsUpDown size={14} />
                      </div>
                    </div>
                  </div>
                  
                  <div className="md:col-span-4">
                    <FormLabel>Ownership Status</FormLabel>
                    <div className="relative">
                      <Select 
                          value={form.ownership || ''}
                          onChange={(e: any) => setForm({...form, ownership: e.target.value as any})}
                      >
                          <option value="Rent">Rent (Sewa)</option>
                          <option value="Own">Own (Milik Sendiri)</option>
                      </Select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                          <ChevronsUpDown size={14} />
                      </div>
                    </div>
                  </div>
                  <div className="md:col-span-8">
                    <FormLabel>City / Location</FormLabel>
                    <Input 
                      value={form.location || ''}
                      placeholder="Input lokasi..."
                      onChange={(e: any) => setForm({...form, location: e.target.value})}
                    />
                  </div>

                  <div className="md:col-span-12">
                    <FormLabel>Full Address</FormLabel>
                    <textarea 
                      className="w-full bg-white border border-gray-200 rounded px-4 py-3 text-[12px] font-bold text-black focus:border-black outline-none min-h-[100px] transition-all placeholder:text-gray-300 disabled:bg-gray-50 shadow-sm"
                      value={form.address || ''}
                      placeholder="Input alamat lengkap..."
                      onChange={(e) => setForm({...form, address: e.target.value})}
                      disabled={isView}
                    />
                  </div>
                </div>
              </div>

              <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
                {form.ownership === 'Rent' ? (
                  <>
                    <SectionHeader icon={DollarSign} title="RENTAL DETAILS" />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                      <div>
                        <FormLabel>Landlord / Owner Name</FormLabel>
                        <Input 
                          value={form.landlordName || ''}
                          placeholder="Input nama pemilik..."
                          onChange={(e: any) => setForm({...form, landlordName: e.target.value})}
                        />
                      </div>
                      <div>
                        <FormLabel>Annual Rental Cost (IDR)</FormLabel>
                        <div className="relative">
                           <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-[10px]">Rp</span>
                           <input 
                              type="number"
                              className="w-full bg-white border border-gray-200 rounded pl-10 pr-4 py-3 text-[12px] font-black text-black focus:border-black outline-none transition-all disabled:bg-gray-50 shadow-sm"
                              value={form.rentalCost || ''}
                              placeholder="0"
                              onChange={(e: any) => setForm({...form, rentalCost: e.target.value})}
                              disabled={isView}
                           />
                        </div>
                      </div>
                      <div>
                        <FormLabel>Bank Account Payment</FormLabel>
                        <Input 
                          value={form.bankAccount || ''}
                          placeholder="000-000-000"
                          onChange={(e: any) => setForm({...form, bankAccount: e.target.value})}
                        />
                      </div>
                      <div>
                        <FormLabel>Contract Start Date</FormLabel>
                        <Input 
                          type="date"
                          value={form.startDate || ''}
                          onChange={(e: any) => setForm({...form, startDate: e.target.value})}
                        />
                      </div>
                      <div>
                        <FormLabel>Contract End Date</FormLabel>
                        <Input 
                          type="date"
                          value={form.endDate || ''}
                          onChange={(e: any) => setForm({...form, endDate: e.target.value})}
                        />
                      </div>
                      <div className="flex items-end">
                          <div className="w-full bg-gray-50 border border-gray-100 rounded px-4 py-3 flex items-center gap-3">
                              <Calendar size={16} className="text-black" />
                              <span className="text-[10px] font-black text-black uppercase tracking-tight">AUTO-REMINDER (H-6 MONTHS)</span>
                              <div className="ml-auto w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
                          </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <SectionHeader icon={DollarSign} title="OWNERSHIP DETAILS" />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <FormLabel>Certificate No (SHM/HGB)</FormLabel>
                        <Input 
                          value={form.certificateNo || ''}
                          placeholder="Input nomor sertifikat..."
                          onChange={(e: any) => setForm({...form, certificateNo: e.target.value})}
                        />
                      </div>
                      <div>
                        <FormLabel>Asset Acquisition Value</FormLabel>
                        <div className="relative">
                           <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-[10px]">Rp</span>
                           <input 
                              type="number"
                              className="w-full bg-white border border-gray-200 rounded pl-10 pr-4 py-3 text-[12px] font-black text-black focus:border-black outline-none transition-all disabled:bg-gray-50 shadow-sm"
                              value={form.acquisitionValue || ''}
                              placeholder="0"
                              onChange={(e: any) => setForm({...form, acquisitionValue: e.target.value})}
                              disabled={isView}
                           />
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}

          {activeTab === 'Proposal & Comparison' && (
            <div className="max-w-6xl mx-auto space-y-8 animate-in slide-in-from-bottom-4 duration-500">
               <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                  <SectionHeader icon={FileText} title="PROPOSAL COMPARISON" />
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-gray-50 text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100">
                          <th className="p-4">Components</th>
                          <th className="p-4 border-l border-gray-100 bg-black text-white text-center">Option A (Selected)</th>
                          <th className="p-4 border-l border-gray-100 text-center">Option B</th>
                          <th className="p-4 border-l border-gray-100 text-center">Option C</th>
                        </tr>
                      </thead>
                      <tbody className="text-[11px] font-bold divide-y divide-gray-50">
                        <tr>
                          <td className="p-4 bg-gray-50/30 text-gray-400">Vendor / Landlord</td>
                          <td className="p-4 border-l border-gray-100 text-center text-black">PT Properti Jaya</td>
                          <td className="p-4 border-l border-gray-100 text-center text-gray-500">Bpk. H. Ahmad</td>
                          <td className="p-4 border-l border-gray-100 text-center text-gray-500">Gedung Mulia Management</td>
                        </tr>
                        <tr>
                          <td className="p-4 bg-gray-50/30 text-gray-400">Area Size (Sqm)</td>
                          <td className="p-4 border-l border-gray-100 text-center text-black">1.200 m²</td>
                          <td className="p-4 border-l border-gray-100 text-center text-gray-500">1.050 m²</td>
                          <td className="p-4 border-l border-gray-100 text-center text-gray-500">1.500 m²</td>
                        </tr>
                        <tr>
                          <td className="p-4 bg-gray-50/30 text-gray-400">Rental Price / Year</td>
                          <td className="p-4 border-l border-gray-100 text-center text-black font-black">Rp 250.000.000</td>
                          <td className="p-4 border-l border-gray-100 text-center text-gray-500">Rp 285.000.000</td>
                          <td className="p-4 border-l border-gray-100 text-center text-gray-500">Rp 320.000.000</td>
                        </tr>
                        <tr>
                          <td className="p-4 bg-gray-50/30 text-gray-400">Deposit Requirement</td>
                          <td className="p-4 border-l border-gray-100 text-center text-black">1 Month</td>
                          <td className="p-4 border-l border-gray-100 text-center text-gray-500">3 Months</td>
                          <td className="p-4 border-l border-gray-100 text-center text-gray-500">2 Months</td>
                        </tr>
                        <tr>
                          <td className="p-4 bg-gray-50/30 text-gray-400">Loading Dock</td>
                          <td className="p-4 border-l border-gray-100 text-center text-black">Available (4 Bays)</td>
                          <td className="p-4 border-l border-gray-100 text-center text-gray-500">Available (2 Bays)</td>
                          <td className="p-4 border-l border-gray-100 text-center text-gray-500">Not Available</td>
                        </tr>
                        <tr>
                          <td className="p-4 bg-gray-50/30 text-gray-400">Distance from Branch</td>
                          <td className="p-4 border-l border-gray-100 text-center text-black">5.2 KM</td>
                          <td className="p-4 border-l border-gray-100 text-center text-gray-500">12.0 KM</td>
                          <td className="p-4 border-l border-gray-100 text-center text-gray-500">2.5 KM</td>
                        </tr>
                        <tr className="bg-gray-50/50">
                           <td className="p-4 text-gray-400">GA RECOMMENDATION</td>
                           <td className="p-4 border-l border-gray-100 text-center text-green-600 font-black">HIGHLY RECOMMENDED</td>
                           <td className="p-4 border-l border-gray-100 text-center text-gray-400">ALTERNATIVE</td>
                           <td className="p-4 border-l border-gray-100 text-center text-red-500">EXCESSIVE COST</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
               </div>
            </div>
          )}

          {activeTab === 'Workflow' && (
            <div className="max-w-4xl mx-auto space-y-8 animate-in slide-in-from-right-4 duration-500">
               <div className="bg-white p-10 rounded-xl border border-gray-200 shadow-sm">
                  <SectionHeader icon={Clock} title="APPROVAL STATUS WORKFLOW" />
                  
                  <div className="space-y-0">
                    {/* Step 1 */}
                    <div className="flex gap-6 pb-12 relative">
                        <div className="absolute left-[15px] top-8 bottom-0 w-[2px] bg-black"></div>
                        <div className="z-10 w-8 h-8 rounded-full bg-black flex items-center justify-center text-white ring-4 ring-gray-50 shadow-lg">
                           <CheckCircle2 size={16} />
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                                <h4 className="text-[12px] font-black text-black uppercase">Drafting Proposal</h4>
                                <span className="text-[10px] font-bold text-gray-400 uppercase">10 Jan 2024 - 14:20</span>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-white border border-gray-200 overflow-hidden shrink-0">
                                        <img src="https://i.pravatar.cc/150?u=ga" className="w-full h-full object-cover" />
                                    </div>
                                    <div>
                                        <p className="text-[11px] font-black text-black">Randi Mahardika</p>
                                        <p className="text-[9px] text-gray-400 font-bold uppercase">GA Staff - Submitter</p>
                                    </div>
                                    <span className="ml-auto bg-black text-white text-[8px] font-black px-2 py-0.5 rounded">DONE</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Step 2 */}
                    <div className="flex gap-6 pb-12 relative">
                        <div className="absolute left-[15px] top-8 bottom-0 w-[2px] bg-black"></div>
                        <div className="z-10 w-8 h-8 rounded-full bg-black flex items-center justify-center text-white ring-4 ring-gray-50 shadow-lg">
                           <CheckCircle2 size={16} />
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                                <h4 className="text-[12px] font-black text-black uppercase">GA Manager Review</h4>
                                <span className="text-[10px] font-bold text-gray-400 uppercase">11 Jan 2024 - 09:15</span>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-white border border-gray-200 overflow-hidden shrink-0">
                                        <img src="https://i.pravatar.cc/150?u=manager" className="w-full h-full object-cover" />
                                    </div>
                                    <div>
                                        <p className="text-[11px] font-black text-black">Citra Lestari</p>
                                        <p className="text-[9px] text-gray-400 font-bold uppercase">GA Manager - Reviewer</p>
                                    </div>
                                    <span className="ml-auto bg-black text-white text-[8px] font-black px-2 py-0.5 rounded">APPROVED</span>
                                </div>
                                <p className="mt-3 text-[10px] text-gray-500 italic font-medium">"Proposal perbandingan sudah sangat jelas, opsi A secara strategis paling efisien."</p>
                            </div>
                        </div>
                    </div>

                    {/* Step 3 (Current) */}
                    <div className="flex gap-6 pb-12 relative">
                        <div className="absolute left-[15px] top-8 bottom-0 w-[2px] bg-gray-200"></div>
                        <div className="z-10 w-8 h-8 rounded-full bg-white border-2 border-black flex items-center justify-center text-black ring-4 ring-gray-50 shadow-xl">
                           <div className="w-2 h-2 rounded-full bg-black animate-ping"></div>
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                                <h4 className="text-[12px] font-black text-black uppercase">Finance Director Approval</h4>
                                <span className="text-[10px] font-bold text-orange-500 uppercase flex items-center gap-1"><Clock size={10} /> WAITING</span>
                            </div>
                            <div className="bg-white p-4 rounded-lg border-2 border-dashed border-gray-200">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-gray-100 border border-gray-200 overflow-hidden shrink-0 flex items-center justify-center">
                                        <Building size={14} className="text-gray-300" />
                                    </div>
                                    <div>
                                        <p className="text-[11px] font-black text-gray-400">Director Level</p>
                                        <p className="text-[9px] text-gray-300 font-bold uppercase tracking-tight">Financial Approval Needed</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Final Step */}
                    <div className="flex gap-6 pb-0 relative">
                        <div className="z-10 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-300 border border-gray-200 ring-4 ring-gray-50">
                           <CheckCircle2 size={16} />
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                                <h4 className="text-[12px] font-black text-gray-300 uppercase">Closing / Handover</h4>
                            </div>
                        </div>
                    </div>
                  </div>
               </div>
            </div>
          )}

          {activeTab === 'Documents' && (
            <div className="max-w-5xl mx-auto space-y-6 animate-in fade-in duration-300">
               <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
                  <SectionHeader icon={FileText} title="CONTRACT DOCUMENTS" />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Doc 1 */}
                    <div className="group bg-white border border-gray-100 rounded-xl p-5 hover:border-black transition-all hover:shadow-xl hover:shadow-gray-200/50">
                        <div className="flex items-start justify-between mb-4">
                            <div className="p-3 bg-red-50 text-red-600 rounded-xl group-hover:bg-black group-hover:text-white transition-colors">
                                <FileText size={24} />
                            </div>
                            <div className="flex gap-2">
                                <button className="p-2 text-gray-300 hover:text-black transition-colors" title="Download"><Download size={16} /></button>
                                <button className="p-2 text-gray-300 hover:text-black transition-colors" title="View"><Eye size={16} /></button>
                            </div>
                        </div>
                        <h4 className="text-[12px] font-black text-black uppercase mb-1 truncate">Proposal_Option_A.pdf</h4>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tight">Added 12 Jan 2024 • 4.2 MB</p>
                    </div>

                    {/* Doc 2 */}
                    <div className="group bg-white border border-gray-100 rounded-xl p-5 hover:border-black transition-all hover:shadow-xl hover:shadow-gray-200/50">
                        <div className="flex items-start justify-between mb-4">
                            <div className="p-3 bg-blue-50 text-blue-600 rounded-xl group-hover:bg-black group-hover:text-white transition-colors">
                                <FileText size={24} />
                            </div>
                            <div className="flex gap-2">
                                <button className="p-2 text-gray-300 hover:text-black transition-colors"><Download size={16} /></button>
                                <button className="p-2 text-gray-300 hover:text-black transition-colors"><Eye size={16} /></button>
                            </div>
                        </div>
                        <h4 className="text-[12px] font-black text-black uppercase mb-1 truncate">Draft_Contract_Signed.pdf</h4>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tight">Added 14 Jan 2024 • 1.8 MB</p>
                    </div>

                    {/* Doc 3 */}
                    <div className="group bg-white border border-gray-100 rounded-xl p-5 hover:border-black transition-all hover:shadow-xl hover:shadow-gray-200/50">
                        <div className="flex items-start justify-between mb-4">
                            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl group-hover:bg-black group-hover:text-white transition-colors">
                                <ImageIcon size={24} />
                            </div>
                            <div className="flex gap-2">
                                <button className="p-2 text-gray-300 hover:text-black transition-colors"><Download size={16} /></button>
                                <button className="p-2 text-gray-300 hover:text-black transition-colors"><Eye size={16} /></button>
                            </div>
                        </div>
                        <h4 className="text-[12px] font-black text-black uppercase mb-1 truncate">Photo_Building_Exterior.jpg</h4>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tight">Added 15 Jan 2024 • 8.5 MB</p>
                    </div>

                    {/* Upload Box */}
                    <div className="group border-2 border-dashed border-gray-100 rounded-xl p-5 flex flex-col items-center justify-center hover:border-black hover:bg-white transition-all cursor-pointer min-h-[140px]">
                        <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                            <Plus size={20} className="text-gray-300 group-hover:text-black transition-colors" />
                        </div>
                        <p className="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em] group-hover:text-black">Upload New File</p>
                    </div>
                  </div>

                  <div className="mt-12 p-6 bg-black text-white rounded-xl flex items-center justify-between">
                     <div>
                        <h4 className="text-[13px] font-black uppercase tracking-tight mb-1">Contract Validity Tracker</h4>
                        <p className="text-[10px] font-bold text-gray-400">System will automatically notify you via Email and WhatsApp H-6 Months before expiration.</p>
                     </div>
                     <button className="flex items-center gap-2 px-6 py-3 bg-white text-black text-[11px] font-black rounded uppercase tracking-widest hover:bg-gray-200 transition-colors">
                        Configure <ExternalLink size={14} />
                     </button>
                  </div>
               </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="px-8 py-6 bg-white border-t border-gray-100 flex justify-end gap-4 shrink-0">
          <button 
            onClick={onClose}
            className="px-12 py-3 text-[11px] font-black text-gray-400 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 hover:text-black transition-all uppercase tracking-[0.2em]"
          >
            Cancel
          </button>
          {!isView && (
            <button 
                onClick={() => onSave(form)}
                className="px-16 py-3 text-[11px] font-black text-white bg-black rounded-xl hover:bg-gray-900 transition-all flex items-center gap-3 uppercase tracking-[0.2em] shadow-xl shadow-black/20 active:scale-95"
            >
                Save Changes <ArrowRight size={16} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const ImageIcon = ({ size, className }: { size?: number, className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size || 24} height={size || 24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <polyline points="21 15 16 10 5 21" />
    </svg>
);
