"use client";
import { motion } from "motion/react";

const stats = [
  { value: "500+", label: "Клиентов защищено" },
  { value: "5+", label: "Видов страхования" },
  { value: "15", label: "Лет на рынке" },
  { value: "24/7", label: "Поддержка в поездке" },
];

export default function InsuranceStats() {
  return (
    <section className="border-y border-slate-100 bg-slate-50/50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 lg:divide-x lg:divide-slate-200">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="text-center lg:px-8"
            >
              <p className="text-4xl font-bold text-slate-900 tracking-tight">{s.value}</p>
              <p className="text-sm text-slate-500 mt-1.5 font-mono">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
