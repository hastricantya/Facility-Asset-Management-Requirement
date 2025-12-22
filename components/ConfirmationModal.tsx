import React from 'react';
import { X, AlertTriangle, CheckCircle2 } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: 'danger' | 'success' | 'info';
}

export const ConfirmationModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmLabel = 'YES',
  cancelLabel = 'NO',
  variant = 'info'
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center backdrop-blur-[4px] p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden transform animate-in zoom-in-95 duration-200">
        <div className="p-8 flex flex-col items-center text-center">
          <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 ${
            variant === 'danger' ? 'bg-red-50 text-red-500' : 
            variant === 'success' ? 'bg-green-50 text-green-500' : 
            'bg-gray-50 text-black'
          }`}>
            {variant === 'danger' ? <AlertTriangle size={32} /> : <CheckCircle2 size={32} />}
          </div>
          
          <h3 className="text-[16px] font-black text-black uppercase tracking-widest mb-3">
            {title}
          </h3>
          
          <p className="text-[13px] text-gray-500 font-medium leading-relaxed">
            {message}
          </p>
        </div>

        <div className="flex border-t border-gray-100 bg-gray-50/50">
          <button
            onClick={onClose}
            className="flex-1 px-6 py-4 text-[11px] font-black text-gray-400 uppercase tracking-widest hover:bg-gray-100 hover:text-black transition-all"
          >
            {cancelLabel}
          </button>
          <div className="w-[1px] bg-gray-100"></div>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="flex-1 px-6 py-4 text-[11px] font-black text-white bg-black uppercase tracking-widest hover:bg-gray-800 transition-all active:scale-95 shadow-inner"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};