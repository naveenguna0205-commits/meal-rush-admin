import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  Eye, 
  Bike, 
  CheckCircle, 
  XCircle, 
  Clock, 
  MapPin, 
  Phone, 
  Receipt, 
  RotateCcw, 
  AlertTriangle,
  UserCheck,
  ChevronRight
} from 'lucide-react';
import { useAdmin } from '../../../context/AdminContext';
import { StatusBadge, Badge } from '../../common/Badge';
import { Modal } from '../../common/Modal';

export const OrderManagementModule = () => {
  const { 
    orders, 
    updateOrderStatus, 
    assignPartnerToOrder, 
    processRefund, 
    deliveryPartners,
    searchQuery 
  } = useAdmin();

  const [activeTab, setActiveTab] = useState('all'); // all, pending, confirmed, active, delivered, cancelled
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [assigningOrder, setAssigningOrder] = useState(null);
  const [refundOrder, setRefundOrder] = useState(null);
  const [refundReasonNote, setRefundReasonNote] = useState('');

  // Tab counts
  const counts = useMemo(() => {
    return {
      all: orders.length,
      pending: orders.filter(o => o.orderStatus === 'Pending').length,
      confirmed: orders.filter(o => o.orderStatus === 'Confirmed').length,
      active: orders.filter(o => o.orderStatus === 'Active Delivery').length,
      delivered: orders.filter(o => o.orderStatus === 'Delivered').length,
      cancelled: orders.filter(o => o.orderStatus === 'Cancelled').length,
      refundRequests: orders.filter(o => o.refundRequested && o.refundStatus === 'Pending Review').length,
    };
  }, [orders]);

  // Filter orders
  const filteredOrders = useMemo(() => {
    return orders.filter(order => {
      // Tab filter
      if (activeTab === 'pending' && order.orderStatus !== 'Pending') return false;
      if (activeTab === 'confirmed' && order.orderStatus !== 'Confirmed') return false;
      if (activeTab === 'active' && order.orderStatus !== 'Active Delivery') return false;
      if (activeTab === 'delivered' && order.orderStatus !== 'Delivered') return false;
      if (activeTab === 'cancelled' && order.orderStatus !== 'Cancelled') return false;
      if (activeTab === 'refunds' && (!order.refundRequested || order.refundStatus !== 'Pending Review')) return false;

      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchId = order.id.toLowerCase().includes(query);
        const matchCustomer = order.customer.name.toLowerCase().includes(query);
        const matchRestaurant = order.restaurant.name.toLowerCase().includes(query);
        const matchPhone = order.customer.phone.toLowerCase().includes(query);
        if (!matchId && !matchCustomer && !matchRestaurant && !matchPhone) return false;
      }
      return true;
    });
  }, [orders, activeTab, searchQuery]);

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Module Title & Tab Navigation */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-soft">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-black tracking-tight text-slate-900">Order Management</h1>
            <p className="text-sm text-slate-500 mt-1">
              All orders, pending orders, confirmed orders, and active deliveries • Delivered and cancelled orders, order details, status tracking, and refund requests
            </p>
          </div>

          {counts.refundRequests > 0 && (
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs font-semibold">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
              <span>{counts.refundRequests} Refund Request(s) Awaiting Review</span>
            </div>
          )}
        </div>

        {/* Tab Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none border-b border-slate-100">
          {[
            { id: 'all', label: 'All Orders', count: counts.all },
            { id: 'pending', label: 'Pending', count: counts.pending, color: 'text-amber-600 bg-amber-50' },
            { id: 'confirmed', label: 'Confirmed', count: counts.confirmed, color: 'text-sky-600 bg-sky-50' },
            { id: 'active', label: 'Active Deliveries', count: counts.active, color: 'text-emerald-700 bg-emerald-50' },
            { id: 'delivered', label: 'Delivered', count: counts.delivered, color: 'text-emerald-600 bg-emerald-50' },
            { id: 'cancelled', label: 'Cancelled', count: counts.cancelled, color: 'text-rose-600 bg-rose-50' },
            { id: 'refunds', label: 'Refund Requests', count: counts.refundRequests, color: 'text-purple-600 bg-purple-50' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-3.5 py-2.5 text-xs font-bold whitespace-nowrap rounded-xl transition-all ${
                activeTab === tab.id
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <span>{tab.label}</span>
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                activeTab === tab.id ? 'bg-slate-800 text-white' : tab.color || 'bg-slate-200 text-slate-700'
              }`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-soft overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium">
          <span>Showing {filteredOrders.length} orders</span>
          <span>Click any order to view details, track timeline, or assign rider</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/80 text-slate-600 font-bold uppercase tracking-wider border-b border-slate-100">
              <tr>
                <th className="py-3 px-4">Order ID & Time</th>
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Restaurant</th>
                <th className="py-3 px-4">Items Summary</th>
                <th className="py-3 px-4">Amount & Pay</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Delivery Partner</th>
                <th className="py-3 px-4 text-right">Quick Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-slate-400">
                    No orders match your filter criteria.
                  </td>
                </tr>
              ) : (
                filteredOrders.map(order => (
                  <tr 
                    key={order.id} 
                    className="hover:bg-slate-50/70 transition-colors group cursor-pointer"
                    onClick={() => setSelectedOrder(order)}
                  >
                    <td className="py-3.5 px-4 font-mono font-bold text-emerald-600">
                      <div>{order.id}</div>
                      <span className="text-[10px] font-normal text-slate-400">
                        {new Date(order.placedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="font-bold text-slate-800">{order.customer.name}</div>
                      <div className="text-[11px] text-slate-400">{order.customer.phone}</div>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-slate-800">{order.restaurant.name}</div>
                      <div className="text-[11px] text-slate-400 truncate max-w-[160px]">{order.restaurant.address}</div>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="font-medium text-slate-700">
                        {order.items.map(i => `${i.qty}x ${i.name}`).join(', ')}
                      </div>
                      <div className="text-[11px] text-slate-400">({order.items.length} unique items)</div>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="font-extrabold text-slate-900">${order.totalAmount.toFixed(2)}</div>
                      <div className="text-[10px] text-slate-400 flex items-center gap-1">
                        <span>{order.paymentMethod}</span>
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <StatusBadge status={order.orderStatus} />
                      {order.refundRequested && (
                        <div className="mt-1">
                          <Badge variant="warning" size="xs">Refund Req</Badge>
                        </div>
                      )}
                    </td>

                    <td className="py-3.5 px-4">
                      {order.deliveryPartner ? (
                        <div>
                          <div className="font-semibold text-slate-800 flex items-center gap-1">
                            <Bike className="w-3.5 h-3.5 text-emerald-600" />
                            {order.deliveryPartner.name}
                          </div>
                          <div className="text-[10px] text-slate-400">{order.deliveryPartner.eta}</div>
                        </div>
                      ) : order.orderStatus === 'Cancelled' ? (
                        <span className="text-slate-400 text-[11px]">N/A</span>
                      ) : (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setAssigningOrder(order);
                          }}
                          className="px-2 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 rounded-lg text-[11px] font-bold transition-colors"
                        >
                          + Assign Rider
                        </button>
                      )}
                    </td>

                    <td className="py-3.5 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => setSelectedOrder(order)}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
                          title="View Full Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>

                        {order.refundRequested && order.refundStatus === 'Pending Review' && (
                          <button
                            onClick={() => setRefundOrder(order)}
                            className="px-2 py-1 rounded-lg bg-purple-50 text-purple-700 hover:bg-purple-100 text-[11px] font-bold border border-purple-200 transition-colors"
                          >
                            Review Refund
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Details & Timeline Modal */}
      {selectedOrder && (
        <Modal
          isOpen={!!selectedOrder}
          onClose={() => setSelectedOrder(null)}
          title={`Order Details & Status — ${selectedOrder.id}`}
          maxWidth="max-w-3xl"
        >
          <div className="space-y-6">
            {/* Top Overview Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-slate-50 rounded-xl border border-slate-100">
              <div>
                <span className="text-[11px] font-bold uppercase text-slate-400">Current Status</span>
                <div className="mt-1 flex items-center gap-2">
                  <StatusBadge status={selectedOrder.orderStatus} />
                  <span className="text-xs text-slate-500 font-medium">
                    Placed at {new Date(selectedOrder.placedAt).toLocaleTimeString()}
                  </span>
                </div>
              </div>

              {/* Status Action Buttons */}
              <div className="flex items-center gap-2">
                {selectedOrder.orderStatus === 'Pending' && (
                  <button
                    onClick={() => {
                      updateOrderStatus(selectedOrder.id, 'Confirmed');
                      setSelectedOrder(prev => ({ ...prev, orderStatus: 'Confirmed' }));
                    }}
                    className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm transition-colors"
                  >
                    Confirm Order
                  </button>
                )}

                {selectedOrder.orderStatus === 'Confirmed' && (
                  <button
                    onClick={() => {
                      updateOrderStatus(selectedOrder.id, 'Active Delivery');
                      setSelectedOrder(prev => ({ ...prev, orderStatus: 'Active Delivery' }));
                    }}
                    className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm transition-colors"
                  >
                    Dispatch for Delivery
                  </button>
                )}

                {selectedOrder.orderStatus === 'Active Delivery' && (
                  <button
                    onClick={() => {
                      updateOrderStatus(selectedOrder.id, 'Delivered');
                      setSelectedOrder(prev => ({ ...prev, orderStatus: 'Delivered' }));
                    }}
                    className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm transition-colors"
                  >
                    Mark Delivered
                  </button>
                )}

                {selectedOrder.orderStatus !== 'Cancelled' && selectedOrder.orderStatus !== 'Delivered' && (
                  <button
                    onClick={() => {
                      const reason = prompt('Enter reason for cancellation:');
                      if (reason) {
                        updateOrderStatus(selectedOrder.id, 'Cancelled');
                        setSelectedOrder(prev => ({ ...prev, orderStatus: 'Cancelled' }));
                      }
                    }}
                    className="px-3 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-bold transition-colors"
                  >
                    Cancel Order
                  </button>
                )}
              </div>
            </div>

            {/* Live Progress Timeline */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">Live Dispatch Timeline</h4>
              <div className="grid grid-cols-2 sm:grid-cols-6 gap-2">
                {selectedOrder.orderTimeline.map((step, idx) => (
                  <div key={idx} className={`p-2.5 rounded-xl border text-center ${
                    step.done ? 'bg-emerald-50/70 border-emerald-200 text-emerald-900' : 'bg-slate-50 border-slate-200 text-slate-400'
                  }`}>
                    <div className="flex items-center justify-center mb-1">
                      {step.done ? (
                        <CheckCircle className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <Clock className="w-4 h-4 text-slate-300" />
                      )}
                    </div>
                    <p className="text-[11px] font-bold leading-tight">{step.status}</p>
                    <p className="text-[10px] mt-0.5 opacity-80">{step.time}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Customer & Restaurant 2-Column Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Customer Box */}
              <div className="p-4 rounded-xl border border-slate-200 bg-white">
                <span className="text-[11px] font-bold uppercase text-slate-400">Customer Details</span>
                <div className="mt-2 flex items-center gap-3">
                  <img src={selectedOrder.customer.avatar} alt="" className="w-10 h-10 rounded-full object-cover" />
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{selectedOrder.customer.name}</h4>
                    <p className="text-xs text-slate-500">{selectedOrder.customer.phone}</p>
                    <p className="text-xs text-slate-500">{selectedOrder.customer.email}</p>
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t border-slate-100 text-xs">
                  <div className="flex items-start gap-1.5 text-slate-700">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                    <span>{selectedOrder.customer.address}</span>
                  </div>
                  {selectedOrder.deliveryInstructions && (
                    <p className="mt-1 text-[11px] text-amber-700 bg-amber-50 p-1.5 rounded-lg border border-amber-100">
                      <strong>Delivery Note:</strong> {selectedOrder.deliveryInstructions}
                    </p>
                  )}
                </div>
              </div>

              {/* Restaurant & Rider Box */}
              <div className="p-4 rounded-xl border border-slate-200 bg-white">
                <span className="text-[11px] font-bold uppercase text-slate-400">Restaurant & Fulfillment</span>
                <div className="mt-2">
                  <h4 className="text-sm font-bold text-slate-900">{selectedOrder.restaurant.name}</h4>
                  <p className="text-xs text-slate-500">{selectedOrder.restaurant.address}</p>
                  <p className="text-xs text-slate-500">{selectedOrder.restaurant.phone}</p>
                </div>

                <div className="mt-3 pt-3 border-t border-slate-100">
                  <span className="text-[11px] font-bold uppercase text-slate-400">Assigned Delivery Partner</span>
                  {selectedOrder.deliveryPartner ? (
                    <div className="mt-1 flex items-center justify-between text-xs">
                      <div>
                        <p className="font-bold text-slate-800">{selectedOrder.deliveryPartner.name}</p>
                        <p className="text-slate-500 text-[11px]">{selectedOrder.deliveryPartner.vehicle}</p>
                      </div>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                        {selectedOrder.deliveryPartner.rating} ★
                      </span>
                    </div>
                  ) : (
                    <div className="mt-1 flex items-center justify-between">
                      <span className="text-xs text-amber-600 font-medium">No rider assigned yet</span>
                      <button
                        onClick={() => {
                          setAssigningOrder(selectedOrder);
                        }}
                        className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition-colors"
                      >
                        Assign Now
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Food Items & Bill Breakdown */}
            <div className="p-4 rounded-xl border border-slate-200 bg-white">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">Ordered Food Items</h4>
              <div className="divide-y divide-slate-100 text-xs">
                {selectedOrder.items.map((item, idx) => (
                  <div key={idx} className="py-2.5 flex items-center justify-between">
                    <div>
                      <span className="font-bold text-slate-800">{item.qty}x {item.name}</span>
                      {item.options && (
                        <p className="text-[11px] text-slate-400">{item.options}</p>
                      )}
                    </div>
                    <span className="font-mono font-semibold text-slate-900">
                      ${(item.qty * item.price).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Financial Calculation */}
              <div className="mt-3 pt-3 border-t border-slate-200/80 space-y-1 text-xs">
                <div className="flex justify-between text-slate-500">
                  <span>Subtotal</span>
                  <span className="font-mono">${selectedOrder.itemSubtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Delivery Fee</span>
                  <span className="font-mono">${selectedOrder.deliveryFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Platform Service Fee</span>
                  <span className="font-mono">${selectedOrder.serviceFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Estimated Tax</span>
                  <span className="font-mono">${selectedOrder.tax.toFixed(2)}</span>
                </div>
                {selectedOrder.discount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-medium">
                    <span>Discount Coupon ({selectedOrder.couponCode})</span>
                    <span className="font-mono">-${selectedOrder.discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm font-bold text-slate-900 pt-2 border-t border-slate-200">
                  <span>Total Charged ({selectedOrder.paymentMethod})</span>
                  <span className="font-mono text-base text-emerald-600 font-bold">${selectedOrder.totalAmount.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      )}

      {/* Manual Driver Assignment Modal */}
      {assigningOrder && (
        <Modal
          isOpen={!!assigningOrder}
          onClose={() => setAssigningOrder(null)}
          title={`Assign Delivery Partner to ${assigningOrder.id}`}
        >
          <div className="space-y-4">
            <p className="text-xs text-slate-500">
              Select an available rider nearby to dispatch this order. Restaurant: <strong>{assigningOrder.restaurant.name}</strong>
            </p>

            <div className="space-y-2 max-h-72 overflow-y-auto">
              {deliveryPartners.filter(p => p.verificationStatus === 'Approved').map(partner => (
                <div
                  key={partner.id}
                  className="p-3 rounded-xl border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/30 flex items-center justify-between cursor-pointer transition-all"
                  onClick={() => {
                    assignPartnerToOrder(assigningOrder.id, partner.id);
                    setAssigningOrder(null);
                  }}
                >
                  <div className="flex items-center gap-3">
                    <img src={partner.avatar} alt="" className="w-9 h-9 rounded-full object-cover" />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-900">{partner.name}</span>
                        <StatusBadge status={partner.status} />
                      </div>
                      <p className="text-[11px] text-slate-500">{partner.vehicleModel} • {partner.zone}</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-xs font-bold text-slate-700">{partner.rating} ★</span>
                    <p className="text-[10px] text-slate-400">{partner.totalDeliveries} trips</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Modal>
      )}

      {/* Refund Review & Action Modal */}
      {refundOrder && (
        <Modal
          isOpen={!!refundOrder}
          onClose={() => setRefundOrder(null)}
          title={`Process Refund Request — ${refundOrder.id}`}
        >
          <div className="space-y-4 text-xs">
            <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-amber-900">
              <p className="font-bold">Customer Claim:</p>
              <p className="mt-0.5">{refundOrder.cancellationReason || 'Requested refund due to cancellation/order issue.'}</p>
              <p className="mt-2 font-bold text-slate-900">Requested Refund Amount: ${refundOrder.refundAmount || refundOrder.totalAmount.toFixed(2)}</p>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                Admin Audit Note / Decision Rationale
              </label>
              <textarea
                rows={3}
                value={refundReasonNote}
                onChange={(e) => setRefundReasonNote(e.target.value)}
                placeholder="Enter justification for approving or rejecting this refund..."
                className="w-full p-2.5 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                onClick={() => {
                  processRefund(refundOrder.id, refundOrder.totalAmount, 'reject');
                  setRefundOrder(null);
                }}
                className="px-4 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold rounded-xl border border-rose-200 transition-colors"
              >
                Reject Refund
              </button>
              <button
                onClick={() => {
                  processRefund(refundOrder.id, refundOrder.totalAmount, 'approve');
                  setRefundOrder(null);
                }}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-sm transition-colors"
              >
                Approve & Refund ${refundOrder.totalAmount.toFixed(2)}
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
