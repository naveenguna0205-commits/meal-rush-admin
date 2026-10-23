import React from 'react';
import { Clock, Zap, Calendar, Sparkles } from 'lucide-react';

export default function DeliverySlotPicker({ selectedSlot, setSelectedSlot, priorityFee = 1.99 }) {
  const slots = [
    {
      id: 'standard',
      title: 'Standard Delivery',
      time: '25-35 mins',
      price: 'Free / Standard',
      icon: Clock,
      badge: 'Most Popular',
      color: 'border-slate-200',
    },
    {
      id: 'priority',
      title: 'Priority Direct Express',
      time: '15-20 mins',
      price: `+$${priorityFee.toFixed(2)}`,
      icon: Zap,
      badge: '⚡ Direct Rider',
      color: 'border-amber-300',
    },
    {
      id: 'scheduled',
      title: 'Schedule for Later',
      time: 'Select specific time slot',
      price: 'Free',
      icon: Calendar,
      badge: 'Pre-order',
      color: 'border-slate-200',
    },
  ];

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-xs text-left">
      <div className="flex items-center gap-2.5 mb-6 pb-4 border-b border-slate-100">
        <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center font-bold">
          <Clock className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-lg font-black text-slate-900">2. Delivery Speed & Time</h2>
          <p className="text-xs text-slate-500">Choose when you want your food to arrive</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {slots.map((slot) => {
          const Icon = slot.icon;
          const isSelected = selectedSlot.id === slot.id;
          return (
            <div
              key={slot.id}
              onClick={() => setSelectedSlot(slot)}
              className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex flex-col justify-between ${
                isSelected
                  ? 'border-orange-500 bg-orange-50/50 shadow-md ring-2 ring-orange-400/20'
                  : 'border-slate-200 hover:border-slate-300 bg-white'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div
                    className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                      isSelected ? 'bg-orange-500 text-white' : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      isSelected
                        ? 'bg-orange-200/60 text-orange-900'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {slot.badge}
                  </span>
                </div>

                <h4 className="text-sm font-bold text-slate-900">{slot.title}</h4>
                <p className="text-xs text-slate-500 mt-0.5">{slot.time}</p>
              </div>

              <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-400 font-medium">Extra Fee</span>
                <span className={`font-bold ${isSelected ? 'text-orange-600' : 'text-slate-800'}`}>
                  {slot.price}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
