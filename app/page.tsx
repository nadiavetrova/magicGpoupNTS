"use client";

import { useState, useEffect } from "react";
import SmoothScroll from "./components/SmoothScroll";

type PanelId = "tourism" | "insurance" | "realty";
type Panel = { id: PanelId; badge: string; title: string; bg: string; bgSize?: string; bgPos?: string; accent: string; label: string; heading: string; role: string; body: string[]; tags: string[]; stats: { num: string; label: string }[]; services: { title: string; subtitle: string; desc: string; items: { icon: string; name: string; hint: string }[]; cta: string; ctaHref: string } };

const panels = [
  {
    id: "tourism" as PanelId,
    badge: "✈",
    title: "Туризм",
    bg: "/images/turAgent.jpg",
    bgSize: "cover",
    bgPos: "center top",
    accent: "#5ba8e5",
    label: "Направление 01",
    heading: "Туризм\nбез глянца",
    role: "15 лет в международном туризме",
    body: [
      "В 18 лет — первый раз за границей. Турция, море, пальмы. Начинал с экскурсий, вырос до отельного гида в одной из крупнейших туроператорских компаний мира.",
      "Турция, Индия, ОАЭ — я знаю эти направления изнутри. Не по каталогам, а по реальному опыту: где лучшие пляжи, какой отель не обманет, что стоит посмотреть за пределами туристических троп.",
    ],
    tags: ["Пакетные туры", "Авторские маршруты", "Турция · Индия · ОАЭ"],
    stats: [{ num: "15", label: "Лет опыта" }, { num: "5+", label: "Стран" }],
    services: {
      title: "Подберём путёвку или экскурсию",
      subtitle: "Туристический продукт под ваш запрос",
      desc: "Расскажите куда хотите — подберём тур, отель, экскурсию или авторский маршрут. Пакетные туры, семейный отдых, медовый месяц, экзотика.",
      items: [
        { icon: "01", name: "Пляжный отдых", hint: "Турция, Египет, Мальдивы, ОАЭ" },
        { icon: "02", name: "Экскурсионные туры", hint: "Европа, Азия, авторские маршруты" },
        { icon: "03", name: "Авиабилеты + отель", hint: "Лучшие цены, быстрое оформление" },
        { icon: "04", name: "Экзотика", hint: "Индия, Таиланд, Вьетнам, Бали" },
      ],
      cta: "Подобрать путёвку →",
      ctaHref: "#",
    },
  },
  {
    id: "insurance" as PanelId,
    badge: "◈",
    title: "Страхование",
    bg: "/images/insuranceAgent.jpg",
    bgSize: "cover",
    bgPos: "center top",
    accent: "#9B2335",
    label: "Направление 02",
    heading: "Страхование,\nкоторое работает",
    role: "Страховой агент · Все виды",
    body: [
      "«Многие летят с минимальной страховкой. Когда случается серьёзная ситуация — оказывается, что случай не страховой.»",
      "15 лет я видел, что происходит без нормальной страховки. Теперь помогаю подобрать защиту, которая реально покроет нужный случай.",
    ],
    tags: ["Туристическая", "Жизнь и здоровье", "Имущество", "КАСКО / ОСАГО"],
    stats: [{ num: "∞", label: "Клиентов" }, { num: "5+", label: "Видов" }],
    services: {
      title: "Смотреть пакеты страхования",
      subtitle: "Защита под любой случай",
      desc: "Выберите вид страхования — подберём оптимальный пакет. Страховки, которые реально покрывают страховые случаи, без скрытых исключений.",
      items: [
        { icon: "01", name: "Туристическая", hint: "Медицина, отмена, багаж за рубежом" },
        { icon: "02", name: "Жизнь и здоровье", hint: "НС, критические заболевания" },
        { icon: "03", name: "Имущество", hint: "Квартира, дом, ипотека" },
        { icon: "04", name: "КАСКО / ОСАГО", hint: "Авто под ключ, лучшие условия" },
      ],
      cta: "Смотреть пакеты →",
      ctaHref: "#",
    },
  },
  {
    id: "realty" as PanelId,
    badge: "⌂",
    title: "Недвижимость",
    bg: "/images/realEstateAgent.jpg",
    bgSize: "cover",
    bgPos: "center top",
    accent: "#e8c97a",
    label: "Направление 03",
    heading: "От отпуска —\nк инвестициям",
    role: "Агент по недвижимости · Россия и за рубежом",
    body: [
      "Я заметил закономерность ещё работая гидом: туристы, которые влюблялись в страну, начинали спрашивать про квартиры. Сделки закрывались прямо во время отпуска.",
      "Турция, ОАЭ, Таиланд, Вьетнам — знаю эти рынки не теоретически. Сопровождение сделок, выбор объекта, юридическая чистота.",
    ],
    tags: ["Зарубежная", "Россия", "Инвестиции"],
    stats: [{ num: "4+", label: "Страны" }, { num: "∞", label: "Сделок" }],
    services: {
      title: "Ознакомьтесь с вариантами",
      subtitle: "Недвижимость в России и за рубежом",
      desc: "Подберём объект под ваши цели: отдых, инвестиции или переезд. Сопровождение сделки от поиска до ключей.",
      items: [
        { icon: "01", name: "За рубежом", hint: "Турция, ОАЭ, Таиланд, Вьетнам" },
        { icon: "02", name: "В России", hint: "Новостройки, вторичка, коммерция" },
        { icon: "03", name: "Инвестиции", hint: "Доходная недвижимость, апарт-отели" },
        { icon: "04", name: "Под ключ", hint: "Поиск, сделка, юридическое сопровождение" },
      ],
      cta: "Смотреть варианты →",
      ctaHref: "#",
    },
  },
];

