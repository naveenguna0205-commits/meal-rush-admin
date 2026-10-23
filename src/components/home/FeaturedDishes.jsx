import React from 'react';
import { motion } from 'framer-motion';
import { Flame, Plus, Star, Sparkles } from 'lucide-react';
import { RESTAURANTS } from '../../data/restaurants';
import { useCart } from '../../context/CartContext';

export default function FeaturedDishes({ onOpenCustomization }) {
  const { addToCart } = useCart();

  // Extract top bestsellers from key restaurants
  const featured = [
    {
      ...RESTAURANTS[0].menuCategories[0].items[0],
      restaurant: RESTAURANTS[0],
    },
    {
      ...RESTAURANTS[1].menuCategories[0].items[0],
      restaurant: RESTAURANTS[1],
    },
    {
      ...RESTAURANTS[2].menuCategories[0].items[0],
      restaurant: RESTAURANTS[2],
    },
    {
      ...RESTAURANTS[3].menuCategories[0].items[0],
      restaurant: RESTAURANTS[3],
    },
  ];

  const handleDishClick = (dish) => {
    if (dish.customization) {
      onOpenCustomization(dish, dish.restaurant);
    } else {
      addToCart(dish, null, dish.restaurant);
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-rose-600 mb-1">
            <Flame className="w-3.5 h-3.5 fill-current" />
            <span>Trending Right Now</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Chef's Signature Craves
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {featured.map((dish) => (
          <div
            key={dish.id}
            className="group bg-white rounded-3xl p-3.5 border border-slate-200/80 hover:border-slate-300 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between text-left"
          >
            <div>
              <div className="relative h-40 w-full rounded-2xl overflow-hidden bg-slate-100 mb-3">
                <img
                  src={dish.image}
                  alt={dish.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-2.5 left-2.5 bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-2 py-0.5 rounded-lg flex items-center gap-1">
                  <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                  <span>{dish.rating}</span>
                </div>

                <div className="absolute bottom-2.5 left-2.5 bg-white/90 backdrop-blur-md text-slate-900 text-[10px] font-semibold px-2 py-0.5 rounded-lg truncate max-w-[170px]">
                  {dish.restaurant.name}
                </div>
              </div>

              <div className="flex items-center gap-1.5 mb-1">
                <span
                  className={`w-3 h-3 rounded-xs border flex items-center justify-center shrink-0 ${
                    dish.isVeg ? 'border-emerald-600' : 'border-rose-600'
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      dish.isVeg ? 'bg-emerald-600' : 'bg-rose-600'
                    }`}
                  />
                </span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  {dish.isVeg ? 'Pure Veg' : 'Non-Veg'}
                </span>
              </div>

              <h4 className="text-sm font-bold text-slate-900 line-clamp-1 mb-1">
                {dish.name}
              </h4>
              <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-3">
                {dish.description}
              </p>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-400 font-medium block">Price</span>
                <span className="text-sm font-black text-slate-900">
                  ${dish.price.toFixed(2)}
                </span>
              </div>

              <button
                type="button"
                onClick={() => handleDishClick(dish)}
                className="px-3 py-1.5 rounded-xl bg-orange-50 hover:bg-orange-500 text-orange-600 hover:text-white border border-orange-200 hover:border-orange-500 text-xs font-bold transition-all flex items-center gap-1 shadow-2xs"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>{dish.customization ? 'Customize' : 'Add'}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
