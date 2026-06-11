"use client";
import { motion } from "motion/react";
import { ArrowRight, Shield, Star, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  onOpenModal: () => void;
}

export default function InsuranceHero({ onOpenModal }: Props) {
  return (
    <section className="relative min-h-[92vh] flex items-center overflow-hidden bg-white">
      {/* Radial gradient — no inline style */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_75%_65%_at_72%_48%,_#fdf0f2,_transparent)]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#9B2335]/15 to-transparent" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8 py-24 lg:py-0">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-8 items-center">

          {/* Left */}
          <div className="space-y-10">
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-8"
            >
              {/* Badge */}
              <div className="inline-flex items-center gap-2 rounded-full border border-[#9B2335]/20 bg-[#9B2335]/5 px-3.5 py-1.5">
                <Shield className="h-3.5 w-3.5 text-[#9B2335]" />
                <span className="text-xs font-semibold tracking-widest text-[#9B2335] uppercase font-mono">
                  Направление 02 · Страхование
                </span>
              </div>

              {/* Headline — PT Serif for premium editorial feel */}
              <h1 className="font-['PTSerif'] text-5xl sm:text-6xl lg:text-[5.5rem] font-bold text-slate-900 leading-[1.0] tracking-[-0.02em]">
                Страхование,
                <br />
                <span className="text-[#9B2335]">которое</span>
                <br />
                работает.
              </h1>

              {/* Subtext */}
              <p className="text-xl text-slate-500 leading-relaxed max-w-md">
                15 лет я видел, что происходит без нормальной страховки. Помогаю подобрать защиту, которая реально покроет нужный случай.
              </p>
            </motion.div>

            {/* CTA row */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
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
                className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors"
              >
                Виды страхования
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </motion.div>

            {/* Trust proof */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.42 }}
              className="flex flex-wrap items-center gap-5 pt-2"
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
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-xs text-slate-500 mt-0.5 font-mono">Доверяют сотни клиентов</p>
              </div>
              <div className="h-4 w-px bg-slate-200 hidden sm:block" />
              <div className="flex items-center gap-1.5">
                <CheckCircle className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                <span className="text-xs text-slate-500 font-mono">Консультация бесплатно</span>
              </div>
            </motion.div>
          </div>

          {/* Right — photo + floating cards */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.75, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="relative hidden lg:block"
          >
            {/* Soft glow */}
            <div className="absolute -inset-8 rounded-full bg-[#9B2335]/6 blur-3xl" />

            {/* Floating card — top left */}
            <motion.div
              initial={{ opacity: 0, y: -14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="absolute -left-8 top-12 z-20 bg-white rounded-2xl shadow-xl border border-slate-100 p-4 flex items-center gap-3"
            >
              <div className="h-10 w-10 rounded-xl bg-[#9B2335]/10 flex items-center justify-center flex-shrink-0">
                <Shield className="h-5 w-5 text-[#9B2335]" />
              </div>
              <div>
                <p className="text-[10px] text-slate-400 font-mono uppercase tracking-wider">Покрытие</p>
                <p className="text-sm font-bold text-slate-900">до $100 000</p>
              </div>
            </motion.div>

            {/* Floating card — bottom right */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.75 }}
              className="absolute -right-6 bottom-24 z-20 bg-slate-950 rounded-2xl shadow-xl border border-slate-800 p-4 max-w-[200px]"
            >
              <p className="text-[10px] text-[#9B2335] font-mono font-bold uppercase tracking-wider mb-1.5">
                Шухрат на связи
              </p>
              <p className="text-xs text-white font-medium leading-relaxed">
                «Расскажу, что реально работает в вашем случае»
              </p>
            </motion.div>

            {/* Main photo */}
            <div className="aspect-[4/5] rounded-3xl overflow-hidden border-8 border-white shadow-2xl relative bg-slate-100">
              <img
                src="/images/insuranceAgent.jpg"
                alt="Шухрат Азизов — страховой агент MAGIC Group NTS"
                className="h-full w-full object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 via-transparent to-transparent" />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
