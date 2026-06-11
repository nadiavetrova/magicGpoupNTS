"use client";
import { motion } from "motion/react";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Анна К.",
    role: "Туристическая · Бали",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&q=80",
    text: "Когда в Бали попала в больницу, страховка покрыла всё полностью — $12 000. Подруга купила дешёвую страховку с агрегатора, ей отказали. Шухрат заранее предупредил, на что смотреть.",
    rating: 5,
  },
  {
    name: "Игорь М.",
    role: "КАСКО · Hyundai Tucson",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&q=80",
    text: "Сэкономил 40% на КАСКО — те же условия, но у другого страховщика. Шухрат объяснил разницу между тремя вариантами, не навязал дорогой. Оформили онлайн за 20 минут.",
    rating: 5,
  },
  {
    name: "Марина Л.",
    role: "Туристическая · США",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&q=80",
    text: "Объяснил все тонкости покрытия в США. Выбрали полис с нужной суммой, страховой случай прошёл без лишних вопросов. Профессионал, который реально знает продукт.",
    rating: 5,
  },
];

export default function InsuranceTrust() {
  return (
    <section className="py-24 lg:py-32 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16 space-y-4"
        >
          <p className="text-xs font-mono font-bold tracking-[0.2em] text-[#9B2335] uppercase">
            Отзывы клиентов
          </p>
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight">
            Что говорят клиенты
          </h2>
          <p className="text-lg text-slate-500 max-w-xl mx-auto leading-relaxed">
            Реальные истории людей, которым страховка помогла в нужный момент.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="bg-white rounded-2xl border border-slate-200 p-8 space-y-6 hover:shadow-lg hover:border-slate-300 transition-all duration-300 flex flex-col"
            >
              {/* Quote icon */}
              <Quote className="h-8 w-8 text-slate-100 fill-slate-100 flex-shrink-0" />

              {/* Stars */}
              <div className="flex gap-0.5">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                ))}
              </div>

              {/* Text */}
              <p className="text-sm text-slate-700 leading-relaxed flex-1">{t.text}</p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                <img
                  src={t.avatar}
                  alt={t.name}
                  referrerPolicy="no-referrer"
                  className="h-10 w-10 rounded-full object-cover flex-shrink-0"
                />
                <div>
                  <p className="text-sm font-semibold text-slate-900">{t.name}</p>
                  <p className="text-xs text-slate-400 font-mono mt-0.5">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
