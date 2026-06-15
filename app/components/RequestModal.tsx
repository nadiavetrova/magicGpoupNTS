"use client";

import { useState, useCallback } from "react";

type PanelId = "tourism" | "insurance" | "realty";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  accent: string;
  section: PanelId;
  sectionTitle: string;
  services: { name: string; hint: string }[];
}

/* ── Phone validation ───────────────────────────────────────── */
// International: min 7 digits (shortest valid numbers), max 15 (E.164)
function isPhoneValid(phone: string): boolean {
  const digits = phone.replace(/\D/g, "");
  return digits.length >= 7 && digits.length <= 15;
}

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
  const [selected, setSelected] = useState<string[]>([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  /* touched state — show errors only after user has interacted */
  const [nameTouched, setNameTouched] = useState(false);
  const [phoneTouched, setPhoneTouched] = useState(false);
  const [servicesTouched, setServicesTouched] = useState(false);

  const toggle = (s: string) => {
    setServicesTouched(true);
    setSelected((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]
    );
  };

  const handlePhoneChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    // Allow digits, +, spaces, dashes, parentheses — strip everything else
    const val = e.target.value.replace(/[^\d+\s\-()]/g, "");
    setPhone(val);
  }, []);

  const handleClose = () => {
    // reset on close
    setSelected([]);
    setName("");
    setPhone("");
    setMessage("");
    setConsent(false);
    setStatus("idle");
    setErrorMsg("");
    setNameTouched(false);
    setPhoneTouched(false);
    setServicesTouched(false);
    onClose();
  };

  /* validation */
  const nameError = nameTouched && name.trim().length < 2
    ? name.trim().length === 0 ? "Введите ваше имя" : "Слишком короткое имя"
    : "";
  const phoneError = phoneTouched && !isPhoneValid(phone)
    ? phone.length === 0 ? "Введите номер телефона" : "Слишком короткий номер"
    : "";
  const servicesError = servicesTouched && selected.length === 0
    ? "Выберите хотя бы одну услугу"
    : "";

  const canSubmit =
    name.trim().length >= 2 &&
    isPhoneValid(phone) &&
    selected.length > 0 &&
    consent &&
    status !== "loading";

  const handleSubmit = async () => {
    if (!canSubmit) {
      setNameTouched(true);
      setPhoneTouched(true);
      setServicesTouched(true);
      return;
    }

    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/telegram", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          section,
          name: name.trim(),
          phone,
          services: selected,
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
      setErrorMsg(
        e instanceof Error ? e.message : "Не удалось отправить заявку"
      );
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
          <button
            className="modal-submit"
            style={{ background: accent }}
            onClick={handleClose}
          >
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

        <div className="modal-label" style={{ color: accent }}>
          Оставить заявку
        </div>
        <h3 className="modal-title">{sectionTitle}</h3>
        <p className="modal-sub">
          Выберите что вас интересует — свяжемся в течение часа
        </p>

        {/* Services */}
        <div className="modal-services">
          {services.map((s) => (
            <div
              key={s.name}
              className={`modal-service-item${selected.includes(s.name) ? " selected" : ""}`}
              style={
                selected.includes(s.name)
                  ? { borderColor: accent, background: `${accent}18` }
                  : {}
              }
              onClick={() => toggle(s.name)}
            >
              <div
                className="modal-service-check"
                style={
                  selected.includes(s.name)
                    ? { background: accent, borderColor: accent }
                    : {}
                }
              >
                {selected.includes(s.name) && <span>✓</span>}
              </div>
              <div>
                <div className="modal-service-name">{s.name}</div>
                <div className="modal-service-hint">{s.hint}</div>
              </div>
            </div>
          ))}
        </div>
        {/* Services error slot — fixed height, no layout jump */}
        <p className="modal-field-error modal-field-error--slot">
          {servicesError}
        </p>

        {/* Fields */}
        <div className="modal-fields">
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

          <div className="modal-field-wrap">
            <input
              className={`modal-input${phoneTouched && phoneError ? " modal-input--error" : ""}`}
              placeholder="+7 917 … / +971 … / +90 …"
              value={phone}
              onChange={handlePhoneChange}
              onBlur={() => setPhoneTouched(true)}
              type="tel"
              autoComplete="tel"
            />
            <p className="modal-field-error modal-field-error--slot">
              {phoneTouched ? phoneError : ""}
            </p>
          </div>

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

        {/* API error */}
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
