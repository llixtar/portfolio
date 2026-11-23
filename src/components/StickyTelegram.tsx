"use client";

import React, { useState, useEffect, useRef } from "react";
import { Send, MessageCircle, X, ChevronDown, HelpCircle } from "lucide-react";

export default function StickyTelegram() {
  const [isVisible, setIsVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [bottomOffset, setBottomOffset] = useState<number>(24);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      // 1. Перевірка видимості на смартфонах (ховати в межах Hero)
      const heroThreshold = window.innerHeight * 0.65;
      if (window.scrollY > heroThreshold) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }

      // 2. Розрахунок позиції над футером: не налазить на футер, а фіксується над ним
      const footer = document.querySelector("footer");
      if (footer) {
        const footerRect = footer.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        // Якщо футер з'явився у полі зору знизу
        if (footerRect.top < windowHeight) {
          const overlap = windowHeight - footerRect.top;
          setBottomOffset(overlap + 20); // Завжди на 20px вище верхньої межі футера
        } else {
          setBottomOffset(24); // Стандартний відступ знизу
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

  // Закриття панелі при кліку за її межами
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const faqs = [
    {
      q: "Які терміни створення проєкту?",
      a: "Зазвичай 7–14 днів залежно від обсягу. Першу робочу онлайн-демку ви тестуєте вже на 3-4 день розробки.",
    },
    {
      q: "Коли відбувається оплата?",
      a: "0% передоплати. Остаточний розрахунок тільки після того, як ви особисто затвердите готову робочу версію.",
    },
    {
      q: "Чи легко керувати меню та цінами?",
      a: "Так, створюю просту кастомну адмін-панель для смартфонів: товари, замовлення та ціни змінюються в пару кліків.",
    },
    {
      q: "Чи входить Telegram-бот у вартість?",
      a: "Так, налаштованого бота для миттєвих сповіщень про всі нові замовлення надаю у подарунок до кожного проєкту.",
    },
  ];

  const toggleFaq = (idx: number) => {
    setActiveFaq((prev) => (prev === idx ? null : idx));
  };

  return (
    <div
      ref={panelRef}
      style={{ bottom: `${bottomOffset}px` }}
      className={`fixed right-4 sm:right-7 z-50 transition-[bottom] duration-200 ease-out ${
        isVisible
          ? "pointer-events-auto"
          : "pointer-events-none md:pointer-events-auto"
      }`}
    >
      {/* ── ВИПЛИВАЮЧА ПРОЗОРА СКЛЯНА ПАНЕЛЬ (APPLE GLASSMORPHISM + СТЕЛС-ДИЗАЙН ЗРІЗАНИХ КУТІВ) ── */}
      <div
        className={`absolute bottom-0 right-0 w-[calc(100vw-2rem)] sm:w-[390px] max-w-[400px] transition-all duration-300 origin-bottom-right ${
          isOpen
            ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
            : "opacity-0 scale-95 translate-y-4 pointer-events-none"
        }`}
      >
        {/* Зовнішня рамка-фаска зі зрізаними кутами та металевим відблиском */}
        <div className="p-[1px] pb-[3px] bg-gradient-to-b from-white/30 via-white/10 to-white/5 [clip-path:polygon(14px_0,calc(100%-14px)_0,100%_14px,100%_calc(100%-14px),calc(100%-14px)_100%,14px_100%,0_calc(100%-14px),0_14px)] shadow-[0_24px_70px_rgba(0,0,0,0.95),0_0_35px_rgba(14,165,233,0.15)]">
          {/* Внутрішній шар з ультра-скляним Apple blur-3xl */}
          <div className="p-4 sm:p-5 bg-gradient-to-b from-[#141824]/80 via-[#0d1017]/85 to-[#07090e]/90 backdrop-blur-3xl [clip-path:polygon(13px_0,calc(100%-13px)_0,100%_13px,100%_calc(100%-13px),calc(100%-13px)_100%,13px_100%,0_calc(100%-13px),0_13px)] flex flex-col space-y-4 shadow-[inset_0_1px_1px_rgba(255,255,255,0.25),inset_0_-2px_4px_rgba(0,0,0,0.9)]">
            
            {/* Шапка панелі */}
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.9)] animate-pulse" />
                <span className="font-heading text-sm font-bold text-white tracking-wide">
                  Зв&apos;язок &amp; Експрес-FAQ
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Закрити панель"
                className="w-7 h-7 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-neutral-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* 1. ВЕРХНЯ ЧАСТИНА: КОМПАКТНІ ПЛАШКИ ТЕЛЕГРАМ ТА ВАЦАП */}
            <div className="space-y-1.5">
              <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 font-medium">
                Прямий контакт
              </span>
              <div className="grid grid-cols-2 gap-2">
                {/* Telegram */}
                <a
                  href="https://t.me/llixtar"
                  target="_blank"
                  rel="noreferrer"
                  className="group/btn relative inline-flex p-[1px] pb-[2px] bg-gradient-to-b from-sky-400/80 to-sky-600/30 hover:from-sky-300 hover:to-sky-500 [clip-path:polygon(8px_0,calc(100%-8px)_0,100%_8px,100%_calc(100%-8px),calc(100%-8px)_100%,8px_100%,0_calc(100%-8px),0_8px)] shadow-md active:translate-y-[1px] transition-all select-none cursor-pointer"
                >
                  <div className="relative w-full px-3 py-2 bg-gradient-to-b from-[#182638]/90 to-[#0d1622]/90 group-hover/btn:from-[#21344c]/90 [clip-path:polygon(7px_0,calc(100%-7px)_0,100%_7px,100%_calc(100%-7px),calc(100%-7px)_100%,7px_100%,0_calc(100%-7px),0_7px)] flex items-center justify-center gap-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.25)] transition-colors">
                    <Send className="w-3.5 h-3.5 text-sky-400 group-hover/btn:scale-110 transition-transform" />
                    <span className="font-heading text-xs font-bold text-white tracking-wide">
                      Telegram
                    </span>
                  </div>
                </a>

                {/* WhatsApp */}
                <a
                  href="https://wa.me/380977287968"
                  target="_blank"
                  rel="noreferrer"
                  className="group/btn relative inline-flex p-[1px] pb-[2px] bg-gradient-to-b from-emerald-400/80 to-emerald-600/30 hover:from-emerald-300 hover:to-emerald-500 [clip-path:polygon(8px_0,calc(100%-8px)_0,100%_8px,100%_calc(100%-8px),calc(100%-8px)_100%,8px_100%,0_calc(100%-8px),0_8px)] shadow-md active:translate-y-[1px] transition-all select-none cursor-pointer"
                >
                  <div className="relative w-full px-3 py-2 bg-gradient-to-b from-[#162c21]/90 to-[#0c1a13]/90 group-hover/btn:from-[#1d3d2c]/90 [clip-path:polygon(7px_0,calc(100%-7px)_0,100%_7px,100%_calc(100%-7px),calc(100%-7px)_100%,7px_100%,0_calc(100%-7px),0_7px)] flex items-center justify-center gap-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.25)] transition-colors">
                    <MessageCircle className="w-3.5 h-3.5 text-emerald-400 group-hover/btn:scale-110 transition-transform" />
                    <span className="font-heading text-xs font-bold text-white tracking-wide">
                      WhatsApp
                    </span>
                  </div>
                </a>
              </div>
            </div>

            {/* 2. НИЖНЯ ЧАСТИНА: ЧАСТІ ЗАПИТАННЯ (FAQ) */}
            <div className="space-y-2 pt-2 border-t border-white/10">
              <div className="flex items-center gap-1.5">
                <HelpCircle className="w-3.5 h-3.5 text-neutral-400" />
                <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 font-medium">
                  Часті питання (FAQ)
                </span>
              </div>

              <div className="space-y-1.5 max-h-[220px] overflow-y-auto pr-1 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:bg-neutral-800">
                {faqs.map((faq, idx) => {
                  const isFaqOpen = activeFaq === idx;
                  return (
                    <div
                      key={idx}
                      className="rounded-lg border border-white/10 bg-white/[0.03] backdrop-blur-md overflow-hidden transition-colors"
                    >
                      <button
                        type="button"
                        onClick={() => toggleFaq(idx)}
                        className="w-full px-3 py-2 flex items-center justify-between text-left gap-2 cursor-pointer select-none hover:bg-white/[0.04]"
                      >
                        <span className="text-xs font-medium text-neutral-200">
                          {faq.q}
                        </span>
                        <ChevronDown
                          className={`w-3.5 h-3.5 text-neutral-400 shrink-0 transition-transform duration-200 ${
                            isFaqOpen ? "rotate-180 text-sky-400" : ""
                          }`}
                        />
                      </button>
                      {isFaqOpen && (
                        <div className="px-3 pb-2.5 pt-0.5 text-[11px] leading-relaxed text-neutral-300 font-light border-t border-white/5">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ── ГОЛОВНА СТІКІ 3D КНОПКА (КОЛИ ПАНЕЛЬ ВІДКРИТА — ПОВНІСТЮ СХОВАНА, БО Є ХРЕСТИК ВГОРІ ПАНЕЛІ) ── */}
      <div
        className={`relative group transition-all duration-300 ease-out ${
          isOpen
            ? "opacity-0 scale-75 translate-y-4 pointer-events-none"
            : isVisible
            ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
            : "opacity-0 translate-y-8 scale-75 pointer-events-none md:opacity-100 md:translate-y-0 md:scale-100 md:pointer-events-auto"
        }`}
      >
        {/* М'яке блакитне неонове світіння */}
        <div className="absolute -inset-1 rounded-full bg-sky-500/30 blur-md pointer-events-none transition-all duration-300 group-hover:bg-sky-400/50 group-hover:scale-110" />

        <button
          type="button"
          onClick={() => setIsOpen(true)}
          aria-label="Відкрити контакти та часті питання"
          className="relative inline-flex p-[1.5px] pb-[3px] rounded-full bg-gradient-to-b from-sky-400 via-sky-600 to-neutral-900 shadow-[0_12px_28px_rgba(0,0,0,0.85),0_4px_16px_rgba(14,165,233,0.35)] active:translate-y-[2px] active:pb-[1.5px] transition-all cursor-pointer select-none"
        >
          {/* Внутрішня чаша кнопки */}
          <div className="relative w-12 h-12 sm:w-13 sm:h-13 rounded-full bg-gradient-to-b from-[#1b2533] via-[#0e1622] to-[#070c13] flex items-center justify-center overflow-hidden shadow-[inset_0_1px_2px_rgba(255,255,255,0.3),inset_0_-2px_4px_rgba(0,0,0,0.9)] group-hover:from-[#233144] transition-colors">
            <Send className="w-5 h-5 text-sky-400 group-hover:text-white -translate-x-0.5 translate-y-0.5 transition-all duration-300 group-hover:scale-110 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </div>
        </button>

        {/* Тултіп (тільки коли панель закрита) */}
        {!isOpen && (
          <div className="absolute right-full top-1/2 -translate-y-1/2 mr-3 px-3 py-1.5 rounded-lg bg-neutral-900/95 border border-neutral-800 text-xs font-mono text-neutral-200 whitespace-nowrap shadow-xl pointer-events-none opacity-0 translate-x-2 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0 hidden sm:block">
            Контакти &amp; FAQ
          </div>
        )}
      </div>
    </div>
  );
}
