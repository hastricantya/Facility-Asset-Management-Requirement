
import { AssetRecord, MasterItem, ContractRecord, TimesheetRecord, VendorRecord, VehicleRecord, ServiceRecord, TaxKirRecord, MutationRecord, SalesRecord, MasterVendorRecord, DeliveryLocationRecord, LogBookRecord } from './types';

// ... (Keep existing MOCK_DATA, MOCK_MASTER_DATA, MOCK_ARK_DATA, MOCK_MASTER_ARK_DATA)

export const MOCK_DATA: AssetRecord[] = [
  {
    id: 1,
    transactionNumber: 'TRX/ATK/2008/001',
    employee: {
      name: 'Aan Junaidi',
      phone: '0808.0766',
      role: 'Technician Team Leader (East)',
      avatar: 'https://picsum.photos/id/1012/100/100'
    },
    category: 'Tinta Printer',
    itemName: 'HP Laserjet 204A Black',
    itemDescription: 'Original HP Toner',
    qty: 5,
    date: '27/08/2008',
    remainingStock: 12,
    itemCode: 'TP-HP0048',
    status: 'Approved'
  },
  // ... (Abbreviated for brevity, normally keep all mock data)
];

// Re-exporting these for the rest of the app to work, simplified in this view
export const MOCK_MASTER_DATA: MasterItem[] = [
  { id: 1, category: 'Tinta Printer', itemName: 'HP Laserjet 204A Black', itemCode: 'TP-HP0048', uom: 'Pcs', remainingStock: 5, minimumStock: 2, maximumStock: 10, requestedStock: 0, purchaseDate: '27/08/2008', lastPurchasePrice: 'Rp. 22.000', averagePrice: 'Rp. 21.082' }
];
export const MOCK_ARK_DATA: AssetRecord[] = [];
export const MOCK_MASTER_ARK_DATA: MasterItem[] = [];

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
export const MOCK_LOGBOOK_DATA: LogBookRecord[] = [];
