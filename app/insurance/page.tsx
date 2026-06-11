"use client";

import { useState } from "react";
import Link from "next/link";
import { Shield, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

import InsuranceHero from "./components/InsuranceHero";
import InsuranceStats from "./components/InsuranceStats";
import InsuranceHook from "./components/InsuranceHook";
import InsuranceTypes from "./components/InsuranceTypes";
import InsuranceComparison from "./components/InsuranceComparison";
import InsuranceHowItWorks from "./components/InsuranceHowItWorks";
import InsuranceCTA from "./components/InsuranceCTA";
import InsuranceFAQ from "./components/InsuranceFAQ";
import InsuranceFooter from "./components/InsuranceFooter";
import InsuranceModal from "./components/InsuranceModal";

export default function InsurancePage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [initialType, setInitialType] = useState("");

  const openModal = (type?: string) => {
    setInitialType(type || "");
    setModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 antialiased">

      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 h-16 flex items-center justify-between">

          {/* Left: back + brand */}
          <div className="flex items-center gap-6">
            <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-slate-900 transition-colors">
              <ArrowLeft className="h-4 w-4" />
              <span className="hidden sm:inline">На главную</span>
            </Link>
            <div className="h-5 w-px bg-slate-200 hidden sm:block" />
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-[#9B2335]" />
              <span className="font-bold text-sm text-slate-900 tracking-tight">MAGIC Group NTS</span>
            </div>
          </div>

          {/* Nav links */}
          <div className="hidden md:flex items-center gap-6 text-sm text-slate-500">
            <button onClick={() => document.getElementById("types")?.scrollIntoView({ behavior: "smooth" })} className="hover:text-slate-900 transition-colors">
              Виды
            </button>
            <button onClick={() => document.getElementById("how")?.scrollIntoView({ behavior: "smooth" })} className="hover:text-slate-900 transition-colors">
              Как работаем
            </button>
            <button onClick={() => document.getElementById("faq")?.scrollIntoView({ behavior: "smooth" })} className="hover:text-slate-900 transition-colors">
              FAQ
            </button>
          </div>

          {/* CTA */}
          <Button
            onClick={() => openModal()}
            size="sm"
            className="bg-[#9B2335] hover:bg-[#7d1c2b] text-white rounded-xl px-5 h-9 text-sm font-semibold shadow-sm shadow-[#9B2335]/20 active:scale-95 transition-all"
          >
            Подобрать страховку
          </Button>
        </div>
      </nav>

      {/* Page sections */}
      <InsuranceHero onOpenModal={() => openModal()} />
      <InsuranceStats />
      <InsuranceHook />
      <InsuranceTypes onOpenModal={openModal} />
      <InsuranceComparison />
      <InsuranceHowItWorks />
      <InsuranceCTA onOpenModal={() => openModal()} />
      <InsuranceFAQ />
      <InsuranceFooter />

      {/* Modal */}
      <InsuranceModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        initialType={initialType}
      />
    </div>
  );
}
