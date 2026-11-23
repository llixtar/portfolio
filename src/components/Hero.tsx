"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  Smartphone,
  Eye,
  Code2,
  Sliders,
  Banknote,
  Send,
  ArrowDown,
  ChevronDown,
} from "lucide-react";

export default function Hero() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isTouching, setIsTouching] = useState(false);
  const touchStartPosRef = React.useRef({ x: 0, y: 0 });
  const isScrollingRef = React.useRef(false);

  // Автоматичне періодичне перевертання монетки з паузою для читання
  useEffect(() => {
    // Якщо користувач навів курсор або утримує пальцем — зупиняємо авто-переворот
    if (isHovered || isTouching) return;

    const timeoutId = setTimeout(
      () => {
        setIsFlipped((prev) => !prev);
      },
      isFlipped ? 4500 : 6500
    );

    return () => clearTimeout(timeoutId);
  }, [isFlipped, isHovered, isTouching]);

  // Обробка дотику на мобільних:
  // - При торканні фіксуємо координати
  // - Якщо палець тримають (будь-який час) — сторона НЕ змінюється сама (isTouching = true блокує авто-переворот)
  // - Якщо палець відпустили без руху (не скролили сторінку) — це чистий тап: сторона перевертається (працює в обидва боки)
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsTouching(true);
    isScrollingRef.current = false;
    const touch = e.touches[0];
    touchStartPosRef.current = { x: touch.clientX, y: touch.clientY };
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    const dx = Math.abs(touch.clientX - touchStartPosRef.current.x);
    const dy = Math.abs(touch.clientY - touchStartPosRef.current.y);
    if (dx > 8 || dy > 8) {
      isScrollingRef.current = true;
    }
  };

  const handleTouchEnd = () => {
    setIsTouching(false);
    if (!isScrollingRef.current) {
      setIsFlipped((prev) => !prev);
    }
  };

  const handleTouchCancel = () => {
    setIsTouching(false);
  };

  const showBack = isFlipped;

  return (
    <section className="relative h-[100svh] min-h-[100svh] md:h-dvh flex flex-col items-center bg-transparent px-4 sm:px-6 md:px-8 pt-3 sm:pt-5 md:py-6 pb-[max(1rem,env(safe-area-inset-bottom))] text-center overflow-hidden">
      {/* ГОЛОВНИЙ ШИРОКОФОРМАТНИЙ КОНТЕНТ (РОЗПОДІЛЕНИЙ ПО ВИСОТІ ВІД ВЕРХУ ДО НИЗУ) */}
      <div className="relative z-10 max-w-6xl mx-auto w-full flex-1 flex flex-col justify-between items-center py-0.5 sm:py-2">

        {/* 1. ВЕРХНІЙ БЛОК: 3D АВАТАР-МОНЕТКА ТА ПЛАШКА СТАТУСУ */}
        <div className="flex flex-col items-center pt-1 sm:pt-1">
          <div
            className="relative cursor-pointer select-none perspective-1000 group [touch-action:manipulation] [-webkit-touch-callout:none]"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onTouchCancel={handleTouchCancel}
            onClick={() => {
              if (!isTouching) {
                setIsFlipped((prev) => !prev);
              }
            }}
            title="Натисніть або торкніться, щоб перевернути"
          >
            {/* М'яка аура світіння позаду монетки */}
            <div className="absolute -inset-2 rounded-full bg-white/10 blur-xl pointer-events-none transition-all duration-500 group-hover:bg-white/20 group-hover:scale-110" />

            {/* 3D-монетка розробника: обертається навколо осі Y */}
            <div
              className="relative w-24 h-24 xs:w-28 xs:h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 lg:w-48 lg:h-48 transition-transform duration-700 ease-out preserve-3d"
              style={{
                transform: showBack ? "rotateY(180deg)" : "rotateY(0deg)",
              }}
            >
              {/* ── ЛИЦЬОВА СТОРОНА: ФОТО АВАТАРА ── */}
              <div className="absolute inset-0 w-full h-full rounded-full p-[3px] sm:p-[3.5px] bg-gradient-to-b from-neutral-400 via-neutral-700 to-neutral-950 shadow-[0_20px_40px_rgba(0,0,0,0.95),0_2px_12px_rgba(255,255,255,0.18)] backface-hidden [transform:translateZ(1px)]">
                <div className="w-full h-full p-[2.5px] sm:p-[3px] rounded-full bg-gradient-to-b from-[#1c1e26] to-[#08090c] shadow-[inset_0_2px_4px_rgba(255,255,255,0.25),inset_0_-2px_5px_rgba(0,0,0,0.9)]">
                  <div className="relative w-full h-full rounded-full overflow-hidden bg-neutral-950 shadow-[inset_0_0_14px_rgba(0,0,0,0.85)]">
                    <Image
                      src="/avatar-profile.jpg"
                      alt="Розробник"
                      fill
                      className="object-cover object-center pointer-events-none select-none grayscale contrast-[1.08] brightness-[0.98]"
                      priority
                      draggable={false}
                    />
                  </div>
                </div>
              </div>

              {/* ── ЗВОРОТНА СТОРОНА: ДОСВІД (МЕТАЛЕВИЙ РЕВЕРС) ── */}
              <div className="absolute inset-0 w-full h-full rounded-full p-[3px] sm:p-[3.5px] bg-gradient-to-b from-neutral-400 via-neutral-700 to-neutral-950 shadow-[0_20px_40px_rgba(0,0,0,0.95),0_2px_12px_rgba(255,255,255,0.18)] backface-hidden [transform:rotateY(180deg)_translateZ(1px)]">
                <div className="w-full h-full p-[2.5px] sm:p-[3px] rounded-full bg-gradient-to-b from-[#1c1e26] to-[#08090c] shadow-[inset_0_2px_4px_rgba(255,255,255,0.25),inset_0_-2px_5px_rgba(0,0,0,0.9)]">
                  <div className="relative w-full h-full rounded-full overflow-hidden bg-gradient-to-b from-[#181a22] via-[#0f1015] to-[#07080a] p-2 sm:p-3 flex flex-col items-center justify-center text-center shadow-[inset_0_2px_6px_rgba(255,255,255,0.1),inset_0_-4px_12px_rgba(0,0,0,0.95)]">
                    {/* Внутрішній контур карбування */}
                    <div className="w-full h-full rounded-full border border-neutral-800/80 p-1.5 sm:p-3 flex flex-col items-center justify-center bg-black/40 shadow-[inset_0_2px_8px_rgba(0,0,0,0.9)]">

                      {/* ДОСВІД: 6+ РОКІВ */}
                      <span className="font-heading text-xl xs:text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-none drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                        6+ років
                      </span>
                      <span className="font-mono text-[8px] xs:text-[9px] sm:text-[10px] md:text-xs text-neutral-400 uppercase tracking-widest mt-1 text-center leading-tight">
                        у командній розробці
                      </span>

                      {/* МІКРО-АКЦЕНТ КАРБУВАННЯ */}
                      <div className="flex items-center gap-1.5 mt-1.5 sm:mt-2 opacity-60">
                        <span className="w-1 h-1 rounded-full bg-neutral-500" />
                        <span className="font-mono text-[7.5px] xs:text-[8px] sm:text-[9px] text-neutral-400 tracking-widest uppercase">
                          Fullstack
                        </span>
                        <span className="w-1 h-1 rounded-full bg-neutral-500" />
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Плашка під аватаром: 3D СТЕЛС-БЕЙДЖ */}
          <div className="relative inline-flex p-[1px] pb-[2.5px] mt-2 sm:mt-3 md:mt-4.5 bg-gradient-to-b from-neutral-500 via-neutral-700 to-neutral-950 [clip-path:polygon(7px_0,calc(100%-7px)_0,100%_7px,100%_calc(100%-7px),calc(100%-7px)_100%,7px_100%,0_calc(100%-7px),0_7px)] shadow-[0_6px_16px_rgba(0,0,0,0.9)] select-none">
            <div className="relative px-3 sm:px-3.5 py-0.5 sm:py-1 bg-gradient-to-b from-[#1c1f28] via-[#12141c] to-[#0a0b10] [clip-path:polygon(6px_0,calc(100%-6px)_0,100%_6px,100%_calc(100%-6px),calc(100%-6px)_100%,6px_100%,0_calc(100%-6px),0_6px)] flex items-center gap-1.5 sm:gap-2 overflow-hidden shadow-[inset_0_1px_0_rgba(255,255,255,0.22),inset_0_-1px_0_rgba(0,0,0,0.85)]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.9)] animate-pulse" />
              <span className="font-mono text-[9.5px] xs:text-[10px] sm:text-[11px] tracking-wider uppercase font-medium text-neutral-300">
                Відкритий до замовлень
              </span>
            </div>
          </div>
        </div>

        {/* 2. СЕРЕДНІЙ БЛОК: ЗАГОЛОВОК (ПІДНЯТИЙ ДО ГОРИ, ЗБАЛАНСОВАНИЙ РОЗМІР ДЛЯ ТЕЛЕФОНУ) */}
        <div className="w-full flex flex-col items-center my-auto py-1 sm:py-2 md:py-4">
          <h1 className="font-heading text-[1.45rem] xs:text-[1.65rem] sm:text-3xl md:text-5xl lg:text-[3.35rem] font-bold text-white tracking-tight leading-[1.2] w-full text-center max-w-4xl px-2">
            Розробка інтернет-магазинів та сайтів під ключ
          </h1>
        </div>

        {/* 3. НИЖНІЙ БЛОК: ПЕРЕВАГИ (ВІДДАЛЕНІ ВІД ЛІВОГО КРАЮ) + ОБ'ЄМНА 3D СВІТЛО-СРІБНА КНОПКА */}
        <div className="w-full flex flex-col items-center space-y-3 sm:space-y-5 md:space-y-7 pb-1 sm:pb-2">
          {/* ОПИС: на комп'ютері повні розгорнуті рядки, на мобілці сфокусовані жирні тези з відступом від краю */}
          <div className="w-full flex flex-col items-start text-left max-w-4xl mx-auto pl-6 xs:pl-8 sm:pl-10 md:pl-0">
            <div className="w-full space-y-1.5 sm:space-y-2.5 md:space-y-3.5">
              {/* 1. Mobile First */}
              <div className="flex items-start gap-2.5 sm:gap-3">
                <Smartphone className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-neutral-400 shrink-0 mt-0.5" />
                <p className="text-xs xs:text-sm md:text-[15px] text-neutral-300 font-light leading-snug lg:whitespace-nowrap">
                  <strong className="text-white font-medium">Мобільна версія в пріоритеті</strong>
                  <span className="hidden md:inline">: ідеальна зручність для покупців зі смартфонів.</span>
                </p>
              </div>

              {/* 2. Жива демка онлайн */}
              <div className="flex items-start gap-2.5 sm:gap-3">
                <Eye className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-neutral-400 shrink-0 mt-0.5" />
                <p className="text-xs xs:text-sm md:text-[15px] text-neutral-300 font-light leading-snug lg:whitespace-nowrap">
                  <strong className="text-white font-medium">Живе демо під час роботи</strong>
                  <span className="hidden md:inline">: бачите проєкт онлайн на кожному етапі та коригуєте в процесі.</span>
                </p>
              </div>

              {/* 3. Без шаблонів */}
              <div className="flex items-start gap-2.5 sm:gap-3">
                <Code2 className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-neutral-400 shrink-0 mt-0.5" />
                <p className="text-xs xs:text-sm md:text-[15px] text-neutral-300 font-light leading-snug lg:whitespace-nowrap">
                  <strong className="text-white font-medium">Жодних шаблонів</strong>
                  <span className="hidden md:inline">: індивідуальна розробка та чистий швидкий код під вашу справу.</span>
                </p>
              </div>

              {/* 4. Адмінка та кабінети */}
              <div className="flex items-start gap-2.5 sm:gap-3">
                <Sliders className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-neutral-400 shrink-0 mt-0.5" />
                <p className="text-xs xs:text-sm md:text-[15px] text-neutral-300 font-light leading-snug lg:whitespace-nowrap">
                  <strong className="text-white font-medium">Адмін-панелі та кабінети</strong>
                  <span className="hidden md:inline">: повне керування меню, цінами, доставкою та клієнтами.</span>
                </p>
              </div>

              {/* 5. Telegram-бот бонусом */}
              <div className="flex items-start gap-2.5 sm:gap-3">
                <Send className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-neutral-400 shrink-0 mt-0.5" />
                <p className="text-xs xs:text-sm md:text-[15px] text-neutral-300 font-light leading-snug lg:whitespace-nowrap">
                  <strong className="text-white font-medium">Telegram-бот бонусом</strong>
                  <span className="hidden md:inline">: налаштованого бота для миттєвих сповіщень про замовлення дарую в подарунок.</span>
                </p>
              </div>

              {/* 6. Оплата в кінці */}
              <div className="flex items-start gap-2.5 sm:gap-3">
                <Banknote className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-neutral-400 shrink-0 mt-0.5" />
                <p className="text-xs xs:text-sm md:text-[15px] text-neutral-300 font-light leading-snug lg:whitespace-nowrap">
                  <strong className="text-white font-medium">Оплата в кінці</strong>
                  <span className="hidden md:inline">: розрахунок тільки після того, як ви особисто затвердите готову демку.</span>
                </p>
              </div>
            </div>
          </div>

          {/* МАКСИМАЛЬНО ОБ'ЄМНА 3D СВІТЛО-СРІБНА КНОПКА З ВЕЛИКИМ ШРИФТОМ (ЛЕВІТАЦІЯ) */}
          <div className="w-full flex flex-col items-center justify-center pt-1 sm:pt-2 pb-1">
            <div className="relative group inline-flex items-center justify-center">
              {/* Реалістичні тіні левітації */}
              <div
                className="absolute -bottom-2 w-[88%] h-5 rounded-[50%] bg-black/95 blur-md pointer-events-none animate-float-shadow transition-all duration-300 group-hover:scale-110 group-hover:opacity-90"
                aria-hidden="true"
              />
              <div
                className="absolute -bottom-4 w-[96%] h-7 rounded-[50%] bg-black/75 blur-xl pointer-events-none animate-float-shadow"
                aria-hidden="true"
              />

              <a
                href="#projects"
                className="relative inline-flex p-[2px] pb-[5px] sm:pb-[6px] bg-gradient-to-b from-[#e5e7eb] via-[#6b7280] to-[#1f2937] hover:from-white hover:via-[#9ca3af] hover:to-[#374151] [clip-path:polygon(14px_0,calc(100%-14px)_0,100%_14px,100%_calc(100%-14px),calc(100%-14px)_100%,14px_100%,0_calc(100%-14px),0_14px)] transition-all duration-300 hover:drop-shadow-[0_10px_28px_rgba(255,255,255,0.28)] cursor-pointer select-none active:translate-y-[3px] active:pb-[2px] animate-float drop-shadow-[0_8px_0_#111318,0_16px_32px_rgba(0,0,0,0.95)]"
              >
                {/* Внутрішня лицьова 3D-грань кнопки (масивне світле срібло з фаскою) */}
                <div className="relative w-full h-full px-8 py-3.5 xs:px-10 xs:py-4 sm:px-14 sm:py-4.5 md:px-16 md:py-5 bg-gradient-to-b from-[#ffffff] via-[#e5e7eb] to-[#c7cbd2] group-hover:from-[#ffffff] group-hover:via-[#edf0f4] group-hover:to-[#d2d6dd] [clip-path:polygon(12px_0,calc(100%-12px)_0,100%_12px,100%_calc(100%-12px),calc(100%-12px)_100%,12px_100%,0_calc(100%-12px),0_12px)] flex items-center justify-center overflow-hidden shadow-[inset_0_2.5px_0_rgba(255,255,255,1),inset_0_-3px_0_rgba(156,163,175,0.7),inset_0_0_14px_rgba(255,255,255,0.6)] transition-all duration-300">

                  {/* Ще більший, чіткий темний шрифт для мобілки та ПК */}
                  <span className="font-mono text-[15.5px] xs:text-base sm:text-lg md:text-[19px] tracking-[0.16em] xs:tracking-[0.2em] sm:tracking-[0.24em] uppercase font-black text-neutral-950 animate-text-wave-dark select-none drop-shadow-[0_1px_0_rgba(255,255,255,0.8)]">
                    ПЕРЕГЛЯНУТИ РОБОТИ
                  </span>
                </div>
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
