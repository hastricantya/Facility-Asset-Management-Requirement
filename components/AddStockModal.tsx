import React, { useState, useEffect, useMemo } from 'react';
import { X, Save, Calendar, User, Package, MessageSquare, Plus, Trash2, Send, Layers, ClipboardCheck, Clock, Archive, Settings, History, Lock, Home, LayoutGrid, Baby, Users, Activity, Briefcase, Building2, Key, Hash, ShieldCheck, DollarSign, Landmark, ShoppingCart, AlertCircle, UploadCloud, Check, XCircle, MapPin } from 'lucide-react';
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
                   type: initialAssetData.id % 2 === 0 ? 'Daily Request' : 'Event Request',
                   date: initialAssetData.date,
                   remarks: initialAssetData.itemDescription || '',
                   deliveryType: 'PICKUP HO',
                   location: 'Satrio'
               });
               setRequestItems([{ 
                   itemId: matchedMaster ? matchedMaster.id.toString() : '', 
                   qty: initialAssetData.qty.toString(),
                   categoryId: matchedMaster ? matchedMaster.category : initialAssetData.category,
                   uom: matchedMaster ? matchedMaster.uom : ''
               }]);
           }
        } else {
            if (isStockOpname) setStockOpnameForm({ opnameNumber: 'SO-NEW', date: new Date().toISOString().split('T')[0], status: 'Draft' });
            if (isPod) setPodForm({ lantai: 'Lt 2 Pria', jenisKamar: 'Single Bed', statusLokerBarang: 'Tidak Terpakai', statusLokerPantry: 'Tidak Terpakai', jadwalLaundry: 'Tidak ada', isExpat: false });
            if (isMasterPod) setMasterPodForm({ lantai: 'Lt 2 Pria', jenisKamar: 'Single Bed', kapasitas: 1, status: 'Active', fasilitas: [] });
            if (isMasterLocker) setMasterLockerForm({ floor: 'Lt 2 Pria', status: 'Active', type: moduleName.includes('Goods') ? 'Goods' : 'Pantry' });
            if (isStationeryRequest) {
                setStationeryRequestForm({ type: 'Daily Request', deliveryType: 'PICKUP HO', location: 'Satrio', date: new Date().toISOString().split('T')[0] }); 
                setRequestItems([{ itemId: '', qty: '', categoryId: '', uom: '' }]);
            }
        }
    }
  }, [isOpen, initialAssetData, initialLogBookData, initialStockOpnameData, initialLockerData, initialLockerRequestData, initialPodData, initialMasterPodData, initialMasterLockerData, initialPodRequestData, mode, isArkModule, isStationeryRequest, isStockOpname, isPod, isMasterPod, isMasterLocker, moduleName]);

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
                 moduleName}
              </h2>
          </div>
          <div className="flex items-center gap-4">
            {isStationeryRequest && isViewMode && isApprovalModule && (
              <button 
                onClick={() => alert('Approval Workflow: Primary approval routed to Mas Ibnu Faisal')}
                className="px-4 py-2 text-[9px] font-black text-black border border-gray-200 rounded-lg uppercase tracking-widest hover:bg-gray-50 transition-all flex items-center gap-2"
              >
                <History size={14} className="text-gray-400" /> View History Approval ATK
              </button>
            )}
            <button className="text-gray-300 hover:text-red-500 transition-colors p-1" onClick={onClose}>
              <X size={24} />
            </button>
          </div>
        </div>
        
        {/* Body */}
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          {isStationeryRequest ? (
            /* STATIONERY REQUEST FORM */
            <div className="space-y-8">
               <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                 {/* APPLICATION INFO */}
                 <div className="md:col-span-7 bg-white p-8 rounded-2xl border border-gray-200 shadow-sm space-y-6">
                    <SectionHeader icon={Send} title="Application Info" />
                    <div className="grid grid-cols-2 gap-6">
                        <div>
                           <label className="block text-[10px] font-black text-gray-400 uppercase mb-2 tracking-widest">Request Date</label>
                           <div className="relative">
                               <input type="text" disabled={isFieldDisabled} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold bg-white focus:border-black outline-none shadow-sm disabled:bg-white" value={stationeryRequestForm.date || '2026-01-05'} onChange={(e) => handleStationeryRequestChange('date', e.target.value)} />
                           </div>
                        </div>
                        <div>
                           <label className="block text-[10px] font-black text-gray-400 uppercase mb-2 tracking-widest">Request Type</label>
                           <div className="relative">
                               <select 
                                 disabled={isFieldDisabled} 
                                 className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold bg-white focus:border-black outline-none shadow-sm appearance-none disabled:bg-white disabled:opacity-100" 
                                 value={stationeryRequestForm.type || 'Daily Request'} 
                                 onChange={(e) => handleStationeryRequestChange('type', e.target.value)}
                               >
                                  <option value="Daily Request">Daily Request</option>
                                  <option value="Event Request">Event Request</option>
                               </select>
                               <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                           </div>
                        </div>
                    </div>
                    <div>
                        <label className="block text-[10px] font-black text-gray-400 uppercase mb-2 tracking-widest">Delivery Method</label>
                        <div className="w-full py-3 bg-black text-white text-[12px] font-black rounded-xl border border-black shadow-lg text-center uppercase tracking-widest">
                            PICKUP HO
                        </div>
                    </div>
                 </div>

                 {/* REQUESTER INFO */}
                 <div className="md:col-span-5 bg-white p-8 rounded-2xl border border-gray-200 shadow-sm space-y-6">
                   <SectionHeader icon={User} title="Requester Info" />
                   <div className="flex items-center gap-5 p-6 bg-white rounded-2xl border border-gray-100 shadow-sm">
                       <img src={initialAssetData?.employee.avatar || 'https://i.pravatar.cc/150?u=aan'} className="w-16 h-16 rounded-full border-4 border-white shadow-md object-cover" />
                       <div>
                           <div className="text-[16px] font-black text-black uppercase tracking-tight leading-none mb-1">{initialAssetData?.employee.name || 'Aan Junaidi'}</div>
                           <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{initialAssetData?.employee.role || 'Technician Team Leader'}</div>
                       </div>
                   </div>
                 </div>
               </div>

               {/* REQUESTED ITEMS */}
               <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
                 <SectionHeader icon={Package} title="Requested Items" />
                 <div className="overflow-hidden border border-gray-100 rounded-xl">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50/80 border-b border-gray-100">
                            <tr>
                                <th className="p-4 text-[10px] font-black text-gray-400 uppercase tracking-widest pl-8">Kategori</th>
                                <th className="p-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Item Name</th>
                                <th className="p-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Item Code</th>
                                <th className="p-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">In Stock</th>
                                <th className="p-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Qty</th>
                                <th className="p-4 text-[10px] font-black text-gray-400 uppercase tracking-widest pl-10">UOM</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {requestItems.map((item, idx) => {
                                const masterList = isArkModule ? MOCK_MASTER_ARK_DATA : MOCK_MASTER_DATA;
                                const selectedItemFull = masterList.find(m => m.id.toString() === item.itemId);

                                return (
                                    <tr key={idx} className="hover:bg-gray-50/30 transition-colors">
                                        <td className="p-5 pl-8">
                                            <span className="text-[13px] font-black text-black uppercase tracking-tight">{item.categoryId || initialAssetData?.category || '-'}</span>
                                        </td>
                                        <td className="p-5">
                                            <span className="text-[13px] font-black text-black uppercase tracking-tight">{selectedItemFull?.itemName || initialAssetData?.itemName || '-'}</span>
                                        </td>
                                        <td className="p-5">
                                            <span className="text-[12px] font-mono font-bold text-blue-600 uppercase">
                                                {selectedItemFull?.itemCode || initialAssetData?.itemCode || '-'}
                                            </span>
                                        </td>
                                        <td className="p-5 text-center">
                                            <span className="text-[13px] font-black text-red-500">
                                                {selectedItemFull ? selectedItemFull.remainingStock : (initialAssetData?.remainingStock || '-')}
                                            </span>
                                        </td>
                                        <td className="p-5">
                                            <div className="flex justify-center">
                                                <div className="w-16 h-10 border border-gray-200 rounded-xl bg-white flex items-center justify-center font-black text-black text-sm shadow-sm">
                                                    {item.qty}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-5 pl-10">
                                            <span className="text-[13px] font-black text-black uppercase">{item.uom || '-'}</span>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                 </div>
               </div>

               {/* REMARKS */}
               <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
                 <SectionHeader icon={MessageSquare} title="Keterangan / Remarks" />
                 <textarea rows={3} disabled={isFieldDisabled} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium bg-white outline-none focus:border-black transition-all placeholder:text-gray-300 disabled:bg-white" value={stationeryRequestForm.remarks || ''} onChange={(e) => handleStationeryRequestChange('remarks', e.target.value)} placeholder="Tulis catatan tambahan di sini..." />
               </div>
            </div>
          ) : (
            <div className="bg-white p-20 rounded-2xl border border-gray-100 text-center flex flex-col items-center">
                <Archive size={48} className="text-gray-200 mb-4" />
                <p className="text-gray-400 font-bold uppercase text-[10px] tracking-widest">Module detail View</p>
                <p className="text-gray-300 text-xs mt-2 italic uppercase">Content logic for {moduleName} module.</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-8 py-5 bg-white border-t border-gray-100 flex justify-end items-center gap-3 shrink-0">
            <button onClick={onClose} className="px-10 py-3 text-[11px] font-black text-gray-400 bg-white border border-gray-200 rounded-xl uppercase tracking-widest hover:bg-gray-50 hover:text-black transition-all">{isViewMode ? 'Close' : 'Cancel'}</button>
            
            {isViewMode && isApprovalModule && initialAssetData?.status === 'Pending' && (
              <>
                <button 
                  onClick={handleRejectAction} 
                  className="px-12 py-3 text-[11px] font-black text-white bg-red-600 rounded-xl uppercase tracking-widest shadow-xl shadow-red-600/20 active:scale-95 transition-all hover:bg-red-700 flex items-center gap-2"
                >
                  <XCircle size={16} className="stroke-[3]" /> Reject Request
                </button>
                <button 
                  onClick={handleApproveAction} 
                  className="px-12 py-3 text-[11px] font-black text-white bg-green-600 rounded-xl uppercase tracking-widest shadow-xl shadow-green-600/20 active:scale-95 transition-all hover:bg-green-700 flex items-center gap-2"
                >
                  <Check size={16} className="stroke-[3]" /> Approve Request
                </button>
              </>
            )}

            {!isViewMode && (
                <div className="flex items-center gap-3">
                    <button onClick={handleSave} className="px-12 py-3 text-[11px] font-black text-white bg-black rounded-xl uppercase tracking-widest shadow-xl shadow-black/10 active:scale-95 transition-all hover:bg-gray-900">
                      {mode === 'edit' ? 'Save Changes' : 'Save Data'}
                    </button>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

// Fixed missing import ChevronDown for the request type select
import { ChevronDown } from 'lucide-react';