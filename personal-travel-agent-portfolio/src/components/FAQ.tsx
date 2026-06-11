/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { faqItems } from "../data";
import { motion, AnimatePresence } from "motion/react";

interface FAQProps {
  isFigmaMode: boolean;
  activeLayer: string;
  onSelectLayer: (id: string) => void;
}

export default function FAQ({ isFigmaMode, activeLayer, onSelectLayer }: FAQProps) {
  const isSelected = activeLayer === "faq";
  const [openId, setOpenId] = useState<string | null>("faq-1"); // Default open first

  const handleSectionClick = (e: React.MouseEvent) => {
    if (isFigmaMode) {
      e.stopPropagation();
      onSelectLayer("faq");
    }
  };

  const toggleItem = (id: string) => {
    setOpenId(prev => (prev === id ? null : id));
  };

  return (
    <section
      id="faq"
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
          ❖ Section: FAQ Help Center (Dynamic Accordion lists)
        </div>
      )}

      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Header content */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <p className="text-xs font-bold text-teal-600 uppercase tracking-widest font-mono">полезная информация</p>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Ответы на частые вопросы туристов
          </h2>
          <p className="text-slate-500 text-sm">
            Подробно рассказываю о правилах безопасности, оплате, визах и защите ваших средств в путешествии.
          </p>
          <div className="h-1 w-12 bg-teal-500 mx-auto rounded-full mt-1" />
        </div>

        {/* Accordion Group list */}
        <div className="space-y-4">
          {faqItems.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div
                key={item.id}
                className="border border-gray-150 rounded-2xl bg-white overflow-hidden transition-all duration-300"
                style={{ borderRadius: "var(--theme-radius)" }}
              >
                
                {/* Accordion Header trigger */}
                <button
                  type="button"
                  onClick={() => toggleItem(item.id)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 font-display font-bold text-slate-900 hover:text-teal-600 transition-colors"
                >
                  <span className="flex items-center gap-3 text-sm sm:text-base">
                    <HelpCircle className="h-4.5 w-4.5 text-teal-500 shrink-0" />
                    <span>{item.question}</span>
                  </span>
                  
                  {/* Chevron spinner */}
                  <ChevronDown className={`h-5 w-5 text-slate-400 shrink-0 transform transition-transform duration-300 ${
                    isOpen ? "rotate-180 text-teal-600" : ""
                  }`} />
                </button>

                {/* Accordion Content pane */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-6 pb-6 pt-1 border-t border-gray-50 text-xs sm:text-sm text-slate-600 leading-relaxed text-left font-sans">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
