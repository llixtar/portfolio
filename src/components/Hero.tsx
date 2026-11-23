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
  const justTouchedRef = React.useRef(false);
  const touchTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  // Автоматичне періодичне перевертання монетки з паузою для читання
  useEffect(() => {
    // Якщо користувач навів курсор миші або утримує пальцем — зупиняємо авто-переворот
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
  // 1. При торканні ставимо isTouching = true (це зупиняє таймер і блокує зміну сторони)
  // 2. Поки палець тримають (на аві чи на досвіді) — сторона НЕ змінюється, показує поточну сторону
  // 3. Коли палець відпускають:
  //    - якщо це чистий тап або утримання (не скролили екран) — перевертаємо на протилежну сторону
  //    - блокуємо синтетичний onClick браузера (щоб не було подвійного зворотного перевороту)
  //    - скидаємо isTouching = false, таймер відновлюється і чергує сторони далі
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsTouching(true);
    setIsHovered(false);
    isScrollingRef.current = false;
    const touch = e.touches[0];
    touchStartPosRef.current = { x: touch.clientX, y: touch.clientY };
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    const dx = Math.abs(touch.clientX - touchStartPosRef.current.x);
    const dy = Math.abs(touch.clientY - touchStartPosRef.current.y);
    if (dx > 10 || dy > 10) {
      isScrollingRef.current = true;
    }
  };

  const handleTouchEnd = () => {
    setIsTouching(false);
    setIsHovered(false);

    // Захист від подвійного спрацювання синтетичного кліку
    justTouchedRef.current = true;
    if (touchTimeoutRef.current) clearTimeout(touchTimeoutRef.current);
    touchTimeoutRef.current = setTimeout(() => {
      justTouchedRef.current = false;
    }, 600);

    // Якщо це не скрол — перевертаємо на зворотну сторону
    if (!isScrollingRef.current) {
      setIsFlipped((prev) => !prev);
    }
  };

  const handleTouchCancel = () => {
    setIsTouching(false);
    setIsHovered(false);
  };

  const handleMouseEnter = () => {
    if (typeof window !== "undefined" && window.matchMedia("(hover: hover)").matches) {
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleClick = () => {
    if (justTouchedRef.current) return;
    setIsFlipped((prev) => !prev);
  };

  const showBack = isFlipped;

  return (
    <section className="relative min-h-[100svh] md:h-dvh md:max-h-dvh flex flex-col items-center justify-between bg-transparent px-4 sm:px-6 md:px-8 pt-5 pb-3 sm:pt-6 sm:pb-4 md:py-6 text-center overflow-hidden [contain:content]">
      {/* ГОЛОВНИЙ ШИРОКОФОРМАТНИЙ КОНТЕНТ (СТАБІЛЬНИЙ, БЕЗ СТРИБКІВ ПРИ СКРОЛІ) */}
      <div className="relative z-10 max-w-6xl mx-auto w-full flex-1 flex flex-col justify-between items-center">

        {/* 1. ВЕРХНІЙ БЛОК: 3D АВАТАР-МОНЕТКА, ПЛАШКА СТАТУСУ ТА ЗАГОЛОВОК (ЖИРНИЙ, 2 РЯДКИ) */}
        <div className="w-full flex flex-col items-center pt-1 sm:pt-2">
          <div
            className="relative cursor-pointer select-none perspective-1000 group [touch-action:manipulation] [-webkit-touch-callout:none]"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onTouchCancel={handleTouchCancel}
            onClick={handleClick}
            title="Натисніть або торкніться, щоб перевернути"
          >
            {/* М'яка аура світіння позаду монетки */}
            <div className="absolute -inset-2 rounded-full bg-white/10 blur-xl pointer-events-none transition-all duration-500 group-hover:bg-white/20 group-hover:scale-110" />

            {/* 3D-монетка розробника: обертається навколо осі Y */}
            <div
              className="relative w-32 h-32 sm:w-36 sm:h-36 md:w-44 md:h-44 lg:w-48 lg:h-48 transition-transform duration-700 ease-out preserve-3d"
              style={{
                transform: showBack ? "rotateY(180deg)" : "rotateY(0deg)",
              }}
            >
              {/* ── ЛИЦЬОВА СТОРОНА: ФОТО АВАТАРА ── */}
              <div className="absolute inset-0 w-full h-full rounded-full p-[3.5px] bg-gradient-to-b from-neutral-400 via-neutral-700 to-neutral-950 shadow-[0_20px_40px_rgba(0,0,0,0.95),0_2px_12px_rgba(255,255,255,0.18)] backface-hidden [transform:translateZ(1px)]">
                <div className="w-full h-full p-[3px] rounded-full bg-gradient-to-b from-[#1c1e26] to-[#08090c] shadow-[inset_0_2px_4px_rgba(255,255,255,0.25),inset_0_-2px_5px_rgba(0,0,0,0.9)]">
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
              <div className="absolute inset-0 w-full h-full rounded-full p-[3.5px] bg-gradient-to-b from-neutral-400 via-neutral-700 to-neutral-950 shadow-[0_20px_40px_rgba(0,0,0,0.95),0_2px_12px_rgba(255,255,255,0.18)] backface-hidden [transform:rotateY(180deg)_translateZ(1px)]">
                <div className="w-full h-full p-[3px] rounded-full bg-gradient-to-b from-[#1c1e26] to-[#08090c] shadow-[inset_0_2px_4px_rgba(255,255,255,0.25),inset_0_-2px_5px_rgba(0,0,0,0.9)]">
                  <div className="relative w-full h-full rounded-full overflow-hidden bg-gradient-to-b from-[#181a22] via-[#0f1015] to-[#07080a] p-2.5 sm:p-3 flex flex-col items-center justify-center text-center shadow-[inset_0_2px_6px_rgba(255,255,255,0.1),inset_0_-4px_12px_rgba(0,0,0,0.95)]">
                    {/* Внутрішній контур карбування */}
                    <div className="w-full h-full rounded-full border border-neutral-800/80 p-2 sm:p-3 flex flex-col items-center justify-center bg-black/40 shadow-[inset_0_2px_8px_rgba(0,0,0,0.9)]">

                      {/* ДОСВІД: 6+ РОКІВ */}
                      <span className="font-heading text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-none drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                        6+ років
                      </span>
                      <span className="font-mono text-[9px] sm:text-[10px] md:text-xs text-neutral-400 uppercase tracking-widest mt-1 text-center leading-tight">
                        у командній розробці
                      </span>

                      {/* МІКРО-АКЦЕНТ КАРБУВАННЯ */}
                      <div className="flex items-center gap-1.5 mt-2 opacity-60">
                        <span className="w-1 h-1 rounded-full bg-neutral-500" />
                        <span className="font-mono text-[8px] sm:text-[9px] text-neutral-400 tracking-widest uppercase">
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
          <div className="relative inline-flex p-[1px] pb-[2.5px] mt-3 sm:mt-4 bg-gradient-to-b from-neutral-500 via-neutral-700 to-neutral-950 [clip-path:polygon(7px_0,calc(100%-7px)_0,100%_7px,100%_calc(100%-7px),calc(100%-7px)_100%,7px_100%,0_calc(100%-7px),0_7px)] shadow-[0_6px_16px_rgba(0,0,0,0.9)] select-none">
            <div className="relative px-3.5 py-1 bg-gradient-to-b from-[#1c1f28] via-[#12141c] to-[#0a0b10] [clip-path:polygon(6px_0,calc(100%-6px)_0,100%_6px,100%_calc(100%-6px),calc(100%-6px)_100%,6px_100%,0_calc(100%-6px),0_6px)] flex items-center gap-2 overflow-hidden shadow-[inset_0_1px_0_rgba(255,255,255,0.22),inset_0_-1px_0_rgba(0,0,0,0.85)]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.9)] animate-pulse" />
              <span className="font-mono text-[10.5px] sm:text-[11px] tracking-wider uppercase font-medium text-neutral-300">
                Відкритий до замовлень
              </span>
            </div>
          </div>

          {/* Заголовок (жирний, рівно 2 рядки, без фрази "під ключ") */}
          <div className="w-full flex flex-col items-center mt-3 sm:mt-4 md:mt-5 px-2">
            <h1 className="font-heading text-[1.65rem] xs:text-[1.85rem] sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.2] w-full text-center max-w-4xl">
              <span className="block">Розробка інтернет-магазинів</span>
              <span className="block text-white">та сайтів</span>
            </h1>
          </div>
        </div>

        {/* 2. СЕРЕДНІЙ БЛОК: ОПИС (ЕЛЕГАНТНИЙ ЧИТАБЕЛЬНИЙ РОЗМІР) */}
        <div className="w-full flex-1 flex flex-col justify-center items-center py-1 sm:py-2">
          <div className="w-full flex flex-col items-start text-left max-w-4xl mx-auto pl-6 sm:pl-8 md:pl-0">
            <div className="w-full space-y-2.5 sm:space-y-3 md:space-y-3.5">
              {/* 1. Mobile First */}
              <div className="flex items-start gap-2.5 sm:gap-3">
                <Smartphone className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-neutral-400 shrink-0 mt-0.5" />
                <p className="text-[14px] sm:text-[15px] md:text-[15.5px] text-neutral-300 font-light leading-snug lg:whitespace-nowrap">
                  <strong className="text-white font-medium">Мобільна версія в пріоритеті</strong>
                  <span className="hidden md:inline">: ідеальна зручність для покупців зі смартфонів.</span>
                </p>
              </div>

              {/* 2. Жива демка онлайн */}
              <div className="flex items-start gap-2.5 sm:gap-3">
                <Eye className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-neutral-400 shrink-0 mt-0.5" />
                <p className="text-[14px] sm:text-[15px] md:text-[15.5px] text-neutral-300 font-light leading-snug lg:whitespace-nowrap">
                  <strong className="text-white font-medium">Живе демо під час роботи</strong>
                  <span className="hidden md:inline">: бачите проєкт онлайн на кожному етапі та коригуєте в процесі.</span>
                </p>
              </div>

              {/* 3. Без шаблонів */}
              <div className="flex items-start gap-2.5 sm:gap-3">
                <Code2 className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-neutral-400 shrink-0 mt-0.5" />
                <p className="text-[14px] sm:text-[15px] md:text-[15.5px] text-neutral-300 font-light leading-snug lg:whitespace-nowrap">
                  <strong className="text-white font-medium">Жодних шаблонів</strong>
                  <span className="hidden md:inline">: індивідуальна розробка та чистий швидкий код під вашу справу.</span>
                </p>
              </div>

              {/* 4. Адмінка та кабінети */}
              <div className="flex items-start gap-2.5 sm:gap-3">
                <Sliders className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-neutral-400 shrink-0 mt-0.5" />
                <p className="text-[14px] sm:text-[15px] md:text-[15.5px] text-neutral-300 font-light leading-snug lg:whitespace-nowrap">
                  <strong className="text-white font-medium">Адмін-панелі та кабінети</strong>
                  <span className="hidden md:inline">: повне керування меню, цінами, доставкою та клієнтами.</span>
                </p>
              </div>

              {/* 5. Telegram-бот бонусом */}
              <div className="flex items-start gap-2.5 sm:gap-3">
                <Send className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-neutral-400 shrink-0 mt-0.5" />
                <p className="text-[14px] sm:text-[15px] md:text-[15.5px] text-neutral-300 font-light leading-snug lg:whitespace-nowrap">
                  <strong className="text-white font-medium">Telegram-бот бонусом</strong>
                  <span className="hidden md:inline">: налаштованого бота для миттєвих сповіщень про замовлення дарую в подарунок.</span>
                </p>
              </div>

              {/* 6. Оплата в кінці */}
              <div className="flex items-start gap-2.5 sm:gap-3">
                <Banknote className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-neutral-400 shrink-0 mt-0.5" />
                <p className="text-[14px] sm:text-[15px] md:text-[15.5px] text-neutral-300 font-light leading-snug lg:whitespace-nowrap">
                  <strong className="text-white font-medium">Оплата в кінці</strong>
                  <span className="hidden md:inline">: розрахунок тільки після того, як ви особисто затвердите готову демку.</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 3. НИЖНІЙ БЛОК: ОБ'ЄМНА 3D СВІТЛО-СРІБНА КНОПКА (ОПУЩЕНА НИЖЧЕ) */}
        <div className="w-full flex flex-col items-center justify-center pt-1 pb-1 sm:pb-2 md:pb-3">
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
              <div className="relative w-full h-full px-9 py-4 sm:px-14 sm:py-4.5 md:px-16 md:py-5 bg-gradient-to-b from-[#ffffff] via-[#e5e7eb] to-[#c7cbd2] group-hover:from-[#ffffff] group-hover:via-[#edf0f4] group-hover:to-[#d2d6dd] [clip-path:polygon(12px_0,calc(100%-12px)_0,100%_12px,100%_calc(100%-12px),calc(100%-12px)_100%,12px_100%,0_calc(100%-12px),0_12px)] flex items-center justify-center overflow-hidden shadow-[inset_0_2.5px_0_rgba(255,255,255,1),inset_0_-3px_0_rgba(156,163,175,0.7),inset_0_0_14px_rgba(255,255,255,0.6)] transition-all duration-300">

                {/* Збільшений, виразний темний шрифт */}
                <span className="font-mono text-base sm:text-base md:text-[18px] tracking-[0.2em] sm:tracking-[0.24em] uppercase font-black text-neutral-950 animate-text-wave-dark select-none drop-shadow-[0_1px_0_rgba(255,255,255,0.8)]">
                  ПЕРЕГЛЯНУТИ РОБОТИ
                </span>
              </div>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
