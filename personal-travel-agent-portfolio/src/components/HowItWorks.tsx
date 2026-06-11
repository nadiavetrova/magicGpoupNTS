/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { FileSpreadsheet, Map, CheckCircle, Ship } from "lucide-react";
import { timelineSteps } from "../data";

interface HowItWorksProps {
  isFigmaMode: boolean;
  activeLayer: string;
  onSelectLayer: (id: string) => void;
}

export default function HowItWorks({ isFigmaMode, activeLayer, onSelectLayer }: HowItWorksProps) {
  const isSelected = activeLayer === "howitworks";

  // Map numbers to themed icons
  const getStepIcon = (num: number) => {
    switch (num) {
      case 1: return <FileSpreadsheet className="h-5 w-5 text-white" />;
      case 2: return <Map className="h-5 w-5 text-white" />;
      case 3: return <CheckCircle className="h-5 w-5 text-white" />;
      case 4: return <Ship className="h-5 w-5 text-white" />;
      default: return <FileSpreadsheet className="h-5 w-5 text-white" />;
    }
  };

  const handleSectionClick = (e: React.MouseEvent) => {
    if (isFigmaMode) {
      e.stopPropagation();
      onSelectLayer("howitworks");
    }
  };

  return (
    <section
      id="howitworks"
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
          ❖ Section: How It Works Timeline (Progress Nodes Layout)
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <p className="text-xs font-bold text-teal-600 uppercase tracking-widest font-mono">алгоритм взаимодействия</p>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Простой и безмятежный путь к вашей мечте
          </h2>
          <p className="text-slate-500 text-sm max-w-lg mx-auto">
            Никакой бумажной рутины и поездок в офисы. Вся подготовка проходит комфортно в онлайне.
          </p>
          <div className="h-1 w-12 bg-teal-500 mx-auto rounded-full mt-1" />
        </div>

        {/* Timeline Grid (Horizontal on Desktop, Vertical on Mobile) */}
        <div className="relative mt-8">
          
          {/* Linking dotted connection road background line */}
          <div className="absolute top-1/2 left-0 w-full h-[2px] bg-dashed border-t-2 border-dashed border-teal-200 -translate-y-1/2 hidden lg:block z-0" />

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-6 relative z-10">
            {timelineSteps.map((step) => (
              <div 
                key={step.number}
                className="bg-white border border-gray-100 hover:border-teal-500/30 p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 text-left flex flex-col items-start gap-4"
                style={{ borderRadius: "var(--theme-radius)" }}
              >
                
                {/* Visual Circle Node indicators */}
                <div className="flex items-center gap-4 lg:flex-col lg:items-start lg:gap-3 w-full">
                  <div className="h-10 w-10 rounded-full bg-teal-600 flex items-center justify-center font-display font-bold shadow-md shadow-teal-500/20 shrink-0">
                    {getStepIcon(step.number)}
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-teal-600 uppercase font-semibold">Шаг 0{step.number}</span>
                    <h3 className="font-display font-extrabold text-base text-slate-900 mt-0.5">
                      {step.title}
                    </h3>
                  </div>
                </div>

                {/* Narrative text description */}
                <p className="text-xs sm:text-sm text-slate-650 leading-relaxed font-sans">
                  {step.description}
                </p>

                {/* Mini decorative number token absolute background */}
                <span className="absolute bottom-4 right-4 text-slate-100/30 text-5xl font-display font-black select-none pointer-events-none group-hover:text-teal-500/5">
                  0{step.number}
                </span>

              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
