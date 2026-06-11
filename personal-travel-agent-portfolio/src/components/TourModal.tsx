/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { X, Send, Check, Sparkles, Compass, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface TourModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialDestination?: string;
}

export default function TourModal({ isOpen, onClose, initialDestination = "" }: TourModalProps) {
  const [step, setStep] = useState<number>(1);
  const [destination, setDestination] = useState<string>(initialDestination || "Бали, Индонезия");
  const [budget, setBudget] = useState<string>("100k-150k");
  const [time, setTime] = useState<string>("Ближайший месяц");
  const [travelers, setTravelers] = useState<string>("Вдвоем");
  const [name, setName] = useState<string>("");
  const [contact, setContact] = useState<string>("");
  const [contactMethod, setContactMethod] = useState<string>("Telegram");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const destinationsList = [
    "Бали, Индонезия",
    "Каппадокия, Турция",
    "Пхукет, Таиланд",
    "Киото, Япония",
    "Дубай, ОАЭ",
    "Амальфи, Италия",
    "Другое / Нужна консультация"
  ];

  const budgetOptions = [
    { value: "under-100k", label: "До 100 000 ₽" },
    { value: "100k-200k", label: "100 000 – 200 000 ₽" },
    { value: "200k-350k", label: "200 000 – 350 000 ₽" },
    { value: "premium", label: "Премиум от 350 000 ₽+" }
  ];

  const timeOptions = [
    "Ближайший месяц",
    "Этим летом",
    "Осенью / Зимой",
    "Раннее бронирование на след. год"
  ];

  const travelersOptions = [
    "Один / Одна",
    "Вдвоем (Пара)",
    "Семья с детьми",
    "Компания друзей"
  ];

  const handleNext = () => {
    if (step < 4) {
      setStep(prev => prev + 1);
    } else {
      handleSubmit();
    }
  };

  const handlePrev = () => {
    if (step > 1) setStep(prev => prev - 1);
  };

  const handleSubmit = () => {
    if (!name || !contact) return;
    setIsLoading(true);
    // Simulate premium calculations
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
    }, 1800);
  };

  const handleReset = () => {
    setStep(1);
    setDestination(initialDestination || "Бали, Индонезия");
    setBudget("100k-150k");
    setTime("Ближайший месяц");
    setTravelers("Вдвоем");
    setName("");
    setContact("");
    setIsSuccess(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div id="tour-modal-overlay" className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop glass */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
        />

        {/* Modal box */}
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
                <Compass className="h-5 w-5 animate-spin" style={{ animationDuration: '6s' }} />
              </span>
              <div>
                <h3 className="font-display text-lg font-semibold text-gray-900">Подбор идеального тура</h3>
                <p id="tour-modal-step-indicator" className="text-xs text-gray-400">Шаг {step} из 4</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="rounded-full p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {!isSuccess ? (
            <div className="mt-6">
              {/* Progress Bar */}
              <div className="h-1.5 w-full rounded-full bg-gray-100">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-teal-500 to-cyan-400"
                  initial={{ width: "25%" }}
                  animate={{ width: `${step * 25}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>

              {/* Form Content */}
              <div className="mt-6 min-h-[220px]">
                {step === 1 && (
                  <motion.div
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-3"
                  >
                    <label className="block text-sm font-medium text-gray-700">Куда вы мечтаете отправиться?</label>
                    <div className="grid grid-cols-1 gap-2 max-h-[240px] overflow-y-auto pr-1">
                      {destinationsList.map((dest) => (
                        <button
                          key={dest}
                          type="button"
                          onClick={() => setDestination(dest)}
                          className={`flex items-center justify-between rounded-xl border p-3 text-left text-sm transition-all ${
                            destination === dest
                              ? "border-teal-500 bg-teal-50/40 font-medium text-teal-800"
                              : "border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-700"
                          }`}
                        >
                          <span>{dest}</span>
                          {destination === dest && <Check className="h-4 w-4 text-teal-600" />}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-4"
                  >
                    <label className="block text-sm font-medium text-gray-700">Каковой плановый бюджет на одного человека?</label>
                    <div className="grid grid-cols-1 gap-3">
                      {budgetOptions.map((opt) => (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() => setBudget(opt.label)}
                          className={`flex items-center justify-between rounded-xl border p-4 text-left text-sm transition-all ${
                            budget === opt.label
                              ? "border-teal-500 bg-teal-50/40 font-medium text-teal-800"
                              : "border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-700"
                          }`}
                        >
                          <span>{opt.label}</span>
                          {budget === opt.label && <Check className="h-4 w-4 text-teal-600" />}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-5"
                  >
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Когда планируете вылет?</label>
                      <div className="grid grid-cols-2 gap-2">
                        {timeOptions.map((opt) => (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => setTime(opt)}
                            className={`rounded-xl border p-2.5 text-center text-xs transition-all ${
                              time === opt
                                ? "border-teal-500 bg-teal-50/40 font-medium text-teal-800"
                                : "border-gray-200 hover:border-gray-300 text-gray-700"
                            }`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">С кем путешествуете?</label>
                      <div className="grid grid-cols-2 gap-2">
                        {travelersOptions.map((opt) => (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => setTravelers(opt)}
                            className={`rounded-xl border p-2.5 text-center text-xs transition-all ${
                              travelers === opt
                                ? "border-teal-500 bg-teal-50/40 font-medium text-teal-800"
                                : "border-gray-200 hover:border-gray-300 text-gray-700"
                            }`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {step === 4 && (
                  <motion.div
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-4"
                  >
                    <div className="rounded-xl bg-gray-50 p-4 text-xs text-gray-600 space-y-1 border border-gray-100">
                      <p className="font-semibold text-gray-800 text-sm mb-1">🎁 Ваш подарок за расчет:</p>
                      <p>✨ Авторский чек-лист «Идеальная подготовка к вылету без стресса» закреплен за вашим контактом!</p>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <label className="block text-xs font-medium text-gray-500 uppercase mb-1">Ваше имя</label>
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Александр"
                          className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-teal-500 focus:outline-none transition-all focus:ring-1 focus:ring-teal-500 text-gray-800 bg-white"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-gray-500 uppercase mb-1">Способ связи</label>
                        <div className="flex gap-2 mb-2">
                          {["Telegram", "WhatsApp", "Телефон"].map((method) => (
                            <button
                              key={method}
                              type="button"
                              onClick={() => setContactMethod(method)}
                              className={`flex-1 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                                contactMethod === method
                                  ? "bg-teal-600 text-white border-teal-600"
                                  : "bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100"
                              }`}
                            >
                              {method}
                            </button>
                          ))}
                        </div>
                        <input
                          type="text"
                          required
                          value={contact}
                          onChange={(e) => setContact(e.target.value)}
                          placeholder={contactMethod === "Telegram" ? "@username или +7..." : "+7..."}
                          className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-teal-500 focus:outline-none transition-all focus:ring-1 focus:ring-teal-500 text-gray-800 bg-white"
                        />
                      </div>
                    </div>

                    <p className="text-[10px] text-gray-400 text-center mt-2 leading-normal">
                      Нажимая кнопку, вы подтверждаете согласие с Политикой конфиденциальности. Ваши данные защищены шифрованием TLS/SSL.
                    </p>
                  </motion.div>
                )}
              </div>

              {/* Navigation buttons */}
              <div className="mt-8 flex items-center justify-between gap-3 border-t border-gray-100 pt-4">
                <button
                  type="button"
                  onClick={handlePrev}
                  disabled={step === 1}
                  className={`px-4 py-2 text-sm font-medium transition-colors ${
                    step === 1 ? "text-gray-300 cursor-not-allowed" : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Назад
                </button>

                <button
                  type="button"
                  onClick={handleNext}
                  disabled={step === 4 && (!name || !contact)}
                  className={`flex items-center gap-2 rounded-xl bg-teal-600 px-6 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-teal-500 active:scale-95 transition-all ${
                    step === 4 && (!name || !contact) ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      Расчет...
                    </span>
                  ) : step === 4 ? (
                    <>
                      <span>Получить тур</span>
                      <Send className="h-4 w-4" />
                    </>
                  ) : (
                    "Продолжить"
                  )}
                </button>
              </div>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-6 text-center py-6 space-y-4"
            >
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                <Sparkles className="h-8 w-8 animate-bounce" />
              </div>
              <h4 className="font-display text-xl font-bold text-gray-900">Заявка успешно отправлена!</h4>
              <p className="text-sm text-gray-600 max-w-sm mx-auto leading-relaxed">
                Мария уже анализирует лучшие отели для направления <strong className="text-teal-700">{destination}</strong> под ваш бюджет <strong className="text-teal-700">{budget}</strong>.
              </p>
              <div className="rounded-2xl bg-gray-50 p-4 text-xs text-gray-500 space-y-2 max-w-sm mx-auto text-left border border-gray-100">
                <p className="flex items-center gap-2 text-emerald-800 font-semibold-semibold">
                  <ShieldCheck className="h-4 w-4 text-emerald-600 flex-shrink-0" />
                  Экспертное сопровождение гарантировано:
                </p>
                <p>📞 Мария свяжется с вами по указанному <strong>{contactMethod} ({contact})</strong> в течение 1.5 - 2 часов с готовыми презентациями и авторским чек-листом.</p>
              </div>
              <button
                type="button"
                onClick={handleReset}
                className="mt-6 w-full rounded-xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-slate-800 active:scale-95"
              >
                Закрыть окно
              </button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
