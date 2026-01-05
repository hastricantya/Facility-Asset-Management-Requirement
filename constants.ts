import { AssetRecord, MasterItem, ContractRecord, TimesheetRecord, VendorRecord, VehicleRecord, ServiceRecord, TaxKirRecord, MutationRecord, SalesRecord, MasterVendorRecord, DeliveryLocationRecord, LogBookRecord, BuildingRecord, ReminderRecord, VehicleContractRecord, GeneralMasterItem, StockOpnameRecord, LockerRecord, ModenaPodRecord, LockerRequestRecord, PodRequestRecord, MasterPodRecord, MasterLockerRecord } from './types';

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
      { name: 'Kertas A4 70gr Sinar Dunia', cat: 'Kertas', code: 'KRT-A4-70' },
      { name: 'Kertas F4 80gr PaperOne', cat: 'Kertas', code: 'KRT-F4-80' },
      { name: 'Epson Ink 003 Black', cat: 'Tinta Printer', code: 'TP-EPS-003' },
      { name: 'Printer HP LaserJet Pro M15w', cat: 'Elektronik', code: 'EL-PRN-HP' },
      { name: 'Pulpen Standard AE7', cat: 'Alat Tulis', code: 'ATK-PEN-01' },
      { name: 'Map Plastik Clear', cat: 'Filing', code: 'FIL-MAP-01' }
  ];

  const itemsARK = [
      { name: 'Wipol Karbol Wangi 750ml', cat: 'Pembersih', code: 'CL-WPL-01' },
      { name: 'Sunlight Jeruk Nipis 700ml', cat: 'Pembersih', code: 'CL-SUN-01' },
      { name: 'Rinso Liquid Deterjen', cat: 'Pembersih', code: 'CL-RIN-01' },
      { name: 'Tisu Nice 250s Facial', cat: 'Tisu', code: 'TS-NICE-250' },
      { name: 'Sabun Cuci Tangan Lifebuoy', cat: 'Kebersihan', code: 'SOAP-HW-01' },
      { name: 'Lampu LED Phillips 10W', cat: 'Elektronik', code: 'LMP-LED-10' }
  ];

  const items = type === 'ATK' ? itemsATK : itemsARK;

  // Create records
  for (let i = 0; i < 20; i++) {
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
      itemDescription: `Permintaan rutin ${type} untuk operasional kantor unit ${emp.department}.`,
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
      isExpat: false,
      posisi: 'Technician Team Leader', 
      departemen: 'After Sales', 
      statusLokerBarang: 'Terpakai', 
      statusLokerPantry: 'Tidak Terpakai', 
      jadwalLaundry: '-', 
      keterangan: 'isi',
      history: [
        { id: 1, namaPenghuni: 'Yudi Saputra', isExpat: false, posisi: 'Technician', departemen: 'After Sales', nomorKamar: '211', statusLokerBarang: 'Terpakai', statusLokerPantry: 'Tidak Terpakai', jadwalLaundry: 'Senin & Kamis', startDate: '2023-12-01', endDate: '2024-02-15' },
        { id: 2, namaPenghuni: 'Andi Wijaya', isExpat: false, posisi: 'Staff Admin', departemen: 'Supply Chain', nomorKamar: '211', statusLokerBarang: 'Terpakai', statusLokerPantry: 'Terpakai', jadwalLaundry: 'Selasa & Jumat', startDate: '2023-09-10', endDate: '2023-11-25' }
      ]
    },
    { id: 34, lantai: 'Lt 3 Pria', jenisKamar: 'Quadruple Bed', nomorKamar: '317 B', namaPenghuni: 'Sung Yong Hong', isExpat: true, posisi: 'Expert Engineer', departemen: 'Production', statusLokerBarang: 'Extra Loker Terpakai', statusLokerPantry: 'Extra Loker Terpakai', jadwalLaundry: 'Tidak ada', keterangan: 'kosong kunci gada' },
    { id: 37, lantai: 'Lt 3 Pria', jenisKamar: 'Quadruple Bed', nomorKamar: '318 A', namaPenghuni: 'Dani Rizky Nugraha', isExpat: false, posisi: 'Staff', departemen: 'After Sales', statusLokerBarang: 'Terpakai', statusLokerPantry: 'Belum Dapat', jadwalLaundry: 'Selasa & Jumat', keterangan: 'isi' },
    { id: 44, lantai: 'Lt 3 Perempuan', jenisKamar: 'Single Bed', nomorKamar: '322', namaPenghuni: 'R.A Putri Minang Permatasari', isExpat: false, posisi: 'Senior Staff', departemen: 'Finance', statusLokerBarang: 'Terpakai', statusLokerPantry: 'Terpakai', jadwalLaundry: 'Senin & Kamis', keterangan: 'isi' }
];

