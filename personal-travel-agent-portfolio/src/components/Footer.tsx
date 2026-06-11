/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Compass, Phone, Send, Mail, Map, ShieldAlert } from "lucide-react";
import { representative } from "../data";

interface FooterProps {
  isFigmaMode: boolean;
  activeLayer: string;
  onSelectLayer: (id: string) => void;
  onOpenPrivacyModal: () => void;
}

export default function Footer({ isFigmaMode, activeLayer, onSelectLayer, onOpenPrivacyModal }: FooterProps) {
  const isSelected = activeLayer === "footer";

  const handleSectionClick = (e: React.MouseEvent) => {
    if (isFigmaMode) {
      e.stopPropagation();
      onSelectLayer("footer");
    }
  };

  const handleLinkClick = (e: React.MouseEvent, targetId: string) => {
    e.preventDefault();
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <footer
      id="footer"
      onClick={handleSectionClick}
      className={`relative bg-slate-950 text-slate-400 py-16 border-t border-slate-900 transition-all duration-300 ${
        isFigmaMode 
          ? `border-4 ${isSelected ? 'border-orange-500 bg-orange-950/20 ring-4 ring-orange-500/20' : 'border-dashed border-cyan-400 hover:bg-cyan-500/10 cursor-pointer'}` 
          : ""
      }`}
    >
      {/* Figma Dev Badge Overlay */}
      {isFigmaMode && (
        <div className="absolute top-2 left-2 bg-cyan-400 text-slate-950 font-mono text-[9px] px-2 py-0.5 rounded-full z-10 select-none shadow">
          ❖ Frame: Global Footer Layout (4-Column Tree Grid)
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 text-left">
          
          {/* Column 1: Brand details */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-white">
              <Compass className="h-6 w-6 text-teal-400 animate-spin" style={{ animationDuration: '10s' }} />
              <span className="font-display font-extrabold text-lg tracking-tight uppercase">MiriTravel</span>
            </div>
            
            <p className="text-xs text-slate-400 leading-relaxed font-sans">
              Персональный тревел-эксперт {representative.name}. 5+ лет проектирования безупречных путешествий, индивидуальных туров и авторских гид-программ.
            </p>
            
            <div className="text-[10px] text-slate-550 font-mono">
              © {new Date().getFullYear()} MiriTravel Global Ltd.<br /> Все права защищены. License №749-X90
            </div>
          </div>

          {/* Column 2: Sitemap Navigation links */}
          <div className="space-y-4">
            <h4 className="font-display font-bold text-xs text-white uppercase tracking-wider font-mono">Карта сайта</h4>
            <ul className="text-xs space-y-2.5 font-sans">
              <li>
                <a href="#about" onClick={(e) => handleLinkClick(e, "about")} className="hover:text-teal-400 transition-colors">
                  Обо мне
                </a>
              </li>
              <li>
                <a href="#excursions" onClick={(e) => handleLinkClick(e, "excursions")} className="hover:text-teal-400 transition-colors">
                  Авторские экскурсии
                </a>
              </li>
              <li>
                <a href="#destinations" onClick={(e) => handleLinkClick(e, "destinations")} className="hover:text-teal-400 transition-colors">
                  Популярные туры
                </a>
              </li>
              <li>
                <a href="#reviews" onClick={(e) => handleLinkClick(e, "reviews")} className="hover:text-teal-400 transition-colors">
                  Отзывы туристов
                </a>
              </li>
              <li>
                <a href="#faq" onClick={(e) => handleLinkClick(e, "faq")} className="hover:text-teal-400 transition-colors">
                  FAQ / Вопросы
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact coordinates */}
          <div className="space-y-4">
            <h4 className="font-display font-bold text-xs text-white uppercase tracking-wider font-mono">Контакты</h4>
            <ul className="text-xs space-y-3 font-mono">
              <li className="flex items-center gap-2">
                <Phone className="h-3.5 w-3.5 text-teal-450" />
                <a href="tel:+79991234567" className="hover:text-teal-400 transition-colors">+7 (999) 123-45-67</a>
              </li>
              <li className="flex items-center gap-2">
                <Send className="h-3.5 w-3.5 text-teal-450" />
                <a href="https://t.me/miri_travel" target="_blank" rel="noreferrer" className="hover:text-teal-400 transition-colors">@miri_travel</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-3.5 w-3.5 text-teal-450" />
                <a href="mailto:maria@miritravel.ru" className="hover:text-teal-400 transition-colors">maria@miritravel.ru</a>
              </li>
              <li className="flex items-center gap-2">
                <Map className="h-3.5 w-3.5 text-teal-450" />
                <span>Москва, Пресненская наб. 12</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Links and Social icons */}
          <div className="space-y-4">
            <h4 className="font-display font-bold text-xs text-white uppercase tracking-wider font-mono">Связь в мессенджерах</h4>
            
            <div className="grid grid-cols-2 gap-2">
              <a 
                href="https://wa.me/79991234567" 
                target="_blank" 
                rel="no-referrer"
                className="bg-slate-900 border border-slate-800 text-slate-100 hover:bg-emerald-600 hover:text-white p-2 rounded-xl text-center text-xs font-semibold transition-all flex items-center justify-center gap-1.5"
                style={{ borderRadius: "calc(var(--theme-radius) - 8px)" }}
              >
                <span>WhatsApp</span>
              </a>

              <a 
                href="https://t.me/miri_travel" 
                target="_blank" 
                rel="no-referrer"
                className="bg-slate-900 border border-slate-800 text-slate-100 hover:bg-sky-600 hover:text-white p-2 rounded-xl text-center text-xs font-semibold transition-all flex items-center justify-center gap-1.5"
                style={{ borderRadius: "calc(var(--theme-radius) - 8px)" }}
              >
                <span>Telegram</span>
              </a>
            </div>

            <div className="pt-2 border-t border-slate-900">
              <button
                onClick={onOpenPrivacyModal}
                className="text-[10px] text-slate-500 hover:text-teal-400 underline transition-all font-mono inline-flex items-center gap-1 text-left"
              >
                <ShieldAlert className="h-3 w-3" />
                <span>Политика конфиденциальности</span>
              </button>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
}
