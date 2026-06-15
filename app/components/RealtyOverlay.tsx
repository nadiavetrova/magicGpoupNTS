"use client";

import { useRef, useEffect } from "react";
import { motion, useInView } from "motion/react";
import "./realty.css";

/* ── Team content ─────────────────────────────────────── */
const EXPERT = {
  teamName:  "MAGIC Group NTS",
  title:     "Команда по недвижимости",
  subtitle:  "Работаем с людьми, а не с объектами",
  bio:       "Недвижимость — это не просто сделка. Мы внимательно выслушаем ваши планы и сомнения, чтобы вместе найти решение, которое будет по-настоящему вашим. Работаем с квартирами, домами, участками и коммерческими объектами в России и за рубежом.",
  quote:     "В первую очередь мы работаем не с объектами, а с людьми и их мечтами.",
  stats:     [
    { num: "15",   label: "лет опыта" },
    { num: "5",    label: "стран"     },
    { num: "∞",    label: "решений"   },
  ],
  markets: ["Россия", "ОАЭ", "Турция", "Таиланд", "Вьетнам"],
};

const CHAPTERS = [
  {
    num:   "01",
    title: "Поиск",
    lead:  "Найдём идеальный вариант по вашим запросам и бюджету",
    story: "Прежде чем открыть первую ссылку — слушаем вас. Узнаём, как вы живёте, что важно в пространстве и какой горизонт инвестиции. Только после этого начинается точечный поиск: без лишнего шума и навязанных объектов.",
    photo: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1800&auto=format&fit=crop",
    photoAlt: "Modern white villa exterior",
  },
  {
    num:   "02",
    title: "Продажа",
    lead:  "Продадим вашу квартиру по максимальной рыночной цене",
    story: "Соберём и оформим все документы, чтобы не было проволочек. Организуем сделку так, чтобы вы получили лучший результат — без стресса и потери времени.",
    photo: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1400&auto=format&fit=crop",
    photoAlt: "Bright luxury interior, soft light",
  },
  {
    num:   "03",
    title: "Сопровождение",
    lead:  "От первого звонка до ключей — мы рядом",
    story: "Переговоры, нотариус, документы, регистрация — берём на себя. Работаем с любыми объектами: квартиры, дома, участки, коммерция. Хотите купить или продать — обеспечим вам спокойствие и выгоду.",
    photo: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1400&auto=format&fit=crop",
    photoAlt: "Luxury interior living room",
  },
];

// Hero — современная архитектурная вилла, минимализм, тёплый свет
const HERO_PHOTO = "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=1800&auto=format&fit=crop";

