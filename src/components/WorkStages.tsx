"use client";

import React, { useState } from "react";
import { MessageSquare, LayoutGrid, Terminal, Rocket } from "lucide-react";

export default function WorkStages() {
  const [activeStage, setActiveStage] = useState<number | null>(null);

  const stages = [
    {
      step: "01",
      title: "Обговорення & Аналіз",
      desc: "Уточнюємо бізнес-задачу, побажання та цільову аудиторію. Проводжу безкоштовний аудит і фіксую всі ключові вимоги без зайвої бюрократії.",
      tag: "Безкоштовний старт",
      status: "Аудит та оцінка за 1 день",
      icon: MessageSquare,
      // Десктопний віяловий кут і зсув
      desktopFan: "lg:-rotate-6 lg:-translate-x-6 lg:translate-y-2",
      badgeColor: "from-sky-500/20 to-sky-500/5",
    },
    {
      step: "02",
      title: "Прототип & Архітектура",
      desc: "Проєктую логіку майбутнього сайту: структуру сторінок, швидкий мобільний чекаут, бази даних та зв'язок з адмін-панеллю.",
      tag: "UX & Логіка",
      status: "Чітка структура та UX-схема",
      icon: LayoutGrid,
      desktopFan: "lg:-rotate-2 lg:-translate-x-2 lg:translate-y-0",
      badgeColor: "from-indigo-500/20 to-indigo-500/5",
    },
    {
      step: "03",
      title: "Розробка & Живе демо",
      desc: "Пишу чистий код на Next.js та React. Ви отримуєте пряме онлайн-посилання і спостерігаєте за створенням сайту в реальному часі.",
      tag: "Прозорий процес",
      status: "Доступ до демо-версії 24/7",
      icon: Terminal,
      desktopFan: "lg:rotate-2 lg:translate-x-2 lg:translate-y-0",
      badgeColor: "from-emerald-500/20 to-emerald-500/5",
    },
    {
      step: "04",
      title: "Запуск & Оплата",
      desc: "Підключаю домен, платіжки (LiqPay, Stripe, Monobank) та Telegram-бота. Передаю всі доступи, навчаю керуванню в адмінці — і лише тоді розрахунок.",
      tag: "100% результат",
      status: "Оплата після повної перевірки",
      icon: Rocket,
      desktopFan: "lg:rotate-6 lg:translate-x-6 lg:translate-y-2",
      badgeColor: "from-amber-500/20 to-amber-500/5",
    },
  ];

  return (
    <section id="stages" className="relative py-24 sm:py-32 px-4 bg-transparent overflow-hidden">
      <div className="relative z-10 max-w-6xl mx-auto space-y-12 sm:space-y-16">
        
        {/* ЗАГОЛОВОК СЕКЦІЇ */}
        <div className="flex flex-col items-center text-center space-y-4">
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight max-w-3xl">
            4 кроки від ідеї до працюючого проєкту
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base md:text-lg max-w-2xl font-light leading-relaxed">
            Зрозумілий, контрольований і відкритий процес співпраці на кожному етапі без сюрпризів.
          </p>
        </div>

        {/* КАРТКИ: ДЕСКТОП — ВІЯЛО ГРАЛЬНИХ КАРТ ІЗ ПЕРЕДНІМ ПЛАНОМ НА ХОВЕР,
                     МОБІЛКА / ПЛАНШЕТ — СТЕК КАРТОК У СТИЛІ APPLE WALLET */}
        <div className="relative pt-4 pb-8 lg:py-6">
          
          {/* МОБІЛЬНИЙ СТЕК (APPLE WALLET КАСКАД З РОЗШТОВХУВАННЯМ СУСІДНІХ КАРТОК) — показується на екранах < lg */}
          <div className="flex flex-col lg:hidden max-w-md mx-auto">
            {stages.map((st, idx) => {
              const isSelected = activeStage === idx;
              const isNextAfterSelected = activeStage !== null && idx === activeStage + 1;

              // Розрахунок верхнього накладання у стеку:
              // Перша картка 0px.
              // Якщо попередня картка відкрита (isNextAfterSelected) — розштовхуємо донизу (робимо позитивний відступ mt-4),
              // щоб відкрита картка не закривала цю картку і було одразу видно наступну!
              // Якщо сама ця картка відкрита (idx > 0) — теж трохи відсуваємо її від верхньої (-mt-10 замість -mt-20), ніби вона розштовхує і верхню!
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
                  key={st.step}
                  onClick={() => setActiveStage(isSelected ? null : idx)}
                  style={{ zIndex: isSelected ? 30 : idx + 1 }}
                  className={`relative cursor-pointer transition-all duration-400 ease-out transform select-none ${stackMarginClass} ${
                    isSelected
                      ? "scale-[1.03] shadow-[0_28px_60px_rgba(0,0,0,0.95),0_0_25px_rgba(255,255,255,0.06)]"
                      : activeStage !== null
                      ? "scale-[0.98] opacity-90 shadow-[0_12px_28px_rgba(0,0,0,0.85)]"
                      : "shadow-[0_12px_28px_rgba(0,0,0,0.85)]"
                  }`}
                >
                  <div className="p-[1px] pb-[3px] bg-gradient-to-b from-neutral-500 via-neutral-700 to-neutral-950 rounded-2xl [clip-path:polygon(14px_0,calc(100%-14px)_0,100%_14px,100%_calc(100%-14px),calc(100%-14px)_100%,14px_100%,0_calc(100%-14px),0_14px)]">
                    <div className="p-6 bg-gradient-to-b from-[#1e222d] via-[#12141c] to-[#0a0b10] [clip-path:polygon(13px_0,calc(100%-13px)_0,100%_13px,100%_calc(100%-13px),calc(100%-13px)_100%,13px_100%,0_calc(100%-13px),0_13px)] flex flex-col justify-between min-h-[220px] shadow-[inset_0_1px_0_rgba(255,255,255,0.22),inset_0_-2px_0_rgba(0,0,0,0.9)]">
                      
                      {/* Верхній заголовок картки, який завжди видно у згорнутому стеку Wallet */}
                      <div className="flex items-center justify-between pb-3 border-b border-white/5">
                        <div className="flex items-center gap-3">
                          <span className="font-heading text-xl font-black text-white/90 tracking-wider">
                            {st.step}
                          </span>
                          <span className="font-heading text-sm font-bold text-white tracking-tight">
                            {st.title}
                          </span>
                        </div>
                        <span className="font-mono text-[9px] text-neutral-300 uppercase tracking-wider bg-white/5 px-2 py-0.5 rounded border border-neutral-700/60">
                          {st.tag}
                        </span>
                      </div>

                      {/* Опис та деталі */}
                      <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed font-light py-3">
                        {st.desc}
                      </p>

                      {/* Нижня смужка статусу */}
                      <div className="pt-2.5 border-t border-neutral-800/80 flex items-center gap-2 text-[11px] font-mono text-neutral-400">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.8)]" />
                        <span>{st.status}</span>
                      </div>

                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ДЕСКТОПНИЙ ВІЯЛ ГРАЛЬНИХ КАРТ (FAN DISPLAY) — показується на lg: */}
          <div className="hidden lg:grid grid-cols-4 gap-4 items-stretch px-2">
            {stages.map((st, idx) => (
              <div
                key={st.step}
                className={`relative group transition-all duration-300 ease-out cursor-pointer hover:z-30 hover:scale-108 hover:-translate-y-5 hover:rotate-0 hover:shadow-[0_25px_60px_rgba(0,0,0,0.95)] ${st.desktopFan}`}
                style={{ zIndex: idx + 1 }}
              >
                <div className="h-full p-[1px] pb-[3px] bg-gradient-to-b from-neutral-500 via-neutral-700 to-neutral-950 group-hover:from-neutral-300 group-hover:via-neutral-500 group-hover:to-neutral-800 [clip-path:polygon(14px_0,calc(100%-14px)_0,100%_14px,100%_calc(100%-14px),calc(100%-14px)_100%,14px_100%,0_calc(100%-14px),0_14px)] shadow-[0_12px_30px_rgba(0,0,0,0.85)] transition-all">
                  <div className="h-full p-6 bg-gradient-to-b from-[#1d212b] via-[#12141c] to-[#0a0b10] group-hover:from-[#262c3b] group-hover:via-[#171b26] group-hover:to-[#0e1017] [clip-path:polygon(13px_0,calc(100%-13px)_0,100%_13px,100%_calc(100%-13px),calc(100%-13px)_100%,13px_100%,0_calc(100%-13px),0_13px)] flex flex-col justify-between space-y-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.22),inset_0_-2px_0_rgba(0,0,0,0.85)] transition-colors">
                    
                    <div className="space-y-4">
                      {/* Номер етапу та тег */}
                      <div className="flex items-center justify-between">
                        <span className="font-heading text-3xl font-black text-white/90 group-hover:text-white tracking-wider">
                          {st.step}
                        </span>
                        <span className="font-mono text-[10px] text-neutral-300 uppercase tracking-wider bg-white/5 px-2.5 py-1 rounded border border-neutral-700/80">
                          {st.tag}
                        </span>
                      </div>

                      {/* Назва та опис */}
                      <div className="space-y-2.5">
                        <h3 className="font-heading text-lg font-bold text-white tracking-tight group-hover:text-white">
                          {st.title}
                        </h3>
                        <p className="text-neutral-300 text-xs sm:text-[13px] leading-relaxed font-light">
                          {st.desc}
                        </p>
                      </div>
                    </div>

                    {/* Нижня лінія статусу */}
                    <div className="pt-3 border-t border-neutral-800/80 flex items-center gap-2 text-xs font-mono text-neutral-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.8)]" />
                      <span>{st.status}</span>
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
