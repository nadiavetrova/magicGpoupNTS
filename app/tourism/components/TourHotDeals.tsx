"use client";
import { Flame, Calendar, Clock } from "lucide-react";
import { hotTours } from "../data";

interface Props {
  onOpenModal: (dest?: string) => void;
  catalogHref?: string;
}

export default function TourHotDeals({ onOpenModal, catalogHref = "#" }: Props) {
  return (
    <section className="relative py-16 md:py-24 bg-slate-900 text-slate-100 overflow-hidden">
      <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-teal-500/15 blur-3xl" />
      <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl opacity-50" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 bg-rose-500/10 border border-rose-500/20 px-3 py-1 rounded-full text-rose-400 text-xs font-semibold font-mono uppercase">
            <Flame className="h-4 w-4 animate-pulse text-rose-500 fill-current" />
            <span>Горящие туры · Обновлено сегодня</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight">
            Поймайте максимальную выгоду
          </h2>
          <p className="text-slate-400 text-sm max-w-lg mx-auto leading-relaxed">
            Горящие предложения со скидками до 35%. Количество мест строго ограничено!
          </p>
          <div className="h-1 w-16 bg-rose-500 mx-auto rounded-full mt-2" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {hotTours.map((tour) => (
            <div
              key={tour.id}
              className="bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 shadow-2xl flex flex-col hover:-translate-y-2 transition-all duration-300"
            >
              <div className="aspect-[4/3] overflow-hidden relative bg-slate-800">
                <span className="absolute top-4 left-4 z-10 bg-gradient-to-r from-rose-500 to-orange-500 text-white font-mono text-xs font-bold px-3.5 py-1.5 rounded-full shadow-lg">
                  -{tour.discount}% СКИДКА
                </span>
                <div className="absolute bottom-4 left-4 z-10 bg-slate-900/90 backdrop-blur-md text-white text-[11px] font-bold px-2.5 py-1 rounded-lg border border-slate-800 flex items-center gap-1">
                  <span className="text-amber-400">★</span>
                  <span>{tour.hotelStars}.0 Deluxe</span>
                </div>
                <img
                  referrerPolicy="no-referrer"
                  src={tour.image}
                  alt={tour.title}
                  className="h-full w-full object-cover opacity-85 hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6 text-left flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <h3 className="font-display font-bold text-lg text-white leading-tight">{tour.title}</h3>
                  <div className="grid grid-cols-2 gap-2 text-xs font-mono text-slate-400">
                    <p className="flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5 text-teal-400" />
                      <span>Вылет: {tour.departureDate}</span>
                    </p>
                    <p className="flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5 text-teal-400" />
                      <span>{tour.duration}</span>
                    </p>
                  </div>
                </div>
                <div className="border-t border-slate-800 pt-4 flex items-end justify-between">
                  <div>
                    <span className="text-[10px] text-slate-500 font-mono line-through block">{tour.originalPrice}</span>
                    <span className="text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300 mt-1 block">
                      {tour.price}
                    </span>
                  </div>
                  <button
                    onClick={() => onOpenModal(tour.title)}
                    className="bg-teal-600 hover:bg-teal-500 text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition-all shadow-md active:scale-95"
                  >
                    Забронировать
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <a
            href={catalogHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-slate-950 p-4 rounded-2xl border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white transition-all shadow-lg text-sm font-semibold"
          >
            Смотреть все туры в каталоге →
          </a>
        </div>
      </div>
    </section>
  );
}
