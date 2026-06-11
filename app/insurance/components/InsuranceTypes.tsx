"use client";
import { motion } from "motion/react";
import { ArrowUpRight, Check } from "lucide-react";
import { insuranceTypes } from "../data";

interface Props {
  onOpenModal: (type?: string) => void;
}

export default function InsuranceTypes({ onOpenModal }: Props) {
  return (
    <section id="types" className="py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mb-16 space-y-4"
        >
          <p className="text-xs font-mono font-bold tracking-[0.2em] text-[#9B2335] uppercase">
            Виды страхования
          </p>
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 leading-tight tracking-tight">
            Защита под любой случай
          </h2>
          <p className="text-lg text-slate-500 leading-relaxed">
            Подберу оптимальный пакет — страховки, которые реально покрывают страховые случаи.
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid md:grid-cols-2 gap-5 lg:gap-6">
          {insuranceTypes.map((type, i) => {
            const Icon = type.icon;
            return (
              <motion.div
                key={type.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="group relative rounded-2xl border border-slate-200 bg-white p-8 hover:border-[#9B2335]/30 hover:shadow-xl transition-all duration-300 cursor-pointer"
                onClick={() => onOpenModal(type.title)}
              >
                {/* Badge */}
                {type.badge && (
                  <span className="absolute top-6 right-6 text-[10px] font-bold font-mono tracking-widest text-[#9B2335] bg-[#9B2335]/10 px-2.5 py-1 rounded-full uppercase">
                    {type.badge}
                  </span>
                )}

                {/* Icon */}
                <div className="h-12 w-12 rounded-xl bg-slate-100 group-hover:bg-[#9B2335]/10 flex items-center justify-center mb-6 transition-colors duration-300">
                  <Icon className="h-6 w-6 text-slate-600 group-hover:text-[#9B2335] transition-colors duration-300" />
                </div>

                {/* Text */}
                <div className="space-y-2 mb-6">
                  <h3 className="text-xl font-bold text-slate-900">{type.title}</h3>
                  <p className="text-sm font-mono text-slate-400 uppercase tracking-wider">{type.subtitle}</p>
                  <p className="text-sm text-slate-600 leading-relaxed pt-1">{type.description}</p>
                </div>

                {/* Coverage tags */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {type.coverage.map((item) => (
                    <span key={item} className="inline-flex items-center gap-1 text-xs text-slate-600 bg-slate-50 rounded-lg px-3 py-1.5 border border-slate-100">
                      <Check className="h-3 w-3 text-emerald-500 flex-shrink-0" />
                      {item}
                    </span>
                  ))}
                </div>

                {/* CTA link */}
                <div className="flex items-center gap-1.5 text-sm font-semibold text-[#9B2335] group-hover:gap-2.5 transition-all duration-200">
                  <span>Узнать стоимость</span>
                  <ArrowUpRight className="h-4 w-4" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
