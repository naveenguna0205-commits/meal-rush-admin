import React, { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import RestaurantHeader from '../components/restaurant/RestaurantHeader';
import MenuCategoryNav from '../components/restaurant/MenuCategoryNav';
import MenuItemCard from '../components/restaurant/MenuItemCard';
import CustomizationModal from '../components/restaurant/CustomizationModal';
import { RESTAURANTS } from '../data/restaurants';
import { useCart } from '../context/CartContext';
import { ArrowLeft, SearchX } from 'lucide-react';

export default function RestaurantPage() {
  const { id } = useParams();
  const { addToCart } = useCart();

  const restaurant = RESTAURANTS.find(r => r.id === id) || RESTAURANTS[0];

  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isVegOnly, setIsVegOnly] = useState(false);

  // Customization modal state
  const [customizationState, setCustomizationState] = useState({
    isOpen: false,
    item: null,
  });

  const handleOpenCustomization = (dish) => {
    setCustomizationState({
      isOpen: true,
      item: dish,
    });
  };

  const handleCloseCustomization = () => {
    setCustomizationState({
      isOpen: false,
      item: null,
    });
  };

  const handleConfirmCustomization = (item, customization, rest, quantity) => {
    addToCart(item, customization, restaurant, quantity);
  };

  // Filter menu items
  const filteredCategories = useMemo(() => {
    if (!restaurant?.menuCategories) return [];

    return restaurant.menuCategories.map(cat => {
      let items = cat.items;

      // Filter by category tab
      if (activeCategory !== 'all' && cat.id !== activeCategory) {
        return null;
      }

      // Filter by search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        items = items.filter(i => 
          i.name.toLowerCase().includes(q) || 
          i.description.toLowerCase().includes(q)
        );
      }

      // Filter by veg only
      if (isVegOnly) {
        items = items.filter(i => i.isVeg);
      }

      return {
        ...cat,
        items,
      };
    }).filter(Boolean).filter(cat => cat.items.length > 0);
  }, [restaurant, activeCategory, searchQuery, isVegOnly]);

  if (!restaurant) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-2xl font-black text-slate-900 mb-2">Restaurant not found</h2>
        <p className="text-sm text-slate-500 mb-6">The restaurant you are looking for does not exist or has closed.</p>
        <Link to="/" className="px-5 py-2.5 rounded-xl bg-orange-600 text-white font-bold text-xs">
          Back to Restaurants
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-20">
      {/* Restaurant Header */}
      <RestaurantHeader restaurant={restaurant} />

      {/* Category Nav and Filters */}
      <MenuCategoryNav
        categories={restaurant.menuCategories}
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        isVegOnly={isVegOnly}
        setIsVegOnly={setIsVegOnly}
      />

      {/* Menu Categories & Items List */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {filteredCategories.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/80 max-w-md mx-auto my-8">
            <div className="w-16 h-16 rounded-2xl bg-orange-50 text-orange-500 flex items-center justify-center mx-auto mb-3">
              <SearchX className="w-8 h-8" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-1">
              No matching dishes found
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Try searching with another keyword or resetting the veg filter.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setIsVegOnly(false);
                setActiveCategory('all');
              }}
              className="px-4 py-2 rounded-xl bg-orange-600 text-white text-xs font-bold"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          filteredCategories.map((cat) => (
            <section key={cat.id} id={cat.id} className="scroll-mt-36 text-left">
              <div className="flex items-center gap-3 mb-4">
                <h2 className="text-xl font-black text-slate-900 tracking-tight">
                  {cat.name}
                </h2>
                <span className="text-xs font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md">
                  {cat.items.length} items
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {cat.items.map((dish) => (
                  <MenuItemCard
                    key={dish.id}
                    item={dish}
                    restaurant={restaurant}
                    onOpenCustomization={handleOpenCustomization}
                  />
                ))}
              </div>
            </section>
          ))
        )}
      </main>

      {/* Customization Modal */}
      <CustomizationModal
        isOpen={customizationState.isOpen}
        onClose={handleCloseCustomization}
        item={customizationState.item}
        restaurant={restaurant}
        onConfirm={handleConfirmCustomization}
      />
    </div>
  );
}
