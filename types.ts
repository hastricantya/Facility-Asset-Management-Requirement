
import React from 'react';

export interface Employee {
  name: string;
  phone: string;
  role: string;
  avatar: string;
  position?: string;
  department?: string;
}

export interface SparePart {
  name: string;
  qty: number;
  price: string;
}

export interface PurchaseRecord {
  id: string;
  date: string;
  vendorName: string;
  qty: number;
  unitPrice: string;
  totalPrice: string;
  status: 'Completed' | 'Pending' | 'Cancelled';
  attachmentUrl?: string;
}

export interface AssetRecord {
  id: number;
  transactionNumber?: string;
  employee: Employee;
  category: string;
  itemName: string;
  itemDescription: string;
  qty: number;
  date: string;
  remainingStock: number;
  itemCode: string;
  status: 'Approved' | 'Pending' | 'Rejected' | 'Closed' | 'Draft' | 'On Progress';
}

export interface LockerRequestRecord {
  id: number;
  transactionNumber: string;
  employee: Employee;
  date: string;
  status: 'Approved' | 'Pending' | 'Rejected' | 'Closed' | 'Draft';
  reason: string;
  preferredLocation?: string;
}

export interface PodRequestRecord {
  id: number;
  transactionNumber: string;
  employee: Employee;
  date: string;
  status: 'Approved' | 'Pending' | 'Rejected' | 'Closed' | 'Draft';
  reason: string;
  preferredFloor?: string;
  preferredRoomType?: string;
}

export interface BuildingRecord {
  id: string;
  name: string;
  assetNo: string;
  type: string;
  ownership: 'Own' | 'Rent';
  location: string;
  address: string;
  status: 'Open' | 'Close' | 'Draft';
  
  // Rental specifics
  landlordName?: string;
  rentalCost?: string;
  bankAccount?: string;
  startDate?: string;
  endDate?: string;
  
  // Ownership specifics
  certificateNo?: string;
  acquisitionValue?: string;
}

export interface ReminderRecord {
  id: string;
  documentName: string;
  buildingName: string;
  assetNo: string;
  expiryDate: string;
  daysRemaining: number;
  status: 'Urgent' | 'Warning' | 'Safe';
}

export interface VehicleRecord {
  id: number;
  noRegistrasi: string;
  nama: string;
  noPolisi: string;
  channel: string;
  cabang: string;
  status: 'Aktif' | 'Tidak Aktif';
  merek?: string;
  tipeKendaraan?: string;
  jenis?: string;
  model?: string;
  tahunPembuatan?: string;
  warna?: string;
  isiSilinder?: string;
  noRangka?: string;
  noMesin?: string;
  pengguna?: string;
  noBpkb?: string;
  keteranganBpkb?: string;
  masaBerlaku1?: string;
  masaBerlaku5?: string;
  masaBerlakuKir?: string;
  tglBeli?: string;
  hargaBeli?: string;
  noPolisAsuransi?: string;
  jangkaPertanggungan?: string;
}

export interface VehicleContractRecord {
  id: string;
  noPolisi: string;
  aset: string;
  noKontrak: string;
  vendor: string;
  tglMulai: string;
  tglBerakhir: string;
  biayaSewa: string;
  status: 'Aktif' | 'Selesai';
  keterangan?: string;
}

export interface ServiceRecord {
  id: string;
  noPolisi: string;
  tglRequest: string;
  channel: string;
  cabang: string;
  status: string;
  statusApproval: string;
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
  spareParts?: SparePart[];
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
  aset?: string;
  tahunPembuatan?: string;
  vendor?: string;
  estimasiBiaya?: string;
  jenisPembayaran?: string;
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
}

export interface LogBookRecord {
  id: number;
  lokasiModena: string;
  kategoriTamu: string;
  namaTamu: string;
  nomorHp?: string;
  email?: string;
  visitorCard?: string;
  noIdentitas?: string;
  tanggalKunjungan: string;
  jamDatang: string;
  jamPulang: string;
  wanita: number;
  lakiLaki: number;
  anakAnak: number;
  note: string;
}

export interface LockerHistoryEntry {
  id: number;
  date: string;
  name: string;
  department: string;
  status: string;
}

export interface LockerRecord {
  id: number;
  lockerNumber: string;
  location: string; // Floor info
  subLocation: 'Satrio' | 'Karang Asem' | '-';
  employee?: Employee;
  status: 'Terisi' | 'Kosong' | 'Kunci Hilang';
  spareKey: 'Ada' | 'Tidak Ada';
  lastUpdate: string;
  remarks: string;
  history?: LockerHistoryEntry[];
}

export interface PodHistory {
  id: number;
  namaPenghuni: string;
  posisi?: string;
  departemen?: string;
  nomorKamar: string;
  statusLokerBarang: string;
  statusLokerPantry: string;
  jadwalLaundry: string;
  startDate?: string;
  endDate?: string;
}

export interface ModenaPodRecord {
  id: number;
  lantai: string;
  jenisKamar: 'Single Bed' | 'Double Bed' | 'Quadruple Bed';
  nomorKamar: string;
  namaPenghuni: string;
  posisi?: string;
  departemen?: string;
  statusLokerBarang: 'Terpakai' | 'Tidak Terpakai' | 'Belum Dapat' | 'Extra Loker Terpakai';
  statusLokerPantry: 'Terpakai' | 'Tidak Terpakai' | 'Belum Dapat' | 'Extra Loker Terpakai';
  jadwalLaundry: string;
  keterangan: string;
  history?: PodHistory[];
}

export interface MasterItem {
  id: string | number;
  category: string;
  itemName: string;
  itemCode: string;
  uom: string;
  remainingStock: number;
  minimumStock: number;
  maximumStock: number;
  requestedStock: number;
  purchaseDate: string;
  lastPurchasePrice: string;
  averagePrice: string;
  imageUrl?: string;
  purchaseHistory?: PurchaseRecord[];
}

export interface StockOpnameRecord {
  id: number;
  opnameNumber: string;
  itemCode: string;
  itemName: string;
  category: string;
  systemQty: number;
  physicalQty: number;
  difference: number;
  date: string;
  performedBy: string;
  status: 'Matched' | 'Discrepancy' | 'Draft';
}

export interface StationeryRequestItem {
  itemId: string;
  qty: string;
  categoryId?: string;
  uom?: string;
}

export interface StationeryRequestRecord {
  type: string;
  date: string;
  remarks?: string;
  deliveryType: string;
  location: string;
  items: StationeryRequestItem[];
}

export interface ContractRecord {
  id: number;
  assetCategory: string;
  assetNumber: string;
  address: string;
  type: string;
  location: string;
  channel: string;
  subLocation: string;
  status: string;
  ownership?: string;
  department?: string;
}

export interface TimesheetRecord {
  id: string | number;
  employee: Employee;
  date: string;
  dayType: string;
  task: string;
  clockIn: string;
  clockOut: string;
  status: string;
  photos: string[];
}

export interface VendorRecord {
  id: string | number;
  vendorName: string;
  vendorCode: string;
  status: string;
}

export interface GeneralMasterItem {
  id: number;
  name: string;
}

export interface DeliveryLocationRecord {
  id: number;
  name: string;
  address: string;
  type: string;
}
