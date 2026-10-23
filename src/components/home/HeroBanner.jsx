import React from 'react';
import { motion } from 'framer-motion';
import { Search, Sparkles, Clock, Flame, ShieldCheck, ArrowRight, Star } from 'lucide-react';
import heroBurger from '../../assets/img/hero-burger.jpg';

export default function HeroBanner({ searchQuery, setSearchQuery, onSearchSubmit }) {
  const popularKeywords = ['Smash Burger', 'Wood-Fired Pizza', 'Sushi Roll', 'Dum Biryani', 'Tacos', 'Healthy Bowl'];

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-red-600 via-rose-600 to-red-900 text-white rounded-3xl mx-3 sm:mx-6 lg:mx-8 my-4 sm:my-6 p-5 sm:p-10 lg:p-12 shadow-2xl shadow-red-500/20">
      {/* Background Decorative Blobs */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-amber-400/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
        
        {/* Left Column: Text & Search Content */}
        <div className="lg:col-span-7 text-left">
          {/* Top announcement pill */}
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-[11px] sm:text-xs font-semibold tracking-wide uppercase mb-4 sm:mb-5"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin" style={{ animationDuration: '6s' }} />
            <span>Cravingo Express • Fast 25-Min Delivery</span>
          </motion.div>

          {/* Hero Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight mb-3 sm:mb-4"
          >
            Feast Your Senses. <br />
            <span className="text-amber-300 drop-shadow-sm">Delivered In Minutes.</span>
          </motion.h1>

          {/* Hero Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-white/90 text-sm sm:text-base max-w-xl font-normal leading-relaxed mb-6"
          >
            Order handcrafted smash burgers, artisan Neapolitan pizzas, royal claypot biryani, and Michelin-worthy sushi with live GPS tracking.
          </motion.p>

          {/* Interactive Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl p-2 shadow-2xl flex flex-col sm:flex-row items-center gap-2 max-w-xl border border-white/30"
          >
            <div className="flex items-center gap-3 w-full px-3 py-2">
              <Search className="w-5 h-5 text-orange-500 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for restaurants, dishes, or cuisines (e.g., Truffle, Pizza, Ramen)..."
                className="w-full text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none font-medium bg-transparent"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="text-xs font-bold text-slate-400 hover:text-slate-600 px-1 cursor-pointer"
                >
                  Clear
                </button>
              )}
            </div>

            <button
              type="button"
              onClick={onSearchSubmit}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 shadow-md shadow-orange-600/30 shrink-0 cursor-pointer"
            >
              <span>Explore</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>

          {/* Popular Search Shortcuts */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap items-center gap-2 mt-4 text-xs"
          >
            <span className="text-white/70 font-medium">Quick search:</span>
            {popularKeywords.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => setSearchQuery(tag)}
                className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white font-medium backdrop-blur-xs border border-white/15 transition-all text-[11px] cursor-pointer"
              >
                {tag}
              </button>
            ))}
          </motion.div>

          {/* Highlight Stats Badges */}
          <div className="grid grid-cols-3 gap-2 sm:gap-4 pt-5 sm:pt-6 mt-5 sm:mt-6 border-t border-white/15 max-w-lg">
            <div>
              <div className="text-base sm:text-2xl font-black text-amber-300">25 min</div>
              <div className="text-[10px] sm:text-xs text-white/80 font-medium leading-tight">Avg delivery</div>
            </div>
            <div>
              <div className="text-base sm:text-2xl font-black text-amber-300">4.9 ★</div>
              <div className="text-[10px] sm:text-xs text-white/80 font-medium leading-tight">10k+ reviews</div>
            </div>
            <div>
              <div className="text-base sm:text-2xl font-black text-amber-300">50% Off</div>
              <div className="text-[10px] sm:text-xs text-white/80 font-medium leading-tight">Code FEAST50</div>
            </div>
          </div>
        </div>

        {/* Right Column: Hero Burger Image Showcase */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative w-full max-w-sm sm:max-w-md"
          >
            {/* Outer Glow Ring */}
            <div className="absolute -inset-2 bg-gradient-to-r from-amber-400 to-orange-400 rounded-3xl blur-xl opacity-30 animate-pulse pointer-events-none" />

            {/* Floating Burger Card */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="relative rounded-3xl overflow-hidden border-2 border-white/30 shadow-2xl bg-slate-950/20 backdrop-blur-xs group"
            >
              <img
                src={heroBurger}
                alt="Gourmet Smash Cheeseburger"
                className="w-full h-64 sm:h-96 object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />

              {/* Gradient Scrim for contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/20" />

              {/* Top Floating Rating Badge */}
              <div className="absolute top-3.5 left-3.5 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-white text-xs font-bold flex items-center gap-1.5 border border-white/20 shadow-lg">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>4.9 (1.2k+ reviews)</span>
              </div>

              {/* Top Right Special Pill */}
              <div className="absolute top-3.5 right-3.5 bg-orange-600/90 backdrop-blur-md px-3 py-1 rounded-full text-white text-[11px] font-black uppercase tracking-wider border border-white/20 shadow-lg">
                🔥 Bestseller
              </div>

              {/* Bottom Floating Info Pill */}
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md text-slate-900 p-3.5 rounded-2xl shadow-xl border border-white/40 flex items-center justify-between">
                <div>
                  <div className="text-xs sm:text-sm font-black text-slate-900 leading-tight">
                    Double Bacon Smash Burger
                  </div>
                  <div className="text-[11px] text-orange-600 font-bold mt-0.5">
                    Handcrafted • 100% Angus Beef
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 block font-medium">Starting at</span>
                  <span className="text-base font-black text-slate-900 leading-none">$13.99</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
