// Comprehensive Mock Data for Modules 6, 7 & 8:
// Module 6: Payments & Finance
// Module 7: Offers & Promotions
// Module 8: Support, Reports & Settings

// ==========================================
// MODULE 6: PAYMENTS & FINANCE
// ==========================================

export const initialFinancialStats = {
  grossVolume: 284590,
  grossGrowth: 14.8,
  netCommission: 48380,
  commissionGrowth: 16.2,
  pendingSettlements: 24150,
  pendingRiderPayouts: 5420,
  taxCollected: 22767,
  totalRefunds: 2840,
  refundRate: 0.99,
  failedTransactionsCount: 14,
  failedVolume: 3140,
  successRate: 98.9
};

export const paymentGateways = [
  { id: 'gw-stripe', name: 'Stripe Cards & Wallets', volume: 165062, share: 58, successRate: 99.2, fee: '2.9% + $0.30', status: 'Healthy', latency: '210ms' },
  { id: 'gw-apple', name: 'Apple Pay Direct', volume: 62609, share: 22, successRate: 99.6, fee: '2.7%', status: 'Healthy', latency: '180ms' },
  { id: 'gw-google', name: 'Google Pay / UPI', volume: 34150, share: 12, successRate: 98.9, fee: '2.5%', status: 'Healthy', latency: '195ms' },
  { id: 'gw-razorpay', name: 'Razorpay / NetBanking', volume: 14229, share: 5, successRate: 97.4, fee: '2.0%', status: 'Healthy', latency: '340ms' },
  { id: 'gw-cod', name: 'Cash on Delivery (COD)', volume: 8540, share: 3, successRate: 92.1, fee: '$0.00', status: 'Operational', latency: 'N/A' },
];

export const financialDailyTrends = [
  { day: 'Mon', grossSales: 38200, commission: 6494, restaurantPayout: 28650, riderPayout: 3056 },
  { day: 'Tue', grossSales: 41500, commission: 7055, restaurantPayout: 31125, riderPayout: 3320 },
  { day: 'Wed', grossSales: 44200, commission: 7514, restaurantPayout: 33150, riderPayout: 3536 },
  { day: 'Thu', grossSales: 46800, commission: 7956, restaurantPayout: 35100, riderPayout: 3744 },
  { day: 'Fri', grossSales: 58900, commission: 10013, restaurantPayout: 44175, riderPayout: 4712 },
  { day: 'Sat', grossSales: 68400, commission: 11628, restaurantPayout: 51300, riderPayout: 5472 },
  { day: 'Sun', grossSales: 64100, commission: 10897, restaurantPayout: 48075, riderPayout: 5128 },
];

