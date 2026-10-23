import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export default function Toast() {
  const { toastMessage } = useCart();

  if (!toastMessage) return null;

  const isError = toastMessage.type === 'error';
  const isInfo = toastMessage.type === 'info';

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.9 }}
        transition={{ type: 'spring', damping: 25, stiffness: 350 }}
        className="fixed bottom-6 right-6 z-50 max-w-md pointer-events-auto"
      >
        <div
          className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl shadow-2xl border text-sm font-medium ${
            isError
              ? 'bg-rose-900/90 text-white border-rose-700/50 backdrop-blur-md'
              : isInfo
              ? 'bg-slate-900/95 text-white border-slate-700/50 backdrop-blur-md'
              : 'bg-emerald-950/95 text-emerald-100 border-emerald-700/50 backdrop-blur-md'
          }`}
        >
          {isError ? (
            <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
          ) : isInfo ? (
            <Info className="w-5 h-5 text-sky-400 shrink-0" />
          ) : (
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          )}
          <span className="flex-1">{toastMessage.message}</span>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
