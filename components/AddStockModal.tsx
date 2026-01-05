
import React, { useState, useEffect, useMemo } from 'react';
import { X, Save, List, Calendar, CheckCircle, CheckCircle2, XCircle, FileText, Archive, ChevronLeft, Printer, History, User, Package, MapPin, Users, MessageSquare, Check, RotateCcw, AlertTriangle, Hash, Activity, Search, Lock, Briefcase, Building2, Key, Home, Box, Send, LayoutGrid, ChevronDown, Layers, ClipboardCheck, Clock, Baby, Trash2, UploadCloud, Plus } from 'lucide-react';
import { VehicleRecord, ServiceRecord, MutationRecord, SalesRecord, ContractRecord, GeneralMasterItem, MasterVendorRecord, StationeryRequestRecord, StationeryRequestItem, DeliveryLocationRecord, AssetRecord, LogBookRecord, TaxKirRecord, StockOpnameRecord, LockerRecord, ModenaPodRecord, LockerRequestRecord, PodRequestRecord, PodHistory, LockerHistoryEntry } from '../types';
import { useLanguage } from '../contexts/LanguageContext';
import { MOCK_MASTER_DATA, MOCK_MASTER_ARK_DATA, MOCK_ATK_CATEGORY, MOCK_ARK_CATEGORY, MOCK_UOM_DATA, MOCK_DELIVERY_LOCATIONS, MOCK_POD_DATA } from '../constants';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  moduleName?: string;
  onSaveVehicle?: (vehicle: Partial<VehicleRecord>) => void;
  onSaveService?: (service: Partial<ServiceRecord>) => void;
  onSaveTaxKir?: (tax: Partial<TaxKirRecord>) => void;
  onSaveMutation?: (mutation: Partial<MutationRecord>) => void;
  onSaveSales?: (sales: Partial<SalesRecord>) => void;
  onSaveContract?: (contract: Partial<ContractRecord>) => void;
  onSaveMaster?: (master: Partial<GeneralMasterItem>) => void;
  onSaveMasterVendor?: (masterVendor: Partial<MasterVendorRecord>) => void;
  onSaveStationeryRequest?: (request: Partial<StationeryRequestRecord>) => void;
  onSaveDeliveryLocation?: (location: Partial<DeliveryLocationRecord>) => void;
  onSaveLogBook?: (logbook: Partial<LogBookRecord>) => void;
  onSaveStockOpname?: (opname: Partial<StockOpnameRecord>) => void;
  onSaveLocker?: (locker: Partial<LockerRecord>) => void;
  onSaveLockerRequest?: (request: Partial<LockerRequestRecord>) => void;
  onSavePodRequest?: (request: Partial<PodRequestRecord>) => void;
  onSavePod?: (pod: Partial<ModenaPodRecord>) => void;
  onRevise?: () => void;
  onApprove?: () => void;
  onReject?: () => void;
  
  initialVehicleData?: VehicleRecord;
  initialServiceData?: ServiceRecord;
  initialTaxKirData?: TaxKirRecord;
  initialMutationData?: MutationRecord;
  initialSalesData?: SalesRecord;
  initialContractData?: ContractRecord;
  initialMasterData?: GeneralMasterItem;
  initialMasterVendorData?: MasterVendorRecord;
  initialDeliveryLocationData?: DeliveryLocationRecord;
  initialAssetData?: AssetRecord;
  initialLogBookData?: LogBookRecord;
  initialStockOpnameData?: StockOpnameRecord;
  initialLockerData?: LockerRecord;
  initialLockerRequestData?: LockerRequestRecord;
  initialPodRequestData?: PodRequestRecord;
  initialPodData?: ModenaPodRecord;
  
  mode?: 'create' | 'edit' | 'view';
  vehicleList?: VehicleRecord[];
  masterData?: Record<string, GeneralMasterItem[]>;
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
    onApprove,
    onReject,
    initialAssetData,
    initialLogBookData,
    initialStockOpnameData,
    initialLockerData,
    initialLockerRequestData,
    initialPodData,
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
  const [stationeryRequestForm, setStationeryRequestForm] = useState<Partial<StationeryRequestRecord>>({});
  const [requestItems, setRequestItems] = useState<StationeryRequestItem[]>([{ itemId: '', qty: '', categoryId: '', uom: '' }]);
  
  const isArkModule = moduleName.includes('ARK') || moduleName.includes('Household');
  const isStationeryRequest = moduleName.includes('ATK') || moduleName.includes('ARK') || moduleName.includes('Stationery') || moduleName.includes('Household');
  const isLogBook = moduleName === 'Log Book';
  const isStockOpname = moduleName.includes('Stock Opname');
  const isLocker = moduleName === 'Daftar Loker';
  const isLockerRequest = moduleName === 'Request Locker';
  const isPod = moduleName === 'Pod Census';
  const isPodRequest = moduleName === 'Request MODENA Pod';
  const isViewMode = mode === 'view';
  const isFieldDisabled = isViewMode;
  const isApprovalModule = moduleName.includes('Approval');

  useEffect(() => {
    if (isOpen) {
        if (mode === 'edit' || mode === 'view') {
           if (initialLogBookData) setLogBookForm(initialLogBookData);
           if (initialStockOpnameData) setStockOpnameForm(initialStockOpnameData);
           if (initialLockerData) setLockerForm(initialLockerData);
           if (initialLockerRequestData) setLockerRequestForm(initialLockerRequestData);
           if (initialPodRequestData) setPodRequestForm(initialPodRequestData);
           if (initialPodData) setPodForm(initialPodData);
           
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
            if (isStockOpname) setStockOpnameForm({ opnameNumber: 'SO-NEW', date: new Date().toISOString().split('T')[0], status: 'Draft' });
            if (isPod) setPodForm({ lantai: 'Lt 2 Pria', jenisKamar: 'Single Bed', statusLokerBarang: 'Tidak Terpakai', statusLokerPantry: 'Tidak Terpakai', jadwalLaundry: 'Tidak ada', isExpat: false });
            if (isStationeryRequest) {
                setStationeryRequestForm({ type: 'DAILY REQUEST', deliveryType: 'PICKUP HO', location: 'Satrio', date: new Date().toISOString().split('T')[0] });
                setRequestItems([{ itemId: '', qty: '', categoryId: '', uom: '' }]);
            }
        }
    }
  }, [isOpen, initialAssetData, initialLogBookData, initialStockOpnameData, initialLockerData, initialLockerRequestData, initialPodData, initialPodRequestData, mode, isArkModule, isStationeryRequest, isStockOpname, isPod]);

  const handleSave = () => {
      if (isStationeryRequest && onSaveStationeryRequest) onSaveStationeryRequest({ ...stationeryRequestForm, items: requestItems });
      if (isLogBook && onSaveLogBook) onSaveLogBook(logBookForm);
      if (isStockOpname && onSaveStockOpname) onSaveStockOpname(stockOpnameForm);
      if (isLocker && onSaveLocker) onSaveLocker(lockerForm);
      if (isLockerRequest && onSaveLockerRequest) onSaveLockerRequest(lockerRequestForm);
      if (isPodRequest && onSavePodRequest) onSavePodRequest(podRequestForm);
      if (isPod && onSavePod) onSavePod(podForm);
      onClose();
  };

  const handleStationeryRequestChange = (field: keyof StationeryRequestRecord, value: any) => {
    setStationeryRequestForm(prev => ({ ...prev, [field]: value }));
  };

  const handleRequestItemChange = (index: number, field: keyof StationeryRequestItem, value: string) => {
      const newItems = [...requestItems];
      if (field === 'itemId') {
          const masterList = isArkModule ? MOCK_MASTER_ARK_DATA : MOCK_MASTER_DATA;
          const selected = masterList.find(m => m.id.toString() === value);
          newItems[index] = { ...newItems[index], itemId: value, uom: selected?.uom || '', categoryId: selected?.category || '' };
      } else {
          newItems[index] = { ...newItems[index], [field]: value };
      }
      setRequestItems(newItems);
  };

  // Find pod history based on typed room number
  const roomHistory = useMemo(() => {
    if (!isPod || !podForm.nomorKamar) return [];
    // Try to find historical records for this room number from constants
    const matchedRecord = MOCK_POD_DATA.find(p => p.nomorKamar === podForm.nomorKamar);
    return matchedRecord?.history || [];
  }, [isPod, podForm.nomorKamar]);

  const SectionHeader = ({ icon: Icon, title }: { icon: any, title: string }) => (
    <div className="flex items-center gap-3 mb-6 pb-2 border-b border-gray-100">
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
                 isLocker ? (isViewMode ? 'Locker Management Details' : 'Register Locker') : moduleName}
              </h2>
              {isViewMode && (initialAssetData?.transactionNumber || initialLockerData?.lockerNumber) && (
                <span className="text-[10px] font-black text-gray-400 tracking-widest uppercase mt-1 block">ID: {initialAssetData?.transactionNumber || initialLockerData?.lockerNumber}</span>
              )}
          </div>
          <button className="text-gray-300 hover:text-red-500 transition-colors p-1" onClick={onClose}>
            <X size={24} />
          </button>
        </div>
        
        {/* Body */}
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          {isStationeryRequest ? (
            <div className="space-y-8">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-6">
                    <SectionHeader icon={Send} title="Application Info" />
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                           <label className="block text-[10px] font-black text-gray-400 uppercase mb-2">Request Date</label>
                           <input type="date" disabled={isFieldDisabled} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold bg-white focus:border-black outline-none shadow-sm" value={stationeryRequestForm.date || ''} onChange={(e) => handleStationeryRequestChange('date', e.target.value)} />
                        </div>
                        <div>
                           <label className="block text-[10px] font-black text-gray-400 uppercase mb-2">Request Type</label>
                           <select disabled={isFieldDisabled} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold bg-white focus:border-black outline-none shadow-sm appearance-none" value={stationeryRequestForm.type || ''} onChange={(e) => handleStationeryRequestChange('type', e.target.value)}>
                              <option value="DAILY REQUEST">Daily Request</option>
                              <option value="MONTHLY REQUEST">Monthly Request</option>
                           </select>
                        </div>
                    </div>
                    <div>
                        <label className="block text-[10px] font-black text-gray-400 uppercase mb-2">Delivery Method</label>
                        <div className="flex gap-2">
                           {['PICKUP HO', 'DELIVERY'].map(m => (
                               <button key={m} disabled={isFieldDisabled} onClick={() => handleStationeryRequestChange('deliveryType', m)} className={`flex-1 py-3 text-[10px] font-black rounded-xl border transition-all uppercase tracking-widest ${stationeryRequestForm.deliveryType === m ? 'bg-black text-white' : 'bg-white text-gray-400 border-gray-200 hover:border-black'}`}>
                                   {m}
                               </button>
                           ))}
                        </div>
                    </div>
                 </div>

                 <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-6">
                   <SectionHeader icon={User} title="Requester Info" />
                   <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100">
                       <img src={initialAssetData?.employee.avatar || 'https://i.pravatar.cc/150'} className="w-12 h-12 rounded-full border border-white shadow-sm" />
                       <div>
                           <div className="text-[14px] font-black text-black uppercase">{initialAssetData?.employee.name || 'Current User'}</div>
                           <div className="text-[10px] font-bold text-gray-400 uppercase">{initialAssetData?.employee.role || 'Staff'}</div>
                       </div>
                   </div>
                   {isViewMode && (
                     <div className="mt-4">
                       <label className="block text-[10px] font-black text-gray-400 uppercase mb-2">Application Status</label>
                       <span className={`inline-block px-3 py-1 text-white text-[10px] font-black rounded uppercase ${initialAssetData?.status === 'Approved' ? 'bg-green-50 text-green-500' : 'bg-orange-500'}`}>
                        {initialAssetData?.status}
                       </span>
                     </div>
                   )}
                 </div>
               </div>

               <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                 <SectionHeader icon={Package} title="Requested Items" />
                 <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th className="p-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Item Name</th>
                            <th className="p-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Qty</th>
                            <th className="p-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">UOM</th>
                            {!isViewMode && <th className="p-4 w-16"></th>}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {requestItems.map((item, idx) => (
                            <tr key={idx}>
                                <td className="p-4">
                                    <select disabled={isFieldDisabled} className="w-full bg-transparent border-0 font-bold text-sm focus:ring-0 appearance-none" value={item.itemId} onChange={(e) => handleRequestItemChange(idx, 'itemId', e.target.value)}>
                                        <option value="">Select Item</option>
                                        {(isArkModule ? MOCK_MASTER_ARK_DATA : MOCK_MASTER_DATA).map(m => <option key={m.id} value={m.id}>{m.itemName}</option>)}
                                    </select>
                                </td>
                                <td className="p-4">
                                    <input type="number" disabled={isFieldDisabled} className="w-20 mx-auto text-center border border-gray-200 rounded-lg p-2 font-black outline-none focus:border-black" value={item.qty} onChange={(e) => handleRequestItemChange(idx, 'qty', e.target.value)} />
                                </td>
                                <td className="p-4 text-xs font-black text-gray-400 uppercase">{item.uom || '-'}</td>
                                {!isViewMode && (
                                    <td className="p-4 text-center">
                                        <button onClick={() => setRequestItems(requestItems.filter((_, i) => i !== idx))} className="text-red-300 hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                 </table>
                 {!isViewMode && (
                     <button onClick={() => setRequestItems([...requestItems, { itemId: '', qty: '', categoryId: '', uom: '' }])} className="mt-4 text-[10px] font-black text-blue-600 uppercase tracking-widest flex items-center gap-2 hover:underline">
                        <Plus size={14} /> Add More Item
                     </button>
                 )}
               </div>

               <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                 <SectionHeader icon={MessageSquare} title="Keterangan / Remarks" />
                 <textarea rows={3} disabled={isFieldDisabled} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium bg-white outline-none focus:border-black transition-all" value={stationeryRequestForm.remarks || ''} onChange={(e) => handleStationeryRequestChange('remarks', e.target.value)} placeholder="Tulis catatan tambahan di sini..." />
               </div>
            </div>
          ) : isPod ? (
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-6">
                  <SectionHeader icon={Home} title="Room Assignment" />
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-black text-gray-400 uppercase mb-2">Lantai</label>
                        <select disabled={isFieldDisabled} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold bg-white appearance-none outline-none focus:border-black shadow-sm" value={podForm.lantai || ''} onChange={(e) => setPodForm({...podForm, lantai: e.target.value})}>
                          <option value="Lt 2 Pria">Lt 2 Pria</option><option value="Lt 2 Perempuan">Lt 2 Perempuan</option><option value="Lt 3 Pria">Lt 3 Pria</option><option value="Lt 3 Perempuan">Lt 3 Perempuan</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-[10px] font-black text-gray-400 uppercase mb-2">Jenis Kamar</label>
                        <select disabled={isFieldDisabled} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold bg-white appearance-none outline-none focus:border-black shadow-sm" value={podForm.jenisKamar || ''} onChange={(e) => setPodForm({...podForm, jenisKamar: e.target.value as any})}>
                          <option value="Single Bed">Single Bed</option><option value="Double Bed">Double Bed</option><option value="Quadruple Bed">Quadruple Bed</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-gray-400 uppercase mb-2">Nomor Kamar</label>
                      <input type="text" disabled={isFieldDisabled} placeholder="e.g. 217 A" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-mono font-bold text-black outline-none focus:border-black shadow-sm transition-all" value={podForm.nomorKamar || ''} onChange={(e) => setPodForm({...podForm, nomorKamar: e.target.value})} />
                    </div>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-[10px] font-black text-gray-400 uppercase mb-2">Nama Penghuni</label>
                        <input type="text" disabled={isFieldDisabled} placeholder="Masukkan nama lengkap..." className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold text-black outline-none focus:border-black shadow-sm transition-all" value={podForm.namaPenghuni || ''} onChange={(e) => setPodForm({...podForm, namaPenghuni: e.target.value})} />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="block text-[10px] font-black text-gray-400 uppercase mb-1 tracking-widest">Expat Status</label>
                        <div className="flex gap-2">
                          <button 
                            disabled={isFieldDisabled}
                            onClick={() => setPodForm({...podForm, isExpat: true})}
                            className={`flex-1 py-2 text-[10px] font-black rounded-lg border transition-all uppercase tracking-widest ${podForm.isExpat ? 'bg-black text-white' : 'bg-white text-gray-400 border-gray-200 hover:border-black'}`}
                          >
                            Expat
                          </button>
                          <button 
                            disabled={isFieldDisabled}
                            onClick={() => setPodForm({...podForm, isExpat: false})}
                            className={`flex-1 py-2 text-[10px] font-black rounded-lg border transition-all uppercase tracking-widest ${!podForm.isExpat ? 'bg-black text-white' : 'bg-white text-gray-400 border-gray-200 hover:border-black'}`}
                          >
                            Not Expat
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-6">
                  <SectionHeader icon={Lock} title="Facilities Status" />
                  <div className="space-y-4">
                    <div>
                      <label className="block text-[10px] font-black text-gray-400 uppercase mb-2">Status Loker Barang</label>
                      <select disabled={isFieldDisabled} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold bg-white appearance-none outline-none focus:border-black shadow-sm" value={podForm.statusLokerBarang || ''} onChange={(e) => setPodForm({...podForm, statusLokerBarang: e.target.value as any})}>
                        <option value="Terpakai">Terpakai</option><option value="Tidak Terpakai">Tidak Terpakai</option><option value="Belum Dapat">Belum Dapat</option><option value="Extra Loker Terpakai">Extra Loker Terpakai</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-gray-400 uppercase mb-2">Status Loker Pantry</label>
                      <select disabled={isFieldDisabled} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold bg-white appearance-none outline-none focus:border-black shadow-sm" value={podForm.statusLokerPantry || ''} onChange={(e) => setPodForm({...podForm, statusLokerPantry: e.target.value as any})}>
                        <option value="Terpakai">Terpakai</option><option value="Tidak Terpakai">Tidak Terpakai</option><option value="Belum Dapat">Belum Dapat</option><option value="Extra Loker Terpakai">Extra Loker Terpakai</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-gray-400 uppercase mb-2">Jadwal Laundry</label>
                      <input type="text" disabled={isFieldDisabled} placeholder="Tidak ada" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold text-black outline-none focus:border-black shadow-sm transition-all" value={podForm.jadwalLaundry || ''} onChange={(e) => setPodForm({...podForm, jadwalLaundry: e.target.value})} />
                    </div>
                  </div>
                </div>
              </div>

              {/* DYNAMIC ROOM HISTORY TABLE */}
              {podForm.nomorKamar && (
                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden animate-in fade-in slide-in-from-top-4 duration-500">
                  <div className="px-6 py-4 bg-gray-50 border-b border-gray-100 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <History size={16} className="text-blue-500" />
                      <h3 className="text-[11px] font-black text-black uppercase tracking-widest">History Kamar - {podForm.nomorKamar}</h3>
                    </div>
                    <span className="text-[9px] font-black text-gray-400 uppercase tracking-tighter bg-white px-2 py-1 rounded border border-gray-100">{roomHistory.length} Previous Occupants</span>
                  </div>
                  <div className="overflow-x-auto custom-scrollbar">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="bg-white border-b border-gray-100">
                          <th className="p-4 text-[9px] font-black text-gray-400 uppercase tracking-widest pl-8">Nama Penghuni</th>
                          <th className="p-4 text-[9px] font-black text-gray-400 uppercase tracking-widest">Posisi / Departemen</th>
                          <th className="p-4 text-[9px] font-black text-gray-400 uppercase tracking-widest text-center">No Kamar</th>
                          <th className="p-4 text-[9px] font-black text-gray-400 uppercase tracking-widest text-center">Loker Barang</th>
                          <th className="p-4 text-[9px] font-black text-gray-400 uppercase tracking-widest text-center">Loker Pantry</th>
                          <th className="p-4 text-[9px] font-black text-gray-400 uppercase tracking-widest">Jadwal Laundry</th>
                          <th className="p-4 text-[9px] font-black text-gray-400 uppercase tracking-widest">Periode</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50">
                        {roomHistory.length > 0 ? roomHistory.map((h) => (
                           <tr key={h.id} className="hover:bg-gray-50/50 transition-colors">
                             <td className="p-4 pl-8">
                               <div className="text-[12px] font-black text-black uppercase">{h.namaPenghuni}</div>
                               <span className={`text-[8px] font-black uppercase tracking-widest ${h.isExpat ? 'text-blue-500' : 'text-gray-400'}`}>
                                 {h.isExpat ? 'Expatriate' : 'Non-Expat'}
                               </span>
                             </td>
                             <td className="p-4">
                               <div className="flex flex-col">
                                 <span className="text-[11px] font-black text-black uppercase">{h.posisi || '-'}</span>
                                 <span className="text-[9px] text-gray-400 font-bold uppercase tracking-tight">{h.departemen || '-'}</span>
                               </div>
                             </td>
                             <td className="p-4 text-center">
                               <span className="font-mono text-[11px] font-bold text-gray-400">{h.nomorKamar}</span>
                             </td>
                             <td className="p-4 text-center">
                               <span className={`inline-block px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-tighter border ${h.statusLokerBarang === 'Terpakai' ? 'bg-green-50 text-green-600 border-green-200' : 'bg-red-50 text-red-600 border-red-200'}`}>
                                 {h.statusLokerBarang}
                               </span>
                             </td>
                             <td className="p-4 text-center">
                               <span className={`inline-block px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-tighter border ${h.statusLokerPantry === 'Terpakai' ? 'bg-green-50 text-green-600 border-green-200' : 'bg-red-50 text-red-600 border-red-200'}`}>
                                 {h.statusLokerPantry}
                               </span>
                             </td>
                             <td className="p-4">
                               <span className="text-[11px] font-bold text-gray-500 uppercase">{h.jadwalLaundry}</span>
                             </td>
                             <td className="p-4">
                               <div className="flex flex-col">
                                  <span className="text-[10px] font-black text-gray-300 uppercase tracking-tighter">Stay Period:</span>
                                  <span className="text-[11px] font-black text-blue-600">{h.startDate} - {h.endDate}</span>
                               </div>
                             </td>
                           </tr>
                        )) : (
                          <tr>
                            <td colSpan={7} className="p-12 text-center">
                              <div className="flex flex-col items-center justify-center opacity-20">
                                <Activity size={32} className="text-gray-400 mb-2" />
                                <p className="text-[10px] font-black uppercase tracking-widest italic text-gray-500">No previous history for this room ID</p>
                              </div>
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                <SectionHeader icon={MessageSquare} title="Keterangan" />
                <textarea rows={2} disabled={isFieldDisabled} placeholder="Catatan tambahan..." className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium bg-white outline-none focus:border-black shadow-sm transition-all" value={podForm.keterangan || ''} onChange={(e) => setPodForm({...podForm, keterangan: e.target.value})} />
              </div>
            </div>
          ) : isLocker ? (
            /* LOCKER FORM */
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-6">
                  <SectionHeader icon={Lock} title="Locker Identification" />
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-black text-gray-400 uppercase mb-2">Locker No</label>
                      <input type="text" disabled={isFieldDisabled} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-mono font-bold text-black outline-none focus:border-black shadow-sm" value={lockerForm.lockerNumber || ''} onChange={(e) => setLockerForm({...lockerForm, lockerNumber: e.target.value})} />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-gray-400 uppercase mb-2">Spare Key</label>
                      <select disabled={isFieldDisabled} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold bg-white appearance-none outline-none focus:border-black shadow-sm" value={lockerForm.spareKey || 'Ada'} onChange={(e) => setLockerForm({...lockerForm, spareKey: e.target.value as any})}>
                        <option value="Ada">Ada</option><option value="Tidak Ada">Tidak Ada</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-gray-400 uppercase mb-2">Floor Location</label>
                      <select disabled={isFieldDisabled} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold bg-white appearance-none outline-none focus:border-black shadow-sm" value={lockerForm.location || ''} onChange={(e) => setLockerForm({...lockerForm, location: e.target.value})}>
                        <option value="Lantai 1">Lantai 1</option><option value="Lantai 2">Lantai 2</option><option value="Lantai 3">Lantai 3</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-gray-400 uppercase mb-2">Area / Sub Location</label>
                      <select disabled={isFieldDisabled} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold bg-white appearance-none outline-none focus:border-black shadow-sm" value={lockerForm.subLocation || ''} onChange={(e) => setLockerForm({...lockerForm, subLocation: e.target.value as any})}>
                        <option value="-">-</option><option value="Satrio">Satrio</option><option value="Karang Asem">Karang Asem</option>
                      </select>
                    </div>
                  </div>
                  <div className="mt-4">
                      <label className="block text-[10px] font-black text-gray-400 uppercase mb-2">Status</label>
                      <div className="flex gap-2">
                        {['Kosong', 'Terisi', 'Kunci Hilang'].map(s => (
                          <button key={s} disabled={isFieldDisabled} onClick={() => setLockerForm({...lockerForm, status: s as any})} className={`flex-1 py-3 text-[10px] font-black rounded-xl border transition-all uppercase tracking-widest ${lockerForm.status === s ? 'bg-black text-white' : 'bg-white text-gray-400 border-gray-200 hover:border-black'}`}>
                            {s}
                          </button>
                        ))}
                      </div>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-6">
                  <SectionHeader icon={User} title="Occupant Details" />
                  <div className="space-y-4">
                    {lockerForm.status === 'Terisi' ? (
                       <>
                         <div>
                            <label className="block text-[10px] font-black text-gray-400 uppercase mb-2">Employee Name</label>
                            <input type="text" disabled={isFieldDisabled} placeholder="Full Name" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold text-black outline-none focus:border-black shadow-sm" value={lockerForm.employee?.name || ''} onChange={(e) => setLockerForm({...lockerForm, employee: {...(lockerForm.employee || {name:'', role:'', phone:'', avatar:''}), name: e.target.value}})} />
                         </div>
                         <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-[10px] font-black text-gray-400 uppercase mb-2">Position</label>
                                <input type="text" disabled={isFieldDisabled} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold text-black outline-none focus:border-black shadow-sm" value={lockerForm.employee?.position || ''} onChange={(e) => setLockerForm({...lockerForm, employee: {...(lockerForm.employee || {name:'', role:'', phone:'', avatar:''}), position: e.target.value}})} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-black text-gray-400 uppercase mb-2">Department</label>
                                <input type="text" disabled={isFieldDisabled} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold text-black outline-none focus:border-black shadow-sm" value={lockerForm.employee?.department || ''} onChange={(e) => setLockerForm({...lockerForm, employee: {...(lockerForm.employee || {name:'', role:'', phone:'', avatar:''}), department: e.target.value}})} />
                            </div>
                         </div>
                       </>
                    ) : (
                        <div className="h-44 flex flex-col items-center justify-center border-2 border-dashed border-gray-100 rounded-2xl opacity-40">
                           <User size={32} className="text-gray-300 mb-2" />
                           <p className="text-[10px] font-black text-gray-400 uppercase">No occupant assigned</p>
                        </div>
                    )}
                  </div>
                </div>
              </div>

              {/* LOCKER HISTORY TABLE */}
              {isViewMode && (
                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm animate-in fade-in duration-500">
                  <SectionHeader icon={History} title="Locker Usage History" />
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                          <th className="p-4 text-[10px] font-black text-gray-400 uppercase tracking-widest pl-6">No</th>
                          <th className="p-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Date</th>
                          <th className="p-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">User & Department</th>
                          <th className="p-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50">
                        {lockerForm.history && lockerForm.history.length > 0 ? (
                           lockerForm.history.map((h, idx) => (
                             <tr key={h.id} className="hover:bg-gray-50/50 transition-colors">
                               <td className="p-4 text-[11px] font-bold text-gray-300 pl-6">{idx + 1}</td>
                               <td className="p-4 text-[11px] font-black text-black font-mono">{h.date}</td>
                               <td className="p-4">
                                  <div className="text-[12px] font-black text-black uppercase">{h.name}</div>
                                  <div className="text-[9px] font-bold text-gray-400 uppercase tracking-tighter">{h.department}</div>
                               </td>
                               <td className="p-4 text-center">
                                  <span className="inline-block px-3 py-1 bg-gray-100 text-gray-600 rounded-lg text-[9px] font-black uppercase tracking-widest border border-gray-200">
                                    {h.status}
                                  </span>
                               </td>
                             </tr>
                           ))
                        ) : (
                          <tr>
                            <td colSpan={4} className="p-10 text-center text-gray-300 uppercase font-black text-[10px] italic">No historical data available</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-6">
                <SectionHeader icon={MessageSquare} title="Audit & Remarks" />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase mb-2">Last Audit / Update</label>
                    <input type="date" disabled={isFieldDisabled} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold bg-white focus:border-black outline-none shadow-sm transition-all" value={lockerForm.lastUpdate || ''} onChange={(e) => setLockerForm({...lockerForm, lastUpdate: e.target.value})} />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-[10px] font-black text-gray-400 uppercase mb-2">Remarks</label>
                    <textarea rows={1} disabled={isFieldDisabled} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium bg-white focus:border-black outline-none shadow-sm transition-all" value={lockerForm.remarks || ''} onChange={(e) => setLockerForm({...lockerForm, remarks: e.target.value})} />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white p-20 rounded-2xl border border-gray-100 text-center flex flex-col items-center">
                <Archive size={48} className="text-gray-200 mb-4" />
                <p className="text-gray-400 font-bold uppercase text-[10px] tracking-widest">Module view details in progress</p>
                <p className="text-gray-300 text-xs mt-2 italic uppercase">Currently showing standard data layout.</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-8 py-5 bg-white border-t border-gray-100 flex justify-end gap-3 shrink-0">
          {isViewMode ? (
            <button onClick={onClose} className="px-12 py-3 text-[11px] font-black text-black bg-gray-100 rounded-xl hover:bg-gray-200 transition-all uppercase tracking-[0.2em]">Close</button>
          ) : (
            <>
               <button onClick={onClose} className="px-8 py-2.5 text-[11px] font-black text-gray-400 bg-white border border-gray-200 rounded-lg uppercase tracking-widest hover:bg-gray-50">Cancel</button>
               <button onClick={handleSave} className="px-10 py-2.5 text-[11px] font-black text-white bg-black rounded-lg uppercase tracking-widest shadow-xl shadow-black/10 active:scale-95">Save Data</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