export const initialTransactions = [
  {
    id: 'TXN-90214',
    orderId: 'ORD-9821',
    customer: 'Sophia Montgomery',
    customerAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    restaurant: 'Urban Flame Burger Co.',
    amount: 59.79,
    method: 'Apple Pay',
    gateway: 'gw-apple',
    gatewayRef: 'ch_3N8x7kL1992019',
    timestamp: 'Today, 12:35 PM',
    status: 'Successful',
    feeDeducted: 1.61,
    netPlatformGain: 10.15,
    taxAmount: 4.80,
    type: 'Order Payment'
  },
  {
    id: 'TXN-90213',
    orderId: 'ORD-9820',
    customer: 'Liam Chen',
    customerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    restaurant: 'Little Napoli Pizzeria',
    amount: 47.45,
    method: 'Visa •••• 4242 (Stripe)',
    gateway: 'gw-stripe',
    gatewayRef: 'pi_3M7qWeL298374',
    timestamp: 'Today, 12:28 PM',
    status: 'Successful',
    feeDeducted: 1.68,
    netPlatformGain: 8.06,
    taxAmount: 3.80,
    type: 'Order Payment'
  },
  {
    id: 'TXN-90212',
    orderId: 'ORD-9819',
    customer: 'Emma Watson',
    customerAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
    restaurant: 'Sakura Sushi Bar',
    amount: 84.20,
    method: 'Mastercard •••• 8821 (Stripe)',
    gateway: 'gw-stripe',
    gatewayRef: 'pi_3M7qWeL298375',
    timestamp: 'Today, 12:14 PM',
    status: 'Successful',
    feeDeducted: 2.74,
    netPlatformGain: 14.31,
    taxAmount: 6.74,
    type: 'Order Payment'
  },
  {
    id: 'TXN-90211',
    orderId: 'ORD-9818',
    customer: 'Marcus Cole',
    customerAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
    restaurant: 'Royal Spice Kitchen',
    amount: 36.50,
    method: 'Google Pay',
    gateway: 'gw-google',
    gatewayRef: 'gpay_ref_9921827',
    timestamp: 'Today, 11:45 AM',
    status: 'Successful',
    feeDeducted: 0.91,
    netPlatformGain: 6.20,
    taxAmount: 2.92,
    type: 'Order Payment'
  },
  {
    id: 'TXN-90210',
    orderId: 'ORD-9817',
    customer: 'Jordan Miller',
    customerAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
    restaurant: 'Urban Flame Burger Co.',
    amount: 30.30,
    method: 'Apple Pay',
    gateway: 'gw-apple',
    gatewayRef: 're_3M8aReL992100',
    timestamp: 'Today, 11:15 AM',
    status: 'Refunded',
    feeDeducted: 0.00,
    netPlatformGain: 0.00,
    taxAmount: 0.00,
    type: 'Customer Refund'
  },
  {
    id: 'TXN-90209',
    orderId: 'ORD-9815',
    customer: 'Elena Rostova',
    customerAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150',
    restaurant: 'Sakura Sushi Bar',
    amount: 72.80,
    method: 'Amex •••• 1004 (Stripe)',
    gateway: 'gw-stripe',
    gatewayRef: 'pi_3M7qWeL298379',
    timestamp: 'Today, 10:40 AM',
    status: 'Successful',
    feeDeducted: 2.41,
    netPlatformGain: 12.38,
    taxAmount: 5.82,
    type: 'Order Payment'
  },
  {
    id: 'TXN-90208',
    orderId: 'ORD-9814',
    customer: 'Alex Rivera',
    customerAvatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150',
    restaurant: 'Dragon Wok Express',
    amount: 28.50,
    method: 'Visa •••• 9920 (Stripe)',
    gateway: 'gw-stripe',
    gatewayRef: 'pi_err_card_declined_insufficient_funds',
    timestamp: 'Today, 10:12 AM',
    status: 'Failed',
    failureReason: 'Insufficient Account Balance',
    failureCode: 'card_declined',
    canRetry: true,
    feeDeducted: 0.00,
    netPlatformGain: 0.00,
    taxAmount: 0.00,
    type: 'Failed Attempt'
  },
  {
    id: 'TXN-90207',
    orderId: 'ORD-9813',
    customer: 'David Kim',
    customerAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
    restaurant: 'Little Napoli Pizzeria',
    amount: 42.10,
    method: 'Mastercard •••• 3110 (Stripe)',
    gateway: 'gw-stripe',
    gatewayRef: 'pi_err_3ds_timeout',
    timestamp: 'Today, 09:48 AM',
    status: 'Failed',
    failureReason: '3D Secure Bank Verification Timed Out',
    failureCode: 'authentication_timeout',
    canRetry: true,
    feeDeducted: 0.00,
    netPlatformGain: 0.00,
    taxAmount: 0.00,
    type: 'Failed Attempt'
  },
  {
    id: 'TXN-90206',
    orderId: 'ORD-9812',
    customer: 'Chloe Bennett',
    customerAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
    restaurant: 'Urban Flame Burger Co.',
    amount: 51.20,
    method: 'Apple Pay',
    gateway: 'gw-apple',
    gatewayRef: 'ch_3N8x7kL1992004',
    timestamp: 'Today, 09:15 AM',
    status: 'Successful',
    feeDeducted: 1.38,
    netPlatformGain: 8.70,
    taxAmount: 4.10,
    type: 'Order Payment'
  },
  {
    id: 'TXN-90205',
    orderId: 'ORD-9811',
    customer: 'Carlos Mendez',
    customerAvatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150',
    restaurant: 'Verde Bowl & Artisan Salad',
    amount: 41.60,
    method: 'Google Pay',
    gateway: 'gw-google',
    gatewayRef: 'gpay_ref_9921820',
    timestamp: 'Today, 08:50 AM',
    status: 'Successful',
    feeDeducted: 1.04,
    netPlatformGain: 7.07,
    taxAmount: 3.33,
    type: 'Order Payment'
  }
];