export const MOCK_MASTER_POD_DATA: MasterPodRecord[] = [
  { id: 1, lantai: 'Lt 2 Pria', jenisKamar: 'Single Bed', nomorKamar: '201', kapasitas: 1, fasilitas: ['Wifi', 'AC', 'Meja Kerja'], status: 'Active' },
  { id: 2, lantai: 'Lt 2 Pria', jenisKamar: 'Double Bed', nomorKamar: '202', kapasitas: 2, fasilitas: ['Wifi', 'AC'], status: 'Active' },
  { id: 3, lantai: 'Lt 3 Perempuan', jenisKamar: 'Quadruple Bed', nomorKamar: '317', kapasitas: 4, fasilitas: ['Wifi', 'AC', 'Loker'], status: 'Active' },
];

export const MOCK_MASTER_LOCKER_GOODS_DATA: MasterLockerRecord[] = [
  { id: 1, lockerNumber: 'B-001', floor: 'Lt 2 Pria', type: 'Goods', status: 'Active', remarks: 'Good condition' },
  { id: 2, lockerNumber: 'B-002', floor: 'Lt 2 Pria', type: 'Goods', status: 'Active' },
  { id: 3, lockerNumber: 'B-101', floor: 'Lt 3 Perempuan', type: 'Goods', status: 'Maintenance', remarks: 'Broken lock' },
];

export const MOCK_MASTER_LOCKER_PANTRY_DATA: MasterLockerRecord[] = [
  { id: 1, lockerNumber: 'P-001', floor: 'Lt 2 Pria', type: 'Pantry', status: 'Active' },
  { id: 2, lockerNumber: 'P-002', floor: 'Lt 2 Pria', type: 'Pantry', status: 'Active' },
  { id: 3, lockerNumber: 'P-101', floor: 'Lt 3 Perempuan', type: 'Pantry', status: 'Active' },
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
  { id: 1, category: 'Tinta Printer', itemName: 'HP Laserjet 204A Black', itemCode: 'TP-HP0048', uom: 'Pcs', remainingStock: 5, minimumStock: 2, maximumStock: 10, requestedStock: 0, purchaseDate: '27/08/2024', lastPurchasePrice: 'Rp. 22.000', averagePrice: 'Rp. 21.082' },
  { id: 2, category: 'Tinta Printer', itemName: 'Epson Ink 003 Magenta', itemCode: 'TP-EPS-M', uom: 'Pcs', remainingStock: 8, minimumStock: 3, maximumStock: 15, requestedStock: 2, purchaseDate: '15/03/2024', lastPurchasePrice: 'Rp. 85.000', averagePrice: 'Rp. 82.500' },
  { id: 3, category: 'Kertas', itemName: 'Kertas A4 70gr Sinar Dunia', itemCode: 'KRT-A4-70', uom: 'Rim', remainingStock: 45, minimumStock: 10, maximumStock: 100, requestedStock: 0, purchaseDate: '01/03/2024', lastPurchasePrice: 'Rp. 48.000', averagePrice: 'Rp. 47.200' },
  { id: 4, category: 'Kertas', itemName: 'Kertas F4 80gr PaperOne', itemCode: 'KRT-F4-80', uom: 'Rim', remainingStock: 12, minimumStock: 15, maximumStock: 50, requestedStock: 10, purchaseDate: '10/02/2024', lastPurchasePrice: 'Rp. 55.000', averagePrice: 'Rp. 54.500' },
  { id: 5, category: 'Elektronik', itemName: 'Printer HP LaserJet Pro M15w', itemCode: 'EL-PRN-HP', uom: 'Unit', remainingStock: 2, minimumStock: 1, maximumStock: 5, requestedStock: 0, purchaseDate: '20/01/2024', lastPurchasePrice: 'Rp. 1.850.000', averagePrice: 'Rp. 1.850.000' },
];

