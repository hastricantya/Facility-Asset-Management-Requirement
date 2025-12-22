
import { AssetRecord, MasterItem, ContractRecord, TimesheetRecord, VendorRecord, VehicleRecord, ServiceRecord, TaxKirRecord, MutationRecord, SalesRecord, MasterVendorRecord, DeliveryLocationRecord, LogBookRecord, BuildingRecord, ReminderRecord, VehicleContractRecord } from './types';

const generateAssetData = (type: 'ATK' | 'ARK', startId: number): AssetRecord[] => {
  const statuses: AssetRecord['status'][] = ['Approved', 'Pending', 'Rejected', 'Closed', 'Draft'];
  const data: AssetRecord[] = [];
  let idCounter = startId;
  const employees = [
    { name: 'Aan Junaidi', role: 'Technician Team Leader', phone: '08123456789', avatar: 'https://i.pravatar.cc/150?u=aan' },
    { name: 'Budi Santoso', role: 'Staff Admin', phone: '08129876543', avatar: 'https://i.pravatar.cc/150?u=budi' },
    { name: 'Citra Lestari', role: 'HRGA Manager', phone: '08134567890', avatar: 'https://i.pravatar.cc/150?u=citra' }
  ];
  const itemsATK = [
      { name: 'HP Laserjet 204A Black', cat: 'Tinta Printer', code: 'TP-HP0048' },
      { name: 'Kertas A4 70gr', cat: 'Kertas', code: 'KRT-A4-70' }
  ];
  const itemsARK = [
      { name: 'Wipol Karbol', cat: 'Pembersih', code: 'CL-WPL-01' },
      { name: 'Tisu Nice 250s', cat: 'Tisu', code: 'TS-NIC-250' }
  ];
  const items = type === 'ATK' ? itemsATK : itemsARK;
  for (let i = 0; i < 15; i++) {
    const emp = employees[i % employees.length];
    const item = items[i % items.length];
    const status = statuses[i % statuses.length];
    data.push({
      id: idCounter++,
      transactionNumber: `TRX/${type}/${new Date().getFullYear()}/${idCounter.toString().padStart(4, '0')}`,
      employee: { ...emp, avatar: `https://i.pravatar.cc/150?u=${idCounter + 50}` },
      category: item.cat,
      itemName: item.name,
      itemDescription: `Permintaan rutin ${type} untuk operasional kantor.`,
      qty: Math.floor(Math.random() * 10) + 1,
      date: new Date(Date.now() - i * 86400000).toISOString().split('T')[0].split('-').reverse().join('/'),
      remainingStock: Math.floor(Math.random() * 50) + 5,
      itemCode: item.code,
      status: status
    });
  }
  return data;
};

export const MOCK_DATA: AssetRecord[] = generateAssetData('ATK', 1);
export const MOCK_ARK_DATA: AssetRecord[] = generateAssetData('ARK', 100);

export const MOCK_MASTER_DATA: MasterItem[] = [
  { id: 1, category: 'Tinta Printer', itemName: 'HP Laserjet 204A Black', itemCode: 'TP-HP0048', uom: 'Pcs', remainingStock: 5, minimumStock: 2, maximumStock: 10, requestedStock: 0, purchaseDate: '27/08/2008', lastPurchasePrice: 'Rp. 22.000', averagePrice: 'Rp. 21.082' }
];

export const MOCK_MASTER_ARK_DATA: MasterItem[] = [
  { id: 1, category: 'Pembersih', itemName: 'Wipol Karbol', itemCode: 'CL-WPL-01', uom: 'Pcs', remainingStock: 10, minimumStock: 5, maximumStock: 20, requestedStock: 0, purchaseDate: '10/03/2024', lastPurchasePrice: 'Rp. 15.000', averagePrice: 'Rp. 14.800' }
];