export const initialRestaurantSettlements = [
  {
    id: 'SETTLE-REST-01',
    restaurantId: 'REST-01',
    restaurantName: 'Urban Flame Burger Co.',
    cycle: 'Weekly (Every Tuesday)',
    orderCount: 148,
    grossSales: 6420.00,
    commissionRate: 18,
    commissionDeducted: 1155.60,
    logisticsShare: 320.00,
    refundDeductions: 30.30,
    netPayable: 4914.10,
    bankName: 'Chase Commercial Banking',
    accountEnding: '••• 8104',
    routingNumber: '021000021',
    nextPayoutDate: 'Tomorrow, Oct 28',
    status: 'Pending Settlement'
  },
  {
    id: 'SETTLE-REST-02',
    restaurantId: 'REST-02',
    restaurantName: 'Little Napoli Pizzeria',
    cycle: 'Weekly (Every Tuesday)',
    orderCount: 182,
    grossSales: 7890.50,
    commissionRate: 17,
    commissionDeducted: 1341.39,
    logisticsShare: 390.00,
    refundDeductions: 0.00,
    netPayable: 6159.11,
    bankName: 'Bank of America Merch',
    accountEnding: '••• 4491',
    routingNumber: '121000358',
    nextPayoutDate: 'Tomorrow, Oct 28',
    status: 'Ready to Payout'
  },
  {
    id: 'SETTLE-REST-03',
    restaurantId: 'REST-03',
    restaurantName: 'Sakura Sushi Bar',
    cycle: 'Bi-Weekly',
    orderCount: 124,
    grossSales: 8940.00,
    commissionRate: 20,
    commissionDeducted: 1788.00,
    logisticsShare: 280.00,
    refundDeductions: 0.00,
    netPayable: 6872.00,
    bankName: 'Wells Fargo Business',
    accountEnding: '••• 9012',
    routingNumber: '122000247',
    nextPayoutDate: 'Nov 01, 2026',
    status: 'Settled'
  },
  {
    id: 'SETTLE-REST-04',
    restaurantId: 'REST-04',
    restaurantName: 'Royal Spice Kitchen',
    cycle: 'Weekly (Every Tuesday)',
    orderCount: 96,
    grossSales: 4120.00,
    commissionRate: 18,
    commissionDeducted: 741.60,
    logisticsShare: 195.00,
    refundDeductions: 0.00,
    netPayable: 3183.40,
    bankName: 'Citibank Commercial',
    accountEnding: '••• 2218',
    routingNumber: '021000089',
    nextPayoutDate: 'Tomorrow, Oct 28',
    status: 'Ready to Payout'
  },
  {
    id: 'SETTLE-REST-05',
    restaurantId: 'REST-05',
    restaurantName: 'Dragon Wok Express',
    cycle: 'Instant Settlement',
    orderCount: 42,
    grossSales: 1650.00,
    commissionRate: 15,
    commissionDeducted: 247.50,
    logisticsShare: 85.00,
    refundDeductions: 0.00,
    netPayable: 1317.50,
    bankName: 'TD Bank North',
    accountEnding: '••• 7731',
    routingNumber: '011000138',
    nextPayoutDate: 'On Demand',
    status: 'On Hold (Document Review)'
  },
  {
    id: 'SETTLE-REST-06',
    restaurantId: 'REST-06',
    restaurantName: 'Verde Bowl & Artisan Salad',
    cycle: 'Weekly (Every Tuesday)',
    orderCount: 78,
    grossSales: 3240.00,
    commissionRate: 18,
    commissionDeducted: 583.20,
    logisticsShare: 150.00,
    refundDeductions: 0.00,
    netPayable: 2506.80,
    bankName: 'Chase Commercial Banking',
    accountEnding: '••• 3089',
    routingNumber: '021000021',
    nextPayoutDate: 'Tomorrow, Oct 28',
    status: 'Ready to Payout'
  }
];

export const initialRiderPayouts = [
  {
    id: 'PAYOUT-RIDER-01',
    riderId: 'RIDER-01',
    riderName: 'Marcus Vance',
    vehicle: 'Yamaha E-Bike',
    period: 'Oct 20 - Oct 27',
    completedTrips: 58,
    basePay: 464.00,
    distanceSurge: 92.50,
    tipsReceived: 184.00,
    bonusEarned: 45.00,
    cashDeduction: 0.00,
    netPayout: 785.50,
    payoutMethod: 'Direct Deposit (PNC Bank ••• 9918)',
    status: 'Ready for Payout'
  },
  {
    id: 'PAYOUT-RIDER-02',
    riderId: 'RIDER-02',
    riderName: 'Elena Gomez',
    vehicle: 'Honda PCX 150 Scooter',
    period: 'Oct 20 - Oct 27',
    completedTrips: 74,
    basePay: 592.00,
    distanceSurge: 134.00,
    tipsReceived: 242.50,
    bonusEarned: 60.00,
    cashDeduction: 0.00,
    netPayout: 1028.50,
    payoutMethod: 'Instant Debit (Chase ••• 1442)',
    status: 'Ready for Payout'
  },
  {
    id: 'PAYOUT-RIDER-03',
    riderId: 'RIDER-03',
    riderName: 'Tariq Al-Mansoor',
    vehicle: 'Toyota Prius (Hybrid)',
    period: 'Oct 20 - Oct 27',
    completedTrips: 62,
    basePay: 496.00,
    distanceSurge: 110.00,
    tipsReceived: 198.00,
    bonusEarned: 35.00,
    cashDeduction: 50.00,
    netPayout: 789.00,
    payoutMethod: 'Direct Deposit (Wells Fargo ••• 6721)',
    status: 'Ready for Payout'
  },
  {
    id: 'PAYOUT-RIDER-04',
    riderId: 'RIDER-04',
    riderName: 'Chloe Bennett',
    vehicle: 'Trek FX3 Road Bicycle',
    period: 'Oct 20 - Oct 27',
    completedTrips: 41,
    basePay: 328.00,
    distanceSurge: 45.00,
    tipsReceived: 112.00,
    bonusEarned: 25.00,
    cashDeduction: 0.00,
    netPayout: 510.00,
    payoutMethod: 'Instant Debit (Capital One ••• 3910)',
    status: 'Paid'
  },
  {
    id: 'PAYOUT-RIDER-05',
    riderId: 'RIDER-05',
    riderName: 'Devon Washington',
    vehicle: 'Vespa Primavera 125',
    period: 'Oct 20 - Oct 27',
    completedTrips: 0,
    basePay: 0.00,
    distanceSurge: 0.00,
    tipsReceived: 0.00,
    bonusEarned: 0.00,
    cashDeduction: 0.00,
    netPayout: 0.00,
    payoutMethod: 'Direct Deposit (Pending Verification)',
    status: 'Under Review'
  }
];

