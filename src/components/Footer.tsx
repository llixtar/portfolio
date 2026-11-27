"use client";

import React from "react";
import { Send } from "lucide-react";

export default function Footer() {
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 24;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <footer className="relative border-t border-neutral-900 bg-[#050505]/90 backdrop-blur-md text-neutral-400 py-10 sm:py-12 px-4 z-10">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
        
        {/* Ім'я розробника */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-center md:justify-start gap-2.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.9)] animate-pulse" />
            <span className="font-heading text-xl font-bold text-white tracking-wider">
              Andrii Shchelakov
            </span>
          </div>
          <p className="text-xs sm:text-sm text-neutral-400 font-light max-w-sm">
            Розробка швидких інтернет-магазинів, сайтів та систем під ключ.
          </p>
        </div>

        {/* Навігація та дві іконки месенджерів під нею */}
        <div className="flex flex-col items-center gap-3.5">
          <div className="flex flex-wrap items-center justify-center gap-5 sm:gap-6 text-xs sm:text-sm font-mono">
            <a
              href="#projects"
              onClick={(e) => scrollToSection(e, "projects-content")}
              className="text-neutral-400 hover:text-white transition-colors"
            >
              Проєкти
            </a>
            <a
              href="#about"
              onClick={(e) => scrollToSection(e, "about-content")}
              className="text-neutral-400 hover:text-white transition-colors"
            >
              Про мене
            </a>
            <a
              href="#calculator-content"
              onClick={(e) => scrollToSection(e, "calculator-content")}
              className="text-neutral-400 hover:text-white transition-colors"
            >
              Розрахувати ціну
            </a>
          </div>

          <div className="flex items-center justify-center gap-3">
            <a
              href="https://t.me/llixtar"
              target="_blank"
              rel="noreferrer"
              aria-label="Telegram"
              className="w-9 h-9 rounded-full bg-neutral-900/90 border border-neutral-800 hover:border-sky-500/60 text-neutral-300 hover:text-sky-400 flex items-center justify-center transition-all hover:scale-105"
            >
              <Send className="w-4 h-4 -translate-x-[1px] translate-y-[0.5px]" />
            </a>
            <a
              href="https://wa.me/48574514100"
              target="_blank"
              rel="noreferrer"
              aria-label="WhatsApp"
              className="w-9 h-9 rounded-full bg-neutral-900/90 border border-neutral-800 hover:border-emerald-500/60 text-neutral-300 hover:text-emerald-400 flex items-center justify-center transition-all hover:scale-105"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.9"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4 h-4"
                aria-hidden="true"
              >
                <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
                <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" />
              </svg>
            </a>
          </div>
        </div>

        {/* Копірайт */}
        <div className="text-center md:text-right text-[11px] font-mono text-neutral-400">
          © {new Date().getFullYear()} Andrii Shchelakov. Всі права захищені.
        </div>

      </div>
    </footer>
  );
}
