"use client";

import { useEffect, useRef } from "react";
import "./realty.css";

/* ── Floor Plan SVG decoration ──────────────────────────────── */
function FloorPlan({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 720 520" fill="none"
      xmlns="http://www.w3.org/2000/svg" aria-hidden="true">

      {/* Grid background — subtle squares */}
      {Array.from({ length: 12 }, (_, i) => (
        <line key={`v${i}`} x1={(i + 1) * 60} y1={0} x2={(i + 1) * 60} y2={520}
          stroke="#e8c97a" strokeWidth="0.25" opacity="0.18"/>
      ))}
      {Array.from({ length: 8 }, (_, i) => (
        <line key={`h${i}`} x1={0} y1={(i + 1) * 60} x2={720} y2={(i + 1) * 60}
          stroke="#e8c97a" strokeWidth="0.25" opacity="0.18"/>
      ))}

      {/* ── Room outlines ── */}
      {/* Living room */}
      <rect x={60} y={60} width={300} height={180} stroke="#e8c97a" strokeWidth="1.4" opacity="0.55"/>
      {/* Bedroom 1 */}
      <rect x={420} y={60} width={240} height={180} stroke="#e8c97a" strokeWidth="1.4" opacity="0.55"/>
      {/* Kitchen */}
      <rect x={60} y={300} width={180} height={160} stroke="#e8c97a" strokeWidth="1.4" opacity="0.55"/>
      {/* Hallway */}
      <rect x={240} y={240} width={120} height={60} stroke="#e8c97a" strokeWidth="0.9" opacity="0.4"/>
      {/* Bathroom */}
      <rect x={360} y={240} width={120} height={120} stroke="#e8c97a" strokeWidth="1.0" opacity="0.45"/>
      {/* Bedroom 2 */}
      <rect x={480} y={300} width={180} height={160} stroke="#e8c97a" strokeWidth="1.4" opacity="0.55"/>

      {/* ── Doors — quarter-arc ── */}
      <path d="M 60 155 Q 90 155 90 185" stroke="#e8c97a" strokeWidth="0.8" opacity="0.45"/>
      <path d="M 420 155 Q 450 155 450 185" stroke="#e8c97a" strokeWidth="0.8" opacity="0.45"/>
      <path d="M 240 300 Q 240 270 270 270" stroke="#e8c97a" strokeWidth="0.8" opacity="0.4"/>

      {/* ── Dimension lines ── */}
      {/* Top horizontal — living room width */}
      <line x1={60} y1={28} x2={360} y2={28} stroke="#e8c97a" strokeWidth="0.7" opacity="0.5"/>
      <line x1={60} y1={22} x2={60} y2={34} stroke="#e8c97a" strokeWidth="0.7" opacity="0.5"/>
      <line x1={360} y1={22} x2={360} y2={34} stroke="#e8c97a" strokeWidth="0.7" opacity="0.5"/>
      {/* Left vertical — living room height */}
      <line x1={28} y1={60} x2={28} y2={240} stroke="#e8c97a" strokeWidth="0.7" opacity="0.5"/>
      <line x1={22} y1={60} x2={34} y2={60} stroke="#e8c97a" strokeWidth="0.7" opacity="0.5"/>
      <line x1={22} y1={240} x2={34} y2={240} stroke="#e8c97a" strokeWidth="0.7" opacity="0.5"/>

      {/* ── Corner marks (intersection dots) ── */}
      {[
        [60,60],[360,60],[420,60],[660,60],
        [60,240],[360,240],[420,240],[660,240],
        [60,300],[240,300],[480,300],[660,300],
        [60,460],[240,460],[480,460],[660,460],
      ].map(([x,y],i) => (
        <circle key={i} cx={x} cy={y} r={2.2} fill="#e8c97a" opacity="0.45"/>
      ))}

      {/* ── Compass mark — small N indicator ── */}
      <circle cx={680} cy={480} r={18} stroke="#e8c97a" strokeWidth="0.8" opacity="0.4"/>
      <line x1={680} y1={467} x2={680} y2={462} stroke="#e8c97a" strokeWidth="1.2" opacity="0.6"/>
      <text x={680} y={460} textAnchor="middle" fontSize="9" fill="#e8c97a" opacity="0.5"
        fontFamily="DM Sans, Inter, sans-serif" fontWeight="600">N</text>
    </svg>
  );
}