export const taxSummaryData = {
  fiscalPeriod: 'October 2026',
  stateTaxRate: 8.25,
  municipalSurchargeRate: 1.50,
  platformServiceVAT: 5.00,
  totalTaxableSales: 246500.00,
  stateTaxCollected: 20336.25,
  municipalTaxCollected: 3697.50,
  taxRemittedToGov: 18400.00,
  pendingFilingBalance: 5633.75,
  filingDueDate: 'Nov 15, 2026'
};

// ==========================================
// MODULE 7: OFFERS & PROMOTIONS
// ==========================================

export const initialCoupons = [
  {
    id: 'COUPON-01',
    code: 'WELCOME50',
    title: '50% Off First Feast',
    description: 'Special 50% discount for all newly registered customers on their first delivery order.',
    discountType: 'percentage', // percentage | flat | free_delivery
    discountValue: 50,
    minOrderValue: 25.00,
    maxDiscountCap: 15.00,
    usageLimitTotal: 1000,
    usageLimitPerUser: 1,
    usedCount: 784,
    startDate: '2026-10-01',
    expiryDate: '2026-11-30',
    applicableTo: 'All Restaurants',
    targetAudience: 'New Customers Only',
    status: 'Active',
    revenueGenerated: 34500,
    totalDiscountGiven: 9800
  },
  {
    id: 'COUPON-02',
    code: 'BURGERLOVE',
    title: '$5 Off Premium Burgers',
    description: 'Flat $5 savings on artisanal burger selections from verified partner burger joints.',
    discountType: 'flat',
    discountValue: 5.00,
    minOrderValue: 30.00,
    maxDiscountCap: 5.00,
    usageLimitTotal: 500,
    usageLimitPerUser: 2,
    usedCount: 342,
    startDate: '2026-10-10',
    expiryDate: '2026-11-15',
    applicableTo: 'Burgers Category',
    targetAudience: 'All Users',
    status: 'Active',
    revenueGenerated: 16416,
    totalDiscountGiven: 1710
  },
  {
    id: 'COUPON-03',
    code: 'FREEDEL',
    title: 'Free Delivery Weekend',
    description: '100% waiver of delivery fee on all orders exceeding $20 across all zones.',
    discountType: 'free_delivery',
    discountValue: 3.99,
    minOrderValue: 20.00,
    maxDiscountCap: 3.99,
    usageLimitTotal: 2000,
    usageLimitPerUser: 3,
    usedCount: 1890,
    startDate: '2026-10-15',
    expiryDate: '2026-10-31',
    applicableTo: 'All Restaurants',
    targetAudience: 'All Users',
    status: 'Active',
    revenueGenerated: 58590,
    totalDiscountGiven: 7541
  },
  {
    id: 'COUPON-04',
    code: 'VIPTASTE',
    title: '25% Luxury Dining Pass',
    description: 'Exclusive 25% discount reserved for VIP Black and Gold tier cardholders.',
    discountType: 'percentage',
    discountValue: 25,
    minOrderValue: 50.00,
    maxDiscountCap: 30.00,
    usageLimitTotal: 300,
    usageLimitPerUser: 5,
    usedCount: 148,
    startDate: '2026-10-01',
    expiryDate: '2026-12-31',
    applicableTo: 'Fine Dining & Sushi',
    targetAudience: 'VIP Black & Gold Only',
    status: 'Active',
    revenueGenerated: 11840,
    totalDiscountGiven: 2960
  },
  {
    id: 'COUPON-05',
    code: 'FEASTWEEKEND',
    title: 'Weekend Group Feast $10 Off',
    description: 'Flat $10 rebate for large group orders exceeding $45 on Saturdays and Sundays.',
    discountType: 'flat',
    discountValue: 10.00,
    minOrderValue: 45.00,
    maxDiscountCap: 10.00,
    usageLimitTotal: 600,
    usageLimitPerUser: 1,
    usedCount: 580,
    startDate: '2026-10-24',
    expiryDate: '2026-10-28',
    applicableTo: 'All Restaurants',
    targetAudience: 'All Users',
    status: 'Expiring Soon',
    revenueGenerated: 31900,
    totalDiscountGiven: 5800
  },
  {
    id: 'COUPON-06',
    code: 'LUNCHRUSH',
    title: '$4 Off Midday Express',
    description: 'Quick desk lunch incentive valid Monday through Friday between 11:30 AM and 2:30 PM.',
    discountType: 'flat',
    discountValue: 4.00,
    minOrderValue: 22.00,
    maxDiscountCap: 4.00,
    usageLimitTotal: 800,
    usageLimitPerUser: 3,
    usedCount: 615,
    startDate: '2026-10-05',
    expiryDate: '2026-11-20',
    applicableTo: 'Salads & Express Meals',
    targetAudience: 'All Users',
    status: 'Active',
    revenueGenerated: 17220,
    totalDiscountGiven: 2460
  },
  {
    id: 'COUPON-07',
    code: 'SWEETTREAT',
    title: 'Free Artisan Dessert',
    description: 'Complimentary dessert voucher with orders over $35 from Italian and Bakery outlets.',
    discountType: 'flat',
    discountValue: 6.00,
    minOrderValue: 35.00,
    maxDiscountCap: 6.00,
    usageLimitTotal: 400,
    usageLimitPerUser: 1,
    usedCount: 400,
    startDate: '2026-10-01',
    expiryDate: '2026-10-25',
    applicableTo: 'Desserts & Pizzeria',
    targetAudience: 'All Users',
    status: 'Expired',
    revenueGenerated: 18000,
    totalDiscountGiven: 2400
  },
  {
    id: 'COUPON-08',
    code: 'NIGHTOWL',
    title: 'Late Night 15% Craving',
    description: 'Late night cravings rebate active from 11:00 PM to 4:00 AM on orders over $20.',
    discountType: 'percentage',
    discountValue: 15,
    minOrderValue: 20.00,
    maxDiscountCap: 10.00,
    usageLimitTotal: 500,
    usageLimitPerUser: 2,
    usedCount: 0,
    startDate: '2026-11-01',
    expiryDate: '2026-12-15',
    applicableTo: 'All Restaurants',
    targetAudience: 'All Users',
    status: 'Paused',
    revenueGenerated: 0,
    totalDiscountGiven: 0
  }
];

