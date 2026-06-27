"use client";

import { useState, useEffect } from "react";
import SmoothScroll from "./components/SmoothScroll";
import RequestModal from "./components/RequestModal";
import TourismOverlay from "./components/TourismOverlay";
import RealtyOverlay from "./components/RealtyOverlay";
import InsuranceOverlay from "./components/InsuranceOverlay";
import TourDrawer from "./components/TourDrawer";
import HomeScreen from "./components/HomeScreen";

type PanelId = "tourism" | "insurance" | "realty";
type SocialLink = { label: string; href: string };
type Panel = { id: PanelId; badge?: string; title: string; bg: string; bgSize?: string; bgPos?: string; accent: string; label: string; heading: string; role: string; body: string[]; tags: string[]; stats: { num: string; label: string; sublabel?: string; desc?: string; items?: string[] }[]; services: { title: string; items: { icon: string; name: string; hint: string }[]; cta: string; ctaHref: string }; socials: SocialLink[] };

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
      "Мы знаем направления изнутри. Не по буклетам, а по реальному опыту: где лучшие пляжи, какой отель не обманет, что стоит увидеть за пределами туристических троп.",
    ],
    tags: ["Пакетные туры", "Авторские маршруты", "Турция · Египет · Греция · Индия · Тайланд · Вьетнам · Мальдивы · Маврикий · Занзибар · Куба и т.д."],
    stats: [
      { num: "15+", label: "Опыт", sublabel: "лет опыта в туризме", desc: "За это время мы объехали десятки стран и собрали лучшее для ваших путешествий." },
      { num: "10+", label: "Направления", sublabel: "стран", items: ["Турция", "Египет", "Греция", "Индия", "Таиланд", "Вьетнам", "Мальдивы", "Маврикий", "Занзибар", "Куба", "и другие."] },
    ],
    services: {
      title: "Подберём путёвку или экскурсию",
      items: [
        { icon: "01", name: "Подбор путёвки", hint: "Любое направление на ваш вкус", description: "Помогаем выбрать идеальный отдых — от пляжного релакса до активных путешествий. Подбираем отели, трансферы и страховку. Работаем только с проверенными туроператорами и напрямую с отелями." },
        { icon: "02", name: "Авторские экскурсионные туры", hint: "Наши неповторимые маршруты", description: "Уникальные маршруты, которые мы разработали сами — на основе личного опыта, а не каталогов. Небольшие группы, живое общение с местными, нестандартные точки и неожиданные открытия." },
        { icon: "03", name: "Авиабилеты + отель", hint: "Лучшие цены, быстрое оформление", description: "Находим лучшие цены на перелёты и размещение, оформляем быстро — от заявки до билетов за несколько часов. Любые направления, любой бюджет, без скрытых наценок." },
      ],
      cta: "Подобрать путёвку самостоятельно →",
      ctaHref: "#",
    },
    socials: [
      { label: "WA", href: "https://chat.whatsapp.com/DJCE0e6AfgqAlnjcYQXU8V?mode=gi_t" },
      { label: "MX", href: "https://max.ru/join/w4v28odPKu06lp5xCdnyI6aD8T8o-i8vxT8p_6Gc9wo" },
      { label: "VK", href: "https://vk.ru/magic_tour_nts" },
      { label: "IN", href: "https://www.instagram.com/magic_tour_travel?igsh=MWhoMWtjYzZ3eHpwbQ%3D%3D&utm_source=qr" },
      { label: "TG", href: "https://t.me/magic_tour_travel" },
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
      "Жду новый текст",
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
    socials: [
      { label: "TG", href: "https://t.me/magic_tour_travel" },
      { label: "WA", href: "https://chat.whatsapp.com/DJCE0e6AfgqAlnjcYQXU8V?mode=gi_t" },
      { label: "VK", href: "https://vk.ru/magic_tour_nts" },
      { label: "IN", href: "https://www.instagram.com/magic_tour_travel?igsh=MWhoMWtjYzZ3eHpwbQ%3D%3D" },
      { label: "MX", href: "https://max.ru/join/w4v28odPKu06lp5xCdnyI6aD8T8o-i8vxT8p_6Gc9wo" },
    ],
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
      <header className={`header${active ? " header--section-active" : ""}${active === "realty" ? " header--realty" : ""}${active === "insurance" ? " header--insurance" : ""}`} style={{ zIndex: 200, ...(active === "insurance" ? { background: "#e8c97a", backdropFilter: "none", boxShadow: "none" } : {}) }}>
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
                border: active === "insurance"
                  ? "1px solid rgba(0,0,0,0.18)"
                  : "1px solid rgba(255,255,255,0.2)",
                justifyContent: "center",
              } : {}}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.color = active === "insurance" ? "#0a6a90" : "#fff";
                if (isMobile) el.style.borderColor = active === "insurance" ? "#3d7282" : "rgba(255,255,255,0.5)";
                const line = el.querySelector(".back-line") as HTMLElement | null;
                if (line) line.style.width = "36px";
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.color = "";
                if (isMobile) el.style.borderColor = active === "insurance" ? "rgba(0,0,0,0.18)" : "rgba(255,255,255,0.2)";
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
          {/* Fixed background photo — not for tourism/insurance (manage own backgrounds) */}
          {active !== "tourism" && active !== "insurance" && (
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
            /* ── INSURANCE ── */
            <InsuranceOverlay
              p={p}
              textVisible={textVisible}
              onOpenModal={() => setModalOpen(true)}
            />
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

    </>
  );
}
