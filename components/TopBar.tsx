import React from 'react';
import { Bell, ChevronDown } from 'lucide-react';

export const TopBar: React.FC = () => {
  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 sticky top-0 z-10 shadow-sm">
      <div className="flex items-center gap-2 text-sm text-gray-500">
         <span className="font-medium text-gray-900">Home</span> / <span className="text-gray-900 font-medium">Asset Monitoring</span>
      </div>

      <div className="flex items-center gap-6">
        <div className="relative cursor-pointer">
          <Bell size={20} className="text-gray-400 hover:text-gray-600" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold px-1 rounded-full">99+</span>
        </div>
        
        <div className="h-8 w-[1px] bg-gray-200"></div>

        <div className="flex items-center gap-3 cursor-pointer">
          <div className="text-right hidden md:block">
            <p className="text-sm font-semibold text-gray-800">Muhammad Resa</p>
            <p className="text-xs text-gray-500">PT. Modena Indonesia</p>
          </div>
          <img 
            src="https://picsum.photos/id/1005/100/100" 
            alt="Profile" 
            className="w-10 h-10 rounded-full border border-gray-200 object-cover"
          />
          <ChevronDown size={16} className="text-gray-400" />
        </div>
      </div>
    </header>
  );
};