import React, { useState, useMemo } from 'react';
import { 
  Users, 
  Phone, 
  MapPin, 
  ShoppingBag, 
  RotateCcw, 
  Star, 
  AlertCircle, 
  ShieldAlert, 
  Wallet, 
  FileText
} from 'lucide-react';
import { useAdmin } from '../../../context/AdminContext';
import { StatusBadge } from '../../common/Badge';
import { Modal } from '../../common/Modal';

export const CustomerManagementModule = () => {
  const { 
    customers, 
    updateCustomerStatus, 
    addCustomerCredit, 
    resolveCustomerComplaint, 
    addCustomerAdminNote,
    searchQuery
  } = useAdmin();

  // Filters
  const [activeTab, setActiveTab] = useState('all'); // all, vip, active, flagged, suspended, complaints
  const [selectedTier, setSelectedTier] = useState('all');

  // Inspected Customer Modal & Sub-tab
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [customerModalTab, setCustomerModalTab] = useState('profile'); // profile, orders, refunds, reviews, complaints, actions

  // Quick Action Forms
  const [creditAmount, setCreditAmount] = useState('15');
  const [creditReason, setCreditReason] = useState('Customer Goodwill / Delay Compensation');
  const [resolutionNote, setResolutionNote] = useState('');
  const [adminNoteInput, setAdminNoteInput] = useState('');

  // Summary Metrics
  const metrics = useMemo(() => {
    const total = customers.length;
    const active = customers.filter(c => c.status === 'Active').length;
    const vip = customers.filter(c => c.tier === 'VIP Black' || c.tier === 'Gold Member').length;
    const flagged = customers.filter(c => c.status === 'Flagged' || c.status === 'Suspended').length;
    const openComplaintsCount = customers.reduce((acc, c) => {
      const openOnes = c.complaints?.filter(comp => comp.status === 'Open') || [];
      return acc + openOnes.length;
    }, 0);
    const totalLTV = customers.reduce((acc, c) => acc + (c.lifetimeSpend || 0), 0);
    return { total, active, vip, flagged, openComplaintsCount, totalLTV };
  }, [customers]);

  // Filtered Customers
  const filteredCustomers = useMemo(() => {
    return customers.filter(c => {
      // Tab filter
      if (activeTab === 'vip' && (c.tier !== 'VIP Black' && c.tier !== 'Gold Member')) return false;
      if (activeTab === 'active' && c.status !== 'Active') return false;
      if (activeTab === 'flagged' && c.status !== 'Flagged') return false;
      if (activeTab === 'suspended' && c.status !== 'Suspended') return false;
      if (activeTab === 'complaints') {
        const hasOpen = c.complaints?.some(comp => comp.status === 'Open');
        if (!hasOpen) return false;
      }

      // Tier filter
      if (selectedTier !== 'all' && c.tier !== selectedTier) return false;

      // Search filter
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const mName = c.name.toLowerCase().includes(q);
        const mEmail = c.email.toLowerCase().includes(q);
        const mPhone = c.phone?.toLowerCase().includes(q);
        const mId = c.id.toLowerCase().includes(q);
        if (!mName && !mEmail && !mPhone && !mId) return false;
      }

      return true;
    });
  }, [customers, activeTab, selectedTier, searchQuery]);

  // Handle open customer modal
  const handleOpenCustomer = (customer, tab = 'profile') => {
    setSelectedCustomer(customer);
    setCustomerModalTab(tab);
    setAdminNoteInput(customer.adminNotes || '');
    setResolutionNote('');
  };

  // Submit wallet credit
  const handleIssueCredit = (e) => {
    e.preventDefault();
    if (!selectedCustomer || !creditAmount) return;
    addCustomerCredit(selectedCustomer.id, creditAmount, creditReason);
    // update locally for instant modal refresh
    setSelectedCustomer(prev => ({
      ...prev,
      walletBalance: Number((prev.walletBalance + parseFloat(creditAmount)).toFixed(2))
    }));
  };

  // Save admin note
  const handleSaveNote = () => {
    if (!selectedCustomer) return;
    addCustomerAdminNote(selectedCustomer.id, adminNoteInput);
    setSelectedCustomer(prev => ({ ...prev, adminNotes: adminNoteInput }));
  };

  // Resolve complaint
  const handleResolveComplaint = (complaintId) => {
    if (!selectedCustomer) return;
    const note = resolutionNote.trim() || 'Resolved by Administrator via Account Concierge';
    resolveCustomerComplaint(selectedCustomer.id, complaintId, note);
    // update locally for modal view
    setSelectedCustomer(prev => ({
      ...prev,
      complaints: prev.complaints.map(comp => 
        comp.id === complaintId ? { ...comp, status: 'Resolved', resolution: note } : comp
      )
    }));
    setResolutionNote('');
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header Banner */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-soft">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-black tracking-tight text-slate-900">
                Customer Management
              </h1>
            </div>
            <p className="text-sm text-slate-500 mt-1">
              Customer listing, profiles, contact information, and order history • Addresses, refund history, reviews, complaints, and account status management
            </p>
          </div>

          {metrics.openComplaintsCount > 0 && (
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-rose-50 border border-rose-200 text-rose-900 text-xs font-semibold">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{metrics.openComplaintsCount} Open Support Ticket(s) Require Attention</span>
            </div>
          )}
        </div>

        {/* Quick KPI Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 pt-4 border-t border-slate-100">
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/60">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Total Registered</span>
            <p className="text-xl font-black text-slate-900 mt-0.5">{metrics.total}</p>
          </div>
          <div className="p-3 bg-emerald-50/70 rounded-xl border border-emerald-100">
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700">Active Accounts</span>
            <p className="text-xl font-black text-emerald-900 mt-0.5">{metrics.active}</p>
          </div>
          <div className="p-3 bg-purple-50/70 rounded-xl border border-purple-100">
            <span className="text-[11px] font-bold uppercase tracking-wider text-purple-700">VIP / Gold Tier</span>
            <p className="text-xl font-black text-purple-900 mt-0.5">{metrics.vip}</p>
          </div>
          <div className="p-3 bg-rose-50/70 rounded-xl border border-rose-100">
            <span className="text-[11px] font-bold uppercase tracking-wider text-rose-700">Flagged / Suspended</span>
            <p className="text-xl font-black text-rose-900 mt-0.5">{metrics.flagged}</p>
          </div>
          <div className="p-3 bg-amber-50/70 rounded-xl border border-amber-100">
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-700">Open Complaints</span>
            <p className="text-xl font-black text-amber-900 mt-0.5">{metrics.openComplaintsCount}</p>
          </div>
          <div className="p-3 bg-sky-50/70 rounded-xl border border-sky-100">
            <span className="text-[11px] font-bold uppercase tracking-wider text-sky-700">Total Cohort LTV</span>
            <p className="text-xl font-black text-sky-900 mt-0.5">${metrics.totalLTV.toLocaleString()}</p>
          </div>
        </div>

        {/* Tab Filters */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mt-6 pt-4 border-t border-slate-100">
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {[
              { id: 'all', label: 'All Customers', count: metrics.total },
              { id: 'vip', label: 'VIP Members', count: metrics.vip, color: 'text-purple-700 bg-purple-50' },
              { id: 'active', label: 'Active', count: metrics.active, color: 'text-emerald-700 bg-emerald-50' },
              { id: 'flagged', label: 'Flagged Accounts', count: customers.filter(c => c.status === 'Flagged').length, color: 'text-amber-700 bg-amber-50' },
              { id: 'suspended', label: 'Suspended', count: customers.filter(c => c.status === 'Suspended').length, color: 'text-rose-700 bg-rose-50' },
              { id: 'complaints', label: 'Tickets / Complaints', count: metrics.openComplaintsCount, color: 'text-rose-700 bg-rose-50', alert: metrics.openComplaintsCount > 0 },
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
            <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Tier:</span>
            <select
              value={selectedTier}
              onChange={(e) => setSelectedTier(e.target.value)}
              className="px-3 py-1.5 text-xs font-semibold bg-slate-50 border border-slate-200 rounded-lg text-slate-700"
            >
              <option value="all">All Tiers</option>
              <option value="VIP Black">VIP Black</option>
              <option value="Gold Member">Gold Member</option>
              <option value="Regular">Regular</option>
            </select>
          </div>
        </div>
      </div>

      {/* Customer Listing Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCustomers.map(customer => {
          const hasOpenComplaint = customer.complaints?.some(comp => comp.status === 'Open');
          return (
            <div
              key={customer.id}
              className={`bg-white rounded-2xl border shadow-soft hover:shadow-card transition-all flex flex-col justify-between overflow-hidden ${
                hasOpenComplaint ? 'border-amber-300 ring-1 ring-amber-200' : 'border-slate-200/80'
              }`}
            >
              <div className="p-5">
                {/* Header with Avatar & Tier Badge */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img 
                      src={customer.avatar} 
                      alt={customer.name}
                      className="w-12 h-12 rounded-2xl object-cover border border-slate-200 shadow-sm"
                    />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h3 className="font-extrabold text-sm text-slate-900">{customer.name}</h3>
                        <span className="text-[10px] font-mono text-slate-400">[{customer.id}]</span>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">{customer.email}</p>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-1">
                    <StatusBadge status={customer.status} />
                    <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-md border ${
                      customer.tier === 'VIP Black' 
                        ? 'bg-slate-900 text-amber-300 border-slate-800' 
                        : customer.tier === 'Gold Member'
                        ? 'bg-amber-50 text-amber-800 border-amber-200'
                        : 'bg-slate-100 text-slate-600 border-slate-200'
                    }`}>
                      {customer.tier}
                    </span>
                  </div>
                </div>

                {/* Key Account Stats */}
                <div className="grid grid-cols-3 gap-2 mt-4 text-center">
                  <div className="p-2 bg-slate-50 rounded-xl">
                    <span className="block text-[10px] text-slate-400 uppercase font-bold">Total Orders</span>
                    <span className="text-xs font-black text-slate-900">{customer.totalOrdersCount}</span>
                  </div>
                  <div className="p-2 bg-slate-50 rounded-xl">
                    <span className="block text-[10px] text-slate-400 uppercase font-bold">Lifetime LTV</span>
                    <span className="text-xs font-black text-emerald-700">${customer.lifetimeSpend?.toFixed(2)}</span>
                  </div>
                  <div className="p-2 bg-slate-50 rounded-xl">
                    <span className="block text-[10px] text-slate-400 uppercase font-bold">Wallet Cash</span>
                    <span className="text-xs font-black text-purple-700">${customer.walletBalance?.toFixed(2)}</span>
                  </div>
                </div>

                {/* Contact & Address Snippet */}
                <div className="mt-3 space-y-1 text-xs text-slate-500">
                  <div className="flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{customer.phone}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="truncate">{customer.addresses?.[0]?.address || 'No address saved'}</span>
                  </div>
                </div>

                {/* Open Complaint Pill if any */}
                {hasOpenComplaint && (
                  <div className="mt-3 p-2 bg-amber-50 rounded-xl border border-amber-200 flex items-center justify-between text-xs text-amber-900">
                    <span className="font-bold flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                      <span>Open Complaint Ticket</span>
                    </span>
                    <span className="text-[10px] font-semibold text-amber-700">Review Now</span>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="px-4 py-3 bg-slate-50/70 border-t border-slate-100 flex items-center justify-between gap-2">
                <button
                  onClick={() => handleOpenCustomer(customer, 'profile')}
                  className="flex-1 py-1.5 text-xs font-bold text-slate-800 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors flex items-center justify-center gap-1.5"
                >
                  <Users className="w-3.5 h-3.5 text-slate-500" />
                  <span>Inspect Profile</span>
                </button>

                <button
                  onClick={() => handleOpenCustomer(customer, 'actions')}
                  className="flex-1 py-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg transition-colors flex items-center justify-center gap-1.5"
                >
                  <Wallet className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Issue Credit</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filteredCustomers.length === 0 && (
        <div className="p-12 text-center bg-white rounded-2xl border border-slate-200/80">
          <Users className="w-10 h-10 text-slate-300 mx-auto mb-2" />
          <p className="text-sm font-bold text-slate-800">No customers found</p>
          <p className="text-xs text-slate-400 mt-1">Try resetting search or tier filter</p>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: COMPLETE CUSTOMER PROFILE & GOVERNANCE DRAWER */}
      {/* ========================================================================= */}
      {selectedCustomer && (
        <Modal
          isOpen={!!selectedCustomer}
          onClose={() => setSelectedCustomer(null)}
          title={`Customer File: ${selectedCustomer.name}`}
        >
          <div className="space-y-5 max-h-[75vh] overflow-y-auto pr-1">
            {/* Header info card */}
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-200/70">
              <div className="flex items-center gap-3">
                <img src={selectedCustomer.avatar} alt="" className="w-12 h-12 rounded-xl object-cover" />
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-extrabold text-sm text-slate-900">{selectedCustomer.name}</h3>
                    <StatusBadge status={selectedCustomer.status} />
                    <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-purple-100 text-purple-800">
                      {selectedCustomer.tier}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Joined: {selectedCustomer.joinedDate} • Phone: {selectedCustomer.phone}
                  </p>
                </div>
              </div>

              <div className="text-right">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Wallet Credit</span>
                <p className="text-base font-black text-purple-700">${selectedCustomer.walletBalance?.toFixed(2)}</p>
              </div>
            </div>

            {/* Inner Sub-tabs */}
            <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto">
              {[
                { id: 'profile', label: 'Addresses & Notes', icon: MapPin },
                { id: 'orders', label: 'Order History', icon: ShoppingBag, count: selectedCustomer.orderHistory?.length || 0 },
                { id: 'refunds', label: 'Refund Claims', icon: RotateCcw, count: selectedCustomer.refundHistory?.length || 0 },
                { id: 'reviews', label: 'Reviews', icon: Star, count: selectedCustomer.reviews?.length || 0 },
                { id: 'complaints', label: 'Complaints', icon: AlertCircle, count: selectedCustomer.complaints?.length || 0, alert: selectedCustomer.complaints?.some(c => c.status === 'Open') },
                { id: 'actions', label: 'Account Actions', icon: Wallet },
              ].map(t => {
                const Icon = t.icon;
                const isActive = customerModalTab === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => setCustomerModalTab(t.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                      isActive 
                        ? 'bg-slate-900 text-white' 
                        : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{t.label}</span>
                    {t.count !== undefined && (
                      <span className={`text-[10px] px-1 py-0.1 rounded-full ${
                        isActive ? 'bg-slate-800 text-white' : t.alert ? 'bg-amber-100 text-amber-800' : 'bg-slate-200 text-slate-600'
                      }`}>
                        {t.count}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* TAB 1: SAVED ADDRESSES & INTERNAL ADMIN NOTES */}
            {customerModalTab === 'profile' && (
              <div className="space-y-4">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">Saved Delivery Locations</h4>
                  <div className="space-y-2">
                    {selectedCustomer.addresses?.map(addr => (
                      <div key={addr.id} className="p-3 bg-white rounded-xl border border-slate-200 text-xs">
                        <div className="flex items-center justify-between">
                          <span className="font-extrabold text-slate-900 flex items-center gap-1.5">
                            <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                            <span>{addr.label}</span>
                          </span>
                          {addr.isDefault && (
                            <span className="text-[10px] font-bold bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full border border-emerald-200">
                              Primary Default
                            </span>
                          )}
                        </div>
                        <p className="text-slate-600 mt-1">{addr.address}</p>
                        {addr.instructions && (
                          <p className="text-slate-400 text-[11px] mt-0.5 italic">Note: "{addr.instructions}"</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Admin Internal Memo */}
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5 text-slate-500" />
                      <span>Confidential Admin Notes</span>
                    </h4>
                    <span className="text-[10px] text-slate-400">Only visible to operators</span>
                  </div>

                  <textarea
                    rows={2}
                    value={adminNoteInput}
                    onChange={(e) => setAdminNoteInput(e.target.value)}
                    className="w-full p-2 text-xs border border-slate-200 rounded-lg bg-white focus:ring-1 focus:ring-emerald-500"
                    placeholder="Enter customer behavioral notes, corporate affiliation..."
                  />

                  <div className="flex justify-end">
                    <button
                      onClick={handleSaveNote}
                      className="px-3 py-1 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold transition-colors"
                    >
                      Save Admin Note
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: ORDER HISTORY */}
            {customerModalTab === 'orders' && (
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">Past Orders Record</h4>
                {selectedCustomer.orderHistory?.length > 0 ? (
                  <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden bg-white">
                    {selectedCustomer.orderHistory.map(ord => (
                      <div key={ord.id} className="p-3 flex items-center justify-between text-xs hover:bg-slate-50">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-bold text-slate-900">{ord.id}</span>
                            <StatusBadge status={ord.status} />
                          </div>
                          <p className="text-slate-700 font-semibold mt-0.5">{ord.restaurant}</p>
                          <p className="text-[11px] text-slate-400">{ord.itemsCount} dishes ordered • {ord.date}</p>
                        </div>

                        <div className="text-right">
                          <span className="font-extrabold text-sm text-slate-900">${ord.totalAmount.toFixed(2)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-slate-400 p-4 text-center bg-slate-50 rounded-xl">No historical orders found.</p>
                )}
              </div>
            )}

            {/* TAB 3: REFUND CLAIMS */}
            {customerModalTab === 'refunds' && (
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">Refund Claims & Settlements</h4>
                {selectedCustomer.refundHistory?.length > 0 ? (
                  <div className="space-y-2">
                    {selectedCustomer.refundHistory.map(ref => (
                      <div key={ref.id} className="p-3 bg-white rounded-xl border border-slate-200 text-xs">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-bold text-slate-900">{ref.orderId}</span>
                            <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded ${
                              ref.status.includes('Approved') ? 'bg-emerald-100 text-emerald-800' :
                              ref.status.includes('Pending') ? 'bg-amber-100 text-amber-800' : 'bg-rose-100 text-rose-800'
                            }`}>
                              {ref.status}
                            </span>
                          </div>
                          <span className="font-black text-rose-600">${ref.amount.toFixed(2)}</span>
                        </div>
                        <p className="text-slate-600 mt-1">Reason: "{ref.reason}"</p>
                        <p className="text-[10px] text-slate-400 mt-0.5">Filed: {ref.date}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-slate-400 p-4 text-center bg-slate-50 rounded-xl">Clean record — No refund claims on this account.</p>
                )}
              </div>
            )}

            {/* TAB 4: REVIEWS & RATINGS */}
            {customerModalTab === 'reviews' && (
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">Customer Feedback & Reviews</h4>
                {selectedCustomer.reviews?.length > 0 ? (
                  <div className="space-y-2">
                    {selectedCustomer.reviews.map(rev => (
                      <div key={rev.id} className="p-3 bg-white rounded-xl border border-slate-200 text-xs">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-slate-900">{rev.restaurantName}</span>
                          <div className="flex items-center gap-1 text-amber-500 font-extrabold">
                            ⭐ <span>{rev.rating} / 5</span>
                          </div>
                        </div>
                        <p className="text-slate-600 mt-1 italic leading-relaxed">"{rev.comment}"</p>
                        <span className="text-[10px] text-slate-400 mt-1 block">{rev.date}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-slate-400 p-4 text-center bg-slate-50 rounded-xl">No public reviews submitted yet.</p>
                )}
              </div>
            )}

            {/* TAB 5: COMPLAINTS & TICKETS */}
            {customerModalTab === 'complaints' && (
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">Support Tickets & Grievances</h4>
                {selectedCustomer.complaints?.length > 0 ? (
                  <div className="space-y-3">
                    {selectedCustomer.complaints.map(comp => (
                      <div key={comp.id} className="p-3 bg-white rounded-xl border border-slate-200 text-xs space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-bold text-slate-800">{comp.orderId}</span>
                            <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded ${
                              comp.status === 'Resolved' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                            }`}>
                              {comp.status}
                            </span>
                            <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-slate-100 text-slate-600">
                              Priority: {comp.priority}
                            </span>
                          </div>
                          <span className="text-[10px] text-slate-400">{comp.date}</span>
                        </div>

                        <p className="font-bold text-slate-900">{comp.subject}</p>
                        
                        {comp.resolution && (
                          <div className="p-2 bg-emerald-50 rounded-lg text-emerald-900 text-[11px] border border-emerald-100">
                            <strong>Resolution:</strong> {comp.resolution}
                          </div>
                        )}

                        {comp.status !== 'Resolved' && (
                          <div className="pt-2 border-t border-slate-100 flex items-center gap-2">
                            <input
                              type="text"
                              value={resolutionNote}
                              onChange={(e) => setResolutionNote(e.target.value)}
                              placeholder="Type resolution statement (e.g. Refund issued / Coupon sent)..."
                              className="flex-1 px-2.5 py-1 text-xs border border-slate-200 rounded-lg"
                            />
                            <button
                              onClick={() => handleResolveComplaint(comp.id)}
                              className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold whitespace-nowrap"
                            >
                              Resolve Ticket
                            </button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-slate-400 p-4 text-center bg-slate-50 rounded-xl">No active or past complaints on file.</p>
                )}
              </div>
            )}

            {/* TAB 6: ACCOUNT STATUS ACTIONS & WALLET CREDITS */}
            {customerModalTab === 'actions' && (
              <div className="space-y-4">
                {/* Issue Goodwill Credit */}
                <div className="p-4 bg-purple-50 rounded-xl border border-purple-200 space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-purple-900 flex items-center gap-1.5">
                    <Wallet className="w-4 h-4 text-purple-700" />
                    <span>Issue Goodwill Wallet Credit</span>
                  </h4>
                  <form onSubmit={handleIssueCredit} className="space-y-2">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-bold text-purple-900 mb-1">Credit Amount ($)</label>
                        <input
                          type="number"
                          step="0.5"
                          required
                          value={creditAmount}
                          onChange={(e) => setCreditAmount(e.target.value)}
                          className="w-full px-3 py-1.5 text-xs font-bold border border-purple-200 rounded-lg bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-purple-900 mb-1">Reason / Campaign</label>
                        <input
                          type="text"
                          required
                          value={creditReason}
                          onChange={(e) => setCreditReason(e.target.value)}
                          className="w-full px-3 py-1.5 text-xs border border-purple-200 rounded-lg bg-white"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-xs font-bold transition-colors shadow-sm"
                    >
                      Credit ${creditAmount} to Customer Wallet
                    </button>
                  </form>
                </div>

                {/* Account Policy Governance */}
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                    <ShieldAlert className="w-4 h-4 text-slate-600" />
                    <span>Account Status Governance</span>
                  </h4>

                  <div className="grid grid-cols-3 gap-2">
                    <button
                      onClick={() => {
                        updateCustomerStatus(selectedCustomer.id, 'Active');
                        setSelectedCustomer(prev => ({ ...prev, status: 'Active' }));
                      }}
                      className={`p-2.5 rounded-xl text-xs font-bold border transition-all ${
                        selectedCustomer.status === 'Active'
                          ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      Set Active
                    </button>

                    <button
                      onClick={() => {
                        updateCustomerStatus(selectedCustomer.id, 'Flagged');
                        setSelectedCustomer(prev => ({ ...prev, status: 'Flagged' }));
                      }}
                      className={`p-2.5 rounded-xl text-xs font-bold border transition-all ${
                        selectedCustomer.status === 'Flagged'
                          ? 'bg-amber-600 text-white border-amber-600 shadow-sm'
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      Flag for Audit
                    </button>

                    <button
                      onClick={() => {
                        updateCustomerStatus(selectedCustomer.id, 'Suspended');
                        setSelectedCustomer(prev => ({ ...prev, status: 'Suspended' }));
                      }}
                      className={`p-2.5 rounded-xl text-xs font-bold border transition-all ${
                        selectedCustomer.status === 'Suspended'
                          ? 'bg-rose-600 text-white border-rose-600 shadow-sm'
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      Suspend Account
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
};
