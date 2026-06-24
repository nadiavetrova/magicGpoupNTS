"use client";

import { useEffect, useState } from "react";
import { ALL_COUNTRIES, getToursByCountry, type Tour } from "../data/tours";
import "./TourDrawer.css";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onBook: (tourName: string) => void;
}

export default function TourDrawer({ isOpen, onClose, onBook }: Props) {
  const [selectedTour, setSelectedTour] = useState<Tour | null>(null);
  const [activeCountry, setActiveCountry] = useState<string>(ALL_COUNTRIES[0]);

  /* lock scroll when open */
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      setTimeout(() => { setSelectedTour(null); }, 300);
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const tours = getToursByCountry(activeCountry);

  return (
    <>
      {/* Backdrop */}
      <div
        className={`td-backdrop${isOpen ? " td-backdrop--in" : ""}`}
        onClick={onClose}
      />

      {/* Drawer */}
      <aside className={`td-drawer${isOpen ? " td-drawer--in" : ""}`} aria-modal="true">

        {/* Header */}
        <div className="td-header">
          {selectedTour ? (
            <button className="td-back" onClick={() => setSelectedTour(null)}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <polyline points="15 18 9 12 15 6"/>
              </svg>
              Все туры
            </button>
          ) : (
            <span className="td-header-label">Авторские экскурсии</span>
          )}
          <button className="td-close" onClick={onClose} aria-label="Закрыть">✕</button>
        </div>

        {/* Content */}
        <div className="td-body">

          {!selectedTour ? (
            /* ── LIST VIEW ── */
            <>
              {/* Country tabs */}
              <div className="td-countries">
                {ALL_COUNTRIES.map(c => (
                  <button
                    key={c}
                    className={`td-country-tab${activeCountry === c ? " active" : ""}`}
                    onClick={() => setActiveCountry(c)}
                  >
                    {c}
                  </button>
                ))}
              </div>

              {/* Tour cards */}
              <div className="td-tour-list">
                {tours.length === 0 ? (
                  <p className="td-empty">Туры скоро появятся</p>
                ) : (
                  tours.map(tour => (
                    <button
                      key={tour.id}
                      className="td-tour-card"
                      onClick={() => setSelectedTour(tour)}
                    >
                      <div className="td-tour-photo" style={{ backgroundImage: `url(${tour.photo})` }} />
                      <div className="td-tour-info">
                        <span className="td-tour-duration">{tour.duration}</span>
                        <h3 className="td-tour-name">{tour.name}</h3>
                        {tour.tagline && <p className="td-tour-tagline">{tour.tagline}</p>}
                        <div className="td-tour-meta">
                          <span>📍 {tour.location}</span>
                          <span className="td-tour-price-from">от {tour.pricing[tour.pricing.length - 1].price}</span>
                        </div>
                      </div>
                      <span className="td-tour-arrow">→</span>
                    </button>
                  ))
                )}
              </div>
            </>
          ) : (
            /* ── DETAIL VIEW ── */
            <div className="td-detail">
              <div className="td-detail-photo" style={{ backgroundImage: `url(${selectedTour.photo})` }}>
                <div className="td-detail-photo-overlay"/>
                <div className="td-detail-photo-text">
                  <p className="td-detail-location">📍 {selectedTour.location}</p>
                  <h2 className="td-detail-title">{selectedTour.name}</h2>
                  <p className="td-detail-duration">{selectedTour.duration}</p>
                </div>
              </div>

              {/* Days */}
              <div className="td-section">
                <p className="td-section-label">Программа</p>
                {selectedTour.days.map((day, i) => (
                  <div key={i} className="td-day">
                    <p className="td-day-title">{day.title}</p>
                    <ul className="td-day-list">
                      {day.items.map((item, j) => (
                        <li key={j}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* Pricing */}
              <div className="td-section">
                <p className="td-section-label">Стоимость на человека</p>
                <div className="td-pricing">
                  {selectedTour.pricing.map((row, i) => (
                    <div key={i} className={`td-pricing-row${i === 0 ? " td-pricing-row--hi" : ""}`}>
                      <span>{row.group}</span>
                      <span className="td-pricing-price">{row.price}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Includes / Excludes */}
              <div className="td-section td-section--two-col">
                <div>
                  <p className="td-section-label">Включено</p>
                  <ul className="td-check-list td-check-list--yes">
                    {selectedTour.includes.map((item, i) => <li key={i}>{item}</li>)}
                  </ul>
                </div>
                <div>
                  <p className="td-section-label">Не включено</p>
                  <ul className="td-check-list td-check-list--no">
                    {selectedTour.excludes.map((item, i) => <li key={i}>{item}</li>)}
                  </ul>
                </div>
              </div>

              {/* CTA */}
              <div className="td-cta">
                <button className="td-btn-book" onClick={() => { onBook(selectedTour.name); onClose(); }}>
                  Записаться на тур
                  <span className="td-btn-book__arr" aria-hidden="true">
                    <svg viewBox="0 0 38 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <line className="td-btn-book__shaft" x1="0" y1="4" x2="28" y2="4" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
                      <path className="td-btn-book__tip" d="M23.5 1L28 4L23.5 7" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                </button>
              </div>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
