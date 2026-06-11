"use client";
import Link from "next/link";
import { Shield, Phone, Send, Mail, ShieldAlert } from "lucide-react";

export default function InsuranceFooter() {
  const scroll = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <footer className="bg-slate-950 text-slate-400 py-16 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 text-left">

          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-white">
              <Shield className="h-5 w-5 text-[#9B2335]" />
              <span className="font-bold text-base tracking-tight uppercase">MAGIC Group NTS</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Страховой агент Шухрат Азизов. 15 лет в страховании и туризме. Все виды страхования.
            </p>
            <p className="text-[10px] text-slate-600 font-mono">
              © {new Date().getFullYear()} MAGIC Group NTS · Шухрат Азизов
            </p>
          </div>

          {/* Nav */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">Навигация</h4>
            <ul className="text-xs space-y-2.5">
              {[
                { label: "Виды страхования", id: "types" },
                { label: "Сравнение", id: undefined },
                { label: "Как работаем", id: "how" },
                { label: "Вопросы и ответы", id: "faq" },
              ].map((item) => (
                <li key={item.label}>
                  <button onClick={() => item.id && scroll(item.id)} className="hover:text-[#9B2335] transition-colors text-left">
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacts */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">Контакты</h4>
            <ul className="text-xs space-y-3 font-mono">
              <li className="flex items-center gap-2">
                <Phone className="h-3.5 w-3.5 text-[#9B2335]" />
                <a href="tel:+79000000000" className="hover:text-[#9B2335] transition-colors">+7 (900) 000-00-00</a>
              </li>
              <li className="flex items-center gap-2">
                <Send className="h-3.5 w-3.5 text-[#9B2335]" />
                <a href="https://t.me/" target="_blank" rel="noreferrer" className="hover:text-[#9B2335] transition-colors">Telegram</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-3.5 w-3.5 text-[#9B2335]" />
                <a href="mailto:info@magicgroupnts.ru" className="hover:text-[#9B2335] transition-colors">info@magicgroupnts.ru</a>
              </li>
            </ul>
          </div>

          {/* Links */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">Написать</h4>
            <div className="grid grid-cols-2 gap-2">
              <a href="https://wa.me/" target="_blank" rel="noreferrer"
                className="bg-slate-900 border border-slate-800 text-slate-100 hover:bg-emerald-600 hover:border-emerald-600 hover:text-white p-2 rounded-xl text-center text-xs font-semibold transition-all">
                WhatsApp
              </a>
              <a href="https://t.me/" target="_blank" rel="noreferrer"
                className="bg-slate-900 border border-slate-800 text-slate-100 hover:bg-sky-600 hover:border-sky-600 hover:text-white p-2 rounded-xl text-center text-xs font-semibold transition-all">
                Telegram
              </a>
            </div>
            <div className="pt-2 border-t border-slate-900">
              <Link href="/privacy" className="text-[10px] text-slate-500 hover:text-[#9B2335] underline transition-colors font-mono inline-flex items-center gap-1">
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
