"use client";
import Link from "next/link";
import { Compass, Phone, Send, Mail, ShieldAlert } from "lucide-react";

export default function TourFooter() {
  const scroll = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "center" });

  return (
    <footer className="relative bg-slate-950 text-slate-400 py-16 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 text-left">

          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-white">
              <Compass className="h-6 w-6 text-teal-400 animate-spin" style={{ animationDuration: "10s" }} />
              <span className="font-display font-extrabold text-lg tracking-tight uppercase">MAGIC Group NTS</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Персональный тревел-эксперт Шухрат Азизов. 15 лет в международном туризме. Турция, ОАЭ, Индия и не только.
            </p>
            <div className="text-[10px] text-slate-600 font-mono">
              © {new Date().getFullYear()} MAGIC Group NTS · Шухрат Азизов
            </div>
          </div>

          {/* Nav */}
          <div className="space-y-4">
            <h4 className="font-display font-bold text-xs text-white uppercase tracking-wider font-mono">Навигация</h4>
            <ul className="text-xs space-y-2.5">
              {[
                { label: "Обо мне", id: "about" },
                { label: "Направления", id: "destinations" },
                { label: "Отзывы", id: "reviews" },
                { label: "Вопросы и ответы", id: "faq" },
              ].map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => scroll(item.id)}
                    className="hover:text-teal-400 transition-colors text-left"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacts */}
          <div className="space-y-4">
            <h4 className="font-display font-bold text-xs text-white uppercase tracking-wider font-mono">Контакты</h4>
            <ul className="text-xs space-y-3 font-mono">
              <li className="flex items-center gap-2">
                <Phone className="h-3.5 w-3.5 text-teal-400" />
                <a href="tel:+79000000000" className="hover:text-teal-400 transition-colors">+7 (900) 000-00-00</a>
              </li>
              <li className="flex items-center gap-2">
                <Send className="h-3.5 w-3.5 text-teal-400" />
                <a href="https://t.me/" target="_blank" rel="noreferrer" className="hover:text-teal-400 transition-colors">Telegram</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-3.5 w-3.5 text-teal-400" />
                <a href="mailto:info@magicgroupnts.ru" className="hover:text-teal-400 transition-colors">info@magicgroupnts.ru</a>
              </li>
            </ul>
          </div>

          {/* Messengers */}
          <div className="space-y-4">
            <h4 className="font-display font-bold text-xs text-white uppercase tracking-wider font-mono">Написать напрямую</h4>
            <div className="grid grid-cols-2 gap-2">
              <a href="https://wa.me/" target="_blank" rel="noreferrer"
                className="bg-slate-900 border border-slate-800 text-slate-100 hover:bg-emerald-600 hover:text-white p-2 rounded-xl text-center text-xs font-semibold transition-all">
                WhatsApp
              </a>
              <a href="https://t.me/" target="_blank" rel="noreferrer"
                className="bg-slate-900 border border-slate-800 text-slate-100 hover:bg-sky-600 hover:text-white p-2 rounded-xl text-center text-xs font-semibold transition-all">
                Telegram
              </a>
            </div>
            <div className="pt-2 border-t border-slate-900">
              <Link href="/privacy" className="text-[10px] text-slate-500 hover:text-teal-400 underline transition-all font-mono inline-flex items-center gap-1">
                <ShieldAlert className="h-3 w-3" />
                <span>Политика конфиденциальности</span>
              </Link>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
}