export const initialReferralProgram = {
  enabled: true,
  referrerReward: 5.00,
  refereeReward: 10.00,
  refereeMinOrderValue: 25.00,
  voucherExpiryDays: 30,
  maxReferralsPerUser: 50,
  totalInvitesSent: 4820,
  successfulConversions: 1640,
  conversionRate: 34.0,
  totalReferralSpend: 16400,
  referralGeneratedRevenue: 82340,
  roi: 5.02,
  topReferrers: [
    { name: 'Sophia Montgomery', email: 'sophia.m@example.com', referrals: 24, earned: 120.00 },
    { name: 'Liam Chen', email: 'liam.chen@techcorp.io', referrals: 19, earned: 95.00 },
    { name: 'Carlos Mendez', email: 'carlos.m@coastal.com', referrals: 15, earned: 75.00 },
    { name: 'Emma Watson', email: 'emma.w@creative.org', referrals: 12, earned: 60.00 },
  ]
};

export const promoCampaignAnalytics = {
  totalPromoSpend: 32671,
  incrementalRevenue: 188466,
  promoOrderCount: 4369,
  promoOrderShare: 23.7,
  avgOrderValuePromo: 37.80,
  avgOrderValueNormal: 26.40,
  overallRoi: 5.76,
  dailyRedemptionTrends: [
    { day: 'Mon', redemptions: 420, discountCost: 3150, grossSales: 18900 },
    { day: 'Tue', redemptions: 480, discountCost: 3600, grossSales: 21600 },
    { day: 'Wed', redemptions: 510, discountCost: 3825, grossSales: 22950 },
    { day: 'Thu', redemptions: 590, discountCost: 4425, grossSales: 26550 },
    { day: 'Fri', redemptions: 740, discountCost: 5550, grossSales: 33300 },
    { day: 'Sat', redemptions: 890, discountCost: 6675, grossSales: 40050 },
    { day: 'Sun', redemptions: 739, discountCost: 5546, grossSales: 33255 },
  ]
};

