
import React, { useState, useEffect } from 'react';
import { X, RefreshCcw, Plus, Trash2, Image as ImageIcon, List, Calendar, PlusCircle, Settings } from 'lucide-react';
import { VehicleRecord, ServiceRecord, MutationRecord, SalesRecord, SalesOffer, ContractRecord, GeneralMasterItem, MasterVendorRecord, StationeryRequestRecord, StationeryRequestItem } from '../types';
import { useLanguage } from '../contexts/LanguageContext';
import { MOCK_MASTER_DATA } from '../constants';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  moduleName?: string;
  onSaveVehicle?: (vehicle: Partial<VehicleRecord>) => void;
  onSaveService?: (service: Partial<ServiceRecord>) => void;
  onSaveMutation?: (mutation: Partial<MutationRecord>) => void;
  onSaveSales?: (sales: Partial<SalesRecord>) => void;
  onSaveContract?: (contract: Partial<ContractRecord>) => void;
  onSaveMaster?: (master: Partial<GeneralMasterItem>) => void;
  onSaveMasterVendor?: (masterVendor: Partial<MasterVendorRecord>) => void;
  onSaveStationeryRequest?: (request: Partial<StationeryRequestRecord>) => void;
  
  initialVehicleData?: VehicleRecord;
  initialServiceData?: ServiceRecord;
  initialMutationData?: MutationRecord;
  initialSalesData?: SalesRecord;
  initialContractData?: ContractRecord;
  initialMasterData?: GeneralMasterItem;
  initialMasterVendorData?: MasterVendorRecord;
  
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
    onSaveMutation,
    onSaveSales,
    onSaveContract,
    onSaveMaster,
    onSaveMasterVendor,
    onSaveStationeryRequest,
    initialVehicleData,
    initialServiceData,
    initialMutationData,
    initialSalesData,
    initialContractData,
    initialMasterData,
    initialMasterVendorData,
    mode = 'create',
    vehicleList = [],
    masterData = {}
}) => {
  const { t } = useLanguage();
  const [selectedDetail, setSelectedDetail] = useState<boolean>(false);
  
  // Local state for Vehicle form fields
  const defaultVehicleForm: Partial<VehicleRecord> = {
      noRegistrasi: '',
      nama: '',
      noPolisi: '',
      channel: 'Human Capital Operation',
      cabang: 'Pusat',
      merek: 'TOYOTA',
      tipeKendaraan: 'AVANZA',
      jenis: '1.3 G',
      model: 'A/T',
      tahunPembuatan: '2022',
      warna: 'Putih',
      isiSilinder: '1329 CC',
      noRangka: '',
      noMesin: '',
      pengguna: '',
      noBpkb: '',
      keteranganBpkb: '',
      masaBerlaku1: '',
      masaBerlaku5: '',
      masaBerlakuKir: '',
      tglBeli: '',
      hargaBeli: '',
      noPolisAsuransi: '',
      jangkaPertanggungan: ''
  };

  // Local state for Service Request form
  const defaultServiceForm: Partial<ServiceRecord> = {
      aset: '',
      tglStnk: '',
      jenisServis: 'Servis Rutin',
      vendor: '',
      targetSelesai: '',
      kmKendaraan: '',
      masalah: '',
      penyebab: '',
      estimasiBiaya: '',
      jenisPembayaran: 'Kasbon',
      namaBank: '',
      nomorRekening: ''
  };

  // Local state for Mutation Request form
  const defaultMutationForm: Partial<MutationRecord> = {
      tipeMutasi: 'Kirim',
      lokasiAsal: '',
      lokasiTujuan: '',
      channelAsal: '',
      channelTujuan: '',
      asetId: '',
      alasan: ''
  };

  // Local state for Sales Request form
  const defaultSalesForm: Partial<SalesRecord> = {
    asetId: '',
    targetSelesai: '',
    alasan: '',
    catatan: '',
    offers: []
  };

  // Local state for Contract (Building) form
  const defaultContractForm: Partial<ContractRecord> = {
    assetNumber: '[Auto Generate]',
    assetCategory: 'Building',
    type: '',
    ownership: 'Rent',
    location: '',
    channel: '',
    department: '',
    subLocation: '',
    address: ''
  };

  // Local state for General Master form
  const defaultMasterForm: Partial<GeneralMasterItem> = {
    name: ''
  };

  // Local state for Master Vendor form
  const defaultMasterVendorForm: Partial<MasterVendorRecord> = {
      nama: '',
      merek: '',
      alamat: '',
      noTelp: '',
      tipe: 'Vendor Servis',
      cabang: 'Aceh',
      aktif: true,
      pic: ''
  };
  
  // Local state for Stationery Request Form
  const defaultStationeryRequestForm: Partial<StationeryRequestRecord> = {
      type: '',
      date: '',
      remarks: '',
      deliveryType: 'Dikirim',
      location: ''
  };

  const [vehicleForm, setVehicleForm] = useState<Partial<VehicleRecord>>(defaultVehicleForm);
  const [serviceForm, setServiceForm] = useState<Partial<ServiceRecord>>(defaultServiceForm);
  const [mutationForm, setMutationForm] = useState<Partial<MutationRecord>>(defaultMutationForm);
  const [salesForm, setSalesForm] = useState<Partial<SalesRecord>>(defaultSalesForm);
  const [contractForm, setContractForm] = useState<Partial<ContractRecord>>(defaultContractForm);
  const [masterForm, setMasterForm] = useState<Partial<GeneralMasterItem>>(defaultMasterForm);
  const [masterVendorForm, setMasterVendorForm] = useState<Partial<MasterVendorRecord>>(defaultMasterVendorForm);
  const [stationeryRequestForm, setStationeryRequestForm] = useState<Partial<StationeryRequestRecord>>(defaultStationeryRequestForm);
  const [salesOffers, setSalesOffers] = useState<SalesOffer[]>([{ nama: '', pic: '', phone: '', price: '' }]);
  const [requestItems, setRequestItems] = useState<StationeryRequestItem[]>([{ itemId: '', qty: '' }]);

  // Derived state for mutation asset details
  const [selectedMutationAsset, setSelectedMutationAsset] = useState<VehicleRecord | null>(null);

  useEffect(() => {
    if (isOpen) {
        if ((mode === 'edit' || mode === 'view')) {
            if (initialVehicleData) setVehicleForm(initialVehicleData);
            if (initialServiceData) setServiceForm(initialServiceData);
            if (initialMutationData) {
                setMutationForm(initialMutationData);
                if (initialMutationData.asetId) {
                    const asset = vehicleList.find(v => v.id.toString() === initialMutationData.asetId);
                    setSelectedMutationAsset(asset || null);
                }
            }
            if (initialSalesData) {
                setSalesForm(initialSalesData);
                if (initialSalesData.offers && initialSalesData.offers.length > 0) {
                    setSalesOffers(initialSalesData.offers);
                }
            }
            if (initialContractData) {
                setContractForm(initialContractData);
            }
            if (initialMasterData) {
                setMasterForm(initialMasterData);
            }
            if (initialMasterVendorData) {
                setMasterVendorForm(initialMasterVendorData);
            }
        } else {
            // Reset to defaults
            setVehicleForm(defaultVehicleForm);
            setServiceForm(defaultServiceForm);
            setMutationForm(defaultMutationForm);
            setSalesForm(defaultSalesForm);
            setContractForm(defaultContractForm);
            setMasterForm(defaultMasterForm);
            setMasterVendorForm(defaultMasterVendorForm);
            setStationeryRequestForm(defaultStationeryRequestForm);
            setSalesOffers([{ nama: '', pic: '', phone: '', price: '' }]);
            setRequestItems([{ itemId: '', qty: '' }]);
            setSelectedMutationAsset(null);
        }
    }
  }, [isOpen, initialVehicleData, initialServiceData, initialMutationData, initialSalesData, initialContractData, initialMasterData, initialMasterVendorData, mode]);

  const handleVehicleChange = (field: keyof VehicleRecord, value: string) => {
      setVehicleForm(prev => ({ ...prev, [field]: value }));
  };

  const handleServiceChange = (field: keyof ServiceRecord, value: string) => {
      setServiceForm(prev => ({ ...prev, [field]: value }));
  };

  const handleMutationChange = (field: keyof MutationRecord, value: string) => {
      setMutationForm(prev => ({ ...prev, [field]: value }));
      if (field === 'asetId') {
          const asset = vehicleList.find(v => v.id.toString() === value);
          setSelectedMutationAsset(asset || null);
      }
  };

  const handleSalesChange = (field: keyof SalesRecord, value: string) => {
      setSalesForm(prev => ({ ...prev, [field]: value }));
  };

  const handleContractChange = (field: keyof ContractRecord, value: string) => {
      setContractForm(prev => ({ ...prev, [field]: value }));
  };

  const handleMasterChange = (value: string) => {
      setMasterForm(prev => ({ ...prev, name: value }));
  }

  const handleMasterVendorChange = (field: keyof MasterVendorRecord, value: any) => {
      setMasterVendorForm(prev => ({ ...prev, [field]: value }));
  }

  const handleStationeryRequestChange = (field: keyof StationeryRequestRecord, value: any) => {
      setStationeryRequestForm(prev => ({ ...prev, [field]: value }));
  }

  const handleOfferChange = (index: number, field: keyof SalesOffer, value: string) => {
      const newOffers = [...salesOffers];
      newOffers[index] = { ...newOffers[index], [field]: value };
      setSalesOffers(newOffers);
  };

  const addOfferRow = () => {
      setSalesOffers([...salesOffers, { nama: '', pic: '', phone: '', price: '' }]);
  };

  const removeOfferRow = (index: number) => {
      if (salesOffers.length > 1) {
          setSalesOffers(salesOffers.filter((_, i) => i !== index));
      }
  };

  const handleRequestItemChange = (index: number, field: keyof StationeryRequestItem, value: string) => {
      const newItems = [...requestItems];
      newItems[index] = { ...newItems[index], [field]: value };
      setRequestItems(newItems);
  }

  const addRequestItemRow = () => {
      setRequestItems([...requestItems, { itemId: '', qty: '' }]);
  }

  const removeRequestItemRow = (index: number) => {
      if (requestItems.length > 1) {
          setRequestItems(requestItems.filter((_, i) => i !== index));
      }
  }

  const handleSave = () => {
      if (moduleName === 'Daftar Aset' && onSaveVehicle) {
          onSaveVehicle(vehicleForm);
      } else if (moduleName === 'Servis' && onSaveService) {
          onSaveService(serviceForm);
      } else if (moduleName === 'Mutasi' && onSaveMutation) {
          onSaveMutation(mutationForm);
      } else if (moduleName === 'Penjualan' && onSaveSales) {
          onSaveSales({ ...salesForm, offers: salesOffers });
      } else if (moduleName === 'Contract' && onSaveContract) {
          onSaveContract(contractForm);
      } else if (moduleName === 'Master Vendor' && onSaveMasterVendor) {
          onSaveMasterVendor(masterVendorForm);
      } else if (moduleName === 'Daftar ATK' && onSaveStationeryRequest) {
          onSaveStationeryRequest({ ...stationeryRequestForm, items: requestItems });
      } else if (onSaveMaster) {
          onSaveMaster(masterForm);
      }
      onClose();
  };

  if (!isOpen) return null;

  const isContract = moduleName === 'Contract';
  const isVendor = moduleName === 'Vendor';
  const isVehicle = moduleName === 'Daftar Aset';
  const isService = moduleName === 'Servis';
  const isMutation = moduleName === 'Mutasi';
  const isSales = moduleName === 'Penjualan';
  const isMasterVendor = moduleName === 'Master Vendor';
  const isMasterATK = moduleName === 'Master ATK';
  const isStationeryRequest = moduleName === 'Daftar ATK';
  
  const isMaster = !isContract && !isVendor && !isVehicle && !isService && !isMutation && !isSales && !isMasterVendor && !isStationeryRequest && !moduleName?.includes('ATK') && !moduleName?.includes('ARK') && moduleName !== 'Timesheet';

  const isViewMode = mode === 'view';
  const isEditMode = mode === 'edit';

  const getTitle = () => {
    if (isContract) return mode === 'create' ? t('Add Asset') : 'Asset Data Detail';
    if (isVendor) return 'Master Vendor > New Vendor';
    if (isMasterVendor) return t('Add Vendor');
    if (isVehicle) return mode === 'create' ? `${t('Daftar Aset Kendaraan')} > ${t('Baru')}` : t('Daftar Aset Kendaraan');
    if (isService) return t('Request Servis');
    if (isMutation) return t('Permintaan Mutasi Kendaraan');
    if (isSales) return t('Permintaan Penjualan');
    if (isMasterATK) return `${t('Master ATK')} > ${t('Tambah Stock')}`;
    if (isStationeryRequest) return t('Request ATK / ARK');
    if (isMaster) return `Master ${t(moduleName || '')}`;
    return `Master ${t(moduleName || '')} > ${t('Tambah Stock')}`;
  }

  // Helper for red asterisk
  const Required = () => <span className="text-red-500">*</span>;

  // Helper for section header
  const SectionHeader: React.FC<{ title: string; orange?: boolean }> = ({ title, orange }) => (
      <h3 className={`font-bold text-sm mb-4 border-b pb-2 ${orange ? 'text-orange-500 border-orange-200' : 'text-gray-900 border-gray-200'}`}>{title}</h3>
  );

  // Full Screen Mode for Stationery Request
  if (isStationeryRequest) {
      return (
        <div className="fixed inset-0 bg-gray-50 z-50 overflow-y-auto">
             <div className="max-w-4xl mx-auto py-8 px-4">
                {/* Header */}
                <div className="flex items-center gap-3 mb-8">
                    <Settings className="text-gray-700" size={24} />
                    <h1 className="text-2xl font-bold text-gray-800">{t('Request ATK / ARK')}</h1>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
                     <h3 className="font-bold text-gray-900 mb-6">{t('Form Request')}</h3>

                     {/* Form Fields */}
                     <div className="space-y-6">
                         
                         {/* Pilih Kebutuhan */}
                         <div>
                             <label className="block text-sm font-semibold text-gray-800 mb-2">{t('Pilih Kebutuhan')} <Required/></label>
                             <select 
                                className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray-500 focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
                                value={stationeryRequestForm.type}
                                onChange={(e) => handleStationeryRequestChange('type', e.target.value)}
                             >
                                 <option value="">{t('Pilih jenis item ATK / ARK')}</option>
                                 <option value="Bulanan">{t('Permintaan Bulanan')}</option>
                                 <option value="Khusus">{t('Permintaan Khusus')}</option>
                             </select>
                         </div>

                         {/* Item List */}
                         {requestItems.map((item, index) => (
                             <div key={index} className="flex gap-4 items-end">
                                 <div className="flex-1">
                                     <label className="block text-sm font-semibold text-gray-800 mb-2">{t('Pilih barang ATK')} <Required/></label>
                                     <select 
                                        className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray-500 focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
                                        value={item.itemId}
                                        onChange={(e) => handleRequestItemChange(index, 'itemId', e.target.value)}
                                     >
                                         <option value="">{t('Search ATK or ARK')}</option>
                                         {MOCK_MASTER_DATA.map(m => (
                                             <option key={m.id} value={m.id}>{m.itemName} ({m.uom})</option>
                                         ))}
                                     </select>
                                 </div>
                                 <div className="w-32">
                                     <label className="block text-sm font-semibold text-gray-800 mb-2">{t('Jumlah')}</label>
                                     <input 
                                        type="number" 
                                        className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray-500 focus:outline-none focus:border-black focus:ring-1 focus:ring-black" 
                                        placeholder={t('Jumlah')}
                                        value={item.qty}
                                        onChange={(e) => handleRequestItemChange(index, 'qty', e.target.value)}
                                     />
                                 </div>
                                 {index > 0 && (
                                     <button onClick={() => removeRequestItemRow(index)} className="mb-2.5 p-2 text-gray-400 hover:text-red-500">
                                         <Trash2 size={20} />
                                     </button>
                                 )}
                             </div>
                         ))}

                         {/* Add More */}
                         <div>
                             <button 
                                onClick={addRequestItemRow}
                                className="flex items-center gap-2 text-gray-900 font-semibold text-sm hover:text-gray-700"
                             >
                                 <PlusCircle size={18} />
                                 {t('Add More')}
                             </button>
                         </div>

                         {/* Tanggal Request */}
                         <div>
                             <label className="block text-sm font-semibold text-gray-800 mb-2">{t('Tanggal Request')}</label>
                             <div className="relative">
                                 <input 
                                    type="date" 
                                    className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray-500 focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
                                    value={stationeryRequestForm.date}
                                    onChange={(e) => handleStationeryRequestChange('date', e.target.value)}
                                 />
                                 {/* <Calendar className="absolute right-4 top-2.5 text-gray-400 pointer-events-none" size={18} /> */}
                             </div>
                         </div>

                         {/* Remarks */}
                         <div>
                             <label className="block text-sm font-semibold text-gray-800 mb-2">{t('Remarks')}</label>
                             <textarea 
                                className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-sm text-gray-500 focus:outline-none focus:border-black focus:ring-1 focus:ring-black h-32 resize-none"
                                placeholder={t('Isi Remarks')}
                                value={stationeryRequestForm.remarks}
                                onChange={(e) => handleStationeryRequestChange('remarks', e.target.value)}
                             ></textarea>
                         </div>

                         {/* Delivery Options */}
                         <div className="flex gap-6">
                             <label className="flex items-center gap-2 cursor-pointer">
                                 <input 
                                    type="radio" 
                                    name="deliveryType" 
                                    value="Dikirim" 
                                    className="w-4 h-4 text-black border-gray-300 focus:ring-black"
                                    checked={stationeryRequestForm.deliveryType === 'Dikirim'}
                                    onChange={(e) => handleStationeryRequestChange('deliveryType', e.target.value)}
                                 />
                                 <span className="text-sm font-medium text-gray-700">{t('Dikirim')}</span>
                             </label>
                             <label className="flex items-center gap-2 cursor-pointer">
                                 <input 
                                    type="radio" 
                                    name="deliveryType" 
                                    value="Ambil di HO" 
                                    className="w-4 h-4 text-black border-gray-300 focus:ring-black"
                                    checked={stationeryRequestForm.deliveryType === 'Ambil di HO'}
                                    onChange={(e) => handleStationeryRequestChange('deliveryType', e.target.value)}
                                 />
                                 <span className="text-sm font-medium text-gray-700">{t('Ambil di HO')}</span>
                             </label>
                         </div>
                     </div>

                     {/* Alamat Pengiriman */}
                     <div className="mt-8">
                         <h3 className="font-bold text-gray-900 mb-4">{t('Alamat Pengiriman')}</h3>
                         <div>
                             <label className="block text-sm font-semibold text-gray-800 mb-2">{t('Pilih Tempat')} <Required/></label>
                             <select 
                                className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray-500 focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
                                value={stationeryRequestForm.location}
                                onChange={(e) => handleStationeryRequestChange('location', e.target.value)}
                             >
                                 <option value="">{t('Pilih Tempat')}</option>
                                 <option value="Head Office">{t('Head Office')}</option>
                                 <option value="Warehouse Cakung">{t('Warehouse Cakung')}</option>
                             </select>
                         </div>
                     </div>

                     {/* Footer Buttons */}
                     <div className="mt-10 flex gap-4">
                         <button 
                            className="bg-[#2C333A] text-white px-6 py-2.5 rounded font-bold text-xs uppercase tracking-wide hover:bg-gray-800 transition-colors"
                            onClick={handleSave}
                         >
                             {t('REVIEW REQUEST')}
                         </button>
                         <button 
                            className="bg-white text-[#2C333A] px-6 py-2.5 rounded font-bold text-xs uppercase tracking-wide border border-[#2C333A] hover:bg-gray-50 transition-colors"
                            onClick={onClose}
                         >
                             {t('CANCEL')}
                         </button>
                     </div>

                </div>
             </div>
        </div>
      );
  }

  // Standard Modal Render (for other modules)
  return (
    <>
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center backdrop-blur-sm p-4">
      <div className={`bg-white w-full ${isMaster ? 'max-w-md' : (isVehicle || isService || isMutation || isSales || isContract || isMasterVendor ? 'max-w-7xl' : 'max-w-5xl')} rounded-lg shadow-xl overflow-hidden flex flex-col max-h-[90vh]`}>
        {/* Modal Header */}
        <div className={`px-6 py-4 flex items-center justify-between ${isService || isMutation || isSales || isContract || isMaster || isMasterVendor || isMasterATK ? 'bg-white border-b border-gray-200 text-gray-900' : 'bg-black text-white'}`}>
          <h2 className={`text-sm font-bold tracking-wide ${isMasterATK || isMasterVendor || isService || isSales || isMutation || isContract || isMaster ? '' : 'text-white'}`}>
            {getTitle()}
          </h2>
          <div className="flex items-center gap-4">
            <button className={`${isService || isMutation || isSales || isContract || isMaster || isMasterVendor || isMasterATK ? 'text-gray-400 hover:text-gray-600' : 'text-gray-400 hover:text-white'} transition-colors`}>
              <X size={20} onClick={onClose} className="cursor-pointer"/>
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar bg-gray-50">
          
          {isMasterATK ? (
            /* --- MASTER ATK FORM --- */
            <div className="space-y-6">
                {/* Section 1: Header Info */}
                <div className="bg-blue-50/50 p-6 rounded-lg border border-blue-100">
                    <h3 className="text-blue-500 font-bold text-sm mb-4">Stationery Master</h3>
                    
                    <div className="grid grid-cols-1 gap-4">
                        <div className="grid grid-cols-12 gap-4 items-center">
                            <div className="col-span-3">
                                <label className="block text-sm font-semibold text-gray-700">Category <Required/></label>
                            </div>
                            <div className="col-span-9">
                                <select className="w-full bg-[#FFF9C4] border border-gray-300 rounded px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-black">
                                    <option value="Pulpen">Pulpen</option>
                                    <option value="Kertas">Kertas</option>
                                    <option value="Tinta">Tinta</option>
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-12 gap-4 items-center">
                            <div className="col-span-3">
                                <label className="block text-sm font-semibold text-gray-700">Item Name <Required/></label>
                            </div>
                            <div className="col-span-9">
                                <select className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-black">
                                    <option value="KENKO">KENKO Joyko K-1 0.5 mm Hitam</option>
                                </select>
                            </div>
                        </div>
                        {/* Removed read-only Remaining Stock from here */}
                    </div>
                </div>

                {/* Section 2: Transaction Input */}
                <div className="bg-white pt-2 space-y-4 border-t border-gray-100">
                    
                    {/* Remaining Stock & Unit (Replaces Quantity) */}
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
                         <div className="col-span-6">
                             <input type="text" defaultValue="1.000" readOnly className="w-full bg-gray-50 border border-gray-200 rounded px-3 py-2 text-sm text-gray-500 focus:outline-none" />
                        </div>
                    </div>

                    {/* Description */}
                    <div className="grid grid-cols-12 gap-4 items-start">
                        <div className="col-span-3 pt-2">
                            <label className="block text-sm font-semibold text-gray-700">Description <Required/></label>
                        </div>
                         <div className="col-span-6">
                             <textarea rows={3} defaultValue="Pembelian Q2" className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-black resize-none" />
                        </div>
                    </div>
                </div>

                {/* Section 3: History Table */}
                <div className="mt-8">
                    <h3 className="text-blue-500 font-bold text-sm mb-4">Stationery Purchase History</h3>
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
                                    <td className="px-4 py-3 text-right">
                                        <div className="flex justify-between gap-2">
                                            <span>IDR</span>
                                            <span>1,231</span>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3 text-right">
                                        <div className="flex justify-between gap-2">
                                            <span>IDR</span>
                                            <span>1,231</span>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3 font-medium">Pembelian Q1</td>
                                </tr>
                            </tbody>
                            <tfoot className="bg-white font-bold text-gray-800">
                                <tr>
                                    <td colSpan={4} className="px-4 py-3 text-right">Total IDR</td>
                                    <td className="px-4 py-3 text-right">1,231</td>
                                    <td className="px-4 py-3 text-right flex justify-between">
                                        <span>IDR</span>
                                        <span>1,231</span>
                                    </td>
                                    <td></td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
            </div>
          ) : isMaster ? (
              /* --- GENERIC MASTER FORM --- */
              <div className="space-y-4">
                  <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Name <Required/></label>
                      <input 
                          type="text" 
                          className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-black" 
                          value={masterForm.name || ''}
                          onChange={(e) => handleMasterChange(e.target.value)}
                          placeholder={`Enter ${moduleName} Name`}
                      />
                  </div>
              </div>

          ) : isMasterVendor ? (
            /* --- MASTER VENDOR FORM --- */
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">{t('Nama Vendor')} <Required/></label>
                        <input type="text" className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-black disabled:bg-gray-100" value={masterVendorForm.nama} onChange={(e) => handleMasterVendorChange('nama', e.target.value)} disabled={isViewMode} />
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Merek</label>
                        <input type="text" className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-black disabled:bg-gray-100" value={masterVendorForm.merek} onChange={(e) => handleMasterVendorChange('merek', e.target.value)} disabled={isViewMode} />
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">PIC <Required/></label>
                        <input type="text" className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-black disabled:bg-gray-100" value={masterVendorForm.pic} onChange={(e) => handleMasterVendorChange('pic', e.target.value)} disabled={isViewMode} />
                    </div>
                     <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">No Telp <Required/></label>
                        <input type="text" className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-black disabled:bg-gray-100" value={masterVendorForm.noTelp} onChange={(e) => handleMasterVendorChange('noTelp', e.target.value)} disabled={isViewMode} />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-xs font-medium text-gray-600 mb-1">{t('Alamat')} <Required/></label>
                        <textarea className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-black disabled:bg-gray-100" rows={3} value={masterVendorForm.alamat} onChange={(e) => handleMasterVendorChange('alamat', e.target.value)} disabled={isViewMode}></textarea>
                    </div>
                     <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">{t('Tipe Vendor')} <Required/></label>
                        <select className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-black disabled:bg-gray-100" value={masterVendorForm.tipe} onChange={(e) => handleMasterVendorChange('tipe', e.target.value)} disabled={isViewMode}>
                            <option value="Vendor Servis">Vendor Servis</option>
                            <option value="Vendor Mutasi">Vendor Mutasi</option>
                            <option value="Vendor Pajak & KIR">Vendor Pajak & KIR</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Cabang Code <Required/></label>
                        <select className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-black disabled:bg-gray-100" value={masterVendorForm.cabang} onChange={(e) => handleMasterVendorChange('cabang', e.target.value)} disabled={isViewMode}>
                            <option value="Aceh">Aceh</option>
                            <option value="Pusat">Pusat</option>
                        </select>
                    </div>
                </div>
            </div>

          ) : isContract ? (
            /* --- CONTRACT (BUILDING ASSET) FORM --- */
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                {/* ... existing contract fields ... */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1">Asset Number</label>
                         <input type="text" className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-sm text-gray-400 italic focus:outline-none" value={contractForm.assetNumber || '[Auto Generate]'} readOnly />
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Asset Category</label>
                        <input type="text" className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-black disabled:bg-gray-100" value={contractForm.assetCategory || 'Building'} onChange={(e) => handleContractChange('assetCategory', e.target.value)} disabled={isViewMode} />
                    </div>
                     <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Type <Required/></label>
                        <input type="text" className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-black disabled:bg-gray-100" value={contractForm.type || ''} onChange={(e) => handleContractChange('type', e.target.value)} disabled={isViewMode} />
                    </div>
                     <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Ownership</label>
                        <select className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-black disabled:bg-gray-100" value={contractForm.ownership || 'Rent'} onChange={(e) => handleContractChange('ownership', e.target.value)} disabled={isViewMode}>
                            <option value="Rent">Rent</option>
                            <option value="Owner">Owner</option>
                        </select>
                    </div>
                     <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Asset Location <Required/></label>
                        <select className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-black disabled:bg-gray-100" value={contractForm.location || ''} onChange={(e) => handleContractChange('location', e.target.value)} disabled={isViewMode}>
                            <option value="">Select...</option>
                             <option value="Pusat">Pusat</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Channel <Required/></label>
                        <select className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-black disabled:bg-gray-100" value={contractForm.channel || ''} onChange={(e) => handleContractChange('channel', e.target.value)} disabled={isViewMode}>
                            <option value="">Select...</option>
                            <option value="Human Capital">Human Capital</option>
                        </select>
                    </div>
                     <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Department <Required/></label>
                        <select className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-black disabled:bg-gray-100" value={contractForm.department || ''} onChange={(e) => handleContractChange('department', e.target.value)} disabled={isViewMode}>
                            <option value="">Select...</option>
                             <option value="IT">IT</option>
                        </select>
                    </div>
                     <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Sub Location</label>
                        <input type="text" className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-black disabled:bg-gray-100" value={contractForm.subLocation || ''} onChange={(e) => handleContractChange('subLocation', e.target.value)} disabled={isViewMode} />
                    </div>
                     <div className="md:col-span-2">
                        <label className="block text-xs font-medium text-gray-600 mb-1">{t('Alamat')}</label>
                        <textarea className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-black disabled:bg-gray-100" rows={3} placeholder="(max. 255 characters)" value={contractForm.address || ''} onChange={(e) => handleContractChange('address', e.target.value)} disabled={isViewMode}></textarea>
                    </div>
                </div>
            </div>

          ) : isService ? (
            /* --- SERVICE REQUEST FORM (Updated with Dynamic Masters) --- */
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <SectionHeader title={t('Request Servis')} />
                
                <div className="space-y-6">
                    {/* Aset */}
                    <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Aset <Required/></label>
                        <select className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-black disabled:bg-gray-100" value={serviceForm.aset || ''} onChange={(e) => handleServiceChange('aset', e.target.value)} disabled={isViewMode}>
                            <option value="">(Pilih Kendaraan)</option>
                            {vehicleList.map(v => ( <option key={v.id} value={v.id}>{v.nama} - {v.noPolisi}</option> ))}
                        </select>
                    </div>

                    <div className="flex flex-col md:flex-row gap-6">
                        <div className="flex-1">
                             <label className="block text-xs font-medium text-gray-600 mb-1">Tanggal STNK <Required/></label>
                             <input type="text" placeholder="dd/mm/yyyy" className="w-full bg-gray-100 border border-gray-300 rounded px-3 py-2 text-sm text-gray-500 cursor-not-allowed focus:outline-none" value={serviceForm.tglStnk || 'dd/mm/yyyy'} disabled />
                        </div>
                         <div className="flex-1">
                             <label className="block text-xs font-medium text-gray-600 mb-1">Jenis Servis <Required/></label>
                             {/* Dynamic Master: Jenis Servis */}
                             <select className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-black disabled:bg-gray-100" value={serviceForm.jenisServis} onChange={(e) => handleServiceChange('jenisServis', e.target.value)} disabled={isViewMode}>
                                {(masterData['Jenis Servis'] || []).map(m => (
                                    <option key={m.id} value={m.name}>{m.name}</option>
                                ))}
                                {!masterData['Jenis Servis']?.length && <option value="Servis Rutin">Servis Rutin</option>}
                             </select>
                        </div>
                    </div>

                     {/* ... Vendor, Target, KM fields ... */}

                     <div className="flex flex-col md:flex-row gap-6">
                        <div className="flex-1">
                             <label className="block text-xs font-medium text-gray-600 mb-1">Estimasi Biaya <Required/></label>
                             <input type="text" className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-black disabled:bg-gray-100" value={serviceForm.estimasiBiaya || ''} onChange={(e) => handleServiceChange('estimasiBiaya', e.target.value)} disabled={isViewMode} />
                        </div>
                        <div className="flex-1">
                             <label className="block text-xs font-medium text-gray-600 mb-1">Jenis Pembayaran <Required/></label>
                              {/* Dynamic Master: Jenis Pembayaran */}
                              <select className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-black disabled:bg-gray-100" value={serviceForm.jenisPembayaran} onChange={(e) => handleServiceChange('jenisPembayaran', e.target.value)} disabled={isViewMode}>
                                {(masterData['Jenis Pembayaran'] || []).map(m => (
                                    <option key={m.id} value={m.name}>{m.name}</option>
                                ))}
                                {!masterData['Jenis Pembayaran']?.length && <option value="Kasbon">Kasbon</option>}
                             </select>
                        </div>
                    </div>
                    {/* ... Bank fields ... */}
                </div>
            </div>
          ) : isVehicle ? (
            /* --- VEHICLE FORM (Updated with Dynamic Masters) --- */
            <div className="flex flex-col gap-6">
                {/* Row 1: Detail Informasi & Surat */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Column 1: Detail Informasi */}
                    <div className="space-y-4">
                        <SectionHeader title={t('Detail Informasi')} />
                        <div className="grid grid-cols-3 gap-4">
                            <div>
                                <label className="block text-xs font-medium text-gray-600 mb-1">No. Registrasi <Required/></label>
                                <input type="text" className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-black disabled:bg-gray-100" disabled={isViewMode} value={vehicleForm.noRegistrasi || ''} onChange={(e) => handleVehicleChange('noRegistrasi', e.target.value)} />
                            </div>
                            <div className="col-span-2">
                                <label className="block text-xs font-medium text-gray-600 mb-1">Deskripsi Lengkap <Required/></label>
                                <input type="text" className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-black disabled:bg-gray-100" disabled={isViewMode} value={vehicleForm.nama || ''} onChange={(e) => handleVehicleChange('nama', e.target.value)} />
                            </div>
                        </div>
                        {/* ... rest of vehicle form */}
                    </div>

                    {/* Column 2: Surat, Pembelian, Asuransi */}
                    <div className="space-y-6">
                         {/* Surat */}
                        <div>
                             <SectionHeader title={t('Surat')} />
                             {/* ... Surat fields */}
                        </div>
                    </div>
                </div>
            </div>
          ) : isMutation ? (
              /* --- MUTATION FORM (Updated with Dynamic Masters) --- */
               <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <SectionHeader title={t('Permintaan Mutasi Kendaraan')} />
                    <div className="space-y-6">
                        <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1">Tipe Mutasi <Required/></label>
                             {/* Dynamic Master: Tipe Mutasi */}
                            <select className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-black disabled:bg-gray-100" value={mutationForm.tipeMutasi} onChange={(e) => handleMutationChange('tipeMutasi', e.target.value)} disabled={isViewMode}>
                                {(masterData['Tipe Mutasi'] || []).map(m => (
                                    <option key={m.id} value={m.name}>{m.name}</option>
                                ))}
                                {!masterData['Tipe Mutasi']?.length && <option value="Kirim">Kirim</option>}
                            </select>
                        </div>
                        {/* ... Locations ... */}
                         <div className="flex flex-col md:flex-row gap-6">
                            <div className="flex-1">
                                <label className="block text-xs font-medium text-gray-600 mb-1">Channel Tujuan <Required/></label>
                                 {/* Dynamic Master: Sync Channels */}
                                <select className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-black disabled:bg-gray-100" value={mutationForm.channelTujuan} onChange={(e) => handleMutationChange('channelTujuan', e.target.value)} disabled={isViewMode}>
                                    <option value="">Pilih Channel Tujuan</option>
                                    {(masterData['Sync Channels'] || []).map(m => (
                                        <option key={m.id} value={m.name}>{m.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                         {/* ... Asset and Reason ... */}
                    </div>
               </div>
          ) : isSales ? (
               /* --- SALES FORM --- */
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <SectionHeader title={t('Permintaan Penjualan')} />
                    {/* ... Sales Fields ... */}
                    <div className="space-y-6">
                         <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1">Aset <Required/></label>
                            <div className="flex gap-2">
                                <select className="flex-1 bg-white border border-gray-300 rounded px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-black disabled:bg-gray-100" value={salesForm.asetId || ''} onChange={(e) => handleSalesChange('asetId', e.target.value)} disabled={isViewMode}>
                                    <option value="">(Pilih Kendaraan)</option>
                                    {vehicleList.map(v => ( <option key={v.id} value={v.id}>{v.nama} - {v.noPolisi}</option> ))}
                                </select>
                                <button className="px-4 py-2 bg-gray-100 text-gray-600 rounded border border-gray-300 text-sm hover:bg-gray-200 transition-colors" disabled={isViewMode}>Detil</button>
                            </div>
                        </div>
                         {/* ... Target Selesai, Alasan, Catatan ... */}
                    </div>
                     {/* ... Offers Table ... */}
                     <div className="mt-8">
                        <SectionHeader title={t('Penawaran')} />
                         {/* ... Offers ... */}
                         <div className="w-full bg-[#0088CC] text-white p-1 flex items-center justify-center cursor-pointer hover:bg-[#0077b3] transition-colors" onClick={!isViewMode ? addOfferRow : undefined}>
                            <Plus size={16} />
                         </div>
                     </div>
                </div>
          ) : (
            // Default Asset Form (Placeholder)
             <div className="p-4 text-center text-gray-500">Form Placeholder for {moduleName}</div>
          )}
        </div>

        {/* Modal Footer */}
        {mode !== 'view' && (
            <div className="px-8 py-4 bg-white border-t border-gray-200 flex justify-end gap-3">
            <button 
                onClick={onClose}
                className={`px-6 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors ${isMasterATK ? 'rounded-full' : ''}`}
            >
                {t('Draft')}
            </button>
            <button 
                onClick={handleSave}
                className={`px-6 py-2 text-sm font-medium text-white rounded-lg transition-colors shadow-sm ${isMasterVendor ? 'bg-orange-500 hover:bg-orange-600' : isMasterATK ? 'bg-black hover:bg-gray-800 rounded-full' : 'bg-black hover:bg-gray-800'}`}
            >
                {isMasterVendor ? t('Submit') : t('Simpan')}
            </button>
            </div>
        )}
      </div>
    </div>
    </>
  );
};
