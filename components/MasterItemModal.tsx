import React, { useState, useEffect } from 'react';
import { X, Save, Package, Tag, Archive, DollarSign, Calendar, Hash, History, Landmark, ShoppingCart, AlertCircle } from 'lucide-react';
import { MasterItem, GeneralMasterItem, PurchaseRecord } from '../types';
import { MOCK_ATK_CATEGORY, MOCK_ARK_CATEGORY, MOCK_UOM_DATA } from '../constants';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Partial<MasterItem>) => void;
  initialData?: MasterItem | null;
  moduleName: string;
  mode?: 'create' | 'edit' | 'view';
}

const MOCK_PURCHASE_HISTORY: PurchaseRecord[] = [
  { id: 'PO-001', date: '2024-03-15', vendorName: 'PT ATK Jaya', qty: 10, unitPrice: 'Rp 22.000', totalPrice: 'Rp 220.000', status: 'Completed' },
  { id: 'PO-012', date: '2024-02-10', vendorName: 'Toko Buku Makmur', qty: 5, unitPrice: 'Rp 21.500', totalPrice: 'Rp 107.500', status: 'Completed' },
  { id: 'PO-045', date: '2024-01-05', vendorName: 'PT ATK Jaya', qty: 20, unitPrice: 'Rp 21.000', totalPrice: 'Rp 420.000', status: 'Completed' },
];

