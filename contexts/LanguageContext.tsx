
import React, { createContext, useState, useContext, ReactNode } from 'react';

type Language = 'id' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations: Record<string, Record<Language, string>> = {
  // Sidebar & Modules
  'Dashboard': { id: 'Dashboard', en: 'Dashboard' },
  'Kendaraan': { id: 'Kendaraan', en: 'Vehicle' },
  'Daftar Aset': { id: 'Daftar Aset', en: 'Asset List' },
  'Kontrak Kendaraan': { id: 'Kontrak Kendaraan', en: 'Vehicle Contract' },
  'Servis': { id: 'Servis', en: 'Service' },
  'Pajak & KIR': { id: 'Pajak & KIR', en: 'Tax & KIR' },
  'Mutasi': { id: 'Mutasi', en: 'Mutation' },
  'Penjualan': { id: 'Penjualan', en: 'Sales' },
  'ATK': { id: 'ATK', en: 'Stationery' },
  'Request ATK': { id: 'Permintaan ATK', en: 'Stationery Request' },
  'Stationery Request Approval': { id: 'Persetujuan ATK', en: 'Stationery Request Approval' },
  'Master ATK': { id: 'Master ATK', en: 'Master Stationery' },
  'Stock Opname': { id: 'Stock Opname', en: 'Stock Opname' },
  'Stock Opname Approval': { id: 'Persetujuan Opname', en: 'Stock Opname Approval' },
  
  'ARK': { id: 'ARK', en: 'Household' },
  'Daftar ARK': { id: 'Permintaan ARK', en: 'Household Request' },
  'Household Request Approval': { id: 'Persetujuan ARK', en: 'Household Request Approval' },
  'Master ARK': { id: 'Master ARK', en: 'Master Household' },

  'Log Book': { id: 'Log Book', en: 'Log Book' },
  'Locker': { id: 'Loker', en: 'Locker' },
  'Daftar Loker': { id: 'Daftar Loker', en: 'Locker List' },
  'Request Locker': { id: 'Permintaan Loker', en: 'Request Locker' },
  
  'MODENA Pod': { id: 'MODENA Pod', en: 'MODENA Pod' },
  'Pod Census': { id: 'Sensus Pod', en: 'Pod Census' },
  'Request MODENA Pod': { id: 'Permintaan Pod', en: 'Request MODENA Pod' },

  'Gedung': { id: 'Gedung', en: 'Building' },
  'Contract': { id: 'Kontrak', en: 'Contract' },
  'Timesheet': { id: 'Absensi', en: 'Timesheet' },
  'Vendor': { id: 'Vendor', en: 'Vendor' },
  'Credit Card': { id: 'Kartu Kredit', en: 'Credit Card' },
  'Master Data': { id: 'Master Data', en: 'Master Data' },
  'Project Mgmt': { id: 'Manajemen Proyek', en: 'Project Mgmt' },
  
  // Master Sub-items
  'Jenis Pajak': { id: 'Jenis Pajak', en: 'Tax Type' },
  'Jenis Pembayaran': { id: 'Jenis Pembayaran', en: 'Payment Type' },
  'Jenis Servis': { id: 'Jenis Servis', en: 'Service Type' },
  'Status Mutasi': { id: 'Status Mutasi', en: 'Mutation Status' },
  'Status Penjualan': { id: 'Status Penjualan', en: 'Sales Status' },
  'Status Request': { id: 'Status Request', en: 'Request Status' },
  'Tipe Mutasi': { id: 'Tipe Mutasi', en: 'Mutation Type' },
  'Tipe Vendor': { id: 'Tipe Vendor', en: 'Vendor Type' },
  'Role': { id: 'Peran', en: 'Role' },
  'Master Vendor': { id: 'Master Vendor', en: 'Master Vendor' },
  
  // Tabs for Master ATK
  'Items': { id: 'Barang', en: 'Items' },
  'UOM': { id: 'Satuan (UOM)', en: 'UOM' },
  'Currency': { id: 'Mata Uang', en: 'Currency' },
  'Category': { id: 'Kategori', en: 'Category' },
  'Delivery Location': { id: 'Lokasi Pengiriman', en: 'Delivery Location' },

  // Tabs & Buttons
  'Pengguna': { id: 'Pengguna', en: 'User' },
  'Master': { id: 'Master', en: 'Master' },
  'Approval': { id: 'Persetujuan', en: 'Approval' },
  'Approved': { id: 'Disetujui', en: 'Approved' },
  'Rejected': { id: 'Ditolak', en: 'Rejected' },
  'Pending': { id: 'Waiting Approval', en: 'Waiting Approval' },
  'Closed': { id: 'Selesai', en: 'Closed' },
  'Own': { id: 'Milik Sendiri', en: 'Own' },
  'Rent': { id: 'Sewa', en: 'Rent' },
  'All': { id: 'Semua', en: 'All' },
  'Permanent': { id: 'Tetap', en: 'Permanent' },
  'Probation': { id: 'Percobaan', en: 'Probation' },
  'Internship': { id: 'Magang', en: 'Internship' },
  'Active': { id: 'Aktif', en: 'Active' },
  'Inactive': { id: 'Tidak Aktif', en: 'Inactive' },
  'Blacklist': { id: 'Daftar Hitam', en: 'Blacklist' },
  'Aktif': { id: 'Aktif', en: 'Active' },
  'Tidak Aktif': { id: 'Tidak Aktif', en: 'Inactive' },
  'Semua': { id: 'Semua', en: 'All' },
  'Persetujuan': { id: 'Persetujuan', en: 'Approval' },
  'On Progress': { id: 'Sedang Berjalan', en: 'On Progress' },
  
  // Locker Tabs
  'Terisi': { id: 'Terisi', en: 'Occupied' },
  'Kosong': { id: 'Kosong', en: 'Empty' },
  'Kunci Hilang': { id: 'Kunci Hilang', en: 'Lost Key' },

  // Action Buttons
  'Revise': { id: 'Revisi', en: 'Revise' },
  'Reject': { id: 'Tolak', en: 'Reject' },
  'Approve': { id: 'Setujui', en: 'Approve' },

  // UI Elements
  'Search': { id: 'Cari', en: 'Search' },
  'Search Menu': { id: 'Cari Menu', en: 'Search Menu' },
  'Filter': { id: 'Saring', en: 'Filter' },
  'Import': { id: 'Impor', en: 'Import' },
  'Export': { id: 'Ekspor', en: 'Export' },
  'Download': { id: 'Unduh', en: 'Download' },
  'Add': { id: 'Tambah', en: 'Add' },
  'Create Request': { id: 'Buat Permintaan', en: 'Create Request' },
  'Add Vendor': { id: 'Tambah Vendor', en: 'Add Vendor' },
  'Add Asset': { id: 'Tambah Aset', en: 'Add Asset' },
  'Minimize menu': { id: 'Kecilkan menu', en: 'Minimize menu' },
  'Import Data Vendor': { id: 'Import Data Vendor', en: 'Import Vendor Data' },
  'Add Data': { id: 'Tambah Data', en: 'Add Data' },
  
  // Log Book Filters
  'Semua Lokasi': { id: 'Semua Lokasi', en: 'All Locations' },
  'Semua Kategori': { id: 'Semua Kategori', en: 'All Categories' },

  // Headers
  'Daftar Aset Kendaraan': { id: 'Daftar Aset Kendaraan', en: 'Vehicle Asset List' },
  'Servis Kendaraan': { id: 'Servis Kendaraan', en: 'Vehicle Service' },
  'Pajak & KIR Kendaraan': { id: 'Pajak & KIR Kendaraan', en: 'Vehicle Tax & KIR' },
  'Mutasi Kendaraan': { id: 'Mutasi Kendaraan', en: 'Vehicle Mutation' },
  'Penjualan Kendaraan': { id: 'Penjualan Kendaraan', en: 'Vehicle Sales' },
  'List Building': { id: 'Daftar Gedung', en: 'Building List' },
  'Daftar Aset ATK': { id: 'Permintaan ATK', en: 'Stationery Request' },
  'Header Stationery Request Approval': { id: 'Persetujuan Permintaan ATK', en: 'Stationery Request Approval' },
  'Master Data ATK': { id: 'Master Data ATK', en: 'Master Stationery Data' },
  'Header Household Request Approval': { id: 'Persetujuan Permintaan ARK', en: 'Household Request Approval' },
  'Master Data ARK': { id: 'Master Data ARK', en: 'Master Household Data' },
  'Request ARK': { id: 'Request ARK', en: 'Household Request' },
  'Log Book Tamu Input': { id: 'Log Book Tamu Input', en: 'Guest Log Book Input' },
  
  // Filter Bar specific
  'Employment Status': { id: 'Status Karyawan', en: 'Employment Status' },
  'Select Employee': { id: 'Pilih Karyawan', en: 'Select Employee' },
  'Select Date': { id: 'Pilih Tanggal', en: 'Select Date' },
  'Attendance Status': { id: 'Status Kehadiran', en: 'Attendance Status' },
  'Date Range': { id: 'Rentang Tanggal', en: 'Date Range' },
  'Select Category...': { id: 'Pilih Kategori...', en: 'Select Category...' },

  // Stationery Request Form
  'Form Request': { id: 'Form Request', en: 'Request Form' },
  'Pilih Kebutuhan': { id: 'Pilih Kebutuhan', en: 'Select Need' },
  'Pilih jenis item ATK': { id: 'Pilih jenis item ATK', en: 'Select Stationery Type' },
  'Pilih jenis item ARK': { id: 'Pilih jenis item ARK', en: 'Select Household Type' },
  'Permintaan Bulanan': { id: 'Permintaan Bulanan', en: 'Monthly Request' },
  'Permintaan Khusus': { id: 'Permintaan Khusus', en: 'Special Request' },
  
  'Pilih barang ATK': { id: 'Pilih barang ATK', en: 'Select Item' },
  'Search ATK': { id: 'Cari ATK', en: 'Search Stationery' },
  'Search ARK': { id: 'Cari ARK', en: 'Search Household' },
  'Jumlah': { id: 'Jumlah', en: 'Quantity' },
  'Add More': { id: 'Tambah', en: 'Add More' },
  'Tanggal Request': { id: 'Tanggal Request', en: 'Request Date' },
  'Remarks': { id: 'Keterangan', en: 'Remarks' },
  'Dikirim': { id: 'Dikirim', en: 'Delivery' },
  'Ambil di HO': { id: 'Ambil di HO', en: 'Pickup at HO' },
  'Alamat Pengiriman': { id: 'Alamat Pengiriman', en: 'Delivery Address' },
  'Pilih Tempat': { id: 'Pilih Tempat', en: 'Select Location' },
  'Head Office': { id: 'Head Office', en: 'Head Office' },
  'MODENA Head Office': { id: 'MODENA Head Office', en: 'MODENA Head Office' },
  'MODENA Kemang': { id: 'MODENA Kemang', en: 'MODENA Kemang' },
  'MODENA Suryo': { id: 'MODENA Suryo', en: 'MODENA Suryo' },
  'Warehouse Cakung': { id: 'Warehouse Cakung', en: 'Warehouse Cakung' },

  'REVIEW REQUEST': { id: 'TINJAU PERMINTAAN', en: 'REVIEW REQUEST' },
  'CANCEL': { id: 'BATAL', en: 'CANCEL' },
  'Isi Remarks': { id: 'Isi Keterangan', en: 'Enter Remarks' },

  // Modal
  'Simpan': { id: 'Simpan', en: 'Save' },
  'Draft': { id: 'Draft', en: 'Draft' },
  'Submit': { id: 'Kirim', en: 'Submit' },
  'Cancel': { id: 'Batal', en: 'Cancel' },
  'Detail Informasi': { id: 'Detail Informasi', en: 'Detail Information' },
  'Surat': { id: 'Surat', en: 'Letter' },
  'Tamu': { id: 'Tamu', en: 'Guest' },
  'Tambah Tamu': { id: 'Tambah Tamu', en: 'Add Guest' },
  'Lokasi MODENA': { id: 'Lokasi MODENA', en: 'MODENA Location' },
  'Kategori Tamu': { id: 'Kategori Tamu', en: 'Guest Category' },
  'Nama Tamu': { id: 'Nama Tamu', en: 'Guest Name' },
  'Tanggal Kunjungan': { id: 'Tanggal Kunjungan', en: 'Visit Date' },
  'Jam Datang': { id: 'Jam Datang', en: 'Arrival Time' },
  'Jam Pulang': { id: 'Jam Pulang', en: 'Departure Time' },
  'Wanita': { id: 'Wanita', en: 'Female' },
  'LakiLaki': { id: 'Laki-Laki', en: 'Male' },
  'AnakAnak': { id: 'Anak-Anak', en: 'Children' },
  'Note': { id: 'Catatan', en: 'Note' },
  'No data available': { id: 'Tidak ada data', en: 'No data available' },
  'Baru': { id: 'Baru', en: 'New' },
  'Permintaan Mutasi Kendaraan': { id: 'Permintaan Mutasi Kendaraan', en: 'Vehicle Mutation Request' },
  'Permintaan Penjualan': { id: 'Permintaan Penjualan', en: 'Sales Request' },
  'Tambah Stock': { id: 'Tambah Stok', en: 'Add Stock' },
  'Nama Vendor': { id: 'Nama Vendor', en: 'Vendor Name' },
  'Alamat': { id: 'Alamat', en: 'Address' },
  'Request Servis': { id: 'Permintaan Servis', en: 'Service Request' },
  'Location Name': { id: 'Nama Lokasi', en: 'Location Name' },
  'Address': { id: 'Alamat', en: 'Address' },
  'Type': { id: 'Tipe', en: 'Type' },
  'Action': { id: 'Aksi', en: 'Action' },
};

// Added useLanguage hook export to fix "has no exported member 'useLanguage'" errors
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('id');

  const t = (key: string): string => {
    if (!translations[key]) return key;
    return translations[key][language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
