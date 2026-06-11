"use client";
import { useState, useEffect } from "react";
import { X, Send, Check, Sparkles, Compass, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  initialDestination?: string;
}

const destinationsList = [
  "Турция", "ОАЭ · Дубай", "Индия · Гоа", "Таиланд · Пхукет",
  "Мальдивы", "Египет · Хургада", "Другое / Нужна консультация",
];

const budgetOptions = [
  { value: "under-80k", label: "До 80 000 ₽" },
  { value: "80-150k", label: "80 000 – 150 000 ₽" },
  { value: "150-300k", label: "150 000 – 300 000 ₽" },
  { value: "premium", label: "Премиум от 300 000 ₽+" },
];

const timeOptions = ["Ближайший месяц", "Этим летом", "Осенью / Зимой", "Раннее бронирование"];
const travelersOptions = ["Один / Одна", "Вдвоем (Пара)", "Семья с детьми", "Компания друзей"];

export default function TourModal({ isOpen, onClose, initialDestination = "" }: Props) {
  const [step, setStep] = useState(1);
  const [destination, setDestination] = useState(initialDestination || "Турция");
  const [budget, setBudget] = useState("80-150k");
  const [time, setTime] = useState("Ближайший месяц");
  const [travelers, setTravelers] = useState("Вдвоем (Пара)");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [consent, setConsent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (initialDestination) setDestination(initialDestination);
  }, [initialDestination]);

  useEffect(() => {
    if (!isOpen) { setStep(1); setSuccess(false); setLoading(false); }
  }, [isOpen]);

  const handleSubmit = async () => {
    if (!name || !phone || !consent) return;
    setLoading(true);
    try {
      await fetch("/api/telegram", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          section: "tourism",
          name,
          phone,
          services: [`Направление: ${destination}`, `Бюджет: ${budget}`, `Когда: ${time}`, `Кто: ${travelers}`],
        }),
      });
    } catch (_) {}
    setTimeout(() => { setLoading(false); setSuccess(true); }, 1200);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="relative w-full max-w-lg overflow-hidden rounded-3xl bg-white p-6 shadow-2xl md:p-8"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray-100 pb-4">
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-500/10 text-teal-600">
                <Compass className="h-5 w-5 animate-spin" style={{ animationDuration: "6s" }} />
              </span>
              <div>
                <h3 className="font-display text-lg font-semibold text-gray-900">Подбор тура</h3>
                {!success && <p className="text-xs text-gray-400">Шаг {step} из 4</p>}
              </div>
            </div>
            <button onClick={onClose} className="rounded-full p-1.5 text-gray-400 hover:bg-gray-100 transition-colors">
              <X className="h-5 w-5" />
            </button>
          </div>

          {!success ? (
            <div className="mt-6">
              {/* Progress */}
              <div className="h-1.5 w-full rounded-full bg-gray-100">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-teal-500 to-cyan-400"
                  animate={{ width: `${step * 25}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>

              <div className="mt-6 min-h-[220px]">
                {step === 1 && (
                  <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="space-y-3">
                    <label className="block text-sm font-medium text-gray-700">Куда хотите поехать?</label>
                    <div className="grid grid-cols-1 gap-2 max-h-[240px] overflow-y-auto pr-1">
                      {destinationsList.map((d) => (
                        <button key={d} type="button" onClick={() => setDestination(d)}
                          className={`flex items-center justify-between rounded-xl border p-3 text-left text-sm transition-all ${destination === d ? "border-teal-500 bg-teal-50/40 font-medium text-teal-800" : "border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-700"}`}>
                          <span>{d}</span>
                          {destination === d && <Check className="h-4 w-4 text-teal-600" />}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
                    <label className="block text-sm font-medium text-gray-700">Бюджет на человека?</label>
                    <div className="grid grid-cols-1 gap-3">
                      {budgetOptions.map((opt) => (
                        <button key={opt.value} type="button" onClick={() => setBudget(opt.label)}
                          className={`flex items-center justify-between rounded-xl border p-4 text-left text-sm transition-all ${budget === opt.label ? "border-teal-500 bg-teal-50/40 font-medium text-teal-800" : "border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-700"}`}>
                          <span>{opt.label}</span>
                          {budget === opt.label && <Check className="h-4 w-4 text-teal-600" />}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="space-y-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Когда планируете?</label>
                      <div className="grid grid-cols-2 gap-2">
                        {timeOptions.map((opt) => (
                          <button key={opt} type="button" onClick={() => setTime(opt)}
                            className={`rounded-xl border p-2.5 text-center text-xs transition-all ${time === opt ? "border-teal-500 bg-teal-50/40 font-medium text-teal-800" : "border-gray-200 hover:border-gray-300 text-gray-700"}`}>
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">С кем едете?</label>
                      <div className="grid grid-cols-2 gap-2">
                        {travelersOptions.map((opt) => (
                          <button key={opt} type="button" onClick={() => setTravelers(opt)}
                            className={`rounded-xl border p-2.5 text-center text-xs transition-all ${travelers === opt ? "border-teal-500 bg-teal-50/40 font-medium text-teal-800" : "border-gray-200 hover:border-gray-300 text-gray-700"}`}>
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {step === 4 && (
                  <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
                    <div className="space-y-3">
                      <div>
                        <label className="block text-xs font-medium text-gray-500 uppercase mb-1">Ваше имя</label>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Александр"
                          className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500 text-gray-800 bg-white" />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-500 uppercase mb-1">Телефон</label>
                        <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+7 (___) ___-__-__"
                          className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500 text-gray-800 bg-white" />
                      </div>
                    </div>
                    <label className="flex items-start gap-2.5 cursor-pointer">
                      <div
                        onClick={() => setConsent((v) => !v)}
                        className={`flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors mt-0.5 ${consent ? "bg-teal-500 border-teal-500" : "border-gray-300"}`}
                      >
                        {consent && <Check className="h-3 w-3 text-white" />}
                      </div>
                      <span className="text-[11px] text-gray-500 leading-relaxed">
                        Я согласен(а) на обработку персональных данных в соответствии с{" "}
                        <a href="/privacy" target="_blank" className="text-teal-600 underline">Политикой конфиденциальности</a>
                      </span>
                    </label>
                  </motion.div>
                )}
              </div>

              <div className="mt-8 flex items-center justify-between gap-3 border-t border-gray-100 pt-4">
                <button type="button" onClick={() => setStep((s) => Math.max(1, s - 1))} disabled={step === 1}
                  className={`px-4 py-2 text-sm font-medium transition-colors ${step === 1 ? "text-gray-300 cursor-not-allowed" : "text-gray-600 hover:text-gray-900"}`}>
                  Назад
                </button>
                <button
                  type="button"
                  onClick={() => step < 4 ? setStep((s) => s + 1) : handleSubmit()}
                  disabled={step === 4 && (!name || !phone || !consent)}
                  className={`flex items-center gap-2 rounded-xl bg-teal-600 px-6 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-teal-500 active:scale-95 transition-all ${step === 4 && (!name || !phone || !consent) ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      Отправка...
                    </span>
                  ) : step === 4 ? (
                    <><span>Отправить</span><Send className="h-4 w-4" /></>
                  ) : "Продолжить"}
                </button>
              </div>
            </div>
          ) : (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="mt-6 text-center py-6 space-y-4">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                <Sparkles className="h-8 w-8 animate-bounce" />
              </div>
              <h4 className="font-display text-xl font-bold text-gray-900">Заявка отправлена!</h4>
              <p className="text-sm text-gray-600 max-w-sm mx-auto leading-relaxed">
                Шухрат подберёт для вас лучшие варианты в <strong className="text-teal-700">{destination}</strong> и свяжется с вами в течение часа.
              </p>
              <div className="rounded-2xl bg-gray-50 p-4 text-xs text-gray-500 space-y-2 max-w-sm mx-auto text-left border border-gray-100">
                <p className="flex items-center gap-2 text-emerald-800 font-semibold">
                  <ShieldCheck className="h-4 w-4 text-emerald-600 flex-shrink-0" />
                  Всё под контролем:
                </p>
                <p>📞 Шухрат свяжется с вами по номеру <strong>{phone}</strong> в течение часа с готовыми вариантами туров.</p>
              </div>
              <button type="button" onClick={onClose}
                className="mt-6 w-full rounded-xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white hover:bg-slate-800 active:scale-95 transition-all">
                Закрыть
              </button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
