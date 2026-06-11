"use client";
import { Star, ArrowUpRight, Compass, Shield } from "lucide-react";
import { motion } from "motion/react";

interface Props {
  onOpenModal: () => void;
}

export default function TourHero({ onOpenModal }: Props) {
  return (
    <section className="relative py-16 md:py-24 lg:py-32 overflow-hidden bg-gradient-to-b from-[#f8fafc] to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

          {/* Left column */}
          <div className="lg:col-span-6 space-y-8 text-left">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-teal-500/10 to-cyan-500/10 border border-teal-500/20 px-3.5 py-1.5 rounded-full"
            >
              <div className="flex text-amber-500">
                {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
              </div>
              <span className="text-xs font-semibold text-teal-950 font-mono">15 лет в международном туризме</span>
            </motion.div>

            <div className="space-y-4">
              <motion.h1
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.1]"
              >
                Туризм<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 via-teal-500 to-cyan-600">
                  без глянца
                </span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-base sm:text-lg text-slate-600 max-w-lg leading-relaxed"
              >
                Подберу тур, отель или авторский маршрут — под ваш запрос и бюджет. Турция, ОАЭ, Индия и не только. Без наценок, с заботой и опытом 15 лет.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2"
            >
              <button
                onClick={onOpenModal}
                className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-teal-600 hover:bg-teal-500 px-8 py-4 text-base font-semibold text-white shadow-xl transition-all duration-200 active:scale-95"
              >
                <Compass className="h-5 w-5 animate-spin" style={{ animationDuration: "8s" }} />
                <span>Подобрать путешествие</span>
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
              <button
                onClick={() => document.getElementById("destinations")?.scrollIntoView({ behavior: "smooth" })}
                className="inline-flex items-center justify-center gap-1.5 rounded-2xl border border-gray-200 bg-white px-7 py-4 text-base font-semibold text-slate-800 hover:bg-gray-50 transition-all duration-200 active:scale-95"
              >
                Смотреть направления
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="grid grid-cols-3 gap-6 pt-8 border-t border-slate-100"
            >
              <div>
                <p className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">15</p>
                <p className="text-xs text-slate-500 font-mono mt-1">Лет опыта</p>
              </div>
              <div>
                <p className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">5+</p>
                <p className="text-xs text-slate-500 font-mono mt-1">Стран</p>
              </div>
              <div>
                <p className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">∞</p>
                <p className="text-xs text-slate-500 font-mono mt-1">Довольных туристов</p>
              </div>
            </motion.div>
          </div>

          {/* Right column — photo */}
          <div className="lg:col-span-6 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="relative mx-auto max-w-sm sm:max-w-md lg:max-w-none"
            >
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-teal-400 to-cyan-300 opacity-20 blur-3xl" />

              <div
                className="absolute shadow-2xl backdrop-blur-md p-4 rounded-2xl bg-white/80 border border-white/50 -left-6 top-12 z-20 hidden sm:flex items-center gap-3"
                style={{ animation: "bounce 4s infinite" }}
              >
                <div className="bg-teal-500 text-white rounded-xl p-2.5">
                  <Shield className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium">Надёжность</p>
                  <p className="text-sm text-gray-900 font-bold">15 лет на рынке</p>
                </div>
              </div>

              <div className="absolute shadow-2xl backdrop-blur-md p-4 rounded-2xl bg-slate-900/90 border border-slate-800 -right-4 bottom-12 z-20 hidden sm:flex items-center gap-3">
                <div>
                  <p className="text-[10px] text-teal-400 font-mono">ШУХРАТ НА СВЯЗИ</p>
                  <p className="text-xs text-white font-semibold">«Знаю эти страны изнутри»</p>
                </div>
              </div>

              <div className="aspect-[4/5] overflow-hidden shadow-2xl relative border-8 border-white bg-slate-100 rounded-3xl">
                <img
                  src="/images/turAgent.jpg"
                  alt="Шухрат Азизов — туристический агент MAGIC Group NTS"
                  className="h-full w-full object-cover object-top transform hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent" />
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
