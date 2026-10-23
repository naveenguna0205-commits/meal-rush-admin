import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingBag, 
  MapPin, 
  Search, 
  Tag, 
  ChevronDown, 
  Menu, 
  X, 
  Receipt,
  Sparkles,
  Check,
  Compass
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useOrders } from '../../context/OrderContext';
import heroBurger from '../../assets/img/hero-burger.jpg';

const ADDRESS_OPTIONS = [
  { id: 'home', label: 'Home', address: '742 Evergreen Terrace, Apt 4B', city: 'San Francisco, CA', icon: '🏠' },
  { id: 'work', label: 'Work HQ', address: '500 Howard Street, Suite 900', city: 'Financial District, SF', icon: '💼' },
  { id: 'gym', label: 'Equinox Gym', address: '757 Market Street', city: 'Union Square, SF', icon: '⚡' },
];

export default function Navbar() {
  const { itemsCount, total, setIsCartOpen } = useCart();
  const { orders } = useOrders();
  const location = useLocation();

  const [selectedAddress, setSelectedAddress] = useState(ADDRESS_OPTIONS[0]);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const activeOrdersCount = orders.filter(o => o.statusStep >= 0 && o.statusStep < 4).length;

  const scrollToSearchOrOffers = (sectionId) => {
    if (location.pathname !== '/') return;
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-white/90 backdrop-blur-xl border-b border-slate-200/80 transition-all shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[74px] flex items-center justify-between gap-3 sm:gap-6">
          
          {/* Left: Brand Logo & Delivery Location */}
          <div className="flex items-center gap-4 sm:gap-6">
            <Link to="/" className="flex items-center gap-2.5 group shrink-0">
              <div className="w-10 h-10 rounded-xl overflow-hidden shadow-md shadow-orange-500/20 group-hover:scale-105 transition-all border border-orange-200/80 bg-orange-50 shrink-0">
                <img src={heroBurger} alt="Cravingo" className="w-full h-full object-cover" />
              </div>
              <div className="flex flex-col text-left">
                <div className="flex items-center gap-1.5">
                  <span className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 group-hover:text-orange-600 transition-colors font-outfit">
                    Cravingo
                  </span>
                  <span className="px-1.5 py-0.5 rounded-full text-[9px] font-extrabold bg-gradient-to-r from-orange-500/10 to-amber-500/15 text-orange-600 uppercase tracking-wider border border-orange-200/60">
                    EXPRESS
                  </span>
                </div>
                <span className="text-[10px] font-medium text-slate-400 -mt-1 hidden sm:block">
                  Hot gourmet meals in 25 min
                </span>
              </div>
            </Link>

            {/* Location Selector Pill */}
            <div className="hidden md:flex items-center">
              <button
                type="button"
                onClick={() => setIsLocationModalOpen(true)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 hover:text-slate-900 transition-all text-xs border border-slate-200/80 max-w-[250px] cursor-pointer group shadow-2xs"
              >
                <div className="w-6 h-6 rounded-lg bg-orange-500/10 text-orange-600 flex items-center justify-center shrink-0 group-hover:bg-orange-500 group-hover:text-white transition-colors">
                  <MapPin className="w-3.5 h-3.5" />
                </div>
                <div className="flex flex-col text-left truncate">
                  <div className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
                      Deliver to: <strong className="text-slate-700 font-bold">{selectedAddress.label}</strong>
                    </span>
                  </div>
                  <span className="truncate text-slate-800 font-semibold text-xs leading-tight">
                    {selectedAddress.address}
                  </span>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 shrink-0 ml-0.5 group-hover:text-slate-600 transition-colors" />
              </button>
            </div>
          </div>

          {/* Center / Right: Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1.5">
            <Link
              to="/"
              className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 ${
                location.pathname === '/'
                  ? 'text-orange-600 bg-orange-50/80 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Compass className="w-4 h-4" />
              <span>Explore</span>
            </Link>

            <a
              href="#offers-section"
              onClick={(e) => {
                scrollToSearchOrOffers('offers-section');
              }}
              className="px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold text-slate-600 hover:text-orange-600 hover:bg-slate-50 transition-all flex items-center gap-1.5"
            >
              <Tag className="w-4 h-4 text-orange-500" />
              <span>Special Offers</span>
            </a>

            <Link
              to="/orders"
              className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
                location.pathname === '/orders'
                  ? 'text-orange-600 bg-orange-50/80 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Receipt className="w-4 h-4 text-slate-400" />
              <span>Orders</span>
              {activeOrdersCount > 0 && (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-emerald-500 text-white animate-pulse">
                  {activeOrdersCount} live
                </span>
              )}
            </Link>
          </nav>

          {/* Right: Cart Button & Mobile Menu Trigger */}
          <div className="flex items-center gap-1.5 sm:gap-3">
            {/* Cart Trigger */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsCartOpen(true)}
              className={`relative flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-2 rounded-xl font-bold transition-all text-xs sm:text-sm cursor-pointer shadow-sm ${
                itemsCount > 0
                  ? 'bg-gradient-to-r from-orange-500 to-rose-600 hover:from-orange-600 hover:to-rose-700 text-white shadow-orange-500/25 ring-2 ring-orange-400/20'
                  : 'bg-slate-900 hover:bg-slate-800 text-white'
              }`}
            >
              <div className="relative">
                <ShoppingBag className="w-4 h-4 transition-transform group-hover:scale-110" />
                {itemsCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-slate-950 text-white text-[9px] font-black flex items-center justify-center border-2 border-white"
                  >
                    {itemsCount}
                  </motion.span>
                )}
              </div>

              {itemsCount > 0 ? (
                <span className="hidden sm:inline">Cart</span>
              ) : (
                <span>Cart</span>
              )}

              {itemsCount > 0 && (
                <span className="bg-white/25 px-1.5 py-0.5 rounded-md text-xs font-black tracking-tight">
                  ${total.toFixed(2)}
                </span>
              )}
            </motion.button>

            {/* Mobile Hamburger Toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden border-t border-slate-200/80 bg-white px-4 pt-3 pb-5 flex flex-col gap-2.5 shadow-lg overflow-hidden text-left"
            >
              {/* Address Picker button for mobile */}
              <button
                type="button"
                onClick={() => {
                  setIsLocationModalOpen(true);
                  setMobileMenuOpen(false);
                }}
                className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-50 text-slate-700 text-xs font-medium border border-slate-200/80 cursor-pointer"
              >
                <MapPin className="w-4 h-4 text-orange-500 shrink-0" />
                <div className="flex flex-col text-left truncate">
                  <span className="text-[10px] text-slate-400 uppercase font-bold">Delivery Drop-Off</span>
                  <span className="truncate text-slate-900 font-bold text-xs">{selectedAddress.address}</span>
                </div>
              </button>

              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className={`px-3 py-2 rounded-xl font-bold text-xs flex items-center gap-2 ${
                  location.pathname === '/' ? 'text-orange-600 bg-orange-50' : 'text-slate-800 hover:bg-slate-50'
                }`}
              >
                <Compass className="w-4 h-4" />
                <span>Explore Kitchens</span>
              </Link>

              <a
                href="#offers-section"
                onClick={() => {
                  setMobileMenuOpen(false);
                  scrollToSearchOrOffers('offers-section');
                }}
                className="px-3 py-2 rounded-xl font-bold text-xs text-slate-800 hover:bg-slate-50 flex items-center gap-2"
              >
                <Tag className="w-4 h-4 text-orange-500" />
                <span>Deals & Vouchers</span>
              </a>

              <Link
                to="/orders"
                onClick={() => setMobileMenuOpen(false)}
                className={`px-3 py-2 rounded-xl font-bold text-xs flex items-center justify-between ${
                  location.pathname === '/orders' ? 'text-orange-600 bg-orange-50' : 'text-slate-800 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Receipt className="w-4 h-4 text-slate-400" />
                  <span>Order History & Tracking</span>
                </div>
                {activeOrdersCount > 0 && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-emerald-500 text-white">
                    {activeOrdersCount} Live
                  </span>
                )}
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Location Picker Modal */}
      <AnimatePresence>
        {isLocationModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/50 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-white rounded-2xl p-5 max-w-sm w-full shadow-2xl border border-slate-100 text-left"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center font-bold">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">Select Drop-Off Location</h3>
                    <p className="text-[11px] text-slate-400">Where should we deliver your food?</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsLocationModalOpen(false)}
                  className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-2 mt-4">
                {ADDRESS_OPTIONS.map((item) => {
                  const isSelected = selectedAddress.id === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        setSelectedAddress(item);
                        setIsLocationModalOpen(false);
                      }}
                      className={`w-full text-left p-3 rounded-xl border transition-all flex items-center justify-between cursor-pointer ${
                        isSelected
                          ? 'border-orange-500 bg-orange-50/60 ring-1 ring-orange-500/20'
                          : 'border-slate-200/80 hover:border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-start gap-2.5 min-w-0">
                        <span className="text-xl shrink-0 mt-0.5">{item.icon}</span>
                        <div className="truncate">
                          <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                            <span>{item.label}</span>
                            {isSelected && (
                              <span className="text-[9px] font-bold text-orange-600 bg-orange-100 px-1.5 py-0.2 rounded">
                                Active
                              </span>
                            )}
                          </div>
                          <div className="text-[11px] text-slate-500 truncate mt-0.5">{item.address}</div>
                          <div className="text-[10px] text-slate-400">{item.city}</div>
                        </div>
                      </div>

                      {isSelected && (
                        <div className="w-5 h-5 rounded-full bg-orange-500 text-white flex items-center justify-center shrink-0 ml-2">
                          <Check className="w-3 h-3" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
