import React, { useState, useEffect } from 'react';
import { X, Save, List, Calendar, CheckCircle, XCircle, FileText, Archive, ChevronLeft, Printer, History, User, Package, MapPin, Users, MessageSquare, Check, RotateCcw, AlertTriangle } from 'lucide-react';
import { VehicleRecord, ServiceRecord, MutationRecord, SalesRecord, ContractRecord, GeneralMasterItem, MasterVendorRecord, StationeryRequestRecord, StationeryRequestItem, DeliveryLocationRecord, AssetRecord, LogBookRecord, TaxKirRecord } from '../types';
import { useLanguage } from '../contexts/LanguageContext';
import { MOCK_MASTER_DATA, MOCK_MASTER_ARK_DATA, MOCK_ATK_CATEGORY, MOCK_ARK_CATEGORY, MOCK_UOM_DATA } from '../constants';

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
  
  mode?: 'create' | 'edit' | 'view';
  vehicleList?: VehicleRecord[];
  masterData?: Record<string, GeneralMasterItem[]>;
}

export const AddStockModal: React.FC<Props> = ({ 
    isOpen, 
    onClose, 
    moduleName = 'ATK', 
    onSaveVehicle,
    onSaveService,
    onSaveTaxKir,
    onSaveMutation,
    onSaveSales,
    onSaveContract,
    onSaveMaster,
    onSaveMasterVendor,
    onSaveStationeryRequest,
    onSaveDeliveryLocation,
    onSaveLogBook,
    onRevise,
    onApprove,
    onReject,
    initialVehicleData,
    initialServiceData,
    initialTaxKirData,
    initialMutationData,
    initialSalesData,
    initialContractData,
    initialMasterData,
    initialMasterVendorData,
    initialDeliveryLocationData,
    initialAssetData,
    initialLogBookData,
    mode = 'create',
    vehicleList = [],
    masterData = {}
}) => {
  const { t } = useLanguage();
  
  const [contractForm, setContractForm] = useState<Partial<ContractRecord>>({});
  const [vehicleForm, setVehicleForm] = useState<Partial<VehicleRecord>>({});
  const [serviceForm, setServiceForm] = useState<Partial<ServiceRecord>>({});
  const [taxKirForm, setTaxKirForm] = useState<Partial<TaxKirRecord>>({});
  const [masterForm, setMasterForm] = useState<Partial<GeneralMasterItem>>({});
  const [stationeryRequestForm, setStationeryRequestForm] = useState<Partial<StationeryRequestRecord>>({
      type: 'DAILY REQUEST',
      deliveryType: 'Dikirim',
      location: 'MODENA Head Office',
      date: new Date().toISOString().split('T')[0]
  });
  const [logBookForm, setLogBookForm] = useState<Partial<LogBookRecord>>({});
  const [requestItems, setRequestItems] = useState<StationeryRequestItem[]>([{ itemId: '', qty: '', categoryId: '', uom: '' }]);
  const [showApprovalHistory, setShowApprovalHistory] = useState(false);

  useEffect(() => {
    if (isOpen) {
        if (mode === 'edit' || mode === 'view') {
           if (initialContractData) setContractForm(initialContractData);
           if (initialVehicleData) setVehicleForm(initialVehicleData);
           if (initialServiceData) setServiceForm(initialServiceData);
           if (initialTaxKirData) setTaxKirForm(initialTaxKirData);
           if (initialMasterData) setMasterForm(initialMasterData);
           if (initialLogBookData) setLogBookForm(initialLogBookData);
           
           if (initialAssetData) {
               const isArk = moduleName?.includes('ARK') || false;
               const masterList = isArk ? MOCK_MASTER_ARK_DATA : MOCK_MASTER_DATA;
               const matchedMaster = masterList.find(m => m.itemName === initialAssetData.itemName);
               
               let formattedDate = new Date().toISOString().split('T')[0];
               if (initialAssetData.date) {
                   const parts = initialAssetData.date.split('/');
                   if (parts.length === 3) formattedDate = `${parts[2]}-${parts[1]}-${parts[0]}`;
               }

               setStationeryRequestForm({
                   type: 'DAILY REQUEST',
                   date: formattedDate,
                   remarks: initialAssetData.itemDescription || '',
                   deliveryType: 'Dikirim',
                   location: 'MODENA Head Office'
               });

               setRequestItems([{ 
                   itemId: matchedMaster ? matchedMaster.id.toString() : '', 
                   qty: initialAssetData.qty ? initialAssetData.qty.toString() : '0',
                   categoryId: matchedMaster ? matchedMaster.category : '',
                   uom: matchedMaster ? matchedMaster.uom : ''
               }]);
           }
        } else {
            setStationeryRequestForm({ type: 'DAILY REQUEST', deliveryType: 'Dikirim', location: 'MODENA Head Office', date: new Date().toISOString().split('T')[0] });
            setRequestItems([{ itemId: '', qty: '', categoryId: '', uom: '' }]);
        }
    }
  }, [isOpen, initialAssetData, mode, moduleName]);

  const handleSave = () => {
      if (moduleName === 'Log Book' && onSaveLogBook) onSaveLogBook(logBookForm);
      if ((moduleName === 'Request ATK' || moduleName === 'Daftar ARK') && onSaveStationeryRequest) onSaveStationeryRequest({ ...stationeryRequestForm, items: requestItems });
      onClose();
  }

  const handleLogBookChange = (field: keyof LogBookRecord, value: any) => setLogBookForm(prev => ({ ...prev, [field]: value }));
  const handleStationeryRequestChange = (field: keyof StationeryRequestRecord, value: any) => setStationeryRequestForm(prev => ({ ...prev, [field]: value }));

  const handleRequestItemChange = (index: number, field: keyof StationeryRequestItem, value: string) => {
      const newItems = [...requestItems];
      if (field === 'categoryId') {
          // If category changes, reset itemId and uom for that row to ensure validation
          newItems[index] = { ...newItems[index], [field]: value, itemId: '', uom: '' };
      } else if (field === 'itemId') {
          // If product changes, auto-set default UOM from master
          const isArk = moduleName === 'Daftar ARK';
          const masterList = isArk ? MOCK_MASTER_ARK_DATA : MOCK_MASTER_DATA;
          const selectedProduct = masterList.find(m => m.id.toString() === value);
          newItems[index] = { ...newItems[index], [field]: value, uom: selectedProduct?.uom || '' };
      } else {
          newItems[index] = { ...newItems[index], [field]: value };
      }
      setRequestItems(newItems);
  }

  const addRequestItemRow = () => setRequestItems([...requestItems, { itemId: '', qty: '', categoryId: '', uom: '' }]);
  const removeRequestItemRow = (index: number) => { if (requestItems.length > 1) setRequestItems(requestItems.filter((_, i) => i !== index)); }

  const SectionHeader = ({ icon: Icon, title }: { icon: any, title: string }) => (
    <div className="flex items-center gap-3 mb-6 pb-2 border-b border-gray-100">
        <Icon size={18} className="text-black" />
        <h3 className="text-[10px] font-black text-black uppercase tracking-[0.2em]">{title}</h3>
    </div>
  );

  const isStationeryRequest = moduleName === 'Request ATK' || moduleName === 'Daftar ARK' || moduleName === 'Stationery Request Approval' || moduleName === 'Household Request Approval';
  const isApprovalModule = moduleName.includes('Approval');
  const isViewMode = mode === 'view';
  const isLogBook = moduleName === 'Log Book';
  const Required = () => <span className="text-red-600 font-bold ml-0.5">*</span>;

  const renderApprovalHistory = () => {
    if (!showApprovalHistory) return null;
    return (
        <div className="fixed inset-0 bg-black/40 z-[70] flex items-center justify-center backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="bg-white w-full max-w-3xl rounded-xl shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-200">
                {/* Header */}
                <div className="px-8 py-6 border-b border-gray-100 flex items-start justify-between">
                    <div>
                        <h2 className="text-[18px] font-bold text-[#111827]">Approval History</h2>
                        <p className="text-[14px] text-[#6B7280] mt-1">Document Number: {initialAssetData?.transactionNumber || 'PR/085/BOK/12.25'}</p>
                    </div>
                    <button onClick={() => setShowApprovalHistory(false)} className="text-gray-400 hover:text-gray-600 transition-colors p-1">
                        <X size={24} />
                    </button>
                </div>
                
                {/* Body */}
                <div className="p-10 bg-white">
                    <div className="relative flex gap-8">
                        {/* Timeline Indicator */}
                        <div className="flex flex-col items-center">
                            <div className="w-12 h-12 rounded-full bg-[#22C55E] flex items-center justify-center shadow-sm border-[4px] border-white">
                                <CheckCircle className="text-white" size={24} />
                            </div>
                            <div className="w-[2px] flex-1 bg-gray-100 mt-2"></div>
                        </div>
                        
                        {/* Content Card */}
                        <div className="flex-1 bg-white rounded-xl border border-[#E5E7EB] p-6 shadow-sm">
                            <div className="flex justify-between items-start mb-4">
                                <h4 className="font-bold text-[#111827] text-[16px]">Approved by Ibnu Faisal Abbas</h4>
                                <span className="px-4 py-1.5 bg-[#E8FDF5] text-[#059669] text-[12px] font-medium rounded-lg">Completed</span>
                            </div>
                            
                            <div className="space-y-4">
                                <div className="flex items-center gap-6 text-[14px] text-[#4B5563]">
                                    <div className="flex items-center gap-2">
                                        <User size={16} className="text-gray-400" />
                                        <span>Ibnu Faisal Abbas</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Calendar size={16} className="text-gray-400" />
                                        <span>2025-12-18 10:37:09</span>
                                    </div>
                                </div>
                                
                                <div>
                                    <p className="text-[14px] font-bold text-[#111827]">Remarks: <span className="font-normal text-[#374151]">tes</span></p>
                                </div>
                                
                                <div className="text-[13px] text-[#9CA3AF]">
                                    Email: <span className="text-[#6B7280]">ibnu.faisal@modena.com</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Footer */}
                <div className="px-8 py-5 border-t border-gray-50 flex justify-end">
                    <button 
                        onClick={() => setShowApprovalHistory(false)} 
                        className="px-6 py-2 bg-gray-50 hover:bg-gray-100 text-[12px] font-bold text-[#374151] rounded-lg transition-all border border-gray-200"
                    >
                        Tutup
                    </button>
                </div>
            </div>
        </div>
    )
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center backdrop-blur-[2px] p-4 transition-opacity duration-300">
      <div className={`bg-white w-full ${isLogBook || (isStationeryRequest && !isViewMode) ? 'max-w-6xl' : 'max-w-7xl'} rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[95vh] transform transition-all scale-100`}>
        {/* Header */}
        <div className="px-8 py-5 bg-white border-b border-gray-100 flex items-center justify-between shrink-0">
          <div>
              <h2 className="text-lg font-bold tracking-tight text-gray-900 uppercase tracking-tighter">
                {isStationeryRequest ? (isViewMode ? (isApprovalModule ? 'Stationery Approval Process' : 'Stationery Request Details') : 'Create Stationery Request') : isLogBook ? 'Guest Log Detail' : moduleName}
              </h2>
              {isViewMode && initialAssetData?.transactionNumber && (
                <span className="text-[10px] font-black text-gray-400 tracking-widest uppercase">ID: {initialAssetData.transactionNumber}</span>
              )}
          </div>
          <div className="flex items-center gap-3">
            {isViewMode && isStationeryRequest && (
              <button onClick={() => setShowApprovalHistory(true)} className="flex items-center gap-2 px-4 py-1.5 text-[10px] font-black uppercase tracking-widest text-black bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-all"><History size={14} /> History</button>
            )}
            <button className="text-gray-400 hover:text-red-500 transition-colors p-1 rounded-full hover:bg-gray-100" onClick={onClose}>
              <X size={20} className="cursor-pointer"/>
            </button>
          </div>
        </div>
        
        {/* Body */}
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar bg-[#F8F9FA]">
          {isStationeryRequest && isViewMode ? (
            /* --- POPUP CONTENT FOR VIEW MODE STATIONERY --- */
            <div className="space-y-8">
               <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                   <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm relative overflow-hidden">
                      <SectionHeader icon={User} title="Requester Info" />
                      <div className="space-y-4">
                          <div className="flex items-center gap-4">
                              <img src={initialAssetData?.employee.avatar} className="w-12 h-12 rounded-full border border-gray-100" />
                              <div>
                                  <div className="text-[14px] font-black text-black uppercase">{initialAssetData?.employee.name}</div>
                                  <div className="text-[10px] font-bold text-gray-400 uppercase">{initialAssetData?.employee.role}</div>
                              </div>
                          </div>
                          <div><label className="text-[9px] font-black text-gray-400 uppercase block">Phone</label><div className="text-[12px] font-mono text-gray-600">{initialAssetData?.employee.phone}</div></div>
                      </div>
                   </div>
                   <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                      <SectionHeader icon={Package} title="Request Type" />
                      <div className="space-y-4">
                          <div><label className="text-[9px] font-black text-gray-400 uppercase block">Category</label><div className="text-[14px] font-black text-black uppercase">{stationeryRequestForm.type}</div></div>
                          <div><label className="text-[9px] font-black text-gray-400 uppercase block">Submit Date</label><div className="text-[12px] font-bold text-gray-600">{initialAssetData?.date}</div></div>
                      </div>
                   </div>
                   <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                      <SectionHeader icon={MapPin} title="Delivery Address" />
                      <div className="space-y-4">
                          <div><label className="text-[9px] font-black text-gray-400 uppercase block">Location</label><div className="text-[14px] font-black text-black uppercase">{stationeryRequestForm.location}</div></div>
                          <div><label className="text-[9px] font-black text-gray-400 uppercase block">Status</label>
                            <span className={`inline-block mt-1 px-2 py-0.5 text-white text-[9px] font-black rounded uppercase ${initialAssetData?.status === 'Approved' ? 'bg-green-500' : 'bg-orange-500'}`}>{initialAssetData?.status}</span>
                          </div>
                      </div>
                   </div>
               </div>

               {/* VIEW MODE INVENTORY ITEMS TABLE */}
               <div className="bg-white rounded-2xl border border-gray-200 shadow-xl overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-200 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                                <th className="px-8 py-5 w-16 text-center">#</th>
                                <th className="px-8 py-5">Item Name / Description</th>
                                <th className="px-8 py-5 w-40">Category</th>
                                <th className="px-8 py-5 w-40">Part Code</th>
                                <th className="px-8 py-5 w-28 text-center">Qty</th>
                                <th className="px-8 py-5 w-28 text-center">In Stock</th>
                                <th className="px-8 py-5 w-24 text-center">Unit</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {[...requestItems, { itemId: '2', qty: '5' }].map((item, index) => {
                                const isArk = moduleName?.includes('ARK');
                                const masterList = isArk ? MOCK_MASTER_ARK_DATA : MOCK_MASTER_DATA;
                                const masterItem = masterList.find(m => m.id.toString() === item.itemId);
                                const qtyNum = parseInt(item.qty) || 0;
                                return (
                                    <tr key={index} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="px-8 py-6 text-center text-gray-300 font-bold text-[11px]">{index + 1}</td>
                                        <td className="px-8 py-6">
                                            <div className="font-black text-black text-[13px] uppercase tracking-tight">{masterItem?.itemName || 'Unknown Item'}</div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <span className="text-[11px] font-bold text-gray-500 uppercase tracking-tighter">{masterItem?.category || 'General'}</span>
                                        </td>
                                        <td className="px-8 py-6">
                                            <span className="font-mono text-[11px] font-black text-gray-400 bg-gray-100 px-2 py-1 rounded">{masterItem?.itemCode || 'N/A'}</span>
                                        </td>
                                        <td className="px-8 py-6 text-center">
                                            <div className="text-[16px] font-black text-black">{qtyNum}</div>
                                        </td>
                                        <td className="px-8 py-6 text-center">
                                            <div className={`text-[16px] font-black ${masterItem && masterItem.remainingStock < 10 ? 'text-red-500' : 'text-gray-400'}`}>
                                                {masterItem?.remainingStock || 0}
                                            </div>
                                        </td>
                                        <td className="px-8 py-6 text-center">
                                            <div className="text-[11px] font-black text-gray-400 uppercase tracking-widest">{masterItem?.uom || 'PCS'}</div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                  </div>
               </div>
            </div>
          ) : isLogBook ? (
            /* --- LOG BOOK CONTENT --- */
            <div className="space-y-6">
                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2"><SectionHeader icon={List} title="Detail Kunjungan" /></div>
                    <div><label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Lokasi Modena</label><div className="text-[14px] font-black uppercase">{logBookForm.lokasiModena || 'N/A'}</div></div>
                    <div><label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Kategori</label><div className="text-[14px] font-black uppercase text-blue-600">{logBookForm.kategoriTamu || 'N/A'}</div></div>
                    <div className="md:col-span-2"><label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Nama Tamu</label><div className="text-[16px] font-black uppercase">{logBookForm.namaTamu || 'N/A'}</div></div>
                    <div><label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">In</label><div className="text-[14px] font-mono font-bold">{logBookForm.jamDatang || '--:--'}</div></div>
                    <div><label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Out</label><div className="text-[14px] font-mono font-bold text-gray-400">{logBookForm.jamPulang || '--:--'}</div></div>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                    <SectionHeader icon={Users} title="Breakdown Pengunjung" />
                    <div className="grid grid-cols-3 gap-4 text-center">
                        <div><div className="text-[20px] font-black">{logBookForm.wanita || 0}</div><div className="text-[9px] font-black text-pink-500 uppercase">Wanita</div></div>
                        <div><div className="text-[20px] font-black">{logBookForm.lakiLaki || 0}</div><div className="text-[9px] font-black text-blue-500 uppercase">Laki-Laki</div></div>
                        <div><div className="text-[20px] font-black">{logBookForm.anakAnak || 0}</div><div className="text-[9px] font-black text-orange-500 uppercase">Anak-Anak</div></div>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                    <SectionHeader icon={MessageSquare} title="Notes" />
                    <p className="text-[13px] text-gray-500 italic">"{logBookForm.note || 'No additional notes.'}"</p>
                </div>
            </div>
          ) : isStationeryRequest && !isViewMode ? (
            /* --- CREATE MODE STATIONERY --- */
             <div className="space-y-6">
                 <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                     <SectionHeader icon={FileText} title="Order Setup" />
                     <div className="grid grid-cols-2 gap-4">
                         <div><label className="block text-[10px] font-black text-gray-500 uppercase mb-2">Order Type</label>
                            <select className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm font-bold bg-white" value={stationeryRequestForm.type} onChange={(e) => handleStationeryRequestChange('type', e.target.value)}>
                                <option value="DAILY REQUEST">DAILY REQUEST</option>
                                <option value="EVENT REQUEST">EVENT REQUEST</option>
                            </select>
                         </div>
                         <div><label className="block text-[10px] font-black text-gray-500 uppercase mb-2">Date</label><input type="date" className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm font-bold bg-white" value={stationeryRequestForm.date} onChange={(e) => handleStationeryRequestChange('date', e.target.value)} /></div>
                     </div>
                 </div>
                 <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                    <div className="flex justify-between items-center mb-4"><SectionHeader icon={List} title="Items List" /><button onClick={addRequestItemRow} className="text-[10px] font-black uppercase tracking-widest px-4 py-1.5 bg-black text-white rounded-lg">+ Add Row</button></div>
                    <div className="overflow-hidden border border-gray-100 rounded-lg mb-4">
                         <table className="w-full text-left">
                             <thead className="bg-gray-50 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                                 <tr><th className="p-3 w-12 text-center">#</th><th className="p-3 w-40">Category</th><th className="p-3">Product Name</th><th className="p-3 w-24 text-center">In Stock</th><th className="p-3 w-24 text-center">UOM</th><th className="p-3 w-24 text-center">Qty</th><th className="p-3 w-16"></th></tr>
                             </thead>
                             <tbody className="divide-y divide-gray-50">
                                 {requestItems.map((item, idx) => {
                                     const isArk = moduleName === 'Daftar ARK';
                                     const categoryList = isArk ? MOCK_ARK_CATEGORY : MOCK_ATK_CATEGORY;
                                     const masterList = isArk ? MOCK_MASTER_ARK_DATA : MOCK_MASTER_DATA;
                                     // Filter items based on selected category in this row
                                     const filteredItems = item.categoryId ? masterList.filter(m => m.category === item.categoryId) : [];
                                     const currentProduct = masterList.find(m => m.id.toString() === item.itemId);
                                     
                                     return (
                                     <tr key={idx} className="hover:bg-gray-50/30 transition-colors">
                                         <td className="p-3 text-center text-gray-300 font-bold">{idx + 1}</td>
                                         <td className="p-3">
                                             <select 
                                                className="w-full border border-gray-200 rounded-lg px-2 py-1.5 text-xs font-bold" 
                                                value={item.categoryId} 
                                                onChange={(e) => handleRequestItemChange(idx, 'categoryId', e.target.value)}
                                             >
                                                 <option value="">Category...</option>
                                                 {categoryList.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                                             </select>
                                         </td>
                                         <td className="p-3">
                                             <select 
                                                disabled={!item.categoryId}
                                                className={`w-full border border-gray-200 rounded-lg px-2 py-1.5 text-xs font-bold ${!item.categoryId ? 'bg-gray-50 text-gray-400' : 'text-black'}`} 
                                                value={item.itemId} 
                                                onChange={(e) => handleRequestItemChange(idx, 'itemId', e.target.value)}
                                             >
                                                 <option value="">{item.categoryId ? 'Search Product...' : 'Select category'}</option>
                                                 {filteredItems.map(m => (
                                                     <option key={m.id} value={m.id}>
                                                         {m.itemName}
                                                     </option>
                                                 ))}
                                             </select>
                                         </td>
                                         <td className="p-3 text-center">
                                             {currentProduct ? (
                                                 <span className={`text-[12px] font-black ${currentProduct.remainingStock < 5 ? 'text-red-500' : 'text-gray-400'}`}>
                                                     {currentProduct.remainingStock}
                                                 </span>
                                             ) : (
                                                 <span className="text-gray-200 font-bold">-</span>
                                             )}
                                         </td>
                                         <td className="p-3">
                                             <select 
                                                className="w-full border border-gray-200 rounded-lg px-1 py-1.5 text-[10px] font-black text-center uppercase appearance-none hover:border-black transition-all" 
                                                value={item.uom} 
                                                onChange={(e) => handleRequestItemChange(idx, 'uom', e.target.value)}
                                             >
                                                 <option value="">UOM</option>
                                                 {MOCK_UOM_DATA.map(u => <option key={u.id} value={u.name}>{u.name}</option>)}
                                             </select>
                                         </td>
                                         <td className="p-3">
                                            <input type="number" className="w-full border border-gray-200 rounded-lg px-2 py-1.5 text-sm font-black text-center" value={item.qty} onChange={(e) => handleRequestItemChange(idx, 'qty', e.target.value)} />
                                         </td>
                                         <td className="p-3 text-center"><button onClick={() => removeRequestItemRow(idx)} className="text-gray-300 hover:text-red-500 transition-all"><X size={16}/></button></td>
                                     </tr>
                                 )})}
                             </tbody>
                         </table>
                    </div>
                    <textarea rows={2} className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm italic" placeholder="Add remarks..." value={stationeryRequestForm.remarks} onChange={(e) => handleStationeryRequestChange('remarks', e.target.value)} />
                 </div>
             </div>
          ) : (
            <div className="p-12 text-center text-gray-400 uppercase font-black text-[10px] tracking-widest">Detail View for {moduleName}</div>
          )}
        </div>

        {/* Footer */}
        <div className="px-8 py-5 bg-white border-t border-gray-100 flex justify-end gap-3 shrink-0">
          {isViewMode ? (
            isApprovalModule ? (
              /* --- APPROVAL BUTTONS --- */
              <>
                <button 
                  onClick={onReject} 
                  className="px-8 py-2.5 text-[11px] font-black uppercase tracking-widest text-red-500 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 transition-all flex items-center gap-2"
                >
                  <XCircle size={14} /> Reject
                </button>
                <button 
                  onClick={onApprove} 
                  className="px-12 py-2.5 text-[11px] font-black uppercase tracking-widest text-white bg-black rounded-lg hover:bg-gray-800 shadow-xl shadow-black/20 transition-all active:scale-95 flex items-center gap-2"
                >
                  <Check size={14} /> Approve
                </button>
              </>
            ) : (
              <button onClick={onClose} className="px-10 py-2.5 text-[11px] font-black uppercase tracking-widest text-black bg-gray-100 rounded-lg hover:bg-gray-200 transition-all">Close</button>
            )
          ) : (
            <>
              <button onClick={onClose} className="px-10 py-2.5 text-[11px] font-black uppercase tracking-widest text-gray-400 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 hover:text-black transition-all">Cancel</button>
              {isStationeryRequest && (
                <button onClick={onClose} className="px-10 py-2.5 text-[11px] font-black uppercase tracking-widest text-gray-400 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 hover:text-black transition-all">DRAF</button>
              )}
              <button onClick={handleSave} className="px-12 py-2.5 text-[11px] font-black uppercase tracking-widest text-white bg-black rounded-lg hover:bg-gray-800 shadow-xl shadow-black/20 transition-all active:scale-95">Save Data</button>
            </>
          )}
        </div>
      </div>

      {/* Approval History Modal */}
      {renderApprovalHistory()}
    </div>
  );
};