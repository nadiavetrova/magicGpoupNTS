"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import "./tourism.css";

interface Props {
  p: {
    label: string;
    heading: string;
    role: string;
    body: string[];
    tags: string[];
    stats: { num: string; label: string; sublabel?: string; desc?: string; items?: string[] }[];
    services: {
      title: string;
      items: { icon: string; name: string; hint: string; description?: string }[];
      cta: string;
      ctaHref: string;
    };
    accent: string;
    bg: string;
    socials: { label: string; href: string }[];
  };
  textVisible: boolean;
  onOpenModal: () => void;
  onOpenTours: () => void;
}

/* ── Service icons ── */
function GlobeIcon() {
  return (
    <svg width="88" height="88" viewBox="0 0 88 88" fill="none" aria-hidden="true">
      <circle cx="44" cy="44" r="35" stroke="currentColor" strokeWidth="1.4"/>
      <ellipse cx="44" cy="44" rx="18" ry="35" stroke="currentColor" strokeWidth="1.1" className="t-icon-meridian"/>
      <ellipse cx="44" cy="44" rx="18" ry="35" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.3" transform="rotate(60 44 44)"/>
      <path d="M9 44 Q44 38 79 44" stroke="currentColor" strokeWidth="1"/>
      <path d="M14 27 Q44 21 74 27" stroke="currentColor" strokeWidth="0.6" strokeOpacity="0.5"/>
      <path d="M14 61 Q44 67 74 61" stroke="currentColor" strokeWidth="0.6" strokeOpacity="0.5"/>
      <line x1="44" y1="9" x2="44" y2="79" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.25"/>
    </svg>
  );
}

function CompassIcon() {
  return (
    <svg width="88" height="88" viewBox="0 0 88 88" fill="none" aria-hidden="true" className="t-icon-compass">
      <circle cx="44" cy="44" r="35" stroke="currentColor" strokeWidth="1.4"/>
      <circle cx="44" cy="44" r="4" stroke="currentColor" strokeWidth="1.2"/>
      <polygon points="44,13 47,41 44,40 41,41" fill="currentColor"/>
      <polygon points="44,75 41,47 44,48 47,47" fill="currentColor" fillOpacity="0.3"/>
      <polygon points="13,44 41,41 40,44 41,47" fill="currentColor" fillOpacity="0.3"/>
      <polygon points="75,44 47,47 48,44 47,41" fill="currentColor" fillOpacity="0.3"/>
      <line x1="44" y1="9" x2="44" y2="20" stroke="currentColor" strokeWidth="0.6" strokeOpacity="0.2"/>
      <line x1="44" y1="68" x2="44" y2="79" stroke="currentColor" strokeWidth="0.6" strokeOpacity="0.2"/>
      <line x1="9" y1="44" x2="20" y2="44" stroke="currentColor" strokeWidth="0.6" strokeOpacity="0.2"/>
      <line x1="68" y1="44" x2="79" y2="44" stroke="currentColor" strokeWidth="0.6" strokeOpacity="0.2"/>
    </svg>
  );
}

function PlaneIcon() {
  return (
    <svg width="88" height="88" viewBox="0 0 88 88" fill="none" aria-hidden="true">
      <circle cx="44" cy="44" r="35" stroke="currentColor" strokeWidth="1.4"/>
      <g className="t-icon-plane-group">
        {/* Top-down airplane silhouette */}
        <path
          d="M44 16
             C46.5 16 48.5 21 48.5 30
             L48.5 38
             L71 51 L71 56 L48.5 48
             L48.5 61
             L56 65 L56 69 L44 67 L32 69 L32 65 L39.5 61
             L39.5 48 L17 56 L17 51 L39.5 38
             L39.5 30
             C39.5 21 41.5 16 44 16 Z"
          stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"
          fill="currentColor" fillOpacity="0.13"
        />
      </g>
    </svg>
  );
}

const MESSENGER: Record<string, string> = {
  WA: "WhatsApp", MX: "Max", IN: "Instagram", VK: "ВКонтакте", TG: "Telegram",
};

