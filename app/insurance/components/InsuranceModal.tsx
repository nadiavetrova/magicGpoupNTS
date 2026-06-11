"use client";
import { useState, useEffect } from "react";
import { Check, ArrowRight, Sparkles, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface Props {
  open: boolean;
  onClose: () => void;
  initialType?: string;
}

const insuranceTypeOptions = [
  "Туристическая",
  "Жизнь и здоровье",
  "Имущество",
  "КАСКО / ОСАГО",
  "Нужна консультация",
];

export default function InsuranceModal({ open, onClose, initialType = "" }: Props) {
  const [step, setStep] = useState(1);
  const [selectedType, setSelectedType] = useState(initialType || "Туристическая");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [consent, setConsent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (initialType) setSelectedType(initialType);
  }, [initialType]);

  useEffect(() => {
    if (!open) {
      setTimeout(() => { setStep(1); setSuccess(false); setLoading(false); }, 300);
    }
  }, [open]);

  const canSubmit = name.trim() && phone.trim() && consent;

  const handleSubmit = async () => {
    if (!canSubmit) return;
    setLoading(true);
    try {
      await fetch("/api/telegram", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          section: "insurance",
          name,
          phone,
          services: [selectedType],
        }),
      });
    } catch (_) {}
    setTimeout(() => { setLoading(false); setSuccess(true); }, 1200);
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-md rounded-2xl p-0 overflow-hidden border-0 shadow-2xl">
        {!success ? (
          <div>
            {/* Progress bar */}
            <div className="h-1 w-full bg-slate-100">
              <motion.div
                className="h-full bg-[#9B2335]"
                animate={{ width: `${step === 1 ? 50 : 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>

            <div className="p-7">
              <DialogHeader className="mb-6">
                <DialogTitle className="text-xl font-bold text-slate-900">
                  {step === 1 ? "Какая страховка нужна?" : "Контактные данные"}
                </DialogTitle>
                <p className="text-sm text-slate-500 mt-1">Шаг {step} из 2 · Консультация бесплатная</p>
              </DialogHeader>

              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="space-y-2"
                  >
                    {insuranceTypeOptions.map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => setSelectedType(opt)}
                        className={`w-full flex items-center justify-between rounded-xl border p-4 text-left text-sm transition-all ${
                          selectedType === opt
                            ? "border-[#9B2335] bg-[#9B2335]/5 text-[#9B2335] font-semibold"
                            : "border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700"
                        }`}
                      >
                        <span>{opt}</span>
                        {selectedType === opt && <Check className="h-4 w-4" />}
                      </button>
                    ))}
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="space-y-4"
                  >
                    <div className="rounded-xl bg-[#9B2335]/5 border border-[#9B2335]/15 px-4 py-3 flex items-center gap-2">
                      <Check className="h-4 w-4 text-[#9B2335] flex-shrink-0" />
                      <span className="text-sm text-[#9B2335] font-medium">{selectedType}</span>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <label className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-1.5">Ваше имя</label>
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Александр"
                          className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-[#9B2335] focus:outline-none focus:ring-2 focus:ring-[#9B2335]/20 text-slate-800 transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-1.5">Телефон</label>
                        <input
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+7 (___) ___-__-__"
                          className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-[#9B2335] focus:outline-none focus:ring-2 focus:ring-[#9B2335]/20 text-slate-800 transition-all"
                        />
                      </div>
                    </div>

                    <label className="flex items-start gap-3 cursor-pointer">
                      <div
                        onClick={() => setConsent((v) => !v)}
                        className={`flex-shrink-0 w-5 h-5 rounded-md border-2 flex items-center justify-center transition-colors mt-0.5 ${
                          consent ? "bg-[#9B2335] border-[#9B2335]" : "border-slate-300 hover:border-[#9B2335]/50"
                        }`}
                      >
                        {consent && <Check className="h-3 w-3 text-white" />}
                      </div>
                      <span className="text-xs text-slate-500 leading-relaxed">
                        Согласен(а) на обработку персональных данных согласно{" "}
                        <a href="/privacy" target="_blank" className="text-[#9B2335] underline hover:no-underline">
                          Политике конфиденциальности
                        </a>
                      </span>
                    </label>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Footer */}
              <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-100">
                {step === 2 ? (
                  <button type="button" onClick={() => setStep(1)} className="text-sm text-slate-400 hover:text-slate-700 transition-colors">
                    ← Назад
                  </button>
                ) : <span />}

                <Button
                  onClick={step === 1 ? () => setStep(2) : handleSubmit}
                  disabled={step === 2 && !canSubmit}
                  className="bg-[#9B2335] hover:bg-[#7d1c2b] text-white rounded-xl px-7 h-11 font-semibold shadow-sm shadow-[#9B2335]/20 disabled:opacity-40 transition-all active:scale-95"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      Отправка...
                    </span>
                  ) : step === 1 ? (
                    <span className="flex items-center gap-2">Продолжить <ArrowRight className="h-4 w-4" /></span>
                  ) : (
                    <span className="flex items-center gap-2">Отправить <ArrowRight className="h-4 w-4" /></span>
                  )}
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-8 text-center space-y-5"
          >
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
              <Sparkles className="h-8 w-8 text-emerald-600 animate-bounce" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900">Заявка принята!</h3>
              <p className="text-sm text-slate-500 mt-2 leading-relaxed">
                Шухрат свяжется с вами по номеру <strong className="text-slate-700">{phone}</strong> в течение часа с подборкой страховок.
              </p>
            </div>
            <div className="rounded-xl bg-slate-50 p-4 text-xs text-slate-500 text-left border border-slate-100 space-y-1">
              <p className="flex items-center gap-2 font-semibold text-slate-700">
                <ShieldCheck className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                Что дальше:
              </p>
              <p>Получите 2–3 варианта с реальным покрытием, без скрытых исключений.</p>
            </div>
            <Button onClick={onClose} className="w-full bg-slate-900 hover:bg-slate-800 text-white rounded-xl h-11">
              Закрыть
            </Button>
          </motion.div>
        )}
      </DialogContent>
    </Dialog>
  );
}
