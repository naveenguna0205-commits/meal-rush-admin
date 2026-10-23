import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, Check, Flame, Sparkles } from 'lucide-react';

export default function CustomizationModal({ isOpen, onClose, item, restaurant, onConfirm }) {
  if (!isOpen || !item) return null;

  const customization = item.customization || {};
  const sizes = customization.sizes || [];
  const addons = customization.addons || [];
  const sauces = customization.sauces || [];

  const [selectedSize, setSelectedSize] = useState(sizes[0] || null);
  const [selectedAddons, setSelectedAddons] = useState([]);
  const [selectedSauce, setSelectedSauce] = useState(sauces[0] || null);
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (item) {
      setSelectedSize(sizes[0] || null);
      setSelectedAddons([]);
      setSelectedSauce(sauces[0] || null);
      setSpecialInstructions('');
      setQuantity(1);
    }
  }, [item]);

  const toggleAddon = (addon) => {
    setSelectedAddons(prev => {
      const exists = prev.some(a => a.id === addon.id);
      if (exists) {
        return prev.filter(a => a.id !== addon.id);
      } else {
        return [...prev, addon];
      }
    });
  };

  // Calculate dynamic unit price
  let currentUnitPrice = item.price;
  if (selectedSize) {
    currentUnitPrice += selectedSize.priceDelta || 0;
  }
  const addonsTotal = selectedAddons.reduce((sum, a) => sum + (a.price || 0), 0);
  currentUnitPrice += addonsTotal;
  if (selectedSauce && selectedSauce.price) {
    currentUnitPrice += selectedSauce.price;
  }

  const grandTotal = currentUnitPrice * quantity;

  const handleAdd = () => {
    const finalCustomization = {
      selectedSize,
      selectedAddons,
      selectedSauce,
      specialInstructions: specialInstructions.trim(),
    };
    onConfirm(item, finalCustomization, restaurant, quantity);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-slate-100 overflow-hidden my-8 max-h-[90vh] flex flex-col"
        >
          {/* Header Image & Info */}
          <div className="relative h-48 w-full bg-slate-100 shrink-0">
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
            
            <button
              type="button"
              onClick={onClose}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-900/70 hover:bg-slate-900 text-white flex items-center justify-center backdrop-blur-sm transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="absolute bottom-3 left-5 right-5 text-white">
              <div className="flex items-center gap-2 mb-1">
                <span
                  className={`w-3.5 h-3.5 rounded-sm border flex items-center justify-center ${
                    item.isVeg ? 'border-emerald-400' : 'border-rose-400'
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      item.isVeg ? 'bg-emerald-400' : 'bg-rose-400'
                    }`}
                  />
                </span>
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-200">
                  {item.isVeg ? 'Pure Veg' : 'Non-Veg'} • {item.calories || 'Gourmet'}
                </span>
              </div>
              <h3 className="text-xl font-bold leading-tight drop-shadow-sm">{item.name}</h3>
            </div>
          </div>

          {/* Scrollable Customization Options */}
          <div className="flex-1 overflow-y-auto p-5 space-y-6 text-left">
            <p className="text-xs text-slate-500 leading-relaxed">
              {item.description}
            </p>

            {/* Sizes / Portions */}
            {sizes.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <h4 className="text-sm font-bold text-slate-900">Choose Size</h4>
                  <span className="text-[10px] font-bold bg-orange-100 text-orange-700 px-2 py-0.5 rounded-md uppercase">
                    Required
                  </span>
                </div>
                <div className="space-y-2">
                  {sizes.map((size) => {
                    const isSelected = selectedSize?.id === size.id;
                    return (
                      <label
                        key={size.id}
                        className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                          isSelected
                            ? 'border-orange-500 bg-orange-50/60 shadow-xs'
                            : 'border-slate-200 hover:border-slate-300 bg-white'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <input
                            type="radio"
                            name="dishSize"
                            checked={isSelected}
                            onChange={() => setSelectedSize(size)}
                            className="w-4 h-4 text-orange-500 border-slate-300 focus:ring-orange-400 accent-orange-500"
                          />
                          <span className="text-xs font-semibold text-slate-800">{size.name}</span>
                        </div>
                        <span className="text-xs font-bold text-slate-700">
                          {size.priceDelta > 0 ? `+$${size.priceDelta.toFixed(2)}` : 'Standard'}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Addons / Toppings */}
            {addons.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <h4 className="text-sm font-bold text-slate-900">Add Extra Toppings & Sides</h4>
                  <span className="text-[10px] font-medium text-slate-400">Optional</span>
                </div>
                <div className="space-y-2">
                  {addons.map((addon) => {
                    const isChecked = selectedAddons.some(a => a.id === addon.id);
                    return (
                      <label
                        key={addon.id}
                        className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                          isChecked
                            ? 'border-orange-500 bg-orange-50/60 shadow-xs'
                            : 'border-slate-200 hover:border-slate-300 bg-white'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => toggleAddon(addon)}
                            className="w-4 h-4 rounded text-orange-500 border-slate-300 focus:ring-orange-400 accent-orange-500"
                          />
                          <span className="text-xs font-medium text-slate-800">{addon.name}</span>
                        </div>
                        <span className="text-xs font-bold text-orange-600">
                          +${addon.price.toFixed(2)}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Sauces / Dips */}
            {sauces.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <h4 className="text-sm font-bold text-slate-900">Choice of Sauce / Dip</h4>
                  <span className="text-[10px] font-medium text-slate-400">Optional</span>
                </div>
                <div className="space-y-2">
                  {sauces.map((sauce) => {
                    const isSelected = selectedSauce?.id === sauce.id;
                    return (
                      <label
                        key={sauce.id}
                        className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                          isSelected
                            ? 'border-orange-500 bg-orange-50/60'
                            : 'border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <input
                            type="radio"
                            name="dishSauce"
                            checked={isSelected}
                            onChange={() => setSelectedSauce(sauce)}
                            className="w-4 h-4 text-orange-500 border-slate-300 focus:ring-orange-400 accent-orange-500"
                          />
                          <span className="text-xs font-medium text-slate-800">{sauce.name}</span>
                        </div>
                        <span className="text-xs font-bold text-slate-600">
                          {sauce.price ? `+$${sauce.price.toFixed(2)}` : 'Free'}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Special Instructions Note */}
            <div>
              <label className="block text-xs font-bold text-slate-900 mb-1.5">
                Special Request for Kitchen (Optional)
              </label>
              <textarea
                value={specialInstructions}
                onChange={(e) => setSpecialInstructions(e.target.value)}
                placeholder="E.g. Extra napkins, less spicy, dressing on the side..."
                rows={2}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-orange-500 transition-colors resize-none"
              />
            </div>
          </div>

          {/* Sticky Footer with Quantity & Price Button */}
          <div className="p-4 border-t border-slate-100 bg-slate-50/80 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 bg-white rounded-xl border border-slate-200 px-3 py-2 shadow-xs">
              <button
                type="button"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-6 h-6 flex items-center justify-center text-slate-500 hover:text-orange-600 hover:bg-slate-100 rounded transition-colors"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="text-sm font-bold text-slate-800 w-6 text-center">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity(quantity + 1)}
                className="w-6 h-6 flex items-center justify-center text-slate-500 hover:text-orange-600 hover:bg-slate-100 rounded transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>

            <button
              type="button"
              onClick={handleAdd}
              className="flex-1 py-3 px-5 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold text-sm shadow-lg shadow-orange-500/25 flex items-center justify-between transition-all"
            >
              <span>Add to Basket</span>
              <span>${grandTotal.toFixed(2)}</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
