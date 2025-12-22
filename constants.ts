
import { AssetRecord, MasterItem, ContractRecord, TimesheetRecord, VendorRecord, VehicleRecord, ServiceRecord, TaxKirRecord, MutationRecord, SalesRecord, MasterVendorRecord, DeliveryLocationRecord, LogBookRecord, BuildingRecord, ReminderRecord, VehicleContractRecord, GeneralMasterItem, StockOpnameRecord } from './types';

// Helper function to generate mock data for ATK/ARK
const generateAssetData = (type: 'ATK' | 'ARK', startId: number): AssetRecord[] => {
  const statuses: AssetRecord['status'][] = ['Approved', 'Pending', 'Rejected', 'Closed', 'Draft', 'On Progress'];
  const data: AssetRecord[] = [];
  let idCounter = startId;

  const employees = [
    { name: 'Aan Junaidi', role: 'Technician Team Leader', phone: '08123456789', avatar: 'https://i.pravatar.cc/150?u=aan' },
    { name: 'Budi Santoso', role: 'Staff Admin', phone: '08129876543', avatar: 'https://i.pravatar.cc/150?u=budi' },
    { name: 'Citra Lestari', role: 'HRGA Manager', phone: '08134567890', avatar: 'https://i.pravatar.cc/150?u=citra' },
    { name: 'Dewi Putri', role: 'Finance Staff', phone: '08145678901', avatar: 'https://i.pravatar.cc/150?u=dewi' },
    { name: 'Eko Prasetyo', role: 'General Affair', phone: '08156789012', avatar: 'https://i.pravatar.cc/150?u=eko' }
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

  // Create records
  for (let i = 0; i < 15; i++) {
    const emp = employees[i % employees.length];
    const item = items[i % items.length];
    const status = statuses[i % statuses.length];
    
    data.push({
      id: idCounter++,
      transactionNumber: `TRX/${type}/${new Date().getFullYear()}/${idCounter.toString().padStart(4, '0')}`,
      employee: {
        ...emp,
        avatar: `https://i.pravatar.cc/150?u=${idCounter + 50}`
      },
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
  { id: 1, category: 'Tinta Printer', itemName: 'HP Laserjet 204A Black', itemCode: 'TP-HP0048', uom: 'Pcs', remainingStock: 5, minimumStock: 2, maximumStock: 10, requestedStock: 0, purchaseDate: '27/08/2008', lastPurchasePrice: 'Rp. 22.000', averagePrice: 'Rp. 21.082' },
  { id: 2, category: 'Kertas', itemName: 'Kertas A4 70gr', itemCode: 'KRT-A4-70', uom: 'Rim', remainingStock: 50, minimumStock: 10, maximumStock: 100, requestedStock: 5, purchaseDate: '01/03/2024', lastPurchasePrice: 'Rp. 45.000', averagePrice: 'Rp. 44.500' },
  { id: 3, category: 'Alat Tulis', itemName: 'Pulpen Standard AE7', itemCode: 'ATK-PEN-01', uom: 'Pcs', remainingStock: 120, minimumStock: 20, maximumStock: 200, requestedStock: 0, purchaseDate: '15/02/2024', lastPurchasePrice: 'Rp. 2.500', averagePrice: 'Rp. 2.400' }
];

export const MOCK_MASTER_ARK_DATA: MasterItem[] = [
  { id: 1, category: 'Pembersih', itemName: 'Wipol Karbol', itemCode: 'CL-WPL-01', uom: 'Pcs', remainingStock: 10, minimumStock: 5, maximumStock: 20, requestedStock: 0, purchaseDate: '10/03/2024', lastPurchasePrice: 'Rp. 15.000', averagePrice: 'Rp. 14.800' },
  { id: 2, category: 'Tisu', itemName: 'Tisu Nice 250s', itemCode: 'TS-NIC-250', uom: 'Pack', remainingStock: 30, minimumStock: 10, maximumStock: 50, requestedStock: 10, purchaseDate: '12/03/2024', lastPurchasePrice: 'Rp. 8.000', averagePrice: 'Rp. 7.900' }
];

export const MOCK_STOCK_OPNAME_DATA: StockOpnameRecord[] = [
  { id: 1, opnameNumber: 'SO/ATK/2024/0001', itemCode: 'TP-HP0048', itemName: 'HP Laserjet 204A Black', category: 'Tinta Printer', systemQty: 5, physicalQty: 5, difference: 0, date: '2024-03-20', performedBy: 'Aan Junaidi', status: 'Matched' },
  { id: 2, opnameNumber: 'SO/ATK/2024/0002', itemCode: 'KRT-A4-70', itemName: 'Kertas A4 70gr', category: 'Kertas', systemQty: 50, physicalQty: 48, difference: -2, date: '2024-03-20', performedBy: 'Budi Santoso', status: 'Discrepancy' },
  { id: 3, opnameNumber: 'SO/ATK/2024/0003', itemCode: 'ATK-PEN-01', itemName: 'Pulpen Standard AE7', category: 'Alat Tulis', systemQty: 120, physicalQty: 120, difference: 0, date: '2024-03-20', performedBy: 'Citra Lestari', status: 'Matched' }
];

export const MOCK_UOM_DATA: GeneralMasterItem[] = [
    { id: 1, name: 'PCS' },
    { id: 2, name: 'RIM' },
    { id: 3, name: 'BOX' },
    { id: 4, name: 'PACK' },
    { id: 5, name: 'UNIT' }
];

export const MOCK_ATK_CATEGORY: GeneralMasterItem[] = [
    { id: 1, name: 'Tinta Printer' },
    { id: 2, name: 'Kertas' },
    { id: 3, name: 'Alat Tulis' },
    { id: 4, name: 'Filing' },
    { id: 5, name: 'Elektronik' }
];

export const MOCK_ARK_CATEGORY: GeneralMasterItem[] = [
    { id: 1, name: 'Pembersih' },
    { id: 2, name: 'Tisu' },
    { id: 3, name: 'Kebersihan' },
    { id: 4, name: 'Elektronik' }
];

export const MOCK_DELIVERY_LOCATIONS: DeliveryLocationRecord[] = [
    { id: 1, name: 'MODENA Head Office', address: 'Jl. Prof. DR. Satrio No. C4', type: 'HO' },
    { id: 2, name: 'MODENA Kemang', address: 'Jl. Kemang Selatan No. 150', type: 'Showroom' },
    { id: 3, name: 'Warehouse Cakung', address: 'Kawasan Industri Cakung Blok B', type: 'Warehouse' }
];

export const MOCK_BUILDING_DATA: BuildingRecord[] = [
    {
        id: '1',
        name: 'Gedung Pusat Satrio',
        assetNo: 'BDG-JKT-009',
        type: 'Head Office',
        ownership: 'Own',
        location: 'Jakarta',
        address: 'Jl. Prof. DR. Satrio No. C4',
        status: 'Close',
        certificateNo: 'SHM/123/JKT',
        acquisitionValue: '50000000000'
    },
    {
        id: '2',
        name: 'Branch Office Surabaya',
        assetNo: 'BDG-SBY-012',
        type: 'Branch',
        ownership: 'Rent',
        location: 'Surabaya',
        address: 'Jl. Ahmad Yani No. 15',
        status: 'Open',
        landlordName: 'PT Properti Makmur',
        rentalCost: '250000000',
        startDate: '2024-01-01',
        endDate: '2025-01-01'
    }
];

export const MOCK_REMINDER_DATA: ReminderRecord[] = [
    {
        id: 'REM-001',
        documentName: 'Kontrak Sewa Lantai 5',
        buildingName: 'Gedung Pusat Satrio',
        assetNo: 'BDG-JKT-009',
        expiryDate: '2024-12-31',
        daysRemaining: 15,
        status: 'Urgent'
    }
];

export const MOCK_GENERAL_MASTER_DATA = {
    jenisPajak: [{ id: 1, name: 'Pajak STNK 1 Tahun' }, { id: 2, name: 'Pajak STNK 5 Tahun' }],
    jenisPembayaran: [{ id: 1, name: 'Kasbon' }, { id: 2, name: 'Reimbursement' }],
    jenisServis: [{ id: 1, name: 'Servis Rutin' }, { id: 2, name: 'Perbaikan Mesin' }],
    statusMutasi: [{ id: 1, name: 'Draft' }, { id: 2, name: 'Pending Approval' }],
    statusPenjualan: [{ id: 1, name: 'Open for Bidding' }, { id: 2, name: 'Sold' }],
    statusRequest: [{ id: 1, name: 'New' }, { id: 2, name: 'Verified' }],
    tipeMutasi: [{ id: 1, name: 'Antar Cabang' }, { id: 2, name: 'Antar Departemen' }],
    tipeVendor: [{ id: 1, name: 'Bengkel Resmi' }, { id: 2, name: 'Asuransi' }],
    peran: [{ id: 1, name: 'Super Admin' }, { id: 2, name: 'Fleet Coordinator' }]
};

export const MOCK_VEHICLE_DATA: VehicleRecord[] = [
    { id: 1, noRegistrasi: 'REG/2023/001', nama: 'Grand Max Blind Van', noPolisi: 'B 1234 CD', channel: 'HCO', cabang: 'Jakarta', status: 'Aktif', tahunPembuatan: '2020' },
    { id: 2, noRegistrasi: 'REG/2023/002', nama: 'Toyota Avanza', noPolisi: 'B 5678 EF', channel: 'Management', cabang: 'Bandung', status: 'Aktif', tahunPembuatan: '2021' }
];

export const MOCK_VEHICLE_CONTRACT_DATA: VehicleContractRecord[] = [
    {
        id: 'CON/VEH/001',
        noPolisi: 'B 1234 CD',
        aset: 'Grand Max Blind Van',
        noKontrak: 'KTR/2023/X-091',
        vendor: 'PT Jaya Rental Indonesia',
        tglMulai: '2023-01-01',
        tglBerakhir: '2025-01-01',
        biayaSewa: '4500000',
        status: 'Aktif'
    }
];

export const MOCK_SERVICE_DATA: ServiceRecord[] = [
    {
        id: 'SRV/2024/001',
        noPolisi: 'B 1234 CD',
        aset: 'Grand Max Blind Van',
        tglRequest: '2024-02-10',
        tglStnk: '2025-04-12',
        channel: 'HCO',
        cabang: 'Jakarta',
        status: 'Selesai',
        statusApproval: 'Approved',
        jenisServis: 'Servis Rutin',
        vendor: 'Daihatsu Service Center',
        targetSelesai: '2024-02-12',
        kmKendaraan: '45000',
        masalah: 'Suara mesin kasar dan tarikan berat pada tanjakan',
        penyebab: 'Oli mesin kotor and filter udara tersumbat debu pekat',
        estimasiBiaya: '1250000',
        jenisPembayaran: 'Kasbon',
        namaBank: 'Bank BCA',
        nomorRekening: '0981234455',
        spareParts: []
    }
];

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
export const MOCK_MASTER_VENDOR_DATA: MasterVendorRecord[] = [];

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
    note: 'Delivery of spare parts.'
  }
];

export const MOCK_TIMESHEET_DATA: TimesheetRecord[] = [];
export const MOCK_VENDOR_DATA: VendorRecord[] = [];
