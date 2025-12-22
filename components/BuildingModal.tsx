
import React, { useState, useEffect } from 'react';
import { X, Building, DollarSign, CheckCircle2, Circle, Clock, MapPin, Ruler, Shield, Plus, Trash2, Zap, Droplets, Truck, Info, ChevronRight, FileText, Smartphone, HardHat, User, Calendar, LayoutGrid, FileCheck, MoveHorizontal, Construction } from 'lucide-react';
import { BuildingRecord } from '../types';

interface Dimensions {
  p: string;
  l: string;
  total: string;
}

interface ProposalAlternative {
  id: string;
  // I. Identitas & Lokasi
  address: string;
  city: string;
  province: string;
  phone: string;
  ownerName: string;
  ownerPhone: string;
  rentalType: 'Baru' | 'Perpanjang';
  
  // II. Spesifikasi Teknis
  landSize: Dimensions;
  buildingSize: Dimensions;
  yardSize: Dimensions;
  floors: {
    dasar: string;
    f1: string;
    f2: string;
    f3: string;
    f4: string;
  };
  
  // III. Fasilitas & Konstruksi
  electricity: string;
  waterSource: string;
  phoneLines: string;
  fence: string;
  gate: string;
  parking: string;
  construction: string[]; // Pilar, Atap, Lantai, Dinding
  
  // IV. Keamanan
  securityFeatures: string[]; // Security Area, CCTV, Alarm, Pos Polisi
  
  // V. Aksesibilitas
  roadWidth: string;
  dealerDistance: string;
  loadingUnloading: string;
  
  // VI. Komersial & SWOT
  rentalCost: string;
  duration: string;
  taxPph: string;
  notaryFee: string;
  strengths: string;
  weaknesses: string;
  decision: string;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  initialData?: BuildingRecord;
  mode?: 'create' | 'edit' | 'view';
}

const createEmptyProposal = (index: number): ProposalAlternative => ({
  id: `ALT-${index + 1}`,
  address: '', city: '', province: '', phone: '',
  ownerName: '', ownerPhone: '', rentalType: 'Baru',
  landSize: { p: '', l: '', total: '' },
  buildingSize: { p: '', l: '', total: '' },
  yardSize: { p: '', l: '', total: '' },
  floors: { dasar: '', f1: '', f2: '', f3: '', f4: '' },
  electricity: '', waterSource: 'PAM', phoneLines: '',
  fence: 'Baik', gate: 'Baik', parking: '',
  construction: [],
  securityFeatures: [],
  roadWidth: '', dealerDistance: '', loadingUnloading: '',
  rentalCost: '', duration: '', taxPph: '', notaryFee: '',
  strengths: '', weaknesses: '',
  decision: 'Pending'
});

