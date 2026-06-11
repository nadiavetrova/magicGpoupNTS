"use client";
import { Compass, BadgePercent, PhoneCall, Map, ShieldCheck, Sparkles } from "lucide-react";
import { advantages } from "../data";

const getIcon = (name: string) => {
  const cls = "h-6 w-6 text-teal-600";
  switch (name) {
    case "Compass": return <Compass className={cls} />;
    case "BadgePercent": return <BadgePercent className={cls} />;
    case "PhoneCall": return <PhoneCall className={cls} />;
    case "Map": return <Map className={cls} />;
    case "ShieldCheck": return <ShieldCheck className={cls} />;
    case "Sparkles": return <Sparkles className={cls} />;
    default: return <Compass className={cls} />;
  }
};

export default function TourAdvantages() {
  return (
    <section className="relative py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <p className="text-xs font-bold text-teal-600 uppercase tracking-widest font-mono">почему выбирают меня</p>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Превосходство в каждой детали вашего отдыха
          </h2>
          <div className="h-1 w-16 bg-teal-500 mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {advantages.map((adv) => (
            <div
              key={adv.id}
              className="group relative p-6 bg-[#f8fafc] hover:bg-white rounded-2xl border border-slate-100 hover:border-teal-500/30 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col items-start gap-4"
            >
              <div className="h-12 w-12 rounded-xl bg-white flex items-center justify-center shadow-md text-teal-600 group-hover:bg-teal-600 group-hover:text-white transition-all duration-300 shrink-0">
                <div className="group-hover:scale-110 transition-transform duration-300 [&_svg]:group-hover:text-white">
                  {getIcon(adv.iconName)}
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="font-display font-bold text-base text-slate-900 group-hover:text-teal-950 transition-colors">
                  {adv.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">{adv.subtitle}</p>
              </div>
              <div className="absolute top-2 right-2 h-1.5 w-1.5 rounded-full bg-slate-200 group-hover:bg-teal-500 transition-colors" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
