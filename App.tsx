
import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { TopBar } from './components/TopBar';
import { FilterBar, FilterItem } from './components/FilterBar';
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
import { MasterDeliveryLocationTable } from './components/MasterDeliveryLocationTable';
import { LogBookTable } from './components/LogBookTable';
import { AddStockModal } from './components/AddStockModal';
import { MOCK_DATA, MOCK_MASTER_DATA, MOCK_ARK_DATA, MOCK_MASTER_ARK_DATA, MOCK_CONTRACT_DATA, MOCK_TIMESHEET_DATA, MOCK_VENDOR_DATA, MOCK_VEHICLE_DATA, MOCK_SERVICE_DATA, MOCK_TAX_KIR_DATA, MOCK_MUTATION_DATA, MOCK_SALES_DATA, MOCK_MASTER_VENDOR_DATA, MOCK_DELIVERY_LOCATIONS, MOCK_LOGBOOK_DATA } from './constants';
import { VehicleRecord, ServiceRecord, MutationRecord, SalesRecord, TaxKirRecord, ContractRecord, GeneralMasterItem, MasterVendorRecord, StationeryRequestRecord, DeliveryLocationRecord, AssetRecord, LogBookRecord } from './types';
import { useLanguage } from './contexts/LanguageContext';

const App: React.FC = () => {
  const { t } = useLanguage();
  const [activeModule, setActiveModule] = useState('Daftar ATK'); 
  const [activeTab, setActiveTab] = useState('All');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  
  // Filter State for Stationery/Household Request
  const [atkFilters, setAtkFilters] = useState<FilterItem[]>([]);
  // Filter State for Master ATK/ARK
  const [masterAtkFilters, setMasterAtkFilters] = useState<FilterItem[]>([]);

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

  // State for Master Delivery Locations
  const [deliveryLocations, setDeliveryLocations] = useState<DeliveryLocationRecord[]>(MOCK_DELIVERY_LOCATIONS);
  const [selectedDeliveryLocation, setSelectedDeliveryLocation] = useState<DeliveryLocationRecord | null>(null);

  // State for Log Book Data
  const [logBookData, setLogBookData] = useState<LogBookRecord[]>(MOCK_LOGBOOK_DATA);
  const [selectedLogBook, setSelectedLogBook] = useState<LogBookRecord | null>(null);

  // State for Asset View (Stationery/Household)
  const [selectedAsset, setSelectedAsset] = useState<AssetRecord | null>(null);


  // State for General Masters (Dynamic)
  // Initializing with some dummy data to show integration
  const [masters, setMasters] = useState<Record<string, GeneralMasterItem[]>>({
    'Master UOM': [{id: 1, name: 'Pcs'}, {id: 2, name: 'Box'}, {id: 3, name: 'Rim'}, {id: 4, name: 'Unit'}, {id: 5, name: 'Roll'}, {id: 6, name: 'Can'}, {id: 7, name: 'Pouch'}],
    'Master Currency': [{id: 1, name: 'IDR'}, {id: 2, name: 'USD'}, {id: 3, name: 'EUR'}],
    'Master Category': [{id: 1, name: 'ATK'}, {id: 2, name: 'Elektronik'}, {id: 3, name: 'Furniture'}, {id: 4, name: 'Kendaraan'}],
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

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

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
    } else if (module === 'Daftar ATK') {
        setActiveTab('All');
        setAtkFilters([]); // Reset filters when module resets
    } else if (module === 'Stationery Request Approval') {
        setActiveTab('Pending');
        setAtkFilters([]);
    } else if (module === 'Master ATK') {
        setActiveTab('Items'); // Default tab for Master ATK
        setMasterAtkFilters([]);
    } else if (module === 'Daftar ARK') {
        setActiveTab('All');
        setAtkFilters([]);
    } else if (module === 'Household Request Approval') {
        setActiveTab('Pending');
        setAtkFilters([]);
    } else if (module === 'Master ARK') {
        setActiveTab('Items');
        setMasterAtkFilters([]);
    } else if (module === 'Log Book') {
        setActiveTab('All');
    } else {
        // Default
        setActiveTab('Pengguna');
    }
  };

  const isMasterModule = (module: string) => {
    const masterModules = [
        'Jenis Pajak', 'Jenis Pembayaran', 'Jenis Servis', 
        'Status Mutasi', 'Status Penjualan', 'Status Request', 
        'Tipe Mutasi', 'Tipe Vendor', 'Role'
    ];
    return masterModules.includes(module);
  };

  // Helper to determine the actual master key in the 'masters' state
  const getCurrentMasterKey = () => {
      if (activeModule === 'Master ATK' || activeModule === 'Master ARK') {
          if (activeTab === 'UOM') return 'Master UOM';
          if (activeTab === 'Currency') return 'Master Currency';
          if (activeTab === 'Category') return 'Master Category';
      }
      return activeModule;
  }

  const handleAddClick = () => {
    setModalMode('create');
    setSelectedVehicle(null);
    setSelectedService(null);
    setSelectedMutation(null);
    setSelectedSales(null);
    setSelectedContract(null);
    setSelectedMasterItem(null);
    setSelectedMasterVendor(null);
    setSelectedDeliveryLocation(null);
    setSelectedLogBook(null);
    setSelectedAsset(null);
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
        const targetKey = getCurrentMasterKey();
        setMasters(prev => ({
            ...prev,
            [targetKey]: prev[targetKey].filter(item => item.id !== id)
        }));
    }
  };

  const handleSaveMaster = (formData: Partial<GeneralMasterItem>) => {
    const targetKey = getCurrentMasterKey();
    const currentList = masters[targetKey] || [];

    if (modalMode === 'create') {
        const newId = Math.max(...currentList.map(m => m.id), 0) + 1;
        const newItem: GeneralMasterItem = {
            id: newId,
            name: formData.name || ''
        };
        setMasters(prev => ({
            ...prev,
            [targetKey]: [...currentList, newItem]
        }));
    } else if (modalMode === 'edit' && selectedMasterItem) {
        setMasters(prev => ({
            ...prev,
            [targetKey]: currentList.map(item => item.id === selectedMasterItem.id ? { ...item, name: formData.name || '' } : item)
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

  // --- Handlers for Delivery Locations ---
  const handleEditDeliveryLocation = (item: DeliveryLocationRecord) => {
      setSelectedDeliveryLocation(item);
      setModalMode('edit');
      setIsModalOpen(true);
  };

  const handleDeleteDeliveryLocation = (id: number) => {
      if (confirm('Are you sure you want to delete this location?')) {
          setDeliveryLocations(prev => prev.filter(item => item.id !== id));
      }
  };

  const handleSaveDeliveryLocation = (formData: Partial<DeliveryLocationRecord>) => {
      if (modalMode === 'create') {
          const newId = Math.max(...deliveryLocations.map(l => l.id), 0) + 1;
          const newLocation: DeliveryLocationRecord = {
              id: newId,
              name: formData.name || '',
              address: formData.address || '',
              type: formData.type || 'Branch'
          };
          setDeliveryLocations([...deliveryLocations, newLocation]);
      } else if (modalMode === 'edit' && selectedDeliveryLocation) {
          setDeliveryLocations(prev => prev.map(item => item.id === selectedDeliveryLocation.id ? { ...item, ...formData } : item));
      }
      setIsModalOpen(false);
  }

  // --- Handler for Asset (ATK/ARK) View ---
  const handleViewAsset = (item: AssetRecord) => {
      setSelectedAsset(item);
      setModalMode('view');
      setIsModalOpen(true);
  }

  // --- Handler for Asset Revise ---
  const handleRevise = () => {
      setModalMode('edit');
  };
  
  // --- Handlers for Tax KIR ---
  const handleEditTaxKir = (item: TaxKirRecord) => { console.log("Edit Tax Kir", item); };
  const handleViewTaxKir = (item: TaxKirRecord) => { console.log("View Tax Kir", item); };

  // --- Handlers for Log Book ---
  const handleSaveLogBook = (formData: Partial<LogBookRecord>) => {
      if (modalMode === 'create') {
          const newId = Math.max(...logBookData.map(l => l.id), 0) + 1;
          const newLogBook: LogBookRecord = {
              id: newId,
              lokasiModena: formData.lokasiModena || '',
              kategoriTamu: formData.kategoriTamu || '',
              namaTamu: formData.namaTamu || '',
              tanggalKunjungan: formData.tanggalKunjungan || '',
              jamDatang: formData.jamDatang || '',
              jamPulang: formData.jamPulang || '',
              wanita: formData.wanita || 0,
              lakiLaki: formData.lakiLaki || 0,
              anakAnak: formData.anakAnak || 0,
              note: formData.note || ''
          };
          setLogBookData([...logBookData, newLogBook]);
      }
      setIsModalOpen(false);
  }


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

  const handleSaveStationeryRequest = (request: Partial<StationeryRequestRecord>) => {
      console.log("Saving stationery/household request:", request);
      // Logic to save the request goes here. 
      // For now, we just log it as the table data for requests isn't fully mocked to receive this.
      alert(`Request Submitted for ${request.items?.length} items!`);
  }

  const getBreadcrumbs = () => {
    if (['Daftar ATK', 'Stationery Request Approval', 'Master ATK'].includes(activeModule)) return ['Home', t('ATK'), t(activeModule)];
    if (['Daftar ARK', 'Household Request Approval', 'Master ARK'].includes(activeModule)) return ['Home', t('ARK'), t(activeModule)];
    if (['Daftar Aset', 'Servis', 'Pajak & KIR', 'Mutasi', 'Penjualan'].includes(activeModule)) return ['Home', t('Kendaraan'), t(activeModule)];
    if (['Jenis Pajak', 'Jenis Pembayaran', 'Jenis Servis', 'Status Mutasi', 'Status Penjualan', 'Status Request', 'Tipe Mutasi', 'Tipe Vendor', 'Role', 'Master Vendor'].includes(activeModule)) return ['Home', t('Master Data'), t(activeModule)];
    
    return ['Home', t(activeModule)];
  };

  const renderContent = () => {
    // ATK Module Content
    if (activeModule === 'Daftar ATK' || activeModule === 'Stationery Request Approval') {
      let filteredData = MOCK_DATA;
      // ... (Filtering Logic for ATK)
      if (activeTab === 'Approved') filteredData = filteredData.filter(item => item.status === 'Approved');
      else if (activeTab === 'Rejected') filteredData = filteredData.filter(item => item.status === 'Rejected');
      else if (activeTab === 'Closed') filteredData = filteredData.filter(item => item.status === 'Closed');
      else if (activeTab === 'Draft') filteredData = filteredData.filter(item => item.status === 'Draft');
      else if (activeTab === 'Pending') filteredData = filteredData.filter(item => item.status === 'Pending');
      
      if (atkFilters.length > 0) {
        filteredData = filteredData.filter(item => {
            return atkFilters.every(filter => {
                const val = filter.value.toLowerCase();
                if (filter.field === 'Date') {
                    const [y, m, d] = filter.value.split('-');
                    const formattedFilterDate = `${d}/${m}/${y}`;
                    return item.date === formattedFilterDate;
                }
                if (filter.field === 'Employee Name') return item.employee.name.toLowerCase().includes(val);
                if (filter.field === 'Category') return item.category.toLowerCase().includes(val);
                if (filter.field === 'Item Name') return item.itemName.toLowerCase().includes(val);
                if (filter.field === 'Item Code') return item.itemCode.toLowerCase().includes(val);
                return true;
            });
        });
      }
      return <AssetTable data={filteredData} onView={handleViewAsset} />;
    }

    // ARK Module Content
    if (activeModule === 'Daftar ARK' || activeModule === 'Household Request Approval') {
        let filteredData = MOCK_ARK_DATA;
        // Reuse Filtering Logic
        if (activeTab === 'Approved') filteredData = filteredData.filter(item => item.status === 'Approved');
        else if (activeTab === 'Rejected') filteredData = filteredData.filter(item => item.status === 'Rejected');
        else if (activeTab === 'Closed') filteredData = filteredData.filter(item => item.status === 'Closed');
        else if (activeTab === 'Draft') filteredData = filteredData.filter(item => item.status === 'Draft');
        else if (activeTab === 'Pending') filteredData = filteredData.filter(item => item.status === 'Pending');

        if (atkFilters.length > 0) {
            filteredData = filteredData.filter(item => {
                return atkFilters.every(filter => {
                    const val = filter.value.toLowerCase();
                    if (filter.field === 'Date') {
                        const [y, m, d] = filter.value.split('-');
                        const formattedFilterDate = `${d}/${m}/${y}`;
                        return item.date === formattedFilterDate;
                    }
                    if (filter.field === 'Employee Name') return item.employee.name.toLowerCase().includes(val);
                    if (filter.field === 'Category') return item.category.toLowerCase().includes(val);
                    if (filter.field === 'Item Name') return item.itemName.toLowerCase().includes(val);
                    if (filter.field === 'Item Code') return item.itemCode.toLowerCase().includes(val);
                    return true;
                });
            });
        }
        return <AssetTable data={filteredData} onView={handleViewAsset} />;
    }
    
    if (activeModule === 'Master ATK' || activeModule === 'Master ARK') {
      const isArk = activeModule === 'Master ARK';
      
      // Tab handling for Master ATK/ARK
      if (activeTab === 'UOM') {
          return (
            <GeneralMasterTable 
                data={masters['Master UOM']} 
                onEdit={handleEditMaster}
                onDelete={handleDeleteMaster}
            />
          );
      }
      if (activeTab === 'Currency') {
          return (
            <GeneralMasterTable 
                data={masters['Master Currency']} 
                onEdit={handleEditMaster}
                onDelete={handleDeleteMaster}
            />
          );
      }
      if (activeTab === 'Category') {
          return (
            <GeneralMasterTable 
                data={masters['Master Category']} 
                onEdit={handleEditMaster}
                onDelete={handleDeleteMaster}
            />
          );
      }
      if (activeTab === 'Delivery Location') {
          return (
              <MasterDeliveryLocationTable 
                data={deliveryLocations}
                onEdit={handleEditDeliveryLocation}
                onDelete={handleDeleteDeliveryLocation}
              />
          );
      }

      // Default: Items Tab
      let filteredData = isArk ? MOCK_MASTER_ARK_DATA : MOCK_MASTER_DATA;
      // Filter by Dynamic Filters (AND logic)
      if (masterAtkFilters.length > 0) {
        filteredData = filteredData.filter(item => {
            return masterAtkFilters.every(filter => {
                const val = filter.value.toLowerCase();
                if (filter.field === 'Category') return item.category.toLowerCase().includes(val);
                if (filter.field === 'Item Name') return item.itemName.toLowerCase().includes(val);
                if (filter.field === 'Item Code') return item.itemCode.toLowerCase().includes(val);
                if (filter.field === 'UOM') return item.uom.toLowerCase().includes(val);
                return true;
            });
        });
      }
      return <MasterAtkTable data={filteredData} />;
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
    
    // Log Book
    if (activeModule === 'Log Book') return <LogBookTable data={logBookData} />;

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
    if (activeModule === 'Daftar ATK' || activeModule === 'Daftar ARK') return ['All', 'Draft', 'Pending', 'Approved', 'Rejected', 'Closed'];
    if (activeModule === 'Stationery Request Approval' || activeModule === 'Household Request Approval') return ['All', 'Draft', 'Pending', 'Approved', 'Rejected', 'Closed'];
    if (activeModule === 'Master ATK' || activeModule === 'Master ARK') return ['Items', 'UOM', 'Currency', 'Category', 'Delivery Location']; 
    if (activeModule === 'Contract') return ['Own', 'Rent'];
    if (activeModule === 'Timesheet') return ['All', 'Permanent', 'Contract', 'Probation', 'Internship', 'Vendor'];
    if (activeModule === 'Vendor') return ['Active', 'Inactive', 'Blacklist'];
    if (activeModule === 'Daftar Aset') return ['Aktif', 'Tidak Aktif'];
    if (activeModule === 'Servis' || activeModule === 'Pajak & KIR' || activeModule === 'Mutasi' || activeModule === 'Penjualan') return ['Semua', 'Persetujuan'];
    if (isMasterModule(activeModule) || activeModule === 'Master Vendor') return []; // No tabs for master sub-modules
    if (activeModule === 'Log Book') return ['All'];
    return ['All'];
  };

  // Helper to get module name for modal. Maps tabs to specific master keys when needed.
  const getModalModuleName = () => {
    if (activeModule === 'Master ATK' || activeModule === 'Master ARK') {
        if (activeTab === 'UOM') return 'Master UOM';
        if (activeTab === 'Currency') return 'Master Currency';
        if (activeTab === 'Category') return 'Master Category';
        if (activeTab === 'Delivery Location') return 'Master Delivery Location';
    }
    return activeModule;
  }

  return (
    <div className="flex bg-gray-50 min-h-screen font-sans">
      <Sidebar 
        activeItem={activeModule} 
        onNavigate={handleModuleNavigate} 
        isCollapsed={isSidebarCollapsed}
        onToggle={toggleSidebar}
      />
      
      <div className={`flex-1 flex flex-col transition-all duration-300 ${isSidebarCollapsed ? 'ml-20' : 'ml-64'}`}>
        <TopBar breadcrumbs={getBreadcrumbs()} />
        
        <main className="flex-1 p-8 overflow-y-auto">
          {/* Breadcrumb & Title */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">
                {activeModule === 'Daftar Aset' ? t('Daftar Aset Kendaraan') : 
                 activeModule === 'Servis' ? t('Servis Kendaraan') :
                 activeModule === 'Pajak & KIR' ? t('Pajak & KIR Kendaraan') :
                 activeModule === 'Mutasi' ? t('Mutasi Kendaraan') :
                 activeModule === 'Penjualan' ? t('Penjualan Kendaraan') :
                 activeModule === 'Daftar ATK' ? t('Daftar Aset ATK') :
                 activeModule === 'Stationery Request Approval' ? t('Header Stationery Request Approval') :
                 activeModule === 'Master ATK' ? t('Master Data ATK') :
                 activeModule === 'Daftar ARK' ? t('Request ARK') :
                 activeModule === 'Household Request Approval' ? t('Header Household Request Approval') :
                 activeModule === 'Master ARK' ? t('Master Data ARK') :
                 activeModule === 'Contract' ? t('List Building') :
                 activeModule === 'Master Vendor' ? t('Master Vendor') :
                 activeModule === 'Log Book' ? t('Log Book Tamu Input') :
                 isMasterModule(activeModule) ? `Master ${t(activeModule)}` :
                 t(activeModule)}
            </h1>
          </div>

          <FilterBar 
            tabs={getFilterTabs()} 
            activeTab={activeTab} 
            onTabChange={setActiveTab} 
            onAddClick={handleAddClick}
            moduleName={activeModule}
            // Pass dynamic filter props
            activeFilters={(activeModule === 'Master ATK' || activeModule === 'Master ARK') ? masterAtkFilters : atkFilters}
            onFilterChange={(activeModule === 'Master ATK' || activeModule === 'Master ARK') ? setMasterAtkFilters : setAtkFilters}
          />

          {renderContent()}
        </main>
      </div>

      <AddStockModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        moduleName={getModalModuleName()}
        onSaveVehicle={handleSaveVehicle}
        onSaveService={handleSaveService}
        onSaveMutation={handleSaveMutation}
        onSaveSales={handleSaveSales}
        onSaveContract={handleSaveContract}
        onSaveMaster={handleSaveMaster} 
        onSaveMasterVendor={handleSaveMasterVendor}
        onSaveStationeryRequest={handleSaveStationeryRequest}
        onSaveDeliveryLocation={handleSaveDeliveryLocation}
        onSaveLogBook={handleSaveLogBook}
        onRevise={handleRevise}
        initialVehicleData={selectedVehicle || undefined}
        initialServiceData={selectedService || undefined}
        initialMutationData={selectedMutation || undefined}
        initialSalesData={selectedSales || undefined}
        initialContractData={selectedContract || undefined}
        initialMasterData={selectedMasterItem || undefined}
        initialMasterVendorData={selectedMasterVendor || undefined}
        initialDeliveryLocationData={selectedDeliveryLocation || undefined}
        initialAssetData={selectedAsset || undefined}
        mode={modalMode}
        vehicleList={vehicleData}
        masterData={masters} 
      />
    </div>
  );
};

export default App;
