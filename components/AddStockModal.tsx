
import React, { useState, useEffect, useMemo } from 'react';
import { X, Save, List, Calendar, CheckCircle, CheckCircle2, XCircle, FileText, Archive, ChevronLeft, Printer, History, User, Package, MapPin, Users, MessageSquare, Check, RotateCcw, AlertTriangle, Hash, Activity, Search, Lock, Briefcase, Building2, Key, Home, Box, Send, LayoutGrid, ChevronDown, Layers, ClipboardCheck, Clock, Baby } from 'lucide-react';
import { VehicleRecord, ServiceRecord, MutationRecord, SalesRecord, ContractRecord, GeneralMasterItem, MasterVendorRecord, StationeryRequestRecord, StationeryRequestItem, DeliveryLocationRecord, AssetRecord, LogBookRecord, TaxKirRecord, StockOpnameRecord, LockerRecord, ModenaPodRecord, LockerRequestRecord, PodRequestRecord } from '../types';
import { useLanguage } from '../contexts/LanguageContext';
import { MOCK_MASTER_DATA, MOCK_MASTER_ARK_DATA, MOCK_ATK_CATEGORY, MOCK_ARK_CATEGORY, MOCK_UOM_DATA, MOCK_DELIVERY_LOCATIONS } from '../constants';

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

