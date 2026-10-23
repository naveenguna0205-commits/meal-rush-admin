import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ArrowRight, 
  Tag, 
  Check, 
  AlertCircle, 
  Sparkles,
  Bike
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { COUPONS } from '../../data/coupons';

export default function CartDrawer() {
  const { 
    cart, 
    isCartOpen, 
    setIsCartOpen, 
    updateQuantity, 
    removeFromCart, 
    clearCart,
    subtotal, 
    deliveryFee, 
    platformFee, 
    tax, 
    discount, 
    total,
    activeRestaurant,
    activeCoupon,
    applyCoupon,
    removeCoupon
  } = useCart();

  const navigate = useNavigate();
  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');

  const handleApplyCoupon = (codeToApply) => {
    const code = codeToApply || couponInput;
    if (!code) return;
    setCouponError('');
    const result = applyCoupon(code);
    if (!result.success) {
      setCouponError(result.message);
    } else {
      setCouponInput('');
    }
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    navigate('/checkout');
  };

  // Free delivery progress calculation
  const freeThreshold = activeRestaurant?.freeDeliveryAbove || 30;
  const amountNeededForFreeDelivery = Math.max(0, freeThreshold - subtotal);
  const freeDeliveryProgress = Math.min(100, (subtotal / freeThreshold) * 100);

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm transition-opacity"
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-0 sm:pl-10">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="w-screen max-w-md bg-white shadow-2xl flex flex-col h-full"
            >
              {/* Header */}
              <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center font-bold">
                    <ShoppingBag className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900">Your Basket</h3>
                    {activeRestaurant && (
                      <p className="text-xs text-slate-500 font-medium truncate max-w-[220px]">
                        From <span className="text-slate-800 font-semibold">{activeRestaurant.name}</span>
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  {cart.length > 0 && (
                    <button
                      type="button"
                      onClick={clearCart}
                      className="text-xs font-semibold text-rose-500 hover:text-rose-600 px-2.5 py-1.5 rounded-lg hover:bg-rose-50 transition-colors"
                    >
                      Clear
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => setIsCartOpen(false)}
                    className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Free delivery tracker banner */}
              {cart.length > 0 && (
                <div className="bg-orange-50/80 border-b border-orange-100/80 px-5 py-3">
                  <div className="flex items-center justify-between text-xs font-semibold text-orange-950 mb-1.5">
                    <span className="flex items-center gap-1.5">
                      <Bike className="w-4 h-4 text-orange-500" />
                      {amountNeededForFreeDelivery === 0 ? (
                        <span className="text-emerald-700 font-bold">🎉 Free Delivery unlocked!</span>
                      ) : (
                        <span>Add ${amountNeededForFreeDelivery.toFixed(2)} more for FREE delivery</span>
                      )}
                    </span>
                    <span className="text-[11px] text-orange-800">
                      ${subtotal.toFixed(2)} / ${freeThreshold}
                    </span>
                  </div>
                  <div className="w-full bg-orange-200/60 rounded-full h-1.5 overflow-hidden">
                    <div
                      className="bg-orange-500 h-full rounded-full transition-all duration-300"
                      style={{ width: `${freeDeliveryProgress}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Body */}
              <div className="flex-1 overflow-y-auto p-5 space-y-4">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center py-12">
                    <div className="w-24 h-24 rounded-3xl bg-orange-50 flex items-center justify-center text-5xl mb-4 shadow-inner">
                      🍔
                    </div>
                    <h4 className="text-lg font-bold text-slate-900 mb-1">Your cart is empty</h4>
                    <p className="text-xs text-slate-500 max-w-xs mb-6">
                      Explore top-rated restaurants, choose delicious dishes, and customize them to your taste.
                    </p>
                    <button
                      type="button"
                      onClick={() => setIsCartOpen(false)}
                      className="px-6 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-semibold text-xs shadow-md transition-all"
                    >
                      Browse Menu
                    </button>
                  </div>
                ) : (
                  <>
                    {/* Items List */}
                    <div className="space-y-3.5">
                      {cart.map((item) => (
                        <div
                          key={item.cartItemId}
                          className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/70 hover:border-slate-300 transition-all flex gap-3 text-left"
                        >
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-16 h-16 rounded-xl object-cover shrink-0 shadow-sm"
                          />
                          <div className="flex-1 min-w-0 flex flex-col justify-between">
                            <div>
                              <div className="flex items-start justify-between gap-1">
                                <h5 className="text-sm font-bold text-slate-900 truncate">
                                  {item.name}
                                </h5>
                                <span className="text-sm font-bold text-slate-900 shrink-0">
                                  ${(item.unitPrice * item.quantity).toFixed(2)}
                                </span>
                              </div>

                              {/* Customization Details */}
                              {item.customization && (
                                <div className="mt-1 text-[11px] text-slate-500 space-y-0.5">
                                  {item.customization.selectedSize && (
                                    <span className="inline-block bg-white px-1.5 py-0.5 rounded border border-slate-200 text-slate-600 font-medium mr-1 mb-0.5">
                                      {item.customization.selectedSize.name}
                                    </span>
                                  )}
                                  {item.customization.selectedAddons?.map(addon => (
                                    <span key={addon.id} className="inline-block bg-white px-1.5 py-0.5 rounded border border-slate-200 text-slate-600 mr-1 mb-0.5">
                                      +{addon.name}
                                    </span>
                                  ))}
                                  {item.customization.selectedSauce && (
                                    <span className="inline-block bg-white px-1.5 py-0.5 rounded border border-slate-200 text-slate-600 mr-1 mb-0.5">
                                      {item.customization.selectedSauce.name}
                                    </span>
                                  )}
                                  {item.customization.specialInstructions && (
                                    <p className="italic text-slate-400 truncate mt-0.5">
                                      Note: "{item.customization.specialInstructions}"
                                    </p>
                                  )}
                                </div>
                              )}
                            </div>

                            {/* Quantity Controls */}
                            <div className="flex items-center justify-between mt-3 pt-2 border-t border-slate-200/50">
                              <span className="text-xs text-slate-400 font-medium">
                                ${item.unitPrice.toFixed(2)} each
                              </span>

                              <div className="flex items-center gap-2 bg-white rounded-xl border border-slate-200 px-2 py-1 shadow-xs">
                                <button
                                  type="button"
                                  onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                                  className="w-5 h-5 flex items-center justify-center text-slate-500 hover:text-rose-600 hover:bg-slate-100 rounded transition-colors"
                                  aria-label="Decrease quantity"
                                >
                                  {item.quantity === 1 ? (
                                    <Trash2 className="w-3.5 h-3.5 text-rose-500" />
                                  ) : (
                                    <Minus className="w-3 h-3" />
                                  )}
                                </button>
                                <span className="text-xs font-bold text-slate-800 w-5 text-center">
                                  {item.quantity}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                                  className="w-5 h-5 flex items-center justify-center text-slate-500 hover:text-orange-600 hover:bg-slate-100 rounded transition-colors"
                                  aria-label="Increase quantity"
                                >
                                  <Plus className="w-3 h-3" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Promo Coupon Section */}
                    <div className="pt-2">
                      <div className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                        <Tag className="w-3.5 h-3.5 text-orange-500" />
                        Offers & Coupons
                      </div>

                      {activeCoupon ? (
                        <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-between">
                          <div className="flex items-center gap-2.5">
                            <div className="w-7 h-7 rounded-xl bg-emerald-500 text-white flex items-center justify-center font-bold text-xs">
                              <Check className="w-4 h-4" />
                            </div>
                            <div>
                              <div className="text-xs font-bold text-emerald-950 flex items-center gap-1.5">
                                <span>{activeCoupon.code}</span>
                                <span className="text-[10px] bg-emerald-200/70 text-emerald-800 px-1.5 py-0.2 rounded font-semibold">
                                  Applied
                                </span>
                              </div>
                              <div className="text-[11px] text-emerald-700">
                                {activeCoupon.description}
                              </div>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={removeCoupon}
                            className="text-xs font-bold text-rose-600 hover:text-rose-700 hover:bg-rose-50 px-2 py-1 rounded-lg transition-colors"
                          >
                            Remove
                          </button>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <div className="flex gap-2">
                            <input
                              type="text"
                              value={couponInput}
                              onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                              placeholder="Enter coupon (e.g. FEAST50)"
                              className="flex-1 px-3.5 py-2 text-xs uppercase font-medium bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:border-orange-500 transition-colors"
                            />
                            <button
                              type="button"
                              onClick={() => handleApplyCoupon()}
                              className="px-4 py-2 bg-slate-900 hover:bg-orange-600 text-white text-xs font-bold rounded-xl transition-colors shadow-sm"
                            >
                              Apply
                            </button>
                          </div>

                          {couponError && (
                            <div className="text-[11px] text-rose-600 flex items-center gap-1">
                              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                              <span>{couponError}</span>
                            </div>
                          )}

                          {/* Quick Coupon Chips */}
                          <div className="flex flex-wrap gap-1.5 pt-1">
                            {COUPONS.slice(0, 3).map((coupon) => (
                              <button
                                key={coupon.code}
                                type="button"
                                onClick={() => handleApplyCoupon(coupon.code)}
                                className="px-2.5 py-1 rounded-lg border border-orange-200 bg-orange-50/60 hover:bg-orange-100 text-orange-700 text-[11px] font-bold transition-all flex items-center gap-1"
                              >
                                <Sparkles className="w-3 h-3 text-orange-500" />
                                {coupon.code} ({coupon.title})
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>

              {/* Footer / Bill Details */}
              {cart.length > 0 && (
                <div className="p-5 border-t border-slate-100 bg-white space-y-3 shadow-lg">
                  <div className="space-y-1.5 text-xs text-slate-600">
                    <div className="flex justify-between">
                      <span>Item Subtotal</span>
                      <span className="font-semibold text-slate-900">${subtotal.toFixed(2)}</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="flex items-center gap-1">
                        Delivery Fee
                        {deliveryFee === 0 && (
                          <span className="text-[10px] font-bold text-emerald-600 bg-emerald-100 px-1 py-0.2 rounded">
                            FREE
                          </span>
                        )}
                      </span>
                      <span className="font-semibold text-slate-900">
                        {deliveryFee === 0 ? '$0.00' : `$${deliveryFee.toFixed(2)}`}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span>Platform & Tech Fee</span>
                      <span className="font-semibold text-slate-900">${platformFee.toFixed(2)}</span>
                    </div>

                    <div className="flex justify-between">
                      <span>Estimated Taxes (8%)</span>
                      <span className="font-semibold text-slate-900">${tax.toFixed(2)}</span>
                    </div>

                    {discount > 0 && (
                      <div className="flex justify-between text-emerald-600 font-bold">
                        <span>Coupon Savings</span>
                        <span>-${discount.toFixed(2)}</span>
                      </div>
                    )}

                    <div className="pt-2 border-t border-slate-100 flex justify-between text-base font-black text-slate-900">
                      <span>To Pay</span>
                      <span className="text-orange-600">${total.toFixed(2)}</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleProceedToCheckout}
                    className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold text-sm shadow-xl shadow-orange-500/25 flex items-center justify-between transition-all group cursor-pointer"
                  >
                    <div className="flex flex-col text-left">
                      <span className="text-[10px] uppercase font-semibold text-orange-100">
                        {cart.reduce((sum, i) => sum + i.quantity, 0)} Items
                      </span>
                      <span className="text-base font-extrabold leading-none">
                        ${total.toFixed(2)}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 text-white font-bold group-hover:translate-x-1 transition-transform">
                      <span>Proceed to Checkout</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
