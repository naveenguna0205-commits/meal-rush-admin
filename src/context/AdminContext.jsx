import React, { createContext, useContext, useState } from 'react';
import {
  initialStats,
  salesTrendsData,
  peakHoursData,
  cuisineBreakdown,
  initialOrders,
  initialDeliveryPartners,
  initialRestaurants,
  initialCustomers,
  // Module 6: Payments & Finance
  initialFinancialStats,
  paymentGateways,
  financialDailyTrends,
  initialTransactions,
  initialRestaurantSettlements,
  initialRiderPayouts,
  taxSummaryData,
  // Module 7: Offers & Promotions
  initialCoupons,
  initialReferralProgram,
  promoCampaignAnalytics,
  // Module 8: Support, Reports & Settings
  initialSupportTickets,
  initialDeliveryZones,
  initialAdminRoles,
  initialPlatformSettings,
  initialAuditLogs,
  salesReportSummary
} from '../data/mockData';

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [activeModule, setActiveModule] = useState('dashboard');
  const [activeSubTab, setActiveSubTab] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // Active Data States
  const [stats, setStats] = useState(initialStats);
  const [orders, setOrders] = useState(initialOrders);
  const [deliveryPartners, setDeliveryPartners] = useState(initialDeliveryPartners);
  const [restaurants, setRestaurants] = useState(initialRestaurants);
  const [customers, setCustomers] = useState(initialCustomers);

  // Module 6: Payments & Finance States
  const [financialStats, setFinancialStats] = useState(initialFinancialStats);
  const [transactions, setTransactions] = useState(initialTransactions);
  const [restaurantSettlements, setRestaurantSettlements] = useState(initialRestaurantSettlements);
  const [riderPayouts, setRiderPayouts] = useState(initialRiderPayouts);
  const [taxSummary, setTaxSummary] = useState(taxSummaryData);

  // Module 7: Offers & Promotions States
  const [coupons, setCoupons] = useState(initialCoupons);
  const [referralProgram, setReferralProgram] = useState(initialReferralProgram);

  // Module 8: Support, Reports & Settings States
  const [supportTickets, setSupportTickets] = useState(initialSupportTickets);
  const [deliveryZones, setDeliveryZones] = useState(initialDeliveryZones);
  const [adminUsers, setAdminUsers] = useState(initialAdminRoles);
  const [platformSettings, setPlatformSettings] = useState(initialPlatformSettings);
  const [auditLogs, setAuditLogs] = useState(initialAuditLogs);

  // Search & Notification States
  const [searchQuery, setSearchQuery] = useState('');
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'New High-Value Order Placed', desc: 'Order ORD-9821 placed ($59.79) from Urban Flame Burger Co.', time: '10m ago', unread: true, module: 'orders' },
    { id: 2, title: 'Refund Requested', desc: 'Customer Jordan requested refund for cancelled order ORD-9817.', time: '25m ago', unread: true, module: 'orders' },
    { id: 3, title: 'Restaurant Application Submitted', desc: 'Dragon Wok Express submitted commercial licenses for approval.', time: '40m ago', unread: true, module: 'restaurants' },
    { id: 4, title: 'New Rider Verification Pending', desc: 'Devon Washington uploaded driving license and registration.', time: '1h ago', unread: true, module: 'riders' },
    { id: 5, title: 'Customer Support Escalation', desc: 'Jordan Miller filed a priority inquiry regarding cancelled order.', time: '1h ago', unread: true, module: 'customers' }
  ]);
  const [toast, setToast] = useState(null);

  // Emerald Green Theme Colors for dynamic charts & SVG accents
  const currentTheme = {
    primary: '#10b981',
    primaryDark: '#059669',
    primaryDeep: '#047857',
    primaryLight: '#ecfdf5',
  };

  const showToast = (message, type = 'success') => {
    setToast({ message, type, id: Date.now() });
    setTimeout(() => {
      setToast(null);
    }, 3500);
  };

  // ==========================================
  // MODULE 2: Order Management Actions
  // ==========================================
  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(prev => prev.map(o => {
      if (o.id === orderId) {
        const updatedTimeline = [
          ...o.orderTimeline,
          { status: newStatus, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), done: true }
        ];
        return { ...o, orderStatus: newStatus, orderTimeline: updatedTimeline };
      }
      return o;
    }));
    showToast(`Order ${orderId} status changed to "${newStatus}"`);
  };

  const assignPartnerToOrder = (orderId, partnerId) => {
    const partner = deliveryPartners.find(p => p.id === partnerId);
    if (!partner) return;

    setOrders(prev => prev.map(o => {
      if (o.id === orderId) {
        return {
          ...o,
          orderStatus: 'Active Delivery',
          deliveryPartner: {
            id: partner.id,
            name: partner.name,
            phone: partner.phone,
            vehicle: partner.vehicleModel,
            rating: partner.rating,
            currentLocation: partner.currentLocation.address || 'In transit',
            eta: '12 mins'
          }
        };
      }
      return o;
    }));

    setDeliveryPartners(prev => prev.map(p => {
      if (p.id === partnerId) {
        return { ...p, status: 'Delivering', activeOrder: orderId };
      }
      return p;
    }));

    showToast(`Assigned ${partner.name} to ${orderId}`);
  };

  const processRefund = (orderId, amount, action) => {
    setOrders(prev => prev.map(o => {
      if (o.id === orderId) {
        return {
          ...o,
          refundStatus: action === 'approve' ? 'Approved & Processed' : 'Rejected',
          paymentStatus: action === 'approve' ? 'Refunded' : o.paymentStatus
        };
      }
      return o;
    }));

    showToast(`Refund of $${amount} for ${orderId} was ${action === 'approve' ? 'Approved' : 'Rejected'}`);
  };

  // ==========================================
  // MODULE 3: Restaurant & Menu Management Actions
  // ==========================================
  const addRestaurant = (newRestaurant) => {
    const id = `REST-${String(restaurants.length + 1).padStart(2, '0')}`;
    const formattedRest = {
      ...newRestaurant,
      id,
      slug: newRestaurant.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      logo: newRestaurant.logo || 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=150',
      coverImage: newRestaurant.coverImage || 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=800',
      rating: 5.0,
      reviewCount: 0,
      hygieneScore: 95,
      totalOrdersCompleted: 0,
      grossRevenue: 0,
      status: 'Pending Approval',
      verificationStatus: 'Under Review',
      verificationDocuments: newRestaurant.verificationDocuments || [
        { id: 'DOC-NEW-1', name: 'Food Safety & Hygiene License', status: 'Pending Review', expiry: '2028-12-31', documentNumber: 'FD-SUBMITTED' },
        { id: 'DOC-NEW-2', name: 'Commercial Tax Registration (EIN/GST)', status: 'Pending Review', expiry: 'Permanent', documentNumber: 'TAX-SUBMITTED' },
        { id: 'DOC-NEW-3', name: 'Premises Fire & Safety Clearance', status: 'Pending Review', expiry: '2027-12-31', documentNumber: 'FIRE-SUBMITTED' },
        { id: 'DOC-NEW-4', name: 'Bank Settlement Proof (Void Cheque)', status: 'Pending Review', expiry: 'Permanent', documentNumber: 'BNK-SUBMITTED' },
      ],
      categories: newRestaurant.categories || ['Main Courses', 'Beverages'],
      menuItems: newRestaurant.menuItems || [],
      isOpen: false
    };

    setRestaurants(prev => [formattedRest, ...prev]);
    showToast(`Restaurant "${newRestaurant.name}" registered successfully! Awaiting verification.`);
  };

  const updateRestaurantStatus = (restId, newStatus) => {
    setRestaurants(prev => prev.map(r => {
      if (r.id === restId) {
        const isApproved = newStatus === 'Approved';
        return {
          ...r,
          status: newStatus,
          verificationStatus: isApproved ? 'Verified' : r.verificationStatus,
          isOpen: isApproved ? r.isOpen : false,
          verificationDocuments: isApproved 
            ? r.verificationDocuments.map(d => ({ ...d, status: 'Verified' }))
            : r.verificationDocuments
        };
      }
      return r;
    }));
    showToast(`Restaurant ${restId} status updated to "${newStatus}"`);
  };

  const verifyRestaurantDocument = (restId, docId, status) => {
    setRestaurants(prev => prev.map(r => {
      if (r.id === restId) {
        const updatedDocs = r.verificationDocuments.map(d => 
          d.id === docId ? { ...d, status } : d
        );
        const allVerified = updatedDocs.every(d => d.status === 'Verified');
        return {
          ...r,
          verificationDocuments: updatedDocs,
          verificationStatus: allVerified ? 'Verified' : 'Under Review'
        };
      }
      return r;
    }));
    showToast(`Document ${docId} marked as "${status}"`);
  };

  const updateCommission = (restId, commissionRate, payoutCycle) => {
    setRestaurants(prev => prev.map(r => {
      if (r.id === restId) {
        return {
          ...r,
          commissionRate: parseFloat(commissionRate),
          payoutCycle: payoutCycle || r.payoutCycle
        };
      }
      return r;
    }));
    showToast(`Updated commission settings for ${restId} to ${commissionRate}%`);
  };

  const toggleRestaurantOpenStatus = (restId) => {
    setRestaurants(prev => prev.map(r => {
      if (r.id === restId) {
        const nextState = !r.isOpen;
        showToast(`${r.name} is now ${nextState ? 'OPEN for online orders' : 'CLOSED / OFFLINE'}`);
        return { ...r, isOpen: nextState };
      }
      return r;
    }));
  };

  const updateOperatingHours = (restId, operatingHours) => {
    setRestaurants(prev => prev.map(r => {
      if (r.id === restId) {
        return { ...r, operatingHours };
      }
      return r;
    }));
    showToast(`Operating hours updated for restaurant ${restId}`);
  };

  const addCategory = (restId, categoryName) => {
    if (!categoryName.trim()) return;
    setRestaurants(prev => prev.map(r => {
      if (r.id === restId) {
        if (r.categories.includes(categoryName.trim())) return r;
        return { ...r, categories: [...r.categories, categoryName.trim()] };
      }
      return r;
    }));
    showToast(`Category "${categoryName}" added`);
  };

  const addMenuItem = (restId, newItem) => {
    const itemId = `ITEM-${Date.now().toString().slice(-4)}`;
    const itemWithId = {
      ...newItem,
      id: itemId,
      price: parseFloat(newItem.price),
      discountPrice: newItem.discountPrice ? parseFloat(newItem.discountPrice) : null,
      preparationTime: parseInt(newItem.preparationTime, 10) || 15,
      isAvailable: newItem.isAvailable !== undefined ? newItem.isAvailable : true,
      image: newItem.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300'
    };

    setRestaurants(prev => prev.map(r => {
      if (r.id === restId) {
        return {
          ...r,
          menuItems: [itemWithId, ...r.menuItems]
        };
      }
      return r;
    }));
    showToast(`Added "${newItem.name}" to menu`);
  };

  const updateMenuItem = (restId, itemId, updatedFields) => {
    setRestaurants(prev => prev.map(r => {
      if (r.id === restId) {
        return {
          ...r,
          menuItems: r.menuItems.map(item => {
            if (item.id === itemId) {
              return {
                ...item,
                ...updatedFields,
                price: updatedFields.price !== undefined ? parseFloat(updatedFields.price) : item.price,
                discountPrice: updatedFields.discountPrice !== undefined ? (updatedFields.discountPrice ? parseFloat(updatedFields.discountPrice) : null) : item.discountPrice
              };
            }
            return item;
          })
        };
      }
      return r;
    }));
    showToast(`Updated menu item details`);
  };

  const deleteMenuItem = (restId, itemId) => {
    setRestaurants(prev => prev.map(r => {
      if (r.id === restId) {
        return {
          ...r,
          menuItems: r.menuItems.filter(item => item.id !== itemId)
        };
      }
      return r;
    }));
    showToast(`Item removed from menu`);
  };

  const toggleItemAvailability = (restId, itemId) => {
    setRestaurants(prev => prev.map(r => {
      if (r.id === restId) {
        return {
          ...r,
          menuItems: r.menuItems.map(item => {
            if (item.id === itemId) {
              const nextState = !item.isAvailable;
              showToast(`${item.name} is now ${nextState ? 'IN STOCK' : 'OUT OF STOCK'}`);
              return { ...item, isAvailable: nextState };
            }
            return item;
          })
        };
      }
      return r;
    }));
  };

  // ==========================================
  // MODULE 4: Delivery Partner Management Actions
  // ==========================================
  const addDeliveryPartner = (newPartner) => {
    const id = `RIDER-${String(deliveryPartners.length + 1).padStart(2, '0')}`;
    const partner = {
      ...newPartner,
      id,
      avatar: newPartner.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
      status: 'Under Review',
      verificationStatus: 'Pending Verification',
      rating: 5.0,
      totalDeliveries: 0,
      activeOrder: null,
      currentLocation: {
        address: `${newPartner.zone} Hub`,
        lat: 40.7128,
        lng: -74.006,
        batteryLevel: 'Standby',
        speed: '0 mph'
      },
      documents: [
        { name: 'Commercial Driver License', status: 'Pending Review', expiry: '2028-12-31', number: 'DL-NEW-SUBMITTED' },
        { name: 'Vehicle Registration (RC)', status: 'Pending Review', expiry: '2027-12-31', number: 'RC-NEW-SUBMITTED' },
        { name: 'National Background Clearance Check', status: 'Pending Review', expiry: 'In Progress', number: 'BC-IN-PROGRESS' },
        { name: 'Commercial Transit Insurance', status: 'Pending Review', expiry: '2027-01-01', number: 'INS-NEW-SUBMITTED' },
      ],
      earnings: {
        today: 0,
        thisWeek: 0,
        thisMonth: 0,
        tipsTotal: 0,
        basePay: 0,
        bonusEarned: 0,
        pendingPayout: 0
      },
      performance: {
        onTimeRate: 100,
        acceptanceRate: 100,
        completionRate: 100,
        avgDeliveryMins: 0,
        ratingCount: 0
      },
      deliveryHistory: []
    };

    setDeliveryPartners(prev => [partner, ...prev]);
    showToast(`Delivery Partner ${partner.name} registered and pending verification.`);
  };

  const updatePartnerStatus = (partnerId, newStatus) => {
    setDeliveryPartners(prev => prev.map(p => {
      if (p.id === partnerId) {
        return { ...p, status: newStatus };
      }
      return p;
    }));
    showToast(`Partner ${partnerId} status updated to "${newStatus}"`);
  };

  const verifyPartnerDocument = (partnerId, docName, status) => {
    setDeliveryPartners(prev => prev.map(p => {
      if (p.id === partnerId) {
        const updatedDocs = p.documents.map(d => 
          d.name === docName ? { ...d, status } : d
        );
        const allApproved = updatedDocs.every(d => d.status === 'Approved');
        return {
          ...p,
          documents: updatedDocs,
          verificationStatus: allApproved ? 'Approved' : p.verificationStatus,
          status: allApproved && p.status === 'Under Review' ? 'Online' : p.status
        };
      }
      return p;
    }));
    showToast(`Document "${docName}" set to ${status}`);
  };

  const approvePartner = (partnerId) => {
    setDeliveryPartners(prev => prev.map(p => {
      if (p.id === partnerId) {
        return {
          ...p,
          verificationStatus: 'Approved',
          status: 'Online',
          documents: p.documents.map(d => ({ ...d, status: 'Approved' }))
        };
      }
      return p;
    }));
    showToast(`Delivery partner ${partnerId} successfully verified & set to Online!`);
  };

  const suspendPartner = (partnerId) => {
    setDeliveryPartners(prev => prev.map(p => {
      if (p.id === partnerId) {
        return { ...p, status: 'Suspended' };
      }
      return p;
    }));
    showToast(`Delivery partner ${partnerId} has been suspended`, 'error');
  };

  const processPartnerPayout = (partnerId, amount) => {
    setDeliveryPartners(prev => prev.map(p => {
      if (p.id === partnerId) {
        return {
          ...p,
          earnings: {
            ...p.earnings,
            pendingPayout: Math.max(0, p.earnings.pendingPayout - parseFloat(amount))
          }
        };
      }
      return p;
    }));
    showToast(`Processed payout of $${amount} to rider ${partnerId}`);
  };

  const addPerformanceBonus = (partnerId, amount, reason) => {
    setDeliveryPartners(prev => prev.map(p => {
      if (p.id === partnerId) {
        return {
          ...p,
          earnings: {
            ...p.earnings,
            bonusEarned: p.earnings.bonusEarned + parseFloat(amount),
            pendingPayout: p.earnings.pendingPayout + parseFloat(amount)
          }
        };
      }
      return p;
    }));
    showToast(`$${amount} performance bonus credited to ${partnerId} (${reason})`);
  };

  // ==========================================
  // MODULE 5: Customer Management Actions
  // ==========================================
  const updateCustomerStatus = (customerId, newStatus) => {
    setCustomers(prev => prev.map(c => {
      if (c.id === customerId) {
        return { ...c, status: newStatus };
      }
      return c;
    }));
    showToast(`Customer ${customerId} status changed to "${newStatus}"`);
  };

  const addCustomerCredit = (customerId, amount, reason) => {
    setCustomers(prev => prev.map(c => {
      if (c.id === customerId) {
        const nextBalance = Number((c.walletBalance + parseFloat(amount)).toFixed(2));
        return { ...c, walletBalance: nextBalance };
      }
      return c;
    }));
    showToast(`Added $${amount} credit to customer wallet (${reason})`);
  };

  const resolveCustomerComplaint = (customerId, complaintId, resolution) => {
    setCustomers(prev => prev.map(c => {
      if (c.id === customerId) {
        return {
          ...c,
          complaints: c.complaints.map(comp => 
            comp.id === complaintId 
              ? { ...comp, status: 'Resolved', resolution } 
              : comp
          )
        };
      }
      return c;
    }));
    showToast(`Complaint ${complaintId} marked as Resolved`);
  };

  const addCustomerAdminNote = (customerId, note) => {
    setCustomers(prev => prev.map(c => {
      if (c.id === customerId) {
        return { ...c, adminNotes: note };
      }
      return c;
    }));
    showToast(`Internal admin notes updated`);
  };

  // ==========================================
  // MODULE 6: Payments & Finance Actions
  // ==========================================
  const addAuditLog = (action, details, actor = 'Naveen', status = 'Success') => {
    const newLog = {
      id: `LOG-${Date.now().toString().slice(-4)}`,
      timestamp: 'Just now',
      actor,
      role: 'Super Admin',
      action,
      details,
      ipAddress: '192.168.1.2',
      status
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  const retryPayment = (txnId) => {
    setTransactions(prev => prev.map(t => {
      if (t.id === txnId) {
        return {
          ...t,
          status: 'Successful',
          failureReason: null,
          failureCode: null,
          canRetry: false
        };
      }
      return t;
    }));
    setFinancialStats(prev => ({
      ...prev,
      failedTransactionsCount: Math.max(0, prev.failedTransactionsCount - 1),
      failedVolume: Math.max(0, prev.failedVolume - 35)
    }));
    addAuditLog('Payment Gateway Retry', `Manual retry executed for failed transaction ${txnId}`);
    showToast(`Payment retry succeeded! Transaction ${txnId} marked as Successful.`);
  };

  const settleRestaurant = (settlementId) => {
    const item = restaurantSettlements.find(s => s.id === settlementId);
    setRestaurantSettlements(prev => prev.map(s => {
      if (s.id === settlementId) {
        return { ...s, status: 'Settled', nextPayoutDate: 'Processed Today' };
      }
      return s;
    }));
    addAuditLog('Restaurant Settlement Disbursed', `Processed payout of $${item?.netPayable?.toFixed(2)} to ${item?.restaurantName}`);
    showToast(`Payout disbursed to ${item?.restaurantName || settlementId}! Settlement completed.`);
  };

  const holdRestaurantSettlement = (settlementId, reason = 'Under Compliance Review') => {
    setRestaurantSettlements(prev => prev.map(s => {
      if (s.id === settlementId) {
        return { ...s, status: `On Hold (${reason})` };
      }
      return s;
    }));
    addAuditLog('Settlement Placed On Hold', `Held settlement ${settlementId}: ${reason}`, 'Naveen', 'Warning');
    showToast(`Settlement ${settlementId} placed on hold: ${reason}`, 'error');
  };

  const settleRider = (payoutId) => {
    const rider = riderPayouts.find(p => p.id === payoutId);
    setRiderPayouts(prev => prev.map(p => {
      if (p.id === payoutId) {
        return { ...p, status: 'Paid' };
      }
      return p;
    }));
    addAuditLog('Rider Payout Disbursed', `Paid $${rider?.netPayout?.toFixed(2)} to delivery partner ${rider?.riderName}`);
    showToast(`Instant payout of $${rider?.netPayout?.toFixed(2)} sent to ${rider?.riderName}!`);
  };

  // ==========================================
  // MODULE 7: Offers & Promotions Actions
  // ==========================================
  const addCoupon = (newCoupon) => {
    const id = `COUPON-${String(coupons.length + 1).padStart(2, '0')}`;
    const formatted = {
      ...newCoupon,
      id,
      usedCount: 0,
      revenueGenerated: 0,
      totalDiscountGiven: 0,
      status: 'Active'
    };
    setCoupons(prev => [formatted, ...prev]);
    addAuditLog('Coupon Created', `Created promo campaign ${newCoupon.code} (${newCoupon.title})`);
    showToast(`Coupon "${newCoupon.code}" created and active!`);
  };

  const toggleCouponStatus = (couponId) => {
    setCoupons(prev => prev.map(c => {
      if (c.id === couponId) {
        const next = c.status === 'Active' ? 'Paused' : 'Active';
        showToast(`Coupon ${c.code} is now ${next}`);
        return { ...c, status: next };
      }
      return c;
    }));
  };

  const deleteCoupon = (couponId) => {
    const target = coupons.find(c => c.id === couponId);
    setCoupons(prev => prev.filter(c => c.id !== couponId));
    addAuditLog('Coupon Deleted', `Deleted coupon code ${target?.code || couponId}`, 'Naveen', 'Warning');
    showToast(`Coupon ${target?.code || couponId} removed`);
  };

  const extendCouponExpiry = (couponId, days = 14) => {
    setCoupons(prev => prev.map(c => {
      if (c.id === couponId) {
        const currentExp = new Date(c.expiryDate);
        currentExp.setDate(currentExp.getDate() + days);
        const newDateStr = currentExp.toISOString().split('T')[0];
        return { ...c, expiryDate: newDateStr, status: 'Active' };
      }
      return c;
    }));
    showToast(`Coupon extended by ${days} days`);
  };

  const updateReferralProgram = (updates) => {
    setReferralProgram(prev => ({ ...prev, ...updates }));
    addAuditLog('Referral Program Updated', `Updated referral reward tiers and minimum orders`);
    showToast(`Referral program settings updated!`);
  };

  // ==========================================
  // MODULE 8: Support, Reports & Settings Actions
  // ==========================================
  const replyToTicket = (ticketId, replyText) => {
    if (!replyText.trim()) return;
    setSupportTickets(prev => prev.map(t => {
      if (t.id === ticketId) {
        const newMsg = {
          sender: 'support',
          name: 'Naveen (Super Admin)',
          time: 'Just now',
          text: replyText
        };
        return {
          ...t,
          status: t.status === 'Open' ? 'In Progress' : t.status,
          messages: [...(t.messages || []), newMsg]
        };
      }
      return t;
    }));
    showToast(`Reply sent to ticket ${ticketId}`);
  };

  const updateTicketStatus = (ticketId, newStatus) => {
    setSupportTickets(prev => prev.map(t => {
      if (t.id === ticketId) {
        return { ...t, status: newStatus };
      }
      return t;
    }));
    addAuditLog('Ticket Status Changed', `Ticket ${ticketId} updated to ${newStatus}`);
    showToast(`Ticket ${ticketId} status changed to ${newStatus}`);
  };

  const resolveTicketWithCompensation = (ticketId, refundAmount, note) => {
    const ticket = supportTickets.find(t => t.id === ticketId);
    if (!ticket) return;

    if (refundAmount > 0 && ticket.customer?.email) {
      // credit customer wallet if matched
      setCustomers(prev => prev.map(c => {
        if (c.email === ticket.customer.email) {
          return { ...c, walletBalance: Number((c.walletBalance + parseFloat(refundAmount)).toFixed(2)) };
        }
        return c;
      }));
    }

    const resolutionMsg = {
      sender: 'support',
      name: 'Naveen (Super Admin)',
      time: 'Just now',
      text: `Resolution: ${note}. Goodwill compensation of $${parseFloat(refundAmount).toFixed(2)} issued.`
    };

    setSupportTickets(prev => prev.map(t => {
      if (t.id === ticketId) {
        return {
          ...t,
          status: 'Resolved',
          messages: [...(t.messages || []), resolutionMsg]
        };
      }
      return t;
    }));

    addAuditLog('Ticket Resolved with Compensation', `Issued $${parseFloat(refundAmount).toFixed(2)} for ${ticketId} (${ticket.customer?.name})`);
    showToast(`Ticket ${ticketId} marked Resolved! Goodwill of $${parseFloat(refundAmount).toFixed(2)} credited.`);
  };

  const updateDeliveryZone = (zoneId, updates) => {
    setDeliveryZones(prev => prev.map(z => {
      if (z.id === zoneId) {
        return { ...z, ...updates };
      }
      return z;
    }));
    addAuditLog('Delivery Zone Updated', `Updated zone settings for ${zoneId}`);
    showToast(`Delivery zone updated successfully!`);
  };

  const addAdminUser = (userData) => {
    const id = `USR-ADM-${String(adminUsers.length + 1).padStart(2, '0')}`;
    const newUser = {
      ...userData,
      id,
      status: 'Active',
      twoFactorEnabled: false,
      lastActive: 'Just registered'
    };
    setAdminUsers(prev => [newUser, ...prev]);
    addAuditLog('Admin User Added', `Added admin team member ${userData.name} as ${userData.role}`);
    showToast(`Team member "${userData.name}" added to admin panel!`);
  };

  const updateAdminRole = (userId, newRole) => {
    setAdminUsers(prev => prev.map(u => {
      if (u.id === userId) {
        return { ...u, role: newRole };
      }
      return u;
    }));
    addAuditLog('Admin Role Updated', `Role for ${userId} updated to ${newRole}`);
    showToast(`Role updated for user ${userId}`);
  };

  const updatePlatformSettings = (updates) => {
    setPlatformSettings(prev => ({ ...prev, ...updates }));
    addAuditLog('Platform Settings Changed', `Updated global platform parameters`);
    showToast(`Platform settings updated!`);
  };

  // Platform Notification
  const broadcastNotification = (title, message, target) => {
    const newNotif = {
      id: Date.now(),
      title: `[Push -> ${target}] ${title}`,
      desc: message,
      time: 'Just now',
      unread: true,
      module: 'orders'
    };
    setNotifications(prev => [newNotif, ...prev]);
    showToast(`Broadcast notification sent to ${target}!`);
  };

  const markAllNotificationsRead = () => {
    setNotifications([]);
    showToast('All notifications marked as read and cleared');
  };

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const value = {
    activeModule,
    setActiveModule,
    activeSubTab,
    setActiveSubTab,
    sidebarOpen,
    setSidebarOpen,
    stats,
    orders,
    deliveryPartners,
    restaurants,
    customers,
    searchQuery,
    setSearchQuery,
    currentTheme,
    notifications,
    toast,
    showToast,
    salesTrendsData,
    peakHoursData,
    cuisineBreakdown,
    // Order Actions
    updateOrderStatus,
    assignPartnerToOrder,
    processRefund,
    // Restaurant Actions
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
    // Delivery Partner Actions
    addDeliveryPartner,
    updatePartnerStatus,
    verifyPartnerDocument,
    approvePartner,
    suspendPartner,
    processPartnerPayout,
    addPerformanceBonus,
    // Customer Actions
    updateCustomerStatus,
    addCustomerCredit,
    resolveCustomerComplaint,
    addCustomerAdminNote,
    // Notification
    broadcastNotification,
    markAllNotificationsRead,
    removeNotification,

    // Module 6: Payments & Finance
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

    // Module 7: Offers & Promotions
    coupons,
    referralProgram,
    promoCampaignAnalytics,
    addCoupon,
    toggleCouponStatus,
    deleteCoupon,
    extendCouponExpiry,
    updateReferralProgram,

    // Module 8: Support, Reports & Settings
    supportTickets,
    deliveryZones,
    adminUsers,
    platformSettings,
    auditLogs,
    salesReportSummary,
    replyToTicket,
    updateTicketStatus,
    resolveTicketWithCompensation,
    updateDeliveryZone,
    addAdminUser,
    updateAdminRole,
    updatePlatformSettings,
    addAuditLog
  };

  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};
