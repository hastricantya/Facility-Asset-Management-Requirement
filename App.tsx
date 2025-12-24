
import React, { useState, useMemo } from 'react';
import { Sidebar } from './components/Sidebar';
import { TopBar } from './components/TopBar';
import { FilterBar } from './components/FilterBar';
import { VehicleTable } from './components/VehicleTable';
import { ServiceLogTable } from './components/ServiceLogTable'; 
import { TaxKirTable } from './components/TaxKirTable';
import { MasterVendorTable } from './components/MasterVendorTable';
import { VehicleContractTable } from './components/VehicleContractTable';
import { BuildingTable } from './components/BuildingTable';
import { ReminderTable } from './components/ReminderTable';
import { GeneralMasterTable } from './components/GeneralMasterTable';
import { StationeryRequestTable } from './components/StationeryRequestTable';
import { MasterAtkTable } from './components/MasterAtkTable';
import { MasterDeliveryLocationTable } from './components/MasterDeliveryLocationTable';
import { LogBookTable } from './components/LogBookTable';
import { StockOpnameTable } from './components/StockOpnameTable';
import { LockerTable } from './components/LockerTable';
import { VehicleModal } from './components/VehicleModal';
import { BuildingModal } from './components/BuildingModal';
import { GeneralMasterModal } from './components/GeneralMasterModal';
import { AddStockModal } from './components/AddStockModal';
import { MasterItemModal } from './components/MasterItemModal';
import { DeliveryLocationModal } from './components/DeliveryLocationModal';
import { ConfirmationModal } from './components/ConfirmationModal';
import { ImportExcelModal } from './components/ImportExcelModal';
import { Users, User, Baby, Activity, Lock } from 'lucide-react';
import { 
  MOCK_VEHICLE_DATA, 
  MOCK_SERVICE_DATA, 
  MOCK_TAX_KIR_DATA, 
  MOCK_MASTER_VENDOR_DATA, 
  MOCK_VEHICLE_CONTRACT_DATA, 
  MOCK_BUILDING_DATA, 
  MOCK_REMINDER_DATA, 
  MOCK_GENERAL_MASTER_DATA,
  MOCK_DATA as MOCK_ATK_DATA,
  MOCK_ARK_DATA,
  MOCK_MASTER_DATA as MOCK_ATK_MASTER,
  MOCK_MASTER_ARK_DATA,
  MOCK_LOGBOOK_DATA,
  MOCK_STOCK_OPNAME_DATA,
  MOCK_LOCKER_DATA,
  MOCK_UOM_DATA,
  MOCK_ATK_CATEGORY,
  MOCK_ARK_CATEGORY,
  MOCK_DELIVERY_LOCATIONS
} from './constants';
import { 
  VehicleRecord, 
  ServiceRecord, 
  TaxKirRecord, 
  VehicleContractRecord, 
  BuildingRecord, 
  ReminderRecord, 
  GeneralMasterItem,
  AssetRecord,
  LogBookRecord,
  MasterItem,
  DeliveryLocationRecord,
  StockOpnameRecord,
  LockerRecord
} from './types';
import { useLanguage } from './contexts/LanguageContext';

