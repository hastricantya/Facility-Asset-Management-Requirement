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
  assetNumber: string;
  assetCategory: string;
  type: string;
  ownership: string;
  location: string;
  channel: string;
  department: string;
  subLocation: string;
  address: string;
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

export interface VendorRecord {
  id: number;
  vendorName: string;
  vendorCode: string;
  status: 'Active' | 'Inactive';
}

export interface VendorProjectHistory {
  id: number;
  projectNumber: string;
  startDate: string;
  endDate: string;
  period: string;
  totalCost: string;
  status: string;
}

export interface SidebarItem {
  label: string;
  icon: React.ReactNode;
  active?: boolean;
}

export interface VehicleRecord {
  id: number;
  noRegistrasi: string;
  nama: string;
  noPolisi: string;
  channel: string;
  cabang: string;
  status: 'Aktif' | 'Tidak Aktif';
  
  // Details
  merek?: string;
  tipeKendaraan?: string;
  jenis?: string;
  model?: string;
  tahunPembuatan?: string;
  warna?: string;
  isiSilinder?: string;
  noRangka?: string;
  noMesin?: string;
  
  // Pengguna
  pengguna?: string;

  // Surat
  noBpkb?: string;
  keteranganBpkb?: string;
  masaBerlaku1?: string;
  masaBerlaku5?: string;
  masaBerlakuKir?: string;

  // Pembelian
  tglBeli?: string;
  hargaBeli?: string;

  // Asuransi
  noPolisAsuransi?: string;
  jangkaPertanggungan?: string;
}

export interface ServiceRecord {
  id: string; // e.g. "S2024060003"
  noPolisi: string;
  tglRequest: string;
  channel: string;
  cabang: string;
  status: string; // e.g. "Draf"
  statusApproval: string; // e.g. "-"
  
  // Form Details
  aset?: string;
  tglStnk?: string;
  jenisServis?: string;
  vendor?: string;
  targetSelesai?: string;
  kmKendaraan?: string;
  masalah?: string;
  penyebab?: string;
  estimasiBiaya?: string;
  jenisPembayaran?: string;
  namaBank?: string;
  nomorRekening?: string;
}

export interface TaxKirRecord {
  id: string;
  noPolisi: string;
  tglRequest: string;
  jenis: string;
  channel: string;
  cabang: string;
  status: string;
  statusApproval: string;
}

export interface MutationRecord {
  id: string;
  noPolisi: string;
  cabangAset: string;
  tipeMutasi: string;
  tglPermintaan: string;
  lokasiAsal: string;
  lokasiTujuan: string;
  status: string;
  statusApproval: string;

  // Form Details
  channelAsal?: string;
  channelTujuan?: string;
  asetId?: string;
  alasan?: string;
}

export interface SalesOffer {
  nama: string;
  pic: string;
  phone: string;
  price: string;
}

export interface SalesRecord {
  id: string;
  noPolisi: string;
  tglRequest: string;
  channel: string;
  cabang: string;
  hargaTertinggi: string;
  status: string;
  statusApproval: string;

  // Form Details
  asetId?: string;
  targetSelesai?: string;
  alasan?: string;
  catatan?: string;
  offers?: SalesOffer[];
}

export interface GeneralMasterItem {
  id: number;
  name: string;
}

export interface MasterVendorRecord {
  id: number;
  nama: string;
  merek: string;
  alamat: string;
  noTelp: string;
  tipe: string;
  cabang: string;
  aktif: boolean;
  pic?: string;
}