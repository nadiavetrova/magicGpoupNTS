/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Compass, BadgePercent, PhoneCall, Map, ShieldCheck, Sparkles } from "lucide-react";
import { advantages } from "../data";

interface AdvantagesProps {
  isFigmaMode: boolean;
  activeLayer: string;
  onSelectLayer: (id: string) => void;
}

export default function Advantages({ isFigmaMode, activeLayer, onSelectLayer }: AdvantagesProps) {
  const isSelected = activeLayer === "advantages";

  // Map icon strings to Lucide icon components
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Compass": return <Compass className="h-6 w-6 text-teal-600" />;
      case "BadgePercent": return <BadgePercent className="h-6 w-6 text-teal-600" />;
      case "PhoneCall": return <PhoneCall className="h-6 w-6 text-teal-600" />;
      case "Map": return <Map className="h-6 w-6 text-teal-600" />;
      case "ShieldCheck": return <ShieldCheck className="h-6 w-6 text-teal-600" />;
      case "Sparkles": return <Sparkles className="h-6 w-6 text-teal-600" />;
      default: return <Compass className="h-6 w-6 text-teal-600" />;
    }
  };

  const handleSectionClick = (e: React.MouseEvent) => {
    if (isFigmaMode) {
      e.stopPropagation();
      onSelectLayer("advantages");
    }
  };

  return (
    <section
      id="advantages"
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
          ❖ Section: Advantages Grid (3-Columns Auto Layout)
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <p className="text-xs font-bold text-teal-600 uppercase tracking-widest font-mono">почему выбирают меня</p>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Превосходство в каждой детали вашего отдыха
          </h2>
          <div className="h-1 w-16 bg-teal-500 mx-auto rounded-full" />
        </div>

        {/* 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {advantages.map((adv) => (
            <div
              key={adv.id}
              className="group relative p-6 bg-[#f8fafc] hover:bg-white rounded-2xl border border-slate-100 hover:border-teal-500/30 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col items-start gap-4"
              style={{ borderRadius: "var(--theme-radius)" }}
            >
              {/* Icon Container with Glassmorphism */}
              <div className="h-12 w-12 rounded-xl bg-white flex items-center justify-center shadow-md text-teal-600 group-hover:bg-teal-600 group-hover:text-white transition-all duration-300 shrink-0">
                <div className="group-hover:scale-110 transition-transform duration-300">
                  {getIcon(adv.iconName)}
                </div>
              </div>

              {/* Text metadata */}
              <div className="space-y-2">
                <h3 className="font-display font-bold text-base text-slate-900 group-hover:text-teal-950 transition-colors">
                  {adv.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed font-sans">
                  {adv.subtitle}
                </p>
              </div>

              {/* Decorative Corner Element */}
              <div className="absolute top-2 right-2 h-1.5 w-1.5 rounded-full bg-slate-200 group-hover:bg-teal-500 transition-colors" />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
