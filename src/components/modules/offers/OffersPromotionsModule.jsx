import React, { useState, useMemo } from 'react';
import {
  Tag,
  PlusCircle,
  Copy,
  Check,
  Users,
  Gift,
  BarChart3,
  Trash2,
  Pause,
  Play
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { useAdmin } from '../../../context/AdminContext';
import { Badge, StatusBadge } from '../../common/Badge';
import { Modal } from '../../common/Modal';

export const OffersPromotionsModule = () => {
  const {
    coupons,
    referralProgram,
    promoCampaignAnalytics,
    addCoupon,
    toggleCouponStatus,
    deleteCoupon,
    extendCouponExpiry,
    updateReferralProgram,
    searchQuery,
    showToast,
    currentTheme
  } = useAdmin();

  // Navigation tab
  const [activeTab, setActiveTab] = useState('campaigns'); // campaigns, referrals, analytics
  const [couponFilter, setCouponFilter] = useState('all'); // all, Active, Expiring Soon, Paused, Expired
  const [copiedCode, setCopiedCode] = useState(null);

  // Create Campaign Modal
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newCoupon, setNewCoupon] = useState(() => ({
    code: '',
    title: '',
    description: '',
    discountType: 'percentage', // percentage, flat, free_delivery
    discountValue: 20,
    minOrderValue: 25.00,
    maxDiscountCap: 15.00,
    usageLimitTotal: 500,
    usageLimitPerUser: 1,
    startDate: new Date().toISOString().split('T')[0],
    expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    applicableTo: 'All Restaurants',
    targetAudience: 'All Users'
  }));

  // Referral settings state
  const [refSettings, setRefSettings] = useState({
    referrerReward: referralProgram.referrerReward,
    refereeReward: referralProgram.refereeReward,
    refereeMinOrderValue: referralProgram.refereeMinOrderValue,
    voucherExpiryDays: referralProgram.voucherExpiryDays,
    enabled: referralProgram.enabled
  });

  // Filtered coupons
  const filteredCoupons = useMemo(() => {
    return coupons.filter(c => {
      if (couponFilter !== 'all' && c.status !== couponFilter) return false;
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const mCode = c.code.toLowerCase().includes(q);
        const mTitle = c.title.toLowerCase().includes(q);
        const mApp = c.applicableTo.toLowerCase().includes(q);
        if (!mCode && !mTitle && !mApp) return false;
      }
      return true;
    });
  }, [coupons, couponFilter, searchQuery]);

  const handleCopy = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    showToast(`Copied promo code "${code}" to clipboard!`);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  const handleCreateCouponSubmit = (e) => {
    e.preventDefault();
    if (!newCoupon.code.trim() || !newCoupon.title.trim()) {
      showToast('Please fill in coupon code and title', 'error');
      return;
    }
    addCoupon({
      ...newCoupon,
      code: newCoupon.code.toUpperCase().replace(/\s+/g, ''),
      discountValue: parseFloat(newCoupon.discountValue) || 0,
      minOrderValue: parseFloat(newCoupon.minOrderValue) || 0,
      maxDiscountCap: parseFloat(newCoupon.maxDiscountCap) || 0,
      usageLimitTotal: parseInt(newCoupon.usageLimitTotal, 10) || 500,
      usageLimitPerUser: parseInt(newCoupon.usageLimitPerUser, 10) || 1
    });
    setShowCreateModal(false);
    setNewCoupon({
      code: '',
      title: '',
      description: '',
      discountType: 'percentage',
      discountValue: 20,
      minOrderValue: 25.00,
      maxDiscountCap: 15.00,
      usageLimitTotal: 500,
      usageLimitPerUser: 1,
      startDate: new Date().toISOString().split('T')[0],
      expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      applicableTo: 'All Restaurants',
      targetAudience: 'All Users'
    });
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-soft">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100">
            <Tag className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">Offers & Promotions</h1>
            <p className="text-sm text-slate-500">
              Create and manage offers, discount campaigns, and coupon codes • Referral programs, minimum order values, usage limits, expiry dates, and campaign analytics
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 transition-all shadow-sm shadow-emerald-500/20 hover-lift active-press"
        >
          <PlusCircle className="w-4 h-4" />
          Create New Campaign / Coupon
        </button>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex border-b border-slate-200/80 bg-white px-4 rounded-xl shadow-soft overflow-x-auto no-scrollbar gap-2">
        {[
          { id: 'campaigns', label: `Coupons & Offers (${coupons.length})`, icon: Tag },
          { id: 'referrals', label: 'Referral Program', icon: Users },
          { id: 'analytics', label: 'Campaign Analytics & ROI', icon: BarChart3 },
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
            </button>
          );
        })}
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: COUPONS & DISCOUNT CAMPAIGNS */}
      {/* ========================================================================= */}
      {activeTab === 'campaigns' && (
        <div className="space-y-4">
          {/* Filter Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-soft">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mr-1">Status:</span>
              {['all', 'Active', 'Expiring Soon', 'Paused', 'Expired'].map(st => (
                <button
                  key={st}
                  onClick={() => setCouponFilter(st)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    couponFilter === st
                      ? 'bg-slate-900 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {st === 'all' ? 'All Campaigns' : st}
                </button>
              ))}
            </div>

            <div className="text-xs text-slate-500">
              Showing <strong>{filteredCoupons.length}</strong> of {coupons.length} offers
            </div>
          </div>

          {/* Coupons Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredCoupons.map((coupon) => {
              const burnRate = Math.min(100, Math.round((coupon.usedCount / coupon.usageLimitTotal) * 100));
              const isNearlyExpired = coupon.status === 'Expiring Soon';

              return (
                <div
                  key={coupon.id}
                  className={`bg-white rounded-2xl border p-5 shadow-soft flex flex-col justify-between transition-all hover:shadow-card hover-lift ${
                    coupon.status === 'Active'
                      ? 'border-slate-200/80'
                      : coupon.status === 'Expiring Soon'
                      ? 'border-amber-300 bg-amber-50/20'
                      : 'border-slate-200 opacity-80'
                  }`}
                >
                  <div>
                    {/* Top Row: Code Badge & Status */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-1.5">
                        <span className="px-2.5 py-1 rounded-lg bg-emerald-50 border border-emerald-200 font-mono font-extrabold text-emerald-800 text-xs tracking-wider flex items-center gap-1.5">
                          {coupon.code}
                          <button
                            onClick={() => handleCopy(coupon.code)}
                            className="text-emerald-600 hover:text-emerald-900 transition-colors"
                            title="Copy Code"
                          >
                            {copiedCode === coupon.code ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                          </button>
                        </span>
                      </div>
                      <StatusBadge status={coupon.status} />
                    </div>

                    <h3 className="font-bold text-slate-900 text-sm mb-1">{coupon.title}</h3>
                    <p className="text-xs text-slate-500 line-clamp-2 mb-3">{coupon.description}</p>

                    {/* Parameters Grid */}
                    <div className="grid grid-cols-2 gap-2 p-3 rounded-xl bg-slate-50 border border-slate-100 text-[11px] mb-3">
                      <div>
                        <span className="text-slate-400 block">Benefit</span>
                        <strong className="text-emerald-700 font-bold">
                          {coupon.discountType === 'percentage'
                            ? `${coupon.discountValue}% OFF (Max $${coupon.maxDiscountCap})`
                            : coupon.discountType === 'free_delivery'
                            ? '100% Free Delivery'
                            : `$${coupon.discountValue.toFixed(2)} Flat Rebate`}
                        </strong>
                      </div>
                      <div>
                        <span className="text-slate-400 block">Min Order Value</span>
                        <strong className="text-slate-800 font-bold">${coupon.minOrderValue.toFixed(2)}</strong>
                      </div>
                      <div>
                        <span className="text-slate-400 block">Audience</span>
                        <strong className="text-slate-700 font-semibold">{coupon.targetAudience}</strong>
                      </div>
                      <div>
                        <span className="text-slate-400 block">Expires On</span>
                        <strong className="text-slate-700 font-semibold">{coupon.expiryDate}</strong>
                      </div>
                    </div>

                    {/* Usage Progress Bar */}
                    <div className="space-y-1 mb-4">
                      <div className="flex justify-between text-[11px] text-slate-500">
                        <span>Redemptions</span>
                        <span className="font-bold text-slate-800">
                          {coupon.usedCount} / {coupon.usageLimitTotal} ({burnRate}%)
                        </span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                        <div
                          className={`h-2 rounded-full transition-all duration-500 ${
                            burnRate >= 90 ? 'bg-rose-500' : burnRate >= 60 ? 'bg-amber-500' : 'bg-emerald-500'
                          }`}
                          style={{ width: `${burnRate}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Stats & Actions */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <div>
                      <span className="text-[10px] text-slate-400 block">Revenue Driven</span>
                      <span className="font-extrabold text-slate-900">${coupon.revenueGenerated.toLocaleString()}</span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => toggleCouponStatus(coupon.id)}
                        className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-all"
                        title={coupon.status === 'Active' ? 'Pause Coupon' : 'Resume Coupon'}
                      >
                        {coupon.status === 'Active' ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 text-emerald-600" />}
                      </button>

                      {isNearlyExpired && (
                        <button
                          onClick={() => extendCouponExpiry(coupon.id, 14)}
                          className="px-2 py-1 rounded-lg text-[10px] font-bold bg-amber-100 text-amber-800 hover:bg-amber-200 transition-all"
                          title="Extend 14 Days"
                        >
                          +14 Days
                        </button>
                      )}

                      <button
                        onClick={() => deleteCoupon(coupon.id)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-all"
                        title="Delete Offer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: REFERRAL PROGRAMS */}
      {/* ========================================================================= */}
      {activeTab === 'referrals' && (
        <div className="space-y-6">
          {/* Referral Top Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-soft">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">Total Invites Dispatched</span>
              <h3 className="text-2xl font-extrabold text-slate-900 mt-2">{referralProgram.totalInvitesSent.toLocaleString()}</h3>
              <p className="text-xs text-slate-400 mt-1">Shared via WhatsApp, SMS & link copy</p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-soft">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">Successful Conversions</span>
              <div className="flex items-baseline justify-between mt-2">
                <h3 className="text-2xl font-extrabold text-slate-900">{referralProgram.successfulConversions.toLocaleString()}</h3>
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                  {referralProgram.conversionRate}% Rate
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1">Referees who placed their first completed order</p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-soft">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">Referral Generated GMV</span>
              <h3 className="text-2xl font-extrabold text-slate-900 mt-2">${referralProgram.referralGeneratedRevenue.toLocaleString()}</h3>
              <p className="text-xs text-slate-400 mt-1">Incremental gross sales from new invited customers</p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-soft">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">Program Viral ROI</span>
              <div className="flex items-baseline justify-between mt-2">
                <h3 className="text-2xl font-extrabold text-emerald-600">{referralProgram.roi}x</h3>
                <span className="text-xs font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full">
                  Spend: ${referralProgram.totalReferralSpend.toLocaleString()}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1">Revenue multiple on reward credits given</p>
            </div>
          </div>

          {/* Referral Engine Configuration & Leaderboard */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Configuration Form */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-soft space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <Gift className="w-5 h-5 text-emerald-600" />
                  <h3 className="font-bold text-slate-900 text-sm">Referral Rules Engine</h3>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={refSettings.enabled}
                    onChange={(e) => setRefSettings({ ...refSettings, enabled: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-600"></div>
                </label>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="text-slate-600 font-semibold block mb-1">Referrer Reward (Existing User Wallet Credit)</label>
                  <div className="relative">
                    <span className="absolute left-3 top-2 text-slate-400 font-bold">$</span>
                    <input
                      type="number"
                      value={refSettings.referrerReward}
                      onChange={(e) => setRefSettings({ ...refSettings, referrerReward: parseFloat(e.target.value) || 0 })}
                      className="w-full pl-7 pr-3 py-1.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 font-bold text-slate-900"
                    />
                  </div>
                  <span className="text-[10px] text-slate-400 mt-0.5 block">Credited once friend's order is delivered</span>
                </div>

                <div>
                  <label className="text-slate-600 font-semibold block mb-1">Referee Welcome Discount (New User)</label>
                  <div className="relative">
                    <span className="absolute left-3 top-2 text-slate-400 font-bold">$</span>
                    <input
                      type="number"
                      value={refSettings.refereeReward}
                      onChange={(e) => setRefSettings({ ...refSettings, refereeReward: parseFloat(e.target.value) || 0 })}
                      className="w-full pl-7 pr-3 py-1.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 font-bold text-slate-900"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-slate-600 font-semibold block mb-1">Referee Minimum Order Value (MOV)</label>
                  <div className="relative">
                    <span className="absolute left-3 top-2 text-slate-400 font-bold">$</span>
                    <input
                      type="number"
                      value={refSettings.refereeMinOrderValue}
                      onChange={(e) => setRefSettings({ ...refSettings, refereeMinOrderValue: parseFloat(e.target.value) || 0 })}
                      className="w-full pl-7 pr-3 py-1.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 font-bold text-slate-900"
                    />
                  </div>
                  <span className="text-[10px] text-slate-400 mt-0.5 block">Prevents abuse on sub-$10 micro orders</span>
                </div>

                <div>
                  <label className="text-slate-600 font-semibold block mb-1">Voucher Validity Expiry Window</label>
                  <div className="relative">
                    <input
                      type="number"
                      value={refSettings.voucherExpiryDays}
                      onChange={(e) => setRefSettings({ ...refSettings, voucherExpiryDays: parseInt(e.target.value, 10) || 30 })}
                      className="w-full px-3 py-1.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 font-bold text-slate-900"
                    />
                    <span className="absolute right-3 top-2 text-slate-400">days</span>
                  </div>
                </div>

                <button
                  onClick={() => updateReferralProgram(refSettings)}
                  className="w-full py-2.5 rounded-xl bg-emerald-600 text-white font-bold hover:bg-emerald-700 transition-all shadow-sm shadow-emerald-500/20 mt-2 hover-lift active-press"
                >
                  Save Referral Parameters
                </button>
              </div>
            </div>

            {/* Top Referrers Leaderboard */}
            <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-soft">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-base font-bold text-slate-900">Top Brand Advocates</h3>
                  <p className="text-xs text-slate-500">Customers driving the highest organic new user registrations</p>
                </div>
                <Badge variant="purple">VIP Advocates</Badge>
              </div>

              <div className="divide-y divide-slate-100 text-xs">
                {referralProgram.topReferrers.map((user, idx) => (
                  <div key={user.email} className="py-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-800 font-extrabold flex items-center justify-center text-xs">
                        #{idx + 1}
                      </div>
                      <div>
                        <span className="font-bold text-slate-900 block">{user.name}</span>
                        <span className="text-slate-400 text-[11px]">{user.email}</span>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="font-extrabold text-emerald-700 block">{user.referrals} friends invited</span>
                      <span className="text-[11px] text-emerald-600 font-semibold">${user.earned.toFixed(2)} rewards earned</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: CAMPAIGN ANALYTICS & ROI */}
      {/* ========================================================================= */}
      {activeTab === 'analytics' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-soft">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">Total Promo Investment</span>
              <h3 className="text-2xl font-extrabold text-slate-900 mt-2">${promoCampaignAnalytics.totalPromoSpend.toLocaleString()}</h3>
              <p className="text-xs text-slate-400 mt-1">Cost of coupon discounts and referral incentives</p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-soft">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">Incremental Revenue</span>
              <h3 className="text-2xl font-extrabold text-emerald-600 mt-2">${promoCampaignAnalytics.incrementalRevenue.toLocaleString()}</h3>
              <p className="text-xs text-slate-400 mt-1">Net additional sales triggered by promotions</p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-soft">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">Basket Size (AOV) Impact</span>
              <div className="flex items-baseline justify-between mt-2">
                <h3 className="text-2xl font-extrabold text-slate-900">${promoCampaignAnalytics.avgOrderValuePromo.toFixed(2)}</h3>
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                  +43.1% Lift
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1">vs ${promoCampaignAnalytics.avgOrderValueNormal.toFixed(2)} without promo coupon</p>
            </div>
          </div>

          {/* Daily Redemption Trends Chart */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-soft">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900">Weekly Redemptions vs Gross Sales Driven</h3>
                <p className="text-xs text-slate-500">Volume of coupon claims and sales generated by day</p>
              </div>
            </div>

            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={promoCampaignAnalytics.dailyRedemptionTrends}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                  <XAxis dataKey="day" stroke="#94a3b8" fontSize={12} tickLine={false} />
                  <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} />
                  <Tooltip formatter={(value, name) => [name === 'grossSales' ? `$${value.toLocaleString()}` : value, name === 'grossSales' ? 'Sales Driven ($)' : 'Redemptions']} />
                  <Bar dataKey="redemptions" fill={currentTheme?.primary || "#10b981"} radius={[4, 4, 0, 0]} name="Redemptions" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: CREATE NEW PROMOTION / COUPON */}
      {/* ========================================================================= */}
      {showCreateModal && (
        <Modal
          isOpen={showCreateModal}
          onClose={() => setShowCreateModal(false)}
          title="Create New Promo Campaign / Coupon Code"
        >
          <form onSubmit={handleCreateCouponSubmit} className="space-y-4 text-xs">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Coupon Code (e.g. TASTY30) *</label>
                <input
                  type="text"
                  required
                  value={newCoupon.code}
                  onChange={(e) => setNewCoupon({ ...newCoupon, code: e.target.value.toUpperCase() })}
                  placeholder="e.g. FEAST20"
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl font-mono font-bold uppercase focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Discount Type *</label>
                <select
                  value={newCoupon.discountType}
                  onChange={(e) => setNewCoupon({ ...newCoupon, discountType: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-white focus:ring-2 focus:ring-emerald-500/20"
                >
                  <option value="percentage">Percentage Discount (%)</option>
                  <option value="flat">Flat Dollar Amount ($)</option>
                  <option value="free_delivery">100% Free Delivery</option>
                </select>
              </div>
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Campaign Headline Title *</label>
              <input
                type="text"
                required
                value={newCoupon.title}
                onChange={(e) => setNewCoupon({ ...newCoupon, title: e.target.value })}
                placeholder="e.g. 25% Off Weekend Pizza"
                className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Customer Description</label>
              <textarea
                rows={2}
                value={newCoupon.description}
                onChange={(e) => setNewCoupon({ ...newCoupon, description: e.target.value })}
                placeholder="Short terms or tagline displayed in the customer checkout drawer..."
                className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20"
              />
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  {newCoupon.discountType === 'percentage' ? 'Discount (%)' : 'Discount ($)'}
                </label>
                <input
                  type="number"
                  min="1"
                  required
                  value={newCoupon.discountValue}
                  onChange={(e) => setNewCoupon({ ...newCoupon, discountValue: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Min Order ($)</label>
                <input
                  type="number"
                  min="0"
                  step="0.5"
                  value={newCoupon.minOrderValue}
                  onChange={(e) => setNewCoupon({ ...newCoupon, minOrderValue: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Max Cap ($)</label>
                <input
                  type="number"
                  min="0"
                  step="0.5"
                  value={newCoupon.maxDiscountCap}
                  onChange={(e) => setNewCoupon({ ...newCoupon, maxDiscountCap: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Total Usage Limit</label>
                <input
                  type="number"
                  min="10"
                  value={newCoupon.usageLimitTotal}
                  onChange={(e) => setNewCoupon({ ...newCoupon, usageLimitTotal: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Limit Per Customer</label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={newCoupon.usageLimitPerUser}
                  onChange={(e) => setNewCoupon({ ...newCoupon, usageLimitPerUser: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Expiry Date</label>
                <input
                  type="date"
                  required
                  value={newCoupon.expiryDate}
                  onChange={(e) => setNewCoupon({ ...newCoupon, expiryDate: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Target Eligibility</label>
                <select
                  value={newCoupon.targetAudience}
                  onChange={(e) => setNewCoupon({ ...newCoupon, targetAudience: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-white focus:ring-2 focus:ring-emerald-500/20"
                >
                  <option value="All Users">All Users</option>
                  <option value="New Customers Only">New Customers Only</option>
                  <option value="VIP Black & Gold Only">VIP Black & Gold Only</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setShowCreateModal(false)}
                className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl font-bold hover:bg-slate-200 hover-lift active-press"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 shadow-sm shadow-emerald-500/20 hover-lift active-press"
              >
                Launch Campaign
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
