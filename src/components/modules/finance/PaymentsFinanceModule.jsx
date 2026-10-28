import React, { useState, useMemo } from 'react';
import {
  CreditCard,
  DollarSign,
  ArrowUpRight,
  TrendingUp,
  AlertTriangle,
  Building2,
  Bike,
  FileText,
  Download,
  ShieldCheck,
  Eye,
  RefreshCw,
  Receipt,
  AlertCircle
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
import { StatusBadge, Badge } from '../../common/Badge';
import { Modal } from '../../common/Modal';

export const PaymentsFinanceModule = () => {
  const {
    financialStats,
    paymentGateways,
    financialDailyTrends,
    transactions,
    restaurantSettlements,
    riderPayouts,
    taxSummary,
    retryPayment,
    settleRestaurant,
    holdRestaurantSettlement,
    settleRider,
    searchQuery,
    currentTheme
  } = useAdmin();

  // Tab navigation
  const [activeTab, setActiveTab] = useState('overview'); // overview, transactions, failed, settlements, payouts, taxes
  const [txnStatusFilter, setTxnStatusFilter] = useState('all');
  const [txnMethodFilter, setTxnMethodFilter] = useState('all');

  // Selected Transaction for Details Modal
  const [selectedTxn, setSelectedTxn] = useState(null);
  const [selectedSettlement, setSelectedSettlement] = useState(null);
  const [holdReason, setHoldReason] = useState('Awaiting bank account verification');
  const [showHoldModal, setShowHoldModal] = useState(false);
  const [settlementToHold, setSettlementToHold] = useState(null);

  // Filtered transactions
  const filteredTransactions = useMemo(() => {
    return transactions.filter(t => {
      if (activeTab === 'failed') {
        if (t.status !== 'Failed') return false;
      } else {
        if (txnStatusFilter !== 'all' && t.status !== txnStatusFilter) return false;
      }
      if (txnMethodFilter !== 'all' && !t.method.toLowerCase().includes(txnMethodFilter.toLowerCase())) return false;
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const mId = t.id.toLowerCase().includes(q);
        const mOrder = t.orderId.toLowerCase().includes(q);
        const mCustomer = t.customer.toLowerCase().includes(q);
        const mRest = t.restaurant.toLowerCase().includes(q);
        if (!mId && !mOrder && !mCustomer && !mRest) return false;
      }
      return true;
    });
  }, [transactions, activeTab, txnStatusFilter, txnMethodFilter, searchQuery]);

  // Settlements metrics
  const totalSettlementPending = useMemo(() => {
    return restaurantSettlements
      .filter(s => s.status.includes('Pending') || s.status.includes('Ready'))
      .reduce((sum, s) => sum + s.netPayable, 0);
  }, [restaurantSettlements]);

  // Rider payouts metrics
  const totalRiderPending = useMemo(() => {
    return riderPayouts
      .filter(r => r.status === 'Ready for Payout')
      .reduce((sum, r) => sum + r.netPayout, 0);
  }, [riderPayouts]);

  const COLORS = [currentTheme?.primary || '#10b981', '#3b82f6', '#06b6d4', '#8b5cf6', '#64748b'];

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-soft">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100">
              <CreditCard className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-slate-900">Payments & Finance</h1>
              <p className="text-sm text-slate-500">
                Payment overview, transactions, and failed payments • Restaurant settlements, delivery partner payouts, platform commissions, refunds, taxes, and financial reports
              </p>
            </div>
          </div>
        </div>

        {/* Global Finance Actions */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => {
              const csvContent = "data:text/csv;charset=utf-8," 
                + ["Transaction ID,Order ID,Customer,Restaurant,Amount,Status,Date"]
                  .concat(transactions.map(t => `${t.id},${t.orderId},"${t.customer}","${t.restaurant}",${t.amount},${t.status},"${t.timestamp}"`))
                  .join("\n");
              const encodedUri = encodeURI(csvContent);
              const link = document.createElement("a");
              link.setAttribute("href", encodedUri);
              link.setAttribute("download", `bitedash_finance_report_${Date.now()}.csv`);
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            }}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 transition-all shadow-sm"
          >
            <Download className="w-4 h-4 text-slate-500" />
            Export Statement
          </button>

          <button
            onClick={() => {
              restaurantSettlements.forEach(s => {
                if (s.status === 'Ready to Payout') {
                  settleRestaurant(s.id);
                }
              });
            }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 transition-all shadow-sm shadow-emerald-500/20 hover-lift active-press"
          >
            <Building2 className="w-4 h-4" />
            Disburse All Ready Payouts
          </button>
        </div>
      </div>

      {/* Primary Navigation Tabs */}
      <div className="flex border-b border-slate-200/80 bg-white px-4 rounded-xl shadow-soft overflow-x-auto no-scrollbar gap-2">
        {[
          { id: 'overview', label: 'Payment Overview', icon: TrendingUp },
          { id: 'transactions', label: `Transactions (${transactions.length})`, icon: Receipt },
          { id: 'failed', label: `Failed Payments (${transactions.filter(t => t.status === 'Failed').length})`, icon: AlertTriangle, badge: transactions.filter(t => t.status === 'Failed').length },
          { id: 'settlements', label: 'Restaurant Settlements', icon: Building2 },
          { id: 'payouts', label: 'Delivery Partner Payouts', icon: Bike },
          { id: 'taxes', label: 'Taxes & Statutory Reports', icon: FileText },
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
                <span className="px-1.5 py-0.5 rounded-full text-[10px] font-extrabold bg-rose-50 text-rose-600 border border-rose-200">
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: OVERVIEW */}
      {/* ========================================================================= */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Top Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-soft">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Gross Volume</span>
                <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl border border-emerald-100">
                  <DollarSign className="w-4 h-4" />
                </div>
              </div>
              <div className="mt-3 flex items-baseline justify-between">
                <h3 className="text-2xl font-extrabold text-slate-900">${financialStats.grossVolume.toLocaleString()}</h3>
                <span className="inline-flex items-center text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                  <ArrowUpRight className="w-3.5 h-3.5" /> +{financialStats.grossGrowth}%
                </span>
              </div>
              <p className="mt-1 text-xs text-slate-400">Total customer spend this month</p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-soft">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Net Commission</span>
                <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl border border-emerald-100">
                  <TrendingUp className="w-4 h-4" />
                </div>
              </div>
              <div className="mt-3 flex items-baseline justify-between">
                <h3 className="text-2xl font-extrabold text-slate-900">${financialStats.netCommission.toLocaleString()}</h3>
                <span className="inline-flex items-center text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                  <ArrowUpRight className="w-3.5 h-3.5" /> +{financialStats.commissionGrowth}%
                </span>
              </div>
              <p className="mt-1 text-xs text-slate-400">Pure platform take-rate revenue (17-20%)</p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-soft">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Pending Settlements</span>
                <div className="p-2 bg-amber-50 text-amber-600 rounded-xl border border-amber-100">
                  <Building2 className="w-4 h-4" />
                </div>
              </div>
              <div className="mt-3 flex items-baseline justify-between">
                <h3 className="text-2xl font-extrabold text-slate-900">${totalSettlementPending.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h3>
                <span className="text-xs font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-100">
                  Cycle: Tuesday
                </span>
              </div>
              <p className="mt-1 text-xs text-slate-400">Payable to 6 verified restaurant partners</p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-soft">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Pending Courier Payouts</span>
                <div className="p-2 bg-sky-50 text-sky-600 rounded-xl border border-sky-100">
                  <Bike className="w-4 h-4" />
                </div>
              </div>
              <div className="mt-3 flex items-baseline justify-between">
                <h3 className="text-2xl font-extrabold text-slate-900">${totalRiderPending.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h3>
                <span className="text-xs font-semibold text-sky-700 bg-sky-50 px-2 py-0.5 rounded-full border border-sky-100">
                  Instant Debit
                </span>
              </div>
              <p className="mt-1 text-xs text-slate-400">Delivery fees + 100% tip pass-through</p>
            </div>
          </div>

          {/* Cashflow Charts & Gateways */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Cashflow Trends (AreaChart) */}
            <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-soft">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-base font-bold text-slate-900">7-Day Financial Flow</h3>
                  <p className="text-xs text-slate-500">Gross sales vs restaurant dispatches & net commission</p>
                </div>
                <div className="flex items-center gap-3 text-xs">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded bg-emerald-500 inline-block"></span>
                    <span className="text-slate-600 font-medium">Gross Volume</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded bg-emerald-800 inline-block"></span>
                    <span className="text-slate-600 font-medium">Commission</span>
                  </div>
                </div>
              </div>

              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={financialDailyTrends}>
                    <defs>
                      <linearGradient id="colorGross" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={currentTheme?.primary || "#10b981"} stopOpacity={0.2}/>
                        <stop offset="95%" stopColor={currentTheme?.primary || "#10b981"} stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorComm" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={currentTheme?.primaryDark || "#059669"} stopOpacity={0.2}/>
                        <stop offset="95%" stopColor={currentTheme?.primaryDark || "#059669"} stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                    <XAxis dataKey="day" stroke="#94a3b8" fontSize={12} tickLine={false} />
                    <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} tickFormatter={(val) => `$${val/1000}k`} />
                    <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, '']} />
                    <Area type="monotone" dataKey="grossSales" stroke={currentTheme?.primary || "#10b981"} strokeWidth={2.5} fillOpacity={1} fill="url(#colorGross)" />
                    <Area type="monotone" dataKey="commission" stroke={currentTheme?.primaryDark || "#059669"} strokeWidth={2} fillOpacity={1} fill="url(#colorComm)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Payment Gateway Health */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-soft flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-base font-bold text-slate-900">Payment Gateways</h3>
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                    All Live
                  </span>
                </div>
                <p className="text-xs text-slate-500 mb-4">Volume distribution & operational processing health</p>

                <div className="space-y-3.5">
                  {paymentGateways.map((gw, idx) => (
                    <div key={gw.id} className="p-3 rounded-xl bg-slate-50 border border-slate-100 hover:border-slate-200 transition-all">
                      <div className="flex items-center justify-between text-xs mb-1.5">
                        <span className="font-bold text-slate-800 flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[idx % COLORS.length] }}></span>
                          {gw.name}
                        </span>
                        <span className="font-extrabold text-slate-900">${gw.volume.toLocaleString()}</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                        <div
                          className="h-1.5 rounded-full transition-all duration-500"
                          style={{ width: `${gw.share}%`, backgroundColor: COLORS[idx % COLORS.length] }}
                        ></div>
                      </div>
                      <div className="flex items-center justify-between mt-2 text-[10px] text-slate-400">
                        <span>Success: <strong className="text-emerald-600 font-bold">{gw.successRate}%</strong></span>
                        <span>Fee: {gw.fee}</span>
                        <span>Latency: {gw.latency}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-500">Overall Success Rate:</span>
                <span className="font-bold text-emerald-600 text-sm">98.9%</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2 & 3: TRANSACTIONS & FAILED PAYMENTS */}
      {/* ========================================================================= */}
      {(activeTab === 'transactions' || activeTab === 'failed') && (
        <div className="space-y-4">
          {/* Controls Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-soft">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mr-1">Status:</span>
              {['all', 'Successful', 'Failed', 'Refunded'].map(status => (
                <button
                  key={status}
                  onClick={() => {
                    if (activeTab === 'failed' && status !== 'Failed') {
                      setActiveTab('transactions');
                    }
                    setTxnStatusFilter(status);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    (activeTab === 'failed' && status === 'Failed') || (activeTab !== 'failed' && txnStatusFilter === status)
                      ? 'bg-slate-900 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {status === 'all' ? 'All Statuses' : status}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <select
                value={txnMethodFilter}
                onChange={(e) => setTxnMethodFilter(e.target.value)}
                className="px-3 py-1.5 text-xs font-medium border border-slate-200 rounded-xl bg-slate-50 text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              >
                <option value="all">All Methods</option>
                <option value="Apple Pay">Apple Pay</option>
                <option value="Stripe">Cards (Stripe)</option>
                <option value="Google Pay">Google Pay</option>
              </select>
            </div>
          </div>

          {/* Transactions Table */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-soft overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50/70 text-slate-500 font-semibold uppercase tracking-wider">
                    <th className="py-3 px-4">Transaction / Order</th>
                    <th className="py-3 px-4">Customer</th>
                    <th className="py-3 px-4">Restaurant</th>
                    <th className="py-3 px-4">Payment Method</th>
                    <th className="py-3 px-4 text-right">Amount</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Timestamp</th>
                    <th className="py-3 px-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredTransactions.length === 0 ? (
                    <tr>
                      <td colSpan="8" className="py-12 text-center text-slate-400">
                        <AlertCircle className="w-8 h-8 mx-auto mb-2 opacity-50" />
                        No transactions found matching your criteria.
                      </td>
                    </tr>
                  ) : (
                    filteredTransactions.map((txn) => (
                      <tr key={txn.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-3 px-4">
                          <span className="font-mono font-bold text-slate-900 block">{txn.id}</span>
                          <span className="text-[11px] text-emerald-600 font-semibold">{txn.orderId}</span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <img src={txn.customerAvatar} alt="" className="w-6 h-6 rounded-full object-cover" />
                            <span className="font-semibold text-slate-800">{txn.customer}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 font-medium text-slate-700">
                          {txn.restaurant}
                        </td>
                        <td className="py-3 px-4">
                          <span className="text-slate-600 font-medium">{txn.method}</span>
                          <span className="block text-[10px] text-slate-400 font-mono">{txn.gatewayRef}</span>
                        </td>
                        <td className="py-3 px-4 text-right font-extrabold text-slate-900">
                          ${txn.amount.toFixed(2)}
                        </td>
                        <td className="py-3 px-4">
                          <StatusBadge status={txn.status} />
                          {txn.failureReason && (
                            <span className="block text-[10px] text-rose-600 mt-1 font-medium">
                              {txn.failureReason}
                            </span>
                          )}
                        </td>
                        <td className="py-3 px-4 text-slate-500 whitespace-nowrap">
                          {txn.timestamp}
                        </td>
                        <td className="py-3 px-4 text-center">
                          <div className="flex items-center justify-center gap-1.5">
                            <button
                              onClick={() => setSelectedTxn(txn)}
                              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-all"
                              title="View Invoice & Audit"
                            >
                              <Eye className="w-4 h-4" />
                            </button>

                            {txn.status === 'Failed' && txn.canRetry && (
                              <button
                                onClick={() => retryPayment(txn.id)}
                                className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-emerald-600 text-white hover:bg-emerald-700 transition-all flex items-center gap-1 shadow-sm hover-lift active-press"
                                title="Re-attempt payment capture"
                              >
                                <RefreshCw className="w-3 h-3" />
                                Retry
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
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 4: RESTAURANT SETTLEMENTS */}
      {/* ========================================================================= */}
      {activeTab === 'settlements' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-emerald-50/50 p-4 rounded-2xl border border-emerald-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm">Automated Settlement Cycles</h4>
                <p className="text-xs text-slate-500">
                  Standard settlement cycle is Weekly on Tuesdays. Instant payouts available on request.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <span className="text-[11px] text-slate-500 block">Total Pending Disbursal</span>
                <span className="text-base font-extrabold text-slate-900">${totalSettlementPending.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-soft overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50/70 text-slate-500 font-semibold uppercase tracking-wider">
                    <th className="py-3 px-4">Restaurant</th>
                    <th className="py-3 px-4">Cycle</th>
                    <th className="py-3 px-4 text-center">Orders</th>
                    <th className="py-3 px-4 text-right">Gross Sales</th>
                    <th className="py-3 px-4 text-right">Commission</th>
                    <th className="py-3 px-4 text-right">Deductions</th>
                    <th className="py-3 px-4 text-right">Net Settlement</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-center">Disburse / Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {restaurantSettlements.map((settle) => (
                    <tr key={settle.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3 px-4">
                        <span className="font-bold text-slate-900 block">{settle.restaurantName}</span>
                        <span className="text-[11px] text-slate-400 font-mono">{settle.bankName} {settle.accountEnding}</span>
                      </td>
                      <td className="py-3 px-4 text-slate-600 font-medium">
                        {settle.cycle}
                        <span className="block text-[10px] text-slate-400">{settle.nextPayoutDate}</span>
                      </td>
                      <td className="py-3 px-4 text-center font-bold text-slate-700">
                        {settle.orderCount}
                      </td>
                      <td className="py-3 px-4 text-right font-semibold text-slate-800">
                        ${settle.grossSales.toFixed(2)}
                      </td>
                      <td className="py-3 px-4 text-right text-emerald-600 font-semibold">
                        -${settle.commissionDeducted.toFixed(2)}
                        <span className="block text-[10px] text-slate-400">({settle.commissionRate}%)</span>
                      </td>
                      <td className="py-3 px-4 text-right text-rose-600 font-semibold">
                        -${(settle.refundDeductions || 0).toFixed(2)}
                      </td>
                      <td className="py-3 px-4 text-right font-extrabold text-slate-900 text-sm">
                        ${settle.netPayable.toFixed(2)}
                      </td>
                      <td className="py-3 px-4">
                        <StatusBadge status={settle.status} />
                      </td>
                      <td className="py-3 px-4 text-center">
                        <div className="flex items-center justify-center gap-1.5">
                          {settle.status !== 'Settled' && (
                            <button
                              onClick={() => settleRestaurant(settle.id)}
                              className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-emerald-600 text-white hover:bg-emerald-700 transition-all shadow-sm"
                            >
                              Disburse
                            </button>
                          )}

                          {!settle.status.includes('Hold') && settle.status !== 'Settled' && (
                            <button
                              onClick={() => {
                                setSettlementToHold(settle);
                                setShowHoldModal(true);
                              }}
                              className="px-2 py-1 rounded-lg text-[11px] font-medium text-slate-600 hover:bg-slate-100 transition-all border border-slate-200"
                            >
                              Hold
                            </button>
                          )}

                          <button
                            onClick={() => setSelectedSettlement(settle)}
                            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
                            title="View Statement Advice"
                          >
                            <FileText className="w-4 h-4" />
                          </button>
                        </div>
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
      {/* TAB 5: DELIVERY PARTNER PAYOUTS */}
      {/* ========================================================================= */}
      {activeTab === 'payouts' && (
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-soft flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Courier Earnings & Instant Payouts</h3>
              <p className="text-xs text-slate-500">
                100% of customer tips are passed directly to delivery partners with zero platform commission.
              </p>
            </div>
            <button
              onClick={() => {
                riderPayouts.forEach(r => {
                  if (r.status === 'Ready for Payout') {
                    settleRider(r.id);
                  }
                });
              }}
              className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 transition-all shadow-sm"
            >
              Batch Disburse All Couriers
            </button>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-soft overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50/70 text-slate-500 font-semibold uppercase tracking-wider">
                    <th className="py-3 px-4">Courier Partner</th>
                    <th className="py-3 px-4 text-center">Completed Trips</th>
                    <th className="py-3 px-4 text-right">Base Trip Pay</th>
                    <th className="py-3 px-4 text-right">Distance Surge</th>
                    <th className="py-3 px-4 text-right">Tips (100%)</th>
                    <th className="py-3 px-4 text-right">Bonus</th>
                    <th className="py-3 px-4 text-right">Net Payout</th>
                    <th className="py-3 px-4">Payout Method</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {riderPayouts.map((rider) => (
                    <tr key={rider.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3 px-4">
                        <span className="font-bold text-slate-900 block">{rider.riderName}</span>
                        <span className="text-[11px] text-slate-400">{rider.vehicle}</span>
                      </td>
                      <td className="py-3 px-4 text-center font-bold text-slate-700">
                        {rider.completedTrips}
                      </td>
                      <td className="py-3 px-4 text-right font-medium text-slate-800">
                        ${rider.basePay.toFixed(2)}
                      </td>
                      <td className="py-3 px-4 text-right font-medium text-slate-800">
                        ${rider.distanceSurge.toFixed(2)}
                      </td>
                      <td className="py-3 px-4 text-right font-bold text-emerald-600">
                        ${rider.tipsReceived.toFixed(2)}
                      </td>
                      <td className="py-3 px-4 text-right font-medium text-amber-600">
                        ${rider.bonusEarned.toFixed(2)}
                      </td>
                      <td className="py-3 px-4 text-right font-extrabold text-slate-900 text-sm">
                        ${rider.netPayout.toFixed(2)}
                      </td>
                      <td className="py-3 px-4 text-slate-500">
                        {rider.payoutMethod}
                      </td>
                      <td className="py-3 px-4">
                        <StatusBadge status={rider.status} />
                      </td>
                      <td className="py-3 px-4 text-center">
                        {rider.status === 'Ready for Payout' ? (
                          <button
                            onClick={() => settleRider(rider.id)}
                            className="px-3 py-1 rounded-lg text-[11px] font-bold bg-sky-600 text-white hover:bg-sky-700 transition-all shadow-sm"
                          >
                            Send Payout
                          </button>
                        ) : (
                          <span className="text-slate-400 text-[11px]">—</span>
                        )}
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
      {/* TAB 6: TAXES & STATUTORY REPORTS */}
      {/* ========================================================================= */}
      {activeTab === 'taxes' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-soft">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">State Sales Tax (8.25%)</span>
              <h3 className="text-2xl font-extrabold text-slate-900 mt-2">${taxSummary.stateTaxCollected.toLocaleString(undefined, { minimumFractionDigits: 2 })}</h3>
              <p className="text-xs text-slate-400 mt-1">Tax collected on prepared food sales</p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-soft">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">Municipal Food Surcharge (1.50%)</span>
              <h3 className="text-2xl font-extrabold text-slate-900 mt-2">${taxSummary.municipalTaxCollected.toLocaleString(undefined, { minimumFractionDigits: 2 })}</h3>
              <p className="text-xs text-slate-400 mt-1">Local jurisdiction hospitality levy</p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-soft">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">Pending Remittance Balance</span>
              <h3 className="text-2xl font-extrabold text-amber-600 mt-2">${taxSummary.pendingFilingBalance.toLocaleString(undefined, { minimumFractionDigits: 2 })}</h3>
              <p className="text-xs text-slate-400 mt-1">Due for government filing on {taxSummary.filingDueDate}</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-soft space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900">Tax Compliance & Statutory Ledger</h3>
                <p className="text-xs text-slate-500">Period: {taxSummary.fiscalPeriod} • Tax Jurisdiction: New York Metro Area</p>
              </div>
              <button
                onClick={() => alert(`Generated Official Tax Filing Summary for ${taxSummary.fiscalPeriod}. Ready to submit to State Treasury.`)}
                className="px-3.5 py-2 rounded-xl text-xs font-bold bg-slate-900 text-white hover:bg-slate-800 transition-all flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Export Tax Ledger (Form ST-100)
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/60 space-y-2">
                <span className="font-bold text-slate-700 block">Audited Summary</span>
                <div className="flex justify-between py-1 border-b border-slate-200/50">
                  <span className="text-slate-500">Gross Taxable Food Sales</span>
                  <span className="font-bold text-slate-900">${taxSummary.totalTaxableSales.toLocaleString()}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200/50">
                  <span className="text-slate-500">State Sales Tax (8.25%)</span>
                  <span className="font-bold text-slate-900">${taxSummary.stateTaxCollected.toFixed(2)}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200/50">
                  <span className="text-slate-500">Municipal Surcharge (1.5%)</span>
                  <span className="font-bold text-slate-900">${taxSummary.municipalTaxCollected.toFixed(2)}</span>
                </div>
                <div className="flex justify-between py-1 pt-2">
                  <span className="font-bold text-slate-700">Total Tax Remitted to Date</span>
                  <span className="font-extrabold text-emerald-600">${taxSummary.taxRemittedToGov.toFixed(2)}</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-100 space-y-3">
                <span className="font-bold text-emerald-950 block flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  Statutory Automated Filing Status
                </span>
                <p className="text-slate-600 leading-relaxed">
                  Food Admin automatically calculates and reserves state sales taxes at checkout. 
                  TCS / TDS deductions are reported monthly to merchant accounts with electronic 1099-K tax statements.
                </p>
                <div className="flex items-center gap-2 pt-1">
                  <Badge variant="success">E-Filing Active</Badge>
                  <Badge variant="neutral">Next Audit: Nov 2026</Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: TRANSACTION DETAILS */}
      {/* ========================================================================= */}
      {selectedTxn && (
        <Modal
          isOpen={!!selectedTxn}
          onClose={() => setSelectedTxn(null)}
          title={`Transaction Audit: ${selectedTxn.id}`}
        >
          <div className="space-y-4 text-xs">
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
              <div>
                <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block">Total Billed</span>
                <span className="text-xl font-extrabold text-slate-900">${selectedTxn.amount.toFixed(2)}</span>
              </div>
              <StatusBadge status={selectedTxn.status} />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-slate-400 block mb-0.5">Order Reference</span>
                <span className="font-bold text-slate-900">{selectedTxn.orderId}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-slate-400 block mb-0.5">Payment Method</span>
                <span className="font-bold text-slate-900">{selectedTxn.method}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-slate-400 block mb-0.5">Customer</span>
                <span className="font-bold text-slate-900">{selectedTxn.customer}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-slate-400 block mb-0.5">Restaurant</span>
                <span className="font-bold text-slate-900">{selectedTxn.restaurant}</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
              <span className="font-bold text-slate-700 block">Financial Breakdown</span>
              <div className="flex justify-between text-slate-600">
                <span>Customer Subtotal & Tax</span>
                <span>${(selectedTxn.amount - (selectedTxn.taxAmount || 0)).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Tax Withheld (8.25%)</span>
                <span>${(selectedTxn.taxAmount || 0).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Gateway Processing Fee</span>
                <span className="text-rose-600">-${selectedTxn.feeDeducted.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-900 font-bold pt-1 border-t border-slate-200">
                <span>Net Platform Revenue</span>
                <span className="text-emerald-600">+${selectedTxn.netPlatformGain.toFixed(2)}</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-100 font-mono text-[10px] text-slate-600">
              <span className="block text-slate-400 font-semibold mb-1">Gateway Reference Audit:</span>
              {selectedTxn.gatewayRef}
            </div>

            {selectedTxn.status === 'Failed' && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700">
                <span className="font-bold block mb-1">Failure Analysis:</span>
                <p>{selectedTxn.failureReason} (Error Code: {selectedTxn.failureCode})</p>
                {selectedTxn.canRetry && (
                  <button
                    onClick={() => {
                      retryPayment(selectedTxn.id);
                      setSelectedTxn(null);
                    }}
                    className="mt-3 w-full py-2 bg-rose-600 text-white rounded-lg font-bold hover:bg-rose-700 transition-all"
                  >
                    Trigger Bank Re-authorization Now
                  </button>
                )}
              </div>
            )}
          </div>
        </Modal>
      )}

      {/* ========================================================================= */}
      {/* MODAL: SETTLEMENT ADVICE */}
      {/* ========================================================================= */}
      {selectedSettlement && (
        <Modal
          isOpen={!!selectedSettlement}
          onClose={() => setSelectedSettlement(null)}
          title={`Settlement Voucher: ${selectedSettlement.restaurantName}`}
        >
          <div className="space-y-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <div className="flex justify-between items-center mb-2">
                <span className="text-slate-500 font-medium">Payee Merchant:</span>
                <span className="font-bold text-slate-900">{selectedSettlement.restaurantName}</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-slate-500 font-medium">Bank Routing / Account:</span>
                <span className="font-mono text-slate-900">{selectedSettlement.bankName} {selectedSettlement.accountEnding}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500 font-medium">Total Orders Fulfilled:</span>
                <span className="font-bold text-slate-900">{selectedSettlement.orderCount}</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
              <div className="flex justify-between text-slate-600">
                <span>Gross Order Volume</span>
                <span className="font-bold">${selectedSettlement.grossSales.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Platform Commission ({selectedSettlement.commissionRate}%)</span>
                <span className="text-emerald-600">-${selectedSettlement.commissionDeducted.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Logistics Delivery Share</span>
                <span className="text-slate-600">-${selectedSettlement.logisticsShare.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-900 font-bold text-sm pt-2 border-t border-slate-200">
                <span>Net Payable Disbursal</span>
                <span className="text-emerald-600">${selectedSettlement.netPayable.toFixed(2)}</span>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setSelectedSettlement(null)}
                className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl font-bold hover:bg-slate-200"
              >
                Close
              </button>
              {selectedSettlement.status !== 'Settled' && (
                <button
                  onClick={() => {
                    settleRestaurant(selectedSettlement.id);
                    setSelectedSettlement(null);
                  }}
                  className="px-4 py-2 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700"
                >
                  Disburse Payment Now
                </button>
              )}
            </div>
          </div>
        </Modal>
      )}

      {/* ========================================================================= */}
      {/* MODAL: HOLD SETTLEMENT REASON */}
      {/* ========================================================================= */}
      {showHoldModal && settlementToHold && (
        <Modal
          isOpen={showHoldModal}
          onClose={() => {
            setShowHoldModal(false);
            setSettlementToHold(null);
          }}
          title={`Hold Settlement: ${settlementToHold.restaurantName}`}
        >
          <div className="space-y-4 text-xs">
            <p className="text-slate-600">
              Please enter the compliance reason for withholding the settlement amount of ${settlementToHold.netPayable.toFixed(2)}:
            </p>
            <input
              type="text"
              value={holdReason}
              onChange={(e) => setHoldReason(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-emerald-500/20"
              placeholder="e.g. Bank routing mismatch, hygiene inspection pending..."
            />
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => {
                  setShowHoldModal(false);
                  setSettlementToHold(null);
                }}
                className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  holdRestaurantSettlement(settlementToHold.id, holdReason);
                  setShowHoldModal(false);
                  setSettlementToHold(null);
                }}
                className="px-4 py-2 bg-rose-600 text-white rounded-xl font-bold hover:bg-rose-700"
              >
                Confirm Hold
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
