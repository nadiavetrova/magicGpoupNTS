/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Flame, Star, Calendar, Clock, Sparkles, ExternalLink, RefreshCw } from "lucide-react";
import { hotTours } from "../data";
import { motion, AnimatePresence } from "motion/react";

interface HotToursProps {
  isFigmaMode: boolean;
  activeLayer: string;
  onSelectLayer: (id: string) => void;
  onOpenTourWidgetWithDest: (dest: string) => void;
}

export default function HotTours({
  isFigmaMode,
  activeLayer,
  onSelectLayer,
  onOpenTourWidgetWithDest
}: HotToursProps) {
  const isSelected = activeLayer === "hot";
  const [isRedirectionNotice, setIsRedirectionNotice] = useState<boolean>(false);
  const [activePartnerUrl, setActivePartnerUrl] = useState<string>("");

  const handleSectionClick = (e: React.MouseEvent) => {
    if (isFigmaMode) {
      e.stopPropagation();
      onSelectLayer("hot");
    }
  };

  const handleExternalClick = (partnerName: string) => {
    setActivePartnerUrl(partnerName);
    setIsRedirectionNotice(true);
    // Simulate redirection countdown
    setTimeout(() => {
      setIsRedirectionNotice(false);
      // Opens simulated portal
    }, 2500);
  };

  return (
    <section
      id="hot"
      onClick={handleSectionClick}
      className={`relative py-16 md:py-24 bg-slate-900 text-slate-100 transition-all duration-300 ${
        isFigmaMode 
          ? `border-4 ${isSelected ? 'border-orange-500 bg-orange-950/20 ring-4 ring-orange-500/20' : 'border-dashed border-cyan-400 hover:bg-cyan-500/10 cursor-pointer'}` 
          : ""
      }`}
    >
      {/* Figma Dev Badge Overlay */}
      {isFigmaMode && (
        <div className="absolute top-2 left-2 bg-cyan-400 text-slate-950 font-mono text-[9px] px-2 py-0.5 rounded-full z-10 select-none shadow">
          ❖ Section: Trending Hot Deals (High-conversion banner format)
        </div>
      )}

      {/* Background visual graphics */}
      <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-teal-550/15 blur-3xl" />
      <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-cyan-550/10 blur-3xl opacity-50" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Title Group */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 bg-rose-500/10 border border-rose-500/20 px-3 py-1 rounded-full text-rose-450 text-xs font-semibold font-mono uppercase">
            <Flame className="h-4.5 w-4.5 animate-pulse text-rose-500 fill-current" />
            <span>Горящие туры • Обновлено только что</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight">
            Поймайте максимальную выгоду сегодня
          </h2>
          <p className="text-slate-400 text-sm max-w-lg mx-auto leading-relaxed">
            Эксклюзивные предложения от премиум-партнеров со скидками до 40%. Количество свободных вилл строго ограничено!
          </p>
          <div className="h-1 w-16 bg-rose-500 mx-auto rounded-full mt-2" />
        </div>

        {/* Hot Tours Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {hotTours.map((tour) => (
            <div
              key={tour.id}
              className="bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 shadow-2xl flex flex-col justify-between transform hover:-translate-y-2 transition-all duration-300"
              style={{ borderRadius: "var(--theme-radius)" }}
            >
              
              {/* Photo top */}
              <div className="aspect-[4/3] overflow-hidden relative bg-slate-800">
                
                {/* Discount Badge */}
                <span className="absolute top-4 left-4 z-10 bg-gradient-to-r from-rose-500 to-orange-500 text-white font-mono text-xs font-bold px-3.5 py-1.5 rounded-full shadow-lg">
                  -{tour.discount}% МАКС. СКИДКА
                </span>

                {/* Rating badges stars */}
                <div className="absolute bottom-4 left-4 z-10 bg-slate-900/90 backdrop-blur-md text-white text-[11px] font-bold px-2.5 py-1 rounded-lg border border-slate-800 flex items-center gap-1">
                  <span className="text-amber-400">★</span>
                  <span>{tour.hotelStars}.0 Deluxe Class</span>
                </div>

                <img 
                  referrerPolicy="no-referrer"
                  src={tour.image} 
                  alt={tour.title} 
                  className="h-full w-full object-cover opacity-85 transform hover:scale-105 transition-transform duration-500" 
                />
              </div>

              {/* metadata description */}
              <div className="p-6 text-left flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <h3 className="font-display font-bold text-lg text-white leading-tight">
                    {tour.title}
                  </h3>

                  <div className="grid grid-cols-2 gap-2 text-xs font-mono text-slate-400">
                    <p className="flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5 text-teal-450" />
                      <span>Вылет: {tour.departureDate}</span>
                    </p>
                    <p className="flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5 text-teal-450" />
                      <span>{tour.duration}</span>
                    </p>
                  </div>
                </div>

                {/* dynamic pricing columns */}
                <div className="border-t border-slate-850 pt-4 flex items-end justify-between">
                  <div>
                    <span className="text-[10px] text-slate-500 font-mono uppercase tracking-widest line-through block font-medium">
                      {tour.originalPrice}
                    </span>
                    <span className="text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300 mt-1 block">
                      {tour.price}
                    </span>
                  </div>

                  <button
                    onClick={() => onOpenTourWidgetWithDest(tour.title)}
                    className="bg-teal-600 hover:bg-teal-500 text-white text-xs font-semibold px-4.5 py-2.5 rounded-xl transition-all shadow-md active:scale-95 flex items-center gap-1"
                    style={{ borderRadius: "calc(var(--theme-radius) - 6px)" }}
                  >
                    <span>Забронировать по акции</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Global Catalog Redirection trigger */}
        <div className="mt-16 text-center">
          <button
            onClick={() => handleExternalClick("Всенародный премиальный оператор-агрегатор")}
            className="group inline-flex items-center gap-2 bg-slate-950 p-4 rounded-2xl border border-slate-800 hover:border-slate-755 text-slate-300 hover:text-white transition-all shadow-lg text-sm font-semibold active:scale-98"
            style={{ borderRadius: "var(--theme-radius)" }}
          >
            <span>Смотреть все горящие туры в каталоге</span>
            <ExternalLink className="h-4 w-4 text-slate-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

      </div>

      {/* REDIRECTION SPINNER DIALOG */}
      <AnimatePresence>
        {isRedirectionNotice && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-sm bg-slate-900 border border-slate-800 rounded-3xl p-6 text-center space-y-4 shadow-2xl"
            >
              <RefreshCw className="h-10 w-10 text-teal-400 mx-auto animate-spin" />
              <h3 className="font-display font-extrabold text-lg text-white">Переход в внешний каталог...</h3>
              <p className="text-xs text-slate-400 leading-relaxed max-w-xs mx-auto">
                Мы безопасно подгружаем актуальные онлайн-API базы туристических операторов. Идет авторизация сессии тревел-агента <strong>{activePartnerUrl}</strong>...
              </p>
              <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-850 text-[10px] text-teal-500 font-mono">
                🗝 HTTPS://CONNECTED_API_GATEWAY_SEC_SSL
              </div>
              <div className="h-1 w-full rounded-full bg-slate-800 overflow-hidden">
                <motion.div 
                  className="h-full bg-teal-500" 
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 2.3, ease: "linear" }}
                />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
