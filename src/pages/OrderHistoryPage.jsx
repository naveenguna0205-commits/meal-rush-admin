import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useOrders } from '../context/OrderContext';
import { useCart } from '../context/CartContext';
import { RESTAURANTS } from '../data/restaurants';
import { 
  Receipt, 
  Clock, 
  MapPin, 
  Repeat, 
  Navigation, 
  CheckCircle2, 
  XCircle, 
  Bike,
  ArrowRight
} from 'lucide-react';

export default function OrderHistoryPage() {
  const navigate = useNavigate();
  const { orders } = useOrders();
  const { addToCart, showToast, setIsCartOpen } = useCart();

  const [activeTab, setActiveTab] = useState('all');

  const filteredOrders = orders.filter(order => {
    if (activeTab === 'active') return order.statusStep >= 0 && order.statusStep < 4 && order.status !== 'Cancelled';
    if (activeTab === 'delivered') return order.statusStep === 4;
    if (activeTab === 'cancelled') return order.status === 'Cancelled' || order.statusStep === -1;
    return true;
  });

  const handleReorder = (order) => {
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

  return (
    <div className="min-h-screen bg-slate-50/60 pb-20 pt-8 text-left">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-orange-600 mb-1">
              <Receipt className="w-3.5 h-3.5" />
              <span>Your Food Journeys</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Order History & Receipts
            </h1>
          </div>

          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-orange-600 hover:text-orange-700 bg-orange-50 px-4 py-2.5 rounded-xl border border-orange-200"
          >
            <span>Explore Restaurants</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Status Tabs */}
        <div className="flex items-center gap-2 mb-6 overflow-x-auto no-scrollbar pb-1">
          {[
            { id: 'all', label: 'All Orders', count: orders.length },
            { id: 'active', label: 'In Transit / Live', count: orders.filter(o => o.statusStep >= 0 && o.statusStep < 4 && o.status !== 'Cancelled').length },
            { id: 'delivered', label: 'Delivered', count: orders.filter(o => o.statusStep === 4).length },
            { id: 'cancelled', label: 'Cancelled', count: orders.filter(o => o.status === 'Cancelled' || o.statusStep === -1).length },
          ].map(tab => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80'
              }`}
            >
              <span>{tab.label}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-md ${
                activeTab === tab.id ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
              }`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Orders List */}
        {filteredOrders.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/80 max-w-md mx-auto my-12">
            <div className="w-16 h-16 rounded-2xl bg-orange-50 text-orange-500 flex items-center justify-center mx-auto mb-3 text-3xl">
              🧾
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-1">
              No orders found
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              You haven't placed any orders in this category yet.
            </p>
            <Link
              to="/"
              className="px-5 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs"
            >
              Discover Restaurants
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredOrders.map((order) => {
              const isDelivered = order.statusStep === 4;
              const isCancelled = order.status === 'Cancelled' || order.statusStep === -1;
              const isActive = !isDelivered && !isCancelled;

              return (
                <div
                  key={order.id}
                  className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 hover:border-slate-300 shadow-xs hover:shadow-md transition-all space-y-4"
                >
                  {/* Top Bar */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                    <div className="flex items-center gap-3">
                      {order.restaurantLogo && (
                        <img
                          src={order.restaurantLogo}
                          alt={order.restaurantName}
                          className="w-12 h-12 rounded-xl object-cover border border-slate-100 shrink-0"
                        />
                      )}
                      <div>
                        <h3 className="text-base font-bold text-slate-900 leading-tight">
                          {order.restaurantName}
                        </h3>
                        <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
                          <span className="font-mono font-medium text-slate-500">{order.id}</span>
                          <span>•</span>
                          <span>{new Date(order.date).toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                        </div>
                      </div>
                    </div>

                    {/* Status Badge */}
                    <div>
                      {isActive && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold bg-amber-50 text-amber-800 border border-amber-200">
                          <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
                          <span>{order.status || 'In Transit'}</span>
                        </span>
                      )}
                      {isDelivered && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Delivered</span>
                        </span>
                      )}
                      {isCancelled && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold bg-rose-50 text-rose-800 border border-rose-200">
                          <XCircle className="w-3.5 h-3.5 text-rose-500" />
                          <span>Cancelled</span>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Items summary */}
                  <div className="text-xs text-slate-600 space-y-1">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex justify-between items-center">
                        <span className="truncate max-w-sm">
                          <strong className="text-slate-800">{item.quantity}x</strong> {item.name}
                          {item.customization?.selectedSize && (
                            <span className="text-slate-400"> ({item.customization.selectedSize.name})</span>
                          )}
                        </span>
                        <span className="font-semibold text-slate-800 shrink-0">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Bottom Footer & Actions */}
                  <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="text-xs">
                      <span className="text-slate-400">Total Paid: </span>
                      <strong className="text-base font-black text-slate-900">
                        ${order.pricing?.total?.toFixed(2) || '0.00'}
                      </strong>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleReorder(order)}
                        className="px-3.5 py-2 rounded-xl border border-slate-200 hover:border-slate-300 text-slate-700 hover:bg-slate-50 font-bold text-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                      >
                        <Repeat className="w-3.5 h-3.5 text-slate-500" />
                        <span>Reorder</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => navigate(`/order-tracking/${order.id}`)}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm cursor-pointer ${
                          isActive
                            ? 'bg-orange-600 hover:bg-orange-700 text-white shadow-orange-500/25'
                            : 'bg-slate-900 hover:bg-slate-800 text-white'
                        }`}
                      >
                        <Navigation className="w-3.5 h-3.5" />
                        <span>{isActive ? 'Live Tracking' : 'View Receipt'}</span>
                      </button>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
}