/* ── Types ──────────────────────────────────────────────────── */
interface ServiceItem { icon: string; name: string; hint: string; }
interface Stat        { num: string; label: string; }
interface Props {
  p: {
    accent: string;
    heading: string;
    role: string;
    body: string[];
    tags: string[];
    stats: Stat[];
    services: { title: string; items: ServiceItem[]; cta: string; ctaHref: string; };
    socials: { label: string; href: string }[];
  };
  textVisible: boolean;
  onOpenModal: () => void;
}

/* ── Messenger icons ─────────────────────────────────────────── */
const TgIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style={{flexShrink:0}} aria-hidden="true">
    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.883 13.99l-2.938-.918c-.638-.203-.651-.638.136-.944l11.439-4.41c.532-.194.998.13.374.503z"/>
  </svg>
);
const VkIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M15.684 0H8.316C1.592 0 0 1.592 0 8.316v7.368C0 22.408 1.592 24 8.316 24h7.368C22.408 24 24 22.408 24 15.684V8.316C24 1.592 22.408 0 15.684 0zm3.692 17.123h-1.744c-.66 0-.862-.523-2.049-1.713-1.033-1-1.49-1.135-1.744-1.135-.356 0-.458.102-.458.593v1.575c0 .424-.135.677-1.253.677-1.846 0-3.896-1.118-5.335-3.202C4.624 10.857 4.03 8.57 4.03 8.096c0-.254.102-.491.593-.491h1.744c.44 0 .61.203.779.677.863 2.49 2.303 4.675 2.896 4.675.22 0 .322-.102.322-.66V9.721c-.068-1.186-.695-1.287-.695-1.71 0-.203.17-.407.44-.407h2.743c.373 0 .508.203.508.643v3.473c0 .372.17.508.271.508.22 0 .407-.136.813-.542 1.254-1.406 2.151-3.574 2.151-3.574.119-.254.322-.491.762-.491h1.744c.525 0 .644.271.525.643-.22 1.017-2.354 4.031-2.354 4.031-.186.305-.254.44 0 .78.186.254.796.78 1.202 1.253.745.847 1.32 1.558 1.473 2.049.17.49-.085.745-.576.745z"/>
  </svg>
);
const MxIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm4.5 16.5h-2.25v-4.5L12 14.25l-2.25-2.25v4.5H7.5v-9h2.25l2.25 2.25 2.25-2.25H16.5v9z"/>
  </svg>
);

