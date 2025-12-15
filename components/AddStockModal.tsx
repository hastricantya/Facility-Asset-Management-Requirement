
import React, { useState, useEffect } from 'react';
import { X, RefreshCcw, Plus, Trash2, Image as ImageIcon, List, Calendar, PlusCircle, Settings } from 'lucide-react';
import { VehicleRecord, ServiceRecord, MutationRecord, SalesRecord, SalesOffer, ContractRecord, GeneralMasterItem, MasterVendorRecord, StationeryRequestRecord, StationeryRequestItem, DeliveryLocationRecord, AssetRecord } from '../types';
import { useLanguage } from '../contexts/LanguageContext';
import { MOCK_MASTER_DATA, MOCK_MASTER_ARK_DATA } from '../constants';

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
  onSaveDeliveryLocation?: (location: Partial<DeliveryLocationRecord>) => void;
  
  initialVehicleData?: VehicleRecord;
  initialServiceData?: ServiceRecord;
  initialMutationData?: MutationRecord;
  initialSalesData?: SalesRecord;
  initialContractData?: ContractRecord;
  initialMasterData?: GeneralMasterItem;
  initialMasterVendorData?: MasterVendorRecord;
  initialDeliveryLocationData?: DeliveryLocationRecord;
  initialAssetData?: AssetRecord; // New prop for Asset View
  
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
    onSaveDeliveryLocation,
    initialVehicleData,
    initialServiceData,
    initialMutationData,
    initialSalesData,
    initialContractData,
    initialMasterData,
    initialMasterVendorData,
    initialDeliveryLocationData,
    initialAssetData,
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

  // Local state for Delivery Location form
  const defaultDeliveryLocationForm: Partial<DeliveryLocationRecord> = {
      name: '',
      address: '',
      type: 'Branch'
  };

  const [vehicleForm, setVehicleForm] = useState<Partial<VehicleRecord>>(defaultVehicleForm);
  const [serviceForm, setServiceForm] = useState<Partial<ServiceRecord>>(defaultServiceForm);
  const [mutationForm, setMutationForm] = useState<Partial<MutationRecord>>(defaultMutationForm);
  const [salesForm, setSalesForm] = useState<Partial<SalesRecord>>(defaultSalesForm);
  const [contractForm, setContractForm] = useState<Partial<ContractRecord>>(defaultContractForm);
  const [masterForm, setMasterForm] = useState<Partial<GeneralMasterItem>>(defaultMasterForm);
  const [masterVendorForm, setMasterVendorForm] = useState<Partial<MasterVendorRecord>>(defaultMasterVendorForm);
  const [stationeryRequestForm, setStationeryRequestForm] = useState<Partial<StationeryRequestRecord>>(defaultStationeryRequestForm);
  const [deliveryLocationForm, setDeliveryLocationForm] = useState<Partial<DeliveryLocationRecord>>(defaultDeliveryLocationForm);
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
            if (initialDeliveryLocationData) {
                setDeliveryLocationForm(initialDeliveryLocationData);
            }
            // Handle Stationery View Mapping
            if (initialAssetData) {
                // Convert DD/MM/YYYY to YYYY-MM-DD for input date
                const [d, m, y] = initialAssetData.date.split('/');
                const formattedDate = `${y}-${m}-${d}`;
                
                // Find master ID to pre-select dropdown (Mapping logic)
                // Note: In a real app, IDs would link directly. Here we search by name.
                const masterList = moduleName === 'Daftar ARK' ? MOCK_MASTER_ARK_DATA : MOCK_MASTER_DATA;
                const matchedMaster = masterList.find(m => m.itemName === initialAssetData.itemName);

                setStationeryRequestForm({
                    type: 'Bulanan', // Mock value since table data doesn't have it
                    date: formattedDate,
                    remarks: initialAssetData.itemDescription,
                    deliveryType: 'Dikirim', // Mock default
                    location: 'MODENA Head Office' // Mock default
                });
                setRequestItems([{ 
                    itemId: matchedMaster ? matchedMaster.id.toString() : '', 
                    qty: initialAssetData.qty.toString() 
                }]);
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
            setDeliveryLocationForm(defaultDeliveryLocationForm);
            setSalesOffers([{ nama: '', pic: '', phone: '', price: '' }]);
            setRequestItems([{ itemId: '', qty: '' }]);
            setSelectedMutationAsset(null);
        }
    }
  }, [isOpen, initialVehicleData, initialServiceData, initialMutationData, initialSalesData, initialContractData, initialMasterData, initialMasterVendorData, initialDeliveryLocationData, initialAssetData, mode]);

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

  const handleDeliveryLocationChange = (field: keyof DeliveryLocationRecord, value: any) => {
      setDeliveryLocationForm(prev => ({ ...prev, [field]: value }));
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
      } else if ((moduleName === 'Daftar ATK' || moduleName === 'Daftar ARK') && onSaveStationeryRequest) {
          onSaveStationeryRequest({ ...stationeryRequestForm, items: requestItems });
      } else if (moduleName === 'Master Delivery Location' && onSaveDeliveryLocation) {
          onSaveDeliveryLocation(deliveryLocationForm);
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
  const isMasterARK = moduleName === 'Master ARK';
  const isStationeryRequest = moduleName === 'Daftar ATK' || moduleName === 'Daftar ARK';
  const isDeliveryLocation = moduleName === 'Master Delivery Location';
  
  const isMaster = !isContract && !isVendor && !isVehicle && !isService && !isMutation && !isSales && !isMasterVendor && !isStationeryRequest && !isDeliveryLocation && !moduleName?.includes('ATK') && !moduleName?.includes('ARK') && moduleName !== 'Timesheet';

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
    if (isMasterATK || isMasterARK) return `${t(moduleName || '')} > ${t('Tambah Stock')}`;
    if (isStationeryRequest) return isViewMode ? (moduleName === 'Daftar ATK' ? `Detail ${t('Request ATK')}` : `Detail ${t('Request ARK')}`) : (moduleName === 'Daftar ATK' ? t('Request ATK') : t('Request ARK'));
    if (isDeliveryLocation) return t('Delivery Location');
    if (isMaster) return `Master ${t(moduleName || '')}`;
    return `Master ${t(moduleName || '')} > ${t('Tambah Stock')}`;
  }

  // Helper for red asterisk
  const Required = () => <span className="text-red-500">*</span>;

  // Helper for section header
  const SectionHeader: React.FC<{ title: string; orange?: boolean }> = ({ title, orange }) => (
      <h3 className={`font-bold text-sm mb-4 border-b pb-2 ${orange ? 'text-orange-500 border-orange-200' : 'text-gray-900 border-gray-200'}`}>{title}</h3>
  );

  // Full Screen Mode for Stationery/Household Request
  if (isStationeryRequest) {
      const isArk = moduleName === 'Daftar ARK';
      const itemLabel = isArk ? t('Search ARK') : t('Search ATK');
      const requestTypeLabel = isArk ? t('Pilih jenis item ARK') : t('Pilih jenis item ATK');
      const itemSelectLabel = isArk ? t('Pilih barang ARK') : t('Pilih barang ATK'); // Fallback if translation missing, though context handles generic
      
      const masterList = isArk ? MOCK_MASTER_ARK_DATA : MOCK_MASTER_DATA;

      return (
        <div className="fixed inset-0 bg-gray-50 z-50 overflow-y-auto">
             <div className="max-w-4xl mx-auto py-8 px-4">
                {/* Header */}
                <div className="flex items-center gap-3 mb-8">
                    <Settings className="text-gray-700" size={24} />
                    <h1 className="text-2xl font-bold text-gray-800">{getTitle()}</h1>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
                     <h3 className="font-bold text-gray-900 mb-6">{t('Form Request')}</h3>

                     {/* Form Fields */}
                     <div className="space-y-6">
                         
                         {/* Pilih Kebutuhan */}
                         <div>
                             <label className="block text-sm font-semibold text-gray-800 mb-2">{t('Pilih Kebutuhan')} {!isViewMode && <Required/>}</label>
                             <select 
                                className={`w-full bg-white border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray-500 focus:outline-none focus:border-black focus:ring-1 focus:ring-black ${isViewMode ? 'bg-gray-50 cursor-not-allowed' : ''}`}
                                value={stationeryRequestForm.type}
                                onChange={(e) => handleStationeryRequestChange('type', e.target.value)}
                                disabled={isViewMode}
                             >
                                 <option value="">{requestTypeLabel}</option>
                                 <option value="Bulanan">{t('Permintaan Bulanan')}</option>
                                 <option value="Khusus">{t('Permintaan Khusus')}</option>
                             </select>
                         </div>

                         {/* Item List */}
                         {requestItems.map((item, index) => (
                             <div key={index} className="flex gap-4 items-end">
                                 <div className="flex-1">
                                     <label className="block text-sm font-semibold text-gray-800 mb-2">{t('Pilih barang ATK') /* Reusing label or add specific ARK label */ } {!isViewMode && <Required/>}</label>
                                     <select 
                                        className={`w-full bg-white border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray-500 focus:outline-none focus:border-black focus:ring-1 focus:ring-black ${isViewMode ? 'bg-gray-50 cursor-not-allowed' : ''}`}
                                        value={item.itemId}
                                        onChange={(e) => handleRequestItemChange(index, 'itemId', e.target.value)}
                                        disabled={isViewMode}
                                     >
                                         <option value="">{itemLabel}</option>
                                         {masterList.map(m => (
                                             <option key={m.id} value={m.id}>{m.itemName} ({m.uom})</option>
                                         ))}
                                     </select>
                                 </div>
                                 <div className="w-32">
                                     <label className="block text-sm font-semibold text-gray-800 mb-2">{t('Jumlah')}</label>
                                     <input 
                                        type="number" 
                                        className={`w-full bg-white border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray-500 focus:outline-none focus:border-black focus:ring-1 focus:ring-black ${isViewMode ? 'bg-gray-50 cursor-not-allowed' : ''}`}
                                        placeholder={t('Jumlah')}
                                        value={item.qty}
                                        onChange={(e) => handleRequestItemChange(index, 'qty', e.target.value)}
                                        disabled={isViewMode}
                                     />
                                 </div>
                                 {!isViewMode && index > 0 && (
                                     <button onClick={() => removeRequestItemRow(index)} className="mb-2.5 p-2 text-gray-400 hover:text-red-500">
                                         <Trash2 size={20} />
                                     </button>
                                 )}
                             </div>
                         ))}

                         {/* Add More */}
                         {!isViewMode && (
                             <div>
                                 <button 
                                    onClick={addRequestItemRow}
                                    className="flex items-center gap-2 text-gray-900 font-semibold text-sm hover:text-gray-700"
                                 >
                                     <PlusCircle size={18} />
                                     {t('Add More')}
                                 </button>
                             </div>
                         )}

                         {/* Tanggal Request */}
                         <div>
                             <label className="block text-sm font-semibold text-gray-800 mb-2">{t('Tanggal Request')}</label>
                             <div className="relative">
                                 <input 
                                    type="date" 
                                    className={`w-full bg-white border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray-500 focus:outline-none focus:border-black focus:ring-1 focus:ring-black ${isViewMode ? 'bg-gray-50 cursor-not-allowed' : ''}`}
                                    value={stationeryRequestForm.date}
                                    onChange={(e) => handleStationeryRequestChange('date', e.target.value)}
                                    disabled={isViewMode}
                                 />
                                 {/* <Calendar className="absolute right-4 top-2.5 text-gray-400 pointer-events-none" size={18} /> */}
                             </div>
                         </div>

                         {/* Remarks */}
                         <div>
                             <label className="block text-sm font-semibold text-gray-800 mb-2">{t('Remarks')}</label>
                             <textarea 
                                className={`w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-sm text-gray-500 focus:outline-none focus:border-black focus:ring-1 focus:ring-black h-32 resize-none ${isViewMode ? 'bg-gray-50 cursor-not-allowed' : ''}`}
                                placeholder={t('Isi Remarks')}
                                value={stationeryRequestForm.remarks}
                                onChange={(e) => handleStationeryRequestChange('remarks', e.target.value)}
                                disabled={isViewMode}
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
                                    disabled={isViewMode}
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
                                    disabled={isViewMode}
                                 />
                                 <span className="text-sm font-medium text-gray-700">{t('Ambil di HO')}</span>
                             </label>
                         </div>
                     </div>

                     {/* Alamat Pengiriman */}
                     <div className="mt-8">
                         <h3 className="font-bold text-gray-900 mb-4">{t('Alamat Pengiriman')}</h3>
                         <div>
                             <label className="block text-sm font-semibold text-gray-800 mb-2">{t('Pilih Tempat')} {!isViewMode && <Required/>}</label>
                             <select 
                                className={`w-full bg-white border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray-500 focus:outline-none focus:border-black focus:ring-1 focus:ring-black ${isViewMode ? 'bg-gray-50 cursor-not-allowed' : ''}`}
                                value={stationeryRequestForm.location}
                                onChange={(e) => handleStationeryRequestChange('location', e.target.value)}
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

                     {/* Footer Buttons */}
                     <div className="mt-10 flex gap-4">
                         {!isViewMode ? (
                             <>
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
                             </>
                         ) : (
                             <button 
                                className="bg-[#2C333A] text-white px-6 py-2.5 rounded font-bold text-xs uppercase tracking-wide hover:bg-gray-800 transition-colors"
                                onClick={onClose}
                             >
                                 {t('Closed')}
                             </button>
                         )}
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
      <div className={`bg-white w-full ${isMaster || isDeliveryLocation ? 'max-w-md' : (isVehicle || isService || isMutation || isSales || isContract || isMasterVendor ? 'max-w-7xl' : 'max-w-5xl')} rounded-lg shadow-xl overflow-hidden flex flex-col max-h-[90vh]`}>
        {/* Modal Header */}
        <div className={`px-6 py-4 flex items-center justify-between ${isService || isMutation || isSales || isContract || isMaster || isMasterVendor || isMasterATK || isMasterARK || isDeliveryLocation ? 'bg-white border-b border-gray-200 text-gray-900' : 'bg-black text-white'}`}>
          <h2 className={`text-sm font-bold tracking-wide ${isMasterATK || isMasterARK || isMasterVendor || isService || isSales || isMutation || isContract || isMaster || isDeliveryLocation ? '' : 'text-white'}`}>
            {getTitle()}
          </h2>
          <div className="flex items-center gap-4">
            <button className={`${isService || isMutation || isSales || isContract || isMaster || isMasterVendor || isMasterATK || isMasterARK || isDeliveryLocation ? 'text-gray-400 hover:text-gray-600' : 'text-gray-400 hover:text-white'} transition-colors`}>
              <X size={20} onClick={onClose} className="cursor-pointer"/>
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar bg-gray-50">
          
          {isMasterATK || isMasterARK ? (
            /* --- MASTER ATK/ARK FORM --- */
            <div className="space-y-6">
                {/* ... (Existing Master ATK/ARK content) ... */}
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
          ) : isDeliveryLocation ? (
              /* --- DELIVERY LOCATION FORM --- */
              <div className="space-y-4">
                  <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">{t('Location Name')} <Required/></label>
                      <input 
                          type="text" 
                          className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-black" 
                          value={deliveryLocationForm.name || ''}
                          onChange={(e) => handleDeliveryLocationChange('name', e.target.value)}
                          placeholder="e.g. Head Office"
                      />
                  </div>
                  <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">{t('Address')} <Required/></label>
                      <textarea
                          rows={3} 
                          className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-black resize-none" 
                          value={deliveryLocationForm.address || ''}
                          onChange={(e) => handleDeliveryLocationChange('address', e.target.value)}
                          placeholder="Full Address"
                      />
                  </div>
                  <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">{t('Type')} <Required/></label>
                      <select 
                          className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-black"
                          value={deliveryLocationForm.type || 'Branch'}
                          onChange={(e) => handleDeliveryLocationChange('type', e.target.value)}
                      >
                          <option value="Head Office">Head Office</option>
                          <option value="Branch">Branch</option>
                          <option value="Warehouse">Warehouse</option>
                          <option value="Store">Store</option>
                      </select>
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
                {/* ... (existing service form content) */}
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
          ) : (
            // Default Fallback
             <div className="p-4 text-center text-gray-500">Form Placeholder for {moduleName}</div>
          )}
        </div>

        {/* Modal Footer */}
        {mode !== 'view' && (
            <div className="px-8 py-4 bg-white border-t border-gray-200 flex justify-end gap-3">
            <button 
                onClick={onClose}
                className={`px-6 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors ${isMasterATK || isMasterARK || isDeliveryLocation ? 'rounded-full' : ''}`}
            >
                {t('Draft')}
            </button>
            <button 
                onClick={handleSave}
                className={`px-6 py-2 text-sm font-medium text-white rounded-lg transition-colors shadow-sm ${isMasterVendor ? 'bg-orange-500 hover:bg-orange-600' : isMasterATK || isMasterARK || isDeliveryLocation ? 'bg-black hover:bg-gray-800 rounded-full' : 'bg-black hover:bg-gray-800'}`}
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
