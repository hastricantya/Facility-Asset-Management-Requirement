
import { AssetRecord, MasterItem, ContractRecord, TimesheetRecord, VendorRecord, VehicleRecord, ServiceRecord, TaxKirRecord, MutationRecord, SalesRecord, MasterVendorRecord, DeliveryLocationRecord, LogBookRecord } from './types';

// Helper function to generate mock data for ATK/ARK
const generateAssetData = (type: 'ATK' | 'ARK', startId: number): AssetRecord[] => {
  const statuses: AssetRecord['status'][] = ['Draft', 'Pending', 'Rejected', 'Approved', 'Closed'];
  const data: AssetRecord[] = [];
  let idCounter = startId;

  const employees = [
    { name: 'Aan Junaidi', role: 'Technician Team Leader', phone: '08123456789' },
    { name: 'Budi Santoso', role: 'Staff Admin', phone: '08129876543' },
    { name: 'Citra Lestari', role: 'HRGA Manager', phone: '08134567890' },
    { name: 'Dewi Putri', role: 'Finance Staff', phone: '08145678901' },
    { name: 'Eko Prasetyo', role: 'General Affair', phone: '08156789012' }
  ];

  const itemsATK = [
      { name: 'HP Laserjet 204A Black', cat: 'Tinta Printer', code: 'TP-HP0048' },
      { name: 'Kertas A4 70gr', cat: 'Kertas', code: 'KRT-A4-70' },
      { name: 'Pulpen Standard AE7', cat: 'Alat Tulis', code: 'ATK-PEN-01' },
      { name: 'Baterai AA Alkaline', cat: 'Elektronik', code: 'EL-BAT-AA' },
      { name: 'Map Plastik Clear', cat: 'Filing', code: 'FIL-MAP-01' }
  ];

  const itemsARK = [
      { name: 'Wipol Karbol', cat: 'Pembersih', code: 'CL-WPL-01' },
      { name: 'Tisu Nice 250s', cat: 'Tisu', code: 'TS-NIC-250' },
      { name: 'Sabun Cuci Tangan', cat: 'Kebersihan', code: 'SOAP-HW-01' },
      { name: 'Pengharum Ruangan', cat: 'Kebersihan', code: 'AIR-FRESH-01' },
      { name: 'Lampu LED 10W', cat: 'Elektronik', code: 'LMP-LED-10' }
  ];

  const items = type === 'ATK' ? itemsATK : itemsARK;

  // Create 5 records for each status
  statuses.forEach(status => {
    for (let i = 0; i < 5; i++) {
      const emp = employees[i % employees.length];
      const item = items[i % items.length];
      
      data.push({
        id: idCounter++,
        transactionNumber: `TRX/${type}/${new Date().getFullYear()}/${idCounter.toString().padStart(4, '0')}`,
        employee: {
          name: emp.name,
          phone: emp.phone,
          role: emp.role,
          avatar: `https://i.pravatar.cc/150?u=${idCounter + 50}` // Random avatar seed
        },
        category: item.cat,
        itemName: item.name,
        itemDescription: `Permintaan rutin ${type} untuk kebutuhan operasional.`,
        qty: Math.floor(Math.random() * 10) + 1,
        date: new Date().toISOString().split('T')[0],
        remainingStock: Math.floor(Math.random() * 50) + 5,
        itemCode: item.code,
        status: status
      });
    }
  });

  return data;
};

// Generate 25 records for ATK (5 per status)
export const MOCK_DATA: AssetRecord[] = generateAssetData('ATK', 1);

// Generate 25 records for ARK (5 per status)
export const MOCK_ARK_DATA: AssetRecord[] = generateAssetData('ARK', 100);

export const MOCK_MASTER_DATA: MasterItem[] = [
  { id: 1, category: 'Tinta Printer', itemName: 'HP Laserjet 204A Black', itemCode: 'TP-HP0048', uom: 'Pcs', remainingStock: 5, minimumStock: 2, maximumStock: 10, requestedStock: 0, purchaseDate: '27/08/2008', lastPurchasePrice: 'Rp. 22.000', averagePrice: 'Rp. 21.082' },
  { id: 2, category: 'Kertas', itemName: 'Kertas A4 70gr', itemCode: 'KRT-A4-70', uom: 'Rim', remainingStock: 50, minimumStock: 10, maximumStock: 100, requestedStock: 5, purchaseDate: '01/03/2024', lastPurchasePrice: 'Rp. 45.000', averagePrice: 'Rp. 44.500' },
  { id: 3, category: 'Alat Tulis', itemName: 'Pulpen Standard AE7', itemCode: 'ATK-PEN-01', uom: 'Pcs', remainingStock: 120, minimumStock: 20, maximumStock: 200, requestedStock: 0, purchaseDate: '15/02/2024', lastPurchasePrice: 'Rp. 2.500', averagePrice: 'Rp. 2.400' }
];

