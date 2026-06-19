"use client";

import { useState } from "react";
import "./insurance.css";

interface Panel {
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
}

interface Props {
  p: Panel;
  textVisible: boolean;
  onOpenModal: () => void;
}

/* ── SVG Icons ── */
const IconCar = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 17H3v-6l3-5h12l3 5v6h-2"/>
    <circle cx="7.5" cy="17.5" r="2.5"/><circle cx="16.5" cy="17.5" r="2.5"/>
  </svg>
);
const IconShield = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    <polyline points="9 12 11 14 15 10"/>
  </svg>
);
const IconHeart = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
  </svg>
);
const IconTrophy = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="8 21 12 17 16 21"/><line x1="12" y1="17" x2="12" y2="11"/>
    <path d="M7 4h10v4a5 5 0 0 1-10 0V4z"/><line x1="5" y1="4" x2="7" y2="4"/>
    <line x1="17" y1="4" x2="19" y2="4"/><path d="M5 4C5 6 6 8 7 8"/><path d="M19 4c0 2-1 4-2 4"/>
  </svg>
);
const IconHome = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 12L12 4l9 8"/><path d="M5 10v9a1 1 0 001 1h4v-5h4v5h4a1 1 0 001-1v-9"/>
  </svg>
);
const IconKey = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="7.5" cy="15.5" r="5.5"/><path d="M21 2l-9.6 9.6"/><path d="M15.5 7.5l3 3"/>
  </svg>
);
const IconCross = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/>
  </svg>
);
const IconPlane = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.8 19.2L16 11l3.5-3.5C21 6 21 4 21 4s-2 0-3.5 1.5L14 9 5.8 7.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 3.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/>
  </svg>
);
const IconBox = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/>
    <polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/>
  </svg>
);
const IconBriefcase = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/><line x1="12" y1="12" x2="12" y2="12"/>
  </svg>
);
const IconBuilding = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="1"/><path d="M9 3v18"/><path d="M3 9h6"/><path d="M3 15h6"/><path d="M15 9h3"/><path d="M15 15h3"/>
  </svg>
);

const ICONS = [IconCar, IconCar, IconHeart, IconTrophy, IconHome, IconKey, IconCross, IconPlane, IconBox, IconBriefcase, IconBuilding];

const PROCESS = [
  { num: "01", title: "Консультация",   desc: "Обсуждаем ваши потребности, риски и бюджет — без давления" },
  { num: "02", title: "Подбор полиса",  desc: "Сравниваем предложения ведущих страховщиков России" },
  { num: "03", title: "Оформление",     desc: "Документы онлайн за 10–15 минут или лично — как удобно" },
  { num: "04", title: "Поддержка",      desc: "Помогаем при страховом случае от первого звонка до выплаты" },
];

const FAQS = [
  { q: "Что входит в страховку для выезжающих за рубеж?", a: "Медицинские расходы, экстренная эвакуация, отмена поездки, задержка рейса, утеря багажа. Подбираем под конкретную страну, длительность и цель поездки." },
  { q: "Как быстро оформляется полис?", a: "Большинство полисов — онлайн за 10–15 минут. Для сложных продуктов (ипотека, ДМС, бизнес) — от одного рабочего дня с личным сопровождением." },
  { q: "Что делать при наступлении страхового случая?", a: "Свяжитесь со мной — помогу разобраться с порядком действий, правильно оформить документы и получить выплату без лишнего стресса." },
  { q: "Работаете только с одной страховой компанией?", a: "Нет. Я работаю с ведущими страховщиками России — это позволяет предложить лучшие условия и цену именно для вашей ситуации." },
];