/* ── Карта мира — координаты: x=(lon+180)*2.803, y=(90-lat)*2.806 ── */
function WorldMapBg() {
  const c = "#374d1e";
  const fo = 0.11;
  return (
    <svg className="t-world-map" viewBox="0 0 1009 505" fill="none" aria-hidden="true">
      {/* Сетка параллелей/меридианов */}
      <line x1="0" y1="252" x2="1009" y2="252" stroke={c} strokeWidth="0.4" strokeDasharray="5 8" opacity="0.4"/>
      <line x1="504" y1="0" x2="504" y2="505" stroke={c} strokeWidth="0.3" strokeDasharray="5 8" opacity="0.3"/>
      {[126,379].map(y=><line key={y} x1="0" y1={y} x2="1009" y2={y} stroke={c} strokeWidth="0.2" strokeDasharray="3 10" opacity="0.18"/>)}
      {[252,756].map(x=><line key={x} x1={x} y1="0" x2={x} y2="505" stroke={c} strokeWidth="0.2" strokeDasharray="3 10" opacity="0.18"/>)}

      {/* ── Гренландия ── */}
      <path fill={c} fillOpacity={fo} stroke={c} strokeWidth="0.6" d="
        M 351,36 L 362,22 L 378,14 L 397,12 L 416,16 L 428,28
        L 432,44 L 426,60 L 413,70 L 396,74 L 378,72 L 364,62 L 351,48 Z
      "/>

      {/* ── Северная Америка (полный контур часовой стрелки) ── */}
      {/* Тихоокеанское побережье → Центральная Америка → Карибское → Мексиканский залив → Флорида → Атлантика → Арктика */}
      <path fill={c} fillOpacity={fo} stroke={c} strokeWidth="0.85" d="
        M 34,67
        L 48,98 L 90,87 L 123,93 L 140,98 L 157,115 L 157,120
        L 162,148 L 168,157 L 173,160 L 176,163
        L 182,175 L 190,186 L 196,188
        L 207,186 L 210,196 L 225,206 L 238,207
        L 252,213 L 259,214 L 263,219 L 268,228 L 279,229
        L 271,222 L 260,210 L 254,208 L 248,207 L 244,204
        L 252,192 L 260,188 L 245,190
        L 236,199 L 233,190 L 233,178 L 236,172
        L 252,170 L 264,170 L 276,173
        L 278,181 L 279,181
        L 281,181 L 280,174 L 279,169
        L 292,155 L 297,138 L 309,135 L 334,127
        L 349,121 L 358,121
        L 349,104 L 326,64 L 315,48
        L 258,39 L 168,45 L 123,59 L 90,56 L 65,54 Z
      "/>

      {/* ── Полуостров Баха Калифорния ── */}
      <path fill={c} fillOpacity="0.09" stroke={c} strokeWidth="0.5" d="
        M 176,163 L 180,168 L 186,176 L 192,184 L 196,188
        L 198,184 L 197,176 L 193,170 L 188,166 L 183,162 Z
      "/>

      {/* ── Куба ── */}
      <path fill={c} fillOpacity="0.09" stroke={c} strokeWidth="0.5" d="
        M 226,196 L 238,192 L 252,194 L 259,200 L 256,208
        L 246,212 L 234,210 L 224,204 Z
      "/>

      {/* ── Южная Америка (полный контур) ── */}
      {/* Тихоокеанское побережье → Мыс Горн → Атлантика → Карибское */}
      <path fill={c} fillOpacity={fo} stroke={c} strokeWidth="0.85" d="
        M 287,231
        L 279,247 L 279,258 L 281,272 L 283,284
        L 286,296 L 290,308 L 298,319 L 303,331
        L 306,342 L 307,354 L 308,364 L 310,374
        L 312,386 L 312,398 L 314,408
        L 317,400 L 320,390 L 322,378 L 323,366
        L 324,353 L 325,342 L 327,335
        L 324,326 L 321,316 L 317,303 L 315,291
        L 316,278 L 316,265 L 318,254
        L 323,246 L 330,240 L 337,236
        L 341,240 L 344,249 L 350,252 L 357,252
        L 365,249 L 373,244 L 382,240
        L 391,258 L 394,268 L 398,275 L 406,275
        L 399,258 L 390,245 L 383,237
        L 358,228 L 340,222 L 328,222 L 317,222 L 311,222
        L 299,222 L 292,228 L 287,231 Z
      "/>

      {/* ── Европа ── */}
      <path fill={c} fillOpacity={fo} stroke={c} strokeWidth="0.7" d="
        M 477,150 L 480,142 L 480,135 L 481,128 L 483,126
        L 490,126 L 494,118 L 492,113 L 497,109 L 504,110
        L 504,104 L 498,100 L 492,96 L 492,88 L 498,84
        L 510,82 L 523,80 L 531,84 L 536,92 L 534,100
        L 524,106 L 516,108 L 514,114 L 519,118 L 528,120
        L 536,124 L 542,130 L 547,128 L 548,122 L 544,116
        L 548,110 L 548,102 L 545,97 L 540,96 L 530,98
        L 522,102 L 516,110 L 510,112
        L 516,120 L 522,126 L 522,134 L 518,140
        L 524,144 L 530,150 L 528,156 L 523,162
        L 518,162 L 514,157 L 508,151 L 504,146
        L 498,144 L 492,146 L 490,152 L 488,157 L 484,156
        L 480,152 L 477,150 Z
      "/>

      {/* ── Скандинавия (отдельно чётче) ── */}
      <path fill={c} fillOpacity="0.09" stroke={c} strokeWidth="0.5" d="
        M 510,82 L 516,72 L 524,62 L 534,56 L 546,54 L 556,60
        L 558,70 L 552,80 L 540,88 L 530,92 L 523,88 L 516,82 Z
      "/>

      {/* ── Великобритания ── */}
      <path fill={c} fillOpacity="0.09" stroke={c} strokeWidth="0.5" d="
        M 490,108 L 494,100 L 497,94 L 497,86 L 492,88
        L 488,96 L 484,106 L 486,112 L 490,113 Z
      "/>

      {/* ── Африка (точный контур) ── */}
      <path fill={c} fillOpacity={fo} stroke={c} strokeWidth="0.85" d="
        M 510,152
        L 490,154 L 480,150 L 474,145 L 466,147 L 460,156
        L 460,168 L 458,180 L 456,193 L 455,212
        L 462,222 L 468,230 L 474,237 L 484,240
        L 492,240 L 504,238 L 514,235 L 524,240
        L 531,244 L 531,252 L 534,260 L 537,268
        L 540,278 L 540,288 L 540,298 L 542,310
        L 544,320 L 544,330 L 548,340 L 554,348
        L 560,354 L 570,354 L 576,350 L 582,344
        L 587,338 L 592,328 L 598,314 L 605,298
        L 610,278 L 612,263 L 614,250 L 619,237
        L 624,226 L 628,220 L 636,218 L 644,220
        L 629,218 L 622,217 L 609,208
        L 604,196 L 598,182 L 595,170
        L 589,164 L 574,163 L 558,162
        L 540,158 L 530,150 L 520,148 L 512,149 Z
      "/>

      {/* ── Мадагаскар ── */}
      <path fill={c} fillOpacity="0.09" stroke={c} strokeWidth="0.5" d="
        M 548,268 L 554,258 L 560,258 L 563,268 L 562,282
        L 558,296 L 552,308 L 546,310 L 540,303
        L 538,290 L 542,278 Z
      "/>

      {/* ── Аравийский полуостров ── */}
      <path fill={c} fillOpacity="0.09" stroke={c} strokeWidth="0.6" d="
        M 570,161 L 582,156 L 594,156 L 602,162 L 608,172
        L 612,186 L 610,202 L 605,216 L 598,228
        L 590,234 L 580,236 L 570,230 L 562,220
        L 557,206 L 557,192 L 560,180 L 565,170 Z
      "/>

      {/* ── Россия + Центральная/Восточная Азия ── */}
      <path fill={c} fillOpacity={fo} stroke={c} strokeWidth="0.8" d="
        M 543,74 L 562,66 L 584,58 L 613,52 L 644,48
        L 676,44 L 708,46 L 737,52 L 762,60
        L 785,70 L 804,82 L 820,98 L 829,117
        L 832,136 L 826,154 L 813,168 L 798,178
        L 782,184 L 764,184 L 746,178 L 730,168
        L 714,156 L 700,146 L 684,138 L 667,130
        L 650,124 L 632,122 L 615,124 L 598,130
        L 583,138 L 570,147 L 558,152
        L 547,152 L 538,146 L 532,136 L 530,124
        L 532,110 L 536,98 L 542,86 Z
      "/>

      {/* ── Индия ── */}
      <path fill={c} fillOpacity={fo} stroke={c} strokeWidth="0.65" d="
        M 619,149 L 634,143 L 648,145 L 660,153
        L 667,165 L 670,179 L 668,195 L 661,211
        L 650,223 L 638,228 L 626,225 L 616,216
        L 609,202 L 607,188 L 610,176 L 614,163 Z
      "/>

      {/* ── Индокитай/Малайзия (п-ов) ── */}
      <path fill={c} fillOpacity="0.09" stroke={c} strokeWidth="0.6" d="
        M 730,168 L 746,162 L 758,163 L 767,170
        L 772,182 L 770,196 L 762,208 L 751,216
        L 740,220 L 729,216 L 720,205 L 716,193
        L 719,181 L 725,172 Z
      "/>

      {/* ── Китай/Восточная Азия (прибрежная часть) ── */}
      <path fill={c} fillOpacity={fo} stroke={c} strokeWidth="0.7" d="
        M 782,184 L 798,178 L 813,178 L 828,186
        L 840,198 L 848,214 L 848,232 L 840,248
        L 828,258 L 813,264 L 796,260 L 782,250
        L 772,235 L 768,220 L 772,204 L 780,192 Z
      "/>

      {/* ── Япония ── */}
      <path fill={c} fillOpacity="0.09" stroke={c} strokeWidth="0.5" d="
        M 857,146 L 865,138 L 874,138 L 879,148
        L 877,160 L 868,166 L 860,162 L 855,154 Z
      "/>
      <path fill={c} fillOpacity="0.08" stroke={c} strokeWidth="0.45" d="
        M 839,164 L 845,158 L 852,160 L 854,168
        L 849,176 L 841,176 L 837,170 Z
      "/>

      {/* ── Борнео ── */}
      <path fill={c} fillOpacity="0.09" stroke={c} strokeWidth="0.5" d="
        M 762,232 L 776,226 L 792,228 L 800,240
        L 802,254 L 797,268 L 784,276 L 770,276
        L 759,266 L 755,252 L 758,240 Z
      "/>

      {/* ── Суматра ── */}
      <path fill={c} fillOpacity="0.09" stroke={c} strokeWidth="0.5" d="
        M 696,220 L 712,212 L 727,215 L 738,226
        L 743,240 L 739,252 L 727,260 L 712,260
        L 700,250 L 695,237 Z
      "/>

      {/* ── Ява ── */}
      <path fill={c} fillOpacity="0.08" stroke={c} strokeWidth="0.45" d="
        M 744,262 L 756,256 L 770,258 L 778,266
        L 775,275 L 762,278 L 750,274 L 742,268 Z
      "/>

      {/* ── Австралия ── */}
      <path fill={c} fillOpacity={fo} stroke={c} strokeWidth="0.85" d="
        M 822,280 L 838,272 L 856,268 L 874,269
        L 890,275 L 902,287 L 909,303 L 913,321
        L 915,340 L 914,358 L 910,375 L 902,390
        L 890,402 L 873,410 L 854,412 L 834,408
        L 816,400 L 802,386 L 794,370 L 791,352
        L 791,333 L 795,315 L 803,300 L 814,288 Z
      "/>
      {/* Залив Карпентария */}
      <path fill="rgba(248,246,242,0.7)" stroke="none" d="
        M 851,268 L 862,274 L 868,287 L 862,298 L 849,298 L 840,286 L 839,274 Z
      "/>

      {/* ── Тасмания ── */}
      <path fill={c} fillOpacity="0.09" stroke={c} strokeWidth="0.4" d="
        M 858,418 L 866,410 L 874,414 L 875,424 L 868,430 L 860,426 Z
      "/>

      {/* ── Новая Зеландия Северный о-в ── */}
      <path fill={c} fillOpacity="0.09" stroke={c} strokeWidth="0.45" d="
        M 940,366 L 946,356 L 954,356 L 958,366 L 954,378 L 946,382 L 940,374 Z
      "/>
      {/* Южный о-в */}
      <path fill={c} fillOpacity="0.08" stroke={c} strokeWidth="0.4" d="
        M 950,386 L 956,380 L 962,382 L 963,392 L 958,400 L 951,400 L 948,393 Z
      "/>
    </svg>
  );
}

