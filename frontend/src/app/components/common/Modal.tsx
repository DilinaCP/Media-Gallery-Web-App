"use client"

import React from 'react';
import Button from './Button'
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-200"
        onClick={onClose}
      ></div>

      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 p-6 z-10 border border-slate-200/50 animate-fadeIn">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">{title}</h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X size={20} className="text-slate-600" />
          </button>
        </div>
        <p className="text-slate-700 mb-6 leading-relaxed">{message}</p>
        
        <div className="flex justify-end gap-3">
          <Button
            onClick={onClose}
            variant="secondary"
          >
            {cancelText}
          </Button>
          <Button
            onClick={onConfirm}
            variant="danger"
          >
             {confirmText}
          </Button>
        </div>

        <style jsx>{`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: scale(0.95);
            }
            to {
              opacity: 1;
              transform: scale(1);
            }
          }
          .animate-fadeIn {
            animation: fadeIn 0.2s ease-out;
          }
        `}</style>
      </div>
    </div>
  );
};

export default Modal;
