"use client";

import { useEffect, useRef, useState } from "react";
import "./realty.css";

/* ── Abstract geometry — nested perspective squares ─────────── */
function GeoSpace({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 560 560" fill="none" aria-hidden="true">
      <rect x="4"   y="4"   width="552" height="552" stroke="currentColor" strokeWidth="1.2"/>
      <rect x="56"  y="56"  width="448" height="448" stroke="currentColor" strokeWidth="0.8"/>
      <rect x="112" y="112" width="336" height="336" stroke="currentColor" strokeWidth="0.6"/>
      <rect x="168" y="168" width="224" height="224" stroke="currentColor" strokeWidth="0.5"/>
      <rect x="224" y="224" width="112" height="112" stroke="currentColor" strokeWidth="0.4"/>
      <line x1="280" y1="4"   x2="280" y2="556" stroke="currentColor" strokeWidth="0.35"/>
      <line x1="4"   y1="280" x2="556" y2="280" stroke="currentColor" strokeWidth="0.35"/>
      <line x1="56"  y1="56"  x2="504" y2="504" stroke="currentColor" strokeWidth="0.3"/>
      <line x1="504" y1="56"  x2="56"  y2="504" stroke="currentColor" strokeWidth="0.3"/>
      <rect x="4"   y="4"   width="28" height="28" fill="currentColor" opacity="0.12"/>
      <rect x="528" y="4"   width="28" height="28" fill="currentColor" opacity="0.12"/>
      <rect x="4"   y="528" width="28" height="28" fill="currentColor" opacity="0.12"/>
      <rect x="528" y="528" width="28" height="28" fill="currentColor" opacity="0.12"/>
      <circle cx="280" cy="280" r="6"  fill="currentColor" opacity="0.35"/>
      <circle cx="280" cy="280" r="24" stroke="currentColor" strokeWidth="0.5" opacity="0.25"/>
    </svg>
  );
}

/* ── Props ──────────────────────────────────────────────────── */
interface Props {
  p: {
    accent: string;
    heading: string; role: string;
    body: string[];  tags: string[];
    stats: { num: string; label: string }[];
    services: { title: string; items: { icon: string; name: string; hint: string }[]; cta: string; ctaHref: string; };
    socials: { label: string; href: string }[];
  };
  textVisible: boolean;
  onOpenModal: () => void;
}

/* ── SVG icons ──────────────────────────────────────────────── */
const TgIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" style={{flexShrink:0}} aria-hidden="true">
    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.883 13.99l-2.938-.918c-.638-.203-.651-.638.136-.944l11.439-4.41c.532-.194.998.13.374.503z"/>
  </svg>
);
const VkIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" style={{flexShrink:0}} aria-hidden="true">
    <path d="M15.684 0H8.316C1.592 0 0 1.592 0 8.316v7.368C0 22.408 1.592 24 8.316 24h7.368C22.408 24 24 22.408 24 15.684V8.316C24 1.592 22.408 0 15.684 0zm3.692 17.123h-1.744c-.66 0-.862-.523-2.049-1.713-1.033-1-1.49-1.135-1.744-1.135-.356 0-.458.102-.458.593v1.575c0 .424-.135.677-1.253.677-1.846 0-3.896-1.118-5.335-3.202C4.624 10.857 4.03 8.57 4.03 8.096c0-.254.102-.491.593-.491h1.744c.44 0 .61.203.779.677.863 2.49 2.303 4.675 2.896 4.675.22 0 .322-.102.322-.66V9.721c-.068-1.186-.695-1.287-.695-1.71 0-.203.17-.407.44-.407h2.743c.373 0 .508.203.508.643v3.473c0 .372.17.508.271.508.22 0 .407-.136.813-.542 1.254-1.406 2.151-3.574 2.151-3.574.119-.254.322-.491.762-.491h1.744c.525 0 .644.271.525.643-.22 1.017-2.354 4.031-2.354 4.031-.186.305-.254.44 0 .78.186.254.796.78 1.202 1.253.745.847 1.32 1.558 1.473 2.049.17.49-.085.745-.576.745z"/>
  </svg>
);
const MxIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" style={{flexShrink:0}} aria-hidden="true">
    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm4.5 16.5h-2.25v-4.5L12 14.25l-2.25-2.25v4.5H7.5v-9h2.25l2.25 2.25 2.25-2.25H16.5v9z"/>
  </svg>
);
const ClockIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{flexShrink:0}} aria-hidden="true">
    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
  </svg>
);

