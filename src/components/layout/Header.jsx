import React, { useState } from 'react';
import { 
  Search, 
  Bell, 
  Radio, 
  PlusCircle, 
  Send, 
  CheckCircle,
  ExternalLink,
  ChevronDown,
  Sparkles,
  Menu,
  Flame,
  CheckCheck,
  X
} from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import { Modal } from '../common/Modal';

export const Header = () => {
  const { 
    searchQuery, 
    setSearchQuery, 
    notifications, 
    setActiveModule, 
    broadcastNotification,
    markAllNotificationsRead,
    removeNotification,
    orders,
    sidebarOpen,
    setSidebarOpen
  } = useAdmin();

  const [showNotifMenu, setShowNotifMenu] = useState(false);
  const [showBroadcastModal, setShowBroadcastModal] = useState(false);
  const [broadcastTitle, setBroadcastTitle] = useState('');
  const [broadcastBody, setBroadcastBody] = useState('');
  const [broadcastAudience, setBroadcastAudience] = useState('All Customers');

  const unreadCount = notifications.filter(n => n.unread).length;

  const handleSendBroadcast = (e) => {
    e.preventDefault();
    if (!broadcastTitle || !broadcastBody) return;
    broadcastNotification(broadcastTitle, broadcastBody, broadcastAudience);
    setBroadcastTitle('');
    setBroadcastBody('');
    setShowBroadcastModal(false);
  };

  return (
    <header className="h-16 bg-white border-b border-slate-200/90 px-3.5 sm:px-6 flex items-center justify-between sticky top-0 z-30 gap-2 sm:gap-4">
      {/* Mobile Menu Toggle & Brand Icon */}
      <div className="flex items-center gap-2 lg:hidden shrink-0">
        <button
          type="button"
          onClick={() => setSidebarOpen(true)}
          className="p-2 -ml-1 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors focus:outline-none"
          title="Open Navigation Menu"
          aria-label="Open Navigation Menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-1.5 sm:hidden">
          <div className="w-7 h-7 rounded-lg bg-emerald-600 flex items-center justify-center text-white shadow-xs">
            <Flame className="w-4 h-4 fill-white" />
          </div>
          <span className="font-extrabold text-sm tracking-tight text-slate-900">Meal Rush</span>
        </div>
      </div>

      {/* Global Search Bar */}
      <div className="flex-1 max-w-xs sm:max-w-md relative min-w-0">
        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search Orders, Restaurants, Riders..."
          className="w-full pl-9 pr-6 sm:pl-10 sm:pr-12 py-1.5 sm:py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all placeholder:text-slate-400 text-slate-800"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] text-slate-400 hover:text-slate-600 bg-slate-200/60 rounded-full px-1.5 py-0.5"
          >
            Clear
          </button>
        )}
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        {/* Push Broadcast Button */}
        <button
          onClick={() => setShowBroadcastModal(true)}
          className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-semibold border border-emerald-200/80 transition-colors shadow-sm"
          title="Broadcast Push Notification"
        >
          <Radio className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
          <span className="hidden md:inline">Broadcast Push</span>
        </button>

        {/* Clean Notifications Button */}
        <div className="relative">
          <button
            onClick={() => setShowNotifMenu(!showNotifMenu)}
            className="p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors relative"
            title="Notifications"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-emerald-600 ring-2 ring-white"></span>
            )}
          </button>

          {showNotifMenu && (
            <div className="absolute right-0 mt-2 w-72 sm:w-80 bg-white rounded-2xl shadow-modal border border-slate-200/90 py-2 z-50 animate-fadeIn">
              <div className="px-4 py-2 border-b border-slate-100 flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-700">Platform Alerts</span>
                {notifications.length > 0 && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      markAllNotificationsRead();
                    }}
                    className="text-[11px] text-emerald-600 hover:text-emerald-700 font-bold cursor-pointer hover:underline flex items-center gap-1 transition-colors"
                  >
                    <CheckCheck className="w-3.5 h-3.5" />
                    <span>Mark all read</span>
                  </button>
                )}
              </div>

              {notifications.length === 0 ? (
                <div className="py-8 px-4 text-center select-none">
                  <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 mx-auto flex items-center justify-center mb-2">
                    <CheckCircle className="w-5 h-5" />
                  </div>
                  <p className="text-xs font-bold text-slate-800">All caught up!</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">No notifications in your inbox</p>
                </div>
              ) : (
                <div className="max-h-72 overflow-y-auto divide-y divide-slate-50">
                  {notifications.map((n) => (
                    <div
                      key={n.id}
                      onClick={() => {
                        if (n.module) {
                          setActiveModule(n.module);
                        } else {
                          setActiveModule('dashboard');
                        }
                        removeNotification(n.id);
                        setShowNotifMenu(false);
                      }}
                      className="p-3.5 hover:bg-slate-50 cursor-pointer transition-colors group relative bg-emerald-50/20"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-xs font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">{n.title}</p>
                        <div className="flex items-center gap-1 shrink-0">
                          <span className="text-[10px] text-slate-400 whitespace-nowrap">{n.time}</span>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              removeNotification(n.id);
                            }}
                            className="p-0.5 rounded text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors ml-1"
                            title="Remove notification"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                      <p className="text-xs text-slate-500 mt-1 leading-relaxed pr-2">{n.desc}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Broadcast Modal */}
      <Modal
        isOpen={showBroadcastModal}
        onClose={() => setShowBroadcastModal(false)}
        title="Broadcast System Push Notification"
      >
        <form onSubmit={handleSendBroadcast} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">Target Audience</label>
            <select
              value={broadcastAudience}
              onChange={(e) => setBroadcastAudience(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 bg-white"
            >
              <option value="All Customers">All Customers (94k+ active)</option>
              <option value="All Active Delivery Riders">All Active Delivery Riders (184 online)</option>
              <option value="All Partner Restaurants">All Partner Restaurants (412 active)</option>
              <option value="Downtown Hub Zone Only">Downtown Hub Zone Only</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">Notification Title</label>
            <input
              type="text"
              required
              value={broadcastTitle}
              onChange={(e) => setBroadcastTitle(e.target.value)}
              placeholder="e.g., Flash 20% Off Lunch Deals Live!"
              className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">Push Message Body</label>
            <textarea
              required
              rows={3}
              value={broadcastBody}
              onChange={(e) => setBroadcastBody(e.target.value)}
              placeholder="Enter message details that will appear on mobile notifications..."
              className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
            />
          </div>

          <div className="pt-3 flex items-center justify-end gap-3 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setShowBroadcastModal(false)}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-sm transition-colors flex items-center gap-1.5"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Send Broadcast Immediately</span>
            </button>
          </div>
        </form>
      </Modal>
    </header>
  );
};
