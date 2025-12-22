
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
import { VehicleModal } from './components/VehicleModal';
import { BuildingModal } from './components/BuildingModal';
import { GeneralMasterModal } from './components/GeneralMasterModal';
import { MOCK_VEHICLE_DATA, MOCK_SERVICE_DATA, MOCK_TAX_KIR_DATA, MOCK_MASTER_VENDOR_DATA, MOCK_VEHICLE_CONTRACT_DATA, MOCK_BUILDING_DATA, MOCK_REMINDER_DATA, MOCK_MASTER_DATA } from './constants';
import { VehicleRecord, ServiceRecord, TaxKirRecord, VehicleContractRecord, BuildingRecord, ReminderRecord, GeneralMasterItem } from './types';
import { useLanguage } from './contexts/LanguageContext';

const App: React.FC = () => {
  const { t } = useLanguage();
  const [activeModule, setActiveModule] = useState('Kontrak Gedung'); 
  const [activeTab, setActiveTab] = useState('Milik Sendiri');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Data States
  const [vehicleData] = useState<VehicleRecord[]>(MOCK_VEHICLE_DATA);
  const [buildingData, setBuildingData] = useState<BuildingRecord[]>(MOCK_BUILDING_DATA);
  const [reminderData] = useState<ReminderRecord[]>(MOCK_REMINDER_DATA);
  const [vehicleContractData] = useState<VehicleContractRecord[]>(MOCK_VEHICLE_CONTRACT_DATA);
  const [serviceData] = useState<ServiceRecord[]>(MOCK_SERVICE_DATA);
  const [taxKirData] = useState<TaxKirRecord[]>(MOCK_TAX_KIR_DATA);
  const [masterVendors] = useState(MOCK_MASTER_VENDOR_DATA);

  // Master Data States (Map module names to their respective list states)
  const [masterLists, setMasterLists] = useState<Record<string, GeneralMasterItem[]>>({
    'Jenis Pajak': MOCK_MASTER_DATA.jenisPajak,
    'Jenis Pembayaran': MOCK_MASTER_DATA.jenisPembayaran,
    'Jenis Servis': MOCK_MASTER_DATA.jenisServis,
    'Status Mutasi': MOCK_MASTER_DATA.statusMutasi,
    'Status Penjualan': MOCK_MASTER_DATA.statusPenjualan,
    'Status Request': MOCK_MASTER_DATA.statusRequest,
    'Tipe Mutasi': MOCK_MASTER_DATA.tipeMutasi,
    'Tipe Vendor': MOCK_MASTER_DATA.tipeVendor,
    'Peran': MOCK_MASTER_DATA.peran,
  });
  
  // Selection & Modal States
  const [isVehicleModalOpen, setIsVehicleModalOpen] = useState(false);
  const [isBuildingModalOpen, setIsBuildingModalOpen] = useState(false);
  const [isMasterModalOpen, setIsMasterModalOpen] = useState(false);
  
  const [modalMode, setModalMode] = useState<'create' | 'edit' | 'view'>('create');
  const [selectedVehicle, setSelectedVehicle] = useState<VehicleRecord | null>(null);
  const [selectedBuilding, setSelectedBuilding] = useState<BuildingRecord | null>(null);
  const [selectedMasterItem, setSelectedMasterItem] = useState<GeneralMasterItem | null>(null);

  const toggleSidebar = () => setIsSidebarCollapsed(!isSidebarCollapsed);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const handleModuleNavigate = (module: string) => {
    setActiveModule(module);
    if (module === 'Kontrak Gedung') {
        setActiveTab('Milik Sendiri');
    } else if (module === 'Daftar Aset') {
        setActiveTab('Aktif');
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
    } else if (masterLists[activeModule]) {
        setSelectedMasterItem(null);
        setIsMasterModalOpen(true);
    }
  };

  const handleEditMaster = (item: GeneralMasterItem) => {
      setSelectedMasterItem(item);
      setModalMode('edit');
      setIsMasterModalOpen(true);
  };

  const handleDeleteMaster = (id: number) => {
      if (confirm('Apakah Anda yakin ingin menghapus data ini?')) {
          setMasterLists(prev => ({
              ...prev,
              [activeModule]: prev[activeModule].filter(item => item.id !== id)
          }));
      }
  };

  const handleSaveMaster = (name: string) => {
      if (modalMode === 'create') {
          const newList = [...masterLists[activeModule]];
          const newId = newList.length > 0 ? Math.max(...newList.map(i => i.id)) + 1 : 1;
          const newItem: GeneralMasterItem = { id: newId, name };
          setMasterLists(prev => ({
              ...prev,
              [activeModule]: [newItem, ...prev[activeModule]]
          }));
      } else if (modalMode === 'edit' && selectedMasterItem) {
          setMasterLists(prev => ({
              ...prev,
              [activeModule]: prev[activeModule].map(item => 
                  item.id === selectedMasterItem.id ? { ...item, name } : item
              )
          }));
      }
      setIsMasterModalOpen(false);
  };

  const filteredBuildingData = useMemo(() => {
    if (activeModule === 'Kontrak Gedung') {
        const ownership = activeTab === 'Milik Sendiri' ? 'Own' : 'Rent';
        return buildingData.filter(b => b.ownership === ownership);
    }
    return buildingData;
  }, [activeModule, activeTab, buildingData]);

  const renderContent = () => {
     if (masterLists[activeModule]) {
         return (
            <GeneralMasterTable 
                data={masterLists[activeModule]} 
                onEdit={handleEditMaster}
                onDelete={handleDeleteMaster}
            />
         );
     }

     switch(activeModule) {
         case 'Daftar Aset': return (
            <VehicleTable 
                data={vehicleData.filter(v => v.status === activeTab)} 
                onEdit={(v) => { setSelectedVehicle(v); setModalMode('edit'); setIsVehicleModalOpen(true); }} 
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
         default: return <div className="p-8 text-center text-gray-500">Konten Modul {activeModule}</div>;
     }
  };

  const showFilterBar = !['Dashboard', 'Timesheet'].includes(activeModule);

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
                    tabs={activeModule === 'Kontrak Gedung' ? ['Milik Sendiri', 'Sewa'] : activeModule === 'Daftar Aset' ? ['Aktif', 'Tidak Aktif'] : ['Semua']} 
                    activeTab={activeTab} 
                    onTabChange={setActiveTab} 
                    onAddClick={handleAddClick}
                    moduleName={activeModule === 'Kontrak Gedung' ? 'Gedung' : activeModule}
                    searchPlaceholder={activeModule === 'Kontrak Gedung' ? "Cari berdasarkan Karyawan, Barang..." : undefined}
                    hideAdd={['List Reminder Dokumen'].includes(activeModule)}
                />
            )}
            
            {renderContent()}
          </div>
        </main>
      </div>

      <GeneralMasterModal 
        isOpen={isMasterModalOpen}
        onClose={() => setIsMasterModalOpen(false)}
        onSave={handleSaveMaster}
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
    </div>
  );
};

export default App;