export default function Home() {
  const [active, setActive] = useState<PanelId | null>(null);
  const [textVisible, setTextVisible] = useState(false);
  const [overlayExpanded, setOverlayExpanded] = useState(false);
  const [initialClip, setInitialClip] = useState("inset(0 0 0 0)");

  useEffect(() => {
    if (active) {
      // Overlay open — unlock so wheel events reach the fixed overlay
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    } else {
      // Main screen — lock page scroll
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
      setTextVisible(false);
      setOverlayExpanded(false);
    }
  }, [active]);

  const handleOpen = (id: PanelId, e: React.MouseEvent<HTMLDivElement>) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const t = Math.round(rect.top);
    const r = Math.round(window.innerWidth - rect.right);
    const b = Math.round(window.innerHeight - rect.bottom);
    const l = Math.round(rect.left);
    setInitialClip(`inset(${t}px ${r}px ${b}px ${l}px round 0px)`);
    setOverlayExpanded(false);
    setActive(id);
    // two rAFs to ensure DOM is painted before transition starts
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setOverlayExpanded(true);
      });
    });
    setTimeout(() => setTextVisible(true), 1100);
  };

  const handleClose = () => {
    setTextVisible(false);
    setOverlayExpanded(false);
    setTimeout(() => setActive(null), 50);
  };

  const p = panels.find((x) => x.id === active);

  return (
    <>
      {/* ── HEADER ── */}
      <header className="header" style={{ background: "transparent", backdropFilter: "none", zIndex: 200 }}>
        <div style={{ cursor: active ? "pointer" : "default" }} onClick={active ? handleClose : undefined}>
          <div className="logo-main">MAGIC Group NTS</div>
          <div className="logo-sub">Туризм · Страхование · Недвижимость</div>
        </div>
        <a className="header-phone" href="tel:+79000000000">+7 (900) 000-00-00</a>
      </header>

      {/* ── HERO PANELS ── */}
      <section className="hero-panels">
        {panels.map((panel) => {
          const isActive = active === panel.id;
          const isInactive = active !== null && !isActive;
          return (
            <div
              key={panel.id}
              className={`panel${isActive ? " panel--active" : ""}`}
              style={{ flex: isActive ? "8" : isInactive ? "0.15" : "1", cursor: isInactive ? "pointer" : "default" }}
              onClick={(e) => { if (!isActive) handleOpen(panel.id, e); }}
            >
              <div className={`panel-bg${isActive ? " panel-bg--expand" : ""}`}
                style={{ backgroundImage: `url(${panel.bg})`, backgroundSize: panel.bgSize || "cover", backgroundPosition: panel.bgPos || "center top" }} />
              {!isActive && <div className="panel-overlay" />}
              {!isActive && (
                <div className="panel-content">
                  <div className="panel-badge">{panel.badge}</div>
                  <div className="panel-title">{panel.title}</div>
                </div>
              )}
              {isInactive && <div className="panel-side-label">{panel.title}</div>}
            </div>
          );
        })}
      </section>

      {/* ── FULL-SCREEN OVERLAY ── */}
      {active && p && (
        <div
          className="fullscreen-overlay"
          style={{
            clipPath: overlayExpanded ? "inset(0 0 0 0 round 0px)" : initialClip,
            transition: overlayExpanded ? "clip-path 1.4s cubic-bezier(0.76, 0, 0.24, 1)" : "none",
          }}
        >
          {/* Fixed background */}
          <div
            className="fullscreen-photo"
            style={{
              backgroundImage: `url(${p.bg})`,
              backgroundSize: p.bgSize || "cover",
              backgroundPosition: p.bgPos || "center top",
              transform: overlayExpanded ? "scale(1)" : "scale(1.08)",
              transition: overlayExpanded ? "transform 1.8s cubic-bezier(0.4, 0, 0.2, 1)" : "none",
            }}
          />
          <div className="fullscreen-gradient" />

          {/* SECTION 1 — О направлении */}
          <div className={`fullscreen-content${textVisible ? " fullscreen-content--visible" : ""}`}>
            <div className="exp-label">{p.label}</div>
            <h2 className="exp-heading">
              {p.heading.split("\n").map((l, i) => <span key={i}>{l}<br /></span>)}
            </h2>
            <div className="exp-role">{p.role}</div>

            <div className="exp-right" style={{ marginTop: "1.2rem" }}>
              {p.stats.map((s) => (
                <div key={s.label} className="exp-stat">
                  <div className="exp-stat-num" style={{ color: p.accent }}>{s.num}</div>
                  <div className="exp-stat-label">{s.label}</div>
                </div>
              ))}
            </div>

            <div className="exp-body" style={{ marginTop: "1.5rem" }}>
              {p.body.map((t, i) => <p key={i}>{t}</p>)}
            </div>

            <div className="exp-tags" style={{ marginTop: "1.5rem" }}>
              {p.tags.map((t) => (
                <span key={t} className="exp-tag" style={{ borderColor: `${p.accent}55`, color: `${p.accent}cc` }}>{t}</span>
              ))}
            </div>

            {/* Scroll hint */}
            <div className="scroll-down-hint" style={{ color: `${p.accent}99` }}>
              <span>Листайте вниз</span>
              <div className="scroll-down-arrow" style={{ borderColor: `${p.accent}66` }} />
            </div>
          </div>

          {/* SECTION 2 — Услуги */}
          <div className={`services-section${textVisible ? " services-section--visible" : ""}`}>
            <div className="services-inner">
              <div className="services-header">
                <div className="exp-label" style={{ color: `${p.accent}99` }}>Что мы предлагаем</div>
                <h3 className="services-title">{p.services.title}</h3>
                <p className="services-subtitle">{p.services.desc}</p>
              </div>

              <div className="services-grid">
                {p.services.items.map((item) => (
                  <div key={item.name} className="service-card" style={{ "--card-accent": p.accent } as React.CSSProperties}>
                    <div className="service-card-icon">{item.icon}</div>
                    <div className="service-card-name">{item.name}</div>
                    <div className="service-card-hint">{item.hint}</div>
                  </div>
                ))}
              </div>

              <a
                href={p.services.ctaHref}
                className="services-cta"
                style={{ background: p.accent, color: "#0a0a0a" }}
              >
                {p.services.cta}
              </a>
            </div>
          </div>
        </div>
      )}

      <SmoothScroll active={!!active} />

      {/* FOOTER */}
      {active && (
        <footer className="footer" style={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 60, background: "rgba(5,5,5,0.75)", backdropFilter: "blur(10px)" }}>
          <div className="footer-copy">© 2025 MAGIC Group NTS · Шухрат Азизов</div>
          <div className="social-links">
            <a className="social-link" href="#" aria-label="Telegram">TG</a>
            <a className="social-link" href="#" aria-label="WhatsApp">WA</a>
            <a className="social-link" href="#" aria-label="Instagram">IN</a>
          </div>
        </footer>
      )}
    </>
  );
}
