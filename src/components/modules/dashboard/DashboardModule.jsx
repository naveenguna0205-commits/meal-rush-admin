import React, { useState } from 'react';
import { 
  DollarSign, 
  ShoppingBag, 
  Users, 
  Clock, 
  TrendingUp, 
  ArrowUpRight, 
  UtensilsCrossed, 
  Bike, 
  AlertCircle,
  CheckCircle2,
  Filter,
  Download,
  Calendar,
  Sparkles
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend 
} from 'recharts';
import { useAdmin } from '../../../context/AdminContext';
import { StatCard } from '../../common/StatCard';
import { StatusBadge } from '../../common/Badge';

export const DashboardModule = () => {
  const { 
    stats, 
    orders, 
    salesTrendsData, 
    peakHoursData, 
    cuisineBreakdown, 
    setActiveModule,
    currentTheme
  } = useAdmin();

  const [chartTimeframe, setChartTimeframe] = useState('weekly');

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Module Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-soft">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black tracking-tight text-slate-900">
              Dashboard & Analytics
            </h1>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200/80 shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              Live Real-Time
            </span>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Overview dashboard, total orders, revenue, and active users • Sales analytics, performance charts, recent activities, and peak-hour statistics
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 self-start md:self-auto">
          <div className="flex items-center bg-slate-100 p-1 rounded-xl text-xs font-semibold text-slate-600">
            <button
              onClick={() => setChartTimeframe('daily')}
              className={`px-3 py-1.5 rounded-lg transition-all ${chartTimeframe === 'daily' ? 'bg-white text-slate-900 shadow-sm' : 'hover:text-slate-900'}`}
            >
              Today
            </button>
            <button
              onClick={() => setChartTimeframe('weekly')}
              className={`px-3 py-1.5 rounded-lg transition-all ${chartTimeframe === 'weekly' ? 'bg-white text-slate-900 shadow-sm' : 'hover:text-slate-900'}`}
            >
              This Week
            </button>
            <button
              onClick={() => setChartTimeframe('monthly')}
              className={`px-3 py-1.5 rounded-lg transition-all ${chartTimeframe === 'monthly' ? 'bg-white text-slate-900 shadow-sm' : 'hover:text-slate-900'}`}
            >
              This Month
            </button>
          </div>

          <button 
            onClick={() => window.print()}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold shadow-soft transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Export Report</span>
          </button>
        </div>
      </div>

      {/* Primary KPI Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Gross Revenue"
          value={`$${stats.totalRevenue.toLocaleString()}`}
          change={stats.revenueGrowth}
          isPositive={true}
          icon={DollarSign}
          color="emerald"
          subtitle="+$34.2k vs last cycle"
        />
        <StatCard
          title="Total Completed Orders"
          value={stats.totalOrders.toLocaleString()}
          change={stats.ordersGrowth}
          isPositive={true}
          icon={ShoppingBag}
          color="blue"
          subtitle="98.2% fulfillment rate"
        />
        <StatCard
          title="Active Platform Users"
          value={stats.activeUsers.toLocaleString()}
          change={stats.usersGrowth}
          isPositive={true}
          icon={Users}
          color="emerald"
          subtitle="3.4k joined this week"
        />
        <StatCard
          title="Avg Delivery Dispatch Time"
          value={`${stats.avgDeliveryTime}m`}
          change={Math.abs(stats.deliveryTimeDiff)}
          isPositive={true} // Faster is positive!
          icon={Clock}
          color="purple"
          subtitle="Faster by 3.1 mins"
        />
      </div>

      {/* Secondary Quick Pulse Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-soft">
        <div 
          onClick={() => setActiveModule('orders')}
          className="p-3 rounded-xl bg-emerald-50/50 hover:bg-emerald-50 border border-emerald-100 cursor-pointer transition-all hover-lift active-press"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-900">Active Deliveries</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          </div>
          <p className="text-xl font-extrabold text-emerald-700 mt-1">{stats.activeDeliveriesCount}</p>
          <p className="text-[11px] text-emerald-600/80 mt-0.5">En route with riders →</p>
        </div>

        <div 
          onClick={() => setActiveModule('orders')}
          className="p-3 rounded-xl bg-amber-50/50 hover:bg-amber-50 border border-amber-100 cursor-pointer transition-all"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-amber-900">Pending Orders</span>
            <Clock className="w-3.5 h-3.5 text-amber-600" />
          </div>
          <p className="text-xl font-extrabold text-amber-700 mt-1">{orders.filter(o => o.orderStatus === 'Pending').length}</p>
          <p className="text-[11px] text-amber-600/80 mt-0.5">Awaiting restaurant accept →</p>
        </div>

        <div 
          onClick={() => setActiveModule('orders')}
          className="p-3 rounded-xl bg-emerald-50/50 hover:bg-emerald-50 border border-emerald-100 cursor-pointer transition-all"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-900">Delivered Completed</span>
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          </div>
          <p className="text-xl font-extrabold text-emerald-700 mt-1">{orders.filter(o => o.orderStatus === 'Delivered').length}</p>
          <p className="text-[11px] text-emerald-600/80 mt-0.5">Delivered successfully →</p>
        </div>

        <div 
          onClick={() => setActiveModule('orders')}
          className="p-3 rounded-xl bg-purple-50/50 hover:bg-purple-50 border border-purple-100 cursor-pointer transition-all"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-purple-900">Refund Requests</span>
            <AlertCircle className="w-3.5 h-3.5 text-purple-600" />
          </div>
          <p className="text-xl font-extrabold text-purple-700 mt-1">{orders.filter(o => o.refundRequested).length}</p>
          <p className="text-[11px] text-purple-600/80 mt-0.5">Requires audit review →</p>
        </div>
      </div>

      {/* Charts Section: Sales Analytics & Peak Hours */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sales & Orders Analytics Chart (2 Cols) */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-soft">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-bold text-slate-900">Sales & Revenue Trajectory</h2>
              <p className="text-xs text-slate-500">Gross transaction volume vs platform commission revenue</p>
            </div>
            <div className="flex items-center gap-4 text-xs font-semibold">
              <span className="flex items-center gap-1.5 text-emerald-700">
                <span className="w-3 h-3 rounded-sm bg-emerald-500"></span> GMV Revenue ($)
              </span>
              <span className="flex items-center gap-1.5 text-teal-600">
                <span className="w-3 h-3 rounded-sm bg-teal-500"></span> Platform Net ($)
              </span>
            </div>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={salesTrendsData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={currentTheme?.primary || "#10b981"} stopOpacity={0.25} />
                    <stop offset="95%" stopColor={currentTheme?.primary || "#10b981"} stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={currentTheme?.primaryDark || "#059669"} stopOpacity={0.25} />
                    <stop offset="95%" stopColor={currentTheme?.primaryDark || "#059669"} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} tickFormatter={(val) => `$${val/1000}k`} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 20px -2px rgba(15, 23, 42, 0.08)' }}
                  formatter={(value, name) => [`$${value.toLocaleString()}`, name === 'revenue' ? 'Gross GMV' : 'Platform Profit']}
                />
                <Area type="monotone" dataKey="revenue" stroke={currentTheme?.primary || "#10b981"} strokeWidth={2.5} fillOpacity={1} fill="url(#colorRevenue)" />
                <Area type="monotone" dataKey="platformProfit" stroke={currentTheme?.primaryDark || "#059669"} strokeWidth={2} fillOpacity={1} fill="url(#colorProfit)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Peak-Hour Statistics Chart (1 Col) */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-soft flex flex-col justify-between">
          <div className="mb-4">
            <h2 className="text-base font-bold text-slate-900">Peak-Hour Dispatch Load</h2>
            <p className="text-xs text-slate-500">Hourly order intensity across city zones</p>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={peakHoursData.slice(2, 10)} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="hour" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 11 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 11 }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#ffffff', borderRadius: '10px', border: '1px solid #e2e8f0' }}
                  formatter={(val) => [`${val} orders`, 'Order Count']}
                />
                <Bar dataKey="orders" fill={currentTheme?.primary || "#10b981"} radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-3 p-3 bg-amber-50 rounded-xl border border-amber-200/80 flex items-center gap-2 text-xs text-amber-900">
            <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
            <span>Highest load peak occurs between <strong>7:00 PM – 9:00 PM</strong> (Dinner rush).</span>
          </div>
        </div>
      </div>

      {/* Bottom Grid: Live Orders Feed & Cuisine Category Share */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Real-Time Live Orders Feed (2 cols) */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-soft">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-bold text-slate-900">Recent Live Platform Orders</h2>
              <p className="text-xs text-slate-500">Real-time status updates from restaurants and fleet</p>
            </div>
            <button
              onClick={() => setActiveModule('orders')}
              className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1 group transition-colors"
            >
              <span>View All ({orders.length})</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50/80 text-slate-500 font-semibold border-y border-slate-100">
                <tr>
                  <th className="py-2.5 px-3">Order ID</th>
                  <th className="py-2.5 px-3">Customer</th>
                  <th className="py-2.5 px-3">Restaurant</th>
                  <th className="py-2.5 px-3">Amount</th>
                  <th className="py-2.5 px-3">Status</th>
                  <th className="py-2.5 px-3">Delivery Partner</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {orders.slice(0, 5).map((order) => (
                  <tr key={order.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3 px-3 font-mono font-bold text-emerald-600">{order.id}</td>
                    <td className="py-3 px-3 font-semibold text-slate-800">{order.customer.name}</td>
                    <td className="py-3 px-3 text-slate-600">{order.restaurant.name}</td>
                    <td className="py-3 px-3 font-bold text-slate-900">${order.totalAmount.toFixed(2)}</td>
                    <td className="py-3 px-3">
                      <StatusBadge status={order.orderStatus} />
                    </td>
                    <td className="py-3 px-3">
                      {order.deliveryPartner ? (
                        <div className="flex items-center gap-1.5 font-medium text-slate-700">
                          <Bike className="w-3.5 h-3.5 text-slate-400" />
                          <span>{order.deliveryPartner.name}</span>
                        </div>
                      ) : (
                        <span className="text-amber-600 font-medium italic">Pending dispatch</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Cuisine Share Breakdown (1 col) */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-soft flex flex-col justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900">Cuisine Market Share</h2>
            <p className="text-xs text-slate-500">Order share distribution by food category</p>
          </div>

          <div className="h-52 w-full my-2">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={cuisineBreakdown}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={75}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {cuisineBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: '#ffffff', borderRadius: '10px', border: '1px solid #e2e8f0' }}
                  formatter={(val) => [`${val}%`, 'Share']}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-1.5 text-xs">
            {cuisineBreakdown.map((c) => (
              <div key={c.name} className="flex items-center justify-between text-slate-600">
                <span className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: c.color }}></span>
                  <span className="truncate">{c.name}</span>
                </span>
                <span className="font-bold text-slate-900">{c.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
