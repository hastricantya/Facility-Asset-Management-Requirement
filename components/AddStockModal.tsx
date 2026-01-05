import React, { useState, useEffect, useMemo } from 'react';
import { X, Save, Calendar, User, Package, MessageSquare, Plus, Trash2, Send, Layers, ClipboardCheck, Clock, Archive, Settings, History, Lock, Home, LayoutGrid, Baby, Users, Activity, Briefcase, Building2, Key, Hash, ShieldCheck, DollarSign, Landmark, ShoppingCart, AlertCircle, UploadCloud, Check, XCircle, MapPin, Search, Filter, ClipboardList, Info, Smartphone, Mail, CreditCard, Contact } from 'lucide-react';
import { AssetRecord, LogBookRecord, StockOpnameRecord, LockerRecord, LockerRequestRecord, PodRequestRecord, ModenaPodRecord, MasterPodRecord, MasterLockerRecord, StationeryRequestRecord, StationeryRequestItem } from '../types';
import { useLanguage } from '../contexts/LanguageContext';
import { MOCK_MASTER_DATA, MOCK_MASTER_ARK_DATA, MOCK_ATK_CATEGORY, MOCK_ARK_CATEGORY, MOCK_UOM_DATA, MOCK_POD_DATA } from '../constants';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  moduleName?: string;
  onSaveStationeryRequest?: (request: Partial<StationeryRequestRecord>) => void;
  onSaveLogBook?: (logbook: Partial<LogBookRecord>) => void;
  onSaveStockOpname?: (opname: Partial<StockOpnameRecord>) => void;
  onSaveLocker?: (locker: Partial<LockerRecord>) => void;
  onSaveLockerRequest?: (request: Partial<LockerRequestRecord>) => void;
  onSavePodRequest?: (request: Partial<PodRequestRecord>) => void;
  onSavePod?: (pod: Partial<ModenaPodRecord>) => void;
  onSaveMasterPod?: (pod: Partial<MasterPodRecord>) => void;
  onSaveMasterLocker?: (pod: Partial<MasterLockerRecord>) => void;
  onApprove?: (item: AssetRecord) => void;
  onReject?: (item: AssetRecord) => void;
  
  initialAssetData?: AssetRecord;
  initialLogBookData?: LogBookRecord;
  initialStockOpnameData?: StockOpnameRecord;
  initialLockerData?: LockerRecord;
  initialLockerRequestData?: LockerRequestRecord;
  initialPodRequestData?: PodRequestRecord;
  initialPodData?: ModenaPodRecord;
  initialMasterPodData?: MasterPodRecord;
  initialMasterLockerData?: MasterLockerRecord;
  
  mode?: 'create' | 'edit' | 'view';
}