/* ── Иконки соцсетей ── */
function WAIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M10 1.5C5.3 1.5 1.5 5.3 1.5 10c0 1.6.4 3.1 1.2 4.4L1.5 18.5l4.3-1.1A8.5 8.5 0 1010 1.5z" stroke="currentColor" strokeWidth="1.25" strokeLinejoin="round"/>
      <path d="M7.2 7.5c.1.8.6 1.7 1.4 2.5.8.8 1.7 1.3 2.5 1.4l.6-.8.7.3c.5.2.6.7.4 1.1-.3.6-1 1-1.7.8-1-.3-2.4-1.1-3.3-3-.6-1.3-.6-2.7.3-3.2.3-.2.8-.1 1 .3l.3.6-.7.6-.5.4z" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round"/>
    </svg>
  );
}
function TGIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M2.5 9.5L17 3.5 13.5 17 9.5 12.5 6.5 14.5 7 10.5" stroke="currentColor" strokeWidth="1.25" strokeLinejoin="round" strokeLinecap="round"/>
      <path d="M9.5 12.5L13 8.5" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round"/>
    </svg>
  );
}
function VKIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      {/* V */}
      <path d="M2 5.5L5.5 14.5L9 5.5" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round"/>
      {/* K */}
      <line x1="11.5" y1="5.5" x2="11.5" y2="14.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M11.5 10L15.5 5.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M11.5 10L15.5 14.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}
function INIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <rect x="3" y="3" width="14" height="14" rx="4" stroke="currentColor" strokeWidth="1.25"/>
      <circle cx="10" cy="10" r="3.5" stroke="currentColor" strokeWidth="1.15"/>
      <circle cx="14.2" cy="5.8" r="0.9" fill="currentColor"/>
    </svg>
  );
}
function MXIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      {/* Outer ring — большой круг */}
      <circle cx="10" cy="9.5" r="7.2" stroke="currentColor" strokeWidth="1.3"/>
      {/* Inner circle — «дырка» пончика */}
      <circle cx="10" cy="9.5" r="3.3" stroke="currentColor" strokeWidth="1.2"/>
      {/* Tail — хвостик пузыря снизу-слева */}
      <path d="M5.5 15L2.5 18.5L8 17" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" strokeLinecap="round"/>
    </svg>
  );
}

const SOCIAL_IMG: Record<string, string> = {
  WA: "/icons/tur-WP.png",
  VK: "/icons/tur-VK.png",
  IN: "/icons/tur-insta.png",
  MX: "/icons/tur-max.png",
  TG: "/icons/tur-telegram.png",
};

const SOCIAL_ICONS: Record<string, React.ReactElement> = {
  WA: <WAIcon />, TG: <TGIcon />, VK: <VKIcon />, IN: <INIcon />, MX: <MXIcon />,
};

