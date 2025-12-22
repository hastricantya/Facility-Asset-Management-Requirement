
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
import { LogBookTable } from './components/LogBookTable';
import { VehicleModal } from './components/VehicleModal';
import { BuildingModal } from './components/BuildingModal';
import { GeneralMasterModal } from './components/GeneralMasterModal';
import { AddStockModal } from './components/AddStockModal';
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
  MOCK_LOGBOOK_DATA
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
  MasterItem
} from './types';
import { useLanguage } from './contexts/LanguageContext';

const App: React.FC = () => {
  const { t } = useLanguage();
  const [activeModule, setActiveModule] = useState('Daftar ATK'); 
  const [activeTab, setActiveTab] = useState('Semua');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Data States
  const [vehicleData] = useState<VehicleRecord[]>(MOCK_VEHICLE_DATA);
  const [buildingData] = useState<BuildingRecord[]>(MOCK_BUILDING_DATA);
  const [reminderData] = useState<ReminderRecord[]>(MOCK_REMINDER_DATA);
  const [vehicleContractData] = useState<VehicleContractRecord[]>(MOCK_VEHICLE_CONTRACT_DATA);
  const [serviceData] = useState<ServiceRecord[]>(MOCK_SERVICE_DATA);
  const [taxKirData] = useState<TaxKirRecord[]>(MOCK_TAX_KIR_DATA);
  const [masterVendors] = useState(MOCK_MASTER_VENDOR_DATA);
  const [atkData] = useState<AssetRecord[]>(MOCK_ATK_DATA);
  const [arkData] = useState<AssetRecord[]>(MOCK_ARK_DATA);
  const [atkMaster] = useState<MasterItem[]>(MOCK_ATK_MASTER);
  const [arkMaster] = useState<MasterItem[]>(MOCK_MASTER_ARK_DATA);
  const [logBookData] = useState<LogBookRecord[]>(MOCK_LOGBOOK_DATA);

  // Master Data States
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
  
  const [modalMode, setModalMode] = useState<'create' | 'edit' | 'view'>('create');
  const [selectedVehicle, setSelectedVehicle] = useState<VehicleRecord | null>(null);
  const [selectedBuilding, setSelectedBuilding] = useState<BuildingRecord | null>(null);
  const [selectedMasterItem, setSelectedMasterItem] = useState<GeneralMasterItem | null>(null);
  const [selectedAsset, setSelectedAsset] = useState<AssetRecord | null>(null);

  const toggleSidebar = () => setIsSidebarCollapsed(!isSidebarCollapsed);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const handleModuleNavigate = (module: string) => {
    setActiveModule(module);
    if (module === 'Kontrak Gedung') {
        setActiveTab('Milik Sendiri');
    } else if (module === 'Daftar Aset') {
        setActiveTab('Aktif');
    } else if (module === 'Log Book' || module.includes('Master')) {
        setActiveTab('Semua');
    } else {
        setActiveTab('Semua');
    }
    setIsMobileMenuOpen(false); 
  };

  const handleAddClick = () => {
    setModalMode('create');
    if (activeModule === 'Daftar Aset') {
        setSelectedVehicle(null);
        setIsVehicleModalOpen(true);
    } else if (activeModule === 'Kontrak Gedung') {
        setSelectedBuilding(null);
        setIsBuildingModalOpen(true);
    } else if (activeModule.includes('ATK') || activeModule.includes('ARK') || activeModule === 'Log Book' || activeModule === 'Servis') {
        setSelectedAsset(null);
        setIsStockModalOpen(true);
    } else if (masterLists[activeModule]) {
        setSelectedMasterItem(null);
        setIsMasterModalOpen(true);
    }
  };

  const filteredBuildingData = useMemo(() => {
    if (activeModule === 'Kontrak Gedung') {
        const ownership = activeTab === 'Milik Sendiri' ? 'Own' : 'Rent';
        return buildingData.filter(b => b.ownership === ownership);
    }
    return buildingData;
  }, [activeModule, activeTab, buildingData]);

  const getFilteredAssetData = (data: AssetRecord[]) => {
    if (activeTab === 'Semua') return data;
    return data.filter(item => item.status === activeTab);
  };

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
         case 'Daftar ATK':
         case 'Stationery Request Approval':
            return <StationeryRequestTable data={getFilteredAssetData(atkData)} onView={(item) => { setSelectedAsset(item); setModalMode('view'); setIsStockModalOpen(true); }} />;
         case 'Daftar ARK':
         case 'Household Request Approval':
            return <StationeryRequestTable data={getFilteredAssetData(arkData)} onView={(item) => { setSelectedAsset(item); setModalMode('view'); setIsStockModalOpen(true); }} />;
         case 'Master ATK':
            return <MasterAtkTable data={atkMaster} />;
         case 'Master ARK':
            return <MasterAtkTable data={arkMaster} />;
         case 'Log Book':
            return <LogBookTable data={logBookData} onView={(item) => { setSelectedAsset(null); setModalMode('view'); setIsStockModalOpen(true); }} />;
         default: return <div className="p-8 text-center text-gray-500">Konten Modul {activeModule}</div>;
     }
  };

  const showFilterBar = !['Dashboard', 'Timesheet'].includes(activeModule);
  const mainTabs = useMemo(() => {
    if (activeModule === 'Kontrak Gedung') return ['Milik Sendiri', 'Sewa'];
    if (activeModule === 'Daftar Aset') return ['Aktif', 'Tidak Aktif'];
    if (activeModule.includes('Daftar') || activeModule.includes('Approval')) return ['Semua', 'Approved', 'Pending', 'Rejected', 'Closed', 'Draft'];
    return ['Semua'];
  }, [activeModule]);

  return (
    <div className="flex bg-[#fbfbfb] min-h-screen font-sans relative overflow-x-hidden">
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
        <TopBar breadcrumbs={['Beranda', 'Pemantauan Aset']} onMenuClick={toggleMobileMenu} />
        
        <main className="flex-1 p-8 overflow-y-auto">
          <div className="max-w-[1600px] mx-auto">
            <h1 className="text-[20px] font-bold text-black tracking-tight mb-8">
                {activeModule === 'Kontrak Gedung' ? 'Daftar Gedung' : t(activeModule)}
            </h1>
            
            {showFilterBar && (
                <FilterBar 
                    tabs={mainTabs} 
                    activeTab={activeTab} 
                    onTabChange={setActiveTab} 
                    onAddClick={handleAddClick}
                    moduleName={activeModule}
                    searchPlaceholder={activeModule === 'Kontrak Gedung' ? "Cari berdasarkan Karyawan, Barang..." : undefined}
                    hideAdd={['List Reminder Dokumen', 'Master ATK', 'Master ARK'].includes(activeModule) && modalMode === 'view'}
                />
            )}
            
            {renderContent()}
          </div>
        </main>
      </div>

      <GeneralMasterModal 
        isOpen={isMasterModalOpen}
        onClose={() => setIsMasterModalOpen(false)}
        onSave={(name) => { /* Handle Master Save */ setIsMasterModalOpen(false); }}
        initialData={selectedMasterItem}
        title={activeModule}
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
        vehicleList={vehicleData}
      />
    </div>
  );
};

export default App;
