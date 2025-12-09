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

export interface ContractRecord {
  id: number;
  contractName: string;
  contractImage: string;
  category: string;
  startDate: string;
  endDate: string;
  reminderLevel: string;
  documentName: string;
  status: 'Active' | 'Inactive';
}

export interface TimesheetRecord {
  id: number;
  employee: Employee;
  date: string;
  dayType: string;
  task: string;
  clockIn: string;
  clockOut: string;
  status: 'Tepat Waktu' | 'Tidak Tepat Waktu' | 'Absen';
  photos: string[];
}

export interface SidebarItem {
  label: string;
  icon: React.ReactNode;
  active?: boolean;
}