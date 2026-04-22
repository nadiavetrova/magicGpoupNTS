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

  if (!isOpen) return null;

  const toggle = (s: string) =>
    setSelected((prev) => prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]);

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

        <button
          className="modal-submit"
          style={{ background: accent }}
          disabled={!name || !phone || selected.length === 0}
        >
          Отправить заявку →
        </button>

        <p className="modal-note">Нажимая кнопку, вы соглашаетесь на обработку персональных данных</p>
      </div>
    </div>
  );
}