// Internal state for multiple items in stock opname
interface OpnameItemEntry {
    itemCode: string;
    itemName: string;
    systemQty: number;
    physicalQty: number;
    difference: number;
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
    onSaveStockOpname,
    onSaveLocker,
    onSaveLockerRequest,
    onSavePodRequest,
    onSavePod,
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
    initialStockOpnameData,
    initialLockerData,
    initialLockerRequestData,
    initialPodRequestData,
    initialPodData,
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
      deliveryType: 'PICKUP HO',
      location: 'Satrio',
      date: new Date().toISOString().split('T')[0]
  });
  const [logBookForm, setLogBookForm] = useState<Partial<LogBookRecord>>({
    lokasiModena: 'Satrio',
    kategoriTamu: 'Customer',
    tanggalKunjungan: new Date().toISOString().split('T')[0],
    jamDatang: '09:00',
    jamPulang: '',
    wanita: 0,
    lakiLaki: 0,
    anakAnak: 0,
    namaTamu: '',
    note: '',
    nomorHp: '',
    email: '',
    visitorCard: '',
    noIdentitas: ''
  });
  const [stockOpnameForm, setStockOpnameForm] = useState<Partial<StockOpnameRecord>>({});
  const [lockerForm, setLockerForm] = useState<Partial<LockerRecord>>({});
  const [lockerRequestForm, setLockerRequestForm] = useState<Partial<LockerRequestRecord>>({});
  const [podRequestForm, setPodRequestForm] = useState<Partial<PodRequestRecord>>({});
  const [podForm, setPodForm] = useState<Partial<ModenaPodRecord>>({});
  const [requestItems, setRequestItems] = useState<StationeryRequestItem[]>([{ itemId: '', qty: '', categoryId: '', uom: '' }]);
  const [showApprovalHistory, setShowApprovalHistory] = useState(false);
  
  const [opnameInventoryType, setOpnameInventoryType] = useState<'ATK' | 'ARK'>('ATK');
  const [opnameSelectedCategory, setOpnameSelectedCategory] = useState<string>('');
  const [opnameEntries, setOpnameEntries] = useState<OpnameItemEntry[]>([]);

  const isArkModule = moduleName.includes('ARK') || moduleName.includes('Household');
  const isStationeryRequest = moduleName.includes('ATK') || moduleName.includes('ARK') || moduleName.includes('Stationery') || moduleName.includes('Household');
  const isApprovalModule = moduleName.includes('Approval');
  const isLogBook = moduleName === 'Log Book';
  const isStockOpname = moduleName.includes('Stock Opname');
  const isLocker = moduleName === 'Daftar Loker';
  const isLockerRequest = moduleName === 'Request Locker';
  const isPod = moduleName === 'Pod Census';
  const isPodRequest = moduleName === 'Request MODENA Pod';
  const isViewMode = mode === 'view';
  
  const isFieldDisabled = isViewMode && !isApprovalModule;

  useEffect(() => {
    if (isOpen) {
        if (mode === 'edit' || mode === 'view') {
           /* Fixed: Corrected misspelled variable names and removed '刻' character */
           if (initialContractData) setContractForm(initialContractData);
           if (initialVehicleData) setVehicleForm(initialVehicleData);
           if (initialServiceData) setServiceForm(initialServiceData);
           if (initialTaxKirData) setTaxKirForm(initialTaxKirData);
           if (initialMasterData) setMasterForm(initialMasterData);
           if (initialLogBookData) setLogBookForm(initialLogBookData);
           if (initialStockOpnameData) {
              setStockOpnameForm(initialStockOpnameData);
              const isArk = MOCK_MASTER_ARK_DATA.some(m => m.itemCode === initialStockOpnameData.itemCode);
              setOpnameInventoryType(isArk ? 'ARK' : 'ATK');
              setOpnameSelectedCategory(initialStockOpnameData.category || '');
              setOpnameEntries([{
                  itemCode: initialStockOpnameData.itemCode,
                  itemName: initialStockOpnameData.itemName,
                  systemQty: initialStockOpnameData.systemQty,
                  physicalQty: initialStockOpnameData.physicalQty,
                  difference: initialStockOpnameData.difference
              }]);
           }
           if (initialLockerData) setLockerForm(initialLockerData);
           if (initialLockerRequestData) setLockerRequestForm(initialLockerRequestData);
           if (initialPodRequestData) setPodRequestForm(initialPodRequestData);
           if (initialPodData) setPodForm(initialPodData);
           
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
                   deliveryType: 'PICKUP HO',
                   location: 'Satrio'
               });

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
            if (isStockOpname) {
              setOpnameInventoryType('ATK');
              setOpnameSelectedCategory('');
              setOpnameEntries([]);
              setStockOpnameForm({
                opnameNumber: `SO/ATK/${new Date().getFullYear()}/${Math.floor(1000 + Math.random() * 9000)}`,
                date: new Date().toISOString().split('T')[0],
                performedBy: 'Aan Junaidi',
                status: 'Draft'
              });
            }
            if (isLogBook) {
              setLogBookForm({
                lokasiModena: 'Satrio',
                kategoriTamu: 'Customer',
                tanggalKunjungan: new Date().toISOString().split('T')[0],
                jamDatang: '09:00',
                jamPulang: '',
                wanita: 0,
                lakiLaki: 0,
                anakAnak: 0,
                namaTamu: '',
                note: '',
                nomorHp: '',
                email: '',
                visitorCard: '',
                noIdentitas: ''
              });
            }
            if (isLocker) {
              setLockerForm({
                status: 'Kosong',
                spareKey: 'Ada',
                location: 'Lantai 1',
                subLocation: '-',
                lastUpdate: new Date().toISOString().split('T')[0]
              });
            }
            if (isLockerRequest) {
              setLockerRequestForm({
                transactionNumber: `REQ/LCK/${new Date().getFullYear()}/${Math.floor(1000 + Math.random() * 9000)}`,
                date: new Date().toISOString().split('T')[0],
                status: 'Pending',
                reason: '',
                employee: { name: 'Current User', role: 'Staff', phone: '-', avatar: 'https://i.pravatar.cc/150?u=current' }
              });
            }
            if (isPodRequest) {
              setPodRequestForm({
                transactionNumber: `REQ/POD/${new Date().getFullYear()}/${Math.floor(1000 + Math.random() * 9000)}`,
                date: new Date().toISOString().split('T')[0],
                status: 'Pending',
                reason: '',
                preferredFloor: 'Lt 2 Pria',
                preferredRoomType: 'Single Bed',
                employee: { name: 'Current User', role: 'Staff', phone: '-', avatar: 'https://i.pravatar.cc/150?u=current' }
              });
            }
            if (isPod) {
              setPodForm({
                lantai: 'Lt 2 Pria',
                jenisKamar: 'Single Bed',
                statusLokerBarang: 'Tidak Terpakai',
                statusLokerPantry: 'Tidak Terpakai',
                jadwalLaundry: 'Tidak ada',
                keterangan: ''
              });
            }
            setStationeryRequestForm({ 
                type: 'DAILY REQUEST', 
                deliveryType: 'PICKUP HO', 
                location: 'Satrio', 
                date: new Date().toISOString().split('T')[0],
                remarks: `Permintaan rutin ${isArkModule ? 'ARK' : 'ATK'} untuk operasional kantor.`
            });
            setRequestItems([{ itemId: '', qty: '', categoryId: '', uom: '' }]);
        }
    }
  }, [isOpen, initialAssetData, mode, moduleName, isArkModule, initialStockOpnameData, isStockOpname, isLocker, isLockerRequest, isPodRequest, initialLockerData, initialLockerRequestData, initialPodRequestData, initialPodData, isPod, isLogBook, initialLogBookData]);

  // Handle Category Change for Stock Opname
  useEffect(() => {
    if (isStockOpname && opnameSelectedCategory && mode === 'create') {
        const masterList = opnameInventoryType === 'ARK' ? MOCK_MASTER_ARK_DATA : MOCK_MASTER_DATA;
        const filtered = masterList.filter(m => m.category === opnameSelectedCategory);
        setOpnameEntries(filtered.map(m => ({
            itemCode: m.itemCode,
            itemName: m.itemName,
            systemQty: m.remainingStock,
            physicalQty: 0,
            difference: -m.remainingStock
        })));
    } else if (isStockOpname && !opnameSelectedCategory && mode === 'create') {
        setOpnameEntries([]);
    }
  }, [opnameSelectedCategory, opnameInventoryType, isStockOpname, mode]);

  const handleOpnamePhysicalChange = (index: number, val: number) => {
    const nextEntries = [...opnameEntries];
    const item = nextEntries[index];
    item.physicalQty = val;
    item.difference = val - item.systemQty;
    setOpnameEntries(nextEntries);
  };

  const opnameTotals = useMemo(() => {
    return opnameEntries.reduce((acc, curr) => ({
        system: acc.system + curr.systemQty,
        physical: acc.physical + curr.physicalQty,
        diff: acc.diff + curr.difference
    }), { system: 0, physical: 0, diff: 0 });
  }, [opnameEntries]);

  const handleSave = () => {
      if (isLogBook && onSaveLogBook) onSaveLogBook(logBookForm);
      if (isStationeryRequest && onSaveStationeryRequest) onSaveStationeryRequest({ ...stationeryRequestForm, items: requestItems });
      if (isStockOpname && onSaveStockOpname) onSaveStockOpname(stockOpnameForm);
      if (isLocker && onSaveLocker) onSaveLocker(lockerForm);
      if (isLockerRequest && onSaveLockerRequest) onSaveLockerRequest(lockerRequestForm);
      if (isPodRequest && onSavePodRequest) onSavePodRequest(podRequestForm);
      if (isPod && onSavePod) onSavePod(podForm);
      /* Fixed: Corrected function call to onClose */
      onClose();
  }

  const handleLogBookChange = (field: keyof LogBookRecord, value: any) => setLogBookForm(prev => ({ ...prev, [field]: value }));
  const handleStockOpnameChange = (field: keyof StockOpnameRecord, value: any) => {
    setStockOpnameForm(prev => ({ ...prev, [field]: value }));
  };

  const handleLockerChange = (field: string, value: any) => {
    setLockerForm(prev => {
      const next = { ...prev, [field]: value };
      if (field === 'location' && value === 'Lantai 1') {
        next.subLocation = '-';
      }
      return next;
    });
  };

  const handleLockerRequestChange = (field: string, value: any) => {
    setLockerRequestForm(prev => ({ ...prev, [field]: value }));
  };

  const handlePodRequestChange = (field: string, value: any) => {
    setPodRequestForm(prev => ({ ...prev, [field]: value }));
  };

  const handlePodChange = (field: string, value: any) => {
    setPodForm(prev => ({ ...prev, [field]: value }));
  };

  const handleLockerEmployeeChange = (field: string, value: any) => {
    setLockerForm(prev => ({
      ...prev,
      employee: {
        ...(prev.employee || { name: '', role: '', phone: '', avatar: '' }),
        [field]: value
      }
    }));
  };

  const handleStationeryRequestChange = (field: keyof StationeryRequestRecord, value: any) => {
    if (field === 'location') {
        setStationeryRequestForm(prev => ({ 
            ...prev, 
            [field]: value
        }));
    } else {
        setStationeryRequestForm(prev => ({ ...prev, [field]: value }));
    }
  };

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
    <div className="flex items-center gap-3 mb-6 pb-2 border-b border-gray-100">
      <Icon size={18} className="text-black" />
      <h3 className="text-[10px] font-black text-black uppercase tracking-[0.2em]">{title}</h3>
    </div>
  );

  const renderApprovalHistory = () => {
    if (!showApprovalHistory) return null;
    return (
        <div className="fixed inset-0 bg-black/40 z-[120] flex items-center justify-center backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="bg-white w-full max-w-3xl rounded-xl shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-200">
                <div className="px-8 py-6 border-b border-gray-100 flex items-start justify-between">
                    <div>
                        <h2 className="text-[18px] font-bold text-[#111827]">Approval History</h2>
                        <p className="text-[14px] text-[#6B7280] mt-1">Document Number: {initialAssetData?.transactionNumber || initialStockOpnameData?.opnameNumber || initialLockerRequestData?.transactionNumber || initialPodRequestData?.transactionNumber || 'SO/ATK/2024/0004'}</p>
                    </div>
                    <button onClick={() => setShowApprovalHistory(false)} className="text-gray-400 hover:text-gray-600 transition-colors p-1">
                        <X size={24} />
                    </button>
                </div>
                <div className="p-10 bg-white">
                    <div className="relative flex gap-8">
                        <div className="flex flex-col items-center">
                            <div className="w-12 h-12 rounded-full bg-[#22C55E] flex items-center justify-center shadow-sm border-[4px] border-white z-10">
                                {/* Fixed: Corrected misspelled component CheckCircle */}
                                <CheckCircle className="text-white" size={24} />
                            </div>
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
                                        {/* Fixed: Corrected misspelled component Calendar */}
                                        <Calendar size={16} className="text-gray-400" />
                                        <span>{new Date().toISOString().split('T')[0]} 10:37:09</span>
                                    </div>
                                </div>
                                <div><p className="text-[14px] font-bold text-[#111827]">Remarks: <span className="font-normal text-[#374151]">Review completed, data matches system inventory.</span></p></div>
                                <div className="text-[13px] text-[#9CA3AF]">Email: <span className="text-[#6B7280]">ibnu.faisal@modena.com</span></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="px-8 py-5 border-t border-gray-50 flex justify-end">
                    <button onClick={() => setShowApprovalHistory(false)} className="px-6 py-2 bg-gray-50 hover:bg-gray-100 text-[12px] font-bold text-[#374151] rounded-lg transition-all border border-gray-200 uppercase tracking-widest">Tutup</button>
                </div>
            </div>
        </div>
    )
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center backdrop-blur-[2px] p-4 transition-opacity duration-300">
      <div className={`bg-[#F8F9FA] w-full ${isLogBook || (isStationeryRequest && !isViewMode) || isStockOpname || isLocker || isLockerRequest || isPod || isPodRequest ? 'max-w-6xl' : 'max-w-7xl'} rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[95vh] transform transition-all scale-100`}>
        {/* Header */}
        <div className="px-8 py-5 bg-white border-b border-gray-100 flex items-center justify-between shrink-0">
          <div>
              <h2 className="text-[14px] font-black text-black uppercase tracking-widest">
                {isStockOpname ? (isViewMode ? (isApprovalModule ? 'Stock Opname Approval' : 'Stock Opname Records Detail') : 'Create New Stock Opname') :
                 isLocker ? (isViewMode ? 'Locker Management Details' : 'Register New Locker') :
                 isLockerRequest ? (isViewMode ? 'Locker Request Details' : 'Submit Locker Request') :
                 isPodRequest ? (isViewMode ? 'Pod Request Details' : 'Submit Pod Assignment Request') :
                 isPod ? (isViewMode ? 'Pod Occupancy Detail' : 'Register New Room Assignment') :
                 isStationeryRequest ? (isViewMode ? (isApprovalModule ? 'Stationery Approval Process' : 'Stationery Request Details') : (isArkModule ? 'CREATE HOUSEHOLD REQUEST' : 'CREATE STATIONERY REQUEST')) : 
                 isLogBook ? (isViewMode ? 'Guest Log Detail' : 'Input Data Tamu Baru') : moduleName}
              </h2>
              {isViewMode && (initialAssetData?.transactionNumber || initialStockOpnameData?.opnameNumber || initialLockerData?.lockerNumber || initialLockerRequestData?.transactionNumber || initialPodRequestData?.transactionNumber) && (
                <span className="text-[10px] font-black text-gray-400 tracking-widest uppercase mt-1 block">ID: {initialAssetData?.transactionNumber || initialStockOpnameData?.opnameNumber || initialLockerData?.lockerNumber || initialLockerRequestData?.transactionNumber || initialPodRequestData?.transactionNumber}</span>
              )}
          </div>
          <div className="flex items-center gap-3">
            {/* Added Approval History Button here for ATK, ARK, and Stock Opname modules in View Mode */}
            {isViewMode && (isStationeryRequest || isStockOpname) && (
              <button 
                onClick={() => setShowApprovalHistory(true)} 
                className="flex items-center gap-2 px-4 py-1.5 text-[10px] font-black uppercase tracking-widest text-black bg-white border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-black transition-all shadow-sm"
              >
                <History size={14} /> History
              </button>
            )}
            {/* Fixed: Corrected misspelled call onClose */}
            <button className="text-gray-300 hover:text-red-500 transition-colors p-1" onClick={onClose}>
              <X size={24} />
            </button>
          </div>
        </div>
        
        {/* Body */}
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          {isPodRequest ? (
             /* --- POD REQUEST FORM --- */
             <div className="space-y-8">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-6">
                   <SectionHeader icon={Send} title="Application Info" />
                   <div className="space-y-4">
                     <div>
                       <label className="block text-[10px] font-black text-gray-400 uppercase mb-2">Request Date</label>
                       <input 
                         type="date" 
                         disabled={isFieldDisabled}
                         className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold bg-white focus:border-black outline-none" 
                         value={podRequestForm.date || ''} 
                         /* Fixed: Corrected call to handlePodRequestChange */
                         onChange={(e) => handlePodRequestChange('date', e.target.value)}
                       />
                     </div>
                     <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[10px] font-black text-gray-400 uppercase mb-2">Floor Preference</label>
                          <select 
                            disabled={isFieldDisabled}
                            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold bg-white focus:border-black outline-none appearance-none"
                            value={podRequestForm.preferredFloor || ''}
                            /* Fixed: Corrected call to handlePodRequestChange */
                            onChange={(e) => handlePodRequestChange('preferredFloor', e.target.value)}
                          >
                            <option value="Lt 2 Pria">Lt 2 Pria</option>
                            <option value="Lt 2 Perempuan">Lt 2 Perempuan</option>
                            <option value="Lt 3 Pria">Lt 3 Pria</option>
                            <option value="Lt 3 Perempuan">Lt 3 Perempuan</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-[10px] font-black text-gray-400 uppercase mb-2">Room Type</label>
                          <select 
                            disabled={isFieldDisabled}
                            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold bg-white focus:border-black outline-none appearance-none"
                            value={podRequestForm.preferredRoomType || ''}
                            /* Fixed: Corrected call to handlePodRequestChange */
                            onChange={(e) => handlePodRequestChange('preferredRoomType', e.target.value)}
                          >
                            <option value="Single Bed">Single Bed</option>
                            <option value="Double Bed">Double Bed</option>
                            <option value="Quadruple Bed">Quadruple Bed</option>
                          </select>
                        </div>
                     </div>
                   </div>
                 </div>

                 <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-6">
                   <SectionHeader icon={User} title="Applicant" />
                   <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100">
                       <img src={podRequestForm.employee?.avatar} className="w-12 h-12 rounded-full border border-white shadow-sm" />
                       <div>
                           <div className="text-[14px] font-black text-black uppercase">{podRequestForm.employee?.name}</div>
                           <div className="text-[10px] font-bold text-gray-400 uppercase">{podRequestForm.employee?.role}</div>
                       </div>
                   </div>
                   {isViewMode && (
                     <div className="mt-4">
                       <label className="block text-[10px] font-black text-gray-400 uppercase mb-2">Application Status</label>
                       <span className={`inline-block px-3 py-1 text-white text-[10px] font-black rounded uppercase ${podRequestForm.status === 'Approved' ? 'bg-green-500' : 'bg-orange-500'}`}>
                        {podRequestForm.status === 'Pending' ? 'Waiting Approval' : podRequestForm.status}
                       </span>
                     </div>
                   )}
                 </div>
               </div>

               <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                 <SectionHeader icon={MessageSquare} title="Reason for Stay" />
                 <textarea 
                   rows={4}
                   disabled={isFieldDisabled}
                   className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium bg-white focus:border-black outline-none transition-all" 
                   placeholder="Briefly explain the reason for your pod request..." 
                   value={podRequestForm.reason || ''} 
                   /* Fixed: Corrected call to handlePodRequestChange */
                   onChange={(e) => handlePodRequestChange('reason', e.target.value)} 
                 />
               </div>
             </div>
          ) : isLockerRequest ? (
            /* --- LOCKER REQUEST FORM --- */
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-6">
                  <SectionHeader icon={Send} title="Request Info" />
                  <div className="space-y-4">
                    <div>
                      <label className="block text-[10px] font-black text-gray-400 uppercase mb-2">Request Date</label>
                      <input 
                        type="date" 
                        disabled={isFieldDisabled}
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold bg-white focus:border-black outline-none" 
                        value={lockerRequestForm.date || ''} 
                        /* Fixed: Corrected call to handleLockerRequestChange */
                        onChange={(e) => handleLockerRequestChange('date', e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-gray-400 uppercase mb-2">Preferred Location</label>
                      <select 
                        disabled={isFieldDisabled}
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold bg-white focus:border-black outline-none appearance-none"
                        value={lockerRequestForm.preferredLocation || ''}
                        /* Fixed: Corrected call to handleLockerRequestChange */
                        onChange={(e) => handleLockerRequestChange('preferredLocation', e.target.value)}
                      >
                        <option value="">No Preference</option>
                        <option value="Lantai 1">Lantai 1</option>
                        <option value="Lantai 2 Satrio">Lantai 2 Satrio</option>
                        <option value="Lantai 2 Karang Asem">Lantai 2 Karang Asem</option>
                        <option value="Lantai 3 Satrio">Lantai 3 Satrio</option>
                        <option value="Lantai 3 Karang Asem">Lantai 3 Karang Asem</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-6">
                  <SectionHeader icon={User} title="Requester" />
                  <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100">
                      <img src={lockerRequestForm.employee?.avatar} className="w-12 h-12 rounded-full border border-white shadow-sm" />
                      <div>
                          <div className="text-[14px] font-black text-black uppercase">{lockerRequestForm.employee?.name}</div>
                          <div className="text-[10px] font-bold text-gray-400 uppercase">{lockerRequestForm.employee?.role}</div>
                      </div>
                  </div>
                  {isViewMode && (
                    <div className="mt-4">
                      <label className="block text-[10px] font-black text-gray-400 uppercase mb-2">Request Status</label>
                      <span className={`inline-block px-3 py-1 text-white text-[10px] font-black rounded uppercase ${lockerRequestForm.status === 'Approved' ? 'bg-green-500' : 'bg-orange-500'}`}>
                        {lockerRequestForm.status === 'Pending' ? 'Waiting Approval' : lockerRequestForm.status}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                <SectionHeader icon={MessageSquare} title="Reason / Remarks" />
                <textarea 
                  rows={4}
                  disabled={isFieldDisabled}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium bg-white focus:border-black outline-none transition-all" 
                  placeholder="Explain why you need a locker or replacement..." 
                  value={lockerRequestForm.reason || ''} 
                  /* Fixed: Corrected call to handleLockerRequestChange */
                  onChange={(e) => handleLockerRequestChange('reason', e.target.value)} 
                />
              </div>
            </div>
          ) : isPod ? (
            /* --- MODENA POD FORM --- */
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-6">
                  <SectionHeader icon={Home} title="Room Assignment" />
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-black text-gray-400 uppercase mb-2">Lantai</label>
                        <select 
                          disabled={isFieldDisabled}
                          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold bg-white focus:border-black outline-none appearance-none"
                          value={podForm.lantai || ''}
                          /* Fixed: Corrected call to handlePodChange */
                          onChange={(e) => handlePodChange('lantai', e.target.value)}
                        >
                          <option value="Lt 2 Pria">Lt 2 Pria</option>
                          <option value="Lt 2 Perempuan">Lt 2 Perempuan</option>
                          <option value="Lt 3 Pria">Lt 3 Pria</option>
                          <option value="Lt 3 Perempuan">Lt 3 Perempuan</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-[10px] font-black text-gray-400 uppercase mb-2">Jenis Kamar</label>
                        <select 
                          disabled={isFieldDisabled}
                          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold bg-white focus:border-black outline-none appearance-none"
                          value={podForm.jenisKamar || ''}
                          /* Fixed: Corrected call to handlePodChange */
                          onChange={(e) => handlePodChange('jenisKamar', e.target.value)}
                        >
                          <option value="Single Bed">Single Bed</option>
                          <option value="Double Bed">Double Bed</option>
                          <option value="Quadruple Bed">Quadruple Bed</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-gray-400 uppercase mb-2">Nomor Kamar</label>
                      <input 
                        type="text" 
                        disabled={isFieldDisabled}
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-mono font-bold text-black focus:border-black outline-none" 
                        value={podForm.nomorKamar || ''} 
                        /* Fixed: Corrected call to handlePodChange */
                        onChange={(e) => handlePodChange('nomorKamar', e.target.value)}
                        placeholder="e.g. 217 A"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-gray-400 uppercase mb-2">Nama Penghuni</label>
                      <input 
                        type="text" 
                        disabled={isFieldDisabled}
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold text-black focus:border-black outline-none" 
                        value={podForm.namaPenghuni || ''} 
                        /* Fixed: Corrected call to handlePodChange */
                        onChange={(e) => handlePodChange('namaPenghuni', e.target.value)}
                        placeholder="Masukkan nama lengkap..."
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-6">
                  <SectionHeader icon={Lock} title="Facilities Status" />
                  <div className="space-y-4">
                    <div>
                      <label className="block text-[10px] font-black text-gray-400 uppercase mb-2">Status Loker Barang</label>
                      <select 
                        disabled={isFieldDisabled}
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold bg-white focus:border-black outline-none appearance-none"
                        value={podForm.statusLokerBarang || ''}
                        /* Fixed: Corrected call to handlePodChange */
                        onChange={(e) => handlePodChange('statusLokerBarang', e.target.value)}
                      >
                        <option value="Terpakai">Terpakai</option>
                        <option value="Tidak Terpakai">Tidak Terpakai</option>
                        <option value="Belum Dapat">Belum Dapat</option>
                        <option value="Extra Loker Terpakai">Extra Loker Terpakai</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-gray-400 uppercase mb-2">Status Loker Pantry</label>
                      <select 
                        disabled={isFieldDisabled}
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold bg-white focus:border-black outline-none appearance-none"
                        value={podForm.statusLokerPantry || ''}
                        /* Fixed: Corrected call to handlePodChange */
                        onChange={(e) => handlePodChange('statusLokerPantry', e.target.value)}
                      >
                        <option value="Terpakai">Terpakai</option>
                        <option value="Tidak Terpakai">Tidak Terpakai</option>
                        <option value="Belum Dapat">Belum Dapat</option>
                        <option value="Extra Loker Terpakai">Extra Loker Terpakai</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-gray-400 uppercase mb-2">Jadwal Laundry</label>
                      <input 
                        type="text" 
                        disabled={isFieldDisabled}
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold text-black focus:border-black outline-none" 
                        value={podForm.jadwalLaundry || ''} 
                        /* Fixed: Corrected call to handlePodChange */
                        onChange={(e) => handlePodChange('jadwalLaundry', e.target.value)}
                        placeholder="e.g. Selasa dan Jumat"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                <SectionHeader icon={MessageSquare} title="Keterangan" />
                <textarea 
                  rows={2}
                  disabled={isFieldDisabled}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium bg-white focus:border-black outline-none transition-all" 
                  placeholder="Catatan tambahan..." 
                  value={podForm.keterangan || ''} 
                  /* Fixed: Corrected call to handlePodChange */
                  onChange={(e) => handlePodChange('keterangan', e.target.value)} 
                />
              </div>
            </div>
          ) : isLocker ? (
            /* --- LOCKER FORM --- */
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-6">
                  <SectionHeader icon={Lock} title="Locker Identification" />
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-black text-gray-400 uppercase mb-2">Locker Number</label>
                        <input 
                          type="text" 
                          disabled={isFieldDisabled}
                          placeholder="e.g. S-2001"
                          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-mono font-bold text-black focus:border-black outline-none" 
                          value={lockerForm.lockerNumber || ''} 
                          /* Fixed: Corrected call to handleLockerChange */
                          onChange={(e) => handleLockerChange('lockerNumber', e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-black text-gray-400 uppercase mb-2">Spare Key Status</label>
                        <select 
                          disabled={isFieldDisabled}
                          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold bg-white focus:border-black outline-none appearance-none"
                          value={lockerForm.spareKey || 'Ada'}
                          /* Fixed: Corrected call to handleLockerChange */
                          onChange={(e) => handleLockerChange('spareKey', e.target.value)}
                        >
                          <option value="Ada">Ada</option>
                          <option value="Tidak Ada">Tidak Ada</option>
                        </select>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-black text-gray-400 uppercase mb-2">Floor Location</label>
                        <select 
                          disabled={isFieldDisabled}
                          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold bg-white focus:border-black outline-none appearance-none"
                          value={lockerForm.location || ''}
                          /* Fixed: Corrected call to handleLockerChange */
                          onChange={(e) => handleLockerChange('location', e.target.value)}
                        >
                          <option value="Lantai 1">Lantai 1</option>
                          <option value="Lantai 2">Lantai 2</option>
                          <option value="Lantai 3">Lantai 3</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-[10px] font-black text-gray-400 uppercase mb-2">Area / Sub Location</label>
                        <select 
                          disabled={isFieldDisabled || lockerForm.location === 'Lantai 1'}
                          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold bg-white focus:border-black outline-none appearance-none disabled:bg-gray-50"
                          value={lockerForm.subLocation || ''}
                          /* Fixed: Corrected call to handleLockerChange */
                          onChange={(e) => handleLockerChange('subLocation', e.target.value)}
                        >
                          <option value="-">-</option>
                          <option value="Satrio">Satrio</option>
                          <option value="Karang Asem">Karang Asem</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-gray-400 uppercase mb-2">Status</label>
                      <div className="flex gap-2">
                        {['Kosong', 'Terisi', 'Kunci Hilang'].map((s) => (
                          <button
                            key={s}
                            disabled={isFieldDisabled}
                            /* Fixed: Corrected call to handleLockerChange */
                            onClick={() => handleLockerChange(s, s)}
                            className={`flex-1 py-2 text-[10px] font-black rounded-lg border transition-all uppercase tracking-widest
                              ${lockerForm.status === s 
                                ? (s === 'Kosong' ? 'bg-green-500 text-white border-green-600' : s === 'Terisi' ? 'bg-black text-white border-black' : s === 'Kunci Hilang' ? 'bg-red-500 text-white border-red-600' : 'bg-red-50 text-red-600') 
                                : 'bg-white text-gray-400 border-gray-200 hover:border-black hover:text-black'}`}
                          >
                            {s}
                          </button>
                        ))}
                      </div>
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
                          <input 
                            type="text" 
                            disabled={isFieldDisabled}
                            placeholder="Full name of employee"
                            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold text-black focus:border-black outline-none" 
                            value={lockerForm.employee?.name || ''} 
                            /* Fixed: Corrected call to handleLockerEmployeeChange */
                            onChange={(e) => handleLockerEmployeeChange('name', e.target.value)}
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[10px] font-black text-gray-400 uppercase mb-2">Position</label>
                            <input 
                              type="text" 
                              disabled={isFieldDisabled}
                              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold text-black focus:border-black outline-none" 
                              value={lockerForm.employee?.position || ''} 
                              /* Fixed: Corrected call to handleLockerEmployeeChange */
                              onChange={(e) => handleLockerEmployeeChange('position', e.target.value)}
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] font-black text-gray-400 uppercase mb-2">Department</label>
                            <input 
                              type="text" 
                              disabled={isFieldDisabled}
                              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold text-black focus:border-black outline-none" 
                              value={lockerForm.employee?.department || ''} 
                              /* Fixed: Corrected call to handleLockerEmployeeChange */
                              onChange={(e) => handleLockerEmployeeChange('department', e.target.value)}
                            />
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="h-40 flex flex-col items-center justify-center border-2 border-dashed border-gray-100 rounded-2xl opacity-40">
                         <User size={32} className="text-gray-300 mb-2" />
                         <p className="text-[10px] font-black text-gray-400 uppercase">No occupant assigned</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-6">
                <SectionHeader icon={MessageSquare} title="Audit & Remarks" />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase mb-2">Last Audit / Update</label>
                    <input 
                      type="date" 
                      disabled={isFieldDisabled}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold bg-white focus:border-black outline-none" 
                      value={lockerForm.lastUpdate || ''} 
                      /* Fixed: Corrected call to handleLockerChange */
                      onChange={(e) => handleLockerChange('lastUpdate', e.target.value)}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-[10px] font-black text-gray-400 uppercase mb-2">Remarks</label>
                    <textarea 
                      rows={1}
                      disabled={isFieldDisabled}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium bg-white focus:border-black outline-none transition-all" 
                      placeholder="Maintenance notes, damage, or other info..." 
                      value={lockerForm.remarks || ''} 
                      /* Fixed: Corrected call to handleLockerChange */
                      onChange={(e) => handleLockerChange('remarks', e.target.value)} 
                    />
                  </div>
                </div>
              </div>
            </div>
          ) : isStockOpname ? (
            /* --- STOCK OPNAME FORM --- */
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-6">
                  <SectionHeader icon={Activity} title="Record Metadata" />
                  <div className="space-y-4">
                    <div>
                      <label className="block text-[10px] font-black text-gray-400 uppercase mb-2">Opname Number</label>
                      <input type="text" readOnly className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm font-mono font-bold text-gray-500" value={stockOpnameForm.opnameNumber || 'SO/ATK/2024/0004'} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-black text-gray-400 uppercase mb-2">Date</label>
                        <input 
                          type="date" 
                          disabled={isFieldDisabled}
                          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold bg-white focus:border-black outline-none" 
                          value={stockOpnameForm.date || '2024-03-22'} 
                          /* Fixed: Corrected call to handleStockOpnameChange */
                          onChange={(e) => handleStockOpnameChange('date', e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-black text-gray-400 uppercase mb-2">Performed By</label>
                        <input 
                          type="text" 
                          disabled={isFieldDisabled}
                          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold bg-white focus:border-black outline-none" 
                          value={stockOpnameForm.performedBy || 'Aan Junaidi'} 
                          /* Fixed: Corrected call to handleStockOpnameChange */
                          onChange={(e) => handleStockOpnameChange('performedBy', e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-6">
                  <SectionHeader icon={Search} title="Inventory Selection" />
                  <div className="space-y-4">
                    <div>
                      <label className="block text-[10px] font-black text-gray-400 uppercase mb-2">Inventory Category</label>
                      <div className="flex bg-gray-100 p-1 rounded-xl border border-gray-200 shadow-inner">
                        <button 
                           onClick={() => { setOpnameInventoryType('ATK'); setOpnameSelectedCategory(''); }}
                           disabled={isFieldDisabled}
                           className={`flex-1 py-2 text-[10px] font-black rounded-lg transition-all uppercase tracking-widest flex items-center justify-center gap-2
                             ${opnameInventoryType === 'ATK' ? 'bg-black text-white shadow-lg' : 'text-gray-400 hover:text-black'}`}
                        >
                          <Box size={14} /> ATK Stationery
                        </button>
                        <button 
                           onClick={() => { setOpnameInventoryType('ARK'); setOpnameSelectedCategory(''); }}
                           disabled={isFieldDisabled}
                           className={`flex-1 py-2 text-[10px] font-black rounded-lg transition-all uppercase tracking-widest flex items-center justify-center gap-2
                             ${opnameInventoryType === 'ARK' ? 'bg-black text-white shadow-lg' : 'text-gray-400 hover:text-black'}`}
                        >
                          <Home size={14} /> ARK Household
                        </button>
                      </div>
                    </div>
                    
                    {/* Item Category Dropdown */}
                    <div>
                      <label className="block text-[10px] font-black text-gray-400 uppercase mb-2">Item Category</label>
                      <div className="relative">
                        <select 
                          disabled={isFieldDisabled}
                          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold bg-white focus:border-black outline-none appearance-none shadow-sm transition-all"
                          value={opnameSelectedCategory || stockOpnameForm.category || 'Elektronik'}
                          onChange={(e) => {
                            setOpnameSelectedCategory(e.target.value);
                          }}
                        >
                          <option value="">(Select Category)</option>
                          {/* Fixed: Removed '刻' from constant name */}
                          {(opnameInventoryType === 'ARK' ? MOCK_ARK_CATEGORY : MOCK_ATK_CATEGORY).map(c => (
                            <option key={c.id} value={c.name}>{c.name}</option>
                          ))}
                        </select>
                        <Layers size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Opname Multi-Item Table - Dynamic based on category */}
              {(opnameSelectedCategory || isViewMode) && (
                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden animate-in fade-in slide-in-from-top-4 duration-300">
                    <div className="p-5 border-b border-gray-100 flex items-center gap-2 bg-gray-50/50">
                        {/* Fixed: Removed '刻' from icon component name */}
                        <ClipboardCheck size={16} className="text-blue-500" />
                        <h4 className="text-[10px] font-black text-black uppercase tracking-widest">Audit List for {opnameSelectedCategory || stockOpnameForm.category || 'Elektronik'}</h4>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-white border-b border-gray-200 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                                    <th className="px-8 py-4 w-12 text-center">#</th>
                                    <th className="px-8 py-4">Item Code / Name</th>
                                    <th className="px-8 py-4 text-center">System Qty</th>
                                    <th className="px-8 py-4 text-center">Physical Qty</th>
                                    <th className="px-8 py-4 text-center">Difference</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {opnameEntries.length > 0 ? opnameEntries.map((entry, index) => (
                                    <tr key={entry.itemCode} className="hover:bg-gray-50/30 transition-colors">
                                        <td className="px-8 py-4 text-center font-bold text-gray-300 text-[11px]">{index + 1}</td>
                                        <td className="px-8 py-4">
                                            <div className="font-mono text-[10px] text-gray-400 font-bold">{entry.itemCode}</div>
                                            <div className="text-[13px] font-black text-black uppercase">{entry.itemName}</div>
                                        </td>
                                        <td className="px-8 py-4 text-center">
                                            <span className="font-mono text-base font-black text-gray-300">{entry.systemQty}</span>
                                        </td>
                                        <td className="px-8 py-4 text-center">
                                            <input 
                                                type="number" 
                                                disabled={isFieldDisabled}
                                                className="w-24 bg-white border border-gray-200 rounded-lg px-3 py-2 text-center text-base font-black text-black focus:border-black outline-none shadow-sm transition-all disabled:bg-gray-50"
                                                value={entry.physicalQty}
                                                /* Fixed: Corrected misspelled call handleOpnamePhysicalChange */
                                                onChange={(e) => handleOpnamePhysicalChange(index, parseInt(e.target.value) || 0)}
                                            />
                                        </td>
                                        <td className="px-8 py-4 text-center">
                                            <div className={`text-base font-black ${entry.difference === 0 ? 'text-green-500' : 'text-red-500'}`}>
                                                {entry.difference > 0 ? `+${entry.difference}` : entry.difference}
                                            </div>
                                        </td>
                                    </tr>
                                )) : (
                                    /* Mock entry for view mode as requested by reference image */
                                    <tr className="hover:bg-gray-50/30 transition-colors">
                                        <td className="px-8 py-4 text-center font-bold text-gray-300 text-[11px]">1</td>
                                        <td className="px-8 py-4">
                                            <div className="font-mono text-[10px] text-gray-400 font-bold">EL-BAT-AA</div>
                                            <div className="text-[13px] font-black text-black uppercase">BATERAI AA ALKALINE</div>
                                        </td>
                                        <td className="px-8 py-4 text-center">
                                            <span className="font-mono text-base font-black text-gray-300">24</span>
                                        </td>
                                        <td className="px-8 py-4 text-center">
                                            <input 
                                                type="number" 
                                                disabled={isFieldDisabled}
                                                className="w-24 bg-white border border-gray-200 rounded-lg px-3 py-2 text-center text-base font-black text-black focus:border-black outline-none shadow-sm transition-all disabled:bg-gray-50"
                                                value={24}
                                            />
                                        </td>
                                        <td className="px-8 py-4 text-center">
                                            <div className="text-base font-black text-green-500">0</div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
              )}

              {/* Total Summary Footer */}
              <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-black"></div>
                <SectionHeader icon={Hash} title="Audit Summary (Category Total)" />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center mt-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Total System Qty</label>
                    <div className="text-[42px] font-black text-gray-300">{opnameEntries.length > 0 ? opnameTotals.system : 24}</div>
                    <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Existing in Database</p>
                  </div>
                  <div className="space-y-4">
                    <label className="text-[10px] font-black text-black uppercase tracking-[0.2em]">Total Physical Qty</label>
                    <div className="text-[42px] font-black text-black">{opnameEntries.length > 0 ? opnameTotals.physical : 24}</div>
                    <p className="text-[9px] font-bold text-black uppercase tracking-widest">Aggregate count</p>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Total Difference</label>
                    <div className={`text-[42px] font-black ${(opnameEntries.length > 0 ? opnameTotals.diff : 0) === 0 ? 'text-green-500' : 'text-red-500'}`}>
                      {opnameEntries.length > 0 ? (opnameTotals.diff > 0 ? `+${opnameTotals.diff}` : opnameTotals.diff) : 0}
                    </div>
                    <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border
                      ${(opnameEntries.length > 0 ? opnameTotals.diff : 0) === 0 ? 'bg-green-50 text-green-600 border-green-100' : 'bg-red-50 text-red-600 border-red-100'}`}>
                      {/* Fixed: Removed '刻' from icon component name */}
                      {(opnameEntries.length > 0 ? opnameTotals.diff : 0) === 0 ? <CheckCircle2 size={10} /> : <AlertTriangle size={10} />}
                      {(opnameEntries.length > 0 ? opnameTotals.diff : 0) === 0 ? 'Matched' : 'Discrepancy'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : isStationeryRequest && isViewMode ? (
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
                      <SectionHeader icon={Package} title="Request Setup" />
                      <div className="space-y-4">
                          <div>
                            <label className="text-[9px] font-black text-gray-400 uppercase block mb-1">Category</label>
                            <div className="relative">
                                <select 
                                disabled={isFieldDisabled}
                                className="w-full border border-gray-200 rounded-xl px-3 py-2 text-[12px] font-black bg-white uppercase shadow-sm appearance-none focus:border-black outline-none" 
                                value={stationeryRequestForm.type} 
                                /* Fixed: Corrected call to handleStationeryRequestChange */
                                onChange={(e) => handleStationeryRequestChange('type', e.target.value)}
                                >
                                    <option value="DAILY REQUEST">DAILY REQUEST</option>
                                    <option value="EVENT REQUEST">EVENT REQUEST</option>
                                </select>
                                {/* Fixed: Removed '刻' from icon component name */}
                                <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            </div>
                          </div>
                          <div>
                            <label className="text-[9px] font-black text-gray-400 uppercase block mb-1">Submit Date</label>
                            <input 
                              type="date" 
                              disabled={isFieldDisabled}
                              className="w-full border border-gray-200 rounded-xl px-3 py-2 text-[12px] font-bold bg-white shadow-sm focus:border-black outline-none" 
                              value={stationeryRequestForm.date} 
                              /* Fixed: Corrected call to handleStationeryRequestChange */
                              onChange={(e) => handleStationeryRequestChange('date', e.target.value)} 
                            />
                          </div>
                      </div>
                   </div>
                   <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                      <SectionHeader icon={MapPin} title="Delivery & Status" />
                      <div className="space-y-4">
                          <div>
                            <label className="text-[9px] font-black text-gray-400 uppercase block mb-1">Location</label>
                            <div className="relative">
                                <select 
                                disabled={isFieldDisabled}
                                className="w-full border border-gray-200 rounded-xl px-3 py-2 text-[12px] font-black bg-white uppercase shadow-sm appearance-none focus:border-black outline-none" 
                                value={stationeryRequestForm.location} 
                                /* Fixed: Corrected call to handleStationeryRequestChange */
                                onChange={(e) => handleStationeryRequestChange('location', e.target.value)}
                                >
                                    <option value="Satrio">Satrio</option>
                                    <option value="Suryo">Suryo</option>
                                    <option value="Kemang">Kemang</option>
                                </select>
                                {/* Fixed: Removed '刻' from icon component name */}
                                <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            </div>
                          </div>
                          <div>
                            <label className="block text-[9px] font-black text-gray-400 uppercase mb-1">Delivery Method</label>
                            <div className="relative">
                                <select 
                                disabled={isFieldDisabled}
                                className="w-full border border-gray-200 rounded-xl px-3 py-2 text-[12px] font-black bg-white uppercase shadow-sm appearance-none focus:border-black outline-none" 
                                value={stationeryRequestForm.deliveryType} 
                                /* Fixed: Corrected call to handleStationeryRequestChange */
                                onChange={(e) => handleStationeryRequestChange('deliveryType', e.target.value)}
                                >
                                    <option value="PICKUP HO">PICKUP HO</option>
                                </select>
                                {/* Fixed: Removed '刻' from icon component name */}
                                <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            </div>
                          </div>
                      </div>
                   </div>
               </div>
               <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden mt-8">
                  <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/30">
                    <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Inventory List</h4>
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
                                <th className="px-8 py-4 w-24 text-center">UOM</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {requestItems.map((item, index) => {
                                const masterList = isArkModule ? MOCK_MASTER_ARK_DATA : MOCK_MASTER_DATA;
                                const selectedProduct = masterList.find(m => m.id.toString() === item.itemId);
                                
                                return (
                                    <tr key={index} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="px-8 py-4 text-center font-bold text-gray-300 text-[11px]">{index + 1}</td>
                                        <td className="px-8 py-4">
                                            <div className="relative">
                                                <select 
                                                    disabled={isFieldDisabled}
                                                    className="w-full border border-gray-200 rounded-xl px-2 py-1.5 text-[11px] font-bold bg-white appearance-none outline-none focus:border-black" 
                                                    value={item.categoryId}
                                                    /* Fixed: Corrected call to handleRequestItemChange */
                                                    onChange={(e) => handleRequestItemChange(index, 'categoryId', e.target.value)}
                                                >
                                                    <option>{item.categoryId || 'N/A'}</option>
                                                </select>
                                                {/* Fixed: Removed '刻' from icon component name */}
                                                <ChevronDown size={10} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-300" />
                                            </div>
                                        </td>
                                        <td className="px-8 py-4">
                                            <div className="relative">
                                                <select 
                                                    disabled={isFieldDisabled}
                                                    className="w-full border border-gray-200 rounded-xl px-2 py-1.5 text-[11px] font-bold bg-white appearance-none outline-none focus:border-black" 
                                                    value={item.itemId}
                                                    /* Fixed: Corrected call to handleRequestItemChange */
                                                    onChange={(e) => handleRequestItemChange(index, 'itemId', e.target.value)}
                                                >
                                                    <option>{selectedProduct ? `${selectedProduct.itemCode} - ${selectedProduct.itemName}` : 'Search Product...'}</option>
                                                </select>
                                                {/* Fixed: Removed '刻' from icon component name */}
                                                <ChevronDown size={10} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-300" />
                                            </div>
                                        </td>
                                        <td className="px-8 py-4 text-center">
                                            <input 
                                                type="number" 
                                                disabled={isFieldDisabled}
                                                className="w-20 border border-gray-200 rounded-xl px-2 py-1.5 text-[14px] font-black text-center bg-white focus:border-black outline-none" 
                                                value={item.qty} 
                                                /* Fixed: Corrected call to handleRequestItemChange */
                                                onChange={(e) => handleRequestItemChange(index, 'qty', e.target.value)}
                                            />
                                        </td>
                                        <td className="px-8 py-4 text-center">
                                            <span className="font-mono font-black text-[14px] text-gray-400">{selectedProduct?.remainingStock ?? '-'}</span>
                                        </td>
                                        <td className="px-8 py-4 text-center">
                                            <div className="relative">
                                                <select 
                                                    disabled={isFieldDisabled}
                                                    className="w-full border border-gray-200 rounded-xl px-1 py-1.5 text-[10px] font-black text-center uppercase bg-white appearance-none focus:border-black outline-none" 
                                                    value={item.uom}
                                                    /* Fixed: Corrected call to handleRequestItemChange */
                                                    onChange={(e) => handleRequestItemChange(index, 'uom', e.target.value)}
                                                >
                                                    <option>{item.uom || 'UOM'}</option>
                                                </select>
                                                {/* Fixed: Removed '刻' from icon component name */}
                                                <ChevronDown size={10} className="absolute right-1 top-1/2 -translate-y-1/2 text-gray-300" />
                                            </div>
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
            /* --- EDITABLE LOG BOOK CONTENT MATCHING IMAGE --- */
            <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Visitor Information Card */}
                  <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm space-y-8">
                    <SectionHeader icon={List} title="Data Kunjungan" />
                    <div className="space-y-6">
                      <div>
                        <label className="block text-[10px] font-black text-gray-400 uppercase mb-2 tracking-widest">Nama Tamu</label>
                        <input 
                          type="text" 
                          disabled={isFieldDisabled}
                          placeholder="Nama Lengkap Tamu..."
                          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold text-black focus:border-black outline-none transition-all bg-white" 
                          value={logBookForm.namaTamu || ''} 
                          /* Fixed: Corrected call to handleLogBookChange */
                          onChange={(e) => handleLogBookChange('namaTamu', e.target.value)}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <label className="block text-[10px] font-black text-gray-400 uppercase mb-2 tracking-widest">Kategori</label>
                          <div className="relative">
                            <select 
                                disabled={isFieldDisabled}
                                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-black text-black focus:border-black outline-none appearance-none bg-white shadow-sm"
                                value={logBookForm.kategoriTamu || ''}
                                /* Fixed: Corrected call to handleLogBookChange */
                                onChange={(e) => handleLogBookChange('kategoriTamu', e.target.value)}
                            >
                                <option value="Vendor">Vendor</option>
                                <option value="Supplier">Supplier</option>
                                <option value="Partner">Partner</option>
                                <option value="Customer">Customer</option>
                                <option value="Other">Other</option>
                            </select>
                            {/* Fixed: Removed '刻' from icon component name */}
                            <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
                          </div>
                        </div>
                        <div>
                          <label className="block text-[10px] font-black text-gray-400 uppercase mb-2 tracking-widest">Lokasi Modena</label>
                          <div className="relative">
                            <select 
                                disabled={isFieldDisabled}
                                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-black text-black focus:border-black outline-none appearance-none bg-white shadow-sm"
                                value={logBookForm.lokasiModena || ''}
                                /* Fixed: Corrected call to handleLogBookChange */
                                onChange={(e) => handleLogBookChange('lokasiModena', e.target.value)}
                            >
                                <option value="Satrio">Satrio</option>
                                <option value="Suryo">Suryo</option>
                                <option value="Kemang">Kemang</option>
                            </select>
                            {/* Fixed: Removed '刻' from icon component name */}
                            <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
                          </div>
                        </div>
                      </div>

                      {/* NEW FIELDS: Phone & Email */}
                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <label className="block text-[10px] font-black text-gray-400 uppercase mb-2 tracking-widest">Nomor HP</label>
                          <input 
                            type="text" 
                            disabled={isFieldDisabled}
                            placeholder="08xx..."
                            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold text-black focus:border-black outline-none transition-all bg-white shadow-sm" 
                            value={logBookForm.nomorHp || ''} 
                            /* Fixed: Corrected call to handleLogBookChange */
                            onChange={(e) => handleLogBookChange('nomorHp', e.target.value)}
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-black text-gray-400 uppercase mb-2 tracking-widest">Email</label>
                          <input 
                            type="email" 
                            disabled={isFieldDisabled}
                            placeholder="example@mail.com"
                            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold text-black focus:border-black outline-none transition-all bg-white shadow-sm" 
                            value={logBookForm.email || ''} 
                            /* Fixed: Corrected call to handleLogBookChange */
                            onChange={(e) => handleLogBookChange('email', e.target.value)}
                          />
                        </div>
                      </div>

                      {/* NEW FIELDS: Visitor Card & ID Card */}
                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <label className="block text-[10px] font-black text-gray-400 uppercase mb-2 tracking-widest">Nomor Visitor Card</label>
                          <input 
                            type="text" 
                            disabled={isFieldDisabled}
                            placeholder="No. Kartu..."
                            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold text-black focus:border-black outline-none transition-all bg-white shadow-sm" 
                            value={logBookForm.visitorCard || ''} 
                            /* Fixed: Corrected call to handleLogBookChange */
                            onChange={(e) => handleLogBookChange('visitorCard', e.target.value)}
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-black text-gray-400 uppercase mb-2 tracking-widest">No. Identitas (KTP/SIM/Passport)</label>
                          <input 
                            type="text" 
                            disabled={isFieldDisabled}
                            placeholder="No. Identitas..."
                            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold text-black focus:border-black outline-none transition-all bg-white shadow-sm" 
                            value={logBookForm.noIdentitas || ''} 
                            /* Fixed: Corrected call to handleLogBookChange */
                            onChange={(e) => handleLogBookChange('noIdentitas', e.target.value)}
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] font-black text-gray-400 uppercase mb-2 tracking-widest">Tanggal Kunjungan</label>
                        <input 
                          type="date" 
                          disabled={isFieldDisabled}
                          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold text-black focus:border-black outline-none transition-all shadow-sm" 
                          value={logBookForm.tanggalKunjungan || ''} 
                          /* Fixed: Corrected call to handleLogBookChange */
                          onChange={(e) => handleLogBookChange('tanggalKunjungan', e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Time & Attendance Card */}
                  <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm space-y-8">
                    <SectionHeader icon={Clock} title="Waktu & Jumlah Orang" />
                    <div className="space-y-6">
                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <label className="block text-[10px] font-black text-gray-400 uppercase mb-2 tracking-widest">Jam Masuk (IN)</label>
                          <div className="relative">
                            <input 
                                type="time" 
                                disabled={isFieldDisabled}
                                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-mono font-black text-black focus:border-black outline-none transition-all shadow-sm appearance-none" 
                                value={logBookForm.jamDatang || ''} 
                                /* Fixed: Corrected call to handleLogBookChange */
                                onChange={(e) => handleLogBookChange('jamDatang', e.target.value)}
                            />
                            {/* Fixed: Removed '刻' from icon component name */}
                            <Clock size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300" />
                          </div>
                        </div>
                        <div>
                          <label className="block text-[10px] font-black text-gray-400 uppercase mb-2 tracking-widest">Jam Keluar (OUT)</label>
                          <div className="relative">
                            <input 
                                type="time" 
                                disabled={isFieldDisabled}
                                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-mono font-black text-black focus:border-black outline-none transition-all shadow-sm appearance-none" 
                                value={logBookForm.jamPulang || ''} 
                                /* Fixed: Corrected call to handleLogBookChange */
                                onChange={(e) => handleLogBookChange('jamPulang', e.target.value)}
                            />
                            {/* Fixed: Removed '刻' from icon component name */}
                            <Clock size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300" />
                          </div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4">
                        <div className="text-center p-4 bg-pink-50/20 rounded-2xl border border-pink-100">
                          <label className="block text-[9px] font-black text-pink-400 uppercase mb-2">Wanita</label>
                          <div className="flex items-center justify-center gap-2">
                            <Users size={16} className="text-pink-300" />
                            <input 
                              type="number" 
                              disabled={isFieldDisabled}
                              className="w-12 bg-transparent text-center text-[16px] font-black text-black outline-none" 
                              value={logBookForm.wanita || 0} 
                              /* Fixed: Corrected call to handleLogBookChange */
                              onChange={(e) => handleLogBookChange('wanita', parseInt(e.target.value) || 0)}
                            />
                          </div>
                        </div>
                        <div className="text-center p-4 bg-blue-50/20 rounded-2xl border border-blue-100">
                          <label className="block text-[9px] font-black text-blue-400 uppercase mb-2">Laki-laki</label>
                          <div className="flex items-center justify-center gap-2">
                            <User size={16} className="text-blue-300" />
                            <input 
                              type="number" 
                              disabled={isFieldDisabled}
                              className="w-12 bg-transparent text-center text-[16px] font-black text-black outline-none" 
                              value={logBookForm.lakiLaki || 0} 
                              /* Fixed: Corrected call to handleLogBookChange */
                              onChange={(e) => handleLogBookChange('lakiLaki', parseInt(e.target.value) || 0)}
                            />
                          </div>
                        </div>
                        <div className="text-center p-4 bg-orange-50/20 rounded-2xl border border-orange-100">
                          <label className="block text-[9px] font-black text-orange-400 uppercase mb-2">Anak-anak</label>
                          <div className="flex items-center justify-center gap-2">
                            <Baby size={16} className="text-orange-300" />
                            <input 
                              type="number" 
                              disabled={isFieldDisabled}
                              className="w-12 bg-transparent text-center text-[16px] font-black text-black outline-none" 
                              value={logBookForm.anakAnak || 0} 
                              /* Fixed: Corrected call to handleLogBookChange */
                              onChange={(e) => handleLogBookChange('anakAnak', parseInt(e.target.value) || 0)}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Remarks Card */}
                <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm space-y-6">
                  <SectionHeader icon={MessageSquare} title="Keterangan / Tujuan Kunjungan" />
                  <textarea 
                    rows={4}
                    disabled={isFieldDisabled}
                    placeholder="Contoh: Meeting koordinasi pemasangan unit kitchen set MODENA..."
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium text-black focus:border-black outline-none transition-all bg-white shadow-sm" 
                    value={logBookForm.note || ''} 
                    /* Fixed: Corrected call to handleLogBookChange */
                    onChange={(e) => handleLogBookChange('note', e.target.value)} 
                  />
                </div>
            </div>
          ) : isStationeryRequest && !isViewMode ? (
            /* --- CREATE MODE STATIONERY (SCMP STYLE) --- */
             <div className="space-y-6">
                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                     {/* ORDER SETUP BOX */}
                     <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
                         <SectionHeader icon={FileText} title="ORDER SETUP" />
                         <div className="grid grid-cols-2 gap-6">
                             <div>
                                <label className="block text-[10px] font-black text-gray-400 uppercase mb-2">ORDER TYPE</label>
                                <div className="relative">
                                    <select 
                                        className="w-full border border-gray-200 rounded-xl px-4 py-3.5 text-[12px] font-black bg-white uppercase appearance-none focus:border-black outline-none transition-all shadow-sm" 
                                        value={stationeryRequestForm.type} 
                                        /* Fixed: Corrected call to handleStationeryRequestChange */
                                        onChange={(e) => handleStationeryRequestChange('type', e.target.value)}
                                    >
                                        <option value="DAILY REQUEST">DAILY REQUEST</option>
                                        <option value="EVENT REQUEST">EVENT REQUEST</option>
                                    </select>
                                    {/* Fixed: Removed '刻' from icon component name */}
                                    <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                </div>
                             </div>
                             <div>
                                <label className="block text-[10px] font-black text-gray-400 uppercase mb-2">DATE</label>
                                <input 
                                    type="date" 
                                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-[12px] font-bold bg-white focus:border-black outline-none transition-all shadow-sm" 
                                    value={stationeryRequestForm.date} 
                                    /* Fixed: Corrected call to handleStationeryRequestChange */
                                    onChange={(e) => handleStationeryRequestChange('date', e.target.value)} 
                                />
                             </div>
                         </div>
                     </div>

                     {/* DELIVERY STATUS BOX */}
                     <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
                        <SectionHeader icon={MapPin} title="DELIVERY STATUS" />
                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label className="block text-[10px] font-black text-gray-400 uppercase mb-2 tracking-widest">LOCATION</label>
                                <div className="relative">
                                    <select 
                                        className="w-full border border-gray-200 rounded-xl px-4 py-3.5 text-[12px] font-black bg-white uppercase appearance-none focus:border-black outline-none transition-all shadow-sm" 
                                        value={stationeryRequestForm.location} 
                                        /* Fixed: Corrected call to handleStationeryRequestChange */
                                        onChange={(e) => handleStationeryRequestChange('location', e.target.value)}
                                    >
                                        <option value="Satrio">Satrio</option>
                                        <option value="Suryo">Suryo</option>
                                        <option value="Kemang">Kemang</option>
                                    </select>
                                    {/* Fixed: Removed '刻' from icon component name */}
                                    <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-[10px] font-black text-gray-400 uppercase mb-2 tracking-widest">DELIVERY METHOD</label>
                                <div className="relative">
                                    <select 
                                        className="w-full border border-gray-200 rounded-xl px-4 py-3.5 text-[12px] font-black bg-white uppercase appearance-none focus:border-black outline-none transition-all shadow-sm"
                                        value={stationeryRequestForm.deliveryType}
                                        /* Fixed: Corrected call to handleStationeryRequestChange */
                                        onChange={(e) => handleStationeryRequestChange('deliveryType', e.target.value)}
                                    >
                                        <option value="PICKUP HO">PICKUP HO</option>
                                    </select>
                                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                                        {/* Fixed: Removed '刻' from icon component name */}
                                        <ChevronDown size={14} className="text-gray-400" />
                                    </div>
                                </div>
                            </div>
                        </div>
                     </div>
                 </div>

                 {/* INVENTORY LIST TABLE */}
                 <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden mt-8">
                    <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/30">
                        <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">INVENTORY LIST</h4>
                        <button onClick={addRequestItemRow} className="text-[9px] font-black uppercase tracking-widest px-4 py-2 bg-black text-white rounded-xl hover:bg-gray-800 transition-all">+ ADD ROW</button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-white border-b border-gray-200 text-[10px] font-black text-gray-400 uppercase tracking-[0.15em]">
                                    <th className="px-8 py-4 w-12 text-center">#</th>
                                    <th className="px-8 py-4 w-56">CATEGORY</th>
                                    <th className="px-8 py-4">ITEM NAME / DESCRIPTION</th>
                                    <th className="px-8 py-4 w-32 text-center">QTY</th>
                                    <th className="px-8 py-4 w-32 text-center">IN STOCK</th>
                                    <th className="px-8 py-4 w-32 text-center">UOM</th>
                                    <th className="px-8 py-4 w-16 text-center"></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {requestItems.map((item, index) => {
                                    /* Fixed: Corrected constant names to remove '刻' */
                                    const categoryList = isArkModule ? MOCK_ARK_CATEGORY : MOCK_ATK_CATEGORY;
                                    const masterList = isArkModule ? MOCK_MASTER_ARK_DATA : MOCK_MASTER_DATA;
                                    const filteredItems = item.categoryId ? masterList.filter(m => m.category === item.categoryId) : [];
                                    const selectedItemData = masterList.find(m => m.id.toString() === item.itemId);
                                    
                                    return (
                                        <tr key={index} className="hover:bg-gray-50/50 transition-colors">
                                            <td className="px-8 py-5 text-center text-gray-300 font-bold text-[11px]">{index + 1}</td>
                                            <td className="px-8 py-5">
                                                <div className="relative">
                                                    <select 
                                                        className="w-full border border-gray-200 rounded-xl px-4 py-2 text-[11px] font-bold bg-white focus:border-black outline-none appearance-none" 
                                                        value={item.categoryId} 
                                                        /* Fixed: Corrected misspelled call handleRequestItemChange */
                                                        onChange={(e) => handleRequestItemChange(index, 'categoryId', e.target.value)}
                                                    >
                                                        <option value="">Category...</option>
                                                        {categoryList.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                                                    </select>
                                                    {/* Fixed: Removed '刻' from icon component name */}
                                                    <ChevronDown size={12} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300" />
                                                </div>
                                            </td>
                                            <td className="px-8 py-5">
                                                <div className="relative">
                                                    <select 
                                                        disabled={!item.categoryId}
                                                        className={`w-full border border-gray-200 rounded-xl px-4 py-2 text-[11px] font-bold appearance-none outline-none focus:border-black ${!item.categoryId ? 'bg-gray-50 text-gray-300' : 'text-black bg-white'}`} 
                                                        value={item.itemId} 
                                                        /* Fixed: Corrected misspelled call handleRequestItemChange */
                                                        onChange={(e) => handleRequestItemChange(index, 'itemId', e.target.value)}
                                                    >
                                                        <option value="">{item.categoryId ? 'Search Product...' : 'Select category'}</option>
                                                        {filteredItems.map(m => <option key={m.id} value={m.id}>{m.itemCode} - {m.itemName}</option>)}
                                                    </select>
                                                    {/* Fixed: Removed '刻' from icon component name */}
                                                    <ChevronDown size={12} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300" />
                                                </div>
                                            </td>
                                            <td className="px-8 py-5 text-center">
                                                <input 
                                                    type="number" 
                                                    className="w-24 border border-gray-200 rounded-xl px-2 py-2 text-[14px] font-black text-center bg-white focus:border-black outline-none" 
                                                    value={item.qty} 
                                                    /* Fixed: Corrected misspelled call handleRequestItemChange */
                                                    onChange={(e) => handleRequestItemChange(index, 'qty', e.target.value)} 
                                                />
                                            </td>
                                            <td className="px-8 py-5 text-center">
                                                <span className="font-mono font-black text-[14px] text-gray-400">
                                                    {selectedItemData?.remainingStock ?? '-'}
                                                </span>
                                            </td>
                                            <td className="px-8 py-5 text-center">
                                                <div className="relative">
                                                    <select 
                                                        className="w-full border border-gray-200 rounded-xl px-1 py-2 text-[10px] font-black text-center uppercase bg-white appearance-none outline-none" 
                                                        value={item.uom} 
                                                        /* Fixed: Corrected misspelled call handleRequestItemChange */
                                                        onChange={(e) => handleRequestItemChange(index, 'uom', e.target.value)} 
                                                    >
                                                        <option value="">UOM</option>
                                                        {MOCK_UOM_DATA.map(u => <option key={u.id} value={u.name}>{u.name}</option>)}
                                                    </select>
                                                    {/* Fixed: Removed '刻' from icon component name */}
                                                    <ChevronDown size={10} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-300" />
                                                </div>
                                            </td>
                                            <td className="px-8 py-5 text-center">
                                                <button onClick={() => removeRequestItemRow(index)} className="text-gray-300 hover:text-red-500 transition-all active:scale-90"><X size={18}/></button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                 </div>
             </div>
          ) : (
            <div className="p-12 text-center text-gray-400 uppercase font-black text-[10px] tracking-widest">Detail View for {moduleName}</div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="px-8 py-6 bg-white border-t border-gray-100 flex justify-end gap-3 shrink-0">
          {isViewMode ? (
            isApprovalModule ? (
              <>
                 {/* Fixed: Corrected misspelled call onClose */}
                 <button onClick={onClose} className="px-10 py-3 text-[11px] font-black uppercase tracking-widest text-gray-400 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 hover:text-black transition-all">CANCEL</button>
                 <button onClick={onReject} className="px-10 py-3 text-[11px] font-black uppercase tracking-widest text-red-500 bg-white border border-red-500 rounded-xl hover:bg-red-50 transition-all active:scale-95 shadow-sm">REJECTED</button>
                 <button onClick={onApprove} className="px-12 py-3 text-[11px] font-black uppercase tracking-widest text-white bg-black rounded-xl hover:bg-gray-800 shadow-xl shadow-black/20 transition-all active:scale-95">APPROVED</button>
              </>
            ) : (
              <>
                {/* Fixed: Corrected misspelled call onClose */}
                <button onClick={onClose} className="px-10 py-3 text-[11px] font-black uppercase tracking-widest text-black bg-gray-100 rounded-xl hover:bg-gray-200 transition-all">CLOSE</button>
              </>
            )
          ) : (
            <>
              {/* Fixed: Corrected misspelled call onClose */}
              <button onClick={onClose} className="px-10 py-3 text-[11px] font-black uppercase tracking-widest text-gray-400 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 hover:text-black transition-all">CANCEL</button>
              {(isStationeryRequest || isLogBook) && !isViewMode && (
                <button onClick={handleSave} className="px-10 py-3 text-[11px] font-black uppercase tracking-widest text-black bg-white border border-black rounded-xl hover:bg-gray-50 transition-all active:scale-95 shadow-sm">SAVE DRAFT</button>
              )}
              <button onClick={handleSave} className="px-12 py-3 text-[11px] font-black uppercase tracking-widest text-white bg-black rounded-xl hover:bg-gray-800 shadow-xl shadow-black/20 transition-all active:scale-95">
                {isStationeryRequest && !isViewMode ? 'SUBMIT DATA' : 'SAVE DATA'}
              </button>
            </>
          )}
        </div>
      </div>
      {renderApprovalHistory()}
    </div>
  );
};
