"use client";

import { useEffect, useState, useCallback } from "react";
import "./tourism.css";

function CompassRose({ className }: { className?: string }) {
  const C = 210, R = 190;

  // Внешние риски (72 деления × 5°)
  const ticks = Array.from({ length: 72 }, (_, i) => {
    const deg = i * 5;
    const rad = (deg - 90) * Math.PI / 180;
    const isCardinal = deg % 90 === 0;
    const isMajor    = deg % 45 === 0;
    const isMid      = deg % 10 === 0;
    const len = isCardinal ? 26 : isMajor ? 18 : isMid ? 12 : 6;
    const x1 = C + R * Math.cos(rad), y1 = C + R * Math.sin(rad);
    const x2 = C + (R - len) * Math.cos(rad), y2 = C + (R - len) * Math.sin(rad);
    return { x1, y1, x2, y2, w: isCardinal ? 1.6 : isMajor ? 1.0 : isMid ? 0.55 : 0.3 };
  });

  // Внутренние риски на r=148 (каждые 10°)
  const innerTicks = Array.from({ length: 36 }, (_, i) => {
    const deg = i * 10;
    const rad = (deg - 90) * Math.PI / 180;
    const isCard = deg % 90 === 0;
    const r2 = 148;
    const x1 = C + r2 * Math.cos(rad), y1 = C + r2 * Math.sin(rad);
    const x2 = C + (r2 - (isCard ? 12 : 7)) * Math.cos(rad), y2 = C + (r2 - (isCard ? 12 : 7)) * Math.sin(rad);
    return { x1, y1, x2, y2, w: isCard ? 0.7 : 0.3 };
  });

  const DIRS = ['n','e','s','w'] as const;

  return (
    <svg className={className} viewBox="0 0 420 420" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {/* Концентрические окружности */}
      <circle cx={C} cy={C} r={R}   stroke="#e8c97a" strokeWidth="0.9"/>
      <circle cx={C} cy={C} r={172} stroke="#e8c97a" strokeWidth="0.2" opacity="0.5"/>
      <circle cx={C} cy={C} r={155} stroke="#e8c97a" strokeWidth="0.4"/>
      <circle cx={C} cy={C} r={120} stroke="#e8c97a" strokeWidth="0.35"/>
      <circle cx={C} cy={C} r={82}  stroke="#e8c97a" strokeWidth="0.4"/>
      <circle cx={C} cy={C} r={48}  stroke="#e8c97a" strokeWidth="0.35"/>
      <circle cx={C} cy={C} r={18}  stroke="#e8c97a" strokeWidth="0.5"/>
      <circle cx={C} cy={C} r={8}   stroke="#e8c97a" strokeWidth="0.5"/>
      <circle cx={C} cy={C} r={3.5} fill="#e8c97a"   fillOpacity="0.8"/>

      {/* Крестовые линии — кардинальные */}
      <line x1={C} y1={C-R} x2={C} y2={C+R} stroke="#e8c97a" strokeWidth="0.5"/>
      <line x1={C-R} y1={C} x2={C+R} y2={C} stroke="#e8c97a" strokeWidth="0.5"/>
      {/* Диагонали — промежуточные */}
      <line x1={C-134} y1={C-134} x2={C+134} y2={C+134} stroke="#e8c97a" strokeWidth="0.3"/>
      <line x1={C+134} y1={C-134} x2={C-134} y2={C+134} stroke="#e8c97a" strokeWidth="0.3"/>
      {/* 22.5° линии */}
      {[22.5,67.5,112.5,157.5].map((deg) => {
        const r1 = (deg-90)*Math.PI/180, r2 = r1+Math.PI;
        return <line key={deg}
          x1={C+R*Math.cos(r1)} y1={C+R*Math.sin(r1)}
          x2={C+R*Math.cos(r2)} y2={C+R*Math.sin(r2)}
          stroke="#e8c97a" strokeWidth="0.2"/>;
      })}

      {/* Внешние риски */}
      {ticks.map((t, i) => (
        <line key={i} x1={t.x1} y1={t.y1} x2={t.x2} y2={t.y2} stroke="#e8c97a" strokeWidth={t.w}/>
      ))}
      {/* Внутренние риски */}
      {innerTicks.map((t, i) => (
        <line key={i} x1={t.x1} y1={t.y1} x2={t.x2} y2={t.y2} stroke="#e8c97a" strokeWidth={t.w} opacity="0.55"/>
      ))}

      {/* 4 стрелки N/E/S/W — классический шеврон со срезанным основанием */}
      {[0,90,180,270].map((deg,i) => {
        const rad = (deg-90)*Math.PI/180;
        // Острый кончик
        const tx = C + 178*Math.cos(rad),  ty = C + 178*Math.sin(rad);
        // Плечи (широкая часть)
        const lx = C + 152*Math.cos(rad-0.19), ly = C + 152*Math.sin(rad-0.19);
        const rx = C + 152*Math.cos(rad+0.19), ry = C + 152*Math.sin(rad+0.19);
        // Основание со срезом (вогнутое)
        const bl = C + 140*Math.cos(rad-0.07), bly = C + 140*Math.sin(rad-0.07);
        const br = C + 140*Math.cos(rad+0.07), bry = C + 140*Math.sin(rad+0.07);
        const notch = C + 132*Math.cos(rad),   notchy = C + 132*Math.sin(rad);
        // Итоговая форма: tip → leftShoulder → leftBase → notch → rightBase → rightShoulder
        return <polygon key={deg}
          className={`tr-compass-arrow tr-compass-arrow--${DIRS[i]}`}
          points={`${tx},${ty} ${lx},${ly} ${bl},${bly} ${notch},${notchy} ${br},${bry} ${rx},${ry}`}/>;
      })}
    </svg>
  );
}

