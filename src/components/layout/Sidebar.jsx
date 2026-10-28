import React from 'react';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  UtensilsCrossed, 
  Bike, 
  Users, 
  ChevronRight, 
  ShieldCheck, 
  Flame, 
  CreditCard, 
  Tag, 
  Headphones, 
  Sliders,
  X
} from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';

export const Sidebar = () => {
  const { 
    activeModule, 
    setActiveModule, 
    setActiveSubTab,
    sidebarOpen,
    setSidebarOpen
  } = useAdmin();

  const navItems = [
    {
      id: 'dashboard',
      name: 'Dashboard & Analytics',
      icon: LayoutDashboard,
    },
    {
      id: 'orders',
      name: 'Order Management',
      icon: ShoppingBag,
    },
    {
      id: 'restaurants',
      name: 'Restaurant & Menu Management',
      icon: UtensilsCrossed,
    },
    {
      id: 'riders',
      name: 'Delivery Partner Management',
      icon: Bike,
    },
    {
      id: 'customers',
      name: 'Customer Management',
      icon: Users,
    },
    {
      id: 'finance',
      name: 'Payments & Finance',
      icon: CreditCard,
    },
    {
      id: 'offers',
      name: 'Offers & Promotions',
      icon: Tag,
    },
    {
      id: 'support',
      name: 'Support & Reports',
      icon: Headphones,
    },
    {
      id: 'settings',
      name: 'Settings',
      icon: Sliders,
    }
  ];

  return (
    <>
      {/* Mobile & Tablet Backdrop Overlay */}
      {sidebarOpen && (
        <div 
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-40 lg:hidden transition-opacity duration-300"
          aria-hidden="true"
        />
      )}

      {/* Responsive Sidebar Drawer */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50
        w-72 sm:w-80 bg-white border-r border-slate-200/90 flex flex-col h-screen select-none shrink-0
        shadow-2xl lg:shadow-[2px_0_12px_rgba(0,0,0,0.03)]
        transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Brand Header */}
        <div className="h-16 flex items-center justify-between px-5 sm:px-6 border-b border-slate-100 gap-3">
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center text-white shadow-sm shadow-emerald-500/20 group-hover:scale-105 transition-transform duration-200">
              <Flame className="w-5 h-5 fill-white animate-soft-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-base tracking-tight text-slate-900">Meal Rush</span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-100">Admin</span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium">Food Delivery Platform</p>
            </div>
          </div>

          {/* Close button for Mobile / Tablet */}
          <button
            type="button"
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            title="Close navigation"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation - Clean Full Names Without Numbers */}
        <div className="flex-1 px-3 sm:px-3.5 py-4 sm:py-5 space-y-1.5 overflow-y-auto">
          <p className="px-3 pb-2 text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
            Menu
          </p>

          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeModule === item.id;

            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveModule(item.id);
                  setActiveSubTab('all');
                  setSidebarOpen(false);
                }}
                className={`w-full group flex items-center justify-between px-3.5 py-2.5 sm:py-3 rounded-xl text-[13px] sm:text-[13.5px] font-semibold transition-all duration-200 active:scale-[0.98] ${
                  isActive
                    ? 'bg-emerald-50 text-emerald-800 font-bold border border-emerald-200/80 shadow-xs translate-x-1'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-950 hover:translate-x-1'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <Icon className={`w-5 h-5 shrink-0 transition-transform duration-200 ${
                    isActive 
                      ? 'text-emerald-600 scale-110' 
                      : 'text-slate-400 group-hover:text-slate-700 group-hover:scale-110'
                  }`} />
                  <span className="whitespace-nowrap text-left tracking-tight">
                    {item.name}
                  </span>
                </div>

                {isActive && (
                  <ChevronRight className="w-4 h-4 text-emerald-600 shrink-0 ml-2 animate-fadeIn" />
                )}
              </button>
            );
          })}
        </div>

        {/* Admin Profile Footer */}
        <div className="p-3.5 border-t border-slate-100 bg-slate-50/40">
          <div className="flex items-center gap-3 px-3 py-2 rounded-xl bg-white border border-slate-200/70 shadow-xs">
            <div className="w-8 h-8 rounded-full bg-slate-900 text-white font-bold flex items-center justify-center text-xs">
              NA
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1">
                <p className="text-xs font-bold text-slate-900 truncate">Naveen</p>
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
              </div>
              <p className="text-[11px] text-slate-400 truncate">Super Admin</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
