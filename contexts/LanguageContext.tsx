
import React, { createContext, useState, useContext, ReactNode } from 'react';

type Language = 'id' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<string, Record<Language, string>> = {
  // Sidebar & Modules
  'Dashboard': { id: 'Dashboard', en: 'Dashboard' },
  'Kendaraan': { id: 'Kendaraan', en: 'Vehicle' },
  'Daftar Aset': { id: 'Daftar Aset', en: 'Asset List' },
  'Servis': { id: 'Servis', en: 'Service' },
  'Pajak & KIR': { id: 'Pajak & KIR', en: 'Tax & KIR' },
  'Mutasi': { id: 'Mutasi', en: 'Mutation' },
  'Penjualan': { id: 'Penjualan', en: 'Sales' },
  'ATK': { id: 'ATK', en: 'Stationery' },
  'Daftar ATK': { id: 'Permintaan ATK', en: 'Stationery Request' },
  'Master ATK': { id: 'Master ATK', en: 'Master Stationery' },
  'ARK': { id: 'ARK', en: 'Household' },
  'Contract': { id: 'Kontrak', en: 'Contract' },
  'Timesheet': { id: 'Absensi', en: 'Timesheet' },
  'Vendor': { id: 'Vendor', en: 'Vendor' },
  'Credit Card': { id: 'Kartu Kredit', en: 'Credit Card' },
  'Master Data': { id: 'Master Data', en: 'Master Data' },
  'Log Book': { id: 'Buku Log', en: 'Log Book' },
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

  // Tabs & Buttons
  'Pengguna': { id: 'Pengguna', en: 'User' },
  'Master': { id: 'Master', en: 'Master' },
  'Approval': { id: 'Persetujuan', en: 'Approval' },
  'Approved': { id: 'Disetujui', en: 'Approved' },
  'Rejected': { id: 'Ditolak', en: 'Rejected' },
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
  
  // Headers
  'Daftar Aset Kendaraan': { id: 'Daftar Aset Kendaraan', en: 'Vehicle Asset List' },
  'Servis Kendaraan': { id: 'Servis Kendaraan', en: 'Vehicle Service' },
  'Pajak & KIR Kendaraan': { id: 'Pajak & KIR Kendaraan', en: 'Vehicle Tax & KIR' },
  'Mutasi Kendaraan': { id: 'Mutasi Kendaraan', en: 'Vehicle Mutation' },
  'Penjualan Kendaraan': { id: 'Penjualan Kendaraan', en: 'Vehicle Sales' },
  'List Building': { id: 'Daftar Gedung', en: 'Building List' },
  'Daftar Aset ATK': { id: 'Permintaan ATK', en: 'Stationery Request' },
  'Master Data ATK': { id: 'Master Data ATK', en: 'Master Stationery Data' },
  
  // Filter Bar specific
  'Employment Status': { id: 'Status Karyawan', en: 'Employment Status' },
  'Select Employee': { id: 'Pilih Karyawan', en: 'Select Employee' },
  'Select Date': { id: 'Pilih Tanggal', en: 'Select Date' },
  'Attendance Status': { id: 'Status Kehadiran', en: 'Attendance Status' },
  'Date Range': { id: 'Rentang Tanggal', en: 'Date Range' },
  'Category': { id: 'Kategori', en: 'Category' },
  'Select Category...': { id: 'Pilih Kategori...', en: 'Select Category...' },

  // Modal
  'Simpan': { id: 'Simpan', en: 'Save' },
  'Draft': { id: 'Draft', en: 'Draft' },
  'Submit': { id: 'Kirim', en: 'Submit' },
  'Cancel': { id: 'Batal', en: 'Cancel' },
  'Detail Informasi': { id: 'Detail Informasi', en: 'Detail Information' },
  'Surat': { id: 'Surat', en: 'Documents' },
  'Pembelian': { id: 'Pembelian', en: 'Purchase' },
  'Asuransi': { id: 'Asuransi', en: 'Insurance' },
  'Lampiran': { id: 'Lampiran', en: 'Attachments' },
  'Request Servis': { id: 'Request Servis', en: 'Service Request' },
  'Permintaan Mutasi Kendaraan': { id: 'Permintaan Mutasi Kendaraan', en: 'Vehicle Mutation Request' },
  'Permintaan Penjualan': { id: 'Permintaan Penjualan', en: 'Sales Request' },
  'Penawaran': { id: 'Penawaran', en: 'Offers' },
  'Nama Vendor': { id: 'Nama Vendor', en: 'Vendor Name' },
  'Alamat': { id: 'Alamat', en: 'Address' },
  'Buat Vendor': { id: 'Buat Vendor', en: 'Create Vendor' },
  'Tambah Stock': { id: 'Tambah Stock', en: 'Add Stock' },
  'Baru': { id: 'Baru', en: 'New' },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('id');

  const t = (key: string): string => {
    // Return translation if exists, otherwise return the key itself
    if (translations[key] && translations[key][language]) {
      return translations[key][language];
    }
    return key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
