"use client";
import { motion } from "motion/react";
import { ArrowRight, Shield, Send, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  onOpenModal: () => void;
}

export default function InsuranceCTA({ onOpenModal }: Props) {
  return (
    <section className="relative py-24 lg:py-32 bg-slate-950 overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-2/3 bg-gradient-to-r from-transparent via-[#9B2335]/40 to-transparent" />
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-[#9B2335]/8 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-6 lg:px-8 text-center space-y-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-[#9B2335]/30 bg-[#9B2335]/10 text-[#9B2335] mx-auto">
            <Shield className="h-6 w-6" />
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight">
            Не рискуйте тем,<br />
            что важно.
          </h2>

          <p className="text-lg text-slate-400 max-w-xl mx-auto leading-relaxed">
            Консультация бесплатная. Расскажите о поездке — подберу страховку, которая реально защитит.
          </p>
        </motion.div>

        {/* Primary CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button
            onClick={onOpenModal}
            size="lg"
            className="bg-[#9B2335] hover:bg-[#7d1c2b] text-white rounded-xl px-10 h-14 text-base font-semibold shadow-lg shadow-[#9B2335]/20 active:scale-95 transition-all"
          >
            Подобрать страховку
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <p className="text-sm text-slate-500 font-mono">Ответ в течение часа</p>
        </motion.div>

        {/* Divider */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.25 }}
          className="flex items-center gap-4 max-w-xs mx-auto"
        >
          <div className="flex-1 h-px bg-slate-800" />
          <span className="text-xs text-slate-600 font-mono uppercase tracking-widest">или</span>
          <div className="flex-1 h-px bg-slate-800" />
        </motion.div>

        {/* Direct contact buttons */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <a
            href="https://wa.me/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2.5 rounded-xl border border-slate-700 bg-slate-900 hover:bg-emerald-600 hover:border-emerald-600 text-slate-300 hover:text-white px-6 h-12 text-sm font-semibold transition-all duration-200 active:scale-95"
          >
            <MessageCircle className="h-4 w-4" />
            WhatsApp
          </a>
          <a
            href="https://t.me/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2.5 rounded-xl border border-slate-700 bg-slate-900 hover:bg-sky-600 hover:border-sky-600 text-slate-300 hover:text-white px-6 h-12 text-sm font-semibold transition-all duration-200 active:scale-95"
          >
            <Send className="h-4 w-4" />
            Telegram
          </a>
        </motion.div>

        {/* Bottom trust line */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="flex items-center justify-center gap-2 pt-2"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs text-slate-500 font-mono">
            Шухрат Азизов · MAGIC Group NTS · 15 лет в страховании
          </span>
        </motion.div>
      </div>
    </section>
  );
}
