import React, { useState } from 'react';
import { CreditCard, ShieldCheck, Check, DollarSign, Smartphone } from 'lucide-react';

export default function PaymentMethodPicker({ paymentMethod, setPaymentMethod, cardDetails, setCardDetails, errors }) {
  const methods = [
    { id: 'card', name: 'Credit or Debit Card', icon: CreditCard, subtitle: 'Visa, Mastercard, Amex' },
    { id: 'apple_pay', name: 'Apple Pay / Google Pay', icon: Smartphone, subtitle: 'Fast 1-touch checkout' },
    { id: 'cash', name: 'Cash on Delivery', icon: DollarSign, subtitle: 'Pay when rider arrives at door' },
  ];

  const handleCardNumberChange = (e) => {
    let value = e.target.value.replace(/\D/g, '').slice(0, 16);
    // Format in groups of 4
    let formatted = value.match(/.{1,4}/g)?.join(' ') || value;
    setCardDetails(prev => ({ ...prev, number: formatted }));
  };

  const handleExpiryChange = (e) => {
    let value = e.target.value.replace(/\D/g, '').slice(0, 4);
    if (value.length >= 3) {
      value = `${value.slice(0, 2)}/${value.slice(2, 4)}`;
    }
    setCardDetails(prev => ({ ...prev, expiry: value }));
  };

  const handleCvvChange = (e) => {
    let value = e.target.value.replace(/\D/g, '').slice(0, 4);
    setCardDetails(prev => ({ ...prev, cvv: value }));
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-xs text-left">
      <div className="flex items-center justify-between gap-2.5 mb-6 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center font-bold">
            <CreditCard className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-black text-slate-900">3. Payment Method</h2>
            <p className="text-xs text-slate-500">Encrypted with 256-Bit bank-grade security</p>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-1.5 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-xl border border-emerald-200">
          <ShieldCheck className="w-4 h-4" />
          <span>SSL Secured</span>
        </div>
      </div>

      {/* Payment Options Selection */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
        {methods.map((method) => {
          const Icon = method.icon;
          const isSelected = paymentMethod === method.id;
          return (
            <button
              key={method.id}
              type="button"
              onClick={() => setPaymentMethod(method.id)}
              className={`p-3.5 rounded-2xl border-2 text-left transition-all flex items-start gap-3 cursor-pointer ${
                isSelected
                  ? 'border-orange-500 bg-orange-50/50 shadow-xs'
                  : 'border-slate-200 hover:border-slate-300 bg-white'
              }`}
            >
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                  isSelected ? 'bg-orange-500 text-white' : 'bg-slate-100 text-slate-600'
                }`}
              >
                <Icon className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="text-xs font-bold text-slate-900 truncate">{method.name}</div>
                <div className="text-[10px] text-slate-400 mt-0.5 truncate">{method.subtitle}</div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Card Form when Card is selected */}
      {paymentMethod === 'card' && (
        <div className="space-y-4 pt-2">
          {/* Card Mockup Visual */}
          <div className="relative rounded-2xl p-5 bg-gradient-to-tr from-slate-900 via-slate-800 to-slate-950 text-white shadow-xl max-w-sm mx-auto overflow-hidden border border-slate-700">
            <div className="flex justify-between items-start mb-6">
              <span className="font-mono text-xs text-amber-400 font-bold uppercase tracking-widest">
                Cravingo Gold
              </span>
              <span className="font-bold text-sm tracking-widest text-slate-300">VISA</span>
            </div>

            <div className="font-mono text-base tracking-widest mb-4 text-slate-200">
              {cardDetails.number || '•••• •••• •••• ••••'}
            </div>

            <div className="flex justify-between items-end text-xs">
              <div>
                <div className="text-[9px] uppercase text-slate-400 font-medium">Cardholder</div>
                <div className="font-bold text-slate-200 tracking-wide truncate max-w-[150px]">
                  {cardDetails.holderName || 'ALEX RIVERA'}
                </div>
              </div>
              <div>
                <div className="text-[9px] uppercase text-slate-400 font-medium">Expires</div>
                <div className="font-bold text-slate-200">{cardDetails.expiry || 'MM/YY'}</div>
              </div>
            </div>
          </div>

          {/* Card Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-xl mx-auto pt-2">
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Card Number *
              </label>
              <input
                type="text"
                value={cardDetails.number}
                onChange={handleCardNumberChange}
                placeholder="4242 4242 4242 4242"
                maxLength={19}
                className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm font-mono transition-colors ${
                  errors.cardNumber ? 'border-rose-400 bg-rose-50/50' : 'border-slate-200 bg-slate-50 focus:bg-white focus:border-orange-500'
                }`}
              />
              {errors.cardNumber && (
                <p className="text-[11px] text-rose-500 mt-1 font-medium">{errors.cardNumber}</p>
              )}
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Name on Card *
              </label>
              <input
                type="text"
                value={cardDetails.holderName}
                onChange={(e) => setCardDetails(prev => ({ ...prev, holderName: e.target.value.toUpperCase() }))}
                placeholder="ALEX RIVERA"
                className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm font-medium uppercase transition-colors ${
                  errors.cardHolder ? 'border-rose-400 bg-rose-50/50' : 'border-slate-200 bg-slate-50 focus:bg-white focus:border-orange-500'
                }`}
              />
              {errors.cardHolder && (
                <p className="text-[11px] text-rose-500 mt-1 font-medium">{errors.cardHolder}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Expiry Date *
              </label>
              <input
                type="text"
                value={cardDetails.expiry}
                onChange={handleExpiryChange}
                placeholder="MM/YY"
                maxLength={5}
                className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm font-mono transition-colors ${
                  errors.cardExpiry ? 'border-rose-400 bg-rose-50/50' : 'border-slate-200 bg-slate-50 focus:bg-white focus:border-orange-500'
                }`}
              />
              {errors.cardExpiry && (
                <p className="text-[11px] text-rose-500 mt-1 font-medium">{errors.cardExpiry}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                CVV / CVC *
              </label>
              <input
                type="password"
                value={cardDetails.cvv}
                onChange={handleCvvChange}
                placeholder="•••"
                maxLength={4}
                className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm font-mono transition-colors ${
                  errors.cardCvv ? 'border-rose-400 bg-rose-50/50' : 'border-slate-200 bg-slate-50 focus:bg-white focus:border-orange-500'
                }`}
              />
              {errors.cardCvv && (
                <p className="text-[11px] text-rose-500 mt-1 font-medium">{errors.cardCvv}</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Apple Pay / Google Pay view */}
      {paymentMethod === 'apple_pay' && (
        <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 text-center space-y-2">
          <div className="text-3xl mb-1">⚡</div>
          <h4 className="text-sm font-bold text-slate-900">1-Touch Biometric Checkout</h4>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            You will be prompted to confirm payment using Face ID, Touch ID, or Google Wallet when you place the order.
          </p>
        </div>
      )}

      {/* Cash On Delivery view */}
      {paymentMethod === 'cash' && (
        <div className="p-6 rounded-2xl bg-amber-50/80 border border-amber-200 text-center space-y-2">
          <div className="text-3xl mb-1">💵</div>
          <h4 className="text-sm font-bold text-amber-950">Cash on Delivery Selected</h4>
          <p className="text-xs text-amber-800 max-w-sm mx-auto">
            Please keep exact cash ready upon arrival. Our courier will provide a receipt on delivery.
          </p>
        </div>
      )}
    </div>
  );
}
