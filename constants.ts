import { AssetRecord, MasterItem, ContractRecord, TimesheetRecord, VendorRecord, VehicleRecord, ServiceRecord, TaxKirRecord, MutationRecord, SalesRecord, MasterVendorRecord } from './types';

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

export const MOCK_CONTRACT_DATA: ContractRecord[] = [];

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

export const MOCK_MASTER_VENDOR_DATA: MasterVendorRecord[] = [
    {
        id: 1,
        nama: 'PT. Mitra Ananta Megah',
        merek: 'Toyota',
        alamat: 'Bintaro komersial CBD B7 kavling A1/02.Bintaro jaya, Pd. Jaya, Kec. Pd. Aren, Kota Tangerang Selatan, Banten 15224',
        noTelp: '081289841070',
        tipe: 'Vendor Mutasi',
        cabang: 'Pusat',
        aktif: true
    },
    {
        id: 2,
        nama: 'PT. Cipta Kreasi Muda Segara',
        merek: '',
        alamat: 'Jl. Raya Lenteng Agung No. 49 CKM, jakarta Selatan, 12610',
        noTelp: '082122153395',
        tipe: 'Vendor Mutasi',
        cabang: 'Pusat',
        aktif: true
    },
    {
        id: 3,
        nama: 'SAMSAT Cengkareng',
        merek: '',
        alamat: 'SAMSAT Cengkareng',
        noTelp: '082121280010',
        tipe: 'Vendor Pajak & KIR',
        cabang: 'Pusat',
        aktif: true
    },
    {
        id: 4,
        nama: 'Biro Jasa Bersama',
        merek: '',
        alamat: 'LTC Glodok',
        noTelp: '082114484749',
        tipe: 'Vendor Pajak & KIR',
        cabang: 'Pusat',
        aktif: true
    },
    {
        id: 5,
        nama: 'PT. Akindo Karya Gemilang (AKASTRA)',
        merek: 'Toyota',
        alamat: 'Jalan Raya Kebayoran Lama, Jl. Palmerah Barat VII No.26, RT.1/RW.2, North Sukabumi, Kebonjeruk, Jakarta 11540',
        noTelp: '081293865735',
        tipe: 'Vendor Servis',
        cabang: 'Pusat',
        aktif: true
    },
    {
        id: 6,
        nama: 'PT. Tunas Ridean Tbk. (Tunas Toyota)',
        merek: 'Toyota',
        alamat: '7, Jl. Mampang Prapatan XI No.83-85, RT.7/RW.1, Tegal Parang, Kec. Mampang Prpt., Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12790',
        noTelp: '081290036644',
        tipe: 'Vendor Servis',
        cabang: 'Pusat',
        aktif: true
    },
    {
        id: 7,
        nama: 'PT. Plaza Auto Prima (Plaza Toyota)',
        merek: 'Toyota',
        alamat: 'Jl. Kapten Tendean No.9A, RT.1/RW.2, Kuningan Bar., Kec. Mampang Prpt., Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12710',
        noTelp: '081310303036',
        tipe: 'Vendor Servis',
        cabang: 'Pusat',
        aktif: true
    },
    {
        id: 8,
        nama: 'PT. Astra International Tbk. (Auto2000)',
        merek: 'Toyota',
        alamat: 'Jl. Prof. DR. Soepomo SH No.46, RT.5/RW.1, Menteng Dalam, Kec. Tebet, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12870',
        noTelp: '089513954093',
        tipe: 'Vendor Servis',
        cabang: 'Pusat',
        aktif: true
    },
    {
        id: 9,
        nama: 'PT. Bumen Redja Abadi',
        merek: 'Mitsubishi',
        alamat: 'Jl. Raya Serang No.KM 13, Bitung Jaya, Kec. Cikupa, Kabupaten Tangerang, Banten 15710',
        noTelp: '082113952632',
        tipe: 'Vendor Servis',
        cabang: 'Pusat',
        aktif: true
    },
    {
        id: 10,
        nama: 'PT. Srikandi Diamond Motors',
        merek: 'Mitsubishi',
        alamat: 'Jl. MH. Thamrin No.88, RT.005/RW.001, Cikokol, Kec. Tangerang, Kota Tangerang, Banten 15117',
        noTelp: '081319757537',
        tipe: 'Vendor Servis',
        cabang: 'Pusat',
        aktif: true
    }
];