/* ── Component ──────────────────────────────────────────────── */
export default function RealtyOverlay({ p, textVisible, onOpenModal }: Props) {
  const overlayRef = useRef<HTMLDivElement>(null);

  const scrollToContacts = (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById("re-contacts")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className={`fullscreen-overlay lenis re-overlay${textVisible ? " re-overlay--in" : ""}`}
      ref={overlayRef}>

      {/* ══ HERO ══════════════════════════════════════════════ */}
      <section className="re-hero">
        <FloorPlan className="re-hero-plan" />

        <div className={`re-hero-content${textVisible ? " re-hero-content--in" : ""}`}>
          <div className="re-hero-label">НАПРАВЛЕНИЕ 02 · НЕДВИЖИМОСТЬ</div>

          <h1 className="re-hero-title">
            Недвижимость<br />
            <span className="re-hero-title-sub">без посредников</span>
          </h1>

          <p className="re-hero-lead">{p.body[0]}</p>

          <div className="re-hero-actions">
            <button className="re-btn re-btn--primary" onClick={onOpenModal}>
              Оставить заявку <span className="re-btn-arrow">↗</span>
            </button>
            <a href="#re-contacts" className="re-btn re-btn--ghost" onClick={scrollToContacts}>
              <span className="re-btn-dot" />
              <span className="re-btn-line" />
              <span>Связаться</span>
            </a>
          </div>
        </div>

        <div className={`re-hero-stats${textVisible ? " re-hero-stats--in" : ""}`}>
          {p.stats.map((s) => (
            <div key={s.label} className="re-hero-stat">
              <span className="re-hero-stat-num">{s.num}</span>
              <span className="re-hero-stat-label">{s.label}</span>
            </div>
          ))}
        </div>

        <div className={`re-scroll-hint${textVisible ? " re-scroll-hint--in" : ""}`}>
          <span className="re-scroll-hint-line" />
          <span className="re-scroll-hint-text">Листайте</span>
        </div>
      </section>

      {/* ══ ПРЕДСТАВИТЕЛЬ ════════════════════════════════════ */}
      <section className="re-agent" data-re>
        <div className="re-agent-inner">

          {/* Left — photo */}
          <div className="re-agent-photo-wrap">
            <div className="re-agent-photo">
              <div className="re-agent-photo-placeholder">
                <span>ША</span>
              </div>
              <div className="re-agent-response-badge">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                  strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12 6 12 12 16 14"/>
                </svg>
                Ответим в течение часа
              </div>
            </div>
          </div>

          {/* Right — info */}
          <div className="re-agent-info">
            <span className="re-label">Ваш представитель</span>
            <h2 className="re-agent-name">Шухрат Азизов</h2>
            <p className="re-agent-role">{p.role}</p>
            <p className="re-agent-bio">{p.body[0]}</p>
            <div className="re-agent-markets">
              {["Турция", "ОАЭ", "Таиланд", "Вьетнам", "Россия"].map((m) => (
                <span key={m} className="re-tag">{m}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ SERVICES ══════════════════════════════════════════ */}
      <section className="re-services" data-re>
        <div className="re-services-inner">
          <div className="re-services-header">
            <span className="re-label">Что предлагаем</span>
            <h2 className="re-services-title">{p.services.title}</h2>
          </div>

          <div className="re-services-grid">
            {p.services.items.map((item) => (
              <div key={item.name} className="re-card">
                <div className="re-card-num">{item.icon}</div>
                <div className="re-card-body">
                  <h3 className="re-card-name">{item.name}</h3>
                  <p className="re-card-hint">{item.hint}</p>
                </div>
                <div className="re-card-corner" aria-hidden="true" />
              </div>
            ))}
          </div>

          <div className="re-services-cta">
            <button className="re-btn re-btn--primary" onClick={onOpenModal}>
              Оставить заявку <span className="re-btn-arrow">↗</span>
            </button>
            <a href={p.services.ctaHref} target="_blank" rel="noreferrer"
              className="re-btn re-btn--ghost">
              <span className="re-btn-dot" />
              <span className="re-btn-line" />
              <span>{p.services.cta}</span>
            </a>
          </div>
        </div>
      </section>

      {/* ══ CONTACTS ══════════════════════════════════════════ */}
      <section className="re-contacts" id="re-contacts" data-re>
        <FloorPlan className="re-contacts-plan" />
        <div className="re-contacts-inner">

          <div className="re-contacts-left">
            <span className="re-label">Связаться с нами</span>
            <h2 className="re-contacts-heading">
              Давайте обсудим<br />ваш объект
            </h2>
            <p className="re-contacts-sub">
              Ответим быстро — обычно в течение часа.<br />
              Расскажите что ищете, и подберём лучшие варианты.
            </p>
          </div>

          <div className="re-contacts-right">
            <div className="re-messengers">
              <a href="https://t.me/AN_MAGIC_NTS" target="_blank" rel="noreferrer"
                className="re-messenger re-messenger--tg">
                <TgIcon />
                Написать в Telegram
                <span className="re-messenger-arrow">→</span>
              </a>
              <a href="https://max.ru/join/z1uJBeJC7MbSse2sDH2OQW2xnbTPHGTSa_SHjNhkv2c"
                target="_blank" rel="noreferrer" className="re-messenger re-messenger--mx">
                <MxIcon />
                Написать в Max
                <span className="re-messenger-arrow">→</span>
              </a>
              <a href="https://vk.ru/an_magic_nts" target="_blank" rel="noreferrer"
                className="re-messenger re-messenger--vk">
                <VkIcon />
                Написать в VK
                <span className="re-messenger-arrow">→</span>
              </a>
            </div>

            <button className="re-contacts-cta" onClick={onOpenModal}>
              Оставить заявку <span className="re-btn-arrow">↗</span>
            </button>
          </div>

        </div>
      </section>

    </div>
  );
}
