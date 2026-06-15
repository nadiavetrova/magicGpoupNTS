"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import "./realty.css";

/* ── Fictional expert content ─────────────────────────── */
const EXPERT = {
  firstName: "Марина",
  lastName:  "Соколова",
  title:     "Советник по недвижимости",
  subtitle:  "Представитель клиента · не агентство",
  bio:       "Я не продаю объекты. Я нахожу место, в которое вы влюбитесь — и которое будет работать на вас финансово. За восемь лет я сопровождала сделки в пяти странах: от студий в Стамбуле до вилл на Пхукете. Каждый раз — детальный анализ, юридическая чистота и честный разговор о рисках.",
  quote:     "Вы покупаете не квадратные метры. Вы выбираете образ жизни и инвестицию в будущее.",
  stats:     [
    { num: "8",    label: "лет опыта"    },
    { num: "200+", label: "сделок"       },
    { num: "5",    label: "стран"        },
    { num: "1ч",   label: "ответ"        },
  ],
  markets: ["Стамбул", "Дубай", "Пхукет", "Москва", "Бали"],
};

const CHAPTERS = [
  {
    num:   "01",
    title: "Поиск",
    lead:  "Я слушаю вас, а не базу объектов",
    story: "Прежде чем открыть первую ссылку, я провожу час разговора. Узнаю, как вы живёте, что для вас важно в пространстве, какой горизонт инвестиции. Только после этого начинается поиск — точечный, без лишнего шума.",
    photo: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=1800&auto=format&fit=crop",
    photoAlt: "Luxury villa exterior, Phuket",
  },
  {
    num:   "02",
    title: "Проверка",
    lead:  "Юридическая чистота без компромиссов",
    story: "Каждый объект проходит независимую юридическую экспертизу. Я работаю с локальными юристами в каждой стране и никогда не тороплю клиента. Плохая сделка, закрытая быстро — худшее, что может случиться.",
    photo: "https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?q=80&w=1400&auto=format&fit=crop",
    photoAlt: "Luxury apartment interior Dubai",
  },
  {
    num:   "03",
    title: "Сопровождение",
    lead:  "От первого показа до ключей — рядом",
    story: "Перелёты, переговоры, нотариус, открытие счёта, регистрация — всё это я беру на себя. После сделки остаюсь на связи: помогаю с управлением, арендой и налогами в стране покупки.",
    photo: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1400&auto=format&fit=crop",
    photoAlt: "Luxury interior living room",
  },
];

const HERO_PHOTO   = "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=1200&auto=format&fit=crop";
const PORTRAIT     = "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=900&auto=format&fit=crop";

const MARKET_PHOTOS: Record<string, string> = {
  "Стамбул": "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?q=80&w=600&auto=format&fit=crop",
  "Дубай":   "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=600&auto=format&fit=crop",
  "Пхукет":  "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?q=80&w=600&auto=format&fit=crop",
  "Москва":  "https://images.unsplash.com/photo-1513326738677-b964603b136d?q=80&w=600&auto=format&fit=crop",
  "Бали":    "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=600&auto=format&fit=crop",
};

/* ── Shared animation variants ────────────────────────── */
type Bez = [number, number, number, number];
const E1: Bez = [0.16, 1, 0.3, 1];
const E2: Bez = [0.76, 0, 0.24, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.8, ease: E1 } },
};
const fadeIn = {
  hidden: { opacity: 0 },
  show:   { opacity: 1, transition: { duration: 0.9, ease: "easeOut" as const } },
};
const clipReveal = {
  hidden: { clipPath: "inset(0 0 100% 0)" },
  show:   { clipPath: "inset(0 0 0% 0)", transition: { duration: 1.1, ease: E2 } },
};
const stagger = (delay = 0) => ({
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.75, delay, ease: E1 } },
});

