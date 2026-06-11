/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Star, MessageSquare } from "lucide-react";
import { reviews } from "../data";

interface ReviewsProps {
  isFigmaMode: boolean;
  activeLayer: string;
  onSelectLayer: (id: string) => void;
}

export default function Reviews({ isFigmaMode, activeLayer, onSelectLayer }: ReviewsProps) {
  const isSelected = activeLayer === "reviews";

  const handleSectionClick = (e: React.MouseEvent) => {
    if (isFigmaMode) {
      e.stopPropagation();
      onSelectLayer("reviews");
    }
  };

  return (
    <section
      id="reviews"
      onClick={handleSectionClick}
      className={`relative py-16 md:py-24 bg-white transition-all duration-300 ${
        isFigmaMode 
          ? `border-4 ${isSelected ? 'border-orange-500 bg-orange-50/5 ring-4 ring-orange-500/20' : 'border-dashed border-cyan-400 hover:bg-cyan-500/5 cursor-pointer'}` 
          : ""
      }`}
    >
      {/* Figma Dev Badge Overlay */}
      {isFigmaMode && (
        <div className="absolute top-2 left-2 bg-cyan-500 text-white font-mono text-[9px] px-2 py-0.5 rounded-full z-10 select-none shadow">
          ❖ Section: Testimonials (Masonry Grid Style)
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title Block */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <p className="text-xs font-bold text-teal-600 uppercase tracking-widest font-mono">почему ко мне возвращаются</p>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Опыт, который превосходит ожидания
          </h2>
          <p className="text-slate-500 text-sm max-w-lg mx-auto">
            Искренние отзывы путешественников, для которых я спроектировала незабываемые каникулы.
          </p>
          <div className="h-1 w-16 bg-teal-500 mx-auto rounded-full mt-2" />
        </div>

        {/* Masonry Columns Using Tailwind Columns */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 lg:gap-8 [column-fill:_balance] space-y-6 lg:space-y-8 pr-1">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="break-inside-avoid bg-[#f8fafc] border border-gray-100 hover:border-teal-500/35 hover:bg-white p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col gap-4 relative group"
              style={{ borderRadius: "var(--theme-radius)" }}
            >
              
              {/* Header: Avatar, Name and Tour specs */}
              <div className="flex items-center gap-3 text-left">
                <div className="h-11 w-11 rounded-full overflow-hidden border border-gray-200 bg-slate-100 shrink-0 shadow-sm">
                  <img 
                    referrerPolicy="no-referrer"
                    src={rev.avatar} 
                    alt={rev.name} 
                    className="h-full w-full object-cover" 
                  />
                </div>
                <div>
                  <h4 className="font-display font-bold text-sm text-slate-900 leading-tight">
                    {rev.name}
                  </h4>
                  <p className="text-[10px] text-teal-600 font-mono font-bold uppercase mt-0.5">
                    {rev.tour}
                  </p>
                </div>

                {/* decorative quotes icon */}
                <MessageSquare className="h-5 w-5 text-teal-500/10 shrink-0 ml-auto group-hover:text-teal-500/25 transition-colors absolute top-4 right-4" />
              </div>

              {/* Rating stars block */}
              <div className="flex text-amber-500">
                {[...Array(rev.rating)].map((_, index) => (
                  <Star key={index} className="h-4.5 w-4.5 fill-current" />
                ))}
              </div>

              {/* Review Text block */}
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed text-left font-sans italic">
                “{rev.comment}”
              </p>

              {/* Verified client tag bottom */}
              <div className="flex items-center gap-1.5 text-[10px] text-emerald-600 font-mono font-bold border-t border-gray-150 pt-3">
                <span className="h-1.5 w-1.5 bg-emerald-500 rounded-full inline-block" />
                <span>Проверенный отзыв с Booking.com</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
