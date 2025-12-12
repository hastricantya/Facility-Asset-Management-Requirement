import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { TopBar } from './components/TopBar';
import { FilterBar } from './components/FilterBar';
import { AssetTable } from './components/AssetTable';
import { MasterAtkTable } from './components/MasterAtkTable';
import { ContractTable } from './components/ContractTable';
import { TimesheetTable } from './components/TimesheetTable';
import { VendorTable } from './components/VendorTable';
import { VehicleTable } from './components/VehicleTable';
import { ServiceTable } from './components/ServiceTable';
import { TaxKirTable } from './components/TaxKirTable';
import { MutationTable } from './components/MutationTable';
import { SalesTable } from './components/SalesTable';
import { GeneralMasterTable } from './components/GeneralMasterTable';
import { MasterVendorTable } from './components/MasterVendorTable';
import { AddStockModal } from './components/AddStockModal';
import { MOCK_DATA, MOCK_MASTER_DATA, MOCK_ARK_DATA, MOCK_MASTER_ARK_DATA, MOCK_CONTRACT_DATA, MOCK_TIMESHEET_DATA, MOCK_VENDOR_DATA, MOCK_VEHICLE_DATA, MOCK_SERVICE_DATA, MOCK_TAX_KIR_DATA, MOCK_MUTATION_DATA, MOCK_SALES_DATA, MOCK_MASTER_VENDOR_DATA } from './constants';
import { VehicleRecord, ServiceRecord, MutationRecord, SalesRecord, TaxKirRecord, ContractRecord, GeneralMasterItem, MasterVendorRecord } from './types';