// ==========================================
// MODULE 8: SUPPORT, REPORTS & SETTINGS
// ==========================================

export const initialSupportTickets = [
  {
    id: 'TCK-4019',
    orderId: 'ORD-9821',
    customer: {
      name: 'Sophia Montgomery',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
      email: 'sophia.m@example.com',
      phone: '+1 (555) 234-5678',
      tier: 'VIP Black'
    },
    restaurant: 'Urban Flame Burger Co.',
    rider: 'Marcus Vance',
    subject: 'Missing Truffle Fries and sauce spilled in bag',
    category: 'Missing/Damaged Items',
    priority: 'Urgent',
    status: 'In Progress',
    channel: 'Live Chat',
    assignedAgent: 'Priya Sharma (Lead)',
    createdAt: '15m ago',
    disputeAmount: 12.00,
    evidenceImage: 'https://images.unsplash.com/photo-1576107232684-1279f3908594?w=600',
    messages: [
      { sender: 'customer', name: 'Sophia', time: '12:45 PM', text: 'Hi, I just opened the delivery bag for ORD-9821. The burger is here, but the Parmesan Herb Crinkle Fries are missing and the aioli cup popped open in the bottom.' },
      { sender: 'support', name: 'Priya (Agent)', time: '12:47 PM', text: 'Hello Sophia! We are so sorry for this mishap with Urban Flame Burger. Let me check with the restaurant right now and compensate you immediately.' }
    ]
  },
  {
    id: 'TCK-4018',
    orderId: 'ORD-9817',
    customer: {
      name: 'Jordan Miller',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
      email: 'jordan.m@agency.com',
      phone: '+1 (555) 345-6789',
      tier: 'Regular'
    },
    restaurant: 'Urban Flame Burger Co.',
    rider: 'Unassigned',
    subject: 'Order cancelled by restaurant - requesting immediate bank refund',
    category: 'Refund & Cancellation',
    priority: 'High',
    status: 'Open',
    channel: 'In-App Ticket',
    assignedAgent: 'Sarah Chen (Finance)',
    createdAt: '42m ago',
    disputeAmount: 30.30,
    evidenceImage: null,
    messages: [
      { sender: 'customer', name: 'Jordan', time: '11:32 AM', text: 'The restaurant cancelled after 15 mins because pork ran out. Please ensure the $30.30 is refunded back to my Apple Pay right away.' }
    ]
  },
  {
    id: 'TCK-4015',
    orderId: 'ORD-9816',
    customer: {
      name: 'Carlos Mendez',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150',
      email: 'carlos.m@coastal.com',
      phone: '+1 (555) 789-0123',
      tier: 'Gold Member'
    },
    restaurant: 'Verde Bowl & Artisan Salad',
    rider: 'Elena Gomez',
    subject: 'Food arrived 35 minutes late and cold',
    category: 'Delivery Delay',
    priority: 'Medium',
    status: 'Resolved',
    channel: 'Live Chat',
    assignedAgent: 'Alex Rivera',
    createdAt: '3h ago',
    disputeAmount: 15.00,
    evidenceImage: null,
    messages: [
      { sender: 'customer', name: 'Carlos', time: '09:20 AM', text: 'Rider took a very long detour due to traffic. Salad bowls arrived warm instead of chilled.' },
      { sender: 'support', name: 'Alex', time: '09:25 AM', text: 'Appreciate your patience Carlos. Credited $15.00 goodwill voucher to your wallet instantly.' }
    ]
  },
  {
    id: 'TCK-4011',
    orderId: 'ORD-9501',
    customer: {
      name: 'Samantha Vance',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150',
      email: 'samantha.v@outlook.com',
      phone: '+1 (555) 998-1122',
      tier: 'Regular'
    },
    restaurant: 'Urban Flame Burger Co.',
    rider: 'Marcus Vance',
    subject: 'Credit card chargeback dispute investigation',
    category: 'Payment Dispute',
    priority: 'High',
    status: 'Escalated',
    channel: 'Bank Portal',
    assignedAgent: 'Naveen (Super Admin)',
    createdAt: '1 day ago',
    disputeAmount: 32.50,
    evidenceImage: null,
    messages: [
      { sender: 'system', name: 'Stripe Dispute System', time: 'Yesterday', text: 'Bank inquiry received: Fraudulent charge dispute initiated by cardholder. Account flagged.' }
    ]
  },
  {
    id: 'TCK-4009',
    orderId: 'ORD-9812',
    customer: {
      name: 'Chloe Bennett',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
      email: 'chloe.b@designstudio.co',
      phone: '+1 (555) 456-7890',
      tier: 'Gold Member'
    },
    restaurant: 'Urban Flame Burger Co.',
    rider: 'Tariq Al-Mansoor',
    subject: 'Compliment for rider Tariq - exceptional service in heavy rain',
    category: 'Feedback & Compliment',
    priority: 'Low',
    status: 'Resolved',
    channel: 'In-App Feedback',
    assignedAgent: 'Marcus Cole',
    createdAt: '2 days ago',
    disputeAmount: 0.00,
    evidenceImage: null,
    messages: [
      { sender: 'customer', name: 'Chloe', time: '2 days ago', text: 'Tariq was incredible, delivered up to 4th floor walkup during the downpour. Please credit him extra bonus!' },
      { sender: 'support', name: 'Marcus', time: '2 days ago', text: 'Thank you Chloe! We credited a $10 weather hero bonus to Tariq Al-Mansoor.' }
    ]
  }
];

