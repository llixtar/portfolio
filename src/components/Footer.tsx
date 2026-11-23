"use client";

import React from "react";
import { Send } from "lucide-react";

export default function Footer() {
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

        {/* Навігація та прямий Telegram */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs sm:text-sm font-mono">
          <a
            href="#projects"
            className="text-neutral-400 hover:text-white transition-colors"
          >
            Проєкти
          </a>
          <a
            href="#about"
            className="text-neutral-400 hover:text-white transition-colors"
          >
            Про мене
          </a>
          <a
            href="https://t.me/llixtar"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-neutral-300 hover:text-sky-400 transition-colors"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Telegram</span>
          </a>
        </div>

        {/* Копірайт */}
        <div className="text-center md:text-right text-[11px] font-mono text-neutral-400">
          © {new Date().getFullYear()} Andrii Shchelakov. Всі права захищені.
        </div>

      </div>
    </footer>
  );
}
