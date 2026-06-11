"use client";
import { motion } from "motion/react";
import { Check, X } from "lucide-react";
import { comparisonRows } from "../data";

export default function InsuranceComparison() {
  return (
    <section className="py-24 lg:py-32 bg-slate-50">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16 space-y-4"
        >
          <p className="text-xs font-mono font-bold tracking-[0.2em] text-[#9B2335] uppercase">
            Сравнение
          </p>
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight">
            Минимум vs Реальная защита
          </h2>
          <p className="text-lg text-slate-500 max-w-xl mx-auto">
            Разница становится очевидной только когда что-то случается. Лучше знать заранее.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="rounded-2xl border border-slate-200 overflow-hidden bg-white shadow-sm"
        >
          {/* Table header */}
          <div className="grid grid-cols-3 bg-slate-900 text-white">
            <div className="p-5 text-sm font-semibold text-slate-400">Параметр</div>
            <div className="p-5 text-sm font-semibold border-l border-slate-700 text-center">
              Минимальная страховка
            </div>
            <div className="p-5 text-sm font-semibold border-l border-slate-700 text-center text-[#9B2335]">
              Страховка от Шухрата ✦
            </div>
          </div>

          {/* Rows */}
          {comparisonRows.map((row, i) => (
            <div
              key={row.feature}
              className={`grid grid-cols-3 border-t border-slate-100 transition-colors hover:bg-slate-50/80 ${
                i % 2 === 0 ? "bg-white" : "bg-slate-50/30"
              }`}
            >
              <div className="p-4 lg:p-5 text-sm text-slate-700 font-medium flex items-center">{row.feature}</div>

              {/* Minimal */}
              <div className="p-4 lg:p-5 border-l border-slate-100 flex items-center justify-center">
                {typeof row.minimal === "string" ? (
                  <span className="text-sm text-slate-400 font-mono">{row.minimal}</span>
                ) : row.minimal ? (
                  <Check className="h-5 w-5 text-emerald-500" />
                ) : (
                  <X className="h-5 w-5 text-slate-300" />
                )}
              </div>

              {/* Proper */}
              <div className="p-4 lg:p-5 border-l border-slate-100 flex items-center justify-center bg-[#9B2335]/3">
                {typeof row.proper === "string" ? (
                  <span className="text-sm text-[#9B2335] font-bold font-mono">{row.proper}</span>
                ) : row.proper ? (
                  <Check className="h-5 w-5 text-[#9B2335]" />
                ) : (
                  <X className="h-5 w-5 text-slate-300" />
                )}
              </div>
            </div>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="text-center text-xs text-slate-400 mt-6 font-mono"
        >
          * Условия зависят от выбранной страховой компании и пакета. Уточняйте индивидуально.
        </motion.p>
      </div>
    </section>
  );
}
