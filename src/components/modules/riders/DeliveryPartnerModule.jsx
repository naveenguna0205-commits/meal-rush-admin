import React, { useState, useMemo } from 'react';
import { 
  Bike, 
  MapPin, 
  Phone, 
  ShieldCheck, 
  DollarSign, 
  Navigation, 
  Clock, 
  PlusCircle, 
  Power,
  Receipt
} from 'lucide-react';
import { useAdmin } from '../../../context/AdminContext';
import { StatusBadge } from '../../common/Badge';
import { Modal } from '../../common/Modal';

export const DeliveryPartnerModule = () => {
  const { 
    deliveryPartners, 
    orders, 
    addDeliveryPartner, 
    updatePartnerStatus, 
    verifyPartnerDocument, 
    approvePartner, 
    suspendPartner, 
    processPartnerPayout, 
    addPerformanceBonus, 
    assignPartnerToOrder,
    searchQuery
  } = useAdmin();

  // Tab Filter
  const [activeTab, setActiveTab] = useState('all'); // all, delivering, online, offline, pending
  const [selectedZone, setSelectedZone] = useState('all');

  // Modals & Inspection
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [selectedPartner, setSelectedPartner] = useState(null);
  const [partnerDetailTab, setPartnerDetailTab] = useState('tracking'); // tracking, documents, earnings, history
  
  // Assign Order Modal
  const [assigningPartner, setAssigningPartner] = useState(null);
  
  // Bonus & Payout Modals
  const [bonusAmount, setBonusAmount] = useState('25');
  const [bonusReason, setBonusReason] = useState('Peak Hour Rush Hero Bonus');

  // Registration Form
  const [regForm, setRegForm] = useState({
    name: '',
    email: '',
    phone: '',
    vehicleType: 'Electric Scooter',
    vehicleModel: '',
    licensePlate: '',
    zone: 'Downtown Hub',
    avatar: ''
  });

  // KPI Metrics
  const metrics = useMemo(() => {
    const total = deliveryPartners.length;
    const online = deliveryPartners.filter(p => p.status === 'Online').length;
    const delivering = deliveryPartners.filter(p => p.status === 'Delivering').length;
    const pending = deliveryPartners.filter(p => p.verificationStatus === 'Pending Verification' || p.status === 'Under Review').length;
    const totalWeeklyPayouts = deliveryPartners.reduce((acc, p) => acc + (p.earnings?.thisWeek || 0), 0);
    const avgRating = (deliveryPartners.reduce((acc, p) => acc + (p.rating || 0), 0) / (total || 1)).toFixed(2);
    return { total, online, delivering, pending, totalWeeklyPayouts, avgRating };
  }, [deliveryPartners]);

  // Zones List
  const zonesList = useMemo(() => {
    const zones = new Set();
    deliveryPartners.forEach(p => {
      if (p.zone) zones.add(p.zone);
    });
    return Array.from(zones);
  }, [deliveryPartners]);

  // Filtered Partners
  const filteredPartners = useMemo(() => {
    return deliveryPartners.filter(p => {
      // Tab filter
      if (activeTab === 'delivering' && p.status !== 'Delivering') return false;
      if (activeTab === 'online' && p.status !== 'Online') return false;
      if (activeTab === 'offline' && p.status !== 'Offline') return false;
      if (activeTab === 'pending' && (p.verificationStatus === 'Approved' && p.status !== 'Under Review')) return false;

      // Zone filter
      if (selectedZone !== 'all' && p.zone !== selectedZone) return false;

      // Search filter
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const mName = p.name.toLowerCase().includes(q);
        const mPhone = p.phone?.toLowerCase().includes(q);
        const mPlate = p.licensePlate?.toLowerCase().includes(q);
        const mZone = p.zone?.toLowerCase().includes(q);
        const mId = p.id.toLowerCase().includes(q);
        if (!mName && !mPhone && !mPlate && !mZone && !mId) return false;
      }

      return true;
    });
  }, [deliveryPartners, activeTab, selectedZone, searchQuery]);

  // Unassigned / Pending Orders available for assignment
  const unassignedOrders = useMemo(() => {
    return orders.filter(o => o.orderStatus === 'Pending' || (o.orderStatus === 'Confirmed' && !o.deliveryPartner));
  }, [orders]);

  // Form Submit: Register Partner
  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if (!regForm.name || !regForm.phone) return;

    addDeliveryPartner(regForm);
    setShowRegisterModal(false);
    setRegForm({
      name: '',
      email: '',
      phone: '',
      vehicleType: 'Electric Scooter',
      vehicleModel: '',
      licensePlate: '',
      zone: 'Downtown Hub',
      avatar: ''
    });
  };

  // Inspect Partner
  const handleInspectPartner = (partner, tab = 'tracking') => {
    setSelectedPartner(partner);
    setPartnerDetailTab(tab);
  };

  // Assign Order to Partner
  const handleConfirmAssignment = (orderId) => {
    if (!assigningPartner) return;
    assignPartnerToOrder(orderId, assigningPartner.id);
    setAssigningPartner(null);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header Banner */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-soft">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-black tracking-tight text-slate-900">
                Delivery Partner Management
              </h1>
            </div>
            <p className="text-sm text-slate-500 mt-1">
              Partner registration and document verification • Online/offline status, order assignment, delivery tracking, delivery history, earnings, and performance
            </p>
          </div>

          <button
            onClick={() => setShowRegisterModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-sm shadow-emerald-500/20 transition-all hover-lift active-press"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Onboard New Partner</span>
          </button>
        </div>

        {/* Fleet KPI Metrics Bar */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 pt-4 border-t border-slate-100">
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/60">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Total Fleet</span>
            <p className="text-xl font-black text-slate-900 mt-0.5">{metrics.total}</p>
          </div>
          <div className="p-3 bg-emerald-50/70 rounded-xl border border-emerald-100">
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700">Online & Ready</span>
            <p className="text-xl font-black text-emerald-900 mt-0.5">{metrics.online}</p>
          </div>
          <div className="p-3 bg-teal-50/70 rounded-xl border border-teal-100">
            <span className="text-[11px] font-bold uppercase tracking-wider text-teal-700">Active Delivery</span>
            <p className="text-xl font-black text-teal-900 mt-0.5">{metrics.delivering}</p>
          </div>
          <div className="p-3 bg-amber-50/70 rounded-xl border border-amber-100">
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-700">Pending KYC</span>
            <p className="text-xl font-black text-amber-900 mt-0.5">{metrics.pending}</p>
          </div>
          <div className="p-3 bg-sky-50/70 rounded-xl border border-sky-100">
            <span className="text-[11px] font-bold uppercase tracking-wider text-sky-700">Weekly Payouts</span>
            <p className="text-xl font-black text-sky-900 mt-0.5">${metrics.totalWeeklyPayouts.toLocaleString()}</p>
          </div>
          <div className="p-3 bg-purple-50/70 rounded-xl border border-purple-100">
            <span className="text-[11px] font-bold uppercase tracking-wider text-purple-700">Fleet Rating</span>
            <p className="text-xl font-black text-purple-900 mt-0.5">⭐ {metrics.avgRating}</p>
          </div>
        </div>

        {/* Tab Filters & Zone Select */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mt-6 pt-4 border-t border-slate-100">
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {[
              { id: 'all', label: 'All Partners', count: metrics.total },
              { id: 'delivering', label: 'Delivering Now', count: metrics.delivering, color: 'text-teal-700 bg-teal-50' },
              { id: 'online', label: 'Online / Idle', count: metrics.online, color: 'text-emerald-600 bg-emerald-50' },
              { id: 'offline', label: 'Offline', count: deliveryPartners.filter(p => p.status === 'Offline').length },
              { id: 'pending', label: 'Pending Verification', count: metrics.pending, color: 'text-amber-700 bg-amber-50' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3.5 py-2 text-xs font-bold whitespace-nowrap rounded-xl transition-all ${
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

          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Zone:</span>
            <select
              value={selectedZone}
              onChange={(e) => setSelectedZone(e.target.value)}
              className="px-3 py-1.5 text-xs font-semibold bg-slate-50 border border-slate-200 rounded-lg text-slate-700"
            >
              <option value="all">All Operating Zones</option>
              {zonesList.map(z => (
                <option key={z} value={z}>{z}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Partners Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredPartners.map(partner => {
          const isPendingDoc = partner.verificationStatus !== 'Approved';
          return (
            <div 
              key={partner.id} 
              className="bg-white rounded-2xl border border-slate-200/80 shadow-soft hover:shadow-card hover-lift transition-all flex flex-col justify-between overflow-hidden"
            >
              <div className="p-5">
                {/* Header with Avatar & Status */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <img 
                        src={partner.avatar} 
                        alt={partner.name} 
                        className="w-13 h-13 rounded-2xl object-cover border border-slate-200 shadow-sm"
                      />
                      <span className={`absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full border-2 border-white ${
                        partner.status === 'Delivering' ? 'bg-teal-500 animate-pulse' :
                        partner.status === 'Online' ? 'bg-emerald-500' :
                        partner.status === 'Offline' ? 'bg-slate-400' : 'bg-amber-500'
                      }`} />
                    </div>

                    <div>
                      <div className="flex items-center gap-1.5">
                        <h3 className="font-extrabold text-sm text-slate-900">{partner.name}</h3>
                        <span className="text-[10px] font-mono text-slate-400">[{partner.id}]</span>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-1">
                        <Phone className="w-3 h-3 text-slate-400" />
                        <span>{partner.phone}</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-1">
                    <StatusBadge status={partner.status} />
                    <div className="flex items-center gap-1 text-xs font-bold text-amber-900 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200/60">
                      ⭐ <span>{partner.rating}</span>
                    </div>
                  </div>
                </div>

                {/* Telemetry & Vehicle Details */}
                <div className="mt-4 p-3 bg-slate-50/80 rounded-xl border border-slate-100 space-y-1.5 text-xs text-slate-600">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Vehicle:</span>
                    <span className="font-bold text-slate-800">{partner.vehicleModel} ({partner.licensePlate})</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Assigned Zone:</span>
                    <span className="font-semibold text-slate-700 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-emerald-600" />
                      <span>{partner.zone}</span>
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Current Telemetry:</span>
                    <span className="font-medium text-slate-700 truncate max-w-[170px] text-right">
                      {partner.currentLocation?.address || 'Standby'}
                    </span>
                  </div>
                  {partner.activeOrder && (
                    <div className="flex items-center justify-between pt-1 border-t border-slate-200/50">
                      <span className="text-emerald-800 font-bold">Active Trip:</span>
                      <span className="font-extrabold text-emerald-700 font-mono bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200">
                        {partner.activeOrder}
                      </span>
                    </div>
                  )}
                </div>

                {/* Performance & Earnings Snapshot */}
                <div className="grid grid-cols-3 gap-2 mt-3 text-center">
                  <div className="p-2 bg-slate-50 rounded-lg">
                    <span className="block text-[10px] text-slate-400 uppercase font-bold">Trips</span>
                    <span className="text-xs font-black text-slate-900">{partner.totalDeliveries}</span>
                  </div>
                  <div className="p-2 bg-slate-50 rounded-lg">
                    <span className="block text-[10px] text-slate-400 uppercase font-bold">On-Time</span>
                    <span className="text-xs font-black text-emerald-700">{partner.performance?.onTimeRate || 98}%</span>
                  </div>
                  <div className="p-2 bg-slate-50 rounded-lg">
                    <span className="block text-[10px] text-slate-400 uppercase font-bold">Week Pay</span>
                    <span className="text-xs font-black text-slate-900">${partner.earnings?.thisWeek || 0}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="px-4 py-3 bg-slate-50/70 border-t border-slate-100 flex items-center justify-between gap-2">
                {/* Assign Order Button if Online/Idle */}
                {partner.status === 'Online' ? (
                  <button
                    onClick={() => setAssigningPartner(partner)}
                    className="flex-1 py-1.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-sm shadow-emerald-500/20 hover-lift active-press"
                  >
                    <Navigation className="w-3.5 h-3.5" />
                    <span>Assign Order</span>
                  </button>
                ) : partner.status === 'Delivering' ? (
                  <button
                    onClick={() => handleInspectPartner(partner, 'tracking')}
                    className="flex-1 py-1.5 text-xs font-bold text-teal-800 bg-teal-50 hover:bg-teal-100 border border-teal-200 rounded-lg transition-colors flex items-center justify-center gap-1.5 hover-lift active-press"
                  >
                    <Navigation className="w-3.5 h-3.5 animate-bounce text-teal-600" />
                    <span>Live GPS Track</span>
                  </button>
                ) : (
                  <button
                    onClick={() => updatePartnerStatus(partner.id, 'Online')}
                    className="flex-1 py-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Power className="w-3.5 h-3.5" />
                    <span>Set Online</span>
                  </button>
                )}

                <button
                  onClick={() => handleInspectPartner(partner, isPendingDoc ? 'documents' : 'earnings')}
                  className="flex-1 py-1.5 text-xs font-bold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors flex items-center justify-center gap-1.5"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-slate-500" />
                  <span>Profile & KYC</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filteredPartners.length === 0 && (
        <div className="p-12 text-center bg-white rounded-2xl border border-slate-200/80">
          <Bike className="w-10 h-10 text-slate-300 mx-auto mb-2" />
          <p className="text-sm font-bold text-slate-800">No delivery partners found</p>
          <p className="text-xs text-slate-400 mt-1">Try resetting search or zone filter</p>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: ONBOARD NEW DELIVERY PARTNER */}
      {/* ========================================================================= */}
      <Modal
        isOpen={showRegisterModal}
        onClose={() => setShowRegisterModal(false)}
        title="Onboard & Register Delivery Rider"
      >
        <form onSubmit={handleRegisterSubmit} className="space-y-4 max-h-[75vh] overflow-y-auto pr-1">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">Rider Full Name</label>
              <input
                type="text"
                required
                value={regForm.name}
                onChange={(e) => setRegForm({ ...regForm, name: e.target.value })}
                placeholder="e.g. Alex Henderson"
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">Mobile Phone Number</label>
              <input
                type="text"
                required
                value={regForm.phone}
                onChange={(e) => setRegForm({ ...regForm, phone: e.target.value })}
                placeholder="+1 (555) 000-0000"
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">Email Address</label>
            <input
              type="email"
              required
              value={regForm.email}
              onChange={(e) => setRegForm({ ...regForm, email: e.target.value })}
              placeholder="alex.rider@bitedash.com"
              className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">Vehicle Classification</label>
              <select
                value={regForm.vehicleType}
                onChange={(e) => setRegForm({ ...regForm, vehicleType: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl bg-white"
              >
                <option value="Electric Scooter">Electric Scooter / E-Moped</option>
                <option value="Motorcycle">Motorcycle (125cc - 250cc)</option>
                <option value="Bicycle / E-Bike">Bicycle / Road E-Bike</option>
                <option value="Car">Sedan / Hatchback Automobile</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">Assigned Zone</label>
              <select
                value={regForm.zone}
                onChange={(e) => setRegForm({ ...regForm, zone: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl bg-white"
              >
                <option value="Downtown Hub">Downtown Hub</option>
                <option value="South Sector">South Sector</option>
                <option value="Uptown Tech Hub">Uptown Tech Hub</option>
                <option value="Metro West Suburbs">Metro West Suburbs</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">Vehicle Make & Model</label>
              <input
                type="text"
                required
                value={regForm.vehicleModel}
                onChange={(e) => setRegForm({ ...regForm, vehicleModel: e.target.value })}
                placeholder="e.g. Yamaha E-Vino / Honda Hornet"
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">License Plate / Reg Number</label>
              <input
                type="text"
                required
                value={regForm.licensePlate}
                onChange={(e) => setRegForm({ ...regForm, licensePlate: e.target.value })}
                placeholder="NY-882-EV"
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl font-mono uppercase"
              />
            </div>
          </div>

          <div className="p-3 bg-amber-50 rounded-xl border border-amber-200/70 text-xs text-amber-900 leading-relaxed">
            Upon creation, the partner is placed in <strong>"Under Review"</strong> status with 4 mandatory KYC document placeholders for compliance audit.
          </div>

          <div className="pt-3 flex items-center justify-end gap-3 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setShowRegisterModal(false)}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-sm shadow-emerald-500/20 transition-all hover-lift active-press"
            >
              Register & Begin KYC Verification
            </button>
          </div>
        </form>
      </Modal>

      {/* ========================================================================= */}
      {/* MODAL: ASSIGN ORDER TO RIDER */}
      {/* ========================================================================= */}
      {assigningPartner && (
        <Modal
          isOpen={!!assigningPartner}
          onClose={() => setAssigningPartner(null)}
          title={`Assign Delivery Order to ${assigningPartner.name}`}
        >
          <div className="space-y-4 max-h-[75vh] overflow-y-auto pr-1">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
              <span className="text-slate-600">Rider: <strong>{assigningPartner.name}</strong></span>
              <span className="text-slate-600">Zone: <strong>{assigningPartner.zone}</strong></span>
              <span className="text-slate-600">Vehicle: <strong>{assigningPartner.vehicleModel}</strong></span>
            </div>

            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">Orders Ready For Dispatch:</h4>

            {unassignedOrders.length > 0 ? (
              <div className="space-y-3">
                {unassignedOrders.map(order => (
                  <div 
                    key={order.id} 
                    className="p-4 rounded-xl border border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/20 transition-all flex items-center justify-between gap-4"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-sm text-slate-900 font-mono">{order.id}</span>
                        <StatusBadge status={order.orderStatus} />
                        <span className="text-xs font-extrabold text-slate-900">${order.totalAmount.toFixed(2)}</span>
                      </div>
                      <p className="text-xs text-slate-700 font-semibold mt-1">
                        From: <span className="text-emerald-700">{order.restaurant.name}</span>
                      </p>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Dropoff: {order.customer.address}
                      </p>
                      <p className="text-[11px] text-slate-400 mt-1">
                        {order.items.length} item(s) • Customer: {order.customer.name}
                      </p>
                    </div>

                    <button
                      onClick={() => handleConfirmAssignment(order.id)}
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-sm shadow-emerald-500/20 whitespace-nowrap transition-all hover-lift active-press"
                    >
                      Dispatch Order
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center bg-slate-50 rounded-xl border border-slate-200">
                <Receipt className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                <p className="text-xs font-bold text-slate-700">No unassigned orders right now</p>
                <p className="text-[11px] text-slate-400 mt-1">All incoming customer orders are actively covered by riders.</p>
              </div>
            )}
          </div>
        </Modal>
      )}

      {/* ========================================================================= */}
      {/* MODAL: RIDER PROFILE, GPS TRACKING & EARNINGS BREAKDOWN */}
      {/* ========================================================================= */}
      {selectedPartner && (
        <Modal
          isOpen={!!selectedPartner}
          onClose={() => setSelectedPartner(null)}
          title={`Partner Operations: ${selectedPartner.name}`}
        >
          <div className="space-y-5 max-h-[75vh] overflow-y-auto pr-1">
            {/* Header info card */}
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-200/70">
              <div className="flex items-center gap-3">
                <img src={selectedPartner.avatar} alt="" className="w-12 h-12 rounded-xl object-cover" />
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-extrabold text-sm text-slate-900">{selectedPartner.name}</h3>
                    <StatusBadge status={selectedPartner.status} />
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {selectedPartner.vehicleModel} • Plate: <span className="font-mono text-slate-700">{selectedPartner.licensePlate}</span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                {selectedPartner.status !== 'Suspended' ? (
                  <button
                    onClick={() => suspendPartner(selectedPartner.id)}
                    className="px-2.5 py-1 text-xs font-bold text-rose-700 bg-rose-50 hover:bg-rose-100 rounded-lg border border-rose-200"
                  >
                    Suspend Rider
                  </button>
                ) : (
                  <button
                    onClick={() => approvePartner(selectedPartner.id)}
                    className="px-2.5 py-1 text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-lg border border-emerald-200"
                  >
                    Reactivate
                  </button>
                )}
              </div>
            </div>

            {/* Inner Tabs */}
            <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
              {[
                { id: 'tracking', label: 'Live GPS Tracking', icon: Navigation },
                { id: 'documents', label: 'KYC Documents', icon: ShieldCheck },
                { id: 'earnings', label: 'Earnings & Payouts', icon: DollarSign },
                { id: 'history', label: 'Trip History', icon: Clock },
              ].map(t => {
                const Icon = t.icon;
                const isActive = partnerDetailTab === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => setPartnerDetailTab(t.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      isActive 
                        ? 'bg-slate-900 text-white' 
                        : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{t.label}</span>
                  </button>
                );
              })}
            </div>

            {/* TAB CONTENT 1: LIVE GPS TRACKING */}
            {partnerDetailTab === 'tracking' && (
              <div className="space-y-4">
                {/* Simulated Radar / Map Canvas */}
                <div className="relative h-48 bg-slate-900 rounded-2xl overflow-hidden p-4 border border-slate-800 flex flex-col justify-between text-white">
                  <div className="absolute inset-0 opacity-20 bg-[radial-gradient(var(--brand-hex,#10b981)_1px,transparent_1px)] [background-size:16px_16px]"></div>

                  <div className="relative z-10 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                      <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-400">Live Telemetry Active</span>
                    </div>
                    <span className="text-xs font-mono text-slate-400">Zone: {selectedPartner.zone}</span>
                  </div>

                  <div className="relative z-10 my-auto text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-emerald-600/30 border border-emerald-500 text-emerald-400 mx-auto mb-2">
                      <Bike className="w-6 h-6 animate-pulse" />
                    </div>
                    <p className="text-sm font-extrabold">{selectedPartner.currentLocation?.address}</p>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Speed: {selectedPartner.currentLocation?.speed || 'Idle'} • Battery/Fuel: {selectedPartner.currentLocation?.batteryLevel || 'Nominal'}
                    </p>
                  </div>

                  <div className="relative z-10 flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-800 pt-2">
                    <span>GPS Coordinates: {selectedPartner.currentLocation?.lat || 40.71}, {selectedPartner.currentLocation?.lng || -74.00}</span>
                    <span>Status: <strong>{selectedPartner.status}</strong></span>
                  </div>
                </div>

                {/* Active Order Details if any */}
                {selectedPartner.activeOrder && (
                  <div className="p-4 bg-teal-50 rounded-xl border border-teal-200">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider text-teal-900">Currently Delivering Order</span>
                      <span className="font-mono font-black text-teal-700">{selectedPartner.activeOrder}</span>
                    </div>
                    <p className="text-xs text-teal-950 mt-1">
                      Target Delivery ETA: ~8 minutes remaining. Driver en route from restaurant to customer.
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* TAB CONTENT 2: KYC & VERIFICATION */}
            {partnerDetailTab === 'documents' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">Driver & Vehicle Credentials</h4>
                  {selectedPartner.verificationStatus !== 'Approved' && (
                    <button
                      onClick={() => approvePartner(selectedPartner.id)}
                      className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold shadow-sm"
                    >
                      Approve All & Verify Rider
                    </button>
                  )}
                </div>

                <div className="space-y-2">
                  {selectedPartner.documents?.map((doc, idx) => (
                    <div key={idx} className="p-3 rounded-xl border border-slate-200 flex items-center justify-between bg-white">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-slate-900">{doc.name}</span>
                          <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded ${
                            doc.status === 'Approved' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                          }`}>
                            {doc.status}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 mt-0.5">
                          ID: <span className="font-mono text-slate-600">{doc.number}</span> • Expiry: {doc.expiry}
                        </p>
                      </div>

                      <div className="flex items-center gap-1.5">
                        {doc.status !== 'Approved' ? (
                          <button
                            onClick={() => verifyPartnerDocument(selectedPartner.id, doc.name, 'Approved')}
                            className="px-2.5 py-1 text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors"
                          >
                            Approve
                          </button>
                        ) : (
                          <button
                            onClick={() => verifyPartnerDocument(selectedPartner.id, doc.name, 'Pending Review')}
                            className="px-2 py-1 text-[11px] font-semibold text-slate-400 hover:text-slate-700"
                          >
                            Revoke
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB CONTENT 3: EARNINGS & PAYOUTS */}
            {partnerDetailTab === 'earnings' && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <span className="text-[10px] font-bold uppercase text-slate-400">Today's Earnings</span>
                    <p className="text-xl font-black text-slate-900 mt-0.5">${selectedPartner.earnings?.today || 0}</p>
                  </div>
                  <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200">
                    <span className="text-[10px] font-bold uppercase text-emerald-700">Week-to-Date Payout</span>
                    <p className="text-xl font-black text-emerald-900 mt-0.5">${selectedPartner.earnings?.thisWeek || 0}</p>
                  </div>
                  <div className="p-3 bg-purple-50 rounded-xl border border-purple-200">
                    <span className="text-[10px] font-bold uppercase text-purple-700">Tips Collected</span>
                    <p className="text-xl font-black text-purple-900 mt-0.5">${selectedPartner.earnings?.tipsTotal || 0}</p>
                  </div>
                  <div className="p-3 bg-amber-50 rounded-xl border border-amber-200">
                    <span className="text-[10px] font-bold uppercase text-amber-700">Pending Settlement</span>
                    <p className="text-xl font-black text-amber-900 mt-0.5">${selectedPartner.earnings?.pendingPayout || 0}</p>
                  </div>
                </div>

                {/* Instant Payout Button */}
                {selectedPartner.earnings?.pendingPayout > 0 && (
                  <div className="p-3 bg-slate-900 rounded-xl text-white flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold">Pending Withdrawal Balance</p>
                      <p className="text-base font-black text-emerald-400">${selectedPartner.earnings.pendingPayout.toFixed(2)}</p>
                    </div>
                    <button
                      onClick={() => processPartnerPayout(selectedPartner.id, selectedPartner.earnings.pendingPayout)}
                      className="px-3 py-1.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg text-xs font-bold shadow-sm"
                    >
                      Process Instant Payout
                    </button>
                  </div>
                )}

                {/* Award Performance Bonus */}
                <div className="p-3 bg-emerald-50/70 rounded-xl border border-emerald-100 space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-950">Award Performance Bonus</span>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      value={bonusAmount}
                      onChange={(e) => setBonusAmount(e.target.value)}
                      className="w-24 px-3 py-1.5 text-xs font-bold border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500/20"
                      placeholder="$"
                    />
                    <input
                      type="text"
                      value={bonusReason}
                      onChange={(e) => setBonusReason(e.target.value)}
                      className="flex-1 px-3 py-1.5 text-xs border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500/20"
                      placeholder="Bonus reason..."
                    />
                    <button
                      onClick={() => addPerformanceBonus(selectedPartner.id, bonusAmount, bonusReason)}
                      className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold whitespace-nowrap shadow-sm shadow-emerald-500/20 hover-lift active-press"
                    >
                      Credit Bonus
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* TAB CONTENT 4: DELIVERY HISTORY */}
            {partnerDetailTab === 'history' && (
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">Completed Deliveries Log</h4>
                
                {selectedPartner.deliveryHistory?.length > 0 ? (
                  <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden bg-white">
                    {selectedPartner.deliveryHistory.map((trip, idx) => (
                      <div key={idx} className="p-3 flex items-center justify-between text-xs">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-bold text-slate-900">{trip.orderId}</span>
                            <span className="text-[10px] bg-emerald-50 text-emerald-700 font-bold px-1.5 py-0.2 rounded">Completed</span>
                          </div>
                          <p className="text-slate-500 mt-0.5">
                            {trip.restaurant} → {trip.customer} ({trip.distance})
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-extrabold text-slate-900">+${(trip.fare + trip.tip).toFixed(2)}</p>
                          <span className="text-[10px] text-slate-400">{trip.deliveredAt}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-slate-400 p-4 text-center bg-slate-50 rounded-xl">No historical trips on record yet.</p>
                )}
              </div>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
};
