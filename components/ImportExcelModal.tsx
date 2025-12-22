import React, { useState, useRef } from 'react';
import { X, Download, UploadCloud, FileSpreadsheet, AlertCircle, CheckCircle2 } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onImport: (file: File) => void;
  title: string;
}

export const ImportExcelModal: React.FC<Props> = ({ isOpen, onClose, onImport, title }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  if (!isOpen) return null;

  const handleFileSelection = (file: File) => {
    if (file && (file.name.endsWith('.xlsx') || file.name.endsWith('.xls') || file.name.endsWith('.csv'))) {
      setSelectedFile(file);
    } else {
      alert('Please upload a valid Excel file (.xlsx or .xls)');
    }
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelection(e.target.files[0]);
    }
  };

  const handleImport = () => {
    if (selectedFile) {
      onImport(selectedFile);
      setSelectedFile(null);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-[110] flex items-center justify-center backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden flex flex-col transform animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-8 py-6 border-b border-gray-100 flex items-center justify-between">
          <div>
            <h2 className="text-[16px] font-black text-black uppercase tracking-widest">{title}</h2>
            <p className="text-[10px] text-gray-400 font-bold uppercase mt-1 tracking-widest">Bulk Data Management</p>
          </div>
          <button onClick={onClose} className="text-gray-300 hover:text-black transition-colors p-1">
            <X size={24} />
          </button>
        </div>

        {/* Body */}
        <div className="p-10 space-y-10">
          {/* Step 1: Download Template */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center text-[10px] font-black">1</div>
              <h3 className="text-[11px] font-black text-black uppercase tracking-wider">Download Template</h3>
            </div>
            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 flex items-center justify-between group hover:border-black transition-all cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-green-600 shadow-sm">
                  <FileSpreadsheet size={24} />
                </div>
                <div>
                  <p className="text-[13px] font-black text-black uppercase tracking-tight">Master_Data_Template.xlsx</p>
                  <p className="text-[10px] text-gray-400 font-medium uppercase">Format standar untuk import data masal</p>
                </div>
              </div>
              <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-[10px] font-black text-black uppercase tracking-widest group-hover:bg-black group-hover:text-white transition-all shadow-sm">
                <Download size={14} /> Download
              </button>
            </div>
          </div>

          {/* Step 2: Upload File */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center text-[10px] font-black">2</div>
              <h3 className="text-[11px] font-black text-black uppercase tracking-wider">Upload Completed File</h3>
            </div>
            
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept=".xlsx, .xls, .csv" 
              onChange={onFileChange} 
            />

            <div 
              onClick={() => fileInputRef.current?.click()}
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={(e) => { e.preventDefault(); setIsDragging(false); if(e.dataTransfer.files[0]) handleFileSelection(e.dataTransfer.files[0]); }}
              className={`relative border-2 border-dashed rounded-2xl p-10 flex flex-col items-center justify-center transition-all cursor-pointer
                ${selectedFile ? 'border-green-500 bg-green-50/30' : isDragging ? 'border-black bg-gray-50 scale-[0.98]' : 'border-gray-100 hover:border-black hover:bg-gray-50/50'}
              `}
            >
              {selectedFile ? (
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto mb-4 shadow-inner">
                    <CheckCircle2 size={32} />
                  </div>
                  <p className="text-[14px] font-black text-black uppercase tracking-tight">{selectedFile.name}</p>
                  <p className="text-[10px] text-gray-400 font-bold uppercase mt-1">Ready to process</p>
                  <button 
                    onClick={(e) => { e.stopPropagation(); setSelectedFile(null); }}
                    className="mt-4 text-[10px] font-black text-red-500 uppercase tracking-widest hover:underline"
                  >
                    Change File
                  </button>
                </div>
              ) : (
                <>
                  <div className="w-16 h-16 rounded-full bg-white border border-gray-100 flex items-center justify-center shadow-sm mb-4">
                    <UploadCloud size={28} className="text-gray-300" />
                  </div>
                  <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest text-center">
                    Click to browse or drag and drop your file here
                  </p>
                  <p className="text-[9px] font-bold text-gray-300 mt-2 uppercase">Supported: .XLSX, .XLS (MAX. 10MB)</p>
                </>
              )}
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-xl border border-blue-100">
            <AlertCircle size={18} className="text-blue-500 shrink-0 mt-0.5" />
            <p className="text-[10px] font-bold text-blue-700 uppercase leading-relaxed">
              Pastikan format kolom pada file Excel Anda sudah sesuai dengan template agar data dapat terbaca dengan sempurna oleh sistem.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-8 py-6 bg-gray-50 border-t border-gray-100 flex justify-end gap-3 shrink-0">
          <button onClick={onClose} className="px-8 py-3 text-[11px] font-black text-gray-400 uppercase tracking-widest hover:text-black transition-all">Cancel</button>
          <button 
            onClick={handleImport}
            disabled={!selectedFile}
            className="px-12 py-3 text-[11px] font-black text-white bg-black rounded-xl shadow-xl shadow-black/20 hover:bg-gray-800 transition-all active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed uppercase tracking-widest"
          >
            Process Import
          </button>
        </div>
      </div>
    </div>
  );
};