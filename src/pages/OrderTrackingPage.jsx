import React from 'react';
import { useParams, Link } from 'react-router-dom';
import OrderStatusTimeline from '../components/tracking/OrderStatusTimeline';
import LiveDriverMap from '../components/tracking/LiveDriverMap';
import OrderItemDetails from '../components/tracking/OrderItemDetails';
import { useOrders } from '../context/OrderContext';
import { ArrowLeft, Clock, ShoppingBag } from 'lucide-react';

export default function OrderTrackingPage() {
  const { orderId } = useParams();
  const { orders, progressOrderStatus, setOrderStepDirect, cancelOrder } = useOrders();

  const currentOrder = orders.find(o => o.id === orderId) || orders[0];

  if (!currentOrder) {
    return (
      <div className="min-h-screen max-w-md mx-auto px-4 py-20 text-center flex flex-col items-center justify-center">
        <h2 className="text-xl font-bold text-slate-900 mb-2">No active order found</h2>
        <p className="text-xs text-slate-500 mb-6">
          You don't have any orders currently being tracked.
        </p>
        <Link
          to="/"
          className="px-5 py-2.5 rounded-xl bg-orange-600 text-white font-bold text-xs"
        >
          Explore Restaurants
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/60 pb-20 pt-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Bar */}
        <div className="flex items-center justify-between mb-6">
          <Link
            to="/orders"
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>All Orders</span>
          </Link>

          <Link
            to="/"
            className="text-xs font-bold text-orange-600 hover:text-orange-700"
          >
            + Order More Food
          </Link>
        </div>

        {/* Tracking Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Timeline & Live Map */}
          <div className="lg:col-span-7 space-y-6">
            <OrderStatusTimeline
              order={currentOrder}
              onProgressStage={progressOrderStatus}
              onSetStepDirect={setOrderStepDirect}
              onCancelOrder={cancelOrder}
            />

            <LiveDriverMap order={currentOrder} />
          </div>

          {/* Right Column: Receipt Breakdown & Courier Details */}
          <div className="lg:col-span-5">
            <OrderItemDetails order={currentOrder} />
          </div>

        </div>

      </div>
    </div>
  );
}
