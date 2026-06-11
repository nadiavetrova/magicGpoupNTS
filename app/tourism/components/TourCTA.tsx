"use client";
import { Compass, Sparkles } from "lucide-react";

interface Props {
  onOpenModal: () => void;
  catalogHref?: string;
}

export default function TourCTA({ onOpenModal, catalogHref = "#" }: Props) {
  return (
    <section className="relative py-24 sm:py-32 overflow-hidden text-center text-white">
      <div className="absolute inset-0 z-0">
        <img
          referrerPolicy="no-referrer"
          src="https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=1600&q=80"
          alt="travel background"
          className="h-full w-full object-cover brightness-50"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/90 to-teal-950/80 mix-blend-multiply" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 space-y-8">
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-400 backdrop-blur-md animate-pulse mx-auto">
          <Sparkles className="h-6 w-6" />
        </div>

        <div className="space-y-4 max-w-2xl mx-auto">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.15]">
            Готовы отправиться<br />в незабываемое путешествие?
          </h2>
          <p className="text-sm sm:text-base text-slate-300 max-w-lg mx-auto">
            Расскажите о пожеланиях — через 2 часа у вас будет готовая подборка туров без скрытых комиссий.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onOpenModal}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl bg-teal-500 hover:bg-teal-400 px-8 py-4 text-base font-semibold text-slate-950 shadow-xl active:scale-95 transition-all"
          >
            <Compass className="h-5 w-5 animate-spin" style={{ animationDuration: "6s" }} />
            <span>Подобрать тур</span>
          </button>
          <a
            href={catalogHref}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl border border-white/20 bg-white/10 hover:bg-white/20 px-8 py-4 text-base font-semibold text-white backdrop-blur-md active:scale-95 transition-all"
          >
            <span>Перейти в каталог →</span>
          </a>
        </div>

        <div className="text-xs text-slate-400 font-mono flex items-center justify-center gap-2">
          <span className="h-2 w-2 rounded-full bg-emerald-400 block animate-pulse" />
          <span>Шухрат на связи — ответ в течение часа</span>
        </div>
      </div>
    </section>
  );
}
