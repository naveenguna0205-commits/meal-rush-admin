import React from 'react';
import { motion } from 'framer-motion';
import { CATEGORIES } from '../../data/categories';

export default function CategorySlider({ selectedCategory, onSelectCategory }) {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Explore By Cuisine
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            Handcrafted flavors curated by city gourmands
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3 overflow-x-auto pb-4 no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
        {CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          return (
            <motion.button
              key={cat.id}
              whileTap={{ scale: 0.95 }}
              onClick={() => onSelectCategory(cat.id)}
              className={`flex items-center gap-3 px-4 py-3 rounded-2xl border transition-all shrink-0 cursor-pointer ${
                isSelected
                  ? 'bg-orange-500 text-white border-orange-500 shadow-lg shadow-orange-500/25 ring-2 ring-orange-400/30'
                  : 'bg-white text-slate-700 border-slate-200/80 hover:border-slate-300 hover:bg-slate-50 shadow-xs'
              }`}
            >
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0 ${
                  isSelected ? 'bg-white/20' : 'bg-slate-100'
                }`}
              >
                {cat.icon}
              </div>
              <div className="text-left">
                <div className={`text-xs font-bold leading-tight ${isSelected ? 'text-white' : 'text-slate-900'}`}>
                  {cat.name}
                </div>
                <div className={`text-[10px] font-medium ${isSelected ? 'text-orange-100' : 'text-slate-400'}`}>
                  {cat.count} spots
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>
    </section>
  );
}
