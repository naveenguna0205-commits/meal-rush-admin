import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, Trash2, ArrowRight } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export default function ConflictModal() {
  const { restaurantConflict, resolveConflictAndAdd, cancelConflict } = useCart();

  if (!restaurantConflict) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-white rounded-3xl p-6 sm:p-7 max-w-md w-full shadow-2xl border border-slate-100 text-left"
        >
          <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center mb-4 text-amber-600">
            <AlertTriangle className="w-6 h-6" />
          </div>

          <h3 className="text-xl font-bold text-slate-900 mb-2">
            Replace items in cart?
          </h3>
          
          <p className="text-sm text-slate-600 leading-relaxed mb-6">
            Your cart already contains items from{' '}
            <strong className="text-slate-900 font-semibold">{restaurantConflict.currentRestaurantName}</strong>.
            Do you want to clear your current selection and order from{' '}
            <strong className="text-orange-600 font-semibold">{restaurantConflict.newRestaurantName}</strong> instead?
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              onClick={cancelConflict}
              className="flex-1 px-4 py-3 rounded-xl border border-slate-200 text-slate-700 font-medium hover:bg-slate-50 transition-colors text-sm"
            >
              Keep Existing Cart
            </button>
            <button
              type="button"
              onClick={resolveConflictAndAdd}
              className="flex-1 px-4 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-semibold shadow-lg shadow-orange-500/25 transition-all text-sm flex items-center justify-center gap-2"
            >
              <Trash2 className="w-4 h-4" />
              Start New Order
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