export const BuildingModal: React.FC<Props> = ({ isOpen, onClose, onSave, initialData, mode = 'create' }) => {
  const [activeTab, setActiveTab] = useState('Proposal & Comparison');
  const [selectedAltIndex, setSelectedAltIndex] = useState(0);
  const [alternatives, setAlternatives] = useState<ProposalAlternative[]>([createEmptyProposal(0)]);
  const [generalForm, setGeneralForm] = useState({
    projectName: '',
    branch: 'MODENA Head Office',
    pic: 'Admin Asset',
    targetDate: '',
    category: 'Showroom / MEC'
  });

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setGeneralForm({
          projectName: initialData.name || '',
          branch: initialData.location || '',
          pic: 'Admin Asset',
          targetDate: initialData.startDate || '',
          category: initialData.type || 'Showroom / MEC'
        });
      } else {
        setAlternatives([createEmptyProposal(0)]);
        setSelectedAltIndex(0);
        setActiveTab('Proposal & Comparison');
      }
    }
  }, [isOpen, initialData]);

  if (!isOpen) return null;

  const currentAlt = alternatives[selectedAltIndex];
  const isView = mode === 'view';

  const updateAltField = (field: string, value: any) => {
    const newAlts = [...alternatives];
    const path = field.split('.');
    if (path.length > 1) {
      (newAlts[selectedAltIndex] as any)[path[0]][path[1]] = value;
    } else {
      (newAlts[selectedAltIndex] as any)[field] = value;
    }
    setAlternatives(newAlts);
  };

  const toggleList = (listField: 'construction' | 'securityFeatures', item: string) => {
    const currentList = [...currentAlt[listField]];
    const newList = currentList.includes(item) ? currentList.filter(i => i !== item) : [...currentList, item];
    updateAltField(listField, newList);
  };

  const handleAddAlt = () => {
    if (alternatives.length < 4) {
      const newAlts = [...alternatives, createEmptyProposal(alternatives.length)];
      setAlternatives(newAlts);
      setSelectedAltIndex(newAlts.length - 1);
    }
  };

  // UI Components
  const SectionHeader = ({ icon: Icon, title, subtitle }: any) => (
    <div className="flex items-center gap-4 mb-8 pb-4 border-b border-gray-100">
      <div className="p-3 bg-black text-white rounded-2xl shadow-lg shadow-black/10">
        <Icon size={20} />
      </div>
      <div>
        <h3 className="text-[12px] font-black text-black uppercase tracking-[0.2em] leading-none mb-1">{title}</h3>
        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tight">{subtitle}</p>
      </div>
    </div>
  );

  const FormField = ({ label, children, className = "" }: any) => (
    <div className={className}>
      <label className="block text-[10px] font-black text-gray-400 uppercase mb-2 tracking-widest">{label}</label>
      {children}
    </div>
  );

  const FormInput = ({ placeholder, value, onChange, type = "text", className = "" }: any) => (
    <input 
      type={type}
      placeholder={placeholder}
      className={`w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold text-black focus:border-black outline-none transition-all placeholder:text-gray-300 shadow-sm disabled:bg-gray-50 ${className}`}
      value={value || ''}
      onChange={(e) => onChange(e.target.value)}
      disabled={isView}
    />
  );

  const CheckboxItem = ({ label, checked, onClick }: any) => (
    <button 
      onClick={onClick}
      disabled={isView}
      className={`flex items-center gap-3 p-4 rounded-xl border text-[11px] font-black uppercase tracking-tight transition-all text-left
        ${checked ? 'bg-black text-white border-black shadow-lg' : 'bg-white text-gray-500 border-gray-100 hover:border-black'}
      `}
    >
      {checked ? <CheckCircle2 size={16} /> : <Circle size={16} />}
      {label}
    </button>
  );

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center backdrop-blur-sm">
      <div className="bg-white w-full max-w-[1500px] h-full flex flex-col overflow-hidden animate-in fade-in zoom-in duration-300">
        
        {/* Header */}
        <div className="px-10 py-6 border-b border-gray-100 flex items-center justify-between bg-white z-10 shrink-0">
          <div>
            <h2 className="text-[16px] font-black text-black uppercase tracking-tight">Proposal Sewa Bangunan</h2>
            <div className="flex items-center gap-3 mt-1">
              <span className="bg-black text-white text-[9px] font-black px-2 py-0.5 rounded uppercase">DRAFT PROPOSAL</span>
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">| F.50/MI-HCO/R00/2021</span>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-black p-2 transition-all hover:bg-gray-100 rounded-full">
            <X size={24} />
          </button>
        </div>

        {/* Tabs */}
        <div className="px-10 flex border-b border-gray-100 bg-white sticky top-0 z-10 shrink-0">
          {['General', 'Proposal & Comparison', 'Workflow', 'Documents'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-5 px-8 text-[10px] font-black transition-all border-b-2 whitespace-nowrap uppercase tracking-[0.2em]
                ${activeTab === tab ? 'border-black text-black' : 'border-transparent text-gray-400 hover:text-gray-600'}`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto p-12 bg-[#fbfbfb] custom-scrollbar">
          
          {activeTab === 'General' && (
            <div className="max-w-4xl mx-auto space-y-10 animate-in fade-in duration-300">
               <div className="bg-white p-12 rounded-3xl border border-gray-200 shadow-sm space-y-10">
                  <SectionHeader icon={Info} title="I. Informasi Administrasi Proyek" subtitle="Data Induk Cabang / Lokasi" />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <FormField label="Nama Proyek" className="md:col-span-2">
                      <FormInput value={generalForm.projectName} onChange={(v:any) => setGeneralForm({...generalForm, projectName: v})} placeholder="Contoh: MODENA Branch Kemang Expansion" />
                    </FormField>
                    <FormField label="Asset Category">
                       <select className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold text-black focus:border-black outline-none appearance-none" value={generalForm.category} onChange={(e) => setGeneralForm({...generalForm, category: e.target.value})}>
                          <option>Showroom / MEC</option>
                          <option>Warehouse</option>
                          <option>Office Building</option>
                       </select>
                    </FormField>
                    <FormField label="Target Operasional">
                       <FormInput type="date" value={generalForm.targetDate} onChange={(v:any) => setGeneralForm({...generalForm, targetDate: v})} />
                    </FormField>
                    <FormField label="PIC Proyek"><FormInput value={generalForm.pic} onChange={(v:any) => setGeneralForm({...generalForm, pic: v})} /></FormField>
                    <FormField label="Cabang"><FormInput value={generalForm.branch} onChange={(v:any) => setGeneralForm({...generalForm, branch: v})} /></FormField>
                  </div>
               </div>
            </div>
          )}

          {activeTab === 'Proposal & Comparison' && (
            <div className="max-w-6xl mx-auto space-y-12 pb-24">
              
              {/* Option Switcher */}
              <div className="bg-white p-8 rounded-[40px] border border-gray-200 shadow-sm flex items-center justify-between sticky top-0 z-20">
                <div className="flex gap-3">
                  {alternatives.map((alt, idx) => (
                    <button
                      key={alt.id}
                      onClick={() => setSelectedAltIndex(idx)}
                      className={`px-10 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all border
                        ${selectedAltIndex === idx ? 'bg-black text-white border-black shadow-xl' : 'bg-white text-gray-400 border-gray-100 hover:border-black hover:text-black'}
                      `}
                    >
                      Alternative {idx + 1}
                    </button>
                  ))}
                  {alternatives.length < 4 && !isView && (
                    <button onClick={handleAddAlt} className="w-12 h-12 flex items-center justify-center rounded-2xl border-2 border-dashed border-gray-200 text-gray-300 hover:border-black hover:text-black transition-all">
                      <Plus size={20} />
                    </button>
                  )}
                </div>
                <div className="flex items-center gap-4">
                   <div className={`px-5 py-2 rounded-xl text-[10px] font-black uppercase border tracking-tighter ${currentAlt.decision === 'Sewa' ? 'bg-green-50 text-green-600 border-green-200' : 'bg-gray-50 text-gray-400 border-gray-100'}`}>
                      STATUS: {currentAlt.decision}
                   </div>
                   {alternatives.length > 1 && !isView && (
                     <button onClick={() => { setAlternatives(alternatives.filter((_, i) => i !== selectedAltIndex)); setSelectedAltIndex(0); }} className="p-3 text-red-400 hover:bg-red-50 rounded-xl transition-all">
                        <Trash2 size={20} />
                     </button>
                   )}
                </div>
              </div>

              {/* SECTION: IDENTITAS */}
              <div className="bg-white p-12 rounded-[40px] border border-gray-200 shadow-sm space-y-10 animate-in fade-in duration-300">
                <SectionHeader icon={MapPin} title="I. Identitas & Lokasi" subtitle="Data Legalitas dan Kepemilikan" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-6">
                    <FormField label="Alamat Lengkap">
                      <textarea className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold text-black focus:border-black outline-none h-32 shadow-sm" value={currentAlt.address} onChange={(e) => updateAltField('address', e.target.value)} disabled={isView} />
                    </FormField>
                    <div className="grid grid-cols-2 gap-4">
                      <FormField label="Kota"><FormInput value={currentAlt.city} onChange={(v:any) => updateAltField('city', v)} /></FormField>
                      <FormField label="Provinsi"><FormInput value={currentAlt.province} onChange={(v:any) => updateAltField('province', v)} /></FormField>
                    </div>
                  </div>
                  <div className="space-y-6">
                    <FormField label="Nama Pemilik"><FormInput value={currentAlt.ownerName} onChange={(v:any) => updateAltField('ownerName', v)} /></FormField>
                    <FormField label="HP / Telp Pemilik"><FormInput value={currentAlt.ownerPhone} onChange={(v:any) => updateAltField('ownerPhone', v)} /></FormField>
                    <FormField label="Sifat Sewa">
                       <select className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold text-black focus:border-black outline-none" value={currentAlt.rentalType} onChange={(e:any) => updateAltField('rentalType', e.target.value)}>
                          <option value="Baru">Baru</option>
                          <option value="Perpanjang">Perpanjang</option>
                       </select>
                    </FormField>
                  </div>
                </div>
              </div>

              {/* SECTION: SPESIFIKASI TEKNIS (P x L) */}
              <div className="bg-white p-12 rounded-[40px] border border-gray-200 shadow-sm space-y-10">
                <SectionHeader icon={Ruler} title="II. Ukuran & Luas" subtitle="Dimensi Fisik Properti" />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <FormField label="Luas Tanah (M2)">
                    <div className="flex gap-2 items-center">
                       <FormInput placeholder="P" value={currentAlt.landSize.p} onChange={(v:any) => updateAltField('landSize.p', v)} />
                       <span className="font-black text-gray-200">X</span>
                       <FormInput placeholder="L" value={currentAlt.landSize.l} onChange={(v:any) => updateAltField('landSize.l', v)} />
                    </div>
                  </FormField>
                  <FormField label="Luas Bangunan (M2)">
                    <div className="flex gap-2 items-center">
                       <FormInput placeholder="P" value={currentAlt.buildingSize.p} onChange={(v:any) => updateAltField('buildingSize.p', v)} />
                       <span className="font-black text-gray-200">X</span>
                       <FormInput placeholder="L" value={currentAlt.buildingSize.l} onChange={(v:any) => updateAltField('buildingSize.l', v)} />
                    </div>
                  </FormField>
                  <FormField label="Luas Halaman Depan">
                    <div className="flex gap-2 items-center">
                       <FormInput placeholder="P" value={currentAlt.yardSize.p} onChange={(v:any) => updateAltField('yardSize.p', v)} />
                       <span className="font-black text-gray-200">X</span>
                       <FormInput placeholder="L" value={currentAlt.yardSize.l} onChange={(v:any) => updateAltField('yardSize.l', v)} />
                    </div>
                  </FormField>
                </div>
                
                <div className="pt-6 border-t border-gray-50">
                  <label className="block text-[10px] font-black text-gray-400 uppercase mb-6 tracking-[0.3em]">Detail Per Lantai (M2)</label>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                    <FormField label="Lantai Dasar"><FormInput placeholder="0" value={currentAlt.floors.dasar} onChange={(v:any) => updateAltField('floors.dasar', v)} /></FormField>
                    <FormField label="Lantai I"><FormInput placeholder="0" value={currentAlt.floors.f1} onChange={(v:any) => updateAltField('floors.f1', v)} /></FormField>
                    <FormField label="Lantai II"><FormInput placeholder="0" value={currentAlt.floors.f2} onChange={(v:any) => updateAltField('floors.f2', v)} /></FormField>
                    <FormField label="Lantai III"><FormInput placeholder="0" value={currentAlt.floors.f3} onChange={(v:any) => updateAltField('floors.f3', v)} /></FormField>
                    <FormField label="Lantai IV"><FormInput placeholder="0" value={currentAlt.floors.f4} onChange={(v:any) => updateAltField('floors.f4', v)} /></FormField>
                  </div>
                </div>
              </div>

              {/* SECTION: FASILITAS & KEAMANAN */}
              <div className="bg-white p-12 rounded-[40px] border border-gray-200 shadow-sm space-y-12">
                <SectionHeader icon={Shield} title="III. Fasilitas & Infrastruktur" subtitle="Kelayakan Bangunan & Keamanan" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div className="space-y-8">
                    <div className="grid grid-cols-2 gap-4">
                       <FormField label="Daya Listrik (A)"><FormInput value={currentAlt.electricity} onChange={(v:any) => updateAltField('electricity', v)} /></FormField>
                       <FormField label="Sumber Air">
                         <select className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold text-black" value={currentAlt.waterSource} onChange={(e) => updateAltField('waterSource', e.target.value)}>
                            <option>PAM</option><option>Pompa/Sumur</option>
                         </select>
                       </FormField>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                       <FormField label="Kondisi Pagar"><FormInput value={currentAlt.fence} onChange={(v:any) => updateAltField('fence', v)} /></FormField>
                       <FormField label="Pintu Gerbang"><FormInput value={currentAlt.gate} onChange={(v:any) => updateAltField('gate', v)} /></FormField>
                    </div>
                    <FormField label="Keamanan Wilayah">
                      <div className="grid grid-cols-1 gap-2">
                        {['Security Gedung', 'Security Area Wilayah', 'CCTV System', 'Alarm System', 'Dekat Pos Polisi (<500m)'].map(item => (
                          <CheckboxItem key={item} label={item} checked={currentAlt.securityFeatures.includes(item)} onClick={() => toggleList('securityFeatures', item)} />
                        ))}
                      </div>
                    </FormField>
                  </div>
                  <div className="space-y-8">
                    <FormField label="Konstruksi Bangunan">
                       <div className="grid grid-cols-1 gap-2">
                          {['Pilar Tiang Baja', 'Konstruksi Beton', 'Atap Genteng', 'Atap Asbes/Seng', 'Lantai Keramik/Granit', 'Lantai Semen', 'Dinding Batu Bata', 'Dinding Partisi'].map(item => (
                            <CheckboxItem key={item} label={item} checked={currentAlt.construction.includes(item)} onClick={() => toggleList('construction', item)} />
                          ))}
                       </div>
                    </FormField>
                    <FormField label="Aksesibilitas">
                       <div className="space-y-4">
                         <div className="flex gap-4">
                           <FormField label="Lebar Jalan (M)" className="flex-1"><FormInput value={currentAlt.roadWidth} onChange={(v:any) => updateAltField('roadWidth', v)} /></FormField>
                           <FormField label="Jarak ke Dealer" className="flex-1"><FormInput value={currentAlt.dealerDistance} onChange={(v:any) => updateAltField('dealerDistance', v)} /></FormField>
                         </div>
                         <FormField label="Fasilitas Bongkar Muat Truk">
                           <select className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold text-black" value={currentAlt.loadingUnloading} onChange={(e) => updateAltField('loadingUnloading', e.target.value)}>
                              <option>Tersedia & Luas</option><option>Terbatas</option><option>Tidak Ada</option>
                           </select>
                         </FormField>
                       </div>
                    </FormField>
                  </div>
                </div>
              </div>

              {/* SECTION: KOMERSIAL & SWOT */}
              <div className="bg-white p-12 rounded-[40px] border border-gray-200 shadow-sm space-y-12">
                 <SectionHeader icon={DollarSign} title="IV. Komersial & Analisis Survey" subtitle="Biaya Sewa dan Penilaian Strategis" />
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <FormField label="Biaya Sewa / Tahun"><FormInput placeholder="Rp 0" value={currentAlt.rentalCost} onChange={(v:any) => updateAltField('rentalCost', v)} /></FormField>
                    <FormField label="Jangka Waktu Sewa"><FormInput placeholder="Contoh: 5 Tahun" value={currentAlt.duration} onChange={(v:any) => updateAltField('duration', v)} /></FormField>
                    <FormField label="Pajak PPH (%)"><FormInput value={currentAlt.taxPph} onChange={(v:any) => updateAltField('taxPph', v)} /></FormField>
                    <FormField label="Biaya Notaris"><FormInput value={currentAlt.notaryFee} onChange={(v:any) => updateAltField('notaryFee', v)} /></FormField>
                 </div>

                 <div className="pt-8">
                    <label className="block text-[10px] font-black text-gray-400 uppercase mb-8 text-center tracking-[0.4em]">ANALISIS KEUNTUNGAN VS RISIKO</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-gray-100 rounded-[32px] overflow-hidden border border-gray-100">
                      <div className="bg-white p-10 space-y-4">
                        <div className="flex items-center gap-2 text-green-600 font-black text-[11px] uppercase tracking-widest mb-4">
                           <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center">1</div>
                           Kelebihan Lokasi (Strengths)
                        </div>
                        <textarea className="w-full h-44 bg-gray-50 border-none rounded-2xl p-6 text-sm font-medium outline-none focus:bg-white focus:ring-4 focus:ring-green-50 transition-all" value={currentAlt.strengths} onChange={(e) => updateAltField('strengths', e.target.value)} placeholder="Tuliskan alasan teknis properti ini direkomendasikan..." />
                      </div>
                      <div className="bg-white p-10 space-y-4">
                        <div className="flex items-center gap-2 text-red-600 font-black text-[11px] uppercase tracking-widest mb-4">
                           <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center">2</div>
                           Kekurangan Lokasi (Weaknesses)
                        </div>
                        <textarea className="w-full h-44 bg-gray-50 border-none rounded-2xl p-6 text-sm font-medium outline-none focus:bg-white focus:ring-4 focus:ring-red-50 transition-all" value={currentAlt.weaknesses} onChange={(e) => updateAltField('weaknesses', e.target.value)} placeholder="Tuliskan hambatan atau risiko yang mungkin muncul..." />
                      </div>
                    </div>
                 </div>

                 <div className="max-w-md mx-auto pt-6">
                    <FormField label="REKOMENDASI AKHIR">
                       <select className={`w-full bg-white border border-gray-200 rounded-2xl px-6 py-4 text-sm font-black uppercase tracking-widest transition-all
                          ${currentAlt.decision === 'Sewa' ? 'text-green-600 border-green-500 bg-green-50' : currentAlt.decision === 'Batal' ? 'text-red-600 border-red-500 bg-red-50' : 'text-black border-gray-200'}
                       `} value={currentAlt.decision} onChange={(e) => updateAltField('decision', e.target.value)}>
                          <option value="Pending">Sedang Ditinjau (Pending)</option>
                          <option value="Sewa">Direkomendasikan (Sewa)</option>
                          <option value="Batal">Ditolak / Batal Sewa</option>
                       </select>
                    </FormField>
                 </div>
              </div>
            </div>
          )}

          {activeTab === 'Workflow' && (
            <div className="max-w-4xl mx-auto space-y-8 animate-in slide-in-from-right-4 duration-300">
               <div className="bg-white p-12 rounded-[40px] border border-gray-200 shadow-sm space-y-12">
                  <SectionHeader icon={Clock} title="Alur Persetujuan Proposal" subtitle="Timeline Tracking Verifikasi & Approval" />
                  <div className="space-y-0 relative">
                    {[
                      { role: 'BM / Admin Cabang', status: 'Completed', date: '12 Mar 2024', user: 'Admin Jkt' },
                      { role: 'Regional Manager', status: 'Completed', date: '13 Mar 2024', user: 'Budi Hartono' },
                      { role: 'FM / Accounting', status: 'In Progress', date: '-', user: '-' },
                      { role: 'COO / Director', status: 'Pending', date: '-', user: '-' },
                    ].map((step, i) => (
                      <div key={i} className="flex gap-12 group">
                        <div className="flex flex-col items-center">
                          <div className={`w-14 h-14 rounded-full flex items-center justify-center border-2 transition-all duration-500 shadow-sm
                            ${step.status === 'Completed' ? 'bg-black border-black text-white' : step.status === 'In Progress' ? 'bg-white border-black text-black' : 'bg-white border-gray-100 text-gray-200'}
                          `}>
                            {step.status === 'Completed' ? <CheckCircle2 size={28} /> : step.status === 'In Progress' ? <Clock size={24} className="animate-pulse" /> : <Circle size={20} />}
                          </div>
                          {i < 3 && <div className={`w-[3px] h-24 transition-all duration-500 ${step.status === 'Completed' ? 'bg-black' : 'bg-gray-100'}`}></div>}
                        </div>
                        <div className="pt-4">
                          <h4 className="text-[14px] font-black uppercase tracking-widest text-black mb-1">{step.role}</h4>
                          <div className="flex items-center gap-4">
                             <p className={`text-[10px] font-bold uppercase tracking-tighter ${step.status === 'Completed' ? 'text-black' : 'text-gray-300'}`}>
                               {step.status === 'Completed' ? `VERIFIED BY ${step.user}` : step.status === 'In Progress' ? 'UNDER REVIEW' : 'WAITING'}
                             </p>
                             {step.date !== '-' && <span className="text-[9px] font-black text-gray-400 bg-gray-100 px-3 py-1 rounded-lg uppercase">{step.date}</span>}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
               </div>
            </div>
          )}

          {activeTab === 'Documents' && (
            <div className="max-w-4xl mx-auto animate-in fade-in duration-300">
               <div className="bg-white p-12 rounded-[40px] border border-gray-200 shadow-sm space-y-10">
                  <SectionHeader icon={FileCheck} title="Dokumen Legalitas & Foto" subtitle="Upload Lampiran Survey" />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                     {['Copy Sertifikat (SHM/HGB)', 'Copy IMB / PBG', 'Copy PBB Terakhir', 'Foto Tampak Depan Lokasi', 'Foto Interior Bangunan', 'Layout / Denah Lokasi'].map(doc => (
                        <div key={doc} className="p-10 border-2 border-dashed border-gray-100 rounded-3xl flex flex-col items-center justify-center hover:border-black transition-all cursor-pointer group bg-gray-50/30">
                           <div className="w-16 h-16 rounded-full bg-white shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                              <FileText size={24} className="text-gray-300 group-hover:text-black" />
                           </div>
                           <span className="text-[11px] font-black uppercase tracking-widest text-center text-gray-400 group-hover:text-black">{doc}</span>
                           <p className="text-[9px] font-bold text-gray-300 mt-2 uppercase">Klik untuk pilih file</p>
                        </div>
                     ))}
                  </div>
               </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-10 py-8 bg-white border-t border-gray-100 flex justify-end gap-4 shrink-0">
          <button onClick={onClose} className="px-12 py-4 text-[11px] font-black text-gray-400 bg-white border border-gray-200 rounded-2xl hover:bg-gray-50 hover:text-black transition-all uppercase tracking-[0.2em]">
            SIMPAN DRAFT
          </button>
          {!isView && (
            <button 
              onClick={() => onSave({ general: generalForm, alts: alternatives })} 
              className="px-16 py-4 text-[11px] font-black text-white bg-black rounded-2xl shadow-2xl shadow-black/20 hover:bg-gray-900 transition-all uppercase tracking-[0.2em] active:scale-95 flex items-center gap-3"
            >
              AJUKAN PROPOSAL <ChevronRight size={18} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
