import React, { useState, useEffect, useMemo } from 'react';
// Added ChevronDown to lucide-react imports
import { X, Save, Calendar, User, Package, MessageSquare, Plus, Trash2, Send, Layers, ClipboardCheck, Clock, Archive, Settings, History, Lock, Home, LayoutGrid, Baby, Users, Activity, Briefcase, Building2, Key, Hash, ShieldCheck, DollarSign, Landmark, ShoppingCart, AlertCircle, UploadCloud, Check, XCircle, MapPin, Search, Filter, ClipboardList, Info, Smartphone, Mail, CreditCard, Contact, ClipboardEdit, ListFilter, ChevronDown } from 'lucide-react';
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
  const [lockerRequestForm, setLockerRequestForm] = useState<Partial<LockerRequestRecord & { requestType: string; lockerNumber?: string }>>({});
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
                  date: new Date().toISOString().split('T')[0],
                  status: 'Pending',
                  reason: '',
                  preferredLocation: 'Lantai 1',
                  requestType: 'Request Loker Baru',
                  lockerNumber: ''
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
                 isLockerRequest ? (isViewMode ? 'Locker Request Details' : 'Initiate Locker Request') :
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
          {isLockerRequest ? (
             /* --- POLISHED LOCKER REQUEST FORM --- */
             <div className="space-y-8">
               <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                  {/* Requester Profile Card */}
                  <div className="md:col-span-5 bg-white p-8 rounded-2xl border border-gray-200 shadow-sm flex flex-col items-center text-center">
                    <SectionHeader icon={User} title="Employee Profile" />
                    <div className="relative mt-4">
                      <img 
                        src={initialLockerRequestData?.employee.avatar || 'https://i.pravatar.cc/150?u=employee_self'} 
                        className="w-32 h-32 rounded-full border-8 border-gray-50 shadow-xl object-cover" 
                      />
                      <div className="absolute bottom-1 right-1 bg-green-500 w-6 h-6 rounded-full border-4 border-white"></div>
                    </div>
                    <div className="mt-6 space-y-2">
                      <h4 className="text-[18px] font-black text-black uppercase tracking-tight leading-none">
                        {initialLockerRequestData?.employee.name || 'Gian Nanda Pratama'}
                      </h4>
                      <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                        {initialLockerRequestData?.employee.role || 'After Sales Staff'}
                      </p>
                    </div>
                    <div className="w-full mt-10 grid grid-cols-2 gap-4 border-t border-gray-50 pt-8">
                       <div className="text-left">
                          <p className="text-[9px] font-black text-gray-300 uppercase mb-1">Department</p>
                          <p className="text-[12px] font-bold text-black uppercase">After Sales</p>
                       </div>
                       <div className="text-left">
                          <p className="text-[9px] font-black text-gray-300 uppercase mb-1">Employee ID</p>
                          <p className="text-[12px] font-bold text-black uppercase">EMP-2024-081</p>
                       </div>
                    </div>
                  </div>

                  {/* Request Form Section */}
                  <div className="md:col-span-7 space-y-8">
                    <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm space-y-6">
                      <SectionHeader icon={ClipboardEdit} title="Request Specifications" />
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Transaction Date Row */}
                        <div className="md:col-span-2 grid grid-cols-2 gap-6">
                          <div>
                            <label className="block text-[10px] font-black text-gray-400 uppercase mb-2 tracking-widest">Transaction Date</label>
                            <div className="relative">
                              <Calendar size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />
                              <input 
                                type="date" 
                                disabled={isFieldDisabled} 
                                className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-11 pr-4 py-3 text-sm font-bold text-gray-400 outline-none cursor-not-allowed"
                                value={lockerRequestForm.date || ''} 
                                readOnly
                              />
                            </div>
                          </div>
                          <div>
                            <label className="block text-[10px] font-black text-gray-400 uppercase mb-2 tracking-widest">Preferred Floor</label>
                            <div className="relative">
                              <MapPin size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />
                              <select 
                                disabled={isFieldDisabled} 
                                className="w-full bg-white border border-gray-200 rounded-xl pl-11 pr-4 py-3 text-sm font-bold text-black focus:border-black outline-none appearance-none transition-all shadow-sm"
                                value={lockerRequestForm.preferredLocation || ''}
                                onChange={(e) => setLockerRequestForm({...lockerRequestForm, preferredLocation: e.target.value})}
                              >
                                <option value="Lantai 1">Lantai 1</option>
                                <option value="Lantai 2 Satrio">Lantai 2 Satrio</option>
                                <option value="Lantai 3 Satrio">Lantai 3 Satrio</option>
                                <option value="Karang Asem">Karang Asem</option>
                              </select>
                              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                                <X size={12} className="rotate-45 text-gray-300" />
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Request Type Dropdown */}
                        <div className="md:col-span-2">
                          <label className="block text-[10px] font-black text-gray-400 uppercase mb-2 tracking-widest">Request Type</label>
                          <div className="relative">
                            <ListFilter size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />
                            <select 
                              disabled={isFieldDisabled} 
                              className="w-full bg-white border border-gray-200 rounded-xl pl-11 pr-4 py-3 text-sm font-bold text-black focus:border-black outline-none appearance-none transition-all shadow-sm"
                              value={lockerRequestForm.requestType || ''}
                              onChange={(e) => setLockerRequestForm({...lockerRequestForm, requestType: e.target.value})}
                            >
                              <option value="Request Loker Baru">Request Loker Baru</option>
                              <option value="Pindah Loker">Pindah Loker</option>
                              <option value="Pinjam Kunci Loker">Pinjam Kunci Loker</option>
                            </select>
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                                <ChevronDown size={14} className="text-gray-300" />
                            </div>
                          </div>
                        </div>

                        {/* NEW: Nomor Loker Field (Optional) - Placed below Request Type */}
                        <div className="md:col-span-2">
                          <label className="block text-[10px] font-black text-gray-400 uppercase mb-2 tracking-widest">Nomor Loker (Optional)</label>
                          <div className="relative">
                            <Hash size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />
                            <input 
                              type="text" 
                              disabled={isFieldDisabled} 
                              placeholder="Masukkan nomor loker jika sudah ada referensi..."
                              className="w-full bg-white border border-gray-200 rounded-xl pl-11 pr-4 py-3 text-sm font-bold text-black focus:border-black outline-none transition-all shadow-sm"
                              value={lockerRequestForm.lockerNumber || ''}
                              onChange={(e) => setLockerRequestForm({...lockerRequestForm, lockerNumber: e.target.value})}
                            />
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-[10px] font-black text-gray-400 uppercase mb-2 tracking-widest">Reason for Application</label>
                        <textarea 
                          rows={4} 
                          disabled={isFieldDisabled} 
                          placeholder="Please provide justification for your locker request (e.g., need space for safety tools, replacement for broken unit, etc.)"
                          className="w-full bg-white border border-gray-200 rounded-2xl px-6 py-4 text-sm font-medium text-black focus:border-black outline-none transition-all placeholder:text-gray-300 shadow-sm"
                          value={lockerRequestForm.reason || ''}
                          onChange={(e) => setLockerRequestForm({...lockerRequestForm, reason: e.target.value})}
                        />
                      </div>
                    </div>

                    <div className="flex items-start gap-4 p-5 bg-blue-50 rounded-2xl border border-blue-100">
                      <Info size={18} className="text-blue-500 shrink-0 mt-0.5" />
                      <p className="text-[10px] font-bold text-blue-700 uppercase leading-relaxed tracking-tight">
                        Locker assignments are subject to availability and facility manager approval. You will receive a notification once your request has been reviewed.
                      </p>
                    </div>
                  </div>
               </div>
             </div>
          ) : isLogBook ? (
            /* --- LOG BOOK FORM --- */
            <div className="space-y-8">
               <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                  <div className="md:col-span-8 bg-white p-8 rounded-2xl border border-gray-200 shadow-sm space-y-6">
                    <SectionHeader icon={Contact} title="Guest Profile & Visit Details" />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

                  <div className="md:col-span-4 space-y-8">
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
          ) : isStationeryRequest ? (
            /* STATIONERY REQUEST FORM */
            <div className="space-y-8">
               <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                 {/* APPLICATION INFO */}
                 <div className="md:col-span-7 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-6">
                    <SectionHeader icon={Send} title="Application Info" />
                    <div className="grid grid-cols-2 gap-6">
                        <div>
                           <label className="block text-[10px] font-black text-gray-400 uppercase mb-2 tracking-widest">Request Date</label>
                           <div className="relative">
                               <input type="date" disabled={isFieldDisabled} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold bg-white focus:border-black outline-none shadow-sm" value={stationeryRequestForm.date || ''} onChange={(e) => handleStationeryRequestChange('date', e.target.value)} />
                           </div>
                        </div>
                        <div>
                           <label className="block text-[10px] font-black text-gray-400 uppercase mb-2 tracking-widest">Request Type</label>
                           <div className="relative">
                               <select disabled={isFieldDisabled} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold bg-white focus:border-black outline-none shadow-sm appearance-none" value={stationeryRequestForm.type || 'DAILY REQUEST'} onChange={(e) => handleStationeryRequestChange('type', e.target.value)}>
                                  <option value="DAILY REQUEST">Daily Request</option>
                                  <option value="EVENT REQUEST">Request Khusus (Event)</option>
                               </select>
                           </div>
                        </div>
                    </div>
                    <div>
                        <label className="block text-[10px] font-black text-gray-400 uppercase mb-2 tracking-widest">Delivery Method</label>
                        <div className="flex gap-2">
                           {['PICKUP HO', 'DELIVERY'].map(m => (
                               <button key={m} disabled={isFieldDisabled} onClick={() => handleStationeryRequestChange('deliveryType', m)} className={`flex-1 py-3 text-[10px] font-black rounded-xl border transition-all uppercase tracking-widest ${stationeryRequestForm.deliveryType === m ? 'bg-black text-white' : 'bg-white text-gray-400 border-gray-200 hover:border-black'}`}>
                                   {m}
                               </button>
                           ))}
                        </div>
                    </div>
                 </div>

                 {/* REQUESTER INFO */}
                 <div className="md:col-span-5 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-6">
                   <SectionHeader icon={User} title="Requester Info" />
                   <div className="flex items-center gap-4 p-5 bg-gray-50/50 rounded-xl border border-gray-100">
                       <img src={initialAssetData?.employee.avatar || 'https://i.pravatar.cc/150?u=current_user'} className="w-14 h-14 rounded-full border-2 border-white shadow-sm" />
                       <div>
                           <div className="text-[14px] font-black text-black uppercase tracking-tight">{initialAssetData?.employee.name || 'Current User'}</div>
                           <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{initialAssetData?.employee.role || 'Staff'}</div>
                       </div>
                   </div>
                 </div>
               </div>

               {/* REQUESTED ITEMS */}
               <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                 <SectionHeader icon={Package} title="Requested Items" />
                 <div className="overflow-hidden border border-gray-100 rounded-xl">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50/80 border-b border-gray-100">
                            <tr>
                                <th className="p-4 text-[10px] font-black text-gray-400 uppercase tracking-widest pl-6">Kategori</th>
                                <th className="p-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Item Name</th>
                                <th className="p-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Item Code</th>
                                <th className="p-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">In Stock</th>
                                <th className="p-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Qty</th>
                                <th className="p-4 text-[10px] font-black text-gray-400 uppercase tracking-widest pl-10">UOM</th>
                                {!isViewMode && <th className="p-4 w-16 pr-6"></th>}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {requestItems.map((item, idx) => {
                                const masterList = isArkModule ? MOCK_MASTER_ARK_DATA : MOCK_MASTER_DATA;
                                const catList = isArkModule ? MOCK_ARK_CATEGORY : MOCK_ATK_CATEGORY;
                                const filteredMasterList = item.categoryId 
                                    ? masterList.filter(m => m.category === item.categoryId)
                                    : masterList;
                                
                                const selectedItemFull = masterList.find(m => m.id.toString() === item.itemId);

                                return (
                                    <tr key={idx} className="hover:bg-gray-50/30 transition-colors">
                                        <td className="p-4 pl-6">
                                            <select 
                                                disabled={isFieldDisabled} 
                                                className="w-full bg-transparent border-0 font-bold text-[13px] text-black focus:ring-0 appearance-none outline-none" 
                                                value={item.categoryId} 
                                                onChange={(e) => handleRequestItemChange(idx, 'categoryId', e.target.value)}
                                            >
                                                <option value="">Select Category</option>
                                                {catList.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                                            </select>
                                        </td>
                                        <td className="p-4">
                                            <select 
                                                disabled={isFieldDisabled || !item.categoryId} 
                                                className={`w-full bg-transparent border-0 font-bold text-[13px] focus:ring-0 appearance-none outline-none ${!item.categoryId ? 'text-gray-300' : 'text-black'}`}
                                                value={item.itemId} 
                                                onChange={(e) => handleRequestItemChange(idx, 'itemId', e.target.value)}
                                            >
                                                <option value="">{item.categoryId ? 'Select Item' : 'Select category first'}</option>
                                                {filteredMasterList.map(m => <option key={m.id} value={m.id}>{m.itemName}</option>)}
                                            </select>
                                        </td>
                                        <td className="p-4">
                                            <span className={`text-[12px] font-mono font-bold ${selectedItemFull ? 'text-blue-600' : 'text-gray-300'}`}>
                                                {selectedItemFull?.itemCode || '-'}
                                            </span>
                                        </td>
                                        <td className="p-4 text-center">
                                            <span className={`text-[13px] font-black ${selectedItemFull ? (selectedItemFull.remainingStock > 5 ? 'text-green-600' : 'text-red-500') : 'text-gray-300'}`}>
                                                {selectedItemFull ? selectedItemFull.remainingStock : '-'}
                                            </span>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex justify-center">
                                                <input type="number" disabled={isFieldDisabled} className="w-16 h-10 border border-gray-200 rounded-lg text-center font-black text-sm outline-none focus:border-black shadow-sm" value={item.qty} onChange={(e) => handleRequestItemChange(idx, 'qty', e.target.value)} />
                                            </div>
                                        </td>
                                        <td className="p-4 pl-10 text-[11px] font-black text-gray-400 uppercase">{item.uom || '-'}</td>
                                        {!isViewMode && (
                                            <td className="p-4 pr-6 text-right">
                                                <button onClick={() => setRequestItems(requestItems.filter((_, i) => i !== idx))} className="text-red-200 hover:text-red-500 transition-colors p-2 hover:bg-red-50 rounded-lg"><Trash2 size={16} /></button>
                                            </td>
                                        )}
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                 </div>
                 {!isViewMode && (
                     <button onClick={() => setRequestItems([...requestItems, { itemId: '', qty: '', categoryId: '', uom: '' }])} className="mt-6 text-[10px] font-black text-blue-600 uppercase tracking-[0.2em] flex items-center gap-2 hover:underline">
                        <Plus size={14} className="stroke-[3]" /> ADD MORE ITEM
                     </button>
                 )}
               </div>

               {/* REMARKS */}
               <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                 <SectionHeader icon={MessageSquare} title="Keterangan / Remarks" />
                 <textarea rows={3} disabled={isFieldDisabled} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium bg-white outline-none focus:border-black transition-all placeholder:text-gray-300" value={stationeryRequestForm.remarks || ''} onChange={(e) => handleStationeryRequestChange('remarks', e.target.value)} placeholder="Tulis catatan tambahan di sini..." />
               </div>
            </div>
          ) : isStockOpname ? (
            /* STOCK OPNAME FORM */
            <div className="space-y-8">
               <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                 <div className="md:col-span-8 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-6">
                    <SectionHeader icon={ClipboardCheck} title="Opname Session Details" />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                           <label className="block text-[10px] font-black text-gray-400 uppercase mb-2 tracking-widest">Opname Number</label>
                           <input type="text" readOnly className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-[12px] font-mono font-black text-blue-600 outline-none" value={stockOpnameForm.opnameNumber || ''} />
                        </div>
                        <div>
                           <label className="block text-[10px] font-black text-gray-400 uppercase mb-2 tracking-widest">Performed By</label>
                           <div className="relative">
                               <User size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />
                               <input type="text" readOnly className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-11 pr-4 py-3 text-sm font-bold text-black" value={stockOpnameForm.performedBy || 'Current User'} />
                           </div>
                        </div>
                        <div>
                           <label className="block text-[10px] font-black text-gray-400 uppercase mb-2 tracking-widest">Execution Date</label>
                           <div className="relative">
                               <Calendar size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />
                               <input type="date" disabled={isFieldDisabled} className="w-full bg-white border border-gray-200 rounded-xl pl-11 pr-4 py-3 text-sm font-bold text-black focus:border-black outline-none" value={stockOpnameForm.date || ''} onChange={(e) => setStockOpnameForm({...stockOpnameForm, date: e.target.value})} />
                           </div>
                        </div>
                    </div>
                 </div>

                 <div className="md:col-span-4 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-6">
                   <SectionHeader icon={Layers} title="Category Focus" />
                   <div className="flex gap-2 h-fit">
                      {(['ATK', 'ARK'] as const).map(cat => (
                        <button 
                          key={cat} 
                          disabled={isFieldDisabled}
                          onClick={() => setSoCategory(cat)}
                          className={`flex-1 py-4 text-[12px] font-black rounded-xl border transition-all uppercase tracking-[0.2em] ${soCategory === cat ? 'bg-black text-white border-black shadow-lg shadow-black/10' : 'bg-white text-gray-400 border-gray-200 hover:border-black hover:text-black'}`}
                        >
                          {cat} Catalog
                        </button>
                      ))}
                   </div>
                 </div>
               </div>

               <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
                 <div className="flex items-center justify-between mb-8">
                    <SectionHeader icon={ClipboardList} title="Verify Physical Stock Level" />
                    <div className="relative">
                        <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />
                        <input type="text" placeholder="Filter items..." className="pl-11 pr-4 py-2 bg-gray-50 border border-gray-100 rounded-lg text-[11px] font-bold uppercase tracking-widest outline-none focus:border-black transition-all" />
                    </div>
                 </div>

                 <div className="overflow-hidden border border-gray-100 rounded-2xl">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 border-b border-gray-100">
                            <tr>
                                <th className="p-5 text-[10px] font-black text-gray-400 uppercase tracking-widest pl-8 w-16">#</th>
                                <th className="p-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Part Code</th>
                                <th className="p-5 text-[10px] font-black text-gray-400 uppercase tracking-widest w-1/3">Item Name</th>
                                <th className="p-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">System Qty</th>
                                <th className="p-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Physical Count</th>
                                <th className="p-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center pr-8">Difference</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {soItems.map((item, idx) => (
                                <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                                    <td className="p-5 pl-8 text-gray-300 font-bold text-[11px]">{idx + 1}</td>
                                    <td className="p-5">
                                        <span className="font-mono text-[11px] font-black text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                                            {item.itemCode}
                                        </span>
                                    </td>
                                    <td className="p-5">
                                        <div className="font-black text-black text-[13px] uppercase tracking-tight">{item.itemName}</div>
                                        <div className="text-[9px] text-gray-400 font-bold uppercase tracking-widest mt-1">{item.category}</div>
                                    </td>
                                    <td className="p-5 text-center">
                                        <span className="font-mono text-[15px] font-black text-gray-400">{item.systemQty}</span>
                                    </td>
                                    <td className="p-5">
                                        <div className="flex justify-center">
                                            <input 
                                              type="number" 
                                              disabled={isFieldDisabled}
                                              className="w-20 h-11 border-2 border-gray-100 rounded-xl text-center font-black text-[15px] outline-none focus:border-black transition-all bg-gray-50/30"
                                              value={item.physicalQty}
                                              onChange={(e) => handleSoPhysicalQtyChange(idx, e.target.value)}
                                            />
                                        </div>
                                    </td>
                                    <td className="p-5 text-center pr-8">
                                        <div className={`text-[16px] font-black ${item.difference === 0 ? 'text-green-500' : 'text-red-500'}`}>
                                            {item.difference > 0 ? `+${item.difference}` : item.difference}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                 </div>
                 
                 <div className="mt-8 p-5 bg-gray-50 rounded-2xl border border-gray-100 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-white rounded-lg border border-gray-100 shadow-sm">
                            <Info size={16} className="text-blue-500" />
                        </div>
                        <p className="text-[11px] font-bold text-gray-500 uppercase tracking-tight">
                            Difference reflects the gap between system ledger and manual count.
                        </p>
                    </div>
                    <div className="flex items-center gap-8">
                        <div className="text-center">
                            <p className="text-[9px] font-black text-gray-300 uppercase mb-1">Items Scanned</p>
                            <p className="text-[16px] font-black text-black">{soItems.length}</p>
                        </div>
                        <div className="text-center">
                            <p className="text-[9px] font-black text-gray-300 uppercase mb-1">Discrepancies</p>
                            <p className="text-[16px] font-black text-red-500">{soItems.filter(i => i.difference !== 0).length}</p>
                        </div>
                    </div>
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
