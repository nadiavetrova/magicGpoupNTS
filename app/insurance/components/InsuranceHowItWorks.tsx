"use client";
import { motion } from "motion/react";
import { steps } from "../data";

export default function InsuranceHowItWorks() {
  return (
    <section id="how" className="py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-16 space-y-4"
        >
          <p className="text-xs font-mono font-bold tracking-[0.2em] text-[#9B2335] uppercase">
            Как работаем
          </p>
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight">
            Три шага до полиса
          </h2>
          <p className="text-lg text-slate-500">
            Никаких офисов. Оформление онлайн — полис приходит на email за минуты.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8 relative">
          {/* Connecting line (desktop) */}
          <div className="hidden lg:block absolute top-10 left-[calc(16.67%+2rem)] right-[calc(16.67%+2rem)] h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.12 }}
              className="relative bg-white rounded-2xl border border-slate-100 p-8 text-left group hover:border-[#9B2335]/20 hover:shadow-lg transition-all duration-300"
            >
              {/* Step number */}
              <div className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-[#9B2335] text-white text-sm font-bold font-mono mb-6 relative z-10">
                {step.number}
              </div>

              <h3 className="text-xl font-bold text-slate-900 mb-3">{step.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{step.description}</p>

              {/* Decorative large number */}
              <div className="absolute bottom-4 right-5 text-7xl font-black text-slate-50 select-none group-hover:text-[#9B2335]/5 transition-colors duration-300">
                {step.number}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