export const MOCK_BUILDING_DATA: BuildingRecord[] = [
    { id: '1', name: 'Gedung Pusat Satrio', assetNo: 'BDG-JKT-009', type: 'Head Office', ownership: 'Own', location: 'Jakarta', address: 'Jl. Prof. DR. Satrio No. C4', status: 'Close' },
    { id: '2', name: 'Warehouse Cikupa', assetNo: 'BDG-TNG-012', type: 'Warehouse', ownership: 'Rent', location: 'Tangerang', address: 'Kawasan Industri Cikupa Mas Blok B', status: 'Open', landlordName: 'PT Properti Jaya', rentalCost: '250000000', bankAccount: 'BCA 123456789', startDate: '2024-01-01', endDate: '2025-12-31' }
];

export const MOCK_REMINDER_DATA: ReminderRecord[] = [
    { id: 'REM-001', documentName: 'Kontrak Sewa Lantai 5', buildingName: 'Gedung Pusat Satrio', assetNo: 'BDG-JKT-009', expiryDate: '2024-12-31', daysRemaining: 15, status: 'Urgent' }
];

export const MOCK_GENERAL_MASTER_DATA = {
    jenisPajak: [{ id: 1, name: 'Pajak STNK 1 Tahun' }],
    jenisPembayaran: [{ id: 1, name: 'Kasbon' }],
    jenisServis: [{ id: 1, name: 'Servis Rutin' }],
    statusMutasi: [{ id: 1, name: 'Draft' }],
    statusPenjualan: [{ id: 1, name: 'Open for Bidding' }],
    statusRequest: [{ id: 1, name: 'New' }],
    tipeMutasi: [{ id: 1, name: 'Antar Cabang' }],
    tipeVendor: [{ id: 1, name: 'Bengkel Resmi' }],
    peran: [{ id: 1, name: 'Super Admin' }]
};

export const MOCK_VEHICLE_DATA: VehicleRecord[] = [
    { id: 1, noRegistrasi: 'REG/2023/001', nama: 'Grand Max Blind Van', noPolisi: 'B 9433 CCA', channel: 'Warehouse & Distribution', cabang: 'Pusat', status: 'Aktif', tahunPembuatan: '2020' }
];

export const MOCK_VEHICLE_CONTRACT_DATA: VehicleContractRecord[] = [
    { id: 'CON/VEH/001', noPolisi: 'B 9433 CCA', aset: 'Grand Max Blind Van', noKontrak: 'KTR/2023/X-091', vendor: 'PT Jaya Rental Indonesia', tglMulai: '2023-01-01', tglBerakhir: '2025-01-01', biayaSewa: '4500000', status: 'Aktif' }
];

export const MOCK_SERVICE_DATA: ServiceRecord[] = [
    { id: 'S2024060003', noPolisi: 'B 9433 CCA', aset: 'Grand Max Blind Van', tglRequest: '28 Jun 2024 17:24', tglStnk: '2025-04-12', channel: 'Warehouse & Distribution', cabang: 'Pusat', status: 'Draf', statusApproval: '-', jenisServis: 'Servis Rutin', vendor: 'Astra Toyota', targetSelesai: '2024-06-30', kmKendaraan: '45000', estimasiBiaya: '1250000', jenisPembayaran: 'Kasbon' }
];

export const MOCK_TAX_KIR_DATA: TaxKirRecord[] = [
    { id: 'REQ/KIR/2024/001', noPolisi: 'B 9433 CCA', tglRequest: '2024-03-15', jenis: 'KIR', channel: 'Warehouse & Distribution', cabang: 'Pusat', status: 'Draft', statusApproval: '-', aset: 'Grand Max Blind Van' }
];

export const MOCK_MASTER_VENDOR_DATA: MasterVendorRecord[] = [
    { id: 1, nama: 'PT Astra International', merek: 'Toyota', alamat: 'Jl. Gaya Motor No. 8', noTelp: '021-6522555', tipe: 'Authorized Dealer', cabang: 'Pusat', aktif: true }
];

export const MOCK_MUTATION_DATA: MutationRecord[] = [];
export const MOCK_SALES_DATA: SalesRecord[] = [];
export const MOCK_DELIVERY_LOCATIONS: DeliveryLocationRecord[] = [];
export const MOCK_LOGBOOK_DATA: LogBookRecord[] = [];
export const MOCK_TIMESHEET_DATA: TimesheetRecord[] = [];
export const MOCK_VENDOR_DATA: VendorRecord[] = [];
