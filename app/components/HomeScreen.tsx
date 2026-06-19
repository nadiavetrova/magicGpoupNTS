"use client";

import { useState, useEffect } from "react";
import "./HomeScreen.css";

const SLIDES = [
  {
    id: "tourism",
    // Индия — крепость Амбер в Джайпуре
    photo: "https://images.unsplash.com/photo-1599661046827-dacff0c0f09a?w=1800&q=85",
  },
  {
    id: "realty",
    // Современный дом вечером
    photo: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1800&q=85",
  },
  {
    id: "insurance",
    // Страхование — локальное фото
    photo: "/images/insurance.png",
  },
  {
    id: "realty2",
    // Современный тёмный дом вечером
    photo: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1800&q=85",
  },
];

const CARDS = [
  {
    id: "tourism" as const,
    num: "01",
    name: "Туризм",
    hint: "Туры, авторские экскурсии, авиабилеты",
    locked: false,
  },
  {
    id: "realty" as const,
    num: "02",
    name: "Недвижимость",
    hint: "Россия и за рубежом",
    locked: false,
  },
  {
    id: "insurance" as const,
    num: "03",
    name: "Страхование",
    hint: "Все виды страхования",
    locked: false,
  },
];

interface Props {
  onOpen: (id: "tourism" | "realty" | "insurance", e: React.MouseEvent<Element>) => void;
}

export default function HomeScreen({ onOpen }: Props) {
  const [slideIdx, setSlideIdx] = useState(0);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setInterval(() => setSlideIdx(i => (i + 1) % SLIDES.length), 6000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="hs-root">
      {/* Background slides */}
      {SLIDES.map((s, i) => (
        <div
          key={s.id}
          className={`hs-slide${i === slideIdx ? " hs-slide--active" : ""}`}
          style={{ backgroundImage: `url(${s.photo})` }}
        />
      ))}

      {/* Overlay */}
      <div className="hs-overlay" />

      {/* Center content */}
      <div className={`hs-center${loaded ? " hs-center--in" : ""}`}>
        <p className="hs-eyebrow">Magic Group NTS</p>
        <h1 className="hs-title">
          Туризм.<br />
          Недвижимость.<br />
          Страхование.
        </h1>
        <p className="hs-sub">Выберите направление ↓</p>
      </div>

      {/* Slide dots */}
      <div className="hs-dots">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            className={`hs-dot${i === slideIdx ? " hs-dot--active" : ""}`}
            onClick={() => setSlideIdx(i)}
            aria-label={`Слайд ${i + 1}`}
          />
        ))}
      </div>

      {/* Bottom navigation cards */}
      <div className={`hs-cards${loaded ? " hs-cards--in" : ""}`}>
        {CARDS.map((card) => (
          <button
            key={card.id}
            className={`hs-card${card.locked ? " hs-card--locked" : ""}`}
            onClick={card.locked ? undefined : (e) => onOpen(card.id, e)}
            disabled={card.locked}
          >
            <span className="hs-card-num">{card.num}</span>
            <span className="hs-card-name-row">
              <span className="hs-card-name">{card.name}</span>
              {!card.locked && <span className="hs-card-arrow">⟶</span>}
            </span>
            <span className="hs-card-hint">{card.hint}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
