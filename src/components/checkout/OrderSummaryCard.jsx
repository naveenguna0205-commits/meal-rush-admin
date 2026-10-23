import React from 'react';
import { ShoppingBag, ArrowRight, ShieldCheck, Tag, Sparkles } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export default function OrderSummaryCard({ selectedSlot, onPlaceOrder, isSubmitting }) {
  const { 
    cart, 
    subtotal, 
    deliveryFee, 
    platformFee, 
    tax, 
    discount, 
    total, 
    activeRestaurant, 
    activeCoupon 
  } = useCart();

  // Add priority fee if selected
  const slotFee = selectedSlot.id === 'priority' ? 1.99 : 0;
  const finalTotal = Math.max(0, total + slotFee);

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-lg text-left sticky top-28 space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div>
          <h3 className="text-base font-bold text-slate-900">Order Summary</h3>
          {activeRestaurant && (
            <p className="text-xs text-slate-500 font-medium">
              From <span className="text-slate-800 font-bold">{activeRestaurant.name}</span>
            </p>
          )}
        </div>
        <span className="text-xs font-bold bg-orange-100 text-orange-700 px-2.5 py-1 rounded-xl">
          {cart.reduce((sum, i) => sum + i.quantity, 0)} Items
        </span>
      </div>

      {/* Mini Items List */}
      <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
        {cart.map((item) => (
          <div key={item.cartItemId} className="flex items-start justify-between gap-3 text-xs">
            <div className="min-w-0 flex-1">
              <div className="font-bold text-slate-800 truncate">
                {item.quantity}x {item.name}
              </div>
              {item.customization && (
                <div className="text-[11px] text-slate-400 truncate mt-0.5">
                  {item.customization.selectedSize?.name}
                  {item.customization.selectedAddons?.length > 0 && ` • +${item.customization.selectedAddons.length} addons`}
                </div>
              )}
            </div>
            <span className="font-bold text-slate-900 shrink-0">
              ${(item.unitPrice * item.quantity).toFixed(2)}
            </span>
          </div>
        ))}
      </div>

      {/* Coupon Applied Badge */}
      {activeCoupon && (
        <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5 text-emerald-800 font-bold">
            <Tag className="w-3.5 h-3.5 text-emerald-600" />
            <span>{activeCoupon.code}</span>
          </div>
          <span className="font-bold text-emerald-600">-${discount.toFixed(2)}</span>
        </div>
      )}

      {/* Pricing Breakdown */}
      <div className="pt-3 border-t border-slate-100 space-y-2 text-xs text-slate-600">
        <div className="flex justify-between">
          <span>Items Subtotal</span>
          <span className="font-semibold text-slate-900">${subtotal.toFixed(2)}</span>
        </div>

        <div className="flex justify-between">
          <span>Delivery Fee</span>
          <span className="font-semibold text-slate-900">
            {deliveryFee === 0 ? (
              <span className="text-emerald-600 font-bold">FREE</span>
            ) : (
              `$${deliveryFee.toFixed(2)}`
            )}
          </span>
        </div>

        {slotFee > 0 && (
          <div className="flex justify-between text-amber-600">
            <span>Direct Express Priority</span>
            <span className="font-semibold">+${slotFee.toFixed(2)}</span>
          </div>
        )}

        <div className="flex justify-between">
          <span>Platform Fee</span>
          <span className="font-semibold text-slate-900">${platformFee.toFixed(2)}</span>
        </div>

        <div className="flex justify-between">
          <span>Taxes & GST (8%)</span>
          <span className="font-semibold text-slate-900">${tax.toFixed(2)}</span>
        </div>

        {discount > 0 && (
          <div className="flex justify-between text-emerald-600 font-bold">
            <span>Discount Savings</span>
            <span>-${discount.toFixed(2)}</span>
          </div>
        )}

        <div className="pt-3 border-t border-slate-100 flex justify-between text-base font-black text-slate-900">
          <span>Grand Total</span>
          <span className="text-orange-600">${finalTotal.toFixed(2)}</span>
        </div>
      </div>

      {/* Place Order Action */}
      <button
        type="button"
        disabled={isSubmitting}
        onClick={onPlaceOrder}
        className="w-full py-4 px-5 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-black text-sm shadow-xl shadow-orange-500/25 flex items-center justify-between transition-all group disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
      >
        <span>{isSubmitting ? 'Processing Payment...' : 'Confirm & Place Order'}</span>
        <div className="flex items-center gap-1.5 group-hover:translate-x-1 transition-transform">
          <span>${finalTotal.toFixed(2)}</span>
          <ArrowRight className="w-4 h-4" />
        </div>
      </button>

      <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400 font-medium">
        <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
        <span>100% Satisfaction Guarantee & Contactless Delivery</span>
      </div>

    </div>
  );
}
