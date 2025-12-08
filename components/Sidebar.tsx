import React from 'react';
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
  ChevronLeft
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const menuItems = [
    { label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { label: 'ATK', icon: <PenTool size={20} />, active: true },
    { label: 'ARK', icon: <ShoppingCart size={20} /> },
    { label: 'Contract', icon: <FileText size={20} /> },
    { label: 'Timesheet', icon: <Clock size={20} /> },
    { label: 'Vendor', icon: <Users size={20} /> },
    { label: 'Credit Card', icon: <CreditCard size={20} /> },
    { label: 'Master Asset', icon: <Home size={20} /> },
    { label: 'Log Book', icon: <BookOpen size={20} /> },
    { label: 'Project Mgmt', icon: <BarChart size={20} /> },
  ];

  return (
    <div className="w-64 bg-black text-gray-400 flex flex-col h-screen fixed left-0 top-0 border-r border-gray-800 z-20 transition-all duration-300">
      {/* Logo Area */}
      <div className="p-6 flex items-center gap-3 text-white mb-2">
        <div className="w-8 h-8 bg-white text-black rounded-full flex items-center justify-center font-bold text-xl">M</div>
        <div>
          <h1 className="font-bold text-lg leading-none">MODENA</h1>
          <p className="text-xs text-gray-500">Asset Management</p>
        </div>
      </div>

      {/* Search Menu Input */}
      <div className="px-4 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 text-gray-600" size={16} />
          <input 
            type="text" 
            placeholder="Search Menu" 
            className="w-full bg-[#1a1a1a] text-sm text-gray-300 pl-10 pr-4 py-2 rounded border border-gray-800 focus:outline-none focus:border-gray-600 placeholder-gray-600"
          />
        </div>
      </div>

      {/* Navigation List */}
      <nav className="flex-1 overflow-y-auto custom-scrollbar px-2 space-y-1">
        {menuItems.map((item, index) => (
          <button
            key={index}
            className={`w-full flex items-center gap-4 px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200
              ${item.active 
                ? 'bg-[#1a1a1a] text-white border-l-4 border-white' 
                : 'hover:bg-[#1a1a1a] hover:text-white border-l-4 border-transparent'}`}
          >
            <span className={`${item.active ? 'text-white' : 'text-gray-500'}`}>{item.icon}</span>
            {item.label}
          </button>
        ))}
      </nav>

      {/* Footer / Minimize */}
      <div className="p-4 border-t border-gray-900">
        <button className="flex items-center gap-2 text-sm text-gray-500 hover:text-white transition-colors">
          <div className="bg-gray-900 p-1 rounded-full">
            <ChevronLeft size={14} />
          </div>
          Minimize
        </button>
      </div>
    </div>
  );
};