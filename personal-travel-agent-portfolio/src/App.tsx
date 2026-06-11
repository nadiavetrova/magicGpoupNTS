/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Compass, Sparkles, X, ChevronRight, Check, ShieldAlert } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

import FigmaInspector from "./components/FigmaInspector";
import Hero from "./components/Hero";
import Advantages from "./components/Advantages";
import AboutMe from "./components/AboutMe";
import Destinations from "./components/Destinations";
import HotTours from "./components/HotTours";
import Excursions from "./components/Excursions";
import Reviews from "./components/Reviews";
import HowItWorks from "./components/HowItWorks";
import FAQ from "./components/FAQ";
import FinalCTA from "./components/FinalCTA";
import Footer from "./components/Footer";
import TourModal from "./components/TourModal";

export default function App() {
  // Global States
  const [isFigmaMode, setIsFigmaMode] = useState<boolean>(true); // Start in Figma mode to showcase design systems immediately!
  const [activeLayer, setActiveLayer] = useState<string>("general");
  const [viewportWidth, setViewportWidth] = useState<"all" | "desktop" | "tablet" | "mobile">("all");
  const [primaryColor, setPrimaryColor] = useState<string>("teal");
  const [cornerRadius, setCornerRadius] = useState<string>("24px");

  // Interaction Modals States
  const [isTourModalOpen, setIsTourModalOpen] = useState<boolean>(false);
  const [selectedDestination, setSelectedDestination] = useState<string>("");
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState<boolean>(false);

  const handleOpenTourWidget = () => {
    setSelectedDestination("");
    setIsTourModalOpen(true);
  };

  const handleOpenTourWidgetWithDest = (destinationName: string) => {
    setSelectedDestination(destinationName);
    setIsTourModalOpen(true);
  };

  const handleOpenCatalogSim = () => {
    // Shows partner connector notice
    const hotSection = document.getElementById("hot");
    if (hotSection) {
      hotSection.scrollIntoView({ behavior: "smooth" });
      // Click the button inside
      setTimeout(() => {
        const btn = document.querySelector("#hot button");
        if (btn) (btn as HTMLElement).click();
      }, 800);
    }
  };

  const handleAnchorScroll = (e: React.MouseEvent, targetId: string) => {
    e.preventDefault();
    if (isFigmaMode) {
      setActiveLayer(targetId);
    }
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  // Determine viewport width wrappers
  let outerContainerClass = "w-full transition-all duration-300";
  let wrapperClass = "w-full transition-all duration-500 ease-in-out mx-auto bg-white";
  
  if (viewportWidth === "desktop") {
    outerContainerClass = "w-full min-h-screen bg-slate-100 flex flex-col justify-start py-8 overflow-x-auto relative shadow-inner";
    wrapperClass = "w-[1440px] shadow-2xl border-x-8 border-slate-950 bg-white min-h-[1200px] shrink-0 mb-10 transition-all duration-500 scale-[1] origin-top";
  } else if (viewportWidth === "tablet") {
    outerContainerClass = "w-full min-h-screen bg-slate-100 flex flex-col justify-start py-8 overflow-x-auto relative shadow-inner";
    wrapperClass = "w-[768px] shadow-2xl border-x-4 border-slate-950 bg-white min-h-[900px] shrink-0 mb-10 transition-all duration-500 origin-top";
  } else if (viewportWidth === "mobile") {
    outerContainerClass = "w-full min-h-screen bg-slate-100 flex flex-col justify-start py-8 overflow-x-auto relative shadow-inner";
    wrapperClass = "w-[390px] shadow-2xl border-x-2 border-slate-950 bg-white min-h-[800px] shrink-0 mb-10 transition-all duration-500 origin-top";
  }

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-800 antialiased font-sans">
      
      {/* 1. Header Figma Workspace Control Panel (Stays at the very top of workspace) */}
      <FigmaInspector
        isFigmaMode={isFigmaMode}
        setIsFigmaMode={setIsFigmaMode}
        activeLayer={activeLayer}
        setActiveLayer={setActiveLayer}
        viewportWidth={viewportWidth}
        setViewportWidth={setViewportWidth}
        primaryColor={primaryColor}
        setPrimaryColor={setPrimaryColor}
        cornerRadius={cornerRadius}
        setCornerRadius={setCornerRadius}
      />

      {/* 2. Workspace Viewport Wrap */}
      <div className={outerContainerClass}>
        
        {viewportWidth !== "all" && (
          <div className="max-w-[1440px] mx-auto text-xs font-mono text-slate-500 flex items-center justify-between px-4 pb-2 shrink-0 select-none">
            <span>📐 Figma Frame Canvas Rulers (Active Breakpoint)</span>
            <span>{viewportWidth === "desktop" ? "Desktop (1440px width)" : viewportWidth === "tablet" ? "Tablet (768px width)" : "Mobile (390px width)"}</span>
          </div>
        )}

        {/* The Artboard Container */}
        <div 
          className={wrapperClass} 
          style={{ 
            fontFamily: "var(--font-sans)",
            "--theme-radius": cornerRadius
          } as React.CSSProperties}
        >
          
          {/* Header/Navbar Frame */}
          <nav 
            id="navbar" 
            onClick={() => isFigmaMode && setActiveLayer("navbar")}
            className={`sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-gray-100 transition-all ${
              isFigmaMode && activeLayer === "navbar" 
                ? "border-4 border-orange-500 bg-orange-50/10 ring-4 ring-orange-500/20" 
                : isFigmaMode ? "hover:bg-cyan-500/5 cursor-pointer border-2 border-dashed border-cyan-400" : ""
            }`}
          >
            {isFigmaMode && (
              <div className="absolute top-1 left-2 bg-cyan-400 text-slate-950 font-mono text-[8px] px-1.5 py-0.2 rounded z-20 shadow select-none">
                ❖ Frame: Navbar
              </div>
            )}

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
              {/* Brand Logo */}
              <div className="flex items-center gap-2">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-500 text-white shadow-md shadow-teal-500/35">
                  <Compass className="h-6 w-6 animate-spin" style={{ animationDuration: '12s' }} />
                </span>
                <div>
                  <span className="font-display font-black text-xl tracking-tight text-slate-900 leading-none">MiriTravel</span>
                  <p className="text-[9px] text-slate-400 font-mono tracking-widest uppercase leading-none mt-0.5">Premium Agent</p>
                </div>
              </div>

              {/* Desktop links anchor (shipped responsive: hides when mobile simulation is checked) */}
              <div className="hidden md:flex items-center gap-8 text-sm font-medium">
                <a href="#about" onClick={(e) => handleAnchorScroll(e, "about")} className="text-slate-600 hover:text-teal-600 transition-colors">Обо мне</a>
                <a href="#destinations" onClick={(e) => handleAnchorScroll(e, "destinations")} className="text-slate-600 hover:text-teal-600 transition-colors">Направления</a>
                <a href="#excursions" onClick={(e) => handleAnchorScroll(e, "excursions")} className="text-slate-600 hover:text-teal-600 transition-colors">Экскурсии</a>
                <a href="#reviews" onClick={(e) => handleAnchorScroll(e, "reviews")} className="text-slate-600 hover:text-teal-600 transition-colors">Отзывы</a>
                <a href="#faq" onClick={(e) => handleAnchorScroll(e, "faq")} className="text-slate-600 hover:text-teal-600 transition-colors">FAQ</a>
              </div>

              {/* Active Header Trigger btn */}
              <div className="flex items-center gap-3">
                <button
                  onClick={handleOpenTourWidget}
                  className="rounded-xl bg-teal-600 hover:bg-teal-500 px-5 py-2.5 text-xs font-semibold text-white shadow shadow-teal-500/20 active:scale-95 transition-all select-none"
                  style={{ borderRadius: "calc(var(--theme-radius) - 8px)" }}
                >
                  Подобрать тур
                </button>
              </div>
            </div>
          </nav>

          {/* 3. Page Layout Components */}
          <Hero 
            isFigmaMode={isFigmaMode} 
            activeLayer={activeLayer} 
            onSelectLayer={setActiveLayer}
            onOpenTourWidget={handleOpenTourWidget}
          />

          <Advantages 
            isFigmaMode={isFigmaMode} 
            activeLayer={activeLayer} 
            onSelectLayer={setActiveLayer} 
          />

          <AboutMe 
            isFigmaMode={isFigmaMode} 
            activeLayer={activeLayer} 
            onSelectLayer={setActiveLayer}
            onOpenTourWidget={handleOpenTourWidget}
          />

          <Destinations 
            isFigmaMode={isFigmaMode} 
            activeLayer={activeLayer} 
            onSelectLayer={setActiveLayer}
            onOpenTourWidgetWithDest={handleOpenTourWidgetWithDest}
          />

          <HotTours 
            isFigmaMode={isFigmaMode} 
            activeLayer={activeLayer} 
            onSelectLayer={setActiveLayer}
            onOpenTourWidgetWithDest={handleOpenTourWidgetWithDest}
          />

          <Excursions 
            isFigmaMode={isFigmaMode} 
            activeLayer={activeLayer} 
            onSelectLayer={setActiveLayer}
            onOpenTourWidgetWithDest={handleOpenTourWidgetWithDest}
          />

          <Reviews 
            isFigmaMode={isFigmaMode} 
            activeLayer={activeLayer} 
            onSelectLayer={setActiveLayer}
          />

          <HowItWorks 
            isFigmaMode={isFigmaMode} 
            activeLayer={activeLayer} 
            onSelectLayer={setActiveLayer}
          />

          <FAQ 
            isFigmaMode={isFigmaMode} 
            activeLayer={activeLayer} 
            onSelectLayer={setActiveLayer}
          />

          <FinalCTA 
            isFigmaMode={isFigmaMode} 
            activeLayer={activeLayer} 
            onSelectLayer={setActiveLayer}
            onOpenTourWidget={handleOpenTourWidget}
            onOpenCatalog={handleOpenCatalogSim}
          />

          <Footer 
            isFigmaMode={isFigmaMode} 
            activeLayer={activeLayer} 
            onSelectLayer={setActiveLayer}
            onOpenPrivacyModal={() => setIsPrivacyModalOpen(true)}
          />

        </div>
      </div>

      {/* 4. Global Action Dialog Overlays */}
      <TourModal 
        isOpen={isTourModalOpen} 
        onClose={() => setIsTourModalOpen(false)} 
        initialDestination={selectedDestination}
      />

      {/* Privacy Policy Dialog component */}
      <AnimatePresence>
        {isPrivacyModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-lg bg-white rounded-3xl p-6 md:p-8 space-y-4 max-h-[85vh] overflow-y-auto text-left shadow-2xl"
            >
              <button 
                onClick={() => setIsPrivacyModalOpen(false)}
                className="absolute top-4 right-4 bg-gray-100 hover:bg-gray-200 p-1.5 rounded-full text-gray-500 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
                <span className="p-1.5 rounded-lg bg-teal-500/10 text-teal-600 shrink-0">
                  <ShieldAlert className="h-5 w-5" />
                </span>
                <h3 className="font-display font-extrabold text-lg text-slate-950">Политика конфиденциальности</h3>
              </div>

              <div className="text-xs space-y-3 leading-relaxed text-slate-600 font-sans">
                <p className="font-bold text-slate-800">1. Общие положения</p>
                <p>MiriTravel с уважением относится к конфиденциальности посетителей сайта. Настоящая Политика конфиденциальности описывает, как мы собираем, используем и защищаем персональные данные (Имя, Телефон, контакт в Telegram/WhatsApp), отправленные нам через экскурсионно-туристические калькуляторы и формы обратной связи.</p>

                <p className="font-bold text-slate-800">2. Сбор и обработка данных</p>
                <p>Мы обрабатываем данные исключительно с согласия пользователя, выраженного при заполнении форм (например подбор тура). Ваши контакты не передаются третьим лицам без вашего ведома и используются только для персональной связи с тревел-экспертом Марией.</p>

                <p className="font-bold text-slate-800">3. Финансовая защита и SSL</p>
                <p>Все транзакции шифруются протоколами высокого уровня SSL. Данные платежных шлюзов не хранятся на наших серверах. Мы соблюдаем законы РФ и международные стандарты об охране персональной тайны.</p>

                <p className="font-bold text-slate-800">4. Изменение политики</p>
                <p>Мы оставляем за собой право периодически корректировать положения политики для поддержания стандартов безопасности. По всем вопросам пишите на <a href="mailto:privacy@miritravel.ru" className="text-teal-600 underline">privacy@miritravel.ru</a>.</p>
              </div>

              <button
                type="button"
                onClick={() => setIsPrivacyModalOpen(false)}
                className="w-full bg-slate-950 hover:bg-slate-900 py-3 rounded-xl font-semibold text-white text-xs tracking-wider transition-all"
              >
                Ознакомлен(а)
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
