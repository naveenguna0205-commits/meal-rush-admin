import React from 'react';
import { MapPin, Phone, User, Home, Building, FileText, CheckCircle2 } from 'lucide-react';

export default function DeliveryAddressForm({ address, setAddress, errors }) {
  const handleChange = (field, value) => {
    setAddress(prev => ({ ...prev, [field]: value }));
  };

  const deliveryInstructions = [
    'Leave at door',
    'Ring doorbell',
    'Call upon arrival',
    'Do not knock (baby sleeping)',
    'Leave with security / concierge',
  ];

  const toggleInstruction = (inst) => {
    const current = address.instructions || '';
    if (current.includes(inst)) {
      handleChange('instructions', current.replace(inst, '').replace(/,\s*,/g, ',').trim());
    } else {
      handleChange('instructions', current ? `${current}, ${inst}` : inst);
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-xs text-left">
      <div className="flex items-center gap-2.5 mb-6 pb-4 border-b border-slate-100">
        <div className="w-10 h-10 rounded-2xl bg-orange-500/10 text-orange-600 flex items-center justify-center font-bold">
          <MapPin className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-lg font-black text-slate-900">1. Delivery Address</h2>
          <p className="text-xs text-slate-500">Where should our courier deliver your feast?</p>
        </div>
      </div>

      <div className="space-y-4">
        {/* Name and Phone */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-slate-400" />
              Full Name *
            </label>
            <input
              type="text"
              value={address.fullName}
              onChange={(e) => handleChange('fullName', e.target.value)}
              placeholder="e.g. Alex Rivera"
              className={`w-full px-4 py-2.5 rounded-xl border text-xs sm:text-sm font-medium transition-colors ${
                errors.fullName ? 'border-rose-400 bg-rose-50/50' : 'border-slate-200 bg-slate-50 focus:bg-white focus:border-orange-500'
              }`}
            />
            {errors.fullName && (
              <p className="text-[11px] text-rose-500 mt-1 font-medium">{errors.fullName}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-slate-400" />
              Phone Number *
            </label>
            <input
              type="tel"
              value={address.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              placeholder="e.g. +1 (555) 349-2810"
              className={`w-full px-4 py-2.5 rounded-xl border text-xs sm:text-sm font-medium transition-colors ${
                errors.phone ? 'border-rose-400 bg-rose-50/50' : 'border-slate-200 bg-slate-50 focus:bg-white focus:border-orange-500'
              }`}
            />
            {errors.phone && (
              <p className="text-[11px] text-rose-500 mt-1 font-medium">{errors.phone}</p>
            )}
          </div>
        </div>

        {/* Street Address */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
            <Home className="w-3.5 h-3.5 text-slate-400" />
            Street Address *
          </label>
          <input
            type="text"
            value={address.street}
            onChange={(e) => handleChange('street', e.target.value)}
            placeholder="e.g. 742 Evergreen Terrace"
            className={`w-full px-4 py-2.5 rounded-xl border text-xs sm:text-sm font-medium transition-colors ${
              errors.street ? 'border-rose-400 bg-rose-50/50' : 'border-slate-200 bg-slate-50 focus:bg-white focus:border-orange-500'
            }`}
          />
          {errors.street && (
            <p className="text-[11px] text-rose-500 mt-1 font-medium">{errors.street}</p>
          )}
        </div>

        {/* Apt, City, Zip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
              <Building className="w-3.5 h-3.5 text-slate-400" />
              Apartment / Suite
            </label>
            <input
              type="text"
              value={address.apt}
              onChange={(e) => handleChange('apt', e.target.value)}
              placeholder="e.g. Apt 4B"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-orange-500 text-xs sm:text-sm font-medium transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              City *
            </label>
            <input
              type="text"
              value={address.city}
              onChange={(e) => handleChange('city', e.target.value)}
              placeholder="e.g. San Francisco"
              className={`w-full px-4 py-2.5 rounded-xl border text-xs sm:text-sm font-medium transition-colors ${
                errors.city ? 'border-rose-400 bg-rose-50/50' : 'border-slate-200 bg-slate-50 focus:bg-white focus:border-orange-500'
              }`}
            />
            {errors.city && (
              <p className="text-[11px] text-rose-500 mt-1 font-medium">{errors.city}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Postal / Zip Code *
            </label>
            <input
              type="text"
              value={address.zip}
              onChange={(e) => handleChange('zip', e.target.value)}
              placeholder="e.g. 94107"
              className={`w-full px-4 py-2.5 rounded-xl border text-xs sm:text-sm font-medium transition-colors ${
                errors.zip ? 'border-rose-400 bg-rose-50/50' : 'border-slate-200 bg-slate-50 focus:bg-white focus:border-orange-500'
              }`}
            />
            {errors.zip && (
              <p className="text-[11px] text-rose-500 mt-1 font-medium">{errors.zip}</p>
            )}
          </div>
        </div>

        {/* Delivery Instructions */}
        <div className="pt-2">
          <label className="block text-xs font-bold text-slate-700 mb-2 flex items-center gap-1.5">
            <FileText className="w-3.5 h-3.5 text-slate-400" />
            Drop-off Instructions (Optional)
          </label>

          <div className="flex flex-wrap gap-1.5 mb-2.5">
            {deliveryInstructions.map((inst) => {
              const active = address.instructions?.includes(inst);
              return (
                <button
                  key={inst}
                  type="button"
                  onClick={() => toggleInstruction(inst)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold border transition-all ${
                    active
                      ? 'bg-orange-50 border-orange-500 text-orange-700 shadow-2xs'
                      : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                  }`}
                >
                  {inst}
                </button>
              );
            })}
          </div>

          <textarea
            value={address.instructions || ''}
            onChange={(e) => handleChange('instructions', e.target.value)}
            placeholder="Any gate codes, landmark details, or special courier notes..."
            rows={2}
            className="w-full px-4 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-orange-500 text-xs text-slate-800 placeholder-slate-400 transition-colors resize-none"
          />
        </div>

      </div>
    </div>
  );
}
