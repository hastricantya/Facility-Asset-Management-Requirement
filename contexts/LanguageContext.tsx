
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
  'Daftar ATK': { id: 'Permintaan ATK', en: 'Stationery Request' },
  'Stationery Request Approval': { id: 'Persetujuan ATK', en: 'Stationery Request Approval' },
  'Master ATK': { id: 'Master ATK', en: 'Master Stationery' },
  'ARK': { id: 'ARK', en: 'Household' },
  'Daftar ARK': { id: 'Permintaan ARK', en: 'Household Request' },
  'Household Request Approval': { id: 'Persetujuan ARK', en: 'Household Request Approval' },
  'Master ARK': { id: 'Master ARK', en: 'Master Household' },
  'Log Book': { id: 'Log Book', en: 'Log Book' },
  'Gedung': { id: 'Gedung', en: 'Building' },
  'Kontrak Gedung': { id: 'Kontrak Gedung', en: 'Building Contract' },
  'List Reminder Dokumen': { id: 'Reminder Dokumen', en: 'Document Reminder' },
  'Timesheet': { id: 'Absensi', en: 'Timesheet' },
  'Vendor': { id: 'Vendor', en: 'Vendor' },
  'Master Data': { id: 'Master Data', en: 'Master Data' },

  // UI General & Buttons (Image Sync)
  'Beranda': { id: 'Beranda', en: 'Home' },
  'Pemantauan Aset': { id: 'Pemantauan Aset', en: 'Asset Monitoring' },
  'Semua': { id: 'Semua', en: 'All' },
  'Persetujuan': { id: 'Persetujuan', en: 'Approval' },
  'Impor': { id: 'Impor', en: 'Import' },
  'Ekspor': { id: 'Ekspor', en: 'Export' },
  'Saring': { id: 'Saring', en: 'Filter' },
  'Buat Permintaan': { id: 'Buat Permintaan', en: 'Create Request' },
  'Belum ada data': { id: 'Belum ada data', en: 'No data available' },
  'Belum ada permintaan Pajak & KIR yang dibuat.': { id: 'Belum ada permintaan Pajak & KIR yang dibuat.', en: 'No Tax & KIR requests have been created.' },
  'Cari berdasarkan Karyawan, Barang...': { id: 'Cari berdasarkan Karyawan, Barang...', en: 'Search by Employee, Item...' },
  'Aktif': { id: 'Aktif', en: 'Active' },
  'Tidak Aktif': { id: 'Tidak Aktif', en: 'Inactive' },
};

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