export const MasterItemModal: React.FC<Props> = ({ 
  isOpen, 
  onClose, 
  onSave, 
  initialData, 
  moduleName,
  mode = 'create' 
}) => {
  const [form, setForm] = useState<Partial<MasterItem>>({
    category: '',
    itemName: '',
    itemCode: '',
    uom: '',
    remainingStock: 0,
    minimumStock: 0,
    maximumStock: 0,
    lastPurchasePrice: '',
    averagePrice: '',
    purchaseDate: new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    if (isOpen && initialData) {
      setForm(initialData);
    } else if (isOpen) {
      setForm({
        category: '',
        itemName: '',
        itemCode: '',
        uom: '',
        remainingStock: 0,
        minimumStock: 0,
        maximumStock: 0,
        requestedStock: 0,
        lastPurchasePrice: '',
        averagePrice: '',
        purchaseDate: new Date().toISOString().split('T')[0]
      });
    }
  }, [isOpen, initialData]);

  if (!isOpen) return null;

  const isView = mode === 'view';
  const isArk = moduleName.includes('ARK');
  const categories = isArk ? MOCK_ARK_CATEGORY : MOCK_ATK_CATEGORY;

  const SectionHeader = ({ icon: Icon, title }: { icon: any, title: string }) => (
    <div className="flex items-center gap-3 mb-6 pb-2 border-b border-gray-100">
      <Icon size={18} className="text-black" />
      <h3 className="text-[10px] font-black text-black uppercase tracking-[0.2em]">{title}</h3>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center backdrop-blur-[2px] p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-6xl rounded-2xl shadow-2xl overflow-hidden flex flex-col transform transition-all scale-100 h-[90vh]">
        {/* Header */}
        <div className="px-8 py-5 bg-white border-b border-gray-100 flex items-center justify-between shrink-0">
          <div>
            <h2 className="text-lg font-bold text-black uppercase tracking-tighter">
              {initialData ? `Edit Master ${isArk ? 'ARK' : 'ATK'}` : `Tambah Master ${isArk ? 'ARK' : 'ATK'}`}
            </h2>
            <div className="flex items-center gap-4 mt-1">
               <span className="text-[10px] font-black text-gray-400 tracking-widest uppercase">Catalog Management</span>
               {form.itemCode && <span className="text-[10px] font-mono font-bold text-blue-600 bg-blue-50 px-2 rounded">#{form.itemCode}</span>}
            </div>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-red-500 transition-colors p-1 rounded-full hover:bg-gray-100">
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar bg-[#F8F9FA]">
          <div className="space-y-8">
            {/* Top Grid: Info & Stock */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Basic Info */}
              <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-6">
                <SectionHeader icon={Package} title="Informasi Barang" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Category First as requested */}
                  <div className="md:col-span-2">
                    <label className="block text-[10px] font-black text-gray-400 uppercase mb-2">Kategori</label>
                    <select 
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold text-black focus:border-black outline-none appearance-none bg-white transition-all shadow-sm"
                      value={form.category}
                      onChange={(e) => setForm({...form, category: e.target.value})}
                      disabled={isView}
                    >
                      <option value="">Pilih Kategori</option>
                      {categories.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                    </select>
                  </div>
                  
                  {/* Item Name Second as requested */}
                  <div className="md:col-span-2">
                    <label className="block text-[10px] font-black text-gray-400 uppercase mb-2">Nama Barang</label>
                    <input 
                      type="text" 
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold text-black focus:border-black outline-none transition-all shadow-sm"
                      value={form.itemName || ''}
                      onChange={(e) => setForm({...form, itemName: e.target.value})}
                      placeholder="Masukkan nama barang..."
                      disabled={isView}
                    />
                  </div>

                  {/* Part Code - Disabled until category is selected */}
                  <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase mb-2">
                      Kode Part {!form.category && <span className="text-red-400 normal-case font-medium ml-1">(Pilih kategori dulu)</span>}
                    </label>
                    <div className="relative group">
                      <input 
                        type="text" 
                        disabled={!form.category || isView}
                        className={`w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-mono font-bold outline-none transition-all shadow-sm ${(!form.category || isView) ? 'bg-gray-50 text-gray-300 cursor-not-allowed' : 'bg-white text-black focus:border-black'}`}
                        value={form.itemCode || ''}
                        onChange={(e) => setForm({...form, itemCode: e.target.value})}
                        placeholder={form.category ? "TP-001" : "Select Category..."}
                      />
                      {!form.category && !isView && <AlertCircle size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300" />}
                    </div>
                  </div>

                  {/* UOM */}
                  <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase mb-2">Satuan (UOM)</label>
                    <select 
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold text-black focus:border-black outline-none appearance-none bg-white shadow-sm transition-all"
                      value={form.uom}
                      onChange={(e) => setForm({...form, uom: e.target.value})}
                      disabled={isView}
                    >
                      <option value="">Pilih Satuan</option>
                      {MOCK_UOM_DATA.map(u => <option key={u.id} value={u.name}>{u.name}</option>)}
                    </select>
                  </div>

                  {/* Harga Beli */}
                  <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase mb-2">Harga Beli</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-black text-xs">Rp</span>
                      <input 
                        type="text" 
                        className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-3 text-sm font-black text-black focus:border-black outline-none transition-all shadow-sm"
                        value={form.lastPurchasePrice || ''}
                        onChange={(e) => setForm({...form, lastPurchasePrice: e.target.value})}
                        placeholder="0"
                        disabled={isView}
                      />
                    </div>
                  </div>

                  {/* Qty */}
                  <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase mb-2">Qty (Stok Saat Ini)</label>
                    <input 
                      type="number" 
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-black text-black focus:border-black outline-none transition-all shadow-sm"
                      value={form.remainingStock}
                      onChange={(e) => setForm({...form, remainingStock: parseInt(e.target.value) || 0})}
                      placeholder="0"
                      disabled={isView}
                    />
                  </div>
                </div>
              </div>

              {/* Inventory Info (Limits) */}
              <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-6">
                <SectionHeader icon={Hash} title="Stok Limit" />
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-black text-gray-400 uppercase mb-2">Min Stock</label>
                      <input 
                        type="number" 
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-black text-center disabled:bg-gray-50"
                        value={form.minimumStock}
                        onChange={(e) => setForm({...form, minimumStock: parseInt(e.target.value) || 0})}
                        disabled={isView}
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-gray-400 uppercase mb-2">Max Stock</label>
                      <input 
                        type="number" 
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-black text-center disabled:bg-gray-50"
                        value={form.maximumStock}
                        onChange={(e) => setForm({...form, maximumStock: parseInt(e.target.value) || 0})}
                        disabled={isView}
                      />
                    </div>
                  </div>
                  
                  <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 space-y-4">
                    <div className="flex justify-between items-center">
                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-tight">Avg Price</span>
                        <span className="text-sm font-black text-black">{form.averagePrice || 'Rp 0'}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-tight">Last Purchase</span>
                        <span className="text-sm font-black text-blue-600">{form.lastPurchasePrice || 'Rp 0'}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 bg-orange-50 rounded-xl border border-orange-100">
                      <AlertCircle size={16} className="text-orange-500 shrink-0 mt-0.5" />
                      <p className="text-[9px] font-bold text-orange-700 uppercase leading-relaxed">
                          Peringatan otomatis aktif jika stok dibawah {form.minimumStock}.
                      </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Purchase History Section: Now integrated in the same form below information */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                  <SectionHeader icon={History} title="History Pembelian" />
                  <div className="flex items-center gap-2 px-3 py-1 bg-black text-white rounded-lg text-[9px] font-black uppercase tracking-widest mb-4">
                    <ShoppingCart size={12} /> {MOCK_PURCHASE_HISTORY.length} Transactions
                  </div>
              </div>

              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-200">
                        <th className="p-4 text-[10px] font-black text-gray-400 uppercase tracking-widest pl-8">PO Number</th>
                        <th className="p-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Tanggal</th>
                        <th className="p-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Vendor</th>
                        <th className="p-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Qty</th>
                        <th className="p-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Harga Satuan</th>
                        <th className="p-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right pr-8">Total</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {MOCK_PURCHASE_HISTORY.map((hist) => (
                        <tr key={hist.id} className="hover:bg-gray-50/50 transition-colors">
                          <td className="p-4 font-mono font-bold text-xs text-blue-600 pl-8">{hist.id}</td>
                          <td className="p-4 font-bold text-gray-600 text-xs">{hist.date}</td>
                          <td className="p-4 font-black text-black text-[12px] uppercase">{hist.vendorName}</td>
                          <td className="p-4 text-center font-black text-black text-xs">{hist.qty}</td>
                          <td className="p-4 text-right font-mono font-bold text-xs text-gray-500">{hist.unitPrice}</td>
                          <td className="p-4 text-right font-mono font-black text-black text-xs pr-8">{hist.totalPrice}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {MOCK_PURCHASE_HISTORY.length === 0 && (
                  <div className="p-12 text-center bg-white">
                    <History size={40} className="mx-auto text-gray-200 mb-4" />
                    <p className="text-[10px] font-black text-gray-400 uppercase">Belum ada riwayat pembelian tercatat</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-8 py-5 bg-white border-t border-gray-100 flex justify-end gap-3 shrink-0">
          <button onClick={onClose} className="px-10 py-2.5 text-[11px] font-black uppercase tracking-widest text-gray-400 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 hover:text-black transition-all">Cancel</button>
          {!isView && (
            <button 
                onClick={() => onSave(form)} 
                className="px-12 py-2.5 text-[11px] font-black uppercase tracking-widest text-white bg-black rounded-lg hover:bg-gray-800 shadow-xl shadow-black/20 transition-all active:scale-95 flex items-center gap-2"
            >
                <Save size={14} /> Simpan Katalog
            </button>
          )}
        </div>
      </div>
    </div>
  );
};