// Карта мира — упрощённые контуры материков
// Карта мира — детальные контуры (equirectangular 1000×500)
// x=(lon+180)/360*1000  y=(90−lat)/180*500
function WorldMap({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 1000 500" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">

      {/* Сетка */}
      {[-150,-120,-90,-60,-30,0,30,60,90,120,150].map(lon => {
        const x=(lon+180)/360*1000;
        return <line key={lon} x1={x} y1={0} x2={x} y2={500} stroke="#e8c97a" strokeWidth="0.35" opacity="0.28"/>;
      })}
      {[-60,-30,0,30,60].map(lat => {
        const y=(90-lat)/180*500;
        return <line key={lat} x1={0} y1={y} x2={1000} y2={y} stroke="#e8c97a" strokeWidth="0.35" opacity="0.28"/>;
      })}
      <line x1={0} y1={250} x2={1000} y2={250} stroke="#e8c97a" strokeWidth="0.7" opacity="0.4"/>

      {/* Северная Америка */}
      <path d="M105,85 L120,72 L138,65 L158,62 L180,65 L200,72 L218,80 L235,90 L248,105 L255,120 L258,138 L252,155 L245,168 L248,178 L240,188 L228,192 L215,185 L205,172 L198,162 L192,148 L185,162 L188,178 L182,188 L172,195 L160,188 L150,175 L140,158 L128,142 L118,125 L108,108 Z"
        stroke="#e8c97a" strokeWidth="1.2" fill="rgba(232,201,122,0.12)"/>
      <path d="M228,192 L232,205 L228,215 L222,212 L220,200 Z"
        stroke="#e8c97a" strokeWidth="0.7" fill="rgba(232,201,122,0.1)"/>
      <path d="M215,185 L228,192 L222,200 L218,215 L208,225 L198,225 L192,215 L195,202 L205,192 Z"
        stroke="#e8c97a" strokeWidth="0.8" fill="rgba(232,201,122,0.1)"/>
      <path d="M255,42 L272,38 L290,42 L298,55 L292,70 L275,78 L258,72 L248,58 Z"
        stroke="#e8c97a" strokeWidth="0.8" fill="rgba(232,201,122,0.1)"/>

      {/* Южная Америка */}
      <path d="M205,248 L220,240 L238,238 L256,242 L272,250 L285,265 L290,285 L290,308 L284,332 L272,355 L258,375 L242,392 L226,405 L212,412 L202,402 L196,382 L192,358 L192,332 L196,308 L194,282 L198,262 Z"
        stroke="#e8c97a" strokeWidth="1.2" fill="rgba(232,201,122,0.12)"/>

      {/* Европа */}
      <path d="M452,168 L455,158 L450,142 L450,125 L452,112 L448,98 L452,85 L460,75 L472,68 L488,65 L505,65 L520,70 L532,78 L535,90 L530,102 L522,112 L512,118 L520,128 L528,140 L525,150 L518,155 L508,160 L495,162 L482,162 L470,165 L460,170 Z"
        stroke="#e8c97a" strokeWidth="1.2" fill="rgba(232,201,122,0.12)"/>
      <path d="M488,65 L495,55 L505,50 L518,52 L526,62 L530,72 L520,70 L505,65 Z"
        stroke="#e8c97a" strokeWidth="0.7" fill="rgba(232,201,122,0.1)"/>
      <path d="M500,132 L505,145 L510,158 L508,172 L502,175 L496,162 L494,148 Z"
        stroke="#e8c97a" strokeWidth="0.7" fill="rgba(232,201,122,0.1)"/>
      <path d="M448,98 L445,88 L450,78 L458,78 L462,88 L458,98 Z"
        stroke="#e8c97a" strokeWidth="0.7" fill="rgba(232,201,122,0.1)"/>

      {/* Африка */}
      <path d="M458,170 L470,165 L485,158 L505,152 L525,150 L545,150 L568,150 L582,152 L598,150 L612,160 L616,175 L612,195 L625,208 L638,218 L645,232 L640,250 L628,265 L612,275 L600,288 L588,308 L572,328 L556,345 L545,352 L535,342 L522,325 L515,305 L518,282 L520,262 L515,245 L508,235 L495,230 L480,228 L465,222 L452,212 L448,195 L450,178 Z"
        stroke="#e8c97a" strokeWidth="1.2" fill="rgba(232,201,122,0.12)"/>
      <path d="M618,288 L625,278 L632,285 L635,305 L628,320 L618,318 L614,305 Z"
        stroke="#e8c97a" strokeWidth="0.7" fill="rgba(232,201,122,0.1)"/>

      {/* Азия — основной массив */}
      <path d="M525,150 L538,140 L552,132 L568,125 L585,118 L602,108 L622,98 L648,88 L678,78 L712,70 L748,65 L780,62 L812,65 L842,72 L865,82 L882,95 L892,110 L888,125 L872,135 L852,138 L832,138 L815,142 L805,150 L795,162 L785,172 L775,185 L762,198 L752,212 L748,225 L752,238 L742,242 L728,240 L718,232 L708,222 L698,212 L690,202 L680,195 L665,192 L652,195 L645,208 L638,218 L625,208 L612,195 L612,175 L612,160 L598,150 L582,150 L568,150 L545,150 Z"
        stroke="#e8c97a" strokeWidth="1.2" fill="rgba(232,201,122,0.12)"/>
      <path d="M612,160 L625,162 L640,170 L652,180 L660,195 L662,212 L655,225 L642,232 L630,225 L620,215 L618,202 L614,192 L612,175 Z"
        stroke="#e8c97a" strokeWidth="0.9" fill="rgba(232,201,122,0.12)"/>
      <path d="M698,178 L712,180 L724,192 L730,208 L730,228 L722,242 L710,244 L700,238 L692,225 L688,210 L690,195 L695,185 Z"
        stroke="#e8c97a" strokeWidth="0.9" fill="rgba(232,201,122,0.12)"/>
      <path d="M758,185 L765,190 L770,205 L764,218 L755,222 L748,215 L750,200 Z"
        stroke="#e8c97a" strokeWidth="0.7" fill="rgba(232,201,122,0.1)"/>
      <path d="M802,130 L810,125 L815,135 L810,145 L800,145 L796,138 Z"
        stroke="#e8c97a" strokeWidth="0.6" fill="rgba(232,201,122,0.1)"/>
      <path d="M818,115 L830,110 L840,118 L836,130 L824,134 L814,128 Z"
        stroke="#e8c97a" strokeWidth="0.6" fill="rgba(232,201,122,0.1)"/>

      {/* Австралия */}
      <path d="M735,300 L752,285 L772,280 L795,282 L818,288 L838,298 L848,318 L848,340 L840,358 L825,372 L805,378 L782,378 L760,372 L742,360 L730,345 L726,325 L728,310 Z"
        stroke="#e8c97a" strokeWidth="1.2" fill="rgba(232,201,122,0.12)"/>

      {/* Одна точка — Средиземноморье/Европа (над кнопками в секции)
          lon=15°E lat=45°N → x=542 y=125 */}
      {[0, 0.85, 1.7].map((d, i) => (
        <circle key={i} cx={542} cy={125} r={6}
          stroke="#e8c97a" strokeWidth="1.4" fill="none"
          className="tr-map-ping"
          style={{ animationDelay: `${d}s` }}/>
      ))}
      <circle cx={542} cy={125} r={3.5} fill="#e8c97a" fillOpacity="0.95"/>
      <circle cx={542} cy={125} r={8} stroke="#e8c97a" strokeWidth="0.5" fill="none" opacity="0.35"/>
    </svg>
  );
}

