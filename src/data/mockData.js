// Comprehensive Mock Data for Food Admin Platform (Modules 1 - 5)

export const initialStats = {
  totalRevenue: 284590,
  revenueGrowth: 14.8,
  totalOrders: 18420,
  ordersGrowth: 12.2,
  activeUsers: 94350,
  usersGrowth: 8.4,
  avgDeliveryTime: 27.4, // mins
  deliveryTimeDiff: -3.1, // mins improvement
  activeDeliveriesCount: 47,
};

export const salesTrendsData = [
  { time: 'Mon', revenue: 38200, orders: 2410, platformProfit: 7640 },
  { time: 'Tue', revenue: 41500, orders: 2680, platformProfit: 8300 },
  { time: 'Wed', revenue: 44200, orders: 2890, platformProfit: 8840 },
  { time: 'Thu', revenue: 46800, orders: 3010, platformProfit: 9360 },
  { time: 'Fri', revenue: 58900, orders: 3850, platformProfit: 11780 },
  { time: 'Sat', revenue: 68400, orders: 4420, platformProfit: 13680 },
  { time: 'Sun', revenue: 64100, orders: 4160, platformProfit: 12820 },
];

export const peakHoursData = [
  { hour: '08:00', orders: 240, label: 'Breakfast' },
  { hour: '10:00', orders: 410, label: 'Mid-morning' },
  { hour: '12:00', orders: 1520, label: 'Lunch Peak 1' },
  { hour: '13:00', orders: 1980, label: 'Lunch Peak 2' },
  { hour: '14:00', orders: 980, label: 'Late Lunch' },
  { hour: '16:00', orders: 510, label: 'Snacks' },
  { hour: '18:00', orders: 1120, label: 'Early Dinner' },
  { hour: '19:00', orders: 2150, label: 'Dinner Peak 1' },
  { hour: '20:00', orders: 2480, label: 'Dinner Peak 2' },
  { hour: '21:00', orders: 1820, label: 'Dinner Late' },
  { hour: '22:00', orders: 860, label: 'Late Night' },
  { hour: '00:00', orders: 320, label: 'Midnight' },
];

export const cuisineBreakdown = [
  { name: 'Artisan Burgers & Fries', value: 32, color: '#f97316' },
  { name: 'Wood-fired Pizza & Italian', value: 24, color: '#0ea5e9' },
  { name: 'Authentic Indian Curries', value: 18, color: '#10b981' },
  { name: 'Japanese Sushi & Ramen', value: 14, color: '#8b5cf6' },
  { name: 'Salads & Healthy Bowls', value: 12, color: '#ec4899' },
];

