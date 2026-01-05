
import { AssetRecord, MasterItem, ContractRecord, TimesheetRecord, VendorRecord, VehicleRecord, ServiceRecord, TaxKirRecord, MutationRecord, SalesRecord, MasterVendorRecord, DeliveryLocationRecord, LogBookRecord, BuildingRecord, ReminderRecord, VehicleContractRecord, GeneralMasterItem, StockOpnameRecord, LockerRecord, ModenaPodRecord, LockerRequestRecord, PodRequestRecord } from './types';

// Helper function to generate mock data for ATK/ARK
const generateAssetData = (type: 'ATK' | 'ARK', startId: number): AssetRecord[] => {
  const statuses: AssetRecord['status'][] = ['Approved', 'Pending', 'Rejected', 'Closed', 'Draft', 'On Progress'];
  const data: AssetRecord[] = [];
  let idCounter = startId;

  const employees = [
    { name: 'Aan Junaidi', role: 'Technician Team Leader', phone: '08123456789', avatar: 'https://i.pravatar.cc/150?u=aan', department: 'After Sales' },
    { name: 'Budi Santoso', role: 'Staff Admin', phone: '08129876543', avatar: 'https://i.pravatar.cc/150?u=budi', department: 'Supply Chain' },
    { name: 'Citra Lestari', role: 'HRGA Manager', phone: '08134567890', avatar: 'https://i.pravatar.cc/150?u=citra', department: 'HRGA' },
    { name: 'Dewi Putri', role: 'Finance Staff', phone: '08145678901', avatar: 'https://i.pravatar.cc/150?u=dewi', department: 'Finance' },
    { name: 'Eko Prasetyo', role: 'General Affair', phone: '08156789012', avatar: 'https://i.pravatar.cc/150?u=eko', department: 'General Affair' }
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
      { name: 'Tisu Nice 250s', cat: 'Tisu', code: 'TS-NICE-250' },
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

export const MOCK_LOCKER_REQUEST_DATA: LockerRequestRecord[] = [
  {
    id: 1,
    transactionNumber: 'REQ/LCK/2024/001',
    employee: { name: 'Citra Lestari', role: 'Manager', phone: '0813', avatar: 'https://i.pravatar.cc/150?u=3' },
    date: '22/03/2024',
    status: 'Pending',
    reason: 'New employee joining technical team.',
    preferredLocation: 'Lantai 2 Satrio'
  }
];

export const MOCK_POD_REQUEST_DATA: PodRequestRecord[] = [
  {
    id: 1,
    transactionNumber: 'REQ/POD/2024/001',
    employee: { name: 'Aan Junaidi', role: 'Technician', phone: '0812', avatar: 'https://i.pravatar.cc/150?u=1' },
    date: '20/03/2024',
    status: 'Pending',
    reason: 'Temporary housing for project duration.',
    preferredFloor: 'Lt 2 Pria',
    preferredRoomType: 'Single Bed'
  }
];

export const MOCK_MASTER_DATA: MasterItem[] = [
  { id: 1, category: 'Tinta Printer', itemName: 'HP Laserjet 204A Black', itemCode: 'TP-HP0048', uom: 'Pcs', remainingStock: 5, minimumStock: 2, maximumStock: 10, requestedStock: 0, purchaseDate: '27/08/2008', lastPurchasePrice: 'Rp. 22.000', averagePrice: 'Rp. 21.082' },
];

export const MOCK_MASTER_ARK_DATA: MasterItem[] = [
  { id: 1, category: 'Pembersih', itemName: 'Wipol Karbol', itemCode: 'CL-WPL-01', uom: 'Pcs', remainingStock: 10, minimumStock: 5, maximumStock: 20, requestedStock: 0, purchaseDate: '10/03/2024', lastPurchasePrice: 'Rp. 15.000', averagePrice: 'Rp. 14.800' },
];

export const MOCK_STOCK_OPNAME_DATA: StockOpnameRecord[] = [
  { id: 1, opnameNumber: 'SO/ATK/2024/0001', itemCode: 'TP-HP0048', itemName: 'HP Laserjet 204A Black', category: 'Tinta Printer', systemQty: 5, physicalQty: 5, difference: 0, date: '2024-03-20', performedBy: 'Aan Junaidi', status: 'Matched' },
];

export const MOCK_LOCKER_DATA: LockerRecord[] = [
    { 
      id: 1, 
      lockerNumber: '001', 
      location: 'Lantai 1', 
      subLocation: '-', 
      status: 'Terisi', 
      employee: { name: 'Aan Junaidi', role: 'Technician', position: 'Team Leader', department: 'After Sales', phone: '08123', avatar: 'https://i.pravatar.cc/150?u=1' }, 
      spareKey: 'Ada', 
      lastUpdate: '2024-03-20', 
      remarks: 'Good condition',
      history: [
        { id: 101, date: '2024-03-20', name: 'Aan Junaidi', department: 'After Sales', status: 'Terisi' },
        { id: 102, date: '2024-01-10', name: 'Budi Santoso', department: 'Supply Chain', status: 'Selesai Pinjam' },
        { id: 103, date: '2023-11-05', name: 'Citra Lestari', department: 'HRGA', status: 'Selesai Pinjam' }
      ]
    },
    { id: 2, lockerNumber: '002', location: 'Lantai 1', subLocation: '-', status: 'Kosong', spareKey: 'Ada', lastUpdate: '2024-03-10', remarks: '' },
];

export const MOCK_POD_DATA: ModenaPodRecord[] = [
    { 
      id: 1, 
      lantai: 'Lt 2 Pria', 
      jenisKamar: 'Single Bed', 
      nomorKamar: '211', 
      namaPenghuni: 'Gian Nanda Pratama', 
      posisi: 'Technician', 
      departemen: 'After Sales', 
      statusLokerBarang: 'Terpakai', 
      statusLokerPantry: 'Tidak Terpakai', 
      jadwalLaundry: '-', 
      keterangan: 'isi',
      history: [
        { id: 1, namaPenghuni: 'Yudi Saputra', nomorKamar: '211', statusLokerBarang: 'Terpakai', statusLokerPantry: 'Tidak Terpakai', jadwalLaundry: 'Senin & Kamis', startDate: '2023-12-01', endDate: '2024-02-15' },
        { id: 2, namaPenghuni: 'Andi Wijaya', nomorKamar: '211', statusLokerBarang: 'Terpakai', statusLokerPantry: 'Terpakai', jadwalLaundry: 'Selasa & Jumat', startDate: '2023-09-10', endDate: '2023-11-25' }
      ]
    },
];

export const MOCK_UOM_DATA: GeneralMasterItem[] = [
    { id: 1, name: 'PCS' }, { id: 2, name: 'RIM' }, { id: 3, name: 'BOX' }, { id: 4, name: 'PACK' }, { id: 5, name: 'UNIT' }
];

export const MOCK_ATK_CATEGORY: GeneralMasterItem[] = [
    { id: 1, name: 'Tinta Printer' }, { id: 2, name: 'Kertas' }, { id: 3, name: 'Alat Tulis' }, { id: 4, name: 'Filing' }, { id: 5, name: 'Elektronik' }
];

export const MOCK_ARK_CATEGORY: GeneralMasterItem[] = [
    { id: 1, name: 'Pembersih' }, { id: 2, name: 'Tisu' }, { id: 3, name: 'Kebersihan' }, { id: 4, name: 'Elektronik' }
];

export const MOCK_DELIVERY_LOCATIONS: DeliveryLocationRecord[] = [
    { id: 1, name: 'Satrio', address: 'Jl. Prof. DR. Satrio No. 84', type: 'HO' }
];

export const MOCK_BUILDING_DATA: BuildingRecord[] = [
    { id: '1', name: 'Gedung Satrio', assetNo: 'BDG-JKT-009', type: 'Head Office', ownership: 'Own', location: 'Jakarta', address: 'Jl. Prof. DR. Satrio No. 84', status: 'Close', certificateNo: 'SHM/123/JKT', acquisitionValue: '50000000000' }
];

export const MOCK_REMINDER_DATA: ReminderRecord[] = [
    { id: 'REM-001', documentName: 'Kontrak Sewa Lantai 5', buildingName: 'Gedung Satrio', assetNo: 'BDG-JKT-009', expiryDate: '2024-12-31', daysRemaining: 15, status: 'Urgent' }
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

export const MOCK_MASTER_VENDOR_DATA: MasterVendorRecord[] = [
  { id: 1, nama: 'PT Jaya Rental Indonesia', merek: 'Toyota', alamat: 'Jl. Jend. Sudirman No. 1, Jakarta', noTelp: '021-1234567', tipe: 'Rental', cabang: 'Jakarta', aktif: true }
];

export const MOCK_VEHICLE_DATA: VehicleRecord[] = [
    { id: 1, noRegistrasi: 'REG/2023/001', nama: 'Grand Max Blind Van', noPolisi: 'B 1234 CD', channel: 'HCO', cabang: 'Jakarta', status: 'Aktif', tahunPembuatan: '2020' }
];

export const MOCK_VEHICLE_CONTRACT_DATA: VehicleContractRecord[] = [
    { id: 'CON/VEH/001', noPolisi: 'B 1234 CD', aset: 'Grand Max Blind Van', noKontrak: 'KTR/2023/X-091', vendor: 'PT Jaya Rental Indonesia', tglMulai: '2023-01-01', tglBerakhir: '2025-01-01', biayaSewa: '4500000', status: 'Aktif' }
];

export const MOCK_SERVICE_DATA: ServiceRecord[] = [
    { id: 'SRV/2024/001', noPolisi: 'B 1234 CD', aset: 'Grand Max Blind Van', tglRequest: '2024-02-10', channel: 'HCO', cabang: 'Jakarta', status: 'Selesai', statusApproval: 'Approved', estimasiBiaya: '1250000', jenisPembayaran: 'Kasbon', spareParts: [] }
];

export const MOCK_TAX_KIR_DATA: TaxKirRecord[] = [
    { id: 'REQ/KIR/2024/001', noPolisi: 'B 1234 CD', tglRequest: '2024-03-15', jenis: 'KIR', channel: 'HCO', cabang: 'Jakarta', status: 'Draft', statusApproval: '-', estimasiBiaya: '1500000', jenisPembayaran: 'Kasbon' }
];

export const MOCK_LOGBOOK_DATA: LogBookRecord[] = [
  { id: 1, lokasiModena: 'Satrio', kategoriTamu: 'Customer', namaTamu: 'Budi Santoso', tanggalKunjungan: '2024-03-20', jamDatang: '09:00', jamPulang: '11:30', wanita: 0, lakiLaki: 1, anakAnak: 0, note: 'Meeting' }
];

export const MOCK_TIMESHEET_DATA: TimesheetRecord[] = [];
export const MOCK_VENDOR_DATA: VendorRecord[] = [];
