/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { 
  Layers, Sliders, Code, Info, Check, Monitor, Tablet, Smartphone, Maximize2, 
  Sparkles, Palette, Move, HelpCircle, Eye
} from "lucide-react";
import { figmaLayerTree, representative } from "../data";

interface FigmaInspectorProps {
  isFigmaMode: boolean;
  setIsFigmaMode: (mode: boolean) => void;
  activeLayer: string;
  setActiveLayer: (layerId: string) => void;
  viewportWidth: "all" | "desktop" | "tablet" | "mobile";
  setViewportWidth: (width: "all" | "desktop" | "tablet" | "mobile") => void;
  primaryColor: string;
  setPrimaryColor: (color: string) => void;
  cornerRadius: string;
  setCornerRadius: (radius: string) => void;
}

export default function FigmaInspector({
  isFigmaMode,
  setIsFigmaMode,
  activeLayer,
  setActiveLayer,
  viewportWidth,
  setViewportWidth,
  primaryColor,
  setPrimaryColor,
  cornerRadius,
  setCornerRadius
}: FigmaInspectorProps) {
  const [activeTab, setActiveTab] = useState<"layers" | "styles" | "variables">("layers");

  const colorOptions = [
    { name: "Океанский Бирюзовый", hex: "#0d9488", value: "teal" },
    { name: "Королевский Синий", hex: "#1d4ed8", value: "blue" },
    { name: "Розовый Закат", hex: "#db2777", value: "pink" },
    { name: "Пальмовый Зеленый", hex: "#059669", value: "green" },
    { name: "Золотистый Песок", hex: "#d97706", value: "amber" }
  ];

  const radiusOptions = [
    { name: "Figma Ultra-Rounded", value: "24px", label: "24px (По умолчанию)" },
    { name: "Apple Standard", value: "16px", label: "16px" },
    { name: "Airbnb Minimal", value: "8px", label: "8px" },
    { name: "Sharp Blocky", value: "0px", label: "0px (Брутализм)" }
  ];

  // Map layer id to a human title to show in "Selected Element Properties"
  const getSelectedLayerMeta = () => {
    return figmaLayerTree.find(l => l.id === activeLayer) || {
      id: "general",
      name: "❖ Parent Page Container",
      type: "Figma Artboard / Frame",
      desc: "Родительский контейнер макета. Выберите любой блок на странице или в дереве слоев слева для инспектирования."
    };
  };

  const selectedMeta = getSelectedLayerMeta();

  // Scroll to active layer when clicked in layer panel
  const scrollToLayer = (id: string) => {
    setActiveLayer(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
      // Add a brief flashing highlight
      element.classList.add("ring-4", "ring-teal-500", "ring-offset-2");
      setTimeout(() => {
        element.classList.remove("ring-4", "ring-teal-500", "ring-offset-2");
      }, 1500);
    }
  };

  // Synchronize CSS Variable changes globally
  useEffect(() => {
    const root = document.documentElement;
    let hexValue = "#0d9488"; // teal default
    if (primaryColor === "blue") hexValue = "#1d4ed8";
    if (primaryColor === "pink") hexValue = "#db2777";
    if (primaryColor === "green") hexValue = "#059669";
    if (primaryColor === "amber") hexValue = "#d97706";

    root.style.setProperty("--theme-primary-hex", hexValue);
    root.style.setProperty("--theme-radius", cornerRadius);
  }, [primaryColor, cornerRadius]);

  return (
    <div id="figma-control-panel" className="bg-slate-900 border-b border-slate-800 text-slate-100 p-4 transition-all z-40 sticky top-0">
      {/* Top Controller Bar */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Project Meta */}
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-tr from-orange-500 via-pink-500 to-purple-600 h-9 w-9 rounded-xl flex items-center justify-center font-display font-black text-xs shadow-lg tracking-wider text-white">
            FG
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display font-bold text-sm tracking-wide bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent">
                FIGMA EXCLUSIVE WORKSPACE v2.4
              </span>
              <span className="bg-emerald-500/20 text-emerald-400 text-[10px] px-1.5 py-0.5 rounded-full font-mono">
                AutoLayout Live
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-mono">
              Персональный тревел-эксперт {representative.name} • Компоненты & Свойства
            </p>
          </div>
        </div>

        {/* Viewport resizing simulator */}
        <div id="viewport-resizer-group" className="flex items-center bg-slate-950/80 p-1.5 rounded-2xl border border-slate-800 gap-1 overflow-x-auto">
          <span className="text-[10px] text-slate-500 font-mono px-2 uppercase tracking-wider font-semibold">Разрешение:</span>
          
          <button
            onClick={() => setViewportWidth("all")}
            className={`flex items-center gap-1 text-[11px] font-mono px-3 py-1.5 rounded-xl transition-all ${
              viewportWidth === "all" 
                ? "bg-slate-800 text-white font-semibold shadow-sm" 
                : "text-slate-400 hover:text-slate-100"
            }`}
          >
            <Maximize2 className="h-3.5 w-3.5" />
            <span>Адаптив (100%)</span>
          </button>

          <button
            onClick={() => setViewportWidth("desktop")}
            className={`flex items-center gap-1 text-[11px] font-mono px-3 py-1.5 rounded-xl transition-all ${
              viewportWidth === "desktop" 
                ? "bg-slate-800 text-white font-semibold shadow-sm" 
                : "text-slate-400 hover:text-slate-100"
            }`}
          >
            <Monitor className="h-3.5 w-3.5" />
            <span>Desktop (1440px)</span>
          </button>

          <button
            onClick={() => setViewportWidth("tablet")}
            className={`flex items-center gap-1 text-[11px] font-mono px-3 py-1.5 rounded-xl transition-all ${
              viewportWidth === "tablet" 
                ? "bg-slate-800 text-white font-semibold shadow-sm" 
                : "text-slate-400 hover:text-slate-100"
            }`}
          >
            <Tablet className="h-3.5 w-3.5" />
            <span>Tablet (768px)</span>
          </button>

          <button
            onClick={() => setViewportWidth("mobile")}
            className={`flex items-center gap-1 text-[11px] font-mono px-3 py-1.5 rounded-xl transition-all ${
              viewportWidth === "mobile" 
                ? "bg-slate-800 text-white font-semibold shadow-sm" 
                : "text-slate-400 hover:text-slate-100"
            }`}
          >
            <Smartphone className="h-3.5 w-3.5" />
            <span>Mobile (390px)</span>
          </button>
        </div>

        {/* Global toggler for Figma boundaries or just Live Site */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsFigmaMode(!isFigmaMode)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold font-mono tracking-wide transition-all shadow-md active:scale-95 border ${
              isFigmaMode 
                ? "bg-gradient-to-r from-orange-500 to-pink-600 text-white border-transparent" 
                : "bg-slate-850 hover:bg-slate-800 text-slate-300 border-slate-700"
            }`}
          >
            <Sliders className="h-3.5 w-3.5" />
            <span>{isFigmaMode ? "ОТКЛЮЧИТЬ РЕЖИМ FIGMA & LAYERS" : "ВКЛЮЧИТЬ FIGMA ДЕВ-РЕЖИМ"}</span>
          </button>
        </div>
      </div>

      {/* Figma Workspace Overlay (Layers + Property Inspector dropdown inside panel) */}
      {isFigmaMode && (
        <div className="max-w-7xl mx-auto mt-4 grid grid-cols-1 lg:grid-cols-12 gap-4 border-t border-slate-800 pt-4 animate-fade-in">
          
          {/* Left panel: Figma Collapsible Layers Map (occupies 4-cols) */}
          <div className="lg:col-span-4 bg-slate-950/60 p-4 rounded-2xl border border-slate-800 flex flex-col h-[280px]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-mono font-bold text-orange-400 flex items-center gap-1.5">
                <Layers className="h-3 w-3" />
                СЛОИ В МАКЕТЕ (LAYER TREE)
              </span>
              <span className="text-[10px] text-slate-550 font-mono">Кликните для автопрокрутки</span>
            </div>
            <div className="overflow-y-auto flex-1 space-y-1.5 pr-2 custom-scrollbar text-xs">
              {figmaLayerTree.map((layer) => (
                <button
                  key={layer.id}
                  onClick={() => scrollToLayer(layer.id)}
                  className={`w-full text-left p-1.5 rounded-lg flex items-center justify-between transition-all ${
                    activeLayer === layer.id 
                      ? "bg-slate-800 border-l-4 border-orange-500 pl-3 font-semibold text-white" 
                      : "hover:bg-slate-900 border-l-4 border-transparent text-slate-300 hover:text-white"
                  }`}
                >
                  <span className="font-mono truncate">{layer.name}</span>
                  <span className="text-[9px] font-mono text-slate-500 shrink-0">{layer.type.split(" ")[0]}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Center Column: Figma Design Variable Controls (occupies 4-cols) */}
          <div className="lg:col-span-4 bg-slate-950/60 p-4 rounded-2xl border border-slate-800 flex flex-col justify-between h-[280px]">
            <div>
              <span className="text-[11px] font-mono font-bold text-pink-400 flex items-center gap-1.5 mb-3">
                <Palette className="h-3 w-3" />
                АКТИВНЫЕ ПЕРЕМЕННЫЕ FIGMA (VARIABLES)
              </span>
              
              {/* Variable control 1: Primary Accents color */}
              <div id="variable-color-selector" className="space-y-2">
                <label className="block text-[10px] text-slate-400 font-mono uppercase tracking-wider font-semibold">
                  ЦВЕТОВАЯ ПЕРЕМЕННАЯ primary-theme-hex:
                </label>
                <div className="grid grid-cols-2 gap-1.5">
                  {colorOptions.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => setPrimaryColor(opt.value)}
                      className={`flex items-center gap-2 p-1.5 rounded-xl border text-left text-[11px] font-mono transition-all ${
                        primaryColor === opt.value 
                          ? "border-pink-500 bg-pink-950/20 text-white font-medium" 
                          : "border-slate-800 hover:border-slate-700 text-slate-300"
                      }`}
                    >
                      <span className="h-3.5 w-3.5 rounded-full block border border-slate-755 shadow shrink-0" style={{ backgroundColor: opt.hex }} />
                      <span className="truncate">{opt.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Variable control 2: Corner Radii spacing */}
              <div id="variable-radius-selector" className="space-y-2 mt-3">
                <label className="block text-[10px] text-slate-400 font-mono uppercase tracking-wider font-semibold">
                  СКРУГЛЕНИЕ radius-theme:
                </label>
                <div className="grid grid-cols-2 gap-1.5">
                  {radiusOptions.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => setCornerRadius(opt.value)}
                      className={`p-1 text-center rounded-xl border text-[10px] font-mono block truncate transition-all ${
                        cornerRadius === opt.value 
                          ? "border-pink-500 bg-pink-950/25 text-white font-medium" 
                          : "border-slate-800 hover:border-slate-700 text-slate-300"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right column: Figma Selected Layer Property Inspector (occupies 4-cols) */}
          <div className="lg:col-span-4 bg-slate-950/60 p-4 rounded-2xl border border-slate-800 flex flex-col h-[280px]">
            <div className="flex items-center justify-between mb-2 border-b border-slate-800 pb-2">
              <span className="text-[11px] font-mono font-bold text-orange-400 flex items-center gap-1.5">
                <Code className="h-3 w-3" />
                СВОЙСТВА ЭЛЕМЕНТА (INSPECT AREA)
              </span>
              <span className="bg-orange-500/20 text-orange-400 text-[10px] px-1.5 py-0.5 rounded font-mono shrink-0">
                CSS Tokens
              </span>
            </div>

            <div className="flex-1 overflow-y-auto pr-1 text-xs space-y-2">
              <div className="rounded-lg bg-slate-900/60 p-2 border border-slate-800 space-y-1">
                <p className="text-[10px] text-slate-500 font-mono uppercase">Название фрейма:</p>
                <p className="font-mono text-orange-400 font-bold truncate">{selectedMeta.name}</p>
              </div>

              <div className="rounded-lg bg-slate-900/60 p-2 border border-slate-800 space-y-1">
                <p className="text-[10px] text-slate-500 font-mono uppercase">Тип слоя Figma:</p>
                <p className="font-mono text-slate-200 text-[11px]">{selectedMeta.type}</p>
              </div>

              <div className="rounded-lg bg-slate-900/60 p-2 border border-slate-800 space-y-1">
                <p className="text-[10px] text-slate-500 font-mono uppercase">Описание верстки:</p>
                <p className="text-slate-300 text-[11px] leading-relaxed select-all">{selectedMeta.desc}</p>
              </div>

              {/* Mock code block representing Figma specs */}
              <div className="rounded-lg bg-slate-950 p-2.5 font-mono text-[9px] text-emerald-400 leading-normal border border-slate-850">
                <span className="text-pink-400">.container</span> &#123;<br/>
                &nbsp;&nbsp;display: <span className="text-sky-300">flex</span>;<br/>
                &nbsp;&nbsp;border-radius: <span className="text-sky-300">var(--theme-radius: {cornerRadius})</span>;<br/>
                &nbsp;&nbsp;background: <span className="text-sky-300">var(--theme-primary)</span>;<br/>
                &nbsp;&nbsp;padding: <span className="text-yellow-350">24px 32px</span>;<br/>
                &#125;
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Interactive alert when turning on Figma modes */}
      {isFigmaMode && (
        <div className="max-w-7xl mx-auto mt-2 text-center text-[11px] text-orange-300/90 font-mono bg-orange-950/20 border border-orange-900/40 p-2 rounded-xl animate-pulse">
          🎯 <strong>РЕЖИМ FIGMA АКТИВЕН:</strong> Все ключевые секции теперь обведены синими инспектор-рамками с метками. Кликните по любому блоку на странице для инспекции слоев и автоматического вывода его CSS свойств в правую панель!
        </div>
      )}
    </div>
  );
}