export const initialOrders = [
  {
    id: 'ORD-9821',
    customer: {
      id: 'CUST-101',
      name: 'Sophia Montgomery',
      email: 'sophia.m@example.com',
      phone: '+1 (555) 234-5678',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
      address: '742 Evergreen Terrace, Apt 4B, Metro City',
    },
    restaurant: {
      id: 'REST-01',
      name: 'Urban Flame Burger Co.',
      phone: '+1 (555) 401-8899',
      address: '14 Market Street, Downtown'
    },
    items: [
      { name: 'Truffle Smash Double Burger', qty: 2, price: 16.50, options: 'Extra Cheddar, Brioche Bun' },
      { name: 'Parmesan Herb Crinkle Fries', qty: 1, price: 6.00, options: 'Spicy Truffle Aioli' },
      { name: 'Salted Caramel Thickshake', qty: 2, price: 7.50, options: 'Less sweet' }
    ],
    itemSubtotal: 53.50,
    deliveryFee: 3.99,
    serviceFee: 2.50,
    tax: 4.80,
    discount: 5.00,
    couponCode: 'BURGERLOVE',
    totalAmount: 59.79,
    paymentMethod: 'Apple Pay',
    paymentStatus: 'Paid',
    orderStatus: 'Active Delivery',
    orderTimeline: [
      { status: 'Order Placed', time: '12:35 PM', done: true },
      { status: 'Restaurant Accepted', time: '12:37 PM', done: true },
      { status: 'Food Prepared', time: '12:51 PM', done: true },
      { status: 'Picked Up by Rider', time: '12:54 PM', done: true },
      { status: 'Out for Delivery', time: '12:58 PM', done: true },
      { status: 'Delivered', time: 'Est. 01:10 PM', done: false }
    ],
    deliveryPartner: {
      id: 'RIDER-01',
      name: 'Marcus Vance',
      phone: '+1 (555) 890-1234',
      vehicle: 'Yamaha E-Bike (Black) #NY-882',
      rating: 4.9,
      currentLocation: '0.8 miles away (4th Ave & Elm)',
      eta: '8 mins'
    },
    deliveryInstructions: 'Leave with concierge at reception desk.',
    placedAt: '2026-10-26T12:35:00',
    refundRequested: false
  },
  {
    id: 'ORD-9820',
    customer: {
      id: 'CUST-102',
      name: 'David Reynolds',
      email: 'd.reynolds@techcorp.io',
      phone: '+1 (555) 345-6789',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      address: '88 Innovation Way, Floor 12, Tech District',
    },
    restaurant: {
      id: 'REST-02',
      name: 'Bella Napoli Trattoria',
      phone: '+1 (555) 302-7711',
      address: '22 Little Italy Blvd'
    },
    items: [
      { name: 'Quattro Formaggi Neapolitan Pizza', qty: 1, price: 19.00, options: 'Wood-fired thin crust' },
      { name: 'Handmade Tagliatelle Bolognese', qty: 1, price: 18.50, options: 'Extra Pecorino' },
      { name: 'Classic Tiramisu Cup', qty: 2, price: 8.00, options: 'Traditional recipe' }
    ],
    itemSubtotal: 53.50,
    deliveryFee: 4.50,
    serviceFee: 2.50,
    tax: 5.10,
    discount: 0,
    couponCode: null,
    totalAmount: 65.60,
    paymentMethod: 'Credit Card (Visa **4112)',
    paymentStatus: 'Paid',
    orderStatus: 'Confirmed',
    orderTimeline: [
      { status: 'Order Placed', time: '12:42 PM', done: true },
      { status: 'Restaurant Accepted', time: '12:44 PM', done: true },
      { status: 'Food Prepared', time: 'Est. 01:05 PM', done: false },
      { status: 'Picked Up by Rider', time: 'Est. 01:10 PM', done: false },
      { status: 'Out for Delivery', time: 'Est. 01:15 PM', done: false },
      { status: 'Delivered', time: 'Est. 01:25 PM', done: false }
    ],
    deliveryPartner: null,
    deliveryInstructions: 'Call on arrival, security needs badge scan',
    placedAt: '2026-10-26T12:42:00',
    refundRequested: false
  },
  {
    id: 'ORD-9819',
    customer: {
      id: 'CUST-103',
      name: 'Aisha Patel',
      email: 'aisha.patel@horizon.co',
      phone: '+1 (555) 456-7890',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
      address: '310 Sunset Ridge, North Hills',
    },
    restaurant: {
      id: 'REST-03',
      name: 'Spice Symphony Royal Indian',
      phone: '+1 (555) 782-9900',
      address: '77 Grand Pavilion Row'
    },
    items: [
      { name: 'Royal Murgh Butter Chicken', qty: 2, price: 18.00, options: 'Medium Spice' },
      { name: 'Garlic Truffle Butter Naan', qty: 4, price: 4.50, options: 'Crispy' },
      { name: 'Slow-Cooked Dum Biryani (Lamb)', qty: 1, price: 22.00, options: 'With Raita & Mirchi Salan' }
    ],
    itemSubtotal: 76.00,
    deliveryFee: 5.00,
    serviceFee: 3.00,
    tax: 7.20,
    discount: 10.00,
    couponCode: 'ROYALFEAST',
    totalAmount: 81.20,
    paymentMethod: 'UPI / Online NetBanking',
    paymentStatus: 'Paid',
    orderStatus: 'Pending',
    orderTimeline: [
      { status: 'Order Placed', time: '12:56 PM', done: true },
      { status: 'Restaurant Accepted', time: 'Pending confirmation', done: false },
      { status: 'Food Prepared', time: 'Waiting', done: false },
      { status: 'Picked Up by Rider', time: 'Waiting', done: false },
      { status: 'Out for Delivery', time: 'Waiting', done: false },
      { status: 'Delivered', time: 'Waiting', done: false }
    ],
    deliveryPartner: null,
    deliveryInstructions: 'Ring doorbell twice.',
    placedAt: '2026-10-26T12:56:00',
    refundRequested: false
  },
  {
    id: 'ORD-9818',
    customer: {
      id: 'CUST-104',
      name: 'Liam Henderson',
      email: 'liam.h@crestview.net',
      phone: '+1 (555) 567-8901',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
      address: '512 Oakwood Boulevard, South Park',
    },
    restaurant: {
      id: 'REST-04',
      name: 'Sushi Zen Master Bar',
      phone: '+1 (555) 912-3344',
      address: '105 Waterfront Pier'
    },
    items: [
      { name: 'Omakase Nigiri Deluxe (12 pcs)', qty: 1, price: 38.00, options: 'Fresh Wasabi' },
      { name: 'Spicy Bluefin Tuna Crunch Roll', qty: 2, price: 14.50, options: 'Soy paper' }
    ],
    itemSubtotal: 67.00,
    deliveryFee: 4.00,
    serviceFee: 3.00,
    tax: 6.40,
    discount: 0,
    couponCode: null,
    totalAmount: 80.40,
    paymentMethod: 'Credit Card (Mastercard **8920)',
    paymentStatus: 'Paid',
    orderStatus: 'Delivered',
    orderTimeline: [
      { status: 'Order Placed', time: '11:40 AM', done: true },
      { status: 'Restaurant Accepted', time: '11:42 AM', done: true },
      { status: 'Food Prepared', time: '12:00 PM', done: true },
      { status: 'Picked Up by Rider', time: '12:04 PM', done: true },
      { status: 'Out for Delivery', time: '12:08 PM', done: true },
      { status: 'Delivered', time: '12:28 PM', done: true }
    ],
    deliveryPartner: {
      id: 'RIDER-02',
      name: 'Elena Rostova',
      phone: '+1 (555) 678-2345',
      vehicle: 'Honda Hornet 160R #NY-551',
      rating: 4.95,
      currentLocation: 'South Park Hub',
      eta: 'Completed'
    },
    deliveryInstructions: 'Front porch drop-off.',
    placedAt: '2026-10-26T11:40:00',
    deliveredAt: '2026-10-26T12:28:00',
    refundRequested: false
  },
  {
    id: 'ORD-9817',
    customer: {
      id: 'CUST-105',
      name: 'Jordan Miller',
      email: 'jordan.m@gmail.com',
      phone: '+1 (555) 678-9012',
      avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150',
      address: '23 Pinecrest Lane, Midtown',
    },
    restaurant: {
      id: 'REST-01',
      name: 'Urban Flame Burger Co.',
      phone: '+1 (555) 401-8899',
      address: '14 Market Street, Downtown'
    },
    items: [
      { name: 'Smoky BBQ Pulled Pork Burger', qty: 1, price: 17.00, options: 'No pickles' },
      { name: 'Sweet Potato Waffle Fries', qty: 1, price: 5.50, options: 'Chipotle Dip' }
    ],
    itemSubtotal: 22.50,
    deliveryFee: 3.50,
    serviceFee: 2.00,
    tax: 2.30,
    discount: 0,
    couponCode: null,
    totalAmount: 30.30,
    paymentMethod: 'Stripe / Credit Card',
    paymentStatus: 'Refund Pending',
    orderStatus: 'Cancelled',
    orderTimeline: [
      { status: 'Order Placed', time: '11:15 AM', done: true },
      { status: 'Restaurant Accepted', time: '11:18 AM', done: true },
      { status: 'Cancelled by Restaurant', time: '11:25 AM', done: true }
    ],
    cancellationReason: 'Item out of stock (Smoky Pulled Pork batch ran out)',
    refundRequested: true,
    refundStatus: 'Pending Review',
    refundAmount: 30.30,
    deliveryPartner: null,
    placedAt: '2026-10-26T11:15:00'
  },
  {
    id: 'ORD-9816',
    customer: {
      id: 'CUST-106',
      name: 'Carlos Mendez',
      email: 'carlos.m@coastal.com',
      phone: '+1 (555) 789-0123',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150',
      address: '419 Coastal Drive, Apt 2',
    },
    restaurant: {
      id: 'REST-05',
      name: 'Verde Bowl & Artisan Salad',
      phone: '+1 (555) 234-8822',
      address: '80 Eco Plaza'
    },
    items: [
      { name: 'Mediterranean Falafel Harvest Bowl', qty: 2, price: 14.00, options: 'Tahini Dressing' },
      { name: 'Organic Cold-Pressed Green Glow Juice', qty: 2, price: 6.50, options: 'No Ice' }
    ],
    itemSubtotal: 41.00,
    deliveryFee: 3.00,
    serviceFee: 2.00,
    tax: 3.80,
    discount: 8.20,
    couponCode: 'HEALTHY20',
    totalAmount: 41.60,
    paymentMethod: 'Google Pay',
    paymentStatus: 'Paid',
    orderStatus: 'Active Delivery',
    orderTimeline: [
      { status: 'Order Placed', time: '12:30 PM', done: true },
      { status: 'Restaurant Accepted', time: '12:32 PM', done: true },
      { status: 'Food Prepared', time: '12:44 PM', done: true },
      { status: 'Picked Up by Rider', time: '12:48 PM', done: true },
      { status: 'Out for Delivery', time: '12:50 PM', done: true },
      { status: 'Delivered', time: 'Est. 01:05 PM', done: false }
    ],
    deliveryPartner: {
      id: 'RIDER-03',
      name: 'Tariq Al-Mansoor',
      phone: '+1 (555) 789-3456',
      vehicle: 'Niu NQi Sport Scooter #NY-119',
      rating: 4.88,
      currentLocation: '0.4 miles away (Main St & 2nd)',
      eta: '4 mins'
    },
    deliveryInstructions: 'Gate code #9021',
    placedAt: '2026-10-26T12:30:00',
    refundRequested: false
  }
];

