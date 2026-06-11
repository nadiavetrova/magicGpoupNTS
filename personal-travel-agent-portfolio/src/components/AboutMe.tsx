/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { CheckCircle2, Award, Calendar, Sparkles } from "lucide-react";
import { representative } from "../data";

interface AboutMeProps {
  isFigmaMode: boolean;
  activeLayer: string;
  onSelectLayer: (id: string) => void;
  onOpenTourWidget: () => void;
}

export default function AboutMe({ isFigmaMode, activeLayer, onSelectLayer, onOpenTourWidget }: AboutMeProps) {
  const isSelected = activeLayer === "about";

  const handleSectionClick = (e: React.MouseEvent) => {
    if (isFigmaMode) {
      e.stopPropagation();
      onSelectLayer("about");
    }
  };

  return (
    <section
      id="about"
      onClick={handleSectionClick}
      className={`relative py-16 md:py-24 bg-gradient-to-b from-white to-[#f8fafc] overflow-hidden transition-all duration-300 ${
        isFigmaMode 
          ? `border-4 ${isSelected ? 'border-orange-500 bg-orange-50/5 ring-4 ring-orange-500/20' : 'border-dashed border-cyan-400 hover:bg-cyan-500/5 cursor-pointer'}` 
          : ""
      }`}
    >
      {/* Figma Dev Badge Overlay */}
      {isFigmaMode && (
        <div className="absolute top-2 left-2 bg-cyan-500 text-white font-mono text-[9px] px-2 py-0.5 rounded-full z-10 select-none shadow">
          ❖ Section: About Me (Biography Split & Stats Layer)
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Portrait Container (Apple Style Glass Framing) */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-sm sm:max-w-md lg:max-w-none">
              
              {/* Outer decorative soft color ring */}
              <div className="absolute -inset-4 rounded-full bg-gradient-to-tr from-teal-500 to-cyan-400 opacity-10 blur-2xl" />

              {/* Float badge experience */}
              <div className="absolute top-8 -right-4 bg-slate-900 text-white p-3 rounded-2xl shadow-xl flex items-center gap-2.5 border border-slate-800 z-10">
                <div className="p-2 rounded-lg bg-teal-500 text-white">
                  <Award className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-[9px] text-slate-400 font-mono">МАСТЕРСТВО</p>
                  <p className="text-xs font-bold font-display">ТОР-3 Тревел Консьерж</p>
                </div>
              </div>

              {/* Main Photo Card */}
              <div 
                className="aspect-[4/5] overflow-hidden shadow-2xl relative border-8 border-white bg-slate-200"
                style={{ borderRadius: "var(--theme-radius)" }}
              >
                <img
                  referrerPolicy="no-referrer"
                  src={representative.photo}
                  alt="Maria Vorontsova personal travel company professional representative"
                  className="h-full w-full object-cover transform hover:scale-102 transition-transform duration-500"
                />
                
                {/* Visual subtle gradient filter overlay */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/50 via-transparent to-transparent p-6 text-white text-left">
                  <p className="text-lg font-bold font-display">{representative.name}</p>
                  <p className="text-xs text-teal-300 font-mono">Ваш гид в мире премиум-отдыха</p>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Narrative content & Numerical values blocks */}
          <div className="lg:col-span-7 space-y-8 text-left">
            <div className="space-y-4">
              <span className="text-xs font-bold text-teal-600 uppercase tracking-widest font-mono">Давайте знакомиться</span>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                Здравствуйте, меня зовут <span className="text-teal-600">{representative.name}</span>
              </h2>
              <div className="h-1 w-12 bg-teal-500 rounded-full" />
            </div>

            {/* Biography text */}
            <p className="text-slate-600 leading-relaxed font-sans text-base">
              {representative.bio}
            </p>

            {/* List checklist points */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-start gap-2.5 text-sm text-slate-700">
                <CheckCircle2 className="h-5 w-5 text-teal-500 shrink-0 mt-0.5" />
                <span>Официальный представитель крупных туроператоров</span>
              </div>
              <div className="flex items-start gap-2.5 text-sm text-slate-700">
                <CheckCircle2 className="h-5 w-5 text-teal-500 shrink-0 mt-0.5" />
                <span>Экономия до 40% бюджета за счет закрытой базы спецвкладок</span>
              </div>
              <div className="flex items-start gap-2.5 text-sm text-slate-700">
                <CheckCircle2 className="h-5 w-5 text-teal-500 shrink-0 mt-0.5" />
                <span>Проверенные отели и пляжи, отобранные лично</span>
              </div>
              <div className="flex items-start gap-2.5 text-sm text-slate-700">
                <CheckCircle2 className="h-5 w-5 text-teal-500 shrink-0 mt-0.5" />
                <span>Мгновенная замена рейсов и помощь в любой сложной ситуации</span>
              </div>
            </div>

            {/* STATS MATRIX SECTION */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-slate-200">
              {representative.stats.map((st, i) => (
                <div 
                  key={i} 
                  className="bg-slate-900 rounded-2xl p-4 text-center border border-slate-800 shadow-md transform hover:-translate-y-1 transition-all"
                  style={{ borderRadius: "var(--theme-radius)" }}
                >
                  <p className="font-display text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-300">
                    {st.value}
                  </p>
                  <p className="text-[10px] text-slate-400 font-mono mt-1 font-semibold uppercase tracking-wider">
                    {st.label}
                  </p>
                </div>
              ))}
            </div>

            {/* Mini action callback */}
            <div className="pt-2 flex items-center gap-4">
              <button
                onClick={onOpenTourWidget}
                className="inline-flex items-center gap-1.5 bg-slate-900 text-white rounded-xl px-6 py-3 text-xs font-semibold hover:bg-slate-800 active:scale-95 shadow transition-all"
                style={{ borderRadius: "var(--theme-radius)" }}
              >
                <Sparkles className="h-4 w-4 text-teal-400" />
                <span>Оставить запрос Марии</span>
              </button>
              <div className="text-xs text-slate-500 font-mono flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-emerald-500 block animate-pulse" />
                <span>Ответ в течение 5 минут</span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
