"use client";
import { motion } from "motion/react";
import { ArrowRight, Shield, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  onOpenModal: () => void;
}

export default function InsuranceHero({ onOpenModal }: Props) {
  return (
    <section className="relative min-h-[92vh] flex items-center overflow-hidden bg-white">
      {/* Subtle background grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(#9B2335 1px, transparent 1px), linear-gradient(to right, #9B2335 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8 py-24 lg:py-0">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-8 items-center">

          {/* Left */}
          <div className="space-y-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              {/* Label */}
              <div className="inline-flex items-center gap-2 rounded-full border border-rose-200 bg-rose-50 px-3.5 py-1.5">
                <Shield className="h-3.5 w-3.5 text-[#9B2335]" />
                <span className="text-xs font-semibold tracking-widest text-[#9B2335] uppercase font-mono">
                  Направление 02 · Страхование
                </span>
              </div>

              {/* Headline */}
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-slate-900 leading-[1.05] tracking-tight">
                Страхование,{" "}
                <span className="relative">
                  <span className="relative z-10 text-[#9B2335]">которое</span>
                </span>
                <br />
                работает.
              </h1>

              {/* Subtext */}
              <p className="text-lg text-slate-500 leading-relaxed max-w-lg">
                15 лет я видел, что происходит без нормальной страховки. Теперь помогаю подобрать защиту, которая реально покроет нужный случай — без скрытых исключений.
              </p>
            </motion.div>

            {/* CTA row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-4"
            >
              <Button
                onClick={onOpenModal}
                size="lg"
                className="bg-[#9B2335] hover:bg-[#7d1c2b] text-white rounded-xl px-8 h-14 text-base font-semibold shadow-lg shadow-[#9B2335]/20 transition-all active:scale-95"
              >
                Подобрать страховку
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <button
                onClick={() => document.getElementById("types")?.scrollIntoView({ behavior: "smooth" })}
                className="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors underline underline-offset-4"
              >
                Смотреть виды страхования
              </button>
            </motion.div>

            {/* Trust row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex items-center gap-6 pt-2"
            >
              <div className="flex -space-x-2">
                {[
                  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&q=80",
                  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&q=80",
                  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=40&q=80",
                ].map((src, i) => (
                  <img
                    key={i}
                    referrerPolicy="no-referrer"
                    src={src}
                    alt=""
                    className="h-8 w-8 rounded-full border-2 border-white object-cover"
                  />
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-xs text-slate-500 mt-0.5">Доверяют сотни клиентов</p>
              </div>
            </motion.div>
          </div>

          {/* Right — photo + floating cards */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="relative hidden lg:block"
          >
            {/* Soft glow */}
            <div className="absolute -inset-8 rounded-full bg-[#9B2335]/8 blur-3xl" />

            {/* Floating card — top left */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="absolute -left-8 top-16 z-20 bg-white rounded-2xl shadow-xl border border-slate-100 p-4 flex items-center gap-3"
            >
              <div className="h-10 w-10 rounded-xl bg-[#9B2335]/10 flex items-center justify-center">
                <Shield className="h-5 w-5 text-[#9B2335]" />
              </div>
              <div>
                <p className="text-xs text-slate-400 font-mono">Покрытие</p>
                <p className="text-sm font-bold text-slate-900">до $100 000</p>
              </div>
            </motion.div>

            {/* Floating card — bottom right */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.65 }}
              className="absolute -right-6 bottom-20 z-20 bg-slate-950 rounded-2xl shadow-xl border border-slate-800 p-4"
            >
              <p className="text-[10px] text-[#9B2335] font-mono font-bold uppercase tracking-wider mb-1">Шухрат на связи</p>
              <p className="text-xs text-white font-semibold">«Расскажу, что реально работает»</p>
            </motion.div>

            {/* Main photo */}
            <div className="aspect-[4/5] rounded-3xl overflow-hidden border-8 border-white shadow-2xl relative bg-slate-100">
              <img
                src="/images/insuranceAgent.jpg"
                alt="Шухрат Азизов — страховой агент MAGIC Group NTS"
                className="h-full w-full object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/30 via-transparent to-transparent" />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
