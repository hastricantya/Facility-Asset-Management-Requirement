import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { TopBar } from './components/TopBar';
import { FilterBar } from './components/FilterBar';
import { AssetTable } from './components/AssetTable';
import { MasterAtkTable } from './components/MasterAtkTable';
import { AddStockModal } from './components/AddStockModal';
import { MOCK_DATA, MOCK_MASTER_DATA } from './constants';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Pengguna');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddClick = () => {
    if (activeTab === 'Master ATK') {
      setIsModalOpen(true);
    } else {
        // Logic for other tabs can be added here
        console.log('Tambah clicked on', activeTab);
    }
  };

  return (
    <div className="flex min-h-screen bg-white">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Wrapper */}
      <div className="flex-1 ml-64 flex flex-col transition-all duration-300">
        
        <TopBar />

        {/* Content Area */}
        <main className="p-8 flex-1">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Asset Management</h1>
                <p className="text-gray-500 text-sm mt-1">Monitor all employee assets and inventory transactions</p>
            </div>

            {/* White Card Container */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <FilterBar 
                  activeTab={activeTab} 
                  onTabChange={setActiveTab} 
                  onAddClick={handleAddClick}
                />
                
                {activeTab === 'Pengguna' && <AssetTable data={MOCK_DATA} />}
                {activeTab === 'Master ATK' && <MasterAtkTable data={MOCK_MASTER_DATA} />}
                {activeTab === 'All' && <AssetTable data={MOCK_DATA} />}
            </div>
        </main>
      </div>

      {/* Modals */}
      <AddStockModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default App;