export const MOCK_MASTER_ARK_DATA: MasterItem[] = [
  { id: 1, category: 'Pembersih', itemName: 'Wipol Karbol Wangi 750ml', itemCode: 'CL-WPL-01', uom: 'Pcs', remainingStock: 10, minimumStock: 5, maximumStock: 20, requestedStock: 0, purchaseDate: '10/03/2024', lastPurchasePrice: 'Rp. 15.000', averagePrice: 'Rp. 14.800' },
  { id: 2, category: 'Pembersih', itemName: 'Sunlight Jeruk Nipis 700ml', itemCode: 'CL-SUN-01', uom: 'Pcs', remainingStock: 24, minimumStock: 10, maximumStock: 50, requestedStock: 0, purchaseDate: '12/03/2024', lastPurchasePrice: 'Rp. 18.500', averagePrice: 'Rp. 17.900' },
  { id: 3, category: 'Pembersih', itemName: 'Stella Matic Refill Green', itemCode: 'CL-STL-01', uom: 'Pcs', remainingStock: 4, minimumStock: 5, maximumStock: 15, requestedStock: 5, purchaseDate: '05/03/2024', lastPurchasePrice: 'Rp. 32.000', averagePrice: 'Rp. 31.500' },
  { id: 4, category: 'Tisu', itemName: 'Tisu Nice 250s Facial', itemCode: 'TS-NICE-250', uom: 'Pack', remainingStock: 60, minimumStock: 20, maximumStock: 100, requestedStock: 0, purchaseDate: '20/02/2024', lastPurchasePrice: 'Rp. 12.000', averagePrice: 'Rp. 11.500' },
];

export const MOCK_STOCK_OPNAME_DATA: StockOpnameRecord[] = [
  { id: 1, opnameNumber: 'SO/ATK/2024/0001', itemCode: 'TP-HP0048', itemName: 'HP Laserjet 204A Black', category: 'Tinta Printer', systemQty: 5, physicalQty: 5, difference: 0, date: '2024-03-20', performedBy: 'Aan Junaidi', status: 'Matched' },
  { id: 2, opnameNumber: 'SO/ATK/2024/0002', itemCode: 'KRT-A4-70', itemName: 'Kertas A4 70gr Sinar Dunia', category: 'Kertas', systemQty: 45, physicalQty: 42, difference: -3, date: '2024-03-21', performedBy: 'Budi Santoso', status: 'Discrepancy' },
  { id: 3, opnameNumber: 'SO/ARK/2024/0001', itemCode: 'CL-STL-01', itemName: 'Stella Matic Refill Green', category: 'Pembersih', systemQty: 4, physicalQty: 5, difference: 1, date: '2024-03-22', performedBy: 'Citra Lestari', status: 'Discrepancy' },
  { id: 4, opnameNumber: 'SO/ATK/2024/0004', itemCode: 'EL-PRN-HP', itemName: 'Printer HP LaserJet Pro M15w', category: 'Elektronik', systemQty: 2, physicalQty: 1, difference: -1, date: '2024-03-23', performedBy: 'Aan Junaidi', status: 'Draft' },
  { id: 5, opnameNumber: 'SO/ARK/2024/0002', itemCode: 'CL-WPL-01', itemName: 'Wipol Karbol Wangi 750ml', category: 'Pembersih', systemQty: 10, physicalQty: 10, difference: 0, date: '2024-03-23', performedBy: 'Eko Prasetyo', status: 'Draft' },
  { id: 6, opnameNumber: 'SO/ATK/2024/0005', itemCode: 'KRT-F4-80', itemName: 'Kertas F4 80gr PaperOne', category: 'Kertas', systemQty: 12, physicalQty: 15, difference: 3, date: '2024-03-24', performedBy: 'Dewi Putri', status: 'Draft' },
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
