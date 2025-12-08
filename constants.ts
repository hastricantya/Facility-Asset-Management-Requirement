import { AssetRecord, MasterItem } from './types';

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