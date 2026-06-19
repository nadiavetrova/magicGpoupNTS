"use client";

import { useState, useEffect } from "react";
import SmoothScroll from "./components/SmoothScroll";
import RequestModal from "./components/RequestModal";
import TourismOverlay from "./components/TourismOverlay";
import RealtyOverlay from "./components/RealtyOverlay";
import TourDrawer from "./components/TourDrawer";
import HomeScreen from "./components/HomeScreen";

type PanelId = "tourism" | "insurance" | "realty";
type SocialLink = { label: string; href: string };
type Panel = { id: PanelId; badge?: string; title: string; bg: string; bgSize?: string; bgPos?: string; accent: string; label: string; heading: string; role: string; body: string[]; tags: string[]; stats: { num: string; label: string }[]; services: { title: string; items: { icon: string; name: string; hint: string }[]; cta: string; ctaHref: string }; socials: SocialLink[] };

const panels = [
  {
    id: "tourism" as PanelId,
    title: "Туризм",
    bg: "linear-gradient(155deg, #05111f 0%, #0a1e35 45%, #071525 100%)",
    accent: "#e8c97a",
    label: "Направление 01",
    heading: "Туризм\nбез глянца",
    role: "Наш опыт в международном туризме — 15 лет",
    body: [
      "Мы начинали с экскурсий, работали гидами в одной из крупнейших туроператорских компаний мира. Прошли путь от первой поездки до маршрутов, которые не найти в каталоге.",
      "Турция, Индия, ОАЭ — мы знаем эти направления изнутри. Не по буклетам, а по реальному опыту: где лучшие пляжи, какой отель не обманет, что стоит увидеть за пределами туристических троп.",
    ],
    tags: ["Пакетные туры", "Авторские маршруты", "Турция · Индия · ОАЭ"],
    stats: [{ num: "15", label: "Лет опыта" }, { num: "5+", label: "Стран" }],
    services: {
      title: "Подберём путёвку или экскурсию",
      items: [
        { icon: "01", name: "Пляжный отдых", hint: "Курорты на любой вкус" },
        { icon: "02", name: "Авторские экскурсионные туры", hint: "Наши неповторимые маршруты" },
        { icon: "03", name: "Авиабилеты + отель", hint: "Лучшие цены, быстрое оформление" },
      ],
      cta: "Подобрать путёвку самостоятельно →",
      ctaHref: "#",
    },
    socials: [
      { label: "WA", href: "https://chat.whatsapp.com/DJCE0e6AfgqAlnjcYQXU8V?mode=gi_t" },
      { label: "MX", href: "https://max.ru/join/w4v28odPKu06lp5xCdnyI6aD8T8o-i8vxT8p_6Gc9wo" },
      { label: "IN", href: "https://www.instagram.com/magic_tour_travel?igsh=MWhoMWtjYzZ3eHpwbQ%3D%3D&utm_source=qr" },
      { label: "VK", href: "https://vk.ru/magic_tour_nts" },
    ],
  },
  {
    id: "realty" as PanelId,
    badge: "⌂",
    title: "Недвижимость",
    bg: "linear-gradient(155deg, #0a0c06 0%, #181a08 45%, #0e0f05 100%)",
    accent: "#e8c97a",
    label: "Направление 02",
    heading: "От отпуска —\nк инвестициям",
    role: "Агент по недвижимости · Россия и за рубежом",
    body: [
      "Помогаю найти недвижимость, которая подходит именно вам — будь то уютная квартира для жизни, апартаменты у моря или доходный объект за рубежом.",
      "Знаю рынки Турции, ОАЭ, Таиланда и Вьетнама изнутри. Сопровождение от первого просмотра до оформления ключей — на каждом этапе рядом.",
    ],
    tags: ["Зарубежная", "Россия", "Инвестиции"],
    stats: [{ num: "4+", label: "Страны" }, { num: "∞", label: "Сделок" }],
    services: {
      title: "Ознакомьтесь с вариантами",
      items: [
        { icon: "01", name: "За рубежом", hint: "Турция, ОАЭ, Таиланд, Вьетнам" },
        { icon: "02", name: "В России", hint: "Новостройки, вторичка, коммерция" },
        { icon: "03", name: "Инвестиции", hint: "Доходная недвижимость, апарт-отели" },
        { icon: "04", name: "Под ключ", hint: "Поиск, сделка, юридическое сопровождение" },
      ],
      cta: "Написать в Telegram →",
      ctaHref: "https://t.me/AN_MAGIC_NTS",
    },
    socials: [
      { label: "TG", href: "https://t.me/AN_MAGIC_NTS" },
      { label: "VK", href: "https://vk.ru/an_magic_nts" },
      { label: "MX", href: "https://max.ru/join/z1uJBeJC7MbSse2sDH2OQW2xnbTPHGTSa_SHjNhkv2c" },
    ],
  },
  {
    id: "insurance" as PanelId,
    badge: "◈",
    title: "Страхование",
    bg: "linear-gradient(155deg, #0f0508 0%, #200a10 45%, #120507 100%)",
    accent: "#9B2335",
    label: "Направление 03",
    heading: "Страхование,\nкоторое работает",
    role: "Страховой агент · Все виды",
    body: [
      "«Многие летят с минимальной страховкой. Когда случается серьёзная ситуация — оказывается, что случай не страховой.»",
      "15 лет я видел, что происходит без нормальной страховки. Теперь помогаю подобрать защиту, которая реально покроет нужный случай.",
    ],
    tags: ["Авто", "Жизнь и здоровье", "Имущество", "Выезд за рубеж", "Бизнес"],
    stats: [{ num: "∞", label: "Клиентов" }, { num: "11+", label: "Видов" }],
    services: {
      title: "Виды страхования",
      items: [
        { icon: "01", name: "КАСКО",                                    hint: "Автострахование от ущерба и угона" },
        { icon: "02", name: "ОСАГО",                                    hint: "Обязательное страхование авто" },
        { icon: "03", name: "Страхование от НС",                        hint: "Несчастные случаи, критические заболевания" },
        { icon: "04", name: "Полисы для соревнований",                  hint: "Все виды спорта и соревновательной деятельности" },
        { icon: "05", name: "Дом / квартира",                           hint: "Имущество физических лиц" },
        { icon: "06", name: "Ипотека",                                  hint: "Страхование ипотечного объекта и жизни заёмщика" },
        { icon: "07", name: "ДМС",                                      hint: "Добровольное медицинское страхование" },
        { icon: "08", name: "Выезжающим за границу",                    hint: "Медицина, отмена поездки, багаж, ответственность" },
        { icon: "09", name: "Грузы и ответственность",                  hint: "Логистика, перевозки, профессиональная ответственность" },
        { icon: "10", name: "Малый и средний бизнес",                   hint: "Комплексная защита МСБ, все риски" },
        { icon: "11", name: "Имущество юридических лиц",                hint: "Коммерческая недвижимость, оборудование, склады" },
      ],
      cta: "Оставить заявку →",
      ctaHref: "#",
    },
    socials: [],
  },
];

