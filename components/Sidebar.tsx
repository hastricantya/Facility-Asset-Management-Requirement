
import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  FileText, 
  Clock, 
  Users, 
  Home, 
  BookOpen, 
  ChevronLeft,
  ChevronRight,
  Car,
  Database,
  Wrench,
  Send,
  DollarSign,
  ChevronDown,
  ChevronUp,
  X,
  Building,
  Briefcase,
  Bell,
  ShieldCheck,
  CreditCard,
  Settings,
  UserCheck,
  Box,
  House,
  Monitor
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface Props {
  activeItem: string;
  onNavigate: (label: string) => void;
  isCollapsed: boolean;
  onToggle: () => void;
  isMobileOpen?: boolean;
  onCloseMobile?: () => void;
}

interface MenuItem {
    label: string;
    icon: React.ReactNode;
    subItems?: MenuItem[];
}

export const Sidebar: React.FC<Props> = ({ 
  activeItem, 
  onNavigate, 
  isCollapsed, 
  onToggle, 
  isMobileOpen, 
  onCloseMobile 
}) => {
  const { t } = useLanguage();
  const [expandedMenus, setExpandedMenus] = useState<string[]>(['Kendaraan', 'Gedung', 'ATK', 'ARK', 'Master Data']);

  const toggleMenu = (label: string) => {
    if (isCollapsed) {
        onToggle();
        if (!expandedMenus.includes(label)) {
             setExpandedMenus(prev => [...prev, label]);
        }
    } else {
        setExpandedMenus(prev => 
            prev.includes(label) ? prev.filter(item => item !== label) : [...prev, label]
        );
    }
  };

  const menuItems: MenuItem[] = [
    { label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { 
        label: 'Kendaraan', 
        icon: <Car size={20} />,
        subItems: [
            { label: 'Daftar Aset', icon: <Database size={18} /> },
            { label: 'Kontrak Kendaraan', icon: <Briefcase size={18} /> },
            { label: 'Servis', icon: <Wrench size={18} /> },
            { label: 'Pajak & KIR', icon: <FileText size={18} /> },
            { label: 'Mutasi', icon: <Send size={18} /> },
            { label: 'Penjualan', icon: <DollarSign size={18} /> },
        ]
    },
    { 
        label: 'ATK', 
        icon: <Box size={20} />,
        subItems: [
            { label: 'Daftar ATK', icon: <Database size={18} /> },
            { label: 'Stationery Request Approval', icon: <UserCheck size={18} /> },
            { label: 'Master ATK', icon: <Settings size={18} /> },
        ]
    },
    { 
        label: 'ARK', 
        icon: <House size={20} />,
        subItems: [
            { label: 'Daftar ARK', icon: <Database size={18} /> },
            { label: 'Household Request Approval', icon: <UserCheck size={18} /> },
            { label: 'Master ARK', icon: <Settings size={18} /> },
        ]
    },
    { label: 'Log Book', icon: <BookOpen size={20} /> },
    { 
        label: 'Gedung', 
        icon: <Building size={20} />,
        subItems: [
             { label: 'Kontrak Gedung', icon: <FileText size={18} /> },
             { label: 'List Reminder Dokumen', icon: <Bell size={18} /> },
             { label: 'Office Equipment', icon: <Monitor size={18} /> },
        ]
    },
    { label: 'Timesheet', icon: <Clock size={20} /> },
    { label: 'Vendor', icon: <Users size={20} /> },
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
        { label: 'Peran', icon: <Wrench size={18} /> },
        { label: 'Master Vendor', icon: <Users size={18} /> },
      ]
    },
  ];

  const sidebarClasses = `
    fixed inset-y-0 left-0 z-40 bg-black text-gray-400 flex flex-col transition-all duration-300 border-r border-gray-800
    ${isMobileOpen ? 'translate-x-0 w-64' : '-translate-x-full lg:translate-x-0'}
    ${isCollapsed && !isMobileOpen ? 'lg:w-20' : 'lg:w-64'}
  `;

  return (
    <div className={sidebarClasses}>
      <div className={`p-6 flex items-center justify-between text-white mb-2`}>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 min-w-8 bg-white text-black rounded-full flex items-center justify-center font-bold text-xl">M</div>
          {(!isCollapsed || isMobileOpen) && (
              <div className="overflow-hidden whitespace-nowrap">
                  <h1 className="font-bold text-lg leading-none">MODENA</h1>
                  <p className="text-xs text-gray-500">Asset Management</p>
              </div>
          )}
        </div>
        {isMobileOpen && (
          <button onClick={onCloseMobile} className="lg:hidden p-1 hover:bg-gray-800 rounded">
            <X size={20} />
          </button>
        )}
      </div>

      <nav className="flex-1 overflow-y-auto custom-scrollbar px-2 space-y-1 mt-4">
        {menuItems.map((item, index) => {
          const hasSub = item.subItems && item.subItems.length > 0;
          const isExpanded = expandedMenus.includes(item.label);
          const isParentActive = activeItem === item.label || (item.subItems && item.subItems.some(sub => sub.label === activeItem)); 

          if (hasSub) {
              return (
                  <div key={index} className="space-y-1">
                      <button
                        onClick={() => toggleMenu(item.label)}
                        className={`w-full flex items-center ${(isCollapsed && !isMobileOpen) ? 'justify-center px-0' : 'justify-between px-4'} py-3 text-sm font-medium rounded-lg transition-colors duration-200 hover:bg-[#1a1a1a] hover:text-white ${isParentActive ? 'text-white bg-[#1a1a1a]' : 'text-gray-500'}`}
                      >
                         <div className={`flex items-center ${(isCollapsed && !isMobileOpen) ? 'gap-0' : 'gap-4'}`}>
                            <span>{item.icon}</span>
                            {(!isCollapsed || isMobileOpen) && t(item.label)}
                         </div>
                         {(!isCollapsed || isMobileOpen) && (isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />)}
                      </button>

                      {isExpanded && (!isCollapsed || isMobileOpen) && (
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
              className={`w-full flex items-center ${(isCollapsed && !isMobileOpen) ? 'justify-center px-0' : 'gap-4 px-4'} py-3 text-sm font-medium rounded-lg transition-colors duration-200
                ${isParentActive
                  ? 'bg-[#1a1a1a] text-white border-l-4 border-white' 
                  : 'hover:bg-[#1a1a1a] hover:text-white border-l-4 border-transparent text-gray-500'}`}
            >
              <span>{item.icon}</span>
              {(!isCollapsed || isMobileOpen) && t(item.label)}
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-900 hidden lg:block">
        <button 
            onClick={onToggle}
            className={`w-full flex items-center ${isCollapsed ? 'justify-center' : 'gap-2'} text-sm text-gray-500 hover:text-white transition-colors`}
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
