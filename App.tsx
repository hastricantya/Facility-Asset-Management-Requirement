import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { TopBar } from './components/TopBar';
import { FilterBar } from './components/FilterBar';
import { AssetTable } from './components/AssetTable';
import { MasterAtkTable } from './components/MasterAtkTable';
import { ContractTable } from './components/ContractTable';
import { TimesheetTable } from './components/TimesheetTable';
import { VendorTable } from './components/VendorTable';
import { AddStockModal } from './components/AddStockModal';
import { MOCK_DATA, MOCK_MASTER_DATA, MOCK_ARK_DATA, MOCK_MASTER_ARK_DATA, MOCK_CONTRACT_DATA, MOCK_TIMESHEET_DATA, MOCK_VENDOR_DATA } from './constants';

const App: React.FC = () => {
  const [activeModule, setActiveModule] = useState('ATK'); // 'ATK' | 'ARK' | 'Contract' | 'Timesheet' | 'Vendor' etc
  const [activeTab, setActiveTab] = useState('Pengguna');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModuleNavigate = (module: string) => {
    setActiveModule(module);
    if (module === 'Contract') {
        setActiveTab('Active');
    } else if (module === 'Timesheet') {
        setActiveTab('Active');
    } else if (module === 'Vendor') {
        setActiveTab('Active');
    } else {
        setActiveTab('Pengguna');
    }
  };

  const handleAddClick = () => {
    // Open modal for Masters, Contract, or Vendor
    if (activeTab.includes('Master') || activeModule === 'Contract' || activeModule === 'Vendor') {
      setIsModalOpen(true);
    } else {
        console.log('Tambah clicked on', activeTab);
    }
  };

  // Determine tabs based on active module
  const getTabs = () => {
    if (activeModule === 'ATK') return ['Pengguna', 'Master ATK', 'All'];
    if (activeModule === 'ARK') return ['Pengguna', 'Master ARK', 'All'];
    if (activeModule === 'Contract') return ['Active', 'Inactive', 'All'];
    if (activeModule === 'Timesheet') return ['Active', 'Inactive', 'All'];
    if (activeModule === 'Vendor') return ['Active', 'Inactive', 'All'];
    return ['Pengguna', 'Master', 'All']; // Fallback
  };

  // Determine data based on active module and tab
  const getCurrentData = () => {
    if (activeModule === 'ATK') {
        if (activeTab === 'Master ATK') return MOCK_MASTER_DATA;
        return MOCK_DATA;
    }
    if (activeModule === 'ARK') {
        if (activeTab === 'Master ARK') return MOCK_MASTER_ARK_DATA;
        return MOCK_ARK_DATA;
    }
    if (activeModule === 'Contract') {
        return MOCK_CONTRACT_DATA;
    }
    if (activeModule === 'Timesheet') {
        return MOCK_TIMESHEET_DATA;
    }
    if (activeModule === 'Vendor') {
        return MOCK_VENDOR_DATA;
    }
    return [];
  };

  const isMasterView = activeTab.includes('Master');
  const isContractView = activeModule === 'Contract';
  const isTimesheetView = activeModule === 'Timesheet';
  const isVendorView = activeModule === 'Vendor';
  const currentData = getCurrentData();

  // Determine placeholder text
  const getSearchPlaceholder = () => {
    if (activeModule === 'Contract') return "Nama Kontrak";
    if (activeModule === 'Vendor') return "Nama Vendor";
    return "Nama Pengguna/Jenis Barang";
  };

  return (
    <div className="flex min-h-screen bg-white">
      {/* Sidebar */}
      <Sidebar activeItem={activeModule} onNavigate={handleModuleNavigate} />

      {/* Main Content Wrapper */}
      <div className="flex-1 ml-64 flex flex-col transition-all duration-300">
        
        <TopBar />

        {/* Content Area */}
        <main className="p-8 flex-1">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900">{activeModule} Management</h1>
                <p className="text-gray-500 text-sm mt-1">Monitor all employee assets and inventory transactions for {activeModule}</p>
            </div>

            {/* White Card Container */}
            <div className={`${isTimesheetView ? 'bg-transparent shadow-none border-none p-0' : 'bg-white p-6 rounded-xl shadow-sm border border-gray-200'}`}>
                <FilterBar 
                  tabs={getTabs()}
                  activeTab={activeTab} 
                  onTabChange={setActiveTab} 
                  onAddClick={handleAddClick}
                  searchPlaceholder={getSearchPlaceholder()}
                  moduleName={activeModule}
                />
                
                {isContractView ? (
                    <ContractTable data={currentData as any} />
                ) : isVendorView ? (
                    <VendorTable data={currentData as any} />
                ) : isMasterView ? (
                    // We can reuse MasterAtkTable as it has the same structure for both ATK and ARK masters
                    <MasterAtkTable data={currentData as any} /> 
                ) : isTimesheetView ? (
                    <TimesheetTable data={currentData as any} />
                ) : (
                    <AssetTable data={currentData as any} />
                )}
            </div>
        </main>
      </div>

      {/* Modals */}
      <AddStockModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        moduleName={activeModule}
      />
    </div>
  );
};

export default App;