export default function Home() {
  const [active, setActive] = useState<PanelId | null>(null);
  const [textVisible, setTextVisible] = useState(false);
  const [overlayExpanded, setOverlayExpanded] = useState(false);
  const [initialClip, setInitialClip] = useState("inset(0 0 0 0)");
  const [modalOpen, setModalOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [tourDrawerOpen, setTourDrawerOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 640px)");
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

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

  const handleOpen = (id: PanelId, e?: React.MouseEvent<Element>) => {
    if (e) {
      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
      const t = Math.round(rect.top);
      const r = Math.round(window.innerWidth - rect.right);
      const b = Math.round(window.innerHeight - rect.bottom);
      const l = Math.round(rect.left);
      setInitialClip(`inset(${t}px ${r}px ${b}px ${l}px round 0px)`);
    } else {
      setInitialClip("inset(0 0 100% 0 round 0px)");
    }
    setOverlayExpanded(false);
    setActive(id);
    setMobileMenuOpen(false);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setOverlayExpanded(true);
      });
    });
    setTimeout(() => setTextVisible(true), e ? 1100 : 500);
  };

  const handleClose = () => {
    setTextVisible(false);
    setOverlayExpanded(false);
    setMobileMenuOpen(false);
    setTimeout(() => setActive(null), 50);
  };

  const p = panels.find((x) => x.id === active);

  return (
    <>
      {/* ── HEADER ── */}
      <header className={`header${active ? " header--section-active" : ""}${active === "realty" ? " header--realty" : ""}`} style={{ background: "transparent", backdropFilter: "none", zIndex: 200 }}>
        {/* Logo */}
        <div className="header-logo" style={{ cursor: active ? "pointer" : "default", overflow: "visible" }} onClick={active ? handleClose : undefined}>
          <div className="logo-main">MAGIC Group NTS</div>
          <div className="logo-sub" style={isMobile ? { whiteSpace: "nowrap", fontSize: "0.56rem", letterSpacing: "0.06em", gap: "0.1em" } : undefined}>
            {([ "tourism", "realty", "insurance" ] as PanelId[]).map((id, i) => {
              const label = id === "tourism" ? "Туризм" : id === "insurance" ? "Страхование" : "Недвижимость";
              return (
                <span key={id}>
                  {i > 0 && <span className="logo-sub-dot">·</span>}
                  <button
                    className={`logo-sub-link${active === id ? " logo-sub-link--active" : ""}`}
                    onClick={e => { e.stopPropagation(); handleOpen(id); }}
                    style={isMobile ? { padding: "5px 2px" } : undefined}
                  >
                    {label}
                  </button>
                </span>
              );
            })}
          </div>
        </div>

        {/* Desktop nav — якоря внутри активного раздела */}
        {active === "realty" && (
          <nav className="header-nav" aria-label="Навигация по разделу">
            {[
              { label: "О нас",    anchor: "re-about"    },
              { label: "Услуги",   anchor: "re-services" },
              { label: "Рынки",    anchor: "re-markets"  },
              { label: "Контакты", anchor: "re-contacts" },
            ].map(({ label, anchor }) => (
              <button
                key={anchor}
                className="header-nav-item"
                onClick={() => {
                  const el = document.getElementById(anchor);
                  const container = document.querySelector(".lenis") as HTMLElement | null;
                  if (el && container) container.scrollTo({ top: el.offsetTop - 80, behavior: "smooth" });
                }}
              >
                {label}
              </button>
            ))}
          </nav>
        )}

        {/* Right: phone + burger */}
        <div className="header-right">
          <a className="header-phone" href="tel:+79178739655">
            {isMobile ? "Позвонить" : "+7 (917) 873-96-55"}
          </a>
          {active && (
            <button
              className="header-back-btn"
              onClick={handleClose}
              style={isMobile ? {
                width: "38px", height: "38px", padding: 0, gap: 0,
                borderRadius: "3px", background: "none",
                border: "1px solid rgba(255,255,255,0.15)",
                justifyContent: "center"
              } : undefined}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.color = "rgba(255,255,255,0.85)";
                if (isMobile) el.style.borderColor = "rgba(232,201,122,0.5)";
                const line = el.querySelector(".back-line") as HTMLElement | null;
                if (line) line.style.width = "36px";
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.color = "rgba(255,255,255,0.4)";
                if (isMobile) el.style.borderColor = "rgba(255,255,255,0.15)";
                const line = el.querySelector(".back-line") as HTMLElement | null;
                if (line) line.style.width = "20px";
              }}
            >
              {/* Десктоп: линия */}
              <span className="back-line back-line--desktop"/>
              {/* Мобиле: стрелка */}
              <svg className="back-icon--mobile" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="15 18 9 12 15 6"/>
              </svg>
              {/* Текст: только на десктопе */}
              {!isMobile && <span>Главный экран</span>}
            </button>
          )}
          {/* Home icon — mobile only, только в разделе недвижимость */}
          {active === "realty" && <button
            className={`header-burger${mobileMenuOpen ? " header-burger--open" : ""}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Меню"
          >
            {mobileMenuOpen ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="4" y1="4" x2="20" y2="20"/><line x1="20" y1="4" x2="4" y2="20"/>
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 12L12 4l9 8"/>
                <path d="M5 10v9a1 1 0 001 1h4v-5h4v5h4a1 1 0 001-1v-9"/>
              </svg>
            )}
          </button>}
        </div>

        {/* Mobile menu overlay */}
        {mobileMenuOpen && (
          <div className="header-mobile-menu" onClick={() => setMobileMenuOpen(false)}>
            <div className="header-mobile-inner" onClick={e => e.stopPropagation()}>

              {/* Якоря внутри раздела недвижимость */}
              {active === "realty" && (
                <>
                  <p className="header-mobile-label">Недвижимость</p>
                  {[
                    { label: "О нас",    anchor: "re-about"    },
                    { label: "Услуги",   anchor: "re-services" },
                    { label: "Рынки",    anchor: "re-markets"  },
                    { label: "Контакты", anchor: "re-contacts" },
                  ].map(({ label, anchor }) => (
                    <button
                      key={anchor}
                      className="header-mobile-item header-mobile-item--anchor"
                      onClick={() => {
                        setMobileMenuOpen(false);
                        const el = document.getElementById(anchor);
                        const container = document.querySelector(".lenis") as HTMLElement | null;
                        if (el && container) container.scrollTo({ top: el.offsetTop - 80, behavior: "smooth" });
                      }}
                    >
                      <span className="header-mobile-num">→</span>
                      {label}
                    </button>
                  ))}
                </>
              )}

              <div className="header-mobile-divider"/>
              <a className="header-mobile-phone" href="tel:+79178739655">+7 (917) 873-96-55</a>
            </div>
          </div>
        )}
      </header>

      {/* ── HOME SCREEN (когда раздел не открыт) ── */}
      {!active && <HomeScreen onOpen={handleOpen} />}

      {/* ── FULL-SCREEN OVERLAY ── */}
      {active && p && (
        <div
          className="fullscreen-overlay"
          style={{
            clipPath: overlayExpanded ? "inset(0 0 0 0 round 0px)" : initialClip,
            transition: overlayExpanded ? "clip-path 1.4s cubic-bezier(0.76, 0, 0.24, 1)" : "none",
          }}
        >
          {/* Fixed background photo — not for tourism (manages own photos) */}
          {active !== "tourism" && (
            <>
              <div
                className="fullscreen-photo"
                style={{
                  background: p.bg,
                  transform: overlayExpanded ? "scale(1)" : "scale(1.08)",
                  transition: overlayExpanded ? "transform 1.8s cubic-bezier(0.4, 0, 0.2, 1)" : "none",
                }}
              />
              <div className="fullscreen-gradient" />
            </>
          )}

          {active === "tourism" ? (
            /* ── TOURISM ── */
            <TourismOverlay
              p={p}
              textVisible={textVisible}
              onOpenModal={() => setModalOpen(true)}
              onOpenTours={() => setTourDrawerOpen(true)}
            />
          ) : active === "realty" ? (
            /* ── REALTY ── */
            <RealtyOverlay
              p={p}
              textVisible={textVisible}
              onOpenModal={() => setModalOpen(true)}
            />
          ) : (
            <>
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

                  <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                    <button
                      className="request-btn"
                      style={{ background: p.accent }}
                      onClick={() => setModalOpen(true)}
                    >
                      Оставить заявку
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      )}

      <SmoothScroll active={!!active} />
      {p && (
        <RequestModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          accent={p.accent}
          section={p.id}
          sectionTitle={p.services.title}
          services={p.services.items}
        />
      )}
      <TourDrawer
        isOpen={tourDrawerOpen}
        onClose={() => setTourDrawerOpen(false)}
        onBook={() => {
          setModalOpen(true);
        }}
      />

      {/* FOOTER */}
      {active && (
        <footer className="footer" style={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 60, background: "rgba(5,5,5,0.75)", backdropFilter: "blur(10px)" }}>
          <div className="footer-copy">© 2025 MAGIC Group NTS · Шухрат Азизов</div>
          <div className="social-links">
            {p?.socials.map((s) => (
              <a key={s.label} className="social-link" href={s.href} target="_blank" rel="noreferrer">{s.label}</a>
            ))}
          </div>
        </footer>
      )}
    </>
  );
}