/* ── InView wrapper ───────────────────────────────────── */
function InView({ children, className, delay = 0 }: {
  children: React.ReactNode; className?: string; delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  return (
    <motion.div
      ref={ref}
      className={className}
      variants={stagger(delay)}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
    >
      {children}
    </motion.div>
  );
}

/* ── SVG icons ────────────────────────────────────────── */
const TgIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
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

/* ── Props ────────────────────────────────────────────── */
interface Props {
  p: {
    accent: string;
    socials: { label: string; href: string }[];
  };
  textVisible: boolean;
  onOpenModal: () => void;
}

/* ════════════════════════════════════════════════════════
   COMPONENT
   ════════════════════════════════════════════════════════ */
export default function RealtyOverlay({ p, textVisible, onOpenModal }: Props) {
  const tg = p.socials.find(s => s.label === "TG");
  const vk = p.socials.find(s => s.label === "VK");
  const mx = p.socials.find(s => s.label === "MX");

  return (
    <div className={`fullscreen-overlay lenis re-overlay${textVisible ? " re-overlay--in" : ""}`}>

      {/* ══════════════════════════════════════════════════
          HERO — split layout
      ══════════════════════════════════════════════════ */}
      <section className="re-hero">

        {/* Left — typography */}
        <div className="re-hero-left">
          <motion.div
            className="re-hero-eyebrow"
            variants={stagger(0.1)}
            initial="hidden"
            animate={textVisible ? "show" : "hidden"}
          >
            <span className="re-hero-eyebrow-line" />
            <span>Направление 02 · Недвижимость</span>
          </motion.div>

          <div className="re-hero-title-wrap" aria-label="Недвижимость, которую выбирают">
            {["Недвижи-", "мость,", "которую", "выбирают"].map((word, i) => (
              <div key={i} className="re-hero-title-row" aria-hidden="true">
                <motion.span
                  className={`re-hero-title-word${i % 2 === 1 ? " re-hero-title-word--outline" : ""}`}
                  variants={stagger(0.12 + i * 0.08)}
                  initial="hidden"
                  animate={textVisible ? "show" : "hidden"}
                >
                  {word}
                </motion.span>
              </div>
            ))}
          </div>

          <motion.p
            className="re-hero-role"
            variants={stagger(0.55)}
            initial="hidden"
            animate={textVisible ? "show" : "hidden"}
          >
            {EXPERT.title} · {EXPERT.subtitle}
          </motion.p>

          <motion.div
            className="re-hero-actions"
            variants={stagger(0.68)}
            initial="hidden"
            animate={textVisible ? "show" : "hidden"}
          >
            <button className="re-btn-primary" onClick={onOpenModal}>
              Оставить заявку
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/>
              </svg>
            </button>
            <button className="re-btn-ghost" onClick={onOpenModal}>
              Связаться
            </button>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="re-hero-stats"
            variants={stagger(0.82)}
            initial="hidden"
            animate={textVisible ? "show" : "hidden"}
          >
            {EXPERT.stats.map((s, i) => (
              <div key={s.label} className="re-stat">
                <span className="re-stat-num">{s.num}</span>
                <span className="re-stat-label">{s.label}</span>
                {i < EXPERT.stats.length - 1 && <span className="re-stat-sep" aria-hidden="true"/>}
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right — cinematic photo */}
        <motion.div
          className="re-hero-photo-wrap"
          variants={clipReveal}
          initial="hidden"
          animate={textVisible ? "show" : "hidden"}
        >
          <img
            src={HERO_PHOTO}
            alt="Марина Соколова — советник по недвижимости"
            className="re-hero-photo"
          />
          <div className="re-hero-photo-overlay" />
          <div className="re-hero-photo-caption">
            <span>{EXPERT.firstName} {EXPERT.lastName}</span>
            <span className="re-hero-photo-caption-rule" />
            <span>Советник · 2016—</span>
          </div>
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════════════
          QUOTE STRIP
      ══════════════════════════════════════════════════ */}
      <section className="re-quote-strip">
        <div className="re-quote-rule" aria-hidden="true"/>
        <InView className="re-quote-inner">
          <blockquote className="re-quote">
            <span className="re-quote-mark">&ldquo;</span>
            {EXPERT.quote}
            <span className="re-quote-mark">&rdquo;</span>
          </blockquote>
        </InView>
        <div className="re-quote-rule" aria-hidden="true"/>
      </section>

      {/* ══════════════════════════════════════════════════
          ADVISOR — personal intro
      ══════════════════════════════════════════════════ */}
      <section className="re-advisor">
        <div className="re-advisor-inner">

          {/* Photo */}
          <div className="re-advisor-photo-col">
            <InView>
              <motion.div
                className="re-advisor-photo-wrap"
                variants={clipReveal}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-10% 0px" }}
              >
                <img src={PORTRAIT} alt={`${EXPERT.firstName} ${EXPERT.lastName}`} className="re-advisor-photo"/>
              </motion.div>
            </InView>
            <InView delay={0.15}>
              <p className="re-advisor-photo-label">
                {EXPERT.firstName} {EXPERT.lastName}<br/>
                <em>{EXPERT.title}</em>
              </p>
            </InView>
          </div>

          {/* Bio */}
          <div className="re-advisor-info">
            <InView>
              <p className="re-advisor-pretitle">— О себе</p>
            </InView>
            <InView delay={0.1}>
              <h2 className="re-advisor-name">
                {EXPERT.firstName}<br/>
                <span className="re-advisor-surname">{EXPERT.lastName}</span>
              </h2>
            </InView>
            <InView delay={0.2}>
              <p className="re-advisor-bio">{EXPERT.bio}</p>
            </InView>
            <InView delay={0.3}>
              <div className="re-advisor-markets">
                {EXPERT.markets.map((m, i) => (
                  <span key={m}>
                    {m}
                    {i < EXPERT.markets.length - 1 && <span className="re-market-dot" aria-hidden="true">·</span>}
                  </span>
                ))}
              </div>
            </InView>
            <InView delay={0.4}>
              <button className="re-btn-secondary" onClick={onOpenModal}>
                Написать Марине →
              </button>
            </InView>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          CHAPTERS — 3 editorial sections
      ══════════════════════════════════════════════════ */}
      <section className="re-chapters">
        {CHAPTERS.map((ch, i) => (
          <article key={ch.num} className={`re-chapter re-chapter--${i % 2 === 0 ? "left" : "right"}`}>

            {/* Photo */}
            <motion.div
              className="re-chapter-photo-wrap"
              variants={clipReveal}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-5% 0px" }}
            >
              <img src={ch.photo} alt={ch.photoAlt} className="re-chapter-photo"/>
              <div className="re-chapter-num-overlay" aria-hidden="true">{ch.num}</div>
            </motion.div>

            {/* Text */}
            <div className="re-chapter-text">
              <InView>
                <span className="re-chapter-index">{ch.num} ──────</span>
              </InView>
              <InView delay={0.1}>
                <h3 className="re-chapter-title">{ch.title}</h3>
              </InView>
              <InView delay={0.2}>
                <p className="re-chapter-lead">{ch.lead}</p>
              </InView>
              <InView delay={0.3}>
                <p className="re-chapter-story">{ch.story}</p>
              </InView>
            </div>
          </article>
        ))}
      </section>

      {/* ══════════════════════════════════════════════════
          MARKETS — geography strip
      ══════════════════════════════════════════════════ */}
      <section className="re-markets">
        <InView className="re-markets-header">
          <p className="re-markets-label">Рынки присутствия</p>
          <h2 className="re-markets-title">Где я работаю</h2>
        </InView>

        <div className="re-markets-strip">
          {EXPERT.markets.map((city, i) => (
            <motion.div
              key={city}
              className="re-market-card"
              variants={stagger(i * 0.08)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-5% 0px" }}
            >
              <motion.div className="re-market-photo-wrap" variants={clipReveal} initial="hidden" whileInView="show" viewport={{ once: true }}>
                <img src={MARKET_PHOTOS[city]} alt={city} className="re-market-photo"/>
              </motion.div>
              <p className="re-market-name">{city}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          CONTACT — dark, intimate
      ══════════════════════════════════════════════════ */}
      <section className="re-contact" id="re-contacts">
        <div className="re-contact-inner">

          <div className="re-contact-left">
            <InView>
              <span className="re-contact-pretitle">Расскажите о вашей задаче</span>
            </InView>
            <InView delay={0.1}>
              <h2 className="re-contact-title">
                Давайте найдём<br/>
                <em>ваш объект</em>
              </h2>
            </InView>
            <InView delay={0.2}>
              <p className="re-contact-sub">
                Страну, бюджет, цели — всё обсудим в коротком разговоре.
                Я отвечаю в течение часа.
              </p>
            </InView>
          </div>

          <div className="re-contact-right">
            <InView className="re-contact-messengers" delay={0.15}>
              {tg && (
                <a href={tg.href} target="_blank" rel="noreferrer" className="re-messenger">
                  <TgIcon/>
                  <span>Telegram</span>
                  <span className="re-messenger-arr">→</span>
                </a>
              )}
              {mx && (
                <a href={mx.href} target="_blank" rel="noreferrer" className="re-messenger">
                  <MxIcon/>
                  <span>Max</span>
                  <span className="re-messenger-arr">→</span>
                </a>
              )}
              {vk && (
                <a href={vk.href} target="_blank" rel="noreferrer" className="re-messenger">
                  <VkIcon/>
                  <span>VKontakte</span>
                  <span className="re-messenger-arr">→</span>
                </a>
              )}
            </InView>

            <InView delay={0.3}>
              <button className="re-contact-cta" onClick={onOpenModal}>
                Оставить заявку →
              </button>
            </InView>
          </div>
        </div>
      </section>

    </div>
  );
}
