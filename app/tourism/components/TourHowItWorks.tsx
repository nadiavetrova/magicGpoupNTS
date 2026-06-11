"use client";
import { FileSpreadsheet, Map, CheckCircle, Ship } from "lucide-react";
import { timelineSteps } from "../data";

const icons = [
  <FileSpreadsheet className="h-5 w-5 text-white" />,
  <Map className="h-5 w-5 text-white" />,
  <CheckCircle className="h-5 w-5 text-white" />,
  <Ship className="h-5 w-5 text-white" />,
];

export default function TourHowItWorks() {
  return (
    <section className="relative py-16 md:py-24 bg-[#f8fafc] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <p className="text-xs font-bold text-teal-600 uppercase tracking-widest font-mono">как это работает</p>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Простой путь к вашему идеальному отдыху
          </h2>
          <p className="text-slate-500 text-sm max-w-lg mx-auto">
            Никаких очередей и офисов. Всё решается онлайн — быстро и удобно.
          </p>
          <div className="h-1 w-12 bg-teal-500 mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-6">
          {timelineSteps.map((step, i) => (
            <div
              key={step.number}
              className="bg-white border border-gray-100 hover:border-teal-500/30 p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 text-left flex flex-col items-start gap-4 relative group"
            >
              <div className="flex items-center gap-4 lg:flex-col lg:items-start lg:gap-3 w-full">
                <div className="h-10 w-10 rounded-full bg-teal-600 flex items-center justify-center shadow-md shadow-teal-500/20 shrink-0">
                  {icons[i]}
                </div>
                <div>
                  <span className="text-[10px] font-mono text-teal-600 uppercase font-semibold">Шаг 0{step.number}</span>
                  <h3 className="font-display font-extrabold text-base text-slate-900 mt-0.5">{step.title}</h3>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{step.description}</p>
              <span className="absolute bottom-4 right-4 text-slate-100 text-5xl font-display font-black select-none pointer-events-none">
                0{step.number}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
