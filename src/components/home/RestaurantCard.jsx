import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, Clock, Bike, Heart, Sparkles, Tag } from 'lucide-react';

export default function RestaurantCard({ restaurant }) {
  const [isFavorite, setIsFavorite] = useState(() => {
    try {
      const favs = JSON.parse(localStorage.getItem('cravingo_favorites') || '[]');
      return favs.includes(restaurant.id);
    } catch {
      return false;
    }
  });

  const toggleFavorite = (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      const favs = JSON.parse(localStorage.getItem('cravingo_favorites') || '[]');
      let updated;
      if (favs.includes(restaurant.id)) {
        updated = favs.filter(id => id !== restaurant.id);
        setIsFavorite(false);
      } else {
        updated = [...favs, restaurant.id];
        setIsFavorite(true);
      }
      localStorage.setItem('cravingo_favorites', JSON.stringify(updated));
    } catch (err) {
      console.warn('Favorite toggle error', err);
    }
  };

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', damping: 20, stiffness: 300 }}
      className="group bg-white rounded-3xl overflow-hidden border border-slate-200/80 hover:border-slate-300 shadow-xs hover:shadow-xl transition-all flex flex-col h-full text-left"
    >
      <Link to={`/restaurant/${restaurant.id}`} className="block relative">
        {/* Restaurant Banner Image */}
        <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-slate-100">
          <img
            src={restaurant.bannerImage}
            alt={restaurant.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-black/20" />

          {/* Top Badges */}
          <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between">
            {restaurant.featuredBadge ? (
              <span className="px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-white text-[11px] font-bold tracking-wide border border-white/20 flex items-center gap-1.5 shadow-sm">
                <Sparkles className="w-3 h-3 text-amber-400" />
                {restaurant.featuredBadge}
              </span>
            ) : <span />}

            <button
              type="button"
              onClick={toggleFavorite}
              className={`w-9 h-9 rounded-full backdrop-blur-md flex items-center justify-center transition-all ${
                isFavorite
                  ? 'bg-rose-500 text-white shadow-md'
                  : 'bg-white/80 text-slate-700 hover:bg-white hover:text-rose-500'
              }`}
              aria-label="Save to favorites"
            >
              <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
            </button>
          </div>

          {/* Active Discount Overlay Bar */}
          {restaurant.activeOffer && (
            <div className="absolute bottom-3 left-3.5 right-3.5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-orange-600/95 backdrop-blur-sm text-white text-xs font-black shadow-md border border-orange-400/40">
                <Tag className="w-3.5 h-3.5" />
                {restaurant.activeOffer}
              </span>
            </div>
          )}
        </div>
      </Link>

      {/* Card Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Title & Rating */}
          <div className="flex items-start justify-between gap-2 mb-3.5">
            <Link
              to={`/restaurant/${restaurant.id}`}
              className="text-base sm:text-lg font-black text-slate-900 hover:text-orange-600 transition-colors line-clamp-1"
            >
              {restaurant.name}
            </Link>

            <div className="flex items-center gap-1 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-lg text-emerald-800 text-xs font-bold shrink-0">
              <Star className="w-3 h-3 fill-emerald-600 text-emerald-600" />
              <span>{restaurant.rating}</span>
              <span className="text-[10px] text-emerald-600/80 font-normal">
                ({restaurant.reviewsCount > 999 ? `${(restaurant.reviewsCount/1000).toFixed(1)}k` : restaurant.reviewsCount})
              </span>
            </div>
          </div>

          {/* Tagline / Subtitle */}
          <p className="text-xs text-slate-500 line-clamp-1 mb-3">
            {restaurant.tagline}
          </p>

          {/* Cuisines Tags */}
          <div className="flex flex-wrap items-center gap-1.5 mb-4">
            {restaurant.isPureVeg && (
              <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-md">
                Pure Veg
              </span>
            )}
            {restaurant.cuisine.slice(0, 3).map((c) => (
              <span
                key={c}
                className="text-[10px] font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md"
              >
                {c}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom Details Bar */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium">
          <div className="flex items-center gap-1.5 text-slate-800 font-semibold">
            <Clock className="w-3.5 h-3.5 text-orange-500" />
            <span>{restaurant.deliveryTime}</span>
          </div>

          <span className="text-slate-300">•</span>

          <div className="flex items-center gap-1">
            <Bike className="w-3.5 h-3.5 text-slate-400" />
            <span>{restaurant.distance}</span>
          </div>

          <span className="text-slate-300">•</span>

          <div className="font-semibold text-slate-800">
            {restaurant.priceForTwo}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
