
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
import { MasterVendorModal } from './components/MasterVendorModal';
import { AddStockModal } from './components/AddStockModal';
import { TaxKirModal } from './components/TaxKirModal';
import { VehicleContractModal } from './components/VehicleContractModal';
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
  MasterItem,
  MasterVendorRecord
} from './types';
import { useLanguage } from './contexts/LanguageContext';

const App: React.FC = () => {
  const { t } = useLanguage();
  const [activeModule, setActiveModule] = useState('Servis'); 
  const [activeTab, setActiveTab] = useState('Semua');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Data States with Setters
  const [vehicleData, setVehicleData] = useState<VehicleRecord[]>(MOCK_VEHICLE_DATA);
  const [buildingData, setBuildingData] = useState<BuildingRecord[]>(MOCK_BUILDING_DATA);
  const [reminderData] = useState<ReminderRecord[]>(MOCK_REMINDER_DATA);
  const [vehicleContractData, setVehicleContractData] = useState<VehicleContractRecord[]>(MOCK_VEHICLE_CONTRACT_DATA);
  const [serviceData, setServiceData] = useState<ServiceRecord[]>(MOCK_SERVICE_DATA);
  const [taxKirData, setTaxKirData] = useState<TaxKirRecord[]>(MOCK_TAX_KIR_DATA); 
  const [vendorData, setVendorData] = useState<MasterVendorRecord[]>(MOCK_MASTER_VENDOR_DATA);
  const [atkData] = useState<AssetRecord[]>(MOCK_ATK_DATA);
  const [arkData] = useState<AssetRecord[]>(MOCK_ARK_DATA);
  const [atkMaster] = useState<MasterItem[]>(MOCK_ATK_MASTER);
  const [arkMaster] = useState<MasterItem[]>(MOCK_MASTER_ARK_DATA);
  const [logBookData] = useState<LogBookRecord[]>(MOCK_LOGBOOK_DATA);

  // Master Data Lists
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
  const [isVendorModalOpen, setIsVendorModalOpen] = useState(false);
  const [isStockModalOpen, setIsStockModalOpen] = useState(false);
  const [isTaxKirModalOpen, setIsTaxKirModalOpen] = useState(false);
  const [isVehicleContractModalOpen, setIsVehicleContractModalOpen] = useState(false);
  
  const [modalMode, setModalMode] = useState<'create' | 'edit' | 'view'>('create');
  const [selectedVehicle, setSelectedVehicle] = useState<VehicleRecord | null>(null);
  const [selectedBuilding, setSelectedBuilding] = useState<BuildingRecord | null>(null);
  const [selectedMasterItem, setSelectedMasterItem] = useState<GeneralMasterItem | null>(null);
  const [selectedVendor, setSelectedVendor] = useState<MasterVendorRecord | null>(null);
  const [selectedAsset, setSelectedAsset] = useState<AssetRecord | null>(null);
  const [selectedService, setSelectedService] = useState<ServiceRecord | null>(null);
  const [selectedTaxKir, setSelectedTaxKir] = useState<TaxKirRecord | null>(null);
  const [selectedVehicleContract, setSelectedVehicleContract] = useState<VehicleContractRecord | null>(null);

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
    setSelectedVehicle(null);
    setSelectedBuilding(null);
    setSelectedMasterItem(null);
    setSelectedVendor(null);
    setSelectedAsset(null);
    setSelectedService(null);
    setSelectedTaxKir(null);
    setSelectedVehicleContract(null);

    if (activeModule === 'Pajak & KIR') {
        setIsTaxKirModalOpen(true);
    } else if (activeModule === 'Daftar Aset') {
        setIsVehicleModalOpen(true);
    } else if (activeModule === 'Kontrak Gedung') {
        setIsBuildingModalOpen(true);
    } else if (activeModule === 'Master Vendor') {
        setIsVendorModalOpen(true);
    } else if (activeModule === 'Servis') {
        setIsStockModalOpen(true);
    } else if (activeModule === 'Kontrak Kendaraan') {
        setIsVehicleContractModalOpen(true);
    } else if (activeModule.includes('ATK') || activeModule.includes('ARK') || activeModule === 'Log Book') {
        setIsStockModalOpen(true);
    } else if (masterLists[activeModule]) {
        setIsMasterModalOpen(true);
    }
  };

  const handleSaveBuilding = (data: Partial<BuildingRecord>) => {
    if (modalMode === 'create') {
        const newId = (buildingData.length + 1).toString();
        const newRecord: BuildingRecord = {
            ...data,
            id: newId,
            assetNo: data.assetNo || `BDG-NEW-${newId.padStart(3, '0')}`,
            status: 'Open'
        } as BuildingRecord;
        setBuildingData([newRecord, ...buildingData]);
    } else if (modalMode === 'edit' && selectedBuilding) {
        setBuildingData(prev => prev.map(b => b.id === selectedBuilding.id ? { ...b, ...data } : b));
    }
    setIsBuildingModalOpen(false);
  };

  const handleSaveVehicle = (data: Partial<VehicleRecord>) => {
    if (modalMode === 'create') {
        const newId = vehicleData.length + 1;
        const newRecord: VehicleRecord = {
            ...data,
            id: newId,
            noRegistrasi: data.noRegistrasi || `REG/2024/${newId.toString().padStart(3, '0')}`
        } as VehicleRecord;
        setVehicleData([newRecord, ...vehicleData]);
    } else if (modalMode === 'edit' && selectedVehicle) {
        setVehicleData(prev => prev.map(v => v.id === selectedVehicle.id ? { ...v, ...data } : v));
    }
    setIsVehicleModalOpen(false);
  };

  const handleSaveService = (data: Partial<ServiceRecord>) => {
    if (modalMode === 'create') {
        const newId = `S${new Date().getFullYear()}${String(new Date().getMonth() + 1).padStart(2, '0')}${String(serviceData.length + 1).padStart(4, '0')}`;
        const total = (data.spareParts || []).reduce((acc, curr) => {
            const price = typeof curr.price === 'string' ? parseInt(curr.price.replace(/[^0-9]/g, '')) || 0 : curr.price;
            return acc + (price * curr.qty);
        }, 0);

        const newService: ServiceRecord = {
            ...data,
            id: newId,
            tglRequest: new Date().toLocaleString(),
            status: 'Proses',
            estimasiBiaya: total.toString()
        } as ServiceRecord;
        setServiceData([newService, ...serviceData]);
    } else if (modalMode === 'edit' && selectedService) {
        setServiceData(prev => prev.map(s => s.id === selectedService.id ? { ...s, ...data } : s));
    }
    setIsStockModalOpen(false);
  };

  const handleSaveVehicleContract = (data: Partial<VehicleContractRecord>) => {
    if (modalMode === 'create') {
        const newId = `CON/VEH/${vehicleContractData.length + 101}`;
        const newRecord: VehicleContractRecord = {
            ...data,
            id: newId,
            status: data.status || 'Aktif'
        } as VehicleContractRecord;
        setVehicleContractData([newRecord, ...vehicleContractData]);
    } else if (modalMode === 'edit' && selectedVehicleContract) {
        setVehicleContractData(prev => prev.map(c => c.id === selectedVehicleContract.id ? { ...c, ...data } : c));
    }
    setIsVehicleContractModalOpen(false);
    setSelectedVehicleContract(null);
  };

  const handleSaveMaster = (name: string) => {
    if (modalMode === 'create') {
        const newList = masterLists[activeModule] || [];
        const newItem: GeneralMasterItem = { id: Date.now(), name };
        setMasterLists(prev => ({ ...prev, [activeModule]: [newItem, ...newList] }));
    } else if (modalMode === 'edit' && selectedMasterItem) {
        setMasterLists(prev => ({
            ...prev,
            [activeModule]: prev[activeModule].map(i => i.id === selectedMasterItem.id ? { ...i, name } : i)
        }));
    }
    setIsMasterModalOpen(false);
  };

  const renderContent = () => {
     if (masterLists[activeModule]) {
         return <GeneralMasterTable data={masterLists[activeModule]} onEdit={(item) => { setSelectedMasterItem(item); setModalMode('edit'); setIsMasterModalOpen(true); }} onDelete={(id) => setMasterLists(prev => ({ ...prev, [activeModule]: prev[activeModule].filter(i => i.id !== id)}))} />;
     }

     switch(activeModule) {
         case 'Daftar Aset': return (
            <VehicleTable 
                data={vehicleData.filter(v => v.status === activeTab)} 
                onEdit={(v) => { setSelectedVehicle(v); setModalMode('edit'); setIsVehicleModalOpen(true); }} 
                onView={(v) => { setSelectedVehicle(v); setModalMode('view'); setIsVehicleModalOpen(true); }}
            />
         );
         case 'Pajak & KIR': return (
            <TaxKirTable 
                data={taxKirData} 
                onEdit={(item) => { setSelectedTaxKir(item); setModalMode('edit'); setIsTaxKirModalOpen(true); }}
                onView={(item) => { setSelectedTaxKir(item); setModalMode('view'); setIsTaxKirModalOpen(true); }}
            />
         );
         case 'Kontrak Gedung': return (
            <BuildingTable 
                data={buildingData.filter(b => b.ownership === (activeTab === 'Milik Sendiri' ? 'Own' : 'Rent'))}
                onEdit={(b) => { setSelectedBuilding(b); setModalMode('edit'); setIsBuildingModalOpen(true); }}
                onView={(b) => { setSelectedBuilding(b); setModalMode('view'); setIsBuildingModalOpen(true); }}
            />
         );
         case 'List Reminder Dokumen': return <ReminderTable data={reminderData} />;
         case 'Kontrak Kendaraan': return (
            <VehicleContractTable 
                data={vehicleContractData} 
                onEdit={(c) => { setSelectedVehicleContract(c); setModalMode('edit'); setIsVehicleContractModalOpen(true); }}
                onView={(c) => { setSelectedVehicleContract(c); setModalMode('view'); setIsVehicleContractModalOpen(true); }}
                onDelete={(id) => setVehicleContractData(prev => prev.filter(c => c.id !== id))}
            />
         );
         case 'Servis': return (
            <ServiceLogTable 
                data={activeTab === 'Semua' ? serviceData : []} 
                onEdit={(s) => { setSelectedService(s); setModalMode('edit'); setIsStockModalOpen(true); }}
                onView={(s) => { setSelectedService(s); setModalMode('view'); setIsStockModalOpen(true); }}
            />
         );
         case 'Master Vendor': return (
            <MasterVendorTable 
                data={vendorData} 
                onEdit={(v) => { setSelectedVendor(v); setModalMode('edit'); setIsVendorModalOpen(true); }}
                onView={(v) => { setSelectedVendor(v); setModalMode('view'); setIsVendorModalOpen(true); }}
                onDelete={(id) => setVendorData(prev => prev.filter(v => v.id !== id))}
            />
         );
         case 'Daftar ATK':
         case 'Stationery Request Approval':
            return <StationeryRequestTable data={atkData.filter(i => activeTab === 'Semua' || i.status === activeTab)} onView={(item) => { setSelectedAsset(item); setModalMode('view'); setIsStockModalOpen(true); }} />;
         case 'Master ATK':
            return <MasterAtkTable data={atkMaster} />;
         case 'Log Book':
            return <LogBookTable data={logBookData} onView={() => setModalMode('view')} />;
         default: return <div className="p-8 text-center text-gray-500">Konten Modul {activeModule}</div>;
     }
  };

  const showFilterBar = !['Dashboard', 'Timesheet'].includes(activeModule);
  const mainTabs = useMemo(() => {
    if (activeModule === 'Pajak & KIR' || activeModule === 'Servis') return ['Semua', 'Persetujuan'];
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
        <TopBar breadcrumbs={[t('Beranda'), t('Pemantauan Aset')]} onMenuClick={toggleMobileMenu} />
        
        <main className="flex-1 p-8 overflow-y-auto">
          <div className="max-w-[1600px] mx-auto">
            <h1 className="text-[20px] font-bold text-black tracking-tight mb-8 uppercase">
                {activeModule === 'Pajak & KIR' ? `${t('Pajak & KIR')} Kendaraan` : activeModule === 'Servis' ? `${t('Servis')} Kendaraan` : t(activeModule)}
            </h1>
            
            {showFilterBar && (
                <FilterBar 
                    tabs={mainTabs} 
                    activeTab={activeTab} 
                    onTabChange={setActiveTab} 
                    onAddClick={handleAddClick}
                    moduleName={activeModule}
                />
            )}
            
            {renderContent()}
          </div>
        </main>
      </div>

      <TaxKirModal 
        isOpen={isTaxKirModalOpen}
        onClose={() => setIsTaxKirModalOpen(false)}
        onSave={(data) => {
            const newItem = { ...data, id: `REQ/2024/00${taxKirData.length + 1}` } as TaxKirRecord;
            setTaxKirData([newItem, ...taxKirData]);
            setIsTaxKirModalOpen(false);
        }}
        initialData={selectedTaxKir || undefined}
        mode={modalMode}
        vehicleList={vehicleData}
      />

      <VehicleModal 
        isOpen={isVehicleModalOpen}
        onClose={() => setIsVehicleModalOpen(false)}
        onSave={handleSaveVehicle}
        initialData={selectedVehicle || undefined}
        mode={modalMode}
      />

      <BuildingModal 
        isOpen={isBuildingModalOpen}
        onClose={() => setIsBuildingModalOpen(false)}
        onSave={handleSaveBuilding}
        initialData={selectedBuilding || undefined}
        mode={modalMode}
      />

      <AddStockModal 
        isOpen={isStockModalOpen}
        onClose={() => setIsStockModalOpen(false)}
        moduleName={activeModule}
        mode={modalMode}
        initialAssetData={selectedAsset || undefined}
        initialServiceData={selectedService || undefined}
        onSaveService={handleSaveService}
        vehicleList={vehicleData}
      />

      <VehicleContractModal
        isOpen={isVehicleContractModalOpen}
        onClose={() => {
            setIsVehicleContractModalOpen(false);
            setSelectedVehicleContract(null);
        }}
        onSave={handleSaveVehicleContract}
        initialData={selectedVehicleContract || undefined}
        mode={modalMode}
        vehicleList={vehicleData}
      />

      <GeneralMasterModal 
        isOpen={isMasterModalOpen}
        onClose={() => setIsMasterModalOpen(false)}
        onSave={handleSaveMaster}
        initialData={selectedMasterItem}
        title={activeModule}
      />

      <MasterVendorModal 
        isOpen={isVendorModalOpen}
        onClose={() => setIsVendorModalOpen(false)}
        onSave={(data) => {
            if (modalMode === 'create') {
                setVendorData([{ ...data, id: Date.now() } as MasterVendorRecord, ...vendorData]);
            } else {
                setVendorData(prev => prev.map(v => v.id === selectedVendor?.id ? { ...v, ...data } : v));
            }
            setIsVendorModalOpen(false);
        }}
        initialData={selectedVendor}
        mode={modalMode}
      />
    </div>
  );
};

export default App;