export default function InsuranceOverlay({ p, textVisible, onOpenModal }: Props) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="ins-overlay">

      {/* ══ HERO ══ */}
      <section className="ins-hero">
        {/* Left — text */}
        <div className={`ins-hero-left${textVisible ? " ins-in" : ""}`}>
          <div className="ins-eyebrow">{p.label} · {p.role}</div>
          <h1 className="ins-hero-heading">
            {p.heading.split("\n").map((line, i) => (
              i === 1
                ? <span key={i} className="ins-hero-heading-italic">{line}</span>
                : <span key={i}>{line}</span>
            ))}
          </h1>
          <p className="ins-hero-quote">«{p.body[0]}»</p>
          <div className="ins-hero-stats">
            {p.stats.map(s => (
              <div key={s.label}>
                <span className="ins-hero-stat-num">{s.num}</span>
                <span className="ins-hero-stat-label">{s.label}</span>
              </div>
            ))}
            <div>
              <span className="ins-hero-stat-num">15</span>
              <span className="ins-hero-stat-label">лет опыта</span>
            </div>
          </div>
          <div className="ins-hero-actions">
            <button className="ins-btn-primary" onClick={onOpenModal}>
              Оставить заявку →
            </button>
            <a className="ins-btn-outline" href="tel:+79178739655">
              Позвонить
            </a>
          </div>
        </div>

        {/* Right — photo */}
        <div className={`ins-hero-right${textVisible ? " ins-in" : ""}`}>
          <img
            className="ins-hero-photo"
            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop"
            alt="Страхование путешествий"
          />
          <div className="ins-hero-photo-overlay" />
          <div className="ins-hero-tag">Страховой агент · Все виды</div>
        </div>
      </section>

      {/* ══ STATS BAR ══ */}
      <div className="ins-stats-bar">
        <div className="ins-stats-bar-inner">
          <div className="ins-stat-item">
            <div className="ins-stat-big">11+</div>
            <div className="ins-stat-desc">Видов страхования</div>
          </div>
          <div className="ins-stat-item">
            <div className="ins-stat-big">15</div>
            <div className="ins-stat-desc">Лет опыта</div>
          </div>
          <div className="ins-stat-item">
            <div className="ins-stat-big">∞</div>
            <div className="ins-stat-desc">Довольных клиентов</div>
          </div>
        </div>
      </div>

      {/* ══ COVERAGE ══ */}
      <section className="ins-coverage">
        <div className="ins-wrap">
          <div className="ins-eyebrow">Виды страхования</div>
          <h2 className="ins-section-title">{p.services.title}</h2>
          <div className="ins-coverage-grid">
            {p.services.items.map((item, i) => {
              const Icon = ICONS[i] ?? IconShield;
              return (
                <div key={item.name} className="ins-card">
                  <div className="ins-card-icon"><Icon /></div>
                  <span className="ins-card-num">{item.icon}</span>
                  <div className="ins-card-name">{item.name}</div>
                  <div className="ins-card-hint">{item.hint}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══ PROCESS ══ */}
      <section className="ins-process">
        <div className="ins-wrap">
          <div className="ins-eyebrow">Как это работает</div>
          <h2 className="ins-section-title">От запроса до полиса — просто</h2>
          <div className="ins-process-grid">
            {PROCESS.map(step => (
              <div key={step.num} className="ins-step">
                <div className="ins-step-circle">{step.num}</div>
                <div className="ins-step-title">{step.title}</div>
                <div className="ins-step-desc">{step.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ WHY US ══ */}
      <section className="ins-why">
        <div className="ins-wrap">
          <div className="ins-why-grid">
            {/* Photo */}
            <div className="ins-why-photo-wrap">
              <img
                className="ins-why-photo"
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=900&auto=format&fit=crop"
                alt="Консультация по страхованию"
              />
              <div className="ins-why-photo-badge">Ваш личный агент</div>
            </div>
            {/* Text */}
            <div className="ins-why-text">
              <div className="ins-eyebrow">Почему выбирают нас</div>
              <h2 className="ins-why-title">
                Не просто агент —<br />ваш партнёр
              </h2>
              <p className="ins-why-body">{p.body[1]}</p>
              <div className="ins-tags">
                {p.tags.map(t => <span key={t} className="ins-tag">{t}</span>)}
              </div>
              <button className="ins-btn-primary" onClick={onOpenModal}>
                Получить консультацию →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ══ FAQ ══ */}
      <section className="ins-faq">
        <div className="ins-wrap">
          <div className="ins-faq-grid">
            <div>
              <div className="ins-faq-label">Частые вопросы</div>
              <h2 className="ins-faq-title">Отвечаем честно</h2>
              <p className="ins-faq-sub">
                Задайте любой вопрос — расскажем всё без скрытых условий и страховых уловок.
              </p>
            </div>
            <div className="ins-faq-list">
              {FAQS.map((faq, i) => (
                <div
                  key={i}
                  className={`ins-faq-item${openFaq === i ? " ins-faq-item--open" : ""}`}
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <div className="ins-faq-q">
                    <span>{faq.q}</span>
                    <span className="ins-faq-icon">{openFaq === i ? "−" : "+"}</span>
                  </div>
                  {openFaq === i && <div className="ins-faq-a">{faq.a}</div>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ CTA ══ */}
      <section className="ins-cta">
        <img
          className="ins-cta-photo"
          src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=1800&auto=format&fit=crop"
          alt=""
          aria-hidden="true"
        />
        <div className="ins-cta-overlay" />
        <div className="ins-cta-inner">
          <div className="ins-eyebrow">Начать сейчас</div>
          <h2 className="ins-cta-heading">
            Подберём страховку<br />для вашей ситуации
          </h2>
          <p className="ins-cta-sub">
            Без шаблонов. Без переплат. С заботой о результате.
          </p>
          <div className="ins-cta-actions">
            <button className="ins-btn-primary" onClick={onOpenModal}>
              Оставить заявку →
            </button>
            <a className="ins-phone-link" href="tel:+79178739655">
              +7 (917) 873-96-55
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
