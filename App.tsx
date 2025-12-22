
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
import { VehicleModal } from './components/VehicleModal';
import { BuildingModal } from './components/BuildingModal';
import { GeneralMasterModal } from './components/GeneralMasterModal';
import { AddStockModal } from './components/AddStockModal';
import { Users, User, Baby, Activity } from 'lucide-react';
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
  DeliveryLocationRecord
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
  const [logBookData, setLogBookData] = useState<LogBookRecord[]>(MOCK_LOGBOOK_DATA);
  
  // Master Lists (UOM, Category, Loc)
  const [uomList] = useState<GeneralMasterItem[]>(MOCK_UOM_DATA);
  const [atkCategories] = useState<GeneralMasterItem[]>(MOCK_ATK_CATEGORY);
  const [arkCategories] = useState<GeneralMasterItem[]>(MOCK_ARK_CATEGORY);
  const [delivLocations] = useState<DeliveryLocationRecord[]>(MOCK_DELIVERY_LOCATIONS);

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
  
  const [modalMode, setModalMode] = useState<'create' | 'edit' | 'view'>('create');
  const [selectedVehicle, setSelectedVehicle] = useState<VehicleRecord | null>(null);
  const [selectedBuilding, setSelectedBuilding] = useState<BuildingRecord | null>(null);
  const [selectedMasterItem, setSelectedMasterItem] = useState<GeneralMasterItem | null>(null);
  const [selectedAsset, setSelectedAsset] = useState<AssetRecord | null>(null);
  const [selectedLogBook, setSelectedLogBook] = useState<LogBookRecord | null>(null);

  const toggleSidebar = () => setIsSidebarCollapsed(!isSidebarCollapsed);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const handleModuleNavigate = (module: string) => {
    setActiveModule(module);
    if (module === 'Kontrak Gedung') {
        setActiveTab('Milik Sendiri');
    } else if (module === 'Daftar Aset') {
        setActiveTab('Aktif');
    } else if (module.includes('Master')) {
        setActiveTab('Items');
    } else if (module === 'Log Book') {
        setActiveTab(''); // No active tab for logbook
    } else {
        setActiveTab('Semua');
    }
    setIsMobileMenuOpen(false); 
  };

  const handleAddClick = () => {
    setModalMode('create');
    setSelectedLogBook(null);
    setSelectedAsset(null);
    if (activeModule === 'Daftar Aset') {
        setSelectedVehicle(null);
        setIsVehicleModalOpen(true);
    } else if (activeModule === 'Kontrak Gedung') {
        setSelectedBuilding(null);
        setIsBuildingModalOpen(true);
    } else if (activeModule.includes('ATK') || activeModule.includes('ARK') || activeModule === 'Log Book' || activeModule === 'Servis') {
        setIsStockModalOpen(true);
    } else if (masterLists[activeModule]) {
        setSelectedMasterItem(null);
        setIsMasterModalOpen(true);
    }
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

  const filteredBuildingData = useMemo(() => {
    if (activeModule === 'Kontrak Gedung') {
        const ownership = activeTab === 'Milik Sendiri' ? 'Own' : 'Rent';
        return buildingData.filter(b => b.ownership === ownership);
    }
    return buildingData;
  }, [activeModule, activeTab, buildingData]);

  const getFilteredAssetData = (data: AssetRecord[]) => {
    if (activeTab === 'Semua' || activeTab === '') return data;
    return data.filter(item => item.status === activeTab);
  };

  const filteredLogBookData = useMemo(() => {
    return logBookData.filter(item => {
      const matchLocation = !logBookFilters.location || item.lokasiModena === logBookFilters.location;
      const matchCategory = !logBookFilters.category || item.kategoriTamu === logBookFilters.category;
      const matchDate = !logBookFilters.date || item.tanggalKunjungan === logBookFilters.date;
      return matchLocation && matchCategory && matchDate;
    });
  }, [logBookData, logBookFilters]);

  // Log Book stats calculation
  const logBookStats = useMemo(() => {
    return filteredLogBookData.reduce((acc, curr) => ({
      wanita: acc.wanita + curr.wanita,
      lakiLaki: acc.lakiLaki + curr.lakiLaki,
      anakAnak: acc.anakAnak + curr.anakAnak,
      total: acc.total + curr.wanita + curr.lakiLaki + curr.anakAnak
    }), { wanita: 0, lakiLaki: 0, anakAnak: 0, total: 0 });
  }, [filteredLogBookData]);

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
            case 'Items': return <MasterAtkTable data={isArk ? arkMaster : atkMaster} />;
            case 'UOM': return <GeneralMasterTable data={uomList} onEdit={()=>{}} onDelete={()=>{}} />;
            case 'Category': return <GeneralMasterTable data={isArk ? arkCategories : atkCategories} onEdit={()=>{}} onDelete={()=>{}} />;
            case 'Delivery Location': return <MasterDeliveryLocationTable data={delivLocations} onEdit={()=>{}} onDelete={()=>{}} />;
            default: return <MasterAtkTable data={isArk ? arkMaster : atkMaster} />;
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
         case 'Daftar ATK':
         case 'Stationery Request Approval':
            return <StationeryRequestTable data={getFilteredAssetData(atkData)} onView={(item) => { setSelectedAsset(item); setModalMode('view'); setIsStockModalOpen(true); }} />;
         case 'Daftar ARK':
         case 'Household Request Approval':
            return <StationeryRequestTable data={getFilteredAssetData(arkData)} onView={(item) => { setSelectedAsset(item); setModalMode('view'); setIsStockModalOpen(true); }} />;
         case 'Log Book':
            return <LogBookTable 
                data={filteredLogBookData} 
                onView={(item) => { setSelectedLogBook(item); setModalMode('view'); setIsStockModalOpen(true); }} 
                onEdit={(item) => { setSelectedLogBook(item); setModalMode('edit'); setIsStockModalOpen(true); }}
            />;
         default: return <div className="p-8 text-center text-gray-500">Konten Modul {activeModule}</div>;
     }
  };

  const showFilterBar = !['Dashboard', 'Timesheet'].includes(activeModule);
  const mainTabs = useMemo(() => {
    if (activeModule === 'Kontrak Gedung') return ['Milik Sendiri', 'Sewa'];
    if (activeModule === 'Daftar Aset') return ['Aktif', 'Tidak Aktif'];
    if (activeModule === 'Master ATK' || activeModule === 'Master ARK') return ['Items', 'UOM', 'Category', 'Delivery Location'];
    if (activeModule.includes('Daftar') || activeModule.includes('Approval')) return ['Semua', 'Draft', 'On Progress', 'Pending', 'Approved', 'Rejected', 'Closed'];
    if (activeModule === 'Log Book') return []; 
    return ['Semua'];
  }, [activeModule]);

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
        <TopBar breadcrumbs={['Beranda', activeModule]} onMenuClick={toggleMobileMenu} />
        
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
            </div>
            
            {showFilterBar && (
                <FilterBar 
                    tabs={mainTabs} 
                    activeTab={activeTab} 
                    onTabChange={setActiveTab} 
                    onAddClick={handleAddClick}
                    moduleName={activeModule}
                    searchPlaceholder={activeModule === 'Log Book' ? "Cari berdasarkan Nama Tamu..." : activeModule === 'Kontrak Gedung' ? "Cari berdasarkan Karyawan, Barang..." : undefined}
                    hideAdd={['List Reminder Dokumen'].includes(activeModule)}
                    logBookFilters={activeModule === 'Log Book' ? logBookFilters : undefined}
                    onLogBookFilterChange={handleLogBookFilterChange}
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
        initialLogBookData={selectedLogBook || undefined}
        onSaveLogBook={handleSaveLogBook}
        vehicleList={vehicleData}
      />
    </div>
  );
};

export default App;
