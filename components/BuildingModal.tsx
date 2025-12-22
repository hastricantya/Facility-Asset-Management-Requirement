
import React, { useState, useEffect } from 'react';
import { X, Building, DollarSign, Calendar, Home, ChevronsUpDown, FileText, CheckCircle2, Circle, Clock } from 'lucide-react';
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

  if (!isOpen) return null;

  const isView = mode === 'view';

  const approvalWorkflow = [
    { role: 'BM / Admin', desc: 'Input proposal, revisi, upload dokumen', status: 'Completed', date: '12 Mar 2024' },
    { role: 'Regional Branch', desc: 'Approval level 2', status: 'Completed', date: '13 Mar 2024' },
    { role: 'Jemmy Liem', desc: 'Approval level 3', status: 'Current', date: '-' },
    { role: 'DJ', desc: 'Approval final', status: 'Pending', date: '-' },
    { role: 'Legal', desc: 'Legal checking, surat kuasa', status: 'Pending', date: '-' },
    { role: 'FM', desc: 'Pajak & keuangan', status: 'Pending', date: '-' },
    { role: 'Accounting', desc: 'Approval keuangan', status: 'Pending', date: '-' },
    { role: 'Finance & Governance', desc: 'Approval lanjutan', status: 'Pending', date: '-' },
    { role: 'COO', desc: 'Final approval', status: 'Pending', date: '-' },
  ];

  const SectionHeader = ({ icon: Icon, title }: { icon: any, title: string }) => (
    <div className="flex items-center gap-3 mb-6 pb-2 border-b border-gray-100">
      <div className="p-1.5 bg-gray-50 rounded border border-gray-100">
        <Icon size={14} className="text-black" />
      </div>
      <h3 className="text-[10px] font-bold text-black uppercase tracking-[0.1em]">{title}</h3>
    </div>
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

        {/* Tabs */}
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

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-10 bg-[#fbfbfb] custom-scrollbar">
          {activeTab === 'General' && (
            <div className="space-y-8 max-w-5xl mx-auto">
              <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
                <SectionHeader icon={Home} title="DETAIL INFORMASI" />
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                  <div className="md:col-span-9">
                    <label className="block text-[11px] font-bold text-gray-500 mb-2">Nama Gedung</label>
                    <input className="w-full bg-white border border-gray-200 rounded px-4 py-2.5 text-[12px] font-medium text-black outline-none focus:border-black" value={form.name || ''} onChange={e => setForm({...form, name: e.target.value})} />
                  </div>
                  <div className="md:col-span-3">
                    <label className="block text-[11px] font-bold text-gray-500 mb-2">Type</label>
                    <select className="w-full bg-white border border-gray-200 rounded px-4 py-2.5 text-[12px] font-medium text-black outline-none focus:border-black" value={form.type || ''} onChange={e => setForm({...form, type: e.target.value})}>
                        <option value="Office">Office</option>
                        <option value="Warehouse">Warehouse</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'Workflow' && (
            <div className="max-w-4xl mx-auto space-y-6">
              <div className="bg-white p-10 rounded-xl border border-gray-200 shadow-sm">
                <SectionHeader icon={Clock} title="ALUR PERSETUJUAN PROPOSAL" />
                <div className="space-y-0">
                  {approvalWorkflow.map((step, i) => (
                    <div key={i} className="flex gap-6 group">
                      <div className="flex flex-col items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all ${
                          step.status === 'Completed' ? 'bg-black border-black text-white' : 
                          step.status === 'Current' ? 'bg-white border-black text-black animate-pulse' : 
                          'bg-white border-gray-100 text-gray-200'
                        }`}>
                          {step.status === 'Completed' ? <CheckCircle2 size={16} /> : <Circle size={12} />}
                        </div>
                        {i < approvalWorkflow.length - 1 && (
                          <div className={`w-[2px] h-16 ${step.status === 'Completed' ? 'bg-black' : 'bg-gray-100'}`}></div>
                        )}
                      </div>
                      <div className="pt-1 pb-10">
                        <div className="flex items-center gap-3 mb-1">
                          <h4 className={`text-[12px] font-black uppercase tracking-tight ${step.status === 'Pending' ? 'text-gray-300' : 'text-black'}`}>
                            {step.role}
                          </h4>
                          {step.date !== '-' && <span className="text-[10px] font-bold text-gray-400">{step.date}</span>}
                        </div>
                        <p className={`text-[11px] font-medium ${step.status === 'Pending' ? 'text-gray-200' : 'text-gray-500'}`}>
                          {step.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="px-8 py-4 bg-white border-t border-gray-100 flex justify-end gap-3 shrink-0">
          <button onClick={onClose} className="px-8 py-2 text-[12px] font-bold text-gray-500 bg-white border border-gray-200 rounded hover:bg-gray-50">Draf</button>
          {!isView && <button onClick={() => onSave(form)} className="px-8 py-2 text-[12px] font-bold text-white bg-black rounded shadow-lg shadow-black/10">Simpan</button>}
        </div>
      </div>
    </div>
  );
};
