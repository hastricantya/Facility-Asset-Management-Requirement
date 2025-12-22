
import React, { useState, useEffect } from 'react';
import { X, RefreshCcw, Plus, Trash2, Image as ImageIcon, List, Calendar, PlusCircle, Settings, Clock, CheckCircle, XCircle, FileText, Archive, ChevronLeft, Printer, Download, History, User, Wrench, DollarSign, Edit3, Check, Ban, Package, MapPin, Users, MessageSquare } from 'lucide-react';
import { VehicleRecord, ServiceRecord, MutationRecord, SalesRecord, ContractRecord, GeneralMasterItem, MasterVendorRecord, StationeryRequestRecord, StationeryRequestItem, DeliveryLocationRecord, AssetRecord, LogBookRecord, TaxKirRecord } from '../types';
import { useLanguage } from '../contexts/LanguageContext';
import { MOCK_MASTER_DATA, MOCK_MASTER_ARK_DATA } from '../constants';

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
  
  // -- Local States --
  const defaultContractForm: Partial<ContractRecord> = {
    assetNumber: '[Auto Generate]',
    assetCategory: 'Building',
    type: '',
    ownership: 'Rent',
    location: '',
    channel: '',
    department: '',
    subLocation: '',
    address: '',
    status: 'Active'
  };

  const [contractForm, setContractForm] = useState<Partial<ContractRecord>>(defaultContractForm);
  const [vehicleForm, setVehicleForm] = useState<Partial<VehicleRecord>>({});
  const [serviceForm, setServiceForm] = useState<Partial<ServiceRecord>>({
      jenisServis: 'Servis Rutin',
      jenisPembayaran: 'Kasbon'
  });
  const [taxKirForm, setTaxKirForm] = useState<Partial<TaxKirRecord>>({
      jenis: 'KIR',
      jenisPembayaran: 'Kasbon',
      tglRequest: new Date().toISOString().split('T')[0]
  });
  const [mutationForm, setMutationForm] = useState<Partial<MutationRecord>>({});
  const [salesForm, setSalesForm] = useState<Partial<SalesRecord>>({});
  const [masterForm, setMasterForm] = useState<Partial<GeneralMasterItem>>({});
  const [masterVendorForm, setMasterVendorForm] = useState<Partial<MasterVendorRecord>>({});
  const [stationeryRequestForm, setStationeryRequestForm] = useState<Partial<StationeryRequestRecord>>({
      type: 'Permintaan Bulanan',
      deliveryType: 'Dikirim',
      location: 'MODENA Head Office',
      date: new Date().toISOString().split('T')[0]
  });
  const [deliveryLocationForm, setDeliveryLocationForm] = useState<Partial<DeliveryLocationRecord>>({});
  const [logBookForm, setLogBookForm] = useState<Partial<LogBookRecord>>({
      lokasiModena: '',
      kategoriTamu: 'Customer',
      namaTamu: '',
      tanggalKunjungan: new Date().toISOString().split('T')[0],
      jamDatang: '',
      jamPulang: '',
      wanita: 0,
      lakiLaki: 0,
      anakAnak: 0,
      note: ''
  });
  const [requestItems, setRequestItems] = useState<StationeryRequestItem[]>([{ itemId: '', qty: '' }]);
  
  // State for Approval History Modal
  const [showApprovalHistory, setShowApprovalHistory] = useState(false);

  useEffect(() => {
    if (isOpen) {
        if (mode === 'edit' || mode === 'view') {
           if (initialContractData) setContractForm(initialContractData);
           if (initialVehicleData) setVehicleForm(initialVehicleData);
           if (initialServiceData) setServiceForm(initialServiceData);
           if (initialTaxKirData) setTaxKirForm(initialTaxKirData);
           if (initialMutationData) setMutationForm(initialMutationData);
           if (initialSalesData) setSalesForm(initialSalesData);
           if (initialMasterData) setMasterForm(initialMasterData);
           if (initialMasterVendorData) setMasterVendorForm(initialMasterVendorData);
           if (initialDeliveryLocationData) setDeliveryLocationForm(initialDeliveryLocationData);
           if (initialLogBookData) setLogBookForm(initialLogBookData);
           
           if (initialAssetData) {
               const isArk = moduleName?.includes('ARK') || false;
               const masterList = isArk ? MOCK_MASTER_ARK_DATA : MOCK_MASTER_DATA;
               const matchedMaster = masterList.find(m => m.itemName === initialAssetData.itemName);
               
               let formattedDate = new Date().toISOString().split('T')[0];
               if (initialAssetData.date) {
                   const parts = initialAssetData.date.split('/');
                   if (parts.length === 3) {
                       formattedDate = `${parts[2]}-${parts[1]}-${parts[0]}`;
                   }
               }

               setStationeryRequestForm({
                   type: 'Permintaan Bulanan',
                   date: formattedDate,
                   remarks: initialAssetData.itemDescription || '',
                   deliveryType: 'Dikirim',
                   location: 'MODENA Head Office'
               });

               setRequestItems([{ 
                   itemId: matchedMaster ? matchedMaster.id.toString() : '', 
                   qty: initialAssetData.qty ? initialAssetData.qty.toString() : '0'
               }]);
           }
        } else {
            setContractForm(defaultContractForm);
            setVehicleForm({});
            setServiceForm({ jenisServis: 'Servis Rutin', jenisPembayaran: 'Kasbon' });
            setTaxKirForm({ jenis: 'KIR', jenisPembayaran: 'Kasbon', tglRequest: new Date().toISOString().split('T')[0] });
            setMutationForm({});
            setSalesForm({});
            setMasterForm({});
            setMasterVendorForm({});
            setStationeryRequestForm({ type: 'Permintaan Bulanan', deliveryType: 'Dikirim', location: 'MODENA Head Office', date: new Date().toISOString().split('T')[0] });
            setRequestItems([{ itemId: '', qty: '' }]);
            setDeliveryLocationForm({});
            setLogBookForm({ lokasiModena: '', kategoriTamu: 'Customer', namaTamu: '', tanggalKunjungan: new Date().toISOString().split('T')[0], jamDatang: '', jamPulang: '', wanita: 0, lakiLaki: 0, anakAnak: 0, note: '' });
        }
    }
  }, [isOpen, initialContractData, initialVehicleData, initialServiceData, initialTaxKirData, initialMutationData, initialSalesData, initialMasterData, initialMasterVendorData, initialDeliveryLocationData, initialLogBookData, initialAssetData, mode, moduleName]);

  const Required = () => <span className="text-red-600 font-bold ml-0.5">*</span>;

  const handleSave = () => {
      if (moduleName === 'Contract' && onSaveContract) onSaveContract(contractForm);
      if (moduleName === 'Daftar Aset' && onSaveVehicle) onSaveVehicle(vehicleForm);
      if (moduleName === 'Servis' && onSaveService) onSaveService(serviceForm);
      if (moduleName === 'Pajak & KIR' && onSaveTaxKir) onSaveTaxKir(taxKirForm);
      if (moduleName === 'Mutasi' && onSaveMutation) onSaveMutation(mutationForm);
      if (moduleName === 'Penjualan' && onSaveSales) onSaveSales(salesForm);
      if (moduleName === 'Master Vendor' && onSaveMasterVendor) onSaveMasterVendor(masterVendorForm);
      if (moduleName === 'Master Delivery Location' && onSaveDeliveryLocation) onSaveDeliveryLocation(deliveryLocationForm);
      if (moduleName === 'Log Book' && onSaveLogBook) onSaveLogBook(logBookForm);
      if ((moduleName === 'Daftar ATK' || moduleName === 'Daftar ARK') && onSaveStationeryRequest) onSaveStationeryRequest({ ...stationeryRequestForm, items: requestItems });
      if (onSaveMaster && !moduleName?.includes('Contract') && !moduleName?.includes('Vendor') && !moduleName?.includes('ATK') && !moduleName?.includes('ARK') && !moduleName?.includes('Log Book')) onSaveMaster(masterForm);
      onClose();
  }

  const handleServiceChange = (field: keyof ServiceRecord, value: string) => setServiceForm(prev => ({ ...prev, [field]: value }));
  const handleTaxKirChange = (field: keyof TaxKirRecord, value: string) => {
      setTaxKirForm(prev => {
          const newState = { ...prev, [field]: value };
          if (field === 'aset') {
              const selectedVehicle = vehicleList.find(v => v.nama === value);
              if (selectedVehicle) {
                  newState.noPolisi = selectedVehicle.noPolisi;
                  newState.tahunPembuatan = selectedVehicle.tahunPembuatan || '-';
                  newState.cabang = selectedVehicle.cabang;
                  newState.channel = selectedVehicle.channel;
              }
          }
          return newState;
      });
  };

  const handleMasterChange = (value: string) => setMasterForm(prev => ({ ...prev, name: value }));
  const handleLogBookChange = (field: keyof LogBookRecord, value: any) => setLogBookForm(prev => ({ ...prev, [field]: value }));
  const handleStationeryRequestChange = (field: keyof StationeryRequestRecord, value: any) => setStationeryRequestForm(prev => ({ ...prev, [field]: value }));

  const handleRequestItemChange = (index: number, field: keyof StationeryRequestItem, value: string) => {
      const newItems = [...requestItems];
      newItems[index] = { ...newItems[index], [field]: value };
      setRequestItems(newItems);
  }

  const addRequestItemRow = () => setRequestItems([...requestItems, { itemId: '', qty: '' }]);
  const removeRequestItemRow = (index: number) => {
      if (requestItems.length > 1) setRequestItems(requestItems.filter((_, i) => i !== index));
  }

  const SectionHeader = ({ icon: Icon, title }: { icon: any, title: string }) => (
    <div className="flex items-center gap-3 mb-6 pb-2 border-b border-gray-100">
        <Icon size={18} className="text-black" />
        <h3 className="text-[10px] font-black text-black uppercase tracking-[0.2em]">{title}</h3>
    </div>
  );

  const isStationeryRequest = moduleName === 'Daftar ATK' || moduleName === 'Daftar ARK' || moduleName === 'Stationery Request Approval' || moduleName === 'Household Request Approval';
  const isApprovalModule = moduleName?.includes('Approval');
  const isMasterATK = moduleName === 'Master ATK';
  const isMasterARK = moduleName === 'Master ARK';
  const isDeliveryLocation = moduleName === 'Master Delivery Location';
  const isLogBook = moduleName === 'Log Book';
  const isContract = moduleName === 'Contract';
  const isViewMode = mode === 'view';
  const isMasterVendor = moduleName === 'Master Vendor';
  const isService = moduleName === 'Servis';
  
  const isMaster = !isContract && !isStationeryRequest && !isLogBook && !isMasterATK && !isMasterARK && !isDeliveryLocation && !isService && !isMasterVendor && moduleName !== 'Daftar Aset' && moduleName !== 'Pajak & KIR' && moduleName !== 'Mutasi' && moduleName !== 'Penjualan';

  // Extract unique categories for ATK and ARK Master forms
  const arkCategories = Array.from(new Set(MOCK_MASTER_ARK_DATA.map(item => item.category)));
  const atkCategories = Array.from(new Set(MOCK_MASTER_DATA.map(item => item.category)));
  const currentCategories = isMasterARK ? arkCategories : atkCategories;

  const renderApprovalHistory = () => {
    if (!showApprovalHistory) return null;
    return (
        <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center backdrop-blur-sm p-4">
            <div className="bg-white w-full max-w-3xl rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
                <div className="px-6 py-5 border-b border-gray-100 flex items-start justify-between">
                    <div>
                        <h2 className="text-lg font-bold text-gray-900">Approval History</h2>
                        <p className="text-sm text-gray-500 mt-1">Document Number: {initialAssetData?.transactionNumber || 'PR/067/TNN/12.25'}</p>
                    </div>
                    <button onClick={() => setShowApprovalHistory(false)} className="text-gray-400 hover:text-gray-600 transition-colors p-1"><X size={24} /></button>
                </div>
                <div className="p-8 overflow-y-auto bg-gray-50/50">
                    <div className="relative">
                        <div className="absolute left-6 top-8 bottom-8 w-0.5 bg-gray-200"></div>
                        <div className="relative flex gap-6">
                             <div className="relative z-10 w-12 h-12 rounded-full bg-[#00C853] flex items-center justify-center shadow-sm border-4 border-white"><CheckCircle className="text-white" size={20} /></div>
                             <div className="flex-1 bg-white rounded-lg border border-gray-200 p-5 shadow-sm">
                                <div className="flex justify-between items-start mb-2"><h4 className="font-bold text-gray-900 text-sm">Approved by Ibnu Faisal Abbas</h4><span className="px-3 py-1 bg-green-50 text-green-600 text-xs font-medium rounded-full">Completed</span></div>
                                <div className="flex items-center gap-4 text-xs text-gray-500 mb-3"><div className="flex items-center gap-1"><User size={12} /> Ibnu Faisal Abbas</div><div className="flex items-center gap-1"><Calendar size={12} /> 2025-12-15 15:22:43</div></div>
                                <div className="text-sm text-gray-800 mb-1"><span className="font-bold">Remarks:</span> Add door assemble</div>
                             </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
  }

  if (!isOpen) return null;

  if (isStationeryRequest && isViewMode) {
      const isArk = moduleName === 'Daftar ARK' || moduleName === 'Household Request Approval';
      const titleLabel = isArk ? 'Household Request' : 'Stationery Request';
      const trxNumber = initialAssetData?.transactionNumber || '[Auto Generated]';
      const status = initialAssetData?.status || 'Draft';
      const masterList = isArk ? MOCK_MASTER_ARK_DATA : MOCK_MASTER_DATA;

      const getStatusColor = (s: string) => {
          if (s === 'Approved') return 'bg-green-50 border-green-100 text-green-700';
          if (s === 'Rejected') return 'bg-red-50 border-red-100 text-red-700';
          if (s === 'Closed') return 'bg-gray-100 border-gray-200 text-gray-700';
          return 'bg-yellow-50 border-yellow-100 text-yellow-700';
      }
      const getStatusIcon = (s: string) => {
        if (s === 'Approved') return <CheckCircle size={16} />;
        if (s === 'Rejected') return <XCircle size={16} />;
        if (s === 'Closed') return <Archive size={16} />;
        return <Clock size={16} />;
      }
      
      return (
        <>
        <div className="fixed inset-0 bg-gray-50 z-50 flex flex-col">
             <div className="bg-white border-b border-gray-200 shrink-0 px-8 py-4 flex items-center justify-between z-10 shadow-sm">
                 <div className="flex items-center gap-4">
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-all text-black hover:rotate-90" title="Kembali"><ChevronLeft size={24} /></button>
                    <div>
                         <h1 className="text-2xl font-black text-black tracking-tighter uppercase">{titleLabel}</h1>
                         <div className="flex items-center gap-3 mt-1">
                             <span className="px-2 py-0.5 bg-black text-white text-[9px] font-black tracking-widest rounded uppercase">ID: {trxNumber}</span>
                             <span className={`px-2 py-0.5 text-[9px] font-black tracking-widest rounded flex items-center gap-1 uppercase border ${getStatusColor(status)}`}>{getStatusIcon(status)} STATUS: {status}</span>
                         </div>
                    </div>
                 </div>
                 <div className="flex items-center gap-3">
                     <button onClick={() => setShowApprovalHistory(true)} className="flex items-center gap-2 px-6 py-2.5 text-[11px] font-black uppercase tracking-widest text-black bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-all"><History size={16} /> History</button>
                     <button className="flex items-center gap-2 px-6 py-2.5 text-[11px] font-black uppercase tracking-widest text-white bg-black rounded-xl hover:bg-gray-900 transition-all shadow-xl shadow-black/10"><Printer size={16} /> Print</button>
                 </div>
             </div>
             
             <div className="flex-1 overflow-y-auto p-12 custom-scrollbar bg-[#FBFBFB]">
                 <div className="max-w-6xl mx-auto space-y-12 pb-24">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                        {/* Requester Info */}
                        <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-gray-50 -mr-12 -mt-12 rounded-full opacity-50"></div>
                            <div className="relative z-10">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-8 h-8 bg-black text-white flex items-center justify-center rounded-lg"><User size={16} /></div>
                                    <h3 className="text-[10px] font-black text-black uppercase tracking-[0.2em]">Requester Info</h3>
                                </div>
                                <div className="space-y-6">
                                    <div><label className="block text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1.5">Employee Name</label><div className="text-[14px] font-black text-black uppercase">{initialAssetData?.employee.name}</div></div>
                                    <div><label className="block text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1.5">Position / Role</label><div className="text-[12px] font-bold text-gray-600">{initialAssetData?.employee.role}</div></div>
                                    <div><label className="block text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1.5">Contact</label><div className="text-[12px] font-mono text-gray-600">{initialAssetData?.employee.phone}</div></div>
                                </div>
                            </div>
                        </div>

                        {/* Order Details */}
                        <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-8 h-8 bg-black text-white flex items-center justify-center rounded-lg"><Package size={16} /></div>
                                <h3 className="text-[10px] font-black text-black uppercase tracking-[0.2em]">Order Details</h3>
                            </div>
                            <div className="space-y-6">
                                <div><label className="block text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1.5">Submission Date</label><div className="text-[14px] font-black text-black">{initialAssetData?.date}</div></div>
                                <div><label className="block text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1.5">Request Type</label><div className="text-[12px] font-bold text-gray-600">{stationeryRequestForm.type}</div></div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div><label className="block text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1.5">Method</label><div className="text-[12px] font-bold text-gray-600">{stationeryRequestForm.deliveryType}</div></div>
                                </div>
                            </div>
                        </div>

                        {/* Location */}
                        <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-8 h-8 bg-black text-white flex items-center justify-center rounded-lg"><MapPin size={16} /></div>
                                <h3 className="text-[10px] font-black text-black uppercase tracking-[0.2em]">Delivery Point</h3>
                            </div>
                            <div className="space-y-6">
                                <div><label className="block text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1.5">MODENA Location</label><div className="text-[14px] font-black text-black uppercase">{stationeryRequestForm.location}</div></div>
                                <div><label className="block text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1.5">Comments / Remarks</label><div className="text-[12px] font-medium text-gray-500 italic">"{stationeryRequestForm.remarks || 'No special instructions provided.'}"</div></div>
                            </div>
                        </div>
                    </div>

                    {/* Items Table */}
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-xl shadow-black/5 overflow-hidden">
                        <div className="px-8 py-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-6 bg-black rounded-full"></div>
                                <h3 className="font-black text-black text-[11px] uppercase tracking-[0.2em]">Requested Asset Items</h3>
                            </div>
                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest bg-white border border-gray-200 px-3 py-1 rounded-lg">TOTAL: {requestItems.length} ITEM(S)</span>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-white border-b border-gray-100 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                                        <th className="px-8 py-5 w-16 text-center">#</th>
                                        <th className="px-8 py-5 w-40">Part Code</th>
                                        <th className="px-8 py-5">Nomenclature / Description</th>
                                        <th className="px-8 py-5 w-40">Category</th>
                                        <th className="px-8 py-5 w-32 text-center">Quantity</th>
                                        <th className="px-8 py-5 w-24 text-center">Unit</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {requestItems.map((item, index) => {
                                        const masterItem = masterList.find(m => m.id.toString() === item.itemId);
                                        return (
                                            <tr key={index} className="hover:bg-gray-50/50 transition-colors">
                                                <td className="px-8 py-6 text-center text-gray-300 font-bold text-[11px]">{index + 1}</td>
                                                <td className="px-8 py-6"><span className="font-mono text-[11px] font-black text-gray-400 bg-gray-100 px-2 py-1 rounded">{masterItem?.itemCode || 'N/A'}</span></td>
                                                <td className="px-8 py-6"><div className="font-black text-black text-[13px] uppercase tracking-tight">{masterItem?.itemName || 'Unknown Item'}</div></td>
                                                <td className="px-8 py-6"><span className="text-[11px] font-bold text-gray-500 uppercase tracking-tighter">{masterItem?.category || 'General'}</span></td>
                                                <td className="px-8 py-6 text-center"><div className="text-[16px] font-black text-black">{item.qty}</div></td>
                                                <td className="px-8 py-6 text-center"><div className="text-[11px] font-black text-gray-400 uppercase tracking-widest">{masterItem?.uom || 'PCS'}</div></td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                 
                    {isApprovalModule && (
                        <div className="flex items-center justify-end gap-4 mt-12 bg-white p-6 rounded-2xl border border-gray-100 shadow-xl shadow-black/5">
                            <button 
                                onClick={() => { if(confirm(t('Reject') + '?')) onClose(); }}
                                className="px-10 py-4 text-[11px] font-black uppercase tracking-widest text-white bg-red-600 rounded-xl hover:bg-red-700 transition-all shadow-lg shadow-red-100 active:scale-95"
                            >
                                {t('Reject')}
                            </button>
                            <button 
                                onClick={() => { onRevise?.(); }}
                                className="px-10 py-4 text-[11px] font-black uppercase tracking-widest text-black bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-all active:scale-95"
                            >
                                {t('Revise')}
                            </button>
                            <button 
                                onClick={() => { if(confirm(t('Approve') + '?')) onClose(); }}
                                className="px-12 py-4 text-[11px] font-black uppercase tracking-widest text-white bg-black rounded-xl hover:bg-gray-900 transition-all shadow-xl shadow-black/20 active:scale-95"
                            >
                                {t('Approve')}
                            </button>
                        </div>
                    )}
                 </div>
             </div>
        </div>
        {renderApprovalHistory()}
        </>
      );
  }
  
  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center backdrop-blur-[2px] p-4 transition-opacity duration-300">
      <div className={`bg-white w-full ${isMaster || isDeliveryLocation ? 'max-w-md' : (moduleName === 'Daftar Aset' || isService || moduleName === 'Mutasi' || moduleName === 'Penjualan' || isContract || isMasterVendor || isLogBook || isStationeryRequest || isMasterATK || isMasterARK ? 'max-w-7xl' : 'max-w-5xl')} rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] transform transition-all scale-100`}>
        <div className="px-8 py-5 bg-white border-b border-gray-100 flex items-center justify-between">
          <div>
              <h2 className="text-lg font-bold tracking-tight text-gray-900 uppercase tracking-tighter">
                {moduleName === 'Servis' ? t('Buat Permintaan') : 
                 moduleName === 'Pajak & KIR' ? 'Tambah Request KIR / Pajak Kendaraan' :
                 isContract ? (mode === 'create' ? t('Add Asset') : 'Asset Data Detail') : 
                 isStationeryRequest ? (mode === 'create' ? (moduleName === 'Daftar ATK' ? 'Create Stationery Request' : 'Create Household Request') : `Edit Request`) :
                 isLogBook ? (mode === 'view' ? 'Detail Tamu' : t('Tambah Tamu')) :
                 moduleName === 'Daftar Aset' ? t('Daftar Aset Kendaraan') : 
                 isMasterATK ? 'Master Stationery' :
                 isMasterARK ? 'Master Household' :
                 moduleName}
              </h2>
          </div>
          <button className="text-gray-400 hover:text-red-500 transition-colors p-1 rounded-full hover:bg-gray-100" onClick={onClose}>
            <X size={20} className="cursor-pointer"/>
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar bg-[#F8F9FA]">
          {isLogBook ? (
             <div className="space-y-8">
                {/* Information Section */}
                <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm space-y-8">
                    <SectionHeader icon={List} title={t('Log Book Tamu Input')} />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">{t('Lokasi MODENA')} <Required/></label>
                            <div className="relative">
                                <MapPin size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                <select 
                                    className="w-full border border-gray-200 rounded-xl pl-12 pr-4 py-3 text-sm font-bold text-black focus:outline-none focus:border-black bg-white appearance-none" 
                                    value={logBookForm.lokasiModena} 
                                    onChange={(e) => handleLogBookChange('lokasiModena', e.target.value)} 
                                    disabled={isViewMode}
                                >
                                    <option value="">{t('Pilih Tempat')}</option>
                                    <option value="MODENA Head Office">{t('MODENA Head Office')}</option>
                                    <option value="MODENA Kemang">{t('MODENA Kemang')}</option>
                                    <option value="MODENA Suryo">{t('MODENA Suryo')}</option>
                                    <option value="Warehouse Cakung">{t('Warehouse Cakung')}</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">{t('Kategori Tamu')} <Required/></label>
                            <select 
                                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold text-black focus:outline-none focus:border-black bg-[#FFF9C4]/20 appearance-none" 
                                value={logBookForm.kategoriTamu} 
                                onChange={(e) => handleLogBookChange('kategoriTamu', e.target.value)} 
                                disabled={isViewMode}
                            >
                                <option value="Customer">Customer</option>
                                <option value="Supplier">Supplier</option>
                                <option value="Partner">Partner</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">{t('Nama Tamu')} <Required/></label>
                            <input 
                                type="text" 
                                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold text-black focus:outline-none focus:border-black bg-white" 
                                value={logBookForm.namaTamu} 
                                onChange={(e) => handleLogBookChange('namaTamu', e.target.value)} 
                                disabled={isViewMode} 
                                placeholder="Input Full Name..." 
                            />
                        </div>
                        <div>
                            <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">{t('Tanggal Kunjungan')}</label>
                            <div className="relative">
                                <Calendar size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input 
                                    type="date" 
                                    className="w-full border border-gray-200 rounded-xl pl-12 pr-4 py-3 text-sm font-bold text-black focus:outline-none focus:border-black bg-white" 
                                    value={logBookForm.tanggalKunjungan} 
                                    onChange={(e) => handleLogBookChange('tanggalKunjungan', e.target.value)} 
                                    disabled={isViewMode} 
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">{t('Jam Datang')}</label>
                                <input 
                                    type="time" 
                                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold text-black focus:outline-none focus:border-black bg-white" 
                                    value={logBookForm.jamDatang} 
                                    onChange={(e) => handleLogBookChange('jamDatang', e.target.value)} 
                                    disabled={isViewMode} 
                                />
                            </div>
                            <div>
                                <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">{t('Jam Pulang')}</label>
                                <input 
                                    type="time" 
                                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold text-black focus:outline-none focus:border-black bg-white" 
                                    value={logBookForm.jamPulang} 
                                    onChange={(e) => handleLogBookChange('jamPulang', e.target.value)} 
                                    disabled={isViewMode} 
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Guest Count Section */}
                <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm space-y-8">
                    <SectionHeader icon={Users} title={t('Guest Breakdown')} />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div>
                            <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">{t('Wanita')}</label>
                            <input 
                                type="number" 
                                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-black text-black text-center focus:outline-none focus:border-black bg-white" 
                                value={logBookForm.wanita} 
                                onChange={(e) => handleLogBookChange('wanita', parseInt(e.target.value) || 0)} 
                                disabled={isViewMode} 
                                min="0"
                            />
                        </div>
                        <div>
                            <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">{t('Laki-Laki')}</label>
                            <input 
                                type="number" 
                                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-black text-black text-center focus:outline-none focus:border-black bg-white" 
                                value={logBookForm.lakiLaki} 
                                onChange={(e) => handleLogBookChange('lakiLaki', parseInt(e.target.value) || 0)} 
                                disabled={isViewMode} 
                                min="0"
                            />
                        </div>
                        <div>
                            <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">{t('Anak-Anak')}</label>
                            <input 
                                type="number" 
                                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-black text-black text-center focus:outline-none focus:border-black bg-white" 
                                value={logBookForm.anakAnak} 
                                onChange={(e) => handleLogBookChange('anakAnak', parseInt(e.target.value) || 0)} 
                                disabled={isViewMode} 
                                min="0"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">{t('Note')}</label>
                        <div className="relative">
                            <MessageSquare size={16} className="absolute left-4 top-4 text-gray-400" />
                            <textarea 
                                rows={3} 
                                className="w-full border border-gray-200 rounded-xl pl-12 pr-4 py-3 text-sm font-medium text-black focus:outline-none focus:border-black bg-white resize-none shadow-sm transition-all" 
                                value={logBookForm.note} 
                                onChange={(e) => handleLogBookChange('note', e.target.value)} 
                                disabled={isViewMode}
                                placeholder={t('Note')}
                            ></textarea>
                        </div>
                    </div>
                </div>
             </div>
          ) : isStationeryRequest && !isViewMode ? (
             <div className="space-y-8">
                 <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
                     <SectionHeader icon={FileText} title={t('Form Request')} />
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                         <div>
                             <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">{t('Pilih Kebutuhan')} <Required/></label>
                             <select className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold text-black focus:outline-none focus:border-black bg-white appearance-none" value={stationeryRequestForm.type} onChange={(e) => handleStationeryRequestChange('type', e.target.value)}>
                                 <option value="Permintaan Bulanan">{t('Permintaan Bulanan')}</option>
                                 <option value="Permintaan Khusus">{t('Permintaan Khusus')}</option>
                             </select>
                         </div>
                         <div>
                             <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">{t('Tanggal Request')}</label>
                             <input type="date" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold text-black focus:outline-none focus:border-black bg-white" value={stationeryRequestForm.date} onChange={(e) => handleStationeryRequestChange('date', e.target.value)} />
                         </div>
                     </div>
                 </div>
                 <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
                     <div className="flex justify-between items-center mb-6 pb-2 border-b border-gray-100">
                         <div className="flex items-center gap-3">
                             <List size={20} className="text-black" strokeWidth={3} />
                             <h3 className="text-xs font-black text-black uppercase tracking-widest">{t('Items')}</h3>
                         </div>
                         <button onClick={addRequestItemRow} className="flex items-center gap-2 px-4 py-2 text-[10px] font-black uppercase tracking-widest text-white bg-black rounded-xl hover:bg-gray-800 transition-all active:scale-95"><Plus size={14} /> {t('Add More')}</button>
                     </div>
                     <div className="overflow-hidden border border-gray-100 rounded-2xl mb-6">
                         <table className="w-full text-left border-collapse">
                             <thead className="bg-[#FAFAFA] text-[10px] font-black text-gray-400 uppercase tracking-widest">
                                 <tr>
                                     <th className="p-4 w-16 text-center">#</th>
                                     <th className="p-4">{moduleName === 'Daftar ATK' ? t('Pilih jenis item ATK') : t('Pilih jenis item ARK')}</th>
                                     <th className="p-4 w-40 text-center">{t('Jumlah')}</th>
                                     <th className="p-4 w-20 text-center">Action</th>
                                 </tr>
                             </thead>
                             <tbody className="divide-y divide-gray-50">
                                 {requestItems.map((item, index) => {
                                     const isArk = moduleName === 'Daftar ARK' || moduleName === 'Household Request Approval';
                                     const masterList = isArk ? MOCK_MASTER_ARK_DATA : MOCK_MASTER_DATA;
                                     return (
                                     <tr key={index} className="hover:bg-gray-50/50 transition-colors">
                                         <td className="p-4 text-center text-gray-300 font-bold text-[11px]">{index + 1}</td>
                                         <td className="p-4">
                                             <select className="w-full border border-gray-200 rounded-xl px-3 py-2 text-[13px] font-bold text-black focus:outline-none focus:border-black bg-white" value={item.itemId} onChange={(e) => handleRequestItemChange(index, 'itemId', e.target.value)}>
                                                 <option value="">{isArk ? t('Search ARK') : t('Search ATK')}...</option>
                                                 {masterList.map(m => ( <option key={m.id} value={m.id}>{m.itemName} ({m.itemCode})</option> ))}
                                             </select>
                                         </td>
                                         <td className="p-4">
                                             <input type="number" className="w-full border border-gray-200 rounded-xl px-3 py-2 text-[13px] font-black text-black text-center focus:outline-none focus:border-black bg-white" value={item.qty} onChange={(e) => handleRequestItemChange(index, 'qty', e.target.value)} placeholder="0" />
                                         </td>
                                         <td className="p-4 text-center">
                                             <button onClick={() => removeRequestItemRow(index)} className="text-gray-300 hover:text-red-500 transition-all p-2 rounded-lg hover:bg-red-50"><Trash2 size={18} /></button>
                                         </td>
                                     </tr>
                                 )})}
                             </tbody>
                         </table>
                     </div>
                     <div>
                         <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">{t('Remarks')}</label>
                         <textarea rows={3} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium text-black focus:outline-none focus:border-black bg-white resize-none shadow-sm transition-all" value={stationeryRequestForm.remarks} onChange={(e) => handleStationeryRequestChange('remarks', e.target.value)} placeholder={t('Isi Remarks')}></textarea>
                     </div>
                 </div>
                 <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
                     <SectionHeader icon={Archive} title={t('Alamat Pengiriman')} />
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                         <div>
                             <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">{t('Dikirim')} / {t('Ambil di HO')}</label>
                             <select className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold text-black focus:outline-none focus:border-black bg-white appearance-none" value={stationeryRequestForm.deliveryType} onChange={(e) => handleStationeryRequestChange('deliveryType', e.target.value)}>
                                 <option value="Dikirim">{t('Dikirim')}</option>
                                 <option value="Ambil di HO">{t('Ambil di HO')}</option>
                             </select>
                         </div>
                         <div>
                             <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">{t('Pilih Tempat')}</label>
                             <select className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold text-black focus:outline-none focus:border-black bg-white appearance-none" value={stationeryRequestForm.location} onChange={(e) => handleStationeryRequestChange('location', e.target.value)} disabled={stationeryRequestForm.deliveryType === 'Ambil di HO'}>
                                 <option value="MODENA Head Office">{t('MODENA Head Office')}</option>
                                 <option value="MODENA Kemang">{t('MODENA Kemang')}</option>
                                 <option value="MODENA Suryo">{t('MODENA Suryo')}</option>
                                 <option value="Warehouse Cakung">{t('Warehouse Cakung')}</option>
                             </select>
                         </div>
                     </div>
                 </div>
             </div>
          ) : isMasterATK || isMasterARK ? (
            /* --- MASTER ATK/ARK FORM --- */
            <div className="space-y-8">
                <div className="bg-black/5 p-8 rounded-2xl border border-black/10">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-8 h-8 bg-black text-white flex items-center justify-center rounded-lg"><Settings size={16} /></div>
                        <h3 className="text-[10px] font-black text-black uppercase tracking-[0.2em]">{isMasterARK ? 'Household Master' : 'Stationery Master'}</h3>
                    </div>
                    <div className="grid grid-cols-1 gap-6">
                        <div className="grid grid-cols-12 gap-6 items-center">
                            <div className="col-span-3">
                                <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest">Category <Required/></label>
                            </div>
                            <div className="col-span-9">
                                <select className="w-full bg-[#FFF9C4]/40 border border-gray-200 rounded-xl px-4 py-3 text-sm font-black text-black focus:outline-none focus:border-black appearance-none">
                                    {currentCategories.map(cat => (
                                        <option key={cat} value={cat}>{cat}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-12 gap-6 items-center">
                            <div className="col-span-3">
                                <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest">Item Name <Required/></label>
                            </div>
                            <div className="col-span-9">
                                <input type="text" placeholder="e.g. KENKO Joyko K-1 0.5 mm Hitam" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold text-black focus:outline-none focus:border-black shadow-sm" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white pt-2 space-y-6">
                    <div className="grid grid-cols-12 gap-6 items-center">
                        <div className="col-span-3">
                            <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest">Current Stock <Required/></label>
                        </div>
                        <div className="col-span-4">
                             <input type="number" defaultValue="48" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-base font-black text-black focus:outline-none focus:border-black shadow-sm" />
                        </div>
                        <div className="col-span-1 text-right">
                             <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest">Unit</label>
                        </div>
                         <div className="col-span-4">
                             <select className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm font-black text-black focus:outline-none focus:border-black shadow-sm appearance-none">
                                <option>PCS</option>
                                <option>RIM</option>
                                <option>BOX</option>
                                <option>PACK</option>
                             </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-12 gap-6 items-center">
                        <div className="col-span-3">
                            <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest">Safety Stock</label>
                        </div>
                        <div className="col-span-3">
                             <input type="number" defaultValue="10" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold text-black focus:outline-none focus:border-black shadow-sm" />
                        </div>
                         <div className="col-span-3 text-right">
                            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest">Cap Stock</label>
                        </div>
                        <div className="col-span-3">
                             <input type="number" defaultValue="100" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold text-black focus:outline-none focus:border-black shadow-sm" />
                        </div>
                    </div>

                    <div className="grid grid-cols-12 gap-6 items-center">
                        <div className="col-span-3">
                            <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest">Purchase Date <Required/></label>
                        </div>
                        <div className="col-span-4 relative">
                             <input type="date" defaultValue="2024-03-16" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold text-black focus:outline-none focus:border-black shadow-sm" />
                        </div>
                    </div>

                     <div className="grid grid-cols-12 gap-6 items-center">
                        <div className="col-span-3">
                            <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest">Unit Price <Required/></label>
                        </div>
                        <div className="col-span-2">
                             <select className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-[10px] font-black text-black focus:outline-none focus:border-black appearance-none shadow-sm">
                                <option>IDR</option>
                                <option>USD</option>
                             </select>
                        </div>
                         <div className="col-span-7">
                             <input type="text" defaultValue="100.000" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm font-black text-black focus:outline-none focus:border-black shadow-sm" />
                        </div>
                    </div>

                    <div className="grid grid-cols-12 gap-6 items-start">
                        <div className="col-span-3 pt-3">
                            <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest">Description <Required/></label>
                        </div>
                         <div className="col-span-9">
                             <textarea rows={3} defaultValue="Pembelian Q2" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium text-black focus:outline-none focus:border-black resize-none shadow-sm" />
                        </div>
                    </div>
                </div>

                <div className="mt-12">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-2 h-6 bg-black rounded-full"></div>
                        <h3 className="text-[10px] font-black text-black uppercase tracking-[0.2em]">Transaction History</h3>
                    </div>
                    <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-xl shadow-black/5">
                        <table className="w-full text-left text-[12px] border-collapse">
                            <thead className="bg-[#FAFAFA] border-b border-gray-100 font-black text-[10px] text-gray-400 uppercase tracking-widest">
                                <tr>
                                    <th className="px-6 py-4 w-12">#</th>
                                    <th className="px-6 py-4">Transaction Date</th>
                                    <th className="px-6 py-4 text-center">Volume</th>
                                    <th className="px-6 py-4">UoM</th>
                                    <th className="px-6 py-4 text-right">Price Point</th>
                                    <th className="px-6 py-4">Context / Description</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                <tr className="hover:bg-gray-50/50 transition-colors">
                                    <td className="px-6 py-4 text-gray-300 font-bold">01.</td>
                                    <td className="px-6 py-4 font-black text-black uppercase">10 Jan 2024</td>
                                    <td className="px-6 py-4 text-center font-black text-[14px]">1</td>
                                    <td className="px-6 py-4 font-black text-gray-400">PCS</td>
                                    <td className="px-6 py-4 text-right font-mono font-black text-black">IDR 1,231</td>
                                    <td className="px-6 py-4 font-medium text-gray-500 italic">Initial replenishment Q1</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
          ) : isMaster ? (
              <div className="space-y-4">
                  <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1.5">Name <Required/></label>
                      <input 
                          type="text" 
                          className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-black" 
                          value={masterForm.name || ''}
                          onChange={(e) => handleMasterChange(e.target.value)}
                          placeholder={`Enter ${moduleName} Name`}
                      />
                  </div>
              </div>
          ) : (
             <div className="p-4 text-center text-gray-500">Form content for {moduleName}</div>
          )}
        </div>

        {mode !== 'view' && (
            <div className="px-8 py-6 bg-white border-t border-gray-100 flex justify-end gap-3 z-10 shadow-inner">
                {!(isMasterATK || isMasterARK || isLogBook) && (
                    <button onClick={onClose} className="px-10 py-3 text-[11px] font-black uppercase tracking-widest text-gray-400 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 hover:text-black transition-all">DRAF</button>
                )}
                <button onClick={handleSave} className="px-16 py-3 text-[11px] font-black uppercase tracking-widest text-white bg-black rounded-xl hover:bg-gray-800 shadow-xl shadow-black/20 transition-all transform hover:-translate-y-1 active:translate-y-0">SIMPAN DATA</button>
            </div>
        )}
      </div>
    </div>
  );
};