export const initialDeliveryZones = [
  {
    id: 'ZONE-01',
    name: 'Downtown Central Core',
    city: 'Metro City, NY',
    coverageRadiusKm: 6.5,
    activeCouriers: 24,
    baseDeliveryFee: 2.99,
    surgeMultiplier: 1.25,
    surgeReason: 'Peak Lunch Rush (High Demand)',
    guaranteedEtaMinutes: 25,
    status: 'Surge Active',
    polygonCoords: 'Lat 40.7128, Lng -74.0060 (Core 6.5km Polygon)'
  },
  {
    id: 'ZONE-02',
    name: 'North Uptown & University Campus',
    city: 'Metro City, NY',
    coverageRadiusKm: 9.0,
    activeCouriers: 14,
    baseDeliveryFee: 3.49,
    surgeMultiplier: 1.00,
    surgeReason: 'Normal Conditions',
    guaranteedEtaMinutes: 28,
    status: 'Normal',
    polygonCoords: 'Lat 40.7850, Lng -73.9680 (North 9.0km Polygon)'
  },
  {
    id: 'ZONE-03',
    name: 'East Waterfront & Marina Bay',
    city: 'Metro City, NY',
    coverageRadiusKm: 7.2,
    activeCouriers: 9,
    baseDeliveryFee: 3.99,
    surgeMultiplier: 1.50,
    surgeReason: 'Inclement Rain & Low Courier Supply',
    guaranteedEtaMinutes: 34,
    status: 'Surge Active',
    polygonCoords: 'Lat 40.7282, Lng -73.9442 (East Waterfront Polygon)'
  },
  {
    id: 'ZONE-04',
    name: 'West Suburban Valley',
    city: 'Metro City, NY',
    coverageRadiusKm: 14.0,
    activeCouriers: 6,
    baseDeliveryFee: 4.99,
    surgeMultiplier: 1.00,
    surgeReason: 'Normal Conditions',
    guaranteedEtaMinutes: 38,
    status: 'Normal',
    polygonCoords: 'Lat 40.7020, Lng -74.0620 (Suburban Outer Polygon)'
  }
];

export const initialAdminRoles = [
  {
    id: 'USR-ADM-01',
    name: 'Naveen',
    email: 'naveen.admin@mealrush.com',
    role: 'Super Admin',
    department: 'Executive Leadership',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
    status: 'Active',
    twoFactorEnabled: true,
    lastActive: 'Just now',
    permissions: ['all_access', 'finance_manage', 'settlement_approve', 'support_manage', 'settings_config', 'roles_admin', 'promotions_edit']
  },
  {
    id: 'USR-ADM-02',
    name: 'Sarah Chen',
    email: 'sarah.chen@mealrush.com',
    role: 'Finance Controller',
    department: 'Finance & Accounting',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150',
    status: 'Active',
    twoFactorEnabled: true,
    lastActive: '12m ago',
    permissions: ['finance_manage', 'settlement_approve', 'tax_reports', 'refund_execute']
  },
  {
    id: 'USR-ADM-03',
    name: 'Marcus Cole',
    email: 'marcus.cole@mealrush.com',
    role: 'Operations & Fleet Dispatcher',
    department: 'Logistics & Dispatch',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
    status: 'Active',
    twoFactorEnabled: true,
    lastActive: '4m ago',
    permissions: ['orders_manage', 'riders_dispatch', 'zones_config', 'surge_pricing']
  },
  {
    id: 'USR-ADM-04',
    name: 'Priya Sharma',
    email: 'priya.sharma@mealrush.com',
    role: 'Customer Support Lead',
    department: 'Customer Delight',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150',
    status: 'Active',
    twoFactorEnabled: true,
    lastActive: '1m ago',
    permissions: ['support_tickets', 'dispute_resolve', 'customer_credit_issue', 'reviews_moderate']
  },
  {
    id: 'USR-ADM-05',
    name: 'Alex Rivera',
    email: 'alex.rivera@mealrush.com',
    role: 'Growth & Promotions Lead',
    department: 'Marketing & Partnerships',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150',
    status: 'Active',
    twoFactorEnabled: false,
    lastActive: '35m ago',
    permissions: ['promotions_edit', 'coupons_create', 'referrals_manage', 'push_broadcast']
  }
];

