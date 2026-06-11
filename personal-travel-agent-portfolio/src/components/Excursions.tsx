/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Compass, Shield, Star, Users } from "lucide-react";
import { excursions } from "../data";

interface ExcursionsProps {
  isFigmaMode: boolean;
  activeLayer: string;
  onSelectLayer: (id: string) => void;
  onOpenTourWidgetWithDest: (titleTarget: string) => void;
}

export default function Excursions({
  isFigmaMode,
  activeLayer,
  onSelectLayer,
  onOpenTourWidgetWithDest
}: ExcursionsProps) {
  const isSelected = activeLayer === "excursions";
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState<boolean>(false);
  const [canScrollRight, setCanScrollRight] = useState<boolean>(true);

  const handleSectionClick = (e: React.MouseEvent) => {
    if (isFigmaMode) {
      e.stopPropagation();
      onSelectLayer("excursions");
    }
  };

  const handleScroll = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (el) {
      const scrollAmount = 360;
      const targetScroll = el.scrollLeft + (direction === "left" ? -scrollAmount : scrollAmount);
      
      el.scrollTo({
        left: targetScroll,
        behavior: "smooth"
      });

      // Update indicators with delay for animation scroll
      setTimeout(() => {
        setCanScrollLeft(el.scrollLeft > 5);
        setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 5);
      }, 400);
    }
  };

  const onScrollUpdate = () => {
    const el = scrollRef.current;
    if (el) {
      setCanScrollLeft(el.scrollLeft > 5);
      setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 5);
    }
  };

  return (
    <section
      id="excursions"
      onClick={handleSectionClick}
      className={`relative py-16 md:py-24 bg-[#f8fafc] overflow-hidden transition-all duration-300 ${
        isFigmaMode 
          ? `border-4 ${isSelected ? 'border-orange-500 bg-orange-50/5 ring-4 ring-orange-500/20' : 'border-dashed border-cyan-400 hover:bg-cyan-500/5 cursor-pointer'}` 
          : ""
      }`}
    >
      {/* Figma Dev Badge Overlay */}
      {isFigmaMode && (
        <div className="absolute top-2 left-2 bg-cyan-500 text-white font-mono text-[9px] px-2 py-0.5 rounded-full z-10 select-none shadow">
          ❖ Section: Custom Excursion Slider (Horizontal scrolling Frame)
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Gallery title header and slider controls */}
        <div className="flex items-end justify-between mb-12 text-left">
          <div className="space-y-3">
            <span className="text-xs font-bold text-teal-600 uppercase tracking-widest font-mono">авторские экскурсии</span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Незабываемые экспедиции от первого лица
            </h2>
            <div className="h-1 w-12 bg-teal-500 rounded-full" />
          </div>

          {/* Nav arrows group */}
          <div className="flex gap-2 shrink-0">
            <button
              onClick={() => handleScroll("left")}
              disabled={!canScrollLeft}
              className={`p-3 rounded-full border transition-all ${
                canScrollLeft 
                  ? "bg-white border-gray-200 text-slate-800 hover:bg-teal-50 hover:border-teal-300"
                  : "bg-gray-105 border-gray-100 text-gray-300 cursor-not-allowed"
              }`}
            >
              <ArrowLeft className="h-4.5 w-4.5" />
            </button>
            <button
              onClick={() => handleScroll("right")}
              disabled={!canScrollRight}
              className={`p-3 rounded-full border transition-all ${
                canScrollRight 
                  ? "bg-white border-gray-200 text-slate-800 hover:bg-teal-50 hover:border-teal-300"
                  : "bg-gray-105 border-gray-100 text-gray-300 cursor-not-allowed"
              }`}
            >
              <ArrowRight className="h-4.5 w-4.5" />
            </button>
          </div>
        </div>

        {/* Scrolling card line container */}
        <div 
          ref={scrollRef}
          onScroll={onScrollUpdate}
          className="flex overflow-x-auto gap-6 pb-8 snap-x custom-scrollbar pr-2"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {excursions.map((exc) => (
            <div
              key={exc.id}
              className="flex-shrink-0 w-[300px] sm:w-[360px] snap-start bg-white border border-gray-150/80 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
              style={{ borderRadius: "var(--theme-radius)" }}
            >
              {/* Image segment */}
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                {/* Floating Rating Badge */}
                <div className="absolute top-3 left-3 z-10 bg-slate-900/90 backdrop-blur-md text-white text-[10px] font-mono font-bold px-2.5 py-1 rounded-lg border border-slate-850 flex items-center gap-1 shadow-sm">
                  <Star className="h-3 w-3 text-amber-400 fill-current" />
                  <span>{exc.rating} ОЦЕНКА</span>
                </div>

                {/* Duration card badge */}
                <span className="absolute bottom-3 right-3 z-10 bg-white/90 backdrop-blur-md text-slate-900 text-[9px] font-mono font-bold px-2 py-0.5 rounded shadow">
                  ⏱ {exc.duration}
                </span>

                <img 
                  referrerPolicy="no-referrer"
                  src={exc.image} 
                  alt={exc.title} 
                  className="h-full w-full object-cover transform group-hover:scale-105 transition-transform duration-500" 
                />

                {/* Cover graphic hover layer */}
                <div className="absolute inset-0 bg-teal-650/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </div>

              {/* Text description details */}
              <div className="p-6 text-left flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="font-display font-extrabold text-base text-slate-900 line-clamp-1 group-hover:text-teal-900 transition-colors">
                    {exc.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">
                    {exc.description}
                  </p>
                </div>

                {/* Purchase interaction trigger */}
                <div className="border-t border-gray-100 pt-4 flex items-center justify-between">
                  <div>
                    <span className="text-[9px] text-slate-400 font-mono uppercase tracking-widest block font-bold">Стоимость</span>
                    <span className="text-sm font-semibold text-teal-650 mt-0.5 block">{exc.cost}</span>
                  </div>

                  <button
                    onClick={() => onOpenTourWidgetWithDest(`Экскурсия: ${exc.title}`)}
                    className="bg-slate-900 group-hover:bg-teal-650 text-white rounded-xl px-4 py-2 text-xs font-semibold select-none shadow hover:shadow-teal-500/10 active:scale-95 transition-all text-center"
                    style={{ borderRadius: "calc(var(--theme-radius) - 6px)" }}
                  >
                    Заказать экскурсию
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
