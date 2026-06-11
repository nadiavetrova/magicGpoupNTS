/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Star, ArrowUpRight, Compass, Shield, Users } from "lucide-react";
import { motion } from "motion/react";

interface HeroProps {
  isFigmaMode: boolean;
  activeLayer: string;
  onSelectLayer: (id: string) => void;
  onOpenTourWidget: () => void;
}

export default function Hero({ isFigmaMode, activeLayer, onSelectLayer, onOpenTourWidget }: HeroProps) {
  const isSelected = activeLayer === "hero";

  const handleSectionClick = (e: React.MouseEvent) => {
    if (isFigmaMode) {
      e.stopPropagation();
      onSelectLayer("hero");
    }
  };

  return (
    <section
      id="hero"
      onClick={handleSectionClick}
      className={`relative py-16 md:py-24 lg:py-32 overflow-hidden transition-all duration-300 bg-gradient-to-b from-[#f8fafc] to-white ${
        isFigmaMode 
          ? `border-4 ${isSelected ? 'border-orange-500 bg-orange-50/5 ring-4 ring-orange-500/20' : 'border-dashed border-cyan-400 hover:bg-cyan-500/5 cursor-pointer'}` 
          : ""
      }`}
    >
      {/* Figma Dev Badge Overlay */}
      {isFigmaMode && (
        <div className="absolute top-2 left-2 bg-cyan-500 text-white font-mono text-[9px] px-2 py-0.5 rounded-full z-10 select-none shadow">
          ❖ Section: Hero Container (Desktop 1440px / Flow)
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Hero Column */}
          <div className="lg:col-span-6 space-y-8 text-left">
            
            {/* Trust badge with micro-animation */}
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-teal-500/10 to-cyan-500/10 border border-teal-500/20 px-3.5 py-1.5 rounded-full"
            >
              <div className="flex text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4.5 w-4.5 fill-current" />
                ))}
              </div>
              <span className="text-xs font-semibold text-teal-950 font-mono">
                Рейтинг 5.0 • 100% Доверие клиентов
              </span>
            </motion.div>

            {/* Display title */}
            <div className="space-y-4">
              <motion.h1 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.1]"
              >
                Ваш персональный <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-650 via-teal-500 to-cyan-600">
                  эксперт по путешествиям
                </span>
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-base sm:text-lg text-slate-600 max-w-lg leading-relaxed font-sans"
              >
                Подберу идеальный тур, экскурсию или авторское уединенное приключение под ваш бюджет, пожелания и стиль отдыха. Без наценок, с заботой и круглосуточной поддержкой.
              </motion.p>
            </div>

            {/* CTA Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2"
            >
              <button
                onClick={onOpenTourWidget}
                className="group relative inline-flex items-center justify-center gap-2 rounded-2xl bg-teal-600 hover:bg-teal-500 px-8 py-4 text-base font-semibold text-white shadow-xl hover:shadow-teal-500/20 active:scale-98 transition-all duration-200"
                style={{ borderRadius: "var(--theme-radius)" }}
              >
                <Compass className="h-5 w-5 animate-spin" style={{ animationDuration: '8s' }} />
                <span>Подобрать путешествие</span>
                <ArrowUpRight className="h-4.5 w-4.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>

              <button
                onClick={() => {
                  const el = document.getElementById("destinations");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center justify-center gap-1.5 rounded-2xl border border-gray-200 bg-white px-7 py-4 text-base font-semibold text-slate-800 hover:bg-gray-50 active:scale-98 transition-all duration-200"
                style={{ borderRadius: "var(--theme-radius)" }}
              >
                <span>Смотреть каталог</span>
              </button>
            </motion.div>

            {/* Metrics under CTA */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="grid grid-cols-3 gap-6 pt-8 border-t border-slate-100"
            >
              <div>
                <p className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">1000+</p>
                <p className="text-xs text-slate-500 font-mono mt-1">Довольных туристов</p>
              </div>
              <div>
                <p className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">50+</p>
                <p className="text-xs text-slate-500 font-mono mt-1">Доступных стран</p>
              </div>
              <div>
                <p className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">Luxury</p>
                <p className="text-xs text-slate-500 font-mono mt-1">Отели престиж-класса</p>
              </div>
            </motion.div>

          </div>

          {/* Right Hero Image Frame (Figma Component visual look) */}
          <div className="lg:col-span-6 relative">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="relative mx-auto max-w-sm sm:max-w-md lg:max-w-none"
            >
              {/* Background gradient orb */}
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-teal-400 to-cyan-300 opacity-20 blur-3xl" />

              {/* Decorative glass elements representing UI of high class */}
              <div 
                className="absolute shadow-2xl backdrop-blur-md p-4 rounded-2xl bg-white/80 border border-white/50 -left-6 top-12 z-20 hidden sm:flex items-center gap-3 animate-bounce"
                style={{ animationDuration: '4s' }}
              >
                <div className="bg-teal-500 text-white rounded-xl p-2.5">
                  <Shield className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium">Безопасность</p>
                  <p className="text-semibold text-sm text-gray-900 font-bold">100% Финансовая защита</p>
                </div>
              </div>

              <div 
                className="absolute shadow-2xl backdrop-blur-md p-4 rounded-2xl bg-slate-900/90 border border-slate-800 -right-4 bottom-12 z-20 hidden sm:flex items-center gap-3"
              >
                <div className="flex -space-x-2">
                  <img className="h-8 w-8 rounded-full border-2 border-slate-900" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=60&q=80" alt="avatar" />
                  <img className="h-8 w-8 rounded-full border-2 border-slate-900" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=60&q=80" alt="avatar" />
                </div>
                <div>
                  <p className="text-[10px] text-teal-400 font-mono">МАРИЯ НА СВЯЗИ</p>
                  <p className="text-xs text-white font-semibold">«В пути решу любой вопрос»</p>
                </div>
              </div>

              {/* Main Photo Frame */}
              <div 
                className="aspect-[4/5] overflow-hidden shadow-2xl relative border-8 border-white bg-slate-100"
                style={{ borderRadius: "var(--theme-radius)" }}
              >
                <img 
                  referrerPolicy="no-referrer"
                  src="https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=800&q=80" 
                  alt="Premium travel agency couples beach view Maldives" 
                  className="h-full w-full object-cover transform hover:scale-105 transition-transform duration-700"
                />
                
                {/* Visual glass gradient sheet */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent" />
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
