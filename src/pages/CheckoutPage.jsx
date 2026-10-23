import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import DeliveryAddressForm from '../components/checkout/DeliveryAddressForm';
import DeliverySlotPicker from '../components/checkout/DeliverySlotPicker';
import PaymentMethodPicker from '../components/checkout/PaymentMethodPicker';
import OrderSummaryCard from '../components/checkout/OrderSummaryCard';
import { useCart } from '../context/CartContext';
import { useOrders } from '../context/OrderContext';
import { ArrowLeft, ShoppingBag } from 'lucide-react';

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { 
    cart, 
    subtotal, 
    deliveryFee, 
    platformFee, 
    tax, 
    discount, 
    total, 
    activeRestaurant, 
    activeCoupon, 
    clearCart,
    showToast 
  } = useCart();
  const { createOrder } = useOrders();

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Address Form State
  const [address, setAddress] = useState({
    fullName: 'Alex Rivera',
    phone: '+1 (555) 349-2810',
    street: '742 Evergreen Terrace',
    apt: 'Apt 4B',
    city: 'San Francisco',
    zip: '94107',
    instructions: 'Leave at front door and ring doorbell',
  });

  // Delivery Slot State
  const [selectedSlot, setSelectedSlot] = useState({
    id: 'standard',
    title: 'Standard Delivery',
    time: '25-35 mins',
  });

  // Payment Method State
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardDetails, setCardDetails] = useState({
    number: '4242 4242 4242 4242',
    holderName: 'ALEX RIVERA',
    expiry: '12/28',
    cvv: '888',
  });

  const [formErrors, setFormErrors] = useState({});

  if (cart.length === 0) {
    return (
      <div className="min-h-screen max-w-md mx-auto px-4 py-20 flex flex-col items-center justify-center text-center">
        <div className="w-20 h-20 rounded-3xl bg-orange-50 text-orange-500 flex items-center justify-center text-4xl mb-4">
          🛒
        </div>
        <h2 className="text-xl font-bold text-slate-900 mb-1">Your cart is empty</h2>
        <p className="text-xs text-slate-500 mb-6">
          Add some delicious dishes from our top rated kitchens before heading to checkout!
        </p>
        <Link
          to="/"
          className="px-6 py-3 rounded-2xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs shadow-lg shadow-orange-600/30 transition-all"
        >
          Explore Restaurants
        </Link>
      </div>
    );
  }

  const validateForm = () => {
    const errors = {};

    if (!address.fullName.trim()) errors.fullName = 'Please enter your full name';
    if (!address.phone.trim() || address.phone.length < 8) errors.phone = 'Please enter a valid phone number';
    if (!address.street.trim()) errors.street = 'Street address is required';
    if (!address.city.trim()) errors.city = 'City is required';
    if (!address.zip.trim()) errors.zip = 'Postal / Zip code is required';

    if (paymentMethod === 'card') {
      if (!cardDetails.number || cardDetails.number.replace(/\s/g, '').length < 15) {
        errors.cardNumber = 'Enter a valid 16-digit card number';
      }
      if (!cardDetails.holderName.trim()) {
        errors.cardHolder = 'Enter name on card';
      }
      if (!cardDetails.expiry || cardDetails.expiry.length < 5) {
        errors.cardExpiry = 'Enter MM/YY';
      }
      if (!cardDetails.cvv || cardDetails.cvv.length < 3) {
        errors.cardCvv = 'Enter CVV';
      }
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handlePlaceOrder = () => {
    if (!validateForm()) {
      showToast('Please fix required fields marked in red', 'error');
      return;
    }

    setIsSubmitting(true);

    const slotFee = selectedSlot.id === 'priority' ? 1.99 : 0;
    const finalPricing = {
      subtotal,
      deliveryFee: deliveryFee + slotFee,
      platformFee,
      tax,
      discount,
      couponCode: activeCoupon?.code || null,
      total: Math.max(0, total + slotFee),
    };

    setTimeout(() => {
      const createdOrder = createOrder({
        items: cart,
        pricing: finalPricing,
        deliveryAddress: address,
        deliverySlot: `${selectedSlot.title} (${selectedSlot.time})`,
        paymentMethod: {
          type: paymentMethod,
          label: paymentMethod === 'card' 
            ? `Card ending in ${cardDetails.number.slice(-4)}`
            : paymentMethod === 'apple_pay' 
            ? 'Apple Pay / Google Pay' 
            : 'Cash on Delivery',
        },
        restaurant: activeRestaurant,
      });

      clearCart();
      setIsSubmitting(false);
      showToast('Order confirmed! Tracking live courier status... 🚀');
      navigate(`/order-tracking/${createdOrder.id}`);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-slate-50/60 pb-20 pt-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Link */}
        <div className="mb-6">
          <Link
            to={activeRestaurant ? `/restaurant/${activeRestaurant.id}` : '/'}
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Menu</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Checkout Steps */}
          <div className="lg:col-span-8 space-y-6">
            <DeliveryAddressForm
              address={address}
              setAddress={setAddress}
              errors={formErrors}
            />

            <DeliverySlotPicker
              selectedSlot={selectedSlot}
              setSelectedSlot={setSelectedSlot}
            />

            <PaymentMethodPicker
              paymentMethod={paymentMethod}
              setPaymentMethod={setPaymentMethod}
              cardDetails={cardDetails}
              setCardDetails={setCardDetails}
              errors={formErrors}
            />
          </div>

          {/* Right Sticky Order Summary */}
          <div className="lg:col-span-4">
            <OrderSummaryCard
              selectedSlot={selectedSlot}
              onPlaceOrder={handlePlaceOrder}
              isSubmitting={isSubmitting}
            />
          </div>

        </div>

      </div>
    </div>
  );
}