export const initialPlatformSettings = {
  platformName: 'MealRush',
  supportEmail: 'support@mealrush.com',
  currencySymbol: '$',
  currencyCode: 'USD',
  timezone: 'America/New_York (EST)',
  standardPlatformCommission: 18.0,
  taxRatePercent: 8.25,
  minOrderValueDefault: 12.00,
  nightDeliverySurcharge: 2.00,
  autoAssignCourierAlgo: true,
  cancellationGraceMinutes: 5,
  maxRiderConcurrentOrders: 3,
  maintenanceMode: false,
  pushNotificationsActive: true,
  emailReceiptsActive: true,
  smsGatewayStatus: 'Twilio Connected (Active)'
};

export const initialAuditLogs = [
  {
    id: 'LOG-8812',
    timestamp: 'Today, 12:48 PM',
    actor: 'Priya Sharma',
    role: 'Support Lead',
    action: 'Dispute Compensation Issued',
    details: 'Issued $15.00 wallet credit to customer Carlos Mendez for delay on ORD-9816',
    ipAddress: '192.168.1.18',
    status: 'Success'
  },
  {
    id: 'LOG-8811',
    timestamp: 'Today, 12:20 PM',
    actor: 'Sarah Chen',
    role: 'Finance Controller',
    action: 'Restaurant Settlement Approved',
    details: 'Initiated ACH transfer of $6,159.11 to Little Napoli Pizzeria',
    ipAddress: '192.168.1.45',
    status: 'Success'
  },
  {
    id: 'LOG-8810',
    timestamp: 'Today, 11:35 AM',
    actor: 'Sarah Chen',
    role: 'Finance Controller',
    action: 'Refund Processed',
    details: 'Executed $30.30 Apple Pay refund for cancelled order ORD-9817',
    ipAddress: '192.168.1.45',
    status: 'Success'
  },
  {
    id: 'LOG-8809',
    timestamp: 'Today, 11:05 AM',
    actor: 'Marcus Cole',
    role: 'Fleet Dispatcher',
    action: 'Surge Pricing Triggered',
    details: 'Updated Zone-03 (East Waterfront) surge multiplier to 1.50x due to thunderstorm',
    ipAddress: '192.168.1.33',
    status: 'Warning'
  },
  {
    id: 'LOG-8808',
    timestamp: 'Today, 10:15 AM',
    actor: 'Alex Rivera',
    role: 'Growth Lead',
    action: 'Coupon Campaign Created',
    details: 'Created coupon FREEDEL (Free Delivery over $20) with cap 2000 usages',
    ipAddress: '192.168.1.92',
    status: 'Success'
  },
  {
    id: 'LOG-8807',
    timestamp: 'Today, 09:30 AM',
    actor: 'Naveen',
    role: 'Super Admin',
    action: 'Platform Commission Rule Adjusted',
    details: 'Updated Cloud Kitchen restaurant base commission rate to 15.0%',
    ipAddress: '192.168.1.2',
    status: 'Success'
  },
  {
    id: 'LOG-8806',
    timestamp: 'Yesterday, 04:10 PM',
    actor: 'Naveen',
    role: 'Super Admin',
    action: 'User Account Suspended',
    details: 'Suspended customer Samantha Vance following fraudulent chargeback investigation',
    ipAddress: '192.168.1.2',
    status: 'Danger'
  }
];

export const salesReportSummary = {
  totalRevenueYTD: 1420800,
  ordersYTD: 89400,
  averageBasketSize: 31.80,
  topGrossingCategory: 'Artisan Burgers & Craft Fries ($454,656)',
  mostProfitableHour: '08:00 PM - 09:00 PM (Avg $18,400/hr)',
  peakOrderDay: 'Saturday (24.2% of weekly orders)',
  monthlyBreakdown: [
    { month: 'May', revenue: 210000, orders: 13200, profit: 37800 },
    { month: 'Jun', revenue: 232000, orders: 14600, profit: 41760 },
    { month: 'Jul', revenue: 248000, orders: 15800, profit: 44640 },
    { month: 'Aug', revenue: 265000, orders: 16900, profit: 47700 },
    { month: 'Sep', revenue: 278000, orders: 17800, profit: 50040 },
    { month: 'Oct (MTD)', revenue: 284590, orders: 18420, profit: 51226 },
  ]
};
