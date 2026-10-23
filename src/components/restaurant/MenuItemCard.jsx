import React from 'react';
import { Star, Plus, Minus, Flame, Sparkles } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export default function MenuItemCard({ item, restaurant, onOpenCustomization }) {
  const { cart, addToCart, updateQuantity } = useCart();

  // Find all cart entries for this dish
  const cartEntries = cart.filter(i => i.id === item.id);
  const totalQtyInCart = cartEntries.reduce((sum, i) => sum + i.quantity, 0);

  const handleAddClick = () => {
    if (item.customization) {
      onOpenCustomization(item, restaurant);
    } else {
      addToCart(item, null, restaurant);
    }
  };

  return (
    <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200/80 hover:border-slate-300 shadow-xs hover:shadow-lg transition-all flex flex-col-reverse sm:flex-row items-start justify-between gap-4 text-left">
      
      {/* Left Details */}
      <div className="flex-1 min-w-0">
        {/* Dietary & Bestseller tags */}
        <div className="flex items-center gap-2 mb-1.5">
          <span
            className={`w-3.5 h-3.5 rounded-xs border flex items-center justify-center shrink-0 ${
              item.isVeg ? 'border-emerald-600' : 'border-rose-600'
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                item.isVeg ? 'bg-emerald-600' : 'bg-rose-600'
              }`}
            />
          </span>

          {item.isBestseller && (
            <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-md flex items-center gap-1">
              <Sparkles className="w-2.5 h-2.5 fill-amber-600 text-amber-600" />
              Bestseller
            </span>
          )}

          {item.spicyLevel > 0 && (
            <span className="text-[10px] font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-md flex items-center gap-0.5">
              <Flame className="w-2.5 h-2.5 fill-rose-500 text-rose-500" />
              {item.spicyLevel === 3 ? 'Extra Spicy' : 'Spicy'}
            </span>
          )}
        </div>

        {/* Dish Name */}
        <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-1">
          {item.name}
        </h3>

        {/* Price & Rating */}
        <div className="flex items-center gap-3 mb-2">
          <span className="text-base font-black text-slate-900">
            ${item.price.toFixed(2)}
          </span>

          {item.rating && (
            <div className="flex items-center gap-1 text-xs font-semibold text-slate-600 bg-slate-50 px-2 py-0.5 rounded-md border border-slate-200/60">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              <span>{item.rating}</span>
              <span className="text-slate-400 font-normal">({item.ratingCount})</span>
            </div>
          )}

          {item.calories && (
            <span className="text-xs text-slate-400 font-medium">
              {item.calories}
            </span>
          )}
        </div>

        {/* Description */}
        <p className="text-xs text-slate-500 leading-relaxed max-w-xl">
          {item.description}
        </p>

        {/* Customization Hint */}
        {item.customization && (
          <div className="mt-2 text-[11px] font-semibold text-orange-600 flex items-center gap-1">
            <span>✨ Customizable options (Sizes & Toppings)</span>
          </div>
        )}
      </div>

      {/* Right Dish Thumbnail & Add Button */}
      <div className="relative shrink-0 w-full sm:w-36 flex flex-col items-center">
        <div className="w-full sm:w-36 h-32 sm:h-28 rounded-2xl overflow-hidden bg-slate-100 shadow-xs">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        </div>

        {/* Add Button overlapping thumbnail */}
        <div className="-mt-4 relative z-10">
          {totalQtyInCart > 0 && !item.customization ? (
            <div className="flex items-center gap-2 bg-white rounded-xl shadow-lg border border-slate-200 px-3 py-1.5">
              <button
                type="button"
                onClick={() => updateQuantity(cartEntries[0].cartItemId, cartEntries[0].quantity - 1)}
                className="w-5 h-5 flex items-center justify-center text-slate-600 hover:text-orange-600"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="text-xs font-bold text-slate-900 w-4 text-center">
                {totalQtyInCart}
              </span>
              <button
                type="button"
                onClick={() => updateQuantity(cartEntries[0].cartItemId, cartEntries[0].quantity + 1)}
                className="w-5 h-5 flex items-center justify-center text-slate-600 hover:text-orange-600"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={handleAddClick}
              className="px-5 py-2 rounded-xl bg-white hover:bg-orange-500 text-orange-600 hover:text-white border border-orange-200 hover:border-orange-500 shadow-md transition-all font-black text-xs flex items-center gap-1.5 uppercase tracking-wider group cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5 text-orange-600 group-hover:text-white transition-colors" />
              <span>{totalQtyInCart > 0 ? `Add (${totalQtyInCart})` : 'Add'}</span>
            </button>
          )}

          {item.customization && (
            <span className="block text-center text-[10px] text-slate-400 mt-1 font-medium">
              customisable
            </span>
          )}
        </div>

      </div>

    </div>
  );
}
