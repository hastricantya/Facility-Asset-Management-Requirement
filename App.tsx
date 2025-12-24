
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
import { ModenaPodTable } from './components/ModenaPodTable';
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
  MOCK_POD_DATA,
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
  ModenaPodRecord
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

  // Data States
  const [atkData, setAtkData] = useState<AssetRecord[]>(MOCK_ATK_DATA);
  const [arkData, setArkData] = useState<AssetRecord[]>(MOCK_ARK_DATA);
  const [atkMaster, setAtkMaster] = useState<MasterItem[]>(MOCK_ATK_MASTER);
  const [arkMaster, setArkMaster] = useState<MasterItem[]>(MOCK_MASTER_ARK_DATA);
  const [logBookData, setLogBookData] = useState<LogBookRecord[]>(MOCK_LOGBOOK_DATA);
  const [stockOpnameData, setStockOpnameData] = useState<StockOpnameRecord[]>(MOCK_STOCK_OPNAME_DATA);
  const [lockerData, setLockerData] = useState<LockerRecord[]>(MOCK_LOCKER_DATA);
  const [podData, setPodData] = useState<ModenaPodRecord[]>(MOCK_POD_DATA);
  
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
  const [selectedPod, setSelectedPod] = useState<ModenaPodRecord | null>(null);
  const [selectedStockOpname, setSelectedStockOpname] = useState<StockOpnameRecord | null>(null);

  const toggleSidebar = () => setIsSidebarCollapsed(!isSidebarCollapsed);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const handleModuleNavigate = (module: string) => {
    setActiveModule(module);
    if (module === 'MODENA Pod' || module === 'Locker') setActiveTab('Semua');
    else if (module === 'Log Book') setActiveTab('');
    else setActiveTab('Semua');
    setIsMobileMenuOpen(false); 
  };

  const handleAddClick = () => {
    setModalMode('create');
    setSelectedLogBook(null);
    setSelectedAsset(null);
    setSelectedStockOpname(null);
    setSelectedLocker(null);
    setSelectedPod(null);
    setIsStockModalOpen(true);
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

  const filteredPodData = useMemo(() => {
      if (activeTab === 'Lt 2 Pria') return podData.filter(p => p.lantai === 'Lt 2 Pria');
      if (activeTab === 'Lt 2 Perempuan') return podData.filter(p => p.lantai === 'Lt 2 Perempuan');
      if (activeTab === 'Lt 3 Pria') return podData.filter(p => p.lantai === 'Lt 3 Pria');
      if (activeTab === 'Lt 3 Perempuan') return podData.filter(p => p.lantai === 'Lt 3 Perempuan');
      return podData;
  }, [podData, activeTab]);

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
     switch(activeModule) {
         case 'Log Book': return <LogBookTable data={logBookData} onView={(item) => { setSelectedLogBook(item); setModalMode('view'); setIsStockModalOpen(true); }} onEdit={(item) => { setSelectedLogBook(item); setModalMode('edit'); setIsStockModalOpen(true); }} />;
         case 'Locker': return <LockerTable data={filteredLockerData} onView={(item) => { setSelectedLocker(item); setModalMode('view'); setIsStockModalOpen(true); }} onEdit={(item) => { setSelectedLocker(item); setModalMode('edit'); setIsStockModalOpen(true); }} />;
         case 'MODENA Pod': return <ModenaPodTable data={filteredPodData} onView={(item) => { setSelectedPod(item); setModalMode('view'); setIsStockModalOpen(true); }} onEdit={(item) => { setSelectedPod(item); setModalMode('edit'); setIsStockModalOpen(true); }} />;
         case 'Stock Opname': return <StockOpnameTable data={stockOpnameData} onView={(item) => { setSelectedStockOpname(item); setModalMode('view'); setIsStockModalOpen(true); }} />;
         case 'Request ATK':
         case 'Stationery Request Approval':
            return <StationeryRequestTable data={atkData} onView={(item) => { setSelectedAsset(item); setModalMode('view'); setIsStockModalOpen(true); }} />;
         case 'Daftar ARK':
         case 'Household Request Approval':
            return <StationeryRequestTable data={arkData} onView={(item) => { setSelectedAsset(item); setModalMode('view'); setIsStockModalOpen(true); }} />;
         default: return <div className="p-8 text-center text-gray-400 uppercase font-black text-[10px] tracking-widest">{activeModule} module content placeholder</div>;
     }
  };

  const mainTabs = useMemo(() => {
    if (activeModule === 'MODENA Pod') return ['Semua', 'Lt 2 Pria', 'Lt 2 Perempuan', 'Lt 3 Pria', 'Lt 3 Perempuan'];
    if (activeModule === 'Locker') return ['Semua', 'Terisi', 'Kosong', 'Kunci Hilang'];
    if (activeModule.includes('Daftar') || activeModule.includes('Approval') || activeModule.includes('Request')) return ['Semua', 'Draft', 'Pending', 'Approved', 'Rejected'];
    if (activeModule === 'Stock Opname') return ['Semua', 'Matched', 'Discrepancy'];
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
                
                {activeModule === 'MODENA Pod' && (
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
                moduleName={activeModule}
                searchPlaceholder={`Search ${activeModule}...`}
                hideAdd={activeModule === 'Stock Opname'}
            />
            
            {renderContent()}
          </div>
        </main>
      </div>

      <AddStockModal 
        isOpen={isStockModalOpen}
        onClose={() => setIsStockModalOpen(false)}
        moduleName={activeModule}
        mode={modalMode}
        initialLogBookData={selectedLogBook || undefined}
        initialLockerData={selectedLocker || undefined}
        initialPodData={selectedPod || undefined}
        initialStockOpnameData={selectedStockOpname || undefined}
        onSavePod={handleSavePod}
        onSaveLogBook={(data) => setLogBookData([data as LogBookRecord, ...logBookData])}
      />
    </div>
  );
};

export default App;