// Module 3: Restaurant & Menu Management Mock Data
export const initialRestaurants = [
  {
    id: 'REST-01',
    name: 'Urban Flame Burger Co.',
    slug: 'urban-flame-burger',
    logo: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=150',
    coverImage: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=800',
    cuisine: 'Artisan Burgers & American Comfort',
    cuisineTags: ['Burgers', 'American', 'Shakes', 'Fries'],
    owner: {
      name: 'Marcus Brody',
      email: 'm.brody@urbanflame.com',
      phone: '+1 (555) 401-8899',
    },
    address: {
      street: '14 Market Street, Suite 100',
      area: 'Downtown Financial Hub',
      city: 'Metro City',
      postalCode: '10001',
      coordinates: { lat: 40.7128, lng: -74.006 }
    },
    status: 'Approved', // Approved, Pending Approval, Under Review, Suspended
    verificationStatus: 'Verified',
    verificationDocuments: [
      { id: 'DOC-101', name: 'Food Safety & Hygiene License (FSSAI/FDA)', status: 'Verified', expiry: '2027-11-30', documentNumber: 'FSSAI-8839210-NY' },
      { id: 'DOC-102', name: 'Commercial Entity Tax Registration (GST/EIN)', status: 'Verified', expiry: 'Permanent', documentNumber: 'EIN-992-01928' },
      { id: 'DOC-103', name: 'Commercial Premises Fire & Safety Clearance', status: 'Verified', expiry: '2027-04-15', documentNumber: 'FIRE-2024-817' },
      { id: 'DOC-104', name: 'Bank Settlement Proof (Cancelled Business Cheque)', status: 'Verified', expiry: 'Permanent', documentNumber: 'CHQ-JPMC-9912' },
    ],
    commissionRate: 18.0, // in %
    payoutCycle: 'Weekly (Every Monday)',
    rating: 4.85,
    reviewCount: 1420,
    hygieneScore: 98,
    isOpen: true,
    operatingHours: {
      openTime: '10:00 AM',
      closeTime: '11:30 PM',
      days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      lunchBreak: 'None',
    },
    totalOrdersCompleted: 5840,
    grossRevenue: 189200,
    categories: ['Signature Burgers', 'Sides & Fries', 'Gourmet Shakes', 'Sauces & Dips'],
    menuItems: [
      {
        id: 'ITEM-101',
        name: 'Truffle Smash Double Burger',
        category: 'Signature Burgers',
        description: 'Double Angus beef patties, aged white cheddar, sautéed portobello, black truffle garlic aioli on toasted brioche.',
        price: 16.50,
        discountPrice: 14.85,
        isAvailable: true,
        dietary: 'Non-Veg',
        preparationTime: 12,
        isPopular: true,
        image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300'
      },
      {
        id: 'ITEM-102',
        name: 'Smoky BBQ Pulled Pork Burger',
        category: 'Signature Burgers',
        description: '14-hour hickory smoked pork shoulder, crisp jalapeño apple slaw, sweet bourbon BBQ sauce.',
        price: 17.00,
        discountPrice: null,
        isAvailable: true,
        dietary: 'Non-Veg',
        preparationTime: 14,
        isPopular: true,
        image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=300'
      },
      {
        id: 'ITEM-103',
        name: 'Parmesan Herb Crinkle Fries',
        category: 'Sides & Fries',
        description: 'Crisp hand-cut potato crinkle fries dusted in 24-month aged Parmigiano-Reggiano, rosemary and roasted garlic truffle dip.',
        price: 6.00,
        discountPrice: null,
        isAvailable: true,
        dietary: 'Veg',
        preparationTime: 8,
        isPopular: true,
        image: 'https://images.unsplash.com/photo-1576107232684-1279f3908594?w=300'
      },
      {
        id: 'ITEM-104',
        name: 'Salted Caramel Pretzel Thickshake',
        category: 'Gourmet Shakes',
        description: 'Artisan vanilla bean gelato whipped with Madagascar caramel ribbon, Himalayan salt, crushed butter pretzels.',
        price: 7.50,
        discountPrice: 6.50,
        isAvailable: true,
        dietary: 'Veg',
        preparationTime: 6,
        isPopular: false,
        image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=300'
      },
      {
        id: 'ITEM-105',
        name: 'Beyond Vegan Smash Burger',
        category: 'Signature Burgers',
        description: 'Plant-based patty with dairy-free gouda, pickled red onion, heirloom tomatoes, and vegan green goddess dressing.',
        price: 15.50,
        discountPrice: null,
        isAvailable: false,
        dietary: 'Vegan',
        preparationTime: 12,
        isPopular: false,
        image: 'https://images.unsplash.com/photo-1520072959219-c595dc870360?w=300'
      }
    ]
  },
  {
    id: 'REST-02',
    name: 'Bella Napoli Trattoria',
    slug: 'bella-napoli',
    logo: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=150',
    coverImage: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800',
    cuisine: 'Authentic Italian & Wood-Fired Pizza',
    cuisineTags: ['Pizza', 'Pasta', 'Italian', 'Wine'],
    owner: {
      name: 'Gianluigi Rossi',
      email: 'rossi@bellanapoli.it',
      phone: '+1 (555) 302-7711',
    },
    address: {
      street: '22 Little Italy Blvd',
      area: 'Heritage Quarter',
      city: 'Metro City',
      postalCode: '10013',
      coordinates: { lat: 40.7191, lng: -73.9973 }
    },
    status: 'Approved',
    verificationStatus: 'Verified',
    verificationDocuments: [
      { id: 'DOC-201', name: 'Food Safety & Hygiene License (FSSAI/FDA)', status: 'Verified', expiry: '2027-08-20', documentNumber: 'IT-FDA-449102' },
      { id: 'DOC-202', name: 'Commercial Entity Tax Registration', status: 'Verified', expiry: 'Permanent', documentNumber: 'EIN-812-77401' },
      { id: 'DOC-203', name: 'Wood-fired Oven Commercial Chimney Clearance', status: 'Verified', expiry: '2026-12-31', documentNumber: 'FIRE-2024-399' },
      { id: 'DOC-204', name: 'Bank Settlement Proof', status: 'Verified', expiry: 'Permanent', documentNumber: 'CHQ-BOA-3321' },
    ],
    commissionRate: 16.5,
    payoutCycle: 'Weekly (Every Monday)',
    rating: 4.92,
    reviewCount: 2180,
    hygieneScore: 99,
    isOpen: true,
    operatingHours: {
      openTime: '11:30 AM',
      closeTime: '11:00 PM',
      days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      lunchBreak: '03:30 PM - 05:00 PM',
    },
    totalOrdersCompleted: 7120,
    grossRevenue: 248900,
    categories: ['Wood-Fired Pizzas', 'Handmade Pastas', 'Antipasti & Salads', 'Dolci Desserts'],
    menuItems: [
      {
        id: 'ITEM-201',
        name: 'Quattro Formaggi Neapolitan Pizza',
        category: 'Wood-Fired Pizzas',
        description: 'San Marzano DOP tomato base, Fior di Latte, Gorgonzola Dolce, Smoked Scamorza, and Aged Parmigiano.',
        price: 19.00,
        discountPrice: 17.10,
        isAvailable: true,
        dietary: 'Veg',
        preparationTime: 15,
        isPopular: true,
        image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=300'
      },
      {
        id: 'ITEM-202',
        name: 'Handmade Tagliatelle Bolognese',
        category: 'Handmade Pastas',
        description: 'Fresh egg tagliatelle tossed in 6-hour slow-simmered beef, veal, and pancetta ragù with grated Pecorino.',
        price: 18.50,
        discountPrice: null,
        isAvailable: true,
        dietary: 'Non-Veg',
        preparationTime: 14,
        isPopular: true,
        image: 'https://images.unsplash.com/photo-1621996346565-e3d5d6281788?w=300'
      },
      {
        id: 'ITEM-203',
        name: 'Classic Venetian Tiramisu Cup',
        category: 'Dolci Desserts',
        description: 'Savoiardi ladyfingers soaked in espresso and Marsala wine, layered with velvety whipped mascarpone crema.',
        price: 8.00,
        discountPrice: null,
        isAvailable: true,
        dietary: 'Veg',
        preparationTime: 5,
        isPopular: true,
        image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=300'
      }
    ]
  },
  {
    id: 'REST-03',
    name: 'Spice Symphony Royal Indian',
    slug: 'spice-symphony',
    logo: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=150',
    coverImage: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800',
    cuisine: 'Royal North Indian & Tandoor',
    cuisineTags: ['Curry', 'Biryani', 'Tandoor', 'Indian', 'Halal'],
    owner: {
      name: 'Rajinder Kapoor',
      email: 'rajinder@spicesymphony.com',
      phone: '+1 (555) 782-9900',
    },
    address: {
      street: '77 Grand Pavilion Row',
      area: 'Uptown Promenade',
      city: 'Metro City',
      postalCode: '10022',
      coordinates: { lat: 40.7614, lng: -73.9776 }
    },
    status: 'Approved',
    verificationStatus: 'Verified',
    verificationDocuments: [
      { id: 'DOC-301', name: 'Food Safety & Hygiene License', status: 'Verified', expiry: '2027-05-18', documentNumber: 'IND-NY-90214' },
      { id: 'DOC-302', name: 'Commercial Tax Registration', status: 'Verified', expiry: 'Permanent', documentNumber: 'EIN-109-88211' },
      { id: 'DOC-303', name: 'Halal Certification Board Clearance', status: 'Verified', expiry: '2026-10-31', documentNumber: 'HALAL-2024-91' },
      { id: 'DOC-304', name: 'Bank Settlement Proof', status: 'Verified', expiry: 'Permanent', documentNumber: 'CHQ-CITI-4491' },
    ],
    commissionRate: 15.0,
    payoutCycle: 'Bi-Weekly (1st & 15th)',
    rating: 4.88,
    reviewCount: 1650,
    hygieneScore: 97,
    isOpen: true,
    operatingHours: {
      openTime: '12:00 PM',
      closeTime: '11:00 PM',
      days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      lunchBreak: 'None',
    },
    totalOrdersCompleted: 4950,
    grossRevenue: 172000,
    categories: ['Clay Oven Tandoor', 'Rich Royal Curries', 'Dum Biryanis', 'Fresh Breads & Accompaniments'],
    menuItems: [
      {
        id: 'ITEM-301',
        name: 'Royal Murgh Butter Chicken',
        category: 'Rich Royal Curries',
        description: 'Tandoor smoked chicken morsels simmered in velvety Kashmiri chili, cashew, butter, and fenugreek gravy.',
        price: 18.00,
        discountPrice: 16.20,
        isAvailable: true,
        dietary: 'Non-Veg',
        preparationTime: 16,
        isPopular: true,
        image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=300'
      },
      {
        id: 'ITEM-302',
        name: 'Garlic Truffle Butter Naan',
        category: 'Fresh Breads & Accompaniments',
        description: 'Leavened flatbread freshly baked on clay tandoor walls, brushed with clarified ghee, minced garlic, and summer black truffle oil.',
        price: 4.50,
        discountPrice: null,
        isAvailable: true,
        dietary: 'Veg',
        preparationTime: 5,
        isPopular: true,
        image: 'https://images.unsplash.com/photo-1626074353765-517a681e40be?w=300'
      },
      {
        id: 'ITEM-303',
        name: 'Slow-Cooked Dum Biryani (Lamb)',
        category: 'Dum Biryanis',
        description: 'Prime Welsh lamb sealed in dough pot with saffron-infused long grain basmati, caramelized shallots, served with cucumber mint raita.',
        price: 22.00,
        discountPrice: null,
        isAvailable: true,
        dietary: 'Non-Veg',
        preparationTime: 20,
        isPopular: true,
        image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=300'
      }
    ]
  },
  {
    id: 'REST-04',
    name: 'Sushi Zen Master Bar',
    slug: 'sushi-zen',
    logo: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=150',
    coverImage: 'https://images.unsplash.com/photo-1611143669185-af224c5e3252?w=800',
    cuisine: 'Japanese Omakase & Fresh Rolls',
    cuisineTags: ['Sushi', 'Japanese', 'Ramen', 'Seafood'],
    owner: {
      name: 'Kenji Takahashi',
      email: 'kenji@sushizen.com',
      phone: '+1 (555) 912-3344',
    },
    address: {
      street: '105 Waterfront Pier',
      area: 'Harbor District',
      city: 'Metro City',
      postalCode: '10004',
      coordinates: { lat: 40.7029, lng: -74.0152 }
    },
    status: 'Approved',
    verificationStatus: 'Verified',
    verificationDocuments: [
      { id: 'DOC-401', name: 'Raw Seafood Sanitation & Temperature Control License', status: 'Verified', expiry: '2027-09-12', documentNumber: 'SEAFOOD-NY-883' },
      { id: 'DOC-402', name: 'Commercial Tax Registration', status: 'Verified', expiry: 'Permanent', documentNumber: 'EIN-789-22100' },
      { id: 'DOC-403', name: 'Premises Fire & Safety Clearance', status: 'Verified', expiry: '2026-11-20', documentNumber: 'FIRE-2024-510' },
      { id: 'DOC-404', name: 'Bank Settlement Proof', status: 'Verified', expiry: 'Permanent', documentNumber: 'CHQ-WELLS-7711' },
    ],
    commissionRate: 20.0,
    payoutCycle: 'Weekly (Every Monday)',
    rating: 4.96,
    reviewCount: 3100,
    hygieneScore: 100,
    isOpen: true,
    operatingHours: {
      openTime: '12:00 PM',
      closeTime: '10:30 PM',
      days: ['Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      lunchBreak: '03:00 PM - 05:30 PM',
    },
    totalOrdersCompleted: 6410,
    grossRevenue: 315000,
    categories: ['Omakase & Nigiri', 'Signature Specialty Rolls', 'Ramen & Noodles', 'Appetizers & Miso'],
    menuItems: [
      {
        id: 'ITEM-401',
        name: 'Omakase Nigiri Deluxe (12 pcs)',
        category: 'Omakase & Nigiri',
        description: 'Chef daily selection: Bluefin Toro, King Salmon, Hokkaido Scallop, Uni, Yellowtail, with freshly grated Shizuoka wasabi.',
        price: 38.00,
        discountPrice: null,
        isAvailable: true,
        dietary: 'Non-Veg',
        preparationTime: 18,
        isPopular: true,
        image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=300'
      },
      {
        id: 'ITEM-402',
        name: 'Spicy Bluefin Tuna Crunch Roll',
        category: 'Signature Specialty Rolls',
        description: 'Minced spicy akami tuna, Persian cucumber, tempura flakes, topped with seared tuna, spicy tobiko, and unagi glaze.',
        price: 14.50,
        discountPrice: 12.99,
        isAvailable: true,
        dietary: 'Non-Veg',
        preparationTime: 10,
        isPopular: true,
        image: 'https://images.unsplash.com/photo-1611143669185-af224c5e3252?w=300'
      }
    ]
  },
  {
    id: 'REST-05',
    name: 'Verde Bowl & Artisan Salad',
    slug: 'verde-bowl',
    logo: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=150',
    coverImage: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800',
    cuisine: 'Organic Healthy Bowls & Superfoods',
    cuisineTags: ['Healthy', 'Salads', 'Vegan', 'Bowls', 'Gluten-Free'],
    owner: {
      name: 'Camila Santos',
      email: 'camila@verdebowl.org',
      phone: '+1 (555) 234-8822',
    },
    address: {
      street: '80 Eco Plaza, Avenue B',
      area: 'Greenwich Eco District',
      city: 'Metro City',
      postalCode: '10009',
      coordinates: { lat: 40.7258, lng: -73.9818 }
    },
    status: 'Approved',
    verificationStatus: 'Verified',
    verificationDocuments: [
      { id: 'DOC-501', name: 'Organic Producer & Health Safety License', status: 'Verified', expiry: '2027-10-14', documentNumber: 'ORG-ECO-2291' },
      { id: 'DOC-502', name: 'Commercial Tax Registration', status: 'Verified', expiry: 'Permanent', documentNumber: 'EIN-652-11092' },
      { id: 'DOC-503', name: 'Bank Settlement Proof', status: 'Verified', expiry: 'Permanent', documentNumber: 'CHQ-TD-8120' },
    ],
    commissionRate: 14.0,
    payoutCycle: 'Weekly (Every Monday)',
    rating: 4.78,
    reviewCount: 940,
    hygieneScore: 99,
    isOpen: true,
    operatingHours: {
      openTime: '08:00 AM',
      closeTime: '09:00 PM',
      days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      lunchBreak: 'None',
    },
    totalOrdersCompleted: 3820,
    grossRevenue: 98400,
    categories: ['Warm Grain Bowls', 'Raw Superfood Salads', 'Cold-Pressed Juices', 'Vegan Treats'],
    menuItems: [
      {
        id: 'ITEM-501',
        name: 'Mediterranean Falafel Harvest Bowl',
        category: 'Warm Grain Bowls',
        description: 'Herbed quinoa, crisp house chickpea falafels, massaged kale, roasted beets, kalamata olives, house lemon tahini sauce.',
        price: 14.00,
        discountPrice: 12.50,
        isAvailable: true,
        dietary: 'Vegan',
        preparationTime: 9,
        isPopular: true,
        image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=300'
      },
      {
        id: 'ITEM-502',
        name: 'Organic Cold-Pressed Green Glow Juice',
        category: 'Cold-Pressed Juices',
        description: 'Cucumber, green apple, celery, spinach, cold-pressed lemon, ginger root.',
        price: 6.50,
        discountPrice: null,
        isAvailable: true,
        dietary: 'Vegan',
        preparationTime: 3,
        isPopular: false,
        image: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?w=300'
      }
    ]
  },
  {
    id: 'REST-06',
    name: 'Dragon Wok Express',
    slug: 'dragon-wok-express',
    logo: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=150',
    coverImage: 'https://images.unsplash.com/photo-1541544741938-0af808871cc0?w=800',
    cuisine: 'Szechuan Stir-Fry & Handmade Dim Sum',
    cuisineTags: ['Chinese', 'Dim Sum', 'Noodles', 'Spicy'],
    owner: {
      name: 'Hao Chen',
      email: 'h.chen@dragonwok.com',
      phone: '+1 (555) 612-4488',
    },
    address: {
      street: '45 Chinatown Canal Way',
      area: 'Chinatown',
      city: 'Metro City',
      postalCode: '10013',
      coordinates: { lat: 40.7158, lng: -73.997 }
    },
    status: 'Pending Approval', // Awaiting Admin Review
    verificationStatus: 'Under Review',
    verificationDocuments: [
      { id: 'DOC-601', name: 'Food Safety & Hygiene License', status: 'Pending Review', expiry: '2028-01-01', documentNumber: 'FD-PENDING-441' },
      { id: 'DOC-602', name: 'Commercial Tax Registration (EIN)', status: 'Verified', expiry: 'Permanent', documentNumber: 'EIN-330-99482' },
      { id: 'DOC-603', name: 'Kitchen Commercial Extraction Hood Certificate', status: 'Pending Review', expiry: '2026-12-15', documentNumber: 'CHIMNEY-REV-9' },
      { id: 'DOC-604', name: 'Bank Settlement Proof', status: 'Verified', expiry: 'Permanent', documentNumber: 'CHQ-CHASE-1199' },
    ],
    commissionRate: 17.5,
    payoutCycle: 'Weekly (Every Monday)',
    rating: 4.65,
    reviewCount: 340,
    hygieneScore: 94,
    isOpen: false,
    operatingHours: {
      openTime: '11:00 AM',
      closeTime: '11:00 PM',
      days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      lunchBreak: 'None',
    },
    totalOrdersCompleted: 890,
    grossRevenue: 28400,
    categories: ['Steamed Dim Sum', 'Wok Specialties', 'Rice & Noodles'],
    menuItems: [
      {
        id: 'ITEM-601',
        name: 'Steamed Pork & Prawn Xiao Long Bao (6 pcs)',
        category: 'Steamed Dim Sum',
        description: 'Delicate soup dumplings filled with berkshire pork, black tiger prawns, and rich ginger broth.',
        price: 13.50,
        discountPrice: null,
        isAvailable: true,
        dietary: 'Non-Veg',
        preparationTime: 12,
        isPopular: true,
        image: 'https://images.unsplash.com/photo-1541544741938-0af808871cc0?w=300'
      },
      {
        id: 'ITEM-602',
        name: 'Szechuan Chili Crispy Beef',
        category: 'Wok Specialties',
        description: 'Flash-fried flank steak tossed with Szechuan peppercorns, scallions, dried red chilies in sweet tangy glaze.',
        price: 17.50,
        discountPrice: 15.00,
        isAvailable: true,
        dietary: 'Non-Veg',
        preparationTime: 14,
        isPopular: true,
        image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=300'
      }
    ]
  }
];

// Module 4: Delivery Partner Management Mock Data
export const initialDeliveryPartners = [
  {
    id: 'RIDER-01',
    name: 'Marcus Vance',
    email: 'marcus.vance@riders.bitedash.com',
    phone: '+1 (555) 890-1234',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150',
    status: 'Delivering', // Delivering, Online, Offline, Suspended, Under Review
    verificationStatus: 'Approved',
    vehicleType: 'Electric Scooter',
    vehicleModel: 'Yamaha E-Vino',
    licensePlate: 'NY-882-EV',
    zone: 'Downtown Hub',
    rating: 4.92,
    totalDeliveries: 1480,
    currentLocation: {
      address: '4th Ave & Elm St',
      lat: 40.7138,
      lng: -74.0042,
      batteryLevel: '78%',
      speed: '18 mph'
    },
    activeOrder: 'ORD-9821',
    documents: [
      { name: 'Commercial Driver License (Class M)', status: 'Approved', expiry: '2028-09-15', number: 'DL-NY-9021884' },
      { name: 'Vehicle Registration (RC)', status: 'Approved', expiry: '2027-04-10', number: 'RC-9981-EV' },
      { name: 'National Background Clearance Check', status: 'Approved', expiry: '2027-01-01', number: 'BC-PASSED-881' },
      { name: 'Commercial Transit Insurance', status: 'Approved', expiry: '2026-12-31', number: 'INS-GEICO-4190' },
    ],
    earnings: {
      today: 84.50,
      thisWeek: 540.00,
      thisMonth: 2180.00,
      tipsTotal: 112.00,
      basePay: 428.00,
      bonusEarned: 45.00,
      pendingPayout: 185.00
    },
    performance: {
      onTimeRate: 98.6,
      acceptanceRate: 96.2,
      completionRate: 99.4,
      avgDeliveryMins: 24.2,
      ratingCount: 890
    },
    deliveryHistory: [
      { id: 'DEL-891', orderId: 'ORD-9818', restaurant: 'Sushi Zen Master Bar', customer: 'Liam Henderson', distance: '2.8 miles', fare: 9.50, tip: 4.00, deliveredAt: '12:28 PM', status: 'Completed' },
      { id: 'DEL-890', orderId: 'ORD-9812', restaurant: 'Bella Napoli', customer: 'Alice Wong', distance: '1.4 miles', fare: 6.80, tip: 3.50, deliveredAt: '11:15 AM', status: 'Completed' },
      { id: 'DEL-889', orderId: 'ORD-9805', restaurant: 'Urban Flame Burger Co.', customer: 'Rachel Green', distance: '3.1 miles', fare: 11.20, tip: 5.00, deliveredAt: '10:05 AM', status: 'Completed' }
    ]
  },
  {
    id: 'RIDER-02',
    name: 'Elena Rostova',
    email: 'elena.rostova@riders.bitedash.com',
    phone: '+1 (555) 678-2345',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150',
    status: 'Online',
    verificationStatus: 'Approved',
    vehicleType: 'Motorcycle',
    vehicleModel: 'Honda Hornet 160R',
    licensePlate: 'NY-551-MC',
    zone: 'South Sector',
    rating: 4.95,
    totalDeliveries: 2310,
    currentLocation: {
      address: 'South Park Central Hub',
      lat: 40.701,
      lng: -73.992,
      batteryLevel: 'Fuel 85%',
      speed: '0 mph (Standby)'
    },
    activeOrder: null,
    documents: [
      { name: 'Commercial Driver License (Class M)', status: 'Approved', expiry: '2028-06-30', number: 'DL-NY-841920' },
      { name: 'Vehicle Registration (RC)', status: 'Approved', expiry: '2027-02-18', number: 'RC-HONDA-551' },
      { name: 'National Background Clearance Check', status: 'Approved', expiry: '2027-03-12', number: 'BC-PASSED-442' },
      { name: 'Commercial Transit Insurance', status: 'Approved', expiry: '2027-01-15', number: 'INS-PROG-8819' },
    ],
    earnings: {
      today: 112.00,
      thisWeek: 680.00,
      thisMonth: 2790.00,
      tipsTotal: 154.00,
      basePay: 526.00,
      bonusEarned: 60.00,
      pendingPayout: 240.00
    },
    performance: {
      onTimeRate: 99.2,
      acceptanceRate: 98.4,
      completionRate: 99.8,
      avgDeliveryMins: 21.8,
      ratingCount: 1420
    },
    deliveryHistory: [
      { id: 'DEL-888', orderId: 'ORD-9818', restaurant: 'Sushi Zen Master Bar', customer: 'Liam Henderson', distance: '3.2 miles', fare: 10.50, tip: 4.50, deliveredAt: '12:28 PM', status: 'Completed' },
      { id: 'DEL-887', orderId: 'ORD-9810', restaurant: 'Spice Symphony', customer: 'James Cooper', distance: '2.1 miles', fare: 8.20, tip: 3.00, deliveredAt: '11:45 AM', status: 'Completed' }
    ]
  },
  {
    id: 'RIDER-03',
    name: 'Tariq Al-Mansoor',
    email: 'tariq.mansoor@riders.bitedash.com',
    phone: '+1 (555) 789-3456',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    status: 'Delivering',
    verificationStatus: 'Approved',
    vehicleType: 'Electric Scooter',
    vehicleModel: 'Niu NQi Sport',
    licensePlate: 'NY-119-NIU',
    zone: 'Uptown Tech Hub',
    rating: 4.88,
    totalDeliveries: 940,
    currentLocation: {
      address: 'Main St & 2nd Ave',
      lat: 40.758,
      lng: -73.985,
      batteryLevel: '64%',
      speed: '14 mph'
    },
    activeOrder: 'ORD-9816',
    documents: [
      { name: 'Commercial Driver License (Class M)', status: 'Approved', expiry: '2028-11-04', number: 'DL-NY-552910' },
      { name: 'Vehicle Registration (RC)', status: 'Approved', expiry: '2027-05-22', number: 'RC-NIU-119' },
      { name: 'National Background Clearance Check', status: 'Approved', expiry: '2027-02-01', number: 'BC-PASSED-918' },
      { name: 'Commercial Transit Insurance', status: 'Approved', expiry: '2026-11-30', number: 'INS-MET-3321' },
    ],
    earnings: {
      today: 64.00,
      thisWeek: 410.00,
      thisMonth: 1680.00,
      tipsTotal: 84.00,
      basePay: 326.00,
      bonusEarned: 30.00,
      pendingPayout: 120.00
    },
    performance: {
      onTimeRate: 97.4,
      acceptanceRate: 94.0,
      completionRate: 98.9,
      avgDeliveryMins: 25.5,
      ratingCount: 520
    },
    deliveryHistory: [
      { id: 'DEL-886', orderId: 'ORD-9811', restaurant: 'Verde Bowl', customer: 'Sara Lee', distance: '1.8 miles', fare: 7.20, tip: 2.50, deliveredAt: '11:50 AM', status: 'Completed' }
    ]
  },
  {
    id: 'RIDER-04',
    name: 'Lucas Silva',
    email: 'lucas.silva@riders.bitedash.com',
    phone: '+1 (555) 890-4567',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
    status: 'Online',
    verificationStatus: 'Approved',
    vehicleType: 'Bicycle / E-Bike',
    vehicleModel: 'Trek FX 3 Disc Bike',
    licensePlate: 'PEDAL-ECO-9',
    zone: 'Downtown Hub',
    rating: 4.82,
    totalDeliveries: 620,
    currentLocation: {
      address: 'City Hall Square',
      lat: 40.7127,
      lng: -74.0059,
      batteryLevel: 'Manual Bicycle',
      speed: '0 mph (Standby)'
    },
    activeOrder: null,
    documents: [
      { name: 'Government Photo ID Card', status: 'Approved', expiry: '2029-07-20', number: 'ID-PASSPORT-4481' },
      { name: 'Bicycle Equipment & Helmet Safety Checklist', status: 'Approved', expiry: '2027-01-01', number: 'SAFE-TREK-09' },
      { name: 'National Background Clearance Check', status: 'Approved', expiry: '2027-02-14', number: 'BC-PASSED-301' },
    ],
    earnings: {
      today: 48.00,
      thisWeek: 310.00,
      thisMonth: 1240.00,
      tipsTotal: 65.00,
      basePay: 245.00,
      bonusEarned: 20.00,
      pendingPayout: 95.00
    },
    performance: {
      onTimeRate: 96.0,
      acceptanceRate: 92.5,
      completionRate: 97.8,
      avgDeliveryMins: 26.8,
      ratingCount: 380
    },
    deliveryHistory: [
      { id: 'DEL-885', orderId: 'ORD-9807', restaurant: 'Urban Flame Burger', customer: 'Ken Tanaka', distance: '1.2 miles', fare: 6.00, tip: 2.00, deliveredAt: '10:45 AM', status: 'Completed' }
    ]
  },
  {
    id: 'RIDER-05',
    name: 'Devon Washington',
    email: 'd.washington@gmail.com',
    phone: '+1 (555) 901-2345',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150',
    status: 'Under Review',
    verificationStatus: 'Pending Verification',
    vehicleType: 'Car',
    vehicleModel: 'Toyota Prius Hybrid (Silver)',
    licensePlate: 'NY-PRIUS-77',
    zone: 'Metro West Suburbs',
    rating: 5.0,
    totalDeliveries: 0,
    currentLocation: {
      address: 'Onboarding Waiting Room',
      lat: 40.720,
      lng: -74.01,
      batteryLevel: 'N/A',
      speed: '0 mph'
    },
    activeOrder: null,
    documents: [
      { name: 'Commercial Driver License (Class D)', status: 'Pending Review', expiry: '2028-12-31', number: 'DL-NY-PENDING' },
      { name: 'Vehicle Registration (RC)', status: 'Verified', expiry: '2027-06-30', number: 'RC-TOYOTA-77' },
      { name: 'National Background Clearance Check', status: 'Pending Review', expiry: 'Under check', number: 'BC-QUEUE-102' },
      { name: 'Commercial Transit Insurance', status: 'Verified', expiry: '2027-01-31', number: 'INS-ALLSTATE-59' },
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
  },
  {
    id: 'RIDER-06',
    name: 'Chloe Bennett',
    email: 'c.bennett@riders.bitedash.com',
    phone: '+1 (555) 345-8901',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
    status: 'Offline',
    verificationStatus: 'Approved',
    vehicleType: 'Electric Scooter',
    vehicleModel: 'Segway SuperScooter GT2',
    licensePlate: 'NY-SEG-44',
    zone: 'Downtown Hub',
    rating: 4.79,
    totalDeliveries: 810,
    currentLocation: {
      address: 'Home / Off Duty',
      lat: 40.71,
      lng: -74.00,
      batteryLevel: '100% Charged',
      speed: 'Offline'
    },
    activeOrder: null,
    documents: [
      { name: 'Commercial Driver License', status: 'Approved', expiry: '2028-04-12', number: 'DL-NY-772109' },
      { name: 'Vehicle Registration', status: 'Approved', expiry: '2027-03-01', number: 'RC-SEG-44' },
      { name: 'National Background Check', status: 'Approved', expiry: '2027-01-15', number: 'BC-PASSED-512' },
    ],
    earnings: {
      today: 0,
      thisWeek: 480.00,
      thisMonth: 1950.00,
      tipsTotal: 98.00,
      basePay: 382.00,
      bonusEarned: 35.00,
      pendingPayout: 145.00
    },
    performance: {
      onTimeRate: 97.2,
      acceptanceRate: 95.1,
      completionRate: 98.5,
      avgDeliveryMins: 23.4,
      ratingCount: 450
    },
    deliveryHistory: [
      { id: 'DEL-884', orderId: 'ORD-9799', restaurant: 'Bella Napoli', customer: 'David Reynolds', distance: '2.4 miles', fare: 8.50, tip: 3.50, deliveredAt: 'Yesterday 08:30 PM', status: 'Completed' }
    ]
  }
];

// Module 5: Customer Management Mock Data
export const initialCustomers = [
  {
    id: 'CUST-101',
    name: 'Sophia Montgomery',
    email: 'sophia.m@example.com',
    phone: '+1 (555) 234-5678',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    tier: 'VIP Black', // VIP Black, Gold Member, Regular
    status: 'Active', // Active, Suspended, Flagged
    joinedDate: 'Jan 14, 2024',
    walletBalance: 42.50,
    totalOrdersCount: 56,
    lifetimeSpend: 2480.90,
    addresses: [
      { id: 'ADDR-1', label: 'Home', address: '742 Evergreen Terrace, Apt 4B, Metro City, NY 10001', isDefault: true, instructions: 'Buzz #402 at front gate.' },
      { id: 'ADDR-2', label: 'Office', address: '140 Grand Central Concourse, Floor 18, Suite 1802', isDefault: false, instructions: 'Leave with front desk concierge.' }
    ],
    orderHistory: [
      { id: 'ORD-9821', restaurant: 'Urban Flame Burger Co.', date: 'Today, 12:35 PM', itemsCount: 5, totalAmount: 59.79, status: 'Active Delivery' },
      { id: 'ORD-9788', restaurant: 'Sushi Zen Master Bar', date: 'Oct 24, 2026', itemsCount: 3, totalAmount: 64.20, status: 'Delivered' },
      { id: 'ORD-9720', restaurant: 'Bella Napoli Trattoria', date: 'Oct 19, 2026', itemsCount: 4, totalAmount: 52.80, status: 'Delivered' }
    ],
    refundHistory: [
      { id: 'REF-701', orderId: 'ORD-9610', date: 'Sep 28, 2026', amount: 18.50, reason: 'Beverage leaked in transit during rainy weather', status: 'Approved & Credited' }
    ],
    reviews: [
      { id: 'REV-101', restaurant: 'Urban Flame Burger Co.', rating: 5, date: 'Oct 22, 2026', comment: 'Always sizzling hot and delivered in under 20 minutes! Best truffle fries in the city.' },
      { id: 'REV-102', restaurant: 'Bella Napoli Trattoria', rating: 5, date: 'Oct 19, 2026', comment: 'Authentic wood fired crust and rich sauce, perfect family dinner.' }
    ],
    complaints: [
      { id: 'COMP-101', orderId: 'ORD-9610', subject: 'Drink spilled inside food pouch', date: 'Sep 28, 2026', priority: 'Medium', status: 'Resolved', resolution: 'Issued instant $18.50 wallet credit with apology coupon' }
    ],
    adminNotes: 'High-value executive corporate account. Always prioritize fast dispatch.'
  },
  {
    id: 'CUST-102',
    name: 'David Reynolds',
    email: 'd.reynolds@techcorp.io',
    phone: '+1 (555) 345-6789',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    tier: 'Gold Member',
    status: 'Active',
    joinedDate: 'Mar 08, 2024',
    walletBalance: 15.00,
    totalOrdersCount: 38,
    lifetimeSpend: 1580.40,
    addresses: [
      { id: 'ADDR-3', label: 'Office', address: '88 Innovation Way, Floor 12, Tech District, NY 10022', isDefault: true, instructions: 'Call on arrival, badge scan needed.' },
      { id: 'ADDR-4', label: 'Apartment', address: '12 Hudson River Yards, Apt 9A', isDefault: false, instructions: 'Elevator up to 9th floor.' }
    ],
    orderHistory: [
      { id: 'ORD-9820', restaurant: 'Bella Napoli Trattoria', date: 'Today, 12:42 PM', itemsCount: 4, totalAmount: 65.60, status: 'Confirmed' },
      { id: 'ORD-9799', restaurant: 'Bella Napoli Trattoria', date: 'Yesterday, 08:15 PM', itemsCount: 2, totalAmount: 38.50, status: 'Delivered' }
    ],
    refundHistory: [],
    reviews: [
      { id: 'REV-103', restaurant: 'Bella Napoli Trattoria', rating: 4, date: 'Oct 25, 2026', comment: 'Great pasta, arrived warm. Could use a bit more parmesan.' }
    ],
    complaints: [],
    adminNotes: 'Tech firm team lead, frequent large team lunch orders.'
  },
  {
    id: 'CUST-103',
    name: 'Aisha Patel',
    email: 'aisha.patel@horizon.co',
    phone: '+1 (555) 456-7890',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
    tier: 'VIP Black',
    status: 'Active',
    joinedDate: 'Nov 19, 2023',
    walletBalance: 78.00,
    totalOrdersCount: 74,
    lifetimeSpend: 3410.20,
    addresses: [
      { id: 'ADDR-5', label: 'Home', address: '310 Sunset Ridge, North Hills, NY 10036', isDefault: true, instructions: 'Ring doorbell twice.' },
      { id: 'ADDR-6', label: 'Parents House', address: '44 Blossom Grove Road', isDefault: false, instructions: 'Leave on porch table.' }
    ],
    orderHistory: [
      { id: 'ORD-9819', restaurant: 'Spice Symphony Royal Indian', date: 'Today, 12:56 PM', itemsCount: 7, totalAmount: 81.20, status: 'Pending' },
      { id: 'ORD-9755', restaurant: 'Sushi Zen Master Bar', date: 'Oct 21, 2026', itemsCount: 4, totalAmount: 94.00, status: 'Delivered' }
    ],
    refundHistory: [],
    reviews: [
      { id: 'REV-104', restaurant: 'Spice Symphony Royal Indian', rating: 5, date: 'Oct 15, 2026', comment: 'Unrivaled lamb biryani and garlic naan. Consistently Michelin quality.' }
    ],
    complaints: [],
    adminNotes: 'Very frequent high-ticket dinner orders. VIP perks enabled.'
  },
  {
    id: 'CUST-104',
    name: 'Jordan Miller',
    email: 'jordan.m@gmail.com',
    phone: '+1 (555) 678-9012',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150',
    tier: 'Regular',
    status: 'Flagged', // Flagged for multiple cancellation / refund inquiries
    joinedDate: 'Sep 05, 2024',
    walletBalance: 0.00,
    totalOrdersCount: 6,
    lifetimeSpend: 142.30,
    addresses: [
      { id: 'ADDR-7', label: 'Home', address: '23 Pinecrest Lane, Midtown, NY 10018', isDefault: true, instructions: 'Side entrance door.' }
    ],
    orderHistory: [
      { id: 'ORD-9817', restaurant: 'Urban Flame Burger Co.', date: 'Today, 11:15 AM', itemsCount: 2, totalAmount: 30.30, status: 'Cancelled' }
    ],
    refundHistory: [
      { id: 'REF-702', orderId: 'ORD-9817', date: 'Today, 11:28 AM', amount: 30.30, reason: 'Restaurant ran out of pulled pork burger stock', status: 'Pending Review' }
    ],
    reviews: [
      { id: 'REV-105', restaurant: 'Urban Flame Burger Co.', rating: 2, date: 'Today, 11:30 AM', comment: 'Order was cancelled after 15 mins because item ran out of stock. Awaiting refund.' }
    ],
    complaints: [
      { id: 'COMP-101', orderId: 'ORD-9817', subject: 'Restaurant cancellation and immediate refund inquiry', date: 'Today, 11:30 AM', priority: 'High', status: 'Open', resolution: 'Awaiting admin refund approval in Order Hub' }
    ],
    adminNotes: 'Flagged account for verification review due to 2 recent cancellations.'
  },
  {
    id: 'CUST-105',
    name: 'Carlos Mendez',
    email: 'carlos.m@coastal.com',
    phone: '+1 (555) 789-0123',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150',
    tier: 'Gold Member',
    status: 'Active',
    joinedDate: 'Feb 10, 2024',
    walletBalance: 20.00,
    totalOrdersCount: 28,
    lifetimeSpend: 980.50,
    addresses: [
      { id: 'ADDR-8', label: 'Condo', address: '419 Coastal Drive, Apt 2, Marina Bay, NY 10007', isDefault: true, instructions: 'Gate code #9021.' }
    ],
    orderHistory: [
      { id: 'ORD-9816', restaurant: 'Verde Bowl & Artisan Salad', date: 'Today, 12:30 PM', itemsCount: 4, totalAmount: 41.60, status: 'Active Delivery' }
    ],
    refundHistory: [],
    reviews: [
      { id: 'REV-106', restaurant: 'Verde Bowl & Artisan Salad', rating: 5, date: 'Oct 18, 2026', comment: 'Super fresh organic ingredients, best cold pressed juices.' }
    ],
    complaints: [],
    adminNotes: 'Health and fitness enthusiast. Regularly orders weekly salad meal preps.'
  },
  {
    id: 'CUST-106',
    name: 'Samantha Vance',
    email: 'samantha.v@outlook.com',
    phone: '+1 (555) 998-1122',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150',
    tier: 'Regular',
    status: 'Suspended', // Suspended due to chargeback policy violation
    joinedDate: 'Aug 14, 2024',
    walletBalance: 0.00,
    totalOrdersCount: 4,
    lifetimeSpend: 98.20,
    addresses: [
      { id: 'ADDR-9', label: 'Home', address: '98 East Broad Street, Apt 11', isDefault: true, instructions: 'Ring buzzer.' }
    ],
    orderHistory: [
      { id: 'ORD-9501', restaurant: 'Urban Flame Burger Co.', date: 'Oct 02, 2026', itemsCount: 2, totalAmount: 32.50, status: 'Delivered' }
    ],
    refundHistory: [
      { id: 'REF-689', orderId: 'ORD-9501', date: 'Oct 03, 2026', amount: 32.50, reason: 'Unauthorized bank chargeback dispute', status: 'Rejected' }
    ],
    reviews: [],
    complaints: [
      { id: 'COMP-099', orderId: 'ORD-9501', subject: 'Chargeback filed with credit card issuer', date: 'Oct 04, 2026', priority: 'High', status: 'Resolved', resolution: 'Account suspended pending bank documentation verification' }
    ],
    adminNotes: 'Account suspended on Oct 05, 2026 due to fraudulent chargeback claim.'
  }
];

export * from './mockDataFinanceOffersSettings';