export const MOCK_MASTER_ARK_DATA: MasterItem[] = [
  { id: 1, category: 'Pembersih', itemName: 'Wipol Karbol', itemCode: 'CL-WPL-01', uom: 'Pcs', remainingStock: 10, minimumStock: 5, maximumStock: 20, requestedStock: 0, purchaseDate: '10/03/2024', lastPurchasePrice: 'Rp. 15.000', averagePrice: 'Rp. 14.800' },
  { id: 2, category: 'Tisu', itemName: 'Tisu Nice 250s', itemCode: 'TS-NIC-250', uom: 'Pack', remainingStock: 30, minimumStock: 10, maximumStock: 50, requestedStock: 10, purchaseDate: '12/03/2024', lastPurchasePrice: 'Rp. 8.000', averagePrice: 'Rp. 7.900' }
];

export const MOCK_CONTRACT_DATA: ContractRecord[] = [
    {
        id: 1,
        assetNumber: 'AST/BLD/2023/001',
        assetCategory: 'Building',
        ownership: 'Rent',
        type: 'Ruko',
        location: 'Branch Jakarta',
        channel: 'HCO',
        subLocation: '-',
        department: 'General Affair',
        address: 'Jl. Prof. Dr. Satrio C-4 No. 13',
        status: 'Active'
    }
];

export const MOCK_TIMESHEET_DATA: TimesheetRecord[] = [];
export const MOCK_VENDOR_DATA: VendorRecord[] = [];
export const MOCK_MASTER_VENDOR_DATA: MasterVendorRecord[] = [];

export const MOCK_VEHICLE_DATA: VehicleRecord[] = [
    { id: 1, noRegistrasi: 'REG/2023/001', nama: 'Grand Max Blind Van', noPolisi: 'B 1234 CD', channel: 'HCO', cabang: 'Jakarta', status: 'Aktif', tahunPembuatan: '2020' },
    { id: 2, noRegistrasi: 'REG/2023/002', nama: 'Toyota Avanza', noPolisi: 'B 5678 EF', channel: 'Management', cabang: 'Bandung', status: 'Aktif', tahunPembuatan: '2021' }
];

export const MOCK_SERVICE_DATA: ServiceRecord[] = [];

export const MOCK_TAX_KIR_DATA: TaxKirRecord[] = [
    {
        id: 'REQ/KIR/2024/001',
        noPolisi: 'B 1234 CD',
        tglRequest: '2024-03-15',
        jenis: 'KIR',
        channel: 'HCO',
        cabang: 'Jakarta',
        status: 'Draft',
        statusApproval: '-',
        aset: 'Grand Max Blind Van',
        tahunPembuatan: '2020',
        vendor: 'Bengkel Resmi Daihatsu',
        estimasiBiaya: '1500000',
        jenisPembayaran: 'Kasbon'
    }
];

export const MOCK_MUTATION_DATA: MutationRecord[] = [];
export const MOCK_SALES_DATA: SalesRecord[] = [];
export const MOCK_DELIVERY_LOCATIONS: DeliveryLocationRecord[] = [];

export const MOCK_LOGBOOK_DATA: LogBookRecord[] = [
  {
    id: 1,
    lokasiModena: 'MODENA Head Office',
    kategoriTamu: 'Customer',
    namaTamu: 'Budi Santoso',
    tanggalKunjungan: '2024-03-20',
    jamDatang: '09:00',
    jamPulang: '11:30',
    wanita: 0,
    lakiLaki: 1,
    anakAnak: 0,
    note: 'Meeting regarding kitchen set installation.'
  },
  {
    id: 2,
    lokasiModena: 'MODENA Kemang',
    kategoriTamu: 'Supplier',
    namaTamu: 'Siti Aminah',
    tanggalKunjungan: '2024-03-20',
    jamDatang: '10:15',
    jamPulang: '12:00',
    wanita: 1,
    lakiLaki: 0,
    anakAnak: 0,
    note: 'Delivery of spare parts for induction hobs.'
  },
  {
    id: 3,
    lokasiModena: 'MODENA Suryo',
    kategoriTamu: 'Partner',
    namaTamu: 'Robert Fox & Family',
    tanggalKunjungan: '2024-03-21',
    jamDatang: '14:00',
    jamPulang: '15:45',
    wanita: 1,
    lakiLaki: 1,
    anakAnak: 2,
    note: 'Experience center tour and product demonstration.'
  },
  {
    id: 4,
    lokasiModena: 'Warehouse Cakung',
    kategoriTamu: 'Other',
    namaTamu: 'Team AC Maintenance',
    tanggalKunjungan: '2024-03-21',
    jamDatang: '08:30',
    jamPulang: '17:00',
    wanita: 0,
    lakiLaki: 3,
    anakAnak: 0,
    note: 'Quarterly maintenance for warehouse cooling systems.'
  }
];
