"use client";

import React, { useState } from "react";

export default function AboutMe() {
  const [activeCard, setActiveCard] = useState<number | null>(null);

  const cards = [
    {
      title: "Чистий код & Швидкість",
      desc: "Жодних повільних плагінів чи конструкторів на кшталт WordPress. Лише передовий стек (Next.js, React, TypeScript), що забезпечує показники Google PageSpeed 95+ та миттєве завантаження на смартфонах.",
      status: "PageSpeed 95+ на смартфонах",
      tag: "Продуктивність",
      desktopFan: "lg:-rotate-5 lg:-translate-x-4 lg:translate-y-2",
    },
    {
      title: "Повний цикл розробки",
      desc: "Беру на себе все: від ергономічного мобільного інтерфейсу та каталогу до налаштування адмін-панелі, платіжних систем, онлайн-чекауту та Telegram-бота для сповіщень.",
      status: "Сайт + Адмінка + Бот у комплекті",
      tag: "All-in-one",
      desktopFan: "lg:rotate-0 lg:translate-x-0 lg:translate-y-0",
    },
    {
      title: "Прозорість & Оплата в кінці",
      desc: "Ви не купуєте кота в мішку. Ви отримуєте посилання на робочу онлайн-демку на перших етапах, тестуєте її власноруч зі смартфона, а остаточний розрахунок відбувається після повного затвердження.",
      status: "Оплата тільки після здачі демки",
      tag: "0% ризику",
      desktopFan: "lg:rotate-5 lg:translate-x-4 lg:translate-y-2",
    },
  ];

  return (
    <section id="about" className="relative py-24 sm:py-32 px-4 bg-transparent overflow-hidden">
      <div id="about-content" className="relative z-10 max-w-6xl mx-auto space-y-12 sm:space-y-16">
        
        {/* ЗАГОЛОВОК СЕКЦІЇ */}
        <div className="flex flex-col items-center text-center space-y-4">
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight max-w-3xl">
            Створюю швидкі веб-рішення, які приносять прибуток бізнесу
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base md:text-lg max-w-2xl font-light leading-relaxed">
            6+ років досвіду у командній та сольній розробці. Спеціалізуюся на створенні сучасних інтернет-магазинів, систем замовлень та бізнес-панелей без шаблонних конструкторів.
          </p>
        </div>

        {/* 3 ОСНОВНІ КАРТКИ ПІДХОДУ: ВІЯЛО НА ДЕСКТОПІ / APPLE WALLET СТЕК НА МОБІЛЦІ */}
        <div className="relative pt-4 pb-8 lg:py-6">

          {/* МОБІЛЬНИЙ СТЕК (APPLE WALLET КАСКАД З РОЗШТОВХУВАННЯМ СУСІДНІХ КАРТОК) — показується на екранах < lg */}
          <div className="flex flex-col lg:hidden max-w-md mx-auto">
            {cards.map((card, idx) => {
              const isSelected = activeCard === idx;
              const isNextAfterSelected = activeCard !== null && idx === activeCard + 1;

              const stackMarginClass =
                idx === 0
                  ? "mt-0"
                  : isNextAfterSelected
                  ? "mt-4 sm:mt-5"
                  : isSelected
                  ? "-mt-8 sm:-mt-10"
                  : "-mt-20 sm:-mt-24";

              return (
                <div
                  key={idx}
                  onClick={() => setActiveCard(isSelected ? null : idx)}
                  style={{ zIndex: isSelected ? 30 : idx + 1 }}
                  className={`relative cursor-pointer transition-all duration-400 ease-out transform select-none ${stackMarginClass} ${
                    isSelected
                      ? "scale-[1.03] shadow-[0_28px_60px_rgba(0,0,0,0.95),0_0_25px_rgba(255,255,255,0.06)]"
                      : activeCard !== null
                      ? "scale-[0.98] opacity-90 shadow-[0_12px_28px_rgba(0,0,0,0.85)]"
                      : "shadow-[0_12px_28px_rgba(0,0,0,0.85)]"
                  }`}
                >
                  <div className="p-[1px] pb-[3px] bg-gradient-to-b from-neutral-500 via-neutral-700 to-neutral-950 rounded-2xl [clip-path:polygon(14px_0,calc(100%-14px)_0,100%_14px,100%_calc(100%-14px),calc(100%-14px)_100%,14px_100%,0_calc(100%-14px),0_14px)]">
                    <div className="p-6 bg-gradient-to-b from-[#1e222d] via-[#12141c] to-[#0a0b10] [clip-path:polygon(13px_0,calc(100%-13px)_0,100%_13px,100%_calc(100%-13px),calc(100%-13px)_100%,13px_100%,0_calc(100%-13px),0_13px)] flex flex-col justify-between min-h-[220px] shadow-[inset_0_1px_0_rgba(255,255,255,0.22),inset_0_-2px_0_rgba(0,0,0,0.9)]">
                      
                      {/* Верхній видимий зріз картки Apple Wallet */}
                      <div className="flex items-center justify-between pb-3 border-b border-white/5">
                        <h3 className="font-heading text-base font-bold text-white tracking-tight">
                          {card.title}
                        </h3>
                        <span className="font-mono text-[9px] text-neutral-300 uppercase tracking-wider bg-white/5 px-2 py-0.5 rounded border border-neutral-700/60">
                          {card.tag}
                        </span>
                      </div>

                      {/* Опис */}
                      <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed font-light py-3">
                        {card.desc}
                      </p>

                      {/* Нижня лінія статусу */}
                      <div className="pt-2.5 border-t border-neutral-800/80 flex items-center gap-2 text-[11px] font-mono text-neutral-400">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.8)]" />
                        <span>{card.status}</span>
                      </div>

                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ДЕСКТОПНИЙ ВІЯЛ ГРАЛЬНИХ КАРТ (FAN DISPLAY) — показується на lg: */}
          <div className="hidden lg:grid grid-cols-3 gap-6 items-stretch max-w-5xl mx-auto px-4">
            {cards.map((card, idx) => (
              <div
                key={idx}
                className={`relative group transition-all duration-300 ease-out cursor-pointer hover:z-30 hover:scale-108 hover:-translate-y-5 hover:rotate-0 hover:shadow-[0_25px_60px_rgba(0,0,0,0.95)] ${card.desktopFan}`}
                style={{ zIndex: idx + 1 }}
              >
                <div className="h-full p-[1px] pb-[3px] bg-gradient-to-b from-neutral-500 via-neutral-700 to-neutral-950 group-hover:from-neutral-300 group-hover:via-neutral-500 group-hover:to-neutral-800 [clip-path:polygon(14px_0,calc(100%-14px)_0,100%_14px,100%_calc(100%-14px),calc(100%-14px)_100%,14px_100%,0_calc(100%-14px),0_14px)] shadow-[0_12px_30px_rgba(0,0,0,0.85)] transition-all">
                  <div className="h-full p-6 sm:p-7 bg-gradient-to-b from-[#1d212b] via-[#12141c] to-[#0a0b10] group-hover:from-[#262c3b] group-hover:via-[#171b26] group-hover:to-[#0e1017] [clip-path:polygon(13px_0,calc(100%-13px)_0,100%_13px,100%_calc(100%-13px),calc(100%-13px)_100%,13px_100%,0_calc(100%-13px),0_13px)] flex flex-col justify-between space-y-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.22),inset_0_-2px_0_rgba(0,0,0,0.85)] transition-colors">
                    
                    <div className="space-y-3.5">
                      <div className="flex items-center justify-between">
                        <h3 className="font-heading text-xl font-bold text-white tracking-tight group-hover:text-white">
                          {card.title}
                        </h3>
                        <span className="font-mono text-[10px] text-neutral-300 uppercase tracking-wider bg-white/5 px-2 py-0.5 rounded border border-neutral-700/80">
                          {card.tag}
                        </span>
                      </div>
                      
                      <p className="text-neutral-300 text-xs sm:text-[13px] leading-relaxed font-light">
                        {card.desc}
                      </p>
                    </div>

                    <div className="pt-3.5 border-t border-neutral-800/80 flex items-center gap-2 text-xs font-mono text-neutral-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.8)]" />
                      <span>{card.status}</span>
                    </div>

                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
