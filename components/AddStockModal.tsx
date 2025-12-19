
import React, { useState, useEffect } from 'react';
import { X, RefreshCcw, Plus, Trash2, Image as ImageIcon, List, Calendar, PlusCircle, Settings, Clock, CheckCircle, XCircle, FileText, Archive, ChevronLeft, Printer, Download, History, User, Wrench, DollarSign, Edit3, Check, Ban } from 'lucide-react';
import { VehicleRecord, ServiceRecord, MutationRecord, SalesRecord, SalesOffer, ContractRecord, GeneralMasterItem, MasterVendorRecord, StationeryRequestRecord, StationeryRequestItem, DeliveryLocationRecord, AssetRecord, LogBookRecord, TaxKirRecord } from '../types';
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
    <div className="flex items-center gap-2 mb-5 pb-3 border-b border-gray-100">
        <Icon size={20} className="text-gray-800" strokeWidth={2} />
        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">{title}</h3>
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
             <div className="bg-white border-b border-gray-200 shrink-0 px-8 py-4 flex items-center justify-between z-10">
                 <div className="flex items-center gap-4">
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-600" title="Kembali"><ChevronLeft size={24} /></button>
                    <div>
                         <h1 className="text-xl font-bold text-gray-900">{titleLabel}</h1>
                         <div className="flex items-center gap-3 mt-1">
                             <span className="px-2 py-0.5 bg-cyan-50 border border-cyan-100 text-cyan-700 text-xs font-semibold rounded">Transaction No: {trxNumber}</span>
                             <span className={`px-2 py-0.5 text-xs font-semibold rounded flex items-center gap-1 ${getStatusColor(status)}`}>{getStatusIcon(status)} Status: {status}</span>
                         </div>
                    </div>
                 </div>
                 <div className="flex items-center gap-3">
                     <button onClick={() => setShowApprovalHistory(true)} className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50 transition-colors"><History size={16} /> View Approval History</button>
                     <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-[#00A651] rounded hover:bg-[#008f45] transition-colors"><Printer size={16} /> Print</button>
                 </div>
             </div>
             
             <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
                 <div className="max-w-[1600px] mx-auto space-y-6 pb-24">
                 <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                     <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                         <h3 className="text-sm font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">Information</h3>
                         <div className="space-y-4">
                             <div><label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Requester Name</label><div className="text-sm font-semibold text-gray-900">{initialAssetData?.employee.name}</div></div>
                             <div><label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Role</label><div className="text-sm font-medium text-gray-700">{initialAssetData?.employee.role}</div></div>
                              <div><label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Phone</label><div className="text-sm font-medium text-gray-700">{initialAssetData?.employee.phone}</div></div>
                         </div>
                     </div>
                     <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                         <h3 className="text-sm font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">Delivery Terms</h3>
                         <div className="space-y-4">
                             <div><label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Request Date</label><div className="text-sm font-semibold text-gray-900">{initialAssetData?.date}</div></div>
                              <div><label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Request Type</label><div className="text-sm font-medium text-gray-700">{stationeryRequestForm.type || 'Permintaan Bulanan'}</div></div>
                             <div className="grid grid-cols-2 gap-4">
                                 <div><label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Delivery</label><div className="text-sm font-medium text-gray-700">{stationeryRequestForm.deliveryType}</div></div>
                                  <div><label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Location</label><div className="text-sm font-medium text-gray-700">{stationeryRequestForm.location}</div></div>
                             </div>
                         </div>
                     </div>
                     <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                         <h3 className="text-sm font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">Amount Summary</h3>
                         <div className="space-y-4">
                             <div><label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Total Items</label><div className="text-2xl font-bold text-gray-900">{requestItems.length} <span className="text-sm font-normal text-gray-500">Item(s)</span></div></div>
                         </div>
                     </div>
                 </div>
                 <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                     <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center bg-gray-50"><h3 className="font-bold text-gray-900">Order Items</h3><button className="text-xs font-medium text-gray-600 hover:text-black flex items-center gap-1"><Settings size={14}/> Maximize</button></div>
                     <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-green-50 text-xs text-gray-700 uppercase font-semibold">
                                <tr>
                                    <th className="px-6 py-3 border-r border-green-100 w-12 text-center">No</th>
                                    <th className="px-6 py-3 border-r border-green-100 w-32">Part Code</th>
                                    <th className="px-6 py-3 border-r border-green-100">Part Name</th>
                                    <th className="px-6 py-3 border-r border-green-100">Category</th>
                                    <th className="px-6 py-3 border-r border-green-100 text-center">QTY</th>
                                    <th className="px-6 py-3 border-r border-green-100 text-center">Unit</th>
                                    <th className="px-6 py-3 border-r border-green-100">Comment</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 text-sm">
                                {requestItems.map((item, index) => {
                                    const masterItem = masterList.find(m => m.id.toString() === item.itemId);
                                    return (
                                        <tr key={index} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4 text-center text-gray-500">{index + 1}</td>
                                            <td className="px-6 py-4 font-mono text-xs font-medium text-gray-600 bg-gray-50/50">{masterItem?.itemCode || '-'}</td>
                                            <td className="px-6 py-4 font-bold text-gray-800">{masterItem?.itemName || '-'}</td>
                                             <td className="px-6 py-4 text-gray-600">{masterItem?.category || '-'}</td>
                                            <td className="px-6 py-4 text-center font-bold text-gray-900">{item.qty}</td>
                                            <td className="px-6 py-4 text-center text-gray-500">{masterItem?.uom || 'Pcs'}</td>
                                            <td className="px-6 py-4 text-gray-600 italic">{stationeryRequestForm.remarks || '-'}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                     </div>
                 </div>
                 
                 {isApprovalModule && (
                    <div className="flex items-center justify-end gap-3 mt-8">
                        <button 
                            onClick={() => { if(confirm(t('Reject') + '?')) onClose(); }}
                            className="flex items-center gap-2 px-6 py-2.5 text-sm font-semibold text-white bg-[#E32227] rounded-lg hover:bg-red-700 transition-all shadow-sm"
                        >
                            <XCircle size={18} />
                            {t('Reject')}
                        </button>
                        <button 
                            onClick={() => { onRevise?.(); }}
                            className="flex items-center gap-2 px-6 py-2.5 text-sm font-semibold text-white bg-[#F57C00] rounded-lg hover:bg-orange-600 transition-all shadow-sm"
                        >
                            <Edit3 size={18} />
                            {t('Revise')}
                        </button>
                        <button 
                            onClick={() => { if(confirm(t('Approve') + '?')) onClose(); }}
                            className="flex items-center gap-2 px-6 py-2.5 text-sm font-semibold text-white bg-[#10B981] rounded-lg hover:bg-emerald-600 transition-all shadow-sm"
                        >
                            <CheckCircle size={18} />
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
              <h2 className="text-lg font-bold tracking-tight text-gray-900">
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
             <div className="bg-white p-6 rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-gray-200/60 space-y-6">
                 <SectionHeader icon={List} title={t('Log Book Tamu Input')} />
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div>
                         <label className="block text-xs font-bold text-gray-700 mb-1.5">{t('Lokasi MODENA')} <Required/></label>
                         <select className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-black bg-white" value={logBookForm.lokasiModena} onChange={(e) => handleLogBookChange('lokasiModena', e.target.value)} disabled={isViewMode}>
                             <option value="">{t('Pilih Tempat')}</option>
                             <option value="MODENA Head Office">{t('MODENA Head Office')}</option>
                             <option value="MODENA Kemang">{t('MODENA Kemang')}</option>
                             <option value="MODENA Suryo">{t('MODENA Suryo')}</option>
                             <option value="Warehouse Cakung">{t('Warehouse Cakung')}</option>
                         </select>
                     </div>
                      <div>
                         <label className="block text-xs font-bold text-gray-700 mb-1.5">{t('Kategori Tamu')} <Required/></label>
                         <select className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-black bg-[#FFF9C4]" value={logBookForm.kategoriTamu} onChange={(e) => handleLogBookChange('kategoriTamu', e.target.value)} disabled={isViewMode}>
                             <option value="Customer">Customer</option>
                             <option value="Supplier">Supplier</option>
                             <option value="Partner">Partner</option>
                             <option value="Other">Other</option>
                         </select>
                     </div>
                     <div className="md:col-span-2">
                          <label className="block text-xs font-bold text-gray-700 mb-1.5">{t('Nama Tamu')}</label>
                          <input type="text" className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-black" value={logBookForm.namaTamu} onChange={(e) => handleLogBookChange('namaTamu', e.target.value)} disabled={isViewMode} />
                     </div>
                     <div>
                          <label className="block text-xs font-bold text-gray-700 mb-1.5">{t('Tanggal Kunjungan')}</label>
                          <input type="date" className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-black bg-white" value={logBookForm.tanggalKunjungan} onChange={(e) => handleLogBookChange('tanggalKunjungan', e.target.value)} disabled={isViewMode} />
                     </div>
                     <div className="grid grid-cols-2 gap-4">
                         <div>
                             <label className="block text-xs font-bold text-gray-700 mb-1.5">{t('Jam Datang')}</label>
                             <input type="time" className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-black" value={logBookForm.jamDatang} onChange={(e) => handleLogBookChange('jamDatang', e.target.value)} disabled={isViewMode} />
                         </div>
                         <div>
                             <label className="block text-xs font-bold text-gray-700 mb-1.5">{t('Jam Pulang')}</label>
                             <input type="time" className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-black" value={logBookForm.jamPulang} onChange={(e) => handleLogBookChange('jamPulang', e.target.value)} disabled={isViewMode} />
                         </div>
                     </div>
                     <div className="md:col-span-2 grid grid-cols-3 gap-6">
                         <div>
                              <label className="block text-xs font-bold text-gray-700 mb-1.5">{t('Wanita')}</label>
                              <input type="number" className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-black" value={logBookForm.wanita} onChange={(e) => handleLogBookChange('wanita', e.target.value)} disabled={isViewMode} />
                         </div>
                         <div>
                              <label className="block text-xs font-bold text-gray-700 mb-1.5">{t('Laki-Laki')}</label>
                              <input type="number" className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-black" value={logBookForm.lakiLaki} onChange={(e) => handleLogBookChange('lakiLaki', e.target.value)} disabled={isViewMode} />
                         </div>
                         <div>
                              <label className="block text-xs font-bold text-gray-700 mb-1.5">{t('Anak-Anak')}</label>
                              <input type="number" className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-black" value={logBookForm.anakAnak} onChange={(e) => handleLogBookChange('anakAnak', e.target.value)} disabled={isViewMode} />
                         </div>
                     </div>
                     <div className="md:col-span-2">
                          <label className="block text-xs font-bold text-gray-700 mb-1.5">{t('Note')}</label>
                          <textarea className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-black resize-none" rows={3} value={logBookForm.note} onChange={(e) => handleLogBookChange('note', e.target.value)} disabled={isViewMode}></textarea>
                     </div>
                 </div>
             </div>
          ) : isStationeryRequest && !isViewMode ? (
             <div className="space-y-6">
                 <div className="bg-white p-6 rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-gray-200/60">
                     <SectionHeader icon={FileText} title={t('Form Request')} />
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                         <div>
                             <label className="block text-xs font-bold text-gray-800 mb-1.5">{t('Pilih Kebutuhan')} <Required/></label>
                             <select className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-black bg-white text-gray-900" value={stationeryRequestForm.type} onChange={(e) => handleStationeryRequestChange('type', e.target.value)}>
                                 <option value="Permintaan Bulanan">{t('Permintaan Bulanan')}</option>
                                 <option value="Permintaan Khusus">{t('Permintaan Khusus')}</option>
                             </select>
                         </div>
                         <div>
                             <label className="block text-xs font-bold text-gray-800 mb-1.5">{t('Tanggal Request')}</label>
                             <input type="date" className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-black text-gray-900" value={stationeryRequestForm.date} onChange={(e) => handleStationeryRequestChange('date', e.target.value)} />
                         </div>
                     </div>
                 </div>
                 <div className="bg-white p-6 rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-gray-200/60">
                     <div className="flex justify-between items-center mb-5 pb-3 border-b border-gray-100">
                         <div className="flex items-center gap-2">
                             <List size={20} className="text-gray-800" strokeWidth={2} />
                             <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">{t('Items')}</h3>
                         </div>
                         <button onClick={addRequestItemRow} className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-white bg-black rounded-lg hover:bg-gray-800 transition-colors"><PlusCircle size={14} /> {t('Add More')}</button>
                     </div>
                     <div className="overflow-hidden border border-gray-200 rounded-lg">
                         <table className="w-full text-left border-collapse">
                             <thead className="bg-gray-50 text-xs font-bold text-gray-700 uppercase">
                                 <tr>
                                     <th className="p-3 w-12 text-center">No</th>
                                     <th className="p-3">{moduleName === 'Daftar ATK' ? t('Pilih jenis item ATK') : t('Pilih jenis item ARK')}</th>
                                     <th className="p-3 w-32 text-center">{t('Jumlah')}</th>
                                     <th className="p-3 w-20 text-center">Action</th>
                                 </tr>
                             </thead>
                             <tbody className="divide-y divide-gray-200 text-sm">
                                 {requestItems.map((item, index) => {
                                     const isArk = moduleName === 'Daftar ARK' || moduleName === 'Household Request Approval';
                                     const masterList = isArk ? MOCK_MASTER_ARK_DATA : MOCK_MASTER_DATA;
                                     return (
                                     <tr key={index} className="hover:bg-gray-50">
                                         <td className="p-3 text-center text-gray-500 font-medium">{index + 1}</td>
                                         <td className="p-3">
                                             <select className="w-full border border-gray-300 rounded px-2 py-1.5 text-sm focus:outline-none focus:border-black" value={item.itemId} onChange={(e) => handleRequestItemChange(index, 'itemId', e.target.value)}>
                                                 <option value="">{isArk ? t('Search ARK') : t('Search ATK')}...</option>
                                                 {masterList.map(m => ( <option key={m.id} value={m.id}>{m.itemName} ({m.itemCode})</option> ))}
                                             </select>
                                         </td>
                                         <td className="p-3">
                                             <input type="number" className="w-full border border-gray-300 rounded px-2 py-1.5 text-sm text-center focus:outline-none focus:border-black" value={item.qty} onChange={(e) => handleRequestItemChange(index, 'qty', e.target.value)} />
                                         </td>
                                         <td className="p-3 text-center">
                                             <button onClick={() => removeRequestItemRow(index)} className="text-gray-400 hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
                                         </td>
                                     </tr>
                                 )})}
                             </tbody>
                         </table>
                     </div>
                     <div className="mt-4">
                         <label className="block text-xs font-bold text-gray-800 mb-1.5">{t('Remarks')}</label>
                         <textarea rows={2} className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-black resize-none" value={stationeryRequestForm.remarks} onChange={(e) => handleStationeryRequestChange('remarks', e.target.value)} placeholder={t('Isi Remarks')}></textarea>
                     </div>
                 </div>
                 <div className="bg-white p-6 rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-gray-200/60">
                     <SectionHeader icon={Archive} title={t('Alamat Pengiriman')} />
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                         <div>
                             <label className="block text-xs font-bold text-gray-800 mb-1.5">{t('Dikirim')} / {t('Ambil di HO')}</label>
                             <select className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-black bg-white text-gray-900" value={stationeryRequestForm.deliveryType} onChange={(e) => handleStationeryRequestChange('deliveryType', e.target.value)}>
                                 <option value="Dikirim">{t('Dikirim')}</option>
                                 <option value="Ambil di HO">{t('Ambil di HO')}</option>
                             </select>
                         </div>
                         <div>
                             <label className="block text-xs font-bold text-gray-800 mb-1.5">{t('Pilih Tempat')}</label>
                             <select className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-black bg-white text-gray-900" value={stationeryRequestForm.location} onChange={(e) => handleStationeryRequestChange('location', e.target.value)} disabled={stationeryRequestForm.deliveryType === 'Ambil di HO'}>
                                 <option value="MODENA Head Office">{t('MODENA Head Office')}</option>
                                 <option value="MODENA Kemang">{t('MODENA Kemang')}</option>
                                 <option value="MODENA Suryo">{t('MODENA Suryo')}</option>
                                 <option value="Warehouse Cakung">{t('Warehouse Cakung')}</option>
                             </select>
                         </div>
                     </div>
                 </div>
             </div>
          ) : isContract ? (
            <div className="bg-white p-6 rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-gray-200/60">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1.5">Asset Number</label>
                         <input type="text" className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2.5 text-sm text-gray-400 italic focus:outline-none" value={contractForm.assetNumber || '[Auto Generate]'} readOnly />
                    </div>
                </div>
            </div>
          ) : moduleName === 'Pajak & KIR' ? (
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-gray-200/60">
                    <h3 className="text-orange-400 text-xs font-bold uppercase mb-4 tracking-wide">Request KIR / Pajak</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                         <div>
                             <label className="block text-xs font-bold text-gray-700 mb-1.5">Jenis <Required/></label>
                             <select className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-black bg-white" value={taxKirForm.jenis || 'KIR'} onChange={(e) => handleTaxKirChange('jenis', e.target.value)} disabled={isViewMode}>
                                 <option value="KIR">KIR</option>
                                 <option value="Pajak Tahunan">Pajak Tahunan</option>
                                 <option value="Pajak 5 Tahunan">Pajak 5 Tahunan</option>
                             </select>
                         </div>
                         <div>
                             <label className="block text-xs font-bold text-gray-700 mb-1.5">Aset <Required/></label>
                             <select className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-black bg-white" value={taxKirForm.aset || ''} onChange={(e) => handleTaxKirChange('aset', e.target.value)} disabled={isViewMode}>
                                 <option value="">(Pilih Aset)</option>
                                 {vehicleList.map(v => ( <option key={v.id} value={v.nama}>{v.noPolisi} - {v.nama}</option> ))}
                             </select>
                         </div>
                    </div>
                </div>
              </div>
          ) : moduleName === 'Servis' ? (
             <div className="space-y-6">
                 <div className="bg-white p-6 rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-gray-200/60">
                     <SectionHeader icon={List} title="DETAIL INFORMASI" />
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                         <div className="col-span-1 md:col-span-2">
                             <label className="block text-xs font-bold text-gray-800 mb-1.5">Aset / Kendaraan <Required/></label>
                             <select className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-black bg-white text-gray-900" value={serviceForm.aset || ''} onChange={(e) => handleServiceChange('aset', e.target.value)} disabled={isViewMode}>
                                 <option value="">(Pilih Kendaraan)</option>
                                 {vehicleList.map(v => ( <option key={v.id} value={v.nama}>{v.noPolisi} - {v.nama}</option> ))}
                             </select>
                         </div>
                     </div>
                 </div>
             </div>
          ) : isMasterATK || isMasterARK ? (
            /* --- MASTER ATK/ARK FORM (RESTORED) --- */
            <div className="space-y-6">
                {/* Section 1: Header Info */}
                <div className="bg-blue-50/50 p-6 rounded-lg border border-blue-100">
                    <h3 className="text-blue-500 font-bold text-sm mb-4">{isMasterARK ? 'Household Master' : 'Stationery Master'}</h3>
                    <div className="grid grid-cols-1 gap-4">
                        <div className="grid grid-cols-12 gap-4 items-center">
                            <div className="col-span-3">
                                <label className="block text-sm font-semibold text-gray-700">Category <Required/></label>
                            </div>
                            <div className="col-span-9">
                                <select className="w-full bg-[#FFF9C4] border border-gray-300 rounded px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-black">
                                    {currentCategories.map(cat => (
                                        <option key={cat} value={cat}>{cat}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-12 gap-4 items-center">
                            <div className="col-span-3">
                                <label className="block text-sm font-semibold text-gray-700">Item Name <Required/></label>
                            </div>
                            <div className="col-span-9">
                                <input type="text" placeholder="e.g. KENKO Joyko K-1 0.5 mm Hitam" className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-black" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Section 2: Transaction Input */}
                <div className="bg-white pt-2 space-y-4 border-t border-gray-100">
                    {/* Remaining Stock & Unit */}
                    <div className="grid grid-cols-12 gap-4 items-center">
                        <div className="col-span-3">
                            <label className="block text-sm font-semibold text-gray-700">Remaining Stock <Required/></label>
                        </div>
                        <div className="col-span-4">
                             <input type="number" defaultValue="48" className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-black" />
                        </div>
                        <div className="col-span-1 text-right">
                             <label className="block text-sm font-semibold text-gray-700">Unit</label>
                        </div>
                         <div className="col-span-4">
                             <select className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-black">
                                <option>PCS</option>
                                <option>RIM</option>
                                <option>BOX</option>
                             </select>
                        </div>
                    </div>

                    {/* Minimum & Maximum Stock */}
                    <div className="grid grid-cols-12 gap-4 items-center">
                        <div className="col-span-3">
                            <label className="block text-sm font-semibold text-gray-700">Minimum Stock</label>
                        </div>
                        <div className="col-span-3">
                             <input type="number" defaultValue="10" className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-black" />
                        </div>
                         <div className="col-span-3 text-right">
                            <label className="block text-sm font-semibold text-gray-700">Maximum Stock</label>
                        </div>
                        <div className="col-span-3">
                             <input type="number" defaultValue="100" className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-black" />
                        </div>
                    </div>

                    {/* Requested Stock */}
                    <div className="grid grid-cols-12 gap-4 items-center">
                        <div className="col-span-3">
                            <label className="block text-sm font-semibold text-gray-700">Requested Stock</label>
                        </div>
                        <div className="col-span-9">
                             <input type="number" defaultValue="0" className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-black" />
                        </div>
                    </div>

                    {/* Purchase Date */}
                     <div className="grid grid-cols-12 gap-4 items-center">
                        <div className="col-span-3">
                            <label className="block text-sm font-semibold text-gray-700">Purchase Date <Required/></label>
                        </div>
                        <div className="col-span-4 relative">
                             <input type="date" defaultValue="2024-03-16" className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-black" />
                        </div>
                    </div>

                    {/* Prices */}
                     <div className="grid grid-cols-12 gap-4 items-center">
                        <div className="col-span-3">
                            <label className="block text-sm font-semibold text-gray-700">Item Price <Required/></label>
                        </div>
                        <div className="col-span-2">
                             <select className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-black">
                                <option>IDR</option>
                                <option>USD</option>
                             </select>
                        </div>
                         <div className="col-span-7">
                             <input type="text" defaultValue="100.000" className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-black" />
                        </div>
                    </div>

                    <div className="grid grid-cols-12 gap-4 items-center">
                        <div className="col-span-3">
                            <label className="block text-sm font-semibold text-gray-700">Average Price</label>
                        </div>
                         <div className="col-span-9">
                             <input type="text" defaultValue="1.000" readOnly className="w-full bg-gray-50 border border-gray-200 rounded px-3 py-2 text-sm text-gray-500 focus:outline-none" />
                        </div>
                    </div>

                    {/* Description */}
                    <div className="grid grid-cols-12 gap-4 items-start">
                        <div className="col-span-3 pt-2">
                            <label className="block text-sm font-semibold text-gray-700">Description <Required/></label>
                        </div>
                         <div className="col-span-9">
                             <textarea rows={3} defaultValue="Pembelian Q2" className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-black resize-none" />
                        </div>
                    </div>
                </div>

                {/* History Table (Visible even in Create mode as requested) */}
                <div className="mt-8">
                    <h3 className="text-blue-500 font-bold text-sm mb-4">{isMasterARK ? 'Household Purchase History' : 'Stationery Purchase History'}</h3>
                    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-gray-100 border-b border-gray-200 font-semibold text-gray-700">
                                <tr>
                                    <th className="px-4 py-3 w-12">No</th>
                                    <th className="px-4 py-3">Purchase Date</th>
                                    <th className="px-4 py-3 text-center">Quantity</th>
                                    <th className="px-4 py-3">Unit</th>
                                    <th className="px-4 py-3 text-right">Item Price</th>
                                    <th className="px-4 py-3 text-right">Average Price</th>
                                    <th className="px-4 py-3">Description</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 text-gray-700">
                                <tr className="hover:bg-gray-50">
                                    <td className="px-4 py-3 text-gray-500">1.</td>
                                    <td className="px-4 py-3 text-blue-600 underline cursor-pointer">10 Jan 2024</td>
                                    <td className="px-4 py-3 text-center font-medium">1</td>
                                    <td className="px-4 py-3 font-semibold">PCS</td>
                                    <td className="px-4 py-3 text-right">IDR 1,231</td>
                                    <td className="px-4 py-3 text-right">IDR 1,231</td>
                                    <td className="px-4 py-3 font-medium">Pembelian Q1</td>
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
            <div className="px-8 py-5 bg-white border-t border-gray-100 flex justify-end gap-3 z-10">
                {!(isMasterATK || isMasterARK || isLogBook) && (
                    <button onClick={onClose} className="px-6 py-2.5 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all">{t('Draf')}</button>
                )}
                <button onClick={handleSave} className="px-6 py-2.5 text-sm font-bold text-white bg-black rounded-lg hover:bg-gray-800 shadow-lg shadow-gray-200 transition-all transform hover:-translate-y-0.5">{t('Simpan')}</button>
            </div>
        )}
      </div>
    </div>
  );
};
