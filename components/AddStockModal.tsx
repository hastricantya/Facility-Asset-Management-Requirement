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

  // Robust detection using string includes to handle both Request and Approval variants
  const isArkModule = moduleName.includes('ARK') || moduleName.includes('Household');
  const isStationeryRequest = moduleName.includes('ATK') || moduleName.includes('ARK') || moduleName.includes('Stationery') || moduleName.includes('Household');
  const isApprovalModule = moduleName.includes('Approval');
  const isLogBook = moduleName === 'Log Book';
  const isViewMode = mode === 'view';

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
               const masterList = isArkModule ? MOCK_MASTER_ARK_DATA : MOCK_MASTER_DATA;
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

               // Populate items list for details view
               setRequestItems([
                 { 
                   itemId: matchedMaster ? matchedMaster.id.toString() : '', 
                   qty: initialAssetData.qty ? initialAssetData.qty.toString() : '0',
                   categoryId: matchedMaster ? matchedMaster.category : '',
                   uom: matchedMaster ? matchedMaster.uom : ''
                 }
               ]);
           }
        } else {
            // Reset form for create mode
            setStationeryRequestForm({ 
                type: 'DAILY REQUEST', 
                deliveryType: 'Dikirim', 
                location: 'MODENA Head Office', 
                date: new Date().toISOString().split('T')[0],
                remarks: `Permintaan rutin ${isArkModule ? 'ARK' : 'ATK'} untuk operasional kantor.`
            });
            setRequestItems([{ itemId: '', qty: '', categoryId: '', uom: '' }]);
        }
    }
  }, [isOpen, initialAssetData, mode, moduleName, isArkModule]);

  const handleSave = () => {
      if (isLogBook && onSaveLogBook) onSaveLogBook(logBookForm);
      if (isStationeryRequest && onSaveStationeryRequest) onSaveStationeryRequest({ ...stationeryRequestForm, items: requestItems });
      onClose();
  }

  const handleLogBookChange = (field: keyof LogBookRecord, value: any) => setLogBookForm(prev => ({ ...prev, [field]: value }));
  const handleStationeryRequestChange = (field: keyof StationeryRequestRecord, value: any) => setStationeryRequestForm(prev => ({ ...prev, [field]: value }));

  const handleRequestItemChange = (index: number, field: keyof StationeryRequestItem, value: string) => {
      const newItems = [...requestItems];
      if (field === 'categoryId') {
          newItems[index] = { ...newItems[index], [field]: value, itemId: '', uom: '' };
      } else if (field === 'itemId') {
          const masterList = isArkModule ? MOCK_MASTER_ARK_DATA : MOCK_MASTER_DATA;
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
    <div className="flex items-center gap-3 mb-6">
        <Icon size={18} className="text-black" />
        <h3 className="text-[11px] font-black text-black uppercase tracking-[0.2em]">{title}</h3>
    </div>
  );

  const renderApprovalHistory = () => {
    if (!showApprovalHistory) return null;
    return (
        <div className="fixed inset-0 bg-black/40 z-[70] flex items-center justify-center backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="bg-white w-full max-w-3xl rounded-xl shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-200">
                <div className="px-8 py-6 border-b border-gray-100 flex items-start justify-between">
                    <div>
                        <h2 className="text-[18px] font-bold text-[#111827]">Approval History</h2>
                        <p className="text-[14px] text-[#6B7280] mt-1">Document Number: {initialAssetData?.transactionNumber || 'PR/085/BOK/12.25'}</p>
                    </div>
                    <button onClick={() => setShowApprovalHistory(false)} className="text-gray-400 hover:text-gray-600 transition-colors p-1">
                        <X size={24} />
                    </button>
                </div>
                <div className="p-10 bg-white">
                    <div className="relative flex gap-8">
                        <div className="flex flex-col items-center">
                            <div className="w-12 h-12 rounded-full bg-[#22C55E] flex items-center justify-center shadow-sm border-[4px] border-white">
                                <CheckCircle className="text-white" size={24} />
                            </div>
                            <div className="w-[2px] flex-1 bg-gray-100 mt-2"></div>
                        </div>
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
                                <div><p className="text-[14px] font-bold text-[#111827]">Remarks: <span className="font-normal text-[#374151]">tes</span></p></div>
                                <div className="text-[13px] text-[#9CA3AF]">Email: <span className="text-[#6B7280]">ibnu.faisal@modena.com</span></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="px-8 py-5 border-t border-gray-50 flex justify-end">
                    <button onClick={() => setShowApprovalHistory(false)} className="px-6 py-2 bg-gray-50 hover:bg-gray-100 text-[12px] font-bold text-[#374151] rounded-lg transition-all border border-gray-200">Tutup</button>
                </div>
            </div>
        </div>
    )
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center backdrop-blur-[2px] p-4 transition-opacity duration-300">
      <div className={`bg-[#F8F9FA] w-full ${isLogBook || (isStationeryRequest && !isViewMode) ? 'max-w-5xl' : 'max-w-7xl'} rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[95vh] transform transition-all scale-100`}>
        {/* Header */}
        <div className="px-8 py-5 bg-white border-b border-gray-100 flex items-center justify-between shrink-0">
          <div>
              <h2 className="text-[14px] font-black text-black uppercase tracking-widest">
                {isStationeryRequest ? (isViewMode ? (isApprovalModule ? 'Stationery Approval Process' : 'Stationery Request Details') : (isArkModule ? 'CREATE HOUSEHOLD REQUEST' : 'CREATE STATIONERY REQUEST')) : isLogBook ? 'Guest Log Detail' : moduleName}
              </h2>
              {isViewMode && initialAssetData?.transactionNumber && (
                <span className="text-[10px] font-black text-gray-400 tracking-widest uppercase mt-1 block">ID: {initialAssetData.transactionNumber}</span>
              )}
          </div>
          <div className="flex items-center gap-3">
            {isViewMode && isStationeryRequest && (
              <button onClick={() => setShowApprovalHistory(true)} className="flex items-center gap-2 px-4 py-1.5 text-[10px] font-black uppercase tracking-widest text-black bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-all"><History size={14} /> History</button>
            )}
            <button className="text-gray-300 hover:text-red-500 transition-colors p-1" onClick={onClose}>
              <X size={24} />
            </button>
          </div>
        </div>
        
        {/* Body */}
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          {isStationeryRequest && isViewMode ? (
            /* --- POPUP CONTENT FOR VIEW MODE STATIONERY (APPROVAL) --- */
            <div className="space-y-8">
               <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                   {/* Requester Info - Read Only */}
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

                   {/* Request Type - Editable */}
                   <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                      <SectionHeader icon={Package} title="Request Setup" />
                      <div className="space-y-4">
                          <div>
                            <label className="text-[9px] font-black text-gray-400 uppercase block mb-1">Category</label>
                            <select 
                              className="w-full border border-gray-200 rounded-lg px-3 py-1.5 text-xs font-black bg-white uppercase shadow-sm" 
                              value={stationeryRequestForm.type} 
                              onChange={(e) => handleStationeryRequestChange('type', e.target.value)}
                            >
                                <option value="DAILY REQUEST">DAILY REQUEST</option>
                                <option value="EVENT REQUEST">EVENT REQUEST</option>
                            </select>
                          </div>
                          <div>
                            <label className="text-[9px] font-black text-gray-400 uppercase block mb-1">Submit Date</label>
                            <input 
                              type="date" 
                              className="w-full border border-gray-200 rounded-lg px-3 py-1.5 text-xs font-bold bg-white shadow-sm" 
                              value={stationeryRequestForm.date} 
                              onChange={(e) => handleStationeryRequestChange('date', e.target.value)} 
                            />
                          </div>
                      </div>
                   </div>

                   {/* Delivery & Status - Editable Delivery, Read Only Status */}
                   <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                      <SectionHeader icon={MapPin} title="Delivery & Status" />
                      <div className="space-y-4">
                          <div>
                            <label className="text-[9px] font-black text-gray-400 uppercase block mb-1">Location</label>
                            <select 
                              className="w-full border border-gray-200 rounded-lg px-3 py-1.5 text-xs font-black bg-white uppercase shadow-sm" 
                              value={stationeryRequestForm.location} 
                              onChange={(e) => handleStationeryRequestChange('location', e.target.value)}
                            >
                                <option value="MODENA Head Office">MODENA Head Office</option>
                                <option value="MODENA Kemang">MODENA Kemang</option>
                                <option value="Warehouse Cakung">Warehouse Cakung</option>
                            </select>
                          </div>
                          <div>
                            <label className="text-[9px] font-black text-gray-400 uppercase block mb-1">Status</label>
                            <span className={`inline-block mt-1 px-3 py-1 text-white text-[10px] font-black rounded uppercase ${initialAssetData?.status === 'Approved' ? 'bg-green-500' : 'bg-orange-500'}`}>{initialAssetData?.status}</span>
                          </div>
                      </div>
                   </div>
               </div>

               {/* ITEMS TABLE - Editable */}
               <div className="bg-white rounded-2xl border border-gray-200 shadow-xl overflow-hidden">
                  <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                    <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Inventory List</h4>
                    {isApprovalModule && <button onClick={addRequestItemRow} className="text-[9px] font-black uppercase tracking-widest px-3 py-1.5 bg-black text-white rounded-lg hover:bg-gray-800 transition-all">+ Add Row</button>}
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-white border-b border-gray-200 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                                <th className="px-8 py-4 w-12 text-center">#</th>
                                <th className="px-8 py-4 w-48">Category</th>
                                <th className="px-8 py-4">Item Name / Description</th>
                                <th className="px-8 py-4 w-28 text-center">Qty</th>
                                <th className="px-8 py-4 w-28 text-center">In Stock</th>
                                <th className="px-8 py-4 w-24 text-center">Unit</th>
                                <th className="px-8 py-4 w-16 text-center"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {requestItems.map((item, index) => {
                                const categoryList = isArkModule ? MOCK_ARK_CATEGORY : MOCK_ATK_CATEGORY;
                                const masterList = isArkModule ? MOCK_MASTER_ARK_DATA : MOCK_MASTER_DATA;
                                const filteredItems = item.categoryId ? masterList.filter(m => m.category === item.categoryId) : [];
                                const currentProduct = masterList.find(m => m.id.toString() === item.itemId);
                                
                                return (
                                    <tr key={index} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="px-8 py-4 text-center text-gray-300 font-bold text-[11px]">{index + 1}</td>
                                        <td className="px-8 py-4">
                                            <select 
                                                className="w-full border border-gray-100 rounded-lg px-2 py-1.5 text-[11px] font-bold bg-white" 
                                                value={item.categoryId} 
                                                onChange={(e) => handleRequestItemChange(index, 'categoryId', e.target.value)}
                                            >
                                                <option value="">Category...</option>
                                                {categoryList.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                                            </select>
                                        </td>
                                        <td className="px-8 py-4">
                                            <select 
                                                disabled={!item.categoryId}
                                                className={`w-full border border-gray-100 rounded-lg px-2 py-1.5 text-[11px] font-bold ${!item.categoryId ? 'bg-gray-50 text-gray-400' : 'text-black bg-white'}`} 
                                                value={item.itemId} 
                                                onChange={(e) => handleRequestItemChange(index, 'itemId', e.target.value)}
                                            >
                                                <option value="">{item.categoryId ? 'Search Product...' : 'Select category'}</option>
                                                {filteredItems.map(m => <option key={m.id} value={m.id}>{m.itemName}</option>)}
                                            </select>
                                        </td>
                                        <td className="px-8 py-4 text-center">
                                            <input type="number" className="w-20 border border-gray-100 rounded-lg px-2 py-1.5 text-[14px] font-black text-center bg-white" value={item.qty} onChange={(e) => handleRequestItemChange(index, 'qty', e.target.value)} />
                                        </td>
                                        <td className="px-8 py-4 text-center">
                                            <div className={`text-[13px] font-black ${currentProduct && currentProduct.remainingStock < 10 ? 'text-red-500' : 'text-gray-400'}`}>
                                                {currentProduct?.remainingStock || 0}
                                            </div>
                                        </td>
                                        <td className="px-8 py-4 text-center">
                                            <select 
                                                className="w-full border border-gray-100 rounded-lg px-1 py-1.5 text-[10px] font-black text-center uppercase bg-white" 
                                                value={item.uom} 
                                                onChange={(e) => handleRequestItemChange(index, 'uom', e.target.value)}
                                            >
                                                <option value="">UOM</option>
                                                {MOCK_UOM_DATA.map(u => <option key={u.id} value={u.name}>{u.name}</option>)}
                                            </select>
                                        </td>
                                        <td className="px-8 py-4 text-center">
                                          {isApprovalModule && <button onClick={() => removeRequestItemRow(index)} className="text-gray-300 hover:text-red-500 transition-all"><X size={16}/></button>}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                  </div>
                  <div className="p-6 bg-gray-50/50">
                    <textarea 
                      rows={2} 
                      className="w-full border border-gray-200 rounded-xl px-4 py-2 text-xs italic bg-white focus:border-black outline-none transition-all" 
                      placeholder="Add remarks..." 
                      value={stationeryRequestForm.remarks} 
                      onChange={(e) => handleStationeryRequestChange('remarks', e.target.value)} 
                    />
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
            /* --- CREATE MODE STATIONERY (MATCHING SCREENSHOT) --- */
             <div className="space-y-6">
                 {/* ORDER SETUP Section */}
                 <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                     <SectionHeader icon={FileText} title="ORDER SETUP" />
                     <div className="grid grid-cols-2 gap-8">
                         <div>
                            <label className="block text-[10px] font-black text-gray-400 uppercase mb-2">ORDER TYPE</label>
                            <div className="relative">
                                <select 
                                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-[12px] font-black bg-white uppercase appearance-none shadow-sm focus:border-black outline-none transition-all" 
                                    value={stationeryRequestForm.type} 
                                    onChange={(e) => handleStationeryRequestChange('type', e.target.value)}
                                >
                                    <option value="DAILY REQUEST">DAILY REQUEST</option>
                                    <option value="EVENT REQUEST">EVENT REQUEST</option>
                                </select>
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                                    <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7"></path></svg>
                                </div>
                            </div>
                         </div>
                         <div>
                            <label className="block text-[10px] font-black text-gray-400 uppercase mb-2">DATE</label>
                            <div className="relative">
                                <input 
                                    type="date" 
                                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-[12px] font-bold bg-white shadow-sm focus:border-black outline-none transition-all" 
                                    value={stationeryRequestForm.date} 
                                    onChange={(e) => handleStationeryRequestChange('date', e.target.value)} 
                                />
                            </div>
                         </div>
                     </div>
                 </div>

                 {/* ITEMS LIST Section */}
                 <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm relative">
                    <div className="flex justify-between items-center mb-6">
                        <SectionHeader icon={List} title="ITEMS LIST" />
                        <button 
                            onClick={addRequestItemRow} 
                            className="px-6 py-2 bg-black text-white text-[11px] font-black uppercase tracking-widest rounded-lg hover:bg-gray-800 transition-all flex items-center gap-2"
                        >
                            + ADD ROW
                        </button>
                    </div>
                    
                    <div className="overflow-hidden border border-gray-100 rounded-xl mb-6 shadow-sm">
                         <table className="w-full text-left">
                             <thead className="bg-[#F8F9FA] text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100">
                                 <tr>
                                     <th className="p-4 w-12 text-center">#</th>
                                     <th className="p-4 w-48">CATEGORY</th>
                                     <th className="p-4">PRODUCT NAME</th>
                                     <th className="p-4 w-28 text-center">IN STOCK</th>
                                     <th className="p-4 w-24 text-center">UOM</th>
                                     <th className="p-4 w-24 text-center">QTY</th>
                                     <th className="p-4 w-12 text-center"></th>
                                 </tr>
                             </thead>
                             <tbody className="divide-y divide-gray-50">
                                 {requestItems.map((item, idx) => {
                                     const categoryList = isArkModule ? MOCK_ARK_CATEGORY : MOCK_ATK_CATEGORY;
                                     const masterList = isArkModule ? MOCK_MASTER_ARK_DATA : MOCK_MASTER_DATA;
                                     const filteredItems = item.categoryId ? masterList.filter(m => m.category === item.categoryId) : [];
                                     const currentProduct = masterList.find(m => m.id.toString() === item.itemId);
                                     
                                     return (
                                     <tr key={idx} className="hover:bg-gray-50/20 transition-colors">
                                         <td className="p-4 text-center text-gray-300 font-black text-[12px]">{idx + 1}</td>
                                         <td className="p-4">
                                             <div className="relative">
                                                <select 
                                                    className="w-full border border-gray-200 rounded-full px-4 py-2 text-[11px] font-bold bg-white shadow-sm appearance-none focus:border-black outline-none" 
                                                    value={item.categoryId} 
                                                    onChange={(e) => handleRequestItemChange(idx, 'categoryId', e.target.value)}
                                                >
                                                    <option value="">Category...</option>
                                                    {categoryList.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                                                </select>
                                                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                                                    <svg className="w-3.5 h-3.5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7"></path></svg>
                                                </div>
                                             </div>
                                         </td>
                                         <td className="p-4">
                                             <div className="relative">
                                                <select 
                                                    disabled={!item.categoryId} 
                                                    className={`w-full border border-gray-200 rounded-full px-4 py-2 text-[11px] font-bold shadow-sm appearance-none focus:border-black outline-none transition-all ${!item.categoryId ? 'bg-gray-50 text-gray-400' : 'text-black bg-white'}`} 
                                                    value={item.itemId} 
                                                    onChange={(e) => handleRequestItemChange(idx, 'itemId', e.target.value)}
                                                >
                                                    <option value="">{item.categoryId ? 'Search Product...' : 'Select category'}</option>
                                                    {filteredItems.map(m => <option key={m.id} value={m.id}>{m.itemName}</option>)}
                                                </select>
                                                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                                                    <svg className="w-3.5 h-3.5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7"></path></svg>
                                                </div>
                                             </div>
                                         </td>
                                         <td className="p-4 text-center">
                                             {currentProduct ? <span className={`text-[13px] font-black ${currentProduct.remainingStock < 5 ? 'text-red-500' : 'text-gray-400'}`}>{currentProduct.remainingStock}</span> : <span className="text-gray-300 font-bold">-</span>}
                                         </td>
                                         <td className="p-4 text-center">
                                             <div className="bg-white border border-gray-200 rounded-lg px-2 py-1.5 text-[10px] font-black text-black inline-block min-w-[60px] shadow-sm uppercase">
                                                 {item.uom || 'UOM'}
                                             </div>
                                         </td>
                                         <td className="p-4 text-center">
                                            <input 
                                                type="number" 
                                                className="w-full border border-gray-200 rounded-lg px-2 py-1.5 text-sm font-black text-center bg-white shadow-sm focus:border-black outline-none" 
                                                value={item.qty} 
                                                onChange={(e) => handleRequestItemChange(idx, 'qty', e.target.value)} 
                                            />
                                         </td>
                                         <td className="p-4 text-center">
                                            <button onClick={() => removeRequestItemRow(idx)} className="text-gray-200 hover:text-red-500 transition-all">
                                                <X size={20} className="stroke-[3]" />
                                            </button>
                                         </td>
                                     </tr>
                                 )})}
                             </tbody>
                         </table>
                    </div>
                    
                    {/* Remarks field inside ITEMS LIST box but below table as per screenshot */}
                    <div className="border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                        <textarea 
                            rows={3} 
                            className="w-full p-4 text-[13px] font-medium italic text-black bg-white focus:border-black outline-none resize-none" 
                            placeholder="Add remarks..." 
                            value={stationeryRequestForm.remarks} 
                            onChange={(e) => handleStationeryRequestChange('remarks', e.target.value)} 
                        />
                    </div>
                 </div>
             </div>
          ) : (
            <div className="p-12 text-center text-gray-400 uppercase font-black text-[10px] tracking-widest">Detail View for {moduleName}</div>
          )}
        </div>

        {/* Footer */}
        <div className="px-8 py-6 bg-white border-t border-gray-100 flex justify-end gap-3 shrink-0">
          {isViewMode ? (
            isApprovalModule ? (
              <>
                <button onClick={onReject} className="px-8 py-3 text-[11px] font-black uppercase tracking-widest text-red-500 bg-red-50 border border-red-200 rounded-xl hover:bg-red-100 transition-all flex items-center gap-2"><XCircle size={14} /> Reject</button>
                <button onClick={onApprove} className="px-12 py-3 text-[11px] font-black uppercase tracking-widest text-white bg-black rounded-xl hover:bg-gray-800 shadow-xl shadow-black/20 transition-all active:scale-95 flex items-center gap-2"><Check size={14} /> Approve</button>
              </>
            ) : (
              <button onClick={onClose} className="px-10 py-3 text-[11px] font-black uppercase tracking-widest text-black bg-gray-100 rounded-xl hover:bg-gray-200 transition-all">Close</button>
            )
          ) : (
            <>
              <button onClick={onClose} className="px-10 py-3 text-[11px] font-black uppercase tracking-widest text-gray-400 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 hover:text-black transition-all">CANCEL</button>
              {isStationeryRequest && <button onClick={onClose} className="px-10 py-3 text-[11px] font-black uppercase tracking-widest text-gray-400 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 hover:text-black transition-all">DRAF</button>}
              <button onClick={handleSave} className="px-12 py-3 text-[11px] font-black uppercase tracking-widest text-white bg-black rounded-xl hover:bg-gray-800 shadow-xl shadow-black/20 transition-all active:scale-95">SAVE DATA</button>
            </>
          )}
        </div>
      </div>
      {renderApprovalHistory()}
    </div>
  );
};