import React from 'react';
import { useApp } from '../context/AppContext';
import { FaTimes, FaCheckCircle, FaInfoCircle } from 'react-icons/fa';

export const ToastContainer = () => {
  const { toasts, removeToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-16 sm:bottom-6 right-4 z-50 flex flex-col gap-2 max-w-sm pointer-events-none">
      {toasts.map(toast => (
        <div
          key={toast.id}
          className="pointer-events-auto bg-gray-900 text-white text-xs px-4 py-3 rounded-xl shadow-xl flex items-center justify-between gap-3 border border-gray-700 animate-slideUp transition-all"
        >
          <div className="flex items-center gap-2.5">
            <span className="text-coral-400 text-sm">
              {toast.type === 'success' ? <FaCheckCircle /> : <FaInfoCircle />}
            </span>
            <span className="font-medium text-gray-100">{toast.message}</span>
          </div>

          <button
            type="button"
            onClick={() => removeToast(toast.id)}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <FaTimes className="text-xs" />
          </button>
        </div>
      ))}
    </div>
  );
};