export const AddStockModal: React.FC<Props> = ({ 
    isOpen, 
    onClose, 
    moduleName = 'ATK', 
    onSaveStationeryRequest,
    onSaveLogBook,
    onSaveStockOpname,
    onSaveLocker,
    onSaveLockerRequest,
    onSavePodRequest,
    onSavePod,
    onSaveMasterPod,
    onSaveMasterLocker,
    onApprove,
    onReject,
    initialAssetData,
    initialLogBookData,
    initialStockOpnameData,
    initialLockerData,
    initialLockerRequestData,
    initialPodData,
    initialMasterPodData,
    initialMasterLockerData,
    initialPodRequestData,
    mode = 'create'
}) => {
  const { t } = useLanguage();
  
  const [logBookForm, setLogBookForm] = useState<Partial<LogBookRecord>>({});
  const [stockOpnameForm, setStockOpnameForm] = useState<Partial<StockOpnameRecord>>({});
  const [lockerForm, setLockerForm] = useState<Partial<LockerRecord>>({});
  const [lockerRequestForm, setLockerRequestForm] = useState<Partial<LockerRequestRecord>>({});
  const [podRequestForm, setPodRequestForm] = useState<Partial<PodRequestRecord>>({});
  const [podForm, setPodForm] = useState<Partial<ModenaPodRecord>>({});
  const [masterPodForm, setMasterPodForm] = useState<Partial<MasterPodRecord>>({});
  const [masterLockerForm, setMasterLockerForm] = useState<Partial<MasterLockerRecord>>({});
  const [stationeryRequestForm, setStationeryRequestForm] = useState<Partial<StationeryRequestRecord>>({});
  const [requestItems, setRequestItems] = useState<StationeryRequestItem[]>([{ itemId: '', qty: '', categoryId: '', uom: '' }]);
  
  const [soCategory, setSoCategory] = useState<'ATK' | 'ARK'>('ATK');
  const [soItems, setSoItems] = useState<Array<{id: string | number, itemCode: string, itemName: string, category: string, systemQty: number, physicalQty: number, difference: number}>>([]);

  const isArkModule = moduleName.includes('ARK') || moduleName.includes('Household');
  const isStationeryRequest = moduleName.includes('ATK') || moduleName.includes('ARK') || moduleName.includes('Stationery') || moduleName.includes('Household');
  const isApprovalModule = moduleName.includes('Approval');
  const isLogBook = moduleName === 'Log Book';
  const isStockOpname = moduleName.includes('Stock Opname');
  const isLocker = moduleName === 'Daftar Loker';
  const isLockerRequest = moduleName === 'Request Locker';
  const isPod = moduleName === 'Pod Census';
  const isMasterPod = moduleName === 'Master MODENA Pod';
  const isMasterLocker = moduleName === 'Master Loker Barang' || moduleName === 'Master Loker Pantry';
  const isPodRequest = moduleName === 'Request MODENA Pod';
  const isViewMode = mode === 'view';
  const isFieldDisabled = isViewMode;

  useEffect(() => {
    if (isOpen) {
        if (mode === 'edit' || mode === 'view') {
           if (initialLogBookData) setLogBookForm(initialLogBookData);
           if (initialStockOpnameData) setStockOpnameForm(initialStockOpnameData);
           if (initialLockerData) setLockerForm(initialLockerData);
           if (initialLockerRequestData) setLockerRequestForm(initialLockerRequestData);
           if (initialPodRequestData) setPodRequestForm(initialPodRequestData);
           if (initialPodData) setPodForm(initialPodData);
           if (initialMasterPodData) setMasterPodForm(initialMasterPodData);
           if (initialMasterLockerData) setMasterLockerForm(initialMasterLockerData);
           
           if (initialAssetData) {
               const masterList = isArkModule ? MOCK_MASTER_ARK_DATA : MOCK_MASTER_DATA;
               const matchedMaster = masterList.find(m => m.itemName === initialAssetData.itemName);
               setStationeryRequestForm({
                   type: 'DAILY REQUEST',
                   date: initialAssetData.date,
                   remarks: initialAssetData.itemDescription || '',
                   deliveryType: 'PICKUP HO',
                   location: 'Satrio'
               });
               setRequestItems([{ 
                   itemId: matchedMaster ? matchedMaster.id.toString() : '', 
                   qty: initialAssetData.qty.toString(),
                   categoryId: matchedMaster ? matchedMaster.category : '',
                   uom: matchedMaster ? matchedMaster.uom : ''
               }]);
           }
        } else {
            if (isLogBook) {
              setLogBookForm({
                lokasiModena: 'Satrio',
                kategoriTamu: 'Customer',
                namaTamu: '',
                nomorHp: '',
                email: '',
                visitorCard: '',
                noIdentitas: '',
                tanggalKunjungan: new Date().toISOString().split('T')[0],
                jamDatang: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
                jamPulang: '',
                wanita: 0,
                lakiLaki: 1,
                anakAnak: 0,
                note: ''
              });
            }
            if (isStockOpname) {
                setStockOpnameForm({ 
                  opnameNumber: `SO/${soCategory}/${new Date().getFullYear()}/${Math.floor(Math.random()*9999)}`, 
                  date: new Date().toISOString().split('T')[0], 
                  status: 'Draft',
                  performedBy: 'Current User'
                });
                const master = soCategory === 'ATK' ? MOCK_MASTER_DATA : MOCK_MASTER_ARK_DATA;
                setSoItems(master.map(m => ({
                  id: m.id,
                  itemCode: m.itemCode,
                  itemName: m.itemName,
                  category: m.category,
                  systemQty: m.remainingStock,
                  physicalQty: m.remainingStock,
                  difference: 0
                })));
            }
            if (isPod) setPodForm({ lantai: 'Lt 2 Pria', jenisKamar: 'Single Bed', statusLokerBarang: 'Tidak Terpakai', statusLokerPantry: 'Tidak Terpakai', jadwalLaundry: 'Tidak ada', isExpat: false });
            if (isMasterPod) setMasterPodForm({ lantai: 'Lt 2 Pria', jenisKamar: 'Single Bed', kapasitas: 1, status: 'Active', fasilitas: [] });
            if (isMasterLocker) setMasterLockerForm({ floor: 'Lt 2 Pria', status: 'Active', type: moduleName.includes('Goods') ? 'Goods' : 'Pantry' });
            if (isStationeryRequest) {
                setStationeryRequestForm({ type: 'DAILY REQUEST', deliveryType: 'PICKUP HO', location: 'Satrio', date: '2026-01-05' }); 
                setRequestItems([{ itemId: '', qty: '', categoryId: '', uom: '' }]);
            }
            if (isLockerRequest) {
                setLockerRequestForm({
                  date: new Date().toLocaleDateString('id-ID'),
                  status: 'Pending',
                  reason: '',
                  preferredLocation: 'Lantai 1'
                });
            }
        }
    }
  }, [isOpen, initialAssetData, initialLogBookData, initialStockOpnameData, initialLockerData, initialLockerRequestData, initialPodData, initialMasterPodData, initialMasterLockerData, initialPodRequestData, mode, isArkModule, isStationeryRequest, isStockOpname, isPod, isMasterPod, isMasterLocker, isLockerRequest, isLogBook, moduleName, soCategory]);

  const handleSave = () => {
      if (isStationeryRequest && onSaveStationeryRequest) onSaveStationeryRequest({ ...stationeryRequestForm, items: requestItems });
      if (isLogBook && onSaveLogBook) onSaveLogBook(logBookForm);
      if (isStockOpname && onSaveStockOpname) onSaveStockOpname(stockOpnameForm);
      if (isLocker && onSaveLocker) onSaveLocker(lockerForm);
      if (isLockerRequest && onSaveLockerRequest) onSaveLockerRequest(lockerRequestForm);
      if (isPodRequest && onSavePodRequest) onSavePodRequest(podRequestForm);
      if (isPod && onSavePod) onSavePod(podForm);
      if (isMasterPod && onSaveMasterPod) onSaveMasterPod(masterPodForm);
      if (isMasterLocker && onSaveMasterLocker) onSaveMasterLocker(masterLockerForm);
      onClose();
  };

  const handleApproveAction = () => {
    if (onApprove && initialAssetData) {
      onApprove(initialAssetData);
      onClose();
    }
  };

  const handleRejectAction = () => {
    if (onReject && initialAssetData) {
      onReject(initialAssetData);
      onClose();
    }
  };

  const handleStationeryRequestChange = (field: keyof StationeryRequestRecord, value: any) => {
    setStationeryRequestForm(prev => ({ ...prev, [field]: value }));
  };

  const handleRequestItemChange = (index: number, field: keyof StationeryRequestItem, value: string) => {
      const newItems = [...requestItems];
      if (field === 'categoryId') {
          newItems[index] = { ...newItems[index], categoryId: value, itemId: '', uom: '' };
      } else if (field === 'itemId') {
          const masterList = isArkModule ? MOCK_MASTER_ARK_DATA : MOCK_MASTER_DATA;
          const selected = masterList.find(m => m.id.toString() === value);
          newItems[index] = { ...newItems[index], itemId: value, uom: selected?.uom || '', categoryId: selected?.category || newItems[index].categoryId };
      } else {
          newItems[index] = { ...newItems[index], [field]: value };
      }
      setRequestItems(newItems);
  };

  const handleSoPhysicalQtyChange = (index: number, value: string) => {
    const qty = parseInt(value) || 0;
    const newItems = [...soItems];
    newItems[index] = {
      ...newItems[index],
      physicalQty: qty,
      difference: qty - newItems[index].systemQty
    };
    setSoItems(newItems);
  };

  const SectionHeader = ({ icon: Icon, title }: { icon: any, title: string }) => (
    <div className="flex items-center gap-3 mb-6">
      <Icon size={18} className="text-black" />
      <h3 className="text-[10px] font-black text-black uppercase tracking-[0.2em]">{title}</h3>
    </div>
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center backdrop-blur-[2px] p-4 transition-opacity duration-300">
      <div className={`bg-[#F8F9FA] w-full max-w-6xl rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[95vh] transform transition-all scale-100`}>
        {/* Header */}
        <div className="px-8 py-5 bg-white border-b border-gray-100 flex items-center justify-between shrink-0">
          <div>
              <h2 className="text-[14px] font-black text-black uppercase tracking-widest">
                {isStationeryRequest ? (isViewMode ? 'Stationery Request Details' : `Create ${isArkModule ? 'Household' : 'Stationery'} Request`) :
                 isPod ? (isViewMode ? 'Pod Occupancy Detail' : 'Register New Room Assignment') : 
                 isMasterPod ? (isViewMode ? 'Master Pod Detail' : 'Define Pod Configuration') :
                 isMasterLocker ? (isViewMode ? 'Master Locker Detail' : 'Catalog New Locker') :
                 isLocker ? (isViewMode ? 'Locker Management Details' : 'Register Locker') : 
                 isLockerRequest ? (isViewMode ? 'Locker Request Details' : 'Create New Locker Request') :
                 isStockOpname ? (isViewMode ? 'Stock Opname Details' : 'Initiate New Stock Opname') :
                 isLogBook ? (isViewMode ? 'Guest Log Detail' : 'Check-in New Guest') :
                 moduleName}
              </h2>
          </div>
          <button className="text-gray-300 hover:text-red-500 transition-colors p-1" onClick={onClose}>
            <X size={24} />
          </button>
        </div>
        
        {/* Body */}
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          {isLogBook ? (
            /* --- UPDATED LOG BOOK FORM --- */
            <div className="space-y-8">
               <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                  {/* Left Column: Guest & Visit Details */}
                  <div className="md:col-span-8 bg-white p-8 rounded-2xl border border-gray-200 shadow-sm space-y-6">
                    <SectionHeader icon={Contact} title="Guest Profile & Visit Details" />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                       {/* Location & Category */}
                       <div>
                          <label className="block text-[10px] font-black text-gray-400 uppercase mb-2 tracking-widest">MODENA Location</label>
                          <div className="relative">
                              <MapPin size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />
                              <select 
                                disabled={isFieldDisabled} 
                                className="w-full bg-white border border-gray-200 rounded-xl pl-11 pr-4 py-3 text-sm font-bold text-black focus:border-black outline-none appearance-none transition-all shadow-sm"
                                value={logBookForm.lokasiModena || ''}
                                onChange={(e) => setLogBookForm({...logBookForm, lokasiModena: e.target.value})}
                              >
                                <option value="Satrio">Satrio (Head Office)</option>
                                <option value="Kemang">Kemang (Showroom)</option>
                                <option value="Suryo">Suryo (Showroom)</option>
                                <option value="Cakung">Cakung (Warehouse)</option>
                              </select>
                          </div>
                       </div>
                       <div>
                          <label className="block text-[10px] font-black text-gray-400 uppercase mb-2 tracking-widest">Guest Category</label>
                          <div className="relative">
                              <Layers size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />
                              <select 
                                disabled={isFieldDisabled} 
                                className="w-full bg-white border border-gray-200 rounded-xl pl-11 pr-4 py-3 text-sm font-bold text-black focus:border-black outline-none appearance-none transition-all shadow-sm"
                                value={logBookForm.kategoriTamu || ''}
                                onChange={(e) => setLogBookForm({...logBookForm, kategoriTamu: e.target.value})}
                              >
                                <option value="Customer">Customer</option>
                                <option value="Supplier">Supplier / Vendor</option>
                                <option value="Partner">Business Partner</option>
                                <option value="Personal">Personal / Family</option>
                                <option value="Courier">Courier / Delivery</option>
                              </select>
                          </div>
                       </div>

                       {/* Guest Name - Full width in its row */}
                       <div className="md:col-span-2">
                         <label className="block text-[10px] font-black text-gray-400 uppercase mb-2 tracking-widest">Full Name / Representative</label>
                         <div className="relative">
                             <User size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />
                             <input 
                               type="text" 
                               disabled={isFieldDisabled} 
                               placeholder="Input guest full name..."
                               className="w-full bg-white border border-gray-200 rounded-xl pl-11 pr-4 py-3 text-sm font-bold text-black focus:border-black outline-none transition-all shadow-sm"
                               value={logBookForm.namaTamu || ''}
                               onChange={(e) => setLogBookForm({...logBookForm, namaTamu: e.target.value})}
                             />
                         </div>
                       </div>

                       {/* NEW FIELDS: Phone & Email */}
                       <div>
                          <label className="block text-[10px] font-black text-gray-400 uppercase mb-2 tracking-widest">Phone Number (WhatsApp)</label>
                          <div className="relative">
                              <Smartphone size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />
                              <input 
                                type="tel" 
                                disabled={isFieldDisabled} 
                                placeholder="08xx-xxxx-xxxx"
                                className="w-full bg-white border border-gray-200 rounded-xl pl-11 pr-4 py-3 text-sm font-bold text-black focus:border-black outline-none transition-all shadow-sm"
                                value={logBookForm.nomorHp || ''}
                                onChange={(e) => setLogBookForm({...logBookForm, nomorHp: e.target.value})}
                              />
                          </div>
                       </div>
                       <div>
                          <label className="block text-[10px] font-black text-gray-400 uppercase mb-2 tracking-widest">Email Address</label>
                          <div className="relative">
                              <Mail size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />
                              <input 
                                type="email" 
                                disabled={isFieldDisabled} 
                                placeholder="example@mail.com"
                                className="w-full bg-white border border-gray-200 rounded-xl pl-11 pr-4 py-3 text-sm font-bold text-black focus:border-black outline-none transition-all shadow-sm"
                                value={logBookForm.email || ''}
                                onChange={(e) => setLogBookForm({...logBookForm, email: e.target.value})}
                              />
                          </div>
                       </div>

                       {/* Identity & Visitor Card */}
                       <div>
                          <label className="block text-[10px] font-black text-gray-400 uppercase mb-2 tracking-widest">Identity No (KTP / SIM / PASSPORT)</label>
                          <div className="relative">
                              <CreditCard size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />
                              <input 
                                type="text" 
                                disabled={isFieldDisabled} 
                                placeholder="Enter ID number..."
                                className="w-full bg-white border border-gray-200 rounded-xl pl-11 pr-4 py-3 text-sm font-bold text-black focus:border-black outline-none transition-all shadow-sm"
                                value={logBookForm.noIdentitas || ''}
                                onChange={(e) => setLogBookForm({...logBookForm, noIdentitas: e.target.value})}
                              />
                          </div>
                       </div>
                       <div>
                          <label className="block text-[10px] font-black text-gray-400 uppercase mb-2 tracking-widest">Visitor Card Number</label>
                          <div className="relative">
                              <Hash size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />
                              <input 
                                type="text" 
                                disabled={isFieldDisabled} 
                                placeholder="Ex: VC-001"
                                className="w-full bg-white border border-gray-200 rounded-xl pl-11 pr-4 py-3 text-sm font-bold text-black focus:border-black outline-none transition-all shadow-sm"
                                value={logBookForm.visitorCard || ''}
                                onChange={(e) => setLogBookForm({...logBookForm, visitorCard: e.target.value})}
                              />
                          </div>
                       </div>
                    </div>
                  </div>

                  {/* Right Column: Time Tracking & Group Size */}
                  <div className="md:col-span-4 space-y-8">
                    {/* Time Tracking */}
                    <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm space-y-6">
                      <SectionHeader icon={Clock} title="Check-in Log" />
                      <div className="space-y-4">
                        <div>
                           <label className="block text-[10px] font-black text-gray-400 uppercase mb-2 tracking-widest">Date of Visit</label>
                           <input 
                            type="date" 
                            disabled={isFieldDisabled} 
                            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold bg-white focus:border-black outline-none shadow-sm" 
                            value={logBookForm.tanggalKunjungan || ''} 
                            onChange={(e) => setLogBookForm({...logBookForm, tanggalKunjungan: e.target.value})} 
                           />
                        </div>
                        <div>
                           <label className="block text-[10px] font-black text-gray-400 uppercase mb-2 tracking-widest">Arrival Time</label>
                           <input 
                            type="time" 
                            disabled={isFieldDisabled} 
                            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold bg-white focus:border-black outline-none shadow-sm" 
                            value={logBookForm.jamDatang || ''} 
                            onChange={(e) => setLogBookForm({...logBookForm, jamDatang: e.target.value})} 
                           />
                        </div>
                        {/* ADDED TIME OUT FIELD AS REQUESTED */}
                        <div>
                           <label className="block text-[10px] font-black text-gray-400 uppercase mb-2 tracking-widest">Departure Time (Time Out)</label>
                           <input 
                            type="time" 
                            disabled={isFieldDisabled} 
                            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold bg-white focus:border-black outline-none shadow-sm" 
                            value={logBookForm.jamPulang || ''} 
                            onChange={(e) => setLogBookForm({...logBookForm, jamPulang: e.target.value})} 
                           />
                        </div>
                      </div>
                    </div>

                    {/* People Tracking */}
                    <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm space-y-6">
                      <SectionHeader icon={Users} title="Group Size" />
                      <div className="grid grid-cols-3 gap-3">
                        <div className="text-center">
                           <label className="block text-[9px] font-black text-gray-400 uppercase mb-2">Male</label>
                           <input 
                            type="number" 
                            disabled={isFieldDisabled} 
                            className="w-full border-2 border-gray-100 rounded-xl py-2.5 text-center text-md font-black text-black outline-none focus:border-black shadow-inner" 
                            value={logBookForm.lakiLaki || 0} 
                            onChange={(e) => setLogBookForm({...logBookForm, lakiLaki: parseInt(e.target.value) || 0})} 
                           />
                        </div>
                        <div className="text-center">
                           <label className="block text-[9px] font-black text-gray-400 uppercase mb-2">Female</label>
                           <input 
                            type="number" 
                            disabled={isFieldDisabled} 
                            className="w-full border-2 border-gray-100 rounded-xl py-2.5 text-center text-md font-black text-black outline-none focus:border-black shadow-inner" 
                            value={logBookForm.wanita || 0} 
                            onChange={(e) => setLogBookForm({...logBookForm, wanita: parseInt(e.target.value) || 0})} 
                           />
                        </div>
                        <div className="text-center">
                           <label className="block text-[9px] font-black text-gray-400 uppercase mb-2">Kids</label>
                           <input 
                            type="number" 
                            disabled={isFieldDisabled} 
                            className="w-full border-2 border-gray-100 rounded-xl py-2.5 text-center text-md font-black text-black outline-none focus:border-black shadow-inner" 
                            value={logBookForm.anakAnak || 0} 
                            onChange={(e) => setLogBookForm({...logBookForm, anakAnak: parseInt(e.target.value) || 0})} 
                           />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Full Width Purpose Section */}
                  <div className="md:col-span-12 bg-white p-8 rounded-2xl border border-gray-200 shadow-sm space-y-6">
                    <SectionHeader icon={MessageSquare} title="Purpose of Visit" />
                    <textarea 
                      rows={3} 
                      disabled={isFieldDisabled} 
                      placeholder="Input visitor notes, meeting agenda, or host person name here..."
                      className="w-full border border-gray-200 rounded-2xl px-6 py-4 text-sm font-medium bg-white outline-none focus:border-black transition-all placeholder:text-gray-300 shadow-sm"
                      value={logBookForm.note || ''}
                      onChange={(e) => setLogBookForm({...logBookForm, note: e.target.value})}
                    />
                  </div>
               </div>
            </div>
          ) : (
            <div className="bg-white p-20 rounded-2xl border border-gray-100 text-center flex flex-col items-center">
                <Archive size={48} className="text-gray-200 mb-4" />
                <p className="text-gray-400 font-bold uppercase text-[10px] tracking-widest">Other module views</p>
                <p className="text-gray-300 text-xs mt-2 italic uppercase">Content logic for {moduleName} module.</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-8 py-5 bg-white border-t border-gray-100 flex justify-end items-center gap-3 shrink-0">
            <button onClick={onClose} className="px-10 py-3 text-[11px] font-black text-gray-400 bg-white border border-gray-200 rounded-xl uppercase tracking-widest hover:bg-gray-50 hover:text-black transition-all">{isViewMode ? 'Close' : 'Cancel'}</button>
            
            {/* Approval specific buttons for details modal */}
            {isViewMode && isApprovalModule && initialAssetData?.status === 'Pending' && (
              <>
                <button 
                  onClick={handleRejectAction} 
                  className="px-10 py-3 text-[11px] font-black text-white bg-red-500 rounded-xl uppercase tracking-widest shadow-xl shadow-red-500/10 active:scale-95 transition-all hover:bg-red-600 flex items-center gap-2"
                >
                  <XCircle size={16} className="stroke-[3]" /> Reject
                </button>
                <button 
                  onClick={handleApproveAction} 
                  className="px-10 py-3 text-[11px] font-black text-white bg-green-500 rounded-xl uppercase tracking-widest shadow-xl shadow-green-500/10 active:scale-95 transition-all hover:bg-green-600 flex items-center gap-2"
                >
                  <Check size={16} className="stroke-[3]" /> Approve
                </button>
              </>
            )}

            {!isViewMode && (
                <button onClick={handleSave} className="px-12 py-3 text-[11px] font-black text-white bg-black rounded-xl uppercase tracking-widest shadow-xl shadow-black/10 active:scale-95 transition-all hover:bg-gray-900">
                  {isLockerRequest ? 'Submit Request' : isStockOpname ? 'Save Audit Result' : isLogBook ? 'Check-in Guest' : 'Save Data'}
                </button>
            )}
        </div>
      </div>
    </div>
  );
};