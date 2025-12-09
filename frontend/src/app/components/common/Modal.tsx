"use client"

import React from 'react';
import Button from './Button'

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
        className="fixed inset-0 bg-black/50"
        onClick={onClose}
      ></div>

      <div className="relative bg-blue-100 rounded-lg shadow-xl max-w-md w-full mx-4 p-6 z-10 border border-blue-400">
        <h2 className="text-xl font-bold mb-4 text-black">{title}</h2>
        <p className="text-gray-900 mb-6">{message}</p>
        
        <div className="flex justify-end gap-3">
          <Button
            onClick={onClose}
          >
            {cancelText}
          </Button>
          <Button
          onClick={onConfirm}
          variant='danger'
          >
             {confirmText}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
