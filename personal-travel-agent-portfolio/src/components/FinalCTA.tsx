/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Compass, ExternalLink, Sparkles } from "lucide-react";

interface FinalCTAProps {
  isFigmaMode: boolean;
  activeLayer: string;
  onSelectLayer: (id: string) => void;
  onOpenTourWidget: () => void;
  onOpenCatalog: () => void;
}

export default function FinalCTA({
  isFigmaMode,
  activeLayer,
  onSelectLayer,
  onOpenTourWidget,
  onOpenCatalog
}: FinalCTAProps) {
  const isSelected = activeLayer === "cta";

  const handleSectionClick = (e: React.MouseEvent) => {
    if (isFigmaMode) {
      e.stopPropagation();
      onSelectLayer("cta");
    }
  };

  return (
    <section
      id="cta"
      onClick={handleSectionClick}
      className={`relative py-24 sm:py-32 overflow-hidden transition-all duration-300 text-center text-white ${
        isFigmaMode 
          ? `border-4 ${isSelected ? 'border-orange-500 bg-orange-950/20 ring-4 ring-orange-500/20' : 'border-dashed border-cyan-400 hover:bg-cyan-500/10 cursor-pointer'}` 
          : ""
      }`}
    >
      {/* Figma Dev Badge Overlay */}
      {isFigmaMode && (
        <div className="absolute top-2 left-2 bg-cyan-400 text-slate-950 font-mono text-[9px] px-2 py-0.5 rounded-full z-10 select-none shadow">
          ❖ Section: Final Converting CTA (Immersive Media Background panel)
        </div>
      )}

      {/* Embedded backdrop image of ocean yacht travel representing background video clip */}
      <div className="absolute inset-0 z-0">
        <img 
          referrerPolicy="no-referrer"
          src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1600&q=80" 
          alt="immersive travel background view of island mountains" 
          className="h-full w-full object-cover brightness-50"
        />
        {/* Deep blue overlay for high contrast text */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/90 to-teal-950/80 mix-blend-multiply" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 space-y-8">
        
        {/* Icon badges */}
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-400 backdrop-blur-md animate-pulse">
          <Sparkles className="h-6 w-6" />
        </div>

        {/* Text narrative */}
        <div className="space-y-4 max-w-2xl mx-auto">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.15]">
            Готовы отправиться <br />
            в новое незабываемое путешествие?
          </h2>
          <p className="text-sm sm:text-base text-slate-300 font-sans max-w-lg mx-auto">
            Доверьте планирование своего отдыха профессионалу. Расскажите о ваших пожеланиях, и через 2 часа у вас будет эксклюзивное предложение без скрытых комиссий.
          </p>
        </div>

        {/* Button triggers */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onOpenTourWidget}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl bg-teal-500 hover:bg-teal-400 px-8 py-4 text-base font-semibold text-slate-950 shadow-xl shadow-teal-500/10 active:scale-95 transition-all"
            style={{ borderRadius: "var(--theme-radius)" }}
          >
            <Compass className="h-5 w-5 animate-spin" style={{ animationDuration: '6s' }} />
            <span>Подобрать тур</span>
          </button>

          <button
            onClick={onOpenCatalog}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl border border-white/20 bg-white/10 hover:bg-white/20 px-8 py-4 text-base font-semibold text-white backdrop-blur-md active:scale-95 transition-all"
            style={{ borderRadius: "var(--theme-radius)" }}
          >
            <span>Перейти в каталог</span>
            <ExternalLink className="h-4.5 w-4.5" />
          </button>
        </div>

        {/* Instant Response indicator */}
        <div className="text-xs text-slate-400 font-mono flex items-center justify-center gap-2">
          <span className="h-2 w-2 rounded-full bg-emerald-400 block animate-pulse" />
          <span>Мария онлайн: 10 бесплатных подборов мест доступно на сегодня</span>
        </div>

      </div>
    </section>
  );
}
