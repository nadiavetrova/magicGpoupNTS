"use client";

import { useState, useCallback, useRef, useEffect } from "react";

type PanelId = "tourism" | "insurance" | "realty";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  accent: string;
  section: PanelId;
  sectionTitle: string;
  services: { name: string; hint: string }[];
}

/* ── Countries ──────────────────────────────────────────────── */
const COUNTRIES = [
  { flag: "🇷🇺", name: "Россия",              code: "+7"   },
  { flag: "🇧🇾", name: "Беларусь",            code: "+375" },
  { flag: "🇰🇿", name: "Казахстан",           code: "+7"   },
  { flag: "🇺🇿", name: "Узбекистан",          code: "+998" },
  { flag: "🇦🇿", name: "Азербайджан",         code: "+994" },
  { flag: "🇹🇯", name: "Таджикистан",         code: "+992" },
  { flag: "🇹🇲", name: "Туркменистан",        code: "+993" },
  { flag: "🇺🇦", name: "Украина",             code: "+380" },
  { flag: "🇬🇪", name: "Грузия",              code: "+995" },
  { flag: "🇲🇩", name: "Молдова",             code: "+373" },
  { flag: "🇹🇷", name: "Турция",              code: "+90"  },
  { flag: "🇦🇪", name: "ОАЭ",                code: "+971" },
  { flag: "🇸🇦", name: "Саудовская Аравия",  code: "+966" },
  { flag: "🇮🇱", name: "Израиль",             code: "+972" },
  { flag: "🇪🇬", name: "Египет",              code: "+20"  },
  { flag: "🇮🇳", name: "Индия",               code: "+91"  },
  { flag: "🇲🇻", name: "Мальдивы",            code: "+960" },
  { flag: "🇹🇭", name: "Таиланд",             code: "+66"  },
  { flag: "🇻🇳", name: "Вьетнам",             code: "+84"  },
  { flag: "🇮🇩", name: "Индонезия",           code: "+62"  },
  { flag: "🇨🇳", name: "Китай",               code: "+86"  },
  { flag: "🌍",  name: "Другая страна",        code: "+"    },
] as const;

type Country = typeof COUNTRIES[number];

/* ── Validation ─────────────────────────────────────────────── */
// Expected LOCAL digit count per country code (without country prefix)
const PHONE_LENGTHS: Record<string, number | [number, number]> = {
  "+7":    10,       // Россия, Казахстан
  "+375":  9,        // Беларусь
  "+998":  9,        // Узбекистан
  "+994":  9,        // Азербайджан
  "+992":  9,        // Таджикистан
  "+993":  8,        // Туркменистан
  "+380":  9,        // Украина
  "+995":  9,        // Грузия
  "+373":  8,        // Молдова
  "+90":   10,       // Турция
  "+971":  9,        // ОАЭ
  "+966":  9,        // Саудовская Аравия
  "+972":  [8, 9],   // Израиль (8 — стационарные, 9 — мобильные)
  "+20":   10,       // Египет
  "+91":   10,       // Индия
  "+960":  7,        // Мальдивы
  "+66":   9,        // Таиланд
  "+84":   9,        // Вьетнам
  "+62":   [8, 12],  // Индонезия (8–12 цифр)
  "+86":   11,       // Китай
};

function isLocalPhoneValid(local: string, countryCode: string): boolean {
  const digits = local.replace(/\D/g, "").length;
  const rule = PHONE_LENGTHS[countryCode];
  if (!rule) return digits >= 5 && digits <= 12; // fallback для «Другая страна»
  if (Array.isArray(rule)) return digits >= rule[0] && digits <= rule[1];
  return digits === rule;
}

function phoneHint(countryCode: string): string {
  const rule = PHONE_LENGTHS[countryCode];
  if (!rule) return "";
  if (Array.isArray(rule)) return `${rule[0]}–${rule[1]} цифр`;
  return `${rule} цифр`;
}