const App: React.FC = () => {
  const [activeModule, setActiveModule] = useState('ATK'); 
  const [activeTab, setActiveTab] = useState('Pengguna');
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit' | 'view'>('create');
  
  // State for Vehicle Data
  const [vehicleData, setVehicleData] = useState<VehicleRecord[]>(MOCK_VEHICLE_DATA);
  const [selectedVehicle, setSelectedVehicle] = useState<VehicleRecord | null>(null);

  // State for Service Data
  const [serviceData, setServiceData] = useState<ServiceRecord[]>(MOCK_SERVICE_DATA);
  const [selectedService, setSelectedService] = useState<ServiceRecord | null>(null);

  // State for Mutation Data
  const [mutationData, setMutationData] = useState<MutationRecord[]>(MOCK_MUTATION_DATA);
  const [selectedMutation, setSelectedMutation] = useState<MutationRecord | null>(null);

  // State for Sales Data
  const [salesData, setSalesData] = useState<SalesRecord[]>(MOCK_SALES_DATA);
  const [selectedSales, setSelectedSales] = useState<SalesRecord | null>(null);

  // State for Contract Data (Building Asset)
  const [contractData, setContractData] = useState<ContractRecord[]>(MOCK_CONTRACT_DATA);
  const [selectedContract, setSelectedContract] = useState<ContractRecord | null>(null);

  // State for Master Vendor Data
  const [masterVendorData, setMasterVendorData] = useState<MasterVendorRecord[]>(MOCK_MASTER_VENDOR_DATA);
  const [selectedMasterVendor, setSelectedMasterVendor] = useState<MasterVendorRecord | null>(null);


  // State for General Masters (Dynamic)
  // Initializing with some dummy data to show integration
  const [masters, setMasters] = useState<Record<string, GeneralMasterItem[]>>({
    'Jenis Pajak': [{id: 1, name: 'Pajak Tahunan'}, {id: 2, name: 'Pajak 5 Tahunan'}],
    'Jenis Pembayaran': [{id: 1, name: 'Kasbon'}, {id: 2, name: 'Reimburse'}, {id: 3, name: 'Langsung'}],
    'Jenis Servis': [{id: 1, name: 'Servis Rutin'}, {id: 2, name: 'Perbaikan'}, {id: 3, name: 'Ganti Sparepart'}],
    'Status Mutasi': [{id: 1, name: 'Requested'}, {id: 2, name: 'On Progress'}, {id: 3, name: 'Completed'}],
    'Status Penjualan': [{id: 1, name: 'Draft'}, {id: 2, name: 'Sold'}],
    'Status Request': [{id: 1, name: 'Draft'}, {id: 2, name: 'Submitted'}],
    'Tipe Mutasi': [{id: 1, name: 'Kirim'}, {id: 2, name: 'Terima'}],
    'Tipe Vendor': [{id: 1, name: 'Bengkel'}, {id: 2, name: 'Sparepart'}, {id: 3, name: 'Jasa'}],
    'Role': [{id: 1, name: 'Admin'}, {id: 2, name: 'User'}, {id: 3, name: 'Approver'}],
    // 'Master Vendor' is handled separately now
    'Sync Branchs': [{id: 1, name: 'Pusat'}, {id: 2, name: 'Purwokerto'}, {id: 3, name: 'Pekanbaru'}, {id: 4, name: 'Palembang'}, {id: 5, name: 'Manado'}, {id: 6, name: 'Malang'}, {id: 7, name: 'Kediri'}],
    'Sync Channels': [{id: 1, name: 'Human Capital Operation'}, {id: 2, name: 'Management'}, {id: 3, name: 'Traditional'}, {id: 4, name: 'HR'}, {id: 5, name: 'Warehouse & Distribution'}]
  });
  const [selectedMasterItem, setSelectedMasterItem] = useState<GeneralMasterItem | null>(null);

  const handleModuleNavigate = (module: string) => {
    setActiveModule(module);
    if (module === 'Contract') {
        setActiveTab('Own');
    } else if (module === 'Timesheet') {
        setActiveTab('Active');
    } else if (module === 'Vendor') {
        setActiveTab('Active');
    } else if (module === 'Daftar Aset') {
        setActiveTab('Aktif');
    } else if (module === 'Servis' || module === 'Pajak & KIR' || module === 'Mutasi' || module === 'Penjualan') {
        setActiveTab('Semua');
    } else {
        setActiveTab('Pengguna');
    }
  };

  const isMasterModule = (module: string) => {
    const masterModules = ['Jenis Pajak', 'Jenis Pembayaran', 'Jenis Servis', 'Status Mutasi', 'Status Penjualan', 'Status Request', 'Tipe Mutasi', 'Tipe Vendor', 'Role'];
    return masterModules.includes(module);
  };

  const handleAddClick = () => {
    setModalMode('create');
    setSelectedVehicle(null);
    setSelectedService(null);
    setSelectedMutation(null);
    setSelectedSales(null);
    setSelectedContract(null);
    setSelectedMasterItem(null);
    setSelectedMasterVendor(null);
    setIsModalOpen(true);
  };

  // --- Handlers for Master CRUD ---
  const handleEditMaster = (item: GeneralMasterItem) => {
    setSelectedMasterItem(item);
    setModalMode('edit');
    setIsModalOpen(true);
  };

  const handleDeleteMaster = (id: number) => {
    if (confirm('Are you sure you want to delete this item?')) {
        setMasters(prev => ({
            ...prev,
            [activeModule]: prev[activeModule].filter(item => item.id !== id)
        }));
    }
  };

  const handleSaveMaster = (formData: Partial<GeneralMasterItem>) => {
    const currentList = masters[activeModule] || [];
    if (modalMode === 'create') {
        const newId = Math.max(...currentList.map(m => m.id), 0) + 1;
        const newItem: GeneralMasterItem = {
            id: newId,
            name: formData.name || ''
        };
        setMasters(prev => ({
            ...prev,
            [activeModule]: [...currentList, newItem]
        }));
    } else if (modalMode === 'edit' && selectedMasterItem) {
        setMasters(prev => ({
            ...prev,
            [activeModule]: currentList.map(item => item.id === selectedMasterItem.id ? { ...item, name: formData.name || '' } : item)
        }));
    }
    setIsModalOpen(false);
  };


  // --- Handlers for Vehicle ---
  const handleEditVehicle = (vehicle: VehicleRecord) => {
      setSelectedVehicle(vehicle);
      setModalMode('edit');
      setIsModalOpen(true);
  };

  const handleViewVehicle = (vehicle: VehicleRecord) => {
      setSelectedVehicle(vehicle);
      setModalMode('view');
      setIsModalOpen(true);
  };

  // --- Handlers for Service ---
  const handleEditService = (service: ServiceRecord) => {
      setSelectedService(service);
      setModalMode('edit');
      setIsModalOpen(true);
  };

  const handleViewService = (service: ServiceRecord) => {
      setSelectedService(service);
      setModalMode('view');
      setIsModalOpen(true);
  };

  // --- Handlers for Mutation ---
  const handleEditMutation = (mutation: MutationRecord) => {
      setSelectedMutation(mutation);
      setModalMode('edit');
      setIsModalOpen(true);
  };

  const handleViewMutation = (mutation: MutationRecord) => {
      setSelectedMutation(mutation);
      setModalMode('view');
      setIsModalOpen(true);
  };

  // --- Handlers for Sales ---
  const handleEditSales = (sales: SalesRecord) => {
      setSelectedSales(sales);
      setModalMode('edit');
      setIsModalOpen(true);
  };

  const handleViewSales = (sales: SalesRecord) => {
      setSelectedSales(sales);
      setModalMode('view');
      setIsModalOpen(true);
  };

  // --- Handlers for Master Vendor ---
  const handleEditMasterVendor = (item: MasterVendorRecord) => {
      setSelectedMasterVendor(item);
      setModalMode('edit');
      setIsModalOpen(true);
  };

  const handleViewMasterVendor = (item: MasterVendorRecord) => {
      setSelectedMasterVendor(item);
      setModalMode('view');
      setIsModalOpen(true);
  };

  const handleSaveMasterVendor = (formData: Partial<MasterVendorRecord>) => {
      if (modalMode === 'create') {
          const newId = Math.max(...masterVendorData.map(v => v.id), 0) + 1;
          const newVendor: MasterVendorRecord = {
              id: newId,
              nama: formData.nama || '',
              merek: formData.merek || '',
              alamat: formData.alamat || '',
              noTelp: formData.noTelp || '',
              tipe: formData.tipe || 'Vendor Servis',
              cabang: formData.cabang || 'Pusat',
              aktif: formData.aktif !== undefined ? formData.aktif : true,
              pic: formData.pic || ''
          };
          setMasterVendorData([...masterVendorData, newVendor]);
      } else if (modalMode === 'edit' && selectedMasterVendor) {
          setMasterVendorData(prev => prev.map(item => item.id === selectedMasterVendor.id ? { ...item, ...formData } : item));
      }
      setIsModalOpen(false);
  }
  
  // --- Handlers for Tax KIR ---
  const handleEditTaxKir = (item: TaxKirRecord) => { console.log("Edit Tax Kir", item); };
  const handleViewTaxKir = (item: TaxKirRecord) => { console.log("View Tax Kir", item); };


  const handleSaveVehicle = (formData: Partial<VehicleRecord>) => {
    if (modalMode === 'create') {
        const newId = Math.max(...vehicleData.map(v => v.id), 0) + 1;
        const newVehicle: VehicleRecord = {
            id: newId,
            noRegistrasi: formData.noRegistrasi || '',
            nama: formData.nama || '',
            noPolisi: formData.noPolisi || '',
            channel: formData.channel || '',
            cabang: formData.cabang || '',
            status: 'Aktif',
            ...formData
        } as VehicleRecord;
        setVehicleData([...vehicleData, newVehicle]);
    } else if (modalMode === 'edit' && selectedVehicle) {
        setVehicleData(prev => prev.map(item => item.id === selectedVehicle.id ? { ...item, ...formData } : item));
    }
    setIsModalOpen(false);
  };

  const handleSaveService = (formData: Partial<ServiceRecord>) => {
      if (modalMode === 'create') {
        const newId = `S202406${(Math.floor(Math.random() * 9000) + 1000)}`; 
        const selectedAsset = vehicleData.find(v => v.id.toString() === formData.aset);
        
        const newService: ServiceRecord = {
            id: newId,
            noPolisi: selectedAsset ? selectedAsset.noPolisi : '-',
            tglRequest: new Date().toLocaleString(),
            channel: 'Warehouse & Distribution', 
            cabang: 'Pusat',
            status: 'Draf',
            statusApproval: '-',
            ...formData
        } as ServiceRecord;

        setServiceData([newService, ...serviceData]);
      } else if (modalMode === 'edit' && selectedService) {
        setServiceData(prev => prev.map(item => item.id === selectedService.id ? { ...item, ...formData } : item));
      }
      setIsModalOpen(false);
  };

  const handleSaveMutation = (formData: Partial<MutationRecord>) => {
    if (modalMode === 'create') {
        const newId = `M202407${(Math.floor(Math.random() * 9000) + 1000)}`;
        const selectedAsset = vehicleData.find(v => v.id.toString() === formData.asetId);
        
        const newMutation: MutationRecord = {
            id: newId,
            noPolisi: selectedAsset ? selectedAsset.noPolisi : '-',
            cabangAset: selectedAsset ? selectedAsset.cabang : '-',
            tipeMutasi: formData.tipeMutasi || 'Kirim',
            tglPermintaan: new Date().toLocaleString(),
            lokasiAsal: formData.lokasiAsal || '',
            lokasiTujuan: formData.lokasiTujuan || '',
            status: 'Requested',
            statusApproval: 'PENDING',
            ...formData
        } as MutationRecord;

        setMutationData([newMutation, ...mutationData]);
    } else if (modalMode === 'edit' && selectedMutation) {
        setMutationData(prev => prev.map(item => item.id === selectedMutation.id ? { ...item, ...formData } : item));
    }
    setIsModalOpen(false);
  };

  const handleSaveSales = (formData: Partial<SalesRecord>) => {
    if (modalMode === 'create') {
      const newId = `J202309${(Math.floor(Math.random() * 9000) + 1000)}`;
      const selectedAsset = vehicleData.find(v => v.id.toString() === formData.asetId);
      
      const newSales: SalesRecord = {
          id: newId,
          noPolisi: selectedAsset ? selectedAsset.noPolisi : '-',
          tglRequest: new Date().toLocaleString(),
          channel: selectedAsset ? selectedAsset.channel : '-',
          cabang: selectedAsset ? selectedAsset.cabang : '-',
          hargaTertinggi: formData.offers && formData.offers.length > 0 ? formData.offers[0].price : 'Rp0',
          status: 'Requested',
          statusApproval: 'PENDING',
          ...formData
      } as SalesRecord;

      setSalesData([newSales, ...salesData]);
    } else if (modalMode === 'edit' && selectedSales) {
      setSalesData(prev => prev.map(item => item.id === selectedSales.id ? { ...item, ...formData } : item));
    }
    setIsModalOpen(false);
  };

  const handleSaveContract = (formData: Partial<ContractRecord>) => {
      if (modalMode === 'create') {
          const newId = Math.max(...contractData.map(c => c.id), 0) + 1;
          const newContract: ContractRecord = {
              id: newId,
              status: 'Active',
              ...formData
          } as ContractRecord;
          setContractData([...contractData, newContract]);
      } else if (modalMode === 'edit' && selectedContract) {
          setContractData(prev => prev.map(item => item.id === selectedContract.id ? { ...item, ...formData } : item));
      }
      setIsModalOpen(false);
  };

  const renderContent = () => {
    if (activeModule === 'ATK') {
      if (activeTab === 'Master') return <MasterAtkTable data={MOCK_MASTER_DATA} />;
      return <AssetTable data={MOCK_DATA} />;
    }
    if (activeModule === 'ARK') {
        if (activeTab === 'Master') return <MasterAtkTable data={MOCK_MASTER_ARK_DATA} />;
        return <AssetTable data={MOCK_ARK_DATA} />;
    }
    if (activeModule === 'Contract') return <ContractTable data={contractData} />;
    if (activeModule === 'Timesheet') return <TimesheetTable data={MOCK_TIMESHEET_DATA} />;
    if (activeModule === 'Vendor') return <VendorTable data={MOCK_VENDOR_DATA} />;
    
    // Vehicle Sub-modules
    if (activeModule === 'Daftar Aset') return <VehicleTable data={vehicleData} onEdit={handleEditVehicle} onView={handleViewVehicle} />;
    if (activeModule === 'Servis') return <ServiceTable data={serviceData} onEdit={handleEditService} onView={handleViewService} />;
    if (activeModule === 'Pajak & KIR') return <TaxKirTable data={MOCK_TAX_KIR_DATA} />;
    if (activeModule === 'Mutasi') return <MutationTable data={mutationData} onEdit={handleEditMutation} onView={handleViewMutation} />;
    if (activeModule === 'Penjualan') return <SalesTable data={salesData} onEdit={handleEditSales} onView={handleViewSales} />;

    // Master Vendor
    if (activeModule === 'Master Vendor') {
        return (
            <MasterVendorTable 
                data={masterVendorData} 
                onEdit={handleEditMasterVendor} 
                onView={handleViewMasterVendor} 
            />
        );
    }

    // Master General Modules
    if (isMasterModule(activeModule)) {
        return (
            <GeneralMasterTable 
                data={masters[activeModule] || []} 
                onEdit={handleEditMaster}
                onDelete={handleDeleteMaster}
            />
        );
    }

    return <div className="p-8 text-center text-gray-500">Module {activeModule} under construction</div>;
  };

  const getFilterTabs = () => {
    if (activeModule === 'ATK' || activeModule === 'ARK') return ['Pengguna', 'Master', 'Approval'];
    if (activeModule === 'Contract') return ['Own', 'Rent'];
    if (activeModule === 'Timesheet') return ['All', 'Permanent', 'Contract', 'Probation', 'Internship', 'Vendor'];
    if (activeModule === 'Vendor') return ['Active', 'Inactive', 'Blacklist'];
    if (activeModule === 'Daftar Aset') return ['Aktif', 'Tidak Aktif'];
    if (activeModule === 'Servis' || activeModule === 'Pajak & KIR' || activeModule === 'Mutasi' || activeModule === 'Penjualan') return ['Semua', 'Persetujuan'];
    if (isMasterModule(activeModule) || activeModule === 'Master Vendor') return []; // No tabs for master sub-modules
    return ['All'];
  };

  return (
    <div className="flex bg-gray-50 min-h-screen font-sans">
      <Sidebar activeItem={activeModule} onNavigate={handleModuleNavigate} />
      
      <div className="flex-1 ml-64 flex flex-col">
        <TopBar />
        
        <main className="flex-1 p-8 overflow-y-auto">
          {/* Breadcrumb & Title */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">
                {activeModule === 'Daftar Aset' ? 'Daftar Aset Kendaraan' : 
                 activeModule === 'Servis' ? 'Servis Kendaraan' :
                 activeModule === 'Pajak & KIR' ? 'Pajak & KIR Kendaraan' :
                 activeModule === 'Mutasi' ? 'Mutasi Kendaraan' :
                 activeModule === 'Penjualan' ? 'Penjualan Kendaraan' :
                 activeModule === 'Contract' ? 'List Building' :
                 activeModule === 'Master Vendor' ? 'Master Vendor' :
                 isMasterModule(activeModule) ? `Master ${activeModule}` :
                 activeModule}
            </h1>
          </div>

          <FilterBar 
            tabs={getFilterTabs()} 
            activeTab={activeTab} 
            onTabChange={setActiveTab} 
            onAddClick={handleAddClick}
            moduleName={activeModule}
          />

          {renderContent()}
        </main>
      </div>

      <AddStockModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        moduleName={activeModule}
        onSaveVehicle={handleSaveVehicle}
        onSaveService={handleSaveService}
        onSaveMutation={handleSaveMutation}
        onSaveSales={handleSaveSales}
        onSaveContract={handleSaveContract}
        onSaveMaster={handleSaveMaster} 
        onSaveMasterVendor={handleSaveMasterVendor}
        initialVehicleData={selectedVehicle || undefined}
        initialServiceData={selectedService || undefined}
        initialMutationData={selectedMutation || undefined}
        initialSalesData={selectedSales || undefined}
        initialContractData={selectedContract || undefined}
        initialMasterData={selectedMasterItem || undefined}
        initialMasterVendorData={selectedMasterVendor || undefined}
        mode={modalMode}
        vehicleList={vehicleData}
        masterData={masters} 
      />
    </div>
  );
};

export default App;