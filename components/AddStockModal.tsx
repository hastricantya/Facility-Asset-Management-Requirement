import React from 'react';
import { X, RefreshCcw, Calendar, Upload } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  moduleName?: string;
}

export const AddStockModal: React.FC<Props> = ({ isOpen, onClose, moduleName = 'ATK' }) => {
  if (!isOpen) return null;

  const isContract = moduleName === 'Contract';

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-5xl rounded-lg shadow-xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="bg-black text-white px-6 py-4 flex items-center justify-between">
          <h2 className="text-sm font-semibold tracking-wide">
            {isContract ? 'Reminder Kontrak > NEW' : `Master ${moduleName} > Tambah Stock`}
          </h2>
          <div className="flex items-center gap-4">
            <button className="text-gray-400 hover:text-white transition-colors">
              <RefreshCcw size={18} />
            </button>
            <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          
          {isContract ? (
            /* --- CONTRACT FORM --- */
            <div className="space-y-6 max-w-4xl">
                
                {/* Nama Kontrak */}
                <div className="grid grid-cols-12 items-start gap-4">
                    <label className="col-span-3 text-sm font-bold text-gray-700 pt-2">
                        Nama Kontrak <span className="text-red-500">*</span>
                    </label>
                    <div className="col-span-9">
                        <textarea 
                            rows={3}
                            defaultValue="Motor Revo Operational B 4323 OIA, 2011 dipakai Pak Hasan"
                            className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-blue-500 resize-none"
                        />
                    </div>
                </div>

                {/* Tanggal Mulai */}
                <div className="grid grid-cols-12 items-center gap-4">
                    <label className="col-span-3 text-sm font-bold text-gray-700">
                        Tanggal Mulai
                    </label>
                    <div className="col-span-4 relative">
                        <input 
                            type="text" 
                            defaultValue="03/16/2024"
                            className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-blue-500 pr-10"
                        />
                        <Calendar className="absolute right-3 top-2.5 text-gray-400" size={16} />
                    </div>
                </div>

                {/* Tanggal Akhir */}
                <div className="grid grid-cols-12 items-center gap-4">
                    <label className="col-span-3 text-sm font-bold text-gray-700">
                        Tanggal Akhir
                    </label>
                    <div className="col-span-4 relative">
                        <input 
                            type="text" 
                            defaultValue="03/16/2024"
                            className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-blue-500 pr-10"
                        />
                        <Calendar className="absolute right-3 top-2.5 text-gray-400" size={16} />
                    </div>
                </div>

                {/* Tingkat Reminder */}
                <div className="grid grid-cols-12 items-center gap-4">
                    <label className="col-span-3 text-sm font-bold text-gray-700">
                        Tingkat Reminder
                    </label>
                    <div className="col-span-4">
                        <select className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-blue-500">
                            <option>HIGH</option>
                            <option>MEDIUM</option>
                            <option>LOW</option>
                        </select>
                    </div>
                </div>

                {/* File Attachment */}
                <div className="grid grid-cols-12 items-center gap-4">
                    <label className="col-span-3 text-sm font-bold text-gray-700">
                        File Attachment <span className="text-red-500">*</span>
                    </label>
                    <div className="col-span-9 flex items-center">
                        <div className="border border-gray-300 rounded flex overflow-hidden w-full max-w-md">
                            <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 text-sm font-medium border-r border-gray-300 transition-colors">
                                Pilih File
                            </button>
                            <div className="px-3 py-2 text-sm text-gray-500 bg-white flex-1 truncate">
                                Tidak ada file yang dipilih
                            </div>
                        </div>
                    </div>
                </div>

                {/* File Extension */}
                <div className="grid grid-cols-12 items-start gap-4 -mt-2">
                    <label className="col-span-3 text-sm font-bold text-gray-700 pt-1">
                        File Extension
                    </label>
                    <div className="col-span-9">
                        <p className="text-sm text-gray-500">
                            txt,doc,docx,jpg,png,gif,xls,xlsx,pdf,jpeg
                        </p>
                    </div>
                </div>

            </div>
          ) : (
            /* --- STOCK MASTER FORM (Existing) --- */
            <>
                {/* Section 1: ATK Master Selection */}
                <div className="mb-8">
                    <h3 className="text-blue-500 font-semibold text-sm mb-4">{moduleName} Master</h3>
                    
                    <div className="space-y-4">
                    <div className="grid grid-cols-12 items-center gap-4">
                        <label className="col-span-3 text-sm font-bold text-gray-700">Kategori <span className="text-red-500">*</span></label>
                        <div className="col-span-9">
                        <select className="w-full bg-yellow-100 border border-gray-300 rounded px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-blue-500">
                            <option>Pulpen</option>
                            <option>Tinta Printer</option>
                            <option>Kertas</option>
                        </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-12 items-center gap-4">
                        <label className="col-span-3 text-sm font-bold text-gray-700">Jenis <span className="text-red-500">*</span></label>
                        <div className="col-span-9">
                        <select className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-blue-500">
                            <option>KENKO Joyko K-1 0.5 mm Hitam</option>
                        </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-12 items-center gap-4">
                        <label className="col-span-3 text-sm font-bold text-gray-700">Sisa Stock</label>
                        <div className="col-span-4">
                        <div className="flex items-center">
                            <input 
                                type="text" 
                                value="48" 
                                disabled 
                                className="w-full bg-gray-50 border border-gray-300 rounded-l px-3 py-2 text-sm text-gray-700 focus:outline-none"
                            />
                            <span className="bg-gray-100 border-t border-b border-r border-gray-300 px-3 py-2 text-sm text-gray-600 rounded-r min-w-[3rem] text-center">Pcs</span>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>

                <hr className="border-gray-200 my-6" />

                {/* Section 2: Transaction Input */}
                <div className="mb-8 space-y-4">
                    <div className="grid grid-cols-12 items-center gap-4">
                        <label className="col-span-3 text-sm font-bold text-gray-700">Tanggal Pembelian <span className="text-red-500">*</span></label>
                        <div className="col-span-4 relative">
                        <input 
                            type="text" 
                            placeholder="mm/dd/yyyy"
                            defaultValue="03/16/2024"
                            className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-blue-500 pr-10"
                        />
                        <Calendar className="absolute right-3 top-2.5 text-gray-400" size={16} />
                        </div>
                    </div>

                    <div className="grid grid-cols-12 items-center gap-4">
                        <label className="col-span-3 text-sm font-bold text-gray-700">Jumlah Barang <span className="text-red-500">*</span></label>
                        <div className="col-span-3">
                        <input 
                            type="number" 
                            defaultValue="100"
                            className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-blue-500"
                        />
                        </div>
                        <div className="col-span-1 text-right text-sm font-bold text-gray-700">Satuan</div>
                        <div className="col-span-2">
                            <select className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-blue-500">
                                <option>PCS</option>
                                <option>BOX</option>
                                <option>PACK</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-12 items-center gap-4">
                        <label className="col-span-3 text-sm font-bold text-gray-700">Harga Barang <span className="text-red-500">*</span></label>
                        <div className="col-span-6 flex gap-2">
                            <select className="w-24 bg-white border border-gray-300 rounded px-2 py-2 text-sm text-gray-900 focus:outline-none">
                                <option>IDR</option>
                                <option>USD</option>
                            </select>
                            <input 
                            type="text" 
                            defaultValue="100.000"
                            className="flex-1 bg-white border border-gray-300 rounded px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-blue-500"
                        />
                        </div>
                    </div>

                    <div className="grid grid-cols-12 items-center gap-4">
                        <label className="col-span-3 text-sm font-bold text-gray-700">Harga Rata-Rata</label>
                        <div className="col-span-6">
                        <input 
                            type="text" 
                            defaultValue="1.000"
                            disabled
                            className="w-full bg-gray-50 border border-gray-300 rounded px-3 py-2 text-sm text-gray-700 focus:outline-none"
                        />
                        </div>
                    </div>

                    <div className="grid grid-cols-12 items-start gap-4">
                        <label className="col-span-3 text-sm font-bold text-gray-700 pt-2">Keterangan <span className="text-red-500">*</span></label>
                        <div className="col-span-6">
                        <textarea 
                            rows={3}
                            defaultValue="Pembelian Q2"
                            className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-blue-500 resize-none"
                        />
                        </div>
                    </div>
                </div>

                <hr className="border-gray-200 my-6" />

                {/* Section 3: History Table */}
                <div>
                    <h3 className="text-blue-500 font-semibold text-sm mb-4">History Pembelian {moduleName}</h3>
                    <div className="border border-gray-200 rounded overflow-hidden">
                        <table className="w-full text-left">
                            <thead className="bg-gray-100 border-b border-gray-200 text-xs font-bold text-gray-700">
                                <tr>
                                    <th className="p-3 w-12 text-center">No</th>
                                    <th className="p-3">Tanggal Pembelian</th>
                                    <th className="p-3 text-center">Jumlah Barang</th>
                                    <th className="p-3">Satuan</th>
                                    <th className="p-3 text-right">Harga Barang</th>
                                    <th className="p-3 text-right">Harga Rata-Rata</th>
                                    <th className="p-3">Keterangan</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white text-sm">
                                <tr>
                                    <td className="p-3 text-center text-gray-500">1.</td>
                                    <td className="p-3 text-blue-600 underline cursor-pointer">10 Jan 2024</td>
                                    <td className="p-3 text-center font-semibold">1</td>
                                    <td className="p-3">PCS</td>
                                    <td className="p-3 text-right">
                                        <div className="flex justify-between w-full min-w-[80px]">
                                            <span className="text-gray-500">IDR</span>
                                            <span>1,231</span>
                                        </div>
                                        <div className="flex justify-between w-full border-t border-gray-200 mt-1 pt-1 font-bold">
                                            <span className="text-gray-500 text-xs">Total IDR</span>
                                            <span>1,231</span>
                                        </div>
                                    </td>
                                    <td className="p-3 text-right">
                                        <div className="flex justify-between w-full min-w-[80px]">
                                            <span className="text-gray-500">IDR</span>
                                            <span>1,231</span>
                                        </div>
                                        <div className="flex justify-between w-full border-t border-gray-200 mt-1 pt-1 font-bold">
                                            <span className="text-gray-500 text-xs">IDR</span>
                                            <span>1,231</span>
                                        </div>
                                    </td>
                                    <td className="p-3 font-medium">Pembelian Q1</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </>
          )}

        </div>

        {/* Modal Footer */}
        <div className="px-8 py-4 bg-white border-t border-gray-200 flex justify-end gap-3">
             <button onClick={onClose} className="px-6 py-2 bg-black text-white rounded-full text-sm font-semibold hover:bg-gray-800 transition-colors">
                Draft
             </button>
             <button onClick={onClose} className="px-6 py-2 bg-black text-white rounded-full text-sm font-semibold hover:bg-gray-800 transition-colors">
                Simpan
             </button>
        </div>
      </div>
    </div>
  );
};