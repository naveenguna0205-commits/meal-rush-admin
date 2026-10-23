import React from 'react';
import { motion } from 'framer-motion';
import { 
  CheckCircle2, 
  ChefHat, 
  Bike, 
  MapPin, 
  PartyPopper, 
  FastForward, 
  XCircle, 
  Clock, 
  AlertTriangle 
} from 'lucide-react';
import { ORDER_STAGES } from '../../context/OrderContext';

export default function OrderStatusTimeline({ order, onProgressStage, onSetStepDirect, onCancelOrder }) {
  if (!order) return null;

  const currentStep = order.statusStep ?? 0;
  const isCancelled = order.status === 'Cancelled' || currentStep === -1;

  const stageIcons = [
    CheckCircle2,
    ChefHat,
    Bike,
    MapPin,
    PartyPopper,
  ];

  const currentStageInfo = ORDER_STAGES[currentStep] || ORDER_STAGES[0];

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs text-left">
      
      {/* Top Status Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-6 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-mono text-xs font-bold text-orange-600 bg-orange-50 px-2.5 py-0.5 rounded-lg border border-orange-200">
              {order.id}
            </span>
            <span className="text-xs text-slate-400">
              Placed at {new Date(order.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>

          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            {isCancelled ? 'Order Cancelled' : currentStageInfo.title}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            {isCancelled ? 'This order was cancelled.' : currentStageInfo.description}
          </p>
        </div>

        {/* Live Countdown Badge */}
        {!isCancelled && currentStep < 4 && (
          <div className="flex items-center gap-3 bg-gradient-to-r from-orange-500 to-red-600 text-white px-4 py-2.5 rounded-2xl shadow-md shrink-0">
            <Clock className="w-5 h-5 animate-spin" style={{ animationDuration: '8s' }} />
            <div>
              <div className="text-[10px] uppercase font-bold text-orange-100">Estimated Arrival</div>
              <div className="text-lg font-black leading-none">{currentStageInfo.etaMinutes} mins</div>
            </div>
          </div>
        )}

        {currentStep === 4 && (
          <div className="flex items-center gap-2 bg-emerald-100 text-emerald-800 px-4 py-2 rounded-2xl font-bold text-sm">
            <PartyPopper className="w-5 h-5 text-emerald-600" />
            <span>Successfully Delivered!</span>
          </div>
        )}
      </div>

      {/* Progress Bar / Timeline */}
      {!isCancelled && (
        <div className="relative py-4 mb-8">
          {/* Connecting Line */}
          <div className="absolute top-9 left-4 right-4 sm:left-8 sm:right-8 h-1.5 bg-slate-100 rounded-full z-0 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-orange-500 to-amber-400 rounded-full transition-all duration-500"
              style={{ width: `${(currentStep / (ORDER_STAGES.length - 1)) * 100}%` }}
            />
          </div>

          {/* Steps */}
          <div className="relative z-10 flex justify-between">
            {ORDER_STAGES.map((stage, idx) => {
              const Icon = stageIcons[idx];
              const isPast = idx < currentStep;
              const isCurrent = idx === currentStep;

              return (
                <div
                  key={stage.step}
                  onClick={() => onSetStepDirect(order.id, idx)}
                  className="flex flex-col items-center cursor-pointer group"
                  title="Click to jump to this stage"
                >
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className={`w-11 h-11 rounded-2xl flex items-center justify-center transition-all ${
                      isPast
                        ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/20'
                        : isCurrent
                        ? 'bg-orange-500 text-white ring-4 ring-orange-200 shadow-lg shadow-orange-500/30'
                        : 'bg-white text-slate-400 border-2 border-slate-200 group-hover:border-slate-300'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </motion.div>

                  <span
                    className={`text-[11px] font-bold mt-2 text-center max-w-[80px] hidden sm:block leading-tight ${
                      isCurrent ? 'text-orange-600' : isPast ? 'text-slate-800' : 'text-slate-400'
                    }`}
                  >
                    {stage.title.split('&')[0].split('•')[0]}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Simulation Controls & Cancellation Action */}
      <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 bg-slate-50/80 -mx-6 -mb-6 sm:-mx-8 sm:-mb-8 p-4 sm:p-5 rounded-b-3xl">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-500">Live Stage Simulation:</span>
          {currentStep < 4 && !isCancelled && (
            <button
              type="button"
              onClick={() => onProgressStage(order.id)}
              className="px-3.5 py-1.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold transition-all shadow-sm flex items-center gap-1.5 active:scale-95"
            >
              <FastForward className="w-3.5 h-3.5" />
              <span>Next Stage ({currentStep + 1}/4)</span>
            </button>
          )}

          {currentStep === 4 && (
            <span className="text-xs font-bold text-emerald-600">
              Completed all delivery stages!
            </span>
          )}
        </div>

        {/* Cancel option */}
        {currentStep <= 1 && !isCancelled && (
          <button
            type="button"
            onClick={() => onCancelOrder(order.id)}
            className="text-xs font-bold text-rose-600 hover:text-rose-700 hover:bg-rose-50 px-3 py-1.5 rounded-xl transition-colors flex items-center gap-1"
          >
            <XCircle className="w-4 h-4" />
            <span>Cancel Order</span>
          </button>
        )}
      </div>

    </div>
  );
}
