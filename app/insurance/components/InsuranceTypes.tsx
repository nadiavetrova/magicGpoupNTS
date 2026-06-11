"use client";
import { motion } from "motion/react";
import { ArrowUpRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { insuranceTypes } from "../data";

interface Props {
  onOpenModal: (type?: string) => void;
}

export default function InsuranceTypes({ onOpenModal }: Props) {
  const [featured, ...rest] = insuranceTypes;
  const FeaturedIcon = featured.icon;

  return (
    <section id="types" className="py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mb-14 space-y-4"
        >
          <p className="text-xs font-mono font-bold tracking-[0.2em] text-[#9B2335] uppercase">
            Виды страхования
          </p>
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 leading-tight tracking-tight">
            Защита под любой случай
          </h2>
          <p className="text-lg text-slate-500 leading-relaxed">
            Подберу оптимальный пакет — страховки, которые реально работают.
          </p>
        </motion.div>

        {/* Asymmetric grid: featured (left) + 3 compact + cta (right) */}
        <div className="grid lg:grid-cols-[3fr_2fr] gap-5">

          {/* Featured card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            onClick={() => onOpenModal(featured.title)}
            className="group relative rounded-3xl bg-slate-950 p-8 lg:p-10 cursor-pointer overflow-hidden flex flex-col justify-between min-h-[420px] hover:shadow-2xl transition-all duration-300"
          >
            {/* Radial glow accent */}
            <div className="absolute top-0 right-0 h-72 w-72 rounded-full bg-[#9B2335]/18 blur-3xl -translate-y-16 translate-x-16 group-hover:bg-[#9B2335]/28 transition-all duration-500" />
            <div className="absolute bottom-0 left-0 h-48 w-48 rounded-full bg-[#9B2335]/6 blur-2xl translate-y-12 -translate-x-8" />

            <div className="relative z-10 space-y-7">
              {/* Icon + badge */}
              <div className="flex items-start justify-between">
                <div className="h-14 w-14 rounded-2xl bg-[#9B2335]/20 border border-[#9B2335]/30 flex items-center justify-center">
                  <FeaturedIcon className="h-7 w-7 text-[#9B2335]" />
                </div>
                {featured.badge && (
                  <span className="text-[10px] font-bold font-mono tracking-widest text-[#9B2335] bg-[#9B2335]/15 border border-[#9B2335]/25 px-3 py-1.5 rounded-full uppercase">
                    {featured.badge}
                  </span>
                )}
              </div>

              {/* Text */}
              <div className="space-y-3">
                <h3 className="text-3xl font-bold text-white tracking-tight">
                  {featured.title}
                </h3>
                <p className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                  {featured.subtitle}
                </p>
                <p className="text-base text-slate-400 leading-relaxed max-w-sm">
                  {featured.description}
                </p>
              </div>

              {/* Coverage chips */}
              <div className="flex flex-wrap gap-2">
                {featured.coverage.map((item) => (
                  <span
                    key={item}
                    className="inline-flex items-center gap-1.5 text-xs text-slate-300 bg-slate-800/80 border border-slate-700/60 rounded-lg px-3 py-1.5"
                  >
                    <Check className="h-3 w-3 text-[#9B2335] flex-shrink-0" />
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Footer CTA */}
            <div className="relative z-10 flex items-center justify-between pt-7 mt-2 border-t border-slate-800">
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenModal(featured.title);
                }}
                className="bg-[#9B2335] hover:bg-[#7d1c2b] text-white rounded-xl px-6 h-11 text-sm font-semibold shadow-lg shadow-[#9B2335]/30 transition-all active:scale-95"
              >
                Узнать стоимость
                <ArrowUpRight className="ml-1.5 h-4 w-4" />
              </Button>
              <p className="text-xs text-slate-500 font-mono">Самый популярный</p>
            </div>
          </motion.div>

          {/* Right column: 3 secondary cards + cta tile */}
          <div className="flex flex-col gap-4">
            {rest.map((type, i) => {
              const Icon = type.icon;
              return (
                <motion.div
                  key={type.id}
                  initial={{ opacity: 0, x: 18 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: (i + 1) * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  onClick={() => onOpenModal(type.title)}
                  className="group relative rounded-2xl border border-slate-200 bg-white p-6 hover:border-[#9B2335]/30 hover:shadow-lg transition-all duration-300 cursor-pointer flex items-center gap-5"
                >
                  <div className="h-12 w-12 rounded-xl bg-slate-100 group-hover:bg-[#9B2335]/10 flex items-center justify-center flex-shrink-0 transition-colors duration-300">
                    <Icon className="h-6 w-6 text-slate-500 group-hover:text-[#9B2335] transition-colors duration-300" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-bold text-slate-900">{type.title}</h3>
                    <p className="text-xs text-slate-400 font-mono mt-0.5 truncate">{type.subtitle}</p>
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-slate-300 group-hover:text-[#9B2335] transition-colors duration-300 flex-shrink-0" />
                </motion.div>
              );
            })}

            {/* Consultation tile */}
            <motion.div
              initial={{ opacity: 0, x: 18 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.5 }}
              className="rounded-2xl bg-slate-50 border border-dashed border-slate-200 p-6 text-center flex-1 flex flex-col items-center justify-center gap-3"
            >
              <p className="text-sm text-slate-500 leading-relaxed">
                Нужна другая страховка или консультация?
              </p>
              <button
                onClick={() => onOpenModal("Нужна консультация")}
                className="text-sm font-semibold text-[#9B2335] hover:underline underline-offset-4 transition-colors"
              >
                Спросить Шухрата →
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