/* ── Tour catalog ───────────────────────────────────────────── */
const TOUR_SERVICE = "Авторские экскурсионные туры";

const TOUR_CATALOG: Record<string, string[]> = {
  "🇦🇿 Баку":  ["Первая экскурсия", "Вторая экскурсия", "Третья экскурсия"],
  "🇮🇳 Индия": ["Первая экскурсия", "Вторая экскурсия", "Третья экскурсия"],
};

/* ── Component ──────────────────────────────────────────────── */
type Status = "idle" | "loading" | "success" | "error";

export default function RequestModal({
  isOpen,
  onClose,
  accent,
  section,
  sectionTitle,
  services,
}: Props) {
  const [selected, setSelected]       = useState<string[]>([]);
  const [tourDest, setTourDest]       = useState<string | null>(null);
  const [tourExcursion, setTourExcursion] = useState<string | null>(null);
  const [name, setName]               = useState("");
  const [country, setCountry]         = useState<Country>(COUNTRIES[0]);
  const [localPhone, setLocalPhone]   = useState("");
  const [countryOpen, setCountryOpen] = useState(false);
  const [message, setMessage]         = useState("");
  const [consent, setConsent]         = useState(false);
  const [status, setStatus]           = useState<Status>("idle");
  const [errorMsg, setErrorMsg]       = useState("");

  const [nameTouched,     setNameTouched]     = useState(false);
  const [phoneTouched,    setPhoneTouched]    = useState(false);
  const [servicesTouched, setServicesTouched] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  /* close country dropdown on outside click */
  useEffect(() => {
    if (!countryOpen) return;
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setCountryOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [countryOpen]);

  const toggle = (s: string) => {
    setServicesTouched(true);
    setSelected((prev) => {
      const next = prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s];
      // если сняли галочку с авторских туров — сбросить выбор страны/экскурсии
      if (s === TOUR_SERVICE && prev.includes(s)) {
        setTourDest(null);
        setTourExcursion(null);
      }
      return next;
    });
  };

  const handleLocalPhoneChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    // allow digits, spaces, dashes, parens only
    setLocalPhone(e.target.value.replace(/[^\d\s\-()/]/g, ""));
  }, []);

  const handleClose = () => {
    setSelected([]); setName(""); setLocalPhone(""); setMessage("");
    setConsent(false); setStatus("idle"); setErrorMsg("");
    setNameTouched(false); setPhoneTouched(false); setServicesTouched(false);
    setCountryOpen(false); setTourDest(null); setTourExcursion(null);
    onClose();
  };

  /* validation */
  const nameError  = nameTouched  && name.trim().length < 2
    ? name.trim().length === 0 ? "Введите ваше имя" : "Слишком короткое имя"
    : "";
  const phoneError = phoneTouched && !isLocalPhoneValid(localPhone, country.code)
    ? localPhone.length === 0
      ? "Введите номер телефона"
      : `Неверный номер${phoneHint(country.code) ? ` — нужно ${phoneHint(country.code)}` : ""}`
    : "";
  const servicesError = servicesTouched && selected.length === 0
    ? "Выберите хотя бы одну услугу"
    : "";

  const fullPhone = `${country.code} ${localPhone}`.trim();

  const canSubmit =
    name.trim().length >= 2 &&
    isLocalPhoneValid(localPhone, country.code) &&
    selected.length > 0 &&
    consent &&
    status !== "loading";

  const handleSubmit = async () => {
    if (!canSubmit) {
      setNameTouched(true); setPhoneTouched(true); setServicesTouched(true);
      return;
    }
    setStatus("loading"); setErrorMsg("");
    try {
      const res = await fetch("/api/telegram", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          section, name: name.trim(), phone: fullPhone,
          services: selected,
          tourDest: tourDest || undefined,
          tourExcursion: tourExcursion || undefined,
          message: message.trim() || undefined,
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error ? JSON.stringify(data.error) : "Ошибка сервера");
      }
      setStatus("success");
    } catch (e) {
      setStatus("error");
      setErrorMsg(e instanceof Error ? e.message : "Не удалось отправить заявку");
    }
  };

  if (!isOpen) return null;

  /* ── Success screen ── */
  if (status === "success") {
    return (
      <div className="modal-backdrop" onClick={handleClose}>
        <div className="modal-box modal-box--success" onClick={(e) => e.stopPropagation()}>
          <button className="modal-close" onClick={handleClose}>✕</button>
          <div className="modal-success-icon" style={{ color: accent }}>✓</div>
          <h3 className="modal-title">Заявка отправлена!</h3>
          <p className="modal-sub">
            Свяжемся с вами в течение часа. Спасибо, {name.split(" ")[0]}!
          </p>
          <button className="modal-submit" style={{ background: accent }} onClick={handleClose}>
            Закрыть
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="modal-backdrop" onClick={handleClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={handleClose}>✕</button>

        <div className="modal-label" style={{ color: accent }}>Оставить заявку</div>
        <h3 className="modal-title">{sectionTitle}</h3>
        <p className="modal-sub">Выберите что вас интересует — свяжемся в течение часа</p>

        {/* Services */}
        <div className="modal-services">
          {services.map((s) => (
            <div key={s.name}>
              {/* Основной пункт */}
              <div
                className={`modal-service-item${selected.includes(s.name) ? " selected" : ""}`}
                style={selected.includes(s.name) ? { borderColor: accent, background: `${accent}18` } : {}}
                onClick={() => toggle(s.name)}
              >
                <div
                  className="modal-service-check"
                  style={selected.includes(s.name) ? { background: accent, borderColor: accent } : {}}
                >
                  {selected.includes(s.name) && <span>✓</span>}
                </div>
                <div>
                  <div className="modal-service-name">{s.name}</div>
                  <div className="modal-service-hint">{s.hint}</div>
                </div>
                {s.name === TOUR_SERVICE && (
                  <span className="modal-service-arrow" style={{ marginLeft: "auto", color: accent, opacity: 0.6 }}>
                    {selected.includes(s.name) ? "▴" : "▾"}
                  </span>
                )}
              </div>

              {/* Вложенный выбор — только для авторских туров */}
              {s.name === TOUR_SERVICE && selected.includes(TOUR_SERVICE) && (
                <div className="modal-tour-panel">
                  {/* Шаг 1 — выбор страны */}
                  <p className="modal-tour-label">Выберите направление:</p>
                  <div className="modal-tour-countries">
                    {Object.keys(TOUR_CATALOG).map((dest) => (
                      <button
                        key={dest}
                        type="button"
                        className={`modal-tour-chip${tourDest === dest ? " active" : ""}`}
                        style={tourDest === dest ? { borderColor: accent, background: `${accent}22`, color: accent } : {}}
                        onClick={() => { setTourDest(dest); setTourExcursion(null); }}
                      >
                        {dest}
                      </button>
                    ))}
                  </div>

                  {/* Шаг 2 — выбор экскурсии */}
                  {tourDest && (
                    <div className="modal-tour-excursions">
                      {TOUR_CATALOG[tourDest].length === 0 ? (
                        <p className="modal-tour-soon">
                          ✦ Экскурсии по {tourDest.split(" ").slice(1).join(" ")} — уточним при звонке
                        </p>
                      ) : (
                        TOUR_CATALOG[tourDest].map((ex) => (
                          <button
                            key={ex}
                            type="button"
                            className={`modal-tour-excursion-item${tourExcursion === ex ? " active" : ""}`}
                            style={tourExcursion === ex ? { borderColor: `${accent}55`, color: accent } : {}}
                            onClick={() => setTourExcursion(ex)}
                          >
                            <span style={{
                              width: 14, height: 14, border: `1.5px solid ${tourExcursion === ex ? accent : "rgba(255,255,255,0.18)"}`,
                              borderRadius: 2, display: "inline-flex", alignItems: "center", justifyContent: "center",
                              flexShrink: 0, fontSize: "0.6rem", color: tourExcursion === ex ? accent : "transparent",
                              transition: "all 0.15s", marginRight: "0.55rem"
                            }}>✓</span>
                            {ex}
                          </button>
                        ))
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
        <p className="modal-field-error modal-field-error--slot">{servicesError}</p>

        {/* Fields */}
        <div className="modal-fields">
          {/* Name */}
          <div className="modal-field-wrap">
            <input
              className={`modal-input${nameTouched && nameError ? " modal-input--error" : ""}`}
              placeholder="Ваше имя"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onBlur={() => setNameTouched(true)}
              autoComplete="name"
            />
            <p className="modal-field-error modal-field-error--slot">
              {nameTouched ? nameError : ""}
            </p>
          </div>

          {/* Phone with country selector */}
          <div className="modal-field-wrap">
            <div className={`modal-phone-row${phoneTouched && phoneError ? " modal-phone-row--error" : ""}`}>
              {/* Country dropdown */}
              <div className="modal-country-wrap" ref={dropdownRef}>
                <button
                  type="button"
                  className="modal-country-btn"
                  onClick={() => setCountryOpen((v) => !v)}
                >
                  <span>{country.flag}</span>
                  <span className="modal-country-code">{country.code}</span>
                  <span className="modal-country-arrow">{countryOpen ? "▴" : "▾"}</span>
                </button>

                {countryOpen && (
                  <div className="modal-country-dropdown">
                    {COUNTRIES.map((c) => (
                      <button
                        key={c.name}
                        type="button"
                        className={`modal-country-option${country.name === c.name ? " active" : ""}`}
                        style={country.name === c.name ? { color: accent } : {}}
                        onClick={() => { setCountry(c); setCountryOpen(false); }}
                      >
                        <span>{c.flag}</span>
                        <span className="modal-country-option-name">{c.name}</span>
                        <span className="modal-country-option-code">{c.code}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Local number input */}
              <input
                className="modal-input modal-phone-input"
                placeholder="Ваш номер"
                value={localPhone}
                onChange={handleLocalPhoneChange}
                onBlur={() => setPhoneTouched(true)}
                type="tel"
                autoComplete="tel-national"
              />
            </div>
            <p className="modal-field-error modal-field-error--slot">
              {phoneTouched ? phoneError : ""}
            </p>
          </div>

          {/* Message */}
          <div className="modal-field-wrap">
            <textarea
              className="modal-input modal-textarea"
              placeholder="Сообщение (необязательно) — куда хотите поехать, даты, пожелания…"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={3}
              maxLength={1000}
            />
          </div>
        </div>

        {/* Consent */}
        <label className="modal-consent">
          <div
            className={`modal-consent-check${consent ? " checked" : ""}`}
            style={consent ? { background: accent, borderColor: accent } : {}}
            onClick={() => setConsent((v) => !v)}
          >
            {consent && <span>✓</span>}
          </div>
          <span>
            Я согласен(а) на обработку персональных данных в соответствии с{" "}
            <a href="/privacy" target="_blank" style={{ color: accent }}>
              Политикой конфиденциальности
            </a>
          </span>
        </label>

        {status === "error" && (
          <p className="modal-field-error modal-field-error--api">
            ⚠ {errorMsg || "Не удалось отправить заявку. Попробуйте ещё раз."}
          </p>
        )}

        <button
          className={`modal-submit${status === "loading" ? " modal-submit--loading" : ""}`}
          style={{ background: accent }}
          disabled={status === "loading"}
          onClick={handleSubmit}
        >
          {status === "loading" ? "Отправляем…" : "Отправить заявку →"}
        </button>

        <p className="modal-note">
          Данные используются исключительно для связи с вами. Цель сбора — консультация по услугам MAGIC Group NTS.
        </p>
      </div>
    </div>
  );
}
