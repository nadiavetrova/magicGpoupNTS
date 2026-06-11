"use client";
import { motion } from "motion/react";

export default function InsuranceHook() {
  return (
    <section className="bg-slate-950 py-24 lg:py-32 overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-10"
        >
          {/* Overline */}
          <p className="text-xs font-mono font-bold tracking-[0.25em] text-[#9B2335] uppercase">
            Из личного опыта
          </p>

          {/* Quote */}
          <blockquote className="space-y-6">
            <p className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-[1.2] tracking-tight">
              «Многие летят с{" "}
              <span className="text-slate-500 line-through decoration-[#9B2335] decoration-2">
                минимальной страховкой
              </span>
              . Когда случается серьёзная ситуация — оказывается, что случай не страховой.»
            </p>

            <footer className="flex items-center gap-4 pt-4 border-t border-slate-800">
              <img
                src="/images/insuranceAgent.jpg"
                alt="Шухрат Азизов"
                className="h-12 w-12 rounded-full object-cover object-top border-2 border-slate-700"
              />
              <div>
                <p className="text-white font-semibold text-sm">Шухрат Азизов</p>
                <p className="text-slate-500 text-xs font-mono mt-0.5">15 лет в страховании и туризме</p>
              </div>
            </footer>
          </blockquote>

          {/* Counter row */}
          <div className="grid sm:grid-cols-3 gap-6 pt-4">
            {[
              { n: "~40%", text: "туристов покупают страховку с недостаточным покрытием" },
              { n: "1 из 5", text: "страховых случаев отклоняется из-за скрытых исключений" },
              { n: "x3", text: "дороже лечение без нормальной страховки за рубежом" },
            ].map((item) => (
              <div key={item.n} className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-2">
                <p className="text-3xl font-bold text-[#9B2335]">{item.n}</p>
                <p className="text-sm text-slate-400 leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
