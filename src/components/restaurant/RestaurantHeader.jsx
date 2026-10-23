import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Star, Clock, Bike, MapPin, Tag, ShieldCheck, Heart } from 'lucide-react';

export default function RestaurantHeader({ restaurant }) {
  return (
    <div className="relative">
      {/* Cover Banner */}
      <div className="relative h-64 sm:h-80 w-full overflow-hidden bg-slate-900">
        <img
          src={restaurant.bannerImage}
          alt={restaurant.name}
          className="w-full h-full object-cover opacity-85"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

        {/* Back Button */}
        <div className="absolute top-6 left-4 sm:left-8 z-10">
          <Link
            to="/"
            className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/90 hover:bg-white text-slate-900 text-xs font-bold backdrop-blur-md shadow-lg transition-all hover:scale-105"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>All Restaurants</span>
          </Link>
        </div>
      </div>

      {/* Info Card Overlay */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 sm:-mt-28 relative z-20">
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-6 text-left">
          
          <div className="flex items-start gap-4 sm:gap-6">
            <img
              src={restaurant.logo}
              alt={restaurant.name}
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover border-2 border-white shadow-md shrink-0"
            />

            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1.5">
                <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  {restaurant.name}
                </h1>
                {restaurant.isPureVeg && (
                  <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-md uppercase">
                    Pure Veg
                  </span>
                )}
              </div>

              <p className="text-xs sm:text-sm text-slate-500 font-medium max-w-xl mb-3">
                {restaurant.tagline}
              </p>

              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600 font-medium">
                <div className="flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-xl text-emerald-800 font-bold">
                  <Star className="w-3.5 h-3.5 fill-emerald-600 text-emerald-600" />
                  <span>{restaurant.rating}</span>
                  <span className="text-slate-400 font-normal">
                    ({restaurant.reviewsCount.toLocaleString()} ratings)
                  </span>
                </div>

                <div className="flex items-center gap-1.5 text-slate-700 font-semibold">
                  <Clock className="w-3.5 h-3.5 text-orange-500" />
                  <span>{restaurant.deliveryTime}</span>
                </div>

                <div className="flex items-center gap-1.5 text-slate-700">
                  <Bike className="w-3.5 h-3.5 text-slate-400" />
                  <span>{restaurant.distance}</span>
                </div>

                <div className="flex items-center gap-1.5 text-slate-500">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span>{restaurant.address}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Active Promo Box */}
          {restaurant.activeOffer && (
            <div className="shrink-0 md:max-w-xs w-full bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-4 border border-orange-200/80 flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-orange-500 text-white flex items-center justify-center shrink-0 shadow-sm">
                <Tag className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-orange-600">
                  Exclusive Kitchen Offer
                </div>
                <div className="text-xs font-black text-slate-900 mt-0.5">
                  {restaurant.activeOffer}
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5">
                  Use coupon at checkout to save instantly.
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
