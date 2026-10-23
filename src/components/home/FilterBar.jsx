import React from 'react';
import { SlidersHorizontal, ArrowUpDown, Check, X, Star, Clock, Sparkles } from 'lucide-react';

export default function FilterBar({
  filters,
  setFilters,
  sortBy,
  setSortBy,
  totalCount,
  onResetFilters
}) {
  const activeFiltersCount = 
    (filters.onlyVeg ? 1 : 0) +
    (filters.fastDelivery ? 1 : 0) +
    (filters.highRating ? 1 : 0) +
    (filters.priceRange ? 1 : 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200/80">
        
        {/* Left: Filter Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500 uppercase tracking-wider mr-1">
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Filters</span>
          </div>

          {/* Pure Veg Toggle */}
          <button
            type="button"
            onClick={() => setFilters(f => ({ ...f, onlyVeg: !f.onlyVeg }))}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all flex items-center gap-1.5 ${
              filters.onlyVeg
                ? 'bg-emerald-500 text-white border-emerald-500 shadow-sm shadow-emerald-500/30'
                : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-300" />
            <span>Pure Veg</span>
            {filters.onlyVeg && <Check className="w-3 h-3" />}
          </button>

          {/* Fast Delivery (<30 mins) */}
          <button
            type="button"
            onClick={() => setFilters(f => ({ ...f, fastDelivery: !f.fastDelivery }))}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all flex items-center gap-1.5 ${
              filters.fastDelivery
                ? 'bg-orange-500 text-white border-orange-500 shadow-sm shadow-orange-500/30'
                : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>Fast Delivery (&lt; 30m)</span>
            {filters.fastDelivery && <Check className="w-3 h-3" />}
          </button>

          {/* Rating 4.8+ */}
          <button
            type="button"
            onClick={() => setFilters(f => ({ ...f, highRating: !f.highRating }))}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all flex items-center gap-1.5 ${
              filters.highRating
                ? 'bg-amber-500 text-white border-amber-500 shadow-sm shadow-amber-500/30'
                : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
            }`}
          >
            <Star className="w-3.5 h-3.5 fill-current" />
            <span>Top Rated (4.8+)</span>
            {filters.highRating && <Check className="w-3 h-3" />}
          </button>

          {/* Price Range */}
          {['$$', '$$$'].map((pr) => {
            const isSelected = filters.priceRange === pr;
            return (
              <button
                key={pr}
                type="button"
                onClick={() => setFilters(f => ({ ...f, priceRange: isSelected ? null : pr }))}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                  isSelected
                    ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                }`}
              >
                {pr}
              </button>
            );
          })}

          {/* Reset Filters if active */}
          {activeFiltersCount > 0 && (
            <button
              type="button"
              onClick={onResetFilters}
              className="px-2.5 py-1.5 rounded-xl text-xs font-bold text-rose-500 hover:text-rose-600 hover:bg-rose-50 transition-colors flex items-center gap-1"
            >
              <X className="w-3.5 h-3.5" />
              <span>Clear ({activeFiltersCount})</span>
            </button>
          )}
        </div>

        {/* Right: Results Count & Sort By Dropdown */}
        <div className="flex items-center justify-between md:justify-end gap-3 text-xs">
          <span className="text-slate-500 font-semibold">
            <strong className="text-slate-900">{totalCount}</strong> kitchens nearby
          </span>

          <div className="flex items-center gap-1.5 bg-white border border-slate-200 rounded-xl px-3 py-1.5 shadow-2xs">
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent font-bold text-slate-800 text-xs focus:outline-none cursor-pointer"
            >
              <option value="recommended">Featured / Recommended</option>
              <option value="rating">Rating: High to Low</option>
              <option value="deliveryTime">Delivery Time: Fastest</option>
              <option value="costLow">Cost: Low to High</option>
              <option value="costHigh">Cost: High to Low</option>
            </select>
          </div>
        </div>

      </div>
    </div>
  );
}
