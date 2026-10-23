import React, { useState, useMemo } from 'react';
import HeroBanner from '../components/home/HeroBanner';
import CategorySlider from '../components/home/CategorySlider';
import PromoOffers from '../components/home/PromoOffers';
import FilterBar from '../components/home/FilterBar';
import RestaurantCard from '../components/home/RestaurantCard';
import FeaturedDishes from '../components/home/FeaturedDishes';
import CustomizationModal from '../components/restaurant/CustomizationModal';
import { RESTAURANTS } from '../data/restaurants';
import { useCart } from '../context/CartContext';
import { Utensils, SearchX } from 'lucide-react';

export default function HomePage() {
  const { addToCart } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const [filters, setFilters] = useState({
    onlyVeg: false,
    fastDelivery: false,
    highRating: false,
    priceRange: null,
  });

  const [sortBy, setSortBy] = useState('recommended');

  // Customization modal state
  const [customizationState, setCustomizationState] = useState({
    isOpen: false,
    item: null,
    restaurant: null,
  });

  const handleOpenCustomization = (dish, restaurant) => {
    setCustomizationState({
      isOpen: true,
      item: dish,
      restaurant: restaurant,
    });
  };

  const handleCloseCustomization = () => {
    setCustomizationState({
      isOpen: false,
      item: null,
      restaurant: null,
    });
  };

  const handleConfirmCustomization = (item, customization, restaurant, quantity) => {
    addToCart(item, customization, restaurant, quantity);
  };

  const handleResetFilters = () => {
    setFilters({
      onlyVeg: false,
      fastDelivery: false,
      highRating: false,
      priceRange: null,
    });
    setSelectedCategory('all');
    setSearchQuery('');
    setSortBy('recommended');
  };

  // Filter and sort restaurants
  const filteredRestaurants = useMemo(() => {
    let result = [...RESTAURANTS];

    // 1. Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(r => {
        const matchesName = r.name.toLowerCase().includes(q);
        const matchesCuisine = r.cuisine.some(c => c.toLowerCase().includes(q));
        const matchesTagline = r.tagline.toLowerCase().includes(q);
        const matchesDishes = r.menuCategories.some(mc => 
          mc.items.some(i => i.name.toLowerCase().includes(q) || i.description.toLowerCase().includes(q))
        );
        return matchesName || matchesCuisine || matchesTagline || matchesDishes;
      });
    }

    // 2. Category Selection
    if (selectedCategory && selectedCategory !== 'all') {
      result = result.filter(r => r.categoryIds.includes(selectedCategory));
    }

    // 3. Pure Veg Filter
    if (filters.onlyVeg) {
      result = result.filter(r => r.isPureVeg);
    }

    // 4. Fast Delivery (< 30 min)
    if (filters.fastDelivery) {
      result = result.filter(r => (r.deliveryMinutes || 30) <= 25);
    }

    // 5. High Rating (4.8+)
    if (filters.highRating) {
      result = result.filter(r => r.rating >= 4.8);
    }

    // 6. Price Range
    if (filters.priceRange) {
      result = result.filter(r => r.priceRange === filters.priceRange);
    }

    // 7. Sort
    if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'deliveryTime') {
      result.sort((a, b) => (a.deliveryMinutes || 30) - (b.deliveryMinutes || 30));
    } else if (sortBy === 'costLow') {
      result.sort((a, b) => parseInt(a.priceForTwo.replace(/\D/g, '')) - parseInt(b.priceForTwo.replace(/\D/g, '')));
    } else if (sortBy === 'costHigh') {
      result.sort((a, b) => parseInt(b.priceForTwo.replace(/\D/g, '')) - parseInt(a.priceForTwo.replace(/\D/g, '')));
    } else {
      // Recommended: Promoted first, then rating
      result.sort((a, b) => (b.isPromoted ? 1 : 0) - (a.isPromoted ? 1 : 0) || b.rating - a.rating);
    }

    return result;
  }, [searchQuery, selectedCategory, filters, sortBy]);

  return (
    <div className="min-h-screen pb-16">
      {/* Hero Banner */}
      <HeroBanner
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onSearchSubmit={() => {
          document.getElementById('restaurant-list-section')?.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Cuisine Categories Slider */}
      <CategorySlider
        selectedCategory={selectedCategory}
        onSelectCategory={(catId) => {
          setSelectedCategory(catId);
          document.getElementById('restaurant-list-section')?.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Featured Bestseller Dishes Rail */}
      <FeaturedDishes onOpenCustomization={handleOpenCustomization} />

      {/* Special Promo Deals & Vouchers */}
      <PromoOffers />

      {/* Filter and Sort Toolbar */}
      <div id="restaurant-list-section" className="scroll-mt-24">
        <FilterBar
          filters={filters}
          setFilters={setFilters}
          sortBy={sortBy}
          setSortBy={setSortBy}
          totalCount={filteredRestaurants.length}
          onResetFilters={handleResetFilters}
        />
      </div>

      {/* Restaurants Grid Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {filteredRestaurants.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/80 max-w-lg mx-auto shadow-sm my-8">
            <div className="w-20 h-20 rounded-3xl bg-orange-50 flex items-center justify-center text-orange-500 mx-auto mb-4">
              <SearchX className="w-10 h-10" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-1">
              No matching restaurants found
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              We couldn't find any spots matching your current filters or search term. Try resetting your filters to see all kitchens.
            </p>
            <button
              type="button"
              onClick={handleResetFilters}
              className="px-5 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
            {filteredRestaurants.map((restaurant) => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))}
          </div>
        )}
      </section>

      {/* Customization Modal */}
      <CustomizationModal
        isOpen={customizationState.isOpen}
        onClose={handleCloseCustomization}
        item={customizationState.item}
        restaurant={customizationState.restaurant}
        onConfirm={handleConfirmCustomization}
      />
    </div>
  );
}