export const MOCK_VEHICLE_DATA: VehicleRecord[] = [
    {
        id: 1,
        noRegistrasi: '301-00208',
        nama: 'Toyota Avanza 1.3 CVT E Warna Putih Q2 BM Purwokerto',
        noPolisi: 'B 1708 CZY',
        channel: 'Human Capital Operation',
        cabang: 'Pusat',
        status: 'Aktif'
    },
    {
        id: 2,
        noRegistrasi: '301-00155',
        nama: 'MOBIL MITSUBISHI L-300/PICK-UP/FLAT DECK - 2016_PURWOKERTO',
        noPolisi: 'R 9747 IR',
        channel: 'Management',
        cabang: 'Purwokerto',
        status: 'Aktif'
    },
    {
        id: 3,
        noRegistrasi: '301-00108',
        nama: 'MITSUBISHI L-300. MEDAN (BK 8627 CB)',
        noPolisi: 'BK 8627 CB',
        channel: 'Traditional',
        cabang: 'Pekanbaru',
        status: 'Aktif'
    },
    {
        id: 4,
        noRegistrasi: '301-00193',
        nama: 'MITSUBISHI L-300 PU FLAT DECK-2021 U/ CAB. PEKANBARU',
        noPolisi: 'BM 8511 QA',
        channel: 'Traditional',
        cabang: 'Pekanbaru',
        status: 'Aktif'
    },
    {
        id: 5,
        noRegistrasi: '301-00161',
        nama: 'MOBIL PICK-UP / FLAT DECK L-300 2016, MITSUBISHI_PALEMBANG',
        noPolisi: 'BE 9353 YD',
        channel: 'Traditional',
        cabang: 'Palembang',
        status: 'Aktif'
    },
    {
        id: 6,
        noRegistrasi: '301-00207',
        nama: 'Toyota Avanza 1.3 CVT E Warna Putih Q2 BM Medan',
        noPolisi: 'B 1025 CZZ',
        channel: 'HR',
        cabang: 'Pusat',
        status: 'Aktif'
    },
    {
        id: 7,
        noRegistrasi: '301-00199',
        nama: 'MITSUBISHI L300 PU FLAT DECK 2021 DB 8956 LM-U/ CAB. MENADO',
        noPolisi: 'DB 8956 LM',
        channel: 'Traditional',
        cabang: 'Manado',
        status: 'Aktif'
    },
    {
        id: 8,
        noRegistrasi: '301-00132',
        nama: 'MITS L-300/PICK UP/2012 U/ MLG (L 9232 J)',
        noPolisi: 'L 9371 GK',
        channel: 'Traditional',
        cabang: 'Malang',
        status: 'Aktif'
    },
    {
        id: 9,
        noRegistrasi: '301-00148',
        nama: 'TUNAS RID_MOBIL TOYOTA INNOVA TYPE G A/T-TH.2014 PUTIH_PUSAT',
        noPolisi: 'B 1134 CKK',
        channel: 'Traditional',
        cabang: 'Malang',
        status: 'Aktif'
    },
    {
        id: 10,
        noRegistrasi: '301-00185',
        nama: 'MOBIL AVANZA TYPE G/AT-PUTIH 2020, TOYOTA_BM SMG,KDR,SBY',
        noPolisi: 'B 1756 CZN',
        channel: 'Traditional',
        cabang: 'Kediri',
        status: 'Aktif'
    }
];

export const MOCK_SERVICE_DATA: ServiceRecord[] = [
    {
        id: 'S2024060003',
        noPolisi: 'B 9433 CCA',
        tglRequest: '28 Jun 2024 17:24',
        channel: 'Warehouse & Distribution',
        cabang: 'Pusat',
        status: 'Draf',
        statusApproval: '-'
    },
    {
        id: 'S2024060002',
        noPolisi: 'B 9433 CCA',
        tglRequest: '28 Jun 2024 17:15',
        channel: 'Warehouse & Distribution',
        cabang: 'Pusat',
        status: 'Draf',
        statusApproval: '-'
    },
    {
        id: 'S2024060001',
        noPolisi: 'B 9433 CCA',
        tglRequest: '28 Jun 2024 17:12',
        channel: 'Warehouse & Distribution',
        cabang: 'Pusat',
        status: 'Draf',
        statusApproval: '-'
    }
];

export const MOCK_TAX_KIR_DATA: TaxKirRecord[] = [];

export const MOCK_MUTATION_DATA: MutationRecord[] = [
    {
        id: 'M2023090001',
        noPolisi: 'BE 9353 YD',
        cabangAset: 'Lampung',
        tipeMutasi: 'Kirim',
        tglPermintaan: '23 Sep 2023 21:18',
        lokasiAsal: 'Lampung',
        lokasiTujuan: 'Palembang',
        status: 'Persetujuan Biaya Diterima',
        statusApproval: 'COMPLETED'
    }
];

export const MOCK_SALES_DATA: SalesRecord[] = [
  {
    id: 'J2023090001',
    noPolisi: 'B 9433 CCA',
    tglRequest: '20 Sep 2023 20:51',
    channel: 'Warehouse & Distribution',
    cabang: 'Pusat',
    hargaTertinggi: 'Rp292.000.000',
    status: 'Persetujuan Permintaan',
    statusApproval: 'ONPROGRESS',
  }
];