// Сетка координат — глобус-проекция
function CoordGrid({ className }: { className?: string }) {
  const C = 210, R = 190;
  // Параллели (горизонтальные эллипсы)
  const parallels = [-60,-30,0,30,60].map(lat => {
    const ry = R * Math.sin((Math.abs(lat) / 90) * Math.PI / 2);
    const y  = C - R * Math.sin((lat / 90) * Math.PI / 2);
    const rx = R * Math.cos((lat / 90) * Math.PI / 2);
    return { y, rx, ry: rx * 0.22, isEquator: lat === 0 };
  });
  // Меридианы (вертикальные эллипсы)
  const meridians = [0,30,60,90,120,150].map(lon => ({
    rx: R * Math.sin((lon / 90) * Math.PI / 2),
  }));

  return (
    <svg className={className} viewBox="0 0 420 420" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx={C} cy={C} r={R} stroke="#e8c97a" strokeWidth="0.7"/>
      {/* Меридианы */}
      {meridians.map((m, i) => (
        <ellipse key={i} cx={C} cy={C} rx={m.rx} ry={R} stroke="#e8c97a" strokeWidth={m.rx < 5 ? 0.7 : 0.35}/>
      ))}
      {/* Параллели */}
      {parallels.map((p, i) => (
        <ellipse key={i} cx={C} cy={p.y} rx={p.rx} ry={p.ry}
          stroke="#e8c97a" strokeWidth={p.isEquator ? 0.7 : 0.35}/>
      ))}
      {/* Полюса */}
      <circle cx={C} cy={C - R} r={3} fill="#e8c97a" fillOpacity="0.5"/>
      <circle cx={C} cy={C + R} r={3} fill="#e8c97a" fillOpacity="0.5"/>
      {/* Метки направлений */}
      {[{a:0,t:"N"},{a:90,t:"E"},{a:180,t:"S"},{a:270,t:"W"}].map(({a,t})=>{
        const rad=(a-90)*Math.PI/180;
        return <text key={t}
          x={C+(R+18)*Math.cos(rad)} y={C+(R+18)*Math.sin(rad)}
          fill="#e8c97a" fillOpacity="0.35" fontSize="10"
          textAnchor="middle" dominantBaseline="middle"
          fontFamily="DM Sans, sans-serif" letterSpacing="0.1em">{t}</text>;
      })}
    </svg>
  );
}

