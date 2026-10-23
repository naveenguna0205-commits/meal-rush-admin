import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Receipt, Repeat, Download, MapPin, CreditCard, CheckCircle2 } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { RESTAURANTS } from '../../data/restaurants';

export default function OrderItemDetails({ order }) {
  const navigate = useNavigate();
  const { addToCart, showToast, setIsCartOpen } = useCart();

  if (!order) return null;

  const handleReorder = () => {
    // Find restaurant
    const restaurant = RESTAURANTS.find(r => r.id === order.restaurantId) || {
      id: order.restaurantId,
      name: order.restaurantName,
      deliveryFee: 2.49,
      freeDeliveryAbove: 30,
    };

    order.items.forEach(item => {
      addToCart(item, item.customization, restaurant, item.quantity);
    });

    showToast(`Items from ${order.restaurantName} added to your basket! 🛒`);
    setIsCartOpen(true);
  };

  const handleDownloadReceipt = () => {
    const text = `
=== CRAVINGO ORDER RECEIPT ===
Order ID: ${order.id}
Date: ${new Date(order.date).toLocaleString()}
Restaurant: ${order.restaurantName}

ITEMS:
${order.items.map(i => `- ${i.quantity}x ${i.name} ($${(i.price * i.quantity).toFixed(2)})`).join('\n')}

Subtotal: $${order.pricing?.subtotal?.toFixed(2) || '0.00'}
Delivery Fee: $${order.pricing?.deliveryFee?.toFixed(2) || '0.00'}
Platform Fee: $${order.pricing?.platformFee?.toFixed(2) || '0.00'}
Tax: $${order.pricing?.tax?.toFixed(2) || '0.00'}
Discount: -$${order.pricing?.discount?.toFixed(2) || '0.00'}
TOTAL PAID: $${order.pricing?.total?.toFixed(2) || '0.00'}

Delivering to:
${order.deliveryAddress?.fullName}
${order.deliveryAddress?.street}, ${order.deliveryAddress?.city}
Phone: ${order.deliveryAddress?.phone}

Thank you for choosing Cravingo!
===============================
    `.trim();

    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `receipt-${order.id}.txt`;
    link.click();
    URL.revokeObjectURL(url);
    showToast('Receipt downloaded! 📄');
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-xs text-left space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center font-bold">
            <Receipt className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-black text-slate-900">Order Receipt</h3>
            <p className="text-xs text-slate-500">{order.restaurantName}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleDownloadReceipt}
            className="p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors border border-slate-200 text-xs font-semibold flex items-center gap-1"
            title="Download receipt text"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Receipt</span>
          </button>

          <button
            type="button"
            onClick={handleReorder}
            className="px-3.5 py-2 rounded-xl bg-orange-600 hover:bg-orange-700 text-white transition-all text-xs font-bold flex items-center gap-1.5 shadow-sm active:scale-95 cursor-pointer"
          >
            <Repeat className="w-3.5 h-3.5" />
            <span>Reorder</span>
          </button>
        </div>
      </div>

      {/* Items list */}
      <div className="space-y-3">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Items Ordered</h4>
        {order.items.map((item, idx) => (
          <div key={idx} className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex items-start justify-between gap-3 text-xs">
            <div className="flex items-start gap-3 min-w-0">
              {item.image && (
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-12 h-12 rounded-xl object-cover shrink-0"
                />
              )}
              <div className="min-w-0">
                <div className="font-bold text-slate-900 truncate">
                  {item.quantity}x {item.name}
                </div>
                {item.customization && (
                  <div className="text-[11px] text-slate-500 mt-0.5 space-y-0.5">
                    {item.customization.selectedSize && (
                      <span className="inline-block mr-1 text-slate-600">
                        • {item.customization.selectedSize.name}
                      </span>
                    )}
                    {item.customization.selectedAddons?.map(a => (
                      <span key={a.id || a.name} className="inline-block mr-1 text-slate-600">
                        • +{a.name}
                      </span>
                    ))}
                    {item.customization.specialInstructions && (
                      <div className="italic text-slate-400">
                        Note: {item.customization.specialInstructions}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            <span className="font-bold text-slate-900 shrink-0">
              ${(item.price * item.quantity).toFixed(2)}
            </span>
          </div>
        ))}
      </div>

      {/* Delivery details & Payment */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
        <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 text-xs">
          <div className="flex items-center gap-1.5 font-bold text-slate-800 mb-1">
            <MapPin className="w-3.5 h-3.5 text-orange-500" />
            <span>Delivery Destination</span>
          </div>
          <div className="text-slate-700 font-medium">{order.deliveryAddress?.fullName}</div>
          <div className="text-slate-500 mt-0.5">{order.deliveryAddress?.street}</div>
          <div className="text-slate-400">{order.deliveryAddress?.city}</div>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 text-xs">
          <div className="flex items-center gap-1.5 font-bold text-slate-800 mb-1">
            <CreditCard className="w-3.5 h-3.5 text-emerald-500" />
            <span>Payment Breakdown</span>
          </div>
          <div className="text-slate-700 font-medium">
            {order.paymentMethod?.label || order.paymentMethod?.type || 'Credit Card Secured'}
          </div>
          <div className="text-emerald-700 font-bold mt-1">Paid • Complete</div>
        </div>
      </div>

      {/* Pricing Summary */}
      <div className="pt-3 border-t border-slate-100 space-y-1.5 text-xs text-slate-600">
        <div className="flex justify-between">
          <span>Item Total</span>
          <span className="font-semibold text-slate-900">${order.pricing?.subtotal?.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Delivery Fee</span>
          <span className="font-semibold text-slate-900">
            {order.pricing?.deliveryFee === 0 ? 'FREE' : `$${order.pricing?.deliveryFee?.toFixed(2)}`}
          </span>
        </div>
        <div className="flex justify-between">
          <span>Platform Fee</span>
          <span className="font-semibold text-slate-900">${order.pricing?.platformFee?.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Taxes (8%)</span>
          <span className="font-semibold text-slate-900">${order.pricing?.tax?.toFixed(2)}</span>
        </div>
        {order.pricing?.discount > 0 && (
          <div className="flex justify-between text-emerald-600 font-bold">
            <span>Coupon Discount ({order.pricing?.couponCode || 'PROMO'})</span>
            <span>-${order.pricing?.discount?.toFixed(2)}</span>
          </div>
        )}
        <div className="pt-2 border-t border-slate-100 flex justify-between text-base font-black text-slate-900">
          <span>Total Paid</span>
          <span className="text-orange-600">${order.pricing?.total?.toFixed(2)}</span>
        </div>
      </div>

    </div>
  );
}
