import { IMAGES } from '../assets/img';

export const INITIAL_MOCK_ORDERS = [
  {
    id: 'CRV-89412',
    date: '2026-10-18T19:30:00.000Z',
    restaurantId: 'smashed-patty-co',
    restaurantName: 'The Smashed Patty Co.',
    restaurantLogo: IMAGES.restaurants.smashedPatty.logo,
    status: 'Delivered',
    statusStep: 4,
    items: [
      {
        id: 'spc-1',
        name: 'The Truffle Gold Smashed Burger',
        image: IMAGES.dishes.spc1,
        price: 13.99,
        quantity: 2,
        customization: {
          selectedSize: { name: 'Regular Double Smash', priceDelta: 0 },
          selectedAddons: [{ name: 'Crispy Applewood Bacon', price: 2.25 }],
          selectedSauce: { name: 'Truffle Mayo (Standard)', price: 0 },
          specialInstructions: 'Extra napkins please!',
        },
      },
      {
        id: 'spc-4',
        name: 'Parmesan Truffle Waffle Fries',
        image: IMAGES.dishes.spc4,
        price: 6.99,
        quantity: 1,
        customization: null,
      },
    ],
    pricing: {
      subtotal: 37.22,
      deliveryFee: 0,
      platformFee: 1.50,
      tax: 2.98,
      discount: 5.00,
      couponCode: 'FEAST50',
      total: 36.70,
    },
    deliveryAddress: {
      fullName: 'Alex Rivera',
      phone: '+1 (555) 349-2810',
      street: '742 Evergreen Terrace, Apt 4B',
      city: 'San Francisco, CA 94107',
      instructions: 'Leave at front door and ring buzzer',
    },
    paymentMethod: {
      type: 'card',
      label: 'Apple Pay •••• 4242',
    },
    deliveryRider: {
      name: 'Marcus Vance',
      rating: 4.9,
      phone: '+1 (555) 782-9901',
      vehicle: 'Electric Superbike',
      plate: 'CA-EBIKE-9',
    },
  },
];
