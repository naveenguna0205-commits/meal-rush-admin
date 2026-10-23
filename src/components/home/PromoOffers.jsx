import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Tag, Sparkles, Copy, Check, ArrowRight } from 'lucide-react';
import { COUPONS } from '../../data/coupons';
import { useCart } from '../../context/CartContext';

export default function PromoOffers() {
  const { applyCoupon, setIsCartOpen } = useCart();
  const [copiedCode, setCopiedCode] = useState(null);

  const handleCopy = (code) => {
    navigator.clipboard?.writeText(code);
    setCopiedCode(code);
    applyCoupon(code);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  return (
    <section id="offers-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-orange-600 mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Unbeatable Savings</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Exclusive Deals & Vouchers
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {COUPONS.map((coupon) => (
          <motion.div
            key={coupon.code}
            whileHover={{ y: -4 }}
            className={`relative rounded-3xl p-5 text-white bg-gradient-to-br ${coupon.color} shadow-lg overflow-hidden flex flex-col justify-between`}
          >
            {/* Background pattern */}
            <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-white/10 rounded-full blur-xl pointer-events-none" />

            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-[10px] font-bold uppercase tracking-wider backdrop-blur-xs">
                  {coupon.tag}
                </span>
                <Tag className="w-4 h-4 text-white/80" />
              </div>

              <div className="text-2xl font-black tracking-tight mb-1">
                {coupon.title}
              </div>
              <p className="text-xs text-white/90 leading-snug mb-4">
                {coupon.description}
              </p>
            </div>

            <div className="pt-3 border-t border-white/20 flex items-center justify-between">
              <div className="font-mono text-xs font-black tracking-wider bg-black/25 px-2.5 py-1 rounded-lg border border-white/20">
                {coupon.code}
              </div>

              <button
                type="button"
                onClick={() => handleCopy(coupon.code)}
                className="px-3 py-1.5 rounded-xl bg-white text-slate-900 hover:bg-slate-100 text-xs font-bold transition-all flex items-center gap-1 shadow-sm active:scale-95"
              >
                {copiedCode === coupon.code ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-700">Applied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-slate-500" />
                    <span>Apply</span>
                  </>
                )}
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
