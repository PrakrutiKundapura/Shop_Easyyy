import React from 'react';
import { CheckCircle2, AlertCircle, Info } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const Toast: React.FC = () => {
  const { toast } = useShop();

  if (!toast) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 pointer-events-none animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div
        className={`pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg border text-sm font-medium ${
          toast.type === 'error'
            ? 'bg-rose-50 border-rose-200 text-rose-900'
            : toast.type === 'info'
            ? 'bg-blue-50 border-blue-200 text-blue-900'
            : 'bg-neutral-900 border-neutral-800 text-white'
        }`}
      >
        {toast.type === 'error' ? (
          <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
        ) : toast.type === 'info' ? (
          <Info className="w-5 h-5 text-blue-600 shrink-0" />
        ) : (
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
        )}
        <span>{toast.message}</span>
      </div>
    </div>
  );
};
