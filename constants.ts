
import { VehicleRecord, ServiceRecord, TaxKirRecord, MutationRecord, SalesRecord, MasterVendorRecord, BuildingRecord, ReminderRecord, GeneralMasterItem, VehicleContractRecord } from './types';

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
    },
    {
        id: 'REM-002',
        documentName: 'Pajak Bumi Bangunan (PBB)',
        buildingName: 'Branch Office Surabaya',
        assetNo: 'BDG-SBY-012',
        expiryDate: '2025-03-15',
        daysRemaining: 90,
        status: 'Safe'
    },
    {
        id: 'REM-003',
        documentName: 'Izin Mendirikan Bangunan (IMB)',
        buildingName: 'Warehouse Cakung',
        assetNo: 'BDG-WH-005',
        expiryDate: '2025-01-20',
        daysRemaining: 35,
        status: 'Warning'
    }
];

export const MOCK_MASTER_DATA = {
    jenisPajak: [
        { id: 1, name: 'Pajak STNK 1 Tahun' },
        { id: 2, name: 'Pajak STNK 5 Tahun' },
        { id: 3, name: 'Pajak Properti (PBB)' },
    ],
    jenisPembayaran: [
        { id: 1, name: 'Kasbon' },
        { id: 2, name: 'Reimbursement' },
        { id: 3, name: 'Corporate Card' },
        { id: 4, name: 'Transfer Bank' },
    ],
    jenisServis: [
        { id: 1, name: 'Servis Rutin' },
        { id: 2, name: 'Perbaikan Mesin' },
        { id: 3, name: 'Body Repair' },
        { id: 4, name: 'Ganti Ban' },
    ],
    statusMutasi: [
        { id: 1, name: 'Draft' },
        { id: 2, name: 'Pending Approval' },
        { id: 3, name: 'In Progress' },
        { id: 4, name: 'Completed' },
    ],
    statusPenjualan: [
        { id: 1, name: 'Open for Bidding' },
        { id: 2, name: 'Under Negotiation' },
        { id: 3, name: 'Sold' },
        { id: 4, name: 'Cancelled' },
    ],
    statusRequest: [
        { id: 1, name: 'New' },
        { id: 2, name: 'Verified' },
        { id: 3, name: 'On Hold' },
        { id: 4, name: 'Closed' },
    ],
    tipeMutasi: [
        { id: 1, name: 'Antar Cabang' },
        { id: 2, name: 'Antar Departemen' },
        { id: 3, name: 'Pengembalian Unit' },
    ],
    tipeVendor: [
        { id: 1, name: 'Bengkel Resmi' },
        { id: 2, name: 'Leasing / Rental' },
        { id: 3, name: 'Kontraktor Sipil' },
        { id: 4, name: 'Asuransi' },
    ],
    peran: [
        { id: 1, name: 'Super Admin' },
        { id: 2, name: 'Branch Manager' },
        { id: 3, name: 'Fleet Coordinator' },
        { id: 4, name: 'Finance Controller' },
    ]
};

export const MOCK_VEHICLE_DATA: VehicleRecord[] = [
    { id: 1, noRegistrasi: 'REG/2023/001', nama: 'Grand Max Blind Van', noPolisi: 'B 1234 CD', channel: 'HCO', cabang: 'Jakarta', status: 'Aktif', tahunPembuatan: '2020' },
    { id: 2, noRegistrasi: 'REG/2023/002', nama: 'Toyota Avanza', noPolisi: 'B 5678 EF', channel: 'Management', cabang: 'Bandung', status: 'Aktif', tahunPembuatan: '2021' }
];

// Added VehicleContractRecord to imports above
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
        penyebab: 'Oli mesin kotor dan filter udara tersumbat debu pekat',
        estimasiBiaya: '1250000',
        jenisPembayaran: 'Kasbon',
        namaBank: 'Bank BCA',
        nomorRekening: '0981234455',
        spareParts: [
            { name: 'Oli Mesin 10W-40 (4L)', qty: 1, price: '450000' },
            { name: 'Filter Oli', qty: 1, price: '75000' },
            { name: 'Filter Udara', qty: 1, price: '185000' },
            { name: 'Jasa Servis Berkala', qty: 1, price: '540000' }
        ]
    }
];

export const MOCK_TAX_KIR_DATA: TaxKirRecord[] = [];
export const MOCK_MUTATION_DATA: MutationRecord[] = [];
export const MOCK_SALES_DATA: SalesRecord[] = [];
export const MOCK_MASTER_VENDOR_DATA: MasterVendorRecord[] = [
    { id: 1, nama: 'PT Astra International', merek: 'Toyota, Daihatsu', alamat: 'Jl. Gaya Motor No. 8', noTelp: '021-6522555', tipe: 'Authorized Dealer', cabang: 'Pusat', aktif: true },
    { id: 2, nama: 'PT Jaya Rental', merek: 'Multi Brand', alamat: 'Jl. Sudirman Kav 10', noTelp: '021-500600', tipe: 'Rental / Leasing', cabang: 'Jakarta', aktif: true },
];
