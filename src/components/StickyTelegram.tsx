"use client";

import React, { useState, useEffect } from "react";
import { Calculator } from "lucide-react";

export default function StickyTelegram() {
  const [isVisible, setIsVisible] = useState(false);
  const [isInCalculatorZone, setIsInCalculatorZone] = useState(false);
  const [bottomOffset, setBottomOffset] = useState<number>(24);

  useEffect(() => {
    const handleScroll = () => {
      // 1. На мобілці ховаємо кнопку в межах Hero
      const heroThreshold = window.innerHeight * 0.65;
      setIsVisible(window.scrollY > heroThreshold);

      // 2. Ховаємо кнопку, коли користувач вже дійшов до калькулятора та нижче (і на ПК, і на мобілці)
      const calcEl = document.getElementById("calculator");
      if (calcEl) {
        const calcRect = calcEl.getBoundingClientRect();
        setIsInCalculatorZone(calcRect.top < window.innerHeight * 0.75);
      }

      // 3. Фіксуємо кнопку над футером на випадок перехідних екранів
      const footer = document.querySelector("footer");
      if (footer) {
        const footerRect = footer.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        if (footerRect.top < windowHeight) {
          const overlap = windowHeight - footerRect.top;
          setBottomOffset(overlap + 20);
        } else {
          setBottomOffset(24);
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  const scrollToCalculator = () => {
    const el =
      document.getElementById("calculator-content") ??
      document.getElementById("calculator");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div
      style={{ bottom: `${bottomOffset}px` }}
      className={`fixed right-4 sm:right-7 z-50 transition-[bottom] duration-200 ease-out ${
        isInCalculatorZone
          ? "pointer-events-none"
          : isVisible
          ? "pointer-events-auto"
          : "pointer-events-none md:pointer-events-auto"
      }`}
    >
      <div
        className={`relative group transition-all duration-300 ease-out ${
          isInCalculatorZone
            ? "opacity-0 translate-y-6 scale-75 pointer-events-none"
            : isVisible
            ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
            : "opacity-0 translate-y-8 scale-75 pointer-events-none md:opacity-100 md:translate-y-0 md:scale-100 md:pointer-events-auto"
        }`}
      >
        {/* М'яке світіння під кнопкою */}
        <div className="absolute -inset-1 rounded-full bg-emerald-500/20 blur-md pointer-events-none transition-all duration-300 group-hover:bg-emerald-400/35 group-hover:scale-110" />

        <button
          type="button"
          onClick={scrollToCalculator}
          aria-label="Перейти до калькулятора вартості"
          className="relative inline-flex p-[1.5px] pb-[3px] rounded-full bg-gradient-to-b from-neutral-400 via-neutral-600 to-neutral-950 group-hover:from-emerald-400 group-hover:via-emerald-600 group-hover:to-neutral-900 shadow-[0_12px_28px_rgba(0,0,0,0.85)] active:translate-y-[2px] active:pb-[1.5px] transition-all cursor-pointer select-none"
        >
          {/* Внутрішня чаша кнопки */}
          <div className="relative w-12 h-12 sm:w-13 sm:h-13 rounded-full bg-gradient-to-b from-[#1e232e] via-[#11141c] to-[#08090d] flex items-center justify-center overflow-hidden shadow-[inset_0_1px_2px_rgba(255,255,255,0.28),inset_0_-2px_4px_rgba(0,0,0,0.9)] group-hover:from-[#232b38] transition-colors">
            <Calculator className="w-5 h-5 text-emerald-400 group-hover:text-white transition-all duration-300 group-hover:scale-110" />
          </div>
        </button>

        {/* Тултіп на десктопі */}
        <div className="absolute right-full top-1/2 -translate-y-1/2 mr-3 px-3 py-1.5 rounded-lg bg-neutral-900/95 border border-neutral-800 text-xs font-mono text-neutral-200 whitespace-nowrap shadow-xl pointer-events-none opacity-0 translate-x-2 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0 hidden sm:block">
          Розрахувати вартість
        </div>
      </div>
    </div>
  );
}
