import React, { createContext, useContext, useState, useEffect } from 'react';
import { COUPONS } from '../data/coupons';

const CartContext = createContext(null);

const CART_STORAGE_KEY = 'cravingo_cart_v1';
const COUPON_STORAGE_KEY = 'cravingo_coupon_v1';

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [activeCoupon, setActiveCoupon] = useState(() => {
    try {
      const saved = localStorage.getItem(COUPON_STORAGE_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const [restaurantConflict, setRestaurantConflict] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      if (activeCoupon) {
        localStorage.setItem(COUPON_STORAGE_KEY, JSON.stringify(activeCoupon));
      } else {
        localStorage.removeItem(COUPON_STORAGE_KEY);
      }
    } catch (e) {
      console.error('Failed to save coupon to localStorage', e);
    }
  }, [activeCoupon]);

  const showToast = (message, type = 'success') => {
    setToastMessage({ message, type, id: Date.now() });
    setTimeout(() => {
      setToastMessage(prev => (prev?.id === prev?.id ? null : prev));
    }, 3200);
  };

  // Check restaurant consistency
  const activeRestaurant = cart.length > 0 ? {
    id: cart[0].restaurantId,
    name: cart[0].restaurantName,
    deliveryFee: cart[0].restaurantDeliveryFee ?? 2.49,
    freeDeliveryAbove: cart[0].restaurantFreeDeliveryAbove ?? 30,
  } : null;

  const generateCartItemId = (itemId, customization) => {
    if (!customization) return `${itemId}-default`;
    const sizePart = customization.selectedSize?.id || 'standard';
    const addonsPart = (customization.selectedAddons || []).map(a => a.id).sort().join('_');
    const saucePart = customization.selectedSauce?.id || 'none';
    const notesPart = customization.specialInstructions ? encodeURIComponent(customization.specialInstructions.trim()) : '';
    return `${itemId}_${sizePart}_${addonsPart}_${saucePart}_${notesPart}`;
  };

  const calculateUnitItemPrice = (item, customization) => {
    let price = item.price;
    if (customization?.selectedSize) {
      price += customization.selectedSize.priceDelta || 0;
    }
    if (customization?.selectedAddons) {
      const addonsSum = customization.selectedAddons.reduce((sum, a) => sum + (a.price || 0), 0);
      price += addonsSum;
    }
    if (customization?.selectedSauce && customization.selectedSauce.price) {
      price += customization.selectedSauce.price;
    }
    return Number(price.toFixed(2));
  };

  const addToCart = (item, customization = null, restaurant, quantity = 1) => {
    // Check if adding from different restaurant
    if (cart.length > 0 && cart[0].restaurantId !== restaurant.id) {
      setRestaurantConflict({
        pendingItem: item,
        pendingCustomization: customization,
        pendingRestaurant: restaurant,
        pendingQuantity: quantity,
        currentRestaurantName: cart[0].restaurantName,
        newRestaurantName: restaurant.name,
      });
      return false;
    }

    const cartItemId = generateCartItemId(item.id, customization);
    const unitPrice = calculateUnitItemPrice(item, customization);

    setCart(prevCart => {
      const existingIndex = prevCart.findIndex(c => c.cartItemId === cartItemId);
      if (existingIndex > -1) {
        const next = [...prevCart];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + quantity,
        };
        return next;
      } else {
        return [
          ...prevCart,
          {
            cartItemId,
            id: item.id,
            name: item.name,
            image: item.image,
            basePrice: item.price,
            unitPrice,
            quantity,
            customization,
            isVeg: item.isVeg,
            restaurantId: restaurant.id,
            restaurantName: restaurant.name,
            restaurantDeliveryFee: restaurant.deliveryFee,
            restaurantFreeDeliveryAbove: restaurant.freeDeliveryAbove,
          },
        ];
      }
    });

    showToast(`Added "${item.name}" to cart! 🛒`);
    return true;
  };

  const resolveConflictAndAdd = () => {
    if (!restaurantConflict) return;
    const { pendingItem, pendingCustomization, pendingRestaurant, pendingQuantity } = restaurantConflict;
    const cartItemId = generateCartItemId(pendingItem.id, pendingCustomization);
    const unitPrice = calculateUnitItemPrice(pendingItem, pendingCustomization);

    setCart([
      {
        cartItemId,
        id: pendingItem.id,
        name: pendingItem.name,
        image: pendingItem.image,
        basePrice: pendingItem.price,
        unitPrice,
        quantity: pendingQuantity,
        customization: pendingCustomization,
        isVeg: pendingItem.isVeg,
        restaurantId: pendingRestaurant.id,
        restaurantName: pendingRestaurant.name,
        restaurantDeliveryFee: pendingRestaurant.deliveryFee,
        restaurantFreeDeliveryAbove: pendingRestaurant.freeDeliveryAbove,
      },
    ]);
    setActiveCoupon(null);
    setRestaurantConflict(null);
    showToast(`Cart reset to order from ${pendingRestaurant.name}`);
  };

  const cancelConflict = () => {
    setRestaurantConflict(null);
  };

  const updateQuantity = (cartItemId, newQty) => {
    if (newQty <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart(prev => prev.map(item => item.cartItemId === cartItemId ? { ...item, quantity: newQty } : item));
  };

  const removeFromCart = (cartItemId) => {
    const itemToRemove = cart.find(i => i.cartItemId === cartItemId);
    setCart(prev => prev.filter(item => item.cartItemId !== cartItemId));
    if (itemToRemove) {
      showToast(`Removed "${itemToRemove.name}" from cart`, 'info');
    }
  };

  const clearCart = () => {
    setCart([]);
    setActiveCoupon(null);
  };

  // Calculations
  const itemsCount = cart.reduce((acc, curr) => acc + curr.quantity, 0);
  const subtotal = Number(cart.reduce((acc, curr) => acc + (curr.unitPrice * curr.quantity), 0).toFixed(2));

  // Delivery fee logic
  let baseDeliveryFee = 0;
  if (cart.length > 0) {
    const threshold = activeRestaurant?.freeDeliveryAbove ?? 30;
    const fee = activeRestaurant?.deliveryFee ?? 2.49;
    baseDeliveryFee = subtotal >= threshold ? 0 : fee;
  }

  // Coupon discount calculations
  let discount = 0;
  let deliveryFee = baseDeliveryFee;

  if (activeCoupon) {
    if (subtotal < (activeCoupon.minOrder || 0)) {
      // Coupon invalid due to min order drop
      // We keep coupon object or invalidate
    } else {
      if (activeCoupon.discountType === 'percentage') {
        const calculated = (subtotal * activeCoupon.value) / 100;
        discount = Math.min(calculated, activeCoupon.maxDiscount || calculated);
      } else if (activeCoupon.discountType === 'flat') {
        discount = Math.min(subtotal, activeCoupon.value);
      } else if (activeCoupon.discountType === 'free_delivery') {
        deliveryFee = 0;
        discount = baseDeliveryFee;
      }
    }
  }

  discount = Number(discount.toFixed(2));
  const platformFee = cart.length > 0 ? 1.49 : 0;
  const tax = Number((subtotal * 0.08).toFixed(2)); // 8% sales tax
  const total = Number(Math.max(0, subtotal + deliveryFee + platformFee + tax - (activeCoupon?.discountType === 'free_delivery' ? 0 : discount)).toFixed(2));

  const applyCoupon = (code) => {
    const cleanCode = code.trim().toUpperCase();
    const coupon = COUPONS.find(c => c.code === cleanCode);

    if (!coupon) {
      return { success: false, message: 'Invalid coupon code. Try FEAST50, FREEDEL, or CRAVE20!' };
    }

    if (subtotal < coupon.minOrder) {
      return {
        success: false,
        message: `Minimum order of $${coupon.minOrder.toFixed(2)} required for ${coupon.code}. Add $${(coupon.minOrder - subtotal).toFixed(2)} more!`,
      };
    }

    setActiveCoupon(coupon);
    showToast(`Promo code "${coupon.code}" applied! 🎉`);
    return { success: true, message: `Coupon ${coupon.code} applied successfully!` };
  };

  const removeCoupon = () => {
    setActiveCoupon(null);
    showToast('Promo code removed', 'info');
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        itemsCount,
        subtotal,
        deliveryFee,
        baseDeliveryFee,
        platformFee,
        tax,
        discount,
        total,
        activeRestaurant,
        isCartOpen,
        setIsCartOpen,
        activeCoupon,
        applyCoupon,
        removeCoupon,
        toastMessage,
        showToast,
        restaurantConflict,
        resolveConflictAndAdd,
        cancelConflict,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