/* ── Component ──────────────────────────────────────────────── */
export default function RealtyOverlay({ p, textVisible, onOpenModal }: Props) {
  const [revealed, setRevealed] = useState<Set<number>>(new Set());
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  /* Stagger reveal for service items */
  useEffect(() => {
    if (!textVisible) return;
    const observers: IntersectionObserver[] = [];
    itemRefs.current.forEach((el, i) => {
      if (!el) return;
      const ob = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setRevealed((s) => new Set([...s, i])), i * 90);
          ob.disconnect();
        }
      }, { threshold: 0.15 });
      ob.observe(el);
      observers.push(ob);
    });
    return () => observers.forEach((ob) => ob.disconnect());
  }, [textVisible]);

  const tgSocial = p.socials.find((s) => s.label === "TG");
  const vkSocial = p.socials.find((s) => s.label === "VK");
  const mxSocial = p.socials.find((s) => s.label === "MX");

  return (
    <div className={`fullscreen-overlay lenis re-overlay${textVisible ? " re-overlay--in" : ""}`}>

      {/* ══ HERO ══════════════════════════════════════════════ */}
      <section className="re-hero">

        {/* Background geometry */}
        <GeoSpace className="re-hero-geo" />

        {/* Large background number */}
        <div className="re-hero-bg-num" aria-hidden="true">02</div>

        {/* Content */}
        <div className={`re-hero-content${textVisible ? " re-hero-content--in" : ""}`}>
          <div className="re-hero-eyebrow">
            <span className="re-eyebrow-line" />
            <span>Направление 02 · Недвижимость</span>
          </div>

          <h1 className="re-hero-title">
            <span className="re-hero-title-line re-hero-title-line--outline">Ваш дом</span>
            <span className="re-hero-title-line">там, где</span>
            <span className="re-hero-title-line re-hero-title-line--accent">мечтали</span>
          </h1>

          <p className="re-hero-lead">
            Квартиры, виллы и апартаменты в Турции,
            ОАЭ, Таиланде. Россия. Сопровождение
            от поиска до ключей.
          </p>

          <div className="re-hero-actions">
            <button className="re-cta-primary" onClick={onOpenModal}>
              Оставить заявку
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/>
              </svg>
            </button>
            <button className="re-cta-ghost" onClick={onOpenModal}>
              Связаться →
            </button>
          </div>
        </div>

        {/* Stats strip */}
        <div className={`re-hero-stats${textVisible ? " re-hero-stats--in" : ""}`}>
          {p.stats.map((s, i) => (
            <div key={s.label} className="re-stat">
              <span className="re-stat-num">{s.num}</span>
              <span className="re-stat-label">{s.label}</span>
              {i < p.stats.length - 1 && <span className="re-stat-divider" aria-hidden="true"/>}
            </div>
          ))}
          <div className="re-stat">
            <span className="re-stat-num">1ч</span>
            <span className="re-stat-label">Ответ</span>
          </div>
        </div>
      </section>

      {/* ══ MANAGER ═══════════════════════════════════════════ */}
      <section className="re-manager">
        <div className="re-manager-inner">

          {/* Left — visual */}
          <div className="re-manager-visual">
            <div className="re-manager-frame">
              <div className="re-manager-avatar">
                <span className="re-manager-initial">М</span>
              </div>
              <div className="re-manager-frame-corner re-manager-frame-corner--tl" aria-hidden="true"/>
              <div className="re-manager-frame-corner re-manager-frame-corner--tr" aria-hidden="true"/>
              <div className="re-manager-frame-corner re-manager-frame-corner--bl" aria-hidden="true"/>
              <div className="re-manager-frame-corner re-manager-frame-corner--br" aria-hidden="true"/>
            </div>

            <div className="re-manager-response">
              <ClockIcon />
              <span>Ответим в течение часа</span>
            </div>
          </div>

          {/* Right — info */}
          <div className="re-manager-info">
            <span className="re-chip">Ваш представитель</span>
            <h2 className="re-manager-name">
              Ваш менеджер<br />
              <span className="re-manager-name-role">по недвижимости</span>
            </h2>
            <p className="re-manager-bio">
              {p.body[1] || p.body[0]}
            </p>
            <div className="re-manager-tags">
              {["Турция", "ОАЭ", "Таиланд", "Вьетнам", "Россия"].map((m) => (
                <span key={m} className="re-pill">{m}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ SERVICES ══════════════════════════════════════════ */}
      <section className="re-services">
        <div className="re-services-inner">

          {/* Header */}
          <div className="re-services-header">
            <span className="re-chip">Что предлагаем</span>
            <h2 className="re-services-title">{p.services.title}</h2>
          </div>

          {/* Numbered list */}
          <div className="re-list">
            {p.services.items.map((item, i) => (
              <div
                key={item.name}
                className={`re-list-item${revealed.has(i) ? " re-list-item--in" : ""}`}
                ref={(el) => { itemRefs.current[i] = el; }}
              >
                <span className="re-list-num" aria-hidden="true">{item.icon}</span>
                <div className="re-list-body">
                  <h3 className="re-list-name">{item.name}</h3>
                  <p className="re-list-hint">{item.hint}</p>
                </div>
                <span className="re-list-arrow" aria-hidden="true">→</span>
              </div>
            ))}
          </div>

          <div className="re-services-cta">
            <button className="re-cta-primary" onClick={onOpenModal}>
              Оставить заявку
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/>
              </svg>
            </button>
            {p.services.ctaHref && p.services.ctaHref !== "#" && (
              <a href={p.services.ctaHref} target="_blank" rel="noreferrer" className="re-cta-ghost">
                {p.services.cta}
              </a>
            )}
          </div>

        </div>
      </section>

      {/* ══ CONTACTS ══════════════════════════════════════════ */}
      <section className="re-contacts" id="re-contacts">
        <GeoSpace className="re-contacts-geo" />

        <div className="re-contacts-inner">
          <div className="re-contacts-left">
            <span className="re-chip re-chip--light">Связаться с нами</span>
            <h2 className="re-contacts-title">
              Давайте найдём<br />
              <em>ваш объект</em>
            </h2>
            <p className="re-contacts-sub">
              Расскажите что ищете — страну,
              бюджет, назначение.<br />
              Ответим быстро.
            </p>
          </div>

          <div className="re-contacts-right">
            <div className="re-messengers">
              {tgSocial && (
                <a href={tgSocial.href} target="_blank" rel="noreferrer" className="re-messenger">
                  <TgIcon />
                  <span>Написать в Telegram</span>
                  <span className="re-messenger-arr">→</span>
                </a>
              )}
              {mxSocial && (
                <a href={mxSocial.href} target="_blank" rel="noreferrer" className="re-messenger">
                  <MxIcon />
                  <span>Написать в Max</span>
                  <span className="re-messenger-arr">→</span>
                </a>
              )}
              {vkSocial && (
                <a href={vkSocial.href} target="_blank" rel="noreferrer" className="re-messenger">
                  <VkIcon />
                  <span>Написать в VK</span>
                  <span className="re-messenger-arr">→</span>
                </a>
              )}
            </div>
            <button className="re-contacts-cta" onClick={onOpenModal}>
              Оставить заявку →
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
