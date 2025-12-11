import React from 'react';
import { X, RefreshCcw, Calendar, Upload, Paperclip } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  moduleName?: string;
}

export const AddStockModal: React.FC<Props> = ({ isOpen, onClose, moduleName = 'ATK' }) => {
  if (!isOpen) return null;

  const isContract = moduleName === 'Contract';
  const isVendor = moduleName === 'Vendor';
  const isArk = moduleName === 'ARK';

  const getTitle = () => {
    if (isContract) return 'Reminder Kontrak > NEW';
    if (isVendor) return 'Master Vendor > New Vendor';
    return `Master ${moduleName} > Tambah Stock`;
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-5xl rounded-lg shadow-xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="bg-black text-white px-6 py-4 flex items-center justify-between">
          <h2 className="text-sm font-semibold tracking-wide">
            {getTitle()}
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
          ) : isVendor ? (
            /* --- VENDOR FORM --- */
            <div className="space-y-6">
                <h3 className="text-blue-400 font-semibold text-sm mb-4">Vendor</h3>

                {/* Form Grid */}
                <div className="grid grid-cols-12 gap-x-8 gap-y-4">
                    
                    {/* Row 1: Kode Vendor */}
                    <div className="col-span-6 grid grid-cols-12 items-center gap-2">
                        <label className="col-span-4 text-sm font-bold text-gray-700">Kode Vendor</label>
                        <div className="col-span-8">
                            <input type="text" defaultValue="2209010002" className="w-full bg-gray-50 border border-gray-300 rounded px-3 py-2 text-sm text-gray-900 focus:outline-none" />
                        </div>
                    </div>
                    <div className="col-span-6"></div>

                     {/* Row 2: Nama Perusahaan */}
                     <div className="col-span-6 grid grid-cols-12 items-center gap-2">
                        <label className="col-span-4 text-sm font-bold text-gray-700">Nama Perusahaan</label>
                        <div className="col-span-8">
                            <input type="text" className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-blue-500" />
                        </div>
                    </div>
                    <div className="col-span-6"></div>

                    {/* Row 3: Nama PIC */}
                    <div className="col-span-6 grid grid-cols-12 items-center gap-2">
                        <label className="col-span-4 text-sm font-bold text-gray-700">Nama PIC</label>
                        <div className="col-span-8">
                            <input type="text" className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-blue-500" />
                        </div>
                    </div>
                    <div className="col-span-6"></div>

                    {/* Row 4: Tgl Bergabung & Nama Penerima */}
                    <div className="col-span-6 grid grid-cols-12 items-center gap-2">
                        <label className="col-span-4 text-sm font-bold text-gray-700">Tanggal Bergabung</label>
                        <div className="col-span-8 relative">
                            <input type="text" className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-blue-500 pr-8" />
                            <Calendar className="absolute right-2 top-2 text-gray-400" size={16} />
                        </div>
                    </div>
                    <div className="col-span-6 grid grid-cols-12 items-center gap-2">
                        <label className="col-span-3 text-sm font-bold text-gray-700">Nama Penerima</label>
                        <div className="col-span-9">
                            <input type="text" className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-blue-500" />
                        </div>
                    </div>

                    {/* Row 5: NPWP & Rekening */}
                    <div className="col-span-6 grid grid-cols-12 items-center gap-2">
                        <label className="col-span-4 text-sm font-bold text-gray-700">Nomor NPWP</label>
                        <div className="col-span-8">
                            <input type="text" className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-blue-500" />
                        </div>
                    </div>
                    <div className="col-span-6 grid grid-cols-12 items-center gap-2">
                        <label className="col-span-3 text-sm font-bold text-gray-700">Nomor Rekening</label>
                        <div className="col-span-9">
                            <input type="text" className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-blue-500" />
                        </div>
                    </div>

                    {/* Row 6: Alamat & Kota */}
                    <div className="col-span-6 grid grid-cols-12 items-start gap-2">
                        <label className="col-span-4 text-sm font-bold text-gray-700 pt-2">Alamat</label>
                        <div className="col-span-8">
                            <textarea rows={3} className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-blue-500 resize-none" />
                        </div>
                    </div>
                    <div className="col-span-6 grid grid-cols-12 items-start gap-2">
                        <label className="col-span-3 text-sm font-bold text-gray-700 pt-2">Kota</label>
                        <div className="col-span-9">
                            <select className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-blue-500">
                                <option></option>
                            </select>
                        </div>
                    </div>

                    {/* Row 7: No Telepon & Email */}
                    <div className="col-span-6 grid grid-cols-12 items-center gap-2">
                        <label className="col-span-4 text-sm font-bold text-gray-700">No Telepon</label>
                        <div className="col-span-8">
                            <input type="text" className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-blue-500" />
                        </div>
                    </div>
                    <div className="col-span-6 grid grid-cols-12 items-center gap-2">
                        <label className="col-span-3 text-sm font-bold text-gray-700">Email</label>
                        <div className="col-span-9">
                            <input type="text" className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-blue-500" />
                        </div>
                    </div>

                    {/* Row 8: Kantor Cabang & Status */}
                    <div className="col-span-6 grid grid-cols-12 items-start gap-2">
                        <label className="col-span-4 text-sm font-bold text-gray-700 pt-2">Kantor Cabang</label>
                        <div className="col-span-8">
                             <textarea rows={3} className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-blue-500 resize-none" />
                        </div>
                    </div>
                     <div className="col-span-6 grid grid-cols-12 items-start gap-2">
                        <label className="col-span-3 text-sm font-bold text-gray-700 pt-2">Status</label>
                        <div className="col-span-9 pt-2">
                            <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                                <input type="checkbox" name="toggle" id="toggle" className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 appearance-none cursor-pointer checked:right-0 right-5"/>
                                <label htmlFor="toggle" className="toggle-label block overflow-hidden h-5 rounded-full bg-gray-300 cursor-pointer checked:bg-black"></label>
                            </div>
                        </div>
                    </div>

                    {/* Row 9: Specialist */}
                    <div className="col-span-6 grid grid-cols-12 items-center gap-2">
                        <label className="col-span-4 text-sm font-bold text-gray-700">Specialist</label>
                        <div className="col-span-8">
                             <select className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-blue-500">
                                <option></option>
                            </select>
                        </div>
                    </div>

                </div>

                <hr className="border-gray-200 my-6" />

                {/* History Project Table */}
                <div>
                     <h3 className="text-blue-400 font-semibold text-sm mb-4">History Project</h3>
                     <div className="border-t border-gray-200">
                         <table className="w-full text-left">
                             <thead className="bg-gray-100 border-b border-gray-200 text-xs font-bold text-gray-700">
                                <tr>
                                    <th className="p-3 w-10 text-center">No</th>
                                    <th className="p-3">Nomor Project</th>
                                    <th className="p-3">Tanggal Mulai</th>
                                    <th className="p-3">Selesai</th>
                                    <th className="p-3">Period</th>
                                    <th className="p-3">Total Cost</th>
                                    <th className="p-3">Status Project</th>
                                </tr>
                             </thead>
                             <tbody className="bg-white text-sm">
                                <tr>
                                    <td className="p-3 text-center text-gray-500">1.</td>
                                    <td className="p-3 text-blue-500 font-medium cursor-pointer">PMT-BD2402000232</td>
                                    <td className="p-3 font-semibold text-gray-900">01/03/2022</td>
                                    <td className="p-3 font-semibold text-gray-900">12/05/2022</td>
                                    <td className="p-3 font-semibold text-gray-900">2 Bulan 11 Hari</td>
                                    <td className="p-3 font-bold text-gray-900">Rp. 4.500.000</td>
                                    <td className="p-3 font-medium text-gray-900">Closed</td>
                                </tr>
                             </tbody>
                         </table>
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
                    <div className="border border-gray-200 rounded overflow-hidden overflow-x-auto">
                        <table className="w-full text-left min-w-[900px]">
                            <thead className="bg-gray-100 border-b border-gray-200 text-xs font-bold text-gray-700">
                                <tr>
                                    <th className="p-3 w-12 text-center">No</th>
                                    <th className="p-3 w-32">Tanggal Pembelian</th>
                                    <th className="p-3 w-32 text-center">Jumlah Barang</th>
                                    <th className="p-3 w-20">Satuan</th>
                                    <th className="p-3 w-40 text-right">Harga Barang</th>
                                    <th className="p-3 w-40 text-right">Harga Rata-Rata</th>
                                    {isArk && <th className="p-3 w-24 text-center">Attachment</th>}
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
                                        <div className="flex justify-between w-full">
                                            <span className="text-gray-500">IDR</span>
                                            <span>1,231</span>
                                        </div>
                                        <div className="flex justify-between w-full border-t border-gray-200 mt-1 pt-1 font-bold">
                                            <span className="text-gray-500 text-xs">Total IDR</span>
                                            <span>1,231</span>
                                        </div>
                                    </td>
                                    <td className="p-3 text-right">
                                        <div className="flex justify-between w-full">
                                            <span className="text-gray-500">IDR</span>
                                            <span>1,231</span>
                                        </div>
                                        <div className="flex justify-between w-full border-t border-gray-200 mt-1 pt-1 font-bold">
                                            <span className="text-gray-500 text-xs">IDR</span>
                                            <span>1,231</span>
                                        </div>
                                    </td>
                                    {isArk && (
                                        <td className="p-3 text-center">
                                            <button className="text-gray-400 hover:text-blue-500 transition-colors p-1 hover:bg-gray-100 rounded">
                                                <Paperclip size={16} />
                                            </button>
                                        </td>
                                    )}
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