const App: React.FC = () => {
  const { t } = useLanguage();
  const [activeModule, setActiveModule] = useState('Log Book'); 
  const [activeTab, setActiveTab] = useState('');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Log Book Filters State
  const [logBookFilters, setLogBookFilters] = useState({
    location: '',
    category: '',
    date: ''
  });

  const handleLogBookFilterChange = (field: string, value: string) => {
    setLogBookFilters(prev => ({ ...prev, [field]: value }));
  };

  // Stationery Filters State
  const [stationeryFilters, setStationeryFilters] = useState({
    transactionId: '',
    requester: '',
    date: ''
  });

  const handleStationeryFilterChange = (field: string, value: string) => {
    setStationeryFilters(prev => ({ ...prev, [field]: value }));
  };

  // Master ATK/ARK Filters State
  const [masterFilters, setMasterFilters] = useState({
    category: '',
    partCode: ''
  });

  const handleMasterFilterChange = (field: string, value: string) => {
    setMasterFilters(prev => ({ ...prev, [field]: value }));
  };

  // Data States
  const [vehicleData] = useState<VehicleRecord[]>(MOCK_VEHICLE_DATA);
  const [buildingData] = useState<BuildingRecord[]>(MOCK_BUILDING_DATA);
  const [reminderData] = useState<ReminderRecord[]>(MOCK_REMINDER_DATA);
  const [vehicleContractData] = useState<VehicleContractRecord[]>(MOCK_VEHICLE_CONTRACT_DATA);
  const [serviceData] = useState<ServiceRecord[]>(MOCK_SERVICE_DATA);
  const [taxKirData] = useState<TaxKirRecord[]>(MOCK_TAX_KIR_DATA);
  const [masterVendors] = useState(MOCK_MASTER_VENDOR_DATA);
  const [atkData, setAtkData] = useState<AssetRecord[]>(MOCK_ATK_DATA);
  const [arkData, setArkData] = useState<AssetRecord[]>(MOCK_ARK_DATA);
  const [atkMaster, setAtkMaster] = useState<MasterItem[]>(MOCK_ATK_MASTER);
  const [arkMaster, setArkMaster] = useState<MasterItem[]>(MOCK_MASTER_ARK_DATA);
  const [logBookData, setLogBookData] = useState<LogBookRecord[]>(MOCK_LOGBOOK_DATA);
  const [stockOpnameData, setStockOpnameData] = useState<StockOpnameRecord[]>(MOCK_STOCK_OPNAME_DATA);
  const [lockerData, setLockerData] = useState<LockerRecord[]>(MOCK_LOCKER_DATA);
  
  // Master Lists (UOM, Category, Loc) with setters
  const [uomList, setUomList] = useState<GeneralMasterItem[]>(MOCK_UOM_DATA);
  const [atkCategories, setAtkCategories] = useState<GeneralMasterItem[]>(MOCK_ATK_CATEGORY);
  const [arkCategories, setArkCategories] = useState<GeneralMasterItem[]>(MOCK_ARK_CATEGORY);
  const [delivLocations, setDelivLocations] = useState<DeliveryLocationRecord[]>(MOCK_DELIVERY_LOCATIONS);

  // Master Data States (Generic)
  const [masterLists, setMasterLists] = useState<Record<string, GeneralMasterItem[]>>({
    'Jenis Pajak': MOCK_GENERAL_MASTER_DATA.jenisPajak,
    'Jenis Pembayaran': MOCK_GENERAL_MASTER_DATA.jenisPembayaran,
    'Jenis Servis': MOCK_GENERAL_MASTER_DATA.jenisServis,
    'Status Mutasi': MOCK_GENERAL_MASTER_DATA.statusMutasi,
    'Status Penjualan': MOCK_GENERAL_MASTER_DATA.statusPenjualan,
    'Status Request': MOCK_GENERAL_MASTER_DATA.statusRequest,
    'Tipe Mutasi': MOCK_GENERAL_MASTER_DATA.tipeMutasi,
    'Tipe Vendor': MOCK_GENERAL_MASTER_DATA.tipeVendor,
    'Peran': MOCK_GENERAL_MASTER_DATA.peran,
  });
  
  // Selection & Modal States
  const [isVehicleModalOpen, setIsVehicleModalOpen] = useState(false);
  const [isBuildingModalOpen, setIsBuildingModalOpen] = useState(false);
  const [isMasterModalOpen, setIsMasterModalOpen] = useState(false);
  const [isStockModalOpen, setIsStockModalOpen] = useState(false);
  const [isMasterItemModalOpen, setIsMasterItemModalOpen] = useState(false);
  const [isDeliveryLocationModalOpen, setIsDeliveryLocationModalOpen] = useState(false);
  const [isCloseTransactionConfirmOpen, setIsCloseTransactionConfirmOpen] = useState(false);
  const [isImportExcelModalOpen, setIsImportExcelModalOpen] = useState(false);
  
  const [modalMode, setModalMode] = useState<'create' | 'edit' | 'view'>('create');
  const [selectedVehicle, setSelectedVehicle] = useState<VehicleRecord | null>(null);
  const [selectedBuilding, setSelectedBuilding] = useState<BuildingRecord | null>(null);
  const [selectedMasterItem, setSelectedMasterItem] = useState<GeneralMasterItem | null>(null);
  const [selectedAsset, setSelectedAsset] = useState<AssetRecord | null>(null);
  const [selectedLogBook, setSelectedLogBook] = useState<LogBookRecord | null>(null);
  const [selectedLocker, setSelectedLocker] = useState<LockerRecord | null>(null);
  const [selectedMasterProduct, setSelectedMasterProduct] = useState<MasterItem | null>(null);
  const [selectedDeliveryLocation, setSelectedDeliveryLocation] = useState<DeliveryLocationRecord | null>(null);
  const [selectedStockOpname, setSelectedStockOpname] = useState<StockOpnameRecord | null>(null);
  const [assetToClose, setAssetToClose] = useState<AssetRecord | null>(null);

  const toggleSidebar = () => setIsSidebarCollapsed(!isSidebarCollapsed);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const handleModuleNavigate = (module: string) => {
    setActiveModule(module);
    // Reset filters when navigating
    setMasterFilters({ category: '', partCode: '' });
    setStationeryFilters({ transactionId: '', requester: '', date: '' });
    
    if (module === 'Kontrak Gedung') {
        setActiveTab('Milik Sendiri');
    } else if (module === 'Daftar Aset') {
        setActiveTab('Aktif');
    } else if (module.includes('Master')) {
        setActiveTab('Items');
    } else if (module === 'Log Book' || module === 'Locker') {
        setActiveTab(''); 
    } else if (module === 'Stock Opname') {
        setActiveTab('Semua');
    } else {
        setActiveTab('Semua');
    }
    setIsMobileMenuOpen(false); 
  };

  const handleAddClick = () => {
    setModalMode('create');
    setSelectedLogBook(null);
    setSelectedAsset(null);
    setSelectedMasterProduct(null);
    setSelectedDeliveryLocation(null);
    setSelectedStockOpname(null);
    setSelectedLocker(null);

    if (activeModule === 'Daftar Aset') {
        setSelectedVehicle(null);
        setIsVehicleModalOpen(true);
    } else if (activeModule === 'Kontrak Gedung') {
        setSelectedBuilding(null);
        setIsBuildingModalOpen(true);
    } else if (activeModule === 'Master ATK' || activeModule === 'Master ARK') {
        if (activeTab === 'UOM' || activeTab === 'Category') {
            setSelectedMasterItem(null);
            setIsMasterModalOpen(true);
        } else if (activeTab === 'Delivery Location') {
            setSelectedDeliveryLocation(null);
            setIsDeliveryLocationModalOpen(true);
        } else {
            setIsMasterItemModalOpen(true);
        }
    } else if (activeModule.includes('ATK') || activeModule.includes('ARK') || activeModule === 'Log Book' || activeModule === 'Servis' || activeModule === 'Stock Opname' || activeModule === 'Locker') {
        setIsStockModalOpen(true);
    } else if (masterLists[activeModule]) {
        setSelectedMasterItem(null);
        setIsMasterModalOpen(true);
    }
  };

  const handleSaveMasterItem = (data: Partial<MasterItem>) => {
    const isArk = activeModule === 'Master ARK';
    if (modalMode === 'create') {
        const newItem: MasterItem = {
            id: Date.now(),
            itemName: data.itemName || 'New Item',
            category: data.category || 'General',
            itemCode: data.itemCode || 'CODE-001',
            uom: data.uom || 'PCS',
            remainingStock: data.remainingStock || 0,
            minimumStock: data.minimumStock || 0,
            maximumStock: data.maximumStock || 0,
            requestedStock: 0,
            purchaseDate: data.purchaseDate || '',
            lastPurchasePrice: data.lastPurchasePrice || 'Rp 0',
            averagePrice: data.lastPurchasePrice || 'Rp 0'
        };
        if (isArk) setArkMaster([newItem, ...arkMaster]);
        else setAtkMaster([newItem, ...atkMaster]);
    } else {
        if (isArk) setArkMaster(arkMaster.map(i => i.id === data.id ? { ...i, ...data } : i));
        else setAtkMaster(atkMaster.map(i => i.id === data.id ? { ...i, ...data } : i));
    }
    setIsMasterItemModalOpen(false);
  };

  const handleSaveGeneralMaster = (name: string) => {
    if (modalMode === 'create') {
      const newItem = { id: Date.now(), name };
      if (activeModule === 'Master ATK' || activeModule === 'Master ARK') {
        if (activeTab === 'UOM') setUomList([...uomList, newItem]);
        else if (activeTab === 'Category') {
          if (activeModule === 'Master ATK') setAtkCategories([...atkCategories, newItem]);
          else setArkCategories([...arkCategories, newItem]);
        }
      } else if (masterLists[activeModule]) {
        setMasterLists(prev => ({ ...prev, [activeModule]: [...prev[activeModule], newItem] }));
      }
    } else if (selectedMasterItem) {
      const updateItem = (list: GeneralMasterItem[]) => list.map(i => i.id === selectedMasterItem.id ? { ...i, name } : i);
      if (activeModule === 'Master ATK' || activeModule === 'Master ARK') {
        if (activeTab === 'UOM') setUomList(updateItem(uomList));
        else if (activeTab === 'Category') {
          if (activeModule === 'Master ATK') setAtkCategories(updateItem(atkCategories));
          else setArkCategories(updateItem(arkCategories));
        }
      } else if (masterLists[activeModule]) {
        setMasterLists(prev => ({ ...prev, [activeModule]: updateItem(prev[activeModule]) }));
      }
    }
    setIsMasterModalOpen(false);
  };

  const handleSaveDeliveryLocation = (data: Partial<DeliveryLocationRecord>) => {
    if (modalMode === 'create') {
      const newItem: DeliveryLocationRecord = {
        id: Date.now(),
        name: data.name || 'New Location',
        address: data.address || '',
        type: data.type || 'HO'
      };
      setDelivLocations([...delivLocations, newItem]);
    } else if (selectedDeliveryLocation) {
      setDelivLocations(delivLocations.map(l => l.id === selectedDeliveryLocation.id ? { ...l, ...data } : l));
    }
    setIsDeliveryLocationModalOpen(false);
  };

  const handleSaveLogBook = (data: Partial<LogBookRecord>) => {
    if (modalMode === 'create') {
        const newRecord: LogBookRecord = {
            id: Date.now(),
            lokasiModena: data.lokasiModena || 'MODENA Head Office',
            kategoriTamu: data.kategoriTamu || 'Customer',
            namaTamu: data.namaTamu || 'New Guest',
            tanggalKunjungan: data.tanggalKunjungan || new Date().toISOString().split('T')[0],
            jamDatang: data.jamDatang || '00:00',
            jamPulang: data.jamPulang || '',
            wanita: data.wanita || 0,
            lakiLaki: data.lakiLaki || 0,
            anakAnak: data.anakAnak || 0,
            note: data.note || ''
        };
        setLogBookData([newRecord, ...logBookData]);
    } else {
        setLogBookData(logBookData.map(item => item.id === data.id ? { ...item, ...data } : item));
    }
    setIsStockModalOpen(false);
  };

  const handleSaveStockOpname = (data: Partial<StockOpnameRecord>) => {
    if (modalMode === 'create') {
      const newRecord: StockOpnameRecord = {
        id: Date.now(),
        opnameNumber: data.opnameNumber || '',
        itemCode: data.itemCode || '',
        itemName: data.itemName || '',
        category: data.category || '',
        systemQty: data.systemQty || 0,
        physicalQty: data.physicalQty || 0,
        difference: data.difference || 0,
        date: data.date || new Date().toISOString().split('T')[0],
        performedBy: data.performedBy || 'System',
        status: data.status as any || 'Draft'
      };
      setStockOpnameData([newRecord, ...stockOpnameData]);
    }
    setIsStockModalOpen(false);
  };

  const handleSaveLocker = (data: Partial<LockerRecord>) => {
    if (modalMode === 'create') {
      const newRecord: LockerRecord = {
        id: Date.now(),
        lockerNumber: data.lockerNumber || 'NEW',
        location: data.location || 'Lantai 1',
        subLocation: data.subLocation || '-',
        status: data.status || 'Kosong',
        spareKey: data.spareKey || 'Ada',
        lastUpdate: data.lastUpdate || new Date().toISOString().split('T')[0],
        remarks: data.remarks || '',
        employee: data.employee
      };
      setLockerData([newRecord, ...lockerData]);
    } else {
      setLockerData(lockerData.map(item => item.id === data.id ? { ...item, ...data } : item));
    }
    setIsStockModalOpen(false);
  };

  const handleApproveAsset = () => {
    if (selectedAsset) {
      if (activeModule.includes('ATK')) {
        setAtkData(atkData.map(item => item.id === selectedAsset.id ? { ...item, status: 'Approved' } : item));
      } else {
        setArkData(arkData.map(item => item.id === selectedAsset.id ? { ...item, status: 'Approved' } : item));
      }
      setIsStockModalOpen(false);
    }
  };

  const handleRejectAsset = () => {
    if (selectedAsset) {
      if (activeModule.includes('ATK')) {
        setAtkData(atkData.map(item => item.id === selectedAsset.id ? { ...item, status: 'Rejected' } : item));
      } else {
        setArkData(arkData.map(item => item.id === selectedAsset.id ? { ...item, status: 'Rejected' } : item));
      }
      setIsStockModalOpen(false);
    }
  };

  const handleOpenCloseConfirm = (asset: AssetRecord) => {
    setAssetToClose(asset);
    setIsCloseTransactionConfirmOpen(true);
  };

  const handleConfirmCloseAsset = () => {
    if (assetToClose) {
      if (activeModule.includes('ATK')) {
        setAtkData(atkData.map(item => item.id === assetToClose.id ? { ...item, status: 'Closed' } : item));
      } else {
        setArkData(arkData.map(item => item.id === assetToClose.id ? { ...item, status: 'Closed' } : item));
      }
      setIsCloseTransactionConfirmOpen(false);
      setAssetToClose(null);
    }
  };

  const handleImportExcel = (file: File) => {
    console.log('Importing file:', file.name);
    // In real app, process file with XLSX library
    alert(`File ${file.name} successfully imported! Data processing started.`);
  };

  const filteredBuildingData = useMemo(() => {
    if (activeModule === 'Kontrak Gedung') {
        const ownership = activeTab === 'Milik Sendiri' ? 'Own' : 'Rent';
        return buildingData.filter(b => b.ownership === ownership);
    }
    return buildingData;
  }, [activeModule, activeTab, buildingData]);

  const getFilteredAssetData = (data: AssetRecord[]) => {
    let result = data;
    
    // Tab filtering (Status)
    if (activeTab !== 'Semua' && activeTab !== '') {
        result = result.filter(item => item.status === activeTab);
    }

    // Specific Filters
    if (stationeryFilters.transactionId) {
        result = result.filter(item => item.transactionNumber?.toLowerCase().includes(stationeryFilters.transactionId.toLowerCase()));
    }
    if (stationeryFilters.requester) {
        result = result.filter(item => item.employee.name.toLowerCase().includes(stationeryFilters.requester.toLowerCase()));
    }
    if (stationeryFilters.date) {
        const filterDateParts = stationeryFilters.date.split('-');
        const formattedFilterDate = `${filterDateParts[2]}/${filterDateParts[1]}/${filterDateParts[0]}`;
        result = result.filter(item => item.date === formattedFilterDate);
    }

    return result;
  };

  // Master Filtered Data
  const getFilteredMasterData = (data: MasterItem[]) => {
    let result = data;
    if (masterFilters.category) {
      result = result.filter(i => i.category.toLowerCase().includes(masterFilters.category.toLowerCase()));
    }
    if (masterFilters.partCode) {
      result = result.filter(i => i.itemCode.toLowerCase().includes(masterFilters.partCode.toLowerCase()));
    }
    return result;
  };

  const filteredLogBookData = useMemo(() => {
    return logBookData.filter(item => {
      const matchLocation = !logBookFilters.location || item.lokasiModena === logBookFilters.location;
      const matchCategory = !logBookFilters.category || item.kategoriTamu === logBookFilters.category;
      const matchDate = !logBookFilters.date || item.tanggalKunjungan === logBookFilters.date;
      return matchLocation && matchCategory && matchDate;
    });
  }, [logBookData, logBookFilters]);

  const filteredStockOpnameData = useMemo(() => {
    if (activeTab === 'Matched') return stockOpnameData.filter(d => d.status === 'Matched');
    if (activeTab === 'Discrepancy') return stockOpnameData.filter(d => d.status === 'Discrepancy');
    if (activeTab === 'Draft') return stockOpnameData.filter(d => d.status === 'Draft');
    return stockOpnameData;
  }, [stockOpnameData, activeTab]);

  const filteredLockerData = useMemo(() => {
      if (activeTab === 'Terisi') return lockerData.filter(l => l.status === 'Terisi');
      if (activeTab === 'Kosong') return lockerData.filter(l => l.status === 'Kosong');
      if (activeTab === 'Kunci Hilang') return lockerData.filter(l => l.status === 'Kunci Hilang');
      return lockerData;
  }, [lockerData, activeTab]);

  // Log Book stats calculation
  const logBookStats = useMemo(() => {
    return filteredLogBookData.reduce((acc, curr) => ({
      wanita: acc.wanita + curr.wanita,
      lakiLaki: acc.lakiLaki + curr.lakiLaki,
      anakAnak: acc.anakAnak + curr.anakAnak,
      total: acc.total + curr.wanita + curr.lakiLaki + curr.anakAnak
    }), { wanita: 0, lakiLaki: 0, anakAnak: 0, total: 0 });
  }, [filteredLogBookData]);

  // Locker stats calculation
  const lockerStats = useMemo(() => {
      return lockerData.reduce((acc, curr) => ({
          occupied: acc.occupied + (curr.status === 'Terisi' ? 1 : 0),
          available: acc.available + (curr.status === 'Kosong' ? 1 : 0),
          lostKey: acc.lostKey + (curr.status === 'Kunci Hilang' ? 1 : 0),
          total: acc.total + 1
      }), { occupied: 0, available: 0, lostKey: 0, total: 0 });
  }, [lockerData]);

  const renderContent = () => {
     if (masterLists[activeModule]) {
         return (
            <GeneralMasterTable 
                data={masterLists[activeModule]} 
                onEdit={(item) => { setSelectedMasterItem(item); setModalMode('edit'); setIsMasterModalOpen(true); }}
                onDelete={(id) => { if(confirm('Hapus?')) setMasterLists(prev => ({...prev, [activeModule]: prev[activeModule].filter(i => i.id !== id)})); }}
            />
         );
     }

     if (activeModule === 'Master ATK' || activeModule === 'Master ARK') {
        const isArk = activeModule === 'Master ARK';
        switch(activeTab) {
            case 'Items': return <MasterAtkTable data={getFilteredMasterData(isArk ? arkMaster : atkMaster)} onEdit={(item) => { setSelectedMasterProduct(item); setModalMode('edit'); setIsMasterItemModalOpen(true); }} />;
            case 'UOM': return <GeneralMasterTable data={uomList} onEdit={(item) => { setSelectedMasterItem(item); setModalMode('edit'); setIsMasterModalOpen(true); }} onDelete={()=>{}} />;
            case 'Category': return <GeneralMasterTable data={isArk ? arkCategories : atkCategories} onEdit={(item) => { setSelectedMasterItem(item); setModalMode('edit'); setIsMasterModalOpen(true); }} onDelete={()=>{}} />;
            case 'Delivery Location': return <MasterDeliveryLocationTable data={delivLocations} onEdit={(item) => { setSelectedDeliveryLocation(item); setModalMode('edit'); setIsDeliveryLocationModalOpen(true); }} onDelete={()=>{}} />;
            default: return <MasterAtkTable data={getFilteredMasterData(isArk ? arkMaster : atkMaster)} onEdit={(item) => { setSelectedMasterProduct(item); setModalMode('edit'); setIsMasterItemModalOpen(true); }} />;
        }
     }

     switch(activeModule) {
         case 'Daftar Aset': return (
            <VehicleTable 
                data={vehicleData.filter(v => v.status === activeTab)} 
                onEdit={(v) => { setSelectedVehicle(v); setModalMode('edit'); setIsVehicleModalOpen(true); }} 
                onView={(v) => { setSelectedVehicle(v); setModalMode('view'); setIsVehicleModalOpen(true); }}
            />
         );
         case 'Kontrak Gedung': return (
            <BuildingTable 
                data={filteredBuildingData}
                onEdit={(b) => { setSelectedBuilding(b); setModalMode('edit'); setIsBuildingModalOpen(true); }}
                onView={(b) => { setSelectedBuilding(b); setModalMode('view'); setIsBuildingModalOpen(true); }}
            />
         );
         case 'List Reminder Dokumen': return <ReminderTable data={reminderData} />;
         case 'Kontrak Kendaraan': return <VehicleContractTable data={vehicleContractData} />;
         case 'Servis': return <ServiceLogTable data={serviceData} />;
         case 'Pajak & KIR': return <TaxKirTable data={taxKirData} />;
         case 'Master Vendor': return <MasterVendorTable data={masterVendors} />;
         case 'Request ATK':
         case 'Stationery Request Approval':
            return <StationeryRequestTable data={getFilteredAssetData(atkData)} onView={(item) => { setSelectedAsset(item); setModalMode('view'); setIsStockModalOpen(true); }} onCloseTransaction={handleOpenCloseConfirm} />;
         case 'Daftar ARK':
         case 'Household Request Approval':
            return <StationeryRequestTable data={getFilteredAssetData(arkData)} onView={(item) => { setSelectedAsset(item); setModalMode('view'); setIsStockModalOpen(true); }} onCloseTransaction={handleOpenCloseConfirm} />;
         case 'Log Book':
            return <LogBookTable 
                data={filteredLogBookData} 
                onView={(item) => { setSelectedLogBook(item); setModalMode('view'); setIsStockModalOpen(true); }} 
                onEdit={(item) => { setSelectedLogBook(item); setModalMode('edit'); setIsStockModalOpen(true); }}
            />;
         case 'Locker':
            return <LockerTable 
                data={filteredLockerData}
                onView={(item) => { setSelectedLocker(item); setModalMode('view'); setIsStockModalOpen(true); }}
                onEdit={(item) => { setSelectedLocker(item); setModalMode('edit'); setIsStockModalOpen(true); }}
            />;
         case 'Stock Opname':
            return <StockOpnameTable 
                data={filteredStockOpnameData}
                onView={(item) => { setSelectedStockOpname(item); setModalMode('view'); setIsStockModalOpen(true); }}
            />;
         default: return <div className="p-8 text-center text-gray-500">Konten Modul {activeModule}</div>;
     }
  };

  const showFilterBar = !['Dashboard', 'Timesheet'].includes(activeModule);
  const mainTabs = useMemo(() => {
    if (activeModule === 'Kontrak Gedung') return ['Milik Sendiri', 'Sewa'];
    if (activeModule === 'Daftar Aset') return ['Aktif', 'Tidak Aktif'];
    if (activeModule === 'Master ATK' || activeModule === 'Master ARK') return ['Items', 'UOM', 'Category', 'Delivery Location'];
    if (activeModule.includes('Daftar') || activeModule.includes('Approval') || activeModule.includes('Request')) return ['Semua', 'Draft', 'On Progress', 'Pending', 'Approved', 'Rejected', 'Closed'];
    if (activeModule === 'Log Book') return []; 
    if (activeModule === 'Locker') return ['Semua', 'Terisi', 'Kosong', 'Kunci Hilang'];
    if (activeModule === 'Stock Opname') return ['Semua', 'Matched', 'Discrepancy', 'Draft'];
    return ['Semua'];
  }, [activeModule]);

  const masterModalTitle = useMemo(() => {
    if ((activeModule === 'Master ATK' || activeModule === 'Master ARK') && activeTab && activeTab !== 'Items') {
      return activeTab;
    }
    return activeModule;
  }, [activeModule, activeTab]);

  return (
    <div className="flex bg-[#fbfbfb] min-h-screen font-sans relative overflow-x-hidden text-black">
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={toggleMobileMenu} />
      )}

      <Sidebar 
        activeItem={activeModule} 
        onNavigate={handleModuleNavigate} 
        isCollapsed={isSidebarCollapsed} 
        onToggle={toggleSidebar}
        isMobileOpen={isMobileMenuOpen}
        onCloseMobile={toggleMobileMenu}
      />
      
      <div className={`flex-1 flex flex-col transition-all duration-300 w-full ${isSidebarCollapsed ? 'lg:ml-20' : 'lg:ml-64'}`}>
        <TopBar breadcrumbs={['Beranda', t(activeModule)]} onMenuClick={toggleMobileMenu} />
        
        <main className="flex-1 p-8 overflow-y-auto">
          <div className="max-w-[1600px] mx-auto">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-[20px] font-bold text-black tracking-tight">
                    {activeModule === 'Kontrak Gedung' ? 'Daftar Gedung' : t(activeModule)}
                </h1>
                
                {activeModule === 'Log Book' && (
                    <div className="flex items-center gap-6 bg-white border border-gray-100 rounded-2xl px-6 py-3 shadow-sm">
                        <div className="flex items-center gap-2">
                            <Activity size={14} className="text-gray-400" />
                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Today Summary</span>
                        </div>
                        <div className="h-6 w-[1px] bg-gray-100"></div>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                                <Users size={14} className="text-pink-500" />
                                <span className="text-[12px] font-black">{logBookStats.wanita}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <User size={14} className="text-blue-500" />
                                <span className="text-[12px] font-black">{logBookStats.lakiLaki}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Baby size={14} className="text-orange-500" />
                                <span className="text-[12px] font-black">{logBookStats.anakAnak}</span>
                            </div>
                        </div>
                        <div className="h-6 w-[1px] bg-gray-100"></div>
                        <div className="bg-black text-white px-3 py-1 rounded-lg text-[10px] font-black">
                            {logBookStats.total} TOTAL
                        </div>
                    </div>
                )}

                {activeModule === 'Locker' && (
                    <div className="flex items-center gap-6 bg-white border border-gray-100 rounded-2xl px-6 py-3 shadow-sm">
                        <div className="flex items-center gap-2">
                            <Lock size={14} className="text-gray-400" />
                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Locker Inventory</span>
                        </div>
                        <div className="h-6 w-[1px] bg-gray-100"></div>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-black"></div>
                                <span className="text-[10px] font-black text-gray-400 uppercase">Terisi</span>
                                <span className="text-[12px] font-black">{lockerStats.occupied}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                <span className="text-[10px] font-black text-gray-400 uppercase">Kosong</span>
                                <span className="text-[12px] font-black">{lockerStats.available}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-red-500"></div>
                                <span className="text-[10px] font-black text-gray-400 uppercase">Hlg Kunci</span>
                                <span className="text-[12px] font-black">{lockerStats.lostKey}</span>
                            </div>
                        </div>
                        <div className="h-6 w-[1px] bg-gray-100"></div>
                        <div className="bg-black text-white px-3 py-1 rounded-lg text-[10px] font-black">
                            {lockerStats.total} UNITS
                        </div>
                    </div>
                )}
            </div>
            
            {showFilterBar && (
                <FilterBar 
                    tabs={mainTabs} 
                    activeTab={activeTab} 
                    onTabChange={setActiveTab} 
                    onAddClick={handleAddClick}
                    onImportExcelClick={() => setIsImportExcelModalOpen(true)}
                    moduleName={activeModule}
                    searchPlaceholder={activeModule === 'Log Book' ? "Cari berdasarkan Nama Tamu..." : activeModule === 'Locker' ? "Cari Locker atau Nama Karyawan..." : activeModule === 'Kontrak Gedung' ? "Cari berdasarkan Karyawan, Barang..." : undefined}
                    hideAdd={['List Reminder Dokumen'].includes(activeModule)}
                    logBookFilters={activeModule === 'Log Book' ? logBookFilters : undefined}
                    onLogBookFilterChange={handleLogBookFilterChange}
                    stationeryFilters={stationeryFilters}
                    onStationeryFilterChange={handleStationeryFilterChange}
                    masterFilters={masterFilters}
                    onMasterFilterChange={handleMasterFilterChange}
                />
            )}
            
            {renderContent()}
          </div>
        </main>
      </div>

      <GeneralMasterModal 
        isOpen={isMasterModalOpen}
        onClose={() => setIsMasterModalOpen(false)}
        onSave={handleSaveGeneralMaster}
        initialData={selectedMasterItem}
        title={masterModalTitle}
      />

      <BuildingModal 
        isOpen={isBuildingModalOpen}
        onClose={() => setIsBuildingModalOpen(false)}
        onSave={() => setIsBuildingModalOpen(false)}
        initialData={selectedBuilding || undefined}
        mode={modalMode}
      />

      <VehicleModal 
        isOpen={isVehicleModalOpen}
        onClose={() => setIsVehicleModalOpen(false)}
        onSave={() => setIsVehicleModalOpen(false)}
        initialData={selectedVehicle || undefined}
        mode={modalMode}
      />

      <AddStockModal 
        isOpen={isStockModalOpen}
        onClose={() => setIsStockModalOpen(false)}
        moduleName={activeModule}
        mode={modalMode}
        initialAssetData={selectedAsset || undefined}
        initialLogBookData={selectedLogBook || undefined}
        initialStockOpnameData={selectedStockOpname || undefined}
        initialLockerData={selectedLocker || undefined}
        onSaveLogBook={handleSaveLogBook}
        onSaveStockOpname={handleSaveStockOpname}
        onSaveLocker={handleSaveLocker}
        onApprove={handleApproveAsset}
        onReject={handleRejectAsset}
        vehicleList={vehicleData}
      />

      <MasterItemModal 
        isOpen={isMasterItemModalOpen}
        onClose={() => setIsMasterItemModalOpen(false)}
        onSave={handleSaveMasterItem}
        initialData={selectedMasterProduct}
        moduleName={activeModule}
        mode={modalMode}
      />

      <DeliveryLocationModal 
        isOpen={isDeliveryLocationModalOpen}
        onClose={() => setIsDeliveryLocationModalOpen(false)}
        onSave={handleSaveDeliveryLocation}
        initialData={selectedDeliveryLocation}
        mode={modalMode}
      />

      <ConfirmationModal 
        isOpen={isCloseTransactionConfirmOpen}
        onClose={() => setIsCloseTransactionConfirmOpen(false)}
        onConfirm={handleConfirmCloseAsset}
        title="Close Transaction"
        message={`Are you sure to close this transaction (${assetToClose?.transactionNumber})? This action will archive the record.`}
        variant="info"
      />

      <ImportExcelModal 
        isOpen={isImportExcelModalOpen}
        onClose={() => setIsImportExcelModalOpen(false)}
        onImport={handleImportExcel}
        title={`Import Master ${activeModule === 'Master ARK' ? 'ARK' : 'ATK'}`}
      />
    </div>
  );
};

export default App;
