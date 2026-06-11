"use client";
import { motion } from "motion/react";
import { MessageSquare, ListChecks, FileCheck } from "lucide-react";
import { steps } from "../data";

const icons = [MessageSquare, ListChecks, FileCheck];

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

        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
          {steps.map((step, i) => {
            const Icon = icons[i];
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                className="relative bg-white rounded-2xl border border-slate-100 p-8 text-left group hover:border-[#9B2335]/20 hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                {/* Step number + icon row */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-[#9B2335] text-white text-sm font-bold font-mono flex-shrink-0">
                    {step.number}
                  </div>
                  <div className="h-px flex-1 bg-slate-100 group-hover:bg-[#9B2335]/15 transition-colors duration-300" />
                  <div className="h-8 w-8 rounded-lg bg-slate-50 group-hover:bg-[#9B2335]/8 flex items-center justify-center transition-colors duration-300 flex-shrink-0">
                    <Icon className="h-4 w-4 text-slate-400 group-hover:text-[#9B2335] transition-colors duration-300" />
                  </div>
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-3">{step.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{step.description}</p>

                {/* Large background number */}
                <div className="absolute bottom-3 right-5 text-7xl font-black text-slate-50 select-none group-hover:text-[#9B2335]/5 transition-colors duration-300 pointer-events-none">
                  {step.number}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