interface Props {
  p: {
    label: string;
    heading: string;
    role: string;
    body: string[];
    tags: string[];
    stats: { num: string; label: string }[];
    services: {
      title: string;
      items: { icon: string; name: string; hint: string }[];
      cta: string;
      ctaHref: string;
    };
    accent: string;
    bg: string;
  };
  textVisible: boolean;
  onOpenModal: () => void;
  onOpenTours: () => void;
}

const HERO_PHOTOS = [
  "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=2000&q=90", // Istanbul
  "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=2000&q=90", // Dubai
  "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=2000&q=90", // Taj Mahal
  "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=2000&q=90", // Maldives
];

const SERVICE_PHOTOS: Record<string, string> = {
  "01": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80",
  "02": "/images/authors_excursion_tours.png",
  "03": "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=600&q=80",
  "04": "https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=600&q=80",
};

const TOUR_SERVICE = "Авторские экскурсионные туры";

export default function TourismOverlay({ p, textVisible, onOpenModal, onOpenTours }: Props) {
  const [line1, line2] = p.heading.split("\n");
  const [slideIdx, setSlideIdx] = useState(0);

  // Auto-advance slides every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setSlideIdx(i => (i + 1) % HERO_PHOTOS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const scrollToContacts = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    const container = document.querySelector(".fullscreen-overlay") as HTMLElement | null;
    const target = document.getElementById("tr-contacts");
    if (!container || !target) return;

    const start = container.scrollTop;
    const end = target.getBoundingClientRect().top
               - container.getBoundingClientRect().top
               + container.scrollTop;
    const duration = 1100;
    const startTime = performance.now();

    const ease = (t: number) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    const step = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      container.scrollTop = start + (end - start) * ease(progress);
      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  }, []);

  useEffect(() => {
    if (!textVisible) return;
    const container = document.querySelector(".fullscreen-overlay") as HTMLElement | null;
    if (!container) return;

    const check = () => {
      const bottom = container.getBoundingClientRect().bottom;
      container.querySelectorAll<HTMLElement>("[data-tr]").forEach((el) => {
        if (el.getBoundingClientRect().top < bottom - 60) {
          el.classList.add("tr-in");
        }
      });
    };

    const header = document.querySelector(".header") as HTMLElement | null;

    const updateHeader = () => {
      const about = document.querySelector(".tr-about");
      if (!header || !about) return;
      const top = about.getBoundingClientRect().top;
      if (top <= 80) {
        header.style.background = "rgba(92, 83, 62, 0.24)";
        header.style.backdropFilter = "blur(12px)";
        header.style.boxShadow = "0 1px 0 rgba(0,0,0,0.08)";
      } else {
        header.style.background = "transparent";
        header.style.backdropFilter = "none";
        header.style.boxShadow = "none";
      }
    };

    check();
    updateHeader();
    container.addEventListener("scroll", check, { passive: true });
    container.addEventListener("scroll", updateHeader, { passive: true });
    return () => {
      container.removeEventListener("scroll", check);
      container.removeEventListener("scroll", updateHeader);
      // сбрасываем шапку при закрытии
      if (header) {
        header.style.background = "transparent";
        header.style.backdropFilter = "none";
        header.style.boxShadow = "none";
      }
    };
  }, [textVisible]);

  return (
    <div className="tr-wrap">

      {/* ══ HERO ══════════════════════════════════════════ */}
      <section className="tr-hero">
        {/* Slides */}
        {HERO_PHOTOS.map((url, i) => (
          <div
            key={url}
            className={`tr-hero-photo${i === slideIdx ? " tr-hero-photo--active" : ""}`}
            style={{ backgroundImage: `url(${url})` }}
          />
        ))}
        <div className="tr-hero-overlay" />

        <div className={`tr-hero-body${textVisible ? " tr-hero-body--in" : ""}`}>
          <span className="tr-label">{p.label} · Международный туризм</span>

          <h1 className="tr-heading">
            {line1}
            <span className="tr-heading-sub">{line2}</span>
          </h1>

          <p className="tr-hero-text">{p.body[0]}</p>

          <div className="tr-hero-actions">
            <button className="tr-btn tr-btn--primary" onClick={onOpenModal}>
              Оставить заявку <span className="tr-btn-arrow">↗</span>
            </button>
            <a href="#tr-contacts" className="tr-btn tr-btn--ghost" onClick={scrollToContacts}>
              <span className="tr-btn-dot" />
              <span className="tr-btn-line" />
              <span>Контакты</span>
            </a>
          </div>
        </div>

        {/* Scroll hint */}
        <div className={`tr-scroll-hint${textVisible ? " tr-scroll-hint--in" : ""}`}>
          <span className="tr-scroll-hint-line" />
          <span className="tr-scroll-hint-text">Листайте</span>
        </div>

        {/* Slide dots */}
        <div className={`tr-hero-dots${textVisible ? " tr-hero-dots--in" : ""}`}>
          {HERO_PHOTOS.map((_, i) => (
            <button
              key={i}
              className={`tr-hero-dot${i === slideIdx ? " tr-hero-dot--active" : ""}`}
              onClick={() => setSlideIdx(i)}
              aria-label={`Слайд ${i + 1}`}
            />
          ))}
        </div>

        {/* Stats — bottom-right */}
        <div className={`tr-hero-stats${textVisible ? " tr-hero-stats--in" : ""}`}>
          {p.stats.map((s) => (
            <div key={s.label} className="tr-hero-stat">
              <span className="tr-hero-stat-num">{s.num}</span>
              <span className="tr-hero-stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ══ ABOUT ═════════════════════════════════════════ */}
      <section className="tr-about" data-tr>
        <div className="tr-section-hint">
          <span className="tr-section-hint-line" />
          <span className="tr-section-hint-text">Листайте</span>
        </div>
        {/* Decorative compass rose */}
        <div className="tr-compass-wrap">
          <CompassRose className="tr-compass" />
        </div>

        <div className="tr-about-inner">
          <div className="tr-about-left">
            <span className="tr-label">О команде</span>
            <blockquote className="tr-quote">{p.body[1]}</blockquote>
          </div>
          <div className="tr-about-right">
            <p className="tr-about-role">{p.role}</p>
            <p className="tr-about-company">MAGIC Group NTS</p>
            <div className="tr-about-tags">
              {p.tags.map((t) => (
                <span key={t} className="tr-tag">{t}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ SERVICES ══════════════════════════════════════ */}
      <section className="tr-services" data-tr>
        <div className="tr-compass-wrap tr-compass-wrap--left">
          <CoordGrid className="tr-compass" />
        </div>
        <div className="tr-section-hint">
          <span className="tr-section-hint-line" />
          <span className="tr-section-hint-text">Листайте</span>
        </div>
        <div className="tr-services-inner">
          <div className="tr-services-header">
            <span className="tr-label">Что предлагаем</span>
            <h2 className="tr-services-title">{p.services.title}</h2>
          </div>

          <div className="tr-services-grid">
            {p.services.items.map((item) => {
              const isTour = item.name === TOUR_SERVICE;
              return (
                <div
                  key={item.name}
                  className={`tr-card${isTour ? " tr-card--tours" : ""}`}
                  onClick={isTour ? onOpenTours : undefined}
                  style={isTour ? { cursor: "pointer" } : undefined}
                >
                  <div
                    className="tr-card-photo"
                    style={{ backgroundImage: `url(${SERVICE_PHOTOS[item.icon] || ""})` }}
                  />
                  <div className="tr-card-body">
                    <span className="tr-card-num">{item.icon}</span>
                    <h3 className="tr-card-name">{item.name}</h3>
                    <p className="tr-card-hint">{item.hint}</p>
                    {isTour && (
                      <span className="tr-card-cta-hint">Смотреть туры →</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="tr-services-cta">
            <button className="tr-btn tr-btn--primary" onClick={onOpenModal}>
              Оставить заявку <span className="tr-btn-arrow">↗</span>
            </button>
          </div>
        </div>
      </section>

      {/* ══ CONTACTS ══════════════════════════════════════ */}
      <section className="tr-contacts" id="tr-contacts" data-tr>
        {/* WorldMap centered behind contacts */}
        <div className="tr-compass-wrap tr-compass-wrap--left tr-compass-wrap--map">
          <WorldMap className="tr-worldmap" />
        </div>
        <div className="tr-contacts-inner">

          <div className="tr-contacts-left">
            <span className="tr-label">Связаться с нами</span>
            <h2 className="tr-contacts-heading">
              Давайте обсудим<br />ваш маршрут
            </h2>
            <p className="tr-contacts-sub">
              Отвечаем быстро — обычно в течение часа.<br />
              Расскажите куда хотите, и мы подберём лучший вариант.
            </p>
          </div>

          <div className="tr-contacts-right">
            <div className="tr-messengers">
              <a href="https://t.me/username" target="_blank" rel="noreferrer" className="tr-messenger tr-messenger--tg">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style={{flexShrink: 0}}>
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.883 13.99l-2.938-.918c-.638-.203-.651-.638.136-.944l11.439-4.41c.532-.194.998.13.374.503z"/>
                </svg>
                Написать в Telegram
                <span className="tr-messenger-arrow">→</span>
              </a>
              <a href="https://wa.me/79000000000" target="_blank" rel="noreferrer" className="tr-messenger tr-messenger--wa">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style={{flexShrink: 0}}>
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Написать в WhatsApp
                <span className="tr-messenger-arrow">→</span>
              </a>
              <a href="https://max.ru/join/w4v28odPKu06lp5xCdnyI6aD8T8o-i8vxT8p_6Gc9wo" target="_blank" rel="noreferrer" className="tr-messenger tr-messenger--mx">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style={{flexShrink: 0}}>
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm4.5 16.5h-2.25v-4.5L12 14.25l-2.25-2.25v4.5H7.5v-9h2.25l2.25 2.25 2.25-2.25H16.5v9z"/>
                </svg>
                Написать в Max
                <span className="tr-messenger-arrow">→</span>
              </a>
              <div className="tr-messenger-ig-wrap">
                <a href="https://instagram.com/username" target="_blank" rel="noreferrer" className="tr-messenger tr-messenger--ig">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style={{flexShrink: 0}}>
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                  </svg>
                  Написать в Instagram
                  <span className="tr-messenger-arrow">→</span>
                </a>
                <p className="tr-messenger-note">* Instagram принадлежит компании Meta Platforms Inc., деятельность которой признана экстремистской и запрещена на территории РФ.</p>
              </div>
            </div>

            <button className="tr-contacts-cta" onClick={onOpenModal}>
              Оставить заявку <span className="tr-btn-arrow">↗</span>
            </button>
          </div>

        </div>
      </section>

    </div>
  );
}
