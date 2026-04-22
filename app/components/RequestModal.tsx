"use client";

import { useState } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  accent: string;
  sectionTitle: string;
  services: { name: string; hint: string }[];
}

export default function RequestModal({ isOpen, onClose, accent, sectionTitle, services }: Props) {
  const [selected, setSelected] = useState<string[]>([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [consent, setConsent] = useState(false);

  if (!isOpen) return null;

  const toggle = (s: string) =>
    setSelected((prev) => prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]);

  const canSubmit = name.trim() && phone.trim() && selected.length > 0 && consent;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>

        <div className="modal-label" style={{ color: accent }}>Оставить заявку</div>
        <h3 className="modal-title">{sectionTitle}</h3>
        <p className="modal-sub">Выберите что вас интересует — свяжемся в течение часа</p>

        <div className="modal-services">
          {services.map((s) => (
            <div
              key={s.name}
              className={`modal-service-item${selected.includes(s.name) ? " selected" : ""}`}
              style={selected.includes(s.name) ? { borderColor: accent, background: `${accent}18` } : {}}
              onClick={() => toggle(s.name)}
            >
              <div className="modal-service-check" style={selected.includes(s.name) ? { background: accent, borderColor: accent } : {}}>
                {selected.includes(s.name) && <span>✓</span>}
              </div>
              <div>
                <div className="modal-service-name">{s.name}</div>
                <div className="modal-service-hint">{s.hint}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="modal-fields">
          <input
            className="modal-input"
            placeholder="Ваше имя"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="modal-input"
            placeholder="+7 (___) ___-__-__"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            type="tel"
          />
        </div>

        {/* Обязательное согласие — галочка не стоит по умолчанию */}
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

        <button
          className="modal-submit"
          style={{ background: accent }}
          disabled={!canSubmit}
        >
          Отправить заявку →
        </button>

        <p className="modal-note">
          Данные используются исключительно для связи с вами. Цель сбора — консультация по услугам MAGIC Group NTS.
        </p>
      </div>
    </div>
  );
}
