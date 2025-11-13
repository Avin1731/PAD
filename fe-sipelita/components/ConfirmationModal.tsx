// app/(dashboard)/pusdatin-dashboard/pengaturan-deadline/components/ConfirmationModal.tsx
'use client';

import { useEffect } from 'react';
import { FaCheckCircle, FaExclamationTriangle, FaTrash } from 'react-icons/fa';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  onConfirm?: () => void;
  variant: 'success' | 'warning' | 'danger';
  showButtons?: boolean;
  confirmLabel?: string; // Default: "Ya"
  cancelLabel?: string;  // Default: "Kembali"
  confirmActionLabel?: string; // Untuk tombol Ya: "Ya, Simpan", "Ya, Hapus"
}

export default function ConfirmationModal({
  isOpen,
  onClose,
  title,
  message,
  onConfirm,
  variant = 'warning',
  showButtons = true,
  confirmLabel = 'Ya',
  cancelLabel = 'Kembali',
  confirmActionLabel,
}: ConfirmationModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const iconClass = "w-16 h-16 mx-auto mb-4";
  const icon = {
    success: <FaCheckCircle className={`${iconClass} text-green-500`} />,
    warning: <FaExclamationTriangle className={`${iconClass} text-yellow-500`} />,
    danger: <FaTrash className={`${iconClass} text-red-500`} />,
  }[variant];

  const buttonClasses = {
    primary: "bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-md transition-colors",
    secondary: "border border-green-600 text-green-600 hover:bg-green-50 font-medium py-2 px-6 rounded-md transition-colors",
  };

  // Gunakan confirmActionLabel jika disediakan, jika tidak gunakan confirmLabel
  const confirmText = confirmActionLabel || confirmLabel;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          ×
        </button>

        {icon}

        <h3 className="text-xl font-bold text-gray-800 text-center mb-2">{title}</h3>
        <p className="text-gray-600 text-center mb-6">{message}</p>

        {showButtons && (
          <div className="flex gap-3 justify-center">
            <button
              onClick={onClose}
              className={buttonClasses.secondary}
            >
              {cancelLabel}
            </button>
            <button
              onClick={onConfirm}
              className={buttonClasses.primary}
            >
              {confirmText}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}