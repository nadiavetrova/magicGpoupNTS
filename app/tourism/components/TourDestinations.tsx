"use client";
import { useState } from "react";
import { ArrowRight, MapPin, Compass, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { destinations, type Destination } from "../data";

interface Props {
  onOpenModal: (dest?: string) => void;
}

export default function TourDestinations({ onOpenModal }: Props) {
  const [active, setActive] = useState<Destination | null>(null);

  return (
    <section id="destinations" className="relative py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div className="space-y-3">
            <p className="text-xs font-bold text-teal-600 uppercase tracking-widest font-mono">популярные направления</p>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Откройте для себя мир приключений
            </h2>
            <div className="h-1 w-16 bg-teal-500 rounded-full" />
          </div>
          <p className="text-sm text-slate-500 font-mono font-semibold max-w-xs">
            ✨ Направления, которые я знаю лично и рекомендую с уверенностью.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {destinations.map((dest) => (
            <div
              key={dest.id}
              className="group relative bg-white border border-gray-100 hover:border-teal-500/30 overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col rounded-2xl"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-100 shrink-0">
                <div className="absolute top-3 left-3 z-10 flex flex-wrap gap-1">
                  {dest.tags.map((tag, i) => (
                    <span key={i} className="bg-white/90 backdrop-blur-md text-slate-800 text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm font-mono">
                      {tag}
                    </span>
                  ))}
                </div>
                <span className="absolute bottom-3 right-3 z-10 bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-mono px-2 py-0.5 rounded-lg border border-slate-800">
                  {dest.days}
                </span>
                <img
                  src={dest.image}
                  alt={dest.name}
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="text-left space-y-2">
                  <div className="flex items-center gap-1.5 text-[11px] text-teal-600 font-mono font-bold uppercase tracking-wider">
                    <MapPin className="h-3 w-3" />
                    <span>Индивидуальный тур</span>
                  </div>
                  <h3 className="font-display font-extrabold text-lg text-slate-900">{dest.name}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">{dest.description}</p>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <div>
                    <p className="text-[10px] text-slate-400 font-mono uppercase tracking-widest leading-none">Стоимость</p>
                    <p className="text-base font-extrabold text-teal-700 tracking-tight mt-1">{dest.price}</p>
                  </div>
                  <button
                    onClick={() => setActive(dest)}
                    className="flex items-center gap-1.5 rounded-xl bg-slate-900 hover:bg-teal-600 text-slate-200 hover:text-white px-4 py-2 text-xs font-semibold transition-all duration-200"
                  >
                    <span>Подробнее</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detail modal */}
      <AnimatePresence>
        {active && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-lg bg-white rounded-3xl overflow-hidden shadow-2xl p-6"
            >
              <button onClick={() => setActive(null)} className="absolute top-4 right-4 bg-slate-900/80 hover:bg-slate-900 p-1.5 rounded-full text-white z-10 transition-colors">
                <X className="h-4 w-4" />
              </button>
              <div className="aspect-[16/10] overflow-hidden rounded-2xl bg-slate-100 relative shadow-inner">
                <img referrerPolicy="no-referrer" src={active.image} alt={active.name} className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent flex items-end p-5">
                  <div>
                    <span className="bg-teal-500 text-white text-[10px] font-mono font-bold rounded-md px-2 py-0.5 uppercase mb-1.5 inline-block">Личная рекомендация</span>
                    <h4 className="text-xl font-bold text-white">{active.name}</h4>
                  </div>
                </div>
              </div>
              <div className="p-4 space-y-4 text-left">
                <div className="flex gap-2 flex-wrap">
                  {active.tags.map((tag, i) => (
                    <span key={i} className="bg-teal-50 text-teal-800 text-[10px] font-bold font-mono px-2.5 py-1 rounded-md">#{tag}</span>
                  ))}
                  <span className="bg-gray-100 text-gray-700 text-[10px] font-mono px-2.5 py-1 rounded-md ml-auto">⏱ {active.days}</span>
                </div>
                <div className="space-y-1.5">
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-widest font-mono">О направлении:</p>
                  <p className="text-sm text-slate-600 leading-relaxed">{active.description}</p>
                </div>
                <div className="rounded-xl bg-teal-50/50 p-3.5 border border-teal-500/10 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] text-teal-800 font-mono uppercase tracking-wider font-semibold">Стоимость:</p>
                    <p className="text-lg font-black text-teal-700 mt-0.5">{active.price}</p>
                  </div>
                  <div className="text-xs text-right text-teal-900 max-w-[180px]">Включает перелёт, трансфер и отель</div>
                </div>
                <button
                  onClick={() => { setActive(null); onOpenModal(active.name); }}
                  className="w-full bg-teal-600 hover:bg-teal-500 py-3 rounded-xl font-semibold text-white text-sm shadow-lg active:scale-95 transition-all flex items-center justify-center gap-1.5"
                >
                  <Compass className="h-4 w-4" />
                  <span>Подобрать тур в {active.name.split("·")[0].trim()}</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
