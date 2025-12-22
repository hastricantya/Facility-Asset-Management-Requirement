
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
import { RoleMasterTable } from './components/RoleMasterTable';
import { StationeryRequestTable } from './components/StationeryRequestTable';
import { MasterAtkTable } from './components/MasterAtkTable';
import { MasterDeliveryLocationTable } from './components/MasterDeliveryLocationTable';
import { LogBookTable } from './components/LogBookTable';
import { OfficeEquipmentTable } from './components/OfficeEquipmentTable';
import { VehicleModal } from './components/VehicleModal';
import { BuildingModal } from './components/BuildingModal';
import { GeneralMasterModal } from './components/GeneralMasterModal';
import { AddStockModal } from './components/AddStockModal';
import { Users, User, Baby, Activity, Monitor } from 'lucide-react';
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
  MOCK_UOM_DATA,
  MOCK_ATK_CATEGORY,
  MOCK_ARK_CATEGORY,
  MOCK_DELIVERY_LOCATIONS,
  MOCK_ROLES
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
  RoleMasterItem
} from './types';
import { useLanguage } from './contexts/LanguageContext';

const App: React.FC = () => {
  const { t } = useLanguage();
  const [activeModule, setActiveModule] = useState('Servis'); 
  const [activeTab, setActiveTab] = useState('Semua');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const [logBookFilters, setLogBookFilters] = useState({ location: '', category: '', date: '' });
  const handleLogBookFilterChange = (field: string, value: string) => setLogBookFilters(prev => ({ ...prev, [field]: value }));

  const [vehicleData] = useState<VehicleRecord[]>(MOCK_VEHICLE_DATA);
  const [buildingData] = useState<BuildingRecord[]>(MOCK_BUILDING_DATA);
  const [reminderData] = useState<ReminderRecord[]>(MOCK_REMINDER_DATA);
  const [vehicleContractData] = useState<VehicleContractRecord[]>(MOCK_VEHICLE_CONTRACT_DATA);
  const [serviceData, setServiceData] = useState<ServiceRecord[]>(MOCK_SERVICE_DATA);
  const [taxKirData] = useState<TaxKirRecord[]>(MOCK_TAX_KIR_DATA);
  const [logBookData, setLogBookData] = useState<LogBookRecord[]>(MOCK_LOGBOOK_DATA);
  
  const [masterLists, setMasterLists] = useState<Record<string, any>>({
    'Jenis Pajak': MOCK_GENERAL_MASTER_DATA.jenisPajak,
    'Jenis Pembayaran': MOCK_GENERAL_MASTER_DATA.jenisPembayaran,
    'Jenis Servis': MOCK_GENERAL_MASTER_DATA.jenisServis,
    'Status Mutasi': MOCK_GENERAL_MASTER_DATA.statusMutasi,
    'Status Penjualan': MOCK_GENERAL_MASTER_DATA.statusPenjualan,
    'Status Request': MOCK_GENERAL_MASTER_DATA.statusRequest,
    'Tipe Mutasi': MOCK_GENERAL_MASTER_DATA.tipeMutasi,
    'Tipe Vendor': MOCK_GENERAL_MASTER_DATA.tipeVendor,
    'Peran': MOCK_ROLES,
  });
  
  const [isVehicleModalOpen, setIsVehicleModalOpen] = useState(false);
  const [isBuildingModalOpen, setIsBuildingModalOpen] = useState(false);
  const [isMasterModalOpen, setIsMasterModalOpen] = useState(false);
  const [isStockModalOpen, setIsStockModalOpen] = useState(false);
  
  const [modalMode, setModalMode] = useState<'create' | 'edit' | 'view'>('create');
  const [selectedVehicle, setSelectedVehicle] = useState<VehicleRecord | null>(null);
  const [selectedBuilding, setSelectedBuilding] = useState<BuildingRecord | null>(null);
  const [selectedMasterItem, setSelectedMasterItem] = useState<any | null>(null);
  const [selectedLogBook, setSelectedLogBook] = useState<LogBookRecord | null>(null);
  const [selectedService, setSelectedService] = useState<ServiceRecord | null>(null);

  const toggleSidebar = () => setIsSidebarCollapsed(!isSidebarCollapsed);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const handleModuleNavigate = (module: string) => {
    setActiveModule(module);
    setActiveTab(module === 'Kontrak Gedung' ? 'Milik Sendiri' : 'Semua');
    setIsMobileMenuOpen(false); 
  };

  const handleAddClick = () => {
    setModalMode('create');
    if (activeModule === 'Daftar Aset') { setSelectedVehicle(null); setIsVehicleModalOpen(true); }
    else if (activeModule === 'Kontrak Gedung') { setSelectedBuilding(null); setIsBuildingModalOpen(true); }
    else if (activeModule === 'Servis' || activeModule === 'Log Book' || activeModule === 'Office Equipment') { setIsStockModalOpen(true); }
    else if (masterLists[activeModule]) { setSelectedMasterItem(null); setIsMasterModalOpen(true); }
  };

  const handleSaveService = (data: Partial<ServiceRecord>) => {
    if (modalMode === 'create') {
        const newRecord: ServiceRecord = {
            ...data,
            id: `SRV/${new Date().getFullYear()}/${(serviceData.length + 1).toString().padStart(3, '0')}`,
            status: 'Proses',
            statusApproval: '0'
        } as ServiceRecord;
        setServiceData([newRecord, ...serviceData]);
    } else {
        setServiceData(serviceData.map(item => item.id === data.id ? { ...item, ...data } : item));
    }
    setIsStockModalOpen(false);
  };

  const handleSaveMaster = (data: { name: string, description?: string }) => {
    const list = masterLists[activeModule];
    if (modalMode === 'create') {
        const newItem = {
            id: list.length > 0 ? Math.max(...list.map((i: any) => i.id)) + 1 : 1,
            name: data.name,
            ...(data.description !== undefined && { description: data.description })
        };
        setMasterLists(prev => ({ ...prev, [activeModule]: [...prev[activeModule], newItem] }));
    } else if (selectedMasterItem) {
        setMasterLists(prev => ({
            ...prev,
            [activeModule]: prev[activeModule].map((item: any) => 
                item.id === selectedMasterItem.id 
                ? { ...item, name: data.name, ...(data.description !== undefined && { description: data.description }) } 
                : item
            )
        }));
    }
    setIsMasterModalOpen(false);
  };

  const handleDeleteMaster = (id: number) => {
    if (confirm('Apakah Anda yakin ingin menghapus data ini?')) {
        setMasterLists(prev => ({
            ...prev,
            [activeModule]: prev[activeModule].filter((item: any) => item.id !== id)
        }));
    }
  };

  const filteredBuildingData = useMemo(() => {
    if (activeModule === 'Kontrak Gedung') {
        const ownership = activeTab === 'Milik Sendiri' ? 'Own' : 'Rent';
        return buildingData.filter(b => b.ownership === ownership);
    }
    return buildingData;
  }, [activeModule, activeTab, buildingData]);

  const renderContent = () => {
     if (activeModule === 'Peran') {
        return <RoleMasterTable 
            data={masterLists['Peran']} 
            onEdit={(item) => { setSelectedMasterItem(item); setModalMode('edit'); setIsMasterModalOpen(true); }} 
            onDelete={handleDeleteMaster} 
        />;
     }
     
     if (masterLists[activeModule]) {
         return <GeneralMasterTable 
            data={masterLists[activeModule]} 
            onEdit={(item) => { setSelectedMasterItem(item); setModalMode('edit'); setIsMasterModalOpen(true); }} 
            onDelete={handleDeleteMaster} 
         />;
     }
     switch(activeModule) {
         case 'Daftar Aset': return <VehicleTable data={vehicleData.filter(v => v.status === activeTab)} onEdit={(v) => { setSelectedVehicle(v); setModalMode('edit'); setIsVehicleModalOpen(true); }} onView={(v) => { setSelectedVehicle(v); setModalMode('view'); setIsVehicleModalOpen(true); }} />;
         case 'Kontrak Gedung': return <BuildingTable data={filteredBuildingData} onEdit={(b) => { setSelectedBuilding(b); setModalMode('edit'); setIsBuildingModalOpen(true); }} onView={(b) => { setSelectedBuilding(b); setModalMode('view'); setIsBuildingModalOpen(true); }} />;
         case 'Servis': return <ServiceLogTable data={serviceData} onEdit={(s) => { setSelectedService(s); setModalMode('edit'); setIsStockModalOpen(true); }} onView={(s) => { setSelectedService(s); setModalMode('view'); setIsStockModalOpen(true); }} />;
         case 'List Reminder Dokumen': return <ReminderTable data={reminderData} />;
         case 'Office Equipment': return <OfficeEquipmentTable />;
         case 'Log Book': return <LogBookTable data={logBookData} onView={(item) => { setSelectedLogBook(item); setModalMode('view'); setIsStockModalOpen(true); }} onEdit={(item) => { setSelectedLogBook(item); setModalMode('edit'); setIsStockModalOpen(true); }} />;
         default: return <div className="p-8 text-center text-gray-400">Modul {activeModule}</div>;
     }
  };

  const showFilterBar = !['Dashboard', 'Timesheet'].includes(activeModule);
  const mainTabs = useMemo(() => {
    if (activeModule === 'Kontrak Gedung') return ['Milik Sendiri', 'Sewa'];
    if (activeModule === 'Daftar Aset') return ['Aktif', 'Tidak Aktif'];
    if (activeModule === 'Servis') return ['Semua', 'Proses', 'Selesai'];
    return ['Semua'];
  }, [activeModule]);

  return (
    <div className="flex bg-[#fbfbfb] min-h-screen font-sans relative overflow-x-hidden text-black">
      <Sidebar activeItem={activeModule} onNavigate={handleModuleNavigate} isCollapsed={isSidebarCollapsed} onToggle={toggleSidebar} isMobileOpen={isMobileMenuOpen} onCloseMobile={toggleMobileMenu} />
      <div className={`flex-1 flex flex-col transition-all duration-300 w-full ${isSidebarCollapsed ? 'lg:ml-20' : 'lg:ml-64'}`}>
        <TopBar breadcrumbs={['Beranda', activeModule]} onMenuClick={toggleMobileMenu} />
        <main className="flex-1 p-8 overflow-y-auto">
          <div className="max-w-[1600px] mx-auto">
            <h1 className="text-[20px] font-bold text-black tracking-tight mb-8">{t(activeModule)}</h1>
            {showFilterBar && (
                <FilterBar tabs={mainTabs} activeTab={activeTab} onTabChange={setActiveTab} onAddClick={handleAddClick} moduleName={activeModule} logBookFilters={activeModule === 'Log Book' ? logBookFilters : undefined} onLogBookFilterChange={handleLogBookFilterChange} />
            )}
            {renderContent()}
          </div>
        </main>
      </div>

      <AddStockModal isOpen={isStockModalOpen} onClose={() => setIsStockModalOpen(false)} moduleName={activeModule} mode={modalMode} initialServiceData={selectedService || undefined} onSaveService={handleSaveService} vehicleList={vehicleData} />
      <BuildingModal isOpen={isBuildingModalOpen} onClose={() => setIsBuildingModalOpen(false)} onSave={() => setIsBuildingModalOpen(false)} initialData={selectedBuilding || undefined} mode={modalMode} />
      <VehicleModal isOpen={isVehicleModalOpen} onClose={() => setIsVehicleModalOpen(false)} onSave={() => setIsVehicleModalOpen(false)} initialData={selectedVehicle || undefined} mode={modalMode} />
      <GeneralMasterModal 
        isOpen={isMasterModalOpen} 
        onClose={() => setIsMasterModalOpen(false)} 
        onSave={handleSaveMaster} 
        initialData={selectedMasterItem} 
        title={activeModule} 
      />
    </div>
  );
};

export default App;
