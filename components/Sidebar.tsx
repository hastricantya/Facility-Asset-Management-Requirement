
import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  PenTool, 
  ShoppingCart, 
  FileText, 
  Clock, 
  Users, 
  CreditCard, 
  Home, 
  BookOpen, 
  BarChart, 
  Search,
  ChevronLeft,
  ChevronRight,
  Car,
  Database,
  Wrench,
  Send,
  DollarSign,
  ChevronDown,
  ChevronUp,
  Settings,
  List,
  ClipboardCheck
} from 'lucide-react';
import { SidebarItem } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

interface Props {
  activeItem: string;
  onNavigate: (label: string) => void;
  isCollapsed: boolean;
  onToggle: () => void;
}

interface MenuItem {
    label: string; // This is the key for navigation and translation
    icon: React.ReactNode;
    subItems?: MenuItem[];
}

export const Sidebar: React.FC<Props> = ({ activeItem, onNavigate, isCollapsed, onToggle }) => {
  const { t } = useLanguage();
  const [expandedMenus, setExpandedMenus] = useState<string[]>(['Kendaraan', 'Master Data', 'ATK']);

  const toggleMenu = (label: string) => {
    if (isCollapsed) {
        onToggle(); // Auto-expand if clicking a menu while collapsed
        if (!expandedMenus.includes(label)) {
             setExpandedMenus(prev => [...prev, label]);
        }
    } else {
        setExpandedMenus(prev => 
            prev.includes(label) ? prev.filter(item => item !== label) : [...prev, label]
        );
    }
  };

  // The 'label' property here serves as the ID for navigation logic AND the key for translation lookup.
  const menuItems: MenuItem[] = [
    { label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { 
        label: 'Kendaraan', 
        icon: <Car size={20} />,
        subItems: [
            { label: 'Daftar Aset', icon: <Database size={18} /> },
            { label: 'Servis', icon: <Wrench size={18} /> },
            { label: 'Pajak & KIR', icon: <FileText size={18} /> },
            { label: 'Mutasi', icon: <Send size={18} /> },
            { label: 'Penjualan', icon: <DollarSign size={18} /> },
        ]
    },
    { 
        label: 'ATK', 
        icon: <PenTool size={20} />,
        subItems: [
             { label: 'Daftar ATK', icon: <List size={18} /> },
             { label: 'Stationery Request Approval', icon: <ClipboardCheck size={18} /> },
             { label: 'Master ATK', icon: <Database size={18} /> },
        ]
    },
    { label: 'ARK', icon: <ShoppingCart size={20} /> },
    { label: 'Contract', icon: <FileText size={20} /> },
    { label: 'Timesheet', icon: <Clock size={20} /> },
    { label: 'Vendor', icon: <Users size={20} /> },
    { label: 'Credit Card', icon: <CreditCard size={20} /> },
    { 
      label: 'Master Data', 
      icon: <Home size={20} />,
      subItems: [
        { label: 'Jenis Pajak', icon: <Wrench size={18} /> },
        { label: 'Jenis Pembayaran', icon: <Wrench size={18} /> },
        { label: 'Jenis Servis', icon: <Wrench size={18} /> },
        { label: 'Status Mutasi', icon: <Wrench size={18} /> },
        { label: 'Status Penjualan', icon: <Wrench size={18} /> },
        { label: 'Status Request', icon: <Wrench size={18} /> },
        { label: 'Tipe Mutasi', icon: <Wrench size={18} /> },
        { label: 'Tipe Vendor', icon: <Wrench size={18} /> },
        { label: 'Role', icon: <Wrench size={18} /> },
        { label: 'Master Vendor', icon: <Users size={18} /> },
      ]
    },
    { label: 'Log Book', icon: <BookOpen size={20} /> },
    { label: 'Project Mgmt', icon: <BarChart size={20} /> },
  ];

  return (
    <div className={`${isCollapsed ? 'w-20' : 'w-64'} bg-black text-gray-400 flex flex-col h-screen fixed left-0 top-0 border-r border-gray-800 z-20 transition-all duration-300`}>
      {/* Logo Area */}
      <div className={`p-6 flex items-center gap-3 text-white mb-2 ${isCollapsed ? 'justify-center' : ''}`}>
        <div className="w-8 h-8 min-w-8 bg-white text-black rounded-full flex items-center justify-center font-bold text-xl">M</div>
        {!isCollapsed && (
            <div className="overflow-hidden whitespace-nowrap">
                <h1 className="font-bold text-lg leading-none">MODENA</h1>
                <p className="text-xs text-gray-500">Asset Management</p>
            </div>
        )}
      </div>

      {/* Search Menu Input */}
      <div className="px-4 mb-6">
        <div className={`relative flex ${isCollapsed ? 'justify-center' : ''}`}>
          {isCollapsed ? (
             <button className="w-full h-10 flex items-center justify-center hover:bg-[#1a1a1a] rounded transition-colors">
                <Search className="text-gray-600" size={16} />
             </button>
          ) : (
            <>
                <Search className="absolute left-3 top-2.5 text-gray-600" size={16} />
                <input 
                    type="text" 
                    placeholder={t('Search Menu')} 
                    className="w-full bg-[#1a1a1a] text-sm text-gray-300 pl-10 pr-4 py-2 rounded border border-gray-800 focus:outline-none focus:border-gray-600 placeholder-gray-600"
                />
            </>
          )}
        </div>
      </div>

      {/* Navigation List */}
      <nav className="flex-1 overflow-y-auto custom-scrollbar px-2 space-y-1">
        {menuItems.map((item, index) => {
          const hasSub = item.subItems && item.subItems.length > 0;
          const isExpanded = expandedMenus.includes(item.label);
          // Check if parent or any child is active
          const isParentActive = activeItem === item.label || (item.subItems && item.subItems.some(sub => sub.label === activeItem)); 

          if (hasSub) {
              return (
                  <div key={index} className="space-y-1">
                      <button
                        onClick={() => toggleMenu(item.label)}
                        className={`w-full flex items-center ${isCollapsed ? 'justify-center px-0' : 'justify-between px-4'} py-3 text-sm font-medium rounded-lg transition-colors duration-200 hover:bg-[#1a1a1a] hover:text-white ${isParentActive ? 'text-white bg-[#1a1a1a]' : 'text-gray-500'}`}
                        title={isCollapsed ? t(item.label) : undefined}
                      >
                         <div className={`flex items-center ${isCollapsed ? 'gap-0' : 'gap-4'}`}>
                            <span>{item.icon}</span>
                            {!isCollapsed && t(item.label)}
                         </div>
                         {!isCollapsed && (isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />)}
                      </button>

                      {/* Only show subitems if expanded AND NOT collapsed. If collapsed, hiding subitems keeps it clean */}
                      {isExpanded && !isCollapsed && (
                          <div className="space-y-1">
                              {item.subItems!.map((sub, subIndex) => {
                                  const isSubActive = activeItem === sub.label;
                                  return (
                                    <button
                                        key={subIndex}
                                        onClick={() => onNavigate(sub.label)}
                                        className={`w-full flex items-center gap-4 pl-12 pr-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200
                                            ${isSubActive
                                            ? 'bg-[#1a1a1a] text-white border-l-4 border-white' 
                                            : 'hover:bg-[#1a1a1a] hover:text-white border-l-4 border-transparent text-gray-500'}`}
                                    >
                                        <span className={`${isSubActive ? 'text-white' : 'text-gray-500'}`}>{sub.icon}</span>
                                        {t(sub.label)}
                                    </button>
                                  )
                              })}
                          </div>
                      )}
                  </div>
              );
          }

          return (
            <button
              key={index}
              onClick={() => onNavigate(item.label)}
              className={`w-full flex items-center ${isCollapsed ? 'justify-center px-0' : 'gap-4 px-4'} py-3 text-sm font-medium rounded-lg transition-colors duration-200
                ${isParentActive
                  ? 'bg-[#1a1a1a] text-white border-l-4 border-white' 
                  : 'hover:bg-[#1a1a1a] hover:text-white border-l-4 border-transparent text-gray-500'}`}
              title={isCollapsed ? t(item.label) : undefined}
            >
              <span className={`${isParentActive ? 'text-white' : 'text-gray-500'}`}>{item.icon}</span>
              {!isCollapsed && t(item.label)}
            </button>
          );
        })}
      </nav>

      {/* Footer / Minimize */}
      <div className="p-4 border-t border-gray-900">
        <button 
            onClick={onToggle}
            className={`w-full flex items-center ${isCollapsed ? 'justify-center' : 'gap-2'} text-sm text-gray-500 hover:text-white transition-colors`}
            title={t('Minimize menu')}
        >
          <div className="bg-gray-900 p-1 rounded-full">
            {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
          </div>
          {!isCollapsed && t('Minimize menu')}
        </button>
      </div>
    </div>
  );
};
