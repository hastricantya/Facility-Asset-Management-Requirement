import React, { useState } from 'react';
import { X, RefreshCcw, Calendar, Upload, Paperclip, Camera, Image as ImageIcon } from 'lucide-react';
import { VehicleRecord } from '../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  moduleName?: string;
  onSaveVehicle?: (vehicle: Partial<VehicleRecord>) => void;
}

export const AddStockModal: React.FC<Props> = ({ isOpen, onClose, moduleName = 'ATK', onSaveVehicle }) => {
  const [selectedDetail, setSelectedDetail] = useState<boolean>(false);
  
  // Local state for Vehicle form fields
  const [vehicleForm, setVehicleForm] = useState({
      noRegistrasi: '301-00208',
      nama: 'Toyota Avanza 1.3 CVT E Warna Putih Q2 BM Purwokerto',
      noPolisi: 'B 1708 CZY',
      channel: 'Human Capital Operation',
      cabang: 'Pusat'
  });

  const handleVehicleChange = (field: string, value: string) => {
      setVehicleForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
      if (moduleName === 'Daftar Aset' && onSaveVehicle) {
          onSaveVehicle({
              noRegistrasi: vehicleForm.noRegistrasi,
              nama: vehicleForm.nama,
              noPolisi: vehicleForm.noPolisi,
              channel: vehicleForm.channel,
              cabang: vehicleForm.cabang
          });
      }
      onClose();
  };

  if (!isOpen) return null;

  const isContract = moduleName === 'Contract';
  const isVendor = moduleName === 'Vendor';
  const isArk = moduleName === 'ARK';
  const isVehicle = moduleName === 'Daftar Aset';

  const getTitle = () => {
    if (isContract) return 'Reminder Kontrak > NEW';
    if (isVendor) return 'Master Vendor > New Vendor';
    if (isVehicle) return 'Daftar Aset Kendaraan > Baru';
    return `Master ${moduleName} > Tambah Stock`;
  }

  // Helper for red asterisk
  const Required = () => <span className="text-red-500">*</span>;

  // Helper for section header
  const SectionHeader: React.FC<{ title: string }> = ({ title }) => (
      <h3 className="text-gray-900 font-bold text-sm mb-4 border-b border-gray-200 pb-2">{title}</h3>
  );

  // Nested Detail Modal
  const renderDetailModal = () => {
    if (!selectedDetail) return null;
    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 backdrop-blur-[1px] p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-200 border border-gray-200">
                {/* Header */}
                <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                    <div>
                        <h3 className="font-bold text-gray-800">Detail Transaksi</h3>
                        <p className="text-xs text-gray-500">ID Transaksi: TRX-20240110-001</p>
                    </div>
                    <button 
                        onClick={() => setSelectedDetail(false)} 
                        className="text-gray-400 hover:text-gray-600 hover:bg-gray-200 p-1 rounded-full transition-all"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Body */}
                <div className="p-6 space-y-6">
                    <div className="flex items-center gap-4 bg-blue-50 p-4 rounded-lg border border-blue-100">
                         <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center shrink-0">
                            <RefreshCcw size={24} />
                         </div>
                         <div>
                             <p className="text-sm font-semibold text-gray-900">Pembelian Stock</p>
                             <p className="text-xs text-gray-500">Kategori: {moduleName}</p>
                         </div>
                    </div>

                    <div className="grid grid-cols-2 gap-y-6 gap-x-4">
                        <div>
                            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Tanggal Pembelian</p>
                            <p className="font-medium text-gray-900 text-sm">10 Januari 2024</p>
                        </div>
                        <div>
                            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Jumlah</p>
                            <p className="font-medium text-gray-900 text-sm">1 PCS</p>
                        </div>
                        <div>
                            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Harga Satuan</p>
                            <p className="font-medium text-gray-900 text-sm font-mono">IDR 1,231</p>
                        </div>
                        <div>
                            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Total Harga</p>
                            <p className="font-medium text-gray-900 text-sm font-mono">IDR 1,231</p>
                        </div>
                         <div className="col-span-2">
                            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Keterangan</p>
                            <p className="font-medium text-gray-900 text-sm bg-gray-50 p-3 rounded border border-gray-100">
                                Pembelian Q1 - Restock reguler untuk kebutuhan operasional.
                            </p>
                        </div>
                        {isArk && (
                             <div className="col-span-2">
                                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Lampiran</p>
                                <div className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors group">
                                    <div className="bg-red-100 p-2 rounded text-red-600">
                                         <Paperclip size={18} />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-gray-900 group-hover:text-blue-600 group-hover:underline">invoice_pembelian_jan24.pdf</p>
                                        <p className="text-xs text-gray-500">2.4 MB • PDF</p>
                                    </div>
                                </div>
                             </div>
                        )}
                    </div>
                </div>

                {/* Footer */}
                <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex justify-end">
                    <button 
                        onClick={() => setSelectedDetail(false)} 
                        className="px-5 py-2 bg-white border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors shadow-sm"
                    >
                        Tutup
                    </button>
                </div>
            </div>
        </div>
    )
  }

  return (
    <>
    {renderDetailModal()}
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center backdrop-blur-sm p-4">
      <div className={`bg-white w-full ${isVehicle ? 'max-w-7xl' : 'max-w-5xl'} rounded-lg shadow-xl overflow-hidden flex flex-col max-h-[90vh]`}>
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
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar bg-white">
          
          {isContract ? (
            /* --- CONTRACT FORM --- */
            <div className="space-y-6 max-w-4xl">
                
                {/* Nama Kontrak */}
                <div className="grid grid-cols-12 items-start gap-4">
                    <label className="col-span-3 text-sm font-bold text-gray-700 pt-2">
                        Nama Kontrak <Required />
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
                        File Attachment <Required />
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

          ) : isVehicle ? (
              /* --- VEHICLE FORM (Daftar Aset) --- */
              <div className="flex flex-col lg:flex-row gap-8">
                  {/* Left Column */}
                  <div className="flex-1 space-y-8">
                      {/* Detail Informasi */}
                      <div>
                          <SectionHeader title="Detail Informasi" />
                          <div className="space-y-4">
                              {/* Row 1 */}
                              <div className="flex gap-4">
                                  <div className="w-1/4">
                                      <label className="block text-xs font-medium text-gray-500 mb-1">No. Registrasi <Required/></label>
                                      <input 
                                          type="text" 
                                          value={vehicleForm.noRegistrasi}
                                          onChange={(e) => handleVehicleChange('noRegistrasi', e.target.value)}
                                          className="w-full bg-gray-50 border border-gray-300 rounded px-3 py-2 text-sm text-gray-900 focus:outline-none" 
                                      />
                                  </div>
                                  <div className="w-2/4">
                                      <label className="block text-xs font-medium text-gray-500 mb-1">Deskripsi Lengkap <Required/></label>
                                      <input 
                                        type="text" 
                                        value={vehicleForm.nama}
                                        onChange={(e) => handleVehicleChange('nama', e.target.value)}
                                        className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-blue-500" 
                                      />
                                  </div>
                                  <div className="w-1/4">
                                      <label className="block text-xs font-medium text-gray-500 mb-1">No. Polisi <Required/></label>
                                      <input 
                                        type="text" 
                                        value={vehicleForm.noPolisi}
                                        onChange={(e) => handleVehicleChange('noPolisi', e.target.value)}
                                        className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-blue-500" 
                                      />
                                  </div>
                              </div>
                              {/* Row 2 */}
                              <div className="flex gap-4">
                                  <div className="w-1/3">
                                      <label className="block text-xs font-medium text-gray-500 mb-1">Merek <Required/></label>
                                      <input type="text" defaultValue="TOYOTA" className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-blue-500" />
                                  </div>
                                  <div className="w-1/3">
                                      <label className="block text-xs font-medium text-gray-500 mb-1">Tipe Kendaraan <Required/></label>
                                      <input type="text" defaultValue="AVANZA" className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-blue-500" />
                                  </div>
                                  <div className="w-1/3">
                                      <label className="block text-xs font-medium text-gray-500 mb-1">Jenis <Required/></label>
                                      <input type="text" defaultValue="1.3 G" className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-blue-500" />
                                  </div>
                              </div>
                              {/* Row 3 */}
                              <div className="flex gap-4">
                                  <div className="w-1/3">
                                      <label className="block text-xs font-medium text-gray-500 mb-1">Model <Required/></label>
                                      <input type="text" defaultValue="A/T" className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-blue-500" />
                                  </div>
                                  <div className="w-1/3">
                                      <label className="block text-xs font-medium text-gray-500 mb-1">Tahun Pembuatan <Required/></label>
                                      <input type="text" defaultValue="2022" className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-blue-500" />
                                  </div>
                                  <div className="w-1/3">
                                      <label className="block text-xs font-medium text-gray-500 mb-1">Warna <Required/></label>
                                      <input type="text" defaultValue="Putih" className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-blue-500" />
                                  </div>
                              </div>
                              {/* Row 4 */}
                              <div className="flex gap-4">
                                  <div className="w-1/3">
                                      <label className="block text-xs font-medium text-gray-500 mb-1">Isi Silinder</label>
                                      <input type="text" defaultValue="1329 CC" className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-blue-500" />
                                  </div>
                                  <div className="w-1/3">
                                      <label className="block text-xs font-medium text-gray-500 mb-1">No. Rangka</label>
                                      <input type="text" defaultValue="MHKAA1BY9NK00868" className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-blue-500" />
                                  </div>
                                  <div className="w-1/3">
                                      <label className="block text-xs font-medium text-gray-500 mb-1">No. Mesin</label>
                                      <input type="text" defaultValue="1NRG188335" className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-blue-500" />
                                  </div>
                              </div>
                          </div>
                      </div>

                      {/* Pengguna */}
                      <div>
                          <SectionHeader title="Pengguna" />
                          <div className="flex gap-4">
                              <div className="w-1/3">
                                  <label className="block text-xs font-medium text-gray-500 mb-1">Channel <Required/></label>
                                  <select 
                                      value={vehicleForm.channel}
                                      onChange={(e) => handleVehicleChange('channel', e.target.value)}
                                      className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-blue-500"
                                  >
                                      <option>Human Capital Operation</option>
                                      <option>Traditional</option>
                                      <option>Management</option>
                                      <option>HR</option>
                                  </select>
                              </div>
                              <div className="w-1/3">
                                  <label className="block text-xs font-medium text-gray-500 mb-1">Dept / Cabang <Required/></label>
                                  <select 
                                      value={vehicleForm.cabang}
                                      onChange={(e) => handleVehicleChange('cabang', e.target.value)}
                                      className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-blue-500"
                                  >
                                      <option>Pusat</option>
                                      <option>Bandung</option>
                                      <option>Surabaya</option>
                                      <option>Purwokerto</option>
                                      <option>Pekanbaru</option>
                                      <option>Palembang</option>
                                      <option>Manado</option>
                                      <option>Malang</option>
                                      <option>Kediri</option>
                                  </select>
                              </div>
                              <div className="w-1/3">
                                  <label className="block text-xs font-medium text-gray-500 mb-1">Pengguna <Required/></label>
                                  <input type="text" defaultValue="Pak Supriaji" className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-blue-500" />
                              </div>
                          </div>
                      </div>

                      {/* Lampiran */}
                      <div>
                          <SectionHeader title="Lampiran" />
                          <div className="mb-2">
                              <label className="block text-xs font-medium text-gray-500 mb-2">Gambar <Required/></label>
                              <div className="grid grid-cols-6 gap-4">
                                  {['Tampak Depan *', 'Tampak Belakang *', 'Tampak Kiri *', 'Tampak Kanan *', 'Foto STNK *', 'Foto KIR'].map((label, idx) => (
                                      <div key={idx} className="flex flex-col gap-1">
                                          <div className="aspect-[3/4] rounded-lg border-2 border-dashed border-gray-300 flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer group relative overflow-hidden">
                                              {/* Placeholder Image as per screenshot style */}
                                               <img src={`https://picsum.photos/id/${100 + idx}/200/300`} className="absolute inset-0 w-full h-full object-cover opacity-80" alt={label} />
                                               <div className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-black/20 transition-all">
                                                   {/* Overlay content if needed */}
                                               </div>
                                          </div>
                                          <span className="text-[10px] text-center font-medium text-gray-600">{label}</span>
                                      </div>
                                  ))}
                              </div>
                          </div>
                      </div>
                  </div>

                  {/* Right Column */}
                  <div className="flex-1 space-y-8">
                      {/* Surat */}
                      <div>
                          <SectionHeader title="Surat" />
                          <div className="space-y-4">
                              <div className="flex gap-4">
                                  <div className="w-1/2">
                                      <label className="block text-xs font-medium text-gray-500 mb-1">No. BPKB <Required/></label>
                                      <input type="text" defaultValue="S-03714594" className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-blue-500" />
                                  </div>
                                  <div className="w-1/2">
                                      <label className="block text-xs font-medium text-gray-500 mb-1">Keterangan BPKB</label>
                                      <input type="text" className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-blue-500" />
                                  </div>
                              </div>
                              <div className="flex gap-4">
                                  <div className="w-1/3">
                                      <label className="block text-xs font-medium text-gray-500 mb-1">Masa Berlaku 1 Tahun <Required/></label>
                                      <input type="date" defaultValue="2024-02-15" className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-blue-500" />
                                  </div>
                                  <div className="w-1/3">
                                      <label className="block text-xs font-medium text-gray-500 mb-1">Masa Berlaku 5 Tahun <Required/></label>
                                      <input type="date" defaultValue="2025-02-15" className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-blue-500" />
                                  </div>
                                  <div className="w-1/3">
                                      <label className="block text-xs font-medium text-gray-500 mb-1">Masa Berlaku KIR</label>
                                      <input type="date" className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-blue-500" />
                                  </div>
                              </div>
                          </div>
                      </div>

                      {/* Pembelian */}
                      <div>
                          <SectionHeader title="Pembelian" />
                          <div className="flex gap-4">
                              <div className="w-1/2">
                                  <label className="block text-xs font-medium text-gray-500 mb-1">Tgl Beli <Required/></label>
                                  <input type="date" defaultValue="2022-08-01" className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-blue-500" />
                              </div>
                              <div className="w-1/2">
                                  <label className="block text-xs font-medium text-gray-500 mb-1">Harga Beli <Required/></label>
                                  <div className="relative">
                                      <span className="absolute left-3 top-2 text-sm text-gray-500">Rp</span>
                                      <input type="text" defaultValue="225.000.000" className="w-full bg-white border border-gray-300 rounded pl-8 pr-3 py-2 text-sm text-right text-gray-900 focus:outline-none focus:border-blue-500" />
                                  </div>
                              </div>
                          </div>
                      </div>

                      {/* Asuransi */}
                      <div>
                          <SectionHeader title="Asuransi" />
                          <div className="flex gap-4">
                              <div className="w-1/2">
                                  <label className="block text-xs font-medium text-gray-500 mb-1">No Polis</label>
                                  <input type="text" className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-blue-500" />
                              </div>
                              <div className="w-1/2">
                                  <label className="block text-xs font-medium text-gray-500 mb-1">Jangka Pertanggungan</label>
                                  <input type="date" className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-blue-500" />
                              </div>
                          </div>
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
                        <label className="col-span-3 text-sm font-bold text-gray-700">Kategori <Required/></label>
                        <div className="col-span-9">
                        <select className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-blue-500">
                            <option>Pulpen</option>
                            <option>Tinta Printer</option>
                            <option>Kertas</option>
                        </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-12 items-center gap-4">
                        <label className="col-span-3 text-sm font-bold text-gray-700">Jenis <Required/></label>
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
                        <label className="col-span-3 text-sm font-bold text-gray-700">Tanggal Pembelian <Required/></label>
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
                        <label className="col-span-3 text-sm font-bold text-gray-700">Jumlah Barang <Required/></label>
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
                        <label className="col-span-3 text-sm font-bold text-gray-700">Harga Barang <Required/></label>
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
                        <label className="col-span-3 text-sm font-bold text-gray-700 pt-2">Keterangan <Required/></label>
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
                                            <button className="text-gray-400 hover:text-blue-500 transition-colors p-2 hover:bg-gray-100 rounded-full">
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
             <button onClick={handleSave} className="px-6 py-2 bg-black text-white rounded-full text-sm font-semibold hover:bg-gray-800 transition-colors">
                Simpan
             </button>
        </div>
      </div>
    </div>
    </>
  );
};