const MARKET_PHOTOS: Record<string, string> = {
  "Россия":  "https://images.unsplash.com/photo-1513326738677-b964603b136d?q=80&w=600&auto=format&fit=crop",
  "ОАЭ":     "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=600&auto=format&fit=crop",
  "Турция":  "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?q=80&w=600&auto=format&fit=crop",
  "Таиланд": "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?q=80&w=600&auto=format&fit=crop",
  "Вьетнам": "https://images.unsplash.com/photo-1528360983277-13d401cdc186?q=80&w=600&auto=format&fit=crop",
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

  /* ── Header background on scroll ── */
  useEffect(() => {
    const container = document.querySelector(".lenis") as HTMLElement | null;
    const header    = document.querySelector(".header")   as HTMLElement | null;
    if (!container || !header) return;

    const update = () => {
      if (container.scrollTop > 60) {
        header.style.background     = "rgba(12, 31, 23, 0.72)";
        header.style.backdropFilter = "blur(14px)";
        header.style.boxShadow      = "0 1px 0 rgba(201,146,42,0.12)";
      } else {
        header.style.background     = "transparent";
        header.style.backdropFilter = "none";
        header.style.boxShadow      = "none";
      }
    };

    update();
    container.addEventListener("scroll", update, { passive: true });
    return () => {
      container.removeEventListener("scroll", update);
      if (header) {
        header.style.background     = "transparent";
        header.style.backdropFilter = "none";
        header.style.boxShadow      = "none";
      }
    };
  }, []);

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

          <div className="re-hero-title-wrap" aria-label="Ваш дом в любой точке мира">
            {[
              { text: "Ваш дом",    italic: false },
              { text: "в любой",    italic: true  },
              { text: "точке мира", italic: false },
            ].map((line, i) => (
              <div key={i} className="re-hero-title-row" aria-hidden="true">
                <motion.span
                  className={`re-hero-title-word${line.italic ? " re-hero-title-word--italic" : ""}`}
                  variants={stagger(0.12 + i * 0.1)}
                  initial="hidden"
                  animate={textVisible ? "show" : "hidden"}
                >
                  {line.text}
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
            {EXPERT.teamName} · {EXPERT.subtitle}
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
            <button className="re-btn-ghost" onClick={() => {
              const el = document.getElementById("re-contacts");
              const container = document.querySelector(".lenis") as HTMLElement | null;
              if (el && container) container.scrollTo({ top: el.offsetTop - 80, behavior: "smooth" });
            }}>
              Контакты
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
            alt="Недвижимость — MAGIC Group NTS"
            className="re-hero-photo"
          />
          <div className="re-hero-photo-overlay" />
          <div className="re-hero-photo-caption">
            <span>MAGIC Group NTS</span>
            <span className="re-hero-photo-caption-rule" />
            <span>Недвижимость · РФ и за рубежом</span>
          </div>
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════════════
          QUOTE STRIP
      ══════════════════════════════════════════════════ */}
      <section className="re-quote-strip">
        <InView className="re-quote-inner">
          <blockquote className="re-quote">
            <span className="re-quote-mark">&ldquo;</span>
            {EXPERT.quote}
            <span className="re-quote-mark">&rdquo;</span>
          </blockquote>
        </InView>
      </section>

      {/* ══════════════════════════════════════════════════
          ADVISOR — personal intro
      ══════════════════════════════════════════════════ */}
      <section className="re-advisor" id="re-about">
        <span className="re-section-bg-num" aria-hidden="true">01</span>
        <div className="re-advisor-inner">

          {/* Services list */}
          <div className="re-advisor-photo-col">
            <InView>
              <p className="re-advisor-pretitle">— Чем мы занимаемся</p>
            </InView>
            <InView delay={0.1}>
              <ul className="re-services-list">
                <li>Найдём идеальную недвижимость по вашим запросам и бюджету</li>
                <li>Поможем продать квартиру или дом по максимальной рыночной цене</li>
                <li>Соберём и оформим все документы без проволочек</li>
                <li>Организуем сделку так, чтобы вы получили лучший результат</li>
                <li>Работаем с любыми объектами: квартиры, дома, участки, коммерция</li>
              </ul>
            </InView>
          </div>

          {/* Bio */}
          <div className="re-advisor-info">
            <InView>
              <p className="re-advisor-pretitle">— О нас</p>
            </InView>
            <InView delay={0.1}>
              <h2 className="re-advisor-name">
                MAGIC<br/>
                <span className="re-advisor-surname">Group NTS</span>
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
                Написать нам →
              </button>
            </InView>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          CHAPTERS — 3 editorial sections
      ══════════════════════════════════════════════════ */}
      <section className="re-chapters" id="re-services">
        {CHAPTERS.map((ch, i) => (
          <article key={ch.num} className={`re-chapter re-chapter--${i % 2 === 0 ? "left" : "right"}`}>

            {/* Big background number */}
            <span className="re-chapter-bg-num" aria-hidden="true">{ch.num}</span>

            {/* Photo */}
            <div className="re-chapter-frame">
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
            </div>

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
      <section className="re-markets" id="re-markets">
        <InView className="re-markets-header">
          <p className="re-markets-label">Рынки присутствия</p>
          <h2 className="re-markets-title">Где мы работаем</h2>
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
                Нужен совет при выборе или продаже жилья? Напишите нам — разберём ваш вариант в коротком разговоре.
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
