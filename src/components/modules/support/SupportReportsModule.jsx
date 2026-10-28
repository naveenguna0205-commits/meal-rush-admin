import React, { useState, useMemo } from 'react';
import {
  Headphones,
  FileText,
  Bell,
  Send,
  Download,
  CheckCircle2,
  AlertCircle,
  AlertTriangle,
  Search,
  MessageSquare,
  Clock,
  Sparkles,
  DollarSign,
  TrendingUp,
  ShieldAlert,
  ArrowUpRight
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { useAdmin } from '../../../context/AdminContext';
import { Badge, StatusBadge } from '../../common/Badge';
import { Modal } from '../../common/Modal';

export const SupportReportsModule = () => {
  const {
    supportTickets,
    salesReportSummary,
    replyToTicket,
    resolveTicketWithCompensation,
    broadcastNotification,
    searchQuery,
    showToast,
    currentTheme
  } = useAdmin();

  // Navigation Sub-tab
  const [activeTab, setActiveTab] = useState('tickets'); // tickets, disputes, reports, notifications
  const [ticketStatusFilter, setTicketStatusFilter] = useState('all');

  // Selected Ticket for Modal
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [replyInput, setReplyInput] = useState('');
  const [compAmount, setCompAmount] = useState('10.00');
  const [compNote, setCompNote] = useState('Apology for delay / order dispute');

  // Push Notification Composer State
  const [pushTitle, setPushTitle] = useState('');
  const [pushBody, setPushBody] = useState('');
  const [pushTarget, setPushTarget] = useState('All Customers');

  // Filtered Tickets
  const filteredTickets = useMemo(() => {
    return supportTickets.filter(t => {
      if (activeTab === 'disputes') {
        if (!t.disputeAmount || t.disputeAmount <= 0) return false;
      } else {
        if (ticketStatusFilter !== 'all' && t.status !== ticketStatusFilter) return false;
      }
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const mId = t.id.toLowerCase().includes(q);
        const mSub = t.subject.toLowerCase().includes(q);
        const mCust = t.customer?.name?.toLowerCase().includes(q);
        const mRest = t.restaurant?.toLowerCase().includes(q);
        if (!mId && !mSub && !mCust && !mRest) return false;
      }
      return true;
    });
  }, [supportTickets, activeTab, ticketStatusFilter, searchQuery]);

  // Open ticket count
  const openCount = supportTickets.filter(t => t.status !== 'Resolved').length;
  const disputeCount = supportTickets.filter(t => t.disputeAmount > 0 && t.status !== 'Resolved').length;

  const handleSendReply = (e) => {
    e.preventDefault();
    if (!replyInput.trim() || !selectedTicket) return;
    replyToTicket(selectedTicket.id, replyInput);
    setReplyInput('');
  };

  const handleBroadcast = (e) => {
    e.preventDefault();
    if (!pushTitle.trim() || !pushBody.trim()) {
      showToast('Please enter both title and body for notification', 'error');
      return;
    }
    broadcastNotification(pushTitle, pushBody, pushTarget);
    setPushTitle('');
    setPushBody('');
  };

  return (
    <div className="space-y-6 pb-12 animate-fadeIn">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-soft">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100">
            <Headphones className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-black tracking-tight text-slate-900">Support & Reports</h1>
            <p className="text-sm text-slate-500">
              Customer support tickets, dispute resolution, push notifications, and sales analytics
            </p>
          </div>
        </div>

        {openCount > 0 && (
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs font-semibold">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
            <span>{openCount} active ticket(s) awaiting response</span>
          </div>
        )}
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex border-b border-slate-200/80 bg-white px-4 rounded-xl shadow-soft overflow-x-auto no-scrollbar gap-2">
        {[
          { id: 'tickets', label: `Support Tickets (${supportTickets.length})`, icon: Headphones, badge: openCount },
          { id: 'disputes', label: `Dispute Management (${disputeCount})`, icon: ShieldAlert, badge: disputeCount },
          { id: 'reports', label: 'Sales Reports & Analytics', icon: FileText },
          { id: 'notifications', label: 'Push Notifications', icon: Bell },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 py-3.5 px-3.5 text-xs font-bold border-b-2 whitespace-nowrap transition-all ${
                isActive
                  ? 'border-emerald-600 text-emerald-600'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-600' : 'text-slate-400'}`} />
              <span>{tab.label}</span>
              {tab.badge > 0 && (
                <span className="px-1.5 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-100 text-emerald-800">
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: SUPPORT TICKETS */}
      {/* ========================================================================= */}
      {activeTab === 'tickets' && (
        <div className="space-y-4">
          {/* Status Filter Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-soft">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mr-1">Status:</span>
              {['all', 'Open', 'In Progress', 'Escalated', 'Resolved'].map(st => (
                <button
                  key={st}
                  onClick={() => setTicketStatusFilter(st)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all hover-lift active-press ${
                    ticketStatusFilter === st
                      ? 'bg-slate-900 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {st === 'all' ? 'All Inquiries' : st}
                </button>
              ))}
            </div>

            <span className="text-xs text-slate-500">
              Showing <strong>{filteredTickets.length}</strong> inquiries
            </span>
          </div>

          {/* Tickets Table */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-soft overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50/70 text-slate-500 font-semibold uppercase tracking-wider">
                    <th className="py-3 px-4">Ticket ID</th>
                    <th className="py-3 px-4">Customer</th>
                    <th className="py-3 px-4">Subject & Category</th>
                    <th className="py-3 px-4">Order / Restaurant</th>
                    <th className="py-3 px-4">Priority</th>
                    <th className="py-3 px-4">Channel</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredTickets.map((ticket) => (
                    <tr key={ticket.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3 px-4 font-mono font-bold text-slate-900">
                        {ticket.id}
                        <span className="block text-[10px] text-slate-400 font-normal">{ticket.createdAt}</span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <img src={ticket.customer.avatar} alt="" className="w-7 h-7 rounded-full object-cover" />
                          <div>
                            <span className="font-bold text-slate-900 block">{ticket.customer.name}</span>
                            <span className="text-[10px] text-emerald-700 font-semibold">{ticket.customer.tier}</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4 max-w-xs">
                        <span className="font-semibold text-slate-800 block truncate">{ticket.subject}</span>
                        <span className="text-[10px] text-slate-400 font-medium">{ticket.category}</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="font-mono text-emerald-700 font-semibold block">{ticket.orderId}</span>
                        <span className="text-slate-500 text-[11px] truncate block">{ticket.restaurant}</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                          ticket.priority === 'Urgent'
                            ? 'bg-rose-50 text-rose-700 border border-rose-200'
                            : ticket.priority === 'High'
                            ? 'bg-amber-50 text-amber-700 border border-amber-200'
                            : 'bg-slate-100 text-slate-600'
                        }`}>
                          {ticket.priority}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-slate-600 font-medium">
                        {ticket.channel}
                      </td>
                      <td className="py-3 px-4">
                        <StatusBadge status={ticket.status} />
                      </td>
                      <td className="py-3 px-4 text-center">
                        <button
                          onClick={() => setSelectedTicket(ticket)}
                          className="px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-900 text-white hover:bg-slate-800 transition-all shadow-sm"
                        >
                          Resolve Desk
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: DISPUTE MANAGEMENT */}
      {/* ========================================================================= */}
      {activeTab === 'disputes' && (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-rose-50/60 border border-rose-200/80 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-rose-600 text-white flex items-center justify-center font-bold">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm">Customer & Merchant Dispute Queue</h4>
                <p className="text-xs text-slate-500">
                  Orders flagged with food quality claims, missing items, or delivery delays requiring financial adjustment.
                </p>
              </div>
            </div>
            <Badge variant="danger">{disputeCount} Open Claims</Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredTickets.map(ticket => (
              <div key={ticket.id} className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-soft hover:shadow-card hover-lift transition-all space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="font-mono text-xs font-bold text-emerald-700 block">{ticket.id} • {ticket.orderId}</span>
                    <h3 className="font-bold text-slate-900 text-sm mt-0.5">{ticket.subject}</h3>
                    <p className="text-xs text-slate-500">Filed by {ticket.customer.name} ({ticket.customer.email})</p>
                  </div>
                  <span className="text-base font-black text-rose-600 bg-rose-50 px-2.5 py-1 rounded-xl border border-rose-100">
                    ${ticket.disputeAmount?.toFixed(2)}
                  </span>
                </div>

                {ticket.evidenceImage && (
                  <div className="relative rounded-xl overflow-hidden border border-slate-200 h-32">
                    <img src={ticket.evidenceImage} alt="Dispute evidence" className="w-full h-full object-cover" />
                    <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/60 text-white text-[10px] font-bold">
                      Attached Evidence Photo
                    </span>
                  </div>
                )}

                <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                  <span className="text-slate-400">{ticket.createdAt}</span>
                  <button
                    onClick={() => setSelectedTicket(ticket)}
                    className="px-3 py-1.5 rounded-xl bg-emerald-600 text-white font-bold hover:bg-emerald-700 transition-all shadow-sm shadow-emerald-500/20 hover-lift active-press"
                  >
                    Open Resolution Desk
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: SALES REPORTS & ANALYTICS */}
      {/* ========================================================================= */}
      {activeTab === 'reports' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-soft">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">YTD Platform Volume</span>
              <h3 className="text-2xl font-extrabold text-slate-900 mt-2">${salesReportSummary.totalRevenueYTD.toLocaleString()}</h3>
              <p className="text-xs text-slate-400 mt-1">Cumulated gross platform volume in 2026</p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-soft">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">Total Completed Orders</span>
              <h3 className="text-2xl font-extrabold text-slate-900 mt-2">{salesReportSummary.ordersYTD.toLocaleString()}</h3>
              <p className="text-xs text-slate-400 mt-1">Average basket: ${salesReportSummary.averageBasketSize.toFixed(2)}</p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-soft">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">Top Performing Category</span>
              <h3 className="text-base font-extrabold text-emerald-700 mt-2 truncate">{salesReportSummary.topGrossingCategory}</h3>
              <p className="text-xs text-slate-400 mt-1">Peak day: {salesReportSummary.peakOrderDay}</p>
            </div>
          </div>

          {/* Growth Trend Area Chart */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-soft space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900">Monthly Revenue & Net Profit Trend</h3>
                <p className="text-xs text-slate-500">6-Month financial performance trajectory</p>
              </div>
              <button
                onClick={() => alert('Downloading Financial Sales Report CSV...')}
                className="px-3.5 py-2 rounded-xl text-xs font-bold bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 transition-all flex items-center gap-2 shadow-sm"
              >
                <Download className="w-4 h-4 text-slate-500" />
                Export Sales CSV
              </button>
            </div>

            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={salesReportSummary.monthlyBreakdown}>
                  <defs>
                    <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={currentTheme?.primary || "#10b981"} stopOpacity={0.2}/>
                      <stop offset="95%" stopColor={currentTheme?.primary || "#10b981"} stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                  <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} tickLine={false} />
                  <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} tickFormatter={(v) => `$${v/1000}k`} />
                  <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, '']} />
                  <Area type="monotone" dataKey="revenue" stroke={currentTheme?.primary || "#10b981"} strokeWidth={2.5} fillOpacity={1} fill="url(#colorRev)" />
                  <Area type="monotone" dataKey="profit" stroke={currentTheme?.primaryDark || "#059669"} strokeWidth={2} fillOpacity={0} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 4: PUSH NOTIFICATIONS BROADCAST */}
      {/* ========================================================================= */}
      {activeTab === 'notifications' && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-soft max-w-2xl space-y-4">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
              <Bell className="w-5 h-5 text-emerald-600" />
              Broadcast Push Notification
            </h3>
            <p className="text-xs text-slate-500">
              Transmit instant alerts to mobile devices of customers, delivery partners or restaurants
            </p>
          </div>

          <form onSubmit={handleBroadcast} className="space-y-4 text-xs">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Target Segment</label>
              <select
                value={pushTarget}
                onChange={(e) => setPushTarget(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-white focus:ring-2 focus:ring-emerald-500/20"
              >
                <option value="All Customers">All Customers</option>
                <option value="VIP Members (Black & Gold)">VIP Members (Black & Gold)</option>
                <option value="Online Delivery Couriers">Online Delivery Couriers</option>
                <option value="Active Restaurant Partners">Active Restaurant Partners</option>
              </select>
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Alert Headline Title *</label>
              <input
                type="text"
                required
                value={pushTitle}
                onChange={(e) => setPushTitle(e.target.value)}
                placeholder="e.g. Free Delivery Weekend is LIVE! 🍔"
                className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Notification Body Message *</label>
              <textarea
                rows={3}
                required
                value={pushBody}
                onChange={(e) => setPushBody(e.target.value)}
                placeholder="Use coupon FREEDEL to enjoy $0 delivery fee on all orders above $20 today!"
                className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-emerald-600 text-white font-bold hover:bg-emerald-700 transition-all shadow-sm shadow-emerald-500/20 flex items-center justify-center gap-2 hover-lift active-press"
            >
              <Send className="w-4 h-4" />
              Dispatch Notification Broadcast
            </button>
          </form>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: TICKET RESOLUTION DESK */}
      {/* ========================================================================= */}
      {selectedTicket && (
        <Modal
          isOpen={!!selectedTicket}
          onClose={() => setSelectedTicket(null)}
          title={`Ticket #${selectedTicket.id}: ${selectedTicket.subject}`}
        >
          <div className="space-y-4 text-xs">
            {/* Ticket Info Strip */}
            <div className="grid grid-cols-2 gap-2 p-3 rounded-xl bg-slate-50 border border-slate-200">
              <div>
                <span className="text-slate-400 block text-[10px]">Customer</span>
                <span className="font-bold text-slate-900">{selectedTicket.customer.name} ({selectedTicket.customer.tier})</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Order Ref</span>
                <span className="font-mono font-bold text-emerald-700">{selectedTicket.orderId}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Merchant</span>
                <span className="font-semibold text-slate-800">{selectedTicket.restaurant}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Rider</span>
                <span className="font-semibold text-slate-800">{selectedTicket.rider}</span>
              </div>
            </div>

            {/* Evidence Image if available */}
            {selectedTicket.evidenceImage && (
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-slate-500 font-bold block mb-1.5">Customer Attached Photo Evidence:</span>
                <img
                  src={selectedTicket.evidenceImage}
                  alt="Damaged food evidence"
                  className="w-full h-36 object-cover rounded-lg border border-slate-300"
                />
              </div>
            )}

            {/* Conversation Messages */}
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-2.5 max-h-52 overflow-y-auto">
              <span className="text-slate-400 font-bold block text-[10px] uppercase">Message Thread</span>
              {selectedTicket.messages?.map((msg, i) => (
                <div
                  key={i}
                  className={`p-2.5 rounded-xl ${
                    msg.sender === 'customer'
                      ? 'bg-white border border-slate-200 text-slate-800'
                      : 'bg-emerald-50 border border-emerald-100 text-emerald-950 ml-4'
                  }`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <strong className="text-[11px] font-bold text-slate-900">{msg.name}</strong>
                    <span className="text-[10px] text-slate-400">{msg.time}</span>
                  </div>
                  <p className="text-xs leading-relaxed">{msg.text}</p>
                </div>
              ))}
            </div>

            {/* Send Reply Form */}
            <form onSubmit={handleSendReply} className="flex gap-2">
              <input
                type="text"
                value={replyInput}
                onChange={(e) => setReplyInput(e.target.value)}
                placeholder="Type customer reply message..."
                className="flex-1 px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all flex items-center gap-1 hover-lift active-press"
              >
                <Send className="w-3.5 h-3.5" />
                Reply
              </button>
            </form>

            {/* Dispute Compensation & Resolve Section */}
            {selectedTicket.status !== 'Resolved' && (
              <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200/80 space-y-3">
                <span className="font-bold text-emerald-950 block">Instant Dispute Resolution & Wallet Credit</span>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[11px] text-slate-600 font-semibold block mb-0.5">Compensation Amount ($)</label>
                    <input
                      type="number"
                      step="0.5"
                      value={compAmount}
                      onChange={(e) => setCompAmount(e.target.value)}
                      className="w-full px-3 py-1.5 border border-emerald-200 bg-white rounded-lg font-bold focus:ring-2 focus:ring-emerald-500/20"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-slate-600 font-semibold block mb-0.5">Resolution Reason</label>
                    <input
                      type="text"
                      value={compNote}
                      onChange={(e) => setCompNote(e.target.value)}
                      className="w-full px-3 py-1.5 border border-emerald-200 bg-white rounded-lg focus:ring-2 focus:ring-emerald-500/20"
                    />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    resolveTicketWithCompensation(selectedTicket.id, parseFloat(compAmount) || 0, compNote);
                    setSelectedTicket(null);
                  }}
                  className="w-full py-2 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-all shadow-sm shadow-emerald-500/20 flex items-center justify-center gap-1.5 hover-lift active-press"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  Issue ${parseFloat(compAmount || 0).toFixed(2)} & Mark Resolved
                </button>
              </div>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
};
