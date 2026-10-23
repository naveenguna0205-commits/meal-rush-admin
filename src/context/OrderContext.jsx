import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { INITIAL_MOCK_ORDERS } from '../data/mockOrders';

const OrderContext = createContext(null);

const ORDERS_STORAGE_KEY = 'cravingo_orders_v1';
const ACTIVE_ORDER_ID_KEY = 'cravingo_active_order_id_v1';

export const ORDER_STAGES = [
  { step: 0, title: 'Order Placed & Confirmed', description: 'Restaurant has received your order and confirmed it.', etaMinutes: 25 },
  { step: 1, title: 'Kitchen Preparing Your Feast', description: 'Chef is handcrafting your gourmet dishes with care.', etaMinutes: 20 },
  { step: 2, title: 'Rider Picked Up Order', description: 'Your delivery hero Marcus Vance has packed your meal in heat-sealed bags.', etaMinutes: 12 },
  { step: 3, title: 'Out For Delivery', description: 'Courier is en route to your address. Watch the live tracking map below!', etaMinutes: 5 },
  { step: 4, title: 'Delivered • Bon Appétit!', description: 'Order was successfully handed over. Enjoy your meal!', etaMinutes: 0 },
];

export function OrderProvider({ children }) {
  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem(ORDERS_STORAGE_KEY);
      return saved ? JSON.parse(saved) : INITIAL_MOCK_ORDERS;
    } catch {
      return INITIAL_MOCK_ORDERS;
    }
  });

  const [activeOrderId, setActiveOrderId] = useState(() => {
    try {
      return localStorage.getItem(ACTIVE_ORDER_ID_KEY) || null;
    } catch {
      return null;
    }
  });

  // Save orders to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
    } catch (e) {
      console.error('Failed to save orders to localStorage', e);
    }
  }, [orders]);

  // Save active order ID
  useEffect(() => {
    try {
      if (activeOrderId) {
        localStorage.setItem(ACTIVE_ORDER_ID_KEY, activeOrderId);
      } else {
        localStorage.removeItem(ACTIVE_ORDER_ID_KEY);
      }
    } catch (e) {
      console.error('Failed to save activeOrderId', e);
    }
  }, [activeOrderId]);

  // Active order object
  const activeOrder = orders.find(o => o.id === activeOrderId) || orders[0] || null;

  // Auto-progress simulation effect for active order
  useEffect(() => {
    if (!activeOrderId) return;
    const current = orders.find(o => o.id === activeOrderId);
    if (!current || current.statusStep >= 4 || current.status === 'Cancelled') return;

    // Progress to next step every 20 seconds automatically
    const timer = setTimeout(() => {
      progressOrderStatus(activeOrderId);
    }, 20000);

    return () => clearTimeout(timer);
  }, [activeOrderId, orders]);

  const triggerCelebration = () => {
    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#e23744', '#f59e0b', '#10b981', '#3b82f6', '#ec4899'],
      });
    } catch (err) {
      console.warn('Confetti error', err);
    }
  };

  const createOrder = ({ items, pricing, deliveryAddress, deliverySlot, paymentMethod, restaurant }) => {
    const orderId = `CRV-${Math.floor(10000 + Math.random() * 90000)}`;
    const newOrder = {
      id: orderId,
      date: new Date().toISOString(),
      restaurantId: restaurant.id,
      restaurantName: restaurant.name,
      restaurantLogo: restaurant.logo,
      status: 'Order Placed',
      statusStep: 0,
      deliverySlot: deliverySlot || 'Standard Delivery (25-35 mins)',
      items: items.map(item => ({
        id: item.id,
        name: item.name,
        price: item.unitPrice,
        basePrice: item.basePrice,
        quantity: item.quantity,
        image: item.image,
        customization: item.customization,
      })),
      pricing: { ...pricing },
      deliveryAddress,
      paymentMethod,
      deliveryRider: {
        name: 'Marcus Vance',
        rating: 4.95,
        phone: '+1 (555) 782-9901',
        vehicle: 'Aero-Fast Electric E-Bike',
        plate: 'CA-FAST-77',
      },
    };

    setOrders(prev => [newOrder, ...prev]);
    setActiveOrderId(orderId);
    triggerCelebration();
    return newOrder;
  };

  const progressOrderStatus = (orderId) => {
    setOrders(prevOrders =>
      prevOrders.map(order => {
        if (order.id !== orderId) return order;
        const nextStep = Math.min(4, (order.statusStep ?? 0) + 1);
        const stage = ORDER_STAGES.find(s => s.step === nextStep);
        return {
          ...order,
          statusStep: nextStep,
          status: stage ? stage.title : order.status,
        };
      })
    );
  };

  const setOrderStepDirect = (orderId, targetStep) => {
    setOrders(prevOrders =>
      prevOrders.map(order => {
        if (order.id !== orderId) return order;
        const validStep = Math.max(0, Math.min(4, targetStep));
        const stage = ORDER_STAGES.find(s => s.step === validStep);
        return {
          ...order,
          statusStep: validStep,
          status: stage ? stage.title : order.status,
        };
      })
    );
  };

  const cancelOrder = (orderId) => {
    setOrders(prevOrders =>
      prevOrders.map(order => {
        if (order.id !== orderId) return order;
        return {
          ...order,
          status: 'Cancelled',
          statusStep: -1,
        };
      })
    );
  };

  return (
    <OrderContext.Provider
      value={{
        orders,
        activeOrder,
        activeOrderId,
        setActiveOrderId,
        createOrder,
        progressOrderStatus,
        setOrderStepDirect,
        cancelOrder,
        triggerCelebration,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}

export function useOrders() {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
}
