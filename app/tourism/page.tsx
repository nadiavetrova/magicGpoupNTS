"use client";

import { useState } from "react";
import Link from "next/link";
import { Compass } from "lucide-react";
import TourHero from "./components/TourHero";
import TourAdvantages from "./components/TourAdvantages";
import TourAbout from "./components/TourAbout";
import TourDestinations from "./components/TourDestinations";
import TourHotDeals from "./components/TourHotDeals";
import TourReviews from "./components/TourReviews";
import TourHowItWorks from "./components/TourHowItWorks";
import TourFAQ from "./components/TourFAQ";
import TourCTA from "./components/TourCTA";
import TourFooter from "./components/TourFooter";
import TourModal from "./components/TourModal";

// !! Replace with real catalog URL when ready
const CATALOG_URL = "#";

export default function TourismPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [initialDest, setInitialDest] = useState("");

  const openModal = (dest?: string) => {
    setInitialDest(dest || "");
    setModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-800 antialiased">

      {/* Navbar */}
      <nav className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-500 text-white shadow-md shadow-teal-500/35">
              <Compass className="h-6 w-6 animate-spin" style={{ animationDuration: "12s" }} />
            </span>
            <div>
              <span className="font-display font-black text-xl tracking-tight text-slate-900 leading-none">MAGIC Group NTS</span>
              <p className="text-[9px] text-slate-400 font-mono tracking-widest uppercase leading-none mt-0.5">Туризм · Страхование · Недвижимость</p>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            <button onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })} className="text-slate-600 hover:text-teal-600 transition-colors">Обо мне</button>
            <button onClick={() => document.getElementById("destinations")?.scrollIntoView({ behavior: "smooth" })} className="text-slate-600 hover:text-teal-600 transition-colors">Направления</button>
            <button onClick={() => document.getElementById("reviews")?.scrollIntoView({ behavior: "smooth" })} className="text-slate-600 hover:text-teal-600 transition-colors">Отзывы</button>
            <button onClick={() => document.getElementById("faq")?.scrollIntoView({ behavior: "smooth" })} className="text-slate-600 hover:text-teal-600 transition-colors">FAQ</button>
          </div>

          <button
            onClick={() => openModal()}
            className="rounded-xl bg-teal-600 hover:bg-teal-500 px-5 py-2.5 text-xs font-semibold text-white shadow shadow-teal-500/20 active:scale-95 transition-all"
          >
            Подобрать тур
          </button>
        </div>
      </nav>

      {/* Sections */}
      <TourHero onOpenModal={() => openModal()} />
      <TourAdvantages />
      <TourAbout onOpenModal={() => openModal()} />
      <TourDestinations onOpenModal={openModal} />
      <TourHotDeals onOpenModal={openModal} catalogHref={CATALOG_URL} />
      <TourReviews />
      <TourHowItWorks />
      <TourFAQ />
      <TourCTA onOpenModal={() => openModal()} catalogHref={CATALOG_URL} />
      <TourFooter />

      {/* Modal */}
      <TourModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        initialDestination={initialDest}
      />
    </div>
  );
}
