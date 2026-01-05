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
import { LockerRequestTable } from './components/LockerRequestTable';
import { ModenaPodTable } from './components/ModenaPodTable';
import { MasterModenaPodTable } from './components/MasterModenaPodTable';
import { MasterLockerTable } from './components/MasterLockerTable';
import { PodRequestTable } from './components/PodRequestTable';
import { VehicleModal } from './components/VehicleModal';
import { BuildingModal } from './components/BuildingModal';
import { GeneralMasterModal } from './components/GeneralMasterModal';
import { AddStockModal } from './components/AddStockModal';
import { MasterItemModal } from './components/MasterItemModal';
import { DeliveryLocationModal } from './components/DeliveryLocationModal';
import { ConfirmationModal } from './components/ConfirmationModal';
import { ImportExcelModal } from './components/ImportExcelModal';
import { Users, User, Baby, Activity, Lock, Home } from 'lucide-react';
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
  MOCK_LOCKER_REQUEST_DATA,
  MOCK_POD_DATA,
  MOCK_MASTER_POD_DATA,
  MOCK_MASTER_LOCKER_GOODS_DATA,
  MOCK_MASTER_LOCKER_PANTRY_DATA,
  MOCK_POD_REQUEST_DATA,
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
  LockerRecord,
  LockerRequestRecord,
  PodRequestRecord,
  ModenaPodRecord,
  MasterPodRecord,
  MasterLockerRecord
} from './types';
import { useLanguage } from './contexts/LanguageContext';