export default function TourismOverlay({ p, onOpenModal, onOpenTours }: Props) {
  const rightRef = useRef<HTMLDivElement>(null);
  const [line1, line2] = p.heading.split("\n");
  const [activeIdx, setActiveIdx] = useState(0);
  const totalSections = 1 + p.stats.length + p.services.items.length + 1;

  const scrollToContacts = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById("t-contacts")?.scrollIntoView({ behavior: "smooth" });
  }, []);

  // Активная секция — подсветка номера в сайдбаре
  useEffect(() => {
    const rows = document.querySelectorAll<HTMLElement>(".t-row");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Array.from(rows).indexOf(entry.target as HTMLElement);
            if (idx !== -1) setActiveIdx(idx);
          }
        });
      },
      { threshold: 0.3 }
    );
    rows.forEach((r) => observer.observe(r));
    return () => observer.disconnect();
  }, []);

  // Reveal on scroll
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(".t-reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    els.forEach((el) => observer.observe(el));
    requestAnimationFrame(() => {
      els.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.9 && rect.bottom > 0) {
          el.classList.add("is-visible");
          observer.unobserve(el);
        }
      });
    });
    return () => observer.disconnect();
  }, []);

  // Parallax на больших числах — слушаем скролл правой панели
  useEffect(() => {
    const container = rightRef.current;
    if (!container) return;
    let rafId: number;
    const handleScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        document.querySelectorAll<HTMLElement>(".t-stat-grid__left").forEach((left) => {
          const row = left.closest(".t-row") as HTMLElement;
          if (!row) return;
          const rect = row.getBoundingClientRect();
          const progress = rect.top / window.innerHeight - 0.3;
          left.style.transform = `translateY(${progress * 20}px)`;
        });
      });
    };
    container.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => {
      container.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  // Счётчик анимации для статистики
  useEffect(() => {
    const nums = document.querySelectorAll<HTMLElement>(".t-stat-num");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;
          const original = el.textContent ?? "";
          const match = original.match(/^(\d+)(.*)$/);
          if (!match) return;
          const target = parseInt(match[1], 10);
          const suffix = match[2];
          const duration = 1400;
          const start = performance.now();
          const tick = (now: number) => {
            const prog = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - prog, 3);
            el.textContent = Math.round(eased * target) + suffix;
            if (prog < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
          observer.unobserve(el);
        });
      },
      { threshold: 0.6 }
    );
    nums.forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="t-root">

      {/* ── Фоновое видео на весь экран ── */}
      <video className="t-bg-video" src="/video/tur_video.mp4"
        autoPlay muted loop playsInline />

      {/* ── ЛЕВАЯ ПАНЕЛЬ: фиксированный герой ── */}
      <div className="t-left">
        <div className="t-left__content">
          <p className="t-eyebrow">{p.label} · Международный туризм</p>
          <h1 className="t-left__heading">
            <span className="t-heading-line"><span className="t-heading-line-inner">{line1}</span></span>
            {line2 && <span className="t-heading-line"><span className="t-heading-line-inner">{line2}</span></span>}
          </h1>
          <p className="t-left__body">{p.body[0]}</p>
          <div className="t-left__actions">
            <button className="t-btn t-btn--gold" onClick={onOpenModal}>
              Оставить заявку
              <img src="/icons/tur_button.png" alt="" className="t-btn__icon" />
            </button>
            <a className="t-btn t-btn--ghost" href="#t-contacts" onClick={scrollToContacts}>
              Контакты
            </a>
          </div>
        </div>
      </div>

      {/* ── ПРАВАЯ ПАНЕЛЬ ── */}
      <div className="t-right" ref={rightRef}>

        {/* Сайдбар с номерами секций */}
        <nav className="t-sidebar" aria-hidden="true">
          <div className="t-sidebar__nums">
            {Array.from({ length: totalSections }, (_, i) => (
              <div key={i} className={`t-sidebar__item${i === activeIdx ? " is-active" : ""}`}>
                <span className="t-sidebar__num">{String(i + 1).padStart(2, "0")}</span>
                <span className="t-sidebar__dot" />
              </div>
            ))}
          </div>
          <div className="t-sidebar__bottom">
            <span className="t-sidebar__scroll">Scroll</span>
            <span className="t-sidebar__pulse" aria-hidden="true" />
          </div>
        </nav>

        {/* Основной контент */}
        <div className="t-right__main">

          {/* 01 — О команде */}
          <div className="t-row">
            <div className="t-row__cnt">
              <p className="t-eyebrow t-eyebrow--muted">О команде</p>
              <h2 className="t-row__h">{p.role}</h2>
              {p.body.map((line, i) => (
                <p key={i} className="t-row__p">{line}</p>
              ))}
            </div>
          </div>

          {/* Статистика */}
          {p.stats.map((s) => (
            <div key={s.label} className={`t-row t-row--stat t-reveal${s.items ? " t-row--map" : ""}`} data-delay="1">
              {s.items && <WorldMapBg />}
              <div className="t-row__cnt">
                <p className="t-eyebrow t-eyebrow--muted">{s.label}</p>
                <div className="t-stat-grid">
                  <div className="t-stat-grid__left">
                    <span className="t-stat-num">{s.num}</span>
                    {s.sublabel && <span className="t-stat-sublabel">{s.sublabel}</span>}
                  </div>
                  {s.desc && (
                    <p className="t-stat-grid__right t-stat-desc">{s.desc}</p>
                  )}
                  {s.items && (
                    <ul className="t-stat-grid__right t-stat-list">
                      {s.items.map(item => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          ))}

          {/* Услуги */}
          {p.services.items.map((item, i) => (
            <div key={item.name} className="t-row t-reveal" data-delay="1">
              <div className="t-row__cnt t-svc-layout">
                <div className="t-svc-layout__text">
                  <p className="t-eyebrow t-eyebrow--muted">{item.hint}</p>
                  <h3 className="t-row__h t-row__h--md">{item.name}</h3>
                  {item.description && <p className="t-row__p">{item.description}</p>}
                  {i === 0 && (
                    <button className="t-btn t-btn--outline-dark t-btn--sm" onClick={onOpenModal}>
                      Смотреть путёвки <span className="t-btn__arr" aria-hidden="true"><svg className="t-btn__arr-svg" viewBox="0 0 38 8" fill="none" xmlns="http://www.w3.org/2000/svg"><line className="t-btn__arr-shaft" x1="0" y1="4" x2="28" y2="4" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/><path className="t-btn__arr-tip" d="M23.5 1L28 4L23.5 7" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
                    </button>
                  )}
                  {i === 1 && (
                    <button className="t-btn t-btn--outline-dark t-btn--sm" onClick={onOpenTours}>
                      Смотреть туры <span className="t-btn__arr" aria-hidden="true"><svg className="t-btn__arr-svg" viewBox="0 0 38 8" fill="none" xmlns="http://www.w3.org/2000/svg"><line className="t-btn__arr-shaft" x1="0" y1="4" x2="28" y2="4" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/><path className="t-btn__arr-tip" d="M23.5 1L28 4L23.5 7" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
                    </button>
                  )}
                  {i === 2 && (
                    <button className="t-btn t-btn--outline-dark t-btn--sm" onClick={onOpenModal}>
                      Авиабилеты и отели <span className="t-btn__arr" aria-hidden="true"><svg className="t-btn__arr-svg" viewBox="0 0 38 8" fill="none" xmlns="http://www.w3.org/2000/svg"><line className="t-btn__arr-shaft" x1="0" y1="4" x2="28" y2="4" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/><path className="t-btn__arr-tip" d="M23.5 1L28 4L23.5 7" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
                    </button>
                  )}
                </div>
                <div className="t-svc-layout__icon">
                  {i === 0 && <GlobeIcon />}
                  {i === 1 && <CompassIcon />}
                  {i === 2 && <PlaneIcon />}
                </div>
              </div>
            </div>
          ))}

          {/* Контакты */}
          <div id="t-contacts" className="t-row t-row--cta t-reveal">
            <div className="t-contacts-wrap">

              <p className="t-eyebrow t-eyebrow--muted">Контакты</p>
              <h2 className="t-row__h">Свяжитесь<br />с нами</h2>
              <p className="t-row__p">Мы на связи 24/7 и готовы ответить на любые вопросы о ваших будущих путешествиях.</p>

              <div className="t-contact-list">
                <a href="tel:+79178739655" className="t-contact-item" aria-label="Позвонить">
                  <div className="t-contact-icon">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                      <path d="M3.5 2h3l1.3 3.5L6 6.8c.7 1.4 1.8 2.5 3.2 3.2l1.3-1.8L14 9.5V13a1.5 1.5 0 01-1.5 1.5C5.5 14.5 3.5 8 3.5 3.5A1.5 1.5 0 015 2H3.5z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div className="t-contact-info">
                    <span className="t-contact-label">Телефон</span>
                    <span className="t-contact-value">+7 (917) 873-96-55</span>
                    <span className="t-contact-hours">Ежедневно с 09:00 до 21:00</span>
                  </div>
                </a>

                <a href="mailto:info@magicgroupnts.com" className="t-contact-item" aria-label="Написать письмо">
                  <div className="t-contact-icon">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                      <rect x="2" y="4" width="14" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.2"/>
                      <path d="M2 5.5L9 10l7-4.5" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div className="t-contact-info">
                    <span className="t-contact-label">Email</span>
                    <span className="t-contact-value">info@magicgroupnts.com</span>
                    <span className="t-contact-hours">Ответим в течение 15 минут</span>
                  </div>
                </a>
              </div>

              <div className="t-contacts-socials">
                {p.socials.map(s => (
                  <a key={s.label} href={s.href} className="t-contact-social"
                    target="_blank" rel="noopener noreferrer"
                    title={MESSENGER[s.label] ?? s.label}>
                    {SOCIAL_IMG[s.label]
                      ? <img src={SOCIAL_IMG[s.label]} alt={s.label} className="t-contact-social__img" />
                      : (SOCIAL_ICONS[s.label] ?? <span className="t-contact-social__abbr">{s.label}</span>)}
                  </a>
                ))}
              </div>

              <p className="t-contacts__disclaimer">
                * Instagram принадлежит компании Meta Platforms Inc., деятельность которой признана экстремистской и запрещена на территории РФ.
              </p>

              {/* CTA карточка — в самом низу */}
              <div className="t-contacts-card">
                <p className="t-contacts-card__pre">Готовы путешествовать?</p>
                <h3 className="t-contacts-card__h">Давайте создадим ваше идеальное путешествие</h3>
                <button className="t-btn t-btn--gold t-btn--contact-cta" onClick={onOpenModal}>
                  Оставить заявку →
                </button>
              </div>

            </div>
          </div>

        </div>{/* /t-right__main */}
      </div>
    </div>
  );
}
