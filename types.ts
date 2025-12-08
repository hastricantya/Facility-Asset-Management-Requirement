import React from 'react';

export interface Employee {
  name: string;
  phone: string;
  role: string;
  avatar: string;
}

export interface AssetRecord {
  id: number;
  employee: Employee;
  category: string;
  itemName: string;
  itemDescription: string;
  qty: number;
  date: string;
  remainingStock: number;
  itemCode: string;
  status: 'Approved' | 'Pending' | 'Rejected';
}

export interface MasterItem {
  id: number;
  category: string;
  itemName: string;
  itemCode: string;
  remainingStock: number;
  purchaseDate: string;
  lastPurchasePrice: string;
  averagePrice: string;
}

export interface SidebarItem {
  label: string;
  icon: React.ReactNode;
  active?: boolean;
}