const App: React.FC = () => {
  const { t } = useLanguage();
  const [activeModule, setActiveModule] = useState('Log Book'); 
  const [activeTab, setActiveTab] = useState('');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Filters State
  const [logBookFilters, setLogBookFilters] = useState({ location: '', category: '', date: '' });
  const [stationeryFilters, setStationeryFilters] = useState({ transactionId: '', requester: '', date: '' });
  const [masterFilters, setMasterFilters] = useState({ category: '', partCode: '' });
  const [podFilters, setPodFilters] = useState({ lantai: '', jenisKamar: '' });

  // Data States
  const [atkData, setAtkData] = useState<AssetRecord[]>(MOCK_ATK_DATA);
  const [arkData, setArkData] = useState<AssetRecord[]>(MOCK_ARK_DATA);
  const [atkMaster, setAtkMaster] = useState<MasterItem[]>(MOCK_ATK_MASTER);
  const [arkMaster, setArkMaster] = useState<MasterItem[]>(MOCK_MASTER_ARK_DATA);
  const [logBookData, setLogBookData] = useState<LogBookRecord[]>(MOCK_LOGBOOK_DATA);
  const [stockOpnameData, setStockOpnameData] = useState<StockOpnameRecord[]>(MOCK_STOCK_OPNAME_DATA);
  const [lockerData, setLockerData] = useState<LockerRecord[]>(MOCK_LOCKER_DATA);
  const [lockerRequestData, setLockerRequestData] = useState<LockerRequestRecord[]>(MOCK_LOCKER_REQUEST_DATA);
  const [podData, setPodData] = useState<ModenaPodRecord[]>(MOCK_POD_DATA);
  const [masterPodData, setMasterPodData] = useState<MasterPodRecord[]>(MOCK_MASTER_POD_DATA);
  const [masterLockerGoodsData, setMasterLockerGoodsData] = useState<MasterLockerRecord[]>(MOCK_MASTER_LOCKER_GOODS_DATA);
  const [masterLockerPantryData, setMasterLockerPantryData] = useState<MasterLockerRecord[]>(MOCK_MASTER_LOCKER_PANTRY_DATA);
  const [podRequestData, setPodRequestData] = useState<PodRequestRecord[]>(MOCK_POD_REQUEST_DATA);
  
  const [vehicleData] = useState<VehicleRecord[]>(MOCK_VEHICLE_DATA);
  const [buildingData] = useState<BuildingRecord[]>(MOCK_BUILDING_DATA);
  const [reminderData] = useState<ReminderRecord[]>(MOCK_REMINDER_DATA);
  const [vehicleContractData] = useState<VehicleContractRecord[]>(MOCK_VEHICLE_CONTRACT_DATA);
  const [serviceData] = useState<ServiceRecord[]>(MOCK_SERVICE_DATA);
  const [taxKirData] = useState<TaxKirRecord[]>(MOCK_TAX_KIR_DATA);
  const [masterVendors] = useState(MOCK_MASTER_VENDOR_DATA);

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
  const [selectedAsset, setSelectedAsset] = useState<AssetRecord | null>(null);
  const [selectedLogBook, setSelectedLogBook] = useState<LogBookRecord | null>(null);
  const [selectedLocker, setSelectedLocker] = useState<LockerRecord | null>(null);
  const [selectedLockerRequest, setSelectedLockerRequest] = useState<LockerRequestRecord | null>(null);
  const [selectedPod, setSelectedPod] = useState<ModenaPodRecord | null>(null);
  const [selectedMasterPod, setSelectedMasterPod] = useState<MasterPodRecord | null>(null);
  const [selectedMasterLocker, setSelectedMasterLocker] = useState<MasterLockerRecord | null>(null);
  const [selectedPodRequest, setSelectedPodRequest] = useState<PodRequestRecord | null>(null);
  const [selectedStockOpname, setSelectedStockOpname] = useState<StockOpnameRecord | null>(null);

  const toggleSidebar = () => setIsSidebarCollapsed(!isSidebarCollapsed);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const handleModuleNavigate = (module: string) => {
    setActiveModule(module);
    if (module === 'Pod Census' || module === 'Daftar Loker' || module === 'Master MODENA Pod') setActiveTab('Semua');
    else if (module === 'Log Book' || module === 'Request Locker' || module === 'Request MODENA Pod') setActiveTab('');
    else setActiveTab('Semua');
    setIsMobileMenuOpen(false); 
  };

  const handleAddClick = () => {
    setModalMode('create');
    setSelectedLogBook(null);
    setSelectedAsset(null);
    setSelectedStockOpname(null);
    setSelectedLocker(null);
    setSelectedLockerRequest(null);
    setSelectedPod(null);
    setSelectedMasterPod(null);
    setSelectedMasterLocker(null);
    setSelectedPodRequest(null);
    setIsStockModalOpen(true);
  };

  const handleImportExcelClick = () => {
    setIsImportExcelModalOpen(true);
  };

  const handleApproveRequest = (item: AssetRecord) => {
    if (item.id < 100) { // Simple logic based on mock generator IDs
        setAtkData(atkData.map(d => d.id === item.id ? { ...d, status: 'Approved' } : d));
    } else {
        setArkData(arkData.map(d => d.id === item.id ? { ...d, status: 'Approved' } : d));
    }
  };

  const handleRejectRequest = (item: AssetRecord) => {
    if (item.id < 100) {
        setAtkData(atkData.map(d => d.id === item.id ? { ...d, status: 'Rejected' } : d));
    } else {
        setArkData(arkData.map(d => d.id === item.id ? { ...d, status: 'Rejected' } : d));
    }
  };

  const handleApproveOpname = (id: number) => {
    setStockOpnameData(stockOpnameData.map(d => d.id === id ? { ...d, status: d.difference === 0 ? 'Matched' : 'Discrepancy' } : d));
  };

  const handleRejectOpname = (id: number) => {
    setStockOpnameData(stockOpnameData.map(d => d.id === id ? { ...d, status: 'Draft' } : d));
  };

  const handleSavePod = (data: Partial<ModenaPodRecord>) => {
    if (modalMode === 'create') {
        const newRecord: ModenaPodRecord = {
            id: Date.now(),
            lantai: data.lantai || 'Lt 2 Pria',
            jenisKamar: data.jenisKamar || 'Single Bed',
            nomorKamar: data.nomorKamar || 'NEW',
            namaPenghuni: data.namaPenghuni || 'Unknown',
            statusLokerBarang: data.statusLokerBarang || 'Tidak Terpakai',
            statusLokerPantry: data.statusLokerPantry || 'Tidak Terpakai',
            jadwalLaundry: data.jadwalLaundry || '-',
            keterangan: data.keterangan || ''
        };
        setPodData([newRecord, ...podData]);
    } else {
        setPodData(podData.map(item => item.id === data.id ? { ...item, ...data } : item));
    }
    setIsStockModalOpen(false);
  };

  const handleSaveMasterLocker = (data: Partial<MasterLockerRecord>) => {
    const isGoods = activeTab === 'Loker Barang';
    const targetSet = isGoods ? setMasterLockerGoodsData : setMasterLockerPantryData;
    const targetData = isGoods ? masterLockerGoodsData : masterLockerPantryData;

    if (modalMode === 'create') {
        const newRecord: MasterLockerRecord = {
            id: Date.now(),
            lockerNumber: data.lockerNumber || 'NEW',
            floor: data.floor || 'Lt 2 Pria',
            type: isGoods ? 'Goods' : 'Pantry',
            status: data.status || 'Active',
            remarks: data.remarks
        };
        targetSet([newRecord, ...targetData]);
    } else {
        targetSet(targetData.map(item => item.id === data.id ? { ...item, ...data } : item));
    }
    setIsStockModalOpen(false);
  };

  const filteredPodData = useMemo(() => {
      return podData.filter(p => {
          const matchesTab = activeTab === 'Semua' || activeTab === '' || p.lantai === activeTab;
          const matchesLantai = !podFilters.lantai || p.lantai === podFilters.lantai;
          const matchesJenisKamar = !podFilters.jenisKamar || p.jenisKamar === podFilters.jenisKamar;
          return matchesTab && matchesLantai && matchesJenisKamar;
      });
  }, [podData, activeTab, podFilters]);

  const filteredLockerData = useMemo(() => {
    if (activeTab === 'Terisi') return lockerData.filter(l => l.status === 'Terisi');
    if (activeTab === 'Kosong') return lockerData.filter(l => l.status === 'Kosong');
    if (activeTab === 'Kunci Hilang') return lockerData.filter(l => l.status === 'Kunci Hilang');
    return lockerData;
  }, [lockerData, activeTab]);

  const podStats = useMemo(() => {
    return podData.reduce((acc, curr) => ({
        pria: acc.pria + (curr.lantai.includes('Pria') ? 1 : 0),
        perempuan: acc.perempuan + (curr.lantai.includes('Perempuan') ? 1 : 0),
        usedAsset: acc.usedAsset + (curr.statusLokerBarang.includes('Terpakai') ? 1 : 0),
        total: acc.total + 1
    }), { pria: 0, perempuan: 0, usedAsset: 0, total: 0 });
  }, [podData]);

  const renderContent = () => {
     const statusMap: Record<string, string> = { 'Waiting Approval': 'Pending' };
     const currentTargetStatus = statusMap[activeTab] || activeTab;

     switch(activeModule) {
         case 'Log Book': return <LogBookTable data={logBookData} onView={(item) => { setSelectedLogBook(item); setModalMode('view'); setIsStockModalOpen(true); }} onEdit={(item) => { setSelectedLogBook(item); setModalMode('edit'); setIsStockModalOpen(true); }} />;
         case 'Daftar Loker': return <LockerTable data={filteredLockerData} onView={(item) => { setSelectedLocker(item); setModalMode('view'); setIsStockModalOpen(true); }} onEdit={(item) => { setSelectedLocker(item); setModalMode('edit'); setIsStockModalOpen(true); }} />;
         case 'Request Locker': return <LockerRequestTable data={lockerRequestData} onView={(item) => { setSelectedLockerRequest(item); setModalMode('view'); setIsStockModalOpen(true); }} />;
         case 'Pod Census': return <ModenaPodTable data={filteredPodData} onView={(item) => { setSelectedPod(item); setModalMode('view'); setIsStockModalOpen(true); }} onEdit={(item) => { setSelectedPod(item); setModalMode('edit'); setIsStockModalOpen(true); }} />;
         case 'Master MODENA Pod': 
            if (activeTab === 'Loker Barang') return <MasterLockerTable data={masterLockerGoodsData} title="GOODS LOCKER CATALOG" onEdit={(item) => { setSelectedMasterLocker(item); setModalMode('edit'); setIsStockModalOpen(true); }} />;
            if (activeTab === 'Loker Pantry') return <MasterLockerTable data={masterLockerPantryData} title="PANTRY LOCKER CATALOG" onEdit={(item) => { setSelectedMasterLocker(item); setModalMode('edit'); setIsStockModalOpen(true); }} />;
            return <MasterModenaPodTable data={masterPodData} onEdit={(item) => { setSelectedMasterPod(item); setModalMode('edit'); setIsStockModalOpen(true); }} />;
         case 'Request MODENA Pod': return <PodRequestTable data={podRequestData} onView={(item) => { setSelectedPodRequest(item); setModalMode('view'); setIsStockModalOpen(true); }} />;
         case 'Stock Opname': return <StockOpnameTable data={stockOpnameData.filter(item => activeTab === 'Semua' || activeTab === '' || item.status === currentTargetStatus)} onView={(item) => { setSelectedStockOpname(item); setModalMode('view'); setIsStockModalOpen(true); }} />;
         case 'Stock Opname Approval': return <StockOpnameTable data={stockOpnameData.filter(item => item.status === 'Draft')} showItemCode={false} onView={(item) => { setSelectedStockOpname(item); setModalMode('view'); setIsStockModalOpen(true); }} />;
         case 'Request ATK':
         case 'Stationery Request Approval':
            const filteredAtk = atkData.filter(item => activeTab === 'Semua' || activeTab === '' || item.status === currentTargetStatus);
            return <StationeryRequestTable data={filteredAtk} onView={(item) => { setSelectedAsset(item); setModalMode('view'); setIsStockModalOpen(true); }} onApprove={handleApproveRequest} onReject={handleRejectRequest} />;
         case 'Daftar ARK':
         case 'Household Request Approval':
            const filteredArk = arkData.filter(item => activeTab === 'Semua' || activeTab === '' || item.status === currentTargetStatus);
            return <StationeryRequestTable data={filteredArk} onView={(item) => { setSelectedAsset(item); setModalMode('view'); setIsStockModalOpen(true); }} onApprove={handleApproveRequest} onReject={handleRejectRequest} />;
         case 'Master ATK':
            return <MasterAtkTable data={atkMaster} onEdit={(item) => { setModalMode('edit'); setSelectedAsset({ ...MOCK_ATK_DATA[0], itemName: item.itemName, itemCode: item.itemCode, category: item.category }); setIsMasterItemModalOpen(true); }} />;
         case 'Master ARK':
            return <MasterAtkTable data={arkMaster} onEdit={(item) => { setModalMode('edit'); setSelectedAsset({ ...MOCK_ARK_DATA[0], itemName: item.itemName, itemCode: item.itemCode, category: item.category }); setIsMasterItemModalOpen(true); }} />;
         default: return <div className="p-8 text-center text-gray-400 uppercase font-black text-[10px] tracking-widest">{activeModule} module content placeholder</div>;
     }
  };

  const mainTabs = useMemo(() => {
    if (activeModule === 'Pod Census') return ['Semua', 'Lt 2 Pria', 'Lt 2 Perempuan', 'Lt 3 Pria', 'Lt 3 Perempuan'];
    if (activeModule === 'Daftar Loker') return ['Semua', 'Terisi', 'Kosong', 'Kunci Hilang'];
    if (activeModule === 'Master MODENA Pod') return ['Semua', 'Loker Barang', 'Loker Pantry'];
    if (activeModule.includes('Daftar') || activeModule.includes('Approval') || activeModule.includes('Request')) {
        if (!activeModule.includes('Master')) {
           return ['Semua', 'Draft', 'Waiting Approval', 'Approved', 'Rejected', 'Closed'];
        }
    }
    if (activeModule === 'Stock Opname') return ['Semua', 'Matched', 'Discrepancy'];
    if (activeModule === 'Stock Opname Approval') return ['Pending'];
    if (activeModule.includes('Master')) return ['Semua'];
    return ['Semua'];
  }, [activeModule]);

  return (
    <div className="flex bg-[#fbfbfb] min-h-screen font-sans relative overflow-x-hidden text-black">
      {isMobileMenuOpen && <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={toggleMobileMenu} />}

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
                <h1 className="text-[20px] font-bold text-black tracking-tight">{t(activeModule)}</h1>
                
                {activeModule === 'Pod Census' && (
                    <div className="flex items-center gap-6 bg-white border border-gray-100 rounded-2xl px-6 py-3 shadow-sm">
                        <div className="flex items-center gap-2">
                            <Home size={14} className="text-gray-400" />
                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Census Status</span>
                        </div>
                        <div className="h-6 w-[1px] bg-gray-100"></div>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                                <span className="text-[10px] font-black text-gray-400 uppercase">Pria</span>
                                <span className="text-[12px] font-black">{podStats.pria}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-pink-500"></div>
                                <span className="text-[10px] font-black text-gray-400 uppercase">Perempuan</span>
                                <span className="text-[12px] font-black">{podStats.perempuan}</span>
                            </div>
                        </div>
                        <div className="h-6 w-[1px] bg-gray-100"></div>
                        <div className="bg-black text-white px-3 py-1 rounded-lg text-[10px] font-black">
                            {podStats.total} TOTAL UNIT
                        </div>
                    </div>
                )}
            </div>
            
            <FilterBar 
                tabs={mainTabs} 
                activeTab={activeTab} 
                onTabChange={setActiveTab} 
                onAddClick={handleAddClick}
                onImportExcelClick={handleImportExcelClick}
                moduleName={activeModule}
                searchPlaceholder={`Search ${activeModule}...`}
                hideAdd={activeModule === 'Stock Opname Approval'}
                podFilters={podFilters}
                onPodFilterChange={(field, value) => setPodFilters(prev => ({ ...prev, [field]: value }))}
                stationeryFilters={stationeryFilters}
                onStationeryFilterChange={(field, value) => setStationeryFilters(prev => ({ ...prev, [field]: value }))}
                masterFilters={masterFilters}
                onMasterFilterChange={(field, value) => setMasterFilters(prev => ({ ...prev, [field]: value }))}
            />
            
            {renderContent()}
          </div>
        </main>
      </div>

      <AddStockModal 
        isOpen={isStockModalOpen}
        onClose={() => setIsStockModalOpen(false)}
        moduleName={activeModule === 'Master MODENA Pod' ? (activeTab === 'Semua' ? 'Master MODENA Pod' : (activeTab === 'Loker Barang' ? 'Master Loker Barang' : 'Master Loker Pantry')) : activeModule}
        mode={modalMode}
        initialLogBookData={selectedLogBook || undefined}
        initialLockerData={selectedLocker || undefined}
        initialLockerRequestData={selectedLockerRequest || undefined}
        initialPodData={selectedPod || undefined}
        initialMasterPodData={selectedMasterPod || undefined}
        initialMasterLockerData={selectedMasterLocker || undefined}
        initialPodRequestData={selectedPodRequest || undefined}
        initialStockOpnameData={selectedStockOpname || undefined}
        initialAssetData={selectedAsset || undefined}
        onSavePod={handleSavePod}
        onSaveMasterLocker={handleSaveMasterLocker}
        onSaveLogBook={(data) => setLogBookData([data as LogBookRecord, ...logBookData])}
        onSaveStockOpname={(data) => setStockOpnameData([data as StockOpnameRecord, ...stockOpnameData])}
        onSaveLockerRequest={(data) => setLockerRequestData([data as LockerRequestRecord, ...lockerRequestData])}
        onSavePodRequest={(data) => setPodRequestData([data as PodRequestRecord, ...podRequestData])}
        onApprove={handleApproveRequest}
        onReject={handleRejectRequest}
        onApproveOpname={handleApproveOpname}
        onRejectOpname={handleRejectOpname}
      />

      <ImportExcelModal 
        isOpen={isImportExcelModalOpen} 
        onClose={() => setIsImportExcelModalOpen(false)} 
        onImport={(file) => {
            console.log("Importing file:", file.name);
            // Handle bulk import logic for Stock Opname here
        }} 
        title={`IMPORT ${activeModule.toUpperCase()}`} 
      />
    </div>
  );
};

export default App;