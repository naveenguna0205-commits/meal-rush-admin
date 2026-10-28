import React, { useState, useMemo } from 'react';
import { 
  Store, 
  PlusCircle, 
  CheckCircle, 
  Clock, 
  Percent, 
  Star, 
  MapPin, 
  ShieldCheck, 
  AlertTriangle, 
  Edit3, 
  Trash2, 
  Power, 
  ChevronRight, 
  UtensilsCrossed, 
  Layers, 
  Check
} from 'lucide-react';
import { useAdmin } from '../../../context/AdminContext';
import { StatusBadge } from '../../common/Badge';
import { Modal } from '../../common/Modal';

export const RestaurantManagementModule = () => {
  const { 
    restaurants, 
    addRestaurant, 
    updateRestaurantStatus, 
    verifyRestaurantDocument, 
    updateCommission, 
    toggleRestaurantOpenStatus, 
    updateOperatingHours, 
    addCategory, 
    addMenuItem, 
    updateMenuItem, 
    deleteMenuItem, 
    toggleItemAvailability,
    searchQuery
  } = useAdmin();

  // Navigation Sub-tab: 'directory', 'menus', 'verification'
  const [activeTab, setActiveTab] = useState('directory');
  const [statusFilter, setStatusFilter] = useState('all'); // all, Approved, Pending Approval, Suspended
  const [selectedCuisine, setSelectedCuisine] = useState('all');

  // Selected Restaurant for Menu view & Drawer
  const [selectedRestaurantId, setSelectedRestaurantId] = useState(restaurants[0]?.id || 'REST-01');
  const [menuActiveCategory, setMenuActiveCategory] = useState('All');
  
  // Modals
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [inspectedRestaurant, setInspectedRestaurant] = useState(null);

  // Menu Modals
  const [showItemModal, setShowItemModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');

  // Commission Edit
  const [commissionForm, setCommissionForm] = useState({ rate: 18, payoutCycle: 'Weekly (Every Monday)' });
  const [hoursForm, setHoursForm] = useState({ openTime: '10:00 AM', closeTime: '11:00 PM', lunchBreak: 'None' });

  // Registration Form State
  const [regForm, setRegForm] = useState({
    name: '',
    cuisine: '',
    ownerName: '',
    ownerEmail: '',
    ownerPhone: '',
    street: '',
    area: 'Downtown Financial Hub',
    city: 'Metro City',
    postalCode: '10001',
    commissionRate: 18,
    payoutCycle: 'Weekly (Every Monday)',
    openTime: '10:00 AM',
    closeTime: '11:00 PM',
    logo: '',
    coverImage: ''
  });

  // Food Item Form State
  const [itemForm, setItemForm] = useState({
    name: '',
    category: '',
    description: '',
    price: '',
    discountPrice: '',
    preparationTime: '15',
    dietary: 'Non-Veg',
    isAvailable: true,
    image: ''
  });

  // Summary Metrics
  const metrics = useMemo(() => {
    const total = restaurants.length;
    const active = restaurants.filter(r => r.status === 'Approved').length;
    const openNow = restaurants.filter(r => r.isOpen).length;
    const pending = restaurants.filter(r => r.status === 'Pending Approval' || r.verificationStatus === 'Under Review').length;
    const avgCommission = (restaurants.reduce((acc, r) => acc + (r.commissionRate || 0), 0) / (total || 1)).toFixed(1);
    const avgRating = (restaurants.reduce((acc, r) => acc + (r.rating || 0), 0) / (total || 1)).toFixed(2);
    return { total, active, openNow, pending, avgCommission, avgRating };
  }, [restaurants]);

  // Distinct cuisines
  const cuisinesList = useMemo(() => {
    const list = new Set();
    restaurants.forEach(r => {
      if (r.cuisineTags) r.cuisineTags.forEach(t => list.add(t));
      if (r.cuisine) list.add(r.cuisine.split('&')[0].trim());
    });
    return Array.from(list);
  }, [restaurants]);

  // Filtered Restaurants
  const filteredRestaurants = useMemo(() => {
    return restaurants.filter(r => {
      // Status Filter
      if (statusFilter !== 'all' && r.status !== statusFilter) return false;
      // Cuisine Filter
      if (selectedCuisine !== 'all') {
        const matchesCuisine = (r.cuisine && r.cuisine.toLowerCase().includes(selectedCuisine.toLowerCase())) ||
          (r.cuisineTags && r.cuisineTags.some(t => t.toLowerCase().includes(selectedCuisine.toLowerCase())));
        if (!matchesCuisine) return false;
      }
      // Search
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const mName = r.name.toLowerCase().includes(q);
        const mOwner = r.owner?.name?.toLowerCase().includes(q);
        const mArea = r.address?.area?.toLowerCase().includes(q);
        const mCuisine = r.cuisine?.toLowerCase().includes(q);
        if (!mName && !mOwner && !mArea && !mCuisine) return false;
      }
      return true;
    });
  }, [restaurants, statusFilter, selectedCuisine, searchQuery]);

  // Current selected restaurant for menu
  const activeRestaurant = useMemo(() => {
    return restaurants.find(r => r.id === selectedRestaurantId) || restaurants[0] || null;
  }, [restaurants, selectedRestaurantId]);

  // Filtered Menu Items
  const displayedMenuItems = useMemo(() => {
    if (!activeRestaurant) return [];
    if (menuActiveCategory === 'All') return activeRestaurant.menuItems || [];
    return (activeRestaurant.menuItems || []).filter(item => item.category === menuActiveCategory);
  }, [activeRestaurant, menuActiveCategory]);

  // Open Details Modal
  const handleOpenDetails = (rest) => {
    setInspectedRestaurant(rest);
    setCommissionForm({ rate: rest.commissionRate || 18, payoutCycle: rest.payoutCycle || 'Weekly (Every Monday)' });
    setHoursForm({ 
      openTime: rest.operatingHours?.openTime || '10:00 AM', 
      closeTime: rest.operatingHours?.closeTime || '11:00 PM',
      lunchBreak: rest.operatingHours?.lunchBreak || 'None'
    });
    setShowDetailModal(true);
  };

  // Open Add/Edit Item
  const handleOpenAddItem = () => {
    if (!activeRestaurant) return;
    setEditingItem(null);
    setItemForm({
      name: '',
      category: activeRestaurant.categories[0] || 'Signature',
      description: '',
      price: '',
      discountPrice: '',
      preparationTime: '15',
      dietary: 'Non-Veg',
      isAvailable: true,
      image: ''
    });
    setShowItemModal(true);
  };

  const handleOpenEditItem = (item) => {
    setEditingItem(item);
    setItemForm({
      name: item.name,
      category: item.category,
      description: item.description,
      price: item.price.toString(),
      discountPrice: item.discountPrice ? item.discountPrice.toString() : '',
      preparationTime: item.preparationTime?.toString() || '15',
      dietary: item.dietary || 'Non-Veg',
      isAvailable: item.isAvailable,
      image: item.image || ''
    });
    setShowItemModal(true);
  };

  // Submit Menu Item Form
  const handleSubmitItem = (e) => {
    e.preventDefault();
    if (!activeRestaurant || !itemForm.name || !itemForm.price) return;

    if (editingItem) {
      updateMenuItem(activeRestaurant.id, editingItem.id, itemForm);
    } else {
      addMenuItem(activeRestaurant.id, itemForm);
    }
    setShowItemModal(false);
  };

  // Submit Restaurant Registration
  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if (!regForm.name || !regForm.ownerName) return;

    addRestaurant({
      name: regForm.name,
      cuisine: regForm.cuisine || 'Multi-Cuisine Diner',
      cuisineTags: [regForm.cuisine || 'Fast Food'],
      owner: {
        name: regForm.ownerName,
        email: regForm.ownerEmail,
        phone: regForm.ownerPhone
      },
      address: {
        street: regForm.street,
        area: regForm.area,
        city: regForm.city,
        postalCode: regForm.postalCode
      },
      commissionRate: parseFloat(regForm.commissionRate) || 18,
      payoutCycle: regForm.payoutCycle,
      operatingHours: {
        openTime: regForm.openTime,
        closeTime: regForm.closeTime,
        days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        lunchBreak: 'None'
      },
      logo: regForm.logo,
      coverImage: regForm.coverImage,
      categories: ['Specials', 'Beverages', 'Sides'],
      menuItems: []
    });

    setShowRegisterModal(false);
    setRegForm({
      name: '',
      cuisine: '',
      ownerName: '',
      ownerEmail: '',
      ownerPhone: '',
      street: '',
      area: 'Downtown Financial Hub',
      city: 'Metro City',
      postalCode: '10001',
      commissionRate: 18,
      payoutCycle: 'Weekly (Every Monday)',
      openTime: '10:00 AM',
      closeTime: '11:00 PM',
      logo: '',
      coverImage: ''
    });
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header Banner */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-soft">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-black tracking-tight text-slate-900">
                Restaurant & Menu Management
              </h1>
            </div>
            <p className="text-sm text-slate-500 mt-1">
              Restaurant listing, registration, approval, and verification • Menu management, food categories, pricing, availability, operating hours, ratings, and commission settings
            </p>
          </div>          <button
            onClick={() => setShowRegisterModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-sm shadow-emerald-500/20 transition-all hover-lift active-press"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Register New Restaurant</span>
          </button>
        </div>

        {/* Quick KPI Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 pt-4 border-t border-slate-100">
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/60">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Total Partners</span>
            <p className="text-xl font-black text-slate-900 mt-0.5">{metrics.total}</p>
          </div>
          <div className="p-3 bg-emerald-50/70 rounded-xl border border-emerald-100">
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700">Approved & Active</span>
            <p className="text-xl font-black text-emerald-900 mt-0.5">{metrics.active}</p>
          </div>
          <div className="p-3 bg-amber-50/70 rounded-xl border border-amber-100">
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-700">Pending Review</span>
            <p className="text-xl font-black text-amber-900 mt-0.5">{metrics.pending}</p>
          </div>
          <div className="p-3 bg-sky-50/70 rounded-xl border border-sky-100">
            <span className="text-[11px] font-bold uppercase tracking-wider text-sky-700">Open Now</span>
            <p className="text-xl font-black text-sky-900 mt-0.5">{metrics.openNow}</p>
          </div>
          <div className="p-3 bg-purple-50/70 rounded-xl border border-purple-100">
            <span className="text-[11px] font-bold uppercase tracking-wider text-purple-700">Avg Commission</span>
            <p className="text-xl font-black text-purple-900 mt-0.5">{metrics.avgCommission}%</p>
          </div>
          <div className="p-3 bg-amber-50/70 rounded-xl border border-amber-100">
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-700">Avg Rating</span>
            <div className="flex items-center gap-1 mt-0.5">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <p className="text-xl font-black text-amber-900">{metrics.avgRating}</p>
            </div>
          </div>
        </div>

        {/* View Switcher Tabs */}
        <div className="flex items-center gap-3 mt-6 pt-4 border-t border-slate-100 overflow-x-auto">
          {[
            { id: 'directory', label: 'Restaurant Directory', icon: Store, count: metrics.total },
            { id: 'menus', label: 'Live Menus & Categories', icon: UtensilsCrossed, count: activeRestaurant ? (activeRestaurant.menuItems?.length || 0) : 0 },
            { id: 'verification', label: 'Compliance & Verification', icon: ShieldCheck, count: metrics.pending, alert: metrics.pending > 0 },
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 text-xs font-bold whitespace-nowrap rounded-xl transition-all ${
                  isActive 
                    ? 'bg-slate-900 text-white shadow-sm' 
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-400' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
                <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-extrabold ${
                  isActive 
                    ? 'bg-slate-800 text-white' 
                    : tab.alert ? 'bg-amber-100 text-amber-800' : 'bg-slate-200 text-slate-700'
                }`}>
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SUB-VIEW 1: RESTAURANT DIRECTORY */}
      {/* ========================================================================= */}
      {activeTab === 'directory' && (
        <div className="space-y-4">
          {/* Filters Bar */}
          <div className="bg-white p-4 rounded-xl border border-slate-200/80 flex flex-wrap items-center justify-between gap-3 shadow-soft">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 mr-1">Status:</span>
              {['all', 'Approved', 'Pending Approval', 'Suspended'].map(st => (
                <button
                  key={st}
                  onClick={() => setStatusFilter(st)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    statusFilter === st 
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 shadow-sm' 
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {st === 'all' ? 'All Statuses' : st}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <select
                value={selectedCuisine}
                onChange={(e) => setSelectedCuisine(e.target.value)}
                className="px-3 py-1.5 text-xs font-semibold bg-slate-50 border border-slate-200 rounded-lg text-slate-700 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              >
                <option value="all">All Cuisines</option>
                {cuisinesList.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Restaurant Grid / Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredRestaurants.map(rest => (
              <div 
                key={rest.id} 
                className="bg-white rounded-2xl border border-slate-200/80 shadow-soft hover:shadow-card hover-lift transition-all overflow-hidden flex flex-col justify-between"
              >
                {/* Card Banner */}
                <div>
                  <div className="relative h-28 bg-slate-100 overflow-hidden">
                    <img 
                      src={rest.coverImage} 
                      alt={rest.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    
                    {/* Status Pill */}
                    <div className="absolute top-3 left-3">
                      <StatusBadge status={rest.status} />
                    </div>

                    {/* Open / Closed Toggle Switch */}
                    <button
                      onClick={() => toggleRestaurantOpenStatus(rest.id)}
                      title={rest.isOpen ? 'Click to toggle closed' : 'Click to open restaurant'}
                      className={`absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all shadow-md ${
                        rest.isOpen 
                          ? 'bg-emerald-500 text-white' 
                          : 'bg-slate-800/90 text-slate-300'
                      }`}
                    >
                      <Power className="w-3 h-3" />
                      <span>{rest.isOpen ? 'Open Now' : 'Closed'}</span>
                    </button>

                    {/* Restaurant Logo Avatar */}
                    <div className="absolute -bottom-4 left-4 w-12 h-12 rounded-xl bg-white p-0.5 shadow-md border border-slate-200">
                      <img 
                        src={rest.logo} 
                        alt="" 
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="pt-6 px-4 pb-3">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="font-extrabold text-base text-slate-900 line-clamp-1">{rest.name}</h3>
                        <p className="text-xs text-emerald-700 font-semibold mt-0.5">{rest.cuisine}</p>
                      </div>
                      <div className="flex items-center gap-1 bg-amber-50 px-2 py-0.5 rounded-lg border border-amber-200/60 shrink-0">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span className="text-xs font-extrabold text-amber-900">{rest.rating}</span>
                        <span className="text-[10px] text-slate-400">({rest.reviewCount})</span>
                      </div>
                    </div>

                    <div className="mt-3 space-y-1.5 text-xs text-slate-500">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span className="truncate">{rest.address?.street}, {rest.address?.area}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span>{rest.operatingHours?.openTime} - {rest.operatingHours?.closeTime}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Percent className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span className="font-medium text-slate-700">Commission: <strong className="text-slate-900">{rest.commissionRate}%</strong> ({rest.payoutCycle})</span>
                      </div>
                    </div>

                    {/* Cuisine Tags */}
                    <div className="flex flex-wrap gap-1 mt-3">
                      {rest.cuisineTags?.slice(0, 3).map((tag, idx) => (
                        <span key={idx} className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600">
                          {tag}
                        </span>
                      ))}
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700">
                        {rest.menuItems?.length || 0} Dishes
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card Actions Footer */}
                <div className="px-4 py-3 bg-slate-50/70 border-t border-slate-100 flex items-center justify-between gap-2">
                  <button
                    onClick={() => {
                      setSelectedRestaurantId(rest.id);
                      setActiveTab('menus');
                    }}
                    className="flex-1 py-1.5 text-xs font-bold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors flex items-center justify-center gap-1.5 hover-lift active-press"
                  >
                    <UtensilsCrossed className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Manage Menu</span>
                  </button>

                  <button
                    onClick={() => handleOpenDetails(rest)}
                    className="flex-1 py-1.5 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors flex items-center justify-center gap-1.5 hover-lift active-press"
                  >
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Compliance & Settings</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredRestaurants.length === 0 && (
            <div className="p-12 text-center bg-white rounded-2xl border border-slate-200/80">
              <Store className="w-10 h-10 text-slate-300 mx-auto mb-2" />
              <p className="text-sm font-bold text-slate-800">No restaurants found matching criteria</p>
              <p className="text-xs text-slate-400 mt-1">Try clearing search or filters</p>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* SUB-VIEW 2: LIVE MENUS & FOOD CATEGORIES */}
      {/* ========================================================================= */}
      {activeTab === 'menus' && (
        <div className="space-y-6">
          {/* Restaurant Selector Bar */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-soft flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 font-bold shrink-0">
                <UtensilsCrossed className="w-5 h-5" />
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">Selected Restaurant</label>
                <select
                  value={selectedRestaurantId}
                  onChange={(e) => {
                    setSelectedRestaurantId(e.target.value);
                    setMenuActiveCategory('All');
                  }}
                  className="mt-0.5 text-sm font-extrabold text-slate-900 bg-transparent border-none p-0 focus:ring-0 cursor-pointer hover:text-emerald-600"
                >
                  {restaurants.map(r => (
                    <option key={r.id} value={r.id} className="text-slate-900 font-medium">
                      {r.name} ({r.cuisine})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowCategoryModal(true)}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors hover-lift active-press"
              >
                <Layers className="w-3.5 h-3.5 text-slate-500" />
                <span>+ Add Category</span>
              </button>

              <button
                onClick={handleOpenAddItem}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 transition-colors shadow-sm hover-lift active-press"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>Add Dish / Item</span>
              </button>
            </div>
          </div>

          {/* Categories Horizontal Tabs */}
          {activeRestaurant && (
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              <button
                onClick={() => setMenuActiveCategory('All')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                  menuActiveCategory === 'All'
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80'
                }`}
              >
                All Categories ({activeRestaurant.menuItems?.length || 0})
              </button>

              {activeRestaurant.categories?.map(cat => {
                const count = activeRestaurant.menuItems?.filter(i => i.category === cat).length || 0;
                return (
                  <button
                    key={cat}
                    onClick={() => setMenuActiveCategory(cat)}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                      menuActiveCategory === cat
                        ? 'bg-slate-900 text-white shadow-sm'
                        : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80'
                    }`}
                  >
                    <span>{cat}</span>
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                      menuActiveCategory === cat ? 'bg-slate-800 text-white' : 'bg-slate-100 text-slate-500'
                    }`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          )}

          {/* Menu Items Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {displayedMenuItems.map(item => (
              <div 
                key={item.id} 
                className={`bg-white rounded-2xl border p-4 shadow-soft transition-all flex flex-col justify-between ${
                  item.isAvailable ? 'border-slate-200/80' : 'border-slate-200/60 opacity-75 bg-slate-50/50'
                }`}
              >
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        {/* Dietary Badge */}
                        <span className={`inline-block w-2.5 h-2.5 rounded-full ${
                          item.dietary === 'Veg' ? 'bg-emerald-500' :
                          item.dietary === 'Vegan' ? 'bg-teal-500' : 'bg-rose-500'
                        }`} title={item.dietary} />
                        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">{item.category}</span>
                        {item.isPopular && (
                          <span className="px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 text-[10px] font-bold">Chef Special</span>
                        )}
                      </div>

                      <h4 className="font-extrabold text-sm text-slate-900 mt-1">{item.name}</h4>
                      <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">{item.description}</p>
                    </div>

                    {item.image && (
                      <div className="w-16 h-16 rounded-xl bg-slate-100 overflow-hidden shrink-0 border border-slate-200/80">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                    )}
                  </div>

                  {/* Price & Stock status */}
                  <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-100">
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-base font-black text-slate-900">
                        ${item.discountPrice ? item.discountPrice.toFixed(2) : item.price.toFixed(2)}
                      </span>
                      {item.discountPrice && (
                        <span className="text-xs text-slate-400 line-through">
                          ${item.price.toFixed(2)}
                        </span>
                      )}
                      <span className="text-[10px] text-slate-400 ml-1">⏱️ {item.preparationTime || 15}m</span>
                    </div>

                    {/* In Stock / Out of Stock Toggle */}
                    <button
                      onClick={() => toggleItemAvailability(activeRestaurant.id, item.id)}
                      className={`px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1 transition-all ${
                        item.isAvailable
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-rose-50 text-rose-700 border border-rose-200'
                      }`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${item.isAvailable ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                      <span>{item.isAvailable ? 'In Stock' : 'Out of Stock'}</span>
                    </button>
                  </div>
                </div>

                {/* Edit & Delete Action Buttons */}
                <div className="flex items-center justify-end gap-2 mt-3 pt-2 border-t border-slate-50">
                  <button
                    onClick={() => handleOpenEditItem(item)}
                    className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
                    title="Edit Item"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => {
                      if (window.confirm(`Delete "${item.name}" from menu?`)) {
                        deleteMenuItem(activeRestaurant.id, item.id);
                      }
                    }}
                    className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                    title="Delete Item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {displayedMenuItems.length === 0 && (
            <div className="p-12 text-center bg-white rounded-2xl border border-slate-200/80">
              <UtensilsCrossed className="w-10 h-10 text-slate-300 mx-auto mb-2" />
              <p className="text-sm font-bold text-slate-800">No menu items found in this category</p>
              <button
                onClick={handleOpenAddItem}
                className="mt-3 px-3 py-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors hover-lift active-press"
              >
                + Add First Dish
              </button>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* SUB-VIEW 3: COMPLIANCE, VERIFICATION & SETTINGS */}
      {/* ========================================================================= */}
      {activeTab === 'verification' && (
        <div className="space-y-4">
          <div className="bg-amber-50/70 border border-amber-200/80 p-4 rounded-xl flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <h3 className="text-xs font-bold text-amber-900 uppercase tracking-wider">KYC & Health Department Verification Queue</h3>
              <p className="text-xs text-amber-800 mt-0.5">
                Review commercial food handling certificates, premises fire permits, tax IDs, and bank verification before enabling online ordering.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-soft overflow-hidden">
            <div className="divide-y divide-slate-100">
              {restaurants.map(rest => (
                <div key={rest.id} className="p-5 hover:bg-slate-50/50 transition-colors">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <img src={rest.logo} alt="" className="w-12 h-12 rounded-xl object-cover border border-slate-200" />
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-extrabold text-sm text-slate-900">{rest.name}</h4>
                            <StatusBadge status={rest.status} />
                            <span className="text-xs text-slate-400 font-mono">[{rest.id}]</span>
                          </div>
                          <p className="text-xs text-slate-500 mt-0.5">
                            Owner: <span className="text-slate-800 font-semibold">{rest.owner?.name}</span> ({rest.owner?.email}) • Phone: {rest.owner?.phone}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        {rest.status !== 'Approved' && (
                          <button
                            onClick={() => updateRestaurantStatus(rest.id, 'Approved')}
                            className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all"
                          >
                            <CheckCircle className="w-3.5 h-3.5" />
                            <span>Approve & Verify</span>
                          </button>
                        )}

                        {rest.status !== 'Suspended' && (
                          <button
                            onClick={() => updateRestaurantStatus(rest.id, 'Suspended')}
                            className="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded-xl text-xs font-bold transition-colors"
                          >
                            Suspend
                          </button>
                        )}

                        <button
                          onClick={() => handleOpenDetails(rest)}
                          className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold transition-colors flex items-center gap-1"
                        >
                          <span>Review Docs</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Document Badges */}
                    <div className="mt-3 pt-3 border-t border-slate-100 flex flex-wrap items-center gap-2">
                      <span className="text-[11px] font-bold text-slate-400 mr-1">Submitted Documents:</span>
                      {rest.verificationDocuments?.map(doc => (
                        <div 
                          key={doc.id}
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold border ${
                            doc.status === 'Verified'
                              ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                              : 'bg-amber-50 text-amber-800 border-amber-200'
                          }`}
                        >
                          {doc.status === 'Verified' ? <Check className="w-3 h-3 text-emerald-600" /> : <Clock className="w-3 h-3 text-amber-600" />}
                          <span>{doc.name}</span>
                          <span className="text-[10px] font-mono text-slate-400">({doc.documentNumber})</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: REGISTER NEW RESTAURANT */}
      {/* ========================================================================= */}
      <Modal
        isOpen={showRegisterModal}
        onClose={() => setShowRegisterModal(false)}
        title="Register & Onboard New Restaurant"
      >
        <form onSubmit={handleRegisterSubmit} className="space-y-4 max-h-[75vh] overflow-y-auto pr-1">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">Restaurant Name</label>
              <input
                type="text"
                required
                value={regForm.name}
                onChange={(e) => setRegForm({ ...regForm, name: e.target.value })}
                placeholder="e.g. Golden Dragon Wok"
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">Primary Cuisine</label>
              <input
                type="text"
                required
                value={regForm.cuisine}
                onChange={(e) => setRegForm({ ...regForm, cuisine: e.target.value })}
                placeholder="e.g. Chinese & Dim Sum"
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">Owner Name</label>
              <input
                type="text"
                required
                value={regForm.ownerName}
                onChange={(e) => setRegForm({ ...regForm, ownerName: e.target.value })}
                placeholder="Full name"
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">Owner Email</label>
              <input
                type="email"
                required
                value={regForm.ownerEmail}
                onChange={(e) => setRegForm({ ...regForm, ownerEmail: e.target.value })}
                placeholder="owner@domain.com"
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">Phone</label>
              <input
                type="text"
                required
                value={regForm.ownerPhone}
                onChange={(e) => setRegForm({ ...regForm, ownerPhone: e.target.value })}
                placeholder="+1 (555) 000-0000"
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">Street Address</label>
            <input
              type="text"
              required
              value={regForm.street}
              onChange={(e) => setRegForm({ ...regForm, street: e.target.value })}
              placeholder="e.g. 104 Grand Avenue, Suite 12"
              className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">Platform Commission Rate (%)</label>
              <input
                type="number"
                step="0.5"
                min="5"
                max="35"
                required
                value={regForm.commissionRate}
                onChange={(e) => setRegForm({ ...regForm, commissionRate: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">Payout Cycle</label>
              <select
                value={regForm.payoutCycle}
                onChange={(e) => setRegForm({ ...regForm, payoutCycle: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl bg-white"
              >
                <option value="Weekly (Every Monday)">Weekly (Every Monday)</option>
                <option value="Bi-Weekly (1st & 15th)">Bi-Weekly (1st & 15th)</option>
                <option value="Monthly Settlement">Monthly Settlement</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">Opening Time</label>
              <input
                type="text"
                value={regForm.openTime}
                onChange={(e) => setRegForm({ ...regForm, openTime: e.target.value })}
                placeholder="10:00 AM"
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">Closing Time</label>
              <input
                type="text"
                value={regForm.closeTime}
                onChange={(e) => setRegForm({ ...regForm, closeTime: e.target.value })}
                placeholder="11:00 PM"
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl"
              />
            </div>
          </div>

          <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setShowRegisterModal(false)}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors hover-lift active-press"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-sm shadow-emerald-500/20 transition-all hover-lift active-press"
            >
              Submit Restaurant Application
            </button>
          </div>
        </form>
      </Modal>

      {/* ========================================================================= */}
      {/* MODAL: COMPLIANCE, VERIFICATION & COMMISSION SETTINGS */}
      {/* ========================================================================= */}
      {inspectedRestaurant && (
        <Modal
          isOpen={showDetailModal}
          onClose={() => setShowDetailModal(false)}
          title={`Compliance & Commission Settings: ${inspectedRestaurant.name}`}
        >
          <div className="space-y-6 max-h-[75vh] overflow-y-auto pr-1">
            {/* Header info */}
            <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200/60">
              <img src={inspectedRestaurant.logo} alt="" className="w-12 h-12 rounded-xl object-cover" />
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-extrabold text-slate-900">{inspectedRestaurant.name}</h4>
                  <StatusBadge status={inspectedRestaurant.status} />
                </div>
                <p className="text-xs text-slate-500 mt-0.5">{inspectedRestaurant.address?.street}, {inspectedRestaurant.address?.city}</p>
              </div>
            </div>

            {/* Document Verification Section */}
            <div>
              <h5 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2 flex items-center justify-between">
                <span>Legal & Hygiene Permits</span>
                <span className="text-[11px] text-emerald-600 font-semibold">Hygiene Score: {inspectedRestaurant.hygieneScore}/100</span>
              </h5>

              <div className="space-y-2">
                {inspectedRestaurant.verificationDocuments?.map(doc => (
                  <div key={doc.id} className="p-3 rounded-xl border border-slate-200 flex items-center justify-between gap-3 bg-white">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-900">{doc.name}</span>
                        <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded ${
                          doc.status === 'Verified' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                        }`}>
                          {doc.status}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        Doc #: <span className="font-mono text-slate-600">{doc.documentNumber}</span> • Expiry: {doc.expiry}
                      </p>
                    </div>

                    <div className="flex items-center gap-1.5">
                      {doc.status !== 'Verified' ? (
                        <button
                          onClick={() => verifyRestaurantDocument(inspectedRestaurant.id, doc.id, 'Verified')}
                          className="px-2.5 py-1 text-[11px] font-bold bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors flex items-center gap-1"
                        >
                          <Check className="w-3 h-3" />
                          <span>Approve</span>
                        </button>
                      ) : (
                        <button
                          onClick={() => verifyRestaurantDocument(inspectedRestaurant.id, doc.id, 'Pending Review')}
                          className="px-2 py-1 text-[10px] font-semibold text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg"
                        >
                          Revoke
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Commission Settings Section */}
            <div className="p-4 bg-emerald-50/60 rounded-xl border border-emerald-100 space-y-3">
              <h5 className="text-xs font-bold uppercase tracking-wider text-emerald-950">Commission & Payout Policy</h5>
              
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">Platform Commission Rate (%)</label>
                  <input
                    type="number"
                    step="0.5"
                    value={commissionForm.rate}
                    onChange={(e) => setCommissionForm({ ...commissionForm, rate: e.target.value })}
                    className="w-full px-3 py-1.5 text-xs font-bold bg-white border border-slate-200 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">Settlement Cycle</label>
                  <select
                    value={commissionForm.payoutCycle}
                    onChange={(e) => setCommissionForm({ ...commissionForm, payoutCycle: e.target.value })}
                    className="w-full px-3 py-1.5 text-xs font-bold bg-white border border-slate-200 rounded-lg"
                  >
                    <option value="Weekly (Every Monday)">Weekly (Every Monday)</option>
                    <option value="Bi-Weekly (1st & 15th)">Bi-Weekly (1st & 15th)</option>
                    <option value="Monthly Settlement">Monthly Settlement</option>
                  </select>
                </div>
              </div>

              <button
                type="button"
                onClick={() => updateCommission(inspectedRestaurant.id, commissionForm.rate, commissionForm.payoutCycle)}
                className="w-full py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition-colors hover-lift active-press"
              >
                Save Commission Settings
              </button>
            </div>

            {/* Operating Hours Configuration */}
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 space-y-3">
              <h5 className="text-xs font-bold uppercase tracking-wider text-slate-700">Operating Schedule</h5>
              
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">Opens At</label>
                  <input
                    type="text"
                    value={hoursForm.openTime}
                    onChange={(e) => setHoursForm({ ...hoursForm, openTime: e.target.value })}
                    className="w-full px-3 py-1.5 text-xs font-medium bg-white border border-slate-200 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">Closes At</label>
                  <input
                    type="text"
                    value={hoursForm.closeTime}
                    onChange={(e) => setHoursForm({ ...hoursForm, closeTime: e.target.value })}
                    className="w-full px-3 py-1.5 text-xs font-medium bg-white border border-slate-200 rounded-lg"
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={() => updateOperatingHours(inspectedRestaurant.id, { ...inspectedRestaurant.operatingHours, ...hoursForm })}
                className="w-full py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold transition-colors"
              >
                Save Schedule
              </button>
            </div>

            {/* Account Status Control */}
            <div className="pt-2 flex items-center justify-between border-t border-slate-100">
              <span className="text-xs text-slate-500">Overall Verification Decision:</span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    updateRestaurantStatus(inspectedRestaurant.id, 'Approved');
                    setShowDetailModal(false);
                  }}
                  className="px-3 py-1.5 text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow-sm"
                >
                  Approve Restaurant
                </button>
                <button
                  type="button"
                  onClick={() => {
                    updateRestaurantStatus(inspectedRestaurant.id, 'Suspended');
                    setShowDetailModal(false);
                  }}
                  className="px-3 py-1.5 text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white rounded-xl shadow-sm"
                >
                  Suspend Restaurant
                </button>
              </div>
            </div>
          </div>
        </Modal>
      )}

      {/* ========================================================================= */}
      {/* MODAL: ADD / EDIT MENU ITEM */}
      {/* ========================================================================= */}
      <Modal
        isOpen={showItemModal}
        onClose={() => setShowItemModal(false)}
        title={editingItem ? `Edit Dish: ${editingItem.name}` : 'Add New Food Item to Menu'}
      >
        <form onSubmit={handleSubmitItem} className="space-y-4 max-h-[75vh] overflow-y-auto pr-1">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">Item / Dish Name</label>
            <input
              type="text"
              required
              value={itemForm.name}
              onChange={(e) => setItemForm({ ...itemForm, name: e.target.value })}
              placeholder="e.g. Truffle Bacon Smash Burger"
              className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">Category</label>
              <select
                value={itemForm.category}
                onChange={(e) => setItemForm({ ...itemForm, category: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl bg-white"
              >
                {activeRestaurant?.categories?.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">Dietary Tag</label>
              <select
                value={itemForm.dietary}
                onChange={(e) => setItemForm({ ...itemForm, dietary: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl bg-white"
              >
                <option value="Non-Veg">Non-Vegetarian</option>
                <option value="Veg">Vegetarian</option>
                <option value="Vegan">Vegan (Plant Based)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">Price ($)</label>
              <input
                type="number"
                step="0.01"
                required
                value={itemForm.price}
                onChange={(e) => setItemForm({ ...itemForm, price: e.target.value })}
                placeholder="14.50"
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">Discount Price ($)</label>
              <input
                type="number"
                step="0.01"
                value={itemForm.discountPrice}
                onChange={(e) => setItemForm({ ...itemForm, discountPrice: e.target.value })}
                placeholder="Optional"
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">Prep Time (mins)</label>
              <input
                type="number"
                value={itemForm.preparationTime}
                onChange={(e) => setItemForm({ ...itemForm, preparationTime: e.target.value })}
                placeholder="15"
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">Description & Ingredients</label>
            <textarea
              rows={2}
              value={itemForm.description}
              onChange={(e) => setItemForm({ ...itemForm, description: e.target.value })}
              placeholder="Flavor notes, ingredients, allergen warnings..."
              className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">Image URL (Optional)</label>
            <input
              type="url"
              value={itemForm.image}
              onChange={(e) => setItemForm({ ...itemForm, image: e.target.value })}
              placeholder="https://images.unsplash.com/..."
              className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl"
            />
          </div>

          <div className="flex items-center gap-2 pt-1">
            <input
              type="checkbox"
              id="isAvailableCheckbox"
              checked={itemForm.isAvailable}
              onChange={(e) => setItemForm({ ...itemForm, isAvailable: e.target.checked })}
              className="w-4 h-4 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500"
            />
            <label htmlFor="isAvailableCheckbox" className="text-xs font-bold text-slate-700">
              Immediately In Stock for Customer Orders
            </label>
          </div>

          <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setShowItemModal(false)}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors hover-lift active-press"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-sm shadow-emerald-500/20 transition-all hover-lift active-press"
            >
              {editingItem ? 'Save Changes' : 'Add Dish to Menu'}
            </button>
          </div>
        </form>
      </Modal>

      {/* ========================================================================= */}
      {/* MODAL: ADD FOOD CATEGORY */}
      {/* ========================================================================= */}
      <Modal
        isOpen={showCategoryModal}
        onClose={() => setShowCategoryModal(false)}
        title="Create New Food Category"
      >
        <form 
          onSubmit={(e) => {
            e.preventDefault();
            if (activeRestaurant && newCategoryName.trim()) {
              addCategory(activeRestaurant.id, newCategoryName.trim());
              setNewCategoryName('');
              setShowCategoryModal(false);
            }
          }}
          className="space-y-4"
        >
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
              Category Name for {activeRestaurant?.name}
            </label>
            <input
              type="text"
              required
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              placeholder="e.g. Artisanal Desserts, Signature Mocktails, Kids Meals"
              className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
            />
          </div>

          <div className="pt-3 flex items-center justify-end gap-3 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setShowCategoryModal(false)}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors hover-lift active-press"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-sm shadow-emerald-500/20 transition-all hover-lift active-press"
            >
              Add Category
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
