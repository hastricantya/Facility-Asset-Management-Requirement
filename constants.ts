import { AssetRecord, MasterItem, ContractRecord, TimesheetRecord, VendorRecord } from './types';

export const MOCK_DATA: AssetRecord[] = [
  {
    id: 1,
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
  {
    id: 2,
    employee: {
      name: 'Abdul Gofur',
      phone: '1006.1123',
      role: 'Customer Loyalty Operation Specialist',
      avatar: 'https://picsum.photos/id/1027/100/100'
    },
    category: 'Kertas',
    itemName: 'HVS A4 80 1 Rim',
    itemDescription: 'PaperOne High Quality',
    qty: 2,
    date: '01/06/2010',
    remainingStock: 48,
    itemCode: 'KR-A480',
    status: 'Pending'
  },
  {
    id: 3,
    employee: {
      name: 'Achfas Faisal Kharis',
      phone: '2006.2237',
      role: 'Development Operation Specialist',
      avatar: 'https://picsum.photos/id/338/100/100'
    },
    category: 'Amplop',
    itemName: 'Amplop Coklat FOLIO F4 24x35',
    itemDescription: 'Standard Brown Envelope',
    qty: 20,
    date: '02/06/2020',
    remainingStock: 223,
    itemCode: 'AMP-CKT0012',
    status: 'Approved'
  },
  {
    id: 4,
    employee: {
      name: 'Achmad Alin Tamami S.H',
      phone: '2301.2522',
      role: 'Branch Manager (West)',
      avatar: 'https://picsum.photos/id/64/100/100'
    },
    category: 'Pulpen',
    itemName: 'KENKO Joyko K-1 0.5 mm Hitam',
    itemDescription: 'Ballpoint Pen',
    qty: 2,
    date: '01/06/2010',
    remainingStock: 109,
    itemCode: 'PL-KNJ003',
    status: 'Rejected'
  },
  {
    id: 5,
    employee: {
      name: 'Achmad Bachtiar',
      phone: '2309.2631',
      role: 'Sales Dealer (East)',
      avatar: 'https://picsum.photos/id/91/100/100'
    },
    category: 'Spidol',
    itemName: 'Spidol White Board Snowman',
    itemDescription: 'BG-12 - Hitam',
    qty: 1,
    date: '02/06/2020',
    remainingStock: 8,
    itemCode: 'SPD-WB001',
    status: 'Approved'
  }
];

export const MOCK_MASTER_DATA: MasterItem[] = [
  {
    id: 1,
    category: 'Tinta Printer',
    itemName: 'HP Laserjet 204A Black',
    itemCode: 'TP-HP0048',
    remainingStock: 5,
    purchaseDate: '27/08/2008',
    lastPurchasePrice: 'Rp. 22.000',
    averagePrice: 'Rp. 21.082'
  },
  {
    id: 2,
    category: 'Kertas',
    itemName: 'HVS A4 80 1 Rim',
    itemCode: 'KR-A480',
    remainingStock: 2,
    purchaseDate: '01/06/2010',
    lastPurchasePrice: 'Rp. 33.000',
    averagePrice: 'Rp. 34.222'
  },
  {
    id: 3,
    category: 'Amplop',
    itemName: 'Amplop Coklat FOLIO F4 24x35',
    itemCode: 'AMP-CKT0012',
    remainingStock: 20,
    purchaseDate: '02/06/2020',
    lastPurchasePrice: 'Rp. 9.900',
    averagePrice: 'Rp. 7.823'
  },
  {
    id: 4,
    category: 'Pulpen',
    itemName: 'KENKO Joyko K-1 0.5 mm Hitam',
    itemCode: 'PL-KNJ003',
    remainingStock: 2,
    purchaseDate: '01/06/2010',
    lastPurchasePrice: 'Rp. 36.000',
    averagePrice: 'Rp. 38.231'
  },
  {
    id: 5,
    category: 'Spidol',
    itemName: 'Spidol White Board Snowman BG-12 - Hitam',
    itemCode: 'SPD-WB001',
    remainingStock: 1,
    purchaseDate: '02/06/2020',
    lastPurchasePrice: 'Rp. 88.000',
    averagePrice: 'Rp. 91.783'
  }
];

export const MOCK_ARK_DATA: AssetRecord[] = [
    {
      id: 1,
      employee: {
        name: 'Alam Anugrah Akbar',
        phone: 'SI2311.0013',
        role: 'Cleaning Service',
        avatar: 'https://picsum.photos/id/111/100/100'
      },
      category: 'Tissue',
      itemName: 'Nice Tissue Toilet',
      itemDescription: 'Roll 2 Ply',
      qty: 8,
      date: '01/06/2010',
      remainingStock: 2,
      itemCode: 'TS-TNICE002',
      status: 'Approved'
    },
    {
      id: 2,
      employee: {
        name: 'Budi Santoso',
        phone: 'SI2001.0044',
        role: 'General Affair Staff',
        avatar: 'https://picsum.photos/id/222/100/100'
      },
      category: 'Sabun Cuci',
      itemName: 'Sunlight Jeruk Nipis',
      itemDescription: 'Pouch 755ml',
      qty: 5,
      date: '02/06/2010',
      remainingStock: 15,
      itemCode: 'SB-SUN01',
      status: 'Approved'
    },
    {
        id: 3,
        employee: {
          name: 'Siti Aminah',
          phone: 'SI2011.0022',
          role: 'Pantry Staff',
          avatar: 'https://picsum.photos/id/333/100/100'
        },
        category: 'Pengharum Ruangan',
        itemName: 'Stella Matic Refill',
        itemDescription: 'Green Fantasy',
        qty: 2,
        date: '03/06/2010',
        remainingStock: 8,
        itemCode: 'PR-STL02',
        status: 'Pending'
    }
];

export const MOCK_MASTER_ARK_DATA: MasterItem[] = [
    {
      id: 1,
      category: 'Tissue',
      itemName: 'Nice Tissue Toilet',
      itemCode: 'TS-TNICE002',
      remainingStock: 250,
      purchaseDate: '01/06/2010',
      lastPurchasePrice: 'Rp. 4.500',
      averagePrice: 'Rp. 4.200'
    },
    {
      id: 2,
      category: 'Sabun Cuci',
      itemName: 'Sunlight Jeruk Nipis',
      itemCode: 'SB-SUN01',
      remainingStock: 45,
      purchaseDate: '02/06/2010',
      lastPurchasePrice: 'Rp. 15.000',
      averagePrice: 'Rp. 14.500'
    },
    {
      id: 3,
      category: 'Pengharum Ruangan',
      itemName: 'Stella Matic Refill',
      itemCode: 'PR-STL02',
      remainingStock: 30,
      purchaseDate: '03/06/2010',
      lastPurchasePrice: 'Rp. 35.000',
      averagePrice: 'Rp. 33.800'
    }
  ];

export const MOCK_CONTRACT_DATA: ContractRecord[] = [
  {
    id: 1,
    contractName: 'Mobil Innova B 1122 OKE, Tahun 2022 dipakai Pak Jack',
    contractImage: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=200&h=150',
    category: 'Mobil',
    startDate: '02/08/2022',
    endDate: '01/08/2023',
    reminderLevel: 'High',
    documentName: 'DO16078320240315160249805.pdf',
    status: 'Active'
  }
];

export const MOCK_TIMESHEET_DATA: TimesheetRecord[] = [
    {
        id: 1,
        employee: {
            name: 'Muhammad Herlambang',
            phone: 'SI2311.0012',
            role: 'Cleaning Service',
            avatar: 'https://picsum.photos/id/55/100/100'
        },
        date: '14/03/2024',
        dayType: 'Thursday - WD',
        task: '',
        clockIn: '07:35',
        clockOut: '16:32',
        status: 'Tepat Waktu',
        photos: ['https://picsum.photos/id/101/50/50', 'https://picsum.photos/id/102/50/50']
    },
    {
        id: 2,
        employee: {
            name: 'Muhammad Herlambang',
            phone: 'SI2311.0012',
            role: 'Cleaning Service',
            avatar: 'https://picsum.photos/id/55/100/100'
        },
        date: '15/03/2024',
        dayType: 'Friday - WD',
        task: '',
        clockIn: '07:41',
        clockOut: '16:45',
        status: 'Tidak Tepat Waktu',
        photos: ['https://picsum.photos/id/103/50/50', 'https://picsum.photos/id/104/50/50']
    },
    {
        id: 3,
        employee: {
            name: 'Muhammad Koiri',
            phone: 'SI2311.0002',
            role: 'Cleaning Service',
            avatar: 'https://picsum.photos/id/65/100/100'
        },
        date: '14/03/2024',
        dayType: 'Thursday - WD',
        task: '',
        clockIn: '09:56',
        clockOut: '20:05',
        status: 'Tepat Waktu',
        photos: ['https://picsum.photos/id/106/50/50', 'https://picsum.photos/id/107/50/50']
    },
    {
        id: 4,
        employee: {
            name: 'Muhammad Koiri',
            phone: 'SI2311.0002',
            role: 'Cleaning Service',
            avatar: 'https://picsum.photos/id/65/100/100'
        },
        date: '15/03/2024',
        dayType: 'Friday - WD',
        task: '',
        clockIn: '09:50',
        clockOut: '18:56',
        status: 'Tidak Tepat Waktu',
        photos: ['https://picsum.photos/id/108/50/50', 'https://picsum.photos/id/109/50/50']
    },
    {
        id: 5,
        employee: {
            name: 'Nartiana Nia',
            phone: 'SI2311.0011',
            role: 'Cleaning Service',
            avatar: 'https://picsum.photos/id/77/100/100'
        },
        date: '14/03/2024',
        dayType: 'Thursday - WD',
        task: '',
        clockIn: '08:37',
        clockOut: '17:38',
        status: 'Tepat Waktu',
        photos: []
    }
];

export const MOCK_VENDOR_DATA: VendorRecord[] = [
    {
        id: 1,
        vendorName: 'PT Indo Makmur Energy',
        vendorCode: '2209010032',
        status: 'Active'
    }
];