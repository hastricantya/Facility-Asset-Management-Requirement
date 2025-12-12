
import React, { useState, useEffect } from 'react';
import { X, RefreshCcw, Plus, Trash2, Image as ImageIcon, List } from 'lucide-react';
import { VehicleRecord, ServiceRecord, MutationRecord, SalesRecord, SalesOffer, ContractRecord, GeneralMasterItem, MasterVendorRecord } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

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

  const [vehicleForm, setVehicleForm] = useState<Partial<VehicleRecord>>(defaultVehicleForm);
  const [serviceForm, setServiceForm] = useState<Partial<ServiceRecord>>(defaultServiceForm);
  const [mutationForm, setMutationForm] = useState<Partial<MutationRecord>>(defaultMutationForm);
  const [salesForm, setSalesForm] = useState<Partial<SalesRecord>>(defaultSalesForm);
  const [contractForm, setContractForm] = useState<Partial<ContractRecord>>(defaultContractForm);
  const [masterForm, setMasterForm] = useState<Partial<GeneralMasterItem>>(defaultMasterForm);
  const [masterVendorForm, setMasterVendorForm] = useState<Partial<MasterVendorRecord>>(defaultMasterVendorForm);
  const [salesOffers, setSalesOffers] = useState<SalesOffer[]>([{ nama: '', pic: '', phone: '', price: '' }]);

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
            setSalesOffers([{ nama: '', pic: '', phone: '', price: '' }]);
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
  
  const isMaster = !isContract && !isVendor && !isVehicle && !isService && !isMutation && !isSales && !isMasterVendor && !moduleName?.includes('ATK') && !moduleName?.includes('ARK') && moduleName !== 'Timesheet';

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
    if (isMaster) return `Master ${t(moduleName || '')}`;
    return `Master ${t(moduleName || '')} > ${t('Tambah Stock')}`;
  }

  // Helper for red asterisk
  const Required = () => <span className="text-red-500">*</span>;

  // Helper for section header
  const SectionHeader: React.FC<{ title: string; orange?: boolean }> = ({ title, orange }) => (
      <h3 className={`font-bold text-sm mb-4 border-b pb-2 ${orange ? 'text-orange-500 border-orange-200' : 'text-gray-900 border-gray-200'}`}>{title}</h3>
  );

  return (
    <>
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center backdrop-blur-sm p-4">
      <div className={`bg-white w-full ${isMaster ? 'max-w-md' : (isVehicle || isService || isMutation || isSales || isContract || isMasterVendor ? 'max-w-7xl' : 'max-w-5xl')} rounded-lg shadow-xl overflow-hidden flex flex-col max-h-[90vh]`}>
        {/* Modal Header */}
        <div className={`px-6 py-4 flex items-center justify-between ${isService || isMutation || isSales || isContract || isMaster || isMasterVendor ? 'bg-white border-b border-gray-200 text-gray-900' : 'bg-black text-white'}`}>
          <h2 className="text-sm font-bold tracking-wide">
            {getTitle()}
          </h2>
          <div className="flex items-center gap-4">
            <button className={`${isService || isMutation || isSales || isContract || isMaster || isMasterVendor ? 'text-gray-400 hover:text-gray-600' : 'text-gray-400 hover:text-white'} transition-colors`}>
              <X size={20} onClick={onClose} className="cursor-pointer"/>
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar bg-gray-50">
          
          {isMaster ? (
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

                         <div className="grid grid-cols-3 gap-4">
                            <div>
                                <label className="block text-xs font-medium text-gray-600 mb-1">No. Polisi <Required/></label>
                                <input type="text" className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-black disabled:bg-gray-100" disabled={isViewMode} value={vehicleForm.noPolisi || ''} onChange={(e) => handleVehicleChange('noPolisi', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-gray-600 mb-1">Merek <Required/></label>
                                <input type="text" className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-black disabled:bg-gray-100" disabled={isViewMode} value={vehicleForm.merek || ''} onChange={(e) => handleVehicleChange('merek', e.target.value)} />
                            </div>
                             <div>
                                <label className="block text-xs font-medium text-gray-600 mb-1">Tipe Kendaraan <Required/></label>
                                <input type="text" className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-black disabled:bg-gray-100" disabled={isViewMode} value={vehicleForm.tipeKendaraan || ''} onChange={(e) => handleVehicleChange('tipeKendaraan', e.target.value)} />
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                            <div>
                                <label className="block text-xs font-medium text-gray-600 mb-1">Jenis <Required/></label>
                                <input type="text" className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-black disabled:bg-gray-100" disabled={isViewMode} value={vehicleForm.jenis || ''} onChange={(e) => handleVehicleChange('jenis', e.target.value)} />
                            </div>
                             <div>
                                <label className="block text-xs font-medium text-gray-600 mb-1">Model <Required/></label>
                                <input type="text" className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-black disabled:bg-gray-100" disabled={isViewMode} value={vehicleForm.model || ''} onChange={(e) => handleVehicleChange('model', e.target.value)} />
                            </div>
                             <div>
                                <label className="block text-xs font-medium text-gray-600 mb-1">Tahun Pembuatan <Required/></label>
                                <input type="text" className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-black disabled:bg-gray-100" disabled={isViewMode} value={vehicleForm.tahunPembuatan || ''} onChange={(e) => handleVehicleChange('tahunPembuatan', e.target.value)} />
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                             <div>
                                <label className="block text-xs font-medium text-gray-600 mb-1">Warna <Required/></label>
                                <input type="text" className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-black disabled:bg-gray-100" disabled={isViewMode} value={vehicleForm.warna || ''} onChange={(e) => handleVehicleChange('warna', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-gray-600 mb-1">Isi Silinder</label>
                                <input type="text" className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-black disabled:bg-gray-100" disabled={isViewMode} value={vehicleForm.isiSilinder || ''} onChange={(e) => handleVehicleChange('isiSilinder', e.target.value)} />
                            </div>
                        </div>

                         <div className="grid grid-cols-2 gap-4">
                             <div>
                                <label className="block text-xs font-medium text-gray-600 mb-1">No. Rangka</label>
                                <input type="text" className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-black disabled:bg-gray-100" disabled={isViewMode} value={vehicleForm.noRangka || ''} onChange={(e) => handleVehicleChange('noRangka', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-gray-600 mb-1">No. Mesin</label>
                                <input type="text" className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-black disabled:bg-gray-100" disabled={isViewMode} value={vehicleForm.noMesin || ''} onChange={(e) => handleVehicleChange('noMesin', e.target.value)} />
                            </div>
                        </div>
                        
                         {/* Pengguna Section */}
                        <div className="mt-4">
                            <SectionHeader title={t('Pengguna')} />
                            <div className="grid grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-xs font-medium text-gray-600 mb-1">Channel <Required/></label>
                                    <select className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-black disabled:bg-gray-100" disabled={isViewMode} value={vehicleForm.channel || ''} onChange={(e) => handleVehicleChange('channel', e.target.value)}>
                                        {(masterData['Sync Channels'] || []).map(m => (
                                            <option key={m.id} value={m.name}>{m.name}</option>
                                        ))}
                                        {!masterData['Sync Channels']?.length && <option value="Human Capital Operation">Human Capital Operation</option>}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-600 mb-1">Dept / Cabang <Required/></label>
                                    <select className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-black disabled:bg-gray-100" disabled={isViewMode} value={vehicleForm.cabang || ''} onChange={(e) => handleVehicleChange('cabang', e.target.value)}>
                                        {(masterData['Sync Branchs'] || []).map(m => (
                                            <option key={m.id} value={m.name}>{m.name}</option>
                                        ))}
                                        {!masterData['Sync Branchs']?.length && <option value="Pusat">Pusat</option>}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-600 mb-1">Pengguna <Required/></label>
                                    <input type="text" className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-black disabled:bg-gray-100" disabled={isViewMode} value={vehicleForm.pengguna || ''} onChange={(e) => handleVehicleChange('pengguna', e.target.value)} />
                                </div>
                            </div>
                        </div>
                         {/* Lampiran */}
                         <div className="mt-4">
                            <SectionHeader title={t('Lampiran')} />
                             <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
                                <div className="aspect-square bg-gray-100 border border-gray-300 rounded flex flex-col items-center justify-center text-gray-400 text-xs gap-1">
                                    <ImageIcon size={20} />
                                    <span className="text-[10px] text-center">Tampak Depan</span>
                                </div>
                                <div className="aspect-square bg-gray-100 border border-gray-300 rounded flex flex-col items-center justify-center text-gray-400 text-xs gap-1">
                                    <ImageIcon size={20} />
                                    <span className="text-[10px] text-center">Tampak Belakang</span>
                                </div>
                                <div className="aspect-square bg-gray-100 border border-gray-300 rounded flex flex-col items-center justify-center text-gray-400 text-xs gap-1">
                                    <ImageIcon size={20} />
                                    <span className="text-[10px] text-center">Tampak Kiri</span>
                                </div>
                                <div className="aspect-square bg-gray-100 border border-gray-300 rounded flex flex-col items-center justify-center text-gray-400 text-xs gap-1">
                                    <ImageIcon size={20} />
                                    <span className="text-[10px] text-center">Tampak Kanan</span>
                                </div>
                                 <div className="aspect-square bg-gray-100 border border-gray-300 rounded flex flex-col items-center justify-center text-gray-400 text-xs gap-1">
                                    <ImageIcon size={20} />
                                    <span className="text-[10px] text-center">Foto STNK</span>
                                </div>
                                 <div className="aspect-square bg-gray-100 border border-gray-300 rounded flex flex-col items-center justify-center text-gray-400 text-xs gap-1">
                                    <ImageIcon size={20} />
                                    <span className="text-[10px] text-center">Foto KIR</span>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Column 2: Surat, Pembelian, Asuransi */}
                    <div className="space-y-6">
                         {/* Surat */}
                        <div>
                             <SectionHeader title={t('Surat')} />
                             <div className="grid grid-cols-2 gap-4 mb-4">
                                <div>
                                    <label className="block text-xs font-medium text-gray-600 mb-1">No. BPKB <Required/></label>
                                    <input type="text" className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-black disabled:bg-gray-100" disabled={isViewMode} value={vehicleForm.noBpkb || ''} onChange={(e) => handleVehicleChange('noBpkb', e.target.value)} />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-600 mb-1">Keterangan BPKB</label>
                                    <input type="text" className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-black disabled:bg-gray-100" disabled={isViewMode} value={vehicleForm.keteranganBpkb || ''} onChange={(e) => handleVehicleChange('keteranganBpkb', e.target.value)} />
                                </div>
                             </div>
                             <div className="grid grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-xs font-medium text-gray-600 mb-1">Masa Berlaku 1 Thn <Required/></label>
                                    <input type="date" className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-black disabled:bg-gray-100" disabled={isViewMode} value={vehicleForm.masaBerlaku1 || ''} onChange={(e) => handleVehicleChange('masaBerlaku1', e.target.value)} />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-600 mb-1">Masa Berlaku 5 Thn <Required/></label>
                                    <input type="date" className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-black disabled:bg-gray-100" disabled={isViewMode} value={vehicleForm.masaBerlaku5 || ''} onChange={(e) => handleVehicleChange('masaBerlaku5', e.target.value)} />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-600 mb-1">Masa Berlaku KIR</label>
                                    <input type="date" className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-black disabled:bg-gray-100" disabled={isViewMode} value={vehicleForm.masaBerlakuKir || ''} onChange={(e) => handleVehicleChange('masaBerlakuKir', e.target.value)} />
                                </div>
                             </div>
                        </div>

                        {/* Pembelian */}
                        <div>
                             <SectionHeader title={t('Pembelian')} />
                             <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-medium text-gray-600 mb-1">Tgl Beli <Required/></label>
                                    <input type="date" className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-black disabled:bg-gray-100" disabled={isViewMode} value={vehicleForm.tglBeli || ''} onChange={(e) => handleVehicleChange('tglBeli', e.target.value)} />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-600 mb-1">Harga Beli <Required/></label>
                                    <input type="text" className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-black disabled:bg-gray-100" disabled={isViewMode} value={vehicleForm.hargaBeli || ''} onChange={(e) => handleVehicleChange('hargaBeli', e.target.value)} />
                                </div>
                             </div>
                        </div>

                         {/* Asuransi */}
                        <div>
                             <SectionHeader title={t('Asuransi')} />
                             <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-medium text-gray-600 mb-1">No Polis</label>
                                    <input type="text" className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-black disabled:bg-gray-100" disabled={isViewMode} value={vehicleForm.noPolisAsuransi || ''} onChange={(e) => handleVehicleChange('noPolisAsuransi', e.target.value)} />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-600 mb-1">Jangka Pertanggungan</label>
                                    <input type="text" placeholder="dd/mm/yyyy" className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-black disabled:bg-gray-100" disabled={isViewMode} value={vehicleForm.jangkaPertanggungan || ''} onChange={(e) => handleVehicleChange('jangkaPertanggungan', e.target.value)} />
                                </div>
                             </div>
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
                className="px-6 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
                {t('Draft')}
            </button>
            <button 
                onClick={handleSave}
                className={`px-6 py-2 text-sm font-medium text-white rounded-lg transition-colors shadow-sm ${isMasterVendor ? 'bg-orange-500 hover:bg-orange-600' : 'bg-black hover:bg-gray-800'}`}
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
