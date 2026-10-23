import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, MessageSquare, Star, ShieldCheck, Bike, Navigation, MapPin, X } from 'lucide-react';

export default function LiveDriverMap({ order }) {
  const [callModalOpen, setCallModalOpen] = useState(false);
  const rider = order.deliveryRider || {
    name: 'Marcus Vance',
    rating: 4.95,
    phone: '+1 (555) 782-9901',
    vehicle: 'Electric Superbike',
    plate: 'CA-EBIKE-9',
  };

  const step = order.statusStep ?? 0;
  // Rider map progress: 0: 5%, 1: 20%, 2: 50%, 3: 80%, 4: 100%
  const progressMap = [5, 25, 55, 85, 100];
  const currentProgress = progressMap[Math.min(4, Math.max(0, step))];

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-xs text-left overflow-hidden">
      <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl bg-sky-500/10 text-sky-600 flex items-center justify-center font-bold">
            <Navigation className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-black text-slate-900">Live Courier Tracking</h3>
            <p className="text-xs text-slate-500">Real-time GPS delivery coordinates</p>
          </div>
        </div>

        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-xl border border-emerald-200">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          GPS Active
        </span>
      </div>

      {/* Stylized Vector Map Canvas */}
      <div className="relative h-60 sm:h-72 w-full rounded-2xl bg-slate-900 overflow-hidden border border-slate-800 shadow-inner flex items-center justify-center">
        {/* Background Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `radial-gradient(#38bdf8 1px, transparent 1px), radial-gradient(#38bdf8 1px, #0f172a 1px)`,
            backgroundSize: '24px 24px',
            backgroundPosition: '0 0, 12px 12px',
          }}
        />

        {/* Simulated Road Paths */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
          {/* Main Highway Curve */}
          <path
            d="M 50 180 Q 180 80 320 150 T 600 90"
            fill="none"
            stroke="#334155"
            strokeWidth="8"
            strokeLinecap="round"
          />
          {/* Active Progress Glowing Path */}
          <motion.path
            d="M 50 180 Q 180 80 320 150 T 600 90"
            fill="none"
            stroke="#e23744"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray="400"
            animate={{ strokeDashoffset: 400 - (400 * (currentProgress / 100)) }}
            transition={{ duration: 1, ease: 'easeOut' }}
          />
        </svg>

        {/* Origin: Restaurant Pin */}
        <div className="absolute left-8 bottom-12 flex flex-col items-center">
          <div className="w-10 h-10 rounded-2xl bg-orange-500 text-white flex items-center justify-center shadow-lg shadow-orange-500/50 border-2 border-white">
            <span className="text-base">🍳</span>
          </div>
          <span className="text-[10px] font-bold text-white bg-slate-900/90 px-2 py-0.5 rounded-md mt-1 border border-slate-700">
            {order.restaurantName?.split(' ')[0] || 'Kitchen'}
          </span>
        </div>

        {/* Moving Delivery Rider Bike */}
        <motion.div
          animate={{
            left: `${Math.min(85, Math.max(10, currentProgress))}%`,
            top: `${currentProgress < 50 ? 55 - (currentProgress * 0.4) : 40 + ((currentProgress - 50) * 0.3)}%`,
          }}
          transition={{ duration: 1.2, type: 'spring' }}
          className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-20"
        >
          <div className="relative">
            <div className="w-11 h-11 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-xl shadow-emerald-500/50 border-2 border-white">
              <Bike className="w-5 h-5 animate-bounce" />
            </div>
            <div className="absolute -inset-1 rounded-full bg-emerald-400 opacity-40 animate-ping -z-10" />
          </div>
          <span className="text-[10px] font-black text-emerald-300 bg-slate-900/95 px-2 py-0.5 rounded-md mt-1 border border-emerald-500/30 whitespace-nowrap shadow-md">
            Marcus (Courier)
          </span>
        </motion.div>

        {/* Destination: Customer Home Pin */}
        <div className="absolute right-8 top-12 flex flex-col items-center">
          <div className="w-10 h-10 rounded-2xl bg-sky-500 text-white flex items-center justify-center shadow-lg shadow-sky-500/50 border-2 border-white">
            <MapPin className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-bold text-white bg-slate-900/90 px-2 py-0.5 rounded-md mt-1 border border-slate-700">
            Your Home
          </span>
        </div>

        {/* Map Overlay Info Label */}
        <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-700 text-[11px] text-slate-300 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
          <span>Rider speed: 28 km/h • High precision</span>
        </div>
      </div>

      {/* Driver Card Info */}
      <div className="mt-4 p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3.5 w-full sm:w-auto">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-slate-900 to-slate-700 text-white font-black flex items-center justify-center text-lg shadow-md shrink-0">
            MV
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-bold text-slate-900">{rider.name}</h4>
              <div className="flex items-center gap-1 text-[11px] font-bold text-amber-600 bg-amber-50 px-1.5 py-0.2 rounded border border-amber-200">
                <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                <span>{rider.rating}</span>
              </div>
            </div>

            <p className="text-xs text-slate-500 mt-0.5">
              {rider.vehicle} • {rider.plate}
            </p>
          </div>
        </div>

        {/* Contact buttons */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            type="button"
            onClick={() => setCallModalOpen(true)}
            className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold transition-all shadow-md flex items-center justify-center gap-1.5 active:scale-95 cursor-pointer"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>Call Driver</span>
          </button>

          <button
            type="button"
            onClick={() => setCallModalOpen(true)}
            className="px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 text-xs font-bold transition-colors flex items-center justify-center"
            title="Chat message"
          >
            <MessageSquare className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Simulated Phone Call Modal */}
      {callModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full text-center shadow-2xl border border-slate-100">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4 animate-pulse">
              <Phone className="w-8 h-8" />
            </div>

            <h3 className="text-lg font-bold text-slate-900 mb-1">
              Calling {rider.name}...
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              Number Masked for Privacy: {rider.phone}
            </p>

            <button
              type="button"
              onClick={() => setCallModalOpen(false)}
              className="w-full py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition-colors"
            >
              End Call
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
